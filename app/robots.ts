import type { MetadataRoute } from "next";

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

/* Emitted once at build time — required by `output: "export"`, and true
   of the normal build as well. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  /* THE PREVIEW BUILD REFUSES CRAWLERS. GitLab Pages access control is a
     setting someone has to leave switched on, and if it is ever off, the
     preview is a second complete copy of the site on a different host.
     Belt and braces: the export ships a Disallow-all instead. */
  if (process.env.NEXT_EXPORT === "1") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
