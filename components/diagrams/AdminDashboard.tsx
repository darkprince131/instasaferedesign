"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ACTIVITY = [
  { user: "user.01", app: "Database", status: "allowed", time: "just now", device: "✓" },
  { user: "user.02", app: "SSH: server-a", status: "allowed", time: "2m ago", device: "✓" },
  { user: "unknown-device", app: "RDP: host-b", status: "denied", time: "3m ago", device: "✗" },
  { user: "user.03", app: "Web app", status: "allowed", time: "5m ago", device: "✓" },
  { user: "External IP", app: "FileShare", status: "denied", time: "6m ago", device: "✗" },
];

export function AdminDashboard() {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  useEffect(() => {
    const t = setInterval(
      () => setActiveRow(Math.floor(Math.random() * ACTIVITY.length)),
      2000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div
      data-theme="dark"
      className="glass w-full max-w-lg overflow-hidden rounded-2xl font-mono text-xs text-white"
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/60" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <div className="h-3 w-3 rounded-full bg-green-500/60" />
        <span className="ml-3 text-[10px] text-white/30">InstaSafe ZTNA — Access Logs</span>
        <div className="ml-auto flex items-center gap-1.5">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[9px] text-green-400/70">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-3 border-b border-white/5">
        {[
          ["142", "Active Users"],
          ["18", "Gateways Online"],
          ["0", "Threats"],
        ].map(([val, label]) => (
          <div key={label} className="border-r border-white/5 px-4 py-2.5 last:border-0">
            <div className="text-base font-bold text-white">{val}</div>
            <div className="text-[9px] text-white/30">{label}</div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-white/[0.04]">
        {ACTIVITY.map((row, i) => (
          <motion.div
            key={i}
            className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
              activeRow === i ? "bg-blue-500/5" : ""
            }`}
            animate={activeRow === i ? { backgroundColor: "color-mix(in srgb, var(--db-accent) 6%, transparent)" } : {}}
          >
            <span className="w-4 text-white/50">{row.device}</span>
            <span className="flex-1 truncate text-white/70">{row.user}</span>
            <span className="flex-1 truncate text-blue-400/80">{row.app}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                row.status === "allowed"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {row.status.toUpperCase()}
            </span>
            <span className="w-10 text-right text-white/25">{row.time}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-white/5 bg-white/[0.01] px-4 py-3">
        <span className="text-[9px] text-white/30">Device Checks:</span>
        {["AV ✓", "Firewall ✓", "OS ✓", "Domain ✓"].map((check) => (
          <span
            key={check}
            className="rounded bg-green-500/10 px-2 py-0.5 text-[9px] text-green-400/80"
          >
            {check}
          </span>
        ))}
      </div>
    </div>
  );
}
