import { CareersPage } from "@/components/izpages/careers/CareersPage";

import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   grid, then the page sheet. This page carries no shared blocks other
   than the nav and the footer, so the list stays short. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/izfootergrid.css";
import "@/components/izpages/careers/careers.css";

/* SEO-LOCKED. /careers is a live, indexed URL and the title below is
   the one the index already holds — reproduced exactly, which is why
   it uses `title.absolute`. A bare string would go through the root
   layout's `%s | InstaSafe` template and ship as
   "Instasafe Careers | Instasafe Jobs | InstaSafe": three brand
   mentions in one title, and not the string Google has on file.
   The description is the live one, unchanged.

   The scaffold record for this path was removed from lib/site.ts when
   this route landed; leaving it would have put /careers in
   generateStaticParams AND in the static route and collided. */
export const metadata: Metadata = {
  title: { absolute: "Instasafe Careers | Instasafe Jobs" },
  description:
    "Discover InstaSafe: a cybersecurity leader offering innovative solutions for secure access to enterprise applications. Explore our offerings and join our team!",
  alternates: { canonical: "/careers" },
};

/* Carried over from the Gatsby page this replaces, so the breadcrumb
   Google already renders for /careers does not change shape. */
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Homepage",
      item: "https://instasafe.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Careers",
      item: "https://instasafe.com/careers",
    },
  ],
};

/* CareersPage owns the `.iz` wrapper and the theme toggle state (IzNav
   needs both), so this route stays a thin server component around it. */
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <CareersPage />
    </>
  );
}
