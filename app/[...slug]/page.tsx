import { ScaffoldPage } from "@/components/scaffold/ScaffoldPage";
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
