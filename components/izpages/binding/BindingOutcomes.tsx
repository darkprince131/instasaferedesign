import { Glyph } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* ============================================================
   BindingOutcomes — "What stops_ / One machine only." for
   /zero-trust-features/device-binding.

   Replaces the generic IzOutcomes mount with the supplied reference:
   ONE large drawn map (signals in → fingerprinted machine → three
   access verdicts out), then three numbered outcome cards, each
   carrying a verb phrase, one sentence, and one figure.

   The reference's smaller per-card illustrations are deliberately
   NOT built (user call, 2026-08-13): the cards stay typographic and
   all of the drawing budget goes into the big map.

   ONE ORANGE FOCAL: the fingerprint in its scan frame. Verdict
   colours are semantic (allow / warn / deny), never the accent.

   Two compositions, one cast — the wide map cannot shrink to a
   phone (11px labels at 0.3 scale), so ≤860px renders a vertical
   variant with the same pieces and fewer of them, per the
   IzVpnZtnaFlow precedent. Labels that cannot be read are removed,
   not shrunk.
   ============================================================ */

const OUTCOMES: { n: string; title: string; body: string; stat: string; statLabel: string }[] = [
  {
    n: "01",
    title: "Break the phished credential",
    body: "The password arrives at the login page from a machine that was never enrolled, and the login stops there.",
    stat: "0",
    statLabel: "access from an unbound device",
  },
  {
    n: "02",
    title: "Approve before first use",
    body: "No machine self-enrols. An administrator names it, and only then does a certificate get issued.",
    stat: "1",
    statLabel: "approval per device",
  },
  {
    n: "03",
    title: "Revoke the laptop, not the person",
    body: "A lost machine is cut off on its own — the employee keeps working from their desktop the same afternoon.",
    stat: "∞",
    statLabel: "keep working from another device",
  },
];

/* ---------- shared pieces ---------- */

const SIGNALS: { glyph: "gear" | "shield" | "gauge" | "tiles" | "person"; a: string; b: string }[] = [
  { glyph: "gear", a: "OS & SYSTEM", b: "SIGNAL" },
  { glyph: "shield", a: "SECURITY", b: "SIGNAL" },
  { glyph: "gauge", a: "NETWORK", b: "SIGNAL" },
  { glyph: "tiles", a: "APPLICATIONS", b: "SIGNAL" },
  { glyph: "person", a: "IDENTITY", b: "SIGNAL" },
];

function VerdictIcon({ cx, cy, kind }: { cx: number; cy: number; kind: "ok" | "warn" | "no" }) {
  return (
    <g className={`dbo-vic dbo-vic--${kind}`}>
      <circle cx={cx} cy={cy} r={13} />
      {kind === "ok" && <path d={`M${cx - 5.5} ${cy} l4 4.5 7.5-8.5`} className="dbo-vic-m" />}
      {kind === "warn" && <path d={`M${cx - 6} ${cy} h12`} className="dbo-vic-m" />}
      {kind === "no" && (
        <path d={`M${cx - 4.5} ${cy - 4.5} l9 9 M${cx + 4.5} ${cy - 4.5} l-9 9`} className="dbo-vic-m" />
      )}
    </g>
  );
}

/* the laptop, its scan frame and the fingerprint — the map's centre */
function Machine({ cx, top, w, h, fp }: { cx: number; top: number; w: number; h: number; fp: number }) {
  const x = cx - w / 2;
  const cy = top + h / 2;
  const bw = w + 64;
  return (
    <g>
      {/* screen */}
      <rect x={x} y={top} width={w} height={h} rx={14} className="dbo-lap" />
      <rect x={x + 9} y={top + 9} width={w - 18} height={h - 18} rx={8} className="dbo-lap-in" />
      {/* base */}
      <path
        d={`M${cx - bw / 2} ${top + h + 4} h${bw} a8 8 0 0 1 -8 12 H${cx - bw / 2 + 8} a8 8 0 0 1 -8 -12 Z`}
        className="dbo-lap"
      />
      {/* scan frame */}
      {(
        [
          [cx - fp, cy - fp, 1, 1],
          [cx + fp, cy - fp, -1, 1],
          [cx - fp, cy + fp, 1, -1],
          [cx + fp, cy + fp, -1, -1],
        ] as const
      ).map(([bx, by, sx, sy], i) => (
        <path key={i} d={`M${bx + sx * 16} ${by} H${bx} V${by + sy * 16}`} className="dbo-brk" />
      ))}
      {/* the one orange focal */}
      <g className="dbo-fp">
        <Glyph name="fingerprint" cx={cx} cy={cy} size={fp * 1.16} tone="accent" />
      </g>
    </g>
  );
}

function DeviceCard({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={62} rx={10} className="dbo-panel dbo-panel--strong" />
      <g className="dbo-ink">
        <Glyph name="laptop" cx={x + 30} cy={y + 31} size={24} />
      </g>
      <text x={x + 56} y={y + 26} className="dbo-t dbo-t--mute">
        DEVICE ID
      </text>
      <text x={x + 56} y={y + 46} className="dbo-t dbo-t--ink dbo-t--md">
        CORP-LAPTOP-01
      </text>
      <circle cx={x + w - 74} cy={y + 31} r={3.5} className="dbo-dot dbo-dot--ok" />
      <text x={x + w - 64} y={y + 35} className="dbo-t dbo-t--mute">
        VERIFIED
      </text>
    </g>
  );
}

function Posture({ cx, y }: { cx: number; y: number }) {
  const w = 210;
  return (
    <g>
      <text x={cx} y={y} textAnchor="middle" className="dbo-t dbo-t--mute">
        REAL-TIME DEVICE POSTURE
      </text>
      <path
        d={`M${cx - w / 2} ${y + 22} h${w * 0.22} l7 -9 7 9 h${w * 0.14} l6 -6 6 6 h${w * 0.2} l7 -10 7 10 h${w * 0.18}`}
        className="dbo-wave"
      />
      <circle cx={cx + w / 2} cy={y + 22} r={3.5} className="dbo-dot dbo-dot--accent" />
    </g>
  );
}

/* ============================================================
   wide composition — ≥860px
   ============================================================ */
function MapWide() {
  /* laptop */
  const CX = 600;
  const L_TOP = 150;
  const L_W = 264;
  const L_H = 186;

  /* left signal chips */
  const chipY = (i: number) => 140 + i * 66;
  /* where each chip's wire lands on the screen edge */
  const landY = (i: number) => 178 + i * 34;

  /* right verdicts */
  const pill = [
    { y: 128, kind: "ok" as const, a: "ACCESS GRANTED", b: "FULL ACCESS" },
    { y: 268, kind: "warn" as const, a: "ACCESS RESTRICTED", b: "LIMITED · CONTAINED" },
    { y: 408, kind: "no" as const, a: "ACCESS BLOCKED", b: "NO ACCESS" },
  ];

  return (
    <svg
      viewBox="0 0 1200 600"
      className="dbo-svg dbo-svg--w"
      role="img"
      aria-label="Five device signals feed one fingerprinted machine; policy answers with full, restricted or no access"
    >
      {/* ---------- left: the signals ---------- */}
      {SIGNALS.map((s, i) => {
        const y = chipY(i);
        return (
          <g key={s.a}>
            <rect x={44} y={y} width={196} height={52} rx={10} className="dbo-panel" />
            <g className="dbo-ink">
              <Glyph name={s.glyph} cx={72} cy={y + 26} size={22} />
            </g>
            <text x={94} y={y + 24} className="dbo-t dbo-t--ink">
              {s.a}
            </text>
            <text x={94} y={y + 40} className="dbo-t dbo-t--mute dbo-t--xs">
              {s.b}
            </text>
            <circle cx={228} cy={y + 26} r={2.5} className="dbo-dot dbo-dot--accent" />
            {/* wire: chip → staggered elbow → screen edge */}
            <path
              d={`M240 ${y + 26} H${330 + i * 22} V${landY(i)} H${CX - L_W / 2}`}
              className="dbo-dash"
            />
          </g>
        );
      })}

      {/* the enforcement note, under the chips */}
      <rect x={44} y={488} width={300} height={62} rx={10} className="dbo-panel" />
      <path d={`M48 492 v54`} className="dbo-note-rail" />
      <g className="dbo-ink">
        <Glyph name="shield-check" cx={74} cy={519} size={24} />
      </g>
      <text x={98} y={514} className="dbo-t dbo-t--ink">
        DEVICE BINDING ENFORCED
      </text>
      <text x={98} y={532} className="dbo-t dbo-t--mute dbo-t--xs">
        One identity. One device. One session.
      </text>

      {/* ---------- centre: the machine ---------- */}
      <DeviceCard x={470} y={30} w={260} />
      <path d={`M${CX} 92 V${L_TOP}`} className="dbo-dash" />
      <Machine cx={CX} top={L_TOP} w={L_W} h={L_H} fp={52} />
      <path d={`M${CX} ${L_TOP + L_H + 18} V496`} className="dbo-dash" />
      <Posture cx={CX} y={520} />

      {/* ---------- right: the verdicts ---------- */}
      {pill.map((p, i) => {
        const cy = p.y + 28;
        return (
          <g key={p.a}>
            {/* wire: screen edge → staggered elbow → pill */}
            <path
              d={`M${CX + L_W / 2} ${212 + i * 28} H${768 + i * 8} V${cy} H800`}
              className={`dbo-dash dbo-dash--${p.kind}`}
            />
            <rect x={800} y={p.y} width={192} height={56} rx={12} className="dbo-panel dbo-panel--strong" />
            <VerdictIcon cx={826} cy={cy} kind={p.kind} />
            <text x={848} y={cy - 2} className="dbo-t dbo-t--ink">
              {p.a}
            </text>
            <text x={848} y={cy + 15} className="dbo-t dbo-t--mute dbo-t--xs">
              {p.b}
            </text>
            <path d={`M992 ${cy} H1014`} className={`dbo-dash dbo-dash--${p.kind}`} />
          </g>
        );
      })}

      {/* what each verdict opens */}
      <g>
        <rect x={1010} y={96} width={178} height={158} rx={10} className="dbo-panel" />
        <text x={1030} y={120} className="dbo-t dbo-t--mute dbo-t--xs">
          YOUR APPLICATIONS
        </text>
        <path d="M1010 130 H1188" className="dbo-hair" />
        {["AWS Console", "Slack", "Jira", "SAP", "Internal apps"].map((a, i) => (
          <g key={a}>
            <text x={1030} y={152 + i * 21} className="dbo-t">
              {a}
            </text>
            <circle cx={1174} cy={148 + i * 21} r={3} className="dbo-dot dbo-dot--ok" />
          </g>
        ))}
      </g>

      <g>
        <rect x={1010} y={268} width={178} height={72} rx={10} className="dbo-panel" />
        {[
          ["Web apps", "read only"],
          ["Files", "view only"],
        ].map(([a, b], i) => (
          <g key={a}>
            <text x={1030} y={296 + i * 26} className="dbo-t">
              {a} <tspan className="dbo-t--mute dbo-t--xs">· {b}</tspan>
            </text>
            <circle cx={1174} cy={292 + i * 26} r={3} className="dbo-dot dbo-dot--warn" />
          </g>
        ))}
      </g>

      <g>
        <rect x={1010} y={392} width={178} height={72} rx={10} className="dbo-panel" />
        {["Production systems", "Sensitive data"].map((a, i) => (
          <g key={a}>
            <text x={1030} y={420 + i * 26} className="dbo-t">
              {a}
            </text>
            <circle cx={1174} cy={416 + i * 26} r={3} className="dbo-dot dbo-dot--no" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ============================================================
   narrow composition — <860px. Same cast, vertical, fewer words.
   ============================================================ */
function MapNarrow() {
  const CX = 190;
  const pills = [
    { y: 430, kind: "ok" as const, a: "ACCESS GRANTED", b: "FULL ACCESS" },
    { y: 506, kind: "warn" as const, a: "ACCESS RESTRICTED", b: "LIMITED · CONTAINED" },
    { y: 582, kind: "no" as const, a: "ACCESS BLOCKED", b: "NO ACCESS" },
  ];
  return (
    <svg
      viewBox="0 0 380 730"
      className="dbo-svg dbo-svg--n"
      role="img"
      aria-label="Device signals feed one fingerprinted machine; policy answers with full, restricted or no access"
    >
      <DeviceCard x={60} y={16} w={260} />
      <path d={`M${CX} 78 V110`} className="dbo-dash" />
      <Machine cx={CX} top={110} w={200} h={140} fp={42} />
      <path d={`M${CX} 286 V314`} className="dbo-dash" />

      {/* signals: glyph tiles only — labels this small would be noise */}
      {SIGNALS.map((s, i) => (
        <g key={s.a}>
          <rect x={58 + i * 56} y={314} width={44} height={44} rx={10} className="dbo-panel" />
          <g className="dbo-ink">
            <Glyph name={s.glyph} cx={80 + i * 56} cy={336} size={22} />
          </g>
        </g>
      ))}
      <text x={CX} y={388} textAnchor="middle" className="dbo-t dbo-t--mute dbo-t--xs">
        5 SIGNAL TYPES · CHECKED IN REAL TIME
      </text>
      <path d={`M${CX} 398 V430`} className="dbo-dash" />

      {pills.map((p) => {
        const cy = p.y + 28;
        return (
          <g key={p.a}>
            <rect x={70} y={p.y} width={240} height={56} rx={12} className="dbo-panel dbo-panel--strong" />
            <VerdictIcon cx={98} cy={cy} kind={p.kind} />
            <text x={120} y={cy - 2} className="dbo-t dbo-t--ink">
              {p.a}
            </text>
            <text x={120} y={cy + 15} className="dbo-t dbo-t--mute dbo-t--xs">
              {p.b}
            </text>
          </g>
        );
      })}

      <Posture cx={CX} y={682} />
    </svg>
  );
}

/* ============================================================
   the section
   ============================================================ */
export function BindingOutcomes() {
  return (
    <section className="dbg-sec dbg-sec--alt dbo" id="outcomes">
      <div className="iz-wrap">
        <div className="dbg-head">
          <span className="iz-ey">What stops_</span>
          <h2>
            One machine <em>only.</em>
          </h2>
        </div>

        <div className="dbo-map">
          <MapWide />
          <MapNarrow />
        </div>

        <ol className="dbo-cards">
          {OUTCOMES.map((o) => (
            <li key={o.n} className="dbo-card">
              <span className="dbo-num">{o.n}</span>
              <h3>{o.title}</h3>
              <p>{o.body}</p>
              <div className="dbo-stat">
                <b>{o.stat}</b>
                <span>{o.statLabel}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
