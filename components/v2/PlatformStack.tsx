"use client";

import { AnimatedText } from "./AnimatedText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import {
  ChartLine,
  Cpu,
  Fingerprint,
  Monitor,
  ShieldCheck,
  VideoCamera,
  type Icon,
} from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const pillars: { Icon: Icon; n: string; title: string; desc: string; accent: string }[] = [
  { Icon: Fingerprint, n: "01", title: "Identity & Auth", desc: "8 auth profiles, 6 MFA methods, 3 directory sources. SAML, OIDC, OAuth and RADIUS together.", accent: "#3B82F6" },
  { Icon: Monitor, n: "02", title: "Secure App Access", desc: "7 app types, 8 database drivers, agentless browser access and Windows file shares.", accent: "#8B5CF6" },
  { Icon: VideoCamera, n: "03", title: "Privileged Sessions", desc: "Record, watermark and block copy-paste on RDP, SSH and VNC. Aligned to NIST 800-207.", accent: "#14B8A6" },
  { Icon: ShieldCheck, n: "04", title: "Device Trust", desc: "25 posture checks across 1,500+ OS combinations, 144 named rules, MDM and EDR signals.", accent: "#F97316" },
  { Icon: Cpu, n: "05", title: "Endpoint Management", desc: "Push software, set geofences, block apps, enforce shift schedules and risk profiles.", accent: "#22C55E" },
  { Icon: ChartLine, n: "06", title: "Analytics & SIEM", desc: "7 SIEM formats, 11 report types, 202 event types and scheduled report subscriptions.", accent: "#60A5FA" },
];

export function PlatformStack() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top 18%",
          endTrigger: cards[cards.length - 1],
          end: "top 18%",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.4,
          filter: "blur(2px)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top 18%",
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="relative mx-auto max-w-5xl px-5 py-28 lg:px-8">
      <div className="mb-16 text-center">
        <AnimatedText
          text="One console for every Zero Trust decision."
          highlight={["Zero", "Trust"]}
          className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        />
      </div>

      <div ref={root} className="relative">
        {pillars.map((p) => (
          <div key={p.n} className="stack-card sticky top-[18%] mb-6">
            <div
              className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12"
              style={{ background: "rgba(12,21,38,0.92)" }}
            >
              <div
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
                style={{ background: p.accent }}
              />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: `${p.accent}1f`, border: `1px solid ${p.accent}40` }}
                >
                  <p.Icon size={30} weight="duotone" color={p.accent} />
                </div>
                <div className="flex-1">
                  <div className="mb-2 font-mono text-sm" style={{ color: p.accent }}>
                    {p.n}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">{p.title}</h3>
                  <p className="max-w-xl text-pretty leading-relaxed text-[var(--text-secondary)]">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
