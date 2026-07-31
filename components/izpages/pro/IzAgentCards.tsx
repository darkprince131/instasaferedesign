"use client";

import { useRef } from "react";
import { CARDS } from "./sections.config";
import { Mock } from "./IzMocks";
import { useHoverIndex } from "./useHoverIndex";

/* ============================================================
   IzAgentCards — TIER 2 SECTION  (lab 00an)

   The three-card animation row from the AI-agent-detection page.
   One shared shell — two-line centred title, a mock-up stage, a
   tinted wash rising from the card's foot — with a DIFFERENT
   animation inside each, and the wash tinted to match that
   animation's verdict. The shell being identical is what lets the
   three animations be read as three answers to one question.

   Each card runs only while hovered, so at most one animation is
   moving at a time. That restraint is deliberate: three looping
   mock-ups playing at once is noise, and none of them gets read.

   MOBILE: all three are stills. No hover exists to trigger them and
   autoplaying three of them on a phone is both unreadable and a
   battery tax. Every mock's end state is a complete thought, so
   nothing is lost by never starting it.
   ============================================================ */

export function IzAgentCards() {
  const ref = useRef<HTMLDivElement>(null);
  const { index } = useHoverIndex(ref, ".izac-card");

  return (
    <section className="izac iz-railed">
      <div className="iz-wrap">
        <div className="izac-head">
          <h2 className="izac-title">
            {CARDS.title.lead} <mark>{CARDS.title.accent}</mark> {CARDS.title.tail}
          </h2>
          <p className="izac-sub">{CARDS.sub}</p>
        </div>

        <div className="izac-row" ref={ref}>
          {CARDS.items.map((c, i) => (
            <article key={c.id} className={`izac-card t-${c.tone} ${index === i ? "is-live" : ""}`} tabIndex={0}>
              <h3 className="izac-cardtitle">
                {c.title[0]}
                <br />
                {c.title[1]}
              </h3>
              <div className="izac-stage">
                <Mock kind={c.mock} />
              </div>
              <span className="izac-wash" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
