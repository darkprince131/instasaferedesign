"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   InfoTip — highlighted text that reveals an animated tooltip
   card on hover (Aceternity tooltip-card style), framer-motion,
   themed to `.iz`. Use for "explain this" highlights.
   ============================================================ */

export function InfoTip({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="uj-hl tip"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {label}
      <AnimatePresence>
        {open && (
          <motion.span
            className="uj-tip"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
