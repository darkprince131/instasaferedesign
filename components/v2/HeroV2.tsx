"use client";

import { NetworkDiagram } from "@/components/diagrams/NetworkDiagram";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { useRef } from "react";
import { AnimatedText } from "./AnimatedText";
import { MagneticButton } from "./MagneticButton";

export function HeroV2() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const layerA = useTransform(px, [-1, 1], [-28, 28]);
  const layerAY = useTransform(py, [-1, 1], [-20, 20]);
  const layerB = useTransform(px, [-1, 1], [22, -22]);
  const layerBY = useTransform(py, [-1, 1], [16, -16]);
  const tiltX = useTransform(py, [-1, 1], [6, -6]);
  const tiltY = useTransform(px, [-1, 1], [-6, 6]);

  // Scroll-out
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = ref.current!.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="grain relative flex min-h-[100dvh] flex-col justify-center overflow-hidden"
    >
      {/* Aurora field */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="aurora"
          style={{ x: layerA, y: layerAY, width: 620, height: 620, top: "-12%", left: "8%", background: "#3B82F6" }}
        />
        <motion.div
          className="aurora"
          style={{ x: layerB, y: layerBY, width: 520, height: 520, top: "20%", right: "4%", background: "#8B5CF6", animationDelay: "-6s" }}
        />
        <motion.div
          className="aurora"
          style={{ x: layerAY, y: layerA, width: 420, height: 420, bottom: "-10%", left: "38%", background: "#14B8A6", animationDelay: "-11s" }}
        />
      </div>
      <div className="dot-grid absolute inset-0 opacity-40" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale }}
        className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pt-24 lg:grid-cols-[1.1fr_1fr] lg:px-8"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
            </span>
            Zero Trust, the whole stack
          </motion.div>

          <AnimatedText
            as="h1"
            text="Stop juggling security tools. Start controlling access."
            highlight={["controlling", "access."]}
            className="text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Replace the VPN, unify identity, reach databases and servers, record privileged
            sessions, and protect every endpoint from one console.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton arrow>Start free trial</MagneticButton>
            <MagneticButton variant="ghost">Book a demo</MagneticButton>
          </motion.div>
        </div>

        <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }} className="relative">
          <NetworkDiagram />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-x-0 bottom-6 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-[var(--text-muted)]"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <CaretDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
