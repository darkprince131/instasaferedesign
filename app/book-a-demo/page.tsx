import type { Metadata } from "next";
import { IzBookDemo } from "@/components/izdemo/IzBookDemo";

/* .iz design system — order matters: system tokens, then base, then
   grid, then the page sheet. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/izdemo/bookdemo.css";
import "@/components/home2/izfootergrid.css";

/* /book-a-demo is the URL every CTA on the site already points at. Its
   lib/site.ts registry entry was removed when this route landed —
   leaving it there would put the path in the catch-all's
   generateStaticParams as well and collide. */
export const metadata: Metadata = {
  title: "Book a Demo — See InstaSafe ZTNA Against Your Use Case",
  description:
    "Forty-five minutes with a solutions engineer — your applications, your identity stack, your compliance questions. Live product, not a slide deck.",
  alternates: { canonical: "/book-a-demo" },
};

export default function Page() {
  return <IzBookDemo />;
}
