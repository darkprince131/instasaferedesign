"use client";

/**
 * IdentityLoop — the IAM signature animation.
 *
 * Phase 1 (auto): green packets glide laptop → InstaSafe Identity Shield → apps
 * (unlocked). Every few seconds a red packet (compromised credential) tries the
 * same path; it hits the shield, the ring flares red, and the packet dissolves.
 *
 * Phase 2 (hover/focus the shield): it expands and a micro-checklist ticks off —
 * Device Posture · Geo-Location · Session — to show the checks happening live.
 *
 * SVG lines/packets + HTML nodes for crisp icons. Respects reduced-motion.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChatCircleDots, CheckCircle, Cloud, DeviceMobile, Laptop, LockKeyOpen, MapPin, ShieldCheck, Stack } from "@phosphor-icons/react";

const VW = 720;
const VH = 380;
const pc = (x: number, y: number) => ({ left: `${(x / VW) * 100}%`, top: `${(y / VH) * 100}%` });

const LAPTOP = { x: 120, y: 200 };
const SHIELD = { x: 360, y: 188 };
const APPS = [
  { id: "slack", x: 600, y: 96, label: "Slack", Icon: ChatCircleDots },
  { id: "sf", x: 624, y: 188, label: "Salesforce", Icon: Cloud },
  { id: "erp", x: 600, y: 280, label: "ERP", Icon: Stack },
];

const CHECKS = [
  { Icon: DeviceMobile, label: "Device posture clear" },
  { Icon: MapPin, label: "Geo-location verified" },
  { Icon: CheckCircle, label: "Session allowed" },
];

function GreenPacket({ app, delay, reduce }: { app: (typeof APPS)[number]; delay: number; reduce: boolean }) {
  if (reduce) return null;
  return (
    <motion.circle
      r={4}
      fill="#34d399"
      filter="url(#il-glow)"
      initial={{ cx: LAPTOP.x, cy: LAPTOP.y, opacity: 0 }}
      animate={{ cx: [LAPTOP.x, SHIELD.x, SHIELD.x, app.x], cy: [LAPTOP.y, SHIELD.y, SHIELD.y, app.y], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.8, times: [0, 0.42, 0.5, 1], repeat: Infinity, repeatDelay: 0.8, delay, ease: "easeInOut" }}
    />
  );
}

export function IdentityLoop() {
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const [blockId, setBlockId] = useState(0);
  const [blocking, setBlocking] = useState(false);

  // fire a blocked red packet every few seconds
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setBlockId((n) => n + 1), 4600);
    return () => clearInterval(t);
  }, [reduce]);
  useEffect(() => {
    if (!blockId) return;
    setBlocking(true);
    const t = setTimeout(() => setBlocking(false), 1500);
    return () => clearTimeout(t);
  }, [blockId]);

  return (
    <div className="relative mx-auto w-full max-w-3xl" style={{ aspectRatio: `${VW} / ${VH}` }}>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <filter id="il-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* isometric floor hint */}
        <g stroke="var(--db-border)" strokeWidth="0.6" opacity="0.16">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`a${i}`} x1={60 + i * 110} y1={340} x2={180 + i * 110} y2={250} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`b${i}`} x1={60 + i * 110} y1={250} x2={180 + i * 110} y2={340} />
          ))}
        </g>

        {/* connection lines */}
        <line x1={LAPTOP.x} y1={LAPTOP.y} x2={SHIELD.x} y2={SHIELD.y} stroke="var(--db-border)" strokeWidth="1.4" opacity="0.5" />
        {APPS.map((a) => (
          <line key={a.id} x1={SHIELD.x} y1={SHIELD.y} x2={a.x} y2={a.y} stroke="var(--db-border)" strokeWidth="1.4" opacity="0.5" />
        ))}

        {/* shield ring (green normal, red on block) */}
        <circle cx={SHIELD.x} cy={SHIELD.y} r={42} fill="none" stroke={blocking ? "#ef4444" : "#22c55e"} strokeWidth="2" opacity="0.7" style={{ transition: "stroke .3s" }} />
        {!reduce && (
          <motion.circle cx={SHIELD.x} cy={SHIELD.y} r={42} fill="none" stroke={blocking ? "#ef4444" : "#22c55e"} strokeWidth="2" animate={{ r: [42, 60], opacity: [0.6, 0] }} transition={{ duration: blocking ? 0.9 : 2.4, repeat: Infinity, ease: "easeOut" }} />
        )}

        {/* green packets */}
        {APPS.map((a, i) => (
          <GreenPacket key={a.id} app={a} delay={i * 0.9} reduce={reduce} />
        ))}

        {/* blocked red packet — travels then dissolves at the shield */}
        <AnimatePresence>
          {blocking && !reduce && (
            <motion.circle
              key={blockId}
              r={4.5}
              fill="#ef4444"
              filter="url(#il-glow)"
              initial={{ cx: LAPTOP.x, cy: LAPTOP.y, opacity: 0, scale: 1 }}
              animate={{ cx: [LAPTOP.x, SHIELD.x - 46, SHIELD.x - 30], cy: [LAPTOP.y, SHIELD.y, SHIELD.y], opacity: [0, 1, 0], scale: [1, 1, 2.4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, times: [0, 0.7, 1], ease: "easeIn" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* ---- HTML nodes ---- */}
      {/* laptop */}
      <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-center" style={pc(LAPTOP.x, LAPTOP.y)}>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ background: "var(--db-surface)", borderColor: "var(--db-border)" }}>
          <Laptop size={26} weight="duotone" style={{ color: "var(--db-accent)" }} />
        </div>
        <div className="mt-1.5 text-[10px] font-semibold" style={{ color: "var(--db-text-dim)" }}>Verified user</div>
      </div>

      {/* apps */}
      {APPS.map((a) => (
        <div key={a.id} className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-center" style={pc(a.x, a.y)}>
          <motion.div
            className="relative flex h-12 w-12 items-center justify-center rounded-xl border"
            style={{ background: "var(--db-surface)", borderColor: "color-mix(in srgb, #22c55e 40%, var(--db-border))" }}
            animate={reduce ? undefined : { boxShadow: ["0 0 0 rgba(34,197,94,0)", "0 0 18px rgba(34,197,94,.45)", "0 0 0 rgba(34,197,94,0)"] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: a.y / 200 }}
          >
            <a.Icon size={22} weight="duotone" style={{ color: "var(--db-text)" }} />
            <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "#22c55e" }}>
              <LockKeyOpen size={11} weight="bold" color="#04130a" />
            </span>
          </motion.div>
          <div className="mt-1.5 text-[10px] font-semibold" style={{ color: "var(--db-text-dim)" }}>{a.label}</div>
        </div>
      ))}

      {/* shield (interactive) */}
      <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={pc(SHIELD.x, SHIELD.y)}>
        <motion.button
          type="button"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          aria-label="InstaSafe Identity Shield — verifying device posture, geo-location and session continuously"
          className="flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full border outline-none focus-visible:ring-4"
          style={{ background: "radial-gradient(circle at 38% 32%, #0f2a1c, #0a1320)", borderColor: blocking ? "#ef4444" : "#22c55e", boxShadow: blocking ? "0 0 36px rgba(239,68,68,.55)" : "0 0 30px rgba(34,197,94,.45)", transition: "border-color .3s, box-shadow .3s" }}
          animate={reduce ? undefined : { scale: open ? 1.12 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ShieldCheck size={34} weight="duotone" style={{ color: blocking ? "#f87171" : "#34d399" }} />
        </motion.button>
        <div className="mt-2 whitespace-nowrap text-center text-[10px] font-semibold" style={{ color: "var(--db-text-dim)" }}>
          InstaSafe Identity Shield
        </div>

        {/* checklist tooltip */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              role="status"
              className="absolute bottom-full left-1/2 z-30 mb-3 w-[200px] -translate-x-1/2 rounded-xl border p-3 shadow-2xl backdrop-blur-md"
              style={{ background: "color-mix(in srgb, var(--db-surface) 92%, transparent)", borderColor: "color-mix(in srgb, #22c55e 45%, transparent)" }}
            >
              <div className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: "#34d399" }}>Checked in milliseconds</div>
              <ul className="space-y-1.5">
                {CHECKS.map((c, i) => (
                  <motion.li
                    key={c.label}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.12 }}
                    className="flex items-center gap-2 text-[11px] font-medium"
                    style={{ color: "var(--db-text-dim)" }}
                  >
                    <CheckCircle size={14} weight="fill" style={{ color: "#22c55e" }} />
                    {c.label}
                  </motion.li>
                ))}
              </ul>
              <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r" style={{ background: "var(--db-surface)", borderColor: "color-mix(in srgb, #22c55e 45%, transparent)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* blocked label flash */}
      <AnimatePresence>
        {blocking && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute z-20 -translate-x-1/2 rounded-full px-2.5 py-1 text-[10px] font-bold"
            style={{ ...pc(SHIELD.x, SHIELD.y - 70), background: "color-mix(in srgb, #ef4444 18%, transparent)", color: "#f87171", border: "1px solid #ef4444" }}
          >
            Blocked · untrusted
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
