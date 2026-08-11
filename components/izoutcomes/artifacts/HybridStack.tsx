import type { ArtifactProps } from "./types";

/* /solutions/hybrid-work · one stack, not two — built from the
   supplied reference sheet.

   ONE artifact, per docs/three-outcomes-rule.md. The reference's three
   column drawings (a ticked shield, stacked layers, a person with a
   tick) are folded into this picture as its parts:

     0 · security stops depending   three places docking into the SAME
         on where people sit        face of the same stack
     1 · IT runs one stack, not two the stack itself — four checks in
                                    one column — beside the second
                                    stack that no longer has to exist
     2 · WFH equals the desk        two readouts with identical
                                    numbers, which is the whole claim

   WHY THIS IS NOT THE REMOTE-ACCESS PICTURE. `/secure-remote-access`
   is in this cluster and already draws three locations converging on
   a gate; repeating that here would be the same diagram twice. So the
   locations are TEXT CHIPS docked flat onto a stack — no place
   glyphs, no converging wires, no gate — and the subject is the stack
   an IT team runs, not the journey a user takes.

   THE SHARED NOUN is the stack. All three claims are about there
   being exactly one of it.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~11.1 units at
   16px and ~9.0 at 13px. The tightest run is "Context evaluated"
   (17ch → 189 from x=322, ending 511 inside a slab that ends at 620).

   MOBILE. Second tier carries `a-opt` and drops below 900px, leaving
   the five that matter: the three layers that do the work, the tag on
   the stack, and the two readouts' titles. */

const VB_W = 1010;
const VB_H = 500;

/* ---------- part 0 · where people sit ---------- */
const CHIPS = [
  { id: "office", label: "Office", y: 140 },
  { id: "home", label: "Home", y: 250 },
  { id: "airport", label: "Airport", y: 360 },
];
const CHIP_X = 60;
const CHIP_W = 150;
const CHIP_H = 48;

/* ---------- part 1 · the stack ---------- */
const STACK_X = 280;
const STACK_W = 340;
const SLAB_H = 60;
const SLABS = [
  { id: "identity", label: "Identity verified", y: 110 },
  { id: "device", label: "Device trusted", y: 182 },
  { id: "context", label: "Context evaluated", y: 254 },
  { id: "policy", label: "Policy enforced", y: 326 },
];
/** the second stack a hybrid rollout usually buys, drawn as the thing
 *  that is not there */
const GHOST_X = 280;
const GHOST_Y = [430, 448, 466];
const GHOST_W = 200;

/* ---------- part 2 · the two seats that measure the same ---------- */
const CARD_X = 680;
const CARD_W = 270;
const CARD_H = 150;
const CARDS = [
  { id: "desk", title: "At the desk", y: 110 },
  { id: "home", title: "At home", y: 280 },
];
const READINGS = ["apps · all", "policy · same", "latency · 28 ms"];

/* ---------- the drawn marks ---------- */

/** the tick each layer carries — drawn, so the four read as one hand */
function Tick({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="hy-glyph hy-glyph--accent">
      <circle cx={cx} cy={cy} r={11} />
      <path d={`M${cx - 5} ${cy} l4 4 l7 -8`} />
    </g>
  );
}

export function HybridStack({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-art--hyb"
      role="img"
      aria-label="Office, home and airport docking into one access stack of identity, device, context and policy checks, with the second stack crossed out and two seats reading identical numbers"
    >
      {/* ---------- 0 · security stops depending on where people sit ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        {CHIPS.map((c, i) => (
          <g key={c.id}>
            <rect x={CHIP_X} y={c.y} width={CHIP_W} height={CHIP_H} rx={8} className="a-chip" />
            <text x={CHIP_X + CHIP_W / 2} y={c.y + 30} textAnchor="middle" className="a-text hy-sm a-mute a-opt">
              {c.label}
            </text>
            {/* docked flat onto the stack's face — no journey, no gate */}
            <path
              d={`M${CHIP_X + CHIP_W} ${c.y + CHIP_H / 2} H${STACK_X}`}
              className="z-dash-accent"
              style={{ ["--seg" as string]: i } as React.CSSProperties}
            />
          </g>
        ))}
      </g>

      {/* ---------- 1 · one stack, not two ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        {SLABS.map((s, i) => (
          <g key={s.id}>
            <rect x={STACK_X} y={s.y} width={STACK_W} height={SLAB_H} rx={8} className="hy-slab" />
            <Tick cx={STACK_X + 26} cy={s.y + SLAB_H / 2} />
            <text
              x={STACK_X + 48}
              y={s.y + SLAB_H / 2 + 6}
              className={`a-text a-ink${i === SLABS.length - 1 ? " a-opt" : ""}`}
            >
              {s.label}
            </text>
          </g>
        ))}
        <text x={STACK_X} y={408} className="a-text hy-sm a-accent">
          one policy engine · one control plane
        </text>

        {/* the stack a hybrid rollout usually buys, and does not here */}
        {GHOST_Y.map((y) => (
          <rect key={y} x={GHOST_X} y={y} width={GHOST_W} height={12} rx={3} className="hy-ghost" />
        ))}
        <path
          d={`M${GHOST_X + 8} ${GHOST_Y[0] - 6} L${GHOST_X + GHOST_W - 8} ${GHOST_Y[2] + 18}`}
          className="a-strike"
        />
        <text x={GHOST_X + GHOST_W + 22} y={GHOST_Y[1] + 12} className="a-text hy-sm a-mute a-opt">
          no second stack for remote
        </text>
      </g>

      {/* ---------- 2 · the WFH experience equals the desk ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        {CARDS.map((c, i) => (
          <g key={c.id}>
            {/* fed from the stack's other face, so the parity is a
                consequence rather than a coincidence */}
            <path
              d={`M${STACK_X + STACK_W} ${c.y + CARD_H / 2} H${CARD_X}`}
              className="z-dash-accent"
              style={{ ["--seg" as string]: 3 + i } as React.CSSProperties}
            />
            <rect x={CARD_X} y={c.y} width={CARD_W} height={CARD_H} rx={10} className="a-plate" />
            <text x={CARD_X + 20} y={c.y + 34} className="a-text a-ink">
              {c.title}
            </text>
            <path d={`M${CARD_X + 20} ${c.y + 48} H${CARD_X + CARD_W - 20}`} className="a-line" data-draw pathLength={1} />
            {READINGS.map((r, j) => (
              <text key={r} x={CARD_X + 20} y={c.y + 76 + j * 26} className="a-text hy-sm a-mute a-opt">
                {r}
              </text>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
