"use client";

import { Button } from "@/components/ui/Button";
import { Reveal, RevealGrid } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  ChartLine,
  Cpu,
  Fingerprint,
  Monitor,
  ShieldCheck,
  VideoCamera,
  type Icon,
} from "@phosphor-icons/react";

const cards: { Icon: Icon; title: string; facts: string }[] = [
  {
    Icon: Fingerprint,
    title: "Identity & Auth",
    facts: "8 auth profiles, 6 MFA methods, 3 directory sources. SAML, OIDC, OAuth and RADIUS in one place.",
  },
  {
    Icon: Monitor,
    title: "Secure App Access",
    facts: "7 app types, 8 database drivers, agentless browser access and Windows file shares.",
  },
  {
    Icon: VideoCamera,
    title: "Privileged Sessions",
    facts: "Record, watermark and block copy-paste on RDP, SSH and VNC. Aligned to NIST 800-207.",
  },
  {
    Icon: ShieldCheck,
    title: "Device Trust",
    facts: "25 posture checks across 1,500+ OS combinations, 144 named rules, MDM and EDR signals.",
  },
  {
    Icon: Cpu,
    title: "Endpoint Management",
    facts: "Push software, set geofences, block apps, enforce shift schedules and risk profiles.",
  },
  {
    Icon: ChartLine,
    title: "Analytics & SIEM",
    facts: "7 SIEM formats, 11 report types, 202 event types and scheduled report subscriptions.",
  },
];

export function Platform() {
  return (
    <section id="platform" className="section relative overflow-hidden bg-[var(--bg-primary)]">
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(59,130,246,0.08)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The InstaSafe ZTNA Platform"
          title={
            <>
              One console for every{" "}
              <span className="grad-text">Zero Trust decision.</span>
            </>
          }
          subtitle="Identity, access, devices and audit live in the same place — so there's nothing to stitch together and no gap between tools to fall through."
        />

        <RevealGrid className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <TiltCard key={c.title} className="h-full">
              <div className="glass flex h-full flex-col p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-blue)]/10">
                  <c.Icon size={24} weight="duotone" className="text-[var(--accent-blue-light)]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{c.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{c.facts}</p>
              </div>
            </TiltCard>
          ))}
        </RevealGrid>

        <Reveal delay={0.2} className="mt-12 text-center">
          <Button variant="secondary" size="lg">
            Explore the platform
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
