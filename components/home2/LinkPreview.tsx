"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/* ============================================================
   LinkPreview — hover a link, a preview card floats above the
   cursor and tracks horizontal movement (Aceternity-style),
   rebuilt on framer-motion + themed to `.iz` tokens (no external
   screenshot service). Pass `preview` as the card contents.
   ============================================================ */

export function LinkPreview({
  href,
  children,
  preview,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  preview: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const x = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const offset = e.clientX - r.left - r.width / 2;
    x.set(offset * 0.5);
  }

  return (
    <span
      className={`lp ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onMouseMove={onMove}
    >
      <a className="lp-link" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
      <AnimatePresence>
        {open && (
          <motion.span
            className="lp-pop"
            style={{ x: sx }}
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {preview}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
