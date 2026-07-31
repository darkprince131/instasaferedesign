"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChartLine, Fingerprint, LockKeyOpen, type Icon } from "@phosphor-icons/react";

/* Stage colours run accent → success → accent-2 off the console tokens, so
   the diagram follows the active brand instead of the old blue/purple pair. */
const steps: { x: number; label: string; color: string; Icon: Icon }[] = [
  { x: 90, label: "Authenticate", color: "var(--db-accent)", Icon: Fingerprint },
  { x: 300, label: "Access", color: "var(--db-success)", Icon: LockKeyOpen },
  { x: 510, label: "Monitor", color: "var(--db-accent-2)", Icon: ChartLine },
];

export function ZTFlowDiagram() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <svg ref={ref} viewBox="0 0 600 200" className="mx-auto w-full max-w-3xl">
      <defs>
        <filter id="ztglow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {steps.slice(0, -1).map((s, i) => {
        const next = steps[i + 1];
        const d = `M ${s.x + 40} 100 L ${next.x - 40} 100`;
        return (
          <g key={i}>
            <line
              x1={s.x + 40}
              y1={100}
              x2={next.x - 40}
              y2={100}
              stroke="var(--db-border)"
              strokeWidth={2}
            />
            <motion.path
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              filter="url(#ztglow)"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.6, ease: "easeInOut" }}
            />
            <motion.circle
              r={4}
              fill={s.color}
              filter="url(#ztglow)"
              initial={{ offsetDistance: "0%" }}
              animate={inView ? { offsetDistance: "100%" } : {}}
              transition={{
                duration: 1.6,
                delay: 1.2 + i * 0.6,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{ offsetPath: `path("${d}")` }}
            />
          </g>
        );
      })}

      {steps.map((s, i) => (
        <motion.g
          key={s.label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.6, duration: 0.45, type: "spring" }}
        >
          <circle cx={s.x} cy={100} r={36} fill="var(--db-surface)" stroke={s.color} strokeWidth={1.5} />
          {/* was `${s.color}1a` — appending a hex alpha to a var() is invalid CSS */}
          <circle cx={s.x} cy={100} r={30} fill={`color-mix(in srgb, ${s.color} 10%, transparent)`} />
          <s.Icon x={s.x - 13} y={87} width={26} height={26} weight="duotone" color={s.color} />
          <text
            x={s.x}
            y={164}
            textAnchor="middle"
            fill="var(--db-text)"
            fontSize="14"
            fontWeight="700"
          >
            {s.label}
          </text>
          <text x={s.x} y={48} textAnchor="middle" fill={s.color} fontSize="11" fontWeight="600">
            Step {i + 1}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
