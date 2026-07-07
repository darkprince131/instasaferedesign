"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { IdentityLoop } from "@/components/v3/iam/IdentityLoop";
import { motion } from "framer-motion";
import { ArrowRight, CursorClick, IdentificationCard } from "@phosphor-icons/react";

const stats = [
  { k: "8", v: "auth profiles" },
  { k: "6", v: "MFA methods" },
  { k: "1", v: "identity cloud" },
];

export function IamHero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]" style={{ background: "var(--grad-hero)" }} />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-faint)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur"
        >
          <IdentificationCard weight="duotone" className="h-4 w-4 text-[var(--accent-green)]" />
          Identity &amp; Access Management
        </motion.div>

        <AnimatedText
          as="h1"
          text="Identity is the new perimeter. Own it."
          highlight={["Own", "it."]}
          className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
        >
          InstaSafe&apos;s Identity Cloud is a full IdP and access engine — 8 authentication profiles, 6 MFA methods,
          directory sync, SSO and risk-based access — that also extends the IdP you already run.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.66 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#demo" className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]">
            Book a demo
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#capabilities" className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)]">
            <CursorClick weight="duotone" className="h-5 w-5 text-[var(--accent-blue-light)]" />
            Explore the platform
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }} className="mt-9 flex justify-center gap-8">
          {stats.map((s) => (
            <div key={s.v}>
              <div className="text-xl font-bold tracking-tight">{s.k}</div>
              <div className="text-xs text-[var(--text-muted)]">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* signature animation */}
      <div className="relative mx-auto mt-12 max-w-4xl px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          <IdentityLoop />
        </motion.div>
        <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
          Live: validated users flow straight through · untrusted attempts are blocked at the shield. Hover it.
        </p>
      </div>
    </section>
  );
}
