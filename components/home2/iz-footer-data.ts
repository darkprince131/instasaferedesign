/* ============================================================
   Footer link columns — the single source for BOTH footers
   (IzFooterGrid on the homepage, IzFooter everywhere else).

   ▸ THE FOOTER MIRRORS THE NAV, NOTHING MORE ◂ Per the user's
   direction: whatever the nav carries, the footer carries, and the
   extras are gone. Platform is the mega-menu's own list; Resources
   is its four; Solutions and Why InstaSafe are the two plain nav
   links, grouped under Company because a column of one reads as a
   mistake.

   ▸ WHAT THIS COSTS, recorded so it is a decision and not an
   accident. These indexed, ranking pages now have NO internal link
   anywhere on the site: /contact-us, /careers, /about-us,
   /partners, /instasafe-zero-trust-pricing, /case-studies,
   /glossary, /what-is-zero-trust, /the-state-of-zero-trust-security-2023,
   /security, /craft-a-zero-trust-strategy, the three comparison
   pages, and every /solutions/* and secure-*-access detail page.
   They still resolve and stay in the sitemap, so they will not
   404 and are not de-indexed — but an indexed page nothing links
   to loses authority over time. Re-adding any of them is one line
   each here.

   ▸ URLS ARE SEO-LOCKED ◂ every href is a path lib/indexable.ts
   would advertise. `lib/scripts/audit-links.mjs` runs as prebuild
   and fails the build if one drifts outside that gate or points at
   a route that does not exist.
   ============================================================ */

export type FooterLink = { label: string; href: string; badge?: string };
export type FooterColumn = { head: string; links: FooterLink[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    head: "Platform",
    /* the Platform mega-menu pane, in its order, plus the strip link */
    links: [
      { label: "Multi-Factor Authentication", href: "/multifactor-authentication" },
      { label: "Single Sign-On", href: "/zero-trust-features/single-sign-on" },
      { label: "Device Binding", href: "/zero-trust-features/device-binding" },
      { label: "Device Posture Check", href: "/zero-trust-features/device-posture-check" },
      { label: "Zero Trust Network Access", href: "/zero-trust-network-access" },
      { label: "Zero Trust Application Access", href: "/zero-trust-application-access" },
      { label: "Platform Overview", href: "/platform" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    head: "Resources",
    /* the Resources pane, exactly */
    links: [
      { label: "Resource Center", href: "/resource-center" },
      { label: "Blog", href: "/blog" },
      { label: "Awards", href: "/awards" },
      { label: "Newsroom", href: "/instasafe-newsroom" },
    ],
  },
  {
    head: "Company",
    /* the two plain nav links, plus the careers page now that it is a
       real bespoke build with live openings */
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "Why InstaSafe", href: "/why-instasafe-zero-trust" },
      { label: "Careers", href: "/careers", badge: "We're hiring" },
    ],
  },
];
