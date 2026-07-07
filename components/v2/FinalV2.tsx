"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import { MagneticButton } from "./MagneticButton";

export function FinalV2() {
  return (
    <section className="grain relative flex min-h-[90dvh] items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora" style={{ width: 700, height: 700, top: "10%", left: "50%", transform: "translateX(-50%)", background: "#3B82F6" }} />
        <div className="aurora" style={{ width: 480, height: 480, bottom: "-5%", left: "20%", background: "#8B5CF6", animationDelay: "-8s" }} />
      </div>
      <div className="dot-grid absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <AnimatedText
          as="h2"
          text="Ready to retire your VPN?"
          highlight={["retire", "VPN?"]}
          className="text-balance text-5xl font-bold tracking-tight sm:text-7xl"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-7 max-w-xl text-lg text-[var(--text-secondary)]"
        >
          Join 150+ enterprises across banking, government and logistics that made the switch.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton arrow>Start free trial</MagneticButton>
          <MagneticButton variant="ghost">Talk to sales</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
