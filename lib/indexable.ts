/**
 * WHAT GOOGLE IS TOLD ABOUT — the sitemap allow-list.
 *
 * The build serves 135 URLs so that nothing 404s, but only two kinds of
 * page should be ADVERTISED for indexing:
 *
 *   1. ALREADY_INDEXED — the 78 URLs on the live instasafe.com sitemap.
 *      These already rank. Withdrawing one from the sitemap while also
 *      unlinking it is how a page gets forgotten, so every one stays
 *      listed regardless of how finished its new design is.
 *
 *   2. SHIPPED — pages built bespoke for version one. New URLs that did
 *      not exist before and are genuinely finished.
 *
 * Everything else — the brand-new scaffolds that were never live — stays
 * reachable at its URL but is NOT submitted. Publishing dozens of thin
 * placeholder pages during a migration is a domain-wide quality signal,
 * not a per-page one. Promote a path by adding it to SHIPPED the day its
 * content becomes real.
 *
 * Generated from the live sitemap export, 2026-08-15.
 */

/** New URLs finished for version one. Add to this as pages are built. */
export const SHIPPED: ReadonlySet<string> = new Set([
  "/platform",
  "/platform/endpoint-controls",
  "/platform/iam",
  "/platform/trust-engine",
  "/integrations",
  "/zero-trust-features/single-sign-on/login-race",
]);

/** Every path on the live sitemap. Do not remove entries. */
export const ALREADY_INDEXED: ReadonlySet<string> = new Set([
  "/",
  "/about-us",
  "/awards",
  "/blog",
  "/book-a-demo",
  "/careers",
  "/case-studies",
  "/case-studies/Zero-trust-for-ERP-Access",
  "/case-studies/Zero-trust-for-IT-sector",
  "/case-studies/Zero-trust-for-SAP-Access",
  "/case-studies/Zero-trust-for-banking",
  "/case-studies/Zero-trust-for-logistics",
  "/case-studies/Zero-trust-for-real-estate",
  "/clientless-remote-access",
  "/contact-us",
  "/craft-a-zero-trust-strategy",
  "/domain-joining",
  "/glossary",
  "/instasafe-newsroom",
  "/instasafe-on-gem",
  "/instasafe-zero-trust-pricing",
  "/instasafe-zero-trust-vs-fortinet-vpn",
  "/instasafe-zero-trust-vs-zscaler-private-access",
  "/ios-app-terms-of-use",
  "/multifactor-authentication",
  "/partners",
  "/privacy-policy",
  "/resource-center",
  "/secure-cloud-applications",
  "/secure-devops-access",
  "/secure-enterprise-browser",
  "/secure-remote-access",
  "/secure-voip-access",
  "/security",
  "/sitemap",
  "/solutions",
  "/solutions/data-loss-prevention",
  "/solutions/documentation-secure-web-gateway",
  "/solutions/idam-access-control",
  "/solutions/idam-authentication-protocols",
  "/solutions/idam-directory-sync",
  "/solutions/idam-lifecycle-management",
  "/solutions/idam-multi-factor-authentication",
  "/solutions/idam-reporting-and-analytics",
  "/solutions/idam-single-sign-on",
  "/solutions/idam-user-management",
  "/solutions/identity-governance-and-administration",
  "/solutions/instasafe-secure-web-gateway",
  "/solutions/internet-access-control",
  "/solutions/pam-privilege-password-manager",
  "/solutions/pam-privilege-session-manager",
  "/solutions/privileged-access-management",
  "/solutions/secure-access-for-github",
  "/solutions/secure-access-for-gitlab",
  "/solutions/secure-access-for-google-workspace",
  "/solutions/secure-access-for-jira",
  "/solutions/secure-access-for-outlook-web-access",
  "/solutions/secure-access-for-salesforce",
  "/solutions/secure-access-for-zoho",
  "/solutions/securing-access-for-icewarp-email",
  "/solutions/securing-access-for-microsoft-365",
  "/solutions/vdi-desktop-and-application-virtualization",
  "/solutions/vdi-desktop-as-a-service",
  "/solutions/vdi-remote-application-server",
  "/solutions/vdi-secure-digital-workspace",
  "/solutions/website-traffic-filtering",
  "/terms-and-conditions",
  "/the-state-of-zero-trust-security-2023",
  "/vpn-alternative",
  "/what-is-zero-trust",
  "/why-instasafe-zero-trust",
  "/zero-trust-application-access",
  "/zero-trust-features/always-on",
  "/zero-trust-features/device-binding",
  "/zero-trust-features/device-posture-check",
  "/zero-trust-features/single-sign-on",
  "/zero-trust-network-access",
  "/zero-trust-vs-vpn",
]);

/** A path may be advertised if it already ranks, or if we finished it. */
export const isIndexable = (path: string): boolean =>
  ALREADY_INDEXED.has(path) || SHIPPED.has(path);
