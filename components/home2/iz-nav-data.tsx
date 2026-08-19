import {
  AppWindow,
  Article,
  Briefcase,
  Compass,
  DeviceMobile,
  Devices,
  Fingerprint,
  ClipboardText,
  Lock,
  Newspaper,
  SignIn,
  Trophy,
  type Icon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { I365Scene, ZtaScene } from "./iz-login-scenes";

/* ============================================================
   Mega-menu content — the single source of truth for what the
   nav says and where it points.

   ▸ TWO KINDS OF NAV ITEM ◂ A pane with `cols` is a mega-menu: the
   label navigates to the hub page and the caret beside it opens the
   panel. A pane WITHOUT `cols` is a plain link and renders no caret
   at all — that is Solutions and Why InstaSafe, which go straight to
   their hub pages. Do not give one an empty `cols: []`; the absence
   of the key is what suppresses the caret.

   ▸ URLS ARE SEO-LOCKED ◂ every href here is an existing, indexed
   instasafe.com URL (or a route already in the page registry).
   Do not "tidy" a path into the newer IA — /vpn-alternative and
   /solutions/vpn-alternative both resolve, but only the first one
   carries the ranking. Two paths are 308-redirected in
   next.config.ts (/platform/ztna, /platform/sso) and must never
   be linked from here; use the canonical destination instead.

   ▸ NOTHING OFF THE SITEMAP GATE ◂ every href below is a path
   `lib/indexable.ts` would advertise — either already indexed or
   SHIPPED. The nav and footer are the strongest internal links the
   site has; pointing them at the placeholder scaffolds would funnel
   every crawl into pages with nothing on them and land a buyer on a
   stub. Scaffolds stay reachable at their URLs and get a nav slot
   the day they are promoted to SHIPPED.
   `lib/scripts/audit-links.mjs` fails the build if this drifts.

   The nav is deliberately narrower than the site. Everything it does
   not carry — the comparison pages, the solution catalogue, pricing,
   careers, contact — is in components/home2/iz-footer-data.ts, which
   both footers render. Pricing is in the footer, not here.
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
  /** Every top-level item is a real page as well as a menu. The label
      navigates there; the caret beside it opens the panel. A trigger
      that only opens a dropdown strands the hub page it is named
      after — all four below are built, indexed pages. */
  href: string;
  /** Omitted entirely for a plain link. See the note at the top. */
  cols?: Col[];
  strip?: { note: string; links: { label: string; href: string }[] };
};

/* ---------- login portals ----------
   The "Log in" dropdown beside Book a demo. Two products, two consoles,
   two END-CUSTOMER destinations — so the cards are deliberately loud
   about which is which: ZTA is orange (the site accent), i365 is purple
   (the other half of the brand mark). Each card carries its own
   isometric scene so the pair reads as different at a glance, before
   anyone reads a word.

   ▸ THE ART IS GENERATED ◂ Both scenes come out of the user's
   gen_portal_scenes.py — a true dimetric projection, every surface a
   --il-* custom property — and components/home2/iz-login-scenes.tsx is
   a mechanical JSX transcription of its output. They are not hand-drawn
   and must not be hand-edited: to change one, change the generator and
   re-convert, or the next export silently reverts the tweak. */

export type LoginPortal = {
  key: string;
  name: string;
  desc: string;
  href: string;
  accent: "orange" | "purple";
  art: ReactNode;
};

export const LOGIN_PORTALS: LoginPortal[] = [
  {
    key: "zta",
    name: "ZTA",
    desc: "Zero Trust Access portal",
    href: "https://app.instasafe.io/",
    accent: "orange",
    art: <ZtaScene />,
  },
  {
    key: "i365",
    name: "i365",
    desc: "InstaSafe 365 portal",
    href: "https://core.instasafe.com/",
    accent: "purple",
    art: <I365Scene />,
  },
];

/* ---------- panes ---------- */

export const PANES: Pane[] = [
  {
    key: "platform",
    label: "Platform",
    href: "/platform",
    cols: [
      {
        kind: "cells",
        head: "Identity & device",
        items: [
          { t: "Multi-Factor Authentication", d: "6 MFA methods including push, TOTP and biometric", href: "/multifactor-authentication", Icon: Fingerprint },
          { t: "Single Sign-On", d: "One login across every app you run", href: "/zero-trust-features/single-sign-on", Icon: SignIn },
          { t: "Device Binding", d: "Every account tied to hardware you have approved", href: "/zero-trust-features/device-binding", Icon: DeviceMobile },
          { t: "Device Posture Check", d: "25 posture checks across 1,500+ OS and device combinations", href: "/zero-trust-features/device-posture-check", Icon: Devices },
        ],
      },
      {
        kind: "cells",
        head: "Zero Trust access",
        items: [
          { t: "Zero Trust Network Access", d: "Users reach the app, never the network behind it", href: "/zero-trust-network-access", Icon: Lock },
          { t: "Zero Trust Application Access", d: "Web, SSH, RDP and thick clients under one policy", href: "/zero-trust-application-access", Icon: AppWindow },
          { t: "Endpoint Controls", d: "What the session allows after access is granted", href: "/platform/endpoint-controls", Icon: ClipboardText },
          { t: "Platform Overview", d: "How the whole console fits together", href: "/platform", Icon: Compass },
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
      links: [{ label: "Integrations →", href: "/integrations" }],
    },
  },

  /* plain links — no panel, no caret */
  { key: "solutions", label: "Solutions", href: "/solutions" },
  { key: "why", label: "Why InstaSafe", href: "/why-instasafe-zero-trust" },

  {
    key: "resources",
    label: "Resources",
    href: "/resource-center",
    cols: [
      {
        kind: "cells",
        head: "Learn",
        items: [
          { t: "Resource Center", d: "Whitepapers, datasheets and webinars", href: "/resource-center", Icon: ClipboardText },
          { t: "Blog", d: "Zero Trust, access and India compliance", href: "/blog", Icon: Article },
        ],
      },
      {
        kind: "cells",
        head: "Company news",
        items: [
          { t: "Awards & Recognition", d: "What juries and analysts have said", href: "/awards", Icon: Trophy },
          { t: "Newsroom", d: "Press, coverage and announcements", href: "/instasafe-newsroom", Icon: Newspaper },
          { t: "Careers", d: "Open roles, straight from our recruiting system", href: "/careers", Icon: Briefcase, tag: "Hiring" },
        ],
      },
    ],
    strip: {
      note: "Zero Trust, explained",
      links: [{ label: "Browse all resources →", href: "/resource-center" }],
    },
  },
];
