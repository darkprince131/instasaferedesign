"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Copy } from "@phosphor-icons/react";
import { SLIDES, type Slide } from "./pro.config";
import { IzProPanel } from "./IzProPanel";

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

function Aside({ slide }: { slide: Slide }) {
  const a = slide.aside;
  if (!a) return null;
  if (a.kind === "command")
    return (
      <span className="izpro-cmd">
        <code>{a.text}</code>
        <Copy aria-hidden="true" />
      </span>
    );
  if (a.kind === "link")
    return (
      <a className="izpro-link" href={a.href}>
        {a.label}
        <ArrowUpRight weight="bold" aria-hidden="true" />
      </a>
    );
  return (
    <figure className="izpro-quote">
      <blockquote>{a.text}</blockquote>
      <figcaption>{a.who}</figcaption>
    </figure>
  );
}

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

      sticky.style.setProperty("--local", local.toFixed(4));
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
          <div className="iz-wrap izpro-cols">
            {/* left column swaps content on the active index only */}
            <div className="izpro-left" key={slide.id}>
              <span className="izpro-eyebrow">
                <b>
                  {num(active)}/{num(N - 1)}
                </b>
                {slide.eyebrow}
              </span>
              <h2 className="izpro-h2">{slide.title}</h2>
              <Aside slide={slide} />
            </div>

            {/* right column: absolutely stacked slots */}
            <div className="izpro-right">
              {SLIDES.map((s, i) => {
                const state = i === active ? "current" : i === active + 1 ? "next" : i < active ? "past" : "future";
                return (
                  <div key={s.id} className="izpro-slot" data-state={state}>
                    <IzProPanel panel={s.panel} />
                    <Floats slide={s} />
                    <p className="izpro-body">
                      <b>{s.body.lead}</b> {s.body.rest}
                    </p>
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
            <Aside slide={s} />
          </li>
        ))}
      </ol>
    </section>
  );
}
