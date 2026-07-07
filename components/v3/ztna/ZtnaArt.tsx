"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Deployment card illustrations — outline style, no icons.
   Sit as a faint background; card is tall, text lives at the foot.
   ============================================================ */

const STROKE = "var(--accent-blue-light)";

export function DeployIllustration({ type }: { type: "cloud" | "onprem" | "hybrid" }) {
  const common = {
    fill: "none",
    stroke: STROKE,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };
  return (
    <svg viewBox="0 0 200 240" className="absolute inset-x-0 top-0 h-[62%] w-full" preserveAspectRatio="xMidYMid meet" aria-hidden style={{ opacity: 0.5 }}>
      {type === "cloud" && (
        <g {...common}>
          <path d="M58 120 a26 26 0 0 1 24 -34 a32 32 0 0 1 60 6 a22 22 0 0 1 -4 44 H70 a20 20 0 0 1 -12 -16 z" />
          {[70, 100, 130].map((x) => (
            <g key={x}>
              <path d={`M${x} 140 V168`} strokeDasharray="3 5" />
              <rect x={x - 12} y={168} width="24" height="20" rx="3" />
              <circle cx={x} cy={178} r="2.5" />
            </g>
          ))}
          <path d="M100 86 V60" strokeDasharray="3 5" />
          <path d="M93 70 l7 -10 l7 10" />
        </g>
      )}
      {type === "onprem" && (
        <g {...common}>
          <rect x="60" y="40" width="80" height="150" rx="4" />
          {[60, 86, 112, 152].map((y) =>
            [74, 92, 110, 126].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="12" height="14" rx="1.5" />)
          )}
          <path d="M44 190 H156" />
          <rect x="150" y="150" width="34" height="40" rx="3" />
          {[158, 168, 178].map((y) => (
            <g key={y}>
              <path d={`M154 ${y} H180`} />
              <circle cx="158" cy={y} r="1.6" />
            </g>
          ))}
        </g>
      )}
      {type === "hybrid" && (
        <g {...common}>
          <path d="M30 70 a18 18 0 0 1 17 -24 a22 22 0 0 1 42 4 a16 16 0 0 1 -3 31 H40 a14 14 0 0 1 -10 -11 z" />
          <rect x="120" y="120" width="56" height="64" rx="4" />
          {[128, 148].map((y) => [128, 146, 164].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="10" height="12" rx="1.5" />))}
          <path d="M70 80 C 90 110, 110 110, 132 120" strokeDasharray="4 5" />
          <path d="M126 112 l8 6 l-3 9" />
        </g>
      )}
    </svg>
  );
}

/* ============================================================
   Outlined city-map poster background (procedural, deterministic).
   Inspired by maptoposter — warm streets, arterials, water, label.
   ============================================================ */

function mulberry(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MAP = (() => {
  const r = mulberry(7714);
  const W = 600;
  const H = 460;
  const streets: string[] = [];
  // jittered vertical streets
  for (let i = 1; i < 22; i++) {
    const x = (i / 22) * W;
    let d = `M ${x.toFixed(1)} 0`;
    for (let y = 30; y <= H; y += 34) d += ` L ${(x + (r() - 0.5) * 16).toFixed(1)} ${y}`;
    streets.push(d);
  }
  // jittered horizontal streets
  for (let j = 1; j < 16; j++) {
    const y = (j / 16) * H;
    let d = `M 0 ${y.toFixed(1)}`;
    for (let x = 30; x <= W; x += 34) d += ` L ${x} ${(y + (r() - 0.5) * 16).toFixed(1)}`;
    streets.push(d);
  }
  // bold arterials radiating from a centre
  const cx = 300 + (r() - 0.5) * 60;
  const cy = 230 + (r() - 0.5) * 40;
  const arterials: string[] = [];
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * Math.PI * 2 + r();
    const ex = cx + Math.cos(a) * 520;
    const ey = cy + Math.sin(a) * 520;
    const mx = cx + Math.cos(a + 0.5) * 160;
    const my = cy + Math.sin(a + 0.5) * 160;
    arterials.push(`M ${cx.toFixed(0)} ${cy.toFixed(0)} Q ${mx.toFixed(0)} ${my.toFixed(0)} ${ex.toFixed(0)} ${ey.toFixed(0)}`);
  }
  // ring road
  const ring = `M ${cx - 150} ${cy} a 150 110 0 1 0 300 0 a 150 110 0 1 0 -300 0`;
  // lakes
  const lakes = [
    `M 110 120 q 24 -16 44 4 q 14 22 -10 34 q -34 8 -40 -16 z`,
    `M 470 300 q 30 -10 46 14 q 8 26 -22 32 q -34 2 -34 -22 z`,
    `M 250 360 q 20 -8 30 8 q 6 18 -16 22 q -24 0 -22 -18 z`,
  ];
  return { W, H, streets, arterials, ring, lakes };
})();

export function CityMap({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${MAP.W} ${MAP.H}`} className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="map-fade" cx="50%" cy="46%" r="62%">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.55" stopColor="white" stopOpacity="0.55" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </radialGradient>
        <mask id="map-mask">
          <rect width={MAP.W} height={MAP.H} fill="white" />
          <rect width={MAP.W} height={MAP.H} fill="url(#map-fade)" />
        </mask>
      </defs>
      <g mask="url(#map-mask)">
        {MAP.lakes.map((d, i) => (
          <path key={`l-${i}`} d={d} fill="rgba(96,165,250,0.16)" stroke="rgba(96,165,250,0.4)" strokeWidth="0.8" />
        ))}
        {MAP.streets.map((d, i) => (
          <path key={`s-${i}`} d={d} fill="none" stroke="rgba(210,112,63,0.30)" strokeWidth="0.7" />
        ))}
        <path d={MAP.ring} fill="none" stroke="rgba(210,112,63,0.55)" strokeWidth="1.6" />
        {MAP.arterials.map((d, i) => (
          <path key={`a-${i}`} d={d} fill="none" stroke="rgba(210,112,63,0.6)" strokeWidth="1.9" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

/* ============================================================
   Animated, theme-aware line chart — colourful, grows on view.
   Blast radius over a breach: VPN climbs, ZTNA stays flat at 1.
   ============================================================ */

const VPN_PTS = [6, 18, 40, 96, 150, 210, 252, 276, 288, 294];
const ZTNA_PTS = [6, 8, 10, 11, 11, 12, 12, 12, 13, 13];

function toPath(pts: number[], w: number, h: number, max: number) {
  const stepX = w / (pts.length - 1);
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${(i * stepX).toFixed(1)} ${(h - (p / max) * h).toFixed(1)}`).join(" ");
}

export function BreachLineChart() {
  const reduce = useReducedMotion() ?? false;
  const W = 320;
  const H = 170;
  const MAXV = 300;
  const vpn = toPath(VPN_PTS, W, H, MAXV);
  const ztna = toPath(ZTNA_PTS, W, H, MAXV);
  const vpnArea = `${vpn} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: "var(--db-bg)", borderColor: "var(--db-border)", boxShadow: "var(--db-shadow)" }}
    >
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-bold" style={{ color: "var(--db-text)" }}>
          Blast radius during a breach
        </h3>
        <div className="flex items-center gap-3 text-[10px] font-semibold">
          <span className="flex items-center gap-1" style={{ color: "#f87171" }}>
            <span className="h-2 w-2 rounded-full" style={{ background: "#ef4444" }} /> VPN
          </span>
          <span className="flex items-center gap-1" style={{ color: "#34d399" }}>
            <span className="h-2 w-2 rounded-full" style={{ background: "#22c55e" }} /> ZTNA
          </span>
        </div>
      </div>
      <p className="mb-3 text-[11px]" style={{ color: "var(--db-text-mute)" }}>
        Systems reachable from one stolen credential, over time.
      </p>
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full" role="img" aria-label="Line chart: on a VPN the number of reachable systems climbs steeply while on ZTNA it stays flat at one.">
        <defs>
          <linearGradient id="vpn-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vpn-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fb923c" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="ztna-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        {/* grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="var(--db-border)" strokeWidth="1" opacity="0.5" />
        ))}
        {/* vpn area + line */}
        <motion.path d={vpnArea} fill="url(#vpn-area)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} />
        <motion.path
          d={vpn}
          fill="none"
          stroke="url(#vpn-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.path
          d={ztna}
          fill="none"
          stroke="url(#ztna-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
        />
        {/* end markers */}
        <motion.circle cx={W} cy={H - (294 / MAXV) * H} r="4" fill="#ef4444" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.4, type: "spring", stiffness: 300 }} />
        <motion.circle cx={W} cy={H - (13 / MAXV) * H} r="4" fill="#22c55e" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.4, type: "spring", stiffness: 300 }} />
        {/* labels */}
        <text x={W - 6} y={H - (294 / MAXV) * H - 8} textAnchor="end" fontSize="11" fontWeight="700" fill="#f87171">
          all systems
        </text>
        <text x={W - 6} y={H - (13 / MAXV) * H - 8} textAnchor="end" fontSize="11" fontWeight="700" fill="#34d399">
          1 app
        </text>
      </svg>
    </div>
  );
}
