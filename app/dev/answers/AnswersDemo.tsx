"use client";

import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { AnswerZtna } from "@/components/izanswer/AnswerZtna";
import { AnswerIam } from "@/components/izanswer/AnswerIam";
import { AnswerSso } from "@/components/izanswer/AnswerSso";
import { izFontVars } from "@/lib/iz-fonts";

import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iznewblocks.css";
import "@/components/izoutcomes/illustrations.css";
import "@/components/izanswer/answers.css";

/* ============================================================
   DEV ONLY — /dev/answers.

   Every answer-strip explainer, in the REAL strip, in both themes.
   Open this when adding one: if the new picture reads as the same
   KIND of diagram as the outcomes artifact on the same page, it has
   failed — the answer strip teaches the mechanism, the outcomes
   section argues the result.

   Copy here is the real page copy, trimmed: these illustrations are
   sized against live text, not lorem.
   ============================================================ */

const SAMPLES = [
  {
    key: "ztna",
    heading: "What is ZTNA?",
    eyebrow: "Zero Trust Network Access",
    question: "Your identity",
    emphasis: "is",
    questionTail: "the network perimeter.",
    answer:
      "Zero Trust Network Access is the replacement architecture for the corporate VPN. Both solve the same surface problem — letting someone outside the office reach something inside it — but they solve it in opposite ways.",
    art: AnswerZtna,
    points: [
      { title: "No network to move across", body: "A tunnel is scoped to one resource. Two apps means two tunnels, each policy-checked on its own." },
      { title: "Nothing answers a scan", body: "Gateways run drop-all with Single Packet Authorization, so there is no version to fingerprint ahead of patch day." },
      { title: "The device is checked, every time", body: "25 posture check types, evaluated before the tunnel opens and re-evaluated during the session." },
    ],
  },
  {
    key: "iam",
    heading: "What is IAM?",
    eyebrow: "Identity & Access Management",
    question: "Identity is",
    emphasis: "an asset",
    questionTail: "you manage.",
    answer:
      "Identity and Access Management is the discipline of knowing, at all times, three things: who your users are, what each of them is allowed to touch, and whether the person at the keyboard right now is really that user.",
    art: AnswerIam,
    points: [
      { title: "Users live in a directory", body: "One source of identity truth, rather than a spreadsheet and a manager's memory." },
      { title: "Access is granted to groups", body: "Roles and groups carry entitlement, so joining a team is the provisioning step." },
      { title: "Authentication is layered", body: "Something you know, something you have, something you are — sized to what is being reached." },
    ],
  },
  {
    key: "sso",
    heading: "What is SSO?",
    eyebrow: "Single Sign-On",
    question: "One login,",
    emphasis: "honoured",
    questionTail: "by many applications.",
    answer:
      "Instead of a password per app — remembered, reused, written down, phished — the user authenticates once to an identity provider, which then vouches for them to each application using a cryptographic assertion.",
    art: AnswerSso,
    points: [
      { title: "Security", body: "One strongly defended login with MFA replaces dozens of weak ones, and password reuse stops mattering." },
      { title: "Operations", body: "Onboarding is add-to-group and offboarding is disable-user, not a checklist of fifteen admin consoles." },
      { title: "Visibility", body: "Every login flows through one point, so who accessed what becomes a report instead of an investigation." },
    ],
  },
];

const THEMES = ["paper", "dark"] as const;

export function AnswersDemo() {
  return (
    <>
      {THEMES.map((theme) => (
        <div key={theme} className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
          {SAMPLES.map((s) => (
            <section key={`${theme}-${s.key}`} style={{ padding: "var(--sp-section) 0" }}>
              <div className="iz-wrap">
                <IzAnswerStrip
                  variant="proof"
                  eyebrow={s.eyebrow}
                  heading={s.heading}
                  question={s.question}
                  emphasis={s.emphasis}
                  questionTail={s.questionTail}
                  answer={s.answer}
                  points={s.points}
                  slot={{ kind: "art", art: s.art }}
                />
              </div>
            </section>
          ))}
        </div>
      ))}
    </>
  );
}
