"use client";

import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChartLineUp, Fingerprint, LockKeyOpen, type Icon } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const steps: { Icon: Icon; n: string; title: string; desc: string; accent: string }[] = [
  {
    Icon: Fingerprint,
    n: "Step 01",
    title: "Authenticate",
    desc: "Verify the user and the device together — 8 auth profiles, 6 MFA methods and 25 posture checks running at once.",
    accent: "#3B82F6",
  },
  {
    Icon: LockKeyOpen,
    n: "Step 02",
    title: "Access",
    desc: "Open an encrypted tunnel to one authorized app — web, RDP, SSH, VNC or database. The server never faces the open internet.",
    accent: "#22C55E",
  },
  {
    Icon: ChartLineUp,
    n: "Step 03",
    title: "Monitor",
    desc: "Record the session, log it across 202 event types and stream it to your SIEM in real time.",
    accent: "#8B5CF6",
  },
];

export function HorizontalFlow() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={wrap} className="relative overflow-hidden">
      <div ref={track} className="flex h-[100dvh] w-max items-center">
        {/* Intro panel */}
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-8 sm:px-20">
          <div className="max-w-xl">
            <div className="mb-4 font-mono text-sm text-[var(--accent-blue-light)]">How it works</div>
            <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Every request is checked <span className="grad-text">before it connects.</span>
            </h2>
            <p className="mt-6 text-[var(--text-secondary)]">Keep scrolling →</p>
          </div>
        </div>

        {steps.map((s) => (
          <div key={s.n} className="flex h-full w-screen shrink-0 items-center px-8 sm:px-20">
            <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-5 font-mono text-sm" style={{ color: s.accent }}>
                  {s.n}
                </div>
                <h3 className="text-5xl font-bold tracking-tight sm:text-7xl">{s.title}</h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--text-secondary)]">
                  {s.desc}
                </p>
              </div>
              <div className="flex justify-center">
                <div
                  className="relative flex h-56 w-56 items-center justify-center rounded-[2rem] sm:h-72 sm:w-72"
                  style={{ background: `${s.accent}14`, border: `1px solid ${s.accent}33` }}
                >
                  <div
                    className="absolute inset-0 rounded-[2rem] opacity-40 blur-2xl"
                    style={{ background: s.accent }}
                  />
                  <s.Icon size={96} weight="duotone" color={s.accent} className="relative" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
