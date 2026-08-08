import type { ArtifactProps } from "./types";

/* T4 · Boundary plate — one enclosed region with a single opening.
   Depicts CONTAINMENT and BLAST RADIUS. No connecting lines at all:
   the argument is made by what sits inside, what is refused outside,
   and the one place the boundary opens.

   Parts: 0 what is reachable · 1 the single opening · 2 what is refused.

   GEOMETRY IS LOAD-BEARING HERE. Centre (300,180), r=130. Every dot
   in INSIDE must satisfy (x-300)² + (y-180)² < 130², or the picture
   says the opposite of the caption — the first pass had five of the
   "reachable" dots sitting outside the boundary. Check the maths, not
   the eye, when moving any of these. */

const CX = 300;
const CY = 180;
const R = 130;

/* deterministic — a random field would reflow every render and make
   the draw-in stutter. Radii noted so they can be checked at a glance. */
const INSIDE: [number, number][] = [
  [240, 140], // 72
  [300, 120], // 60
  [355, 150], // 62
  [250, 215], // 61
  [310, 225], // 46
  [215, 180], // 85
  [370, 205], // 74
  [280, 255], // 78
  [345, 105], // 87
  [225, 255], // 106
];
const OUTSIDE: [number, number][] = [
  [500, 110],
  [555, 152],
  [512, 205],
  [575, 245],
  [495, 278],
  [558, 308],
];

/* the gap spans ±20° on the right, so the arc runs the long way round
   from +20° back to −20° */
const GAP = 20;
const rad = (d: number) => (d * Math.PI) / 180;
const P = (d: number) => [CX + R * Math.cos(rad(d)), CY + R * Math.sin(rad(d))] as const;
const [ax, ay] = P(GAP);
const [bx, by] = P(-GAP);

export function BoundaryPlate({ highlightIndex }: ArtifactProps) {
  return (
    <svg viewBox="0 0 640 360" className="iz-art" role="img" aria-label="A contained region with one controlled opening">
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        <path
          d={`M${ax.toFixed(1)} ${ay.toFixed(1)} A${R} ${R} 0 1 1 ${bx.toFixed(1)} ${by.toFixed(1)}`}
          className="a-boundary"
          data-draw
          pathLength={1}
        />
        {INSIDE.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={5} className="a-dot-in" />
        ))}
        {/* both captions share one baseline, below the shape */}
        <text x={CX} y={338} textAnchor="middle" className="a-text a-mute">
          reachable
        </text>
      </g>

      {/* the opening — sits in the gap, not over the stroke */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        <rect x={405} y={150} width={34} height={60} rx={5} className="a-gate" />
        <text x={422} y={186} textAnchor="middle" className="a-text a-accent">
          1
        </text>
        <text x={422} y={232} textAnchor="middle" className="a-text a-mute">
          way in
        </text>
      </g>

      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        {OUTSIDE.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={5} className="a-dot-out" />
            <path
              d={`M${x - 7} ${y - 7} L${x + 7} ${y + 7} M${x + 7} ${y - 7} L${x - 7} ${y + 7}`}
              className="a-x"
            />
          </g>
        ))}
        <text x={528} y={338} textAnchor="middle" className="a-text a-mute">
          everything else
        </text>
      </g>
    </svg>
  );
}
