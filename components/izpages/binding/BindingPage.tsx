"use client";

import { useEffect, useState } from "react";
import { Certificate, Cpu, KeyReturn, Question, ShieldCheck } from "@phosphor-icons/react";

import { ChatFaq } from "@/components/home2/ChatFaq";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzLogoMarquee } from "@/components/home2/IzLogoMarquee";
import { IzNav } from "@/components/home2/IzNav";
import { IzSideNav } from "@/components/home2/IzSideNav";
import { IzTrustBar } from "@/components/home2/IzTrustBar";
import { DeviceBindingDemo } from "@/components/console/DeviceBindingConsole";
import { Magnetic } from "@/components/v2/Magnetic";
import { izFontVars } from "@/lib/iz-fonts";

import { AnswerBinding } from "@/components/izanswer/AnswerBinding";
import { BindingOutcomes } from "./BindingOutcomes";
import { IzQuickScan } from "@/components/izpages/pro/IzQuickScan";
import { BINDING_SPECS } from "@/components/izpages/pro/quickscan.data";

import { BindingHeroScene, BindingPillars } from "./BindingScenes";

/* ============================================================
   /zero-trust-features/device-binding — SEO-locked live URL,
   rebuilt off the v3 stack into the .iz system.

   Built from the supplied reference. What carried over: the device
   record beside its approval flow, the four capability cards, and
   the bound-vs-unbound verdict pair. What did not: the numbered
   1-2-3-4-5 icon strip (every other section here avoids that
   flowchart) and the device-count stats row (customer and device
   counts are not published on this site).

   Section order matches the sibling feature pages — hero, proof,
   plain answer, mechanism, signature interactive, three outcomes —
   so the cluster reads as one template.
   ============================================================ */

const FAQ = [
  { q: "What is device binding in simple terms?", a: "It ties a person's access to specific, approved hardware. The password still has to be right — but it now has to be right on a machine an administrator has already reviewed and certificated. Anything else is refused." },
  { q: "What exactly is the access bound to?", a: "Three hardware identifiers: MAC address, serial number and hardware UUID. A certificate is issued against them, so the binding can't be carried off in a cookie or a session token the way browser trust can." },
  { q: "What happens when someone signs in from an unapproved device?", a: "The login is refused at the device gate — before any application is offered. Correct password, correct MFA, still no session, because the machine has no certificate." },
  { q: "How does a new device get approved?", a: "It is submitted, its user verified, its posture checked and its policy evaluated — then a certificate is issued. Nothing self-enrols in the background; every approval is an administrator's decision." },
  { q: "An employee lost their laptop. Now what?", a: "Revoke it in one click and the certificate is withdrawn estate-wide, immediately. The person keeps working from their other bound devices the same afternoon — you cut off the machine, not the account." },
  { q: "Does this work for personal (BYOD) devices?", a: "Yes. A personal device goes through the same approval and has to meet the same posture bar. Policy can also give it a contained set of applications rather than full access — that's a choice, not a fixed behaviour." },
  { q: "Is the binding checked only at login?", a: "No. It is validated on every session and re-validated during it. A machine that stops matching its own certificate loses the access it already had, mid-session." },
];

const ANCHORS = [
  { id: "what", label: "What it is", icon: Certificate },
  { id: "how", label: "How it binds", icon: Cpu },
  { id: "signature", label: "Approve a device", icon: ShieldCheck },
  { id: "outcomes", label: "What stops", icon: KeyReturn },
  { id: "quickscan", label: "Quick scan", icon: Certificate },
  { id: "faq", label: "FAQ", icon: Question },
];

type Theme = "dark" | "paper";

export function BindingPage() {
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
      <header className="dbg-hero">
        <div className="iz-wrap dbg-hero-in">
          <div>
            <span className="iz-ey">Device binding</span>
            <h1 className="iz-h1">
              Credentials say who. Binding says <em>from what.</em>
            </h1>
            <p className="iz-lead">
              Every device is reviewed, approved and certificated before its first session — and revocable in one
              click after its last.
            </p>
            <div className="dbg-hero-cta">
              <Magnetic>
                <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                  Book a demo
                </a>
              </Magnetic>
              <a href="#signature" className="iz-btn iz-btn-ghost">
                Approve a device ↓
              </a>
            </div>
          </div>
          <div className="dbg-hero-visual">
            <BindingHeroScene />
          </div>
        </div>
      </header>

      <IzLogoMarquee />
      <IzTrustBar />
      <IzSideNav items={ANCHORS} />

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="dbg-sec" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="Device binding"
            heading="What is device binding?"
            question="A stolen password"
            emphasis="on a strange laptop"
            questionTail="is not a login."
            answer="Device binding ties a user's access to specific, approved hardware. The credential alone stops being enough: the request has to arrive from a machine an administrator has already reviewed and certificated."
            points={[
              {
                title: "Bound to the hardware, not the browser",
                body: "The certificate is issued against MAC address, serial number and hardware UUID. A cookie can be stolen and replayed; a hardware identity cannot be carried off in a session token.",
              },
              {
                title: "Approved before the first session",
                body: "A new device is submitted, its user verified, its posture checked and its policy evaluated before a certificate is issued. Nothing self-enrols quietly in the background.",
              },
              {
                title: "Re-checked, not just registered",
                body: "The binding is validated on every session and re-validated during it. A machine that stops matching its own certificate loses the access it already had.",
              },
              {
                title: "Revoked everywhere, at once",
                body: "One action withdraws the certificate across the estate. The laptop left in a taxi stops being a route in without waiting for a password reset to propagate.",
              },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "Device posture", href: "/zero-trust-features/device-posture-check" },
            ]}
            long={[
              "Phishing, credential stuffing and token replay all end the same way: somebody who is not your user holds something your system accepts. Every one of those attacks assumes the login can be completed from the attacker's own machine, because for most systems it can.",
              "Binding removes that assumption. The password still has to be right, but it now has to be right on a named, approved, certificated piece of hardware. Stealing the secret and stealing the machine are very different jobs, and only one of them can be done from another continent.",
            ]}
            /* The supplied reference IS this slot: explainer beside the
               bullets. It carries the bound/unbound fork too, which is
               why there is no separate verdicts section below. */
            slot={{ kind: "art", art: AnswerBinding }}
            stats={[
              { n: "3", label: "hardware identifiers" },
              { n: "1", label: "click to revoke" },
              { n: "0", label: "self-enrolment" },
            ]}
          />
        </div>
      </section>

      {/* ---------------- HOW IT BINDS ---------------- */}
      <section className="dbg-sec dbg-sec--alt" id="how">
        <div className="iz-wrap">
          <div className="dbg-head">
            <span className="iz-ey">How it binds</span>
            <h2>
              A certificate the machine <em>cannot lend out</em>.
            </h2>
            <p>
              Four properties do the work. Each one is a decision your administrators make, not a default they have to
              live with.
            </p>
          </div>
          <BindingPillars />
        </div>
      </section>

      {/* ---------------- SIGNATURE ---------------- */}
      <section className="dbg-sec" id="signature">
        <div className="iz-wrap">
          <div className="dbg-head">
            <span className="iz-ey">Signature interactive</span>
            <h2>
              Approve the laptop. <em>Then try the phone.</em>
            </h2>
            <p>
              The administrator console on top, the user&apos;s own devices underneath. Toggle a device&apos;s approval
              and connect from it — the same credential, two different answers, because the second machine has no
              certificate.
            </p>
          </div>
          <DeviceBindingDemo />
        </div>
      </section>

      {/* No standalone verdicts section: the bound-vs-unbound fork lives
          in the answer-strip illustration above, where the reference put
          it. Saying it twice on one page is the actual error. */}

      {/* ---------------- THREE OUTCOMES ----------------
          Bespoke, per the supplied reference — the shared IzOutcomes
          shell read as generic here. Owns its own #outcomes anchor. */}
      <BindingOutcomes />

      {/* ---------------- FAQ ---------------- */}
      {/* ---------------- QUICK SCAN ---------------- */}
      <div id="quickscan">
        <IzQuickScan
          specs={BINDING_SPECS}
          subject="InstaSafe device binding"
          title={
            <>
              What the binding is made of, <em>as a checklist</em>.
            </>
          }
          lead="Tick what your evaluation actually needs and copy the shortlist straight into your ticket. Filtering hides rows; it never clears a tick."
        />
      </div>

      <section className="dbg-sec" id="faq">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            heading={<>Device binding, <em>answered</em>.</>}
            sub="Tap a question — or open them all and read straight through."
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
