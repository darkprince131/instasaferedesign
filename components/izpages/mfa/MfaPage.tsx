"use client";

import { useEffect, useState } from "react";
import { Certificate, Fingerprint, Prohibit, SlidersHorizontal } from "@phosphor-icons/react";

import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzLogoMarquee } from "@/components/home2/IzLogoMarquee";
import { IzNav } from "@/components/home2/IzNav";
import { IzSideNav } from "@/components/home2/IzSideNav";
import { AnswerMfa } from "@/components/izanswer/AnswerMfa";
import { MfaEngine } from "@/components/izoutcomes/artifacts/MfaEngine";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { MfaMethods } from "./MfaMethods";
import { MfaSaasConsole, MfaDesktopLogin } from "./MfaApplies";
import { MfaNetworkHub } from "./MfaNetworkHub";
import { MfaBadges } from "./MfaBadges";
import { IzQuickScan } from "@/components/izpages/pro/IzQuickScan";
import { MFA_SPECS } from "@/components/izpages/pro/quickscan.data";
import { ConsoleRow } from "@/components/home2/ConsoleRow";
import { MfaSimulator } from "@/components/v3/MfaSimulator";
import { Magnetic } from "@/components/v2/Magnetic";
import { izFontVars } from "@/lib/iz-fonts";

import { MfaHeroCells, MfaHeroScene } from "./MfaScenes";

/* ============================================================
   /multifactor-authentication — SEO-locked live URL.

   SCOPE: hero, the plain answer, the simulator and the three
   outcomes. The rest of this page's content is being written
   separately against the storyboard, so nothing else is built here —
   the previous v3 sections are not carried over rather than being
   half-ported.

   Copy comes from docs/content/storyboards/platform-mfa.md, with the
   hero's method list taken from the reference sheet — the user has
   confirmed FIDO2/WebAuthn and continuous authentication, and that
   whether SMS and email OTP count as one method or two is framing.
   ============================================================ */

const ANCHORS = [
  { id: "what", label: "What is MFA", icon: Fingerprint },
  { id: "methods", label: "The six methods", icon: Fingerprint },
  { id: "applies", label: "Where it applies", icon: SlidersHorizontal },
  { id: "quickscan", label: "Quick scan", icon: Certificate },
  { id: "signature", label: "Try the simulator", icon: SlidersHorizontal },
  { id: "outcomes", label: "Outcomes", icon: Prohibit },
];

type Theme = "dark" | "paper";

export function MfaPage() {
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
      <header className="mfa-hero">
        <div className="iz-wrap mfa-hero-in">
          <div>
            <span className="iz-ey">Multi-factor authentication</span>
            {/* The four lines come from the measure, not from forced
                breaks: at 9ch this lands as "A password / is a guess. /
                Prove it's / really them." exactly as drawn. `ch` tracks
                the clamped hero size, so the pattern survives down the
                scale. */}
            <h1 className="iz-h1">
              A password is a guess. Prove it&apos;s really <em>them</em>.
            </h1>
            <p className="iz-lead">
              Six authentication methods across web apps, desktops, servers and network equipment — from SMS OTP to
              continuous facial verification.
            </p>
            <div className="mfa-hero-cta">
              <Magnetic>
                <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                  Book a demo
                </a>
              </Magnetic>
              <a href="#signature" className="iz-btn iz-btn-ghost">
                Try the simulator ↓
              </a>
            </div>
          </div>
          <div className="mfa-hero-visual">
            <MfaHeroScene />
          </div>
        </div>
      </header>

      <MfaHeroCells />

      <IzLogoMarquee />
      <IzSideNav items={ANCHORS} />

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="mfa-sec" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="Multi-factor authentication"
            heading="What is MFA?"
            question="Two kinds of proof,"
            emphasis="not"
            questionTail="two secrets."
            answer="Multi-Factor Authentication asks for two or more different kinds of proof before letting someone in. The kinds are what matter: something you know, something you have, something you are."
            points={[
              {
                title: "Something you know",
                body: "A password or a PIN. On its own it fails silently — a stolen credential works perfectly for the thief, and nothing about the login looks wrong.",
              },
              {
                title: "Something you have",
                body: "Your phone or a hardware key. The attacker may know the secret, but they are not holding the object, and that is where the attack stops.",
              },
              {
                title: "Something you are",
                body: "Your fingerprint or your face. The highest-convenience strong factor, because the person carries it without carrying anything.",
              },
              {
                title: "MFA vs 2FA — the most-asked question",
                body: "2FA is exactly two factors. MFA is two or more, and in practice means a system that is flexible about which factors, per user and per risk level. Every 2FA is MFA; not every MFA stops at two.",
              },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "Identity & Access", href: "/platform/iam" },
            ]}
            long={[
              "A password alone fails silently. Stolen credentials work exactly as well for the thief as for the owner, which is why credential theft is the single most common way an account is taken over — there is no second obstacle to hit.",
              "Add a factor of a different kind and the stolen password becomes a dead end. Note that the kind is what does the work: two passwords are not two factors, and a security question is the same kind of proof as the password it is protecting.",
            ]}
            slot={{ kind: "art", art: AnswerMfa }}
            stats={[
              { n: "6", label: "authentication methods" },
              { n: "8", label: "auth profiles" },
              { n: "3", label: "kinds of proof" },
            ]}
          />
        </div>
      </section>

      {/* ---------------- THE SIX METHODS (00h) ----------------
          Placed between the plain answer and the simulator on purpose.
          The answer above says what MFA is; the simulator below opens
          with "pick a factor". Asking a reader to pick from six things
          they have not met yet is the wrong order, and this section is
          what makes the pick meaningful. */}
      <section className="mfa-sec" id="methods">
        <div className="iz-wrap">
          <div className="mfa-head">
            <span className="iz-ey">Six methods</span>
            <h2>
              Which one is <em>yours</em>?
            </h2>
            <p>
              Not a ranking. Two groups of three, split by the problem each one actually solves — getting the code to
              the person, and making the approval hard to fake. Pick the situation that is yours, or let it run and
              meet all six. Most organisations need one from each column.
            </p>
          </div>
          <MfaMethods />
        </div>
      </section>

      {/* ---------------- WHERE MFA APPLIES ----------------
          Two stacked console rows, the second reversed so the pair
          alternates rather than reading as one long column. The two
          visuals are deliberately NOT the same object: a SaaS app is
          a row in an admin list, and a desktop login is a screen you
          stand in front of. Drawing both as consoles would have said
          they are the same surface, which is exactly the assumption
          this section exists to correct. */}
      <section className="mfa-sec mfa-sec--alt" id="applies">
        <div className="iz-wrap">
          <div className="mfa-head">
            <span className="iz-ey">Coverage</span>
            <h2>
              Where MFA <em>applies</em>.
            </h2>
            <p>
              Most MFA stops at the browser. These are the two surfaces that matter, and the second one is the one
              that usually gets left out.
            </p>
          </div>

          <div className="mfa-applies">
            <ConsoleRow
              eyebrow="Web and SaaS apps"
              title={
                <>
                  Every app behind the login, <em>whatever it speaks</em>.
                </>
              }
              body={[
                "Anything that talks SAML 2.0, OAuth or OpenID Connect sits behind the same challenge — the SaaS suite, the internal web app, the vendor portal nobody remembers buying.",
                "The factor is not configured in the application. It is a property of the group the person is in, which is why adding an app never means teaching it what MFA is.",
              ]}
              facts={[
                ["Protocols", "SAML 2.0 · OAuth 2.0 · OpenID Connect"],
                ["Applied by", "Auth profile on the user group"],
                ["Coverage", "800+ business applications"],
              ]}
              ctaLabel="See the SSO layer"
              ctaHref="/zero-trust-features/single-sign-on"
            >
              <MfaSaasConsole />
            </ConsoleRow>

            <ConsoleRow
              reverse
              eyebrow="Desktop login"
              title={
                <>
                  The second factor at the <em>Windows sign-in</em>.
                </>
              }
              body={[
                "Not a browser pretending to be a login screen — the OS logon itself. The InstaSafe agent brings the tunnel up before anyone has signed in, which is what lets a domain login work on a laptop sitting in a hotel.",
                "Then the machine asks for the second factor the same way the browser would: SMS, an authenticator code, or the fingerprint reader that is already in the palm rest.",
              ]}
              facts={[
                ["Runs", "Before sign-in, not after"],
                ["Factors here", "SMS OTP · TOTP · Fingerprint"],
                ["Covers", "Windows domain and local logon"],
              ]}
              ctaLabel="How always-on works"
              ctaHref="/zero-trust-features/always-on"
            >
              <MfaDesktopLogin />
            </ConsoleRow>

            {/* Third surface, and the one the hero has been promising
                since "web apps, desktops, servers and network
                equipment". Not reversed: the rows now read
                console-right, screen-left, diagram-right, so no two
                adjacent rows put their visual on the same side. */}
            <ConsoleRow
              eyebrow="Network equipment"
              title={
                <>
                  The switch console asks <em>the same question</em>.
                </>
              }
              body={[
                "Routers, switches, firewalls and VPN concentrators do not hold their own MFA — they ask something else. InstaSafe answers on RADIUS and TACACS+, which is the language that gear has spoken for thirty years.",
                "So the engineer who opens a privileged CLI at 2am gets the same challenge as the person opening a SaaS app at 10am, and the same line in the same log.",
              ]}
              facts={[
                ["Protocols", "RADIUS · TACACS+"],
                ["Reaches", "Router · switch · firewall · VPN"],
                ["Granularity", "Per-command authorisation on TACACS+"],
              ]}
              ctaLabel="Talk to us about your estate"
              ctaHref="/book-a-demo"
            >
              <MfaNetworkHub />
            </ConsoleRow>

            {/* Two more surfaces that do not want a console row each.

                ADFS and LDAP apps are a real fourth place MFA lands,
                but the picture is a list of protocols rather than a
                screen — there is nothing to show, because the whole
                point is that the application is not modified. And
                compliance is not a surface at all; it is the reason
                the other four get asked about. Both are seals. */}
            <MfaBadges />
          </div>
        </div>
      </section>

      {/* ---------------- SIGNATURE ---------------- */}
      <section className="mfa-sec mfa-sec--alt" id="signature">
        <div className="iz-wrap">
          <div className="mfa-head">
            <span className="iz-ey">Signature interactive</span>
            <h2>
              Pick a factor. <em>Run the login.</em>
            </h2>
            <p>
              A real challenge flow for each method — the code, the push approval, the biometric prompt — with the
              decision at the end. No account needed, and nothing here talks to a live directory.
            </p>
          </div>
          <div className="mfa-sim">
            <MfaSimulator />
          </div>
        </div>
      </section>

      {/* ---------------- QUICK SCAN ----------------
          Last before the outcomes, which is where an evaluator is by
          the time they want it: everything above has argued, and this
          is the sheet they tick against their own requirements list
          and paste into a ticket. */}
      <div id="quickscan">
        <IzQuickScan
          specs={MFA_SPECS}
          subject="InstaSafe MFA"
          title={
            <>
              Every number on this page, <em>as a checklist</em>.
            </>
          }
          lead="Tick what your evaluation actually needs and copy the shortlist straight into your ticket. Filtering hides rows; it never clears a tick."
        />
      </div>

      {/* ---------------- THREE OUTCOMES ---------------- */}
      <div id="outcomes">
        <IzOutcomes
          side="left"
          tag="MFA outcomes"
          title={["Every entry point.", "Friction sized", "to the risk."]}
          accentFrom={1}
          sub="The same six methods reach the SaaS suite, the OS logon, the switch console and the legacy app — and each role gets the factor its risk actually justifies."
          artifact={MfaEngine}
          outcomes={[
            {
              Icon: Prohibit,
              title: "Stolen passwords stop working",
              body: "The phish succeeds and the login still fails. The attacker holds the secret and not the second kind of proof.",
            },
            {
              Icon: Fingerprint,
              title: "MFA everywhere, not just the web",
              body: "The OS logon, the switch console and the directory-integrated legacy app get the same protection as the SaaS suite.",
            },
            {
              Icon: SlidersHorizontal,
              title: "Friction proportional to risk",
              body: "Push-to-approve for daily work; hardware keys and continuous facial verification for the crown jewels.",
            },
          ]}
        />
      </div>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
