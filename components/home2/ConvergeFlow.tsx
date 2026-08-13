"use client";

/* ============================================================
   C21 · Convergence flow.
   Everything the workforce touches — people, devices, identity,
   apps, locations, networks — funnels through the InstaSafe core
   and out to one secured workspace. Orange pulses run the dashed
   connectors on an infinite loop. All-SVG so it scales cleanly.
   Scoped `.cf-`; tokens from `.iz`.
   ============================================================ */

const ROWS = [
  { label: "Workforce", marks: 4 },
  { label: "Devices", marks: 4 },
  { label: "Identity", marks: 4 },
  { label: "Apps", marks: 4 },
  { label: "Locations", marks: 3 },
  { label: "Networks", marks: 3 },
];

/* ============================================================
   WHAT CONVERGES IS CONFIGURABLE, AND IT MATTERS.

   The defaults below say everything "meets at InstaSafe" — true for
   the consolidation story this was drawn for, and flatly wrong next to
   a privacy argument, where the whole claim is that your traffic never
   reaches us. Reused as-is on /why-instasafe-zero-trust it would have
   made reason 01 argue against itself in a single section.

   So the copy and the two node labels are props. A caller that means
   "SIGNALS converge, traffic does not" says so, and the same drawing
   carries the opposite point without a second component.
   ============================================================ */
export type ConvergeFlowProps = {
  kicker?: string;
  /** the accented clause is passed separately so it stays an <em> */
  title?: string;
  titleEm?: string;
  lead?: string;
  /** label under the core ellipse */
  coreLabel?: string;
  /** heading on the right-hand panel */
  outLabel?: string;
  cta?: { label: string; href: string };
};

const rowY = (i: number) => 70 + i * 92;
const NODE = { x: 680, y: 310 };

/* connector from a left row into the core */
const leftPath = (i: number) => {
  const y = rowY(i);
  return `M360,${y} C490,${y} 520,${NODE.y} 602,${NODE.y}`;
};
const rightPath = `M758,${NODE.y} L840,${NODE.y}`;

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function ConvergeFlow({
  kicker = "One control point",
  title = "Everything funnels through",
  titleEm = "one verified core",
  lead = "People, devices, identities, apps, locations and networks all meet at InstaSafe — then flow out to one secured workspace.",
  coreLabel = "InstaSafe ZTNA",
  outLabel = "One secured workspace",
  cta = { label: "Explore the platform", href: "/platform" },
}: ConvergeFlowProps = {}) {
  return (
    <div className="cf">
      <div className="cf-head">
        <span className="iz-ey">{kicker}</span>
        <h2 className="iz-h2">{title} <em>{titleEm}</em>.</h2>
        <p className="cf-lead">{lead}</p>
      </div>

      <svg viewBox="0 0 1060 620" className="cf-svg" role="img" aria-label="Sources converging through the InstaSafe core to one secured workspace">
        <defs>
          <filter id="cf-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* connectors */}
        {ROWS.map((_, i) => (
          <path key={`p${i}`} id={`cf-p${i}`} className="cf-conn" d={leftPath(i)} />
        ))}
        <path id="cf-pr" className="cf-conn" d={rightPath} />

        {/* left rows */}
        {ROWS.map((r, i) => {
          const y = rowY(i);
          return (
            <g key={r.label}>
              <rect className="cf-tile" x={36} y={y - 28} width={150} height={56} rx={12} />
              {Array.from({ length: r.marks }).map((_, m) => (
                <rect key={m} className="cf-mark" x={54 + m * 30} y={y - 9} width={18} height={18} rx={5} />
              ))}
              <text className="cf-cat" x={202} y={y + 5}>{r.label}</text>
            </g>
          );
        })}

        {/* core node */}
        <ellipse className="cf-node-halo" cx={NODE.x} cy={NODE.y} rx={92} ry={104} />
        <ellipse className="cf-node" cx={NODE.x} cy={NODE.y} rx={78} ry={92} />
        {/* lock mark */}
        <g className="cf-lock" transform={`translate(${NODE.x - 22}, ${NODE.y - 26})`}>
          <rect x={4} y={20} width={36} height={26} rx={6} />
          <path d="M11 20 v-6 a11 11 0 0 1 22 0 v6" fill="none" />
          <circle cx={22} cy={32} r={3.4} />
        </g>
        <text className="cf-node-label" x={NODE.x} y={NODE.y + 132}>{coreLabel}</text>

        {/* right product panel */}
        <g>
          <rect className="cf-panel" x={840} y={150} width={196} height={320} rx={14} />
          <text className="cf-panel-title" x={938} y={184}>{outLabel}</text>
          {/* mini bars */}
          {[40, 64, 30, 80, 52, 70].map((h, i) => (
            <rect key={i} className={`cf-bar${i === 3 ? " hot" : ""}`} x={866 + i * 26} y={266 - h} width={14} height={h} rx={3} />
          ))}
          <line className="cf-panel-rule" x1={862} x2={1014} y1={286} y2={286} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect className="cf-prow" x={862} y={306 + i * 34} width={152} height={22} rx={6} />
              <rect className="cf-pdot" x={872} y={312 + i * 34} width={10} height={10} rx={3} />
            </g>
          ))}
        </g>

        {/* pulses */}
        {ROWS.map((_, i) => (
          <circle key={`pulse${i}`} className="cf-pulse" r={4} filter="url(#cf-glow)">
            <animateMotion dur="2.6s" begin={`${-i * 0.42}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath href={`#cf-p${i}`} />
            </animateMotion>
          </circle>
        ))}
        <circle className="cf-pulse" r={4} filter="url(#cf-glow)">
          <animateMotion dur="1.1s" repeatCount="indefinite">
            <mpath href="#cf-pr" />
          </animateMotion>
        </circle>
      </svg>

      <a className="cf-learn" href={cta.href}>
        {cta.label} {Arrow}
      </a>
    </div>
  );
}
