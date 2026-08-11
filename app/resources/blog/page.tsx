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
   and is live on Ghost immediately either way. */
export const revalidate = 3600;

/* CANONICAL POINTS AT GHOST, DELIBERATELY.
   https://instasafe.com/blog/ is the indexed, ranking blog index and it
   still exists. This page renders the same corpus in our design system,
   which makes it a near-duplicate — so it must concede the canonical
   rather than compete for it. Change this only when Ghost's index is
   actually retired. */
export const metadata: Metadata = {
  title: "Blog — Zero Trust Insights & Stories",
  description:
    "Product thinking, threat analysis and migration playbooks from the InstaSafe team — zero trust, ZTNA, MFA and identity, in plain language.",
  alternates: { canonical: "https://instasafe.com/blog/" },
};

export default async function Page() {
  const { posts, tags } = await getBlogIndex();
  return <IzBlogPage posts={posts} tags={tags} />;
}
