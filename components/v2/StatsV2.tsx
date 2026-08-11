"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { end: 144, suffix: "", label: "Named policy rules" },
  { end: 21, suffix: "", label: "Policy combinations" },
  { end: 202, suffix: "", label: "Event types logged" },
  { end: 25, suffix: "", label: "Device posture checks" },
];

export function StatsV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28">
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 text-center text-[18vw] font-black leading-none text-white/[0.02]"
      >
        ZERO TRUST
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-14 px-5 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="grad-text text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <AnimatedCounter end={s.end} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-sm text-[var(--text-secondary)]">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
