"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { end: 25, suffix: "", label: "Device check types" },
  { end: 144, suffix: "", label: "Named policy rules" },
  { end: 202, suffix: "", label: "Event log types" },
  { end: 6, suffix: "", label: "MFA methods" },
];

export function StatBar() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-16 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="grad-text text-4xl font-bold tracking-tight sm:text-5xl">
              <AnimatedCounter end={s.end} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-[var(--text-secondary)]">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
