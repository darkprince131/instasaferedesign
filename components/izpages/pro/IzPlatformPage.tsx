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
import { IzConsoleLaptop } from "./IzConsoleLaptop";
import { IzTrustEngine } from "./IzTrustEngine";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { AnswerPlatform } from "@/components/izanswer/AnswerPlatform";

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

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="iz-section" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="The platform"
            heading="What is the InstaSafe platform?"
            question="One request."
            emphasis="Every"
            questionTail="check."
            answer="Most security tools answer one question each — a VPN answers whether you can reach the network, MFA answers whether the password is really yours, a posture tool answers whether the laptop is safe. InstaSafe asks all of them at once, on every single access request."
            points={[
              {
                title: "Four questions, asked together",
                body: "Who is asking, from what device, in what context, for which resource — every request is checked on all four before anything opens. An attacker has to get every answer right, not one.",
              },
              {
                title: "Then one connection, not a network",
                body: "A pass opens one encrypted tunnel to that one application. Not to the network it lives on, not to anything adjacent — one user, one app, one logged session.",
              },
              {
                title: "Everything else stays dark",
                body: "The network, the other servers, the databases and the internal apps the request never asked for remain unreachable — not firewalled off, simply never offered.",
              },
              {
                title: "One console runs all of it",
                body: "ZTNA, ZTAA, IAM, MFA, SSO and endpoint controls are one engine with one policy, not five tools with five ideas of who you are.",
              },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "What is Zero Trust", href: "/what-is-zero-trust" },
            ]}
            long={[
              "The problem with single-question tools is that attackers only need one of those answers to be wrong. A stolen password beats the MFA question if the VPN never asked about the device; a compliant laptop is irrelevant if the network lets anyone who is on it wander.",
              "Asking every question on every request inverts that. Before a user reaches any application — a web app, a remote desktop, an SSH server, a database — the platform verifies who they are, checks the device, evaluates the context, and then opens a connection to that one application only. The picture on the right is one such request, end to end.",
            ]}
            slot={{ kind: "art", art: AnswerPlatform }}
            stats={[
              { n: "4", label: "checks per request" },
              { n: "1", label: "application per tunnel" },
              { n: "0", label: "network access granted" },
            ]}
          />
        </div>
      </section>

      {/* ---------------- QUICK SCAN ---------------- */}
      <section className="iz-section alt">
        <div className="iz-wrap">
          <IzQuickScan />
        </div>
      </section>

      {/* ---------------- THE DECISION LAYER ----------------
          Routes to /platform/trust-engine, where the twelve triggers and
          the four responses are actually enumerated. This block states
          each number once and stops. */}
      <IzTrustEngine />

      {/* ---------------- THREE OUTCOMES ---------------- */}
      {/* `side="right"` because the stack above ends left-weighted —
          consecutive sections have to mirror or the page becomes the
          same slab twice (see IzOutcomes' own doctrine note). */}
      <IzOutcomes
        side="right"
        tag="One console"
        title={["One platform,", "not five tools"]}
        sub="ZTNA, ZTAA, IAM, MFA, SSO and endpoint controls from one console — so the VPN, the separate MFA vendor and the access spreadsheets all retire together."
        visual={<IzConsoleLaptop />}
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
