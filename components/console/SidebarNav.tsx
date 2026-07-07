"use client";

import { LogoMark } from "@/components/brand/Logo";
import { motion } from "framer-motion";
import {
  ChartPieSlice,
  Cpu,
  Fingerprint,
  Gauge,
  GearSix,
  ShareNetwork,
  ListChecks,
  FileText,
  ShieldCheck,
  SignOut,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";

const items: { Icon: Icon; label: string }[] = [
  { Icon: Gauge, label: "Dashboard" },
  { Icon: ChartPieSlice, label: "Asset Inventory" },
  { Icon: ShareNetwork, label: "Graph" },
  { Icon: Cpu, label: "Controllers" },
  { Icon: Fingerprint, label: "Authentication" },
  { Icon: UsersThree, label: "Users & Groups" },
  { Icon: ShieldCheck, label: "Devices & Checks" },
  { Icon: ListChecks, label: "Access Rules" },
  { Icon: FileText, label: "Logs & Reports" },
  { Icon: GearSix, label: "IDAM" },
];

export function SidebarNav({ active = 0, compact = false }: { active?: number; compact?: boolean }) {
  return (
    <aside
      className="flex shrink-0 flex-col py-3"
      style={{
        width: compact ? 56 : 188,
        background: "var(--db-sidebar)",
        borderRight: "1px solid var(--db-border)",
        color: "var(--db-text)",
      }}
    >
      <div className="flex items-center gap-2 px-3 pb-3">
        <LogoMark size={24} />
        {!compact && <span className="text-sm font-bold">InstaSafe</span>}
      </div>

      <nav className="flex-1 space-y-0.5 px-2">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <div key={it.label} className="relative">
              {on && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "color-mix(in srgb, var(--db-accent) 16%, transparent)" }}
                />
              )}
              {on && (
                <span
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full"
                  style={{ background: "var(--db-accent)" }}
                />
              )}
              <div
                className="relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px]"
                style={{ color: on ? "var(--db-text)" : "var(--db-text-dim)" }}
              >
                <it.Icon
                  size={16}
                  weight={on ? "fill" : "regular"}
                  color={on ? "var(--db-accent)" : "var(--db-text-dim)"}
                />
                {!compact && <span className={on ? "font-semibold" : ""}>{it.label}</span>}
              </div>
            </div>
          );
        })}
      </nav>

      <div
        className="mx-2 mt-2 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px]"
        style={{ color: "var(--db-text-dim)" }}
      >
        <SignOut size={16} />
        {!compact && <span>Sign out</span>}
      </div>
    </aside>
  );
}
