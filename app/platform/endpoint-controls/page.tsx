import { EndpointPage } from "@/components/izpages/endpoint/EndpointPage";

import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. Same list as app/platform/iam, with iam.css
   swapped for endpoint.css. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iz-backdrops.css";
import "@/components/home2/consolerow.css";
import "@/components/home2/liveactivity.css";
import "@/components/home2/chatfaq.css";
import "@/components/home2/ratingbar.css";
import "@/components/home2/izpanel.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/izlogomarquee.css";
import "@/components/home2/filterstream.css";
import "@/components/izpages/pro/sections.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/izoutcomes/illustrations.css";
import "@/components/izanswer/answers.css";
import "@/components/home2/izfootergrid.css";
import "@/components/izpages/endpoint/endpoint.css";

/* Metadata carries over unchanged from the lib/site-ia.ts record this
   route replaced, so nothing that already links here changes meaning. */
export const metadata: Metadata = {
  title: "Endpoint Session Controls",
  description:
    "Clipboard control, watermarking, network and app filters, browser restrictions, inactivity timeout — session-layer DLP for remote access.",
  alternates: { canonical: "/platform/endpoint-controls" },
};

/* EndpointPage owns the `.iz` wrapper and the theme toggle state (IzNav
   needs both), so this route stays a thin server component around it. */
export default function Page() {
  return <EndpointPage />;
}
