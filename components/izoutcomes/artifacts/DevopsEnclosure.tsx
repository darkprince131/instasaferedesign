import type { ArtifactProps } from "./types";

/* /secure-devops-access · the toolchain inside the envelope — built
   from the supplied reference sheet.

   ONE artifact, per docs/three-outcomes-rule.md. The reference's three
   column drawings (a crossed globe, a person with a lock, a document
   with a play head) are folded into this picture as its three parts:

     0 · the toolchain vanishes   the dashed envelope, everything the
                                  engineers actually touch inside it,
                                  and nothing answering outside
     1 · least privilege, same    the pipeline running untouched above,
         workflow                 dropping through ONE gate
     2 · logged and replayable    the evidence leaving for the SIEM

   NOT ANOTHER LAYER BAR. `/secure-cloud-applications` is in this
   cluster and its picture is a stratum with a tinted bar; repeating
   that here would make two pages read as one diagram. The shared noun
   here is the ENVELOPE — a region the internet cannot see into — so
   the geometry is an enclosure with one opening, not a sandwich.

   GLYPHS ARE DRAWN, not iconised. The house style carries both: the
   plane artifacts use the Phosphor set, and these tool marks are
   hand-drawn line art at one weight, which keeps the family varied
   without going ragged.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~11.1 units at
   16px and ~9.0 at 13px. The tightest run is "not on the internet"
   (19ch at 13px → 171 wide) against the envelope's inner floor.

   MOBILE. Second tier carries `a-opt` and drops below 900px, leaving
   the five that matter: the pipeline's two ends, the envelope's
   claim, the gate's terms, and where the evidence goes. */

const VB_W = 1010;
const VB_H = 560;

/* ---------- part 1 · the pipeline that does not change ---------- */
const STAGES = ["Developer", "Commit", "Build", "Deploy", "Production"];
const STAGE_W = 150;
const STAGE_H = 64;
const STAGE_Y = 40;
const STAGE_X = [40, 232, 424, 616, 808];
const stageMid = (i: number) => STAGE_X[i] + STAGE_W / 2;

/* ---------- the one opening ---------- */
const GATE_CX = 505;
const GATE_CY = 250;
const GATE_R = 26;

/* ---------- part 0 · the envelope ---------- */
const ENV_X = 120;
const ENV_Y = 250;
const ENV_W = 770;
const ENV_H = 210;

const TOOLS = [
  { id: "ssh", label: "SSH", logo: null },
  { id: "git", label: "Git", logo: "github" },
  { id: "k8s", label: "kubectl", logo: "kubernetes" },
  { id: "ci", label: "CI runner", logo: "jenkins" },
];
const TOOL_W = 163;
const TOOL_H = 84;
const TOOL_Y = 300;
const TOOL_X = [152, 333, 514, 695];

/* ---------- part 2 · where the evidence goes ---------- */
const EV_Y = 496;
const EV_H = 32;
const EVENTS = ["session start", "cmd recorded", "replay ready"];
const EV_X = [240, 404, 568];
const EV_W = 150;
const SIEM_X = 762;
const SIEM_W = 110;

/** Corner-rounded polyline — a drawn route, not circuitry. */
function rounded(pts: [number, number][], r: number) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const d1 = Math.hypot(cx - px, cy - py) || 1;
    const d2 = Math.hypot(nx - cx, ny - cy) || 1;
    const rr = Math.min(r, d1 / 2, d2 / 2);
    const s = [cx + ((px - cx) / d1) * rr, cy + ((py - cy) / d1) * rr];
    const e = [cx + ((nx - cx) / d2) * rr, cy + ((ny - cy) / d2) * rr];
    d += ` L ${s[0].toFixed(1)} ${s[1].toFixed(1)} Q ${cx} ${cy} ${e[0].toFixed(1)} ${e[1].toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

/** every stage drops to the same bus, then through the same gate */
function drop(i: number) {
  const x = stageMid(i);
  return rounded(
    [
      [x, STAGE_Y + STAGE_H],
      [x, 196],
      [GATE_CX, 196],
      [GATE_CX, GATE_CY - GATE_R],
    ],
    14
  );
}

/* ---------- the drawn marks ---------- */

function StageGlyph({ i, cx, cy }: { i: number; cx: number; cy: number }) {
  if (i === 0) {
    /* developer — angle brackets */
    return (
      <g className="dv-glyph">
        <path d={`M${cx - 5} ${cy - 8} l-8 8 l8 8 M${cx + 5} ${cy - 8} l8 8 l-8 8`} />
      </g>
    );
  }
  if (i === 1) {
    /* commit — a branch */
    return (
      <g className="dv-glyph">
        <circle cx={cx - 8} cy={cy - 7} r={4} />
        <circle cx={cx - 8} cy={cy + 8} r={4} />
        <circle cx={cx + 9} cy={cy} r={4} />
        <path d={`M${cx - 8} ${cy - 3} v7 M${cx - 4} ${cy + 6} l9 -4`} />
      </g>
    );
  }
  if (i === 2) {
    /* build — a cog, drawn as a ring with teeth rather than a filled icon */
    return (
      <g className="dv-glyph">
        <circle cx={cx} cy={cy} r={6} />
        <circle cx={cx} cy={cy} r={11} />
        <path d={`M${cx} ${cy - 15} v3 M${cx} ${cy + 12} v3 M${cx - 15} ${cy} h3 M${cx + 12} ${cy} h3`} />
      </g>
    );
  }
  if (i === 3) {
    /* deploy — a package */
    return (
      <g className="dv-glyph">
        <path d={`M${cx} ${cy - 11} l11 6 v11 l-11 6 l-11 -6 v-11 Z`} />
        <path d={`M${cx - 11} ${cy - 5} l11 6 l11 -6 M${cx} ${cy + 1} v11`} />
      </g>
    );
  }
  /* production — a running service, drawn as stacked live rows */
  return (
    <g className="dv-glyph">
      <rect x={cx - 12} y={cy - 11} width={24} height={9} rx={2} />
      <rect x={cx - 12} y={cy + 2} width={24} height={9} rx={2} />
      <path d={`M${cx - 7} ${cy - 6.5} h2 M${cx - 7} ${cy + 6.5} h2`} />
    </g>
  );
}

/** the only tool we hold no mark for */
function ShellGlyph({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="dv-glyph">
      <rect x={cx - 15} y={cy - 12} width={30} height={24} rx={3} />
      <path d={`M${cx - 8} ${cy - 4} l5 4 l-5 4 M${cx + 1} ${cy + 5} h7`} />
    </g>
  );
}

export function DevopsEnclosure({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-art--dev"
      role="img"
      aria-label="A DevOps pipeline running unchanged above an envelope that holds SSH, Git, kubectl and the CI runner off the internet, with one gate between them and evidence streaming to a SIEM"
    >
      {/* ---------- 1 · least privilege, same workflow ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        {STAGES.map((s, i) => (
          <g key={s}>
            <rect x={STAGE_X[i]} y={STAGE_Y} width={STAGE_W} height={STAGE_H} rx={8} className="a-chip" />
            <StageGlyph i={i} cx={stageMid(i)} cy={STAGE_Y + 24} />
            <text
              x={stageMid(i)}
              y={STAGE_Y + 54}
              textAnchor="middle"
              className={`a-text dv-sm a-mute${i === 0 || i === STAGES.length - 1 ? "" : " a-opt"}`}
            >
              {s}
            </text>
          </g>
        ))}

        {/* the pipeline still runs left to right, untouched */}
        {STAGES.slice(0, -1).map((s, i) => (
          <path
            key={`${s}-arrow`}
            d={`M${STAGE_X[i] + STAGE_W + 8} ${STAGE_Y + STAGE_H / 2} H${STAGE_X[i + 1] - 12}`}
            className="dv-arrow"
            markerEnd="url(#dv-head)"
          />
        ))}

        {STAGES.map((s, i) => (
          <path
            key={`${s}-drop`}
            d={drop(i)}
            className="z-dash-accent"
            style={{ ["--seg" as string]: i } as React.CSSProperties}
          />
        ))}

        {/* ONE opening, and it is a gate rather than a hole */}
        <circle cx={GATE_CX} cy={GATE_CY} r={GATE_R} className="dv-gate" />
        <g className="dv-glyph dv-glyph--accent">
          <rect x={GATE_CX - 9} y={GATE_CY - 2} width={18} height={14} rx={2} />
          <path d={`M${GATE_CX - 5} ${GATE_CY - 2} v-5 a5 5 0 0 1 10 0 v5`} />
        </g>
        {/* ABOVE the envelope, not on it: at the gate's own baseline the
            label straddled the dashed border by 8 units and read as a
            mistake rather than as an annotation */}
        <text x={GATE_CX + 44} y={218} className="a-text dv-sm a-accent">
          just-in-time · time-bound
        </text>
      </g>

      {/* ---------- 0 · the toolchain vanishes ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        <rect x={ENV_X} y={ENV_Y} width={ENV_W} height={ENV_H} rx={20} className="dv-env" />

        {TOOLS.map((t, i) => (
          <g key={t.id}>
            <rect x={TOOL_X[i]} y={TOOL_Y} width={TOOL_W} height={TOOL_H} rx={8} className="a-chip" />
            {t.logo ? (
              <image
                href={`/logos/integrations/${t.logo}.svg`}
                x={TOOL_X[i] + TOOL_W / 2 - 14}
                y={TOOL_Y + 16}
                width={28}
                height={28}
              />
            ) : (
              <ShellGlyph cx={TOOL_X[i] + TOOL_W / 2} cy={TOOL_Y + 30} />
            )}
            <text
              x={TOOL_X[i] + TOOL_W / 2}
              y={TOOL_Y + 68}
              textAnchor="middle"
              className="a-text dv-sm a-mute a-opt"
            >
              {t.label}
            </text>
          </g>
        ))}

        {/* the claim, drawn where the envelope closes */}
        <g className="dv-glyph">
          <circle cx={398} cy={432} r={11} />
          <path d="M391 425 l14 14 M387 432 h22 M398 421 a14 14 0 0 1 0 22 a14 14 0 0 1 0 -22" />
        </g>
        <text x={420} y={437} className="a-text dv-sm a-mute">
          not on the internet
        </text>
      </g>

      {/* ---------- 2 · logged and replayable ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        <path
          d={rounded(
            [
              [GATE_CX, ENV_Y + ENV_H],
              [GATE_CX, EV_Y - 18],
              [EV_X[0] - 24, EV_Y - 18],
              [EV_X[0] - 24, EV_Y + EV_H / 2],
              [EV_X[0], EV_Y + EV_H / 2],
            ],
            12
          )}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 5 } as React.CSSProperties}
        />

        {EVENTS.map((e, i) => (
          <g key={e}>
            <rect x={EV_X[i]} y={EV_Y} width={EV_W} height={EV_H} rx={6} className="a-chip" />
            <circle cx={EV_X[i] + 16} cy={EV_Y + EV_H / 2} r={4} className="z-dot-ok" />
            <text x={EV_X[i] + 30} y={EV_Y + 21} className="a-text dv-sm a-mute a-opt">
              {e}
            </text>
            {i < EVENTS.length - 1 && (
              <path
                d={`M${EV_X[i] + EV_W + 2} ${EV_Y + EV_H / 2} H${EV_X[i + 1] - 4}`}
                className="dv-arrow"
                markerEnd="url(#dv-head)"
              />
            )}
          </g>
        ))}

        <path
          d={`M${EV_X[2] + EV_W + 2} ${EV_Y + EV_H / 2} H${SIEM_X - 4}`}
          className="dv-arrow"
          markerEnd="url(#dv-head)"
        />
        <rect x={SIEM_X} y={EV_Y} width={SIEM_W} height={EV_H} rx={6} className="dv-siem" />
        <text x={SIEM_X + SIEM_W / 2} y={EV_Y + 21} textAnchor="middle" className="a-text dv-sm a-accent">
          SIEM
        </text>
      </g>

      <defs>
        <marker id="dv-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 7 5 L 0 8.5" className="dv-head" />
        </marker>
      </defs>
    </svg>
  );
}
