"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, type Icon } from "@phosphor-icons/react";
import {
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
} from "@phosphor-icons/react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { izFontVars } from "@/lib/iz-fonts";
import type { PageDef, PageKind } from "@/lib/site";

/* ============================================================
   ScaffoldPage — every SEO URL that has not been bespoke-built yet.

   All 51 records in lib/site.ts render through here, so this is the
   page a visitor lands on for most of the site. It is now on the `.iz`
   orange design system — same nav, tokens, rails and footer as the
   built pages — so no URL looks like it belongs to a different
   product while it waits its turn.

   THIS IS A BASE, NOT A PLACEHOLDER. Hero, capability grid and CTA are
   real and finished; building a page "from the inside" means replacing
   the middle with bespoke sections, not rebuilding the shell.

   Theme boilerplate matches IzPlatformPage / ZtnaPage / IzSolutionsPage
   exactly, including the shared `is-theme` storage key, so a visitor
   who picked dark elsewhere keeps it here.
   ============================================================ */

type Theme = "dark" | "paper";

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

/** Fallback capability trios when a page record carries no points. */
function fallbackPoints(kind: PageKind): { h: string; p: string }[] {
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
        { h: "Privacy first", p: "Traffic goes device-to-app and never routes through our machines." },
        { h: "One platform", p: "ZTNA, identity, MFA, device trust and session recording in one console." },
        { h: "Cloud or on-prem", p: "The same policy engine wherever your data has to live." },
      ];
  }
}

const POINT_ICONS: Icon[] = [Fingerprint, ShieldCheck, ChartLineUp, Cube, GitBranch, Lightning];

/** Accents the words listed in `highlight`, matched whole and case-insensitively. */
function Headline({ text, highlight }: { text: string; highlight?: string[] }) {
  if (!highlight?.length) return <>{text}</>;
  const set = new Set(highlight.map((w) => w.toLowerCase().replace(/[.,]$/, "")));
  return (
    <>
      {text.split(/(\s+)/).map((tok, i) => {
        const bare = tok.toLowerCase().replace(/[.,]$/, "");
        return set.has(bare) ? (
          <em key={i} className="izsc-hl">
            {tok}
          </em>
        ) : (
          <span key={i}>{tok}</span>
        );
      })}
    </>
  );
}

export function ScaffoldPage({ page }: { page: PageDef }) {
  const [theme, setTheme] = useState<Theme>("paper");
  useEffect(() => {
    try {
      const t = localStorage.getItem("is-theme");
      setTheme(t === "dark" ? "dark" : "paper");
    } catch {}
  }, []);
  const onThemeChange = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("is-theme", t);
    } catch {}
  };

  const Lead = KIND_ICON[page.kind];
  const points = page.points ?? fallbackPoints(page.kind);

  return (
    <div className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
      <IzNav theme={theme} onThemeChange={onThemeChange} />

      {/* ---------- hero ---------- */}
      <section className="izsc-hero iz-railed">
        <div className="iz-wrap izsc-herowrap">
          <span className="izsc-eyebrow">
            <Lead weight="regular" aria-hidden="true" />
            {page.eyebrow}
          </span>
          <h1 className="izsc-h1">
            <Headline text={page.h1} highlight={page.highlight} />
          </h1>
          <p className="izsc-sub">{page.sub}</p>
          <div className="izsc-cta">
            <a className="izsc-btn izsc-btn--primary" href="/book-a-demo">
              Book a demo
              <ArrowRight weight="bold" aria-hidden="true" />
            </a>
            <a className="izsc-btn" href="/platform">
              Explore the platform
              <ArrowUpRight weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- capability grid ---------- */}
      <section className="izsc-points iz-railed">
        <div className="iz-wrap">
          <div className="izsc-head">
            <span className="izsc-kicker">{KIND_LABEL[page.kind]}</span>
            <h2 className="izsc-h2">
              Built on the same policy engine — network, identity, device and session in{" "}
              <em>one place.</em>
            </h2>
          </div>
          <ul className="izsc-grid">
            {points.map((it, i) => {
              const PointIcon = POINT_ICONS[i % POINT_ICONS.length];
              return (
                <li className="izsc-point" key={it.h}>
                  <span className="izsc-point-ic" aria-hidden="true">
                    <PointIcon weight="regular" />
                  </span>
                  <h3>{it.h}</h3>
                  <p>{it.p}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- closing CTA ---------- */}
      <section className="izsc-close iz-railed">
        <div className="iz-wrap izsc-closewrap">
          <h2 className="izsc-h2">
            See it running against <em>your own apps.</em>
          </h2>
          <p className="izsc-sub">
            A 30-minute walkthrough, tailored to your stack and deployment — cloud, on-premise or hybrid.
          </p>
          <a className="izsc-btn izsc-btn--primary" href="/book-a-demo">
            Book a demo
            <ArrowRight weight="bold" aria-hidden="true" />
          </a>
        </div>
      </section>

      <IzFooterGrid />
    </div>
  );
}
