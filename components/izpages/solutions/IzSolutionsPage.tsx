"use client";

import { useEffect, useState } from "react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { izFontVars } from "@/lib/iz-fonts";
import { IzSolutionsHero } from "./IzSolutionsHero";
import { IzSolutionsAnswer } from "./IzSolutionsAnswer";
import { IzGroupA } from "./IzGroupA";
import { IzGroupB } from "./IzGroupB";
import { IzGroupC } from "./IzGroupC";
import { IzGroupD } from "./IzGroupD";
import { IzThreeOutcomesStacked } from "./IzThreeOutcomesStacked";

/* ============================================================
   /solutions — page shell.

   Same theme boilerplate as IzPlatformPage and ZtnaPage: page-scoped
   state sharing Home2's `is-theme` storage key, so a visitor who
   picked dark on the homepage keeps it here.

   Only section 00 (the hero) exists so far; the rest of the page is
   still the sections below it to come.
   ============================================================ */

type Theme = "dark" | "paper";

export function IzSolutionsPage() {
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
      <IzSolutionsHero />
      {/* 01 — the plain answer, before the chooser: one policy engine
          against seven application types, which is the claim every
          group below is a case of. */}
      <IzSolutionsAnswer />
      {/* The chooser is ONE run of four, not four unrelated bands, so
          it is wrapped and given its own internal rhythm: tight
          between the groups, full section interval at its edges.
          Without this every junction on the page was 280px — two
          140px paddings meeting — and the four groups read as four
          separate pages stacked. */}
      <div className="izsol-chooser">
        <IzGroupA />
        <IzGroupB />
        <IzGroupC />
        <IzGroupD />
      </div>
      {/* Choice made: the lower of the two candidates stays. The
          upper one (IzThreeOutcomes, `.izto`) is unwired rather than
          deleted — its file is untouched, so putting it back is this
          one import. */}
      <IzThreeOutcomesStacked />
      <IzFooterGrid />
    </div>
  );
}
