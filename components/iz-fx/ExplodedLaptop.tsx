"use client";

import { useEffect, useRef } from "react";
import { LAPTOP_CX, LAPTOP_LAYERS, LAPTOP_VB, OPEN_SCREEN, SCREEN_TX, SCREEN_TY } from "./laptop-geometry";
import "./explodedlaptop.css";

/* ============================================================
   <ExplodedLaptop /> — scroll-scrubbed exploded-view inspection.

   GEOMETRY IS GENERATED, NOT DRAWN HERE. Downloads/gen_laptop.py is
   the source of truth; scratchpad/port_laptop.py captures each of its
   layers verbatim (flat local coords under the generator's iso
   matrix) into laptop-geometry.ts. Nothing is redrawn or simplified —
   the only edit in transit is four hardcoded colours becoming --xl-*
   tokens.

   THE OPENING. The generator's OPEN mode replaces lid + panel + cam
   with one screen standing on the vertical plane
   matrix(0.866 0.42 0 -1) at (956, 588). Fold that plane about the
   iso u-axis by angle θ and its projected matrix is
     matrix(0.866, 0.42, −0.866·cosθ, 0.42·cosθ − sinθ)
   — θ=0 is EXACTLY the flat iso matrix and lands the screen's centre
   on the deck's centre (the generator's translate makes the fold
   self-align), θ=90° is exactly the approved standing plane. So the
   laptop OPENS: one CSS matrix whose two varying cells run on cos/sin
   of the same --p everything else uses.

   ANIMATION — the earlier brief's machinery, unchanged:
   - One rAF scroll listener writes ONE --progress on the root.
   - Each layer already arrives as its own <g>; the generator's `ty`
     IS the exploded position, so the component wraps every layer in
     an animated group whose translateY runs assembled ↔ exploded
     through the [--a, --b] phase windows. CSS transform would
     REPLACE the generator's matrix if both sat on one element, which
     is why the wrapper and the ported <g> are two nodes.
   - The assembled state parks every plate in a ~90px slab under the
     lid; the generator paints bottom-first / lid-last with opaque
     plate fills, so the collapse self-occludes into a closed laptop.
     Only the floating screws fade (they are drawn above everything).
   ============================================================ */

const [VB_W, VB_H] = LAPTOP_VB;
const CX = LAPTOP_CX;

/** assembled slab: the deck anchors, everything parks around it */
const DECK_TY = 664;
const AO: Record<string, number> = {
  hinge: -16,
  deck: 0,
  fan: 8,
  mobo: 12,
  "ssd-wifi": 18,
  battery: 22,
  "speakers-io": 26,
  bottom: 32,
  "screws-bottom": 48,
};
/** stagger rank — outer parts leave first (brief phase 2) */
const K: Record<string, number> = {
  "screws-bottom": 0,
  bottom: 1,
  "speakers-io": 2,
  battery: 3,
  "ssd-wifi": 4,
  hinge: 5,
  mobo: 6,
  fan: 7,
  deck: 8,
};
const f2 = (n: number) => +n.toFixed(3);
/** the base starts exploding only once the lid is well on its way up */
const layerWin = (id: string) => {
  const a = 0.16 + (K[id] ?? 8) * 0.024;
  return { a: f2(a), b: f2(a + 0.198) };
};
/** the opening itself: first thing the scroll does */
const SCREEN_WIN = { a: 0.04, b: 0.24 };
/** exploded ty comes from the generator; dy is the scrub's travel */
const layerDy = (id: string, ty: number) => ty - (DECK_TY + (AO[id] ?? 0));

/* ---------- the callout manifest ----------
   Rows run the reference's label order; anchors sit on the ported
   layers' exploded positions (generator sheet coordinates). */
type Callout = { label: string; side: "l" | "r"; row: number; at: [number, number]; min?: boolean };

const L: Callout[] = [
  { label: "OS 14.2", side: "l", row: 0, at: [742, 240] },
  { label: "AV DEFS 2d", side: "l", row: 1, at: [752, 380] },
  { label: "FIREWALL", side: "l", row: 2, at: [790, 500], min: true },
  { label: "DISK ENC", side: "l", row: 3, at: [CX - 236, 566], min: true },
  { label: "SECURE BOOT", side: "l", row: 4, at: [CX - 350, 668], min: true },
  { label: "TPM 2.0", side: "l", row: 5, at: [CX - 320, 856], min: true },
  { label: "MEMORY TEST", side: "l", row: 6, at: [CX - 270, 912] },
  { label: "CPU HEALTH", side: "l", row: 7, at: [CX - 30, 872] },
  { label: "FAN RPM OK", side: "l", row: 8, at: [CX + 210, 820] },
  { label: "THERMALS OK", side: "l", row: 9, at: [CX + 24, 866] },
  { label: "KEYBOARD OK", side: "l", row: 10, at: [CX - 310, 690] },
  { label: "TOUCHPAD OK", side: "l", row: 11, at: [CX - 94, 710] },
];
const R: Callout[] = [
  { label: "BIOS 1.18.0", side: "r", row: 0, at: [1176, 320], min: true },
  { label: "FW UPTODATE", side: "r", row: 1, at: [1152, 640] },
  { label: "DISPLAY OK", side: "r", row: 2, at: [1165, 420] },
  { label: "CAMERA OK", side: "r", row: 3, at: [956, 244] },
  { label: "MIC ARRAY OK", side: "r", row: 4, at: [980, 246] },
  { label: "WIFI 6 OK", side: "r", row: 5, at: [CX + 111, 1051], min: true },
  { label: "BT 5.2 OK", side: "r", row: 6, at: [CX + 71, 1050] },
  { label: "I/O PORTS OK", side: "r", row: 7, at: [CX + 114, 1045] },
  { label: "STORAGE SMART", side: "r", row: 8, at: [CX - 15, 990] },
  { label: "BATTERY HEALTH", side: "r", row: 9, at: [CX + 168, 1177], min: true },
  { label: "CHASSIS INTEGRITY", side: "r", row: 10, at: [CX + 346, 1364] },
  { label: "PHYSICAL LOCK", side: "r", row: 11, at: [CX + 69, 1470], min: true },
];
const CALLOUTS: Callout[] = Array.from({ length: 12 }, (_, i) => [L[i], R[i]]).flat();
const calloutWin = (idx: number) => {
  const a = 0.45 + idx * 0.0145;
  return { a: f2(a), b: f2(a + 0.09) };
};

const ROW0 = 200;
const ROW_STEP = 100;
const BOX_H = 46;
/** mono advance at 24px viewBox type ≈ 14.9/ch */
const boxW = (label: string) => +(label.length * 14.9 + 74).toFixed(1);
const f = (n: number) => +n.toFixed(1);

/** Box → horizontal → one 45° → (vertical tail if needed) → anchor.
 *  The single-elbow form only exists when the horizontal room exceeds
 *  the vertical drop; the deck-row callouts point far up the sheet,
 *  so the general form finishes the remainder with a vertical tail —
 *  still blueprint grammar, never a reversed run under the box. */
function leaderPath(c: Callout): string {
  const [ax, ay] = c.at;
  const rowY = ROW0 + c.row * ROW_STEP + BOX_H / 2;
  const x0 = c.side === "l" ? 60 + boxW(c.label) : VB_W - 60 - boxW(c.label);
  const fwd = c.side === "l" ? 1 : -1;
  const dx = (ax - x0) * fwd; // horizontal room, always ≥ 0 by construction
  const dyy = Math.abs(ay - rowY);
  if (dyy <= dx - 24) {
    const xe = ax - fwd * dyy;
    return `M${f(x0)} ${f(rowY)}H${f(xe)}L${f(ax)} ${f(ay)}`;
  }
  const seg = Math.max(0, Math.min(dyy, dx - 24));
  const xm = ax - fwd * seg;
  const ym = rowY + Math.sign(ay - rowY) * seg;
  return `M${f(x0)} ${f(rowY)}H${f(xm)}L${f(ax)} ${f(ym)}V${f(ay)}`;
}
function boxPath(c: Callout): string {
  const w = boxW(c.label);
  const x = c.side === "l" ? 60 : VB_W - 60 - w;
  const y = ROW0 + c.row * ROW_STEP;
  const n = 10;
  return c.side === "l"
    ? `M${x} ${y}h${f(w - n)}l${n} ${n}v${BOX_H - n}h${-w}Z`
    : `M${f(x + n)} ${y}h${f(w - n)}v${BOX_H}h${-w}v${-(BOX_H - n)}Z`;
}

function CalloutG({ c, idx }: { c: Callout; idx: number }) {
  const w = calloutWin(idx);
  const bw = boxW(c.label);
  const bx = c.side === "l" ? 60 : VB_W - 60 - bw;
  const y = ROW0 + c.row * ROW_STEP;
  return (
    <g
      className={`xl-callout${c.min ? " xl-min" : ""}`}
      style={{ ["--a" as string]: w.a, ["--b" as string]: w.b } as React.CSSProperties}
    >
      <path d={leaderPath(c)} className="xl-leader" pathLength={1} />
      <circle cx={c.at[0]} cy={c.at[1]} r={4} className="xl-anchor" />
      <g className="xl-box">
        <path d={boxPath(c)} className="xl-boxln" />
        <text x={bx + 18} y={y + 30} className="xl-label">
          {c.label}
        </text>
        <polyline
          className="xl-check"
          pathLength={1}
          points={`${bx + bw - 36},${y + 24} ${bx + bw - 29},${y + 31} ${bx + bw - 17},${y + 16}`}
        />
      </g>
    </g>
  );
}

/* ---------- the stamp — the generator's, with the scrub attached ---------- */

function Stamp() {
  /* The generator parks it at (W−210, 190) on a sheet with no callout
     columns; here that lands on the BIOS box. Shifted into the air
     above the lid's right shoulder — it may overprint the drawing's
     corner, which is what a stamp does, but never a checklist row. */
  const cx = 1205;
  const cy = 112;
  return (
    <g className="xl-stamp" style={{ ["--a" as string]: 0.85, ["--b" as string]: 0.92 } as React.CSSProperties}>
      <g className="xl-stamp-inner" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <g transform={`translate(${cx} ${cy}) rotate(-12)`}>
          <circle r={92} className="xl-stamp-ring" strokeWidth={2.4} />
          <circle r={70} className="xl-stamp-ring" strokeWidth={1.6} />
          <defs>
            <path id="xl-arc-t" d="M -80 0 A 80 80 0 0 1 80 0" fill="none" />
            <path id="xl-arc-b" d="M -80 0 A 80 80 0 0 0 80 0" fill="none" />
          </defs>
          <text className="xl-stamp-arc">
            <textPath href="#xl-arc-t" startOffset="50%" textAnchor="middle">
              SECURITY VERIFIED
            </textPath>
          </text>
          <text className="xl-stamp-arc">
            <textPath href="#xl-arc-b" startOffset="50%" textAnchor="middle">
              ZERO TRUST
            </textPath>
          </text>
          <text y={6} textAnchor="middle" className="xl-stamp-word">
            ★ APPROVED ★
          </text>
        </g>
      </g>
    </g>
  );
}

/* ---------- the sheet ---------- */

function Sheet() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="xl"
      role="img"
      aria-label="Engineering drawing of a laptop exploded into its component layers, each layer verified by a security checklist and stamped approved: zero trust architecture"
    >
      {/* the generator's alignment guides through the stack */}
      <path d={`M${CX} 190 V1410`} className="xl-guide" style={{ opacity: 0.5 }} />
      <path d={`M${CX - 330} 340 V1380`} className="xl-guide" style={{ opacity: 0.35 }} />
      <path d={`M${CX + 330} 340 V1380`} className="xl-guide" style={{ opacity: 0.35 }} />

      <g className="xl-stack">
        {/* generator order IS painter's order: bottom first, lid last.
            The wrapper carries the scrub; the ported <g> carries the
            generator's matrix. Two nodes, or CSS transform would
            clobber the iso projection. */}
        {LAPTOP_LAYERS.map((l) => {
          const w = layerWin(l.id);
          const screws = l.id.startsWith("screws");
          return (
            <g
              key={l.id}
              className={`xl-layer${screws ? " xl-internal" : ""}`}
              data-part={l.id}
              style={
                {
                  ["--a" as string]: w.a,
                  ["--b" as string]: w.b,
                  ["--dy" as string]: layerDy(l.id, l.ty),
                } as React.CSSProperties
              }
            >
              <g
                transform={`translate(${CX + l.txo} ${l.ty})`}
                dangerouslySetInnerHTML={{ __html: l.inner }}
              />
            </g>
          );
        })}

        {/* THE OPENING. Drawn last — the screen is the nearest thing in
            both states. The pivot's matrix is CSS, not an attribute:
            its two varying cells run on cos/sin of the fold angle, and
            θ=0 lays the screen flat over the deck as the closed lid. */}
        <g
          className="xl-layer xl-screen"
          data-part="screen"
          style={
            {
              ["--a" as string]: SCREEN_WIN.a,
              ["--b" as string]: SCREEN_WIN.b,
              ["--dy" as string]: 0,
              ["--stx" as string]: `${SCREEN_TX}px`,
              ["--sty" as string]: `${SCREEN_TY}px`,
            } as React.CSSProperties
          }
        >
          <g className="xl-screen-pivot" dangerouslySetInnerHTML={{ __html: OPEN_SCREEN }} />
        </g>
      </g>

      {CALLOUTS.map((c, i) => (
        <CalloutG key={c.label} c={c} idx={i} />
      ))}

      <Stamp />
    </svg>
  );
}

/* ---------- exports ---------- */

export function ExplodedLaptopStatic({ className }: { className?: string }) {
  return (
    <div className={`xl-root xl-static${className ? ` ${className}` : ""}`}>
      <Sheet />
    </div>
  );
}

export function ExplodedLaptop({
  pinLength = 300,
  className,
}: {
  /** how much scroll the pinned inspection consumes, in vh */
  pinLength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = -1;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      const q = Math.round(p * 2000) / 2000;
      if (q !== last) {
        last = q;
        el.style.setProperty("--progress", String(q));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`xl-root xl-sec${className ? ` ${className}` : ""}`}
      style={{ ["--pin" as string]: `${pinLength}vh` } as React.CSSProperties}
    >
      <div className="xl-pin">
        <Sheet />
      </div>
    </section>
  );
}
