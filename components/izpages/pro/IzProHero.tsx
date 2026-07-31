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

    const cards = [...stage.querySelectorAll<HTMLElement>(".izpro-card")];

    /* No rAF. `pointermove` is already coalesced to at most one event
       per frame, so the handler writes straight to the DOM — which
       also means this can't be killed by rAF being throttled to zero
       (background tabs, some embedded webviews).

       Card centres are cached as offsets RELATIVE TO THE STAGE, so
       they only go stale on layout change — a ResizeObserver covers
       that completely and no scroll listener is needed (scroll events
       don't fire for every scroll container; house rule). Only the
       stage's own rect is read per move: one layout read per frame. */
    let centres: { el: HTMLElement; ox: number; oy: number }[] = [];

    const measure = () => {
      const s = stage.getBoundingClientRect();
      centres = cards.map((el) => {
        const b = el.getBoundingClientRect();
        return { el, ox: b.left + b.width / 2 - s.left, oy: b.top + b.height / 2 - s.top };
      });
    };

    const NEAR_SQ = 260 * 260;

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

      /* The class is only written when it actually changes, so a fast
         sweep across the canvas doesn't thrash style recalculation. */
      for (const c of centres) {
        const dx = x - c.ox;
        const dy = y - c.oy;
        const near = dx * dx + dy * dy < NEAR_SQ;
        if (near !== c.el.classList.contains("near")) c.el.classList.toggle("near", near);
      }
    };

    const onLeave = () => {
      stage.style.removeProperty("--mx");
      stage.style.removeProperty("--my");
      for (const c of cards) c.classList.remove("near");
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointercancel", onLeave);
    return () => {
      ro.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  const { cols, rows } = HERO.grid;
  const shaded = new Set(HERO.shaded.map(([c, r]) => `${c}:${r}`));

  return (
    <header className="izpro-hero">
      <div className="iz-wrap">
        <div className="izpro-stage" ref={stageRef}>
          {/* the canvas grid — real cells, shaded from config */}
          <div className="izpro-grid" aria-hidden="true" style={{ ["--cols" as string]: cols } as React.CSSProperties}>
            {Array.from({ length: cols * rows }, (_, i) => {
              const c = (i % cols) + 1;
              const r = Math.floor(i / cols) + 1;
              return <span key={i} className={shaded.has(`${c}:${r}`) ? "izpro-cell on" : "izpro-cell"} />;
            })}
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

          {/* verdict cards on the canvas */}
          {HERO.cards.map((c) => (
            <span
              key={c.id}
              className={`izpro-card t-${c.tone}`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
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
            <h1>
              {HERO.title.lead} <mark>{HERO.title.brand}</mark>
            </h1>
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
