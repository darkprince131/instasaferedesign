"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { IZ_FX } from "./fx.config";

/* ============================================================
   NodalField — token-driven port of components/v3/LivingBackground.
   Same mesh data, packets, guard-state cycle and cursor-spotlight
   as the v3 original, but every color is a CSS custom property so
   it follows `.iz`'s active theme (dark/paper) and design system
   (accent) automatically:
     - edges / plain nodes  → var(--fx-line) / var(--fx-node)
       (defined in fx.css, mapped to --il-faint / --tx-mute so they
       flip with data-theme)
     - packets + guard "scanning" state + spotlight overlay → var(--accent)
     - guard "locked" / "secured" states → var(--ghost) / var(--allow)
     - washes + spotlight glow → color-mix(in srgb, var(--accent) N%, transparent)

   Deterministic positions (SSR/CSR markup matches, no hydration
   drift). Reduced-motion + pointer:fine guards preserved from v3.
   Renders null when IZ_FX.nodal is false — the one-liner to kill
   this effect everywhere it's mounted.
   ============================================================ */

type Node = { id: number; x: number; y: number; guard?: boolean };

const nodes: Node[] = [
  { id: 0, x: 120, y: 140 },
  { id: 1, x: 300, y: 90, guard: true },
  { id: 2, x: 470, y: 200 },
  { id: 3, x: 640, y: 120 },
  { id: 4, x: 820, y: 220, guard: true },
  { id: 5, x: 1010, y: 130 },
  { id: 6, x: 1180, y: 240 },
  { id: 7, x: 1330, y: 150 },
  { id: 8, x: 180, y: 360 },
  { id: 9, x: 390, y: 430 },
  { id: 10, x: 560, y: 380, guard: true },
  { id: 11, x: 740, y: 460 },
  { id: 12, x: 930, y: 390 },
  { id: 13, x: 1120, y: 470 },
  { id: 14, x: 1290, y: 400 },
  { id: 15, x: 240, y: 620 },
  { id: 16, x: 450, y: 680 },
  { id: 17, x: 660, y: 600, guard: true },
  { id: 18, x: 860, y: 690 },
  { id: 19, x: 1050, y: 620 },
  { id: 20, x: 1240, y: 700 },
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [0, 8], [1, 9], [2, 10], [3, 11], [4, 12], [5, 13], [6, 14],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
  [8, 15], [9, 16], [10, 17], [11, 18], [12, 19], [13, 20],
  [15, 16], [16, 17], [17, 18], [18, 19], [19, 20],
];

function Packet({ from, to, delay }: { from: Node; to: Node; delay: number }) {
  return (
    <motion.circle
      r={2.5}
      fill="var(--accent)"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{ cx: to.x, cy: to.y, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.4, delay, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
    />
  );
}

export interface NodalFieldProps {
  /** 0–1 fraction of edges rendered; thins the mesh for a subtler feel. Default 1 = full v3 density. */
  density?: number;
  /** Overall svg opacity. Default 0.55 matches the v3 original. */
  opacity?: number;
  /** Cursor-follow spotlight reveal sub-feature. Also gated by IZ_FX.spotlight. */
  spotlight?: boolean;
  className?: string;
}

export function NodalField({ density = 1, opacity = 0.55, spotlight = true, className = "" }: NodalFieldProps) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const rawId = useId();
  const glowId = `fxglow-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const showSpotlight = spotlight && IZ_FX.spotlight;

  // Slow wave that re-lights guard nodes through their lock cycle.
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTick((n) => n + 1), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  const guardState = (id: number) => {
    // 0 locked (ghost), 1 scanning (accent), 2 secured (allow) — cycles per guard, offset by id
    return (tick + id) % 3;
  };

  // Cursor spotlight that reveals a brighter grid + mesh near the pointer.
  useEffect(() => {
    if (reduce || !showSpotlight) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let x = -300;
    let y = -300;
    const apply = () => {
      raf = 0;
      const el = rootRef.current;
      if (el) {
        el.style.setProperty("--fx-x", `${x}px`);
        el.style.setProperty("--fx-y", `${y}px`);
      }
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      rootRef.current?.style.setProperty("--fx-on", "1");
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => rootRef.current?.style.setProperty("--fx-on", "0");
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduce, showSpotlight]);

  if (!IZ_FX.nodal) return null;

  const stride = density >= 1 ? 1 : Math.max(1, Math.round(1 / density));
  const visibleEdges = stride === 1 ? edges : edges.filter((_, i) => i % stride === 0);

  return (
    <div ref={rootRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* deep gradient wash — accent-tinted via color-mix, no fixed hue */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% -10%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%), radial-gradient(ellipse 80% 50% at 80% 110%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 60%)",
        }}
      />
      <svg
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{ opacity }}
      >
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* edges */}
        {visibleEdges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="var(--fx-line)"
            strokeWidth={1}
            initial={{ opacity: 0.05 }}
            animate={reduce ? undefined : { opacity: [0.05, 0.22, 0.05] }}
            transition={{ duration: 4, delay: (i % 8) * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* packets */}
        {!reduce &&
          visibleEdges
            .filter((_, i) => i % 4 === 0)
            .map(([a, b], i) => (
              <Packet key={i} from={nodes[a]} to={nodes[b]} delay={i * 0.8} />
            ))}

        {/* nodes */}
        {nodes.map((n) => {
          if (n.guard) {
            const s = guardState(n.id);
            const color = s === 0 ? "var(--ghost)" : s === 1 ? "var(--accent)" : "var(--allow)";
            return (
              <g key={n.id} filter={`url(#${glowId})`}>
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={9}
                  fill="var(--bg-2)"
                  stroke={color}
                  strokeWidth={1.5}
                  animate={reduce ? undefined : { scale: s === 1 ? [1, 1.25, 1] : 1 }}
                  transition={{ duration: 1.2, repeat: s === 1 ? Infinity : 0 }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
                {/* tiny lock glyph */}
                <rect x={n.x - 3} y={n.y - 1} width={6} height={5} rx={1} fill={color} />
                <path
                  d={`M ${n.x - 2} ${n.y - 1} v-1.5 a2 2 0 0 1 4 0 V ${n.y - 1}`}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                />
              </g>
            );
          }
          return (
            <motion.circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={3.5}
              fill="var(--fx-node)"
              filter={`url(#${glowId})`}
              initial={{ opacity: 0.3 }}
              animate={reduce ? undefined : { opacity: [0.25, 1, 0.25], scale: [1, 1.4, 1] }}
              transition={{
                duration: 3,
                delay: (n.id % 7) * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
          );
        })}
      </svg>

      {/* ---- cursor-spotlight reveal (interactive grid hover) ---- */}
      {!reduce && showSpotlight && (
        <div className="absolute inset-0">
          {/* brighter grid + mesh, masked to a circle that follows the cursor */}
          <div
            className="absolute inset-0"
            style={{
              opacity: "var(--fx-on, 0)",
              transition: "opacity .4s ease",
              WebkitMaskImage:
                "radial-gradient(circle 210px at var(--fx-x, -300px) var(--fx-y, -300px), #000 0%, #000 28%, transparent 72%)",
              maskImage:
                "radial-gradient(circle 210px at var(--fx-x, -300px) var(--fx-y, -300px), #000 0%, #000 28%, transparent 72%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(var(--accent) 1.3px, transparent 1.3px)",
                backgroundSize: "30px 30px",
                opacity: 0.35,
              }}
            />
            <svg viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
              {visibleEdges.map(([a, b], i) => (
                <line
                  key={i}
                  x1={nodes[a].x}
                  y1={nodes[a].y}
                  x2={nodes[b].x}
                  y2={nodes[b].y}
                  stroke="var(--accent)"
                  strokeWidth={1.4}
                  opacity={0.7}
                />
              ))}
              {nodes.map((n) => (
                <circle
                  key={n.id}
                  cx={n.x}
                  cy={n.y}
                  r={n.guard ? 6 : 4.5}
                  fill="var(--accent)"
                  filter={`url(#${glowId})`}
                />
              ))}
            </svg>
          </div>
          {/* soft glow under the cursor */}
          <div
            className="absolute inset-0"
            style={{
              opacity: "var(--fx-on, 0)",
              transition: "opacity .4s ease",
              background:
                "radial-gradient(circle 250px at var(--fx-x, -300px) var(--fx-y, -300px), color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
