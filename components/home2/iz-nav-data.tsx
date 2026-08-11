import {
  AppWindow,
  ArrowsClockwise,
  Article,
  Bank,
  BookOpen,
  Briefcase,
  Buildings,
  CalendarBlank,
  Certificate,
  ChartLineUp,
  ClipboardText,
  Cloud,
  Compass,
  Cpu,
  Desktop,
  DeviceMobile,
  Devices,
  EnvelopeSimple,
  Factory,
  Fingerprint,
  GitBranch,
  GlobeSimple,
  Handshake,
  Heartbeat,
  IdentificationCard,
  Key,
  Laptop,
  Lock,
  Newspaper,
  Path,
  Phone,
  Scales,
  ShieldCheck,
  SignIn,
  Trophy,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

/* ============================================================
   Mega-menu content — the single source of truth for what the
   nav says and where it points.

   ▸ URLS ARE SEO-LOCKED ◂ every href here is an existing, indexed
   instasafe.com URL (or a route already in the page registry).
   Do not "tidy" a path into the newer IA — /vpn-alternative and
   /solutions/vpn-alternative both resolve, but only the first one
   carries the ranking. Two paths are 308-redirected in
   next.config.ts (/platform/ztna, /platform/sso) and must never
   be linked from here; use the canonical destination instead.

   Pricing is deliberately absent from the nav — the pricing page
   still exists and is still linked from the footer.
   ============================================================ */

export type MenuKey = "platform" | "solutions" | "why" | "resources";

export type Cell = {
  t: string;
  d?: string;
  href: string;
  Icon: Icon;
  tag?: string;
  ext?: boolean;
};

export type Col =
  | { kind: "cells"; head: string; items: Cell[] }
  | { kind: "rail"; head: string; items: Cell[] }
  | {
      kind: "stats";
      head: string;
      stats: { n: string; l: string }[];
      note: string;
      cta: { label: string; href: string };
    }
  | {
      kind: "feature";
      head: string;
      href: string;
      title: string;
      desc: string;
      cta: string;
      art: ReactNode;
    };

export type Pane = {
  key: MenuKey;
  label: string;
  cols: Col[];
  strip: { note: string; links: { label: string; href: string }[] };
};

/* ---------- featured-card artwork ---------- */
/* Both are drawn from the same tokens the rest of the site uses, so
   they flip with the theme without a second asset. */

const RegulatoryArt = (
  <svg viewBox="0 0 320 132" aria-hidden="true">
    <defs>
      <pattern id="izmm-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="320" height="132" fill="url(#izmm-grid)" />
    <g fontFamily="var(--mono)" fontSize="10.5" fill="var(--tx-dim)">
      <rect x="24" y="22" width="72" height="24" rx="12" fill="none" stroke="var(--line-strong)" />
      <text x="60" y="38" textAnchor="middle">RBI</text>
      <rect x="106" y="22" width="80" height="24" rx="12" fill="none" stroke="var(--line-strong)" />
      <text x="146" y="38" textAnchor="middle">SEBI</text>
      <rect x="196" y="22" width="84" height="24" rx="12" fill="none" stroke="var(--line-strong)" />
      <text x="238" y="38" textAnchor="middle">IRDAI</text>
      <rect x="24" y="56" width="100" height="24" rx="12" fill="none" stroke="var(--orange)" />
      <text x="74" y="72" textAnchor="middle" fill="var(--orange)">CERT-In</text>
      <rect x="134" y="56" width="92" height="24" rx="12" fill="none" stroke="var(--line-strong)" />
      <text x="180" y="72" textAnchor="middle">DPDP Act</text>
      <rect x="24" y="90" width="120" height="24" rx="12" fill="none" stroke="var(--line-strong)" />
      <text x="84" y="106" textAnchor="middle">Data localisation</text>
    </g>
  </svg>
);

const MigrationArt = (
  <svg viewBox="0 0 320 132" aria-hidden="true">
    <g stroke="var(--line-strong)" fill="none" strokeWidth="1.2">
      <rect x="30" y="26" width="120" height="80" rx="6" />
      <path d="M30 44h120M42 58h58M42 70h74M42 82h44" />
      <rect x="176" y="26" width="114" height="34" rx="6" />
      <rect x="176" y="72" width="114" height="34" rx="6" />
    </g>
    <g stroke="var(--orange)" fill="none" strokeWidth="1.6">
      <path d="M150 66h26" />
      <circle cx="182" cy="43" r="4" />
      <circle cx="182" cy="89" r="4" />
      <path d="M196 43h74M196 89h58" />
    </g>
  </svg>
);

/* ---------- panes ---------- */

export const PANES: Pane[] = [
  {
    key: "platform",
    label: "Platform",
    cols: [
      {
        kind: "cells",
        head: "Identity & device",
        items: [
          { t: "Identity & Access", d: "8 auth profiles, directory sync, SAML and OIDC", href: "/platform/iam", Icon: ShieldCheck },
          { t: "Multi-Factor Authentication", d: "6 MFA methods including push, TOTP and biometric", href: "/multifactor-authentication", Icon: Fingerprint },
          { t: "Single Sign-On", d: "One login across every app you run", href: "/zero-trust-features/single-sign-on", Icon: SignIn },
          { t: "Device Binding", d: "Every account tied to hardware you have approved", href: "/zero-trust-features/device-binding", Icon: DeviceMobile },
          { t: "Device Posture Check", d: "25 posture checks across 1,500+ OS and device combinations", href: "/zero-trust-features/device-posture-check", Icon: Devices },
        ],
      },
      {
        kind: "cells",
        head: "Access & control",
        items: [
          { t: "Zero Trust Network Access", d: "Users reach the app, never the network behind it", href: "/zero-trust-network-access", Icon: Lock },
          { t: "Zero Trust Application Access", d: "Web, SSH, RDP and thick clients under one policy", href: "/zero-trust-application-access", Icon: AppWindow },
          { t: "Always-On Connectivity", d: "The tunnel is up before the user asks for it", href: "/zero-trust-features/always-on", Icon: ArrowsClockwise },
          { t: "Secure Enterprise Browser", d: "Hardened browser with data controls built in", href: "/secure-enterprise-browser", Icon: GlobeSimple },
          { t: "Privileged Access", d: "Session control and recording on every admin path", href: "/solutions/privileged-access-management", Icon: Key },
        ],
      },
      {
        kind: "stats",
        head: "By the numbers",
        stats: [
          { n: "25", l: "Device check types" },
          { n: "144", l: "Named policy rules" },
          { n: "202", l: "Event log types" },
          { n: "1,500+", l: "OS / device combos" },
        ],
        note: "Every control is enumerable. Auditors ask for the list — we publish it.",
        cta: { label: "Platform overview →", href: "/platform" },
      },
    ],
    strip: {
      note: "InstaSafe ZTNA · one platform",
      links: [
        { label: "Data Loss Prevention", href: "/solutions/data-loss-prevention" },
        { label: "Secure Web Gateway", href: "/solutions/instasafe-secure-web-gateway" },
      ],
    },
  },

  {
    key: "solutions",
    label: "Solutions",
    cols: [
      {
        kind: "cells",
        head: "Replace",
        items: [
          { t: "VPN Alternative", d: "Retire the concentrator without re-architecting the network", href: "/vpn-alternative", Icon: ArrowsClockwise },
          { t: "Secure Remote Access", d: "Same policy at the desk, at home and on the road", href: "/secure-remote-access", Icon: Laptop },
          { t: "Clientless Access", d: "Browser-only access for people you do not manage", href: "/clientless-remote-access", Icon: GlobeSimple },
          { t: "VDI & Digital Workspace", d: "Published desktops and apps without the VDI bill", href: "/solutions/vdi-secure-digital-workspace", Icon: Desktop },
          { t: "Domain Joining", d: "Join and manage domains off the corporate LAN", href: "/domain-joining", Icon: Buildings },
        ],
      },
      {
        kind: "cells",
        head: "Secure",
        items: [
          { t: "Third-Party & Vendor Access", d: "Scoped, expiring access for people you do not employ", href: "/solutions/third-party-access", Icon: IdentificationCard },
          { t: "BYOD & Unmanaged Devices", d: "Posture-gated access without owning the endpoint", href: "/solutions/byod", Icon: DeviceMobile },
          { t: "Cloud & SaaS Applications", d: "Private apps and public SaaS under one policy", href: "/secure-cloud-applications", Icon: Cloud },
          { t: "DevOps Access", d: "Governed SSH, RDP and repository paths", href: "/secure-devops-access", Icon: GitBranch },
          { t: "Secure VoIP Access", d: "Latency-safe access for softphone traffic", href: "/secure-voip-access", Icon: Phone },
          { t: "Compliance & Audit", d: "Evidence packs auditors actually accept", href: "/solutions/compliance", Icon: ClipboardText },
        ],
      },
      {
        kind: "rail",
        head: "By industry",
        items: [
          { t: "Banking & BFSI", href: "/industries/banking", Icon: Bank },
          { t: "Fintech", href: "/industries/fintech", Icon: Cpu },
          { t: "NBFC", href: "/industries/nbfc", Icon: Scales },
          { t: "Insurance", href: "/industries/insurance", Icon: Certificate },
          { t: "IT / ITES", href: "/industries/it-ites", Icon: Desktop },
          { t: "Manufacturing", href: "/industries/manufacturing", Icon: Factory },
          { t: "Government & PSU", href: "/industries/government-psu", Icon: Buildings },
          { t: "Healthcare & Pharma", href: "/industries/healthcare-pharma", Icon: Heartbeat },
        ],
      },
    ],
    strip: {
      note: "Same platform · different starting point",
      links: [{ label: "See all solutions →", href: "/solutions" }],
    },
  },

  {
    key: "why",
    label: "Why InstaSafe",
    cols: [
      {
        kind: "cells",
        head: "Compare",
        items: [
          { t: "Zero Trust vs VPN", d: "Where the two models actually differ", href: "/zero-trust-vs-vpn", Icon: Path },
          { t: "vs Zscaler Private Access", d: "Side by side, control by control", href: "/instasafe-zero-trust-vs-zscaler-private-access", Icon: Scales },
          { t: "vs Fortinet VPN", d: "What changes when the appliance goes", href: "/instasafe-zero-trust-vs-fortinet-vpn", Icon: Scales },
          { t: "Craft a Zero Trust Strategy", d: "How to phase a rollout that survives audit", href: "/craft-a-zero-trust-strategy", Icon: Compass },
        ],
      },
      {
        kind: "cells",
        head: "Proof",
        items: [
          { t: "Customer Stories", d: "Named deployments, real scale, real constraints", href: "/case-studies", Icon: UsersThree },
          { t: "Security & Certifications", d: "Our own posture, published", href: "/security", Icon: ShieldCheck },
          { t: "Awards & Recognition", d: "What juries and analysts have said", href: "/awards", Icon: Trophy },
          { t: "Talk to an Engineer", d: "Not an SDR — someone who runs deployments", href: "/contact-us", Icon: EnvelopeSimple },
        ],
      },
      {
        kind: "feature",
        head: "India-regulated by design",
        href: "/security",
        title: "Built for RBI, SEBI and CERT-In scrutiny",
        desc: "Control-by-control mapping to the frameworks your auditor actually cites.",
        cta: "See our security posture →",
        art: RegulatoryArt,
      },
    ],
    strip: {
      note: "Built in Bengaluru · deployed across regulated India",
      links: [{ label: "Why InstaSafe →", href: "/why-instasafe-zero-trust" }],
    },
  },

  {
    key: "resources",
    label: "Resources",
    cols: [
      {
        kind: "cells",
        head: "Learn",
        items: [
          { t: "Blog", d: "Zero Trust, access and India compliance", href: "/blog", Icon: Article },
          { t: "What Is Zero Trust?", d: "The complete guide, no vendor pitch", href: "/what-is-zero-trust", Icon: Compass },
          { t: "Glossary", d: "ZTNA, SDP, SASE — plainly defined", href: "/glossary", Icon: BookOpen },
          { t: "Resource Center", d: "Whitepapers, datasheets and webinars", href: "/resource-center", Icon: ClipboardText },
          { t: "State of Zero Trust", d: "Our survey of Indian enterprise adoption", href: "/the-state-of-zero-trust-security-2023", Icon: ChartLineUp },
        ],
      },
      {
        kind: "cells",
        head: "Company",
        items: [
          { t: "About InstaSafe", d: "Who builds this, and why", href: "/about-us", Icon: UsersThree },
          { t: "Partners", d: "Resellers, MSSPs and integration partners", href: "/partners", Icon: Handshake },
          { t: "Careers", d: "Open roles across engineering and GTM", href: "/careers", Icon: Briefcase, tag: "Hiring" },
          { t: "Newsroom", d: "Press, coverage and announcements", href: "/instasafe-newsroom", Icon: Newspaper },
          { t: "Events & Meetups", d: "Where our engineers are speaking next", href: "https://meetups.instasafe.com/events", Icon: CalendarBlank, ext: true },
          { t: "Contact Us", d: "Reach sales or support directly", href: "/contact-us", Icon: EnvelopeSimple },
        ],
      },
      {
        kind: "feature",
        head: "Featured",
        href: "/vpn-alternative",
        title: "Migrating off a legacy VPN without a maintenance window",
        desc: "The phased cutover pattern we use in regulated environments.",
        cta: "Read the playbook →",
        art: MigrationArt,
      },
    ],
    strip: {
      note: "Zero Trust, explained · updated weekly",
      links: [{ label: "Browse all resources →", href: "/resource-center" }],
    },
  },
];
