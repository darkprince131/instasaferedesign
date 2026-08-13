"use client";

import {
  CheckCircle,
  Warning,
  Key,
  SpinnerGap,
  ShieldCheck,
  Cursor,
  Clock,
  DeviceMobile,
  Fingerprint,
  Laptop,
  Envelope,
  ChatText,
  type Icon,
} from "@phosphor-icons/react";

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

/* The tag USED to read "unknown device". It cannot: device binding now
   has a card of its own two along, and two cards in one library failing
   for the same reason makes the second one look like a repeat rather
   than a second argument. This card is about credential stuffing, so
   its failure is credential-shaped. */
export function MockLoop({ url = "app.acme.in/sign-in", tag = "breached password" }) {
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


/* ---------- 6. the door holds the factors ----------
   THE BEAT THAT CARRIES THIS CARD IS THE URL NOT CHANGING. A factor
   tray rises inside the same window; there is no second page and no
   separate MFA portal, so animating a page transition here would say
   the exact opposite of the claim. The chrome bar is deliberately
   left completely still while everything under it moves. */

const FACTORS: { label: string; Icon: Icon; on?: boolean }[] = [
  { label: "TOTP", Icon: Clock },
  { label: "Push", Icon: DeviceMobile, on: true },
  { label: "Biometric", Icon: Fingerprint },
  { label: "Hardware key", Icon: Key, on: true },
  { label: "SMS OTP", Icon: ChatText },
  { label: "Email OTP", Icon: Envelope },
];

export function MockMfaDoor({ url = "app.acme.in/sign-in" }) {
  return (
    <div className="izm izm-mfa">
      <Chrome url={url} />
      <div className="izm-body">
        <span className="izm-label">Sign in</span>
        <span className="izm-field izm-typed">
          <i className="izm-type" />
        </span>
        <span className="izm-field">
          <span className="izm-mask izm-mask--fill">••••••••••</span>
        </span>
        <span className="izm-btn izm-btn--press">Sign in</span>

        {/* the tray, inside the same window */}
        <span className="izm-tray">
          <span className="izm-group">Group: Finance · profile 2 of 5</span>
          <span className="izm-chips">
            {FACTORS.map((f, i) => (
              <span
                className={`izm-chip${f.on ? " on" : " off"}`}
                key={f.label}
                style={{ ["--i" as string]: i } as React.CSSProperties}
              >
                <f.Icon weight="duotone" aria-hidden="true" />
                {f.label}
                {f.on && <CheckCircle className="izm-chiptick" weight="fill" aria-hidden="true" />}
              </span>
            ))}
          </span>
          <span className="izm-trayfoot">not required for this group</span>
        </span>
      </div>
      <span className="izm-verdict izm-late t-allow">
        Signed in — one screen, two factors
        <CheckCircle weight="fill" aria-hidden="true" />
      </span>
      <span className="izm-cur izm-cur--mfa" aria-hidden="true">
        <Cursor weight="fill" />
      </span>
    </div>
  );
}

/* ---------- 7. right password, wrong machine ----------
   The two green ticks stay on screen for the whole of the red device
   row. If they faded, the card would read as "bad credentials" and
   lose its only argument — that nothing was wrong with the password. */

export function MockBind({ url = "app.acme.in/sign-in", device = "MacBook-Air-7F2A" }) {
  return (
    <div className="izm izm-bind">
      <Chrome url={url} />
      <div className="izm-body">
        <span className="izm-label">Sign in</span>
        <span className="izm-field izm-typed">
          <i className="izm-type" />
          <CheckCircle className="izm-ok" weight="fill" aria-hidden="true" />
        </span>
        <span className="izm-field">
          <span className="izm-mask izm-mask--fill">••••••••••</span>
          <CheckCircle className="izm-ok izm-ok--2" weight="fill" aria-hidden="true" />
        </span>
        <span className="izm-valid">credentials valid</span>
        <span className="izm-btn izm-btn--turnsbad">Sign in</span>

        <span className="izm-devrow">
          <Laptop weight="duotone" aria-hidden="true" />
          <b>{device}</b>
          <em>not bound</em>
        </span>

        <span className="izm-bound">
          <span className="izm-boundh">Bound devices for this user (2)</span>
          <span className="izm-boundrow">DESKTOP-4471</span>
          <span className="izm-boundrow">LAPTOP-9930</span>
        </span>
      </div>
      <span className="izm-cur izm-cur--bind" aria-hidden="true">
        <Cursor weight="fill" />
        <i>device not bound</i>
      </span>
    </div>
  );
}

/* ---------- 8. one action, everything dark ----------
   The SWEEP is the signature: one gesture, then four things going out
   in sequence, ~120ms apart. Fast enough to read as a single motion,
   staggered enough that you can see it travel. The tiles go dashed and
   dim rather than red — this is removal, not rejection, and the rest
   of this library already spells denial as absence. */

const OFF_APPS = ["CRM", "Payroll", "Wiki", "Repos"];

export function MockOffboard({ url = "admin.acme.in/people" }) {
  return (
    <div className="izm izm-off">
      <Chrome url={url} />
      <div className="izm-body">
        <span className="izm-person izm-person--admin">
          <i aria-hidden="true">A</i>
          <span className="izm-idtext">
            <b>Anita R.</b>
            <em>Finance</em>
          </span>
          <span className="izm-status">
            <span className="izm-status-on">Active</span>
            <span className="izm-status-off">Revoked</span>
          </span>
        </span>

        <span className="izm-apps">
          {OFF_APPS.map((a, i) => (
            <span className="izm-app" key={a} style={{ ["--i" as string]: i } as React.CSSProperties}>
              {a}
            </span>
          ))}
        </span>

        <span className="izm-sessions">
          <i className="izm-pulse" aria-hidden="true" />
          <b className="izm-count">
            <span>2</span>
            <span>1</span>
            <span>0</span>
          </b>
          live sessions
        </span>

        <span className="izm-btn izm-btn--revoke">Revoke access</span>
        <span className="izm-stamp">13:42:07 · access removed from 4 applications, 2 sessions closed</span>
      </div>
      <span className="izm-cur izm-cur--off" aria-hidden="true">
        <Cursor weight="fill" />
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
  mfa: MockMfaDoor,
  bind: MockBind,
  offboard: MockOffboard,
} as const;

export type MockKey = keyof typeof MOCKS;

export function Mock({ kind }: { kind: MockKey }) {
  const C = MOCKS[kind];
  return <C />;
}
