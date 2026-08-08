import { IzSolutionsPage } from "@/components/izpages/solutions/IzSolutionsPage";
import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/izpages/solutions/solutions.css";
import "@/components/izpages/solutions/groupb.css";
import "@/components/izpages/solutions/groupc.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/izpages/solutions/threeoutcomes.css";
import "@/components/home2/izfootergrid.css";

/* SEO-locked: /solutions already exists as a canonical entry in
   lib/site.ts (kind "solution"), rendered until now through the
   [...slug] catch-all. Title/description are byte-identical to that
   entry — the same convention /platform documents for its own
   migration — so this rebuild doesn't cost the URL its existing SEO
   equity. Only the rendering below is new. */
export const metadata: Metadata = {
  title: "Solutions — Zero Trust for Every Access Use Case",
  description:
    "From retiring the VPN to securing remote teams, DevOps, cloud apps and VoIP — InstaSafe ZTNA maps one platform onto every access use case.",
  alternates: { canonical: "/solutions" },
};

export default function Page() {
  return <IzSolutionsPage />;
}
