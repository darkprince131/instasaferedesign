import { ZtaaPage } from "@/components/izpages/ztaa/ZtaaPage";

import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iz-backdrops.css";
import "@/components/home2/consolerow.css";
import "@/components/home2/chatfaq.css";
import "@/components/home2/ratingbar.css";
import "@/components/home2/izpanel.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/izlogomarquee.css";
import "@/components/home2/izuserportal.css";
import "@/components/home2/izavatar.css";
import "@/components/home2/izminidesktop.css";
import "@/components/home2/featuresplit.css";
import "@/components/izpages/ztaa/ztaasession.css";
import "@/components/home2/featurehub.css";
import "@/components/izpages/ztaa/ztaaproof.css";
import "@/components/home2/izusecase.css";
import "@/components/izpages/pro/sections.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/izoutcomes/illustrations.css";
import "@/components/izanswer/answers.css";
import "@/components/home2/izfootergrid.css";
import "@/components/izpages/ztaa/ztaa.css";

/* SEO-locked: this URL carries the equity of the live page. It was
   previously served from the scaffold registry (lib/site.ts); the
   entry there was removed when this bespoke route landed, so the
   path resolves here instead of through [...slug]. */
export const metadata: Metadata = {
  title: "Zero Trust Application Access (ZTAA) — Agentless Access",
  description:
    "Give employees, contractors and third parties single-click access to web apps, RDP, SSH, VNC, databases and file shares — through the browser, no agent required.",
  alternates: { canonical: "/zero-trust-application-access" },
};

/* ZtaaPage owns the `.iz` wrapper and the theme toggle state (IzNav needs
   both), so this route stays a thin server component around it. */
export default function Page() {
  return <ZtaaPage />;
}
