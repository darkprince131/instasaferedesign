"use client";

import { useEffect, useState } from "react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { CATEGORIES, TOTAL, type Integration } from "./integrations.data";

/* ============================================================
   /integrations — the catalogue.

   Built to the shape twingate.com/integrations uses, because for this
   content it is the right shape: categories with a sentence saying
   what the category buys you, then a grid of products with one honest
   line each. A reader arrives looking for one name, and a categorised
   grid is the fastest way to fail or succeed at finding it.

   ▸ WHAT IS OURS RATHER THAN THEIRS ▸
   The categories differ because the products do. InstaSafe does SSO,
   MFA, posture and RADIUS as well as ZTNA, so it has an APPLICATIONS
   category Twingate has no need for; they have a DNS category we do
   not. Every line of copy is written against what the integration
   actually does here.

   ▸ THE JUMP RAIL IS NOT DECORATION ▸
   Seven categories and sixty-odd products is a long page, and the
   whole reason somebody opens it is to find one name. The rail sticks,
   tracks the section in view, and is the difference between a
   catalogue and a scroll.

   ▸ MISSING MARKS ARE MONOGRAMS ▸
   Three products have no logo yet (Okta, ADFS, DNSFilter). They render
   a lettered tile in the same frame rather than a hole, so the grid
   keeps its rhythm until the files arrive.
   ============================================================ */

type Theme = "dark" | "paper";

function monogram(name: string) {
  const words = name.split(/[\s.]+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}

function Card({ item }: { item: Integration }) {
  return (
    <li className="itg-card">
      <span className={item.logo ? "itg-logo" : "itg-logo is-mono"}>
        {item.logo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={item.dark ? "itg-img is-light" : "itg-img"}
              src={`/logos/integrations/${item.logo}`}
              alt=""
              loading="lazy"
              decoding="async"
            />
            {/* Splunk and Elastic ship ink-on-white wordmarks that vanish
                on a dark page; the variant is swapped by CSS rather
                than by JS so it costs no hydration. */}
            {item.dark && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                className="itg-img is-dark"
                src={`/logos/integrations/${item.dark}`}
                alt=""
                loading="lazy"
                decoding="async"
              />
            )}
          </>
        ) : (
          <b aria-hidden="true">{monogram(item.name)}</b>
        )}
      </span>
      <span className="itg-txt">
        <b>{item.name}</b>
        <em>{item.blurb}</em>
      </span>
    </li>
  );
}

export function IntegrationsPage() {
  const [theme, setTheme] = useState<Theme>("paper");
  const [active, setActive] = useState(CATEGORIES[0].id);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("iz-theme");
      if (saved === "dark" || saved === "paper") setTheme(saved);
    } catch {
      /* storage can be blocked; the default is fine */
    }
  }, []);

  const onThemeChange = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("iz-theme", t);
    } catch {
      /* see above */
    }
  };

  /* Which category the reader is actually in. rootMargin pulls the
     trigger line to the top third, so a section counts as "current"
     when its heading reaches reading position rather than when its
     last row finally leaves the screen. */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 }
    );
    CATEGORIES.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="iz" data-theme={theme}>
      <IzNav theme={theme} onThemeChange={onThemeChange} />

      {/* ---------------- hero ---------------- */}
      <section className="itg-hero iz-railed">
        <span className="iz-cross iz-cross--bl" aria-hidden="true" />
        <span className="iz-cross iz-cross--br" aria-hidden="true" />
        <div className="iz-wrap">
          <div className="itg-hero-in">
            <span className="iz-ey">Integrations</span>
            <h1 className="iz-h1">
              Zero Trust that fits <em>the stack you already run</em>.
            </h1>
            <p className="iz-lead">
              InstaSafe sits between your people and your applications — so it has to speak to both ends of what you
              already own. Your directory stays the source of truth, your SIEM keeps receiving the events, and your
              cloud keeps its inbound ports closed.
            </p>
            <ul className="itg-stats">
              <li>
                <b>800+</b>
                <em>SAML, OAuth and OIDC applications</em>
              </li>
              <li>
                <b>{TOTAL}</b>
                <em>named integrations, documented</em>
              </li>
              <li>
                <b>7</b>
                <em>SIEM export formats</em>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- catalogue ---------------- */}
      <section className="itg-body">
        <div className="iz-wrap itg-cols">
          <nav className="itg-rail" aria-label="Integration categories">
            <span className="itg-rail-h">Categories</span>
            {CATEGORIES.map((c) => (
              <a key={c.id} href={`#${c.id}`} className={c.id === active ? "on" : ""}>
                {c.title}
                <i>{c.items.length}</i>
              </a>
            ))}
            <p className="itg-rail-note">
              Not listed? Anything speaking SAML 2.0, OAuth or OpenID Connect works without a named connector.
            </p>
          </nav>

          <div className="itg-cats">
            {CATEGORIES.map((c) => (
              <section className="itg-cat" id={c.id} key={c.id}>
                <div className="itg-cat-h">
                  <h2>{c.title}</h2>
                  <p>{c.lead}</p>
                </div>
                <ul className="itg-grid">
                  {c.items.map((it) => (
                    <Card item={it} key={`${c.id}-${it.name}`} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
