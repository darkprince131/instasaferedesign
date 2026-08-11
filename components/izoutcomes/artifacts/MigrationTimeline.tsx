import type { ArtifactProps } from "./types";

/* T7 · Expiry timeline — the /vpn-alternative assignment.

   docs/three-outcomes-rule.md §1: `/vpn-alternative` and
   `/third-party-access` share this type, so one runs forward to a
   MIGRATION and the other to an expiry. This is the migration: the
   VPN bar runs along the top and stops, and three stations under it
   carry what changed by the time it does.

   ONE artifact, not three. The reference sheet gave each outcome
   column its own little drawing; per the rule those are folded into
   this picture as the three station glyphs, so every claim still has
   something to point at.

   Parts: 0 one app per session · 1 no backhaul · 2 capacity is config.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~10.4 units per
   character at 15px, so every caption's half-width is (chars * 10.4)/2
   from its station x. Widest neighbours:
     "one app at a time" 17ch → 61..259   (station 160)
     "no backhaul"       11ch → 303..417  (station 360)
     "200 → 20,000"      12ch → 498..622  (station 560)
   ~44 units of clearance each side. Shorten a caption rather than
   shrink the type if any of these moves. */

const SPINE_Y = 352;
const SPINE_X0 = 56;
const SPINE_X1 = 664;
const STATIONS = [160, 360, 560];

/** the bar the migration consumes — starts at the spine's left and
 *  stops dead at station 3 */
const BAR_Y = 52;
const BAR_H = 28;
const BAR_X1 = STATIONS[2];

/** where a station's glyph sits, and where its drop line starts */
const GLYPH_BASE = 276;

function Drop({ x, seg }: { x: number; seg: number }) {
  return (
    <path
      className="z-dash-neutral"
      d={`M${x} ${GLYPH_BASE} L${x} ${SPINE_Y - 12}`}
      style={{ ["--seg" as string]: seg } as React.CSSProperties}
    />
  );
}

export function MigrationTimeline({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox="0 0 720 430"
      className="iz-art iz-art--mig"
      role="img"
      aria-label="A migration timeline: the VPN runs out at stage three, and each stage carries what changed"
    >
      {/* ---------- the thing being retired ---------- */}
      <g>
        <rect x={SPINE_X0} y={BAR_Y} width={BAR_X1 - SPINE_X0} height={BAR_H} rx={4} className="a-plate" />
        {/* the last leg is already on its way out by stage 2 */}
        <rect
          x={STATIONS[1]}
          y={BAR_Y}
          width={BAR_X1 - STATIONS[1]}
          height={BAR_H}
          rx={4}
          className="mig-bar-off"
        />
        <text x={SPINE_X0 + 14} y={BAR_Y + 19} className="a-text a-mute">
          VPN concentrator
        </text>
        {/* the stop: a strike at the bar's end, not an arrowhead */}
        <path
          d={`M${BAR_X1 - 10} ${BAR_Y - 6} L${BAR_X1 + 10} ${BAR_Y + BAR_H + 6}`}
          className="a-strike"
        />
        <text x={BAR_X1 + 24} y={BAR_Y + 19} className="a-text a-deny">
          retired
        </text>
      </g>

      {/* ---------- 0 · one app per session ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={124}
            y={166 + i * 20}
            width={72}
            height={12}
            rx={3}
            className={i === 0 ? "mig-row-on" : "mig-row"}
          />
        ))}
        <text x={STATIONS[0]} y={262} textAnchor="middle" className="a-text a-mute">
          one app at a time
        </text>
        <Drop x={STATIONS[0]} seg={0} />
      </g>

      {/* ---------- 1 · no backhaul ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        {/* the hairpin, refused */}
        <path d="M302 196 Q360 138 418 196" className="mig-hair" />
        <path d="M352 150 L368 166 M368 150 L352 166" className="z-no-x" />
        {/* and the direct run that replaces it */}
        <path d="M302 230 L410 230" className="mig-direct" />
        <path d="M410 224 L422 230 L410 236 Z" className="mig-direct-head" />
        <text x={STATIONS[1]} y={262} textAnchor="middle" className="a-text a-mute">
          no backhaul
        </text>
        <Drop x={STATIONS[1]} seg={1} />
      </g>

      {/* ---------- 2 · capacity is a config change ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        {[
          { x: 512, h: 24 },
          { x: 546, h: 46 },
        ].map((b) => (
          <rect key={b.x} x={b.x} y={238 - b.h} width={26} height={b.h} rx={2} className="mig-row" />
        ))}
        <rect x={580} y={238 - 76} width={26} height={76} rx={2} className="mig-row-on" />
        <text x={STATIONS[2]} y={262} textAnchor="middle" className="a-text a-mute">
          200 → 20,000
        </text>
        <Drop x={STATIONS[2]} seg={2} />
      </g>

      {/* ---------- the spine ---------- */}
      <g>
        <path
          d={`M${SPINE_X0} ${SPINE_Y} L${SPINE_X1} ${SPINE_Y}`}
          className="mig-spine"
          data-draw
          pathLength={1}
        />
        {STATIONS.map((x, i) => (
          <circle key={x} cx={x} cy={SPINE_Y} r={6} className={i === 2 ? "mig-node-on" : "mig-node"} />
        ))}
        {["stage 1", "stage 2", "stage 3"].map((s, i) => (
          <text key={s} x={STATIONS[i]} y={384} textAnchor="middle" className="a-text a-ink">
            {s}
          </text>
        ))}
        {["pilot group", "team by team", "VPN retired"].map((s, i) => (
          <text key={s} x={STATIONS[i]} y={406} textAnchor="middle" className="a-text a-mute">
            {s}
          </text>
        ))}
      </g>
    </svg>
  );
}
