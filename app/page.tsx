import { Home2 } from "@/components/home2/Home2";
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/capabilities.css";
import "@/components/home2/withwithout.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/izfootergrid.css";
import { izFontVars } from "@/lib/iz-fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InstaSafe ZTNA — Stop Juggling Security Tools. Start Controlling Access.",
  description:
    "InstaSafe ZTNA replaces your VPN, unifies identity and MFA, secures databases and servers, records privileged sessions and protects every endpoint — from one console. From $2/user/month.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className={izFontVars}>
      {/* Hero plate is the LCP element — preload the exact variant the
          first paint will use. SSR renders the paper theme, so that is
          what gets preloaded; a returning dark-theme visitor fetches the
          dark plate after hydration (see the note in IzHeroPortal). */}
      <link rel="preload" as="image" href="/hero/hero-light-desktop.avif" type="image/avif" media="(min-width: 768px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/hero/hero-light-mobile.avif" type="image/avif" media="(max-width: 767px)" fetchPriority="high" />
      <Home2 />
    </div>
  );
}
