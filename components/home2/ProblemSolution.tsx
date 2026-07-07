"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   C14 · Problem / Solution Split.
   Left = the old manual / VPN way (problem). Right = InstaSafe
   just does it (solution), on a highlighted warm panel.
   Interaction: click "Grant access" → a terminal-style run
   plays out — each step spins, then flips to a green check —
   ending in an "all checks passed" summary.
   ============================================================ */

const IcClock = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const IcBroken = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 16l4-4 3 3" />
    <path d="M14 14l2-2 5 5" />
    <path d="M4 4l16 16" />
  </svg>
);
const IcDiamond = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3.2 20.8 12 12 20.8 3.2 12z" />
  </svg>
);
const IcArrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" opacity="0.45" />
    <path d="M9 12h6M13 9l3 3-3 3" />
  </svg>
);
const IcCheck = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IcReplay = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 3-6.7M3 4.5v4h4" />
  </svg>
);

const STEPS = [
  "Identity verified · SSO",
  "Device posture · 25 / 25 checks",
  "Encrypted tunnel open · finance-app only",
  "Session recording on · streaming to SIEM",
];
const STEP_MS = 900;

type Phase = "idle" | "running" | "done";

export function ProblemSolution() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0); // completed steps
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const start = () => {
    if (timer.current) clearInterval(timer.current);
    setPhase("running");
    setProgress(0);
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(STEPS.length);
      setPhase("done");
      return;
    }
    let p = 0;
    timer.current = setInterval(() => {
      p += 1;
      setProgress(p);
      if (p >= STEPS.length) {
        if (timer.current) clearInterval(timer.current);
        setPhase("done");
      }
    }, STEP_MS);
  };
  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    setPhase("idle");
    setProgress(0);
  };
  useEffect(() => () => clearInterval(timer.current), []);

  const running = phase !== "idle";

  return (
    <div className={`ps ${running ? "active" : ""}`}>
      {/* ---------- PROBLEM ---------- */}
      <div className="ps-half problem">
        <span className="ps-ey bad">The old way · VPN &amp; tickets</span>
        <h3 className="ps-title">You wire up access by hand.</h3>

        <div className="ps-doc" aria-hidden="true">
          <div className="ps-bar">
            <span className="d">
              <i />
              <i />
              <i />
            </span>
            <span className="url">admin.acme.com/vpn/finance-subnet</span>
          </div>
          <div className="ps-doc-body">
            <div className="ps-doc-h">
              <h4>Grant Sarah finance access</h4>
              <span className="ps-stale">{IcClock} Opened 6 days ago</span>
            </div>
            <div className="ps-broken">
              {IcBroken}
              404 · firewall-rules.xlsx
            </div>
            <ol className="ps-steps">
              <li>Raise a firewall ticket for Sarah&apos;s IP range.</li>
              <li>Add her to the finance VPN profile and subnet.</li>
              <li>Remember to revoke it when she changes teams.</li>
            </ol>
            <div className="ps-doc-foot">
              <span>Who can reach this today?</span>
              <span>Last reviewed 9 months ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- SOLUTION ---------- */}
      <div className="ps-half solution">
        <span className="ps-ey good">InstaSafe · Zero Trust</span>
        <h3 className="ps-title">
          InstaSafe <em>just does it</em>.
        </h3>

        <div className="ps-chat">
          <div className="ps-chat-body">
            <span className="ps-chat-ic">{IcDiamond}</span>
            <div className="ps-chat-msg" aria-live="polite">
              {!running ? (
                <>
                  I&apos;ll give <span className="ps-chip">sarah@acme.com</span> the finance app only — device-checked,
                  recorded, and with no network access. Go ahead?
                </>
              ) : (
                <>
                  <div className="ps-run-h">
                    Provisioning <span className="ps-chip">sarah@acme.com</span> → <span className="ps-chip">finance-app</span>
                  </div>
                  <ul className="ps-steps2">
                    {STEPS.map((s, i) => {
                      const state = i < progress ? "done" : i === progress && phase === "running" ? "running" : "pending";
                      return (
                        <li key={s} className={`ps-step2 ${state}`}>
                          <span className="ic">
                            {state === "done" ? (
                              <span className="chk">{IcCheck}</span>
                            ) : state === "running" ? (
                              <span className="spin" />
                            ) : (
                              <span className="ring" />
                            )}
                          </span>
                          <span className="lbl">{s}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className={`ps-summary ${phase === "done" ? "show" : ""}`}>
                    <span className="big">{IcCheck}</span>
                    <div>
                      <div className="t">Least-privilege session is live.</div>
                      <div className="s">
                        {STEPS.length} of {STEPS.length} checks passed
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="ps-chat-foot">
            {phase === "done" ? (
              <button className="ps-reset" onClick={reset}>
                {IcReplay} Run again
              </button>
            ) : (
              <span className="ps-pwr">Enforced by InstaSafe</span>
            )}
            {phase === "idle" && (
              <button className="ps-btn" onClick={start}>
                Grant access {IcArrow}
              </button>
            )}
            {phase === "running" && (
              <button className="ps-btn" disabled>
                <span className="mini-spin" /> Granting…
              </button>
            )}
            {phase === "done" && (
              <button className="ps-btn done" style={{ backgroundColor: "var(--allow)", boxShadow: "none" }} disabled>
                {IcCheck} Granted
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
