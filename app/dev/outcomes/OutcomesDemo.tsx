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
import { MigrationTimeline } from "@/components/izoutcomes/artifacts/MigrationTimeline";
import { VpnAccessPlane } from "@/components/izoutcomes/artifacts/VpnAccessPlane";
import { RemoteAccessPlane } from "@/components/izoutcomes/artifacts/RemoteAccessPlane";
import { VendorPass } from "@/components/izoutcomes/artifacts/VendorPass";
import { ByodBoundary } from "@/components/izoutcomes/artifacts/ByodBoundary";
import { CloudAccessLayer } from "@/components/izoutcomes/artifacts/CloudAccessLayer";
import { DevopsEnclosure } from "@/components/izoutcomes/artifacts/DevopsEnclosure";
import { PrivilegedSessionRecord } from "@/components/izoutcomes/artifacts/PrivilegedSessionRecord";
import { VoipSession } from "@/components/izoutcomes/artifacts/VoipSession";
import { HybridStack } from "@/components/izoutcomes/artifacts/HybridStack";
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
  {
    key: "vpn-plane",
    side: "right" as const,
    tag: "The access plane",
    title: ["The network goes.", "The access", "stays."],
    accentFrom: 2,
    sub: "InstaSafe ZTNA removes the network from the equation. Users connect straight to the applications they are entitled to — and to nothing else.",
    artifact: VpnAccessPlane,
    outcomes: [
      { Icon: ShieldCheck, title: "A breach that stops", body: "A compromised session is one session — architecture, not detection." },
      { Icon: Crosshair, title: "Faster, and invisible", body: "Direct connections beat backhaul; blackened gateways beat scanners." },
      { Icon: ArrowsOutCardinal, title: "Scales like software", body: "From 200 to 20,000 users without a purchase order for boxes." },
    ],
  },
  {
    key: "remote-access",
    side: "left" as const,
    tag: "Secure remote access",
    title: ["Access from anywhere.", "Trust is", "everywhere."],
    accentFrom: 2,
    sub: "Same verification, same policy, same experience — whether you are at HQ, at home, or halfway around the world.",
    artifact: RemoteAccessPlane,
    outcomes: [
      { Icon: ShieldCheck, title: "One model, no weak channel", body: "The vendor path is as governed as the employee path." },
      { Icon: Crosshair, title: "Location stops mattering", body: "Same verification at HQ, home, hotel, or anywhere." },
      { Icon: SealCheck, title: "The audit trail is complete", body: "Every access mode logs to one place." },
    ],
  },
  {
    key: "voip",
    side: "left" as const,
    tag: "Secure VoIP",
    title: ["Clear calls.", "Closed network.", "Zero compromise."],
    accentFrom: 2,
    sub: "InstaSafe secures voice at the session layer, so calls stay clear, private and off the public internet.",
    artifact: VoipSession,
    outcomes: [
      { Icon: Gauge, title: "Call quality survives security", body: "Low latency, low jitter and zero drops — crystal clear conversations." },
      { Icon: Broadcast, title: "Telephony leaves the internet", body: "No public IPs and no open ports — voice travels only in a secure tunnel." },
      { Icon: UsersThree, title: "Seats onboard like any user", body: "No special setup and no VPN headaches for remote agents or BPO seats." },
    ],
  },
  {
    key: "hybrid",
    side: "right" as const,
    tag: "Hybrid work",
    title: ["One access.", "Experience.", "Anywhere."],
    accentFrom: 2,
    sub: "The same secure, high-performance access to applications no matter where people work from.",
    artifact: HybridStack,
    outcomes: [
      { Icon: ShieldCheck, title: "Location stops deciding security", body: "Zero trust access from anywhere, context-based and always verified." },
      { Icon: SquaresFour, title: "One access stack, not two", body: "One platform and one policy engine — lower cost, less complexity." },
      { Icon: Gauge, title: "Home equals the desk", body: "Fast, reliable and secure every time, in every location." },
    ],
  },
  {
    key: "devops",
    side: "left" as const,
    tag: "DevOps security",
    title: ["Secure your toolchain.", "Not your", "workflow."],
    accentFrom: 1,
    sub: "InstaSafe hides the DevOps toolchain from the internet, enforces least privilege, and records every privileged session.",
    artifact: DevopsEnclosure,
    outcomes: [
      { Icon: Broadcast, title: "The toolchain vanishes", body: "No inbound ports and no exposed services — only Zero Trust access." },
      { Icon: LockKey, title: "Least privilege, same workflow", body: "Granular, just-in-time, approved and time-bound access." },
      { Icon: ListChecks, title: "Logged and replayable", body: "Complete session capture, SIEM-ready and audit-proof." },
    ],
  },
  {
    key: "pam",
    side: "right" as const,
    tag: "Privileged access",
    title: ["Privileged access.", "Zero trust.", "Full accountability."],
    accentFrom: 2,
    sub: "Zero internet exposure, least-privilege access, and every session recorded for complete auditability.",
    artifact: PrivilegedSessionRecord,
    outcomes: [
      { Icon: Crosshair, title: "Evidence, not mystery", body: "Every command, click and action is recorded and replayable." },
      { Icon: ShieldCheck, title: "Admin planes stay private", body: "No public exposure and no inbound ports on the systems that matter most." },
      { Icon: SealCheck, title: "Audit findings close", body: "Complete session records, exportable, with replay attached." },
    ],
  },
  {
    key: "cloud-access",
    side: "right" as const,
    tag: "Secure cloud access",
    title: ["One access layer.", "Every cloud.", "Same security."],
    accentFrom: 1,
    sub: "Consistent access control across every cloud and SaaS — without opening new doors.",
    artifact: CloudAccessLayer,
    outcomes: [
      { Icon: ShieldCheck, title: "Same lock, every door", body: "One access layer enforces the same identity and policy everywhere." },
      { Icon: ArrowsClockwise, title: "Migration without regression", body: "Move to any cloud or SaaS and your posture stays consistent." },
      { Icon: ListChecks, title: "One report, everywhere", body: "All access events from every environment land in one unified audit trail." },
    ],
  },
  {
    key: "byod",
    side: "left" as const,
    tag: "BYOD",
    title: ["Your device.", "Our boundaries.", "Both respected."],
    accentFrom: 2,
    sub: "Zero trust access without compromising user privacy or device ownership.",
    artifact: ByodBoundary,
    outcomes: [
      { Icon: ShieldCheck, title: "A governed channel", body: "Access is secure, visible and controlled — even on personal devices." },
      { Icon: LockKey, title: "Privacy fight avoided", body: "No corporate agent, and no visibility outside the secure session." },
      { Icon: UserMinus, title: "Offboarding is clean", body: "Nothing was stored, so nothing needs wiping." },
    ],
  },
  {
    key: "vendor-pass",
    side: "right" as const,
    tag: "Third-party access",
    title: ["Grant access.", "Not permanent", "access."],
    accentFrom: 1,
    sub: "Give vendors exactly what they need, for exactly as long as they need it.",
    artifact: VendorPass,
    outcomes: [
      { Icon: SealCheck, title: "Attribution by default", body: "Named individuals, named sessions, replayable actions — shared-credential ambiguity ends." },
      { Icon: Prohibit, title: "No orphaned access", body: "Expiry is a property of the grant, not a memory test for IT." },
      { Icon: SquaresFour, title: "Onboard in minutes", body: "A new vendor is a user, a group and tiles — no laptops shipped, no agent rollout." },
    ],
  },
  {
    /* T7, built for /vpn-alternative's migration section and kept for
       /third-party-access, where the same timeline runs to an expiry
       rather than to a cutover. */
    key: "migration",
    side: "left" as const,
    tag: "Staged cutover",
    title: ["The VPN goes.", "In stages."],
    accentFrom: 1,
    sub: "Run both, move team by team, decommission per team. The rollback path stays intact throughout.",
    artifact: MigrationTimeline,
    outcomes: [
      { Icon: Crosshair, title: "One app at a time", body: "The pilot group moves first and reaches exactly what it was granted." },
      { Icon: ShieldCheck, title: "No backhaul left", body: "Sessions run device to application once the concentrator is out of the path." },
      { Icon: ArrowsOutCardinal, title: "Capacity is config", body: "The last stage retires hardware instead of ordering more of it." },
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
