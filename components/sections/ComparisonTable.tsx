"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, X } from "@phosphor-icons/react";
import { useState } from "react";

type Cell = boolean | "partial";

const features = [
  "Inbuilt MFA (6 methods)",
  "Inbuilt SSO / IdP",
  "RDP / SSH / VNC Access",
  "Database Access (8 drivers)",
  "Session Recording + Watermark",
  "Linux / macOS / iOS Support",
  "On-Premise Deployment",
  "Device Posture (25 checks)",
  "SIEM (7 formats)",
];

const competitors = {
  "vs Zscaler ZPA": {
    name: "Zscaler ZPA",
    price: "Enterprise",
    them: [false, false, false, false, false, false, false, false, false] as Cell[],
  },
  "vs Fortinet VPN": {
    name: "Fortinet",
    price: "Enterprise",
    them: [false, false, false, false, false, false, false, false, "partial"] as Cell[],
  },
  "vs Traditional VPN": {
    name: "Traditional VPN",
    price: "Varies",
    them: [false, false, false, false, false, false, true, false, false] as Cell[],
  },
};

const us: Cell[] = [true, true, true, true, true, true, true, true, true];

function CellIcon({ v }: { v: Cell }) {
  if (v === "partial")
    return <Minus className="mx-auto h-4 w-4 text-[var(--accent-orange)]" />;
  return v ? (
    <Check className="mx-auto h-4 w-4 text-[var(--accent-green)]" />
  ) : (
    <X className="mx-auto h-4 w-4 text-[var(--text-muted)]" />
  );
}

export function ComparisonTable() {
  const tabs = Object.keys(competitors) as (keyof typeof competitors)[];
  const [active, setActive] = useState<keyof typeof competitors>(tabs[0]);
  const comp = competitors[active];

  return (
    <section className="section relative bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Comparison"
          title={
            <>
              InstaSafe vs <span className="grad-text">The Alternatives</span>
            </>
          }
        />

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === t
                  ? "border-[var(--border-accent)] bg-[var(--accent-blue)]/10 text-[var(--accent-blue-light)]"
                  : "border-[var(--border-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {t}
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-8 overflow-hidden">
          <div className="glass overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-[var(--hairline)]">
                  <th className="p-4 text-left font-medium text-[var(--text-secondary)]">
                    Feature
                  </th>
                  <th className="p-4 text-center font-semibold text-[var(--accent-blue-light)]">
                    InstaSafe ZTNA
                  </th>
                  <th className="p-4 text-center font-medium text-[var(--text-secondary)]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={comp.name}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        {comp.name}
                      </motion.span>
                    </AnimatePresence>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={f} className="border-b border-[var(--hairline)] last:border-0">
                    <td className="p-4 text-[var(--text-secondary)]">{f}</td>
                    <td className="bg-[var(--accent-blue)]/[0.04] p-4">
                      <CellIcon v={us[i]} />
                    </td>
                    <td className="p-4">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${active}-${i}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CellIcon v={comp.them[i]} />
                        </motion.div>
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
                {/* The price row is gone: the site does not publish
                    per-user pricing. Scaling is the comparison that
                    actually separates the two architectures. */}
                <tr>
                  <td className="p-4 font-medium">Adding capacity</td>
                  <td className="bg-[var(--accent-blue)]/[0.04] p-4 text-center font-bold text-[var(--accent-green)]">
                    A configuration change
                  </td>
                  <td className="p-4 text-center text-[var(--text-secondary)]">Hardware purchase</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[var(--text-secondary)]">
          Zscaler routes all your traffic through their cloud. Fortinet doesn&apos;t support
          Linux, macOS, or iOS.{" "}
          <span className="text-[var(--text-primary)]">
            InstaSafe gives you more — for less.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
