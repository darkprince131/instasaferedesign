"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SLIDES, type Slide } from "./pro.config";
import { IzProPanel } from "./IzProPanel";
import { IzProDock } from "./IzProDock";

/* ============================================================
   IzProStack — the sticky scroll-stack  (lab 00am)

   Recreated from the PlatformSlider on
   fingerprint.com/products/fingerprint-pro/. Measured off their
   live DOM: `stickyWrapper` is `position: sticky; top: 0;
   height: 720px` inside an 8496px `outerWrapper` — about 2100px of
   scroll per step — and the four `cardSlot`s are all absolutely
   positioned, with the INCOMING slot staged ~756px below and a
   HIGHER z-index, so it rises up over the outgoing one rather than
   the outgoing one leaving first. That overlap is what makes it
   feel seamless instead of like a slideshow.

   How the scroll is read here:
     - rAF loop + getBoundingClientRect, never a scroll listener
       (house rule: scroll events don't fire for every container)
     - the loop is gated by an IntersectionObserver, so it costs
       nothing when the section is off screen
     - per frame it writes ONE custom property (`--local`); React
       state changes only when the active index does, i.e. 4 times
       across the whole section. Nothing re-renders per frame.

   MOBILE: the whole scroll mechanism is removed — not shrunk.
   `display: none` on the stack, and a plain static list renders
   instead, exactly as the reference does with its `mobileList`.
   Scroll-jacking on touch is how these sections break.

   Content lives in pro.config.tsx. Adding a fifth slide means
   appending one object there; the counter, the rail, the stack and
   the mobile list all read SLIDES.length.
   ============================================================ */

/* `Aside` (command / link / quote) is unused by the current four
   slides — every step now carries a real `cta` instead — but the
   type stays in pro.config.tsx for a future slide that wants an
   inline chip rather than a button. Nothing here reads it. */

function Floats({ slide }: { slide: Slide }) {
  if (!slide.floats) return null;
  return (
    <>
      {slide.floats.map((f) => (
        <span
          key={f.id}
          className={`izpro-float ${f.tone ? `t-${f.tone}` : ""}`}
          style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.w }}
          aria-hidden="true"
        >
          {f.tag && <i className="izpro-floattag">{f.tag}</i>}
          {f.stat ? (
            <>
              {f.stat.icon && <f.stat.icon weight="regular" className="izpro-floaticon" />}
              <b className="izpro-floatstat">{f.stat.value}</b>
              <span className="izpro-floatlabel">{f.stat.label}</span>
            </>
          ) : (
            <>
              {f.title && <span className="izpro-floattitle">{f.title}</span>}
              {f.body && <span className="izpro-floatbody">{f.body}</span>}
            </>
          )}
        </span>
      ))}
    </>
  );
}

function num(i: number) {
  return String(i + 1).padStart(2, "0");
}

/* Fraction of each slide's scroll spent STILL before the next one
   starts rising. Without it the first slide begins leaving the moment
   the section is entered and never gets a moment of its own; the
   reference holds each card, then swaps. Raise for more reading time,
   lower for a faster hand-off. */
const HOLD = 0.55;
/* Window (as a fraction of one slide's dwell) over which a duo
   panel's own frame swap happens. Both fall well inside [0, HOLD] —
   see the comment above frameT in tick(). */
const FRAME_SWITCH_START = 0.16;
const FRAME_SWITCH_END = 0.42;

export function IzProStack() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const N = SLIDES.length;

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let live = false;
    let lastActive = -1;

    const tick = () => {
      if (!live) {
        raf = 0;
        return;
      }
      const r = outer.getBoundingClientRect();
      const travel = r.height - sticky.offsetHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;

      const raw = p * N;
      const idx = Math.min(N - 1, Math.floor(raw));
      const t = Math.min(1, Math.max(0, raw - idx));
      // still for the first HOLD of the slide, then the next rises
      const local = t < HOLD ? 0 : (t - HOLD) / (1 - HOLD);

      /* frame-t drives a duo panel's OWN internal cross-fade (login →
         portal, portal → watermark desktop) — a second, smaller
         progress living entirely inside the "still" portion of a
         single slide's dwell, well before HOLD hands off to the next
         slide. It has to finish before HOLD or the two transitions
         would visually collide. Clamped to 0/1 outside its window so
         it is inert for slides whose panel doesn't read it. */
      const frameT = Math.min(1, Math.max(0, (t - FRAME_SWITCH_START) / (FRAME_SWITCH_END - FRAME_SWITCH_START)));

      sticky.style.setProperty("--local", local.toFixed(4));
      sticky.style.setProperty("--frame-t", frameT.toFixed(4));
      if (idx !== lastActive) {
        lastActive = idx;
        setActive(idx);
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (es) => {
        live = es.some((e) => e.isIntersecting);
        if (live && !raf) raf = requestAnimationFrame(tick);
      },
      { rootMargin: "20% 0px" }
    );
    io.observe(outer);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [N]);

  const slide = SLIDES[active];

  return (
    <section className="izpro-section iz-railed">
      {/* ---------- desktop: the sticky stack ---------- */}
      <div className="izpro-outer" ref={outerRef} style={{ ["--slides" as string]: N } as React.CSSProperties}>
        <div className="izpro-sticky" ref={stickyRef}>
          <div className="iz-wrap izpro-cols3">
            {/* col 1: eyebrow, heading, CTA — swaps on the active index only */}
            <div className="izpro-left" key={slide.id}>
              <span className="izpro-eyebrow">
                <b>
                  {num(active)}/{num(N - 1)}
                </b>
                {slide.eyebrow}
              </span>
              <h2 className="izpro-h2">{slide.title}</h2>
              <a className="izpro-cta" href={slide.cta.href}>
                {slide.cta.label}
                <ArrowUpRight weight="bold" aria-hidden="true" />
              </a>
            </div>

            {/* col 2: the console — absolutely stacked slots, one per
                slide, sharing the current/next/past/future states */}
            <div className="izpro-mid">
              {SLIDES.map((s, i) => {
                const state = i === active ? "current" : i === active + 1 ? "next" : i < active ? "past" : "future";
                return (
                  <div key={s.id} className="izpro-slot" data-state={state}>
                    <IzProPanel panel={s.panel} />
                  </div>
                );
              })}
            </div>

            {/* col 3: supporting copy + the identity dock (step 01
                only) + the capability floats — stacked the same way
                as col 2, so it changes in lock-step with the console
                rather than a beat behind it */}
            <div className="izpro-right3">
              {SLIDES.map((s, i) => {
                const state = i === active ? "current" : i === active + 1 ? "next" : i < active ? "past" : "future";
                return (
                  <div key={s.id} className="izpro-slot" data-state={state}>
                    <p className="izpro-body">
                      <b>{s.body.lead}</b> {s.body.rest}
                    </p>
                    {s.dock && <IzProDock items={s.dock} />}
                    <Floats slide={s} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* right-edge progress rail */}
          <ol className="izpro-rail" aria-hidden="true">
            {SLIDES.map((s, i) => (
              <li key={s.id} className={i === active ? "on" : ""}>
                <span>{num(i)}</span>
                {i === active && <i>{s.eyebrow}</i>}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ---------- mobile twin: static, no scroll, no animation ---------- */}
      <ol className="izpro-mobile">
        {SLIDES.map((s, i) => (
          <li key={s.id} className="izpro-mcard">
            <span className="izpro-eyebrow">
              <b>
                {num(i)}/{num(N - 1)}
              </b>
              {s.eyebrow}
            </span>
            <h2 className="izpro-h2">{s.title}</h2>
            <IzProPanel panel={s.panel} />
            <p className="izpro-body">
              <b>{s.body.lead}</b> {s.body.rest}
            </p>
            {s.dock && <IzProDock items={s.dock} />}
            <a className="izpro-cta" href={s.cta.href}>
              {s.cta.label}
              <ArrowUpRight weight="bold" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
