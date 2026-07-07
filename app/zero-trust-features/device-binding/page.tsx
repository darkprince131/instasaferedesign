import { Footer } from "@/components/sections/Footer";
import { DeviceBindingContent } from "@/components/v3/device-binding/DeviceBindingContent";
import { DeviceBindingHero } from "@/components/v3/device-binding/DeviceBindingHero";
import { LivingBackground } from "@/components/v3/LivingBackground";
import { NavV3 } from "@/components/v3/NavV3";
import { SectionLine } from "@/components/v3/SectionLine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Device Binding — InstaSafe ZTNA",
  description:
    "Bind access to specific devices by MAC, serial and hardware UUID. Approve a user's machines and unapproved devices are refused — try the interactive console.",
  alternates: { canonical: "/zero-trust-features/device-binding" },
};

export default function DeviceBindingPage() {
  return (
    <>
      <LivingBackground />
      <NavV3 />
      <main className="relative">
        <DeviceBindingHero />
        <SectionLine />
        <DeviceBindingContent />
      </main>
      <Footer />
    </>
  );
}
