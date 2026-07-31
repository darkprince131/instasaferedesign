"use client";

import { useEffect, useState } from "react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooter } from "@/components/home2/IzFooter";
import { ChatFaq, type QA } from "@/components/home2/ChatFaq";
import { IZ_FX } from "@/components/iz-fx/fx.config";
import { Magnetic } from "@/components/v2/Magnetic";
import { useSectionReveals } from "@/components/home2/useIzMotion";
import { OneLoginRace } from "./OneLoginRace";
import { SsoFlowDiagram } from "./SsoFlowDiagram";
import { PasswordFatigueIz } from "./PasswordFatigueIz";

/* ============================================================
   SsoOrange — v3 of the orange `.iz` SSO pilot page, rebuilt on
   the structural-grid system (izgrid.css) with corrected
   interaction placement:

   - HERO is fully static (no NodalField, no OneLoginRace) — fast,
     LCP/INP-friendly, message carried by copy + a static still-frame
     visual. `.iz-sec--railed` gives it the dashed-rail structure.
   - The ONE signature interactive is PasswordFatigueIz, placed at
     fold 2 where a scroller is already holding the question "why
     does password sprawl actually hurt?"
   - OneLoginRace is demoted to an opt-in teaser — a static stat
     comparison (01:47 vs 0:09) behind a real <button>; the component
     only mounts (and therefore only starts its animation clock) after
     that click. Nothing needed to understand or buy the page requires
     triggering it.
   - Section variants alternate (railed → band → railed → open →
     cells → railed → open → band) so no two adjacent sections read
     the same, per the anti-monotony brief.
   ============================================================ */

type Theme = "dark" | "paper";
type DesignSystem = "orange" | "teal" | "violet" | "blue";

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const HERO_TILES = ["Mail", "CRM", "Jira", "Drive", "ERP", "Chat"];

const PROBLEMS = [
  {
    t: "One reused password = many breached apps",
    d: "Users reuse; attackers know. One leaked password becomes access attempts everywhere.",
  },
  {
    t: "Offboarding by checklist",
    d: "Every leaver means manual revocation across every app. One missed console is a live account owned by someone who no longer works for you.",
  },
  {
    t: "Invisible access",
    d: "Without a central login point, nobody can answer “which apps did this user reach last quarter?” — an audit question that will be asked.",
  },
];

const INCLUDED = [
  { t: "One dashboard", d: "Tiles for provisioned apps only; entitlement is the interface." },
  { t: "Standard protocols", d: "SAML 2.0, OAuth, OpenID Connect — IdP- and SP-initiated. Act as IdP or federate with yours." },
  { t: "MFA at the door", d: "The single login carries the strong factors — 6 methods, per-group profiles." },
  { t: "Device binding", d: "Optionally require an approved device even with perfect credentials." },
  { t: "Instant offboard", d: "One disable action ends portal, apps, and sessions." },
  { t: "Full trail", d: "Login time, result, device, location — logged, reportable, SIEM-exportable." },
];

const INTEGRATIONS = ["O365", "Zoho", "Salesforce", "GitLab", "Atlassian", "Zimbra", "any SAML/OAuth/OIDC app"];

const OUTCOMES = [
  { t: "The password problem shrinks to one", d: "Defend one login properly instead of fifty badly." },
  { t: "Joiner–leaver in minutes", d: "Group membership is provisioning; disabling is offboarding." },
  { t: "Access becomes auditable", d: "Every app login is one line in one log." },
];

const FAQ: QA[] = [
  {
    q: "What is SSO in one sentence?",
    a: "One secure login that all your work applications trust, so users stop juggling passwords and IT gains one control point.",
  },
  {
    q: "Isn't one login a single point of failure?",
    a: "It's a single point of DEFENCE — one door you can afford to armour with MFA, device binding, and risk rules, versus dozens you can't.",
  },
  {
    q: "Which apps work with it?",
    a: "Anything speaking SAML 2.0, OAuth, or OIDC — the large majority of business SaaS — plus named integrations like O365, Zoho, Salesforce, GitLab and Atlassian.",
  },
  {
    q: "Can InstaSafe federate with our existing IdP?",
    a: "Yes — SP mode is fully supported. Keep your IdP; InstaSafe enforces it everywhere it can't reach.",
  },
  {
    q: "What happens when someone leaves?",
    a: "Disable the user once; every SSO-brokered application stops authenticating them immediately, and active sessions end.",
  },
];

export function SsoOrange() {
  const [theme, setTheme] = useState<Theme>("paper");
  const [system, setSystem] = useState<DesignSystem>("orange");
  const [raceStarted, setRaceStarted] = useState(false);

  // theme bootstrap — identical pattern to Home2 (key = is-theme)
  useEffect(() => {
    try {
      const t = (localStorage.getItem("is-theme") as Theme) || "paper";
      setTheme(t === "dark" ? "dark" : "paper");
    } catch {}
  }, []);
  const setT = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("is-theme", t);
    } catch {}
  };

  // design-system bootstrap — identical pattern to Home2 (key = is-system)
  useEffect(() => {
    try {
      const s = localStorage.getItem("is-system") as DesignSystem | null;
      if (s === "orange" || s === "teal" || s === "violet" || s === "blue") setSystem(s);
    } catch {}
  }, []);

  useSectionReveals();

  const scrollToProblem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("password-problem")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="iz" data-theme={theme} data-system={system} data-fx={IZ_FX.backlight ? undefined : "off"}>
      <IzNav theme={theme} onThemeChange={setT} />

      {/* ---------------- HERO — static, no interaction ---------------- */}
      <section className="iz-hero izsso-hero iz-sec--railed">
        <span className="iz-cross iz-cross--tl" aria-hidden="true" />
        <span className="iz-cross iz-cross--tr" aria-hidden="true" />
        <span className="iz-cross iz-cross--bl" aria-hidden="true" />
        <span className="iz-cross iz-cross--br" aria-hidden="true" />
        <div className="iz-wrap izsso-hero-grid">
          <div className="izsso-hero-copy">
            <span className="iz-ey">Single sign-on</span>
            <h1 className="iz-h1">
              Log in <em>once</em>. Get everything you&apos;re allowed.
            </h1>
            <p className="iz-lead">
              One set of credentials, one dashboard, every provisioned application — with MFA and device checks built
              into that single login. From $1 per user per month.
            </p>
            <div className="iz-hero-cta">
              <Magnetic>
                <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                  Book a demo <Arrow />
                </a>
              </Magnetic>
              <a href="#password-problem" className="iz-btn iz-btn-ghost" onClick={scrollToProblem}>
                See how it works ↓
              </a>
            </div>
          </div>
          <div className="izsso-hero-visual">
            <div className="iz-gridcell iz-gridfield izsso-hero-stillframe" aria-hidden="true">
              <div className="izsso-sf-head">
                <span className="olr-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="izsso-sf-url">portal.instasafe.app</span>
              </div>
              <div className="izsso-sf-body">
                <div className="izsso-sf-login">
                  <span className="izsso-sf-field">you@company.com</span>
                  <span className="izsso-sf-field">••••••••</span>
                  <span className="iz-btn iz-btn-pri iz-btn-sm">Sign in</span>
                </div>
                <div className="izsso-sf-tiles">
                  {HERO_TILES.map((n) => (
                    <span key={n} className="izsso-sf-tile">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- THE SIGNATURE — password fatigue (fold 2) ---------------- */}
      <section className="iz-section iz-sec--band" id="password-problem">
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock">
            <span className="iz-ey">The password problem</span>
            <h2 className="iz-h2">
              Password sprawl, <em>felt</em>.
            </h2>
            <p className="iz-lead">Sign in to a few apps the old way — watch the mood drop.</p>
          </div>
        </div>
        <div className="iz-reveal">
          <PasswordFatigueIz />
        </div>
        <div className="iz-wrap">
          <div className="iz-bento iz-reveal iz-block-top">
            {PROBLEMS.map((p, i) => (
              <div key={p.t} className="iz-bento-cell iz-fx-card c-sm">
                <span className="iz-kicker">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW SSO FLOWS ---------------- */}
      <section className="iz-section iz-sec--railed">
        <span className="iz-cross iz-cross--tl" aria-hidden="true" />
        <span className="iz-cross iz-cross--tr" aria-hidden="true" />
        <span className="iz-cross iz-cross--bl" aria-hidden="true" />
        <span className="iz-cross iz-cross--br" aria-hidden="true" />
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock center">
            <span className="iz-ey">How it flows</span>
            <h2 className="iz-h2">
              From your directory to every app — in <em>one token</em>.
            </h2>
          </div>
          <div className="iz-reveal">
            <SsoFlowDiagram />
          </div>
        </div>
      </section>

      {/* ---------------- ONE-LOGIN RACE — opt-in, lazy-mounted ---------------- */}
      <section className="iz-section iz-sec--open">
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock">
            <span className="iz-ey">See it, don&apos;t just read it</span>
            <h2 className="iz-h2">One login beats six, every time.</h2>
            <p className="iz-lead">
              Six app logins, timed side by side — with a password-reset detour thrown in for realism.
            </p>
          </div>
          <div className="iz-reveal">
            {raceStarted ? (
              <OneLoginRace />
            ) : (
              <div className="iz-gridcell izsso-race-still">
                <div className="izsso-race-row">
                  <div className="izsso-race-stat">
                    <span className="izsso-race-label">Without SSO</span>
                    <span className="izsso-race-num deny">01:47</span>
                  </div>
                  <span className="izsso-race-vs">vs</span>
                  <div className="izsso-race-stat">
                    <span className="izsso-race-label">With InstaSafe</span>
                    <span className="izsso-race-num allow">0:09</span>
                  </div>
                </div>
                <button type="button" className="iz-btn iz-btn-pri izsso-race-btn" onClick={() => setRaceStarted(true)}>
                  Watch it run <Arrow />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- WHAT YOU GET ---------------- */}
      <section className="iz-section iz-sec--cells">
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock">
            <span className="iz-ey">What you get</span>
            <h2 className="iz-h2">One dashboard. Every door.</h2>
          </div>
          <div className="iz-reveal iz-cellgrid cols-3">
            {INCLUDED.map((f, i) => (
              <div key={f.t} className="iz-gridcell">
                <span className="iz-kicker">{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
          <div className="izsso-integrations iz-reveal iz-block-top">
            {INTEGRATIONS.map((n) => (
              <span key={n} className="iz-chip">
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- OUTCOMES ---------------- */}
      <section className="iz-section iz-sec--railed">
        <span className="iz-cross iz-cross--tl" aria-hidden="true" />
        <span className="iz-cross iz-cross--tr" aria-hidden="true" />
        <span className="iz-cross iz-cross--bl" aria-hidden="true" />
        <span className="iz-cross iz-cross--br" aria-hidden="true" />
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock">
            <span className="iz-ey">What changes</span>
            <h2 className="iz-h2">Three outcomes.</h2>
          </div>
          <div className="izsso-outcomes iz-reveal">
            {OUTCOMES.map((o, i) => (
              <div key={o.t} className="izsso-outcome">
                <span className="izsso-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="iz-section iz-sec--open">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            eyebrow="FAQ"
            heading={
              <>
                Single sign-on, <em>answered</em>.
              </>
            }
            sub="Tap a question — our assistant answers on the spot. Still curious? A real human is one click away."
            ctaHref="/contact-us"
            ctaLabel="Talk to us"
          />
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="iz-final iz-sec--band">
        <div className="iz-wrap iz-reveal">
          <h2>Give your team one door.</h2>
          <p className="iz-lead izsso-final-sub">
            SSO from $1/user/month, with MFA and device trust layered in at the login. See it on your own apps in 30
            minutes.
          </p>
          <div className="iz-hero-cta">
            <Magnetic>
              <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                Book a demo <Arrow />
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <IzFooter />
    </div>
  );
}
