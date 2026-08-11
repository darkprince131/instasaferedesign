import type { ArtifactProps } from "./types";

/* /solutions/privileged-access-management · the session as evidence —
   built from the supplied reference sheet.

   ONE artifact, per docs/three-outcomes-rule.md. The reference's three
   column drawings (a target reticle, a padlocked shield, a document
   with a play head) are folded into this picture as its three parts:

     0 · evidence, not mystery    the recorded session — what was typed,
                                  beside when it happened
     1 · zero internet footprint  the path the admin actually takes,
                                  ending at systems marked private
     2 · audit closes with replay the record, sealed and exportable

   TYPE T11 · terminal transcript. `/secure-devops-access` shares this
   cluster and deliberately does NOT carry a transcript — it gets an
   envelope and an evidence ribbon — so the two pages do not read as
   one picture twice.

   THE SHARED NOUN is the record. A privileged session is the only
   thing on this page all three claims are about, so it is drawn once,
   large, with its timeline beside it rather than as a second panel of
   the same weight.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~9.0 units at
   13px and ~7.6 at 11px. The transcript's longest line is
   "[root@server ~]# systemctl status nginx" (39ch at 11px → 296 wide
   from x=84, ending 380 against the window's inner edge at 560).

   MOBILE. Second tier carries `a-opt` and drops below 900px, leaving
   the five that matter: what the session is, that it is recording,
   what the timeline is, where the access runs through, and that the
   result is recorded. */

const VB_W = 1010;
const VB_H = 560;

/* ---------- part 0 · the record itself ---------- */
const WIN_X = 60;
const WIN_Y = 60;
const WIN_W = 520;
/* 360 so the transcript and the timeline share one floor at y=420 —
   two panels ending 20 units apart reads as a misalignment, not as
   depth */
const WIN_H = 360;
const WIN_IN = WIN_X + 24; // 84

/** prompt lines are accent, output is mute — the operator's hand is
 *  what an auditor is looking for */
const TRANSCRIPT: { t: string; cmd?: boolean }[] = [
  { t: "[root@server ~]# id", cmd: true },
  { t: "uid=0(root) gid=0(root)" },
  { t: "[root@server ~]# systemctl status nginx", cmd: true },
  { t: "active (running) since 10:15" },
  { t: "[root@server ~]# cat /etc/passwd", cmd: true },
  { t: "root:x:0:0:root:/root:/bin/bash" },
];
const LINE_Y = 148;
const LINE_STEP = 34;

/* ---------- part 0 · when it happened ---------- */
const TL_X = 620;
const TL_Y = 60;
const TL_W = 330;
/* 360, not 400: the flow's annotations sit at y=458 and a 400-tall
   panel ended at 460, so both labels straddled its floor */
const TL_H = 360;
const TL_DOT = 648;
const TL_TIME = 664;
const TL_TEXT = 748;
const TIMELINE = [
  { t: "10:14:32", label: "session started", ok: true },
  { t: "10:15:02", label: "auth success", ok: true },
  { t: "10:15:24", label: "cmd: id" },
  { t: "10:15:42", label: "cmd: systemctl" },
  { t: "10:16:11", label: "file: /etc/passwd" },
  { t: "10:16:30", label: "cmd: cat passwd" },
  { t: "10:43:19", label: "session ended", ok: true },
];
const TL_ROW_Y = [146, 186, 226, 266, 306, 346, 386];

/* ---------- parts 1 and 2 · the path, and what it leaves behind ---------- */
const FLOW_CY = 500;
const FLOW_R = 26;
const FLOW = [
  { id: "user", label: "Privileged user", cx: 110 },
  { id: "verify", label: "Verify", cx: 300 },
  { id: "layer", label: "Access layer", cx: 505 },
  { id: "target", label: "Targets", cx: 700 },
  { id: "record", label: "Recorded", cx: 890 },
];

/* ---------- the drawn marks ---------- */

function FlowGlyph({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  if (id === "user") {
    return (
      <g className="pa-glyph">
        <circle cx={cx} cy={cy - 6} r={7} />
        <path d={`M${cx - 12} ${cy + 13} a12 12 0 0 1 24 0`} />
      </g>
    );
  }
  if (id === "verify") {
    /* verify — a shield with a tick cut through it */
    return (
      <g className="pa-glyph">
        <path d={`M${cx} ${cy - 13} l11 5 v8 c0 8 -6 11 -11 13 c-5 -2 -11 -5 -11 -13 v-8 Z`} />
        <path d={`M${cx - 5} ${cy} l4 4 l7 -8`} />
      </g>
    );
  }
  if (id === "layer") {
    /* the access layer — a lock, and the only accent glyph in the row */
    return (
      <g className="pa-glyph pa-glyph--accent">
        <rect x={cx - 10} y={cy - 2} width={20} height={15} rx={2} />
        <path d={`M${cx - 6} ${cy - 2} v-5 a6 6 0 0 1 12 0 v5`} />
      </g>
    );
  }
  if (id === "target") {
    /* private systems — a rack, with the internet crossed off it */
    return (
      <g className="pa-glyph">
        <rect x={cx - 13} y={cy - 12} width={26} height={10} rx={2} />
        <rect x={cx - 13} y={cy + 2} width={26} height={10} rx={2} />
        <path d={`M${cx - 8} ${cy - 7} h3 M${cx - 8} ${cy + 7} h3`} />
      </g>
    );
  }
  /* the record — a page with a play head */
  return (
    <g className="pa-glyph">
      <path d={`M${cx - 10} ${cy + 13} v-26 h13 l7 7 v19 Z`} />
      <path d={`M${cx - 3} ${cy - 2} l7 4 l-7 4 Z`} />
    </g>
  );
}

export function PrivilegedSessionRecord({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-art--pam"
      role="img"
      aria-label="A recorded privileged session: the commands that were run, the timeline they happened on, and the path from the admin through the access layer to private systems"
    >
      {/* ---------- 0 · evidence, not mystery ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        <rect x={WIN_X} y={WIN_Y} width={WIN_W} height={WIN_H} rx={10} className="a-plate" />
        <circle cx={82} cy={86} r={5} className="pa-dot-1" />
        <circle cx={98} cy={86} r={5} className="pa-dot-2" />
        <circle cx={114} cy={86} r={5} className="pa-dot-3" />
        <text x={140} y={91} className="a-text pa-sm a-mute">
          privileged session
        </text>
        {/* recording is a STATE, so it is drawn lit rather than labelled twice */}
        {/* 436, not 452: the REC label is right-aligned and starts at 448,
            so the dot sat under its first glyph */}
        <circle cx={436} cy={86} r={5} className="pa-rec" />
        <text x={WIN_X + WIN_W - 24} y={91} textAnchor="end" className="a-text pa-sm a-accent">
          REC 00:28:47
        </text>
        <path d={`M${WIN_IN} 108 H${WIN_X + WIN_W - 24}`} className="a-line" data-draw pathLength={1} />

        {TRANSCRIPT.map((l, i) => (
          <text
            key={l.t}
            x={WIN_IN}
            y={LINE_Y + i * LINE_STEP}
            className={`a-text pa-xs ${l.cmd ? "a-accent" : "a-mute"} a-opt`}
          >
            {l.t}
          </text>
        ))}
        {/* the cursor: the session is still open */}
        <rect x={WIN_IN} y={LINE_Y + TRANSCRIPT.length * LINE_STEP - 11} width={9} height={14} className="pa-caret" />

        <rect x={TL_X} y={TL_Y} width={TL_W} height={TL_H} rx={10} className="a-plate" />
        <text x={TL_X + 20} y={92} className="a-text a-ink">
          Activity timeline
        </text>
        <path d={`M${TL_X + 20} 108 H${TL_X + TL_W - 20}`} className="a-line" data-draw pathLength={1} />
        {/* the spine the events hang on */}
        <path d={`M${TL_DOT} ${TL_ROW_Y[0]} V${TL_ROW_Y[TL_ROW_Y.length - 1]}`} className="a-line" data-draw pathLength={1} />

        {TIMELINE.map((e, i) => (
          <g key={e.t}>
            <circle cx={TL_DOT} cy={TL_ROW_Y[i] - 4} r={4.5} className={e.ok ? "z-dot-ok" : "pa-dot-cmd"} />
            <text x={TL_TIME} y={TL_ROW_Y[i]} className="a-text pa-xs a-mute a-opt">
              {e.t}
            </text>
            <text x={TL_TEXT} y={TL_ROW_Y[i]} className="a-text pa-sm a-ink a-opt">
              {e.label}
            </text>
          </g>
        ))}
      </g>

      {/* ---------- 1 · zero internet footprint ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        {FLOW.slice(0, 4).map((n, i) => (
          <g key={n.id}>
            {i > 0 && (
              <path
                d={`M${FLOW[i - 1].cx + FLOW_R + 6} ${FLOW_CY} H${n.cx - FLOW_R - 6}`}
                className="z-dash-accent"
                style={{ ["--seg" as string]: i - 1 } as React.CSSProperties}
              />
            )}
            <circle cx={n.cx} cy={FLOW_CY} r={FLOW_R} className={n.id === "layer" ? "pa-node-on" : "pa-node"} />
            <FlowGlyph id={n.id} cx={n.cx} cy={FLOW_CY} />
            <text
              x={n.cx}
              y={FLOW_CY + 46}
              textAnchor="middle"
              className={`a-text pa-sm a-mute${n.id === "layer" ? "" : " a-opt"}`}
            >
              {n.label}
            </text>
          </g>
        ))}
        {/* the reason the targets are reachable at all: they are not published */}
        <text x={FLOW[3].cx} y={FLOW_CY - 42} textAnchor="middle" className="a-text pa-xs a-mute a-opt">
          private · no inbound
        </text>
      </g>

      {/* ---------- 2 · audit closes with replay ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        <path
          d={`M${FLOW[3].cx + FLOW_R + 6} ${FLOW_CY} H${FLOW[4].cx - FLOW_R - 6}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 3 } as React.CSSProperties}
        />
        <circle cx={FLOW[4].cx} cy={FLOW_CY} r={FLOW_R} className="pa-node" />
        <FlowGlyph id="record" cx={FLOW[4].cx} cy={FLOW_CY} />
        <text x={FLOW[4].cx} y={FLOW_CY + 46} textAnchor="middle" className="a-text pa-sm a-mute">
          Recorded
        </text>
        <text x={FLOW[4].cx} y={FLOW_CY - 42} textAnchor="middle" className="a-text pa-xs a-accent a-opt">
          indexed · exportable
        </text>
      </g>
    </svg>
  );
}
