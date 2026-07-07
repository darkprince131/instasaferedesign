"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { motion } from "framer-motion";
import { ArrowRight, CursorClick, EyeSlash } from "@phosphor-icons/react";

const stats = [
  { k: "0", v: "inbound ports" },
  { k: "21", v: "policy combinations" },
  { k: "NIST", v: "800-207 aligned" },
];

export function ZtnaHero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]" style={{ background: "var(--grad-hero)" }} />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-faint)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur"
        >
          <EyeSlash weight="duotone" className="h-4 w-4 text-[var(--accent-green)]" />
          Zero Trust Network Access
        </motion.div>

        <AnimatedText
          as="h1"
          text="Make your network invisible."
          highlight={["invisible."]}
          className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
        >
          InstaSafe ZTNA replaces the VPN at the network layer. Apps and servers stay dark to the internet,
          users reach only what they&apos;re authorized for, and your data never routes through our machines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.66 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#demo"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]"
          >
            Book a demo
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#breach"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)]"
          >
            <CursorClick weight="duotone" className="h-5 w-5 text-[var(--accent-blue-light)]" />
            Simulate a breach
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-9 flex justify-center gap-8"
        >
          {stats.map((s) => (
            <div key={s.v}>
              <div className="text-xl font-bold tracking-tight">{s.k}</div>
              <div className="text-xs text-[var(--text-muted)]">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
