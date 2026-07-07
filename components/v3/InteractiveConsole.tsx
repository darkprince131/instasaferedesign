"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CaretDown,
  CheckCircle,
  Desktop,
  Database,
  DeviceMobile,
  Laptop,
  ListChecks,
  Pulse,
  ShieldCheck,
  Terminal,
  UsersThree,
  XCircle,
  type Icon,
} from "@phosphor-icons/react";
import { useState } from "react";

type Tab = "logs" | "devices" | "policies" | "users";

const tabs: { id: Tab; label: string; Icon: Icon }[] = [
  { id: "logs", label: "Access Logs", Icon: Pulse },
  { id: "devices", label: "Device Trust", Icon: ShieldCheck },
  { id: "policies", label: "Policies", Icon: ListChecks },
  { id: "users", label: "Live Users", Icon: UsersThree },
];

// ---- simulated data ----
const LOGS = [
  { user: "user.01", app: "Database", type: "DB", status: "allowed", time: "now", AppIcon: Database },
  { user: "user.02", app: "server-a", type: "SSH", status: "allowed", time: "2m", AppIcon: Terminal },
  { user: "unknown-device", app: "host-b", type: "RDP", status: "denied", time: "3m", AppIcon: Desktop },
  { user: "user.03", app: "Web app", type: "WEB", status: "allowed", time: "5m", AppIcon: Laptop },
  { user: "external-ip", app: "File share", type: "WFS", status: "denied", time: "6m", AppIcon: Database },
  { user: "user.04", app: "server-c", type: "SSH", status: "allowed", time: "8m", AppIcon: Terminal },
];

const CHECKS = [
  "Antivirus active", "Firewall on", "Disk encrypted", "OS patched",
  "MDM enrolled", "Screen lock", "No jailbreak", "Domain joined",
];

const POLICIES_INIT = [
  { name: "Require MFA for DB access", on: true },
  { name: "Block RDP from unmanaged devices", on: true },
  { name: "Record all SSH sessions", on: true },
  { name: "Geofence to India + US", on: false },
  { name: "Auto-suspend after 30d idle", on: false },
];

const USERS_INIT = [
  { name: "user.01", role: "DB Admin", device: Laptop, since: "2h 14m" },
  { name: "user.02", role: "DevOps", device: Laptop, since: "47m" },
  { name: "user.03", role: "Sales", device: DeviceMobile, since: "12m" },
  { name: "user.04", role: "SRE", device: Laptop, since: "5m" },
];

// status pill colors via --db tokens (flip with theme)
const okStyle = {
  background: "color-mix(in srgb, var(--db-success) 14%, transparent)",
  color: "var(--db-success)",
};
const denyStyle = {
  background: "color-mix(in srgb, var(--db-danger) 14%, transparent)",
  color: "var(--db-danger)",
};

function Dropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-[var(--db-border)] bg-[var(--db-surface)] px-3 py-1.5 text-xs font-medium text-[var(--db-text-dim)] transition-colors hover:border-[var(--db-text-mute)] hover:text-[var(--db-text)]"
      >
        {value}
        <CaretDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-20 mt-1.5 w-40 overflow-hidden rounded-xl border border-[var(--db-border)] bg-[var(--db-surface-2)] p-1 shadow-2xl"
          >
            {options.map((o) => (
              <li key={o}>
                <button
                  onClick={() => {
                    onChange(o);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-[var(--db-surface)]"
                  style={{ color: o === value ? "var(--db-accent)" : "var(--db-text-dim)" }}
                >
                  {o}
                  {o === value && <CheckCircle weight="fill" className="h-3.5 w-3.5" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function InteractiveConsole() {
  const [tab, setTab] = useState<Tab>("logs");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [typeFilter, setTypeFilter] = useState("All apps");
  const [policies, setPolicies] = useState(POLICIES_INIT);
  const [users, setUsers] = useState(USERS_INIT);

  const filteredLogs = LOGS.filter((l) => {
    const s = statusFilter === "All status" || l.status === statusFilter.toLowerCase();
    const t = typeFilter === "All apps" || l.type === typeFilter;
    return s && t;
  });

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-[var(--db-border)] text-xs"
      style={{ background: "var(--db-bg)", color: "var(--db-text)", boxShadow: "var(--db-shadow)" }}
    >
      {/* window chrome */}
      <div
        className="flex items-center gap-2 border-b border-[var(--db-border)] px-4 py-3"
        style={{ background: "var(--db-sidebar)" }}
      >
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-[10px] text-[var(--db-text-mute)]">InstaSafe console</span>
        <span className="ml-auto flex items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--db-success)" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[9px]" style={{ color: "var(--db-success)" }}>LIVE</span>
        </span>
      </div>

      {/* sub-nav tabs */}
      <div className="flex border-b border-[var(--db-border)]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="relative flex flex-1 items-center justify-center gap-1.5 px-2 py-3 text-[11px] font-medium transition-colors"
            style={{ color: tab === t.id ? "var(--db-text)" : "var(--db-text-dim)" }}
          >
            <t.Icon size={14} weight={tab === t.id ? "fill" : "regular"} />
            <span className="hidden sm:inline">{t.label}</span>
            {tab === t.id && (
              <motion.span
                layoutId="console-tab"
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full"
                style={{ background: "var(--db-accent)" }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[280px] p-4">
        <AnimatePresence mode="wait">
          {/* ---- ACCESS LOGS ---- */}
          {tab === "logs" && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--db-text-mute)]">
                  {filteredLogs.length} sessions
                </span>
                <div className="flex gap-2">
                  <Dropdown value={typeFilter} options={["All apps", "WEB", "SSH", "RDP", "DB", "WFS"]} onChange={setTypeFilter} />
                  <Dropdown value={statusFilter} options={["All status", "Allowed", "Denied"]} onChange={setStatusFilter} />
                </div>
              </div>
              <div className="divide-y divide-[var(--db-border)]">
                <AnimatePresence mode="popLayout">
                  {filteredLogs.map((row) => (
                    <motion.div
                      layout
                      key={row.user + row.app}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center gap-3 py-2.5"
                    >
                      <row.AppIcon size={16} weight="duotone" className="text-[var(--db-text-mute)]" />
                      <span className="flex-1 truncate text-[var(--db-text-dim)]">{row.user}</span>
                      <span className="hidden flex-1 truncate sm:block" style={{ color: "var(--db-accent)" }}>
                        {row.app}
                      </span>
                      <span className="rounded px-1.5 py-0.5 font-mono text-[9px] text-[var(--db-text-mute)]" style={{ background: "var(--db-surface-2)" }}>
                        {row.type}
                      </span>
                      <span
                        className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold"
                        style={row.status === "allowed" ? okStyle : denyStyle}
                      >
                        {row.status === "allowed" ? (
                          <CheckCircle weight="fill" className="h-3 w-3" />
                        ) : (
                          <XCircle weight="fill" className="h-3 w-3" />
                        )}
                        {row.status}
                      </span>
                      <span className="w-8 text-right text-[var(--db-text-mute)]">{row.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {filteredLogs.length === 0 && (
                  <div className="py-10 text-center text-[var(--db-text-mute)]">No sessions match.</div>
                )}
              </div>
            </motion.div>
          )}

          {/* ---- DEVICE TRUST ---- */}
          {tab === "devices" && (
            <motion.div
              key="devices"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--db-text-mute)]">
                Posture check · workstation-02
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CHECKS.map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{
                      background: "color-mix(in srgb, var(--db-success) 8%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--db-success) 22%, transparent)",
                    }}
                  >
                    <CheckCircle weight="fill" className="h-4 w-4 shrink-0" style={{ color: "var(--db-success)" }} />
                    <span className="text-[var(--db-text-dim)]">{c}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-3 flex items-center justify-center gap-2 rounded-lg py-2.5"
                style={{ background: "color-mix(in srgb, var(--db-success) 12%, transparent)", color: "var(--db-success)" }}
              >
                <ShieldCheck weight="fill" className="h-4 w-4" />
                <span className="font-semibold">Device trusted · access granted</span>
              </motion.div>
            </motion.div>
          )}

          {/* ---- POLICIES ---- */}
          {tab === "policies" && (
            <motion.div
              key="policies"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[var(--db-text-mute)]">
                Tap to toggle a rule
              </div>
              {policies.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPolicies((prev) => prev.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
                  className="flex w-full items-center justify-between rounded-lg border border-[var(--db-border)] px-3 py-2.5 text-left transition-colors hover:border-[var(--db-text-mute)]"
                  style={{ background: "var(--db-surface)" }}
                >
                  <span className="text-[var(--db-text-dim)]">{p.name}</span>
                  <span
                    className="relative h-5 w-9 shrink-0 rounded-full transition-colors"
                    style={{ background: p.on ? "var(--db-accent)" : "var(--db-border)" }}
                  >
                    <motion.span
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow"
                      style={{ left: p.on ? 18 : 2 }}
                    />
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {/* ---- LIVE USERS ---- */}
          {tab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--db-text-mute)]">
                  {users.length} connected
                </span>
              </div>
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {users.map((u, i) => (
                    <motion.div
                      layout
                      key={u.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 rounded-lg border border-[var(--db-border)] px-3 py-2.5"
                      style={{ background: "var(--db-surface)" }}
                    >
                      <u.device size={18} weight="duotone" style={{ color: "var(--db-accent)" }} />
                      <div className="flex-1">
                        <div className="text-[var(--db-text)]">{u.name}</div>
                        <div className="text-[10px] text-[var(--db-text-mute)]">{u.role} · {u.since}</div>
                      </div>
                      <button
                        onClick={() => setUsers((prev) => prev.filter((_, j) => j !== i))}
                        className="rounded-md px-2.5 py-1 text-[10px] font-semibold transition-colors"
                        style={denyStyle}
                      >
                        Disconnect
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {users.length === 0 && (
                  <button
                    onClick={() => setUsers(USERS_INIT)}
                    className="w-full rounded-lg border border-[var(--db-border)] py-8 text-[var(--db-text-mute)] transition-colors hover:text-[var(--db-text-dim)]"
                  >
                    All disconnected · click to reset
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
