"use client";

import { useEffect, useState } from "react";
import { ArrowsClockwise, Certificate, DeviceMobile, MagnifyingGlass, Question, ShieldCheck } from "@phosphor-icons/react";

import { ChatFaq } from "@/components/home2/ChatFaq";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzLogoMarquee } from "@/components/home2/IzLogoMarquee";
import { IzNav } from "@/components/home2/IzNav";
import { IzSideNav } from "@/components/home2/IzSideNav";
import { AnswerPosture } from "@/components/izanswer/AnswerPosture";
import { DevicePosture } from "@/components/izoutcomes/artifacts/DevicePosture";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { Magnetic } from "@/components/v2/Magnetic";
import { izFontVars } from "@/lib/iz-fonts";

import { DeviceTester, PostureHeroScene, PostureStrip } from "./PostureScenes";
import { PostureDisassembly } from "./PostureDisassembly";

/* ============================================================
   /zero-trust-features/device-posture-check — SEO-locked live URL,
   promoted from the scaffold registry to a bespoke route.

   SCOPE: hero, the plain answer, the tester and the three outcomes.
   The rest of the page is being written separately against the
   storyboard, so nothing else is built here.

   Copy from docs/content/storyboards/platform-device-posture.md.
   ============================================================ */

const FAQ = [
  { q: "What is a device posture check in simple terms?", a: "A health check on the machine itself, run before it gets access and re-run while it has it. The user proved who they are; posture proves the laptop they're typing on is in a state you'd let near your applications." },
  { q: "What exactly gets checked?", a: "25 check types — OS version and patch level, disk encryption, antivirus presence and state, firewall status, screen lock, jailbreak and root detection and more — evaluated against 144 named rules covering 1,500+ OS and device combinations." },
  { q: "What happens when a device fails a check?", a: "Whatever your policy says. It can be blocked outright, or given a reduced set of applications until the problem is fixed — the named rule that failed is recorded, so an administrator sees why, not just that it was denied." },
  { q: "Is posture checked once at login or continuously?", a: "Both. It is evaluated before the connection opens and re-evaluated during the session. A device that drifts out of policy — antivirus switched off mid-afternoon — loses the access it already had, without waiting for the next login." },
  { q: "Does this work for personal (BYOD) devices?", a: "Yes. Personal devices are held to a defined bar like any other machine, and policy can give them contained access rather than full access. BYOD becomes a policy choice instead of a blind spot." },
  { q: "Which platforms does the client cover?", a: "Windows, macOS and Linux, with the rule set spanning 1,500+ OS and device combinations — so one policy covers an estate that was never uniform to begin with." },
  { q: "How is posture different from device binding?", a: "Binding answers which machine this is; posture answers what state it is in. A stolen credential fails binding; a compliant-yesterday laptop with its encryption turned off fails posture. Both run on every session, together." },
];

const ANCHORS = [
  { id: "what", label: "What it checks", icon: ShieldCheck },
  { id: "disassembly", label: "The disassembly", icon: MagnifyingGlass },
  { id: "signature", label: "Device tester", icon: DeviceMobile },
  { id: "outcomes", label: "Outcomes", icon: Certificate },
  { id: "faq", label: "FAQ", icon: Question },
];

type Theme = "dark" | "paper";

export function PosturePage() {
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
      <header className="pos-hero">
        <div className="iz-wrap pos-hero-in">
          <div>
            <span className="iz-ey">Device posture</span>
            <h1 className="iz-h1">
              The user checked out. Is the laptop <em>lying?</em>
            </h1>
            <p className="iz-lead">
              25 health-check types against 144 named rules — evaluated before access, and re-evaluated during it.
            </p>
            <div className="pos-hero-cta">
              <Magnetic>
                <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                  Book a demo
                </a>
              </Magnetic>
              <a href="#signature" className="iz-btn iz-btn-ghost">
                Toggle the device tester ↓
              </a>
            </div>
          </div>
          <div className="pos-hero-visual">
            <PostureHeroScene />
          </div>
        </div>
      </header>

      <PostureStrip />

      <p className="pos-kicker iz-wrap">
        <ShieldCheck size={17} weight="regular" />
        Trust the device. Then trust the user.
      </p>

      <IzLogoMarquee />
      <IzSideNav items={ANCHORS} />

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="pos-sec" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="Device posture"
            heading="What is device posture checking?"
            question="A credential says who."
            emphasis="Posture"
            questionTail="says what from."
            answer="Device posture checking verifies the security health of a device before giving it access to applications or data — and keeps verifying it afterwards."
            points={[
              {
                title: "It reads the signals that actually matter",
                body: "OS version and patch level, disk encryption, antivirus state, firewall status, screen lock, secure boot, jailbreak and root detection, and the rest of 25 check types across 1,500+ OS and device combinations.",
              },
              {
                title: "Checks become named rules",
                body: "144 of them. A rule is a check plus a threshold plus who it applies to, which is what makes a posture policy something you can hand an auditor rather than describe.",
              },
              {
                title: "Failing is not always all-or-nothing",
                body: "Only devices that meet the bar get in. Non-compliant ones can be blocked outright or given a reduced set of applications until the problem is fixed — a policy choice, not a fixed behaviour.",
              },
              {
                title: "And it does not stop at the door",
                body: "Posture is re-evaluated during the session. A device that drifts out of policy loses the access it already had, mid-session, without waiting for the next login.",
              },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "Device binding", href: "/zero-trust-features/device-binding" },
            ]}
            long={[
              "The reason this matters is that a credential proves a secret was known, and nothing else. It says nothing about the machine the secret was typed on — whether its disk is encrypted, whether its antivirus was disabled last Tuesday, whether it is a personal laptop with a developer build of the OS on it.",
              "Posture checking closes that gap by making the device a second subject of the decision. Spoofing a user is hard. Spoofing a user and a compliant, certificated device at the same time is dramatically harder, and that is the whole return on the control.",
            ]}
            slot={{ kind: "art", art: AnswerPosture }}
            stats={[
              { n: "25", label: "health-check types" },
              { n: "144", label: "named rules" },
              { n: "1,500+", label: "OS combinations" },
            ]}
          />
        </div>
      </section>

      {/* ---------------- THE DISASSEMBLY ---------------- */}
      <PostureDisassembly />

      {/* ---------------- SIGNATURE ---------------- */}
      <section className="pos-sec pos-sec--alt" id="signature">
        <div className="iz-wrap">
          <div className="pos-head">
            <span className="iz-ey">Signature interactive</span>
            <h2>
              Break the device. <em>Watch the verdict move.</em>
            </h2>
            <p>
              Switch off the antivirus, or the encryption, or the patch level, and see what the policy does about it —
              with the rule that failed named, because &ldquo;denied&rdquo; on its own tells an administrator nothing.
            </p>
          </div>
          <DeviceTester />
        </div>
      </section>

      {/* ---------------- THREE OUTCOMES ---------------- */}
      <div id="outcomes">
        <IzOutcomes
          side="left"
          tag="Posture outcomes"
          title={["Signals in.", "Three answers", "out."]}
          accentFrom={1}
          sub="The same 25 checks produce one of three verdicts on every connection — and produce it again while the session is open."
          artifact={DevicePosture}
          outcomes={[
            {
              Icon: ShieldCheck,
              title: "Compromised devices stop at the door",
              body: "Spoofing a user is hard. Spoofing a user and a compliant, certificated device is dramatically harder.",
            },
            {
              Icon: ArrowsClockwise,
              title: "Compliance becomes continuous",
              body: "Endpoint standards are enforced at every connection, not sampled once a year at audit time.",
            },
            {
              Icon: DeviceMobile,
              title: "BYOD with eyes open",
              body: "Personal devices meet a defined bar or get contained access — a policy choice instead of a blind spot.",
            },
          ]}
        />
      </div>

      {/* ---------------- FAQ ---------------- */}
      <section className="pos-sec" id="faq">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            heading={<>Posture checks, <em>answered</em>.</>}
            sub="Tap a question — or open them all and read straight through."
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
