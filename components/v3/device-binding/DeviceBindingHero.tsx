"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { DeviceBindingDemo } from "@/components/console/DeviceBindingConsole";
import { motion } from "framer-motion";
import { ArrowRight, CursorClick, Fingerprint } from "@phosphor-icons/react";

export function DeviceBindingHero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]" style={{ background: "var(--grad-hero)" }} />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-faint)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur">
          <Fingerprint weight="duotone" className="h-4 w-4 text-[var(--accent-green)]" />
          Device Binding
        </motion.div>

        <AnimatedText as="h1" text="Bind access to the device, not just the user." highlight={["device,"]} className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl" />

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          A stolen password is only half a key. Tie each person to the exact machines they&apos;re allowed to use — by MAC,
          serial and hardware UUID — and an unapproved device simply can&apos;t connect.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.66 }} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#demo" className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]">
            Book a demo
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)]">
            <CursorClick weight="duotone" className="h-5 w-5 text-[var(--accent-blue-light)]" />
            How binding works
          </a>
        </motion.div>
      </div>

      {/* interactive console */}
      <div className="relative mx-auto mt-12 max-w-5xl px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          <DeviceBindingDemo />
        </motion.div>
        <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
          Admin approves in the console. Then each device tries to <strong>Connect</strong> — unapproved ones are refused.
        </p>
      </div>
    </section>
  );
}
