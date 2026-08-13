import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/site";
import { REDIRECT_SOURCES } from "@/lib/redirects";

const SITE_URL = "https://www.instasafe.com";

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
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  for (const path of BESPOKE) {
    if (seen.has(path)) continue;
    seen.add(path);
    rows.push({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 });
  }

  for (const p of PAGES) {
    if (seen.has(p.path)) continue;
    seen.add(p.path);
    rows.push({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: PRIORITY[p.kind] ?? 0.5,
    });
  }

  return rows;
}
