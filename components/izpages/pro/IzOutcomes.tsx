"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
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

/* An illustration takes exactly one prop. That single contract is why
   the visual layer can be swapped per page without touching copy —
   see docs/three-outcomes-rule.md. */
export type IllustrationProps = { highlightIndex: number | null };

export function IzOutcomes({
  tag,
  title,
  sub,
  outcomes,
  visual,
  artifact: Artifact,
  accentFrom = 0,
  side = "left",
  inverted = false,
}: {
  /** optional: some sections carry their label in the heading already */
  tag?: string;
  /** each entry is a line; the accent glow applies to all of them */
  title: string[];
  sub: string;
  outcomes: Outcome[];
  /** a plain node — use this when the visual takes no highlight */
  visual?: ReactNode;
  /** OR an illustration component, which gets the hover link wired to
   *  it. Pass one or the other, not both. */
  artifact?: ComponentType<IllustrationProps>;
  /** index of the first heading line that takes the accent glow.
   *  0 (the default) keeps every line accented, which is what the
   *  existing sections already do — do not change that default. */
  accentFrom?: number;
  /** which side the visual sits on — ALTERNATE THIS down a page */
  side?: "left" | "right";
  /** off by default so the section follows the page theme; pass true
   *  for the permanently-dark sazabi-style band */
  inverted?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [fine, setFine] = useState(false);

  /* The hover link is desktop-only: a touch device has no hover-out,
     so an emphasised state would simply stick. */
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
      style={{ ["--n" as string]: outcomes.length } as React.CSSProperties}
      data-hl={fine && hover !== null ? hover : undefined}
    >
      <div className="iz-wrap">
        <div className="izo-top">
          <div className="izo-visual">
            {Artifact ? <Artifact highlightIndex={fine ? hover : null} /> : visual}
          </div>

          <div className="izo-copy">
            {tag && <span className="izo-tag">{tag}</span>}
            <h2 className="izo-title">
              {title.map((line, i) => (
                <span key={line} className={i < accentFrom ? "is-plain" : undefined}>
                  {line}
                </span>
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
            {outcomes.map((o, i) => (
              <i key={o.title} style={{ ["--i" as string]: i } as React.CSSProperties} />
            ))}
          </span>
        </div>

        <div className="izo-outcomes">
          {outcomes.map((o, i) => (
            <div
              key={o.title}
              className="izo-outcome"
              style={{ ["--i" as string]: i } as React.CSSProperties}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="izo-mark" aria-hidden="true">
                <i className="izo-num">{String(i + 1).padStart(2, "0")}</i>
                <span className="izo-ico">
                  <o.Icon />
                </span>
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
