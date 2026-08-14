/* ============================================================
   Footer link columns — the single source for BOTH footers
   (IzFooterGrid on the homepage, IzFooter everywhere else).

   ▸ THE FOOTER IS NOW THE MAP ◂ The nav was cut back to the
   Platform pane alone, so this is the only site-wide route to
   Solutions, Resources and Company. Everything the removed
   mega-menu panes used to carry lives here — including the three
   comparison pages and /security, which rank and would otherwise
   have been left with nothing linking to them at all.

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
    /* mirrors the Platform mega-menu pane, in its order */
    links: [
      { label: "Identity & Access", href: "/platform/iam" },
      { label: "Multi-Factor Authentication", href: "/multifactor-authentication" },
      { label: "Single Sign-On", href: "/zero-trust-features/single-sign-on" },
      { label: "Device Binding", href: "/zero-trust-features/device-binding" },
      { label: "Device Posture Check", href: "/zero-trust-features/device-posture-check" },
      { label: "Zero Trust Network Access", href: "/zero-trust-network-access" },
      { label: "Zero Trust Application Access", href: "/zero-trust-application-access" },
      { label: "Always-On Connectivity", href: "/zero-trust-features/always-on" },
      { label: "Secure Enterprise Browser", href: "/secure-enterprise-browser" },
      { label: "Privileged Access", href: "/solutions/privileged-access-management" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    head: "Solutions",
    /* everything the Solutions pane carried */
    links: [
      { label: "VPN Alternative", href: "/vpn-alternative" },
      { label: "Secure Remote Access", href: "/secure-remote-access" },
      { label: "Clientless Access", href: "/clientless-remote-access" },
      { label: "VDI & Digital Workspace", href: "/solutions/vdi-secure-digital-workspace" },
      { label: "Domain Joining", href: "/domain-joining" },
      { label: "Cloud Applications", href: "/secure-cloud-applications" },
      { label: "DevOps Access", href: "/secure-devops-access" },
      { label: "Secure VoIP Access", href: "/secure-voip-access" },
      { label: "Data Loss Prevention", href: "/solutions/data-loss-prevention" },
      { label: "Secure Web Gateway", href: "/solutions/instasafe-secure-web-gateway" },
    ],
  },
  {
    head: "Resources",
    /* the Resources pane, plus the four comparison pages and the
       strategy guide that the Why pane used to be the only route to */
    links: [
      { label: "What Is Zero Trust", href: "/what-is-zero-trust" },
      { label: "Glossary", href: "/glossary" },
      { label: "Blog", href: "/blog" },
      { label: "Resource Center", href: "/resource-center" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "State of Zero Trust", href: "/the-state-of-zero-trust-security-2023" },
      { label: "Craft a Zero Trust Strategy", href: "/craft-a-zero-trust-strategy" },
      { label: "Zero Trust vs VPN", href: "/zero-trust-vs-vpn" },
      { label: "vs Zscaler Private Access", href: "/instasafe-zero-trust-vs-zscaler-private-access" },
      { label: "vs Fortinet VPN", href: "/instasafe-zero-trust-vs-fortinet-vpn" },
      { label: "Events & Meetups", href: "https://meetups.instasafe.com/events" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Why InstaSafe", href: "/why-instasafe-zero-trust" },
      { label: "Security & Certifications", href: "/security" },
      { label: "Awards", href: "/awards" },
      { label: "Partners", href: "/partners" },
      { label: "Newsroom", href: "/instasafe-newsroom" },
      { label: "Pricing", href: "/instasafe-zero-trust-pricing" },
      { label: "Careers", href: "/careers", badge: "We're hiring" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Book a Demo", href: "/book-a-demo" },
    ],
  },
];
