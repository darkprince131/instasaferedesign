"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Clock,
  GpsFix,
  Heartbeat,
  ShieldCheck,
  WifiHigh,
  type Icon,
} from "@phosphor-icons/react";

const SIGNALS: { Icon: Icon; h: string; p: string }[] = [
  { Icon: Heartbeat, h: "Device health", p: "Disk encryption, patch level, AV and firewall — re-checked continuously, not just at login." },
  { Icon: GpsFix, h: "Location & geo-velocity", p: "Where the session is, and whether it just teleported across the map in seconds." },
  { Icon: Brain, h: "Behaviour", p: "How this user normally moves and works — a sudden break in pattern raises the score." },
  { Icon: WifiHigh, h: "Network & posture", p: "Trusted vs hostile networks, and whether the device still meets your policy." },
  { Icon: Clock, h: "Session age & idle", p: "Long-lived and idle sessions are re-verified or quietly retired before they become a risk." },
];

const OLD = [
  "Checks identity once, at the front gate",
  "Trusts the connection for the whole session",
  "Blind to a stolen, logged-in laptop",
  "Re-prompts users to feel 'secure'",
];
const NEW = [
  "Re-verifies continuously, every step",
  "Trust is earned each second, never assumed",
  "Drops the session the instant context turns unsafe",
  "Protects silently — zero extra effort for users",
];

export function AlwaysOnContent() {
  return (
    <div className="relative" style={{ background: "var(--bg-base)" }}>
      {/* intro */}
      <section className="section relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue-light)]">
            Zero Trust · Always-On
          </span>
        </Reveal>
        <AnimatedText
          as="h2"
          text="A lock that checks once is a lock left open."
          highlight={["open."]}
          className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Passwords and one-time MFA prove who you are for a single moment. Always-On verification keeps
            proving it — turning a static gate into a guardian that watches every second of the session.
          </p>
        </Reveal>
      </section>

      {/* signals — editorial list, no boxes */}
      <section className="section relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="What gets checked"
              title={
                <>
                  Every request is <span className="grad-text">measured.</span>
                </>
              }
              subtitle="These aren't one-time checks. Each signal is scored live on every request — and when the picture stops adding up, access stops, whatever the device."
            />
          </div>
          <ul>
            {SIGNALS.map((s, i) => (
              <Reveal key={s.h} delay={i * 0.05}>
                <li className="flex items-start gap-5 border-t border-[var(--hairline)] py-6 first:border-t-0">
                  <s.Icon size={28} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-blue-light)]" />
                  <div>
                    <h3 className="font-semibold tracking-tight">{s.h}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">{s.p}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* before / after — split list, divided by a hairline */}
      <section className="section relative mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="One-time vs always-on"
          title={
            <>
              Same login. <span className="grad-text">Very different</span> after it.
            </>
          }
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-2" style={{ background: "var(--hairline)" }}>
          <div className="p-7" style={{ background: "var(--bg-base)" }}>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[var(--accent-red)]">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent-red)]" />
              The blind lock
            </div>
            <ul className="space-y-4">
              {OLD.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-7" style={{ background: "var(--bg-base)" }}>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[var(--accent-green)]">
              <ShieldCheck size={16} weight="fill" />
              The living guardian
            </div>
            <ul className="space-y-4">
              {NEW.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                  <ShieldCheck size={15} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-green)]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10"
          >
            <ShieldCheck size={28} weight="duotone" className="text-[var(--accent-blue-light)]" />
          </motion.div>
          <AnimatedText
            as="h2"
            text="Give every session a guardian."
            highlight={["guardian."]}
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]"
          >
            See always-on verification running against your own apps and devices — a 30-minute walkthrough,
            tailored to your stack.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-9 flex justify-center"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]"
            >
              Book a demo
              <ArrowRight weight="bold" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
