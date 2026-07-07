import { Footer } from "@/components/sections/Footer";
import { IamContent } from "@/components/v3/iam/IamContent";
import { IamHero } from "@/components/v3/iam/IamHero";
import { LivingBackground } from "@/components/v3/LivingBackground";
import { NavV3 } from "@/components/v3/NavV3";
import { SectionLine } from "@/components/v3/SectionLine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Identity & Access Management (IAM) — InstaSafe ZTNA",
  description:
    "InstaSafe's Identity Cloud: 8 authentication profiles, 6 MFA methods, directory sync, SSO, risk-based access — and InstaSafe as your own IdP. Watch identity verified continuously, in real time.",
  alternates: { canonical: "/platform/iam" },
};

export default function IamPage() {
  return (
    <>
      <LivingBackground />
      <NavV3 />
      <main className="relative">
        <IamHero />
        <SectionLine />
        <IamContent />
      </main>
      <Footer />
    </>
  );
}
