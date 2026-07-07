"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ConsoleFrame } from "./ConsoleFrame";

// Abstract dark map with three geofence zones; a user dot crosses a boundary.
const zones = [
  { name: "Bengaluru HQ", cx: 150, cy: 150, r: 70, radius: "3 km" },
  { name: "Bhubaneswar", cx: 380, cy: 110, r: 30, radius: "100 m" },
  { name: "PGCIL Site", cx: 320, cy: 250, r: 50, radius: "10 km" },
];

export function GeofenceMap({ standalone = false }: { standalone?: boolean }) {
  const reduce = useReducedMotion();
  const [inside, setInside] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setInside((v) => !v), 3000);
    return () => clearInterval(id);
  }, [reduce]);

  const content = (
    <div className="grid items-center gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative overflow-hidden rounded-xl" style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}>
        <svg viewBox="0 0 480 320" className="w-full">
          {/* grid */}
          <defs>
            <pattern id="gf-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="var(--db-border)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="480" height="320" fill="url(#gf-grid)" />

          {zones.map((z) => (
            <g key={z.name}>
              <motion.circle
                cx={z.cx}
                cy={z.cy}
                r={z.r}
                fill="color-mix(in srgb, var(--db-accent) 10%, transparent)"
                stroke="var(--db-accent)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                animate={reduce ? undefined : { r: [z.r, z.r + 4, z.r] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <MapPin x={z.cx - 7} y={z.cy - 18} size={14} weight="fill" color="var(--db-accent)" />
              <text x={z.cx} y={z.cy + z.r + 14} textAnchor="middle" fontSize="9" fill="var(--db-text-dim)">
                {z.name} · {z.radius}
              </text>
            </g>
          ))}

          {/* user dot crossing Bengaluru boundary */}
          <motion.circle
            r={6}
            fill={inside ? "var(--db-success)" : "var(--db-danger)"}
            animate={reduce ? { cx: 150, cy: 150 } : { cx: inside ? 150 : 40, cy: 150 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 6px currentColor)" }}
          />
        </svg>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-semibold" style={{ color: "var(--db-text)" }}>Geofencing</div>
        <p className="mb-4 text-[11px] leading-relaxed" style={{ color: "var(--db-text-dim)" }}>
          Bind access to physical zones. Step outside the boundary and the session drops.
        </p>
        <motion.div
          key={inside ? "in" : "out"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold"
          style={{
            background: inside ? "color-mix(in srgb, var(--db-success) 14%, transparent)" : "color-mix(in srgb, var(--db-danger) 14%, transparent)",
            color: inside ? "var(--db-success)" : "var(--db-danger)",
          }}
        >
          {inside ? "Inside zone · access granted" : "Outside zone · access denied"}
        </motion.div>
      </div>
    </div>
  );

  if (standalone) return content;
  return <ConsoleFrame title="Geofences" active={6}>{content}</ConsoleFrame>;
}
