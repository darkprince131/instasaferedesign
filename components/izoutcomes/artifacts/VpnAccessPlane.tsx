import { Glyph, type GlyphName } from "./DrawnGlyphs";
import type { ArtifactProps } from "./types";

/* /vpn-alternative · the access plane — built from the supplied
   reference sheet.

   ONE artifact, per docs/three-outcomes-rule.md. The reference gave
   each outcome column its own little drawing (a containment ring, a
   direct-path sketch, a growth curve); those are folded into this one
   picture as its three parts, so every claim still has something to
   point at:

     0 · a breach that stops     the six per-app routes, and the
                                 estate that is simply not there
     1 · faster, and invisible   user → gate → engine, with the
                                 concentrator hop struck out
     2 · scales like software    200 → 20,000 on the same plane

   The hub is deliberately OUTSIDE the three parts: it is what all
   three claims are about, so it stays lit while any one of them is
   emphasised.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~11.1 units at
   16px and ~9.0 at 13px, so every label's width is derived, never
   estimated. Tile labels start at 744 and the widest ("Internal
   apps", 13ch) ends at 888 against a tile edge of 942. Shorten a
   label rather than shrinking the type if this moves. */

const VB_W = 980;
const VB_H = 620;

const ROWS = 6;
const ROW_TOP = 84;
const ROW_STEP = 82;
/** x where a tile begins — every route terminates here */
const TILE_X = 690;
const TILE_W = 252;
const TILE_H = 54;

const HUB_CX = 416;
/** centred on the tile column's own span, not on the plane */
const HUB_CY = ROW_TOP + ((ROWS - 1) * ROW_STEP) / 2;
const CORE_R = 46;
const PORT_R = 128;

const USER_CX = 74;
const USER_R = 32;
const GATE_CX = 196;

const rowY = (i: number) => ROW_TOP + i * ROW_STEP;

type App = { id: string; label: string; logo?: string; glyph?: GlyphName };

/* Real marks wherever we hold one (standing instruction, 2026-08-09).
   The reference asked for Jira, which has no mark in
   /public/logos/integrations — swapped for Salesforce rather than
   drawn as an anonymous tile. The last two rows are categories, so
   they carry a glyph instead. */
const APPS: App[] = [
  { id: "aws", label: "AWS Console", logo: "aws" },
  { id: "slack", label: "Slack", logo: "slack" },
  { id: "salesforce", label: "Salesforce", logo: "salesforce" },
  { id: "sap", label: "SAP", logo: "sap" },
  { id: "internal", label: "Internal apps", glyph: "tiles" },
  { id: "dc", label: "Data centre", glyph: "database" },
];

/** the plane's texture: endpoints elsewhere that are NOT this session.
 *  Deterministic — a random field reflows on every render and makes
 *  the draw-in stutter. */
const MOTES: [number, number][] = [
  [128, 62],
  [232, 128],
  [64, 176],
  [300, 58],
  [148, 430],
  [268, 502],
  [72, 512],
  [340, 190],
  [548, 96],
  [592, 214],
  [520, 420],
  [612, 512],
  [368, 596],
  [648, 62],
];

/** Where a route leaves the engine: fanned across the ring so the six
 *  do not all pour out of one point. */
function port(i: number) {
  const t = (i - (ROWS - 1) / 2) / ((ROWS - 1) / 2); // -1 .. 1
  const a = t * ((42 * Math.PI) / 180);
  return { x: HUB_CX + PORT_R * Math.cos(a), y: HUB_CY + PORT_R * Math.sin(a) };
}

/** engine port → long bezier → square arrival at the tile's left edge */
function route(i: number) {
  const p = port(i);
  const y = rowY(i);
  return `M${p.x.toFixed(1)} ${p.y.toFixed(1)} C${(p.x + 96).toFixed(1)} ${p.y.toFixed(1)} ${TILE_X - 88} ${y} ${TILE_X} ${y}`;
}

/** the growth trace: same plane, more of it */
/** Sits above its own baseline (y=580) with room for the "200" tick
 *  underneath it — the first pass ran the tick to y=612 and put it
 *  through the axis. */
const TRACE: [number, number][] = [
  [170, 568],
  [240, 554],
  [310, 540],
  [380, 524],
  [450, 510],
  [520, 492],
];
const AXIS_Y = 580;

export function VpnAccessPlane({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-art--vpn"
      role="img"
      aria-label="A verified user reaching six named applications through the InstaSafe policy engine, with the network removed"
    >
      {/* ---------- the plane ---------- */}
      {MOTES.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={3.5} className="vp-mote" />
      ))}

      {/* ---------- 1 · faster, and invisible ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        <circle cx={USER_CX} cy={HUB_CY} r={USER_R} className="zt-avatar" />
        <Glyph name="person" cx={USER_CX} cy={HUB_CY} size={30} />

        <path
          d={`M${USER_CX + USER_R} ${HUB_CY} L${HUB_CX - CORE_R} ${HUB_CY}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 0 } as React.CSSProperties}
        />

        {/* the gate on the approach */}
        <rect x={GATE_CX - 15} y={HUB_CY - 13} width={30} height={26} rx={4} className="zt-hub" />
        <Glyph name="lock" cx={GATE_CX} cy={HUB_CY} size={17} tone="accent" />

        {/* the concentrator hop that is no longer taken */}
        <path
          d={`M${USER_CX + USER_R} ${HUB_CY} Q${(USER_CX + HUB_CX) / 2} ${HUB_CY + 132} ${HUB_CX - CORE_R} ${HUB_CY}`}
          className="vp-hairpin"
        />
        <path d="M228 345 L248 365 M248 345 L228 365" className="z-no-x" />
        <text x={238} y={398} textAnchor="middle" className="a-text vp-sm a-deny">
          backhaul
        </text>

        <text x={USER_CX} y={200} className="a-text vp-sm a-mute">
          direct — no concentrator
        </text>
      </g>

      {/* ---------- the engine: what all three claims are about ---------- */}
      <g>
        <circle cx={HUB_CX} cy={HUB_CY} r={PORT_R} className="zt-orbit" data-draw pathLength={1} />
        <circle cx={HUB_CX} cy={HUB_CY} r={PORT_R - 34} className="zt-orbit" data-draw pathLength={1} />
        <circle cx={HUB_CX} cy={HUB_CY} r={CORE_R} className="zt-hub" />
        <Glyph name="shield-check" cx={HUB_CX} cy={HUB_CY} size={40} tone="accent" />
        <text x={HUB_CX} y={HUB_CY + 96} textAnchor="middle" className="a-text a-ink">
          InstaSafe ZTNA
        </text>
        <text x={HUB_CX} y={HUB_CY + 118} textAnchor="middle" className="a-text vp-sm a-mute">
          Policy engine
        </text>
      </g>

      {/* ---------- 0 · a breach that stops ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        <text x={TILE_X} y={44} className="a-text vp-sm a-mute">
          one route per app
        </text>

        {APPS.map((a, i) => (
          <path
            key={`${a.id}-w`}
            className="z-dash-accent"
            d={route(i)}
            style={{ ["--seg" as string]: i + 1 } as React.CSSProperties}
          />
        ))}

        {APPS.map((a, i) => {
          const y = rowY(i);
          return (
            <g key={a.id}>
              <rect x={TILE_X} y={y - TILE_H / 2} width={TILE_W} height={TILE_H} rx={8} className="a-plate" />
              {a.logo ? (
                <image href={`/logos/integrations/${a.logo}.svg`} x={TILE_X + 14} y={y - 14} width={28} height={28} />
              ) : (
                <Glyph name={a.glyph!} cx={TILE_X + 28} cy={y} size={26} />
              )}
              <text x={TILE_X + 54} y={y + 6} className="a-text a-ink">
                {a.label}
              </text>
            </g>
          );
        })}

        {/* the estate that is not reachable — and is not even visible */}
        {[
          [720, 566],
          [772, 556],
          [824, 568],
          [876, 558],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={5} className="a-dot-out" />
            <path d={`M${x - 7} ${y - 7} L${x + 7} ${y + 7} M${x + 7} ${y - 7} L${x - 7} ${y + 7}`} className="a-x" />
          </g>
        ))}
        <text x={798} y={600} textAnchor="middle" className="a-text vp-sm a-mute">
          unreachable
        </text>
      </g>

      {/* ---------- 2 · scales like software ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        {/* an axis, or the trace reads as a stray line dropped on the
            plane rather than as a measurement of it */}
        <path d={`M150 ${AXIS_Y} L${TRACE[5][0] + 20} ${AXIS_Y}`} className="a-line" data-draw pathLength={1} />
        <path d={`M150 ${AXIS_Y} L150 476`} className="a-line" data-draw pathLength={1} />
        <polyline points={TRACE.map(([x, y]) => `${x},${y}`).join(" ")} className="vp-trace" />
        {TRACE.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={3.5} className="vp-trace-dot" />
        ))}
        <text x={TRACE[0][0]} y={AXIS_Y + 22} textAnchor="middle" className="a-text vp-sm a-mute">
          200
        </text>
        <text x={TRACE[5][0]} y={TRACE[5][1] - 14} textAnchor="middle" className="a-text vp-sm a-accent">
          20,000
        </text>
      </g>
    </svg>
  );
}
