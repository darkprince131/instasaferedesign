"use client";

import { useEffect, useState } from "react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooter } from "@/components/home2/IzFooter";
import { ChatFaq, type QA } from "@/components/home2/ChatFaq";
import { IZ_FX } from "@/components/iz-fx/fx.config";
import { Magnetic } from "@/components/v2/Magnetic";
import { useSectionReveals } from "@/components/home2/useIzMotion";
import { ListChecks, LockKey, UsersThree } from "@phosphor-icons/react";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { AnswerSso } from "@/components/izanswer/AnswerSso";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { SsoLogin } from "@/components/izoutcomes/artifacts/SsoLogin";
import { SsoWindowStack } from "@/components/izpages/sso/SsoWindowStack";
import { SsoProtocolSlider } from "@/components/izpages/sso/SsoProtocolSlider";
import { IzAgentCards } from "@/components/izpages/pro/IzAgentCards";
import { AggregateStack } from "@/components/home2/AggregateStack";
import { IzIntegrationGrid } from "@/components/home2/IzIntegrationGrid";
import type { AgentCard } from "@/components/izpages/pro/sections.config";
import { SsoFlowDiagram } from "./SsoFlowDiagram";
import { PasswordFatigueIz } from "./PasswordFatigueIz";
import { SsoHeroCells, SsoHeroScene } from "./SsoScenes";

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
   - OneLoginRace has moved to its own page. What is left here is the
     still frame — 01:47 vs 0:09 — and a link. Nothing needed to
     understand or buy this page runs an animation clock.
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

/* The three control claims, as animated cards on the 00an shell.
   Tone is not decoration — it is the verdict each mock reaches, and
   the wash under the card is tinted to match it. */
const SSO_CARDS: AgentCard[] = [
  {
    id: "mfa",
    title: ["MFA at the door,", "not a second door"],
    body: "The single login carries the strong factors — 6 methods, and which ones are required is decided by the group.",
    mock: "mfa",
    tone: "allow",
    aria:
      "A sign-in that collects multi-factor authentication on the same screen, with the required factors chosen by the group the user belongs to.",
  },
  {
    id: "bind",
    title: ["The password was right.", "The laptop was not."],
    body: "Optionally require an approved device even with perfect credentials.",
    mock: "bind",
    tone: "deny",
    aria: "A sign-in with valid credentials refused because the device is not bound to the user.",
  },
  {
    id: "offboard",
    title: ["One revoke,", "everything goes dark"],
    body: "One action removes a leaver from every application, every device and every session already open.",
    mock: "offboard",
    tone: "warn",
    fade: true,
    aria:
      "An administrator revoking access once, removing four applications and closing two live sessions immediately.",
  },
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

  const scrollToRace = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("race")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
            {/* "Get everything" is held together: left to the column it
                broke as "Get / everything you're allowed." */}
            <h1 className="iz-h1">
              Log in once.{" "}
              <span style={{ whiteSpace: "nowrap" }}>Get everything</span> you&apos;re <em>allowed</em>.
            </h1>
            <p className="iz-lead">
              One set of credentials, one dashboard, every provisioned application — with MFA and device checks built
              into that single login.
            </p>
            <div className="iz-hero-cta">
              <Magnetic>
                <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                  Book a demo <Arrow />
                </a>
              </Magnetic>
              {/* points at the race, which is the thing worth watching —
                  the old target was the copy section above it */}
              <a href="#race" className="iz-btn iz-btn-ghost" onClick={scrollToRace}>
                Watch the race ↓
              </a>
            </div>
          </div>
          <div className="izsso-hero-visual">
            <SsoHeroScene />
          </div>
        </div>
      </section>

      {/* the four claims the hero picture makes, stated plainly */}
      <SsoHeroCells />

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="iz-section iz-sec--open" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="Single sign-on"
            heading="What is SSO?"
            question="One login session,"
            emphasis="honoured"
            questionTail="by many applications."
            answer="Instead of a password per app — remembered, reused, written down, phished — the user authenticates once to an identity provider, which then vouches for them to each application using a cryptographic assertion, most commonly SAML."
            points={[
              {
                title: "Security",
                body: "One strongly-defended login, with MFA on it, replaces dozens of weak ones. Password reuse stops mattering because there is only one password left to reuse.",
              },
              {
                title: "Operations",
                body: "Onboarding is “add to group”. Offboarding is “disable user” — not a checklist of fifteen admin consoles, each of which someone has to remember exists.",
              },
              {
                title: "Experience",
                body: "People stop burning minutes and helpdesk tickets on forgotten passwords. The security improvement and the convenience improvement are the same change.",
              },
              {
                title: "Visibility",
                body: "When every login flows through one point, “who accessed what, when, from where” becomes a report instead of an investigation.",
              },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "Identity & Access", href: "/platform/iam" },
            ]}
            long={[
              "Single Sign-On means one login session, honoured by many applications. The user signs in to the identity provider; every application afterwards asks the provider whether this person is who they claim to be, and trusts the answer rather than asking for a password of its own.",
              "The under-appreciated fourth improvement is visibility. Fifty applications with fifty login pages produce fifty logs nobody joins up. One provider in front of all of them produces one, and the audit question stops being an investigation.",
            ]}
            slot={{ kind: "art", art: AnswerSso }}
            stats={[
              { n: "1", label: "login to defend" },
              { n: "1", label: "action to offboard" },
              { n: "3", label: "protocols — SAML, OAuth, OIDC" },
            ]}
          />
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
      <section className="iz-section iz-sec--open" id="race">
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock">
            <span className="iz-ey">See it, don&apos;t just read it</span>
            <h2 className="iz-h2">One login beats six, every time.</h2>
            <p className="iz-lead">
              Six app logins, timed side by side — with a password-reset detour thrown in for realism.
            </p>
          </div>
          {/* THE RACE MOVED OUT (2026-08-14).

              It used to mount here behind a "Watch it run" button. The
              button was the right call — a 13-second looping animation
              does not belong unasked on the page that has to explain
              SSO in the first fold — but "behind a button, on a page
              about something else" is a bad home for the one asset here
              somebody might actually send a colleague. It has its own
              page now, and this stays as the still frame that earns the
              click: the two numbers, and nothing moving. */}
          <div className="iz-reveal">
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
              <a
                className="iz-btn iz-btn-pri izsso-race-btn"
                href="/zero-trust-features/single-sign-on/login-race"
              >
                Watch it run <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WHAT SSO INCLUDES ----------------
          This was a grid of six equal cells, which made "SAML 2.0,
          OAuth, OpenID Connect" exactly as prominent as "one
          dashboard" — and the protocol line is the most load-bearing
          fact on the page for the reader who is actually evaluating.
          The six are now shown at the size each deserves: protocols
          as a track you can find your own entry in, the three control
          claims as animated cards that show the beat rather than
          asserting it, and the trail as the aggregate deck. "One
          dashboard" is the window stack immediately below. */}
      <section className="iz-section iz-sec--cells" id="included">
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock">
            <span className="iz-ey">What you get</span>
            <h2 className="iz-h2">What SSO includes.</h2>
            <p className="iz-lead">
              One login is the surface. Underneath it are the protocols your estate already speaks, the checks that
              login carries, and the record it leaves behind.
            </p>
          </div>
          <div className="iz-reveal iz-block-top">
            <SsoProtocolSlider />
          </div>
        </div>
      </section>

      {/* ---------------- THE THREE CONTROL CLAIMS (00an) ----------------
          MFA, device binding and offboarding are each a claim that is
          easy to write and hard to believe, so each one gets the
          hover-played mock instead of a sentence. The washes are not
          decoration: mint says something was verified, pink says
          something was refused, peach says the product is acting. */}
      <IzAgentCards
        className="izsso-cards"
        items={SSO_CARDS}
        head={
          <>
            <h2 className="izac-title">
              The single login carries the <mark>strong factors</mark>.
            </h2>
            <p className="izac-sub">
              Hover any card to watch it happen. Nothing here needs a second portal, a second password, or a ticket
              queue.
            </p>
          </>
        }
      />

      {/* ---------------- FULL TRAIL ----------------
          Deliberately NOT the live activity feed (00l). A streaming
          event list already appears elsewhere in the system and a
          second one here would read as the same component twice. The
          claim on this page is not "watch it happen live", it is
          "it was all written down and you can report on it" — which
          is what the aggregate deck says. */}
      <section className="iz-section iz-sec--open" id="full-trail">
        <div className="iz-wrap">
          {/* Two columns, because the deck is a fixed 560px card and a
              1200px wrap left it stranded against 640px of nothing. */}
          <div className="izsso-trail iz-reveal">
            <div className="iz-headblock">
              <span className="iz-ey">Full trail</span>
              <h2 className="iz-h2">
                Login time, result, device, location — <em>written down</em>.
              </h2>
              <p className="iz-lead">
                Every authentication through the portal is an event, and every event rolls up. Reportable in the
                console, exportable to your SIEM in the format it already ingests.
              </p>
              <ul className="izsso-trailfacts">
                <li>Who signed in, from which device, in which country</li>
                <li>What was allowed, what was refused, and on which rule</li>
                <li>Which applications a person actually opened last quarter</li>
              </ul>
            </div>
            <AggregateStack href="/solutions/idam-reporting-and-analytics" />
          </div>
        </div>
      </section>

      {/* ---------------- ONE DASHBOARD — the window stack (00ai) ----------------
          The page has already said "one login" in words, in a flow
          diagram and in a stopwatch. This is the same claim shown as
          what it actually looks like on a screen: three login screens
          looping through forgot-password, or one portal where the only
          password of the day was typed at 08:59. */}
      <section className="iz-section iz-sec--railed" id="one-dashboard">
        <span className="iz-cross iz-cross--tl" aria-hidden="true" />
        <span className="iz-cross iz-cross--tr" aria-hidden="true" />
        <span className="iz-cross iz-cross--bl" aria-hidden="true" />
        <span className="iz-cross iz-cross--br" aria-hidden="true" />
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock">
            <span className="iz-ey">One dashboard</span>
            <h2 className="iz-h2">
              Every door your role opens — behind <em>one</em> of them.
            </h2>
            <p className="iz-lead">
              Flip the switch to watch the same person work without it: three apps, three sign-ins, and a reset
              link somewhere in every one of them.
            </p>
          </div>
          <div className="iz-reveal">
            <SsoWindowStack />
          </div>
        </div>
      </section>

      {/* ---------------- WHICH APPLICATIONS ----------------
          The homepage SSO wall, reused. Same marquee of real logos,
          but the question above it changes: the homepage asks "what is
          SSO", and a reader who has got this far already knows. What
          they want now is whether their own application is on the
          list, so the copy answers that and the CTA goes to the full
          set of application pages rather than back to an SSO explainer. */}
      <section className="iz-section" id="applications">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <IzIntegrationGrid
              copy={
                <>
                  <span className="iz-ey">Which applications</span>
                  <h2 className="iz-h2">
                    If it speaks SAML, <em>it is already on the list</em>.
                  </h2>
                  <p className="izig-body">
                    The logos moving alongside are the ones we are asked about most, not the limit of what we support.
                    Support is a protocol question: anything speaking SAML 2.0, OAuth or OpenID Connect can sit behind
                    this login, which in practice is over 800 business applications.
                  </p>
                  <p className="izig-body">
                    The ones with their own integration page are simply the ones where setup has a wrinkle worth
                    writing down — a non-standard assertion, a desktop client, a legacy console that never learned
                    SAML at all.
                  </p>
                  <ul className="izig-facts">
                    <li>
                      <b>800+</b> SAML, OAuth and OIDC applications
                    </li>
                    <li>
                      <b>3</b> protocols cover almost all of them
                    </li>
                    <li>
                      <b>1</b> login in front of every one
                    </li>
                  </ul>
                  <a href="/solutions/idam-authentication-protocols" className="izig-cta">
                    Every supported application <Arrow />
                  </a>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ---------------- THREE OUTCOMES ----------------
          Now the shared IzOutcomes section, on the SsoLogin artifact
          (sprawl → one credential → every session). The hand-rolled
          three-column list it replaces carried no artifact, which is
          the one thing the three-outcomes rule requires. */}
      <div id="outcomes">
        <IzOutcomes
          side="left"
          tag="SSO outcomes"
          title={["One door.", "Everything", "behind it."]}
          accentFrom={1}
          sub="Fifty logins collapse into one, and that one is the login you can afford to defend properly."
          artifact={SsoLogin}
          outcomes={[
            {
              Icon: LockKey,
              title: "The password problem shrinks to one",
              body: "Defend one login properly instead of fifty badly. Reuse stops mattering when there is nothing left to reuse it across.",
            },
            {
              Icon: UsersThree,
              title: "Joiner-leaver in minutes",
              body: "Group membership is provisioning. Disabling the user is offboarding — for every application at once.",
            },
            {
              Icon: ListChecks,
              title: "Access becomes auditable",
              body: "Every application login is one line in one log, so the audit question is a report rather than an investigation.",
            },
          ]}
        />
      </div>

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
            SSO with MFA and device trust layered in at the login. See it on your own apps in 30
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
