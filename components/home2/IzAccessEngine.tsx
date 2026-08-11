"use client";

import { useState } from "react";
import {
  ArrowRight,
  Buildings,
  CheckCircle,
  Circuitry,
  Cloud,
  Code,
  Crosshair,
  Database,
  DesktopTower,
  DeviceMobile,
  Eye,
  Fingerprint,
  Globe,
  IdentificationCard,
  Key,
  Laptop,
  Lightning,
  ListChecks,
  Lock,
  MapPin,
  Path,
  Prohibit,
  ShieldCheck,
  SignIn,
  Stack,
  Timer,
  UserCircle,
  UsersThree,
  WifiHigh,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import "./izaccessengine.css";

/* ============================================================
   00c1 · IzAccessEngine — the homepage capability deck, remade.

   Sits directly under the hero and has to show EVERYTHING the
   platform does, so it is one system with six controls rather than
   six features in a carousel. The old C1 auto-advanced through six
   bespoke consoles; that hid five of six behind a timer and gave the
   reader no way to compare them.

   THE CHASSIS IS GROUP C's (solutions page): a switcher, and a body
   whose three columns each answer a different question —

     THE PROBLEM_   why this control exists, in the buyer's words
     ACCESS ENGINE_ the mechanism, drawn
     THE PROOF_     what you get, as a list you can scan

   WHAT CHANGED FROM GROUP C: the switcher runs HORIZONTAL here —
   six controls read as one row of a system, where five stacked rows
   would read as five products. On phones it becomes the vertical
   accordion Group C uses (one open, rest closed) and the proof
   column drops, exactly as Group C drops its spec column.

   THE ENGINE IS ONE OBJECT. Every control shows the same lit core
   with the same rings; what changes is what feeds it and what comes
   out. That is the argument the section exists to make — six
   controls, one engine — and it would be lost if each tab drew its
   own unrelated picture.
   ============================================================ */

type Row = { Icon: Icon; a: string; b?: string; tone?: "ok" | "accent" };
type Proof = { Icon: Icon; title: string; body: string };

type Control = {
  id: string;
  n: string;
  /** switcher */
  tab: string;
  tabSub: string;
  Icon: Icon;
  /** left column */
  head: [string, string];
  lede: string;
  points: string[];
  /** middle column — the engine's flanks */
  checks: { Icon: Icon; label: string; state: string }[];
  inTitle: string;
  inRows: Row[];
  outTitle: string;
  outRows: Row[];
  coreLabel: string;
  verdict: string;
  verdictWords: string[];
  /** right column */
  proof: Proof[];
  proofCta: string;
};

const CONTROLS: Control[] = [
  {
    id: "vpn",
    n: "01",
    tab: "Replace your VPN",
    tabSub: "No more VPN",
    Icon: ShieldCheck,
    head: ["Let people in —", "without a VPN."],
    lede: "Keep your applications invisible to the internet. No open network, no lateral movement — just secure, per-session access.",
    points: [
      "Apps stay private, not exposed",
      "Works for all apps, not just browsers",
      "Encrypted, per-session tunnels",
      "Fast and simple for end users",
    ],
    checks: [
      { Icon: UserCircle, label: "Identity", state: "Verified" },
      { Icon: Laptop, label: "Device", state: "Trusted" },
      { Icon: ShieldCheck, label: "Policy", state: "Matched" },
    ],
    inTitle: "User / device",
    inRows: [
      { Icon: UserCircle, a: "Verified user" },
      { Icon: Laptop, a: "Managed laptop" },
      { Icon: DeviceMobile, a: "Mobile / BYOD" },
    ],
    outTitle: "Private applications",
    outRows: [
      { Icon: Stack, a: "Thick-client ERP" },
      { Icon: DesktopTower, a: "Client-server" },
      { Icon: Code, a: "Custom TCP/UDP" },
    ],
    coreLabel: "ZTNA gateway",
    verdict: "Encrypted tunnel. Drop-all gateway. No network exposure.",
    verdictWords: ["Private", "Per-session", "Off the internet"],
    proof: [
      { Icon: Eye, title: "Private by default", body: "Your applications stay invisible to the internet — nothing answers a scan." },
      { Icon: Path, title: "Per-session access", body: "One user, one session, one application. No lateral movement." },
      { Icon: Stack, title: "Works at the IP layer", body: "Access for legacy, thick-client and custom applications, not just browsers." },
      { Icon: Lightning, title: "Better user experience", body: "No VPN client, no complex network setup, no backhaul hairpin." },
      { Icon: Prohibit, title: "Nothing to scan", body: "Drop-all with single packet authorisation — the gateway answers only known callers." },
    ],
    proofCta: "See ZTNA architecture",
  },
  {
    id: "identity",
    n: "02",
    tab: "One identity",
    tabSub: "Accounts",
    Icon: IdentificationCard,
    head: ["Too many identities.", "Too much access."],
    lede: "Your team has identities scattered across different directories. Managing access is messy, manual and risky.",
    points: [
      "Multiple accounts for the same user",
      "Sprawl across Microsoft, Google, LDAP",
      "Manual onboarding and offboarding",
      "Inconsistent access everywhere",
    ],
    checks: [
      { Icon: UserCircle, label: "Identity", state: "Verified" },
      { Icon: Laptop, label: "Device", state: "Trusted" },
      { Icon: ShieldCheck, label: "Policy", state: "Matched" },
    ],
    inTitle: "Identity sources",
    inRows: [
      { Icon: Buildings, a: "Microsoft 365" },
      { Icon: Globe, a: "Google Workspace" },
      { Icon: Database, a: "LDAP / AD" },
      { Icon: UsersThree, a: "Custom directory" },
    ],
    outTitle: "Unified identity",
    outRows: [
      { Icon: UserCircle, a: "Single profile", tone: "ok" },
      { Icon: Globe, a: "Global access", tone: "ok" },
      { Icon: Lightning, a: "Auto provisioning", tone: "ok" },
      { Icon: Prohibit, a: "Instant revocation", tone: "ok" },
    ],
    coreLabel: "Identity core",
    verdict: "Identity linked. Access unified.",
    verdictWords: ["Secure", "Consistent", "Auditable"],
    proof: [
      { Icon: Database, title: "Single source of truth", body: "Link every identity source to one central identity." },
      { Icon: UserCircle, title: "Profile that follows", body: "Users get one profile that works everywhere." },
      { Icon: Lightning, title: "Auto provisioning", body: "New users get access instantly. No manual tickets." },
      { Icon: Prohibit, title: "Instant revocation", body: "Disable once — access is removed everywhere." },
      { Icon: ListChecks, title: "Full audit trail", body: "See who has access, where, and why — always." },
    ],
    proofCta: "See identity architecture",
  },
  {
    id: "sso",
    n: "03",
    tab: "One login",
    tabSub: "Single sign-on",
    Icon: SignIn,
    head: ["Too many logins.", "Productivity lost."],
    lede: "Multiple passwords slow your team down and increase helpdesk tickets. Users juggle credentials just to get work done.",
    points: [
      "Dozens of apps, dozens of logins",
      "Password fatigue and risky habits",
      "More time lost, more support tickets",
      "Inconsistent access experience",
    ],
    checks: [
      { Icon: UserCircle, label: "Signed in", state: "Once" },
      { Icon: Key, label: "Token", state: "Issued" },
      { Icon: Timer, label: "Session", state: "Managed" },
    ],
    inTitle: "User / device",
    inRows: [
      { Icon: UserCircle, a: "One login" },
      { Icon: Laptop, a: "Any device" },
      { Icon: Key, a: "Secure token" },
    ],
    outTitle: "Your applications",
    outRows: [
      { Icon: Cloud, a: "Salesforce" },
      { Icon: Buildings, a: "Microsoft 365" },
      { Icon: Code, a: "Jira / Confluence" },
      { Icon: Stack, a: "And more…" },
    ],
    coreLabel: "Access engine",
    verdict: "One login successful. Session shared across every app.",
    verdictWords: ["Verified", "Active", "Encrypted"],
    proof: [
      { Icon: SignIn, title: "One login, many apps", body: "Sign in once to reach all your work applications." },
      { Icon: Key, title: "No password juggling", body: "No need to remember or reset multiple passwords." },
      { Icon: Lightning, title: "Less tickets, more focus", body: "Fewer login issues for your team and for IT." },
      { Icon: ShieldCheck, title: "Secure by design", body: "Every app access is verified, authorised and logged." },
      { Icon: Timer, title: "Sessions that expire", body: "Automatic session management, not a permanent key." },
    ],
    proofCta: "See SSO architecture",
  },
  {
    id: "mfa",
    n: "04",
    tab: "Stronger sign-in",
    tabSub: "Extra check",
    Icon: Fingerprint,
    head: ["Passwords alone aren't enough.", "Security is at risk."],
    lede: "Stolen passwords and weak logins are the number one way attackers get in.",
    points: [
      "Phishing and credential theft",
      "Weak or reused passwords",
      "Account takeover and data loss",
      "Compliance and audit gaps",
    ],
    checks: [
      { Icon: UserCircle, label: "Identity", state: "Verified" },
      { Icon: Laptop, label: "Device", state: "Trusted" },
      { Icon: ShieldCheck, label: "Policy", state: "Matched" },
    ],
    inTitle: "Sign-in steps",
    inRows: [
      { Icon: Key, a: "Password" },
      { Icon: Fingerprint, a: "Second proof", tone: "accent" },
      { Icon: Lock, a: "Access granted", tone: "ok" },
    ],
    outTitle: "Second proof",
    outRows: [
      { Icon: DeviceMobile, a: "Passkey" },
      { Icon: Timer, a: "Authenticator" },
      { Icon: Key, a: "Security key" },
      { Icon: Fingerprint, a: "Biometric" },
    ],
    coreLabel: "Access engine",
    verdict: "Two proofs, one session — even a stolen password fails.",
    verdictWords: ["Verified", "Encrypted", "Authorised"],
    proof: [
      { Icon: Fingerprint, title: "Add a second proof", body: "Require an extra verification step before access is granted." },
      { Icon: ShieldCheck, title: "Works with any method", body: "Passkeys, OTP, biometrics, FIDO keys and more." },
      { Icon: Lightning, title: "Low friction", body: "Fast, seamless experience for users on every device." },
      { Icon: Lock, title: "Stronger by design", body: "Stops account takeover even when passwords are stolen." },
      { Icon: ListChecks, title: "Audit everything", body: "Every sign-in is logged and ready for compliance." },
    ],
    proofCta: "See authentication architecture",
  },
  {
    id: "policy",
    n: "05",
    tab: "Smart rules",
    tabSub: "Access rules",
    Icon: Crosshair,
    head: ["Access without", "context is a risk."],
    lede: "Users, devices and networks are always changing. Static rules can't keep up with modern threats and insider risks.",
    points: [
      "Access from risky locations",
      "Untrusted or unmanaged devices",
      "Access outside working hours",
      "Sharing of credentials and sessions",
      "Too much access, not enough control",
    ],
    checks: [
      { Icon: MapPin, label: "Location", state: "Checked" },
      { Icon: Laptop, label: "Device", state: "Checked" },
      { Icon: Timer, label: "Time", state: "Checked" },
      { Icon: WifiHigh, label: "Network", state: "Checked" },
    ],
    inTitle: "Access request",
    inRows: [
      { Icon: UserCircle, a: "John D.", b: "Finance team" },
      { Icon: Laptop, a: "Device", b: "Windows 11" },
      { Icon: Stack, a: "Application", b: "ERP system" },
    ],
    outTitle: "Decision",
    outRows: [
      { Icon: CheckCircle, a: "Allow", tone: "ok" },
      { Icon: Fingerprint, a: "Challenge", tone: "accent" },
      { Icon: Lock, a: "Limit", tone: "accent" },
      { Icon: Prohibit, a: "Block" },
    ],
    coreLabel: "Policy engine",
    verdict: "Access granted · risk score 18/100 · evaluated in 2.3ms.",
    verdictWords: ["Context aware", "Adaptive", "Logged"],
    proof: [
      { Icon: Crosshair, title: "Context aware", body: "Evaluate every request using real-time context and risk signals." },
      { Icon: ListChecks, title: "Granular control", body: "Allow, limit or block based on who, where, when, what and how." },
      { Icon: ShieldCheck, title: "Adaptive policies", body: "Policies adapt automatically to changes in user or environment." },
      { Icon: Eye, title: "Reduce risk", body: "Prevent risky access before it happens. Stop threats, not just detect them." },
      { Icon: Circuitry, title: "Full visibility", body: "Every decision is logged, with a clear reason and full audit trail." },
    ],
    proofCta: "See the policy engine",
  },
  {
    id: "coverage",
    n: "06",
    tab: "Works everywhere",
    tabSub: "Coverage",
    Icon: Globe,
    head: ["Different environments.", "Complex access."],
    lede: "Users, apps and infrastructure are everywhere. Security shouldn't stop your business from working.",
    points: [
      "Apps in cloud, on-prem and hybrids",
      "Legacy systems and modern apps",
      "Users across every device",
      "Teams across every location",
      "Patchy coverage and inconsistent tools",
    ],
    checks: [
      { Icon: Cloud, label: "Cloud", state: "AWS, Azure, GCP" },
      { Icon: Buildings, label: "On-prem", state: "Data centres" },
      { Icon: Stack, label: "Legacy", state: "Thick-client" },
      { Icon: Globe, label: "Hybrid", state: "Multi-cloud" },
    ],
    inTitle: "Users & devices",
    inRows: [
      { Icon: DesktopTower, a: "Windows" },
      { Icon: Laptop, a: "macOS / Linux" },
      { Icon: DeviceMobile, a: "iOS / Android" },
      { Icon: UsersThree, a: "Remote users" },
    ],
    outTitle: "Applications",
    outRows: [
      { Icon: Globe, a: "Web applications" },
      { Icon: Cloud, a: "SaaS applications" },
      { Icon: Database, a: "Databases" },
      { Icon: Stack, a: "Private apps" },
    ],
    coreLabel: "Access engine",
    verdict: "One access layer. Every environment.",
    verdictWords: ["Identity verified", "Policy enforced", "Session encrypted"],
    proof: [
      { Icon: Globe, title: "Universal coverage", body: "Access your apps everywhere — cloud, on-prem, or a mix." },
      { Icon: DesktopTower, title: "All major platforms", body: "Windows, Mac, Linux, iOS and Android — fully supported." },
      { Icon: Circuitry, title: "Legacy ready", body: "Works with thick-client apps, ICMP, TCP, UDP and more." },
      { Icon: Stack, title: "Deploy your way", body: "Cloud, on-prem, in your data centre or in a hybrid model." },
      { Icon: ShieldCheck, title: "Consistent everywhere", body: "Same security, same experience, every environment." },
    ],
    proofCta: "See the coverage map",
  },
];

/* the four standing claims under the deck — the same on every tab,
   because they are true of the platform rather than of a control */
const PILLARS: { Icon: Icon; title: string; body: string }[] = [
  { Icon: ShieldCheck, title: "Zero Trust", body: "Verify first. Connect next." },
  { Icon: MapPin, title: "Make in India", body: "Built for Bharat. Securing the world." },
  { Icon: DesktopTower, title: "Enterprise Ready", body: "Scalable. Reliable. Auditable." },
  { Icon: ListChecks, title: "Compliance First", body: "Meets global security standards." },
];

/* ---------- the engine, one object for all six controls ---------- */

function Engine({ c }: { c: Control }) {
  return (
    <div className="izae-engine">
      {/* what is checked before anything opens */}
      <div className="izae-checks">
        {c.checks.map((k, i) => (
          <span key={k.label} className="izae-check" style={{ ["--i" as string]: i } as React.CSSProperties}>
            <k.Icon weight="regular" aria-hidden="true" />
            <b>{k.label}</b>
            <em>{k.state}</em>
          </span>
        ))}
      </div>

      <div className="izae-flow">
        {/* ---- what feeds it ---- */}
        <div className="izae-card izae-card--in">
          <span className="izae-card-h">{c.inTitle}</span>
          {c.inRows.map((r, i) => (
            <span key={r.a} className="izae-row" style={{ ["--i" as string]: i } as React.CSSProperties}>
              <i aria-hidden="true">
                <r.Icon weight="regular" />
              </i>
              <b>
                {r.a}
                {r.b && <span>{r.b}</span>}
              </b>
              {r.tone && <s className={`izae-dot t-${r.tone}`} aria-hidden="true" />}
            </span>
          ))}
        </div>

        {/* ---- the core: the same object on every tab ---- */}
        <div className="izae-core">
          <i className="izae-ring izae-ring--3" aria-hidden="true" />
          <i className="izae-ring izae-ring--2" aria-hidden="true" />
          <i className="izae-ring izae-ring--1" aria-hidden="true" />
          <span className="izae-core-face" aria-hidden="true">
            <LogoMark size={56} />
          </span>
          <b>
            InstaSafe
            <span>{c.coreLabel}</span>
          </b>
        </div>

        {/* ---- what comes out ---- */}
        <div className="izae-card izae-card--out">
          <span className="izae-card-h">{c.outTitle}</span>
          {c.outRows.map((r, i) => (
            <span key={r.a} className="izae-row" style={{ ["--i" as string]: i } as React.CSSProperties}>
              <i aria-hidden="true">
                <r.Icon weight="regular" />
              </i>
              <b>
                {r.a}
                {r.b && <span>{r.b}</span>}
              </b>
              {r.tone && <s className={`izae-dot t-${r.tone}`} aria-hidden="true" />}
            </span>
          ))}
        </div>
      </div>

      {/* the verdict strip — one sentence, then the three words */}
      <div className="izae-verdict">
        <b>{c.verdict}</b>
        <span>
          {c.verdictWords.map((w) => (
            <em key={w}>{w}</em>
          ))}
        </span>
      </div>
    </div>
  );
}

export function IzAccessEngine({
  kicker = "The InstaSafe access engine_",
  title = (
    <>
      One system. <mark>Six security controls.</mark>
    </>
  ),
  sub = "Everything you need for secure, zero trust access — in one platform.",
}: {
  kicker?: string;
  title?: React.ReactNode;
  sub?: string;
}) {
  const [open, setOpen] = useState(0);
  const active = CONTROLS[open];

  return (
    <section className="izae">
      <div className="iz-wrap izae-head">
        <span className="izae-kicker">{kicker}</span>
        <h2 className="izae-title">{title}</h2>
        <p className="izae-sub">{sub}</p>
      </div>

      <div className="iz-wrap">
        {/* ---------- the switcher ----------
            One row on desktop; on phones each button becomes an
            accordion header and the open one's panel follows it. */}
        <div className="izae-tabs" role="tablist" aria-label="Security controls">
          {CONTROLS.map((c, i) => {
            const on = i === open;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={`izae-panel-${c.id}`}
                id={`izae-tab-${c.id}`}
                className={`izae-tab${on ? " on" : ""}`}
                onClick={() => setOpen(i)}
              >
                <span className="izae-tab-ic" aria-hidden="true">
                  <c.Icon weight="regular" />
                </span>
                <span className="izae-tab-t">
                  <b>{c.tab}</b>
                  <em>
                    <s aria-hidden="true">{c.n}</s>
                    {c.tabSub}
                  </em>
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------- the body ----------
            keyed per control so the whole panel re-enters on the
            stagger, the way Group C's spec column repopulates */}
        <div
          className="izae-body"
          key={active.id}
          id={`izae-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`izae-tab-${active.id}`}
        >
          {/* ---- the problem ---- */}
          <div className="izae-col izae-col--problem">
            <span className="izae-col-h">The problem_</span>
            <h3 className="izae-h3">
              {active.head[0]}
              <br />
              <mark>{active.head[1]}</mark>
            </h3>
            <p className="izae-lede">{active.lede}</p>
            <ul className="izae-points">
              {active.points.map((p, i) => (
                <li key={p} style={{ ["--i" as string]: i } as React.CSSProperties}>
                  <CheckCircle weight="regular" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <a className="izae-cta" href="/book-a-demo">
              See it in action
              <ArrowRight weight="bold" aria-hidden="true" />
            </a>
          </div>

          {/* ---- the mechanism ---- */}
          <div className="izae-col izae-col--engine">
            <span className="izae-col-h">Access engine_</span>
            <Engine c={active} />
          </div>

          {/* ---- the proof ---- */}
          <div className="izae-col izae-col--proof">
            <span className="izae-col-h">The proof_</span>
            <dl className="izae-proof">
              {active.proof.map((p, i) => (
                <div key={p.title} className="izae-pf" style={{ ["--i" as string]: i } as React.CSSProperties}>
                  <span className="izae-pf-ic" aria-hidden="true">
                    <p.Icon weight="regular" />
                  </span>
                  <div>
                    <dt>{p.title}_</dt>
                    <dd>{p.body}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <a className="izae-proof-cta" href="/platform">
              {active.proofCta}
              <ArrowRight weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ---------- the standing claims ---------- */}
        <div className="izae-pillars">
          {PILLARS.map((p) => (
            <div key={p.title} className="izae-pillar">
              <span className="izae-pillar-ic" aria-hidden="true">
                <p.Icon weight="regular" />
              </span>
              <div>
                <b>{p.title}</b>
                <span>{p.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
