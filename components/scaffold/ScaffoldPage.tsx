import { AnimatedText } from "@/components/v2/AnimatedText";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { LivingBackground } from "@/components/v3/LivingBackground";
import { NavV3 } from "@/components/v3/NavV3";
import { SectionLine } from "@/components/v3/SectionLine";
import type { PageDef, PageKind } from "@/lib/site";
import type { Icon } from "@phosphor-icons/react";
import {
  ArrowRight,
  Buildings,
  ChartLineUp,
  Cube,
  Fingerprint,
  GitBranch,
  GlobeHemisphereEast,
  Lightning,
  PuzzlePiece,
  Scales,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

const KIND_ICON: Record<PageKind, Icon> = {
  platform: ShieldCheck,
  solution: Lightning,
  industry: Buildings,
  compare: Scales,
  resource: Sparkle,
  company: GlobeHemisphereEast,
  integration: PuzzlePiece,
  feature: Cube,
  legal: GitBranch,
};

const KIND_LABEL: Record<PageKind, string> = {
  platform: "Capabilities",
  solution: "What you get",
  industry: "How InstaSafe helps",
  compare: "The difference",
  resource: "Key ideas",
  company: "Highlights",
  integration: "What's enforced",
  feature: "How it works",
  legal: "On this page",
};

/** Fallback capability trios when a page record has no explicit points. */
function fallbackPoints(kind: PageKind): { h: string; p: string; Icon: Icon }[] {
  const base: { h: string; p: string }[] = (() => {
    switch (kind) {
      case "integration":
        return [
          { h: "Identity & MFA", p: "Layer SSO, MFA and directory identity in front of the app." },
          { h: "Device posture", p: "Only trusted, compliant devices reach the application." },
          { h: "Recorded & governed", p: "Contextual access rules with full session logging." },
        ];
      case "compare":
        return [
          { h: "Inbuilt identity stack", p: "MFA, SSO and IdP included — not a bolt-on." },
          { h: "On-premise option", p: "Full-stack deployment in your own data centre." },
          { h: "One console", p: "Network, app, device and session control in a single pane." },
        ];
      case "company":
        return [
          { h: "150+ enterprises", p: "Across BFSI, government, logistics and IT/ITES." },
          { h: "500,000 endpoints", p: "Secured in production across five continents." },
          { h: "Gartner-recognised", p: "Representative Vendor in the ZTNA category." },
        ];
      default:
        return [
          { h: "Privacy First", p: "Traffic goes device-to-app and never routes through our machines." },
          { h: "One platform", p: "ZTNA, identity, MFA, device trust and session recording in one console." },
          { h: "Cloud or on-prem", p: "The same policy engine wherever your data has to live." },
        ];
    }
  })();
  const icons: Icon[] = [Fingerprint, ShieldCheck, ChartLineUp];
  return base.map((b, i) => ({ ...b, Icon: icons[i % icons.length] }));
}

export function ScaffoldPage({ page }: { page: PageDef }) {
  const Lead = KIND_ICON[page.kind];
  const points = page.points?.map((p, i) => ({
    ...p,
    Icon: [Fingerprint, ShieldCheck, ChartLineUp, Cube, GitBranch, Lightning][i % 6] as Icon,
  })) ?? fallbackPoints(page.kind);

  return (
    <>
      <LivingBackground />
      <NavV3 />
      <main className="relative">
        {/* hero */}
        <section className="relative mx-auto flex min-h-[68vh] max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-36 text-center lg:px-8">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--surface-faint)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-blue-light)]">
              <Lead size={15} weight="duotone" />
              {page.eyebrow}
            </div>
          </Reveal>
          <AnimatedText
            as="h1"
            text={page.h1}
            highlight={page.highlight ?? []}
            className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.05]"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {page.sub}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/book-a-demo"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-7 py-3.5 text-base font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]"
              >
                Book a demo
                <ArrowRight weight="bold" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/platform"
                className="rounded-full border border-[var(--border-card)] px-7 py-3.5 text-base font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)] hover:bg-[var(--surface-faint)]"
              >
                Explore the platform
              </a>
            </div>
          </Reveal>
        </section>

        <SectionLine />

        {/* capability grid */}
        <section className="relative mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <Reveal>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue-light)]">
              {KIND_LABEL[page.kind]}
            </div>
            <h2 className="max-w-2xl text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Built on the same InstaSafe policy engine — network, identity, device and session in one place.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {points.map((it, i) => (
              <Reveal key={it.h} delay={i * 0.06} className="flex gap-4">
                <it.Icon size={26} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-blue-light)]" />
                <div>
                  <h3 className="mb-1.5 font-semibold tracking-tight">{it.h}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{it.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* build-status note + CTA band */}
        <section className="relative mx-auto max-w-5xl px-5 pb-28 lg:px-8">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl border p-8 text-center lg:p-14"
              style={{ borderColor: "var(--border-accent)", background: "var(--surface-faint)" }}
            >
              <ShieldCheck size={34} weight="duotone" className="mx-auto text-[var(--accent-green)]" />
              <h2 className="mx-auto mt-5 max-w-2xl text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                See it running against your own apps.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[var(--text-secondary)]">
                A 30-minute walkthrough, tailored to your stack and deployment — cloud, on-premise or hybrid.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="/book-a-demo"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]"
                >
                  Book a demo
                  <ArrowRight weight="bold" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
