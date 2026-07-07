"use client";

import { ZTFlowDiagram } from "@/components/diagrams/ZTFlowDiagram";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "1",
    title: "Authenticate",
    desc: "User + device verified: 8 auth profiles, 6 MFA methods, 25 device checks run simultaneously.",
  },
  {
    n: "2",
    title: "Access",
    desc: "Encrypted tunnel to only the authorized app (WEB / RDP / SSH / VNC / DB). Server stays invisible.",
  },
  {
    n: "3",
    title: "Monitor",
    desc: "Session recorded, logged across 202 event types, SIEM-exported in real-time.",
  },
];

export function HowItWorks() {
  return (
    <section className="section relative mx-auto max-w-7xl px-5 lg:px-8">
      <SectionHeading
        title={
          <>
            Every request is checked{" "}
            <span className="grad-text">before it connects.</span>
          </>
        }
        subtitle="Authenticate the user and device, open a tunnel to one app, and record the whole session. The server never sees the open internet."
      />

      <Reveal delay={0.15} className="mt-14">
        <ZTFlowDiagram />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={0.2 + i * 0.1} className="glass p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-blue)]/15 text-sm font-bold text-[var(--accent-blue-light)]">
              {s.n}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
