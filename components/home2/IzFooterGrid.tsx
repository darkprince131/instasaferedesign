"use client";

import { Logo } from "@/components/brand/Logo";
import { ConsentTrigger } from "@/components/consent/ConsentTrigger";
import { IzShieldField } from "./IzShieldField";

/* ============================================================
   IzFooterGrid — homepage footer built as a drawn lattice.

   Every link is its own bordered cell, so the footer reads as a
   schematic rather than a list. The brand cell carries the
   deflection field along its baseline: the page ends with the
   product doing its job.

   Homepage only. `IzFooter` stays the footer for every other
   migrated `.iz` page until this is signed off.
   ============================================================ */

type Column = { head: string; links: { label: string; href: string; badge?: string }[] };

const COLUMNS: Column[] = [
  {
    head: "Platform",
    links: [
      { label: "Zero Trust Network Access", href: "/zero-trust-network-access" },
      { label: "Zero Trust Application Access", href: "/zero-trust-application-access" },
      { label: "Identity & Access", href: "/platform/iam" },
      { label: "Multi-Factor Authentication", href: "/multifactor-authentication" },
      { label: "Single Sign-On", href: "/zero-trust-features/single-sign-on" },
      { label: "Secure Enterprise Browser", href: "/secure-enterprise-browser" },
      { label: "Privileged Access", href: "/solutions/privileged-access-management" },
      { label: "Data Loss Prevention", href: "/solutions/data-loss-prevention" },
    ],
  },
  {
    head: "Solutions",
    links: [
      { label: "VPN Alternative", href: "/vpn-alternative" },
      { label: "Secure Remote Access", href: "/secure-remote-access" },
      { label: "Clientless Access", href: "/clientless-remote-access" },
      { label: "DevOps Access", href: "/secure-devops-access" },
      { label: "Cloud Applications", href: "/secure-cloud-applications" },
      { label: "Domain Joining", href: "/domain-joining" },
      { label: "VoIP Access", href: "/secure-voip-access" },
    ],
  },
  {
    head: "Resources",
    links: [
      { label: "What Is Zero Trust", href: "/what-is-zero-trust" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Resource Center", href: "/resource-center" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/instasafe-zero-trust-pricing" },
      { label: "Awards", href: "/awards" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Why InstaSafe", href: "/why-instasafe-zero-trust" },
      { label: "Careers", href: "/careers", badge: "We're hiring" },
      { label: "Partners", href: "/partners" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Book a Demo", href: "/book-a-demo" },
    ],
  },
];

/* Certifications and recognition, as the real marks rather than as
   text. A typed-out "ISO 27001" is a claim; the mark is the thing a
   security buyer scans a footer for and recognises without reading.
   Mixed art (flat SVG wordmarks, round seal rasters) is why each one
   carries its own height — see izfootergrid.css. */
type Badge = { file: string; alt: string; h: number };
const RECOGNITION: Badge[] = [
  { file: "aicpa-soc.webp", alt: "AICPA SOC — Service Organizations", h: 54 },
  { file: "iso-27001.webp", alt: "ISO 27001:2013 certified company", h: 54 },
  { file: "gartner.svg", alt: "Gartner", h: 20 },
  { file: "dsci.png", alt: "DSCI Excellence Awards", h: 56 },
  { file: "deloitte-fast50.png", alt: "Deloitte Technology Fast 50", h: 46 },
  { file: "nist.svg", alt: "NIST", h: 17 },
  { file: "hipaa.webp", alt: "HIPAA", h: 30 },
  { file: "gdpr.webp", alt: "GDPR ready", h: 34 },
];

/* decorative rail — mirrors the measured-drawing rules between blocks */
function Rail() {
  return (
    <div className="izfg-rail" aria-hidden="true">
      <span className="izfg-rail-bar" />
      <span className="izfg-rail-node" />
      <span className="izfg-rail-bar" />
      <span className="izfg-rail-node" />
      <span className="izfg-rail-bar" />
    </div>
  );
}

export function IzFooterGrid() {
  return (
    <footer className="izfg">
      <div className="iz-wrap">
        <p className="izfg-corner">Footer</p>

        <Rail />

        {/* ---- brand cell + proof cells ---- */}
        <div className="izfg-top">
          <div className="izfg-brand">
            <div className="izfg-brand-copy">
              <a href="/" className="iz-mark izfg-mark">
                <Logo height={24} />
                <span className="iz-tag">ZTNA</span>
              </a>
              <p className="izfg-tagline">
                Access that verifies every time. Apps stay invisible to everyone who
                hasn&apos;t been checked.
              </p>
            </div>
            <IzShieldField className="izfg-field" height={188} />
          </div>

          <div className="izfg-proof">
            <div className="izfg-cell izfg-stat">
              <span className="izfg-cell-head">Proven at scale</span>
              <b>500,000+</b>
              <span className="izfg-stat-sub">endpoints secured across 150+ enterprises</span>
            </div>
            <div className="izfg-cell izfg-stat">
              <span className="izfg-cell-head">Built to</span>
              <b>NIST SP 800-207</b>
              <span className="izfg-stat-sub">the Zero Trust architecture standard</span>
            </div>
            {RECOGNITION.map((b) => (
              <div key={b.file} className="izfg-cell izfg-badge">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/compliance/${b.file}`}
                  alt={b.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ ["--izfg-bh" as string]: `${b.h}px` }}
                />
              </div>
            ))}
          </div>
        </div>

        <Rail />

        {/* ---- link columns ----
             These used to be bordered cells, one box per link, which
             turned the navigation into a spreadsheet: every link read
             as a data point of equal weight and the eye had nowhere to
             start. Plain stacked lists under a quiet mono heading is
             the ordinary footer grammar, and it lets the drawn lattice
             above stay the thing that's drawn. */}
        <nav className="izfg-links" aria-label="Footer">
          {COLUMNS.map((col) => (
            <div key={col.head} className="izfg-col">
              <span className="izfg-colhead">{col.head}</span>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="izfg-link">
                      {l.label}
                      {l.badge && <span className="izfg-hiring">{l.badge}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="izfg-base">
          <span>© 2026 InstaSafe Technologies Pvt. Ltd.</span>
          <span className="izfg-base-geo">Bengaluru · USA · Germany</span>
          <ConsentTrigger className="izfg-base-link" />
        </div>
      </div>
    </footer>
  );
}
