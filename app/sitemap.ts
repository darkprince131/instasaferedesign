import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/site";
import { REDIRECT_SOURCES } from "@/lib/redirects";
import { isIndexable } from "@/lib/indexable";

/* APEX, NOT WWW. The live sitemap — the record of what Google actually
   has indexed — lists every URL as https://instasafe.com/..., with no
   www. Canonicals, sitemap <loc>s and the robots Host must name the SAME
   host the index already uses, or every canonical on the site points at
   a hostname the index does not know: if www redirects to apex they all
   point at a redirect and Google is free to pick its own canonical, and
   if both resolve the equity splits across two hosts.

   IF DNS ACTUALLY SERVES www AS PRIMARY, this is the one line to flip —
   but flip it in all three files together (layout.tsx, sitemap.ts,
   robots.ts) or they will disagree. */
const SITE_URL = "https://instasafe.com";

/* TRAILING SLASH, TO MATCH THE CANONICALS. next.config.ts sets
   `trailingSlash: true`, so every page's canonical is
   https://instasafe.com/path/ — and a sitemap that lists /path without
   the slash is publishing a URL that 308s to its own canonical. That is
   the same fault lib/redirects.ts exists to prevent, one level down:
   a sitemap is a list of canonical URLs, not of redirect sources.
   The homepage is the one exception — SITE_URL already ends at the host,
   and `https://instasafe.com/` is what the live sitemap lists. */
const loc = (path: string) => `${SITE_URL}${path}${path.endsWith("/") ? "" : "/"}`;


/* Bespoke-built routes that live as static app routes rather than in the
   page registry. /v2/* archives and the lab pages (/components, /console,
   /flow-preview, /hero-calibrate) are deliberately absent — archives are
   noindexed and the lab is internal tooling. */
const BESPOKE = [
  "/multifactor-authentication",
  "/zero-trust-network-access",
  "/zero-trust-application-access",
  "/zero-trust-features/always-on",
  "/zero-trust-features/device-binding",
  "/zero-trust-features/device-posture-check",
  "/zero-trust-features/single-sign-on",
  "/zero-trust-features/single-sign-on/login-race",
  "/platform",
  "/platform/iam",
  "/solutions",
  "/vpn-alternative",
  "/resource-center",
  "/instasafe-newsroom",
  "/awards",
  /* /blog is the live indexed index, now served by app/blog off the Ghost
     Content API. Individual posts stay on Ghost at /blog/<slug> and are
     not enumerated here. */
  "/blog",
  "/book-a-demo",
  "/why-instasafe-zero-trust",
  "/integrations",
];

const PRIORITY: Record<string, number> = {
  platform: 0.8,
  solution: 0.8,
  compare: 0.7,
  industry: 0.6,
  integration: 0.6,
  resource: 0.6,
  feature: 0.6,
  company: 0.5,
  legal: 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  /* Seeded with the redirect sources as well as "/", so a path that
     answers 308 can never be published as a canonical URL. The page
     registry still carries the old /platform/* paths on purpose — they
     are what the redirects are FROM. */
  const seen = new Set<string>(["/", ...REDIRECT_SOURCES]);

  const rows: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  /* `isIndexable` is the gate: a path is advertised only if it already
     ranks on the live site or if we finished it for version one. The
     other 57 URLs stay live and reachable — they are simply not
     submitted while their content is still a placeholder. */
  for (const path of BESPOKE) {
    if (seen.has(path) || !isIndexable(path)) continue;
    seen.add(path);
    rows.push({ url: loc(path), lastModified: now, changeFrequency: "monthly", priority: 0.9 });
  }

  for (const p of PAGES) {
    if (seen.has(p.path) || !isIndexable(p.path)) continue;
    seen.add(p.path);
    rows.push({
      url: loc(p.path),
      lastModified: now,
      changeFrequency: "monthly",
      priority: PRIORITY[p.kind] ?? 0.5,
    });
  }

  return rows;
}
