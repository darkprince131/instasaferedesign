"use client";

import { useEffect, useState } from "react";

import { ChatFaq } from "@/components/home2/ChatFaq";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzLogoMarquee } from "@/components/home2/IzLogoMarquee";
import { IzNav } from "@/components/home2/IzNav";
import { Magnetic } from "@/components/v2/Magnetic";
import { izFontVars } from "@/lib/iz-fonts";

import { WhyCompare, WhyProof } from "./WhyScenes";

/* ============================================================
   /why-instasafe-zero-trust — SEO-locked live URL, promoted from the
   scaffold registry to a bespoke route.

   SCOPE: hero and FAQ only, as asked. The rest of the page is being
   written separately, so nothing else is built here.
   ============================================================ */

const FAQ = [
  {
    q: "What does “we're not in your data path” actually mean?",
    a: "Your users connect straight to your applications. Our control plane issues the policy decision, the authentication and the telemetry — it never carries the traffic. Most Zero Trust vendors terminate your sessions on their own infrastructure, which means decrypting and re-encrypting your data to inspect it. We architected that step out.",
  },
  {
    q: "If you never see the traffic, how do you enforce anything?",
    a: "Enforcement happens at the endpoint and the gateway, both of which you run. The control plane decides whether a session may open and on what terms; the session itself is between your user and your application. Policy does not require possession of the data.",
  },
  {
    q: "How is that different from a global vendor's PoP model?",
    a: "A PoP model routes you to the vendor's nearest point of presence, inspects there, then forwards you on. That adds a hop, adds latency, and puts your plaintext on someone else's machine in someone else's jurisdiction. Ours adds no hop, because there is nothing in between to hop through.",
  },
  {
    q: "Can we run this entirely on our own infrastructure?",
    a: "Yes. The platform deploys in public cloud, in your own data centre, or air-gapped — which is usually the deciding factor for regulated and sovereignty-bound environments.",
  },
  {
    q: "What do we give up by not having inspection in the middle?",
    a: "Nothing you were relying on us for. Session controls — recording, watermarking, clipboard and download policy — run inside the session at the endpoint, so privileged activity is still governed and still evidenced. What you lose is the vendor holding a decrypted copy of your traffic.",
  },
  {
    q: "Why should we believe the numbers on this page?",
    a: "Because they are the kind that can be checked. Added latency, hops and proxied data are architectural consequences, not benchmarks — if we are not in the path, there is nothing to measure. Ask us for the same figures from anyone else you are evaluating; that comparison is the point.",
  },
];

type Theme = "dark" | "paper";

export function WhyPage() {
  /* theme is page-scoped and shares Home2's storage key, so a visitor who
     picked dark on the homepage keeps it here */
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

  return (
    <div className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
      <IzNav theme={theme} onThemeChange={onThemeChange} />

      {/* ---------------- HERO ---------------- */}
      <header className="why-hero">
        <div className="iz-wrap why-hero-in">
          <div className="why-hero-copy">
            <span className="iz-ey">Why InstaSafe</span>
            <h1 className="iz-h1">
              Security that doesn&apos;t route through the <em>vendor.</em>
            </h1>
            <span className="why-rule" aria-hidden="true" />
            <p className="iz-lead">
              Most Zero Trust vendors inspect your traffic on their infrastructure. We architected ourselves out of your
              data path — and publish the numbers others keep vague.
            </p>
            <div className="why-hero-cta">
              <Magnetic>
                <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                  Book a demo
                </a>
              </Magnetic>
              <a href="#faq" className="iz-btn iz-btn-ghost">
                See the architecture ↓
              </a>
            </div>
          </div>
          <div className="why-hero-visual">
            <WhyCompare />
          </div>
        </div>

        <div className="iz-wrap">
          <WhyProof />
        </div>
      </header>

      <IzLogoMarquee />

      {/* ---------------- FAQ ---------------- */}
      <section className="why-sec" id="faq">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            heading={<>The questions that <em>decide it</em>.</>}
            sub="Tap a question — or open them all and read straight through."
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
