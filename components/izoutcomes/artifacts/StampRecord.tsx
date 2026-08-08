import type { ArtifactProps } from "./types";

/* T9 · Stamp / record — a boxed audit record with a corner seal.
   Depicts PROOF and ATTRIBUTION. No connecting lines: the argument is
   that a decision left a record, and a record is a document, not a
   diagram.

   Parts: 0 the metadata · 1 the seal · 2 the hash. */

const META: [string, string][] = [
  ["actor", "meera@acme.com"],
  ["resource", "prod-db-01"],
  ["decision", "ALLOW · step-up"],
  ["approved by", "s.callaway"],
  ["session", "recorded · 14m 22s"],
];

export function StampRecord({ highlightIndex }: ArtifactProps) {
  return (
    <svg viewBox="0 0 640 360" className="iz-art" role="img" aria-label="A signed audit record">
      <rect x="86" y="34" width="468" height="292" rx="8" className="a-plate" />
      {/* clipped corner — a record, not a card */}
      <path d="M506 34 L554 82" className="a-line" data-draw pathLength={1} />

      <text x="112" y="70" className="a-text a-mute">
        audit record
      </text>
      <line x1="86" y1="88" x2="554" y2="88" className="a-line" data-draw pathLength={1} />

      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        {META.map(([k, v], i) => {
          const y = 124 + i * 34;
          return (
            <g key={k}>
              <text x="112" y={y} className="a-text a-mute">
                {k}
              </text>
              <text x="286" y={y} className="a-text a-ink">
                {v}
              </text>
            </g>
          );
        })}
      </g>

      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        <circle cx="480" cy="228" r="44" className="a-seal" data-draw pathLength={1} />
        <circle cx="480" cy="228" r="35" className="a-seal-inner" data-draw pathLength={1} />
        <path d="M464 228 l11 12 l22 -25" className="a-check" data-draw pathLength={1} />
        <text x="480" y="262" textAnchor="middle" className="a-text a-accent">
          SIGNED
        </text>
      </g>

      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        <line x1="86" y1="292" x2="554" y2="292" className="a-line" data-draw pathLength={1} />
        <text x="112" y="314" className="a-text a-mute">
          sha256
        </text>
        <text x="186" y="314" className="a-text a-ink">
          9f2c…a41e
        </text>
      </g>
    </svg>
  );
}
