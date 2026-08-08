import type { ArtifactProps } from "./types";

/* SSO — password sprawl, one credential, every session.

   The argument is a BEFORE and AFTER with the mechanism in between,
   read left to right: six apps each holding their own password, one
   sign-in card, then every one of those apps reached from that single
   session. The middle column is the only place a credential is typed.

   Highlight map (hover an outcome column):
     0 the sprawl and the one credential (the password problem shrinks)
     1 the reached estate               (joiner-leaver in minutes)
     2 the session log                  (access becomes auditable)

   The session log is folded into the main illustration rather than
   living as a per-column mini-visual — outcome columns never get their
   own artwork (docs/three-outcomes-rule.md §1), so the third claim
   needs something in the main picture to point at.

   GEOMETRY IS CHECKED. Every label is measured against the plate it
   sits on, not just the viewBox: the tile grid is 120 wide and the
   longest row label is "Windows RDP" at ~106 units. Re-run the
   containment pass after moving anything. */

const BEFORE_X = 16;
const BEFORE_W = 272;
const CARD_X = 350;
const CARD_W = 290;
const AFTER_X = 704;
const AFTER_W = 260;

const SPRAWL = ["aws", "slack", "sap", "jenkins", "oracle", "github"];
const TILE_X = [BEFORE_X + 18, BEFORE_X + 148];
const TILE_Y = [78, 182, 286];

const REACHED = [
  { label: "AWS Console", logo: "aws" },
  { label: "Slack", logo: "slack" },
  { label: "SAP", logo: "sap" },
  { label: "Salesforce", logo: "salesforce" },
  { label: "Jenkins", logo: "jenkins" },
  { label: "Oracle", logo: "oracle" },
];
const afterY = (i: number) => 82 + i * 48;

const LOG: [string, string][] = [
  ["09:10:21", "aws"],
  ["09:12:44", "slack"],
  ["09:18:07", "sap"],
];

const Shield = () => (
  <path d="M10 2.5l6.5 2.4v4.8c0 3.7-2.8 6.1-6.5 7.4-3.7-1.3-6.5-3.7-6.5-7.4V4.9z" className="z-glyph" />
);
const Finger = () => (
  <>
    <path d="M4 10a6 6 0 0 1 12 0" className="z-glyph" />
    <path d="M6.6 11.6a3.4 3.4 0 0 1 6.8 0v2.6" className="z-glyph" />
    <path d="M10 11.4v4.4" className="z-glyph" />
  </>
);
const Lock = () => (
  <>
    <rect x="4" y="9" width="12" height="8.5" rx="1.6" className="z-glyph" />
    <path d="M7 9V6.6a3 3 0 0 1 6 0V9" className="z-glyph" />
  </>
);
const Eye = () => (
  <>
    <path d="M2 10s3.2-5 8-5 8 5 8 5-3.2 5-8 5-8-5-8-5z" className="z-glyph" />
    <circle cx="10" cy="10" r="2.4" className="z-glyph" />
  </>
);

function G({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: React.ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
}
function Logo({ name, x, y, size = 22 }: { name: string; x: number; y: number; size?: number }) {
  return <image href={`/logos/integrations/${name}.svg`} x={x} y={y} width={size} height={size} />;
}
function Wire({ d, tone, seg }: { d: string; tone: "neutral" | "allow" | "deny"; seg: number }) {
  return <path d={d} className={`z-dash-${tone}`} style={{ ["--seg" as string]: seg } as React.CSSProperties} />;
}

/** the padlock badge each hand-off passes through */
function Gate({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={16} className="sso-gate" />
      <G x={x - 9} y={y - 9} s={0.9}>
        <Lock />
      </G>
    </g>
  );
}

export function SsoLogin({ highlightIndex }: ArtifactProps) {
  const on = (i: number) => (highlightIndex === i ? true : undefined);

  return (
    <svg
      viewBox="0 0 980 540"
      className="iz-art iz-art--sso"
      role="img"
      aria-label="Six applications each holding their own password, replaced by one sign-in that reaches every application in a single logged session"
    >
      {/* ================= before ================= */}
      <g data-part={0} data-on={on(0)}>
        <text x={BEFORE_X} y={22} className="a-text a-ink sso-head">
          BEFORE SSO
        </text>
        <text x={BEFORE_X} y={42} className="a-text a-mute sso-sub">
          Many logins. Many passwords.
        </text>
        <rect x={BEFORE_X} y={58} width={BEFORE_W} height={330} rx={10} className="a-plate sso-before" />

        {SPRAWL.map((logo, i) => {
          const x = TILE_X[i % 2];
          const y = TILE_Y[Math.floor(i / 2)];
          return (
            <g key={logo}>
              <rect x={x} y={y} width={106} height={88} rx={9} className="a-plate" />
              <Logo name={logo} x={x + 42} y={y + 14} size={24} />
              {/* the password each app keeps of its own */}
              <rect x={x + 14} y={y + 52} width={78} height={20} rx={5} className="sso-pw" />
              <text x={x + 22} y={y + 67} className="a-text a-mute sso-dots">
                ••••••
              </text>
              <G x={x + 74} y={y + 55} s={0.62}>
                <Lock />
              </G>
            </g>
          );
        })}

        {/* the tangle — every app on its own credential */}
        <path d="M124 122 H160 V166 H70 V210" className="sso-tangle" />
        <path d="M124 226 H176 V270 H70 V314" className="sso-tangle" />
        <path d="M230 122 V166 H176 V210" className="sso-tangle" />
      </g>

      <Gate x={318} y={223} />
      <Wire d={`M${BEFORE_X + BEFORE_W} 223 H298`} tone="neutral" seg={0} />
      <Wire d={`M338 223 H${CARD_X}`} tone="neutral" seg={1} />

      {/* ================= the one sign-in ================= */}
      <g data-part={0} data-on={on(0)}>
        <text x={CARD_X} y={22} className="a-text a-accent sso-head">
          WITH SSO
        </text>
        <text x={CARD_X} y={42} className="a-text a-mute sso-sub">
          One login. All access.
        </text>

        <rect x={CARD_X + 8} y={66} width={CARD_W} height={400} rx={14} className="z-gate-back" />
        <rect x={CARD_X} y={58} width={CARD_W} height={400} rx={14} className="a-plate sso-card" />

        <rect x={CARD_X + CARD_W / 2 - 17} y={84} width={34} height={34} rx={9} className="sso-mark" />
        <G x={CARD_X + CARD_W / 2 - 10} y={92} s={1}>
          <Shield />
        </G>
        <text x={CARD_X + CARD_W / 2} y={144} textAnchor="middle" className="a-text a-ink sso-title">
          INSTASAFE SSO
        </text>
        <text x={CARD_X + CARD_W / 2} y={166} textAnchor="middle" className="a-text a-mute sso-sub">
          Sign in to continue
        </text>

        <rect x={CARD_X + 26} y={188} width={CARD_W - 52} height={36} rx={7} className="sso-field" />
        <text x={CARD_X + 40} y={211} className="a-text a-mute sso-field-text">
          user@yourcompany.com
        </text>

        <rect x={CARD_X + 26} y={234} width={CARD_W - 52} height={36} rx={7} className="sso-field" />
        <text x={CARD_X + 40} y={257} className="a-text a-ink sso-field-text">
          ••••••••
        </text>
        <G x={CARD_X + CARD_W - 54} y={243} s={0.8}>
          <Eye />
        </G>

        <rect x={CARD_X + 26} y={284} width={CARD_W - 52} height={38} rx={8} className="sso-btn" />
        <text x={CARD_X + CARD_W / 2} y={308} textAnchor="middle" className="a-text sso-btn-text">
          Sign in
        </text>

        <line x1={CARD_X + 26} y1={342} x2={CARD_X + 118} y2={342} className="a-line" />
        <text x={CARD_X + CARD_W / 2} y={347} textAnchor="middle" className="a-text a-mute sso-sub">
          or
        </text>
        <line x1={CARD_X + CARD_W - 118} y1={342} x2={CARD_X + CARD_W - 26} y2={342} className="a-line" />

        <rect x={CARD_X + 26} y={362} width={CARD_W - 52} height={38} rx={8} className="sso-field" />
        <G x={CARD_X + 42} y={372} s={0.9}>
          <Finger />
        </G>
        <text x={CARD_X + 72} y={386} className="a-text a-ink sso-field-text">
          Sign in with MFA
        </text>

        <circle cx={CARD_X + 46} cy={426} r={8} className="z-ok-ring" />
        <path d={`M${CARD_X + 41.5} 426 l3 3.2 l6.2 -6.6`} className="z-ok-tick" />
        <text x={CARD_X + 62} y={431} className="a-text a-mute sso-log">
          Verified. Secured. Seamless.
        </text>
      </g>

      <Gate x={672} y={223} />
      <Wire d={`M${CARD_X + CARD_W} 223 H652`} tone="neutral" seg={2} />

      {/* ================= after ================= */}
      <g data-part={1} data-on={on(1)}>
        <text x={AFTER_X} y={22} className="a-text a-accent sso-head">
          AFTER SSO
        </text>
        <text x={AFTER_X} y={42} className="a-text a-mute sso-sub">
          One session. Every app.
        </text>

        {REACHED.map((a, i) => (
          <Wire key={a.label} d={`M692 223 H${688 + i * 8} V${afterY(i)} H${AFTER_X}`} tone="allow" seg={3 + i} />
        ))}

        {REACHED.map((a, i) => {
          const y = afterY(i);
          return (
            <g key={a.label}>
              <rect x={AFTER_X} y={y - 19} width={AFTER_W} height={38} rx={8} className="a-plate" />
              <Logo name={a.logo} x={AFTER_X + 14} y={y - 11} />
              <text x={AFTER_X + 48} y={y + 5} className="a-text a-ink sso-row">
                {a.label}
              </text>
              <circle cx={AFTER_X + AFTER_W - 22} cy={y} r={9} className="z-ok-ring" />
              <path d={`M${AFTER_X + AFTER_W - 27} ${y} l3.4 3.6 l7 -7.4`} className="z-ok-tick" />
            </g>
          );
        })}
      </g>

      {/* ================= the log ================= */}
      <g data-part={2} data-on={on(2)}>
        <Wire d={`M${AFTER_X + AFTER_W / 2} 385 V404`} tone="allow" seg={9} />
        <rect x={AFTER_X} y={404} width={AFTER_W} height={112} rx={9} className="a-plate" />
        <text x={AFTER_X + 16} y={426} className="a-text a-mute sso-log-head">
          SESSION LOG
        </text>
        <line x1={AFTER_X} y1={436} x2={AFTER_X + AFTER_W} y2={436} className="a-line" />
        {LOG.map(([t, logo], i) => {
          const y = 458 + i * 24;
          return (
            <g key={t}>
              <text x={AFTER_X + 16} y={y} className="a-text a-mute sso-log">
                {t}
              </text>
              <Logo name={logo} x={AFTER_X + 84} y={y - 12} size={14} />
              <text x={AFTER_X + 110} y={y} className="a-text sso-ok sso-log">
                SUCCESS
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
