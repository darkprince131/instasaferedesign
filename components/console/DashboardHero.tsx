"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ACCESS_ACTIVITY, ACCESS_LOG, BLOCKED_SERVICES, KPIS } from "@/lib/console-data";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, XCircle } from "@phosphor-icons/react";
import { AreaChart, Bars, Sparkline } from "./charts";
import { ConsoleFrame } from "./ConsoleFrame";

function Kpi({
  label,
  children,
  spark,
  trend,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  spark?: number[];
  trend?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl p-3.5"
      style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}
    >
      <div className="mb-1.5 text-[10px] uppercase tracking-wider" style={{ color: "var(--db-text-mute)" }}>
        {label}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-xl font-bold" style={{ color: "var(--db-text)" }}>
          {children}
        </div>
        {spark && <Sparkline data={spark} />}
      </div>
      {trend && (
        <div className="mt-1 flex items-center gap-1 text-[10px]" style={{ color: "var(--db-success)" }}>
          <ArrowUpRight size={11} weight="bold" />
          {trend}
        </div>
      )}
    </motion.div>
  );
}

export function DashboardHero({ standalone = false }: { standalone?: boolean }) {
  const content = (
    <div className="space-y-4">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Online Gateways" spark={[2, 3, 3, 4, 4, 4]} delay={0}>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            {KPIS.onlineGateways.current}/{KPIS.onlineGateways.total}
          </span>
        </Kpi>
        <Kpi label="Online Users" spark={[800, 940, 1100, 1180, 1220, 1247]} trend="+6.2% today" delay={0.08}>
          <AnimatedCounter end={KPIS.onlineUsers.current} />
        </Kpi>
        <Kpi label="User Subscription" delay={0.16}>
          <span>
            <AnimatedCounter end={KPIS.subscription.current} />
            <span className="text-sm" style={{ color: "var(--db-text-mute)" }}>
              /{KPIS.subscription.total.toLocaleString()}
            </span>
          </span>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full" style={{ background: "var(--db-surface-2)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--db-accent)" }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(KPIS.subscription.current / KPIS.subscription.total) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </Kpi>
        <Kpi label="Renewal" delay={0.24}>
          <span className="text-base">{KPIS.renewal}</span>
        </Kpi>
      </div>

      {/* charts */}
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl p-3.5" style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold" style={{ color: "var(--db-text)" }}>Access activity · 24h</span>
            <span className="font-mono text-[10px]" style={{ color: "var(--db-text-mute)" }}>2,418 sessions</span>
          </div>
          <AreaChart data={ACCESS_ACTIVITY} height={120} />
        </div>
        <div className="rounded-xl p-3.5" style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}>
          <div className="mb-3 text-[11px] font-semibold" style={{ color: "var(--db-text)" }}>Top blocked services</div>
          <Bars data={BLOCKED_SERVICES.slice(0, 4)} />
        </div>
      </div>

      {/* live log */}
      <div className="rounded-xl" style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}>
        {ACCESS_LOG.slice(0, 4).map((row, i) => (
          <motion.div
            key={row.user + row.app}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-3 px-3.5 py-2 text-[11px]"
            style={{ borderTop: i ? "1px solid var(--db-border)" : "none" }}
          >
            <span className="flex-1" style={{ color: "var(--db-text-dim)" }}>{row.user}</span>
            <span className="flex-1 font-mono" style={{ color: "var(--db-accent)" }}>{row.app}</span>
            <span
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold"
              style={{
                background: row.status === "allowed" ? "color-mix(in srgb, var(--db-success) 14%, transparent)" : "color-mix(in srgb, var(--db-danger) 14%, transparent)",
                color: row.status === "allowed" ? "var(--db-success)" : "var(--db-danger)",
              }}
            >
              {row.status === "allowed" ? <CheckCircle weight="fill" size={11} /> : <XCircle weight="fill" size={11} />}
              {row.status}
            </span>
            <span className="w-8 text-right" style={{ color: "var(--db-text-mute)" }}>{row.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (standalone) return content;
  return <ConsoleFrame title="Dashboard" active={0}>{content}</ConsoleFrame>;
}
