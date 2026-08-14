import {
  AppWindow,
  ArrowsClockwise,
  DeviceMobile,
  Devices,
  Fingerprint,
  GlobeSimple,
  Key,
  Lock,
  ShieldCheck,
  SignIn,
  type Icon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

/* ============================================================
   Mega-menu content — the single source of truth for what the
   nav says and where it points.

   ▸ ONE PANE ◂ The bar carries Platform and nothing else. Solutions,
   Why InstaSafe and Resources were removed at the user's direction;
   every destination they held now lives in the footer, which is why
   iz-footer-data.ts is a long list and says so at the top. Nothing
   was orphaned in the move — the three comparison pages and
   /security rank, and losing every link to them would have cost
   real traffic.

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

   Pricing is deliberately absent from the nav — the pricing page
   still exists and is still linked from the footer.
   ============================================================ */

export type MenuKey = "platform";

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
      after — /platform is a built, indexed page. */
  href: string;
  cols: Col[];
  strip: { note: string; links: { label: string; href: string }[] };
};

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
      links: [{ label: "Integrations →", href: "/integrations" }],
    },
  },
];
