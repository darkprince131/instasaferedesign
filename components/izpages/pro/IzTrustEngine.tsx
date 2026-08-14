"use client";

import { ConsoleRow } from "@/components/home2/ConsoleRow";
import { IzPanel } from "@/components/home2/IzPanel";

/* ============================================================
   IzTrustEngine — the platform hub's decision-layer row.

   00c ConsoleRow (text left, console right) with IzPanel inside it.
   IzPanel is a primitive — console chrome plus a body — so it can't
   be the section: it has no headline, no body, no CTA. ConsoleRow
   supplies those; the panel is its visual slot.

   The console shows ONE user evaluated TWICE against the SAME target,
   with one input changed between the runs. That is the argument the
   headline makes ("evaluated together, once, per session") demonstrated
   rather than asserted — a sentence can claim the inputs are weighed
   as a set; only a refusal that turns on a single input proves it.

   HUB DISCIPLINE: the trigger types and the automatic responses are
   NOT enumerated here. Naming all twelve and all four is page-level
   depth and belongs on /platform/trust-engine. A hub routes.
   The facts row states each number exactly once — the earlier draft
   restated 21 / 12 / 4 in the body as well, which reads as the block
   not trusting its own first pass.

   Fictional console demo data, same convention as DashboardHero.
   ============================================================ */

type Row = { k: string; v: string; changed?: boolean };

type Run = {
  target: string;
  rows: Row[];
  verdict: { tone: "allow" | "stepup"; label: string; parts: string[] };
};

const RUNS: Run[] = [
  {
    target: "priya@acme.co → erp-core",
    rows: [
      { k: "identity", v: "directory match · mfa satisfied" },
      { k: "device", v: "bound · posture 25/25" },
      { k: "location", v: "IN · within allowed geo" },
      { k: "time", v: "14:02 IST · inside window" },
      { k: "risk", v: "2 / 100" },
    ],
    verdict: { tone: "allow", label: "ALLOW", parts: ["erp-finance-readonly", "ttl 8h"] },
  },
  {
    target: "priya@acme.co → erp-core",
    rows: [
      { k: "location", v: "SG · 41 min after last IN login", changed: true },
      { k: "risk", v: "78 / 100 · impossible travel", changed: true },
    ],
    verdict: { tone: "stepup", label: "STEP-UP", parts: ["challenge issued", "event logged"] },
  },
];

export function IzTrustEngine() {
  return (
    <section className="iz-section" id="trust-engine">
      <div className="iz-wrap">
        {/* No "platform_ 05" prefix on the eyebrow. Nothing else on the
            page is numbered, so a lone 05 promised a series that does
            not exist — same rule as the stat ribbon's dropped indices
            (docs/no-index-numbers-rule.md). */}
        <ConsoleRow
          eyebrow="the decision layer"
          title={
            <>
              One engine decides. <em>Every session.</em>
            </>
          }
          body="Identity, device posture, location, time and risk score are not five separate checks that each pass or fail. They are evaluated together, once, before a single packet reaches the application."
          facts={[
            ["21", "policy combinations"],
            ["12 → 4", "risk triggers, automatic responses"],
            ["202", "event types, every decision logged"],
          ]}
          ctaLabel="Explore the Trust Engine"
          ctaHref="/platform/trust-engine"
        >
          <div className="izte">
            <span className="izte-kick">
              policy gate<i aria-hidden="true">_</i>
            </span>

            <IzPanel
              title="policy.evaluate"
              type="session"
              footerLeft="same user · same target"
              footerRight="one input changed"
            >
              <div className="izte-log">
                {RUNS.map((r, i) => (
                  <div className="izte-run" key={i}>
                    <p className="izte-head">
                      <span className="izte-verb">evaluating</span>
                      {r.target}
                    </p>

                    <dl className="izte-rows">
                      {r.rows.map((row) => (
                        <div className={`izte-row${row.changed ? " is-changed" : ""}`} key={row.k}>
                          <dt>{row.k}</dt>
                          <dd>{row.v}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className={`izte-verdict is-${r.verdict.tone}`}>
                      <span className="izte-arrow" aria-hidden="true">
                        →
                      </span>
                      <b>{r.verdict.label}</b>
                      {r.verdict.parts.map((p) => (
                        /* the interpunct is real text, not a ::before — flex gap
                           spaces these visually, but a screen reader would
                           otherwise read the parts run together as one word */
                        <em key={p}>
                          <span aria-hidden="true">·</span> {p}
                        </em>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </IzPanel>
          </div>
        </ConsoleRow>
      </div>
    </section>
  );
}
