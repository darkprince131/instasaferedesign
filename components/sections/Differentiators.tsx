"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Buildings,
  Database,
  Lightning,
  PuzzlePiece,
  ShieldChevron,
  VideoCamera,
  type Icon,
} from "@phosphor-icons/react";

const items: { Icon: Icon; title: string; desc: string }[] = [
  {
    Icon: ShieldChevron,
    title: "Your traffic stays yours",
    desc: "Connections run straight from device to app. Nothing routes through our servers, so there's no third party in the path to trust.",
  },
  {
    Icon: Buildings,
    title: "Runs in your own datacenter",
    desc: "Deploy the full stack on-premise when the cloud isn't an option — built for government, PSUs and regulated industries.",
  },
  {
    Icon: PuzzlePiece,
    title: "Already included",
    desc: "MFA, SSO, identity provider, secure browser, session recording and endpoint controls ship together, not as add-ons.",
  },
  {
    Icon: Lightning,
    title: "Live in days, not quarters",
    desc: "Cloud-native and hardware-free. Covers Windows, Linux, macOS, iOS and Android from day one.",
  },
  {
    Icon: Database,
    title: "Database access without a jump box",
    desc: "8 drivers, governed and logged. No bastion host, no separate jump server to maintain.",
  },
  {
    Icon: VideoCamera,
    title: "Session recording in the access layer",
    desc: "Recording lives inside ZTNA itself — a full playback trail of who did what, on which server.",
  },
];

export function Differentiators() {
  return (
    <section className="section mx-auto max-w-7xl px-5 lg:px-8">
      <SectionHeading
        title={
          <>
            Most Zero Trust stops at the network.{" "}
            <span className="grad-text">We don&apos;t.</span>
          </>
        }
      />
      <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.07} className="flex gap-4">
            <it.Icon
              size={28}
              weight="duotone"
              className="mt-0.5 shrink-0 text-[var(--accent-blue-light)]"
            />
            <div>
              <h3 className="mb-1.5 font-semibold">{it.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
