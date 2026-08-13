"use client";

import { useEffect, useRef, useState } from "react";
import { CARDS, type AgentCard } from "./sections.config";
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

   ▸ CONTENT IS INJECTABLE (2026-08-13) ◂
   The heading and the three cards were hardcoded, so this layout
   could only ever say the one thing it was born saying. The SSO page
   needs the same shell for MFA / device binding / offboarding, so
   `head` and `items` are props now. Omit them and the original
   caller renders exactly as before.

   MOBILE: there is no hover to trigger anything, so an
   IntersectionObserver plays each card ONCE as it scrolls into view
   and then leaves it at its end state. Every mock's end state is a
   complete thought, so a card that never animates loses nothing —
   which is also why `prefers-reduced-motion` needs no special case.
   ============================================================ */

export function IzAgentCards({
  head,
  items = CARDS.items,
  className = "",
}: {
  /** replace the heading block entirely */
  head?: React.ReactNode;
  /** override the card set; defaults to the agent-detection three */
  items?: AgentCard[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { index, canHover } = useHoverIndex(ref, ".izac-card");
  const [played, setPlayed] = useState<Set<number>>(new Set());

  /* Touch path only. On a pointer device the hover hook owns which
     card is live, and adding scroll-triggered plays on top would mean
     two cards moving at once — the exact noise the section avoids. */
  useEffect(() => {
    const el = ref.current;
    if (!el || canHover || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const cards = [...el.querySelectorAll<HTMLElement>(".izac-card")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = cards.indexOf(e.target as HTMLElement);
          if (i < 0) continue;
          setPlayed((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
          io.unobserve(e.target);
        }
      },
      { threshold: 0.45 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [canHover]);

  const defaultHead = (
    <>
      <h2 className="izac-title">
        {CARDS.title.lead} <mark>{CARDS.title.accent}</mark> {CARDS.title.tail}
      </h2>
      <p className="izac-sub">{CARDS.sub}</p>
    </>
  );

  return (
    <section className={`izac iz-railed ${className}`}>
      <div className="iz-wrap">
        <div className="izac-head">{head ?? defaultHead}</div>

        <div className="izac-row" ref={ref}>
          {items.map((c, i) => (
            <article
              key={c.id}
              className={`izac-card t-${c.tone} ${c.fade ? "t-fade" : ""} ${
                index === i || played.has(i) ? "is-live" : ""
              }`}
              tabIndex={0}
              aria-label={c.aria}
            >
              <h3 className="izac-cardtitle">
                {c.title[0]}
                <br />
                {c.title[1]}
              </h3>
              {/* The motion is decorative. If this line is missing the
                  card has to carry its point in the title alone, which
                  the agent-detection three do and the SSO three do not. */}
              {c.body && <p className="izac-cardbody">{c.body}</p>}
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
