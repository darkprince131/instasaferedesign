"use client";

import { DEVICES, type DeviceStatus, type OsIcon } from "@/lib/console-data";
import { motion } from "framer-motion";
import {
  AndroidLogo,
  AppleLogo,
  LinuxLogo,
  MagnifyingGlass,
  Plus,
  WindowsLogo,
  type Icon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ConsoleFrame } from "./ConsoleFrame";

const osIcons: Record<OsIcon, Icon> = {
  windows: WindowsLogo,
  apple: AppleLogo,
  android: AndroidLogo,
  linux: LinuxLogo,
};

const statusStyle: Record<DeviceStatus, { c: string }> = {
  Enabled: { c: "var(--db-success)" },
  "Pending-Approval": { c: "var(--db-warning)" },
  Suspended: { c: "var(--db-danger)" },
};

function Pill({ status }: { status: DeviceStatus }) {
  const s = statusStyle[status];
  const pending = status === "Pending-Approval";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold"
      style={{ background: `color-mix(in srgb, ${s.c} 14%, transparent)`, color: s.c }}
    >
      {pending && (
        <motion.span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: s.c }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
      {status}
    </span>
  );
}

export function DeviceTableViz({ standalone = false }: { standalone?: boolean }) {
  // One row loops Pending → Enabled to show the approval workflow.
  const [rows, setRows] = useState(DEVICES);
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((r, i) =>
          i === 1
            ? { ...r, status: r.status === "Pending-Approval" ? "Enabled" : "Pending-Approval" }
            : r
        )
      );
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const content = (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] font-semibold" style={{ color: "var(--db-text)" }}>Devices (775)</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg px-2 py-1" style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}>
            <MagnifyingGlass size={12} color="var(--db-text-mute)" />
            <span className="text-[10px]" style={{ color: "var(--db-text-mute)" }}>Search</span>
          </div>
          <span className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-semibold" style={{ background: "var(--db-accent)", color: "#fff" }}>
            <Plus size={12} weight="bold" /> Add
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--db-border)" }}>
        <div
          className="grid grid-cols-[1.5fr_1.2fr_1fr_0.9fr] px-3.5 py-2 text-[9px] font-semibold uppercase tracking-wider"
          style={{ background: "var(--db-surface-2)", color: "var(--db-text-mute)" }}
        >
          <span>Device</span>
          <span>MAC</span>
          <span>Status</span>
          <span className="text-right">Registered</span>
        </div>
        {rows.map((d, i) => {
          const OsI = osIcons[d.osIcon];
          return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ backgroundColor: "var(--db-surface-2)" }}
              className="grid grid-cols-[1.5fr_1.2fr_1fr_0.9fr] items-center px-3.5 py-2.5 text-[11px]"
              style={{ borderTop: "1px solid var(--db-border)", color: "var(--db-text)" }}
            >
              <span className="flex items-center gap-2 truncate">
                <OsI size={15} weight="fill" color="var(--db-text-dim)" />
                <span className="truncate">{d.name}</span>
              </span>
              <span className="truncate font-mono text-[10px]" style={{ color: "var(--db-text-dim)" }}>{d.mac}</span>
              <span><Pill status={d.status} /></span>
              <span className="text-right font-mono text-[10px]" style={{ color: "var(--db-text-mute)" }}>{d.registered}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px]" style={{ color: "var(--db-text-mute)" }}>
        <span>Showing 6 of 775</span>
        <span className="flex gap-1">
          {["1", "2", "3", "…", "78"].map((p) => (
            <span key={p} className="rounded px-1.5 py-0.5" style={{ background: p === "1" ? "var(--db-accent)" : "transparent", color: p === "1" ? "#fff" : "var(--db-text-mute)" }}>{p}</span>
          ))}
        </span>
      </div>
    </div>
  );

  if (standalone) return content;
  return <ConsoleFrame title="Devices" active={6}>{content}</ConsoleFrame>;
}
