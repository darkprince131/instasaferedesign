"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./problemsolution.css";

/* ============================================================
   InstaSafe homepage hero — the doorway portal.

   GEOMETRY CONTRACT
   Desktop plate 1672x941 (16:9), mobile plate 1086x1448 (3:4).
   They are DIFFERENT compositions with separate anchor sets.

   Every overlay positions off the --p-* custom properties in
   iz-hero-portal.css, which were measured from the plates by
   pixel-scan (see _measure.mjs / _panels.mjs / _groove.mjs in the
   repo root — throwaway scripts, safe to delete). No overlay
   carries a magic number.

   The anchors stay locked to the IMAGE, not the viewport, because
   both the <picture> and every overlay live inside `.ihp-frame`,
   a box that reproduces `object-fit: cover` in layout using
   container-query units. `width: max(100cqw, var(--p-ar) * 1cqh)`
   is exactly the size a cover-fitted image resolves to, so a child
   at `left: var(--p-portal-l)` sits on the portal jamb at every
   aspect ratio and every crop.
   ============================================================ */

type Theme = "dark" | "paper";

/* Kept deliberately short — the recessed display is only 13.16% of frame
   width, so longer strings wrapped and spilled past the glass. */
const ROWS = [
  { k: "Identity", ok: "verified", bad: "verified" },
  { k: "Device", ok: "25/25 checks", bad: "not enrolled" },
  { k: "Policy", ok: "144 rules", bad: "" },
  { k: "Tunnel", ok: "finance-app", bad: "" },
];

/* Traced off the plate: reader -> down the wall -> floor -> threshold. */
/* Traced by hand on the plate via /hero-calibrate. The groove is a
   channel in PERSPECTIVE, not a flat L: down the wall (356,536 -> 354,734),
   out to the near-left corner (244,789), across the front edge (836,789),
   then back up the right side toward the threshold (834,730). A pixel scan
   could not distinguish those slanted edges from floor seams — this is the
   authored geometry, so re-trace it in the tool if the plate changes. */
const PATH_D = "M 356 536 L 354 734 L 244 789 L 836 789 L 834 730";
const DESK_W = 1672;
const DESK_H = 941;

const IcCheck = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IcCross = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

type Phase = "idle" | "run" | "granted" | "denied";

export function IzHeroPortal({ theme }: { theme: Theme }) {
  const pulseRef = useRef<SVGPathElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const token = useRef(0);

  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [scan, setScan] = useState(false);
  const [rows, setRows] = useState(0);
  const [deny, setDeny] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMobile(mq.matches);
      setReduced(rm.matches);
    };
    sync();
    mq.addEventListener?.("change", sync);
    rm.addEventListener?.("change", sync);
    return () => {
      mq.removeEventListener?.("change", sync);
      rm.removeEventListener?.("change", sync);
    };
  }, []);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const resolve = useCallback((mode: "allow" | "deny") => {
    setDeny(mode === "deny");
    setScan(false);
    setRows(mode === "allow" ? ROWS.length : 2);
    setPhase(mode === "allow" ? "granted" : "denied");
    const p = pulseRef.current;
    if (p) {
      p.style.transition = "none";
      p.style.strokeDashoffset = mode === "allow" ? "0" : `${(p.getTotalLength() || 0) * 0.42}`;
    }
  }, []);

  const run = useCallback(
    (mode: "allow" | "deny") => {
      const t = ++token.current;
      const alive = () => token.current === t;
      clear();

      // Reduced motion is the only case that skips straight to the end.
      if (reduced) {
        resolve(mode);
        return;
      }

      setDeny(mode === "deny");
      setPhase("run");
      setRows(0);
      // Scan sweep and the floor pulse are desktop-only; mobile shows no
      // path at all, but it still plays the row-by-row check run.
      setScan(!mobile);

      const p = mobile ? null : pulseRef.current;
      const len = p?.getTotalLength() ?? 0;
      if (p) {
        p.style.transition = "none";
        p.style.strokeDasharray = `${len} ${len}`;
        p.style.strokeDashoffset = `${len}`;
        void p.getBoundingClientRect();
      }

      const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(() => alive() && fn(), ms));

      if (!mobile) {
        at(520, () => setScan(false));
        at(560, () => {
          if (!p) return;
          p.style.transition = `stroke-dashoffset ${mode === "deny" ? 900 : 2300}ms cubic-bezier(0.3,0,0,1)`;
          // Deny: stop dead at the junction and HOLD (partial offset, no fade).
          p.style.strokeDashoffset = mode === "deny" ? `${len * 0.42}` : "0";
        });
      }

      // Paced so each row can actually be read as it lands — the previous
      // 300ms cadence resolved before a visitor could register it.
      const t0 = mobile ? 260 : 820;
      const step = 620;
      if (mode === "allow") {
        [0, 1, 2, 3].forEach((i) => at(t0 + i * step, () => setRows(i + 1)));
        at(t0 + 4 * step, () => setPhase("granted"));
      } else {
        at(t0, () => setRows(1));
        at(t0 + step, () => setRows(2));
        at(t0 + step + 420, () => setPhase("denied"));
      }
    },
    [mobile, reduced, resolve]
  );

  // Kick off after the plate has decoded, never before LCP paints.
  // Mobile does NOT auto-run: the verdict is hidden until the first tap,
  // and reduced-motion still resolves so the end state is what is shown.
  useEffect(() => {
    if (mobile) return;
    let dead = false;
    let fired = false;
    const img = document.querySelector<HTMLImageElement>(".ihp-plate");
    const kick = () => {
      if (dead || fired) return;
      fired = true;
      run("allow");
    };
    const go = () => {
      if (dead || fired) return;
      // rAF is the primary trigger, but it is PARKED in a hidden or
      // non-compositing tab — gating solely on it leaves the hero stuck
      // in its idle state forever. decode() has already resolved by here,
      // so the plate is painted either way.
      requestAnimationFrame(kick);
      window.setTimeout(kick, 250);
    };
    // `decode()` resolves whether or not the load event was already
    // missed, which a bare load listener does not — the image can finish
    // between mount and listener attach, leaving the sequence stuck idle.
    if (img) {
      img.decode().then(go).catch(go);
      if (img.complete) go();
      img.addEventListener("load", go, { once: true });
    }
    const safety = window.setTimeout(go, 1500);
    return () => {
      dead = true;
      clearTimeout(safety);
      clear();
      img?.removeEventListener("load", go);
    };
  }, [run, mobile]);

  // Mobile: the run starts when the check panel scrolls into view. No tap,
  // no timeline before that — the visitor simply arrives and watches it go.
  useEffect(() => {
    if (!mobile) return;
    const el = consoleRef.current;
    if (!el) return;
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      run("allow");
    };
    if (typeof IntersectionObserver === "undefined") {
      start();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        start();
      },
      { threshold: 0.55 }
    );
    io.observe(el);
    // Fallback: the panel sits inside the hero, so on most phones it is
    // already on screen and IO resolves at once — but IO does not fire in a
    // non-rendering tab, and a run that never starts would leave the checks
    // stuck on "pending" forever.
    const safety = window.setTimeout(start, 2500);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [mobile, run]);

  const resolved = phase === "granted" || phase === "denied";
  const dark = theme === "dark";
  const base = dark ? "/hero/hero-dark" : "/hero/hero-light";

  return (
    <section className="iz-hero2" data-phase={phase} data-deny={deny || undefined}>
      <div className="ihp-frame">
        <picture>
          <source media="(max-width: 767px)" srcSet={`${base}-mobile.avif`} type="image/avif" />
          <source media="(max-width: 767px)" srcSet={`${base}-mobile.webp`} type="image/webp" />
          <source srcSet={`${base}-desktop.avif`} type="image/avif" />
          <source srcSet={`${base}-desktop.webp`} type="image/webp" />
          <img
            className="ihp-plate"
            src={`${base}-desktop.webp`}
            alt=""
            width={DESK_W}
            height={DESK_H}
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/* Light path — desktop only, hidden below 768 in CSS. Same
            positioned box, same fit, so it cannot drift on crop. */}
        <svg
          className="ihp-svg"
          viewBox={`0 0 ${DESK_W} ${DESK_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path className="ihp-track" d={PATH_D} fill="none" />
          <path className="ihp-pulse" ref={pulseRef} d={PATH_D} fill="none" />
        </svg>

        {/* ---- content. The eyebrow is a sibling of the stack so mobile can
                park it on the wall above the lintel while the whole stack
                (h1 -> sub -> CTAs) sits inside the door's upper panel. On
                desktop .ihp-stack is `display: contents`, so it is one flow. ---- */}
        <div className="ihp-copy">
          <span className="ihp-eyebrow">Zero trust network access</span>
          <div className="ihp-stack">
            <h1 className="ihp-h1">
              Secure access without slowing <em>work.</em>
            </h1>
            <p className="ihp-sub">
              InstaSafe checks identity, device and policy on every request — and logs the decision in a format your
              auditor can read.
            </p>
            <div className="ihp-ctas">
              <a href="/book-a-demo" className="ihp-btn ihp-btn-pri">
                Book a demo
              </a>
              <a href="#how" className="ihp-btn ihp-btn-ghost">
                See how it works
              </a>
            </div>
            {/* Desktop only — it triggers the deny run, which mobile has no
                timeline for, so it would be a dead control there. */}
            {!mobile && (
              <button type="button" className="ihp-ghost" onClick={() => run("deny")}>
                Try it with an unmanaged device <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>

        {/* ---- reader button + verdict panel, left wall ---- */}
        <button
          type="button"
          className="ihp-reader"
          data-scan={scan || undefined}
          // Desktop: the reader is the trigger, it runs the allow sequence.
          // Mobile: it is the ONLY control, so it toggles the outcome.
          onClick={() => run(mobile && phase === "granted" ? "deny" : "allow")}
          aria-label={mobile ? "Toggle the access decision" : "Run the access check"}
        >
          {/* Affordance: the plate's reader is a small dark panel and gave no
              hint it was interactive. A lit scan glyph plus a slow halo marks
              it as the thing to press; the halo stops once it has been used. */}
          <span className="ihp-reader-glyph" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4a8 8 0 0 0-8 8" />
              <path d="M12 8a4 4 0 0 0-4 4v3" />
              <path d="M12 12v4" />
              <path d="M16 12a4 4 0 0 0-4-4" />
              <path d="M20 12a8 8 0 0 0-8-8" />
            </svg>
          </span>
          <span className="ihp-reader-halo" aria-hidden="true" />
        </button>

        {/* On mobile the plate's reader sits outside the visible crop once
            the frame is centred on the text panel, so the verdict panel
            itself becomes the toggle. On desktop it stays inert (the reader
            is the trigger) and is skipped in the tab order. */}
        <button
          type="button"
          className={`ihp-verdict${resolved ? " show" : ""}`}
          aria-live="polite"
          tabIndex={mobile ? 0 : -1}
          aria-label={mobile ? "Toggle the access decision" : undefined}
          onClick={() => mobile && run(phase === "granted" ? "deny" : "allow")}
        >
          {resolved && (
            <>
              <span className="ihp-verdict-ic">{phase === "granted" ? IcCheck : IcCross}</span>
              <span className="ihp-verdict-txt">
                <b>{phase === "granted" ? "Access granted" : "Access denied"}</b>
                <i>{phase === "granted" ? "38 ms · logged" : "policy 47 · logged"}</i>
              </span>
            </>
          )}
        </button>

        {/* ---- console, inside the recessed right-wall display.
                Reuses C14's row mechanics + styling. No chrome. ---- */}
        <div className="ihp-console" ref={consoleRef}>
          <ul className="ps-steps2">
            {ROWS.map((r, i) => {
              const n = i + 1;
              const isDone = rows >= n;
              const isFail = deny && n === 2 && isDone;
              const isRunning = phase === "run" && rows === i;
              const state = isFail ? "fail" : isDone ? "done" : isRunning ? "running" : "pending";
              return (
                <li key={r.k} className={`ps-step2 ${state}`}>
                  <span className="ic">
                    {isFail ? (
                      <span className="chk fail">{IcCross}</span>
                    ) : isDone ? (
                      <span className="chk">{IcCheck}</span>
                    ) : isRunning ? (
                      <span className="spin" />
                    ) : (
                      <span className="ring" />
                    )}
                  </span>
                  <span className="lbl">
                    {r.k} · {isFail ? r.bad : isDone ? r.ok : "pending"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
