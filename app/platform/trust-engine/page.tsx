import { IzTrustEnginePage } from "@/components/izpages/pro/IzTrustEnginePage";
import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpanel.css";
import "@/components/izanswer/answers.css";
import "@/components/izpages/pro/pro.css";
import "@/components/home2/izfootergrid.css";

/* SEO-LOCKED: /platform/trust-engine is an existing entry in the IA
   (lib/site-ia.ts) and was served by the [...slug] catch-all until now.
   Title and description are carried from that entry unchanged — only the
   rendering below is new — so the URL keeps whatever equity it holds. */
export const metadata: Metadata = {
  title: "The InstaSafe Trust Engine",
  description:
    "21 policy combinations, 12 risk triggers, 4 automatic responses. The decision layer behind every InstaSafe session, explained.",
  alternates: { canonical: "/platform/trust-engine" },
};

export default function Page() {
  return <IzTrustEnginePage />;
}
