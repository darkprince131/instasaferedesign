"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ---------- Sparkline ---------- */
export function Sparkline({
  data,
  color = "var(--db-accent)",
  width = 90,
  height = 28,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  });
  return (
    <svg width={width} height={height} className="overflow-visible">
      <motion.polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ---------- Area chart ---------- */
export function AreaChart({ data, height = 150 }: { data: number[]; height?: number }) {
  const w = 520;
  const max = Math.max(...data);
  const stepX = w / (data.length - 1);
  const y = (v: number) => height - (v / max) * (height - 16) - 8;
  const line = data.map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${y(v)}`).join(" ");
  const area = `${line} L ${w} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id="db-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--db-accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--db-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#db-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--db-accent)"
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ---------- Horizontal bars ---------- */
export function Bars({ data }: { data: { name: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="space-y-2.5">
      {data.map((d, i) => (
        <div key={d.name} className="text-[11px]">
          <div className="mb-1 flex justify-between">
            <span style={{ color: "var(--db-text-dim)" }}>{d.name}</span>
            <span className="font-mono" style={{ color: "var(--db-text)" }}>{d.count}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--db-surface-2)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--db-accent), var(--db-accent-2))" }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(d.count / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Donut ---------- */
export function Donut({
  data,
  size = 160,
  thickness = 18,
  center,
  centerSub,
}: {
  data: { name: string; count: number; color: string }[];
  size?: number;
  thickness?: number;
  center?: string;
  centerSub?: string;
}) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });
  const total = data.reduce((s, d) => s + d.count, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--db-surface-2)" strokeWidth={thickness} />
        {data.map((d) => {
          const frac = d.count / total;
          const dash = frac * c;
          const seg = (
            <motion.circle
              key={d.name}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeLinecap="butt"
              strokeDashoffset={-offset}
              initial={{ strokeDasharray: reduce ? `${dash} ${c - dash}` : `0 ${c}`, opacity: reduce ? 1 : 0 }}
              animate={inView ? { strokeDasharray: `${dash} ${c - dash}`, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          );
          offset += dash;
          return seg;
        })}
      </svg>
      {center && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: "var(--db-text)" }}>{center}</span>
          {centerSub && (
            <span className="text-[10px]" style={{ color: "var(--db-text-mute)" }}>{centerSub}</span>
          )}
        </div>
      )}
    </div>
  );
}
