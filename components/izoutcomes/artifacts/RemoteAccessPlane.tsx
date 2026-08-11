import { Glyph, type GlyphName } from "./DrawnGlyphs";
import type { ArtifactProps } from "./types";

/* /secure-remote-access · the same door from three places — built
   from the supplied reference sheet.

   ONE artifact, per docs/three-outcomes-rule.md. The reference's three
   column drawings (a shielded person, a globe, a log sheet) are folded
   into this picture as its three parts, so each claim still has
   something to point at:

     0 · one model, no weak channel   the single verification stack
                                      every path passes through, and
                                      the resources behind it
     1 · location stops mattering     HQ, home and on the go, verified
                                      identically and joined to one bus
     2 · the audit trail is complete  the unified log, fed by the same
                                      gate rather than by a sidecar

   THE SHARED NOUN is the door, not the journey — which is why the
   three origins converge on one plate instead of running three
   parallel lanes to three copies of it.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~11.1 units at
   16px and ~9.0 at 13px, so every label width is derived. The tight
   ones are the log's second lines: they start at 736 and the longest
   ("MFA · device trust · home", 25ch) ends at 961 against a panel
   inner edge of 984. Shorten a label rather than shrinking the type.

   DENSITY BEATS COMPLETENESS. The reference carries five log rows,
   five resource tiles and four-word tile captions; this carries four,
   four and one word. Everything dropped repeated an argument the
   picture already makes.

   MOBILE. The artifact renders near 340px on a phone, where 13px
   viewBox type lands at 4px — illegible, so the second-tier labels
   carry `a-opt` and are dropped below 900px (illustrations.css).
   What survives is the five that matter: three locations, the gate's
   promise and the log's title, plus the accent shield. */

const VB_W = 1010;
const VB_H = 560;

/* ---------- part 1 · the three origins ---------- */
const ORIGINS = [
  { id: "hq", label: "HQ office", cx: 130, glyph: "buildings" as GlyphName },
  { id: "home", label: "Home", cx: 330, glyph: "house" as GlyphName },
  { id: "away", label: "On the go", cx: 530, glyph: "plane" as GlyphName },
];
const AVATAR_CY = 124;
const AVATAR_R = 26;
/** where the three columns become one line */
const BUS_Y = 172;

/* ---------- part 0 · the gate and what is behind it ---------- */
const GATE_X = 96;
const GATE_W = 468;
const GATE_Y = 200;
const GATE_H = 172;
const GATE_CX = GATE_X + GATE_W / 2;

const CHECKS = [
  { label: "MFA", glyph: "fingerprint" as GlyphName },
  { label: "Device", glyph: "laptop" as GlyphName },
  { label: "Context", glyph: "shield" as GlyphName },
  { label: "Continuous", glyph: "clock" as GlyphName },
];
const CHECK_W = 95;
const CHECK_X = [116, 229, 342, 455];
const CHECK_Y = 272;
const CHECK_H = 60;

const RES_Y = 400;
const RES_H = 104;
const RESOURCES = [
  { label: "Apps", glyph: "tiles" as GlyphName },
  { label: "Files", glyph: "folder" as GlyphName },
  { label: "Databases", glyph: "database" as GlyphName },
  { label: "APIs", glyph: "code" as GlyphName },
];
const RES_W = 96;
const RES_X = [116, 226, 336, 446];
const RES_TILE_Y = 418;
const RES_TILE_H = 48;

/* ---------- part 2 · the record ---------- */
const LOG_X = 612;
const LOG_W = 386;
const LOG_Y = 88;
const LOG_H = 416;
/** text column inside the panel — times sit left of it */
const LOG_TEXT_X = 736;
const LOG_ROWS = [
  { t: "10:24:31", title: "Login successful", sub: "john.doe · HQ office" },
  { t: "10:31:12", title: "Finance app opened", sub: "MFA · device trust · home" },
  { t: "11:02:45", title: "Report downloaded", sub: "finance_q2.pdf · airport" },
  { t: "11:42:09", title: "Session ended", sub: "logged out · on the go" },
];
const ROW_Y = [170, 234, 298, 362];

/** Corner-rounded polyline. Straight joins read as circuitry; a small
 *  consistent radius reads as a drawn route. */
function rounded(pts: [number, number][], r: number) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const d1 = Math.hypot(cx - px, cy - py) || 1;
    const d2 = Math.hypot(nx - cx, ny - cy) || 1;
    const rr = Math.min(r, d1 / 2, d2 / 2);
    const s = [cx + ((px - cx) / d1) * rr, cy + ((py - cy) / d1) * rr];
    const e = [cx + ((nx - cx) / d2) * rr, cy + ((ny - cy) / d2) * rr];
    d += ` L ${s[0].toFixed(1)} ${s[1].toFixed(1)} Q ${cx} ${cy} ${e[0].toFixed(1)} ${e[1].toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

/** avatar → down → along the bus → down into the gate */
function feed(cx: number) {
  return rounded(
    [
      [cx, AVATAR_CY + AVATAR_R],
      [cx, BUS_Y],
      [GATE_CX, BUS_Y],
      [GATE_CX, GATE_Y],
    ],
    14
  );
}

export function RemoteAccessPlane({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-art--sra"
      role="img"
      aria-label="Workers at HQ, at home and travelling pass the same verification, reach the same resources, and land in one activity log"
    >
      {/* ---------- 1 · location stops mattering ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        {ORIGINS.map((o, i) => (
          <g key={o.id}>
            <text x={o.cx} y={24} textAnchor="middle" className="a-text a-ink">
              {o.label}
            </text>
            <Glyph name={o.glyph} cx={o.cx} cy={66} size={44} />
            <circle cx={o.cx} cy={AVATAR_CY} r={AVATAR_R} className="zt-avatar" />
            <Glyph name="person" cx={o.cx} cy={AVATAR_CY} size={26} />
            {/* every origin carries the SAME badge — that is the claim */}
            <Glyph name="check" cx={o.cx + 19} cy={AVATAR_CY + 19} size={18} tone="allow" />
            <path
              d={feed(o.cx)}
              className="z-dash-accent"
              style={{ ["--seg" as string]: i } as React.CSSProperties}
            />
          </g>
        ))}
      </g>

      {/* ---------- 0 · one model, no weak channel ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        <rect x={GATE_X} y={GATE_Y} width={GATE_W} height={GATE_H} rx={12} className="a-plate" />

        {/* the accent element — kept on every breakpoint, and the one
            glyph in the picture that takes duotone */}
        <Glyph name="shield-check" cx={GATE_CX} cy={224} size={38} tone="accent" />

        <text x={GATE_CX} y={264} textAnchor="middle" className="a-text a-ink">
          Verify once. Access anywhere.
        </text>

        {CHECKS.map((c, i) => (
          <g key={c.label}>
            <rect x={CHECK_X[i]} y={CHECK_Y} width={CHECK_W} height={CHECK_H} rx={8} className="a-chip" />
            <Glyph name={c.glyph} cx={CHECK_X[i] + CHECK_W / 2} cy={CHECK_Y + CHECK_H / 2} size={26} />
            <text
              x={CHECK_X[i] + CHECK_W / 2}
              y={352}
              textAnchor="middle"
              className="a-text sr-sm a-mute a-opt"
            >
              {c.label}
            </text>
          </g>
        ))}

        {/* one verdict, then the resources behind it */}
        <path
          d={`M${GATE_CX} ${GATE_Y + GATE_H} L${GATE_CX} ${RES_Y}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 3 } as React.CSSProperties}
        />

        <rect x={GATE_X} y={RES_Y} width={GATE_W} height={RES_H} rx={12} className="a-plate" />
        {RESOURCES.map((r, i) => (
          <g key={r.label}>
            <rect x={RES_X[i]} y={RES_TILE_Y} width={RES_W} height={RES_TILE_H} rx={8} className="a-chip" />
            <Glyph name={r.glyph} cx={RES_X[i] + RES_W / 2} cy={RES_TILE_Y + RES_TILE_H / 2} size={24} />
            <text x={RES_X[i] + RES_W / 2} y={490} textAnchor="middle" className="a-text sr-sm a-mute a-opt">
              {r.label}
            </text>
          </g>
        ))}
      </g>

      {/* ---------- 2 · the audit trail is complete ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        {/* the log is fed by the same gate — not by a sidecar */}
        <path
          d={`M${GATE_X + GATE_W} ${GATE_Y + GATE_H / 2} L${LOG_X} ${GATE_Y + GATE_H / 2}`}
          className="z-dash-neutral"
          style={{ ["--seg" as string]: 4 } as React.CSSProperties}
        />

        <rect x={LOG_X} y={LOG_Y} width={LOG_W} height={LOG_H} rx={12} className="a-plate" />
        <text x={LOG_X + 20} y={118} className="a-text a-ink">
          Unified activity log
        </text>
        <circle cx={930} cy={114} r={4} className="z-dot-ok" />
        <text x={LOG_X + LOG_W - 20} y={118} textAnchor="end" className="a-text sr-sm a-mute a-opt">
          live
        </text>

        {LOG_ROWS.map((r, i) => (
          <g key={r.t}>
            <Glyph name="check" cx={LOG_X + 24} cy={ROW_Y[i] - 4} size={17} tone="allow" />
            <text x={LOG_X + 44} y={ROW_Y[i]} className="a-text sr-sm a-mute a-opt">
              {r.t}
            </text>
            <text x={LOG_TEXT_X} y={ROW_Y[i]} className="a-text a-ink a-opt">
              {r.title}
            </text>
            <text x={LOG_TEXT_X} y={ROW_Y[i] + 20} className="a-text sr-sm a-mute a-opt">
              {r.sub}
            </text>
            {i < LOG_ROWS.length - 1 && (
              <path
                d={`M${LOG_X + 20} ${ROW_Y[i] + 36} H${LOG_X + LOG_W - 20}`}
                className="a-line"
                data-draw
                pathLength={1}
              />
            )}
          </g>
        ))}

        <text x={LOG_X + 20} y={466} className="a-text sr-sm a-accent a-opt">
          view all activity →
        </text>
      </g>
    </svg>
  );
}
