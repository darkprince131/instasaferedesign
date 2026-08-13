import type { Metadata } from "next";
import { IzResourceCenter } from "@/components/izresources/IzResourceCenter";

/* .iz design system — order matters: system tokens, then base, then
   grid, then the page sheet. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/bookcard.css";
import "@/components/izresources/resources.css";
import "@/components/home2/izfootergrid.css";

/* /resource-center is the URL the live WordPress page already occupies
   and the one the nav and footer already point at (see iz-nav-data),
   so this route takes it over rather than inventing a sibling. Unlike
   /blog there is no canonical to concede — when this ships,
   the old page is replaced, not duplicated. */
export const metadata: Metadata = {
  title: "Resource Center — Brochures, Whitepapers & Webinars",
  description:
    "Every InstaSafe brochure, datasheet, whitepaper, webinar and product video in one place — Zero Trust access, MFA, identity and VPN migration. No form required.",
  alternates: { canonical: "/resource-center" },
};

/* IzResourceCenter owns the `.iz` wrapper and the theme toggle state
   (IzNav needs both), so this route stays a thin server component
   around it. */
export default function Page() {
  return <IzResourceCenter />;
}
