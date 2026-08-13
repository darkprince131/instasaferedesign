import { WhyPage } from "@/components/izpages/why/WhyPage";

import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iz-backdrops.css";
import "@/components/home2/chatfaq.css";
import "@/components/home2/izpanel.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/izvpnztna.css";
import "@/components/home2/izlogomarquee.css";
/* the four blocks embedded in the reasons — 00u, 00aj, 00ap, 00ao,
   plus the wall of quotes that closes reason 03 */
import "@/components/home2/convergeflow.css";
import "@/components/home2/izdevband.css";
import "@/components/izpages/pro/splitplane.css";
import "@/components/izpages/pro/sections.css";
import "@/components/izpages/why/whymatrix.css";
import "@/components/home2/izfootergrid.css";
import "@/components/izpages/why/why.css";

/* SEO-locked: this URL is on the live sitemap. Title and description
   are carried over unchanged from the scaffold registry entry, which
   was removed when this bespoke route landed. */
export const metadata: Metadata = {
  title: "Why InstaSafe — More Than Zero Trust",
  description:
    "Six reasons enterprises choose InstaSafe ZTNA over point products and global vendors — starting with an architecture that keeps your traffic out of our infrastructure.",
  alternates: { canonical: "/why-instasafe-zero-trust" },
};

/* WhyPage owns the `.iz` wrapper and the theme toggle state (IzNav
   needs both), so this route stays a thin server component around it. */
export default function Page() {
  return <WhyPage />;
}
