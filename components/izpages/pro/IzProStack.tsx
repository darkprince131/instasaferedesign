"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      {slide.floats.map((f, i) => (
        <span
          key={f.id}
          className={`izpro-float ${f.tone ? `t-${f.tone}` : ""}`}
          /* --fi is the stagger index; the reveal window itself lives
             in pro.css and is driven by --frame-t */
          style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.w, ["--fi" as string]: i }}
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
gsap.registerPlugin(ScrollTrigger);

const HOLD = 0.55;
/* Window (as a fraction of one slide's dwell) over which a duo
   panel's own frame swap happens. Both fall well inside [0, HOLD] —
   see the comment above frameT in tick(). */
const FRAME_SWITCH_START = 0.16;
const FRAME_SWITCH_END = 0.42;

/* Two rest points per slide, so the section advances in STEPS rather
   than as one long uninterrupted glide: one scroll settles on part
   one, the next settles on part two, the next hands off to the
   following slide. Without this a single fast flick could cross a
   whole step and the reader would never see the part-two reveal that
   explains it.
     (i + 0.06)/N  — part one at rest, before the frame swap
     (i + 0.50)/N  — part two resolved, before HOLD hands off
   Values are fractions of the WHOLE section, which is what
   ScrollTrigger's snap array expects. */
const SNAP_POINTS = Array.from({ length: SLIDES.length }, (_, i) => [
  (i + 0.06) / SLIDES.length,
  (i + 0.5) / SLIDES.length,
]).flat();

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

    let lastActive = -1;

    /* Driven by ScrollTrigger with `scrub`, NOT by a raw rAF read of
       getBoundingClientRect. The old version mapped scroll position
       straight onto the CSS variables, so every transition inherited
       the scroll input exactly — trackpad and smooth-scroll jitter
       included, which is what made the fades look cheap. `scrub: 0.6`
       eases the value toward its target over ~0.6s instead, which is
       the single biggest smoothness win here.

       GSAP still only writes CSS custom properties; React state
       changes four times total, when the active index does. Nothing
       re-renders per frame. */
    const proxy = { p: 0 };

    const apply = (p: number) => {
      const raw = p * N;
      const idx = Math.min(N - 1, Math.floor(raw));
      const t = Math.min(1, Math.max(0, raw - idx));
      // still for the first HOLD of the slide, then the next rises
      const local = t < HOLD ? 0 : (t - HOLD) / (1 - HOLD);

      /* frame-t drives a slide's OWN part-one → part-two transition
         (login → portal, map → posture, gateway → full profile,
         portal → opened RDP). It lives entirely inside the "still"
         portion of the dwell, finishing before HOLD hands off to the
         next slide, so the two transitions can never collide. */
      const frameT = Math.min(1, Math.max(0, (t - FRAME_SWITCH_START) / (FRAME_SWITCH_END - FRAME_SWITCH_START)));

      sticky.style.setProperty("--local", local.toFixed(4));
      /* written as --frame-t-LIVE; pro.css hands it to the current slot
         only, so a slot rising into view still renders part one */
      sticky.style.setProperty("--frame-t-live", frameT.toFixed(4));
      if (idx !== lastActive) {
        lastActive = idx;
        setActive(idx);
      }
    };

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => apply(proxy.p),
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          // the exact distance the sticky element can travel
          end: () => `+=${outer.offsetHeight - sticky.offsetHeight}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          /* `delay` matters more than it looks: snapping the instant
             scrolling stops fights a reader who is still moving. It
             waits for the scroll to actually settle first. */
          snap: {
            snapTo: SNAP_POINTS,
            duration: { min: 0.2, max: 0.5 },
            delay: 0.09,
            ease: "power1.inOut",
          },
        },
      });
    }, outer);

    return () => ctx.revert();
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
