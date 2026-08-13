import { BindingPage } from "@/components/izpages/binding/BindingPage";

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
import "@/components/izpages/binding/binding.css";
import "@/components/izpages/pro/quickscan.css";

/* SEO-LOCKED: this URL is on the live sitemap and its metadata is
   carried over from the v3 route this replaced, byte for byte. Only
   the rendering below changed. */
export const metadata: Metadata = {
  title: "Device Binding — InstaSafe ZTNA",
  description:
    "Bind access to specific devices by MAC, serial and hardware UUID. Approve a user's machines and unapproved devices are refused — try the interactive console.",
  alternates: { canonical: "/zero-trust-features/device-binding" },
};

export default function Page() {
  return <BindingPage />;
}
