"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";

/* ============================================================
   OneLoginRace — the SSO hero centerpiece. Split-screen timed
   comparison inside an `.iz`-language console window (chrome +
   dots, matches IzConsole's feel). Left queues six logins one
   at a time (with a password-reset detour on the 4th); right
   does one login, then unlocks all six at once.

   Timing model: a single RAF clock (`elapsed`, ms) drives every
   sub-animation deterministically — no Math.random, no per-item
   timers. `LEFT_BOUNDS` is a precomputed cumulative-time table so
   "which app is active + how far into its step" is a pure lookup.
   CSS handles the actual motion (width/opacity/transform
   transitions keyed off className), JS only decides which class
   applies at each instant. SSR-safe: initial render always shows
   elapsed=0 (queued/idle) — RAF + IntersectionObserver only start
   client-side in an effect.
   ============================================================ */

type AppDef = { id: string; name: string };

const APPS: AppDef[] = [
  { id: "mail", name: "Mail" },
  { id: "crm", name: "CRM" },
  { id: "jira", name: "Jira" },
  { id: "drive", name: "Drive" },
  { id: "erp", name: "ERP" },
  { id: "chat", name: "Chat" },
];

const DETOUR_INDEX = 3; // Drive — the 4th app in the queue
const LEFT_STEP_MS = 1400;
const DETOUR_EXTRA_MS = 2000;
const RIGHT_LOGIN_MS = 2000;
const RIGHT_STAGGER_MS = 80;
const RIGHT_DONE_MS = RIGHT_LOGIN_MS + APPS.length * RIGHT_STAGGER_MS; // 2480
const HOLD_MS = 2500;
const LEFT_FINAL_SEC = 107; // display target ~01:47
const RIGHT_FINAL_LABEL = "0:09";

const LEFT_BOUNDS: number[] = APPS.reduce<number[]>((acc, _app, i) => {
  const dur = i === DETOUR_INDEX ? LEFT_STEP_MS + DETOUR_EXTRA_MS : LEFT_STEP_MS;
  acc.push(acc[acc.length - 1] + dur);
  return acc;
}, [0]);
const LEFT_TOTAL_MS = LEFT_BOUNDS[LEFT_BOUNDS.length - 1]; // 10400
const LOOP_TOTAL_MS = LEFT_TOTAL_MS + HOLD_MS; // 12900

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function leftStepIndex(elapsed: number) {
  for (let i = 0; i < APPS.length; i++) {
    if (elapsed < LEFT_BOUNDS[i + 1]) return i;
  }
  return APPS.length - 1;
}

type LeftStatus = "user" | "pass" | "allow" | "fail" | "reset" | "success";

function leftStatus(elapsedInStep: number, isDetour: boolean): LeftStatus {
  if (elapsedInStep < 500) return "user";
  if (elapsedInStep < 1000) return "pass";
  if (!isDetour) return "allow";
  if (elapsedInStep < 1300) return "fail";
  if (elapsedInStep < 3300) return "reset";
  return "success";
}

const LEFT_STATUS_LABEL: Record<LeftStatus, string> = {
  user: "SIGNING IN…",
  pass: "VERIFYING…",
  allow: "ALLOW",
  fail: "WRONG PASSWORD",
  reset: "RESET SENT — WAITING…",
  success: "ALLOW",
};
const LEFT_STATUS_TONE: Record<LeftStatus, "dim" | "allow" | "deny"> = {
  user: "dim",
  pass: "dim",
  allow: "allow",
  fail: "deny",
  reset: "deny",
  success: "allow",
};

type RightStatus = "user" | "pass" | "mfa" | "approved";
function rightStatus(elapsed: number): RightStatus {
  if (elapsed < 500) return "user";
  if (elapsed < 1000) return "pass";
  if (elapsed < 1600) return "mfa";
  return "approved";
}
const RIGHT_STATUS_LABEL: Record<RightStatus, string> = {
  user: "SIGNING IN…",
  pass: "VERIFYING…",
  mfa: "PUSH SENT — APPROVE ON DEVICE",
  approved: "APPROVED",
};
const RIGHT_STATUS_TONE: Record<RightStatus, "dim" | "allow" | "accent"> = {
  user: "dim",
  pass: "dim",
  mfa: "accent",
  approved: "allow",
};

export function OneLoginRace() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // prefers-reduced-motion — resolved client-side, matches the
  // pattern already used by NodalField / framer's useReducedMotion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // autoplay only while scrolled into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the one clock that drives the whole timeline. setInterval (not
  // requestAnimationFrame) — rAF is suspended outright on backgrounded
  // tabs in most browsers, which would silently freeze the whole race;
  // a 50ms tick stays smooth for the CSS-transition-driven visuals here
  // (matches the setInterval convention already used by NodalField /
  // IzConsole's LiveClock elsewhere in `.iz`).
  useEffect(() => {
    if (reduced || !inView || paused) return;
    let last = Date.now();
    const id = setInterval(() => {
      const now = Date.now();
      const dt = now - last;
      last = now;
      setElapsed((prev) => {
        const next = prev + dt;
        return next >= LOOP_TOTAL_MS ? 0 : next;
      });
    }, 50);
    return () => clearInterval(id);
  }, [reduced, inView, paused]);

  const replay = () => setElapsed(0);

  const leftFrac = reduced ? 1 : Math.min(1, elapsed / LEFT_TOTAL_MS);
  const rightFrac = reduced ? 1 : Math.min(1, elapsed / RIGHT_DONE_MS);
  const leftSec = Math.round(leftFrac * LEFT_FINAL_SEC);
  const leftDone = reduced || elapsed >= LEFT_TOTAL_MS;
  const rightDone = reduced || elapsed >= RIGHT_DONE_MS;
  const holdPhase = reduced || elapsed >= LEFT_TOTAL_MS;
  const activeLeftIndex = leftStepIndex(elapsed);
  const unlockedCount = reduced
    ? APPS.length
    : elapsed < RIGHT_LOGIN_MS
    ? 0
    : Math.min(APPS.length, Math.floor((elapsed - RIGHT_LOGIN_MS) / RIGHT_STAGGER_MS) + 1);
  const rStatus = reduced ? "approved" : rightStatus(Math.min(elapsed, RIGHT_LOGIN_MS));
  const loginCollapsed = reduced || elapsed >= RIGHT_LOGIN_MS;

  return (
    <div
      ref={rootRef}
      id="olr-race"
      className={`olr-win iz-fx-card${reduced ? " olr-static" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="olr-chrome">
        <span className="olr-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="olr-chrome-title">one-login-race.sh</span>
        <button type="button" className="olr-replay" onClick={replay} aria-label="Replay the race">
          <ArrowCounterClockwise weight="bold" />
          replay
        </button>
      </div>

      <div className="olr-body">
        {/* ---------------- WITHOUT SSO ---------------- */}
        <div className="olr-panel">
          <div className="olr-panel-head">
            <span className="olr-label">Without SSO</span>
            <span className="olr-timer">{fmt(leftSec)}</span>
          </div>
          <div className="olr-queue">
            {APPS.map((app, i) => {
              const isDetour = i === DETOUR_INDEX;
              const state = leftDone || i < activeLeftIndex ? "done" : i === activeLeftIndex ? "active" : "queued";
              const elapsedInStep = Math.max(0, elapsed - LEFT_BOUNDS[i]);
              const status = leftStatus(elapsedInStep, isDetour);
              const barFilled = state === "done" || elapsedInStep >= 500;
              const dotsOn = state === "done" || elapsedInStep >= 1000;
              return (
                <div key={app.id} className={`olr-tile ${state}`}>
                  <div className="olr-tile-head">
                    <span className="olr-tile-idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="olr-tile-name">{app.name}</span>
                    {state === "done" && <span className="olr-tile-tick">✓</span>}
                  </div>
                  {state === "active" && (
                    <div className="olr-form">
                      <div className="olr-field">
                        <span className="olr-field-lbl">user</span>
                        <span className="olr-bar">
                          <span className={`olr-bar-fill${barFilled ? " on" : ""}`} />
                        </span>
                      </div>
                      <div className="olr-field">
                        <span className="olr-field-lbl">pass</span>
                        <span className="olr-dots-row">
                          {[0, 1, 2, 3, 4].map((d) => (
                            <span
                              key={d}
                              className={`olr-dot${dotsOn ? " on" : ""}`}
                              style={{ transitionDelay: dotsOn ? `${d * 70}ms` : "0ms" }}
                            />
                          ))}
                        </span>
                      </div>
                      <span className={`olr-status ${LEFT_STATUS_TONE[status]}`}>{LEFT_STATUS_LABEL[status]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="olr-finish">{leftDone && <span className="olr-chip deny final">{fmt(LEFT_FINAL_SEC)}</span>}</div>
        </div>

        <div className="olr-divider" aria-hidden />

        {/* ---------------- WITH INSTASAFE ---------------- */}
        <div className="olr-panel">
          <div className="olr-panel-head">
            <span className="olr-label">With InstaSafe</span>
            <span className="olr-timer accent">{rightDone ? RIGHT_FINAL_LABEL : fmt(Math.round(rightFrac * 9))}</span>
          </div>

          <div className={`olr-single ${loginCollapsed ? "done" : ""}`}>
            {!loginCollapsed ? (
              <div className="olr-form">
                <div className="olr-field">
                  <span className="olr-field-lbl">user</span>
                  <span className="olr-bar">
                    <span className={`olr-bar-fill${elapsed >= 500 ? " on" : ""}`} />
                  </span>
                </div>
                <div className="olr-field">
                  <span className="olr-field-lbl">pass</span>
                  <span className="olr-dots-row">
                    {[0, 1, 2, 3, 4].map((d) => (
                      <span
                        key={d}
                        className={`olr-dot${elapsed >= 1000 ? " on" : ""}`}
                        style={{ transitionDelay: elapsed >= 1000 ? `${d * 70}ms` : "0ms" }}
                      />
                    ))}
                  </span>
                </div>
                <span className={`olr-status ${RIGHT_STATUS_TONE[rStatus]}`}>{RIGHT_STATUS_LABEL[rStatus]}</span>
              </div>
            ) : (
              <div className="olr-single-done">
                <span className="olr-tile-tick">✓</span>
                <span>One login, completed</span>
              </div>
            )}
          </div>

          <div className="olr-cascade">
            {APPS.map((app, i) => {
              const unlocked = i < unlockedCount;
              return (
                <div
                  key={app.id}
                  className={`olr-ctile${unlocked ? " unlocked" : ""}`}
                  style={{ transitionDelay: unlocked ? `${(i % APPS.length) * 10}ms` : "0ms" }}
                >
                  <span className="olr-tile-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="olr-tile-name">{app.name}</span>
                  {unlocked && <span className="olr-tile-tick">✓</span>}
                </div>
              );
            })}
          </div>

          <div className="olr-finish">{rightDone && <span className="olr-chip allow final">DONE — {RIGHT_FINAL_LABEL}</span>}</div>
        </div>
      </div>

      {holdPhase && (
        <div className="olr-stat">
          One login. <em>Everything you&apos;re allowed.</em>
        </div>
      )}
    </div>
  );
}
