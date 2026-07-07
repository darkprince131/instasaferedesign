"use client";

import { motion } from "framer-motion";
import {
  Database,
  Desktop,
  GlobeSimple,
  Laptop,
  Terminal,
  UserCircle,
  type Icon,
} from "@phosphor-icons/react";

const nodes: {
  id: string;
  x: number;
  y: number;
  label: string;
  Icon?: Icon;
  isCore?: boolean;
}[] = [
  { id: "user1", x: 80, y: 120, label: "Remote User", Icon: Laptop },
  { id: "user2", x: 80, y: 260, label: "Mobile", Icon: UserCircle },
  { id: "user3", x: 80, y: 400, label: "Contractor", Icon: UserCircle },
  { id: "core", x: 300, y: 260, label: "InstaSafe ZTNA", isCore: true },
  { id: "app1", x: 520, y: 120, label: "Web App", Icon: GlobeSimple },
  { id: "app2", x: 520, y: 220, label: "SSH Server", Icon: Terminal },
  { id: "app3", x: 520, y: 320, label: "Database", Icon: Database },
  { id: "app4", x: 520, y: 420, label: "RDP Desktop", Icon: Desktop },
];

const connections = [
  { from: "user1", to: "core", color: "#3B82F6" },
  { from: "user2", to: "core", color: "#8B5CF6" },
  { from: "user3", to: "core", color: "#14B8A6" },
  { from: "core", to: "app1", color: "#3B82F6" },
  { from: "core", to: "app2", color: "#22C55E" },
  { from: "core", to: "app3", color: "#F97316" },
  { from: "core", to: "app4", color: "#8B5CF6" },
];

type Node = (typeof nodes)[number];

function getPath(from: Node, to: Node) {
  const mx = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`;
}

export function NetworkDiagram() {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox="0 0 620 540" className="mx-auto w-full max-w-2xl">
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="0.8" fill="var(--dot-color)" />
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="620" height="540" fill="url(#grid)" />

      {connections.map((c, i) => {
        const from = nodeMap[c.from];
        const to = nodeMap[c.to];
        const d = getPath(from, to);
        return (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke={c.color}
              strokeOpacity={0.15}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <motion.path
              d={d}
              fill="none"
              stroke={c.color}
              strokeWidth={1.5}
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
            />
            <motion.circle
              r={3}
              fill={c.color}
              filter="url(#glow)"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: 2,
                delay: i * 0.15 + 1.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
              style={{ offsetPath: `path("${d}")` }}
            />
          </g>
        );
      })}

      {nodes.map((node, i) => (
        <motion.g
          key={node.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.4, type: "spring" }}
        >
          {node.isCore ? (
            <>
              {[0, 1, 2].map((ring) => (
                <motion.circle
                  key={ring}
                  cx={node.x}
                  cy={node.y}
                  r={40}
                  fill="none"
                  stroke="#3B82F6"
                  strokeOpacity={0.2}
                  animate={{ r: [40, 70], opacity: [0.3, 0] }}
                  transition={{ duration: 2.5, delay: ring * 0.8, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
              <circle cx={node.x} cy={node.y} r={38} fill="var(--bg-card)" stroke="#3B82F6" strokeWidth={1.5} />
              <circle cx={node.x} cy={node.y} r={32} fill="rgba(59,130,246,0.1)" />
              <text x={node.x} y={node.y - 4} textAnchor="middle" fill="#60A5FA" fontSize="11" fontWeight="700">
                ZTNA
              </text>
              <text x={node.x} y={node.y + 10} textAnchor="middle" fill="var(--text-secondary)" fontSize="7">
                InstaSafe
              </text>
            </>
          ) : (
            <motion.g
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={22}
                fill="var(--bg-card)"
                stroke="var(--border-card)"
                strokeWidth={1}
              />
              {node.Icon && (
                <node.Icon
                  x={node.x - 10}
                  y={node.y - 10}
                  width={20}
                  height={20}
                  weight="duotone"
                  color="#60A5FA"
                />
              )}
            </motion.g>
          )}
          <text x={node.x} y={node.y + (node.isCore ? 52 : 38)} textAnchor="middle" fill="var(--text-secondary)" fontSize="9">
            {node.label}
          </text>
        </motion.g>
      ))}

      {["MFA ✓", "Device ✓", "Policy ✓"].map((label, i) => (
        <motion.g
          key={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 + i * 0.2 }}
        >
          <rect
            x={145}
            y={100 + i * 140}
            width={58}
            height={18}
            rx={9}
            fill="rgba(34,197,94,0.1)"
            stroke="rgba(34,197,94,0.3)"
          />
          <text x={174} y={112 + i * 140} textAnchor="middle" fill="#22C55E" fontSize="8" fontWeight="600">
            {label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
