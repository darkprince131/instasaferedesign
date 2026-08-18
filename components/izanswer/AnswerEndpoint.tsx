import { Glyph, type GlyphName } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* "What are endpoint controls?" — the answer-strip illustration for
   /platform/endpoint-controls.

   THE MECHANISM IS THE SECOND HALF OF THE STORY. Every other picture
   on this site argues about getting in. This one starts AFTER the
   grant: the top bar is the login, already passed, and the whole
   sheet below it is the part traditional security leaves unattended.
   A reader who knows nothing should get the shape of the claim from
   the descent alone — granted, then still governed, then four
   attempts of which three do not leave.

   NOT THE OUTCOMES ARTIFACT. `EndpointControls` (the outcomes plane)
   argues that a refusal is evidence, and draws a browser, a control
   list and a log side by side. This one teaches the vocabulary — the
   six controls by name — and the two never share a page position.

   TYPE. viewBox 720 against a ~518px slot ≈ 0.72 scale: 15px lands
   near 11px and 13px near 9px, so 13px is used only for chip labels
   and the log line, never for a sentence. Narrow containers swap the
   `an-opt` labels for the short `an-tight` ones. */

const VB_W = 720;
const VB_H = 760;

/* ---------- the grant, already made ---------- */
const TOP_Y = 30;
const TOP_H = 66;

/* ---------- the session, still governed ---------- */
const PANEL_X = 30;
const PANEL_Y = 150;
const PANEL_W = 660;
const PANEL_H = 300;

/* TWO columns, not three. At three the chips are 200 units wide and
   "Watermark protection" measures 172 from an x+52 text origin — it
   ran 24 units past its own chip. Two columns give 305, which is the
   only arrangement where all six full names fit without abbreviating
   the product's own vocabulary. Measured, not guessed. */
const CHIP_W = 305;
const CHIP_H = 62;
const CHIP_X = [50, 365];
const CHIP_Y = [216, 286, 356];

const CONTROLS: { label: string; tight: string; glyph: GlyphName }[] = [
  { label: "Clipboard controls", tight: "Clipboard", glyph: "doc" },
  { label: "Watermark protection", tight: "Watermark", glyph: "images" },
  { label: "Network filter", tight: "Network", glyph: "shield" },
  { label: "App filter", tight: "Apps", glyph: "tiles" },
  { label: "Chrome control", tight: "Chrome", glyph: "laptop" },
  { label: "Inactivity timeout", tight: "Idle", glyph: "clock" },
];

/* ---------- what the session refuses, and what it does not ---------- */
const TILE_Y = 510;
const TILE_H = 96;
const TILE_W = 156;
const TILE_X = [30, 198, 366, 534];

const ATTEMPTS: { label: string; tight: string; glyph: GlyphName; ok: boolean; verdict: string }[] = [
  { label: "Copy out", tight: "Copy", glyph: "doc", ok: false, verdict: "refused" },
  { label: "Download file", tight: "Download", glyph: "folder", ok: false, verdict: "refused" },
  { label: "Personal drive", tight: "Personal", glyph: "database", ok: false, verdict: "refused" },
  { label: "Work in the app", tight: "In app", glyph: "check", ok: true, verdict: "allowed" },
];

/* ---------- and the line it writes ---------- */
const LOG_Y = 660;

export function AnswerEndpoint() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-ans iz-ans--end"
      role="img"
      aria-label="Access has already been granted; inside the live session six controls stay in force — clipboard controls, watermark protection, network filter, app filter, chrome control and inactivity timeout — so copying to the clipboard, downloading the file and reaching a personal drive are refused while working in the application is allowed, and the refusal is written to the audit log"
    >
      {/* ---------- the grant, already made ---------- */}
      <rect x={PANEL_X} y={TOP_Y} width={PANEL_W} height={TOP_H} rx={10} className="a-plate" />
      <Glyph name="shield-check" cx={64} cy={TOP_Y + TOP_H / 2} size={26} tone="allow" />
      <text x={98} y={TOP_Y + 30} className="a-text an-sm a-ink">
        Access granted
      </text>
      <text x={98} y={TOP_Y + 52} className="a-text an-xs a-mute an-opt">
        the point where traditional security stops looking
      </text>
      <text x={98} y={TOP_Y + 52} className="a-text an-tight a-mute">
        login passed
      </text>
      <path d={`M${VB_W / 2} ${TOP_Y + TOP_H} V${PANEL_Y}`} className="z-dash-accent" style={{ ["--seg" as string]: 0 } as React.CSSProperties} />

      {/* ---------- the session, where policy continues ---------- */}
      <rect x={PANEL_X} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx={10} className="an-panel" />
      <text x={50} y={PANEL_Y + 30} className="a-text an-sm a-ink">
        Inside the session
      </text>
      <text x={50} y={PANEL_Y + 52} className="a-text an-xs a-mute an-opt">
        six controls, set per application and per user group
      </text>
      <text x={50} y={PANEL_Y + 52} className="a-text an-tight a-mute">
        six controls
      </text>

      {CONTROLS.map((c, i) => {
        const x = CHIP_X[i % 2];
        const y = CHIP_Y[Math.floor(i / 2)];
        return (
          <g key={c.label}>
            <rect x={x} y={y} width={CHIP_W} height={CHIP_H} rx={8} className="a-chip" />
            <Glyph name={c.glyph} cx={x + 28} cy={y + CHIP_H / 2} size={22} />
            <text x={x + 52} y={y + 38} className="a-text an-xs a-mute an-opt">
              {c.label}
            </text>
            <text x={x + 52} y={y + 40} className="a-text an-tight a-mute">
              {c.tight}
            </text>
          </g>
        );
      })}

      {/* ---------- four attempts, one of them ordinary work ---------- */}
      {ATTEMPTS.map((a, i) => (
        <path
          key={`d${a.label}`}
          d={`M${TILE_X[i] + TILE_W / 2} ${PANEL_Y + PANEL_H} V${TILE_Y}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: i + 1 } as React.CSSProperties}
        />
      ))}
      {ATTEMPTS.map((a, i) => (
        <g key={a.label}>
          <rect
            x={TILE_X[i]}
            y={TILE_Y}
            width={TILE_W}
            height={TILE_H}
            rx={9}
            className={a.ok ? "ae-allow" : "ae-refuse"}
          />
          <Glyph name={a.glyph} cx={TILE_X[i] + TILE_W / 2} cy={TILE_Y + 30} size={24} tone={a.ok ? "allow" : "deny"} />
          <text x={TILE_X[i] + TILE_W / 2} y={TILE_Y + 62} textAnchor="middle" className="a-text an-xs a-mute an-opt">
            {a.label}
          </text>
          <text x={TILE_X[i] + TILE_W / 2} y={TILE_Y + 64} textAnchor="middle" className="a-text an-tight a-mute">
            {a.tight}
          </text>
          <circle cx={TILE_X[i] + 44} cy={TILE_Y + 79} r={4} className={a.ok ? "z-dot-ok" : "an-dot-no"} />
          <text x={TILE_X[i] + 56} y={TILE_Y + 83} className="a-text an-xs a-mute an-opt">
            {a.verdict}
          </text>
        </g>
      ))}

      {/* ---------- the refusal is not silent ---------- */}
      <rect x={PANEL_X} y={LOG_Y} width={PANEL_W} height={64} rx={10} className="a-chip" />
      <Glyph name="terminal" cx={64} cy={LOG_Y + 32} size={24} />
      <text x={96} y={LOG_Y + 38} className="a-text an-xs a-mute an-opt">
        10:42:11 CLIP direction=out action=blocked · one of 202 logged types
      </text>
      <text x={96} y={LOG_Y + 40} className="a-text an-tight a-mute">
        CLIP action=blocked
      </text>
    </svg>
  );
}
