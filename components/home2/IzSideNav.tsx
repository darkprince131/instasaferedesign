"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretUp, PushPin, type Icon } from "@phosphor-icons/react";
import "./izsidenav.css";

/* ============================================================
   00bb · IzSideNav — in-page section navigation.

   Two surfaces, one source of truth:

   DESKTOP — a collapsed orange handle on the page edge carrying one
   tick per section, longer and opaque on the current one, so the rail
   shows position with no labels open. Hover or keyboard focus slides
   out a panel: a spine with a progress fill, one dot per section, and
   a pin for anyone who wants it to stay. It costs no layout — the old
   horizontal sub-nav bar spent a full band of vertical space and sat
   under a transparent site nav as a second opaque bar, which read as
   two different systems stacked.

   MOBILE — a bottom pill showing "3/7 · Quick scan" with a hairline
   progress bar, opening a sheet with the same list. The previous
   version hid entirely below 900px, which meant the longest pages
   lost their navigation on the device most likely to need it. The
   pill is inset from the right so it never lands under the help
   launcher (fixed at right:20 / 56px wide — see help-widget.css).

   ▸ REUSE ◂ every page with sections worth jumping between:
       <IzSideNav items={[{ id: "what", label: "What is ZTNA" }]} />
   `icon` is optional per item; without one the dot carries the
   section number, which is honest and needs no art. `side` defaults
   to the left edge. The component sets `scroll-margin-top` on each
   target itself, so anchor jumps clear the 66px sticky nav without a
   global scroll-padding rule.
   ============================================================ */

export type SideNavItem = { id: string; label: string; icon?: Icon };

/* the sticky site nav is 66px; leave it plus a little air */
const SCROLL_MARGIN = 90;
/* a section becomes current once its top passes this reading line */
const READ_LINE = 160;

export function IzSideNav({
  items,
  side = "left",
  label = "On this page",
}: {
  items: SideNavItem[];
  side?: "left" | "right";
  label?: string;
}) {
  const [active, setActive] = useState(0);
  /* false until the first anchored section is reached — the rail must not
     sit over the hero */
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [sheet, setSheet] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Anchor targets are owned by the page, not by this component, so the
     offset is applied to them here rather than as a global
     scroll-padding rule that would also move every other in-page link. */
  useEffect(() => {
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) el.style.scrollMarginTop = `${SCROLL_MARGIN}px`;
    }
  }, [items]);

  /* Scrollspy. A scroll listener, not an IntersectionObserver with a
     mid-viewport band: a section shorter than that band never
     intersects it, and the rail then sticks on whatever came before.
     "The last section whose top has crossed the reading line" is true
     for every section length. */
  useEffect(() => {
    const read = () => {
      let best = 0;
      items.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top - READ_LINE <= 0) best = i;
      });
      setActive((p) => (p === best ? p : best));

      /* The rail belongs to the sectioned part of the page, not to the
         hero. Sitting on the edge from the first frame it competed with
         the hero's own CTAs and pointed at content the reader had not
         reached. It appears once the FIRST anchored section crosses the
         reading line and leaves again if they scroll back up. */
      const first = items[0] && document.getElementById(items[0].id);
      const started = first ? first.getBoundingClientRect().top - READ_LINE <= 0 : true;
      setShown((p) => (p === started ? p : started));
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [items]);

  const hold = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const doOpen = useCallback(() => {
    hold();
    setOpen(true);
  }, []);
  /* the cursor has to cross the gap between handle and panel */
  const doClose = useCallback(() => {
    hold();
    if (pinned) return;
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }, [pinned]);

  useEffect(() => () => hold(), []);

  /* scrolling back into the hero must not leave an open panel or sheet
     floating over it */
  useEffect(() => {
    if (shown) return;
    setOpen(false);
    setPinned(false);
    setSheet(false);
  }, [shown]);

  // Escape closes everything; arrows walk the list and scroll with it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinned(false);
        setOpen(false);
        setSheet(false);
        return;
      }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      if (!rootRef.current?.contains(document.activeElement)) return;
      e.preventDefault();
      const n = Math.min(items.length - 1, Math.max(0, active + (e.key === "ArrowDown" ? 1 : -1)));
      rootRef.current.querySelector<HTMLAnchorElement>(`.izsn-item[data-i="${n}"]`)?.focus();
      document.getElementById(items[n].id)?.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, items]);

  // focus leaving the rail closes it, same as the mouse leaving
  useEffect(() => {
    if (!open) return;
    const onFocus = (e: FocusEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) doClose();
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, [open, doClose]);

  // lock the page behind the mobile sheet
  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheet]);

  /* one item is not navigation */
  if (items.length < 2) return null;

  const pct = (active / (items.length - 1)) * 100;

  const list = (where: "d" | "m") => (
    <div className="izsn-items">
      <span className="izsn-spine" aria-hidden="true">
        <i style={{ height: `${pct}%` }} />
      </span>
      {items.map((it, i) => {
        const Ico = it.icon;
        return (
          <a
            key={it.id}
            className={`izsn-item${i === active ? " on" : ""}${i < active ? " past" : ""}`}
            href={`#${it.id}`}
            data-i={where === "d" ? i : undefined}
            aria-current={i === active ? "true" : undefined}
            onClick={() => {
              setSheet(false);
              if (!pinned) setOpen(false);
            }}
          >
            <span className="izsn-dot">
              {Ico ? <Ico size={14} weight="regular" aria-hidden="true" /> : <b>{String(i + 1).padStart(2, "0")}</b>}
            </span>
            <span className="izsn-lbl">{it.label}</span>
          </a>
        );
      })}
    </div>
  );

  return (
    <div ref={rootRef}>
      {/* ---------------- desktop rail ---------------- */}
      <div
        className={`izsn izsn--${side}${open ? " is-open" : ""}${pinned ? " is-pinned" : ""}${shown ? "" : " is-away"}`}
        aria-hidden={!shown || undefined}
        onMouseEnter={doOpen}
        onMouseLeave={doClose}
      >
        <button
          type="button"
          className="izsn-handle"
          aria-expanded={open}
          aria-controls="izsn-panel"
          aria-label={open ? "Close section navigation" : "Open section navigation"}
          onFocus={doOpen}
          onClick={() => (open && pinned ? (setPinned(false), setOpen(false)) : doOpen())}
        >
          {items.map((it, i) => (
            <span
              key={it.id}
              className={`izsn-tick${i === active ? " on" : ""}${i < active ? " done" : ""}`}
              aria-hidden="true"
            />
          ))}
        </button>

        <nav className="izsn-panel" id="izsn-panel" aria-label={label}>
          <div className="izsn-head">
            <span className="izsn-head-t">{label}</span>
            <button
              type="button"
              className="izsn-pin"
              title="Keep open"
              aria-label="Keep section navigation open"
              aria-pressed={pinned}
              onClick={(e) => {
                e.stopPropagation();
                const next = !pinned;
                setPinned(next);
                if (next) doOpen();
              }}
            >
              <PushPin size={13} weight={pinned ? "fill" : "regular"} aria-hidden="true" />
            </button>
          </div>
          {list("d")}
        </nav>
      </div>

      {/* ---------------- mobile ---------------- */}
      <div className={`izsn-mob${shown ? "" : " is-away"}`} aria-hidden={!shown || undefined}>
        <button
          type="button"
          className="izsn-bar"
          aria-haspopup="dialog"
          aria-expanded={sheet}
          onClick={() => setSheet(true)}
        >
          <span className="izsn-idx">
            {active + 1}/{items.length}
          </span>
          <span className="izsn-cur">{items[active].label}</span>
          <span className="izsn-chev" aria-hidden="true">
            <CaretUp size={14} weight="bold" />
          </span>
          <span className="izsn-prog" aria-hidden="true">
            <i style={{ width: `${((active + 1) / items.length) * 100}%` }} />
          </span>
        </button>

        <div
          className={`izsn-scrim${sheet ? " is-open" : ""}`}
          onClick={() => setSheet(false)}
          aria-hidden="true"
        />
        <div className={`izsn-sheet${sheet ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label={label}>
          <span className="izsn-grab" aria-hidden="true" />
          {list("m")}
        </div>
      </div>
    </div>
  );
}
