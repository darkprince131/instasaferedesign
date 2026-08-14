import type { NextConfig } from "next";

import { REDIRECTS } from "./lib/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* EVERY LIVE URL ENDS IN A SLASH. The sitemap of the site currently in
     Google lists 78 URLs and all of them are `/about-us/`, not
     `/about-us`. Next's default (`false`) serves the unslashed form and
     answers 308 for the slashed one — so without this line every single
     indexed URL becomes a redirect hop on the day of the cutover, and
     the canonical form of every page in the index changes.
     A 308 does pass equity, so this is not fatal; it is just 78
     avoidable hops on the highest-value pages the site has. Serving the
     exact URLs Google already holds is strictly safer.

     Do not flip this without re-checking the sitemap: it changes what
     `app/sitemap.ts` emits and what every canonical tag says. */
  trailingSlash: true,
  /* STATIC ART IS NOT REVALIDATED ON EVERY VIEW. Next serves everything
     in public/ with `cache-control: public, max-age=0, must-revalidate`,
     so a returning visitor re-checks ~90 logos, badges and thumbnails on
     every navigation — 90 conditional requests to be told nothing changed.
     These files are not content-hashed, so `immutable` for a year would
     mean a replaced logo stays wrong for a year; 30 days plus
     stale-while-revalidate gets the repeat-view win and still refreshes
     within a release cycle. HTML is untouched — only these extensions. */
  async headers() {
    return [
      {
        source: "/:path*.(svg|png|jpg|jpeg|webp|avif|ico|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
  async redirects() {
    /* Declared in lib/redirects.ts so app/sitemap.ts can exclude the same
       sources. Listing a redirect in the sitemap publishes a 308 as if it
       were a canonical page. */
    return REDIRECTS;
  },
};

export default nextConfig;
