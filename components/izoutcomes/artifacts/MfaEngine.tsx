import type { ArtifactProps } from "./types";

/* MFA — every entry point, one engine, a factor sized to the risk.

   Read left to right: six kinds of login attempt (not just the web),
   one engine scoring them against live risk signals, a menu of factors
   it can demand, and the estate on the other side. The risk panel sits
   ABOVE the engine rather than beside it because it is an input to the
   decision, not a stage in the queue.

   Highlight map (hover an outcome column):
     0 the engine + verification methods (stolen passwords stop working)
     1 the login-attempt column          (MFA everywhere, not just web)
     2 the risk panel                    (friction proportional to risk)

   Per docs/three-outcomes-rule.md the reference's three per-column mini
   illustrations are NOT built — the columns take an icon and nothing
   else, and everything those minis said lives in this one picture.

   GEOMETRY IS CHECKED, AND THE LABELS WERE CUT TO FIT. At viewBox 1020
   the rows rendered at 9.5px, so the columns were tightened to 970 and
   the type raised to 16 — which then meant "Privileged Access",
   "Authenticator App", "Push Notification", "Network Access" and
   "SMS / Email OTP" all overran their panels. They are shortened
   rather than shrunk: a label nobody can read is worse than a label
   that drops a word. Verify with the pairwise getBBox pass AND the
   plate-containment pass after any move. */

const LOGIN_X = 16;
const LOGIN_W = 180;
const CX = 372;
const CY = 350;
const R = 112;
const RISK_X = 260;
const RISK_W = 244;
const METHOD_X = 552;
const METHOD_W = 214;
const GRANT_X = 786;
const GRANT_W = 176;

const ATTEMPTS = ["Web Apps", "Cloud Apps", "OS Login", "Network", "Legacy Apps", "Privileged"];
const attemptY = (i: number) => 206 + i * 46;

const RISK: [string, boolean][] = [
  ["User", true],
  ["Location", true],
  ["Device", true],
  ["Behavior", false],
];

const METHODS = [
  "Push approve",
  "Authenticator",
  "SMS / Email",
  "FIDO / Key",
  "Hardware Key",
  "Backup Code",
  "Biometric",
];
const methodY = (i: number) => 200 + i * 42;

const GRANTED = [
  { label: "AWS Console", logo: "aws" },
  { label: "Slack", logo: "slack" },
  { label: "SAP", logo: "sap" },
  { label: "Salesforce", logo: "salesforce" },
  { label: "GitHub", logo: "github" },
  { label: "Zoom", logo: "zoom" },
];
const grantY = (i: number) => 206 + i * 46;

/* ---- glyphs, 20×20 boxes ---- */
const Browser = () => (
  <>
    <rect x="2.5" y="4" width="15" height="12" rx="1.6" className="z-glyph" />
    <path d="M2.5 8h15" className="z-glyph" />
  </>
);
const Cloud = () => <path d="M6 15h8.5a3.5 3.5 0 0 0 .3-7 5 5 0 0 0-9.6 1.3A3.2 3.2 0 0 0 6 15z" className="z-glyph" />;
const Laptop = () => (
  <>
    <rect x="3.5" y="5" width="13" height="8.5" rx="1.2" className="z-glyph" />
    <path d="M1.5 16.5h17" className="z-glyph" />
  </>
);
const Wifi = () => (
  <>
    <path d="M3 8.5a10 10 0 0 1 14 0" className="z-glyph" />
    <path d="M6 11.6a6 6 0 0 1 8 0" className="z-glyph" />
    <circle cx="10" cy="15" r="1.3" className="z-glyph" />
  </>
);
const Terminal = () => (
  <>
    <rect x="2.5" y="4" width="15" height="12" rx="1.6" className="z-glyph" />
    <path d="M6 8l2.6 2.2L6 12.4M11 12.6h3.4" className="z-glyph" />
  </>
);
const Shield = () => (
  <path d="M10 2.5l6.5 2.4v4.8c0 3.7-2.8 6.1-6.5 7.4-3.7-1.3-6.5-3.7-6.5-7.4V4.9z" className="z-glyph" />
);
const Phone = () => (
  <>
    <rect x="5.5" y="2.5" width="9" height="15" rx="1.8" className="z-glyph" />
    <path d="M8.8 15.2h2.4" className="z-glyph" />
  </>
);
const Dot = () => (
  <>
    <circle cx="10" cy="10" r="7.2" className="z-glyph" />
    <circle cx="10" cy="10" r="2" className="z-glyph" />
  </>
);
const Chat = () => <path d="M3 5.5h14v9H8l-4 3v-3H3z" className="z-glyph" />;
const Key = () => (
  <>
    <circle cx="6.5" cy="10" r="3.4" className="z-glyph" />
    <path d="M9.9 10H17M14.6 10v3M17 10v2.4" className="z-glyph" />
  </>
);
const Usb = () => (
  <>
    <rect x="6" y="3" width="8" height="14" rx="1.6" className="z-glyph" />
    <path d="M8.6 7h2.8" className="z-glyph" />
  </>
);
const Grid = () => (
  <>
    <rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1" className="z-glyph" />
    <rect x="11" y="3.5" width="5.5" height="5.5" rx="1" className="z-glyph" />
    <rect x="3.5" y="11" width="5.5" height="5.5" rx="1" className="z-glyph" />
    <rect x="11" y="11" width="5.5" height="5.5" rx="1" className="z-glyph" />
  </>
);
const Finger = () => (
  <>
    <path d="M4 10a6 6 0 0 1 12 0" className="z-glyph" />
    <path d="M6.6 11.6a3.4 3.4 0 0 1 6.8 0v2.6" className="z-glyph" />
    <path d="M10 11.4v4.4" className="z-glyph" />
  </>
);
const Pulse = () => <path d="M2 10h3.4l2.2-5 3.4 10 2.4-5H18" className="z-glyph" />;

const ATTEMPT_GLYPH = [Browser, Cloud, Laptop, Wifi, Terminal, Shield];
const METHOD_GLYPH = [Phone, Dot, Chat, Key, Usb, Grid, Finger];

function G({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: React.ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
}
function Logo({ name, x, y, size = 22 }: { name: string; x: number; y: number; size?: number }) {
  return <image href={`/logos/integrations/${name}.svg`} x={x} y={y} width={size} height={size} />;
}
function Wire({ d, tone, seg }: { d: string; tone: "neutral" | "allow" | "deny"; seg: number }) {
  return <path d={d} className={`z-dash-${tone}`} style={{ ["--seg" as string]: seg } as React.CSSProperties} />;
}

export function MfaEngine({ highlightIndex }: ArtifactProps) {
  const on = (i: number) => (highlightIndex === i ? true : undefined);

  return (
    <svg
      viewBox="0 0 980 620"
      className="iz-art iz-art--mfa"
      role="img"
      aria-label="Six kinds of login attempt scored by one MFA engine against live risk signals, which demands a factor sized to the risk before granting access"
    >
      {/* ================= login attempts ================= */}
      <g data-part={1} data-on={on(1)}>
        <rect x={LOGIN_X} y={150} width={LOGIN_W} height={332} rx={10} className="a-plate" />
        <text x={LOGIN_X + 20} y={180} className="a-text a-mute mfa-label">
          LOGIN ATTEMPTS
        </text>
        <line x1={LOGIN_X} y1={192} x2={LOGIN_X + LOGIN_W} y2={192} className="a-line" data-draw pathLength={1} />
        {ATTEMPTS.map((a, i) => {
          const Glyph = ATTEMPT_GLYPH[i];
          const y = attemptY(i);
          return (
            <g key={a}>
              <G x={LOGIN_X + 16} y={y - 10} s={0.9}>
                <Glyph />
              </G>
              <text x={LOGIN_X + 44} y={y + 5} className="a-text a-ink mfa-row">
                {a}
              </text>
            </g>
          );
        })}
        {ATTEMPTS.map((a, i) => (
          <Wire
            key={a}
            d={`M${LOGIN_X + LOGIN_W} ${attemptY(i)} H${212 + i * 6} V${CY} H${CX - R}`}
            tone="neutral"
            seg={i}
          />
        ))}
      </g>

      {/* ================= risk evaluation ================= */}
      <g data-part={2} data-on={on(2)}>
        <rect x={RISK_X} y={14} width={RISK_W} height={150} rx={10} className="a-plate" />
        <G x={RISK_X + 16} y={30} s={0.85}>
          <Pulse />
        </G>
        <text x={RISK_X + 42} y={44} className="a-text a-ink mfa-label">
          RISK EVALUATION
        </text>
        {/* HIGH sits hard right; at RISK_W 224 it collided with the header */}
        <text x={RISK_X + RISK_W - 62} y={44} className="a-text mfa-no mfa-label">
          HIGH
        </text>
        <circle cx={RISK_X + RISK_W - 18} cy={39} r={4} className="mfa-dot-no" />
        <line x1={RISK_X} y1={56} x2={RISK_X + RISK_W} y2={56} className="a-line" data-draw pathLength={1} />
        {RISK.map(([label, ok], i) => {
          const y = 80 + i * 24;
          return (
            <g key={label}>
              <text x={RISK_X + 18} y={y} className="a-text a-ink mfa-row">
                {label}
              </text>
              <circle cx={RISK_X + RISK_W - 22} cy={y - 5} r={5} className={ok ? "mfa-ring-ok" : "mfa-ring-no"} />
            </g>
          );
        })}
        <Wire d={`M${CX} 164 V${CY - R}`} tone="neutral" seg={6} />
      </g>

      {/* ================= the engine ================= */}
      <g data-part={0} data-on={on(0)}>
        <circle cx={CX} cy={CY} r={R + 30} className="mfa-orbit" />
        <circle cx={CX} cy={CY} r={R} className="mfa-core" />
        <circle cx={CX} cy={CY} r={R} className="mfa-core-ring" />
        {/* ports on the ring — where a signal actually meets the engine */}
        {[-140, -90, -40, 40, 90, 140].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={CX + (R + 30) * Math.cos(a)}
              cy={CY + (R + 30) * Math.sin(a)}
              r={4}
              className="mfa-port"
            />
          );
        })}

        <G x={CX - 20} y={CY - 76} s={2}>
          <Shield />
        </G>
        <G x={CX - 13} y={CY - 62} s={1.3}>
          <Finger />
        </G>
        <text x={CX} y={CY + 30} textAnchor="middle" className="a-text a-ink mfa-title">
          MFA ENGINE
        </text>
        {/* 50, not 56 — the chord narrows fast and the strap crossed the ring */}
        <text x={CX} y={CY + 54} textAnchor="middle" className="a-text a-mute mfa-strap">
          Verify. Validate. Allow.
        </text>
      </g>

      {/* ================= verification methods ================= */}
      <g data-part={0} data-on={on(0)}>
        <Wire d={`M${CX + R} ${CY} H${METHOD_X}`} tone="neutral" seg={7} />
        <rect x={METHOD_X} y={150} width={METHOD_W} height={344} rx={10} className="a-plate" />
        <text x={METHOD_X + 20} y={180} className="a-text a-mute mfa-label">
          VERIFICATION METHODS
        </text>
        <line x1={METHOD_X} y1={192} x2={METHOD_X + METHOD_W} y2={192} className="a-line" data-draw pathLength={1} />
        {METHODS.map((m, i) => {
          const Glyph = METHOD_GLYPH[i];
          const y = methodY(i);
          return (
            <g key={m}>
              <G x={METHOD_X + 14} y={y - 10} s={0.9}>
                <Glyph />
              </G>
              <text x={METHOD_X + 42} y={y + 5} className="a-text a-ink mfa-row">
                {m}
              </text>
              <circle cx={METHOD_X + METHOD_W - 20} cy={y} r={8} className="z-ok-ring" />
              <path d={`M${METHOD_X + METHOD_W - 24.5} ${y} l3 3.2 l6.2 -6.6`} className="z-ok-tick" />
            </g>
          );
        })}
      </g>

      {/* ================= access granted ================= */}
      <g data-part={0} data-on={on(0)}>
        <Wire d={`M${METHOD_X + METHOD_W} ${CY} H${GRANT_X}`} tone="allow" seg={8} />
        <rect x={GRANT_X} y={150} width={GRANT_W} height={332} rx={10} className="a-plate" />
        <text x={GRANT_X + 18} y={180} className="a-text mfa-ok mfa-label">
          ACCESS GRANTED
        </text>
        <line x1={GRANT_X} y1={192} x2={GRANT_X + GRANT_W} y2={192} className="a-line" data-draw pathLength={1} />
        {GRANTED.map((g, i) => {
          const y = grantY(i);
          return (
            <g key={g.label}>
              <Logo name={g.logo} x={GRANT_X + 12} y={y - 11} />
              <text x={GRANT_X + 40} y={y + 5} className="a-text a-ink mfa-row">
                {g.label}
              </text>
              <circle cx={GRANT_X + GRANT_W - 14} cy={y} r={4} className="z-dot-ok" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
