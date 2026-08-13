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

/* CANONICAL IS SELF-REFERENTIAL.
   This page IS /blog — the live, indexed URL, kept so the ranking index
   does not move. It used to sit at /resources/blog and concede the
   canonical to Ghost's copy; that made a second URL for the same corpus
   and cost the equity the original path already holds. One URL now, and
   it is the one that was always there.

   Post bodies still live in Ghost and every card links to its Ghost
   post URL (/blog/<slug>) — this route owns the INDEX only. */
export const metadata: Metadata = {
  title: "Blog — Zero Trust Insights & Stories",
  description:
    "Product thinking, threat analysis and migration playbooks from the InstaSafe team — zero trust, ZTNA, MFA and identity, in plain language.",
  alternates: { canonical: "/blog" },
};

export default async function Page() {
  const { posts, tags } = await getBlogIndex();
  return <IzBlogPage posts={posts} tags={tags} />;
}
