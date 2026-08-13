import { Glyph } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* "What is the InstaSafe platform?" — the answer-strip illustration
   for /platform, built from the supplied reference.

   ONE REQUEST, WALKED END TO END. Four facts about the request come
   in at the top (who, from what, in what context, for which
   resource); the console checks all four and signs one decision;
   the ORANGE LINE — the only accent path in the picture — carries
   the encrypted tunnel from that decision to the one application it
   opened. Everything else the network holds sits below in dashed
   ghost tiles, crossed out, because "not reachable" is half of the
   claim.

   The reference is landscape; the strip's slot is portrait (~543px),
   so the scene stacks: inputs → console → tunnel → SAP → the dark
   estate. Same cast, same one orange line, different axis — the
   AnswerBinding precedent.

   TYPE. viewBox 720 against a ~543px slot ≈ 0.75 scale.
   Reuses `.iz-ans--pos` for the shared palette; `.iz-ans--plat`
   carries only the tunnel, ghost tiles and verdict pills. */

const VB_W = 720;
const VB_H = 1102;

/* ---------- the four facts ---------- */
const IN_Y = 34;
const IN_H = 78;
const IN_W = 250;
const IN_GAP = 24;
const IN_LX = 98;
const IN_RX = IN_LX + IN_W + IN_GAP;

type Fact = { glyph: Parameters<typeof Glyph>[0]["name"]; k: string; v: string };
const FACTS: Fact[] = [
  { glyph: "person", k: "USER", v: "arjun@company.com" },
  { glyph: "laptop", k: "DEVICE", v: "Corporate laptop" },
  { glyph: "clock", k: "CONTEXT", v: "Office · 09:42 IST" },
  { glyph: "tiles", k: "REQUEST", v: "SAP Finance Portal" },
];

/* ---------- the console ----------
   FOUR BANDS, each doing one job, so the eye is told where it is:
     brand   who this console belongs to
     request what is being asked, of what
     checks  an inset card — the answers, on their own ground
     decision the verdict, CENTRED and accented

   A dark rail runs down the left from the brand bar, carrying the
   same four glyphs as the rows. It is the contrast the reference
   leans on: without it the console is four grey bands and nothing
   says "this is an application". */
const C_X = 98;
const C_Y = 268;
const C_W = 524;
const C_R = C_X + C_W;

const RAIL_W = 54;
const BRAND_H = 46;
const REQ_H = 60;
const ROW_H = 60;
const CARD_PAD = 10;
const DEC_H = 100;

const CHECKS: { glyph: Parameters<typeof Glyph>[0]["name"]; label: string; q: string; verdict: string }[] = [
  { glyph: "fingerprint", label: "Identity", q: "who they claim to be?", verdict: "Verified" },
  { glyph: "laptop", label: "Device", q: "secure and compliant?", verdict: "Compliant" },
  { glyph: "clock", label: "Context", q: "place, time, network?", verdict: "Allowed" },
  { glyph: "tiles", label: "Resource", q: "the right app for them?", verdict: "Authorized" },
];

const CARD_X = C_X + RAIL_W + 12;
const CARD_W = C_R - CARD_X - 16;
const CARD_Y = C_Y + BRAND_H + REQ_H;
const CARD_H = CHECKS.length * ROW_H + CARD_PAD * 2;
const DEC_Y = CARD_Y + CARD_H;
const C_H = BRAND_H + REQ_H + CARD_H + DEC_H;

/* ---------- the tunnel and its destination ----------
   DERIVED, not typed. The console grew when the decision band did and
   the SAP card — on a hard-coded 726 — ended up starting ABOVE the
   console's own foot. Everything below now hangs off C_BOTTOM, so the
   scene cannot overlap itself again when a band changes height. */
const C_BOTTOM = C_Y + C_H;
const T_EXIT_X = 250; // under the decision chip, so the tunnel is its consequence
const T_MID_Y = C_BOTTOM + 96;
const SAP_X = 372;
const SAP_W = 250;
const SAP_H = 88;
const SAP_Y = T_MID_Y - SAP_H / 2;

/* ---------- the dark estate ---------- */
const G_Y = SAP_Y + SAP_H + 54;
const G_H = 62;
const GHOSTS: { glyph: Parameters<typeof Glyph>[0]["name"]; name: string }[] = [
  { glyph: "gauge", name: "The network" },
  { glyph: "terminal", name: "Other servers" },
  { glyph: "database", name: "Databases" },
  { glyph: "tiles", name: "Internal apps" },
];

export function AnswerPlatform() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-ans iz-ans--pos iz-ans--plat"
      role="img"
      aria-label="One access request checked four ways — identity, device, context, resource — then one encrypted tunnel to SAP, while the network, servers and databases stay unreachable"
    >
      {/* ================= the four facts ================= */}
      {FACTS.map((f, i) => {
        const x = i % 2 === 0 ? IN_LX : IN_RX;
        const y = IN_Y + Math.floor(i / 2) * (IN_H + 20);
        return (
          <g key={f.k}>
            <rect x={x} y={y} width={IN_W} height={IN_H} rx={12} className="an-panel" />
            <rect x={x + 14} y={y + 19} width={40} height={40} rx={10} className="ap-tile" />
            <g className="ap-ink">
              <Glyph name={f.glyph} cx={x + 34} cy={y + 39} size={22} />
            </g>
            <text x={x + 66} y={y + 34} className="a-text an-xs a-mute">
              {f.k}
            </text>
            <text x={x + 66} y={y + 56} className="a-text an-sm a-ink">
              {f.v}
            </text>
            {/* into the console */}
            <path
              d={`M${x + IN_W / 2} ${y + IN_H} V${C_Y}`}
              className="z-dash-accent"
              style={{ ["--seg" as string]: i } as React.CSSProperties}
            />
          </g>
        );
      })}

      {/* ================= the console ================= */}
      <rect x={C_X} y={C_Y} width={C_W} height={C_H} rx={14} className="an-panel" />

      {/* --- brand bar --- */}
      <image href="/brand/instasafe-mark-color.svg" x={C_X + 18} y={C_Y + 12} width={22} height={22} />
      <text x={C_X + 48} y={C_Y + 29} className="a-text an-sm a-ink">
        InstaSafe
      </text>
      <path d={`M${C_X} ${C_Y + BRAND_H} H${C_R}`} className="a-line" />

      {/* --- the dark rail: the console's own contrast --- */}
      <path
        d={`M${C_X} ${C_Y + BRAND_H} H${C_X + RAIL_W} V${C_Y + C_H} H${C_X + 14} A14 14 0 0 1 ${C_X} ${C_Y + C_H - 14} Z`}
        className="apf-rail"
      />
      {CHECKS.map((c, i) => (
        <g key={`rail-${c.label}`} className={i === 0 ? "apf-rail-ic is-on" : "apf-rail-ic"}>
          {i === 0 && (
            <rect x={C_X + 12} y={CARD_Y + CARD_PAD + i * ROW_H + 14} width={30} height={30} rx={8} className="apf-rail-chip" />
          )}
          <Glyph name={c.glyph} cx={C_X + 27} cy={CARD_Y + CARD_PAD + i * ROW_H + 29} size={17} />
        </g>
      ))}

      {/* --- what is being asked --- */}
      <text x={CARD_X} y={C_Y + BRAND_H + 26} className="a-text an-xs a-mute">
        ACCESS REQUEST
      </text>
      <text x={CARD_X} y={C_Y + BRAND_H + 46} className="a-text an-sm a-ink">
        arjun@company.com <tspan className="a-accent">→</tspan> SAP (Finance Portal)
      </text>

      {/* --- the checks, on their own ground --- */}
      <rect x={CARD_X} y={CARD_Y} width={CARD_W} height={CARD_H} rx={10} className="apf-card" />
      {CHECKS.map((c, i) => {
        const y = CARD_Y + CARD_PAD + i * ROW_H;
        return (
          <g key={c.label}>
            <circle cx={CARD_X + 30} cy={y + 29} r={16} className="apf-rowic" />
            <g className="ap-ink">
              <Glyph name={c.glyph} cx={CARD_X + 30} cy={y + 29} size={18} />
            </g>
            <text x={CARD_X + 56} y={y + 24} className="a-text an-sm a-ink">
              {c.label}
            </text>
            <text x={CARD_X + 56} y={y + 45} className="a-text an-xs a-mute">
              {c.q}
            </text>

            {/* the verdict pill */}
            <rect x={CARD_X + CARD_W - 126} y={y + 16} width={112} height={26} rx={13} className="ap-ok" />
            <path d={`M${CARD_X + CARD_W - 114} ${y + 29} l4 4.5 7-8`} className="ap-ok-mark" fill="none" />
            <text x={CARD_X + CARD_W - 96} y={y + 33} className="a-text an-xs a-allow">
              {c.verdict}
            </text>

            {i < CHECKS.length - 1 && (
              <path d={`M${CARD_X + 14} ${y + ROW_H} H${CARD_X + CARD_W - 14}`} className="a-line" />
            )}
          </g>
        );
      })}

      {/* --- the decision: centred, accented, the frame's focus --- */}
      <path d={`M${C_X + RAIL_W} ${DEC_Y} H${C_R}`} className="a-line" />
      <g className="apf-dec">
        {/* the accent chip — the only filled orange mark inside the console */}
        <circle cx={(C_X + RAIL_W + C_R) / 2} cy={DEC_Y + 32} r={18} className="apf-dec-chip" />
        <Glyph name="shield-check" cx={(C_X + RAIL_W + C_R) / 2} cy={DEC_Y + 32} size={20} />
      </g>
      <text
        x={(C_X + RAIL_W + C_R) / 2}
        y={DEC_Y + 66}
        textAnchor="middle"
        className="a-text an-xs a-mute"
      >
        POLICY DECISION
      </text>
      <text
        x={(C_X + RAIL_W + C_R) / 2}
        y={DEC_Y + 86}
        textAnchor="middle"
        className="a-text an-sm a-allow"
      >
        All checks passed
      </text>

      {/* ================= the tunnel — the one orange line ================= */}
      <path
        d={`M${T_EXIT_X} ${C_Y + C_H} V${T_MID_Y - 14} Q${T_EXIT_X} ${T_MID_Y} ${T_EXIT_X + 14} ${T_MID_Y} H${SAP_X}`}
        className="apf-tunnel"
        data-draw
        pathLength={1}
      />
      {/* the lock riding it */}
      <g className="apf-lock" transform={`translate(${(T_EXIT_X + SAP_X) / 2} ${T_MID_Y})`}>
        <circle r={13} />
        <rect x={-5.5} y={-2.5} width={11} height={8.5} rx={2} fill="none" />
        <path d={`M-3.5 -2.5 v-2.5 a3.5 3.5 0 0 1 7 0 v2.5`} fill="none" />
      </g>
      <text x={C_X + 6} y={T_MID_Y - 6} className="a-text an-xs a-mute">
        ENCRYPTED TUNNEL
      </text>
      <text x={C_X + 6} y={T_MID_Y + 12} className="a-text an-xs a-mute an-opt">
        session-4821
      </text>

      {/* ================= the destination ================= */}
      <rect x={SAP_X} y={SAP_Y} width={SAP_W} height={SAP_H} rx={12} className="an-panel apf-dst" />
      <image href="/logos/integrations/sap.svg" x={SAP_X + 18} y={SAP_Y + 26} width={54} height={28} />
      <text x={SAP_X + 80} y={SAP_Y + 40} className="a-text an-sm a-ink">
        Finance Portal
      </text>
      <circle cx={SAP_X + 92} cy={SAP_Y + 60} r={3.5} className="apf-live" />
      <text x={SAP_X + 102} y={SAP_Y + 64} className="a-text an-xs a-allow">
        LIVE
      </text>

      {/* ================= everything else ================= */}
      <text x={C_X} y={G_Y - 14} className="a-text an-xs a-mute">
        EVERYTHING ELSE, MEANWHILE_
      </text>
      {GHOSTS.map((g, i) => {
        const x = i % 2 === 0 ? IN_LX : IN_RX;
        const y = G_Y + Math.floor(i / 2) * (G_H + 16);
        return (
          <g key={g.name} className="apf-ghost-g">
            <rect x={x} y={y} width={IN_W} height={G_H} rx={10} className="apf-ghost" />
            <g className="ap-ink">
              <Glyph name={g.glyph} cx={x + 30} cy={y + G_H / 2} size={20} tone="mute" />
            </g>
            <text x={x + 52} y={y + G_H / 2 - 3} className="a-text an-sm a-mute">
              {g.name}
            </text>
            <text x={x + 52} y={y + G_H / 2 + 16} className="a-text an-xs a-mute an-opt">
              not accessible
            </text>
            {/* the cross chip */}
            <circle cx={x + IN_W - 26} cy={y + G_H / 2} r={11} className="ap-no" />
            <path
              d={`M${x + IN_W - 30.5} ${y + G_H / 2 - 4.5} l9 9 M${x + IN_W - 21.5} ${y + G_H / 2 - 4.5} l-9 9`}
              className="ap-no-mark"
              fill="none"
            />
          </g>
        );
      })}
    </svg>
  );
}
