"use client";

import { CheckCircle, Warning, Key, SpinnerGap, ShieldCheck, Cursor } from "@phosphor-icons/react";

/* ============================================================
   IzMocks — the animation sub-components  (lab 00an)

   Small product mock-ups that sit inside a section's cells or
   cards. Each one has ONE specialty and the specialty is the
   argument it makes:

     MockWelcome  — RESOLUTION. Arrives already recognised. Nothing
                    is asked of the person. The animation is over
                    before it starts, which is the point.
     MockChallenge— ESCALATION. A challenge appears and is answered.
                    Motion is forward but interrupted.
     MockLoop     — REPETITION THAT NEVER RESOLVES. The cursor
                    clicks, the error returns, the cursor clicks
                    again. It must NOT succeed — a loop that
                    resolves says the attacker got in.
     MockVerify   — PROGRESS TO A VERDICT. A bar fills, an identity
                    resolves, a green line lands underneath.
     MockInspect  — INSPECTION. Something is examined in place and a
                    finding surfaces over it.

   Motion contract, uniform across all five:
     - every animation is paused by default and runs only when an
       ancestor carries `.is-live` (set on hover by the section, and
       permanently on touch — see izmocks.css)
     - nothing here loops infinitely except MockLoop, whose whole
       meaning is the loop
     - `prefers-reduced-motion` freezes every one at its END state,
       never mid-way, so the mock still reads as a finished thought
   ============================================================ */

function Chrome({ url, dot }: { url: string; dot?: boolean }) {
  return (
    <div className="izm-chrome">
      <span className="izm-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {dot && <span className="izm-livedot" aria-hidden="true" />}
      <span className="izm-url">{url}</span>
    </div>
  );
}

/* ---------- 1. resolution ---------- */

export function MockWelcome({ url = "app.acme.in/login", who = "Anita Rao", meta = "14 verified visits" }) {
  return (
    <div className="izm izm-welcome">
      <Chrome url={url} />
      <div className="izm-body">
        <span className="izm-pill t-allow">
          <ShieldCheck weight="fill" aria-hidden="true" />
          Recognised trusted device
        </span>
        <span className="izm-hi">Welcome back,</span>
        <span className="izm-person">
          <i aria-hidden="true">{who.charAt(0)}</i>
          <b>{who}</b>
          <em>{meta}</em>
        </span>
      </div>
      <span className="izm-verdict t-allow">
        Instant access
        <CheckCircle weight="fill" aria-hidden="true" />
      </span>
    </div>
  );
}

/* ---------- 2. escalation ---------- */

export function MockChallenge({ url = "app.acme.in/verify", digits = ["4", "7", "2"] }) {
  return (
    <div className="izm izm-challenge">
      <Chrome url={url} />
      <div className="izm-body">
        <span className="izm-pill t-warn">
          <Warning weight="fill" aria-hidden="true" />
          Unusual location for this device
        </span>
        <span className="izm-label">Enter verification code</span>
        <span className="izm-sent">Sent to +91 ••••• 43210</span>
        <span className="izm-otp">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <i key={i} style={{ ["--i" as string]: i } as React.CSSProperties}>
              {digits[i] ?? ""}
            </i>
          ))}
        </span>
      </div>
      <span className="izm-verdict t-warn">
        Step-up required
        <Key weight="fill" aria-hidden="true" />
      </span>
    </div>
  );
}

/* ---------- 3. repetition that never resolves ---------- */

export function MockLoop({ url = "app.acme.in/sign-in", tag = "unknown device" }) {
  return (
    <div className="izm izm-loop">
      <Chrome url={url} />
      <div className="izm-body">
        <span className="izm-label">Sign in</span>
        <span className="izm-field">user@example.com</span>
        <span className="izm-field izm-field--bad">
          <span className="izm-mask">•••••••••</span>
          <Warning weight="fill" aria-hidden="true" />
        </span>
        <span className="izm-btn izm-btn--bad">Sign in</span>
      </div>
      {/* the cursor that keeps trying — the ONE looping animation */}
      <span className="izm-ghost" aria-hidden="true">
        <Cursor weight="fill" />
        <i>{tag}</i>
      </span>
    </div>
  );
}

/* ---------- 4. progress to a verdict ---------- */

export function MockVerify({ name = "svc-runner", sub = "Signed · allow-listed" }) {
  return (
    <div className="izm izm-verify">
      <span className="izm-progress" aria-hidden="true">
        <i />
      </span>
      <div className="izm-body">
        <span className="izm-idrow">
          <i className="izm-avatar" aria-hidden="true">
            <SpinnerGap weight="bold" />
          </i>
          <span className="izm-idtext">
            <b>{name}</b>
            <em>{sub}</em>
          </span>
        </span>
      </div>
      <span className="izm-foot t-allow">
        Verified service identity
        <CheckCircle weight="fill" aria-hidden="true" />
      </span>
    </div>
  );
}

/* ---------- 5. inspection ---------- */

export function MockInspect({ url = "payroll.acme.in/run", rows = ["April pay run", "1,284 employees", "Bank file"] }) {
  return (
    <div className="izm izm-inspect">
      <Chrome url={url} dot />
      <div className="izm-body">
        <span className="izm-label">Approve pay run</span>
        {rows.map((r, i) => (
          <span key={r} className="izm-line" style={{ ["--i" as string]: i } as React.CSSProperties}>
            {r}
          </span>
        ))}
        <span className="izm-btn">Approve</span>
      </div>
      <span className="izm-scan" aria-hidden="true">
        <SpinnerGap weight="bold" />
        Checking posture
      </span>
    </div>
  );
}

/* ---------- registry ----------
   Sections reference mocks by key so their config stays plain data
   and never imports components. Add a mock here and it is available
   to every section at once. */

export const MOCKS = {
  welcome: MockWelcome,
  challenge: MockChallenge,
  loop: MockLoop,
  verify: MockVerify,
  inspect: MockInspect,
} as const;

export type MockKey = keyof typeof MOCKS;

export function Mock({ kind }: { kind: MockKey }) {
  const C = MOCKS[kind];
  return <C />;
}
