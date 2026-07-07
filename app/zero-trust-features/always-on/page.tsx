import { Footer } from "@/components/sections/Footer";
import { AlwaysOnContent } from "@/components/v3/always-on/AlwaysOnContent";
import { AlwaysOnHero } from "@/components/v3/always-on/AlwaysOnHero";
import { LivingBackground } from "@/components/v3/LivingBackground";
import { NavV3 } from "@/components/v3/NavV3";
import { SectionLine } from "@/components/v3/SectionLine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Always-On Verification — Zero Trust Features | InstaSafe",
  description:
    "Even a stolen, unlocked laptop stays locked down. Try the interactive desktop: InstaSafe runs, the codebase and database are denied, and only InstaSafe URLs resolve in the browser — continuous Zero Trust on every request.",
  alternates: { canonical: "/zero-trust-features/always-on" },
};

export default function AlwaysOnPage() {
  return (
    <>
      <LivingBackground />
      <NavV3 />
      <main className="relative">
        <AlwaysOnHero />
        <SectionLine />
        <div id="content">
          <AlwaysOnContent />
        </div>
      </main>
      <Footer />
    </>
  );
}
