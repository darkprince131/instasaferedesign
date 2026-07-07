"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { PasswordFatigue } from "@/components/v3/sso/PasswordFatigue";
import { motion } from "framer-motion";
import { ArrowRight, CursorClick, Lightning } from "@phosphor-icons/react";

export function SsoHero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]" style={{ background: "var(--grad-hero)" }} />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-faint)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur">
          <Lightning weight="duotone" className="h-4 w-4 text-[var(--accent-green)]" />
          Single Sign-On
        </motion.div>

        <AnimatedText as="h1" text="One login. Every app. Zero password fatigue." highlight={["Zero", "fatigue."]} className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl" />

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          SAML 2.0, OAuth and OpenID SSO with desktop SSO, directory sync and device authentication — so people sign in
          once and reach everything. From $1/user/month.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.66 }} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#demo" className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]">
            Book a demo
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#solution" className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)]">
            <CursorClick weight="duotone" className="h-5 w-5 text-[var(--accent-blue-light)]" />
            See the fix
          </a>
        </motion.div>
      </div>

      {/* main attraction */}
      <div className="relative mx-auto mt-12 max-w-4xl px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          <PasswordFatigue />
        </motion.div>
        <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
          This is what one-password-per-app feels like. Try signing in to a few.
        </p>
      </div>
    </section>
  );
}
