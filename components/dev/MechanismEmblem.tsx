"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import "./mechanism-emblem.css";

/* ============================================================
   <MechanismEmblem /> — the InstaSafe mark machined into the
   centre plate of a precision mechanism. Concentric construction,
   orthographic top-down, CSS animation only.

   Layers, outside in (viewBox 400×400, centre 200,200):
     1  bezel        r 190→176   brushed ring          static
     2  index-ring   r 172→160   60 ticks, 4 accent    static
     3  calm-ring    r 156→112   guilloché hairlines   static  (deliberately empty)
     4  gear-train   r 108→60    escapement            animated
     5  centre-plate r 56→0      engraved mark         static
     6  sweep        full        specular arc          animated
   ============================================================ */

const TAU = Math.PI * 2;
const f = (n: number) => +n.toFixed(2);
const px = (r: number, a: number) => f(r * Math.cos(a));
const py = (r: number, a: number) => f(r * Math.sin(a));

/** Radial tick marks as one path. `skip` drops indices (cardinals drawn separately). */
function ticks(count: number, innerR: number, outerR: number, skip?: (i: number) => boolean): string {
  let d = "";
  for (let i = 0; i < count; i++) {
    if (skip?.(i)) continue;
    const a = (i / count) * TAU - Math.PI / 2;
    d += `M${px(innerR, a)} ${py(innerR, a)}L${px(outerR, a)} ${py(outerR, a)}`;
  }
  return d;
}

/** Escape-wheel profile: pointed, slightly hooked teeth, closed outline. */
function gearTeeth(teeth: number, rootR: number, tipR: number): string {
  const pitch = TAU / teeth;
  const parts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * pitch;
    const lead = a - pitch * 0.34;
    const trail = a + pitch * 0.1;
    parts.push(
      `${i === 0 ? "M" : "L"}${px(rootR, lead)} ${py(rootR, lead)}`,
      `L${px(tipR, a)} ${py(tipR, a)}`,
      `L${px(rootR, trail)} ${py(rootR, trail)}`,
    );
  }
  return parts.join("") + "Z";
}

/** Concentric hairline radii for the engine-turned calm ring. */
function guilloche(count: number, minR: number, maxR: number): number[] {
  const radii: number[] = [];
  for (let i = 0; i < count; i++) radii.push(f(minR + ((maxR - minR) * i) / (count - 1)));
  return radii;
}

/** Archimedean spiral (hairspring). */
function spiral(turns: number, r0: number, r1: number, steps = 80): string {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * TAU;
    const r = r0 + (r1 - r0) * t;
    d += `${i === 0 ? "M" : "L"}${px(r, a)} ${py(r, a)}`;
  }
  return d;
}

/* ---- precomputed geometry (module scope: computed once) ---- */

const MINOR_TICKS = ticks(60, 160, 172, (i) => i % 15 === 0);
const CARDINAL_TICKS = ticks(4, 157, 172);
const BEZEL_BRUSH = ticks(80, 177.5, 188.5);
const CALM_RINGS = guilloche(22, 114, 154);
const ESCAPE_TEETH = gearTeeth(15, 16.5, 21);
const HAIRSPRING = spiral(3.25, 3, 13.5, 56);

/* InstaSafe mark, imported from public/brand/instasafe-mark-*.svg
   (viewBox 0 0 900.6 892.49; paths carry the source's -77.68,-98.27
   offset via the wrapper group below). Do not redraw. */
const MARK_PATHS = [
  "M204.12,324.87S228.05,288.8,258,259.6l44.46,44.66s-41,42.7-48.29,53.55Z",
  "M526.27,990.75c-247.35,0-448.59-200.18-448.59-446.24S278.92,98.27,526.27,98.27c125.86,0,241.56,47.64,325.79,134.14C933.45,316,978.28,426.84,978.28,544.51,978.28,794.74,779.74,990.75,526.27,990.75Zm0-883.36C284,107.39,86.81,303.48,86.81,544.51S284,981.62,526.27,981.62c248.35,0,442.88-192,442.88-437.11S774.62,107.39,526.27,107.39Z",
  "M520.8,966.27c-108.57,0-210.36-41.84-287.56-118.42-83.16-82.49-129.88-197.7-128.17-316.1l12.17.17C115.58,647,161,759,241.81,839.21c74.89,74.29,173.67,114.88,279,114.89,3.09,0,6.16,0,9.25-.11l.27,12.17C527.16,966.23,524,966.27,520.8,966.27Z",
  "M386.37,711.71c-47.69-44.38-76.16-105.52-76.16-163.56,0-119.93,97.15-217.5,216.57-217.5s216.57,97.57,216.57,217.5c0,50.77-23.16,108.43-60.43,150.48l-20.49-18.16c33-37.26,53.54-88,53.54-132.32C716,443.32,631.1,358,526.78,358S337.59,443.32,337.59,548.15C337.59,598,363.43,653,405,691.67Z",
  "M246.81,413.93l-81-34.41,1.4-3.46c.22-.54,22.49-54.64,75.4-109.25,48.84-50.4,134.58-111.71,265.63-117.49l3.78-.17,3.79,75.62-3.61.36c-1.81.18-182,19.75-263.79,185.58Zm-71.06-38.44,67.44,28.64c43.87-86.62,113.8-132.65,165-156.07,47.83-21.85,87.66-28.47,99.61-30.07l-3-60.89c-126.43,6.67-209.32,66.08-256.73,115C203.76,317.82,181.46,362.93,175.75,375.49Z",
  "M526.33,811.44c-146.43,0-265.56-119.27-265.56-265.87,0-73.51,39.2-143.73,75.88-185l23.87,21.24c-32.78,36.83-67.8,99.17-67.8,163.71,0,129,104.8,233.92,233.61,233.92,124.78,0,230.2-107.12,230.2-233.92,0-67-30.29-131.74-83.11-177.74l21-24.09c59.78,52.07,94.07,125.63,94.07,201.83C788.48,689.68,668.43,811.44,526.33,811.44Z",
  "M526.78,890.4c-135.51,0-258.64-79.75-313.69-203.18l37.51-16.73c48.46,108.64,156.86,178.84,276.18,178.84,166.54,0,302-135,302-300.82S693.32,247.7,526.78,247.7a300.32,300.32,0,0,0-129.24,28.87L380,239.42a341.24,341.24,0,0,1,146.78-32.79c189.18,0,343.1,153.37,343.1,341.88S716,890.4,526.78,890.4Z",
  "M520.32,920.27V908.1c204.27,0,366.07-162.86,368.34-370.75l12.17.13c-1.14,104.73-41.15,201.68-112.66,273C717.19,881.28,622.06,920.27,520.32,920.27Z",
  "M930.46,548.09c-7.07-224-186-402.19-407.27-405.63l.34-21.3C636,122.91,742.06,168.05,822.3,248.28A441.14,441.14,0,0,1,951.75,547.42Z",
];

/* Mark placement: 900.6×892.49 scaled to ~70px, centred on the plate. */
const MARK_SCALE = 0.078;
const MARK_TX = f(200 - (900.6 * MARK_SCALE) / 2);
const MARK_TY = f(200 - (892.49 * MARK_SCALE) / 2);

function Mark({ fill, opacity }: { fill: string; opacity?: number }) {
  return (
    <g fill={fill} opacity={opacity}>
      <ellipse cx="449.1" cy="452.92" rx="151.6" ry="152.29" />
      <g transform="translate(-77.68 -98.27)">
        {MARK_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </g>
  );
}

/* var()/calc() are unreliable inside SVG presentation attributes, so
   token-driven opacities go through the style prop (real CSS). */
const shEdge: React.CSSProperties = { strokeOpacity: "var(--emblem-sh)" };
const hlEdge = (m: number): React.CSSProperties => ({ strokeOpacity: `calc(var(--emblem-hl) * ${m})` });

/** Slotted screw head, authored around 0,0. */
function Screw({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <circle r="4.6" fill="var(--emblem-metal)" stroke="var(--emblem-shadow)" style={shEdge} strokeWidth="1" />
      <circle r="3.9" fill="none" stroke="var(--emblem-highlight)" style={hlEdge(0.6)} strokeWidth="0.6" />
      <line x1="-3" y1="0" x2="3" y2="0" stroke="var(--emblem-engrave)" strokeWidth="1.3" />
    </g>
  );
}

export interface MechanismEmblemProps {
  size?: number; // px, default 400
  beat?: number; // seconds per balance oscillation, default 1.2
  paused?: boolean;
  className?: string;
}

export function MechanismEmblem({ size = 400, beat = 1.2, paused = false, className }: MechanismEmblemProps) {
  const uid = useId();
  const bezelSheen = `${uid}bezel`;
  const plateShade = `${uid}plate`;
  const faceSheen = `${uid}face`;
  const sweepGrad = `${uid}sweep`;

  return (
    <svg
      className={cn("mech-emblem", className)}
      data-paused={paused || undefined}
      style={{ "--beat": `${beat}s` } as React.CSSProperties}
      width={size}
      height={size}
      viewBox="0 0 400 400"
      role="img"
      aria-label="InstaSafe mechanism emblem"
    >
      <defs>
        {/* Sheens are highlight/shadow overlays on solid metal, so the
            gradients theme through the same tokens as everything else. */}
        <linearGradient id={bezelSheen} x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--emblem-highlight)" stopOpacity="0.24" />
          <stop offset="0.45" stopColor="var(--emblem-highlight)" stopOpacity="0.02" />
          <stop offset="0.75" stopColor="var(--emblem-shadow)" stopOpacity="0.14" />
          <stop offset="1" stopColor="var(--emblem-shadow)" stopOpacity="0.26" />
        </linearGradient>
        <radialGradient id={faceSheen} cx="0.38" cy="0.34" r="0.75">
          <stop offset="0" stopColor="var(--emblem-highlight)" stopOpacity="0.1" />
          <stop offset="0.7" stopColor="var(--emblem-highlight)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--emblem-shadow)" stopOpacity="0.12" />
        </radialGradient>
        <radialGradient id={plateShade} cx="0.42" cy="0.38" r="0.8">
          <stop offset="0" stopColor="var(--emblem-highlight)" stopOpacity="0.09" />
          <stop offset="0.65" stopColor="var(--emblem-highlight)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--emblem-shadow)" stopOpacity="0.2" />
        </radialGradient>
        <linearGradient id={sweepGrad} x1="-109" y1="0" x2="109" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--emblem-sweep)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--emblem-sweep)" stopOpacity="1" />
          <stop offset="1" stopColor="var(--emblem-sweep)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g transform="translate(200 200)">
        {/* ---- 1 · bezel + face ---- */}
        <circle r="176" fill="var(--emblem-metal)" />
        <circle r="176" fill={`url(#${faceSheen})`} />
        <circle r="183" fill="none" stroke="var(--emblem-metal)" strokeWidth="14" />
        <circle r="183" fill="none" stroke={`url(#${bezelSheen})`} strokeWidth="14" />
        <path d={BEZEL_BRUSH} stroke="var(--emblem-highlight)" strokeOpacity="0.08" strokeWidth="0.6" fill="none" />
        <circle r="190" fill="none" stroke="var(--emblem-shadow)" style={shEdge} strokeWidth="1" />
        <circle r="188.8" fill="none" stroke="var(--emblem-highlight)" style={hlEdge(0.5)} strokeWidth="0.6" />
        <circle r="176" fill="none" stroke="var(--emblem-shadow)" style={shEdge} strokeWidth="0.8" />
        <circle r="174.9" fill="none" stroke="var(--emblem-highlight)" style={hlEdge(0.4)} strokeWidth="0.5" />

        {/* ---- 2 · index ring ---- */}
        <path d={MINOR_TICKS} stroke="var(--emblem-engrave)" strokeWidth="1" strokeOpacity="0.85" fill="none" />
        <path d={CARDINAL_TICKS} stroke="var(--emblem-accent)" strokeWidth="2.2" fill="none" />

        {/* ---- 3 · calm ring — deliberately empty of detail ---- */}
        <circle r="156" fill="none" stroke="var(--emblem-engrave)" strokeOpacity="0.3" strokeWidth="0.6" />
        <g stroke="var(--emblem-engrave)" strokeOpacity="0.16" strokeWidth="0.5" fill="none">
          {CALM_RINGS.map((r) => (
            <circle key={r} r={r} />
          ))}
        </g>
        <circle r="112" fill="none" stroke="var(--emblem-engrave)" strokeOpacity="0.3" strokeWidth="0.6" />

        {/* ---- 4 · gear train, recessed ---- */}
        <circle r="104" fill="var(--emblem-shadow)" style={{ fillOpacity: "var(--emblem-recess)" }} />
        <circle r="104" fill="none" stroke="var(--emblem-shadow)" style={shEdge} strokeWidth="1.2" />
        <circle r="105.2" fill="none" stroke="var(--emblem-highlight)" style={hlEdge(0.5)} strokeWidth="0.6" />

        {/* escape wheel — advances one tooth per half-beat, then holds */}
        <g transform="translate(-80 0)">
          <g className="me-rot me-escape">
            <path d={ESCAPE_TEETH} fill="var(--emblem-metal)" stroke="var(--emblem-engrave)" strokeOpacity="0.6" strokeWidth="0.5" />
            <circle r="12" fill="none" stroke="var(--emblem-engrave)" strokeOpacity="0.7" strokeWidth="0.6" />
            {[45, 135, 225, 315].map((a) => (
              <circle key={a} cx={px(8, (a * Math.PI) / 180)} cy={py(8, (a * Math.PI) / 180)} r="3.4" fill="var(--emblem-shadow)" fillOpacity="0.5" />
            ))}
            <circle r="3.2" fill="var(--emblem-metal)" stroke="var(--emblem-shadow)" style={shEdge} strokeWidth="0.8" />
            <circle r="1.3" fill="var(--emblem-accent)" />
          </g>
        </g>

        {/* pallet fork — pivot on the escape↔balance line, jewels at the
            escape end, fork horns toward the balance roller */}
        <g transform="translate(-41 40)">
          <g className="me-rot me-pallet">
            <g transform="rotate(-44.3)">
              <path
                d="M0,18L0,-34M-10,-31.5L10,-31.5M-3.4,18L-3.4,24M3.4,18L3.4,24"
                fill="none"
                stroke="var(--emblem-metal)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M0,18L0,-34M-10,-31.5L10,-31.5"
                fill="none"
                stroke="var(--emblem-highlight)"
                style={hlEdge(0.7)}
                strokeWidth="0.9"
                strokeLinecap="round"
              />
              <rect x="-11.2" y="-37" width="2.4" height="6" rx="0.6" fill="var(--emblem-accent)" transform="rotate(28 -10 -34)" />
              <rect x="8.8" y="-37" width="2.4" height="6" rx="0.6" fill="var(--emblem-accent)" transform="rotate(-28 10 -34)" />
              <circle r="2.6" fill="var(--emblem-metal)" stroke="var(--emblem-shadow)" style={shEdge} strokeWidth="0.8" />
              <circle r="1.1" fill="var(--emblem-accent)" />
            </g>
          </g>
        </g>

        {/* balance wheel + hairspring — one full oscillation per beat */}
        <g transform="translate(0 82)">
          <g className="me-rot me-balance">
            <circle r="24" fill="none" stroke="var(--emblem-metal)" strokeWidth="4" />
            <circle r="25.8" fill="none" stroke="var(--emblem-highlight)" style={hlEdge(0.6)} strokeWidth="0.6" />
            <circle r="22.2" fill="none" stroke="var(--emblem-shadow)" style={shEdge} strokeWidth="0.6" />
            <path
              d="M-22,0L22,0M0,-22L0,22"
              stroke="var(--emblem-metal)"
              strokeWidth="2.4"
              transform="rotate(30)"
            />
            <path
              d="M-22,0L22,0M0,-22L0,22"
              stroke="var(--emblem-highlight)"
              style={hlEdge(0.5)}
              strokeWidth="0.7"
              transform="rotate(30)"
            />
            <path d={HAIRSPRING} fill="none" stroke="var(--emblem-engrave)" strokeWidth="0.6" strokeOpacity="0.75" />
            {[0, 90, 180, 270].map((a) => (
              <circle key={a} cx={px(24, (a * Math.PI) / 180)} cy={py(24, (a * Math.PI) / 180)} r="1.6" fill="var(--emblem-engrave)" />
            ))}
            <circle r="3" fill="var(--emblem-metal)" stroke="var(--emblem-shadow)" style={shEdge} strokeWidth="0.8" />
            <circle r="1.3" fill="var(--emblem-accent)" />
          </g>
        </g>

        <Screw x={72} y={-54} angle={20} />
        <Screw x={80} y={36} angle={-35} />
        <Screw x={-48} y={-84} angle={65} />

        {/* ---- 5 · centre plate ---- */}
        <circle r="56" fill="var(--emblem-metal)" />
        <circle r="56" fill={`url(#${plateShade})`} />
        <circle r="56" fill="none" stroke="var(--emblem-shadow)" style={shEdge} strokeWidth="1.1" />
        <circle r="54.6" fill="none" stroke="var(--emblem-highlight)" style={hlEdge(0.8)} strokeWidth="0.7" />
        <circle r="49" fill="none" stroke="var(--emblem-engrave)" strokeOpacity="0.5" strokeWidth="0.5" />
      </g>

      {/* engraved mark: highlight copy offset 1px beneath reads as the
          lit lower edge of a recessed cut */}
      <g transform={`translate(${MARK_TX} ${MARK_TY + 0.9}) scale(${MARK_SCALE})`}>
        <Mark fill="var(--emblem-highlight)" opacity={0.6} />
      </g>
      <g transform={`translate(${MARK_TX} ${MARK_TY}) scale(${MARK_SCALE})`}>
        <Mark fill="var(--emblem-engrave)" />
      </g>

      {/* ---- 6 · specular sweep — parked upper-left at rest ---- */}
      <g transform="translate(200 200) rotate(-45)">
        <g className="me-rot me-sweep">
          <path d="M0,0L-109,-155.63A190,190 0 0,1 109,-155.63Z" fill={`url(#${sweepGrad})`} />
        </g>
      </g>
    </svg>
  );
}
