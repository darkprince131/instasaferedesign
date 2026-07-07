"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CursorClick } from "@phosphor-icons/react";
import { useRef } from "react";
import { AnimatedText } from "@/components/v2/AnimatedText";
import { InteractiveConsole } from "./InteractiveConsole";

export function DashboardSectionV3() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [34, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-5 py-28 lg:px-8">
      <div className="mb-12 text-center">
        <AnimatedText
          text="See what's happening. Control what matters."
          highlight={["Control", "matters."]}
          className="mx-auto max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        />
        <p className="mx-auto mt-5 flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
          <CursorClick size={16} weight="duotone" className="text-[var(--accent-blue-light)]" />
          This is the real console — switch tabs, filter, toggle a policy, disconnect a user.
        </p>
      </div>

      <div style={{ perspective: 1500 }} className="flex justify-center">
        <motion.div style={{ rotateX, scale, y, opacity, transformStyle: "preserve-3d" }} className="w-full">
          <InteractiveConsole />
        </motion.div>
      </div>
    </section>
  );
}
