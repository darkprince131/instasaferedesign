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

/* ---------- the posture manifest ----------
   The /platform/device-posture adaptation: the twenty hardware
   callouts become eight CHECK FAMILY clusters — real posture checks,
   not hardware status. A cluster is a mono family label plus the
   actual check names under it, one leader to the layer that check
   family reads. The columns widen (the check-name lines are long), so
   the posture sheet runs on a 1800-wide viewBox with the stack shifted
   +100 to stay centred.

   Anchors are sheet coordinates ALREADY shifted (+100 vs the
   generator). The right column starts low (y≥720) because the open
   screen owns the upper-right quadrant — a leader through the screen's
   face is not blueprint grammar. Same reason the right rows run
   deck → fan → io → bottom (anchor heights are monotonic; the
   family order swaps DOMAIN and PROCESSES vs the brief so no two
   leaders cross). */

const P_VB_W = 1800;
const P_SHIFT = 100;
/* measured in-browser on Geist Mono (getComputedTextLength):
   24px family labels advance 15.84/ch, 14px check names 8.96/ch.
   Constants carry a hair of slack on top of the measurement. */
const FAM_ADV = 15.9;
const CK_ADV = 9.0; // 14px check-name advance (~11px rendered)

type Cluster = {
  family: string;
  checks: string[];
  side: "l" | "r";
  y: number;
  at: [number, number];
  min?: boolean;
};

const PL: Cluster[] = [
  { family: "SESSION & IDENTITY", checks: ["BrowserID · TenantId"], side: "l", y: 230, at: [842, 250] },
  {
    family: "OPERATING SYSTEM",
    checks: ["OS · OSName · OSVersion · ServicePack · Hotfix"],
    side: "l",
    y: 500,
    at: [730, 900],
    min: true,
  },
  { family: "DISK ENCRYPTION", checks: ["BitLocker"], side: "l", y: 790, at: [880, 992], min: true },
  { family: "NETWORK PROTECTION", checks: ["Firewall · FirewallStatus"], side: "l", y: 1080, at: [1011, 1051] },
];
const PR: Cluster[] = [
  {
    family: "MALWARE PROTECTION",
    checks: [
      "Antivirus · AntiVirusStatus",
      "AntiVirusLastUpdate · SEPLastAVUpdate",
      "AntiSpyWare · AntiSpywareStatus",
    ],
    side: "r",
    y: 720,
    at: [1055, 800],
    min: true,
  },
  {
    family: "RUNNING PROCESSES",
    checks: ["ProcessRunning · ProcessNotRunning"],
    side: "r",
    y: 940,
    at: [1110, 820],
    min: true,
  },
  { family: "DOMAIN & MANAGEMENT", checks: ["InDomain · DomainName · mdm"], side: "r", y: 1160, at: [1160, 1230] },
  {
    family: "FILES & REGISTRY",
    checks: ["FileExists · FileNotExists · RegistryKeyExists"],
    side: "r",
    y: 1380,
    at: [1246, 1364],
  },
];
const CLUSTERS: Cluster[] = Array.from({ length: 4 }, (_, i) => [PL[i], PR[i]]).flat();
const clusterWin = (idx: number) => {
  const a = 0.45 + idx * 0.04;
  return { a: f2(a), b: f2(a + 0.11) };
};

/* ---------- the phone ticker ----------
   On a phone the eight clusters were unreadable — 14px check names on
   an 1800-wide sheet squeezed into 375px land at about 3px, and the
   old mobile rule could only hide five of the eight and leave the rest
   just as small. The note it left ("a genuinely larger mobile type
   needs a second row manifest, not a font-size override") is what this
   is: the SHEET keeps only the drawing, at 2.35x its old size, and the
   clusters become a single line of real type at the foot of the pin
   that advances one family at a time as you scroll.

   Windows are the ticker's own, not `clusterWin`'s. Those overlap by
   design — several callouts stand on the sheet at once — whereas the
   ticker shows exactly one, so the callout phase (0.45 → 1) is split
   into eight equal slots instead. */
const TICK_FROM = 0.45;
const TICK_SPAN = (1 - TICK_FROM) / 8;
const tickWin = (idx: number) => ({
  a: f2(TICK_FROM + idx * TICK_SPAN),
  /* the last slot runs to the end rather than to 1 - span, so the
     final family is still on screen when the stamp lands */
  b: idx === 7 ? 1.2 : f2(TICK_FROM + (idx + 1) * TICK_SPAN),
});

/* +26 reserves the checkmark's lane (w−36 … w−17) beside the family
   label — without it the tick prints over long family names */
const clusterW = (c: Cluster) =>
  +(Math.max(c.family.length * FAM_ADV + 26, ...c.checks.map((l) => l.length * CK_ADV)) + 36).toFixed(1);
const clusterH = (c: Cluster) => 54 + 22 * c.checks.length;

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

/** the callout leader grammar, box-agnostic: box edge → horizontal →
 *  one 45° → (vertical tail if needed) → anchor */
function leaderFrom(x0: number, rowY: number, ax: number, ay: number, fwd: 1 | -1): string {
  const dx = (ax - x0) * fwd;
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

function notchedBox(x: number, y: number, w: number, h: number, side: "l" | "r"): string {
  const n = 10;
  return side === "l"
    ? `M${f(x)} ${y}h${f(w - n)}l${n} ${n}v${f(h - n)}h${f(-w)}Z`
    : `M${f(x + n)} ${y}h${f(w - n)}v${f(h)}h${f(-w)}v${f(-(h - n))}Z`;
}

function ClusterG({ c, idx }: { c: Cluster; idx: number }) {
  const w = clusterWin(idx);
  const bw = clusterW(c);
  const bh = clusterH(c);
  const bx = c.side === "l" ? 60 : P_VB_W - 60 - bw;
  const x0 = c.side === "l" ? bx + bw : bx;
  const fwd: 1 | -1 = c.side === "l" ? 1 : -1;
  return (
    <g
      className={`xl-callout${c.min ? " xl-min" : ""}`}
      style={{ ["--a" as string]: w.a, ["--b" as string]: w.b } as React.CSSProperties}
    >
      <path d={leaderFrom(x0, c.y + bh / 2, c.at[0], c.at[1], fwd)} className="xl-leader" pathLength={1} />
      <circle cx={c.at[0]} cy={c.at[1]} r={4} className="xl-anchor" />
      <g className="xl-box">
        <path d={notchedBox(bx, c.y, bw, bh, c.side)} className="xl-boxln" />
        <text x={bx + 18} y={c.y + 32} className="xl-label">
          {c.family}
        </text>
        {c.checks.map((line, i) => (
          <text key={line} x={bx + 18} y={c.y + 58 + i * 22} className="xl-checkline">
            {line}
          </text>
        ))}
        <polyline
          className="xl-check"
          pathLength={1}
          points={`${f(bx + bw - 36)},${c.y + 24} ${f(bx + bw - 29)},${c.y + 31} ${f(bx + bw - 17)},${c.y + 16}`}
        />
      </g>
    </g>
  );
}

/* the drawing's title block — sheet furniture, static like the guides */
function TitleBlock() {
  return (
    <g className="xl-tb">
      <rect x={60} y={1390} width={380} height={90} className="xl-tb-rect" />
      <text x={78} y={1426} className="xl-label">
        DEVICE POSTURE CHECK
      </text>
      <path d="M60 1440 H440" className="xl-tb-rule" />
      <text x={78} y={1466} className="xl-checkline">
        EVALUATED AT CONNECTION + CONTINUOUS
      </text>
    </g>
  );
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

function Stamp({
  cx = 1205,
  arcTop = "SECURITY VERIFIED",
  arcBottom = "ZERO TRUST",
  word = "★ APPROVED ★",
  uid = "xl",
}: {
  cx?: number;
  arcTop?: string;
  arcBottom?: string;
  word?: string;
  /** textPath ids are document-global; each sheet variant needs its own */
  uid?: string;
}) {
  /* The generator parks it at (W−210, 190) on a sheet with no callout
     columns; here that lands on the BIOS box. Shifted into the air
     above the lid's right shoulder — it may overprint the drawing's
     corner, which is what a stamp does, but never a checklist row.
     Arc text must stay ≤17ch: that is what fits the r80 semicircle. */
  const cy = 112;
  return (
    <g className="xl-stamp" style={{ ["--a" as string]: 0.85, ["--b" as string]: 0.92 } as React.CSSProperties}>
      <g className="xl-stamp-inner" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <g transform={`translate(${cx} ${cy}) rotate(-12)`}>
          <circle r={92} className="xl-stamp-ring" strokeWidth={2.4} />
          <circle r={70} className="xl-stamp-ring" strokeWidth={1.6} />
          <defs>
            <path id={`${uid}-arc-t`} d="M -80 0 A 80 80 0 0 1 80 0" fill="none" />
            <path id={`${uid}-arc-b`} d="M -80 0 A 80 80 0 0 0 80 0" fill="none" />
          </defs>
          <text className="xl-stamp-arc">
            <textPath href={`#${uid}-arc-t`} startOffset="50%" textAnchor="middle">
              {arcTop}
            </textPath>
          </text>
          <text className="xl-stamp-arc">
            <textPath href={`#${uid}-arc-b`} startOffset="50%" textAnchor="middle">
              {arcBottom}
            </textPath>
          </text>
          <text y={6} textAnchor="middle" className="xl-stamp-word">
            {word}
          </text>
        </g>
      </g>
    </g>
  );
}

/* ---------- the sheet ---------- */

function Sheet({ posture = false }: { posture?: boolean }) {
  const vbw = posture ? P_VB_W : VB_W;
  const shift = posture ? P_SHIFT : 0;
  return (
    <svg
      viewBox={`0 0 ${vbw} ${VB_H}`}
      className="xl"
      role="img"
      aria-label={
        posture
          ? "Engineering drawing of a laptop exploded into its component layers, each layer read by a device posture check family and stamped compliant: device trust"
          : "Engineering drawing of a laptop exploded into its component layers, each layer verified by a security checklist and stamped approved: zero trust architecture"
      }
    >
      <g transform={shift ? `translate(${shift} 0)` : undefined}>
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
      </g>

      {posture ? (
        <>
          {CLUSTERS.map((c, i) => (
            <ClusterG key={c.family} c={c} idx={i} />
          ))}
          <TitleBlock />
          <Stamp
            uid="xlp"
            cx={1305}
            arcTop="POSTURE VERIFIED"
            arcBottom="DEVICE TRUST"
            word="★ COMPLIANT ★"
          />
        </>
      ) : (
        <>
          {CALLOUTS.map((c, i) => (
            <CalloutG key={c.label} c={c} idx={i} />
          ))}
          <Stamp />
        </>
      )}
    </svg>
  );
}

/* ---------- exports ---------- */

type Variant = "hardware" | "posture";

export function ExplodedLaptopStatic({ className, variant = "hardware" }: { className?: string; variant?: Variant }) {
  return (
    <div className={`xl-root xl-static${className ? ` ${className}` : ""}`}>
      <Sheet posture={variant === "posture"} />
    </div>
  );
}

export function ExplodedLaptop({
  pinLength = 300,
  className,
  variant = "hardware",
}: {
  /** how much scroll the pinned inspection consumes, in vh */
  pinLength?: number;
  className?: string;
  /** "posture" swaps the hardware callouts for the 8 check-family
   *  clusters, the posture stamp and the title block */
  variant?: Variant;
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
        <Sheet posture={variant === "posture"} />

        {/* Phone only (CSS). It is `aria-hidden` because the sheet's own
            `aria-label` already names what the drawing is doing, and a
            screen reader should not be read eight family names it
            cannot navigate. */}
        {variant === "posture" && (
          <div className="xl-ticker" aria-hidden="true">
            {CLUSTERS.map((c, i) => {
              const w = tickWin(i);
              return (
                <p
                  key={c.family}
                  className="xl-tick"
                  style={{ ["--a" as string]: w.a, ["--b" as string]: w.b } as React.CSSProperties}
                >
                  <span className="xl-tick-n">{String(i + 1).padStart(2, "0")}/08</span>
                  <span className="xl-tick-fam">{c.family}</span>
                  <span className="xl-tick-checks">{c.checks.join(" · ")}</span>
                </p>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
