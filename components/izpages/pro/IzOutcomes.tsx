"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";

/* ============================================================
   IzOutcomes — TIER 2 SECTION  (lab 00ar)

   The section skeleton sazabi.com repeats down its whole page:

       [ visual ]            [ tag ]
                             [ GLOW HEADLINE ]
                             [ sub ]
              │
              └──────┬──────────────┬──────────────┐
            [ outcome ]      [ outcome ]     [ outcome ]

   Three things are load-bearing and easy to lose:

   1. THE THREE OUTCOMES ARE NOT CARDS. No border, no background,
      no padding box — just icon, title, copy on the section's own
      surface. Boxing them turns a conclusion into a feature grid.
   2. THE CONNECTOR IS THE ARGUMENT. A line drops out of the visual,
      meets a rule, and that rule feeds the three columns. It says
      "these three follow from that" — which is why it is drawn
      rather than merely present.
   3. THE SIDE ALTERNATES. Consecutive sections must mirror, or the
      page becomes the same slab four times.

   THE ANIMATION: on entering view the drop line draws downward,
   then the rule draws OUTWARD FROM ITS CENTRE, then the three
   outcomes rise in sequence. Centre-out is the whole feel — it
   reads as distribution, one source feeding three, where a
   left-to-right wipe would read as a loading bar. Pure CSS
   transforms behind one IntersectionObserver.

   Theme-aware by default: unlike the sazabi reference (permanently
   dark), this section follows the page's current theme — paper or
   dark — and only forces the dark band when `inverted` is passed
   explicitly. Either way the glow is our accent, not a hardcoded red.
   ============================================================ */

export type Outcome = { Icon: Icon; title: string; body: string };

export function IzOutcomes({
  tag,
  title,
  sub,
  outcomes,
  visual,
  side = "left",
  inverted = false,
}: {
  /** optional: some sections carry their label in the heading already */
  tag?: string;
  /** each entry is a line; the accent glow applies to all of them */
  title: string[];
  sub: string;
  outcomes: Outcome[];
  visual: ReactNode;
  /** which side the visual sits on — ALTERNATE THIS down a page */
  side?: "left" | "right";
  /** off by default so the section follows the page theme; pass true
   *  for the permanently-dark sazabi-style band */
  inverted?: boolean;
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
      { threshold: 0.2 }
    );
    io.observe(el);
    /* Deliberately NO timed failsafe here. A blanket setTimeout fires
       whether or not the visitor has scrolled anywhere near the
       section, so on a long page it played the moment the tab loaded
       rather than when the section was actually reached — the opposite
       of a scroll reveal. IntersectionObserver alone is the correct
       trigger; the only fallback needed is for the rare case where
       the API itself is unavailable, handled above by revealing
       immediately. */
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`izo izo--${side} ${inverted ? "iz-inverted" : ""} ${seen ? "in" : ""}`}
    >
      <div className="iz-wrap">
        <div className="izo-top">
          <div className="izo-visual">{visual}</div>

          <div className="izo-copy">
            {tag && <span className="izo-tag">{tag}</span>}
            <h2 className="izo-title">
              {title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="izo-sub">{sub}</p>
          </div>
        </div>

        {/* the connector: drop, then rule, then feeds */}
        <div className="izo-wire" aria-hidden="true">
          <span className="izo-drop" />
          <span className="izo-rule" />
          <span className="izo-feeds">
            {outcomes.map((o) => (
              <i key={o.title} />
            ))}
          </span>
        </div>

        <div className="izo-outcomes">
          {outcomes.map((o, i) => (
            <div key={o.title} className="izo-outcome" style={{ ["--i" as string]: i } as React.CSSProperties}>
              <span className="izo-ico" aria-hidden="true">
                <o.Icon />
              </span>
              <h3>{o.title}</h3>
              <p>{o.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
