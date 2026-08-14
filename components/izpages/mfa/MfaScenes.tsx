"use client";

import {
  ChatCircleDots,
  DotsThree,
  EnvelopeSimple,
  Key,
  Lock,
  MapPin,
  Monitor,
  Numpad,
  Pulse,
  ScanSmiley,
  SealCheck,
  ShieldCheck,
  Terminal,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import "./mfahero.css";

/* ============================================================
   MfaScenes — the hero visual for /multifactor-authentication.

   ONE AUTHENTICATION, CAUGHT MID-DECISION. Four checks have passed,
   the second factor has not come back yet, and the decision is still
   open. That pause is the whole subject of the page: the password
   was right four steps ago and the person is still not in.

   STATIC. The page's moving interactive is the MFA simulator further
   down, behind its own anchor. Per the interaction-placement rule a
   hero never carries the heavy one.

   THE MARK, NOT A SHIELD — product chrome uses <LogoMark />.
   ============================================================ */

type Step = { label: string; sub: string; Icon: Icon; state: "ok" | "pending" };

const STEPS: Step[] = [
  { label: "Password", sub: "Verified against the directory", Icon: Lock, state: "ok" },
  { label: "Device trust", sub: "This device is enrolled", Icon: Monitor, state: "ok" },
  { label: "Location", sub: "Bangalore, India", Icon: MapPin, state: "ok" },
  { label: "Risk assessment", sub: "Risk score is low", Icon: ShieldCheck, state: "ok" },
  { label: "Second factor", sub: "Waiting for approval", Icon: Numpad, state: "pending" },
  { label: "Access decision", sub: "Finalising", Icon: SealCheck, state: "pending" },
];

export function MfaHeroScene() {
  return (
    <div className="mfah" aria-hidden="true">
      {/* ---------- the authentication ---------- */}
      <div className="mfah-auth">
        <div className="mfah-auth-h">
          <span className="mfah-mono">Authentication in progress</span>
          <LogoMark size={18} />
        </div>

        <div className="mfah-who">
          <div>
            <span className="mfah-mono mfah-dim">User</span>
            <b>arun.k@instasafe.com</b>
          </div>
          <div>
            <span className="mfah-mono mfah-dim">Device</span>
            <b>MacBook Pro 14&quot; · macOS 14.4</b>
            <i>Bangalore, India · 08:42 AM IST</i>
          </div>
        </div>

        <div className="mfah-steps">
          {STEPS.map((s) => (
            <div className={`mfah-step ${s.state}`} key={s.label}>
              <span className="mfah-step-ic">
                <s.Icon size={16} weight="regular" />
              </span>
              <span className="mfah-step-t">
                <b>{s.label}</b>
                <i>{s.sub}</i>
              </span>
              <span className="mfah-step-v">
                {s.state === "ok" ? <SealCheck size={17} weight="regular" /> : <DotsThree size={17} weight="bold" />}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- what is being asked for ---------- */}
      <span className="mfah-node">
        <LogoMark size={20} />
      </span>

      <div className="mfah-side">
        <div className="mfah-req">
          <span className="mfah-mono mfah-dim">Access request</span>
          <div className="mfah-req-app">
            <span className="mfah-req-ic">
              <Terminal size={17} weight="regular" />
            </span>
            <span>
              <b>Finance App</b>
              <i>SAML application</i>
            </span>
          </div>
        </div>

        <div className="mfah-verify">
          <div className="mfah-scan">
            <span className="mfah-bracket tl" />
            <span className="mfah-bracket tr" />
            <span className="mfah-bracket bl" />
            <span className="mfah-bracket br" />
            <FaceMesh />
          </div>
          <b>Verify it&apos;s you</b>
          <span className="mfah-verify-sub">Look at the camera</span>
          <div className="mfah-prog-row">
            <span className="mfah-live" />
            Scanning…
          </div>
          <span className="mfah-prog">
            <i />
          </span>
        </div>
      </div>
    </div>
  );
}

/* The face is a point cloud, not a photograph and not a smiley — what
   a liveness check actually works on is a mesh of sampled points, and
   drawing it that way is both more honest and free of the uncanny
   clip-art face the reference sketch used. */
function FaceMesh() {
  const pts: { x: number; y: number; r: number }[] = [];
  const cx = 60;
  const cy = 58;
  /* Rounded, and not for tidiness: the raw trig values serialise with
     one more digit on the server than in the browser
     (29.421161675113535 vs 29.42116167511353), which React reports as
     a hydration mismatch on every point in the mesh. */
  const round = (v: number) => Math.round(v * 100) / 100;
  for (let ring = 1; ring <= 5; ring++) {
    const rx = ring * 9.5;
    const ry = ring * 11;
    const n = 6 + ring * 5;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      pts.push({ x: round(cx + Math.cos(a) * rx), y: round(cy + Math.sin(a) * ry), r: ring > 3 ? 0.7 : 1 });
    }
  }
  return (
    <svg viewBox="0 0 120 116" className="mfah-mesh">
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} />
      ))}
      {/* the two features a liveness model actually anchors on */}
      <circle cx={46} cy={48} r={2.6} className="mfah-mesh-key" />
      <circle cx={74} cy={48} r={2.6} className="mfah-mesh-key" />
      <path d="M46 76 q14 10 28 0" className="mfah-mesh-line" />
    </svg>
  );
}

/* ============================================================
   Six ways to verify — the reference's set, confirmed by the user.
   Whether SMS and email OTP count as one method or two is a framing
   choice rather than a claim, so the strip splits them: six equal
   cells read better than five plus a compound one.
   ============================================================ */

const METHODS: { t: string; d: string; Icon: Icon }[] = [
  { t: "SMS OTP", d: "One-time codes delivered to your mobile. Works on any handset, with no rollout friction.", Icon: ChatCircleDots },
  { t: "Authenticator app", d: "Time-based codes generated on the device, in InstaSafe Authenticator or any standard TOTP app.", Icon: Numpad },
  { t: "Email OTP", d: "One-time codes sent to your registered email — the fallback when a handset is not to hand.", Icon: EnvelopeSimple },
  { t: "Security key", d: "Hardware tokens using FIDO2 and WebAuthn, for the roles that need the highest assurance.", Icon: Key },
  { t: "Facial recognition", d: "Verify with your face, with liveness detection so that a photograph is not a face.", Icon: ScanSmiley },
  { t: "Continuous auth", d: "Verification that keeps running after login, on user behaviour and device signals.", Icon: Pulse },
];

export function MfaHeroCells() {
  return (
    <div className="mfah-ways">
      <div className="iz-wrap">
        <span className="mfah-mono mfah-dim mfah-ways-h">Six ways to verify</span>
        <div className="mfah-ways-grid">
          {METHODS.map((m) => (
            <div className="mfah-way" key={m.t}>
              <m.Icon size={20} weight="regular" />
              <b>{m.t}</b>
              <span>{m.d}</span>
            </div>
          ))}
        </div>
        {/* The continuous-facial-verification note is removed (user
            call). The six cells above already name the methods; a
            paragraph singling out one of them turned a clean rank of six
            into five plus a footnote. */}
      </div>
    </div>
  );
}
