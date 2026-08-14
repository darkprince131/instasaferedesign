import { IzPlatformPage } from "@/components/izpages/pro/IzPlatformPage";
import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/izpanel.css";
import "@/components/home2/consolerow.css";
import "@/components/home2/chatfaq.css";
import "@/components/home2/izlogomarquee.css";
import "@/components/home2/izsidenav.css";
import "@/components/izoutcomes/illustrations.css";
import "@/components/izanswer/answers.css";
import "@/components/izpages/pro/pro.css";
import "@/components/izpages/pro/platform.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/izpages/pro/consolelaptop.css";
import "@/components/izpages/pro/trustengine.css";
import "@/components/izpages/pro/mechanismband.css";
import "@/components/home2/izfootergrid.css";
import "@/components/izpages/pro/izplatformhero.css";

/* SEO-locked: /platform already exists as a canonical entry in
   lib/site.ts (kind "platform"), rendered until now through the
   [...slug] catch-all. Title/description are byte-identical to that
   entry — same convention ZtnaPage documents for its own migration —
   so this rebuild doesn't cost the URL its existing SEO equity. Only
   the rendering below is new. */
export const metadata: Metadata = {
  title: "The InstaSafe ZTNA Platform — One Console for Every Access Decision",
  description:
    "InstaSafe unifies ZTNA, identity, MFA, device trust, endpoint control and session recording in a single console — replacing four or five point products. Aligned with NIST SP 800-207 and the CSA Software-Defined Perimeter.",
  alternates: { canonical: "/platform" },
};

export default function Page() {
  return <IzPlatformPage />;
}
