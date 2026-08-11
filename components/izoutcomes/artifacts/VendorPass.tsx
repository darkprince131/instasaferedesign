import { Glyph, type GlyphName } from "./DrawnGlyphs";
import type { ArtifactProps } from "./types";

/* /third-party-access · the vendor pass — built from the supplied
   reference sheet.

   ONE artifact, per docs/three-outcomes-rule.md. The reference's three
   column drawings (a badged person, a calendar with a cross, a tile
   grid) are folded into this picture as its three parts:

     0 · attribution by default   a named person from a named company,
                                  with the recording switch on
     1 · no orphaned access       the countdown, the expiry date, and a
                                  lifecycle whose last state is REVOKED
                                  rather than "someone remembers"
     2 · onboard in minutes       the four tiles the grant consists of

   TYPE. The rule assigns T7 — the expiry timeline — to this page, and
   pairs it with /vpn-alternative's migration so the shared type says
   two different things. Here it runs FORWARD TO AN EXPIRY: the
   lifecycle's terminal node is drawn dashed and revoked, and the ring
   is a clock running down, not a progress bar filling up.

   THE SHARED NOUN is the pass — a thing that is issued, carried, and
   stops working — which is why it is drawn as one object with a
   lanyard rather than as a process with four boxes.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~11.1 units at
   16px, ~9.0 at 13px and ~23.6 at 34px. The tightest run is the
   lifecycle sub "choose apps and duration" (24ch → 946 against the
   1010 edge). Shorten a label rather than shrinking the type.

   MOBILE. At ~340px the 13px viewBox type renders near 4px, so the
   second tier carries `a-opt` and is dropped below 900px. What
   survives is the five that matter — the holder, the grant, the days
   left, what it opens, and how it ends — plus the accent ring. */

const VB_W = 1010;
const VB_H = 560;

/* ---------- the pass ---------- */
const CARD_X = 60;
const CARD_Y = 64;
const CARD_W = 520;
const CARD_H = 430;
const CARD_R = CARD_X + CARD_W; // 580
/** inner gutter — every row in the card starts here */
const PAD = 32;
const IN_L = CARD_X + PAD; // 92
const IN_R = CARD_R - PAD; // 548

/* ---------- part 1 · the clock ---------- */
const RING_CX = 470;
const RING_CY = 258;
const RING_R = 52;
/** 6 of 7 days remaining — the arc IS the fraction, not a decoration */
const DAYS_TOTAL = 7;
const DAYS_LEFT = 6;

/* ---------- part 2 · what the grant consists of ---------- */
const TILES = [
  { label: "ERP", glyph: "buildings" as GlyphName },
  { label: "Jira", glyph: "board" as GlyphName },
  { label: "DB view", glyph: "database" as GlyphName },
  { label: "SSH", glyph: "terminal" as GlyphName },
];
const TILE_W = 102;
const TILE_X = [92, 210, 328, 446];
const TILE_Y = 352;
const TILE_H = 64;

/* ---------- part 1 · the lifecycle, ending in revocation ---------- */
const STEP_CX = 690;
const STEP_R = 26;
const STEP_CY = [120, 226, 332, 438];
const STEPS = [
  { title: "Invite vendor", sub: "add user to group", glyph: "person-add" as GlyphName },
  { title: "Assign access", sub: "choose apps and duration", glyph: "tiles" as GlyphName },
  { title: "Access active", sub: "work happens, logged", glyph: "calendar" as GlyphName },
  { title: "Access expires", sub: "automatically revoked", glyph: "lock" as GlyphName },
];
/** the spine the pass feeds, and the stub each node hangs off */
const SPINE_X = 620;
const CARD_MID = CARD_Y + CARD_H / 2; // 279

/** the remaining arc, drawn clockwise from twelve o'clock */
function countdownArc() {
  const frac = DAYS_LEFT / DAYS_TOTAL;
  const a = -Math.PI / 2 + frac * Math.PI * 2;
  const x = RING_CX + RING_R * Math.cos(a);
  const y = RING_CY + RING_R * Math.sin(a);
  const large = frac > 0.5 ? 1 : 0;
  return `M${RING_CX} ${RING_CY - RING_R} A${RING_R} ${RING_R} 0 ${large} 1 ${x.toFixed(1)} ${y.toFixed(1)}`;
}

export function VendorPass({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-art--tpa"
      role="img"
      aria-label="A vendor pass naming its holder, the apps it opens and the days it has left, beside a lifecycle that ends in automatic revocation"
    >
      {/* ---------- 0 · attribution by default ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        {/* the lanyard — the pass is issued to someone and worn */}
        <path d={`M306 4 v${CARD_Y - 22} M334 4 v${CARD_Y - 22}`} className="a-line" data-draw pathLength={1} />
        <rect x={300} y={CARD_Y - 22} width={40} height={26} rx={6} className="a-chip" />

        <rect x={CARD_X} y={CARD_Y} width={CARD_W} height={CARD_H} rx={16} className="a-plate" />

        <circle cx={132} cy={132} r={34} className="zt-avatar" />
        <Glyph name="person" cx={132} cy={132} size={32} />
        <text x={192} y={126} className="a-text tp-name a-ink">
          Vendor User
        </text>
        <text x={192} y={152} className="a-text tp-sm a-mute a-opt">
          Acme Solutions
        </text>

        <path d={`M${IN_L} 186 H${IN_R}`} className="a-line" data-draw pathLength={1} />

        {/* the switch that makes every action attributable */}
        <path d={`M${IN_L} 430 H${IN_R}`} className="a-line" data-draw pathLength={1} />
        <Glyph name="record" cx={IN_L + 10} cy={458} size={18} tone="accent" />
        <text x={IN_L + 30} y={464} className="a-text tp-sm a-mute a-opt">
          Session recording
        </text>
        <text x={IN_R} y={464} textAnchor="end" className="a-text tp-sm a-accent a-opt">
          ON
        </text>
      </g>

      {/* ---------- 1 · no orphaned access ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        <text x={IN_L} y={224} className="a-text tp-sm a-mute a-opt">
          ACCESS GRANTED
        </text>
        <text x={IN_L} y={268} className="a-text tp-big a-ink">
          7 days
        </text>
        <text x={IN_L} y={296} className="a-text tp-sm a-mute a-opt">
          Expires 24 May 2026, 23:59
        </text>

        {/* the clock: a full track with the remaining arc over it */}
        <circle cx={RING_CX} cy={RING_CY} r={RING_R} className="tp-track" />
        <path d={countdownArc()} className="tp-arc" data-draw pathLength={1} />
        <text x={RING_CX} y={RING_CY + 4} textAnchor="middle" className="a-text tp-big a-accent">
          {DAYS_LEFT}
        </text>
        <text x={RING_CX} y={RING_CY + 28} textAnchor="middle" className="a-text tp-xs a-mute a-opt">
          days left
        </text>

        {/* the pass feeds one spine, and the spine feeds the lifecycle */}
        <path
          d={`M${CARD_R} ${CARD_MID} H${SPINE_X}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 0 } as React.CSSProperties}
        />
        <path
          d={`M${SPINE_X} ${STEP_CY[0]} V${STEP_CY[3]}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 1 } as React.CSSProperties}
        />

        {STEPS.map((s, i) => {
          const last = i === STEPS.length - 1;
          return (
            <g key={s.title}>
              <path
                d={`M${SPINE_X} ${STEP_CY[i]} H${STEP_CX - STEP_R}`}
                className="z-dash-accent"
                style={{ ["--seg" as string]: 2 + i } as React.CSSProperties}
              />
              <circle
                cx={STEP_CX}
                cy={STEP_CY[i]}
                r={STEP_R}
                className={last ? "tp-node-end" : "tp-node"}
              />
              <Glyph
                name={s.glyph}
                cx={STEP_CX}
                cy={STEP_CY[i]}
                size={26}
                tone={last ? "accent" : "dim"}
              />
              {/* only the terminal state survives the phone: the three
                  steps before it are how you get there, and "it ends by
                  itself" is the claim the column is making */}
              <text x={730} y={STEP_CY[i] - 2} className={`a-text ${last ? "a-accent" : "a-ink a-opt"}`}>
                {s.title}
              </text>
              <text x={730} y={STEP_CY[i] + 20} className="a-text tp-sm a-mute a-opt">
                {s.sub}
              </text>
            </g>
          );
        })}
      </g>

      {/* ---------- 2 · onboard in minutes ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        <text x={IN_L} y={336} className="a-text tp-sm a-mute">
          ALLOWED APPS
        </text>
        {TILES.map((t, i) => (
          <g key={t.label}>
            <rect x={TILE_X[i]} y={TILE_Y} width={TILE_W} height={TILE_H} rx={8} className="a-chip" />
            <Glyph name={t.glyph} cx={TILE_X[i] + TILE_W / 2} cy={TILE_Y + 26} size={26} />
            <text
              x={TILE_X[i] + TILE_W / 2}
              y={TILE_Y + 54}
              textAnchor="middle"
              className="a-text tp-xs a-mute a-opt"
            >
              {t.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
