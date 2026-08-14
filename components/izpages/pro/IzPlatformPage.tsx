"use client";

import { useEffect, useState } from "react";
import {
  ArrowsSplit,
  Certificate,
  ClockCounterClockwise,
  Cpu,
  EyeSlash,
  Fingerprint,
  ListChecks,
  Plugs,
  Question,
  ShieldCheck,
  Sparkle,
  Stack,
  UserCheck,
} from "@phosphor-icons/react";

import { ChatFaq } from "@/components/home2/ChatFaq";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzLogoMarquee } from "@/components/home2/IzLogoMarquee";
import { IzNav } from "@/components/home2/IzNav";
import { IzQuestionBand, IzQuietBand } from "@/components/home2/IzQuestionBand";
import { IzRelatedRail } from "@/components/home2/IzRelatedRail";
import { IzSideNav } from "@/components/home2/IzSideNav";
import { IzSpecTable } from "@/components/home2/IzSpecTable";
import { IzStatRibbon } from "@/components/home2/IzStatRibbon";
import { IzTrustBar } from "@/components/home2/IzTrustBar";
import { AnswerPlatform } from "@/components/izanswer/AnswerPlatform";
import { izFontVars } from "@/lib/iz-fonts";

import { IzConsoleLaptop } from "./IzConsoleLaptop";
import { IzMechanismBand } from "./IzMechanismBand";
import { IzOutcomes } from "./IzOutcomes";
/* IzProHero — the design-canvas hero (00am) — is KEPT, not deleted.
   It is going on another page in v2, so the import stays even though
   the platform page no longer renders it. */
import { IzPlatformHero } from "./IzPlatformHero";
import { IzProStack } from "./IzProStack";
import { IzTrustEngine } from "./IzTrustEngine";

/* ============================================================
   /platform — the A0 hub, built to its storyboard end to end.

   Section order is docs/content/storyboards/platform.md, rows 1–18:
   nav · hero · trust bar · stat strip · plain answer · [quiet band] ·
   four layers · trust engine · [data ribbon] · request flow ·
   quick scan · [question band] · three outcomes · FAQ ·
   [mechanism band] · related · final CTA · footer.

   The bracketed rows are the interstitials. They are the reason the
   page reads as one argument rather than eight slabs that happen to
   abut: each one either states the claim the next section proves
   (IzQuietBand), hands over the numbers (IzStatRibbon), or asks the
   question the next section answers (IzQuestionBand).

   TWO RULES THIS PAGE IS BOUND BY
     1. HUB DISCIPLINE. Every figure is stated exactly once. 21 / 12 / 4
        live in IzTrustEngine and route to /platform/trust-engine;
        144 / 25 / 202 live in the ribbon and the spec sheet. Nothing
        restates them — not the interstitials, not the pre-footer band.
     2. NO VANITY NUMBERS. The trust bar carries capability facts, not
        customer, endpoint or seat counts, even though the storyboard's
        row 3.0 quotes them from the old site.

   Storyboard row 15.0 asks for an IzLogTape interstitial (a sanitised
   console log strip). That component does not exist, and a third log
   surface would be the page's fourth console. The slot stays EMPTY:
   IzFinalCta closes the page directly. IzMechanismBand used to fill it
   and has moved up against the decision layer it describes (user call,
   2026-08-14) — fifteen sections apart the two read as unrelated
   banners; together they are a claim and its picture.
   ============================================================ */

type Theme = "dark" | "paper";

const ANCHORS = [
  { id: "what", label: "What it is", icon: Sparkle },
  { id: "layers", label: "The four layers", icon: Stack },
  { id: "engine", label: "Trust Engine", icon: Cpu },
  { id: "flow", label: "One request", icon: ArrowsSplit },
  { id: "specs", label: "Quick scan", icon: ListChecks },
  { id: "outcomes", label: "What changes", icon: ShieldCheck },
  { id: "faq", label: "FAQ", icon: Question },
];

/* Answers are the Content Master's, trimmed to chat length. */
const FAQ = [
  {
    q: "Is InstaSafe a VPN?",
    a: "No. A VPN connects a device to a network. InstaSafe connects a verified user on a verified device to one specific application, without exposing the network at all. The VPN Alternative page has the full comparison.",
  },
  {
    q: "Do we have to replace our identity provider?",
    a: "No. InstaSafe syncs with AD, LDAP, Azure AD, Google Workspace and O365 — or it can act as your identity provider if you don't have one.",
  },
  {
    q: "What does the end user actually experience?",
    a: "A portal, or an agent, showing the applications they're allowed to use. One login, MFA as configured, one click per app. The access decision happens in milliseconds in the background.",
  },
  {
    q: "What can InstaSafe see of our traffic?",
    a: "Authentication metadata, policy decisions and the logs you export. Application data flows directly between your users and your apps — the split-plane design means it never transits InstaSafe infrastructure.",
  },
  {
    q: "How long does deployment take?",
    a: "The controller is cloud-delivered and the gateways are software, so there is no hardware to rack and no network re-architecture. A pilot group typically runs first, then expansion team by team, with the VPN kept in place until its users have moved.",
  },
  {
    q: "Which compliance frameworks does this support?",
    a: "The architecture aligns with NIST SP 800-207 and the CSA Software-Defined Perimeter, and supports controls required by PCI DSS, HIPAA, GDPR, SOX, ISO 27001 and India's DPDP Act.",
  },
];

/* Storyboard 10.0 — one request, end to end. This is the rail variant of
   IzSpecTable rather than a fifth console: the walkthrough is a list of
   ordered facts, and the page already spends three sections showing
   screens. The spine draws top→bottom as the section is reached. */
const FLOW = [
  {
    key: "01 · Request",
    value: "The user opens the agent or the browser portal and asks for an application.",
    note: "nothing has responded yet — assets sit dark behind a drop-all gateway",
    icon: Plugs,
  },
  {
    key: "02 · Identity",
    value: "The controller checks the directory and enforces the auth profile for this user group.",
    note: "your AD / LDAP / IdP, or InstaSafe's built-in directory",
    icon: UserCheck,
  },
  {
    key: "03 · Device",
    value: "The agent reports posture, and the device certificate is matched against the binding record.",
    note: "OS version, patching, antivirus, firewall, disk encryption",
    icon: Certificate,
  },
  {
    key: "04 · Context",
    value: "Location, IP range, time window and behavioural signals are scored against policy.",
    note: "anomalies raise risk; risk can force step-up or refuse outright",
    icon: Fingerprint,
  },
  {
    key: "05 · Connect",
    value: "Only now does the gateway open — one encrypted tunnel, this device to this application.",
    note: "the network is never exposed; the session is logged, and recorded where policy says so",
    icon: ShieldCheck,
  },
];

/* Storyboard 11.0 — the platform spec sheet. Ticks are the point: what
   the reader marks is exactly what lands on the clipboard, and filtering
   hides rows without clearing a selection. */
const SPEC_GROUPS = [
  { id: "Access", label: "access" },
  { id: "Identity", label: "identity" },
  { id: "Policy", label: "policy" },
  { id: "Audit", label: "audit" },
  { id: "Deployment", label: "deployment" },
];

const SPECS = [
  { group: "Access", key: "App types", value: "7 — FQDN, WEB, RDP, SSH, VNC, DB, WFS" },
  {
    group: "Access",
    key: "DB drivers",
    value: "PostgreSQL, MSSQL, SQL Server (GA); Oracle, Elasticsearch (beta); ClickHouse, MongoDB (alpha)",
  },
  { group: "Access", key: "Client OS", value: "Windows, macOS, Linux; mobile apps; clientless browser mode" },
  { group: "Identity", key: "Auth profiles", value: "8 · MFA methods: 6 · user providers: 3" },
  { group: "Identity", key: "Auth protocols", value: "SAML 2.0, OAuth, OpenID Connect, RADIUS, TACACS+, JWT, CAS" },
  { group: "Identity", key: "Directory sync", value: "AD, LDAP, Azure AD, Google Workspace, O365" },
  { group: "Policy", key: "Device checks", value: "25 types · 144 named rules · 1,500+ OS/device combos" },
  { group: "Policy", key: "Access policies", value: "21 combinations" },
  { group: "Policy", key: "Risk engine", value: "12 trigger types · 4 auto-actions" },
  { group: "Audit", key: "Logging", value: "202 event types · 11 report types · 7 SIEM export formats" },
  { group: "Audit", key: "Standards", value: "NIST SP 800-207, CSA SDP, PCI DSS, HIPAA, GDPR, SOX, ISO 27001" },
  { group: "Deployment", key: "Deployment", value: "Cloud controller; gateways as software" },
];

export function IzPlatformPage() {
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
      <IzPlatformHero />

      {/* ---------------- PROOF ---------------- */}
      <IzLogoMarquee />
      <IzTrustBar />
      <IzSideNav items={ANCHORS} />

      {/* ---------------- STAT STRIP (storyboard 4.0) ----------------
          The shape of the platform, not its spec sheet — the counts that
          make the four-layer claim concrete. The named-rule / check-type /
          event-type numbers belong to the ribbon further down, so they are
          deliberately absent here. */}
      <IzStatRibbon
        items={[
          { value: "4", label: "layers verified per request" },
          { value: "7", label: "application types, one portal" },
          { value: "1", label: "console, one agent, one policy engine" },
        ]}
      />

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="iz-section" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="The platform"
            heading="What is the InstaSafe platform?"
            question="One request."
            emphasis="Every"
            questionTail="check."
            answer="Most security tools answer one question each — a VPN answers whether you can reach the network, MFA answers whether the password is really yours, a posture tool answers whether the laptop is safe. InstaSafe asks all of them at once, on every single access request."
            points={[
              {
                title: "Four questions, asked together",
                body: "Who is asking, from what device, in what context, for which resource — every request is checked on all four before anything opens. An attacker has to get every answer right, not one.",
              },
              {
                title: "Then one connection, not a network",
                body: "A pass opens one encrypted tunnel to that one application. Not to the network it lives on, not to anything adjacent — one user, one app, one logged session.",
              },
              {
                title: "Everything else stays dark",
                body: "The network, the other servers, the databases and the internal apps the request never asked for remain unreachable — not firewalled off, simply never offered.",
              },
              {
                title: "One console runs all of it",
                body: "ZTNA, ZTAA, IAM, MFA, SSO and endpoint controls are one engine with one policy, not five tools with five ideas of who you are.",
              },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "What is Zero Trust", href: "/what-is-zero-trust" },
            ]}
            long={[
              "The problem with single-question tools is that attackers only need one of those answers to be wrong. A stolen password beats the MFA question if the VPN never asked about the device; a compliant laptop is irrelevant if the network lets anyone who is on it wander.",
              "Asking every question on every request inverts that. Before a user reaches any application — a web app, a remote desktop, an SSH server, a database — the platform verifies who they are, checks the device, evaluates the context, and then opens a connection to that one application only. The picture on the right is one such request, end to end.",
            ]}
            slot={{ kind: "art", art: AnswerPlatform }}
            stats={[
              { n: "4", label: "checks per request" },
              { n: "1", label: "application per tunnel" },
              { n: "0", label: "network access granted" },
            ]}
          />
        </div>
      </section>

      {/* ---------------- INTERSTITIAL (6.0) ----------------
          The claim the four layers below then prove. */}
      <IzQuietBand
        kicker="The shape of it"
        statement="Four layers, one decision,"
        emphasis="every time"
        tail="a session opens."
      />

      {/* ---------------- THE FOUR LAYERS ---------------- */}
      <div id="layers">
        <IzProStack />
      </div>

      {/* ---------------- THE DECISION LAYER ----------------
          Routes to /platform/trust-engine, where the twelve triggers and
          the four responses are actually enumerated. This block states
          each number once and stops. */}
      <div id="engine">
        <IzTrustEngine />
      </div>

      {/* ---------------- THE ENGINE, AS AN OBJECT ----------------
          Moved up out of the pre-footer slot (user call). It belongs
          against the decision layer it describes: that row states what
          the engine decides and links to the deep dive, and this states
          the same thing as one movement rather than as a console. Read
          fifteen sections apart they were two unrelated banners; read
          together they are a claim and its picture. The pre-footer slot
          is empty now by design — IzFinalCta closes the page. */}
      <IzMechanismBand />

      {/* ---------------- INTERSTITIAL (9.0) ----------------
          The storyboard's data ribbon quotes 144 / 25 / 202. It can't:
          the trust bar under the hero already carries all three, and the
          Trust Engine row above states 202 again. So this ribbon takes
          the three figures nothing else on the page has used, and each
          appears once more only in the spec sheet — the hub-states-once,
          list-carries-it pattern the sibling pages follow. */}
      <IzStatRibbon
        items={[
          { value: "1,500+", label: "OS and device combinations" },
          { value: "8", label: "configurable auth profiles" },
          { value: "11", label: "report types out of the box" },
        ]}
      />

      {/* ---------------- ONE REQUEST, END TO END ---------------- */}
      <section className="iz-section" id="flow">
        <div className="iz-wrap">
          <div className="izpl-head">
            <span className="iz-ey">The walkthrough</span>
            <h2 className="iz-h2">
              How a request <em>actually flows</em>.
            </h2>
            <p className="izpl-lead">
              Five steps, in order, between someone clicking an application and that application answering
              for the first time.
            </p>
          </div>
          <IzSpecTable variant="rail" label="one request _ end to end" rows={FLOW} />
        </div>
      </section>

      {/* ---------------- QUICK SCAN (11.0) ---------------- */}
      <section className="iz-section alt" id="specs">
        <div className="iz-wrap">
          <div className="izpl-head">
            <span className="iz-ey">Quick scan</span>
            <h2 className="iz-h2">
              The spec sheet, <em>as a checklist</em>.
            </h2>
            <p className="izpl-lead">
              Tick what your evaluation actually needs, then copy the shortlist straight into your ticket.
              Filtering hides rows; it never clears a tick.
            </p>
          </div>
          <IzSpecTable
            variant="checklist"
            label="quick scan _ platform specs"
            rows={SPECS}
            groups={SPEC_GROUPS}
            footNote="tick what your evaluation actually needs — take it into the demo"
          />
        </div>
      </section>

      {/* ---------------- INTERSTITIAL (12.0) ----------------
          The question the three outcomes answer. */}
      <IzQuestionBand
        variant="prompt"
        prompt="so what changes on monday"
        question="You have the VPN, the MFA vendor and the spreadsheets. What"
        emphasis="retires"
        questionTail="first?"
        stub="all three — and the network stops being the thing you grant"
        href="#outcomes"
      />

      {/* ---------------- THREE OUTCOMES ---------------- */}
      {/* `side="right"` because the stack above ends left-weighted —
          consecutive sections have to mirror or the page becomes the
          same slab twice (see IzOutcomes' own doctrine note). */}
      <div id="outcomes">
        <IzOutcomes
          side="right"
          tag="One console"
          title={["One platform,", "not five tools"]}
          sub="ZTNA, ZTAA, IAM, MFA, SSO and endpoint controls from one console — so the VPN, the separate MFA vendor and the access spreadsheets all retire together."
          visual={<IzConsoleLaptop />}
          outcomes={[
            {
              Icon: ShieldCheck,
              title: "One platform, not five tools",
              body: "ZTNA, ZTAA, IAM, MFA, SSO and endpoint controls from one console. Retire the VPN, the separate MFA vendor and the access spreadsheets.",
            },
            {
              Icon: EyeSlash,
              title: "Invisible infrastructure",
              body: "Server blackening means your applications don't appear on the internet at all. Attackers can't scan what doesn't respond.",
            },
            {
              Icon: ArrowsSplit,
              title: "Your data never touches us",
              body: "Split-plane architecture: InstaSafe runs the control plane; your data flows directly between your users and your apps.",
            },
          ]}
        />
      </div>

      {/* ---------------- FAQ ---------------- */}
      <section className="iz-section" id="faq">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            heading={
              <>
                The platform, <em>answered</em>.
              </>
            }
            sub="Tap a question — or open them all and read straight through."
          />
        </div>
      </section>

      {/* ---------------- RELATED ---------------- */}
      <section className="iz-section izpl-tight">
        <div className="iz-wrap">
          <IzRelatedRail
            variant="cards"
            links={[
              { kind: "platform", title: "ZTNA", href: "/zero-trust-network-access", desc: "The network layer — blackened servers, per-session tunnels, no lateral surface." },
              { kind: "platform", title: "ZTAA", href: "/zero-trust-application-access", desc: "The application layer — seven app types through one portal, recorded." },
              { kind: "platform", title: "Identity & Access", href: "/platform/iam", desc: "Directory sync, auth profiles and what each person is actually entitled to." },
              { kind: "resource", title: "Why InstaSafe", href: "/why-instasafe-zero-trust", desc: "Split-plane architecture, and what we can and cannot see of your traffic." },
            ]}
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
