import { PosturePage } from "@/components/izpages/posture/PosturePage";

import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iz-backdrops.css";
import "@/components/home2/izpanel.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/chatfaq.css";
import "@/components/home2/izlogomarquee.css";
import "@/components/izoutcomes/illustrations.css";
import "@/components/izanswer/answers.css";
import "@/components/izpages/pro/sections.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/home2/izfootergrid.css";
/* order matters: the scenarios run on the 00ao chassis and only
   ship the deltas, so tabswitch.css has to land first */
import "@/components/izpages/pro/tabswitch.css";
import "@/components/izpages/posture/posture.css";
import "@/components/izpages/posture/posturescenarios.css";
import "@/components/izpages/pro/quickscan.css";

/* SEO-locked: this URL is on the live sitemap. Title and description
   are carried over unchanged from its scaffold registry entry, which
   was removed when this bespoke route landed. */
export const metadata: Metadata = {
  title: "Device Posture Check — Verify the Device, Every Time",
  description:
    "Before any connection, InstaSafe ZTNA checks the device against 25 check types and 144 rules across 1,500+ OS combinations — and denies anything that fails.",
  alternates: { canonical: "/zero-trust-features/device-posture-check" },
};

/* PosturePage owns the `.iz` wrapper and the theme toggle state (IzNav
   needs both), so this route stays a thin server component around it. */
export default function Page() {
  return <PosturePage />;
}
