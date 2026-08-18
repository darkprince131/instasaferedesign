"use client";

import { useRef } from "react";
import { useHoverIndex } from "@/components/izpages/pro/useHoverIndex";

/* ============================================================
   00ba · IzTunnelCards — "per-session tunnels" on the 00an
   four-grid.

   Markup deliberately reuses 00an's `izug-*` classes (two heading
   cells, one copy cell, three case cells in a 2-col bordered grid,
   with the hover selection chrome) so this reads as the same
   component family rather than a lookalike. Only the stage content
   is ours: three tunnel scenes.

   ▸ SCENES (rebuilt 2026-08-12 against the supplied reference) ◂
   Each case is a drawn SVG, not a row of divs: node cards with real
   glyphs, a leaning gate plane the connection passes through, ink
   pills on the wire (AUTHN / ENCRYPTED TUNNEL / COMPROMISED /
   BLOCKED), and one concentric POLICY ENGINE medallion every lane
   converges on. One engine for all three cases is the argument —
   the cases differ in what the lanes do, never in what decides.

   Coordinates are in viewBox units and the stage renders ~1:1
   (507px wide), so a font-size of 10 really is 10px.

   MOTION CONTRACT (unchanged, do not regress): every animation is
   declared INSIDE `.is-live`. An animation that only exists while
   hovered is removed on leave, so the cell snaps back to its
   finished state and the next hover replays from frame zero.
   Every element's un-animated state is already its end state,
   which makes the touch and reduced-motion stills correct for free.

   Paths carry `pathLength="1"`, so the draw-on animation is a
   dashoffset from 1 → 0 regardless of how the SVG is scaled. Do
   NOT add `vector-effect: non-scaling-stroke` — it makes dashes
   resolve in px while the path resolves in user units, which
   silently breaks every draw.
   ============================================================ */

const CASES = [
  { id: "dedicated", label: "Case 1 · Dedicated tunnel" },
  { id: "independent", label: "Case 2 · Independent tunnels" },
  { id: "isolation", label: "Case 3 · Session isolation" },
] as const;

/* ---------- shared geometry (viewBox units) ---------- */
const CARD = 48; // node card is a 48×48 rounded square
const ENGINE_X = 250;
const R_OUT = 44;
const R_MID = 36;
const R_IN = 30;
const APP_X = 434;

/* ============================================================
   defs — glyphs drawn once, instanced per scene
   ============================================================ */
function Defs({ uid }: { uid: string }) {
  return (
    <defs>
      {/* the person mark inside a user card */}
      <symbol id={`${uid}-user`} viewBox="0 0 24 24">
        <circle cx="12" cy="8.5" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.8 19.5c0-3.9 3.2-6.4 7.2-6.4s7.2 2.5 7.2 6.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </symbol>

      {/* the app mark — a browser window, matching the reference */}
      <symbol id={`${uid}-app`} viewBox="0 0 24 24">
        <rect x="3" y="4.5" width="18" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5.9" cy="6.8" r="0.75" fill="currentColor" />
        <circle cx="8.3" cy="6.8" r="0.75" fill="currentColor" />
        <circle cx="10.7" cy="6.8" r="0.75" fill="currentColor" />
      </symbol>

      {/* the engine's shield */}
      <symbol id={`${uid}-shield`} viewBox="0 0 24 24">
        <path d="M12 2.6 20 5.6v6.2c0 4.9-3.3 8.5-8 9.6-4.7-1.1-8-4.7-8-9.6V5.6Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="m8.4 12.1 2.5 2.5 4.7-4.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>

      <symbol id={`${uid}-lock`} viewBox="0 0 24 24">
        <rect x="4.8" y="10.6" width="14.4" height="10.2" rx="2" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="M8.4 10.6V7.9a3.6 3.6 0 0 1 7.2 0v2.7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </symbol>

      <symbol id={`${uid}-check`} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9.4" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="m7.9 12.3 2.9 2.9 5.3-5.7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>

      <symbol id={`${uid}-cross`} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9.4" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="m8.6 8.6 6.8 6.8M15.4 8.6l-6.8 6.8" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </symbol>

      {/* the gate plane's glass — a wash, not a fill */}
      <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" className="iztc-glass-a" />
        <stop offset="1" className="iztc-glass-b" />
      </linearGradient>
    </defs>
  );
}

/* ============================================================
   pieces
   ============================================================ */

function NodeCard({
  uid,
  x,
  cy,
  glyph,
  name,
  caption,
  dim,
}: {
  uid: string;
  x: number;
  cy: number;
  glyph: "user" | "app";
  name: string;
  caption: string;
  dim?: boolean;
}) {
  const y = cy - CARD / 2;
  return (
    <g className={`iztc-node${dim ? " is-dim" : ""}`}>
      <rect x={x} y={y} width={CARD} height={CARD} rx="10" className="iztc-card" />
      <use href={`#${uid}-${glyph}`} x={x + 12} y={y + 12} width="24" height="24" className="iztc-glyph" />
      <text x={x + CARD / 2} y={cy + CARD / 2 + 16} className="iztc-name">
        {name}
      </text>
      <text x={x + CARD / 2} y={cy + CARD / 2 + 28} className="iztc-cap">
        {caption}
      </text>
    </g>
  );
}

/* the leaning plane every connection passes through. It is the one
   piece of depth in the scene — a flat rectangle here would read as
   a divider rather than a checkpoint. */
function Gate({ x, cy, h, i = 0 }: { x: number; cy: number; h: number; i?: number }) {
  const w = 20;
  const d = `M${x} ${cy - h} L${x + w} ${cy - h - 9} L${x + w} ${cy + h - 5} L${x} ${cy + h + 4} Z`;
  return (
    <g className="iztc-gate" style={{ ["--i" as string]: i }}>
      <path d={d} className="iztc-gate-plane" />
      {/* the lit leading edge is what makes the quad read as a plane in
          space rather than a flat parallelogram sticker */}
      <path d={`M${x + w} ${cy - h - 9} L${x + w} ${cy + h - 5}`} className="iztc-gate-edge" />
    </g>
  );
}

type PillTone = "ink" | "deny";

function Pill({
  uid,
  x,
  cy,
  w,
  lines,
  icon,
  tone = "ink",
  i = 0,
}: {
  uid: string;
  x: number;
  cy: number;
  w: number;
  lines: string[];
  icon: "check" | "lock" | "cross";
  tone?: PillTone;
  i?: number;
}) {
  const h = lines.length > 1 ? 30 : 22;
  const y = cy - h / 2;
  const iconSize = 11;
  /* narrow drops the label, so the pill has to collapse to a token: the
     rect shrinks to a 22px circle and the icon slides to its centre.
     Both need the pill's own x/width, which only this component knows —
     hence the vars rather than a media query full of magic numbers. */
  const icx = 13.5 - w / 2;
  return (
    <g
      className={`iztc-pill iztc-pill--${tone}`}
      style={{
        ["--i" as string]: i,
        ["--px" as string]: `${x}px`,
        ["--pw" as string]: `${w}px`,
        ["--icx" as string]: `${icx}px`,
      }}
    >
      <rect x={x} y={y} width={w} height={h} rx={h / 2} className="iztc-pill-bg" />
      {lines.map((ln, k) => (
        <text
          key={ln}
          x={x + 11}
          y={lines.length > 1 ? cy - 2 + k * 10 : cy + 3}
          className="iztc-pill-tx"
        >
          {ln}
        </text>
      ))}
      <use
        href={`#${uid}-${icon}`}
        x={x + w - iconSize - 8}
        y={cy - iconSize / 2}
        width={iconSize}
        height={iconSize}
        className="iztc-pill-ic"
      />
    </g>
  );
}

/* one engine, every case. Concentric rings so it reads as a thing
   that is *running*, not a box the line happens to hit. */
function Engine({ uid, cy }: { uid: string; cy: number }) {
  return (
    <g className="iztc-engine">
      <circle cx={ENGINE_X} cy={cy} r={R_OUT} className="iztc-ring iztc-ring--out" />
      <circle cx={ENGINE_X} cy={cy} r={R_MID} className="iztc-ring iztc-ring--mid" />
      <circle cx={ENGINE_X} cy={cy} r={R_IN} className="iztc-ring iztc-ring--in" />
      <use href={`#${uid}-shield`} x={ENGINE_X - 9} y={cy - 17} width="18" height="18" className="iztc-shield" />
      <text x={ENGINE_X} y={cy + 8} className="iztc-eng-tx">
        POLICY
      </text>
      <text x={ENGINE_X} y={cy + 17} className="iztc-eng-tx">
        ENGINE
      </text>
    </g>
  );
}

/* a wire plus the packets riding it. The packets use `offset-path`
   with the SAME `d`, so they follow curves the pipe actually takes
   instead of a straight translate that would leave the line on a
   fan-out. */
function Wire({
  d,
  tone = "live",
  packets = 3,
  dur = 1.9,
  gap = 0.63,
  delay = 0,
}: {
  d: string;
  tone?: "live" | "cut";
  packets?: number;
  dur?: number;
  gap?: number;
  delay?: number;
}) {
  return (
    <g className={`iztc-wire iztc-wire--${tone}`}>
      <path d={d} pathLength={1} className="iztc-line" />
      {Array.from({ length: packets }, (_, p) => (
        <circle
          key={p}
          r="2.6"
          cx="0"
          cy="0"
          className="iztc-pkt"
          style={{
            offsetPath: `path("${d}")`,
            ["--dur" as string]: `${dur}s`,
            ["--delay" as string]: `${delay + p * gap}s`,
          }}
        />
      ))}
    </g>
  );
}

function Junction({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="2.4" className="iztc-junction" />;
}

/* ============================================================
   the three scenes
   ============================================================ */

function SceneDedicated({ uid }: { uid: string }) {
  const cy = 70;
  return (
    <svg viewBox="0 0 506 168" className="iztc-svg" aria-hidden="true">
      <Defs uid={uid} />

      <Wire d={`M62 ${cy} H206`} />
      <Wire d={`M294 ${cy} H${APP_X}`} delay={0.3} />

      <Gate x={84} cy={cy} h={30} />
      <Gate x={408} cy={cy} h={30} i={2} />

      <Engine uid={uid} cy={cy} />

      <Pill uid={uid} x={112} cy={cy} w={62} lines={["AUTHN"]} icon="check" />
      <Pill uid={uid} x={316} cy={cy} w={84} lines={["ENCRYPTED", "TUNNEL"]} icon="lock" i={1} />

      <Junction x={62} y={cy} />
      <Junction x={206} y={cy} />
      <Junction x={294} y={cy} />
      <Junction x={APP_X} y={cy} />

      <NodeCard uid={uid} x={14} cy={cy} glyph="user" name="sophia" caption="USER" />
      <NodeCard uid={uid} x={APP_X} cy={cy} glyph="app" name="erp-core" caption="APPLICATION" />
    </svg>
  );
}

/* both two-lane cases share one skeleton — only lane A's fate differs,
   which is exactly the claim being made */
function SceneTwoLane({ uid, cut }: { uid: string; cut: boolean }) {
  const cy = 100;
  const a = 52;
  const b = 148;

  const inA = `M62 ${cy} C78 ${cy} 80 ${a} 96 ${a} H186 C206 ${a} 210 70 219 78`;
  const inB = `M62 ${cy} C78 ${cy} 80 ${b} 96 ${b} H186 C206 ${b} 210 130 219 122`;
  const outA = `M281 78 C290 70 294 ${a} 316 ${a} H${APP_X}`;
  const outB = `M281 122 C290 130 294 ${b} 316 ${b} H${APP_X}`;

  return (
    <svg viewBox="0 0 506 200" className="iztc-svg" aria-hidden="true">
      <Defs uid={uid} />

      {/* lane A — the one that gets taken in case 3 */}
      <Wire d={inA} tone={cut ? "cut" : "live"} dur={cut ? 4.2 : 1.9} gap={cut ? 0.5 : 0.63} />
      <Wire d={outA} tone={cut ? "cut" : "live"} dur={cut ? 4.2 : 1.9} gap={cut ? 0.5 : 0.63} delay={0.3} />

      {/* lane B — never references lane A's timeline. Different duration
          and offset, so "independent" is visible rather than asserted. */}
      <Wire d={inB} dur={2.6} gap={0.87} delay={0.24} />
      <Wire d={outB} dur={2.6} gap={0.87} delay={0.5} />

      <Gate x={84} cy={a} h={22} />
      <Gate x={84} cy={b} h={22} i={1} />
      <Gate x={408} cy={a} h={22} i={2} />
      <Gate x={408} cy={b} h={22} i={3} />

      <Engine uid={uid} cy={cy} />

      {cut ? (
        <>
          <Pill uid={uid} x={104} cy={a} w={86} lines={["COMPROMISED"]} icon="cross" tone="deny" />
          <Pill uid={uid} x={316} cy={a} w={66} lines={["BLOCKED"]} icon="cross" tone="deny" i={1} />
        </>
      ) : (
        <>
          <Pill uid={uid} x={112} cy={a} w={62} lines={["AUTHN"]} icon="check" />
          <Pill uid={uid} x={316} cy={a} w={84} lines={["ENCRYPTED", "TUNNEL"]} icon="lock" i={1} />
        </>
      )}

      <Pill uid={uid} x={112} cy={b} w={62} lines={["AUTHN"]} icon="check" i={1} />
      <Pill uid={uid} x={316} cy={b} w={84} lines={["ENCRYPTED", "TUNNEL"]} icon="lock" i={2} />

      <Junction x={62} y={cy} />
      <Junction x={APP_X} y={a} />
      <Junction x={APP_X} y={b} />

      <NodeCard uid={uid} x={14} cy={cy} glyph="user" name="sophia" caption="USER" />
      <NodeCard uid={uid} x={APP_X} cy={a} glyph="app" name="erp-core" caption="APPLICATION" dim={cut} />
      <NodeCard uid={uid} x={APP_X} cy={b} glyph="app" name="jira" caption="APPLICATION" />
    </svg>
  );
}

function Scene({ id }: { id: string }) {
  /* symbol ids must be unique per scene — three copies of the same
     `id` in one document and every `<use>` resolves to the first */
  const uid = `iztc-${id}`;
  if (id === "dedicated") return <SceneDedicated uid={uid} />;
  return <SceneTwoLane uid={uid} cut={id === "isolation"} />;
}

export function IzTunnelCards({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { index, canHover } = useHoverIndex(ref, ".izug-cell");

  return (
    <div className={className ? `iztc ${className}` : "iztc"}>
      <div className="izug-grid" ref={ref}>
        <div className="izug-head">
          <h2>Your applications.</h2>
        </div>
        <div className="izug-head">
          <h2>Your tunnels.</h2>
        </div>

        <div className="izug-copy">
          <p>
            <b>One session never becomes another.</b>
            <br />
            Each authorised session gets its own encrypted tunnel scoped to a single resource. Two apps means two
            tunnels, each policy-checked on its own — so losing one loses exactly one.
          </p>
        </div>

        {CASES.map((c, i) => (
          <div
            key={c.id}
            className={`izug-cell${canHover && index === i ? " is-live" : ""}`}
            tabIndex={0}
            aria-label={c.label}
          >
            <span className="izug-field iz-gridfield" aria-hidden="true" />
            <span className="izug-sel" aria-hidden="true">
              <i className="izug-h izug-h--tl" />
              <i className="izug-h izug-h--tr" />
              <i className="izug-h izug-h--bl" />
              <i className="izug-h izug-h--br" />
            </span>

            <div className="izug-stage">
              <Scene id={c.id} />
            </div>

            <span className="izug-label">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
