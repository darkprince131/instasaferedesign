import type { Metadata } from "next";
import { IzNewsroom } from "@/components/izresources/IzNewsroom";

/* .iz design system — order matters: system tokens, then base, then
   grid, then the page sheets. resources.css carries the hero, chips,
   search and count line this page shares with /resource-center;
   newsroom.css only adds the book grid. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/bookcard.css";
import "@/components/izresources/resources.css";
import "@/components/izresources/newsroom.css";
import "@/components/home2/izfootergrid.css";

/* /instasafe-newsroom is the URL the live site already occupies and the
   one the nav and footer already point at. Its lib/site.ts registry
   entry was removed when this route landed — leaving it there would put
   the same path in the catch-all's generateStaticParams and collide. */
export const metadata: Metadata = {
  title: "Newsroom — InstaSafe in the Press",
  description:
    "Press coverage, interviews, bylines and awards — InstaSafe in the Financial Times, Moneycontrol, Forbes India, CRN, The Quint and more.",
  alternates: { canonical: "/instasafe-newsroom" },
};

export default function Page() {
  return <IzNewsroom />;
}
