"use client";

import {
  ArrowsClockwise,
  ArrowsOutCardinal,
  Broadcast,
  Crosshair,
  Devices,
  Gauge,
  ListChecks,
  LockKey,
  Prohibit,
  SealCheck,
  ShieldCheck,
  SquaresFour,
  UserFocus,
  UsersThree,
  UserMinus,
} from "@phosphor-icons/react";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { BoundaryPlate } from "@/components/izoutcomes/artifacts/BoundaryPlate";
import { ConcentricRings } from "@/components/izoutcomes/artifacts/ConcentricRings";
import { LedgerPlate } from "@/components/izoutcomes/artifacts/LedgerPlate";
import { StampRecord } from "@/components/izoutcomes/artifacts/StampRecord";
import { IamDirectory } from "@/components/izoutcomes/artifacts/IamDirectory";
import { DevicePosture } from "@/components/izoutcomes/artifacts/DevicePosture";
import { EndpointControls } from "@/components/izoutcomes/artifacts/EndpointControls";
import { MfaEngine } from "@/components/izoutcomes/artifacts/MfaEngine";
import { SsoLogin } from "@/components/izoutcomes/artifacts/SsoLogin";
import { ZtaaIdentity } from "@/components/izoutcomes/artifacts/ZtaaIdentity";
import { ZtnaArchitecture } from "@/components/izoutcomes/artifacts/ZtnaArchitecture";
import { izFontVars } from "@/lib/iz-fonts";

import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/izoutcomes/illustrations.css";

/* ============================================================
   DEV ONLY — /dev/outcomes.

   Every built illustration, run through the ONE real shell
   (IzOutcomes, lab 00ar), sides alternating, in both themes.

   Open this when adding an illustration. If the new one reads as the
   same KIND of picture as any already here, it fails the variation
   rule — docs/three-outcomes-rule.md §1.

   Copy is placeholder except ZTNA; per-page copy comes from the
   content master, not from this file.
   ============================================================ */

const SAMPLES = [
  {
    key: "ztna",
    side: "left" as const,
    tag: "ZTNA architecture",
    title: ["Access,", "not access", "to everything."],
    accentFrom: 2,
    sub: "InstaSafe ZTNA creates secure, per-session tunnels to the apps you choose. Nothing is exposed. Nothing is reachable by default.",
    artifact: ZtnaArchitecture,
    outcomes: [
      { Icon: ShieldCheck, title: "Breach containment by architecture", body: "No lateral surface to cross. One session compromised is one session lost." },
      { Icon: Broadcast, title: "Zero internet footprint", body: "Blackened servers cannot be scanned or fingerprinted ahead of patch day." },
      { Icon: ArrowsOutCardinal, title: "VPN retirement without re-architecture", body: "Runs alongside your VPN. Same apps, same AD groups, staged cutover." },
    ],
  },
  {
    key: "endpoint",
    side: "right" as const,
    tag: "Platform · Endpoint controls",
    title: ["Govern every action.", "In real time."],
    accentFrom: 1,
    sub: "Granular endpoint controls apply policy at the exact moment of action — inside the session, not on the device.",
    artifact: EndpointControls,
    outcomes: [
      { Icon: ShieldCheck, title: "Insider risk gets guardrails", body: "The allowed user's unallowed action is blocked at the moment of attempt, and logged." },
      { Icon: Prohibit, title: "Third parties leave empty-handed", body: "Vendors work in your systems; nothing usable leaves the session." },
      { Icon: ListChecks, title: "Compliance evidence by default", body: "Every enforcement event is one of the 202 logged types — the audit trail writes itself." },
    ],
  },
  {
    key: "posture",
    side: "left" as const,
    tag: "Device posture architecture",
    title: ["Trust the device.", "Then trust the access."],
    accentFrom: 1,
    sub: "Every connection starts with a real-time device assessment. Only compliant, healthy devices get the access they should.",
    artifact: DevicePosture,
    outcomes: [
      { Icon: ShieldCheck, title: "Compromised devices stop at the door", body: "Spoofing a user is hard; spoofing a user AND a compliant certificated device is dramatically harder." },
      { Icon: ArrowsClockwise, title: "Compliance becomes continuous", body: "Endpoint standards are enforced at every connection, not sampled at audit time." },
      { Icon: Devices, title: "BYOD with eyes open", body: "Personal devices meet a defined bar or get contained access — a policy choice instead of a blind spot." },
    ],
  },
  {
    key: "mfa",
    side: "right" as const,
    tag: "MFA architecture",
    title: ["Every login.", "Stronger together."],
    accentFrom: 1,
    sub: "Multi-Factor Authentication across every app, device, and access point. Right signal. Right user. Right now.",
    artifact: MfaEngine,
    outcomes: [
      { Icon: LockKey, title: "Stolen passwords stop working", body: "The phish succeeds; the login still fails." },
      { Icon: Devices, title: "MFA everywhere, not just the web", body: "The OS logon, the switch console, and the legacy app get the same protection as the SaaS suite." },
      { Icon: Gauge, title: "Friction proportional to risk", body: "Push-to-approve for daily work; hardware keys and continuous facial for the crown jewels." },
    ],
  },
  {
    key: "sso",
    side: "left" as const,
    tag: "SSO architecture",
    title: ["One login.", "Every app."],
    accentFrom: 1,
    sub: "Single Sign-On removes password sprawl. Authenticate once securely and get seamless access everywhere.",
    artifact: SsoLogin,
    outcomes: [
      { Icon: LockKey, title: "The password problem shrinks to one", body: "Defend one login properly instead of fifty badly." },
      { Icon: UsersThree, title: "Joiner-leaver in minutes", body: "Group membership is provisioning; disabling is offboarding." },
      { Icon: ListChecks, title: "Access becomes auditable", body: "Every app login is one line in one log." },
    ],
  },
  {
    key: "iam",
    side: "right" as const,
    tag: "IAM architecture",
    title: ["One identity.", "Everything else."],
    accentFrom: 1,
    sub: "Your directory is the single source of identity truth. Access, policies and sessions follow — everywhere.",
    artifact: IamDirectory,
    outcomes: [
      { Icon: UserFocus, title: "One source of identity truth", body: "Your directory drives everything; there is no second user list to drift out of date." },
      { Icon: UserMinus, title: "Offboarding in one action", body: "Disable the user once — portal, apps, tunnels, and OS logins all close together." },
      { Icon: Gauge, title: "Authentication that matches risk", body: "Admins get hard factors; the marketing intern gets low friction; anomalies get challenged automatically." },
    ],
  },
  {
    key: "ztaa",
    side: "right" as const,
    tag: "ZTAA architecture",
    title: ["Applications first.", "Identity always."],
    accentFrom: 1,
    sub: "ZTAA removes the network from the equation. Users connect to what they need, not where it lives. Every session is verified, governed, and provable.",
    artifact: ZtaaIdentity,
    outcomes: [
      { Icon: UserFocus, title: "One source of identity truth", body: "Your directory drives everything; there is no second user list to drift out of date." },
      { Icon: UserMinus, title: "Offboarding in one action", body: "Disable the user once — portal, apps, tunnels, and OS logins all close together." },
      { Icon: Gauge, title: "Authentication that matches risk", body: "Admins get hard factors; the marketing intern gets low friction; anomalies get challenged automatically." },
    ],
  },
  {
    key: "ledger",
    side: "right" as const,
    tag: "Single sign-on",
    title: ["One list,", "one removal."],
    accentFrom: 1,
    sub: "Every entitlement resolves to one readable list, so removing someone removes them everywhere.",
    artifact: LedgerPlate,
    outcomes: [
      { Icon: SquaresFour, title: "One place to look", body: "Every entitlement resolves to a single readable list." },
      { Icon: UserMinus, title: "Revoke once", body: "Removing someone removes them everywhere, including the network paths." },
      { Icon: SealCheck, title: "Prove it later", body: "The ledger is the evidence, so access review stops being a project." },
    ],
  },
  {
    key: "rings",
    side: "left" as const,
    tag: "Trust engine",
    title: ["Many signals,", "one verdict."],
    accentFrom: 1,
    sub: "Identity, device, location and risk arrive as one decision rather than four separate checks.",
    artifact: ConcentricRings,
    outcomes: [
      { Icon: ShieldCheck, title: "Read the whole context", body: "Four inputs resolve to a single decision, not four separate gates." },
      { Icon: Broadcast, title: "Re-check continuously", body: "Posture is evaluated through the session, not once at the door." },
      { Icon: SealCheck, title: "Answer in one place", body: "One verdict, issued once, applied everywhere the user goes." },
    ],
  },
  {
    key: "boundary",
    side: "right" as const,
    tag: "Blast radius",
    title: ["Nothing", "spreads."],
    accentFrom: 1,
    sub: "A session resolves to one application. Everything else stays invisible rather than merely blocked.",
    artifact: BoundaryPlate,
    outcomes: [
      { Icon: Crosshair, title: "Reach one thing", body: "A session resolves to a single application, never to a network segment." },
      { Icon: ShieldCheck, title: "Open one way in", body: "There is a single controlled opening, and it is watched." },
      { Icon: Prohibit, title: "Refuse the rest", body: "Everything not explicitly granted is invisible rather than merely blocked." },
    ],
  },
  {
    key: "stamp",
    side: "left" as const,
    tag: "Privileged access",
    title: ["Every decision", "signed."],
    accentFrom: 1,
    sub: "A person, not a shared credential, sits behind each privileged action — and the record proves it.",
    artifact: StampRecord,
    outcomes: [
      { Icon: SealCheck, title: "Attribute every session", body: "A person, not a shared credential, sits behind each privileged action." },
      { Icon: ShieldCheck, title: "Record the reason", body: "The verdict is stored with the context that produced it." },
      { Icon: ArrowsOutCardinal, title: "Export without work", body: "Access review becomes a query in a format your SIEM already reads." },
    ],
  },
];

const THEMES = ["paper", "dark"] as const;

export function OutcomesDemo() {
  return (
    <>
      {THEMES.map((t) => (
        <div key={t} className={`iz ${izFontVars}`} data-theme={t} data-system="orange">
          {SAMPLES.map((s) => (
            <IzOutcomes
              key={s.key}
              side={s.side}
              tag={s.tag}
              title={s.title}
              accentFrom={s.accentFrom}
              sub={s.sub}
              artifact={s.artifact}
              outcomes={s.outcomes}
            />
          ))}
        </div>
      ))}
    </>
  );
}
