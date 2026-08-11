"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="section relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,130,246,0.12), transparent)",
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-40" />
      <Reveal className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
          Ready to <span className="grad-text">Retire Your VPN?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-[var(--text-secondary)] sm:text-lg">
          Join the BFSI, government, logistics and IT teams who&apos;ve made
          the switch.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button size="lg">Start Free Trial →</Button>
          <Button variant="secondary" size="lg">
            Schedule Demo
          </Button>
          <Button variant="ghost" size="lg">
            Read Case Studies →
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
