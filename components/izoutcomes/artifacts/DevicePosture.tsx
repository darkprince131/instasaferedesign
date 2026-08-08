import type { ArtifactProps } from "./types";

/* Device posture — signals in, one assessment, three possible answers.

   The argument is the THREE-WAY FORK. Most access diagrams are binary,
   and that binary is exactly what makes BYOD a blind spot: a device is
   either trusted or refused, so anything unmanaged gets refused or
   waved through. Putting "restricted" on screen as a first-class third
   branch is the whole point — contained access is a policy choice, not
   a failure state.

   Highlight map (hover an outcome column):
     0 the assessment card + blocked branch (compromised stop at door)
     1 the signal column + the score        (compliance is continuous)
     2 the restricted branch                (BYOD with eyes open)

   Per docs/three-outcomes-rule.md the reference's three per-column mini
   illustrations are NOT built.

   GEOMETRY IS CHECKED. Branch rows run 13px and their labels are cut
   to fit ("Production Systems" → "Production") because the panel is
   180 wide and the status dot needs clearance. Run all four browser
   passes after any move: text-vs-text, plate containment, mark
   collision, viewBox bounds. */

const SIG_X = 16;
const SIG_W = 160;
const CARD_X = 232;
const CARD_W = 360;
const BADGE_CX = 632;
const PANEL_X = 820;
const PANEL_W = 180;

const SIGNALS = [
  ["OS & System", "Signal"],
  ["Security", "Signal"],
  ["Network", "Signal"],
  ["Applications", "Signal"],
  ["Identity", "Signal"],
];
const sigY = (i: number) => 120 + i * 76;

const CHECKS: [string, string][] = [
  ["OS Version", "Up to date"],
  ["Security Patches", "Up to date"],
  ["Endpoint Protection", "Active"],
  ["Disk Encryption", "Enabled"],
  ["Firewall", "Enabled"],
  ["TPM", "Enabled"],
  ["Secure Boot", "Enabled"],
  ["Device Certificate", "Valid"],
];
const checkY = (i: number) => 176 + i * 38;

type Tone = "ok" | "warn" | "no";
type Row = { label: string; logo?: string };
const BRANCHES: { tone: Tone; title: string; sub: string; y: number; rows: Row[] }[] = [
  { tone: "ok", title: "Granted", sub: "Full access", y: 150, rows: [{ label: "AWS", logo: "aws" }, { label: "Slack", logo: "slack" }, { label: "SAP", logo: "sap" }, { label: "Internal apps" }] },
  { tone: "warn", title: "Restricted", sub: "Limited / contained", y: 356, rows: [{ label: "Salesforce", logo: "salesforce" }, { label: "Files" }] },
  { tone: "no", title: "Blocked", sub: "No access", y: 470, rows: [{ label: "Jenkins", logo: "jenkins" }, { label: "Sensitive data" }] },
];

/* ---- glyphs, 20×20 boxes ---- */
const Chip = () => (
  <>
    <rect x="5" y="5" width="10" height="10" rx="1.4" className="z-glyph" />
    <path d="M8 2.5v2.5M12 2.5v2.5M8 15v2.5M12 15v2.5M2.5 8H5M2.5 12H5M15 8h2.5M15 12h2.5" className="z-glyph" />
  </>
);
const Shield = () => (
  <path d="M10 2.5l6.5 2.4v4.8c0 3.7-2.8 6.1-6.5 7.4-3.7-1.3-6.5-3.7-6.5-7.4V4.9z" className="z-glyph" />
);
const Wifi = () => (
  <>
    <path d="M3 8.5a10 10 0 0 1 14 0" className="z-glyph" />
    <path d="M6 11.6a6 6 0 0 1 8 0" className="z-glyph" />
    <circle cx="10" cy="15" r="1.3" className="z-glyph" />
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
const Badge = () => (
  <>
    <rect x="3" y="4" width="14" height="12" rx="1.6" className="z-glyph" />
    <circle cx="8" cy="9" r="2" className="z-glyph" />
    <path d="M12 8h3M12 11h3M5 13.5h6" className="z-glyph" />
  </>
);
const Laptop = () => (
  <>
    <rect x="3.5" y="5" width="13" height="8.5" rx="1.2" className="z-glyph" />
    <path d="M1.5 16.5h17" className="z-glyph" />
  </>
);
const SIG_GLYPH = [Chip, Shield, Wifi, Grid, Badge];

function G({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: React.ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
}
function Wire({ d, tone, seg }: { d: string; tone: "neutral" | "allow" | "deny" | "warn"; seg: number }) {
  return <path d={d} className={`z-dash-${tone}`} style={{ ["--seg" as string]: seg } as React.CSSProperties} />;
}

export function DevicePosture({ highlightIndex }: ArtifactProps) {
  const on = (i: number) => (highlightIndex === i ? true : undefined);
  const partFor = (t: Tone) => (t === "warn" ? 2 : 0);

  return (
    <svg
      viewBox="0 0 1010 620"
      className="iz-art iz-art--dp"
      role="img"
      aria-label="Five device signals feeding one real-time assessment that resolves to full, restricted or blocked access"
    >
      {/* ================= signals ================= */}
      <g data-part={1} data-on={on(1)}>
        <text x={SIG_X} y={100} className="a-text a-mute dp-label">
          DEVICE SIGNALS
        </text>
        {SIGNALS.map(([head, sub], i) => {
          const Glyph = SIG_GLYPH[i];
          const y = sigY(i);
          return (
            <g key={head}>
              <rect x={SIG_X} y={y} width={SIG_W} height={62} rx={9} className="a-plate" />
              <G x={SIG_X + 16} y={y + 21} s={0.9}>
                <Glyph />
              </G>
              <text x={SIG_X + 46} y={y + 28} className="a-text a-ink dp-sig">
                {head}
              </text>
              <text x={SIG_X + 46} y={y + 46} className="a-text a-mute dp-sub">
                {sub}
              </text>
            </g>
          );
        })}
        {SIGNALS.map(([head], i) => (
          <Wire key={head} d={`M${SIG_X + SIG_W} ${sigY(i) + 31} H${196 + i * 6} V330 H${CARD_X}`} tone="neutral" seg={i} />
        ))}
      </g>

      {/* ================= the assessment ================= */}
      <g data-part={0} data-on={on(0)}>
        <text x={CARD_X + CARD_W / 2} y={40} textAnchor="middle" className="a-text a-mute dp-label">
          REAL-TIME DEVICE ASSESSMENT
        </text>
        <rect x={CARD_X + 8} y={64} width={CARD_W} height={496} rx={14} className="z-gate-back" />
        <rect x={CARD_X} y={56} width={CARD_W} height={496} rx={14} className="a-plate dp-card" />

        <G x={CARD_X + 26} y={82} s={1.5}>
          <Laptop />
        </G>
        <text x={CARD_X + 74} y={98} className="a-text a-ink dp-device">
          Corporate Laptop
        </text>
        <text x={CARD_X + 74} y={118} className="a-text a-mute dp-sub">
          Windows 11 Pro
        </text>
        <rect x={CARD_X + CARD_W - 92} y={82} width={72} height={24} rx={12} className="dp-healthy" />
        <text x={CARD_X + CARD_W - 56} y={98} textAnchor="middle" className="a-text dp-ok dp-tag">
          HEALTHY
        </text>
        <line x1={CARD_X} y1={140} x2={CARD_X + CARD_W} y2={140} className="a-line" data-draw pathLength={1} />

        {CHECKS.map(([label, value], i) => {
          const y = checkY(i);
          return (
            <g key={label}>
              <text x={CARD_X + 26} y={y} className="a-text a-ink dp-row">
                {label}
              </text>
              <text x={CARD_X + CARD_W - 56} y={y} textAnchor="end" className="a-text a-mute dp-row">
                {value}
              </text>
              <circle cx={CARD_X + CARD_W - 30} cy={y - 5} r={8} className="z-ok-ring" />
              <path d={`M${CARD_X + CARD_W - 34.5} ${y - 5} l3 3.2 l6.2 -6.6`} className="z-ok-tick" />
            </g>
          );
        })}

        <line x1={CARD_X} y1={498} x2={CARD_X + CARD_W} y2={498} className="a-line" data-draw pathLength={1} />
        <text x={CARD_X + 26} y={524} className="a-text a-ink dp-score-label">
          POSTURE SCORE
        </text>
        <text x={CARD_X + CARD_W - 26} y={524} textAnchor="end" className="a-text dp-ok dp-score">
          100 / 100
        </text>
        <rect x={CARD_X + 26} y={536} width={CARD_W - 52} height={5} rx={2.5} className="dp-bar-bed" />
        <rect x={CARD_X + 26} y={536} width={CARD_W - 52} height={5} rx={2.5} className="dp-bar" />
      </g>

      {/* ================= the three answers ================= */}
      {BRANCHES.map((b, bi) => {
        const dot = { ok: "dp-badge-ok", warn: "dp-badge-warn", no: "dp-badge-no" }[b.tone];
        const wireTone = { ok: "allow", warn: "warn", no: "deny" }[b.tone] as "allow" | "warn" | "deny";
        return (
          <g key={b.title} data-part={partFor(b.tone)} data-on={on(partFor(b.tone))}>
            <Wire d={`M${CARD_X + CARD_W} 330 H${604 + bi * 6} V${b.y} H${BADGE_CX - 18}`} tone={wireTone} seg={5 + bi} />
            <circle cx={BADGE_CX} cy={b.y} r={16} className={dot} />
            {b.tone === "ok" && <path d={`M${BADGE_CX - 7} ${b.y} l4.6 4.8 l9.4 -10`} className="dp-mark-ok" />}
            {b.tone === "warn" && <path d={`M${BADGE_CX - 7} ${b.y} h14`} className="dp-mark-warn" />}
            {b.tone === "no" && (
              <path d={`M${BADGE_CX - 6} ${b.y - 6} l12 12 M${BADGE_CX + 6} ${b.y - 6} l-12 12`} className="dp-mark-no" />
            )}

            <text x={BADGE_CX + 28} y={b.y - 2} className="a-text a-ink dp-row">
              {b.title}
            </text>
            <text x={BADGE_CX + 28} y={b.y + 16} className="a-text a-mute dp-sub">
              {b.sub}
            </text>

            <rect
              x={PANEL_X}
              y={b.y - 20 - (b.rows.length - 1) * 19}
              width={PANEL_W}
              height={b.rows.length * 38 + 4}
              rx={9}
              className="a-plate"
            />
            {b.rows.map((r, i) => {
              const y = b.y - (b.rows.length - 1) * 19 + i * 38;
              return (
                <g key={r.label}>
                  {r.logo && (
                    <image
                      href={`/logos/integrations/${r.logo}.svg`}
                      x={PANEL_X + 14}
                      y={y - 9}
                      width={18}
                      height={18}
                    />
                  )}
                  <text
                    x={PANEL_X + (r.logo ? 40 : 18)}
                    y={y + 4}
                    className="a-text a-ink dp-branch-row"
                  >
                    {r.label}
                  </text>
                  <circle cx={PANEL_X + PANEL_W - 18} cy={y} r={4} className={`dp-dot-${b.tone}`} />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
