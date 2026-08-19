import type { Metadata } from "next";
import { getBlogIndex } from "@/lib/ghost";
import { IzBlogPage } from "@/components/izblog/IzBlogPage";

/* .iz design system — order matters: system tokens, then base, then
   grid, then the page sheet. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/izblog/blog.css";
import "@/components/home2/izfootergrid.css";

/* Statically rendered, refreshed hourly. No webhook revalidation in
   this phase — a post published in Ghost appears here within the hour
   and is live on Ghost immediately either way.

   The hour lives on the Ghost fetch itself (`next: { revalidate: 3600 }`
   in lib/ghost.ts), which is what actually drives the refresh. The
   duplicate segment-level `export const revalidate` that used to sit
   here bought nothing and had to be a literal, so it made the whole app
   impossible to `output: "export"` for the private preview build. */

/* CANONICAL IS SELF-REFERENTIAL.
   This page IS /blog — the live, indexed URL, kept so the ranking index
   does not move. It used to sit at /resources/blog and concede the
   canonical to Ghost's copy; that made a second URL for the same corpus
   and cost the equity the original path already holds. One URL now, and
   it is the one that was always there.

   Post bodies still live in Ghost and every card links to its Ghost
   post URL (/blog/<slug>) — this route owns the INDEX only. */
/* THE SOCIAL CARD CANNOT LIVE UNDER /blog/. Every other page uses Next's
   file convention (app/<route>/opengraph-image.png), but Caddy proxies
   `/blog/*` wholesale to the legacy Ghost box, so /blog/opengraph-image.png
   never reaches Next — it reached Ghost, which redirected it and 404'd,
   and the card was dead on the one page that gets shared most. Patching
   the proxy to punch a hole for two filenames would leave the same trap
   armed for the next asset, so the file sits in /public/og/ instead and
   is named here by hand. */
const CARD = "/og/blog.png";
const CARD_ALT =
  "Isometric illustration: an upright article page with an orange caret mid-paragraph, sheets leaning behind it, and ZTNA, MFA and SDP topic chips along the plinth apron.";

export const metadata: Metadata = {
  title: "Blog — Zero Trust Insights & Stories",
  description:
    "Product thinking, threat analysis and migration playbooks from the InstaSafe team — zero trust, ZTNA, MFA and identity, in plain language.",
  alternates: { canonical: "/blog" },
  openGraph: {
    images: [{ url: CARD, width: 1200, height: 630, alt: CARD_ALT }],
  },
  twitter: { card: "summary_large_image", images: [CARD] },
};

export default async function Page() {
  const { posts, tags } = await getBlogIndex();
  return <IzBlogPage posts={posts} tags={tags} />;
}
