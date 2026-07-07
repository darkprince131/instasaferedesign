import { BreachSimulator } from "@/components/interactives/breach-simulator/BreachSimulator";
import { Footer } from "@/components/sections/Footer";
import { LivingBackground } from "@/components/v3/LivingBackground";
import { NavV3 } from "@/components/v3/NavV3";
import { SectionLine } from "@/components/v3/SectionLine";
import { ZtnaContent } from "@/components/v3/ztna/ZtnaContent";
import { ZtnaHero } from "@/components/v3/ztna/ZtnaHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zero Trust Network Access (ZTNA) — InstaSafe",
  description:
    "InstaSafe ZTNA replaces the VPN at the network layer: zero inbound ports, app-level access, no lateral movement. Simulate a breach on VPN vs ZTNA and see the difference.",
  alternates: { canonical: "/zero-trust-network-access" },
};

export default function ZtnaPage() {
  return (
    <>
      <LivingBackground />
      <NavV3 />
      <main className="relative">
        <ZtnaHero />

        {/* flagship interactive — self-contained, fits one screen */}
        <section id="breach" className="relative py-14 lg:flex lg:min-h-[90vh] lg:items-center lg:py-10">
          <div className="w-full">
            <BreachSimulator />
          </div>
        </section>

        <SectionLine />
        <ZtnaContent />
      </main>
      <Footer />
    </>
  );
}
