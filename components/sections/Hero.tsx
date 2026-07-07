"use client";

import { NetworkDiagram } from "@/components/diagrams/NetworkDiagram";
import { Button } from "@/components/ui/Button";
import { GlowOrbs } from "@/components/ui/GlowOrbs";
import { motion } from "framer-motion";
import { Buildings, Devices, ShieldCheck, Star, Trophy } from "@phosphor-icons/react";

const trustItems = [
  { Icon: Trophy, label: "Gartner recognized" },
  { Icon: Star, label: "Deloitte Fast 50 India" },
  { Icon: Star, label: "G2 High Performer" },
  { Icon: Buildings, label: "150+ enterprises" },
  { Icon: Devices, label: "500K+ endpoints" },
  { Icon: ShieldCheck, label: "NIST 800-207 aligned" },
];

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-24 pb-12"
      style={{ background: "var(--grad-hero)" }}
    >
      <GlowOrbs />
      <div className="dot-grid absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--surface-faint)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
            InstaSafe ZTNA — one Zero Trust platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Stop juggling security tools.{" "}
            <span className="grad-text">Start controlling access.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Replace the VPN, unify identity, reach databases and servers, record privileged
            sessions, and protect every endpoint from one console.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button size="lg">Start free trial</Button>
            <Button variant="secondary" size="lg">
              Book a demo
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <NetworkDiagram />
        </motion.div>
      </div>

      <div className="relative mt-12 overflow-hidden border-y border-[var(--border-subtle)] py-5">
        <div className="marquee-track">
          {[...trustItems, ...trustItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-[var(--text-secondary)]"
            >
              <item.Icon size={16} weight="duotone" className="text-[var(--accent-blue-light)]" />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
