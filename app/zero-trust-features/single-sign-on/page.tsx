import { AnimatedText } from "@/components/v2/AnimatedText";
import { Footer } from "@/components/sections/Footer";
import { LivingBackground } from "@/components/v3/LivingBackground";
import { NavV3 } from "@/components/v3/NavV3";
import { SectionLine } from "@/components/v3/SectionLine";
import { SsoFlowchart } from "@/components/v3/sso/SsoFlowchart";
import { SsoHero } from "@/components/v3/sso/SsoHero";
import { SsoProblem } from "@/components/v3/sso/SsoProblem";
import { SsoSolution } from "@/components/v3/sso/SsoSolution";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Single Sign-On (SSO) — InstaSafe ZTNA",
  description:
    "One login, every app, zero password fatigue. SAML 2.0, OAuth and OpenID SSO with desktop SSO, directory sync and device authentication — from $1/user/month.",
  alternates: { canonical: "/zero-trust-features/single-sign-on" },
};

export default function SsoPage() {
  return (
    <>
      <LivingBackground />
      <NavV3 />
      <main className="relative">
        <SsoHero />
        <SectionLine />
        <SsoProblem />
        <SsoSolution />
        <SsoFlowchart />

        {/* CTA */}
        <section id="demo" className="relative overflow-hidden py-28">
          <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
            <AnimatedText as="h2" text="Give your team one door." highlight={["one", "door."]} className="text-balance text-4xl font-bold tracking-tight sm:text-5xl" />
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">
              SSO from $1/user/month, with MFA and device trust layered in at the login. See it on your own apps in 30 minutes.
            </p>
            <div className="mt-9 flex justify-center">
              <a href="/book-a-demo" className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]">
                Book a demo
                <ArrowRight weight="bold" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
