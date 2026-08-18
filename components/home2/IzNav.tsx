"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown, Compass } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { LOGIN_PORTALS, PANES, type Cell, type MenuKey, type Pane } from "./iz-nav-data";
import "./iznav.css";

/* ============================================================
   IzNav — shared `.iz` nav. Home2 (or any consumer) owns the theme
   state + localStorage bootstrap/persistence (key: is-theme) and
   passes it down.

   Desktop: four mega-menu triggers + a two-button theme switch.
            Panels open on hover (with a close delay, so a diagonal
            mouse path between trigger and panel does not drop it)
            and toggle on click, which is what keyboard users get —
            opening on focus would fire a 20-link panel at anyone
            merely tabbing past the bar.
   Mobile:  a single circular theme toggle + a hamburger; the sheet
            carries every mega-menu destination, grouped under the
            same headings the panel uses.

   Content and hrefs live in iz-nav-data.tsx. Those URLs are
   SEO-locked — read the note at the top of that file before
   changing one.
   ============================================================ */

type Theme = "dark" | "paper";

const Sun = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const Moon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

const ext = (c: Cell) => (c.ext ? { target: "_blank", rel: "noreferrer" } : {});

/* One portal card — used by the desktop dropdown and the mobile sheet.
   The rising hover shade is a ::after in iznav.css; everything here is
   structure. External destinations, deliberately same-tab: a login
   portal is where the visitor is going, not a reference they glance at. */
function LoginCard({ compact = false }: { compact?: boolean }) {
  return (
    <>
      {LOGIN_PORTALS.map((p) => (
        <a
          key={p.key}
          className={`iz-login-card is-${p.accent}${compact ? " is-compact" : ""}`}
          href={p.href}
        >
          <span className="iz-login-art">{p.art}</span>
          <b className="iz-login-name">{p.name}</b>
          <span className="iz-login-desc">{p.desc}</span>
          <span className="iz-login-go" aria-hidden="true">Log in →</span>
        </a>
      ))}
    </>
  );
}

function CellRow({ c }: { c: Cell }) {
  return (
    <a className="izmm-cell" href={c.href} {...ext(c)}>
      <c.Icon className="izmm-ic" size={19} weight="regular" aria-hidden="true" />
      <span>
        <span className="izmm-t">
          {c.t}
          {c.tag && <span className="izmm-tag">{c.tag}</span>}
        </span>
        {c.d && <span className="izmm-d">{c.d}</span>}
      </span>
    </a>
  );
}

function PaneBody({ pane }: { pane: Pane }) {
  if (!pane.cols) return null;
  return (
    <>
      {pane.cols.map((col, i) => (
        <div className="izmm-col" key={i}>
          <div className="izmm-head">{col.head}</div>

          {col.kind === "cells" && col.items.map((c) => <CellRow key={c.href + c.t} c={c} />)}

          {col.kind === "rail" && (
            <div className="izmm-rail">
              {col.items.map((c) => (
                <a className="izmm-rl" key={c.href} href={c.href}>
                  <c.Icon size={17} weight="regular" aria-hidden="true" />
                  {c.t}
                </a>
              ))}
            </div>
          )}

          {col.kind === "stats" && (
            <>
              <div className="izmm-stats">
                {col.stats.map((s) => (
                  <div className="izmm-stat" key={s.l}>
                    <b>{s.n}</b>
                    <span>{s.l}</span>
                  </div>
                ))}
              </div>
              <div className="izmm-note">
                <p>{col.note}</p>
                <a className="iz-btn iz-btn-ghost iz-btn-sm" href={col.cta.href}>
                  {col.cta.label}
                </a>
              </div>
            </>
          )}

          {col.kind === "feature" && (
            <a className="izmm-feat" href={col.href}>
              <div className="izmm-viz">{col.art}</div>
              <div className="izmm-feat-b">
                <div className="izmm-feat-t">{col.title}</div>
                <div className="izmm-d">{col.desc}</div>
                <div className="izmm-feat-l">{col.cta}</div>
              </div>
            </a>
          )}
        </div>
      ))}

      {pane.strip && (
        <div className="izmm-strip">
          <span className="izmm-strip-t">{pane.strip.note}</span>
          <span className="izmm-strip-a">
            {pane.strip.links.map((l) => (
              <a className="iz-btn iz-btn-ghost iz-btn-sm" key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </span>
        </div>
      )}
    </>
  );
}

export function IzNav({
  theme,
  onThemeChange,
  overlay = false,
}: {
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  /* `overlay` lets the bar sit transparent over a full-bleed hero and
     turn solid once the page scrolls past it. Text stays on --tx, which
     already flips with the theme — and the theme also picks the plate,
     so the pairing is always light-on-dark or dark-on-light. */
  overlay?: boolean;
}) {
  const [solid, setSolid] = useState(!overlay);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [login, setLogin] = useState(false);
  const loginTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* which sheet group is expanded on mobile — one at a time, all
     closed on open, so the sheet starts as four taps not fifty links */
  const [group, setGroup] = useState<MenuKey | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!overlay) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  // close the sheet on Escape and lock the page behind it
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes the mega panel wherever focus is; focus moving out of
  // the header entirely closes it too (tabbing past the last panel link).
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenu(null);
      headerRef.current?.querySelector<HTMLButtonElement>(`.iz-navcaret[data-pane="${menu}"]`)?.focus();
    };
    const onFocus = (e: FocusEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [menu]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const hold = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const openMenu = (k: MenuKey) => { hold(); setMenu(k); setLogin(false); };
  /* 120ms of grace: the cursor has to cross a hairline gap between the
     trigger and the panel, and an instant close makes that trip fail. */
  const closeMenu = () => { hold(); closeTimer.current = setTimeout(() => setMenu(null), 120); };

  /* the Log in dropdown: same grace-timer pattern as the mega panel, its
     own timer so the two can't cancel each other's close */
  const holdLogin = () => { if (loginTimer.current) clearTimeout(loginTimer.current); };
  const openLogin = () => { holdLogin(); setLogin(true); setMenu(null); };
  const closeLogin = () => { holdLogin(); loginTimer.current = setTimeout(() => setLogin(false), 120); };
  useEffect(() => () => { if (loginTimer.current) clearTimeout(loginTimer.current); }, []);
  useEffect(() => {
    if (!login) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setLogin(false);
      headerRef.current?.querySelector<HTMLButtonElement>(".iz-login-btn")?.focus();
    };
    const onFocus = (e: FocusEvent) => {
      if (!headerRef.current?.querySelector(".iz-login")?.contains(e.target as Node)) setLogin(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [login]);

  const next: Theme = theme === "dark" ? "paper" : "dark";
  const active = PANES.find((p) => p.key === menu);

  return (
    <header
      ref={headerRef}
      className={`iz-nav${overlay ? " iz-nav-overlay" : ""}${solid || menu ? " is-solid" : ""}${open ? " is-open" : ""}`}
      onMouseLeave={closeMenu}
    >
      <div className="iz-wrap iz-nav-in">
        <a href="/" className="iz-mark" aria-label="InstaSafe home">
          <Logo height={44} />
        </a>

        {/* Each item is a LINK to its own hub page plus a separate
            caret that opens the panel. As a single button the label
            only ever opened a dropdown, which stranded /platform,
            /solutions, /why-instasafe-zero-trust and /resource-center —
            four built, indexed pages with no way in from the nav.
            Hover still opens the panel from anywhere in the pair. */}
        <nav className="iz-links" aria-label="Main">
          {PANES.map((p) => (
            <span
              key={p.key}
              className={`iz-navitem${menu === p.key ? " is-open" : ""}`}
              /* A pane-less item must also CLOSE whatever is open —
                 hovering from Platform onto Solutions should not leave
                 the Platform panel hanging over the page. */
              onMouseEnter={() => (p.cols ? openMenu(p.key) : closeMenu())}
            >
              <a className="iz-navlink" href={p.href}>
                {p.label}
              </a>
              {/* no panel, no caret — a disclosure control that discloses
                  nothing is a promise the nav does not keep */}
              {p.cols && (
                <button
                  type="button"
                  className="iz-navcaret"
                  data-pane={p.key}
                  aria-expanded={menu === p.key}
                  aria-controls="iz-mega"
                  aria-label={`${menu === p.key ? "Close" : "Open"} the ${p.label} menu`}
                  onClick={() => (menu === p.key ? setMenu(null) : openMenu(p.key))}
                >
                  <CaretDown size={11} weight="bold" aria-hidden="true" />
                </button>
              )}
            </span>
          ))}
        </nav>

        <div className="iz-nav-right">
          {/* desktop: explicit two-state switch */}
          <div className="iz-switch" role="group" aria-label="Theme">
            <button className={theme === "dark" ? "on" : ""} onClick={() => onThemeChange("dark")} aria-label="Dark theme" aria-pressed={theme === "dark"}>
              <Moon />
            </button>
            <button className={theme === "paper" ? "on" : ""} onClick={() => onThemeChange("paper")} aria-label="Paper theme" aria-pressed={theme === "paper"}>
              <Sun />
            </button>
          </div>

          {/* mobile: one circle that flips the mode */}
          <button
            type="button"
            className="iz-theme-dot"
            onClick={() => onThemeChange(next)}
            aria-label={`Switch to ${next === "dark" ? "dark" : "light"} theme`}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </button>

          {/* Log in — a dropdown, not a link: two products, two consoles,
              and guessing wrong on behalf of the visitor costs a login. */}
          <span className="iz-login" onMouseEnter={openLogin} onMouseLeave={closeLogin}>
            <button
              type="button"
              className="iz-btn iz-btn-ghost iz-btn-sm iz-login-btn"
              aria-expanded={login}
              aria-controls="iz-login-panel"
              onClick={() => (login ? setLogin(false) : openLogin())}
            >
              Log in
              <CaretDown size={11} weight="bold" aria-hidden="true" />
            </button>
            <div id="iz-login-panel" className={`iz-login-panel${login ? " is-open" : ""}`}>
              <LoginCard />
            </div>
          </span>

          <a href="/book-a-demo" className="iz-btn iz-btn-pri iz-btn-sm iz-nav-cta">
            Book a demo
          </a>

          <button
            type="button"
            className="iz-burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="iz-mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* One panel node, swapped payload — keeping four mounted panes
          would put 80 links in the tab order on every page. */}
      <div id="iz-mega" className={`izmm${menu ? " is-open" : ""}`} onMouseEnter={hold} onMouseLeave={closeMenu}>
        <div className="izmm-in">
          {active && (
            <div className="izmm-pane is-on" data-pane={active.key}>
              <PaneBody pane={active} />
            </div>
          )}
        </div>
      </div>

      <div id="iz-mobile-menu" className="iz-sheet" hidden={!open}>
        {PANES.map((p) =>
          /* pane-less items are one row, not a disclosure that opens onto
             a single link to the page the heading already names */
          !p.cols ? (
            <div className="iz-sheet-group" key={p.key}>
              <a className="iz-sheet-head" href={p.href} onClick={() => setOpen(false)}>
                {p.label}
              </a>
            </div>
          ) : (
          <div className="iz-sheet-group" key={p.key} data-open={group === p.key}>
            <button
              type="button"
              className="iz-sheet-head"
              aria-expanded={group === p.key}
              aria-controls={`iz-sheet-${p.key}`}
              onClick={() => setGroup((g) => (g === p.key ? null : p.key))}
            >
              {p.label}
              <CaretDown size={13} weight="bold" aria-hidden="true" />
            </button>
            <div className="iz-sheet-links" id={`iz-sheet-${p.key}`}>
              {/* the hub page itself, first — the heading above is a
                  disclosure control on mobile, so without this row the
                  page the group is named after is unreachable */}
              <a className="iz-sheet-hub" href={p.href} onClick={() => setOpen(false)}>
                <Compass size={17} weight="regular" aria-hidden="true" />
                {p.label} overview
              </a>
              {p.cols.map((col, i) =>
                col.kind === "cells" || col.kind === "rail"
                  ? col.items.map((c) => (
                      <a key={`${i}-${c.href}-${c.t}`} href={c.href} onClick={() => setOpen(false)} {...ext(c)}>
                        <c.Icon size={17} weight="regular" aria-hidden="true" />
                        {c.t}
                      </a>
                    ))
                  : null
              )}
              {p.strip?.links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          )
        )}
        {/* the two consoles, above the demo CTA — an existing customer
            opens this sheet to log in far more often than to buy */}
        <div className="iz-sheet-login">
          <LoginCard compact />
        </div>
        <a href="/book-a-demo" className="iz-btn iz-btn-pri iz-sheet-cta" onClick={() => setOpen(false)}>
          Book a demo
        </a>
      </div>
    </header>
  );
}
