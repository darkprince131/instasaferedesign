"use client";

import { DEVICE_CHECKS } from "@/lib/console-data";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, Circle, Laptop, ShieldCheck } from "@phosphor-icons/react";
import { useInView } from "react-intersection-observer";
import { ConsoleFrame } from "./ConsoleFrame";

export function DeviceCheckBuilder({ standalone = false }: { standalone?: boolean }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });
  const step = 0.28;

  const content = (
    <div ref={ref} className="grid items-center gap-5 lg:grid-cols-[1.2fr_1fr]">
      {/* checks list */}
      <div className="space-y-1.5">
        <div className="mb-2 text-[11px] font-semibold" style={{ color: "var(--db-text)" }}>
          Posture check · workstation-02
        </div>
        {DEVICE_CHECKS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * step }}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11px]"
            style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: i * step + 0.15, type: "spring", stiffness: 400, damping: 18 }}
            >
              <CheckCircle weight="fill" size={16} color="var(--db-success)" />
            </motion.span>
            <span style={{ color: "var(--db-text)" }}>{c.name}</span>
            <Circle size={6} weight="fill" className="ml-auto" color="var(--db-text-mute)" />
          </motion.div>
        ))}
      </div>

      {/* scanning device */}
      <div className="flex flex-col items-center justify-center">
        <div
          className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-3xl"
          style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}
        >
          <Laptop size={72} weight="duotone" color="var(--db-accent)" />
          {!reduce && (
            <motion.div
              className="absolute inset-x-0 h-10"
              style={{ background: "linear-gradient(180deg, transparent, color-mix(in srgb, var(--db-accent) 30%, transparent), transparent)" }}
              animate={{ y: [-60, 180, -60] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: DEVICE_CHECKS.length * step + 0.3, type: "spring", stiffness: 240, damping: 16 }}
          className="mt-4 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold"
          style={{ background: "color-mix(in srgb, var(--db-success) 14%, transparent)", color: "var(--db-success)" }}
        >
          <ShieldCheck weight="fill" size={16} />
          Device compliant · access granted
        </motion.div>
      </div>
    </div>
  );

  if (standalone) return content;
  return <ConsoleFrame title="Device Checks" active={6}>{content}</ConsoleFrame>;
}
