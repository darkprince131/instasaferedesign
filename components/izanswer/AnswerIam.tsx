import { Glyph, type GlyphName } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* "What is IAM?" — the answer-strip illustration for /platform/iam.

   THE MECHANISM IS THE THREE QUESTIONS. IAM is "who are they, what
   may they touch, and is it really them" — so the picture opens with
   those three as three panels holding REAL ROWS, not as three icons
   with captions. A reader who knows nothing should be able to name
   the three from the shapes alone.

   Everything below the panels is consequence: one policy node, the
   applications it governs, and the line of log it writes. That
   descent is the argument — identity decisions govern real access,
   not just a login page.

   NOT THE OUTCOMES ARTIFACT. `IamDirectory` (the outcomes plane)
   shows sources converging and an estate following. This one teaches
   the vocabulary instead, and the two never share a page position.

   TYPE. viewBox 720 against a ~518px slot ≈ 0.72 scale: 18px lands
   near 13px, 15px near 11px, 13px near 9px — which is why 13px is
   used only for row labels and the log, never for a sentence. Mono
   advance is 12.5 / 10.4 / 9.0 units at those sizes. */

const VB_W = 720;
const VB_H = 740;

const MID = 360;

/* ---------- the three questions ---------- */
const PANEL_W = 224;
const PANEL_X = [30, 243, 456];
const PANEL_Y = 40;
const PANEL_H = 210;
const PANELS = [
  {
    id: "who",
    n: "1",
    title: "Identities",
    sub: "users in a directory",
    glyph: "person" as GlyphName,
    rows: [
      { label: "arjun.r", glyph: "person" as GlyphName },
      { label: "priya.s", glyph: "person" as GlyphName },
      { label: "neha.v", glyph: "person" as GlyphName },
    ],
  },
  {
    id: "what",
    n: "2",
    title: "Access",
    sub: "roles and groups",
    glyph: "people" as GlyphName,
    rows: [
      { label: "IT admins", glyph: "shield" as GlyphName },
      { label: "Developers", glyph: "code" as GlyphName },
      { label: "Contractors", glyph: "person" as GlyphName },
    ],
  },
  {
    id: "really",
    n: "3",
    title: "Authentication",
    sub: "layered verification",
    glyph: "lock" as GlyphName,
    rows: [
      { label: "know", glyph: "lock" as GlyphName },
      { label: "have", glyph: "laptop" as GlyphName },
      { label: "are", glyph: "fingerprint" as GlyphName },
    ],
  },
];
const ROW_Y = [110, 150, 190];
const BUS_Y = 292;

/* ---------- the decision ---------- */
const NODE_X = 200;
const NODE_Y = 330;
const NODE_W = 320;
const NODE_H = 90;

/* ---------- what it governs ---------- */
const APPS_Y = 470;
const APPS = [
  { id: "hr", label: "HR portal", glyph: "buildings" as GlyphName },
  { id: "sales", label: "Sales app", glyph: "chart" as GlyphName },
  { id: "git", label: "Git server", glyph: "code" as GlyphName },
  { id: "db", label: "DB console", glyph: "database" as GlyphName },
  { id: "files", label: "File share", glyph: "folder" as GlyphName },
];
const APP_X = [60, 182, 304, 426, 548];
const APP_W = 112;

/* ---------- and what it writes down ---------- */
const LOG_Y = 650;

const LIFECYCLE = [
  { label: "join", tone: "allow" as const, y: 346 },
  { label: "granted", tone: "allow" as const, y: 372 },
  { label: "removed", tone: "deny" as const, y: 398 },
];

export function AnswerIam() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-ans iz-ans--iam"
      role="img"
      aria-label="Identities, access groups and layered authentication feed one InstaSafe IAM policy decision, which governs the HR portal, sales app, git server, database console and file share, and writes each access to a log"
    >
      {/* ---------- the three questions IAM answers ---------- */}
      {PANELS.map((p, i) => (
        <g key={p.id}>
          <rect x={PANEL_X[i]} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx={10} className="a-plate" />
          <text x={PANEL_X[i] + 16} y={76} className="a-text an-sm a-ink">
            <tspan className="an-n">{p.n}</tspan> {p.title}
          </text>
          <text x={PANEL_X[i] + 16} y={96} className="a-text an-xs a-mute an-opt">
            {p.sub}
          </text>
          {p.rows.map((r, j) => (
            <g key={r.label}>
              <rect x={PANEL_X[i] + 12} y={ROW_Y[j]} width={200} height={34} rx={6} className="a-chip" />
              <Glyph name={r.glyph} cx={PANEL_X[i] + 32} cy={ROW_Y[j] + 17} size={18} />
              <text x={PANEL_X[i] + 50} y={ROW_Y[j] + 22} className="a-text an-xs a-mute an-opt">
                {r.label}
              </text>
            </g>
          ))}

          {/* each question drops to the same decision */}
          <path
            d={`M${PANEL_X[i] + PANEL_W / 2} ${PANEL_Y + PANEL_H} V${BUS_Y}`}
            className="z-dash-accent"
            style={{ ["--seg" as string]: i } as React.CSSProperties}
          />
        </g>
      ))}
      <path
        d={`M${PANEL_X[0] + PANEL_W / 2} ${BUS_Y} H${PANEL_X[2] + PANEL_W / 2}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 3 } as React.CSSProperties}
      />
      <path
        d={`M${MID} ${BUS_Y} V${NODE_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 4 } as React.CSSProperties}
      />

      {/* ---------- one decision, made live ---------- */}
      <rect x={NODE_X} y={NODE_Y} width={NODE_W} height={NODE_H} rx={10} className="an-node" />
      <Glyph name="shield-check" cx={NODE_X + 40} cy={NODE_Y + 45} size={30} tone="accent" />
      <text x={NODE_X + 74} y={NODE_Y + 38} className="a-text a-ink">
        InstaSafe IAM
      </text>
      <text x={NODE_X + 74} y={NODE_Y + 62} className="a-text an-xs a-mute an-opt">
        {/* "in real time" ran 3 units past the panel; the shorter
            phrase says the same thing inside it */}
        policy decision, live
      </text>

      {/* the lifecycle the decision follows */}
      {LIFECYCLE.map((l) => (
        <g key={l.label}>
          <circle cx={562} cy={l.y - 4} r={4} className={l.tone === "allow" ? "z-dot-ok" : "an-dot-no"} />
          <text x={576} y={l.y} className="a-text an-xs a-mute an-opt">
            {l.label}
          </text>
        </g>
      ))}

      <path
        d={`M${MID} ${NODE_Y + NODE_H} V${APPS_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 5 } as React.CSSProperties}
      />

      {/* ---------- what an identity decision actually governs ---------- */}
      <rect x={40} y={APPS_Y} width={640} height={140} rx={10} className="a-plate" />
      <text x={60} y={APPS_Y + 30} className="a-text an-sm a-ink">
        Access to applications
      </text>
      {APPS.map((a, i) => (
        <g key={a.id}>
          <rect x={APP_X[i]} y={APPS_Y + 46} width={APP_W} height={76} rx={8} className="a-chip" />
          <Glyph name={a.glyph} cx={APP_X[i] + APP_W / 2} cy={APPS_Y + 74} size={26} />
          <text
            x={APP_X[i] + APP_W / 2}
            y={APPS_Y + 110}
            textAnchor="middle"
            className="a-text an-xs a-mute an-opt"
          >
            {a.label}
          </text>
        </g>
      ))}

      {/* ---------- and the line it writes ---------- */}
      <rect x={40} y={LOG_Y} width={640} height={64} rx={10} className="a-chip" />
      <Glyph name="terminal" cx={74} cy={LOG_Y + 32} size={24} />
      <text x={104} y={LOG_Y + 38} className="a-text an-xs a-mute an-opt">
        09:42:21 arjun.r accessed Sales app · MFA verified
      </text>
    </svg>
  );
}
