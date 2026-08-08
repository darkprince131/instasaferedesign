import type { ArtifactProps } from "./types";

/* ZTNA architecture — user → decision → the two possible endings.

   The argument is the FORK, not the flow: one path resolves to the two
   apps you were entitled to, the other resolves to everything else and
   is refused. Both endings are on screen at once, which is what makes
   "access, not access to everything" a picture rather than a slogan.

   Highlight map (hover an outcome column):
     0 the decision card · 1 what stays unreachable ·
     2 the refusal itself · 3 what you actually reach

   REAL LOGOS on the granted tiles (2026-08-09, by instruction). They
   read as an example estate rather than the entitled set — the refused
   column beside them is what carries the argument.

   Glyphs are hand-drawn paths rather than icon components: an icon
   library inside a fixed viewBox fights the coordinate system, and
   these are six shapes. */

const ROWS_USER = ["Device", "Identity", "Posture"];
const CHECKS = ["Verify", "Authorize", "Open tunnel"];
const APPS: { label: string; logo: string }[] = [
  { label: "AWS", logo: "aws" },
  { label: "Slack", logo: "slack" },
];
const BLOCKED = ["RDP", "SSH", "Databases", "Internal apps", "File shares"];

/* ---- glyphs, all drawn in a 20×20 box translated into place ---- */
const Laptop = () => <path d="M3 4h14v9H3z M1 16h18" className="z-glyph" />;
const Person = () => (
  <>
    <circle cx="10" cy="6" r="3.4" className="z-glyph" />
    <path d="M3.5 16c0-3.6 2.9-5.4 6.5-5.4s6.5 1.8 6.5 5.4" className="z-glyph" />
  </>
);
const Shield = () => <path d="M10 2l7 2.6v5.2c0 4-3 6.6-7 8-4-1.4-7-4-7-8V4.6z" className="z-glyph" />;
const Finger = () => (
  <>
    <path d="M4 10a6 6 0 0 1 12 0" className="z-glyph" />
    <path d="M6.6 11.6a3.4 3.4 0 0 1 6.8 0v2.6" className="z-glyph" />
    <path d="M10 11.4v4.4" className="z-glyph" />
  </>
);
const Lock = () => (
  <>
    <rect x="4" y="9" width="12" height="8.5" rx="1.6" className="z-glyph" />
    <path d="M7 9V6.6a3 3 0 0 1 6 0V9" className="z-glyph" />
  </>
);
const Server = () => (
  <>
    <rect x="3" y="4" width="14" height="4.6" rx="1" className="z-glyph" />
    <rect x="3" y="11.4" width="14" height="4.6" rx="1" className="z-glyph" />
  </>
);

const GLYPH_USER = [Laptop, Person, Shield];
const GLYPH_CHECK = [Finger, Shield, Lock];

function G({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: React.ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
}

export function ZtnaArchitecture({ highlightIndex }: ArtifactProps) {
  const on = (i: number) => (highlightIndex === i ? true : undefined);

  return (
    <svg
      viewBox="0 0 720 470"
      className="iz-art iz-art--ztna"
      role="img"
      aria-label="A user verified once, reaching two entitled applications while everything else stays unreachable"
    >
      {/* ---------------- user ---------------- */}
      <g>
        <rect x="8" y="120" width="148" height="196" rx="10" className="a-plate" />
        <text x="30" y="150" className="a-text a-mute">
          USER
        </text>
        <line x1="8" y1="164" x2="156" y2="164" className="a-line" data-draw pathLength={1} />
        {ROWS_USER.map((r, i) => {
          const Glyph = GLYPH_USER[i];
          const y = 196 + i * 44;
          return (
            <g key={r}>
              <G x={26} y={y - 14} s={0.9}>
                <Glyph />
              </G>
              <text x={62} y={y + 2} className="a-text a-ink">
                {r}
              </text>
            </g>
          );
        })}
      </g>

      {/* request */}
      <path d="M160 218 H228" className="z-dash-neutral" style={{ ["--seg" as string]: 0 } as React.CSSProperties} />
      <path d="M228 218 l-8 -4 v8 z" className="z-arrow" />

      {/* ---------------- the decision ---------------- */}
      <g data-part={0} data-on={on(0)}>
        {/* offset backing plate — the one card in the picture with real
            depth, because it is the one thing making a decision */}
        <rect x="244" y="104" width="252" height="244" rx="12" className="z-gate-back" />
        <rect x="236" y="96" width="252" height="244" rx="12" className="a-plate z-gate" />
        <rect x="258" y="118" width="22" height="22" rx="6" className="z-mark" />
        <path d="M264 129 l4 4 l8 -8" className="z-mark-tick" />
        <text x="292" y="134" className="a-text a-ink">
          INSTASAFE ZTNA
        </text>
        <line x1="236" y1="158" x2="488" y2="158" className="a-line" data-draw pathLength={1} />
        {CHECKS.map((c, i) => {
          const Glyph = GLYPH_CHECK[i];
          const y = 196 + i * 50;
          return (
            <g key={c}>
              <G x={258} y={y - 14} s={0.9}>
                <Glyph />
              </G>
              <text x={294} y={y + 2} className="a-text a-ink">
                {c}
              </text>
              <circle cx={466} cy={y - 4} r={9} className="z-ok-ring" />
              <path d={`M461 ${y - 4} l3.4 3.6 l7 -7.4`} className="z-ok-tick" />
            </g>
          );
        })}
      </g>

      {/* ---------------- granted ----------------
          Right-hand panels sit at x 556 and run 156 wide. They were 140
          at x 572, which fitted 13px type; once the labels went to 16px
          "YOUR APPLICATIONS" and "Internal apps" both ran past the
          viewBox edge. Panel headers and row labels carry their own
          smaller sizes for the same reason. */}
      <g data-part={3} data-on={on(3)}>
        {/* each tunnel is two segments interrupted by a lock checkpoint,
            so the flow visibly passes THROUGH the lock rather than the
            lock floating over an unbroken wire */}
        <path d="M488 196 H520 V153" className="z-dash-allow" style={{ ["--seg" as string]: 1 } as React.CSSProperties} />
        <path d="M520 127 V86 H556" className="z-dash-allow" style={{ ["--seg" as string]: 3 } as React.CSSProperties} />
        <circle cx={520} cy={140} r={13} className="z-lock-chip" />
        <g className="z-lock-glyph">
          <G x={512} y={132} s={0.8}>
            <Lock />
          </G>
        </g>

        <path d="M488 246 H536 V213" className="z-dash-allow" style={{ ["--seg" as string]: 2 } as React.CSSProperties} />
        <path d="M536 187 V152 H556" className="z-dash-allow" style={{ ["--seg" as string]: 4 } as React.CSSProperties} />
        <circle cx={536} cy={200} r={13} className="z-lock-chip" />
        <g className="z-lock-glyph">
          <G x={528} y={192} s={0.8}>
            <Lock />
          </G>
        </g>

        <text x="556" y="46" className="a-text a-mute z-panel-label">
          YOUR APPLICATIONS
        </text>
        {APPS.map((a, i) => (
          <g key={a.label}>
            <rect x={556} y={60 + i * 66} width={156} height={54} rx={8} className="a-plate" />
            <image
              href={`/logos/integrations/${a.logo}.svg`}
              x={572}
              y={76 + i * 66}
              width={22}
              height={22}
            />
            <text x={604} y={92 + i * 66} className="a-text a-ink z-row-label">
              {a.label}
            </text>
            <circle cx={694} cy={78 + i * 66} r={4} className="z-dot-ok" />
          </g>
        ))}
      </g>

      {/* ---------------- refused ---------------- */}
      <g data-part={2} data-on={on(2)}>
        <path d="M488 296 H524 V321" className="z-dash-deny" style={{ ["--seg" as string]: 2 } as React.CSSProperties} />
        <circle cx={524} cy={336} r={13} className="z-no-ring" />
        <path d="M518 330 l12 12 M530 330 l-12 12" className="z-no-x" />
        <path d="M537 336 H556" className="z-dash-deny" style={{ ["--seg" as string]: 4 } as React.CSSProperties} />
      </g>

      <g data-part={1} data-on={on(1)}>
        <text x="550" y="258" className="a-text a-mute z-panel-label">
          NOT REACHABLE
        </text>
        <rect x={550} y={270} width={162} height={188} rx={8} className="a-plate z-blocked" />
        {BLOCKED.map((b, i) => {
          const y = 298 + i * 36;
          return (
            <g key={b}>
              <G x={564} y={y - 13} s={0.6}>
                <Server />
              </G>
              <text x={594} y={y + 2} className="a-text a-mute z-row-label">
                {b}
              </text>
              {i < BLOCKED.length - 1 && (
                <line x1={550} y1={y + 16} x2={712} y2={y + 16} className="a-line" />
              )}
            </g>
          );
        })}
      </g>

    </svg>
  );
}
