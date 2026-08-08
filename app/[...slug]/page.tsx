import { ScaffoldPage } from "@/components/scaffold/ScaffoldPage";

/* .iz design system — order matters: tokens, base, grid, then the
   page-specific sheets. Every SEO route that has no bespoke build yet
   renders through here, so this is where most of the site gets its
   theme. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/izfootergrid.css";
import "@/components/scaffold/scaffold.css";
import { allSlugs, pageBySlug } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allSlugs();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.desc,
    alternates: { canonical: page.path },
  };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = pageBySlug(slug);
  if (!page) notFound();
  return <ScaffoldPage page={page} />;
}
