"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Trailing dual-ring cursor. Inner dot tracks 1:1, outer ring lags via spring
 * and grows when hovering interactive elements. Desktop / fine-pointer only.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setActive(!!el.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-blue-light)]"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent-blue-light)]"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: active ? 56 : 30,
          height: active ? 56 : 30,
          opacity: active ? 0.9 : 0.4,
          borderWidth: active ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
