"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { ArrowRight, Devices, Fingerprint, SealCheck, ShieldCheck, UserCheck, type Icon } from "@phosphor-icons/react";

const STEPS: { Icon: Icon; h: string; p: string }[] = [
  { Icon: Fingerprint, h: "Fingerprint the hardware", p: "Each device is bound by MAC address, serial number and hardware UUID — a signature that doesn't travel with a stolen password." },
  { Icon: UserCheck, h: "Approve per user", p: "An admin approves which machines a person may use. New or unknown devices land in a pending queue, not on your network." },
  { Icon: ShieldCheck, h: "Enforce at connect", p: "Every connection re-checks the binding. The right user on the wrong device is refused — automatically, every time." },
];

const POINTS: { Icon: Icon; h: string; p: string }[] = [
  { Icon: SealCheck, h: "Phishing-proof in practice", p: "Even with valid credentials, an attacker's laptop isn't on the approved list — so it never gets in." },
  { Icon: Devices, h: "BYOD without the risk", p: "Let people register their own machines through an approval workflow; revoke any one instantly when it leaves." },
];

export function DeviceBindingContent() {
  return (
    <div className="relative">
      {/* how it works */}
      <section id="how" className="section relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="How binding works"
          title={
            <>
              The password gets you to the door. <span className="grad-text">The device opens it.</span>
            </>
          }
          subtitle="Binding ties identity to specific hardware, so access can't be replayed from a machine you don't control."
        />
        <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
          <div className="glow-line absolute left-0 right-0 top-7 hidden sm:block" aria-hidden />
          {STEPS.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.12} className="relative text-center">
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-accent)]" style={{ background: "var(--bg-base)" }}>
                <s.Icon size={26} weight="duotone" className="text-[var(--accent-blue-light)]" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{s.h}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* why it matters */}
      <section className="section relative mx-auto max-w-5xl px-5 lg:px-8">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {POINTS.map((it, i) => (
            <Reveal key={it.h} delay={i * 0.08} className="flex gap-4">
              <it.Icon size={28} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-green)]" />
              <div>
                <h3 className="mb-1.5 font-semibold">{it.h}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{it.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="relative overflow-hidden py-28">
        <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
          <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10">
            <Fingerprint size={28} weight="duotone" className="text-[var(--accent-blue-light)]" />
          </motion.div>
          <AnimatedText as="h2" text="Let only the right machines in." highlight={["right", "machines"]} className="text-balance text-4xl font-bold tracking-tight sm:text-5xl" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">
            See device binding running against your own fleet — a 30-minute walkthrough, tailored to your stack.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.45 }} className="mt-9 flex justify-center">
            <a href="#" className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]">
              Book a demo
              <ArrowRight weight="bold" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
