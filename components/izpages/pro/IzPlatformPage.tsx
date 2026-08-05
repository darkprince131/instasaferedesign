"use client";

import { useEffect, useState } from "react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { izFontVars } from "@/lib/iz-fonts";
import { ShieldCheck, EyeSlash, ArrowsSplit } from "@phosphor-icons/react";
import { IzProHero } from "./IzProHero";
import { IzProStack } from "./IzProStack";
import { IzQuickScan } from "./IzQuickScan";
import { IzOutcomes } from "./IzOutcomes";
import { IzSplitPlane } from "./IzSplitPlane";

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

      {/* ---------------- QUICK SCAN ---------------- */}
      <section className="iz-section alt">
        <div className="iz-wrap">
          <IzQuickScan />
        </div>
      </section>

      {/* ---------------- THREE OUTCOMES ---------------- */}
      {/* `side="right"` because the stack above ends left-weighted —
          consecutive sections have to mirror or the page becomes the
          same slab twice (see IzOutcomes' own doctrine note). */}
      <IzOutcomes
        side="right"
        tag="Three outcomes"
        title={["One platform,", "not five tools"]}
        sub="ZTNA, ZTAA, IAM, MFA, SSO and endpoint controls from one console — so the VPN, the separate MFA vendor and the access spreadsheets all retire together."
        visual={<IzSplitPlane />}
        outcomes={[
          {
            Icon: ShieldCheck,
            title: "One platform, not five tools",
            body: "ZTNA, ZTAA, IAM, MFA, SSO and endpoint controls from one console. Retire the VPN, the separate MFA vendor and the access spreadsheets.",
          },
          {
            Icon: EyeSlash,
            title: "Invisible infrastructure",
            body: "Server blackening means your applications don't appear on the internet at all. Attackers can't scan what doesn't respond.",
          },
          {
            Icon: ArrowsSplit,
            title: "Your data never touches us",
            body: "Split-plane architecture: InstaSafe runs the control plane; your data flows directly between your users and your apps.",
          },
        ]}
      />

      <IzFooterGrid />
    </div>
  );
}
