"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "@phosphor-icons/react";
import { IzConsolidationDiagram } from "./IzConsolidationDiagram";

/* ============================================================
   Outcomes section — CANDIDATE A (split).

   An ARGUMENT IN TWO HALVES, and the halves say the same thing in
   different registers:

     left   the claim, as three numbered outcomes
     right  the same claim, as a routed diagram

   Candidate B ([[IzThreeOutcomesStacked]]) runs the same content
   through the existing IzOutcomes skeleton instead. Both are on the
   page while the layout is being chosen; one gets deleted.

   The diagram itself lives in IzConsolidationDiagram so the two
   candidates cannot drift apart.
   ============================================================ */

type Outcome = { n: string; title: string; body: string };

const OUTCOMES: Outcome[] = [
  {
    n: "01",
    title: "Fewer tools to renew",
    body: "The vendor portal, the jump box, the VDI licences and the concentrator were four answers to one question. Consolidating them is usually where the business case comes from.",
  },
  {
    n: "02",
    title: "One offboarding, not four",
    body: "A leaver is removed once, from everything, including the network paths. The audit finding that comes from a missed system stops being possible.",
  },
  {
    n: "03",
    title: "An answer the auditor accepts",
    body: "Every decision is logged with the reason. Access review becomes an export in a format your SIEM already reads.",
  },
];

export function IzThreeOutcomes({
  /* The eyebrow names the TOPIC; it must never restate the headline
     sitting directly under it. "Three outcomes" above "Three outcomes
     that matter" is the same words twice. */
  kicker = "What changes",
  title = "Three outcomes",
  titleEmphasis = "that matter",
  sub = "Replace four answers to one question with a single control plane. Remove access once. Prove every decision.",
}: {
  kicker?: string;
  title?: string;
  titleEmphasis?: string;
  sub?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    /* No timed failsafe — a blanket setTimeout fires whether or not
       the visitor ever scrolled here, which is the opposite of a
       scroll reveal. IO alone is the trigger. */
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`izto iz-railed ${seen ? "in" : ""}`}>
      <div className="iz-wrap izto-cols">
        {/* ---------------- left · the claim ---------------- */}
        <div className="izto-copy">
          <span className="izto-tag">
            <i aria-hidden="true" />
            {kicker}
          </span>

          <h2 className="izto-title">
            {title} <em>{titleEmphasis}</em>
            <b aria-hidden="true">.</b>
          </h2>

          <p className="izto-sub">{sub}</p>

          <ol className="izto-list">
            {OUTCOMES.map((o, i) => (
              <li className="izto-row" key={o.n} style={{ ["--i" as string]: i } as React.CSSProperties}>
                <span className="izto-n" aria-hidden="true">
                  {o.n}
                </span>
                <div className="izto-rowbody">
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="izto-stamp">
            <span className="izto-stamp-ic" aria-hidden="true">
              <ShieldCheck weight="regular" />
            </span>
            One identity. One policy. Every access.
          </p>
        </div>

        {/* ---------------- right · the same claim, routed ---------------- */}
        <IzConsolidationDiagram />
      </div>
    </section>
  );
}
