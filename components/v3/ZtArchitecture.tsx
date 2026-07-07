"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { motion, useReducedMotion } from "framer-motion";
import {
  CloudCheck,
  Globe,
  IdentificationCard,
  Laptop,
  LockKey,
  ShieldCheck,
  type Icon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type NodeId = "user" | "mfa" | "controller" | "identity" | "gateway" | "apps";

const nodes: Record<NodeId, { x: number; y: number; label: string; Icon: Icon }> = {
  user: { x: 150, y: 320, label: "User + Device", Icon: Laptop },
  mfa: { x: 250, y: 120, label: "Multi-Factor Auth", Icon: LockKey },
  controller: { x: 600, y: 120, label: "Controller", Icon: CloudCheck },
  identity: { x: 880, y: 120, label: "Identity System", Icon: IdentificationCard },
  gateway: { x: 600, y: 320, label: "Zero Trust Gateway", Icon: ShieldCheck },
  apps: { x: 1060, y: 220, label: "Applications", Icon: Globe },
};

type Conn = { from: NodeId; to: NodeId; stage: number; label: string; secure?: boolean; curve?: boolean };
const conns: Conn[] = [
  { from: "user", to: "mfa", stage: 0, label: "Device / user authentication" },
  { from: "mfa", to: "controller", stage: 0, label: "" },
  { from: "controller", to: "identity", stage: 0, label: "Identity provider" },
  { from: "controller", to: "gateway", stage: 1, label: "Gateway communication" },
  { from: "user", to: "gateway", stage: 2, label: "Controller communication", curve: true },
  { from: "gateway", to: "apps", stage: 2, label: "Secure access", secure: true },
];

const stages = [
  { id: 0, label: "Authenticate", nodes: ["user", "mfa", "controller", "identity"] as NodeId[] },
  { id: 1, label: "Broker session", nodes: ["controller", "gateway"] as NodeId[] },
  { id: 2, label: "Secure access", nodes: ["user", "gateway", "apps"] as NodeId[] },
];

function path(c: Conn) {
  const a = nodes[c.from];
  const b = nodes[c.to];
  if (c.curve) {
    return `M ${a.x} ${a.y} C ${a.x} ${(a.y + b.y) / 2 + 60}, ${b.x - 160} ${b.y}, ${b.x} ${b.y}`;
  }
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}

export function ZtArchitecture() {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [stage, setStage] = useState(0);
  const [hover, setHover] = useState<NodeId | null>(null);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setStage((s) => (s + 1) % stages.length), 2600);
    return () => clearInterval(id);
  }, [reduce, inView]);

  const activeNodes = new Set(stages[stage].nodes);

  return (
    <section id="how" className="section relative mx-auto max-w-7xl px-5 lg:px-8">
      <div className="mb-12 text-center">
        <AnimatedText
          text="Every request is checked before it connects."
          highlight={["before", "connects."]}
          className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        />
        <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--text-secondary)]">
          Authenticate the user and device, broker through the controller, then open a tunnel to one
          app via the Zero Trust gateway. The server never faces the open internet.
        </p>
      </div>

      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] p-3 shadow-[var(--shadow-card)] sm:p-6"
      >
        <svg viewBox="0 0 1180 440" className="w-full" style={{ minHeight: 280 }}>
          <defs>
            <filter id="zt-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* zone panels */}
          <rect x={40} y={40} width={330} height={360} rx={18} fill="var(--surface-faint)" stroke="var(--border-card)" />
          <text x={60} y={70} fontSize="12" fontWeight="600" fill="var(--text-secondary)">Protected users</text>
          <rect x={980} y={40} width={160} height={360} rx={18} fill="var(--surface-faint)" stroke="var(--border-card)" />
          <text x={1000} y={70} fontSize="12" fontWeight="600" fill="var(--text-secondary)">Applications</text>

          {/* connections */}
          {conns.map((c, i) => {
            const d = path(c);
            const on = c.stage === stage;
            const color = c.secure ? "#22C55E" : "var(--accent-blue)";
            return (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  stroke={on ? color : "var(--border-card)"}
                  strokeWidth={1.6}
                  strokeDasharray={c.secure ? undefined : "6 6"}
                  opacity={on ? 1 : 0.5}
                  style={{ transition: "stroke 0.4s, opacity 0.4s" }}
                />
                {on && !reduce && (
                  <motion.circle
                    r={4}
                    fill={color}
                    filter="url(#zt-glow)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ offsetPath: `path("${d}")` }}
                  />
                )}
                {on && c.label && (
                  <text
                    x={(nodes[c.from].x + nodes[c.to].x) / 2}
                    y={(nodes[c.from].y + nodes[c.to].y) / 2 - 8}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill={color}
                  >
                    {c.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* nodes */}
          {(Object.keys(nodes) as NodeId[]).map((id) => {
            const n = nodes[id];
            const on = activeNodes.has(id);
            const hovered = hover === id;
            return (
              <g
                key={id}
                onMouseEnter={() => setHover(id)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                {on && !reduce && (
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={30}
                    fill="none"
                    stroke="var(--accent-blue)"
                    animate={{ r: [30, 46], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={30}
                  fill="var(--bg-elevated)"
                  stroke={on ? "var(--accent-blue)" : "var(--border-card)"}
                  strokeWidth={on ? 2 : 1.5}
                  style={{ transition: "stroke 0.4s", opacity: on || hovered ? 1 : 0.55 }}
                />
                <n.Icon
                  x={n.x - 13}
                  y={n.y - 13}
                  width={26}
                  height={26}
                  weight="duotone"
                  color={on ? "var(--accent-blue-light)" : "var(--text-muted)"}
                />
                <text
                  x={n.x}
                  y={n.y + 48}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={on ? 700 : 500}
                  fill={on ? "var(--text-primary)" : "var(--text-secondary)"}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* stage stepper */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {stages.map((s) => (
          <button
            key={s.id}
            onClick={() => setStage(s.id)}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors"
            style={{
              borderColor: stage === s.id ? "var(--border-accent)" : "var(--border-card)",
              background: stage === s.id ? "color-mix(in srgb, var(--accent-blue) 12%, transparent)" : "transparent",
              color: stage === s.id ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
              style={{
                background: stage === s.id ? "var(--accent-blue)" : "var(--surface-faint)",
                color: stage === s.id ? "#fff" : "var(--text-muted)",
              }}
            >
              {s.id + 1}
            </span>
            {s.label}
          </button>
        ))}
      </div>
    </section>
  );
}
