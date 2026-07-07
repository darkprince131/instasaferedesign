"use client";

import { Reveal, RevealGrid } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Bank, Buildings, GlobeHemisphereWest, Quotes, type Icon } from "@phosphor-icons/react";

const verticals = [
  "Banking & Financial Services",
  "Government & PSU",
  "Logistics",
  "Manufacturing",
  "Real Estate",
  "IT & ITES",
  "Chemicals",
];

const testimonials = [
  {
    quote:
      "It behaves like a natural extension of our own network. No latency complaints, and we scaled it fast.",
    name: "Ranjith P.",
    role: "Chief Manager, ISG & IS Audit",
  },
  {
    quote: "Faster than our old VPN, and far easier for the team to manage day to day.",
    name: "Hariharan S.",
    role: "Vice President",
  },
  {
    quote:
      "The interface is straightforward enough that new staff need almost no training, and it fit our existing setup.",
    name: "Rishu P.",
    role: "Business Development Manager",
  },
];

const caseStudies: { Icon: Icon; title: string; desc: string }[] = [
  {
    Icon: Buildings,
    title: "Government PSU",
    desc: "On-premise across 100K employees and 1.2M agents, scaled to 50K active users.",
  },
  {
    Icon: Bank,
    title: "Leading private bank",
    desc: "BFSI Zero Trust on LDAP, AD, MFA and device posture, end to end.",
  },
  {
    Icon: GlobeHemisphereWest,
    title: "Global BPM operator",
    desc: "VoIP and remote access secured with AES-256 encryption.",
  },
];

export function SocialProof() {
  return (
    <section className="section mx-auto max-w-7xl px-5 lg:px-8">
      <SectionHeading
        title={
          <>
            Built for the teams that{" "}
            <span className="grad-text">can&apos;t afford a breach.</span>
          </>
        }
        subtitle="Banks, government bodies and large operators run InstaSafe across some of India's most regulated environments."
      />

      <div className="mt-12 overflow-hidden border-y border-[var(--border-subtle)] py-5">
        <div className="marquee-track">
          {[...verticals, ...verticals].map((v, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-sm font-medium tracking-wide text-[var(--text-secondary)]"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      <RevealGrid className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="glass flex h-full flex-col p-7">
            <Quotes size={26} weight="fill" className="text-[var(--accent-blue)]/50" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-primary)]">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-[var(--hairline)] pt-4">
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-[var(--text-secondary)]">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </RevealGrid>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {caseStudies.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08} className="flex h-full items-start gap-4 rounded-xl border border-[var(--border-subtle)] p-6">
            <c.Icon size={26} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-blue-light)]" />
            <div>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {c.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
