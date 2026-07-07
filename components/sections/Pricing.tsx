"use client";

import { Button } from "@/components/ui/Button";
import { RevealGrid } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check } from "@phosphor-icons/react";

const tiers = [
  {
    name: "SSO",
    price: "$1",
    unit: "/user/mo",
    note: "billed annually",
    features: [
      "SAML / OAuth / OIDC",
      "Desktop SSO",
      "Directory Sync",
      "Device Auth",
      "Password Reset",
      "SIEM Integration",
      "11 Report Types",
    ],
  },
  {
    name: "MFA",
    price: "$1",
    unit: "/user/mo",
    note: "billed annually",
    features: [
      "TOTP",
      "FIDO2 Keys",
      "Push Notification",
      "Biometrics",
      "Passwordless",
      "OS MFA (Windows)",
      "Backup Codes",
    ],
  },
  {
    name: "Zero Trust Platform",
    price: "$2",
    unit: "/user/mo",
    note: "billed annually",
    featured: true,
    features: [
      "25 Device Checks",
      "7 App Types",
      "Session Recording",
      "Agentless Access",
      "7 SIEM Formats",
      "202 Event Types",
      "Endpoint Controls",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section mx-auto max-w-7xl px-5 lg:px-8">
      <SectionHeading
        eyebrow="Pricing"
        title={
          <>
            Enterprise Security.{" "}
            <span className="grad-text">Startup Pricing.</span>
          </>
        }
      />

      <RevealGrid className="mt-14 grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`glass relative flex h-full flex-col p-8 ${
              t.featured
                ? "border-[var(--border-accent)] shadow-[var(--shadow-glow-blue)]"
                : ""
            }`}
          >
            {t.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent-blue)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)]">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">{t.price}</span>
              <span className="text-sm text-[var(--text-secondary)]">{t.unit}</span>
            </div>
            <div className="mt-1 text-xs text-[var(--text-muted)]">({t.note})</div>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-[var(--accent-green)]" />
                  <span className="text-[var(--text-secondary)]">{f}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={t.featured ? "primary" : "secondary"}
              size="lg"
              className="mt-8 w-full"
            >
              Book Demo
            </Button>
          </div>
        ))}
      </RevealGrid>

      <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
        Startup pricing for &lt;50 users. Enterprise pricing: contact sales.
      </p>
    </section>
  );
}
