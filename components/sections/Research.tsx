"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGrid } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  { end: 86, label: "say unsecured third-party access is their top concern" },
  { end: 63, label: "have already started Zero Trust adoption" },
  { end: 72, label: "are actively transitioning from VPN to Zero Trust" },
  { end: 75, label: "are confident Zero Trust significantly reduces incidents" },
];

export function Research() {
  return (
    <section className="section relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="glow-orb" style={{ width: 460, height: 460, top: -100, right: "10%", background: "rgba(139,92,246,0.1)" }} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          title={
            <>
              What the rest of the market{" "}
              <span className="grad-text">is already doing.</span>
            </>
          }
          subtitle="From our State of Zero Trust Security report, surveying enterprise security leaders in 2023."
        />

        <RevealGrid className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass p-7 text-center">
              <div className="grad-text text-5xl font-bold">
                <AnimatedCounter end={s.end} suffix="%" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {s.label}
              </p>
            </div>
          ))}
        </RevealGrid>

        <Reveal delay={0.2} className="mx-auto mt-12 max-w-3xl text-center">
          <blockquote className="text-balance text-xl font-medium italic leading-relaxed text-[var(--text-primary)] sm:text-2xl">
            &ldquo;In the next 3–5 years, more than 80% of enterprises will adopt Zero Trust
            in some form.&rdquo;
          </blockquote>
          <div className="mt-4 text-sm text-[var(--text-secondary)]">
            — Sandip Panda, CEO, InstaSafe
          </div>
          <div className="mt-8">
            <Button variant="secondary" size="lg">
              Download the Full Report →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
