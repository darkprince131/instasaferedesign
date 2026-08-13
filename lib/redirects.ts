/**
 * Permanent redirects — the single source of truth.
 *
 * WHY THIS FILE EXISTS. These pairs were declared only in next.config.ts,
 * while the sitemap was built from the page registry — and the registry
 * still lists the OLD paths. The result was a sitemap publishing
 * /platform/sso and /platform/ztna, both of which answer 308 rather than
 * 200. A sitemap is a list of canonical URLs; putting redirects in it
 * spends crawl budget on hops and invites Google to pick the wrong
 * canonical, which is exactly the SEO equity these redirects were added
 * to protect.
 *
 * next.config.ts turns these into real redirects and app/sitemap.ts
 * filters the sources out, so the two can no longer disagree.
 *
 * Adding a redirect: put it here, nowhere else.
 */

export type Redirect = { source: string; destination: string; permanent: boolean };

export const REDIRECTS: Redirect[] = [
  /* Old build paths → canonical sitemap URLs (SEO-locked). */
  { source: "/platform/ztna", destination: "/zero-trust-network-access", permanent: true },
  { source: "/platform/sso", destination: "/zero-trust-features/single-sign-on", permanent: true },
  { source: "/features/device-binding", destination: "/zero-trust-features/device-binding", permanent: true },
];

/** Paths that must never appear in the sitemap, because they redirect. */
export const REDIRECT_SOURCES: ReadonlySet<string> = new Set(REDIRECTS.map((r) => r.source));
