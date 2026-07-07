"use client";

import { useEffect, useRef, useState } from "react";
import { Plugs, SlidersHorizontal, EyeSlash, ShieldCheck, ListChecks, type Icon } from "@phosphor-icons/react";

/* ============================================================
   C-new · Scroll Steps — a scroll-driven rotating dial that
   SNAPS between whole steps (never rests half-way). Scroll
   advances 1 → 2 → 3…; an autoplay timer advances on its own
   (the connector doubles as the progress bar). The centre SVG
   changes to represent the active step, linked by the bar back
   up to the active number.

   FULLY CUSTOMISABLE — edit the STEPS array (add / remove
   freely; the dial re-distributes). Tune with GAP / VH_PER_STEP
   / AUTO_MS and the --cy/--R CSS vars.

   Accessibility: subtle "Skip" link, reduced-motion fallback to
   a plain list, full step list always in the DOM for SR.
   ============================================================ */

interface Step { title: string; body: string; icon: Icon; }

const STEPS: Step[] = [
  { title: "Connect",  body: "Plug in the identity provider you already use. No agents to image, no network changes — you're set up in minutes.", icon: Plugs },
  { title: "Define",   body: "Map who reaches which app, then set device, location and risk rules in plain language. No firewall tickets.",       icon: SlidersHorizontal },
  { title: "Conceal",  body: "Your apps go dark to the internet. Nothing is exposed, nothing is scannable, nothing for attackers to find.",        icon: EyeSlash },
  { title: "Verify",   body: "Every request is checked — identity, device health and context — before access is ever granted. Then re-checked.",    icon: ShieldCheck },
  { title: "Watch",    body: "See every allow and deny live, and stream it straight to your SIEM. Full proof, all the time.",                       icon: ListChecks },
];

const GAP = 54;          // degrees between adjacent steps on the dial
const VH_PER_STEP = 78;  // scroll height (in vh) allotted per step
const AUTO_MS = 3600;    // autoplay dwell per step

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function ScrollSteps() {
  const N = STEPS.length;
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [hover, setHover] = useState(false);
  const autoScrolling = useRef(false);

  // poll position each frame while in view → derive the SNAPPED active step
  useEffect(() => {
    const wrap = wrapRef.current;
    if (reduced || !wrap) return;
    let running = false;
    let rafId = 0;
    const tick = () => {
      const total = wrap.offsetHeight - window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      const prog = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      const na = clamp(Math.round(prog * (N - 1)), 0, N - 1);
      setActive((p) => (p !== na ? na : p));
      const pin = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      setPinned((p) => (p !== pin ? pin : p));
      if (running) rafId = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; rafId = requestAnimationFrame(tick); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(rafId); }
    });
    io.observe(wrap);
    return () => { running = false; cancelAnimationFrame(rafId); io.disconnect(); };
  }, [reduced, N]);

  function scrollToStep(k: number) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const total = wrap.offsetHeight - window.innerHeight;
    const wrapTop = window.scrollY + wrap.getBoundingClientRect().top;
    autoScrolling.current = true;
    window.scrollTo({ top: wrapTop + (k / (N - 1)) * total, behavior: "smooth" });
    window.setTimeout(() => { autoScrolling.current = false; }, 800);
  }

  function skip() {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const y = window.scrollY + wrap.getBoundingClientRect().bottom - window.innerHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const playing = pinned && !hover && !reduced;
  const barPlaying = playing && active < N - 1;   // last step: stop (no scroll-trap)

  /* ---- reduced-motion / fallback: plain numbered list ---- */
  if (reduced) {
    return (
      <div className="sw-wrap sw-static">
        <div className="sw-head">
          <span className="iz-ey">How it works</span>
          <h2 className="iz-h2">Five steps to <em>zero-trust access</em>.</h2>
        </div>
        <ol className="sw-list">
          {STEPS.map((s, i) => (
            <li key={i}>
              <span className="sw-li-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="sw-li-ic"><s.icon weight="regular" /></span>
              <span>
                <span className="sw-li-t">{s.title}</span>
                <span className="sw-li-b">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const Ic = STEPS[active].icon;

  return (
    <div className="sw-wrap" ref={wrapRef} style={{ height: `${N * VH_PER_STEP}vh` }}>
      <div className="sw-pin" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="sw-stage">
          <div className="sw-head">
            <span className="iz-ey">How it works</span>
            <h2 className="iz-h2">Zero-trust access, <em>step by step</em>.</h2>
          </div>

          <button className="sw-skip" onClick={skip}>Skip section ↓</button>

          <div className="sw-ring" aria-hidden="true" />

          {/* rotating nodes — SNAP to the active step (CSS transition tweens the jump) */}
          <div className="sw-dial" aria-hidden="true">
            {STEPS.map((_, i) => {
              const a = (i - active) * GAP;
              const op = i === active ? 1 : clamp(1 - Math.abs(a) / 120, 0, 1);
              return (
                <span key={i} className={`sw-node${i === active ? " on" : ""}`} style={{ ["--a" as string]: `${a}deg`, opacity: op }}>
                  {i + 1}
                </span>
              );
            })}
          </div>

          {/* centre — connector/progress bar links number → icon → content */}
          <div className="sw-center">
            <span className="sw-track" aria-hidden="true">
              <span
                className="sw-fill"
                key={active}
                style={{ ["--auto" as string]: `${AUTO_MS}ms`, animationPlayState: barPlaying ? "running" : "paused" }}
                onAnimationEnd={() => { if (barPlaying) scrollToStep(active + 1); }}
              />
            </span>
            <span className="sw-ico" key={`ic${active}`}><Ic weight="regular" /></span>
            <div className="sw-content" key={active}>
              <h3 className="sw-title">{STEPS[active].title}</h3>
              <p className="sw-body">{STEPS[active].body}</p>
            </div>
            <span className="sw-counter">{String(active + 1).padStart(2, "0")} <i>/</i> {String(N).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <ol className="sw-sr">
        {STEPS.map((s, i) => (<li key={i}>{`Step ${i + 1}: ${s.title}. ${s.body}`}</li>))}
      </ol>
    </div>
  );
}
