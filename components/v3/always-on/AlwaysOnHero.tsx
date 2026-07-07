"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { StolenLaptopDemo } from "@/components/v3/always-on/StolenLaptopDemo";
import { motion } from "framer-motion";
import { CursorClick, DeviceMobileCamera, Fingerprint, ShieldCheck } from "@phosphor-icons/react";

const POINTS = [
  { Icon: Fingerprint, h: "Identity, re-checked", p: "Every request is tied to a verified identity — not a once-opened session." },
  { Icon: DeviceMobileCamera, h: "Device & policy, per request", p: "Posture and policy are evaluated continuously, on this exact machine." },
  { Icon: ShieldCheck, h: "Beyond your rights, beyond reach", p: "Apps, databases and sites outside your scope simply never resolve." },
];

export function AlwaysOnHero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{ background: "var(--grad-hero)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface-faint)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur"
          >
            <ShieldCheck weight="duotone" className="h-4 w-4 text-[var(--accent-green)]" />
            Zero Trust · Always-On Verification
          </motion.div>

          <AnimatedText
            as="h1"
            text="Lose the laptop. Keep control."
            highlight={["control."]}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            A password is a moment, not a perimeter. Even if a thief walks off with your machine unlocked and
            signed in, every app, site and network still sits behind continuous checks — so anything beyond your
            rights stays out of reach. Open the apps below and see for yourself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-7 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--surface-faint)] px-4 py-2 text-xs font-semibold text-[var(--accent-blue-light)] backdrop-blur">
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
                <CursorClick weight="fill" className="h-4 w-4" />
              </motion.span>
              Interactive — double-click InstaSafe, Chrome, the codebase or the database
            </span>
          </motion.div>
        </div>

        {/* the laptop */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <StolenLaptopDemo />
        </motion.div>

        {/* framing points */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-x-10 gap-y-8 sm:grid-cols-3">
          {POINTS.map((pt, i) => (
            <motion.div
              key={pt.h}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-3.5"
            >
              <pt.Icon size={24} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-blue-light)]" />
              <div>
                <h3 className="text-sm font-semibold tracking-tight">{pt.h}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{pt.p}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
