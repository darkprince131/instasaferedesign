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
   C32 · Mac Dock Nav — "Wall of love" / trusted-by section.
   Magnify-on-hover floating dock of customer logos (the macOS
   dock effect). Hovering a logo swaps the app-window preview
   above and shows a tooltip. Logos are PLACEHOLDERS — swap the
   LOGOS array (name / grad / initial / href) later.
   ============================================================ */

interface Brand {
  name: string;
  initial: string;
  grad: string;
  sector: string;
  stats: { label: string; value: string }[];
  href: string;
}

const LOGOS: Brand[] = [
  { name: "Northwind", initial: "N", grad: "linear-gradient(135deg,#0EA5E9,#2563EB)", sector: "Banking · BFSI", stats: [{ label: "endpoints", value: "48,000" }, { label: "regions", value: "5" }], href: "/case-studies" },
  { name: "Volta", initial: "V", grad: "linear-gradient(135deg,#22C55E,#0F766E)", sector: "Energy · Utilities", stats: [{ label: "sites", value: "212" }, { label: "VPN boxes", value: "0" }], href: "/case-studies" },
  { name: "Meridian", initial: "M", grad: "linear-gradient(135deg,#F59E0B,#EA580C)", sector: "Logistics", stats: [{ label: "users", value: "65,000" }, { label: "deploy", value: "5 days" }], href: "/case-studies" },
  { name: "Cobalt", initial: "C", grad: "linear-gradient(135deg,#6366F1,#9333EA)", sector: "Government · PSU", stats: [{ label: "on-prem", value: "100%" }, { label: "incidents", value: "0" }], href: "/case-studies" },
  { name: "Lumen", initial: "L", grad: "linear-gradient(135deg,#EC4899,#BE123C)", sector: "Healthcare", stats: [{ label: "devices", value: "31,500" }, { label: "checks", value: "25" }], href: "/case-studies" },
  { name: "Orbit", initial: "O", grad: "linear-gradient(135deg,#14B8A6,#0891B2)", sector: "IT · ITES", stats: [{ label: "apps", value: "340" }, { label: "lateral moves", value: "0" }], href: "/case-studies" },
  { name: "Vertex", initial: "X", grad: "linear-gradient(135deg,#8B5CF6,#4F46E5)", sector: "Manufacturing", stats: [{ label: "plants", value: "47" }, { label: "uptime", value: "99.99%" }], href: "/case-studies" },
  { name: "Pulse", initial: "P", grad: "linear-gradient(135deg,#F97316,#DC2626)", sector: "NBFC", stats: [{ label: "users", value: "18,200" }, { label: "TCO cut", value: "40%" }], href: "/case-studies" },
  { name: "Cirrus", initial: "S", grad: "linear-gradient(135deg,#3B82F6,#1E40AF)", sector: "Real Estate", stats: [{ label: "branches", value: "120" }, { label: "MFA", value: "built-in" }], href: "/case-studies" },
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
      <span className="logo" style={{ background: item.grad }}>
        {item.initial}
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
      <div className="wol-head">
        <span className="wol-pill">{IcHeart} Wall of love</span>
        <h2 className="wol-h">
          Trusted by the world&apos;s <em>most regulated enterprises</em>.
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
            <span className="wol-logo-lg" style={{ background: cur.grad }}>
              {cur.initial}
            </span>
            <span className="wol-name">{cur.name}</span>
            <span className="wol-sector">{cur.sector}</span>
            <div className="wol-stats">
              {cur.stats.map((s) => (
                <span className="wol-stat" key={s.label}>
                  <b>{s.value}</b> {s.label}
                </span>
              ))}
            </div>
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
