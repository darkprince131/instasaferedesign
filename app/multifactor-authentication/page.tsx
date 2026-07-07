import { Footer } from "@/components/sections/Footer";
import { LivingBackground } from "@/components/v3/LivingBackground";
import { MfaContent } from "@/components/v3/MfaContent";
import { MfaHero } from "@/components/v3/MfaHero";
import { NavV3 } from "@/components/v3/NavV3";
import { SectionLine } from "@/components/v3/SectionLine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Factor Authentication (MFA) — InstaSafe",
  description:
    "Adaptive multi-factor authentication from InstaSafe: SMS, email, TOTP, push approval, biometrics and FIDO2 hardware keys. Try the interactive login demo — no account needed.",
  alternates: { canonical: "/multifactor-authentication" },
};

export default function MfaPage() {
  return (
    <>
      <LivingBackground />
      <NavV3 />
      <main className="relative">
        <MfaHero />
        <SectionLine />
        <MfaContent />
      </main>
      <Footer />
    </>
  );
}
