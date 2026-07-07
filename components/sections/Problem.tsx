"use client";

import { Reveal, RevealGrid } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Broadcast, Eye, GlobeHemisphereWest, LockKeyOpen } from "@phosphor-icons/react";

const problems = [
  {
    Icon: LockKeyOpen,
    title: "Network-wide trust",
    desc: "A VPN hands the whole network to anyone who logs in. One stolen credential, and an attacker moves sideways into everything.",
  },
  {
    Icon: GlobeHemisphereWest,
    title: "Ports left open",
    desc: "Public-facing gateways are easy to find and probe. If a port answers, someone is already scanning it.",
  },
  {
    Icon: Broadcast,
    title: "Traffic detours",
    desc: "Backhauling every connection through a datacenter adds latency your remote teams feel on every request.",
  },
  {
    Icon: Eye,
    title: "No clear record",
    desc: "Without per-user, per-app, per-device logs, you can't answer who reached what. You can't protect what you can't see.",
  },
];

export function Problem() {
  return (
    <section className="section relative mx-auto max-w-7xl px-5 lg:px-8">
      <SectionHeading
        title={
          <>
            Your VPN was built for 2005.{" "}
            <span className="grad-text">Your attackers weren&apos;t.</span>
          </>
        }
        subtitle="The flat network that made remote access simple is the same thing that turns one breach into a company-wide incident."
      />

      <RevealGrid className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--border-card)] bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((p) => (
          <div key={p.title} className="flex h-full flex-col bg-[var(--bg-card)] p-7">
            <p.Icon size={26} weight="duotone" className="text-[var(--accent-blue-light)]" />
            <h3 className="mb-2 mt-5 text-base font-semibold">{p.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{p.desc}</p>
          </div>
        ))}
      </RevealGrid>

      <Reveal delay={0.2} className="mt-8 text-center text-sm text-[var(--text-muted)]">
        72% of enterprises are already moving off VPNs toward Zero Trust.
        <span className="text-[var(--text-secondary)]">
          {" "}
          — InstaSafe State of Zero Trust Security, 2023
        </span>
      </Reveal>
    </section>
  );
}
