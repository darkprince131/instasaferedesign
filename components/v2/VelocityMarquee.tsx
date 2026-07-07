"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { useRef } from "react";

/**
 * Marquee whose direction + speed bend with scroll velocity, and which skews
 * slightly while the user flings the page. Classic Awwwards velocity strip.
 */
export function VelocityMarquee({
  items,
  baseVelocity = 4,
}: {
  items: string[];
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [1, 4], { clamp: false });
  const skew = useTransform(smooth, [-1000, 0, 1000], [-6, 0, 6], { clamp: true });

  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-white/5 py-8">
      <motion.div style={{ skewX: skew }}>
        <motion.div className="flex whitespace-nowrap" style={{ x }}>
          {row.map((item, i) => (
            <span
              key={i}
              className="mx-6 text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.16)" }}
            >
              {item}
              <span className="mx-6 align-middle text-[var(--accent-blue)]">✦</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
