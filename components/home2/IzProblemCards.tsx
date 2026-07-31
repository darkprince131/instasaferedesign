"use client";

import type { Icon } from "@phosphor-icons/react";

/* ============================================================
   00az · IzProblemCards — the "problem, concretely" block.

   Layout taken from the reference: one raised panel lifted over a
   contrasting band, a centred headline, then N equal columns of
   icon-tile + title + explanation. The panel overlapping the band
   above it is the whole trick — it makes the block read as a card
   set ON the page rather than another full-width stripe in the
   stack, which is what keeps a run of sections from flattening.

   Not a generic card grid: the icon tile is a bordered accent
   square (not a filled circle), the title is display weight, and
   there is no CTA per column — these are three statements of one
   problem, not three offers.
   ============================================================ */

export type ProblemCard = { icon: Icon; title: string; body: string };

type Props = {
  heading: string;
  emphasis?: string;
  headingTail?: string;
  cards: ProblemCard[];
  /** the dark band the panel lifts over; off for a plain surface */
  band?: boolean;
  className?: string;
};

export function IzProblemCards({
  heading,
  emphasis,
  headingTail,
  cards,
  band = true,
  className,
}: Props) {
  return (
    <section className={`izpc${band ? " izpc--band" : ""}${className ? ` ${className}` : ""}`}>
      {band && <div className="izpc-band" aria-hidden="true" />}
      <div className="iz-wrap">
        <div className="izpc-panel">
          <h2 className="izpc-h">
            {heading}
            {emphasis && <em> {emphasis}</em>}
            {headingTail && ` ${headingTail}`}
          </h2>
          <div className="izpc-grid">
            {cards.map(({ icon: CardIcon, title, body }) => (
              <div key={title} className="izpc-card">
                <span className="izpc-tile" aria-hidden="true">
                  <CardIcon size={24} weight="duotone" />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
