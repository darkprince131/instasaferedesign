"use client";

import { AdminDashboard } from "@/components/diagrams/AdminDashboard";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Pulse, Eye, ShieldWarning, UsersThree, type Icon } from "@phosphor-icons/react";

const points: { Icon: Icon; title: string; desc: string }[] = [
  {
    Icon: Pulse,
    title: "Access logs as they happen",
    desc: "Every allowed or denied session, timestamped, with the user, device and app attached.",
  },
  {
    Icon: Eye,
    title: "202 event types",
    desc: "A full audit trail, from login through session end to SIEM export.",
  },
  {
    Icon: UsersThree,
    title: "Cut off a user mid-session",
    desc: "Disconnect anyone in one click from the live users report.",
  },
  {
    Icon: ShieldWarning,
    title: "Risk responds on its own",
    desc: "12 trigger types suspend, deny or alert the moment something looks off.",
  },
];

export function LiveDashboard() {
  return (
    <section className="section relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <TiltCard>
            <AdminDashboard />
          </TiltCard>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              See What&apos;s Happening.{" "}
              <span className="grad-text">Control What Matters.</span>
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-col gap-6">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.08} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-blue)]/12">
                  <p.Icon size={20} weight="duotone" className="text-[var(--accent-blue-light)]" />
                </div>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
