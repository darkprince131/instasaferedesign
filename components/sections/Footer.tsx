"use client";

import { Logo } from "@/components/brand/Logo";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";

type Link = { label: string; href: string };

const columns: { title: string; links: Link[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Platform Overview", href: "/platform" },
      { label: "ZTNA", href: "/zero-trust-network-access" },
      { label: "Application Access", href: "/zero-trust-application-access" },
      { label: "IAM", href: "/platform/iam" },
      { label: "MFA", href: "/multifactor-authentication" },
      { label: "Single Sign-On", href: "/zero-trust-features/single-sign-on" },
      { label: "Secure Browser", href: "/secure-enterprise-browser" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "VPN Alternative", href: "/vpn-alternative" },
      { label: "Secure Remote Access", href: "/secure-remote-access" },
      { label: "Cloud Applications", href: "/secure-cloud-applications" },
      { label: "DevOps Access", href: "/secure-devops-access" },
      { label: "Domain Joining", href: "/domain-joining" },
      { label: "PAM", href: "/solutions/privileged-access-management" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs Zscaler", href: "/instasafe-zero-trust-vs-zscaler-private-access" },
      { label: "vs Fortinet", href: "/instasafe-zero-trust-vs-fortinet-vpn" },
      { label: "vs VPN", href: "/zero-trust-vs-vpn" },
    ],
  },
  {
    title: "Verticals",
    links: [
      { label: "Banking / BFSI", href: "/case-studies/Zero-trust-for-banking" },
      { label: "IT / ITES", href: "/case-studies/Zero-trust-for-IT-sector" },
      { label: "Logistics", href: "/case-studies/Zero-trust-for-logistics" },
      { label: "Real Estate", href: "/case-studies/Zero-trust-for-real-estate" },
      { label: "SAP Access", href: "/case-studies/Zero-trust-for-SAP-Access" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Awards", href: "/awards" },
      { label: "Newsroom", href: "/instasafe-newsroom" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Research Report", href: "/the-state-of-zero-trust-security-2023" },
      { label: "Resource Center", href: "/resource-center" },
      { label: "Glossary", href: "/glossary" },
      { label: "What is Zero Trust", href: "/what-is-zero-trust" },
    ],
  },
];

const awards = ["Gartner", "Deloitte Fast 50", "DSCI", "G2 High Performer", "NIST 800-207"];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
          <div>
            <Logo height={28} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
              Unified Zero Trust access for the modern enterprise.
            </p>
            <div className="mt-5 space-y-2 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <MapPin size={14} weight="duotone" /> Bengaluru · USA · Germany
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} weight="duotone" /> +91 844 844 8548
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeSimple size={14} weight="duotone" /> sales@instasafe.com
              </div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--hairline)] pt-8 text-xs text-[var(--text-secondary)]">
          {awards.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
          <span>© 2025 InstaSafe Technologies Pvt. Ltd.</span>
          <div className="flex gap-4">
            <a href="/privacy-policy" className="hover:text-[var(--text-secondary)]">
              Privacy
            </a>
            <a href="/terms-and-conditions" className="hover:text-[var(--text-secondary)]">
              Terms
            </a>
            <a href="/security" className="hover:text-[var(--text-secondary)]">
              Responsible Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
