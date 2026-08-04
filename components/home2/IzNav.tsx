"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";

/* ============================================================
   IzNav — shared `.iz` nav. Home2 (or any consumer) owns the theme
   state + localStorage bootstrap/persistence (key: is-theme) and
   passes it down.

   Desktop: full link row + a two-button theme switch.
   Mobile:  a single circular theme toggle + a hamburger, because the
            two-button switch plus a link row does not fit alongside
            the wordmark.
   ============================================================ */

type Theme = "dark" | "paper";

const LINKS = [
  { href: "/why-instasafe-zero-trust", label: "Why InstaSafe?" },
  { href: "/platform", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/resource-center", label: "Resources" },
  { href: "/partners", label: "Partners" },
];

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

  const next: Theme = theme === "dark" ? "paper" : "dark";

  return (
    <header className={`iz-nav${overlay ? " iz-nav-overlay" : ""}${solid ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <div className="iz-wrap iz-nav-in">
        <a href="/" className="iz-mark" aria-label="InstaSafe home">
          <Logo height={44} />
        </a>

        <nav className="iz-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
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

      <div id="iz-mobile-menu" className="iz-sheet" hidden={!open}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="/book-a-demo" className="iz-btn iz-btn-pri iz-sheet-cta" onClick={() => setOpen(false)}>
          Book a demo
        </a>
      </div>
    </header>
  );
}
