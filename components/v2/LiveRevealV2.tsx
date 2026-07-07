"use client";

import { AdminDashboard } from "@/components/diagrams/AdminDashboard";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "./AnimatedText";

/**
 * Dashboard rises out of a 3D-tilted plane and flattens as it scrolls into view.
 */
export function LiveRevealV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [38, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-5 py-28 lg:px-8">
      <div className="mb-14 text-center">
        <AnimatedText
          text="See what's happening. Control what matters."
          highlight={["Control", "matters."]}
          className="mx-auto max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        />
      </div>

      <div style={{ perspective: 1400 }} className="flex justify-center">
        <motion.div style={{ rotateX, scale, y, opacity, transformStyle: "preserve-3d" }}>
          <div className="scale-110 sm:scale-125">
            <AdminDashboard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
