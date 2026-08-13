"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ============================================================
   C32 · Mac Dock Nav — the trusted-by section.
   Magnify-on-hover floating dock (the macOS dock effect). Hovering a
   logo swaps the window preview above it.

   ▸ REAL LOGOS, AND ONLY THE ONES THAT FIT ◂ (2026-08-13)

   This shipped with nine invented brands — Northwind, Volta, Meridian
   and so on — drawn as gradient tiles with an initial, each carrying
   INVENTED STATISTICS: "48,000 endpoints", "212 sites", "TCO cut 40%".
   Fictional numbers on fictional companies are merely placeholder;
   the same numbers behind a REAL company's mark are a false claim
   about a named third party. They are gone and are not coming back
   without a source.

   WHICH LOGOS: the dock tile is square-ish, so selection is by aspect
   ratio, measured from each SVG's viewBox rather than guessed. The
   nine below are every customer mark at or under ~2.5:1. The other
   ten in /public/logos/customers are wordmarks running to 6.9:1
   (Mirae Asset Sharekhan, Siemens, Samsonite, Asian Paints…) — in a
   square tile those either clip or shrink to an illegible sliver, so
   they stay in IzLogoMarquee, which is built for that shape.

   `detail` is the slot the invented stats vacated. It is deliberately
   empty pending publicly-attributable copy per customer; the preview
   renders without it and shows the sector alone.
   ============================================================ */

interface Brand {
  name: string;
  /** file in /public/logos/customers, without the .svg */
  file: string;
  sector: string;
  /** measured width/height of the source viewBox — drives tile fit */
  ar: number;
  /** awaiting approved, publicly-available copy. No invented figures. */
  detail?: string;
  href: string;
}

const LOGOS: Brand[] = [
  { name: "Tata", file: "tata", ar: 1.14, sector: "Conglomerate", href: "/case-studies" },
  { name: "NHPC", file: "nhpc", ar: 1.74, sector: "Power · PSU", href: "/case-studies" },
  { name: "Aditya Birla Group", file: "aditya-birla", ar: 1.81, sector: "Conglomerate", href: "/case-studies" },
  { name: "Haldiram's", file: "haldirams", ar: 1.88, sector: "FMCG", href: "/case-studies" },
  { name: "Allcargo Logistics", file: "allcargo", ar: 1.9, sector: "Logistics", href: "/case-studies" },
  { name: "Pidilite", file: "pidilite", ar: 1.98, sector: "Manufacturing", href: "/case-studies" },
  { name: "Café Coffee Day", file: "cafe-coffee-day", ar: 0.69, sector: "Retail · F&B", href: "/case-studies" },
  { name: "Bajaj General Insurance", file: "bajaj-allianz", ar: 2.39, sector: "Insurance", href: "/case-studies" },
  { name: "Jana Small Finance Bank", file: "jana-bank", ar: 2.49, sector: "Banking · BFSI", href: "/case-studies" },
];

const IcHeart = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21s-7-4.35-9.5-8.5C.7 9.4 2 6 5.2 6c1.9 0 3.1 1 3.8 2 .7-1 1.9-2 3.8-2 3.2 0 4.5 3.4 2.7 6.5C19 16.65 12 21 12 21z" />
  </svg>
);
const IcShield = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

function DockIcon({ mouseX, item, on, onHover, reduced }: { mouseX: MotionValue<number>; item: Brand; on: boolean; onHover: () => void; reduced: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (v: number) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return v - b.x - b.width / 2;
  });
  const sizeSync = useTransform(distance, [-150, 0, 150], reduced ? [50, 50, 50] : [48, 80, 48]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 170, damping: 14 });

  return (
    <motion.button
      ref={ref}
      style={{ width: size, height: size }}
      className={`wol-icon ${on ? "on" : ""}`}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={() => (window.location.href = item.href)}
      aria-label={item.name}
    >
      <span className="logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/logos/customers/${item.file}.svg`} alt="" aria-hidden="true" loading="lazy" />
      </span>
      <AnimatePresence>
        {on && (
          <motion.span
            className="wol-tip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16 }}
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function WallOfLove() {
  const [active, setActive] = useState(0);
  const mouseX = useMotionValue(Infinity);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const cur = LOGOS[active];

  return (
    <div className="wol">
      {/* "Wall of love" was the LAB's name for the pattern, not copy for
          a page — it says nothing about who these companies are and
          reads as a developer's label left in the build. */}
      <div className="wol-head">
        <span className="wol-pill">{IcHeart} In production</span>
        <h2 className="wol-h">
          Running where access decisions are <em>audited hardest</em>.
        </h2>
      </div>

      <div className="wol-frame">
        <div className="wol-window">
          <div className="wol-bar">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="wt">{cur.name.toLowerCase()}.app</span>
          </div>
          <div className="wol-body" key={active}>
            <span className="wol-logo-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/customers/${cur.file}.svg`} alt={cur.name} loading="lazy" />
            </span>
            <span className="wol-name">{cur.name}</span>
            <span className="wol-sector">{cur.sector}</span>
            {/* The stats row that sat here carried invented figures. It
                renders only when there is real, attributable copy to
                put in it — an empty row beats a made-up one. */}
            {cur.detail && <p className="wol-detail">{cur.detail}</p>}
            <span className="wol-badge">{IcShield} Protected by InstaSafe ZTNA</span>
          </div>
        </div>

        <div
          className="wol-dock"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          role="tablist"
          aria-label="Customers"
        >
          {LOGOS.map((item, i) => (
            <DockIcon key={item.name} mouseX={mouseX} item={item} on={active === i} onHover={() => setActive(i)} reduced={!!reduced} />
          ))}
        </div>
      </div>
    </div>
  );
}
