"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BellRinging,
  ChatCircleDots,
  EnvelopeSimple,
  Fingerprint,
  Gauge,
  Key,
  ShieldCheck,
  Timer,
  type Icon,
} from "@phosphor-icons/react";

const METHODS: { Icon: Icon; name: string; tag: string; desc: string }[] = [
  {
    Icon: ChatCircleDots,
    name: "OTP via SMS",
    tag: "Phone",
    desc: "A one-time code to the registered mobile. Fastest to roll out across a mixed workforce with no app to install.",
  },
  {
    Icon: EnvelopeSimple,
    name: "OTP via Email",
    tag: "Inbox",
    desc: "A signed code delivered to the corporate mailbox — a reliable fallback when a device is out of reach.",
  },
  {
    Icon: Timer,
    name: "TOTP Authenticator",
    tag: "Offline",
    desc: "Time-based codes that rotate every cycle, generated on-device. Works with InstaSafe Authenticator or any RFC-6238 app.",
  },
  {
    Icon: BellRinging,
    name: "Push Approval",
    tag: "One tap",
    desc: "A rich approval with device, IP and location context. Approve or reject in a tap — phishing-resistant by design.",
  },
  {
    Icon: Fingerprint,
    name: "Biometric",
    tag: "FIDO2",
    desc: "Fingerprint or face unlock bound to the device. The secret never leaves the hardware enclave.",
  },
  {
    Icon: Key,
    name: "Hardware Token",
    tag: "FIDO2 / OTP",
    desc: "Tap a YubiKey or any FIDO2 security key. The strongest factor for privileged and high-assurance access.",
  },
];

const STEPS: { Icon: Icon; title: string; desc: string }[] = [
  {
    Icon: ShieldCheck,
    title: "User signs in",
    desc: "Identity is confirmed against your IdP, SSO or InstaSafe's built-in directory.",
  },
  {
    Icon: Gauge,
    title: "Risk is scored",
    desc: "Device posture, geo-velocity, network and time-of-day are weighed in real time.",
  },
  {
    Icon: Fingerprint,
    title: "Step-up only if needed",
    desc: "Trusted context flows straight through; anything risky is challenged for a second factor.",
  },
];

const STANDARDS = ["NIST 800-63B", "FIDO2 / WebAuthn", "RFC 6238 TOTP", "SOC 2", "ISO 27001", "Phishing-resistant"];

export function MfaContent() {
  return (
    <>
      {/* ---------- methods ---------- */}
      <section id="methods" className="section relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Six factors, one engine"
              title={
                <>
                  Pick the proof that fits <span className="grad-text">each user.</span>
                </>
              }
              subtitle="Not every login deserves the same friction. Offer the right factor per user, per app, per risk level — all managed from a single policy."
            />
            <Reveal delay={0.1}>
              <a
                href="#demo"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-blue-light)]"
              >
                See it on your stack
                <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          <div>
            {METHODS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <div className="group flex items-start gap-5 border-t border-[var(--hairline)] py-6 transition-colors first:border-t-0">
                  <span className="mt-0.5 font-mono text-xs text-[var(--text-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <m.Icon
                    size={30}
                    weight="duotone"
                    className="shrink-0 text-[var(--accent-blue-light)] transition-transform group-hover:scale-110"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold tracking-tight">{m.name}</h3>
                      <span className="rounded-full border border-[var(--hairline)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                        {m.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- adaptive flow ---------- */}
      <section id="adaptive" className="section relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Adaptive MFA"
          title={
            <>
              Friction only when the <span className="grad-text">risk is real.</span>
            </>
          }
          subtitle="Static prompts annoy good users and barely slow attackers. InstaSafe scores every attempt and challenges only what looks off."
        />

        <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
          {/* connecting line */}
          <div className="glow-line absolute left-0 right-0 top-7 hidden sm:block" aria-hidden />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} className="relative text-center">
              <div
                className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-accent)]"
                style={{ background: "var(--bg-base)" }}
              >
                <s.Icon size={26} weight="duotone" className="text-[var(--accent-blue-light)]" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">{s.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* standards strip */}
        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {STANDARDS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--hairline)] bg-[var(--surface-faint)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)]"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- final CTA ---------- */}
      <section id="demo" className="relative overflow-hidden py-32">
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
            text="Make every login one you can trust."
            highlight={["trust."]}
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]"
          >
            See adaptive MFA running against your own apps and identity provider — a 30-minute
            walkthrough, tailored to your stack.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]"
            >
              Book a demo
              <ArrowRight weight="bold" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#try"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-7 py-4 text-base font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)]"
            >
              Replay the demo
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
