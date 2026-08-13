import type { ArtifactProps } from "./types";

/* per-page · Bound devices — the approved-hardware roster.

   Depicts THE SHORT LIST YOU CONTROL, which is the noun all three of
   the device-binding outcomes share: known hardware gets a session,
   everything else is refused, and anything on the list can come off
   it in one action.

   Built on the T1 ledger grammar (plate, hairline header, struck
   rows, a tally on the foot rule) rather than inventing a new shape —
   but with DEVICES and their certificates, not applications. It is a
   separate artifact instead of a `rows` prop on LedgerPlate because
   the artifact contract is deliberately one prop and carries no copy;
   content belongs in the artifact, not in the page that mounts it.

   No connecting lines: the argument is that a roster is a document.

   Parts: 0 the bound rows · 1 the revoked row · 2 the tally.
*/

const ROWS: { device: string; id: string; state: string; gone: boolean }[] = [
  { device: "MacBook Pro 14", id: "8F3X-2K7Q", state: "BOUND", gone: false },
  { device: "ThinkPad T14", id: "4B1D-9WQ2", state: "BOUND", gone: false },
  { device: "Pixel 8 · field", id: "7C2A-5MN4", state: "BOUND", gone: false },
  { device: "MacBook Air 13", id: "2E9K-6RT8", state: "REVOKED", gone: true },
  { device: "unknown host", id: "—", state: "REFUSED", gone: true },
];

export function BoundDevices({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox="0 0 640 360"
      className="iz-art"
      role="img"
      aria-label="A roster of approved devices, with one revoked and one refused"
    >
      <rect x="60" y="30" width="520" height="300" rx="10" className="a-plate" />
      <line x1="60" y1="78" x2="580" y2="78" className="a-line" data-draw pathLength={1} />
      <text x="84" y="62" className="a-text a-mute">
        device
      </text>
      <text x="360" y="62" className="a-text a-mute">
        hardware id
      </text>
      <text x="556" y="62" className="a-text a-mute" textAnchor="end">
        state
      </text>

      {ROWS.map((r, i) => {
        const y = 110 + i * 42;
        const part = r.gone ? 1 : 0;
        return (
          <g key={r.device} data-part={part} data-on={highlightIndex === part || undefined}>
            {/* the certificate seal — present only where the binding holds */}
            {!r.gone && <circle cx="72" cy={y - 5} r="3.5" className="a-seal" />}
            <text x="84" y={y} className={`a-text ${r.gone ? "a-mute" : "a-ink"}`}>
              {r.device}
            </text>
            <text x="360" y={y} className="a-text a-mute">
              {r.id}
            </text>
            <text x={556} y={y} textAnchor="end" className={`a-text ${r.gone ? "a-deny" : "a-allow"}`}>
              {r.state}
            </text>
            {r.gone && (
              <line x1="80" y1={y - 5} x2="560" y2={y - 5} className="a-strike" data-draw pathLength={1} />
            )}
          </g>
        );
      })}

      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        <line x1="60" y1="300" x2="580" y2="300" className="a-line" data-draw pathLength={1} />
        <text x="84" y="322" className="a-text a-mute">
          certificates live
        </text>
        <text x={556} y="322" textAnchor="end" className="a-text a-accent">
          3 of 5
        </text>
      </g>
    </svg>
  );
}
