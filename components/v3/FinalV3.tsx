"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "@phosphor-icons/react";

export function FinalV3() {
  return (
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
          text="Ready to retire your VPN?"
          highlight={["retire", "VPN?"]}
          className="text-balance text-4xl font-bold tracking-tight sm:text-6xl"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]"
        >
          See InstaSafe ZTNA on your own apps. A 30-minute walkthrough, tailored to your stack.
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
  );
}
