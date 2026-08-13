import type { Metadata } from "next";
import { IzAwards } from "@/components/izresources/IzAwards";

/* .iz design system — order matters: system tokens, then base, then
   grid, then the page sheets. This page shares the newsroom's entire
   chassis (hero, chips, count line, book grid), so it imports exactly
   the same sheets and adds none of its own. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/bookcard.css";
import "@/components/izresources/resources.css";
import "@/components/izresources/newsroom.css";
import "@/components/home2/izfootergrid.css";

export const metadata: Metadata = {
  title: "Awards & Recognition — InstaSafe",
  description:
    "InstaSafe's awards and analyst recognition: DSCI Security Product Company of the Year, Deloitte Technology Fast 500 APAC and Fast 50 India, Gartner ZTNA Representative Vendor, G2 High Performer and more.",
  alternates: { canonical: "/awards" },
};

export default function Page() {
  return <IzAwards />;
}
