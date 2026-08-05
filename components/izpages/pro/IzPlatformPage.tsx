"use client";

import { useEffect, useState } from "react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { izFontVars } from "@/lib/iz-fonts";
import { IzProHero } from "./IzProHero";
import { IzProStack } from "./IzProStack";

/* ============================================================
   /platform — 00am, wired to a real route for the first time.

   Until now IzProHero + IzProStack only rendered inside the
   Components Lab. This is the same theme/nav/footer boilerplate as
   ZtnaPage: page-scoped theme sharing Home2's `is-theme` storage key,
   so a visitor who picked dark on the homepage keeps it here.
   ============================================================ */

type Theme = "dark" | "paper";

export function IzPlatformPage() {
  const [theme, setTheme] = useState<Theme>("paper");
  useEffect(() => {
    try {
      const t = localStorage.getItem("is-theme");
      setTheme(t === "dark" ? "dark" : "paper");
    } catch {}
  }, []);
  const onThemeChange = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("is-theme", t);
    } catch {}
  };

  return (
    <div className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
      <IzNav theme={theme} onThemeChange={onThemeChange} />
      <IzProHero />
      <IzProStack />
      <IzFooterGrid />
    </div>
  );
}
