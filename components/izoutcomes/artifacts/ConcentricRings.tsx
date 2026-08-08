import type { ArtifactProps } from "./types";

/* T2 · Concentric rings — many inputs resolving to one decision.
   The only one of the first four that uses lines, and they are orbits
   rather than arrows: nothing points at anything, so it reads as
   convergence rather than a flowchart.

   Parts: 0 outer inputs · 1 inner signals · 2 the decision. */

const CX = 320;
const CY = 180;

type Chip = { r: number; a: number; label: string };

const OUTER: Chip[] = [
  { r: 138, a: -150, label: "IDENTITY" },
  { r: 138, a: -60, label: "DEVICE" },
  { r: 138, a: 20, label: "LOCATION" },
  { r: 138, a: 105, label: "RISK" },
];
const INNER: Chip[] = [
  { r: 82, a: -110, label: "POSTURE" },
  { r: 82, a: 55, label: "CONTEXT" },
];

const pos = (r: number, aDeg: number) => {
  const a = (aDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
};

function Chips({ chips, part, on }: { chips: Chip[]; part: number; on: boolean }) {
  return (
    <g data-part={part} data-on={on || undefined}>
      {chips.map((c) => {
        const { x, y } = pos(c.r, c.a);
        const w = c.label.length * 7.2 + 18;
        return (
          <g key={c.label}>
            <rect x={x - w / 2} y={y - 12} width={w} height={24} rx={4} className="a-chip" />
            <text x={x} y={y + 4} textAnchor="middle" className="a-text a-ink">
              {c.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function ConcentricRings({ highlightIndex }: ArtifactProps) {
  return (
    <svg viewBox="0 0 640 360" className="iz-art" role="img" aria-label="Signals resolving to one decision">
      <circle cx={CX} cy={CY} r={138} className="a-orbit" data-draw pathLength={1} />
      <circle cx={CX} cy={CY} r={82} className="a-orbit" data-draw pathLength={1} />

      <Chips chips={OUTER} part={0} on={highlightIndex === 0} />
      <Chips chips={INNER} part={1} on={highlightIndex === 1} />

      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        <circle cx={CX} cy={CY} r={40} className="a-core" />
        <circle cx={CX} cy={CY} r={40} className="a-core-ring" data-draw pathLength={1} />
        <text x={CX} y={CY - 2} textAnchor="middle" className="a-text a-accent">
          ALLOW
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" className="a-text a-mute">
          once
        </text>
      </g>
    </svg>
  );
}
