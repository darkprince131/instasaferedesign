import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Differentiators } from "@/components/sections/Differentiators";
import { Footer } from "@/components/sections/Footer";
import { Platform } from "@/components/sections/Platform";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Research } from "@/components/sections/Research";
import { SocialProof } from "@/components/sections/SocialProof";
import { DashboardSectionV3 } from "@/components/v3/DashboardSectionV3";
import { FinalV3 } from "@/components/v3/FinalV3";
import { HeroV3 } from "@/components/v3/HeroV3";
import { LivingBackground } from "@/components/v3/LivingBackground";
import { NavV3 } from "@/components/v3/NavV3";
import { SectionLine } from "@/components/v3/SectionLine";
import { ZtArchitecture } from "@/components/v3/ZtArchitecture";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InstaSafe ZTNA — Zero Trust Access in One Console",
  description:
    "An interactive walkthrough of InstaSafe ZTNA: Zero Trust access, live device trust, privileged session control and endpoint management in one console.",
  alternates: { canonical: "/v2" },
  /* The v2 archive index was answering `index, follow` while every
     page UNDER it is noindexed — so the one page that lists them all
     was the crawlable way in. Archives are kept for reference, not
     for search. */
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return (
    <>
      <LivingBackground />
      <NavV3 />
      <main className="relative">
        <HeroV3 />
        <SectionLine />
        <Problem />
        <Platform />
        <ZtArchitecture />
        <DashboardSectionV3 />
        <SectionLine />
        <Differentiators />
        <div id="compare">
          <ComparisonTable />
        </div>
        <Research />
        <SocialProof />
        <Pricing />
        <FinalV3 />
      </main>
      <Footer />
    </>
  );
}
