import { ZtnaPage } from "@/components/izpages/ztna/ZtnaPage";

import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iz-backdrops.css";
import "@/components/home2/consolerow.css";
import "@/components/home2/featuresplit.css";
import "@/components/home2/liveactivity.css";
import "@/components/home2/chatfaq.css";
import "@/components/home2/ratingbar.css";
import "@/components/home2/izpanel.css";
import "@/components/home2/izappwindow.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/izlogomarquee.css";
import "@/components/izpages/pro/sections.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/home2/iztunnelcards.css";
import "@/components/home2/izfootergrid.css";
import "@/components/izpages/ztna/ztna.css";

/* SEO-locked: this URL and its metadata carry the equity of the live
   page. Title/description/canonical are byte-identical to the v3
   original; only the rendering below changed. */
export const metadata: Metadata = {
  title: "Zero Trust Network Access (ZTNA) — InstaSafe",
  description:
    "InstaSafe ZTNA replaces the VPN at the network layer: zero inbound ports, app-level access, no lateral movement. Simulate a breach on VPN vs ZTNA and see the difference.",
  alternates: { canonical: "/zero-trust-network-access" },
};

/* ZtnaPage owns the `.iz` wrapper and the theme toggle state (IzNav needs
   both), so this route stays a thin server component around it. */
export default function Page() {
  return <ZtnaPage />;
}
