"use client";

import { useEffect, useState } from "react";
import {
  Broadcast,
  Certificate,
  Compass,
  CursorClick,
  Database,
  Eye,
  GlobeSimple,
  ListChecks,
  Prohibit,
  Question,
  Record,
  ShieldCheck,
  SquaresFour,
  Stack,
  Target,
  UserCheck,
  UsersThree,
} from "@phosphor-icons/react";

import { ChatFaq } from "@/components/home2/ChatFaq";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzLogoMarquee } from "@/components/home2/IzLogoMarquee";
import { IzNav } from "@/components/home2/IzNav";
import { IzProblemCards } from "@/components/home2/IzProblemCards";
import { IzQuietBand, IzQuestionBand } from "@/components/home2/IzQuestionBand";
import { IzRelatedRail } from "@/components/home2/IzRelatedRail";
import { IzSideNav } from "@/components/home2/IzSideNav";
import { IzSpecTable } from "@/components/home2/IzSpecTable";
import { IzStatRibbon } from "@/components/home2/IzStatRibbon";
import { IzTrustBar } from "@/components/home2/IzTrustBar";
import { ZtaaSessionSplit } from "./ZtaaSessionSplit";
import { ZtaaProofHub } from "./ZtaaProofHub";
import { ZtaaUseCases } from "./ZtaaUseCases";
import { IzUserPortal } from "@/components/home2/IzUserPortal";
import { AnswerZtaa } from "@/components/izanswer/AnswerZtaa";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { ZtaaIdentity } from "@/components/izoutcomes/artifacts/ZtaaIdentity";
import { Magnetic } from "@/components/v2/Magnetic";
import { izFontVars } from "@/lib/iz-fonts";

import { ZtaaAppTypes, ZtaaConsole } from "./ZtaaScenes";

/* ============================================================
   /zero-trust-application-access — A1 PLATFORM DEEP.

   Section order follows the storyboard sheet (docs/content/
   storyboards/platform-ztaa.md). The URL is the existing live one
   and carries SEO equity: do not change it.

   TWO GUARDRAILS FROM THE CONTENT MASTER, BOTH LOAD-BEARING:
   · Database engine support must always be stated with its GA /
     beta / alpha status. It appears twice on this page and both
     places carry it.
   · Session control claims stop at recording, watermarking,
     clipboard, download and timeout. We do not claim screenshot
     blocking, print blocking or keylogger-class DLP anywhere.

   The signature interactive is the portal simulator — the reader
   picks a person and the tiles change, which is the whole product
   in one gesture. It sits at fold 4, never in the hero.
   ============================================================ */

const ANCHORS = [
  { id: "what", label: "What is ZTAA", icon: Compass },
  { id: "types", label: "Seven app types", icon: SquaresFour },
  { id: "signature", label: "Portal simulator", icon: CursorClick },
  { id: "session", label: "In-session control", icon: Record },
  { id: "specs", label: "Quick scan", icon: ListChecks },
  { id: "outcomes", label: "Outcomes", icon: Target },
  { id: "faq", label: "FAQ", icon: Question },
];

const FAQ = [
  {
    q: "What's the difference between ZTAA and ZTNA?",
    a: "ZTAA brokers access at the application layer — a browser portal, session controls, and no network path at all. ZTNA opens narrow IP-layer tunnels for the apps a browser can't deliver. One platform, both models, normally used together.",
  },
  {
    q: "Do users need to install anything?",
    a: "For web apps, no — the portal is clientless, which is what makes it workable for contractors and personal devices. For RDP, SSH and thick applications a lightweight agent handles device identity and the tunnel.",
  },
  {
    q: "Can we record what a vendor does on our server?",
    a: "Yes. Session recording with replay is set per app, and is typically on for every privileged and third-party session. That recording is usually the fastest way to close an audit finding about unsupervised vendor access.",
  },
  {
    q: "How granular can app provisioning get?",
    a: "Per user, per group, per app, with time windows and location conditions on top. A person's portal shows their entitlements and nothing else — an app they have no right to isn't greyed out, it isn't there.",
  },
  {
    q: "What stops data leaving through a session we allowed?",
    a: "Clipboard control, download policy, watermarking and recording. We deliberately do not claim screenshot or print blocking — anything that can be photographed off a screen is outside what any access product can honestly promise.",
  },
  {
    q: "Which databases can we broker access to?",
    a: "PostgreSQL, MSSQL and SQL Server are generally available. Oracle and Elasticsearch are in beta; ClickHouse and MongoDB are in alpha. DBAs connect through the portal under the same identity, posture and logging as every other session, so there are no shared credentials sitting in a spreadsheet.",
  },
  {
    q: "Does ZTAA cover our virtual desktop use cases?",
    a: "RDP and VNC through the portal cover most of what VDI is actually deployed for, at a fraction of the operational weight. Where you need full desktop virtualisation it stays a VDI job — we'd rather say so than sell you a replacement that isn't one.",
  },
];

type Theme = "dark" | "paper";

export function ZtaaPage() {
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
      <header className="ztaa-hero">
        <div className="iz-wrap ztaa-hero-in">
          <div>
            <span className="iz-ey">Zero Trust Application Access</span>
            {/* "No network" is held together so the headline breaks the
                way it is written — three sentences, then the payoff.
                Left to itself it split as "Every app. No / network". */}
            <h1 className="iz-h1">
              One portal. Every app.{" "}
              <span style={{ whiteSpace: "nowrap" }}>
                No <em>network</em>
              </span>{" "}
              exposed.
            </h1>
            <p className="iz-lead">
              Web apps, remote desktops, SSH, databases, file servers — opened from a browser, governed per session,
              invisible to everyone else.
            </p>
            <div className="ztaa-hero-cta">
              <Magnetic>
                <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                  Book a demo
                </a>
              </Magnetic>
              <a href="#signature" className="iz-btn iz-btn-ghost">
                Try the portal ↓
              </a>
            </div>
          </div>
          <ZtaaConsole />
        </div>
      </header>

      <IzLogoMarquee />
      <IzTrustBar />
      <IzSideNav items={ANCHORS} />

      <IzStatRibbon
        items={[
          { value: "7", label: "application types" },
          { value: "202", label: "event log types" },
          { value: "11", label: "built-in reports" },
          { value: "0", label: "network joined" },
        ]}
      />

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="ztaa-sec" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="Zero Trust Application Access"
            heading="What is ZTAA?"
            question="Applications,"
            emphasis="not"
            questionTail="networks."
            answer="Zero Trust Application Access delivers applications instead of networks. Where ZTNA opens a narrow tunnel at the network layer, ZTAA goes one step further up: the user never touches the network at all."
            points={[
              {
                title: "One sign-in, then a page of tiles",
                body: "They open a browser, sign in once, and see only the applications they have been provisioned. Click a tile and it opens — internal web app, Windows remote desktop, SSH terminal, database console or file share.",
              },
              {
                title: "Seven ways in, one door",
                body: "FQDN, WEB, RDP, SSH, VNC, DB and WFS all arrive through the same portal under the same identity. The engineer's shell and the finance team's ERP are one URL and one login apart.",
              },
              {
                title: "The session is governed, not just started",
                body: "Because access is brokered at the application layer, policy can act inside the session: recording the screen for privileged work, watermarking content, blocking copy-paste out of a sensitive app, controlling downloads.",
              },
              {
                title: "Everything that happened is on the record",
                body: "202 event types, 11 built-in reports and 7 SIEM export formats. Who opened what, from which device, and what they did once inside it.",
              },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "What is Zero Trust", href: "/what-is-zero-trust" },
            ]}
            long={[
              "For the person who has never heard any of these acronyms, the honest summary is this: your team gets one bookmark that safely contains their entire toolkit, and you get a log and a control point for every minute of use.",
              "The difference from a VPN is not incremental. A VPN puts the device on the network and then hopes the applications on it are well behaved. ZTAA never puts anything on the network — the broker holds the connection on one side and the user on the other, so an application the person has no right to is not hidden from them, it is simply not reachable from where they are standing.",
              "That is also why it suits people you do not employ. A contractor with a browser and no agent gets the two systems in scope, recorded, for the length of the contract. When the contract ends there is one thing to switch off, not an endpoint to chase.",
            ]}
            slot={{ kind: "art", art: AnswerZtaa }}
            stats={[
              { n: "7", label: "application types" },
              { n: "1", label: "portal to provision" },
              { n: "0", label: "agents for web apps" },
            ]}
          />
        </div>
      </section>

      <IzQuietBand
        statement="Granting access is easy."
        emphasis="Proving what happened next"
        tail="is the job."
      />

      {/* ---------------- THE PROBLEM ---------------- */}
      <div id="problem">
        <IzProblemCards
          heading="The tools are scattered."
          emphasis="So is the evidence."
          cards={[
            {
              icon: SquaresFour,
              title: "A toolkit held together by bookmarks",
              body: "Jump servers for SSH, a VDI farm for desktops, a vault for database credentials, a VPN for the rest. Every one is provisioned separately, logged separately, and forgotten separately when someone leaves.",
            },
            {
              icon: Eye,
              title: "Access granted, then unobserved",
              body: "Most access products can tell you a session started. Far fewer can tell you what happened inside it — which is the exact question an auditor asks about privileged and vendor work.",
            },
            {
              icon: UsersThree,
              title: "The people you don't manage",
              body: "Contractors, vendors and BYOD users arrive on devices you cannot install anything on. Handing them a VPN client is how third-party access becomes your incident.",
            },
          ]}
        />
      </div>

      {/* ---------------- SEVEN APP TYPES ---------------- */}
      <section className="ztaa-sec ztaa-sec--alt" id="types">
        <div className="iz-wrap">
          <div className="ztaa-head">
            <span className="iz-ey">Connect anyone</span>
            <h2>
              Seven application types. <em>One portal.</em>
            </h2>
            <p>
              The engineer&apos;s SSH session, the finance team&apos;s ERP, the auditor&apos;s read-only web view — one
              URL, one login, per-user tiles. Web, RDP, SSH and VNC open straight from the browser; a lightweight agent
              handles thick-client and certificate-based device identity where it is needed.
            </p>
          </div>
          <ZtaaAppTypes />
          <p className="iz-dim" style={{ marginTop: "var(--sp-6)", fontSize: "var(--fs-sm)", maxWidth: "76ch" }}>
            Database access covers PostgreSQL, MSSQL and SQL Server (generally available), Oracle and Elasticsearch
            (beta), ClickHouse and MongoDB (alpha) — brokered through the portal with the same identity, posture and
            logging as every other session.
          </p>
        </div>
      </section>

      {/* ---------------- SIGNATURE ---------------- */}
      <section className="ztaa-sec" id="signature">
        <div className="iz-wrap">
          <div className="ztaa-head">
            <span className="iz-ey">Signature interactive</span>
            <h2>
              Change the person. <em>Watch the portal change.</em>
            </h2>
            <p>
              This is what the person signing in actually sees. Switch between an infrastructure engineer, a finance
              systems lead and a designer — the applications, the network resources, the device and the history all
              change with them, because entitlements are the portal.
            </p>
          </div>
          <IzUserPortal />
        </div>
      </section>

      {/* ---------------- IN-SESSION CONTROL ----------------
          Was IzControlSurface (an endpoint-agent tile grid) followed by
          FilterStream (the "21 rule combinations" card). Both removed on
          the user's call: the tile grid belongs to the endpoint agent
          rather than to ZTAA, and FilterStream was breaking against the
          left border here.

          00w FeatureSplit replaces them with the eight controls that
          actually run for the life of a ZTAA session, each with a scene
          instead of a JSON console. See ZtaaSessionSplit. */}
      <section className="ztaa-mech ztaa-sec--alt" id="session">
        <div className="iz-wrap">
          <ZtaaSessionSplit />
        </div>
      </section>

      {/* ---------------- PROVE EVERYTHING ----------------
          Was a bare LiveActivity feed under a prose lead. The claim
          here is three numbers — 202 event types, 11 report types, 7
          SIEM formats — and one scrolling log could only ever show the
          first of them. 00i FeatureHub gives each number its own tab
          and its own picture. See ZtaaProofHub. */}
      <section className="ztaa-mech" id="prove">
        <div className="iz-wrap">
          <ZtaaProofHub />
        </div>
      </section>

      {/* ---------------- USE CASES ----------------
          Five populations, one gateway, on the 00ao tab-switch
          mechanism in the three-column arrangement the references use.
          Replaces IzUseCaseSwitch here: that component gives each case
          one console panel, and these cases are about WHO is asking and
          WHAT they reach — which needs a flow, not a key/value list.

          The middle stage is identical in all five on purpose. See the
          component header. */}
      <section className="ztaa-mech" id="usecases">
        <div className="iz-wrap">
          <div className="ztaa-mech-h">
            <span className="iz-ey">Where ZTAA lands</span>
            <h3>
              Same portal. <em>Very different people.</em>
            </h3>
            <p>
              Employees get their whole toolkit behind one login. Contractors get two systems, recorded, until the
              contract ends. Neither of them gets a network.
            </p>
          </div>
          <ZtaaUseCases />
        </div>
      </section>

      {/* ---------------- QUICK SCAN ---------------- */}
      <section className="ztaa-sec" id="specs">
        <div className="iz-wrap">
          <div className="ztaa-head">
            <span className="iz-ey">Quick scan</span>
            <h2>
              ZTAA specs, <em>at a glance</em>.
            </h2>
          </div>
          <div className="ztaa-spec2">
            <IzSpecTable
              variant="rail"
              rows={[
                { key: "Access model", value: "Application-layer brokering — browser portal + agent", icon: SquaresFour },
                { key: "App types", value: "FQDN, WEB, RDP, SSH, VNC, DB, WFS", icon: Stack },
                { key: "DB engines", value: "PostgreSQL / MSSQL / SQL Server GA", note: "Oracle, Elasticsearch beta · ClickHouse, MongoDB alpha", icon: Database },
                { key: "Clientless", value: "WEB, RDP, SSH and VNC open from the browser", icon: GlobeSimple },
                { key: "Session controls", value: "Recording, watermark, clipboard, download, timeout", icon: Record },
              ]}
            />
            <IzSpecTable
              variant="rail"
              rows={[
                { key: "Identity", value: "SSO — SAML 2.0, OAuth, OIDC · 6 MFA methods · 8 auth profiles", icon: UserCheck },
                { key: "Device", value: "Binding + 25 posture checks when agented", note: "Session controls compensate in clientless mode", icon: Certificate },
                { key: "Policy", value: "21 context combinations · 12 risk triggers · 4 auto-actions", icon: ShieldCheck },
                { key: "Logging", value: "202 event types · 11 reports · 7 SIEM formats", icon: ListChecks },
                { key: "Companion", value: "ZTNA for anything a browser cannot deliver", icon: Broadcast },
              ]}
            />
          </div>
        </div>
      </section>

      <IzStatRibbon
        items={[
          { value: "7", label: "application types" },
          { value: "21", label: "policy combinations" },
          { value: "202", label: "event log types" },
        ]}
      />

      {/* ---------------- THREE OUTCOMES ---------------- */}
      <div id="outcomes">
        <IzOutcomes
          side="left"
          tag="ZTAA outcomes"
          title={["One record.", "Every session", "it opens."]}
          accentFrom={1}
          sub="One provisioning surface across all seven application types. What a person may reach, what they may do inside it, and what they did — all decided from the same record."
          artifact={ZtaaIdentity}
          outcomes={[
            {
              Icon: Broadcast,
              title: "The network stops being the product",
              body: "Users consume applications. The network disappears from their world — and from the attacker's.",
            },
            {
              Icon: Record,
              title: "In-session governance",
              body: "Recording, watermarking and clipboard policy turn “we granted access” into “we can prove what happened”.",
            },
            {
              Icon: Prohibit,
              title: "One door to close",
              body: "Joiner, mover and leaver become a single provisioning action across all seven application types.",
            },
          ]}
        />
      </div>

      {/* ---------------- FAQ ---------------- */}
      <section className="ztaa-sec" id="faq">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            heading={<>ZTAA, <em>answered</em>.</>}
            sub="Tap a question — or open them all and read straight through."
          />
        </div>
      </section>

      <IzQuestionBand
        variant="prompt"
        prompt="what about the apps a browser cannot open"
        question="Thick clients, legacy protocols, engineering tools. What"
        emphasis="carries"
        questionTail="those?"
        stub="ZTNA — the same platform, one layer down"
        href="/zero-trust-network-access"
      />

      {/* ---------------- RELATED ---------------- */}
      <section className="ztaa-sec ztaa-sec--tight">
        <div className="iz-wrap">
          <IzRelatedRail
            variant="cards"
            links={[
              { kind: "platform", title: "ZTNA", href: "/zero-trust-network-access", desc: "The network-layer sibling, for anything a browser cannot reach." },
              { kind: "solution", title: "Third-Party Access", href: "/solutions/third-party-access", desc: "Clientless, time-boxed and recorded access for people you don't employ." },
              { kind: "solution", title: "DevOps Access", href: "/secure-devops-access", desc: "Governed SSH, RDP and repository paths without changing how developers work." },
              { kind: "platform", title: "Secure Enterprise Browser", href: "/secure-enterprise-browser", desc: "Where the data controls live once the app is open." },
            ]}
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
