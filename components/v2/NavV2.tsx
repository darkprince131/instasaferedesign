"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ShieldCheck } from "@phosphor-icons/react";
import { useState } from "react";

const links = ["Platform", "Solutions", "Pricing", "Company"];

export function NavV2() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300);
    setScrolled(y > 40);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-[80] flex justify-center px-4"
    >
      <nav
        className={`flex items-center gap-1 rounded-full border px-2 py-2 transition-colors duration-300 ${
          scrolled
            ? "border-white/10 bg-[var(--bg-base)]/70 backdrop-blur-xl"
            : "border-white/5 bg-white/[0.02] backdrop-blur"
        }`}
      >
        <a href="#" className="flex items-center gap-2 px-3 font-bold" data-cursor>
          <ShieldCheck weight="duotone" className="h-5 w-5 text-[var(--accent-blue-light)]" />
          <span className="text-sm">InstaSafe</span>
        </a>
        <div className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />
        <div className="hidden items-center sm:flex">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              data-cursor
              className="rounded-full px-3.5 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="#"
          data-cursor
          className="ml-1 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--bg-base)] transition-transform hover:scale-[1.03]"
        >
          Try free
        </a>
      </nav>
    </motion.header>
  );
}
