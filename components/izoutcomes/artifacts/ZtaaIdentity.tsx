import type { ArtifactProps } from "./types";

/* ZTAA — identity plane: directory → verified session → applications.

   The argument is the SPINE, not the fan: one directory record feeds
   one verification hub feeds every application. Cut the record and
   everything below it closes — which is outcome 02 stated as geometry.

   Highlight map (hover an outcome column):
     0 the directory card       (one source of identity truth)
     1 the bus and the tiles    (offboarding in one action)
     2 the hub and its badges   (authentication that matches risk)

   Wires are ACCENT here, not allow-green: this is the identity plane,
   nothing is being granted or refused yet. Green is reserved for the
   per-app session LEDs.

   GEOMETRY IS CHECKED, NOT EYEBALLED. The card is 410 wide centred on
   360 (x 155→565) and its three cells sit at 175 / 315 / 445 because
   "Sales, Procurement" measures 131 units at 11px and overran a cell
   pitch of 124 in the first pass. Name and email baselines are 22
   apart for the same reason. Re-measure with getBBox after moving
   anything here — the collision is invisible until it isn't.

   Real logos throughout, from the normalized set in
   /public/logos/integrations. The fifth tile started as a generic glyph
   ("and the rest") but standing instruction is to use a real mark
   wherever one exists. */

const CARD_X = 155;
const CARD_W = 410;
const CARD_R = CARD_X + CARD_W; // 565

const TILES: { label: string; logo: string | null }[] = [
  { label: "AWS", logo: "aws" },
  { label: "Slack", logo: "slack" },
  { label: "SAP", logo: "sap" },
  { label: "GitHub", logo: "github" },
  { label: "Zoom", logo: "zoom" },
];
const TILE_XS = [120, 240, 360, 480, 600];

const CELLS: { label: string; value: string }[] = [
  { label: "Groups", value: "Sales, Procurement" },
  { label: "Roles", value: "App User" },
  { label: "MFA Policy", value: "Adaptive" },
];
const CELL_XS = [175, 315, 445];

/* ---- glyphs, 20×20 boxes ---- */
const Person = () => (
  <>
    <circle cx="10" cy="6" r="3.4" className="z-glyph" />
    <path d="M3.5 16c0-3.6 2.9-5.4 6.5-5.4s6.5 1.8 6.5 5.4" className="z-glyph" />
  </>
);
const Lock = () => (
  <>
    <rect x="4" y="9" width="12" height="8.5" rx="1.6" className="z-glyph" />
    <path d="M7 9V6.6a3 3 0 0 1 6 0V9" className="z-glyph" />
  </>
);
const Globe = () => (
  <>
    <circle cx="10" cy="10" r="7.5" className="z-glyph" />
    <path d="M2.5 10h15M10 2.5c2.6 2.2 2.6 12.8 0 15c-2.6-2.2-2.6-12.8 0-15" className="z-glyph" />
  </>
);

function G({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: React.ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
}

/** A connector segment. `seg` orders the one-shot connect animation so
 *  the run reads source → hub → estate rather than all at once. */
function Wire({ d, seg }: { d: string; seg: number }) {
  return <path d={d} className="z-dash-accent" style={{ ["--seg" as string]: seg } as React.CSSProperties} />;
}

/* Width is DERIVED from the label, never hardcoded — the first pass
   used fixed 92/128/104 pills and "Authenticated" overran its own by
   37 units. 9.6 is the mono advance at 16px, 46 covers tick + padding. */
const badgeW = (label: string) => Math.round(label.length * 9.6 + 46);

function Badge({ x, y, label, seg }: { x: number; y: number; label: string; seg: number }) {
  const w = badgeW(label);
  return (
    <g className="zt-badge-g" style={{ ["--seg" as string]: seg } as React.CSSProperties}>
      <rect x={x} y={y} width={w} height={26} rx={13} className="zt-badge" />
      <circle cx={x + 15} cy={y + 13} r={6} className="z-ok-ring" />
      <path d={`M${x + 11.6} ${y + 13} l2.4 2.6 l4.6 -5.2`} className="z-ok-tick" />
      <text x={x + 28} y={y + 17} className="a-text zt-badge-text">
        {label}
      </text>
    </g>
  );
}

export function ZtaaIdentity({ highlightIndex }: ArtifactProps) {
  const on = (i: number) => (highlightIndex === i ? true : undefined);

  return (
    <svg
      viewBox="0 0 720 470"
      className="iz-art iz-art--ztaa"
      role="img"
      aria-label="One directory record verified into sessions across every application"
    >
      {/* ---------------- the directory ---------------- */}
      <g data-part={0} data-on={on(0)}>
        <rect x={CARD_X + 8} y={16} width={CARD_W} height={148} rx={10} className="z-gate-back" />
        <rect x={CARD_X} y={8} width={CARD_W} height={148} rx={10} className="a-plate z-gate" />

        <G x={CARD_X + 18} y={22} s={0.8}>
          <Person />
        </G>
        <text x={CARD_X + 44} y={35} className="a-text a-mute zt-sm">
          IDENTITY DIRECTORY
        </text>
        <line x1={CARD_X} y1={50} x2={CARD_R} y2={50} className="a-line" data-draw pathLength={1} />

        <circle cx={CARD_X + 34} cy={79} r={16} className="zt-avatar" />
        <text x={CARD_X + 34} y={84} textAnchor="middle" className="a-text a-accent zt-sm">
          AR
        </text>
        {/* 22 units between baselines — at 18 the bounding boxes touched */}
        <text x={CARD_X + 62} y={73} className="a-text a-ink">
          Anita Rao
        </text>
        <text x={CARD_X + 62} y={95} className="a-text a-mute zt-sm">
          anita.rao@acme.in
        </text>
        <circle cx={CARD_R - 78} cy={79} r={4} className="z-dot-ok" />
        <text x={CARD_R - 67} y={84} className="a-text zt-ok zt-sm">
          Active
        </text>

        <line x1={CARD_X} y1={112} x2={CARD_R} y2={112} className="a-line" data-draw pathLength={1} />
        {CELLS.map((c, i) => (
          <g key={c.label}>
            <text x={CELL_XS[i]} y={132} className="a-text a-ink zt-sm">
              {c.label}
            </text>
            <text x={CELL_XS[i]} y={150} className="a-text a-mute zt-xs">
              {c.value}
            </text>
          </g>
        ))}
      </g>

      {/* ---------------- the hub ---------------- */}
      <g data-part={2} data-on={on(2)}>
        <Wire d="M360 156 V196" seg={0} />
        <circle cx={360} cy={224} r={38} className="zt-orbit" />
        <circle cx={360} cy={224} r={27} className="zt-orbit" />
        <circle cx={360} cy={224} r={16} className="zt-hub" />
        <g className="zt-hub-glyph">
          <G x={352} y={216} s={0.8}>
            <Lock />
          </G>
        </g>

        <Badge x={322 - 18 - badgeW("Verified")} y={211} label="Verified" seg={1} />
        <Badge x={416} y={211} label="Authenticated" seg={1} />
        <Badge x={360 - badgeW("Authorized") / 2} y={274} label="Authorized" seg={2} />
      </g>

      {/* ---------------- the estate ---------------- */}
      <g data-part={1} data-on={on(1)}>
        <Wire d="M360 252 V274" seg={2} />
        <Wire d="M360 300 V318" seg={3} />
        <Wire d={`M${TILE_XS[0]} 318 H${TILE_XS[4]}`} seg={4} />
        {TILE_XS.map((x, i) => (
          <Wire key={x} d={`M${x} 318 V352`} seg={5 + i} />
        ))}

        {TILES.map((t, i) => {
          const x = TILE_XS[i];
          return (
            <g key={t.label}>
              <rect x={x - 48} y={352} width={96} height={84} rx={10} className="a-plate" />
              {t.logo ? (
                <image href={`/logos/integrations/${t.logo}.svg`} x={x - 15} y={366} width={30} height={30} />
              ) : (
                <G x={x - 12} y={368} s={1.2}>
                  <Globe />
                </G>
              )}
              <text x={x - 8} y={422} textAnchor="middle" className="a-text a-ink zt-sm">
                {t.label}
              </text>
              <circle cx={x + 30} cy={418} r={3.5} className="z-dot-ok" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
