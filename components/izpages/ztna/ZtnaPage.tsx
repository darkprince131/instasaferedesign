"use client";

import { BreachSimulator } from "@/components/interactives/breach-simulator/BreachSimulator";
import { ConsoleRow } from "@/components/home2/ConsoleRow";
import { DeviceBindingDemo } from "@/components/console/DeviceBindingConsole";
import { DeviceCheckBuilder } from "@/components/console/DeviceCheckBuilder";
import { FeatureSplit } from "@/components/home2/FeatureSplit";
import { LiveActivity } from "@/components/home2/LiveActivity";
import { ChatFaq } from "@/components/home2/ChatFaq";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzTrustBar } from "@/components/home2/IzTrustBar";
import { IzStatRibbon } from "@/components/home2/IzStatRibbon";
import { IzProblemCards } from "@/components/home2/IzProblemCards";
import { IzTunnelCards } from "@/components/home2/IzTunnelCards";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzQuietBand, IzQuestionBand } from "@/components/home2/IzQuestionBand";
import { IzSpecTable } from "@/components/home2/IzSpecTable";
import { IzRelatedRail } from "@/components/home2/IzRelatedRail";
import { IzSideNav } from "@/components/home2/IzSideNav";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { Magnetic } from "@/components/v2/Magnetic";
import { izFontVars } from "@/lib/iz-fonts";
import { useEffect, useState } from "react";
import {
  ArrowsOutCardinal,
  Broadcast,
  Certificate,
  ClockCounterClockwise,
  CurrencyDollar,
  Devices,
  GlobeHemisphereEast,
  LinkSimple,
  Prohibit,
  ShieldCheck,
  Stack,
  UserCheck,
} from "@phosphor-icons/react";
import { AlwaysOnBoot, BlackeningScene, HeroConsole, OutcomesOrbit } from "./ZtnaScenes";

/* ============================================================
   /zero-trust-network-access — A1 PLATFORM DEEP.

   Section order follows the storyboard sheet exactly. URL is the
   existing live one and carries SEO equity: do not change it.
   ============================================================ */

const ANCHORS = [
  { id: "what", label: "What is ZTNA" },
  { id: "problem", label: "The problem" },
  { id: "signature", label: "Breach simulator" },
  { id: "how", label: "How it works" },
  { id: "specs", label: "Quick scan" },
  { id: "outcomes", label: "Outcomes" },
  { id: "faq", label: "FAQ" },
];

const FAQ = [
  { q: "What is ZTNA in simple terms?", a: "A way to give people access to specific work applications without giving them access to the network those applications live on. Verify the person and device first; connect them to one app only." },
  { q: "How is ZTNA different from a VPN?", a: "A VPN puts your device on the corporate network. ZTNA never does — it builds a narrow tunnel to a single application after verifying you and your device. No network access means no lateral movement." },
  { q: "When do I need ZTNA vs ZTAA?", a: "ZTNA for anything a browser can't reach — thick clients, custom protocols, legacy client-server apps. ZTAA for web apps, RDP, SSH, and databases through the browser portal. Most customers run both; it's one platform." },
  { q: "Does ZTNA work for on-premise apps or only cloud?", a: "Both. Gateways deploy in front of on-prem data centres, private cloud, and public cloud alike; policy is identical everywhere." },
  { q: "What happens if a user's device fails a posture check mid-session?", a: "The risk engine can respond automatically — step-up MFA, restriction, alert, or termination — depending on the policy you set." },
  { q: "Is ZTNA suitable long term or a stopgap?", a: "ZTNA is the architecture VPNs are being replaced with, and the model NIST SP 800-207 describes. It's a strategy, not a patch." },
  { q: "Can attackers scan our gateways?", a: "Scans receive no response — drop-all plus Single Packet Authorization means the gateway only ever answers pre-authenticated callers." },
];

const CONTEXT_FEATURES = [
  {
    id: "geo",
    icon: GlobeHemisphereEast,
    title: "Geolocation",
    viz: { kind: "json" as const, file: "policy.geo.json", lines: [`{`, `  "group": "contractors-in",`, `  "country": ["IN"],`, `  "outside": "deny"`, `}`] },
  },
  {
    id: "ip",
    icon: Stack,
    title: "IP range",
    viz: { kind: "json" as const, file: "policy.ip.json", lines: [`{`, `  "group": "finance",`, `  "allow_cidr": ["10.4.0.0/16"],`, `  "else": "step_up_mfa"`, `}`] },
  },
  {
    id: "time",
    icon: ClockCounterClockwise,
    title: "Time window",
    viz: { kind: "json" as const, file: "policy.time.json", lines: [`{`, `  "window": "09:00-18:00",`, `  "tz": "Asia/Kolkata",`, `  "outside": "deny"`, `}`] },
  },
  {
    id: "expiry",
    icon: Prohibit,
    title: "Contract expiry",
    viz: { kind: "json" as const, file: "policy.expiry.json", lines: [`{`, `  "expires": "2026-09-30",`, `  "on_expiry": "revoke_all"`, `}`] },
  },
];

type Theme = "dark" | "paper";

export function ZtnaPage() {
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
      <header className="ztna-sec ztna-sec--tight">
        <div className="iz-wrap">
          <span className="iz-ey">Zero Trust Network Access</span>
          <h1 className="iz-h1" style={{ maxWidth: "18ch" }}>
            Network access that assumes nothing and <em>verifies everything</em>.
          </h1>
          <p className="iz-lead">
            Connect users to IP-layer resources — thick clients, legacy systems, network protocols — without putting
            your network on the internet.
          </p>
          <div className="iz-hero-cta" style={{ marginTop: "var(--sp-8)" }}>
            <Magnetic>
              <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                Book a demo
              </a>
            </Magnetic>
            <a href="#signature" className="iz-btn iz-btn-ghost">
              See the Breach Simulator ↓
            </a>
          </div>
        </div>
        <div className="iz-wrap" style={{ marginTop: "var(--sp-12)" }}>
          <HeroConsole />
        </div>
      </header>

      <IzTrustBar />
      <IzSideNav items={ANCHORS} />

      <IzStatRibbon
        items={[
          { value: "25", label: "device check types" },
          { value: "21", label: "policy combinations" },
          { value: "0", label: "ports answering a scan" },
          { value: "202", label: "event log types" },
        ]}
      />

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="ztna-sec" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="Zero Trust Network Access"
            heading="What is ZTNA?"
            question="Your identity"
            emphasis="is"
            questionTail="the network perimeter."
            answer="Zero Trust Network Access is the replacement architecture for the corporate VPN. Both solve the same surface problem — letting someone outside the office reach something inside it — but they solve it in opposite ways."
            points={[
              { title: "No network to move across", body: "A tunnel is scoped to one resource. Two apps means two tunnels, each policy-checked on its own. Compromising a session yields exactly that session." },
              { title: "Nothing answers a scan", body: "Gateways run drop-all with Single Packet Authorization. Port scans return nothing at all, so there is no version to fingerprint ahead of patch day." },
              { title: "The device is checked, every time", body: "25 posture check types across 144 named rules and 1,500+ OS combinations, evaluated before the tunnel opens and re-evaluated during the session." },
              { title: "Built for what a browser cannot reach", body: "Thick-client ERP front-ends, legacy client-server systems, custom TCP/UDP protocols, engineering tools. ZTAA is the application-layer sibling." },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "What is Zero Trust", href: "/what-is-zero-trust" },
            ]}
            long={[
              "A VPN extends the network out to the user. Once connected, the user's device is effectively on the corporate network, able to see and probe far more than the one application they needed. That's why a single stolen VPN credential so often becomes a full network breach: the attacker inherits the network, then moves laterally.",
              "ZTNA inverts this. The network is never extended anywhere. Instead, after the user and device are verified, a narrow encrypted tunnel opens from that device to that one resource. The user gets their application; they get nothing else. There is no network to move laterally across, because from the user's side, no network is visible.",
            ]}
            slot={{
              kind: "terminal",
              title: "priya@laptop · acme-bank",
              badge: "Session recorded",
              lines: [
                { cmd: "connect erp-core.acme.internal" },
                { out: "identity: priya@acme.co · device: bound, cert valid" },
                { out: "posture: 25/25 checks pass · patch level ok" },
                { out: "tunnel open · 1 resource · ttl 8h", tone: "ok" },
                { cmd: "nmap -sS 10.20.0.0/16" },
                { out: "0 hosts up · 0 ports answered", tone: "no" },
                { cmd: "connect payments-admin.acme.internal" },
                { out: "denied by policy: role not in payments-admin", tone: "no" },
              ],
            }}
            stats={[
              { n: "1", label: "resource reachable" },
              { n: "0", label: "network visible" },
              { n: "202", label: "event types logged" },
            ]}
          />
        </div>
      </section>

      <IzQuietBand
        statement="A stolen password should cost you one session,"
        emphasis="not the estate"
        tail="behind it."
      />

      {/* ---------------- THE PROBLEM ---------------- */}
      <div id="problem">
        <IzProblemCards
          heading="The problem is not the login."
          emphasis="It is everything after it."
          cards={[
            { icon: ArrowsOutCardinal, title: "Lateral movement", body: "One phished credential on a VPN is a foothold on the whole segment. Attackers routinely pivot from an unimportant entry point to crown-jewel systems. ZTNA removes the network between them." },
            { icon: Broadcast, title: "Visible attack surface", body: "Every internet-facing IP is scanned within minutes of going live. VPN concentrators are among the most exploited devices on the internet — each CVE is a race against your patch window." },
            { icon: CurrencyDollar, title: "Scale and cost", body: "Concentrator hardware sized for peak load, licensed per box, refreshed every few years. Remote workforce doubled? Buy more boxes. ZTNA is software: scaling is a configuration change." },
          ]}
        />
      </div>

      {/* ---------------- SIGNATURE ---------------- */}
      <section className="ztna-sec" id="signature">
        <div className="iz-wrap">
          <div className="ztna-head">
            <span className="iz-ey">Signature interactive</span>
            <h2>
              Steal a credential. <em>Watch where it gets you.</em>
            </h2>
            <p>
              The same stolen password, run against both architectures. On the VPN it spreads. On ZTNA it stops at the
              one session it was issued for.
            </p>
          </div>
          <BreachSimulator />
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="ztna-sec" id="how">
        <div className="iz-wrap">
          <div className="ztna-head">
            <span className="iz-ey">Feature depth</span>
            <h2>
              How InstaSafe ZTNA <em>actually works</em>.
            </h2>
            <p>Seven mechanisms. Each one runs on every request &mdash; not a setting you enable once.</p>
          </div>
        </div>
      </section>

      {/* --- Server blackening: the WHOLE section is dark --- */}
      <section className="ztna-darksec iz-inverted">
        <div className="iz-wrap">
          <div className="ztna-mech-h">
            <span className="iz-ey">Server blackening</span>
            <h3>
              To the internet, your infrastructure <em>does not exist</em>.
            </h3>
            <p>
              Your gateways run a drop-all policy: any unauthorised packet is silently discarded. Port scans return
              nothing. Authorised users reach it through Single Packet Authorization &mdash; the gateway only answers
              callers that have already proven who they are.
            </p>
          </div>
          <BlackeningScene />
        </div>
      </section>

      {/* --- Per-session tunnels --- */}
      <section className="ztna-mech">
        <div className="iz-wrap">
          <div className="ztna-mech-h">
            <span className="iz-ey">Per-session tunnels</span>
            <h3>
              One session in, <em>one session out</em>.
            </h3>
            <p>
              Each authorised session gets its own encrypted tunnel scoped to one resource. Two apps means two tunnels,
              each independently policy-checked. Compromising one session yields exactly one session.
            </p>
          </div>
          <IzTunnelCards />
        </div>
      </section>

      {/* --- Device binding --- */}
      <section className="ztna-mech ztna-sec--alt ztna-crow">
        <ConsoleRow
          eyebrow="Device binding"
          title={<>Credentials say who. <em>Binding says from what.</em></>}
          body="Sessions are tied to an approved device certificate. A valid password on an unapproved laptop fails at the device gate. Administrators review and approve devices before first use, and can revoke instantly."
          ctaLabel="Device Binding"
          ctaHref="/zero-trust-features/device-binding"
        >
          <DeviceBindingDemo consoleOnly />
        </ConsoleRow>
      </section>

      {/* --- Device posture --- */}
      <section className="ztna-mech ztna-crow">
        <ConsoleRow
          reverse
          eyebrow="Device posture enforcement"
          title={<>The user checked out. <em>Is the laptop lying?</em></>}
          body="25 check types — OS version and patch level, antivirus presence and state, firewall status, disk encryption and more — evaluated against 144 named rules covering 1,500+ OS and device combinations. Posture drift mid-session can trigger risk actions."
          ctaLabel="Device Posture"
          ctaHref="/zero-trust-features/device-posture-check"
        >
          <DeviceCheckBuilder />
        </ConsoleRow>
      </section>

      {/* --- Always-On --- */}
      <section className="ztna-mech ztna-sec--alt ztna-crow">
        <ConsoleRow
          eyebrow="Always-On mode"
          title={<>Protected from the moment it <em>boots</em>.</>}
          body="The tunnel establishes at device boot, silently, via certificate. Users never forget to connect; security teams never depend on user behaviour."
          ctaLabel="Always-On"
          ctaHref="/zero-trust-features/always-on"
        >
          <AlwaysOnBoot />
        </ConsoleRow>
      </section>

      {/* --- Context controls --- */}
      <section className="ztna-mech">
        <div className="iz-wrap">
          <div className="ztna-mech-h">
            <span className="iz-ey">Context controls</span>
            <h3>
              Valid here, now, and <em>for this contract</em>.
            </h3>
            <p>
              Geolocation, IP-range and time-window conditions per user group. A contractor&apos;s access can be valid
              9&ndash;6 IST from India only, and expire with the contract.
            </p>
          </div>
          <FeatureSplit
            features={CONTEXT_FEATURES}
            eyebrow="Conditions per user group_"
            title={<>Four conditions, <em>one decision</em>.</>}
            lead="Every condition below is evaluated together, per session, before a packet reaches the app."
            cta={false}
          />
        </div>
      </section>

      {/* --- Full audit pipeline --- */}
      <section className="ztna-mech ztna-sec--alt">
        <div className="iz-wrap">
          <div className="ztna-mech-h">
            <span className="iz-ey">Full audit pipeline</span>
            <h3>
              Every decision, <em>answerable months later</em>.
            </h3>
            <p>
              202 event types logged, 11 built-in report types, export in 7 SIEM formats. Who reached what, from which
              device, when, and what policy decided &mdash; for every session ever.
            </p>
          </div>
          <LiveActivity headless />
        </div>
      </section>

      {/* ---------------- QUICK SCAN ---------------- */}
      <section className="ztna-sec" id="specs">
        <div className="iz-wrap">
          <div className="ztna-head">
            <span className="iz-ey">Quick scan</span>
            <h2>
              ZTNA specs, <em>at a glance</em>.
            </h2>
          </div>
          <div className="ztna-spec2">
            <IzSpecTable
              variant="rail"
              rows={[
                { key: "Layer", value: "IP (L3/L4) — thick clients, protocols, legacy apps", icon: Stack },
                { key: "Gateway model", value: "Software gateway, drop-all + SPA", icon: ShieldCheck },
                { key: "Tunnels", value: "Per-session, per-resource, encrypted", icon: Broadcast },
                { key: "Device trust", value: "Binding + posture", note: "25 checks / 144 rules", icon: Certificate },
                { key: "Auth", value: "Directory sync or built-in IdP · 6 MFA methods", icon: UserCheck },
              ]}
            />
            <IzSpecTable
              variant="rail"
              rows={[
                { key: "Companion", value: "ZTAA for application-layer access", icon: LinkSimple },
                { key: "Context policy", value: "Geo, IP, time, risk — 21 combinations", icon: GlobeHemisphereEast },
                { key: "Risk engine", value: "12 triggers, 4 auto-actions", icon: Prohibit },
                { key: "Visibility", value: "202 events · 7 SIEM formats · 11 reports", icon: ClockCounterClockwise },
                { key: "Client", value: "Windows, macOS, Linux · Always-On optional", icon: Devices },
              ]}
            />
          </div>
        </div>
      </section>

      <IzStatRibbon
        items={[
          { value: "144", label: "named rules" },
          { value: "25", label: "device check types" },
          { value: "202", label: "event log types" },
        ]}
      />

      {/* ---------------- THREE OUTCOMES ---------------- */}
      <div id="outcomes">
        <IzOutcomes
          side="left"
          title={["Contained", "by design"]}
          sub="A flagged session is re-verified and cleared, and nothing else in the estate is touched — because nothing else was ever reachable from it."
          visual={<OutcomesOrbit />}
          outcomes={[
            { Icon: ShieldCheck, title: "Breach containment by architecture", body: "No lateral surface to cross. One session compromised is one session lost." },
            { Icon: Broadcast, title: "Zero internet footprint", body: "Blackened servers cannot be scanned or fingerprinted ahead of patch day." },
            { Icon: ArrowsOutCardinal, title: "VPN retirement without re-architecture", body: "Runs alongside your VPN. Same apps, same AD groups, staged cutover, rollback intact." },
          ]}
        />
      </div>

      {/* ---------------- FAQ ---------------- */}
      <section className="ztna-sec" id="faq">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            heading={<>ZTNA, <em>answered</em>.</>}
            sub="Tap a question — or open them all and read straight through."
          />
        </div>
      </section>

      <IzQuestionBand
        variant="prompt"
        prompt="so what does this replace"
        question="You already have a VPN. What exactly"
        emphasis="stops"
        questionTail="working?"
        stub="nothing — it runs alongside yours through the migration"
        href="/vpn-alternative"
      />

      {/* ---------------- RELATED ---------------- */}
      <section className="ztna-sec ztna-sec--tight">
        <div className="iz-wrap">
          <IzRelatedRail
            variant="cards"
            links={[
              { kind: "platform", title: "ZTAA", href: "/zero-trust-application-access", desc: "The application-layer sibling. For anything a browser can reach." },
              { kind: "platform", title: "Device Posture", href: "/zero-trust-features/device-posture-check", desc: "The 25 checks and 144 rules, in full detail." },
              { kind: "solution", title: "VPN Alternative", href: "/vpn-alternative", desc: "What changes in week 1, week 4, week 12." },
              { kind: "resource", title: "What is Zero Trust", href: "/what-is-zero-trust", desc: "The architecture NIST SP 800-207 describes, plainly." },
            ]}
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
