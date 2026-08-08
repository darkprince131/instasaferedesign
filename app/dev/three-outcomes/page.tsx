import type { Metadata } from "next";
import { IzThreeOutcomes } from "@/components/izpages/solutions/IzThreeOutcomes";
import { IzThreeOutcomesStacked } from "@/components/izpages/solutions/IzThreeOutcomesStacked";
import { izFontVars } from "@/lib/iz-fonts";

import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/izpages/solutions/threeoutcomes.css";

/* ============================================================
   DEV ONLY — /dev/three-outcomes. Not linked, not in the sitemap.

   The section on /solutions follows the visitor's stored theme, so
   reviewing both means toggling and re-scrolling. This renders the
   two themes stacked with the theme forced on each wrapper, which is
   the only way to see a paper/dark pair in one frame.
   ============================================================ */

/* /dev/* is a build tool, not a page, and robots.ts allows "/"
   site-wide — so each dev route carries its own noindex. */
export const metadata: Metadata = {
  title: "Three outcomes — dev",
  robots: { index: false, follow: false },
};

const THEMES = ["paper", "dark"] as const;

export default function ThreeOutcomesDemo() {
  return (
    <>
      {THEMES.map((t) => (
        <div key={t} className={`iz ${izFontVars}`} data-theme={t} data-system="orange">
          <IzThreeOutcomes />
          <IzThreeOutcomesStacked />
        </div>
      ))}
    </>
  );
}
