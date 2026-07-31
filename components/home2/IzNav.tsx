"use client";

import { Logo } from "@/components/brand/Logo";

/* ============================================================
   IzNav — extracted from Home2.tsx so every migrated `.iz` page
   gets the real nav for free. Home2 (or any consumer) owns the
   theme state + localStorage bootstrap/persistence (key: is-theme)
   and passes it down; IzNav just renders the toggle + logo + links.
   No visual/behavior change versus the inline version in Home2.
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

export function IzNav({ theme, onThemeChange }: { theme: Theme; onThemeChange: (t: Theme) => void }) {
  return (
    <header className="iz-nav">
      <div className="iz-wrap iz-nav-in">
        <a href="/" className="iz-mark">
          <Logo height={24} />
          <span className="iz-tag">ZTNA</span>
        </a>
        <nav className="iz-links">
          <a href="/platform">Platform</a>
          <a href="/solutions">Solutions</a>
          <a href="/why-instasafe-zero-trust">Why InstaSafe</a>
          <a href="/case-studies">Customers</a>
          <a href="/instasafe-zero-trust-pricing">Pricing</a>
        </nav>
        <div className="iz-nav-right">
          <div className="iz-switch" role="group" aria-label="Theme">
            <button className={theme === "dark" ? "on" : ""} onClick={() => onThemeChange("dark")} aria-label="Dark theme" aria-pressed={theme === "dark"}>
              <Moon />
            </button>
            <button className={theme === "paper" ? "on" : ""} onClick={() => onThemeChange("paper")} aria-label="Paper theme" aria-pressed={theme === "paper"}>
              <Sun />
            </button>
          </div>
          <a href="/book-a-demo" className="iz-btn iz-btn-pri iz-btn-sm">
            Book a demo
          </a>
        </div>
      </div>
    </header>
  );
}
