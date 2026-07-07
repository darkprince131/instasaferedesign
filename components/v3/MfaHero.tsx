"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { MfaSimulator } from "@/components/v3/MfaSimulator";
import { motion } from "framer-motion";
import { ArrowRight, CursorClick, Fingerprint } from "@phosphor-icons/react";

export function MfaHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-faint)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur"
          >
            <Fingerprint weight="duotone" className="h-4 w-4 text-[var(--accent-green)]" />
            Multi-Factor Authentication
          </motion.div>

          <AnimatedText
            as="h1"
            text="Prove it's really you. Six ways. Zero friction."
            highlight={["you.", "friction."]}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            SMS, email, authenticator, push, biometrics and hardware keys — one adaptive
            engine that steps up only when the risk does. Don&apos;t just read about it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
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
              href="#try"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)]"
            >
              <CursorClick weight="duotone" className="h-5 w-5 text-[var(--accent-blue-light)]" />
              Try the live demo
            </a>
          </motion.div>
        </div>

        {/* try-it nudge */}
        <div id="try" className="mt-12 flex justify-center scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--surface-faint)] px-4 py-2 text-xs font-semibold text-[var(--accent-blue-light)] backdrop-blur"
          >
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <CursorClick weight="fill" className="h-4 w-4" />
            </motion.span>
            Interactive — pick a method and watch it sign you in
          </motion.div>
        </div>

        {/* the main attraction */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-6 max-w-4xl"
        >
          {/* ambient glow */}
          <div
            className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--accent-blue) 22%, transparent), transparent 70%)",
            }}
          />
          <MfaSimulator />
        </motion.div>
      </div>
    </section>
  );
}
