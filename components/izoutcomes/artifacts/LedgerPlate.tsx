import type { ArtifactProps } from "./types";

/* T1 · Ledger plate — label/value rows with two struck through.
   Depicts REMOVAL and REVOCATION. No connecting lines.

   Parts: 0 the standing rows · 1 the two revoked rows · 2 the tally. */

const ROWS = [
  { label: "okta · directory", value: "ACTIVE", gone: false },
  { label: "salesforce", value: "ACTIVE", gone: false },
  { label: "jump box · bastion", value: "REVOKED", gone: true },
  { label: "vpn concentrator", value: "REVOKED", gone: true },
  { label: "internal wiki", value: "ACTIVE", gone: false },
];

export function LedgerPlate({ highlightIndex }: ArtifactProps) {
  return (
    <svg viewBox="0 0 640 360" className="iz-art" role="img" aria-label="Access ledger with two entries revoked">
      <rect x="60" y="30" width="520" height="300" rx="10" className="a-plate" />
      <line x1="60" y1="78" x2="580" y2="78" className="a-line" data-draw pathLength={1} />
      <text x="84" y="62" className="a-text a-mute">
        resource
      </text>
      <text x="556" y="62" className="a-text a-mute" textAnchor="end">
        state
      </text>

      {ROWS.map((r, i) => {
        const y = 110 + i * 42;
        const part = r.gone ? 1 : 0;
        return (
          <g key={r.label} data-part={part} data-on={highlightIndex === part || undefined}>
            <text x="84" y={y} className={`a-text ${r.gone ? "a-mute" : "a-ink"}`}>
              {r.label}
            </text>
            <text x={556} y={y} textAnchor="end" className={`a-text ${r.gone ? "a-deny" : "a-ink"}`}>
              {r.value}
            </text>
            {r.gone && (
              <line
                x1="80"
                y1={y - 5}
                x2="560"
                y2={y - 5}
                className="a-strike"
                data-draw
                pathLength={1}
              />
            )}
          </g>
        );
      })}

      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        <line x1="60" y1="300" x2="580" y2="300" className="a-line" data-draw pathLength={1} />
        <text x="84" y="322" className="a-text a-mute">
          removed in one action
        </text>
        <text x="556" y="322" textAnchor="end" className="a-text a-accent">
          2 of 5
        </text>
      </g>
    </svg>
  );
}
