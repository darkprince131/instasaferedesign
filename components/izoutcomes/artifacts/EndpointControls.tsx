import type { ArtifactProps } from "./types";

/* Endpoint controls — the action is refused inside the session.

   Three regions, left to right: the controls that are armed, the live
   session where the attempt happens, and the log the refusal writes.
   The middle is a BROWSER, not a device: the whole claim is "inside
   the session, not on the device", so drawing a laptop would argue the
   opposite of the copy.

   Highlight map (hover an outcome column):
     0 the armed controls + the refused drag (insider risk)
     1 the session itself                    (third parties leave empty-handed)
     2 the activity log                      (compliance evidence)

   Per docs/three-outcomes-rule.md the reference's per-column mini
   illustrations are NOT built.

   GEOMETRY IS CHECKED. Run all five browser passes after any move:
   text-vs-text, plate padding, mark collision, straddle, viewBox. */

const CTRL_X = 16;
const CTRL_W = 172;
const APP_X = 216;
const APP_W = 470;
const LOG_X = 722;
const LOG_W = 272;

const CONTROLS: [string, string][] = [
  ["Download", "Blocked"],
  ["Clipboard", "Blocked"],
  ["Screenshot", "Blocked"],
  ["USB access", "Disabled"],
];
const ctrlY = (i: number) => 128 + i * 74;

const LOG_ROWS: [string, string, string, boolean][] = [
  ["10:24:31", "Download blocked", "Q4_Forecast.xlsx", true],
  ["10:24:12", "Clipboard blocked", "32 characters", false],
  ["10:23:58", "Screenshot blocked", "finance dashboard", false],
  ["10:23:41", "USB access blocked", "SanDisk 32GB", true],
  ["10:23:10", "Print blocked", "Quarterly_Report.pdf", false],
];
const logY = (i: number) => 148 + i * 62;

const PILLARS = ["Live enforcement", "Context aware", "Automatic logging"];

/* ---- glyphs ---- */
const Down = () => (
  <>
    <path d="M10 3v9M6 8.5l4 4 4-4" className="z-glyph" />
    <path d="M3.5 15.5h13" className="z-glyph" />
  </>
);
const Clip = () => (
  <>
    <rect x="5" y="4" width="10" height="13" rx="1.6" className="z-glyph" />
    <path d="M8 4V2.6h4V4" className="z-glyph" />
  </>
);
const Shot = () => (
  <>
    <rect x="2.5" y="5" width="15" height="11" rx="1.8" className="z-glyph" />
    <circle cx="10" cy="10.5" r="3" className="z-glyph" />
  </>
);
const Usb = () => (
  <>
    <path d="M10 17V5" className="z-glyph" />
    <path d="M7 8l3-3 3 3" className="z-glyph" />
    <circle cx="10" cy="17" r="1.6" className="z-glyph" />
  </>
);
const Bolt = () => <path d="M11 2.5L5 11h4l-1 6.5L15 9h-4z" className="z-glyph" />;
const Target = () => (
  <>
    <circle cx="10" cy="10" r="7" className="z-glyph" />
    <circle cx="10" cy="10" r="2.4" className="z-glyph" />
  </>
);
const Doc = () => (
  <>
    <path d="M5 3h7l3 3v11H5z" className="z-glyph" />
    <path d="M7.5 9h5M7.5 12h5" className="z-glyph" />
  </>
);
const CTRL_GLYPH = [Down, Clip, Shot, Usb];
const PILLAR_GLYPH = [Bolt, Target, Doc];

function G({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: React.ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
}
function Wire({ d, tone, seg }: { d: string; tone: "neutral" | "deny"; seg: number }) {
  return <path d={d} className={`z-dash-${tone}`} style={{ ["--seg" as string]: seg } as React.CSSProperties} />;
}

export function EndpointControls({ highlightIndex }: ArtifactProps) {
  const on = (i: number) => (highlightIndex === i ? true : undefined);

  return (
    <svg
      viewBox="0 0 1010 600"
      className="iz-art iz-art--ec"
      role="img"
      aria-label="Endpoint controls refusing a download inside a live browser session and writing the refusal to an activity log"
    >
      {/* ================= armed controls ================= */}
      <g data-part={0} data-on={on(0)}>
        <text x={CTRL_X} y={106} className="a-text a-mute ec-label">
          ARMED CONTROLS
        </text>
        {CONTROLS.map(([name, state], i) => {
          const Glyph = CTRL_GLYPH[i];
          const y = ctrlY(i);
          return (
            <g key={name}>
              <rect x={CTRL_X} y={y} width={CTRL_W} height={58} rx={9} className="a-plate ec-ctrl" />
              <G x={CTRL_X + 16} y={y + 19} s={0.9}>
                <Glyph />
              </G>
              <text x={CTRL_X + 46} y={y + 26} className="a-text a-ink ec-row">
                {name}
              </text>
              <text x={CTRL_X + 46} y={y + 44} className="a-text ec-no ec-sub">
                {state}
              </text>
              <circle cx={CTRL_X + CTRL_W - 22} cy={y + 29} r={9} className="z-no-ring" />
              <path
                d={`M${CTRL_X + CTRL_W - 27} ${y + 24} l10 10 M${CTRL_X + CTRL_W - 17} ${y + 24} l-10 10`}
                className="z-no-x"
              />
              <Wire d={`M${CTRL_X + CTRL_W} ${y + 29} H${APP_X}`} tone="neutral" seg={i} />
            </g>
          );
        })}

        {/* the three standing properties, not controls */}
        {PILLARS.map((p, i) => {
          const Glyph = PILLAR_GLYPH[i];
          const y = 452 + i * 34;
          return (
            <g key={p}>
              <G x={CTRL_X} y={y - 13} s={0.8}>
                <Glyph />
              </G>
              <text x={CTRL_X + 26} y={y} className="a-text a-ink ec-sub">
                {p}
              </text>
            </g>
          );
        })}
      </g>

      {/* ================= the live session ================= */}
      <g data-part={1} data-on={on(1)}>
        <text x={APP_X} y={40} className="a-text a-mute ec-label">
          INSIDE THE SESSION
        </text>
        <rect x={APP_X + 8} y={64} width={APP_W} height={400} rx={12} className="z-gate-back" />
        <rect x={APP_X} y={56} width={APP_W} height={400} rx={12} className="a-plate ec-app" />

        {/* chrome */}
        <circle cx={APP_X + 26} cy={80} r={4} className="ec-chrome-dot" />
        <circle cx={APP_X + 40} cy={80} r={4} className="ec-chrome-dot" />
        <circle cx={APP_X + 54} cy={80} r={4} className="ec-chrome-dot" />
        <rect x={APP_X + 74} y={68} width={168} height={24} rx={6} className="ec-tab" />
        <text x={APP_X + 90} y={85} className="a-text a-ink ec-sub">
          Finance dashboard
        </text>
        <rect x={APP_X + 20} y={102} width={APP_W - 40} height={26} rx={6} className="ec-url" />
        <text x={APP_X + 38} y={120} className="a-text a-mute ec-sub">
          app.company.com/finance
        </text>
        <line x1={APP_X} y1={142} x2={APP_X + APP_W} y2={142} className="a-line" data-draw pathLength={1} />

        {/* the content being worked in */}
        <text x={APP_X + 28} y={176} className="a-text a-mute ec-sub">
          Quarterly revenue
        </text>
        <text x={APP_X + 28} y={210} className="a-text a-ink ec-figure">
          $ 8,542,316
        </text>
        <text x={APP_X + 28} y={232} className="a-text ec-ok ec-sub">
          +12.6% vs last quarter
        </text>
        <path
          d={`M${APP_X + 28} 300 L${APP_X + 74} 288 L${APP_X + 118} 292 L${APP_X + 162} 268 L${APP_X + 206} 274 L${APP_X + 250} 240`}
          className="ec-spark"
          data-draw
          pathLength={1}
        />

        {/* the attempt, refused at the moment it is made */}
        <rect x={APP_X + 268} y={172} width={182} height={104} rx={9} className="ec-drop" />
        <text x={APP_X + 359} y={200} textAnchor="middle" className="a-text a-mute ec-sub">
          Drop to download
        </text>
        <circle cx={APP_X + 359} cy={236} r={17} className="z-no-ring" />
        <path
          d={`M${APP_X + 348} 225 l22 22`}
          className="z-no-x"
        />

        {/* the watermark that follows the session, not the file */}
        <rect x={APP_X + 268} y={312} width={182} height={72} rx={8} className="ec-conf" />
        <text x={APP_X + 284} y={338} className="a-text ec-no ec-conf-text">
          CONFIDENTIAL
        </text>
        <text x={APP_X + 284} y={358} className="a-text a-mute ec-tiny">
          alex@company.com
        </text>
        <text x={APP_X + 284} y={374} className="a-text a-mute ec-tiny">
          10:24 AM
        </text>

        <Wire d={`M${APP_X + APP_W} 256 H${LOG_X}`} tone="deny" seg={4} />
      </g>

      {/* ================= the log it writes ================= */}
      <g data-part={2} data-on={on(2)}>
        <rect x={LOG_X} y={56} width={LOG_W} height={472} rx={12} className="a-plate" />
        <text x={LOG_X + 20} y={92} className="a-text a-ink ec-panel-title">
          Activity log
        </text>
        <text x={LOG_X + LOG_W - 20} y={92} textAnchor="end" className="a-text a-mute ec-tiny">
          TODAY · 144
        </text>
        <line x1={LOG_X} y1={112} x2={LOG_X + LOG_W} y2={112} className="a-line" data-draw pathLength={1} />

        {LOG_ROWS.map(([time, what, detail, high], i) => {
          const y = logY(i);
          return (
            <g key={time}>
              <text x={LOG_X + 20} y={y} className="a-text a-mute ec-tiny">
                {time}
              </text>
              <text x={LOG_X + 20} y={y + 20} className="a-text a-ink ec-sub">
                {what}
              </text>
              <text x={LOG_X + 20} y={y + 38} className="a-text a-mute ec-tiny">
                {detail}
              </text>
              <rect
                x={LOG_X + LOG_W - 74}
                y={y - 12}
                width={54}
                height={20}
                rx={10}
                className={high ? "ec-sev-high" : "ec-sev-med"}
              />
              <text
                x={LOG_X + LOG_W - 47}
                y={y + 2}
                textAnchor="middle"
                className={`a-text ec-tiny ${high ? "ec-no" : "ec-warn"}`}
              >
                {high ? "High" : "Med"}
              </text>
              {i < LOG_ROWS.length - 1 && (
                <line x1={LOG_X} y1={y + 50} x2={LOG_X + LOG_W} y2={y + 50} className="a-line" />
              )}
            </g>
          );
        })}

        <rect x={LOG_X + 20} y={468} width={LOG_W - 40} height={34} rx={8} className="ec-btn" />
        <text x={LOG_X + LOG_W / 2} y={490} textAnchor="middle" className="a-text a-ink ec-sub">
          View all logs
        </text>
      </g>
    </svg>
  );
}
