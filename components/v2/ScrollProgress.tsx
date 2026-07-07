"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #14B8A6)",
      }}
    />
  );
}
