"use client";

import { NetworkDiagram } from "@/components/diagrams/NetworkDiagram";
import { AnimatedText } from "@/components/v2/AnimatedText";
import { motion } from "framer-motion";
import { ArrowRight, LockKey, PlayCircle } from "@phosphor-icons/react";

const proof = [
  { k: "500K+", v: "endpoints" },
  { k: "25", v: "device checks" },
  { k: "NIST", v: "800-207" },
];

export function HeroV3() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-24 pb-12"
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-faint)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur"
          >
            <LockKey weight="duotone" className="h-4 w-4 text-[var(--accent-green)]" />
            Zero Trust access, the whole stack
          </motion.div>

          <AnimatedText
            as="h1"
            text="Stop juggling security tools. Start controlling access."
            highlight={["controlling", "access."]}
            className="text-balance text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Replace the VPN, unify identity, reach databases and servers, record privileged
            sessions, and protect every endpoint from one console.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#demo"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]"
            >
              Book a demo
              <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--hairline)]"
            >
              <PlayCircle weight="duotone" className="h-5 w-5 text-[var(--accent-blue-light)]" />
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 flex gap-8"
          >
            {proof.map((p) => (
              <div key={p.v}>
                <div className="text-xl font-bold tracking-tight">{p.k}</div>
                <div className="text-xs text-[var(--text-muted)]">{p.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <NetworkDiagram />
        </motion.div>
      </div>
    </section>
  );
}
