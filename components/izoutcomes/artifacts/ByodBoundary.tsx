import { Glyph, type GlyphName } from "./DrawnGlyphs";
import type { ArtifactProps } from "./types";

/* /byod · one device, two territories — built from the supplied
   reference sheet.

   ONE artifact, per docs/three-outcomes-rule.md. The reference's three
   column drawings (a ticked shield, a person with a lock, a bin) are
   folded into this picture as its three parts:

     0 · the governed channel   the session itself: a real URL, the
                                apps inside it, nothing improvised
     1 · privacy fight avoided  the personal half of the same machine,
                                drawn in mute and never crossed — the
                                ONE link runs from the lock INTO the
                                session, never back out
     2 · offboarding is clean   the controls that mean nothing landed
                                on the disk in the first place

   THE SHARED NOUN is the boundary, not the workflow — so this is a
   cross-section of one device with a line down it, not a flow. The
   line is the argument: everything to its left is the owner's and is
   never inspected; everything to its right is the company's and never
   persists.

   WHY NOTHING CROSSES LEFT. It would have been easy to draw traffic
   in both directions and call it integration. The single accent link
   pointing right is the whole privacy claim — an arrow back toward
   Photos would say the opposite of column 02.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~11.1 units at
   16px and ~9.0 at 13px. The tightest run is the control strip, right
   aligned to 912 and 270 wide, clearing "Session protected" (ends
   569) by 73. Shorten a label rather than shrinking the type.

   MOBILE. Second-tier labels carry `a-opt` and are dropped below
   900px, leaving the five that matter: the session's name, the URL,
   the personal side, the protection state and the three refusals. */

const VB_W = 1010;
const VB_H = 560;

/* ---------- the machine ---------- */
const LID_X = 40;
const LID_Y = 40;
const LID_W = 930;
const LID_H = 420;
const SCR_X = 58;
const SCR_Y = 58;
const SCR_W = 894;
const SCR_H = 384;

/* ---------- the line down the middle ---------- */
const EDGE_X = 330;
const LOCK_CY = 250;
const LOCK_R = 22;

/* ---------- part 1 · the half that stays the owner's ---------- */
const PERSONAL_CX = 194;
const PERSONAL = [
  { id: "photos", label: "Photos", cy: 120, glyph: "images" as GlyphName },
  { id: "messages", label: "Messages", cy: 222, glyph: "chat" as GlyphName },
  { id: "files", label: "Personal files", cy: 324, glyph: "folder-open" as GlyphName },
];

/* ---------- part 0 · the half that is the company's ---------- */
const WIN_X = 372;
const WIN_Y = 118;
const WIN_W = 560;
const WIN_H = 306;
const WIN_R = WIN_X + WIN_W; // 932

const TILES = [
  { label: "Dashboard", glyph: "gauge" as GlyphName },
  { label: "CRM", glyph: "people" as GlyphName },
  { label: "ERP", glyph: "chart" as GlyphName },
  { label: "Files", glyph: "folder" as GlyphName },
  { label: "Reports", glyph: "doc" as GlyphName },
  { label: "Admin", glyph: "gear" as GlyphName },
];
const TILE_W = 162;
const TILE_H = 94;
const TILE_X = [392, 570, 748];
const TILE_Y = [170, 278];

/* ---------- part 2 · why there is nothing to wipe ---------- */
const FOOT_Y = 390;
const FOOT_L = 392;
const FOOT_R = 912;

export function ByodBoundary({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-art--byd"
      role="img"
      aria-label="One personal laptop divided by a line: the owner's photos, messages and files on one side, a governed browser session with company apps on the other"
    >
      {/* ---------- the machine, and the line down it ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        <rect x={LID_X} y={LID_Y} width={LID_W} height={LID_H} rx={16} className="byd-bezel" />
        <rect x={SCR_X} y={SCR_Y} width={SCR_W} height={SCR_H} rx={8} className="a-plate" />
        {/* the deck, so the screen reads as a device someone owns */}
        <path d={`M${LID_X - 26} 470 H${LID_X + LID_W + 26} l-14 14 H${LID_X - 12} Z`} className="byd-deck" />
        <path d={`M${VB_W / 2 - 34} 470 h68`} className="byd-hinge" />

        {/* the boundary: dashed, unbroken, and never crossed leftward */}
        <path d={`M${EDGE_X} 80 V420`} className="byd-edge" />

        {PERSONAL.map((p) => (
          <g key={p.id}>
            {/* the owner's half sits a step back in `mute`: present,
                legible, never inspected */}
            <Glyph name={p.glyph} cx={PERSONAL_CX} cy={p.cy} size={44} tone="mute" />
            <text
              x={PERSONAL_CX}
              y={p.cy + 46}
              textAnchor="middle"
              className={`a-text byd-sm a-mute${p.id === "files" ? "" : " a-opt"}`}
            >
              {p.label}
            </text>
          </g>
        ))}
      </g>

      {/* ---------- 0 · the governed channel ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        {/* the one crossing there is, pointing one way */}
        <circle cx={EDGE_X} cy={LOCK_CY} r={LOCK_R} className="byd-lock" />
        <Glyph name="lock" cx={EDGE_X} cy={LOCK_CY} size={20} tone="accent" />
        <path
          d={`M${EDGE_X + LOCK_R} ${LOCK_CY} H${WIN_X}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 0 } as React.CSSProperties}
        />

        {/* the session's own header — the accent element */}
        <Glyph name="shield-check" cx={594} cy={93} size={30} tone="accent" />
        <text x={618} y={100} className="a-text a-accent">
          GOVERNED SESSION
        </text>

        <rect x={WIN_X} y={WIN_Y} width={WIN_W} height={WIN_H} rx={10} className="a-plate" />
        <circle cx={392} cy={142} r={5} className="byd-dot-1" />
        <circle cx={408} cy={142} r={5} className="byd-dot-2" />
        <circle cx={424} cy={142} r={5} className="byd-dot-3" />
        {/* 28 tall, not 24: a 13px label's box is 16.7 units, so a
            24-unit pill cannot clear 4 units of padding on both sides
            whatever the baseline is */}
        <rect x={444} y={128} width={340} height={28} rx={14} className="a-chip" />
        <Glyph name="lock" cx={462} cy={142} size={13} tone="mute" />
        {/* 146, not 147: at 147 the descender left 3.5 units under the
            pill edge and the padding check caught it */}
        <text x={478} y={146} className="a-text byd-sm a-mute">
          secure.instasafe.com
        </text>

        {TILES.map((t, i) => {
          const x = TILE_X[i % 3];
          const y = TILE_Y[Math.floor(i / 3)];
          return (
            <g key={t.label}>
              <rect x={x} y={y} width={TILE_W} height={TILE_H} rx={8} className="a-chip" />
              <Glyph name={t.glyph} cx={x + TILE_W / 2} cy={y + 36} size={26} />
              <text x={x + TILE_W / 2} y={y + 76} textAnchor="middle" className="a-text byd-sm a-mute a-opt">
                {t.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* ---------- 2 · offboarding is clean ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        <path d={`M${FOOT_L} ${FOOT_Y} H${FOOT_R}`} className="a-line" data-draw pathLength={1} />
        <circle cx={FOOT_L + 6} cy={406} r={5} className="z-dot-ok" />
        <text x={FOOT_L + 22} y={411} className="a-text byd-sm a-ink">
          Session protected
        </text>
        <text x={FOOT_R} y={411} textAnchor="end" className="a-text byd-sm a-accent">
          No download · no copy · no print
        </text>
      </g>
    </svg>
  );
}
