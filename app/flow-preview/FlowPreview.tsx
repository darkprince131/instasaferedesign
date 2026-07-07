"use client";

import { useEffect, useState } from "react";
import { ZeroTrustFlow } from "@/components/home2/ZeroTrustFlow";

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

export function FlowPreview() {
  const [theme, setTheme] = useState<Theme>("paper");

  useEffect(() => {
    try {
      const t = localStorage.getItem("is-theme") as Theme | null;
      if (t === "paper" || t === "dark") setTheme(t);
    } catch {}
  }, []);
  const setT = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("is-theme", t);
    } catch {}
  };

  return (
    <div className="iz" data-theme={theme}>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "18px 28px 0" }}>
        <div className="iz-switch" role="group" aria-label="Theme">
          <button className={theme === "dark" ? "on" : ""} onClick={() => setT("dark")} aria-label="Dark theme" aria-pressed={theme === "dark"}>
            <Moon />
          </button>
          <button className={theme === "paper" ? "on" : ""} onClick={() => setT("paper")} aria-label="Paper theme" aria-pressed={theme === "paper"}>
            <Sun />
          </button>
        </div>
      </div>
      <section className="iz-section" style={{ paddingTop: 40 }}>
        <div className="iz-wrap">
          <ZeroTrustFlow />
        </div>
      </section>
    </div>
  );
}
