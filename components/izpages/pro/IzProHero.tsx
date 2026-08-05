"use client";

import { useEffect, useRef } from "react";
import { HERO, MARQUEE } from "./pro.config";

/* ============================================================
   IzProHero — the design-canvas hero  (lab 00am)

   Recreated from fingerprint.com/products/fingerprint-pro/.
   Verified on their build: the hero is **0 images, 0 SVG, 0 canvas,
   0 video** — a real grid of 102x40 cells with some shaded, plus
   absolutely-placed cards. Everything here is DOM + CSS for the
   same reason: it stays crisp, it is themeable, and it costs
   nothing to load.

   The conceit is a design tool's canvas: the whole hero sits inside
   a selection rectangle with corner handles, the headline is itself
   a selected object with a label tab, and a live coordinate readout
   tracks the cursor.

   DOCTRINE CHECK (feedback_interaction_placement): the hover is
   decoration, never a gate. Headline, sub-copy and link are static
   and carry the whole message; the pointer only moves a readout and
   lights nearby cards. Strip the interaction and nothing is lost.

   Pointer work is rAF-throttled and writes through refs and CSS
   custom properties — no React state per frame, so it can't cost
   INP. Gated on `(hover: hover)`, so touch devices never run it.
   ============================================================ */

export function IzProHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!window.matchMedia?.("(hover: hover)").matches) return;

    /* The cards used to light INDIVIDUALLY by pointer proximity, which
       meant the canvas only ever revealed itself a card at a time and
       the reader had to sweep the whole hero to see the idea. It is now
       one section-wide state: entering the stage lights every card
       together in a short stagger, leaving it puts them back. The class
       lives on the stage, the stagger is a CSS delay per card, and the
       pointer handler below only moves the coordinate readout. */

    /* No rAF. `pointermove` is already coalesced to at most one event
       per frame, so the handler writes straight to the DOM — which
       also means this can't be killed by rAF being throttled to zero
       (background tabs, some embedded webviews). Only the stage's own
       rect is read per move: one layout read per frame, and no card
       geometry to keep in sync any more. */
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = stage.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      stage.style.setProperty("--mx", `${(x / r.width) * 100}%`);
      stage.style.setProperty("--my", `${(y / r.height) * 100}%`);
      if (readRef.current) {
        readRef.current.textContent = `X:${String(Math.max(0, Math.round(x))).padStart(4, "0")} Y:${String(
          Math.max(0, Math.round(y))
        ).padStart(4, "0")}`;
      }
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      stage.classList.add("lit");
    };

    const onLeave = () => {
      stage.classList.remove("lit");
      stage.style.removeProperty("--mx");
      stage.style.removeProperty("--my");
    };

    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointercancel", onLeave);
    return () => {
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  const shaded = new Set(HERO.shaded.map(([c, r]) => `${c}:${r}`));

  return (
    <header className="izpro-hero">
      <div className="iz-wrap">
        <div className="izpro-stage" ref={stageRef}>
          {/* The canvas grid. Every row carries its own track list from
              HERO.rows, so run lengths vary down the canvas instead of
              repeating one uniform lattice. */}
          <div className="izpro-grid" aria-hidden="true">
            {HERO.rows.map((tpl, ri) => (
              <span className="izpro-gridrow" key={ri} style={{ ["--tpl" as string]: tpl } as React.CSSProperties}>
                {tpl.trim().split(/\s+/).map((_, ci) => (
                  <span key={ci} className={shaded.has(`${ci + 1}:${ri + 1}`) ? "izpro-cell on" : "izpro-cell"} />
                ))}
              </span>
            ))}
          </div>

          {/* selection chrome around the whole stage */}
          <span className="izpro-sel" aria-hidden="true">
            <i className="izpro-h izpro-h--tl" />
            <i className="izpro-h izpro-h--tr" />
            <i className="izpro-h izpro-h--bl" />
            <i className="izpro-h izpro-h--br" />
          </span>

          {/* live coordinate readout — decoration, so aria-hidden */}
          <span className="izpro-read" aria-hidden="true">
            <span ref={readRef}>X:0000 Y:0000</span>
          </span>

          {/* the typewriter ruler label */}
          <span className="izpro-ruler" aria-hidden="true">
            <span className="izpro-dim">{HERO.label.dim}</span>
            <span className="izpro-bright">{HERO.label.bright}</span>
            <span className="izpro-dim">{HERO.label.tail}</span>
            <i className="izpro-caret" />
          </span>

          {/* Verdict cards on the canvas. `--i` is the stagger index, so
              the whole set lights as one sweep rather than at once. */}
          {HERO.cards.map((c, i) => (
            <span
              key={c.id}
              className="izpro-card"
              style={{ left: `${c.x}%`, top: `${c.y}%`, ["--i" as string]: i }}
              aria-hidden="true"
            >
              <i className="izpro-cardtag">{c.tag}</i>
              <span className="izpro-cardlabel">{c.label}</span>
              <span className="izpro-cardvalue">{c.value}</span>
            </span>
          ))}

          {/* the headline, as a selected object */}
          <div className="izpro-title">
            <span className="izpro-titletag" aria-hidden="true">
              {HERO.selectionTag}
            </span>
            {/* deliberately NOT .izpro-eyebrow — that class belongs to the
                stack's step counter and carries its own layout rules */}
            <span className="izpro-brandline">{HERO.title.eyebrow}</span>
            <h1>{HERO.title.main}</h1>
          </div>

          <p className="izpro-sub">
            <b>{HERO.sub.lead}</b> {HERO.sub.rest}{" "}
            <a href={HERO.sub.link.href}>{HERO.sub.link.label}</a>.
          </p>
        </div>
      </div>

      {/* stat strip. Duplicated once and marked aria-hidden so the
          marquee can loop seamlessly without a screen reader hearing
          everything twice. */}
      <div className="izpro-marquee">
        <div className="izpro-mtrack">
          {[0, 1].map((dup) => (
            <span className="izpro-mrun" key={dup} aria-hidden={dup === 1 || undefined}>
              {MARQUEE.map((m, i) => (
                <span key={i} className={m.boxed ? "izpro-mbox" : "izpro-mtext"}>
                  {m.text}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
