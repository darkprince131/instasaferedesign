"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import type { DockItem } from "./pro.config";

/* ============================================================
   IzProDock — the identity-provider row under step 01's body copy.

   Lifted from C32 WallOfLove's mac-dock mechanic (mouseX shared via
   a motion value, each icon reads its own distance from the cursor
   and springs its size), scaled down to 5 small icons instead of a
   9-logo customer wall. Deliberately scoped to ONLY these icons —
   this is not the console; nothing in the duo panel above it
   participates in the magnify.

   A source without art yet (AD, LDAP — see pro.config.tsx) renders
   as a monogram plate in the same chassis, same rule as every other
   logo fallback on this site: never a broken-image box.
   ============================================================ */

function initials(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}

function DockIcon({ mouseX, item, reduced }: { mouseX: ReturnType<typeof useMotionValue<number>>; item: DockItem; reduced: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const distance = useTransform(mouseX, (v: number) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return v - b.x - b.width / 2;
  });
  const sizeSync = useTransform(distance, [-90, 0, 90], reduced ? [30, 30, 30] : [26, 42, 26]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 170, damping: 14 });

  return (
    <motion.span ref={ref} style={{ width: size, height: size }} className="izprodock-icon" title={item.name}>
      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/logos/integrations/${item.logo}.svg`} alt={item.name} loading="lazy" decoding="async" />
      ) : (
        <span className="izprodock-mono" aria-label={item.name}>
          {initials(item.name)}
        </span>
      )}
    </motion.span>
  );
}

export function IzProDock({ items }: { items: DockItem[] }) {
  const mouseX = useMotionValue(Infinity);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className="izprodock"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      aria-label="Identity providers"
    >
      {items.map((it) => (
        <DockIcon key={it.name} mouseX={mouseX} item={it} reduced={!!reduced} />
      ))}
    </div>
  );
}
