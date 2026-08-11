import type { ArtifactProps } from "./types";

/* /secure-voip-access · the call, and what it costs — built from the
   supplied reference sheet.

   ONE artifact, per docs/three-outcomes-rule.md. The reference's three
   column drawings (a handset with a shield, a padlocked globe, a
   person with a headset) are folded into this picture as its parts:

     0 · call quality survives security  the instrument row — the only
                                         numbers on the page, and the
                                         objection this page exists to
                                         answer
     1 · telephony leaves the internet   the tunnel: two people, one
                                         encrypted path, and the public
                                         internet struck off it
     2 · agents onboard like anyone      PBX → access layer → seat,
                                         with nothing special in it

   TYPE T8 · instrument cluster, which no other artifact in the
   solutions cluster uses. `/secure-remote-access` and
   `/secure-cloud-applications` both end in a panel of rows, so this
   one deliberately has NO activity log: the meters are the evidence.

   THE SHARED NOUN is the call. Everything here is one conversation —
   who is on it, what it measures, and the path it takes.

   GLYPHS ARE DRAWN, one stroke weight, per the house's two-style
   vocabulary.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~11.1 units at
   16px and ~9.0 at 13px. The tightest run is the footer strip
   ("private · encrypted · off the internet", 38ch → 342 wide,
   centred on 505 → 334..676). */

const VB_W = 1010;
const VB_H = 560;

/* ---------- part 1 · the call itself ---------- */
const PANEL_X = 60;
const PANEL_Y = 60;
const PANEL_W = 890;
const PANEL_H = 250;

const CUST_CX = 200;
const AGENT_CX = 810;
const FACE_CY = 190;
const FACE_R = 52;
const HUB_CX = 505;
const HUB_R = 40;

/** waveform: deterministic, and the two ends are NOT mirror images —
 *  a symmetric pair reads as decoration rather than as two voices */
const WAVE_L = [6, 11, 18, 9, 22, 14, 26, 12, 19, 8, 15, 10, 7];
const WAVE_R = [8, 14, 9, 21, 12, 25, 11, 17, 23, 10, 16, 7, 12];
const WAVE_Y = 274;

/* ---------- part 0 · what it costs ---------- */
const METERS = [
  { label: "Latency", value: "28", unit: "ms" },
  { label: "Jitter", value: "3", unit: "ms" },
  { label: "Packet loss", value: "0.00", unit: "%" },
];
const MET_Y = 330;
const MET_H = 120;
const MET_W = 290;
const MET_X = [60, 360, 660];

/* ---------- part 2 · the path a new seat takes ---------- */
const CHAIN_Y = 480;
const CHAIN_H = 52;
const CHAIN = [
  { id: "pbx", label: "Your PBX", x: 100, w: 220 },
  { id: "layer", label: "InstaSafe access layer", x: 380, w: 250 },
  /* 250 wide, not 220: the label starts 52 units in and runs 180, so a
     220 tile put "anywhere" 4 units outside its own chip */
  { id: "seat", label: "Agent seat, anywhere", x: 690, w: 250 },
];

/* ---------- the drawn marks ---------- */

function Caller({ cx, cy, agent }: { cx: number; cy: number; agent?: boolean }) {
  return (
    <g className="vo-glyph">
      <circle cx={cx} cy={cy - 10} r={13} />
      <path d={`M${cx - 22} ${cy + 24} a22 22 0 0 1 44 0`} />
      {agent ? (
        /* a headset: the band over the head and one cup */
        <path d={`M${cx - 19} ${cy - 12} a19 19 0 0 1 38 0 M${cx + 19} ${cy - 12} v8`} className="vo-glyph--accent" />
      ) : (
        /* a handset held to the ear */
        <path d={`M${cx + 16} ${cy - 16} l7 4 l-4 12 l-7 -4 Z`} className="vo-glyph--accent" />
      )}
    </g>
  );
}

function Meter({ i, cx, cy }: { i: number; cx: number; cy: number }) {
  if (i === 0) {
    /* latency — a dial with its needle low */
    return (
      <g className="vo-glyph">
        <path d={`M${cx - 18} ${cy + 8} a18 18 0 0 1 36 0`} />
        <path d={`M${cx} ${cy + 8} l-11 -9`} className="vo-glyph--accent" />
      </g>
    );
  }
  if (i === 1) {
    /* jitter — a trace that stays flat */
    return (
      <g className="vo-glyph">
        <path d={`M${cx - 20} ${cy} h8 l4 -9 l5 18 l4 -9 h9`} className="vo-glyph--accent" />
      </g>
    );
  }
  /* packet loss — a full ring with nothing missing from it */
  return (
    <g className="vo-glyph">
      <circle cx={cx} cy={cy} r={15} />
      <path d={`M${cx} ${cy - 15} a15 15 0 1 1 -0.1 0`} className="vo-glyph--accent" />
    </g>
  );
}

function ChainGlyph({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  if (id === "pbx") {
    /* a desk phone */
    return (
      <g className="vo-glyph">
        <rect x={cx - 11} y={cy - 4} width={22} height={14} rx={2} />
        <path d={`M${cx - 8} ${cy - 4} v-6 h16 v6`} />
      </g>
    );
  }
  if (id === "layer") {
    /* the access layer — a shield, and the only accent glyph in the row */
    return (
      <g className="vo-glyph vo-glyph--accent">
        <path d={`M${cx} ${cy - 12} l10 5 v7 c0 8 -5 10 -10 12 c-5 -2 -10 -4 -10 -12 v-7 Z`} />
      </g>
    );
  }
  /* a seat — a person in a headset, at node scale */
  return (
    <g className="vo-glyph">
      <circle cx={cx} cy={cy - 4} r={6} />
      <path d={`M${cx - 10} ${cy + 11} a10 10 0 0 1 20 0`} />
    </g>
  );
}

export function VoipSession({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-art--voip"
      role="img"
      aria-label="A customer and an agent on one encrypted voice tunnel, the latency, jitter and packet-loss meters it holds, and the path a new agent seat takes through the access layer"
    >
      {/* ---------- 1 · telephony leaves the internet ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        <rect x={PANEL_X} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx={12} className="a-plate" />
        <text x={HUB_CX} y={96} textAnchor="middle" className="a-text a-ink">
          Encrypted voice tunnel
        </text>

        <circle cx={CUST_CX} cy={FACE_CY} r={FACE_R} className="vo-face" />
        <Caller cx={CUST_CX} cy={FACE_CY} />
        <circle cx={AGENT_CX} cy={FACE_CY} r={FACE_R} className="vo-face" />
        <Caller cx={AGENT_CX} cy={FACE_CY} agent />

        {/* one path, drawn as two halves so it reads as passing THROUGH
            the layer rather than around it */}
        <path
          d={`M${CUST_CX + FACE_R + 8} ${FACE_CY} H${HUB_CX - HUB_R - 8}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 0 } as React.CSSProperties}
        />
        <path
          d={`M${HUB_CX + HUB_R + 8} ${FACE_CY} H${AGENT_CX - FACE_R - 8}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 1 } as React.CSSProperties}
        />
        <circle cx={HUB_CX} cy={FACE_CY} r={HUB_R} className="vo-hub" />
        <g className="vo-glyph vo-glyph--accent">
          <path
            d={`M${HUB_CX - 11} ${FACE_CY - 9} l7 -3 l4 8 l-5 4 c2 5 6 9 11 11 l4 -5 l8 4 l-3 7 c-13 2 -28 -13 -26 -26 Z`}
          />
        </g>

        {/* the two voices */}
        {WAVE_L.map((h, i) => (
          <path key={`l${i}`} d={`M${CUST_CX - 42 + i * 7} ${WAVE_Y - h / 2} v${h}`} className="vo-wave" />
        ))}
        {WAVE_R.map((h, i) => (
          <path key={`r${i}`} d={`M${AGENT_CX - 42 + i * 7} ${WAVE_Y - h / 2} v${h}`} className="vo-wave" />
        ))}

        {/* the claim: this path never touches the public internet */}
        <g className="vo-glyph">
          <circle cx={438} cy={288} r={9} />
          <path d="M432 282 l12 12 M429 288 h18 M438 279 a12 12 0 0 1 0 18 a12 12 0 0 1 0 -18" />
        </g>
        <text x={456} y={293} className="a-text vo-sm a-mute">
          never on the public internet
        </text>
      </g>

      {/* ---------- 0 · call quality survives security ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        {METERS.map((m, i) => (
          <g key={m.label}>
            <rect x={MET_X[i]} y={MET_Y} width={MET_W} height={MET_H} rx={10} className="a-chip" />
            <Meter i={i} cx={MET_X[i] + 54} cy={MET_Y + 58} />
            <text x={MET_X[i] + 100} y={MET_Y + 40} className="a-text vo-sm a-mute a-opt">
              {m.label}
            </text>
            <text x={MET_X[i] + 100} y={MET_Y + 78} className="a-text vo-big a-ink">
              {m.value}
              <tspan className="vo-unit"> {m.unit}</tspan>
            </text>
            <text x={MET_X[i] + 100} y={MET_Y + 100} className="a-text vo-sm a-allow a-opt">
              excellent
            </text>
          </g>
        ))}
      </g>

      {/* ---------- 2 · a new seat is just another user ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        {CHAIN.map((c, i) => (
          <g key={c.id}>
            {i > 0 && (
              <path
                d={`M${CHAIN[i - 1].x + CHAIN[i - 1].w + 8} ${CHAIN_Y + CHAIN_H / 2} H${c.x - 8}`}
                className="z-dash-accent"
                style={{ ["--seg" as string]: 2 + i } as React.CSSProperties}
              />
            )}
            <rect
              x={c.x}
              y={CHAIN_Y}
              width={c.w}
              height={CHAIN_H}
              rx={8}
              className={c.id === "layer" ? "vo-node-on" : "a-chip"}
            />
            <ChainGlyph id={c.id} cx={c.x + 28} cy={CHAIN_Y + CHAIN_H / 2} />
            <text
              x={c.x + 52}
              y={CHAIN_Y + 32}
              className={`a-text vo-sm ${c.id === "layer" ? "a-ink" : "a-mute"}${c.id === "layer" ? "" : " a-opt"}`}
            >
              {c.label}
            </text>
          </g>
        ))}
        <text x={HUB_CX} y={552} textAnchor="middle" className="a-text vo-sm a-accent">
          private · encrypted · off the internet
        </text>
      </g>
    </svg>
  );
}
