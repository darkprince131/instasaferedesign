"use client";

import { motion } from "framer-motion";

/**
 * A hairline that "powers on" — draws across from the center with a glow pulse
 * as it scrolls into view. Used as a living divider between sections.
 */
export function SectionLine() {
  return (
    <div className="relative mx-auto flex h-px max-w-7xl items-center px-5 lg:px-8">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.55), rgba(139,92,246,0.55), transparent)",
        }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1, 0] }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.4, times: [0, 0.5, 1] }}
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--accent-blue-light)]"
        style={{ boxShadow: "0 0 12px 3px rgba(96,165,250,0.7)" }}
      />
    </div>
  );
}
