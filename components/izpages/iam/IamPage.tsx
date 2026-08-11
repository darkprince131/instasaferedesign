"use client";

import { useEffect, useState } from "react";
import {
  ArrowsClockwise,
  Certificate,
  Compass,
  CursorClick,
  Database,
  Fingerprint,
  IdentificationCard,
  Key,
  ListChecks,
  Lock,
  Path,
  Question,
  ShieldCheck,
  SignIn,
  Target,
  UserCheck,
  UsersThree,
  Warning,
} from "@phosphor-icons/react";

import { ChatFaq } from "@/components/home2/ChatFaq";
import { FilterStream } from "@/components/home2/FilterStream";
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
import { LiveActivity } from "@/components/home2/LiveActivity";
import { AnswerIam } from "@/components/izanswer/AnswerIam";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { IamDirectory } from "@/components/izoutcomes/artifacts/IamDirectory";
import { Magnetic } from "@/components/v2/Magnetic";
import { izFontVars } from "@/lib/iz-fonts";

import { IamHeroScene, IamPolicyLab, IamSources } from "./IamScenes";

/* ============================================================
   /platform/iam — A1 PLATFORM DEEP.

   Section order follows docs/content/storyboards/platform-iam.md.
   This URL is an ADDED page, not a legacy sitemap one — the live
   sitemap has no single IAM url, which is why it was allowed. It
   still must not be renamed: it is already linked from the nav, the
   footer and every sibling platform page.

   The page previously rendered the v3 blue system (NavV3,
   LivingBackground, sections/Footer). This is the `.iz` rebuild;
   nothing about the URL or the metadata changed.
   ============================================================ */

const ANCHORS = [
  { id: "what", label: "What is IAM", icon: Compass },
  { id: "problem", label: "The problem", icon: Warning },
  { id: "sources", label: "Where identity lives", icon: Database },
  { id: "signature", label: "Policy tracer", icon: CursorClick },
  { id: "prove", label: "Reporting", icon: Path },
  { id: "specs", label: "Quick scan", icon: ListChecks },
  { id: "outcomes", label: "Outcomes", icon: Target },
  { id: "faq", label: "FAQ", icon: Question },
];

const FAQ = [
  {
    q: "We already have Azure AD. Why do we need this?",
    a: "Keep it. InstaSafe syncs from Azure AD and then enforces it everywhere Azure AD alone cannot reach — thick clients, SSH, RDP, network gear over RADIUS and TACACS+, and OS logons — with device posture in the decision.",
  },
  {
    q: "Can InstaSafe be our only identity provider?",
    a: "Yes. The built-in directory plus the IdP protocols cover organisations with no existing directory, and you can move to an external one later without redoing your access model.",
  },
  {
    q: "What is risk-based authentication in practice?",
    a: "Rules like “outside India → deny”, “new device → step-up MFA”, “outside 07:00–21:00 → require approval”. Conditions stack per group, so admins and interns do not get the same friction.",
  },
  {
    q: "Does self-serve password reset really matter?",
    a: "Password resets are consistently one of the largest helpdesk categories. Self-service against Active Directory removes most of that queue without loosening the policy behind it.",
  },
  {
    q: "How many MFA methods can one user have?",
    a: "Multiple methods can be enrolled per user. The auth profile decides which are acceptable for that group and when a step-up is demanded — the user does not choose their own security level.",
  },
  {
    q: "What actually happens when someone leaves?",
    a: "Disable the identity once in the directory. The portal, the provisioned applications, the tunnels and the OS logins all close together, because they were all reading the same record rather than keeping their own copy.",
  },
];

type Theme = "dark" | "paper";

export function IamPage() {
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
      <header className="iam-hero">
        <div className="iz-wrap iam-hero-in">
          <div>
            <span className="iz-ey">Identity &amp; Access Management</span>
            {/* Three phrases, three lines — the headline is a list and
                reads as one only if the commas land at the line ends.
                Left to the column width it broke as "the right /
                resource, the / right time." */}
            <h1 className="iz-h1">
              <span style={{ whiteSpace: "nowrap" }}>The right user,</span>{" "}
              <span style={{ whiteSpace: "nowrap" }}>the right resource,</span>{" "}
              <span style={{ whiteSpace: "nowrap" }}>
                the right <em>time</em>.
              </span>
            </h1>
            <p className="iz-lead">
              One identity layer across on-prem, cloud and hybrid — directory sync, SSO, MFA and risk-based decisions
              from a single control plane.
            </p>
            <div className="iam-hero-cta">
              <Magnetic>
                <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                  Book a demo
                </a>
              </Magnetic>
              <a href="#signature" className="iz-btn iz-btn-ghost">
                Trace a login ↓
              </a>
            </div>
          </div>
          <IamHeroScene />
        </div>
      </header>

      <IzLogoMarquee />
      <IzTrustBar />
      <IzSideNav items={ANCHORS} />

      <IzStatRibbon
        items={[
          { value: "8", label: "auth profiles" },
          { value: "6", label: "MFA methods" },
          { value: "7", label: "IdP protocols" },
          { value: "11", label: "report types" },
        ]}
      />

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="iam-sec" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="Identity &amp; Access Management"
            heading="What is IAM?"
            question="Who they are,"
            emphasis="what"
            questionTail="they may touch."
            answer="Identity and Access Management is the discipline of knowing, at all times, three things: who your users are, what each of them is allowed to touch, and whether the person at the keyboard right now is really that user."
            points={[
              {
                title: "Users live in a directory",
                body: "Not in a spreadsheet and not in a manager's memory. One record per person, synced from Active Directory, LDAP, Azure AD, Google Workspace or O365 — or held in InstaSafe's own directory if you have none.",
              },
              {
                title: "Access is granted to roles, not to people",
                body: "Groups and roles carry the entitlements; individuals inherit them. Your AD group structure becomes your access model instead of being re-typed into a second one.",
              },
              {
                title: "Authentication is layered",
                body: "Something you know, something you have, something you are — password, phone or hardware key, fingerprint or face. Which layers apply is set per group through 8 auth profiles.",
              },
              {
                title: "And when someone leaves, one action removes everything",
                body: "Disable the identity once. Portal, applications, tunnels and OS logins close together, because none of them kept a private copy of the user.",
              },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "What is Zero Trust", href: "/what-is-zero-trust" },
            ]}
            long={[
              "Small companies do this informally — a shared spreadsheet, a manager's memory. It stops working at exactly the moment it starts mattering: the first audit, the first departure of a privileged employee, the first phishing wave.",
              "An IAM system makes identity a managed asset instead of an assumption. The directory is the single record, roles carry the entitlements, and authentication is layered so that a stolen password on its own is not a working key.",
              "InstaSafe's IAM is built into the access platform rather than bolted beside it — which means every identity decision immediately governs real access to real applications, not just a login page. The same record that says who someone is also decides which tunnel opens and which OS logon succeeds.",
            ]}
            slot={{ kind: "art", art: AnswerIam }}
            stats={[
              { n: "8", label: "auth profiles" },
              { n: "6", label: "MFA methods" },
              { n: "1", label: "action to offboard" },
            ]}
          />
        </div>
      </section>

      <IzQuietBand
        statement="A login page is not access control."
        emphasis="What it opens"
        tail="is."
      />

      {/* ---------------- THE PROBLEM ---------------- */}
      <div id="problem">
        <IzProblemCards
          heading="Identity drifts."
          emphasis="Quietly, and in every direction."
          cards={[
            {
              icon: UsersThree,
              title: "Two user lists, one truth",
              body: "The directory says someone left. The VPN, the jump box and three SaaS tenants have not heard. Every extra copy of the user list is a door nobody is watching.",
            },
            {
              icon: Key,
              title: "Passwords doing a job they cannot do",
              body: "A valid credential from a new country on an unmanaged laptop looks exactly like a valid credential. Without device and context in the decision, authentication is a single point of failure.",
            },
            {
              icon: Certificate,
              title: "Access nobody can evidence",
              body: "The audit does not ask whether you have IAM. It asks who could reach the finance system last March, and what proved it was them. That answer has to exist before it is asked for.",
            },
          ]}
        />
      </div>

      {/* ---------------- WHERE IDENTITY LIVES ---------------- */}
      <section className="iam-sec iam-sec--alt" id="sources">
        <div className="iz-wrap">
          <div className="iam-head">
            <span className="iz-ey">Directory &amp; provider</span>
            <h2>
              Consume identity. <em>Then issue it.</em>
            </h2>
            <p>
              Sync users and groups from what you already run — three provider types can coexist — or let InstaSafe be
              the directory. Either way it also acts as an identity provider downstream, which is how one identity
              reaches equipment a browser-based IdP never will.
            </p>
          </div>
          <IamSources />
        </div>
      </section>

      {/* ---------------- SIGNATURE ---------------- */}
      <section className="iam-sec" id="signature">
        <div className="iz-wrap">
          <div className="iam-head">
            <span className="iz-ey">Signature interactive</span>
            <h2>
              One person. <em>Four contexts.</em> Four answers.
            </h2>
            <p>
              Same user, same entitlements, same password. Only the context around the login changes — and the verdict
              changes with it. That is what risk-based authentication means in practice, and why a credential on its own
              stops being a key.
            </p>
          </div>
          <IamPolicyLab />
        </div>
      </section>

      <FilterStream href="/multifactor-authentication" />

      {/* ---------------- PROVE EVERYTHING ---------------- */}
      <section className="iam-sec" id="prove">
        <div className="iz-wrap">
          <div className="iam-head">
            <span className="iz-ey">Reporting</span>
            <h2>
              Every login, <em>on the record</em>.
            </h2>
            <p>
              Login activity, authentication summaries and device login reports — 11 report types, exportable, SIEM
              ready. Inactive users are warned, suspended or removed on schedule, so the gaps a joiner-mover-leaver
              process leaves open close on their own.
            </p>
          </div>
          <LiveActivity headless />
        </div>
      </section>

      {/* ---------------- QUICK SCAN ---------------- */}
      <section className="iam-sec iam-sec--alt" id="specs">
        <div className="iz-wrap">
          <div className="iam-head">
            <span className="iz-ey">Quick scan</span>
            <h2>
              IAM specs, <em>at a glance</em>.
            </h2>
          </div>
          <div className="iam-spec2">
            <IzSpecTable
              variant="rail"
              rows={[
                { key: "Directory sync", value: "AD, LDAP, Azure AD, Google Workspace, O365, built-in", icon: Database },
                { key: "Provider types", value: "3 concurrent", icon: ArrowsClockwise },
                { key: "IdP protocols", value: "SAML 2.0, RADIUS, OIDC, OAuth, JWT, CAS, TACACS+", icon: IdentificationCard },
                { key: "Auth profiles", value: "8 profiles · 6 MFA methods", icon: Fingerprint },
              ]}
            />
            <IzSpecTable
              variant="rail"
              rows={[
                { key: "Risk conditions", value: "IP · geolocation · device · time", icon: ShieldCheck },
                { key: "RBAC", value: "Roles, groups, per-app entitlements", icon: UserCheck },
                { key: "OS-level auth", value: "Windows logon, RDP, SSH, VDI", icon: Lock },
                { key: "Self-service", value: "AD password reset", icon: SignIn },
              ]}
            />
          </div>
        </div>
      </section>

      <IzStatRibbon
        items={[
          { value: "7", label: "IdP protocols" },
          { value: "3", label: "concurrent providers" },
          { value: "202", label: "event log types" },
        ]}
      />

      {/* ---------------- THREE OUTCOMES ---------------- */}
      <div id="outcomes">
        <IzOutcomes
          side="left"
          tag="IAM outcomes"
          title={["One record.", "Every door", "it opens."]}
          accentFrom={1}
          sub="Sources converge on a single identity, and the estate follows it — including the parts of the estate a browser never touches."
          artifact={IamDirectory}
          outcomes={[
            {
              Icon: Database,
              title: "One source of identity truth",
              body: "Your directory drives everything. There is no second user list left to drift out of date.",
            },
            {
              Icon: UserCheck,
              title: "Offboarding in one action",
              body: "Disable the user once — portal, apps, tunnels and OS logins all close together.",
            },
            {
              Icon: Fingerprint,
              title: "Authentication that matches risk",
              body: "Admins get hard factors, low-risk roles get low friction, and anomalies get challenged automatically.",
            },
          ]}
        />
      </div>

      {/* ---------------- FAQ ---------------- */}
      <section className="iam-sec" id="faq">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            heading={<>IAM, <em>answered</em>.</>}
            sub="Tap a question — or open them all and read straight through."
          />
        </div>
      </section>

      <IzQuestionBand
        variant="prompt"
        prompt="so which factor does a given person actually get"
        question="Six methods, eight profiles. Who"
        emphasis="decides"
        questionTail="which?"
        stub="the auth profile does — per group, not per user"
        href="/multifactor-authentication"
      />

      {/* ---------------- RELATED ---------------- */}
      <section className="iam-sec iam-sec--tight">
        <div className="iz-wrap">
          <IzRelatedRail
            variant="cards"
            links={[
              { kind: "platform", title: "Single Sign-On", href: "/zero-trust-features/single-sign-on", desc: "One authenticated session, every provisioned tile." },
              { kind: "platform", title: "Multi-Factor Authentication", href: "/multifactor-authentication", desc: "The six methods, and which profile demands which." },
              { kind: "platform", title: "Device Posture", href: "/zero-trust-features/device-posture-check", desc: "The other half of the decision — 25 checks before the door opens." },
              { kind: "platform", title: "ZTAA", href: "/zero-trust-application-access", desc: "Where an identity decision turns into a governed session." },
            ]}
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
