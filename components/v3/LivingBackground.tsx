"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Ambient cybersecurity scene rendered behind the whole page.
 * A mesh of nodes pulses in waves, data packets travel along edges, and a few
 * "guard" nodes cycle locked → unlocked → secured. Deterministic positions so
 * SSR and client markup match (no hydration drift).
 */

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
      fill="#60A5FA"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{ cx: to.x, cy: to.y, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.4, delay, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
    />
  );
}

export function LivingBackground() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  // Slow wave that re-lights guard nodes through their lock cycle.
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTick((n) => n + 1), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  const guardState = (id: number) => {
    // 0 locked, 1 scanning, 2 secured — cycles per guard, offset by id
    return (tick + id) % 3;
  };

  // Cursor spotlight that reveals a brighter grid + mesh near the pointer.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let x = -300;
    let y = -300;
    const apply = () => {
      raf = 0;
      const el = rootRef.current;
      if (el) {
        el.style.setProperty("--lb-x", `${x}px`);
        el.style.setProperty("--lb-y", `${y}px`);
      }
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      rootRef.current?.style.setProperty("--lb-on", "1");
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => rootRef.current?.style.setProperty("--lb-on", "0");
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* deep gradient wash */}
      <div
        className="lb-wash absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(ellipse 80% 50% at 80% 110%, rgba(139,92,246,0.08), transparent 60%)",
        }}
      />
      <svg
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMid slice"
        className="lb-mesh absolute inset-0 h-full w-full opacity-[0.55]"
      >
        <defs>
          <filter id="lbglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="#3B82F6"
            strokeWidth={1}
            initial={{ opacity: 0.05 }}
            animate={reduce ? undefined : { opacity: [0.05, 0.22, 0.05] }}
            transition={{ duration: 4, delay: (i % 8) * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* packets */}
        {!reduce &&
          edges
            .filter((_, i) => i % 4 === 0)
            .map(([a, b], i) => (
              <Packet key={i} from={nodes[a]} to={nodes[b]} delay={i * 0.8} />
            ))}

        {/* nodes */}
        {nodes.map((n) => {
          if (n.guard) {
            const s = guardState(n.id);
            const color = s === 0 ? "#475569" : s === 1 ? "#F97316" : "#22C55E";
            return (
              <g key={n.id} filter="url(#lbglow)">
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={9}
                  fill="#0C1526"
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
              fill="#60A5FA"
              filter="url(#lbglow)"
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

      {/* ---- cursor-spotlight reveal (interactive grid hover) — dark mode only ---- */}
      {!reduce && (
        <div className="lb-spotlight absolute inset-0">
          {/* brighter grid + mesh, masked to a circle that follows the cursor */}
          <div
            className="absolute inset-0"
            style={{
              opacity: "var(--lb-on, 0)",
              transition: "opacity .4s ease",
              WebkitMaskImage:
                "radial-gradient(circle 210px at var(--lb-x, -300px) var(--lb-y, -300px), #000 0%, #000 28%, transparent 72%)",
              maskImage:
                "radial-gradient(circle 210px at var(--lb-x, -300px) var(--lb-y, -300px), #000 0%, #000 28%, transparent 72%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(var(--accent-blue-light) 1.3px, transparent 1.3px)",
                backgroundSize: "30px 30px",
                opacity: 0.45,
              }}
            />
            <svg viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
              {edges.map(([a, b], i) => (
                <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#60A5FA" strokeWidth={1.4} opacity={0.7} />
              ))}
              {nodes.map((n) => (
                <circle key={n.id} cx={n.x} cy={n.y} r={n.guard ? 6 : 4.5} fill="#93c5fd" filter="url(#lbglow)" />
              ))}
            </svg>
          </div>
          {/* soft glow under the cursor */}
          <div
            className="absolute inset-0"
            style={{
              opacity: "var(--lb-on, 0)",
              transition: "opacity .4s ease",
              background:
                "radial-gradient(circle 250px at var(--lb-x, -300px) var(--lb-y, -300px), rgba(96,165,250,0.12), transparent 70%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
