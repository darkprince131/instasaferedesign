"use client";

import { useEffect, useState } from "react";

import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzNav } from "@/components/home2/IzNav";
import { Magnetic } from "@/components/v2/Magnetic";
import { izFontVars } from "@/lib/iz-fonts";

/* ============================================================
   /platform/trust-engine — the deep-dive the platform hub routes to.

   THIS is where the enumeration lives. The hub states 21 / 12 → 4 / 202
   once each and moves on; naming all twelve trigger types and all four
   responses is page-level depth, and it drifted up to the hub in the
   earlier copy. It comes back down here, into the expander, so the page
   still opens with one answer rather than a specification.

   One IzAnswerStrip carries the page: the definition, the three facts,
   the terminal showing a real evaluation, and the long version behind
   the expander.
   ============================================================ */

type Theme = "dark" | "paper";

export function IzTrustEnginePage() {
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

      <header className="iz-section">
        <div className="iz-wrap">
          <span className="iz-ey">Platform · the decision layer</span>
          <h1 className="iz-h1">
            The Trust Engine <em>(deep-dive)</em>
          </h1>
          <p className="iz-lead">
            The policy evaluation layer behind every InstaSafe session — what it weighs, what raises risk, and what it
            does when risk crosses the line.
          </p>
          <div className="iz-hero-cta">
            <Magnetic>
              <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                Book a demo
              </a>
            </Magnetic>
            <a href="/platform" className="iz-btn iz-btn-ghost">
              The whole platform
            </a>
          </div>
        </div>
      </header>

      <section className="iz-section alt" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="trust_engine"
            heading="What is the Trust Engine?"
            question="Administrators compose the conditions."
            emphasis="It returns one verdict,"
            questionTail="per session."
            answer="The Trust Engine is the policy evaluation layer of the InstaSafe controller — not a marketing name for a firewall rule. Administrators compose conditions; it resolves them into one verdict, per session."
            facts={[
              { n: "21", text: "combinations of identity, device, location, time and risk" },
              { n: "12", text: "trigger types feeding the risk score" },
              { n: "4", text: "automatic responses when it crosses threshold" },
            ]}
            points={[
              {
                title: "Conditions are composed, not chosen from a list",
                body: "Identity, device posture, location, time window and risk score combine — an administrator writes the rule that says which combination opens which resource, and for how long.",
              },
              {
                title: "One verdict, not five pass/fail results",
                body: "The inputs are weighed as a set and resolved once. A perfect identity does not rescue a failing device, and a compliant device does not rescue an impossible journey.",
              },
              {
                title: "Risk is continuous, so the verdict is too",
                body: "The score keeps moving during the session. A session that started clean and stops being clean is re-answered mid-flight rather than left alone until it expires.",
              },
              {
                title: "Every decision is written down",
                body: "Allow, step-up, restrict or terminate — each verdict lands in the event log with the inputs that produced it, so an auditor reads the reasoning, not just the outcome.",
              },
            ]}
            slot={{
              kind: "terminal",
              title: "policy.evaluate",
              badge: "session",
              lines: [
                { cmd: "evaluate sophia@acme.co → erp-core" },
                { out: "identity   directory match · mfa satisfied", tone: "ok" },
                { out: "device     bound · posture 25/25", tone: "ok" },
                { out: "location   SG · 41 min after last IN login", tone: "no" },
                { out: "risk       78 / 100 · impossible travel", tone: "no" },
                { out: "threshold  70", tone: "dim" },
                { cmd: "verdict" },
                { out: "STEP-UP · challenge issued · event logged", tone: "no" },
              ],
            }}
            stats={[
              { n: "1", label: "verdict per session" },
              { n: "202", label: "event types recorded" },
              { n: "0", label: "decisions left unlogged" },
            ]}
            long={[
              "Twelve trigger types feed the risk score. Impossible travel — a login from a country the user could not physically have reached since the last one. Posture drift, where a device that passed at sign-in stops passing during the session. Repeated authentication failures. Sign-ins at unusual hours for that user. Access from an unrecognised network, an unbound device, a new geography, a flagged IP reputation, an anomalous volume of requests, an out-of-pattern application, a concurrent session from a second location, and an administrator's own manual flag.",
              "Four automatic responses sit on the other side of the threshold. Step-up MFA, which re-challenges the user before anything continues. Session restriction, which narrows what the existing session can still reach. Alerting, which raises the event to the security team without interrupting the user. And termination, which ends the session outright and requires a fresh evaluation to get another.",
              "All of it is recorded. 202 event types cover authentication, authorisation, device state, policy change and administrative action, and every verdict is written with the inputs that produced it — which is what makes an access decision auditable rather than merely enforced.",
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "Device posture check", href: "/zero-trust-features/device-posture-check" },
            ]}
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
