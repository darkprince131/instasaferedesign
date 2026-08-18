"use client";

import { useEffect, useState } from "react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzLogoMarquee } from "@/components/home2/IzLogoMarquee";
import { IzTrustBar } from "@/components/home2/IzTrustBar";
import { IzStatRibbon } from "@/components/home2/IzStatRibbon";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzQuietBand, IzQuestionBand } from "@/components/home2/IzQuestionBand";
import { IzVpnZtnaFlow } from "@/components/home2/IzVpnZtnaFlow";
import { IzSpecTable } from "@/components/home2/IzSpecTable";
import { IzRelatedRail } from "@/components/home2/IzRelatedRail";
import { IzSideNav } from "@/components/home2/IzSideNav";
import { ChatFaq } from "@/components/home2/ChatFaq";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { VpnAccessPlane } from "@/components/izoutcomes/artifacts/VpnAccessPlane";
import { izFontVars } from "@/lib/iz-fonts";
import {
  ArrowsOutCardinal,
  Crosshair,
  Eye,
  Key,
  ShieldCheck,
  Stack,
  UsersThree,
} from "@phosphor-icons/react";
import { IzVpnHero } from "./IzVpnHero";

/* ============================================================
   /vpn-alternative — A3 SOLUTION.

   Section order follows docs/content/storyboards/solutions-vpn-alternative.md.
   The URL is the existing live one and carries SEO equity: do not
   change it. The storyboard's own header writes it as
   /solutions/vpn-alternative — the sitemap does not, and the sitemap
   wins (see the SEO URL list).

   Every number on this page is one InstaSafe owns — 25 device checks,
   144 rules, 202 event types, 6 MFA methods. The storyboard's stat
   strip called for VPN incident rates and CVE counts, which are marked
   [SOURCE NEEDED] in the content master and are therefore NOT here.
   Migration is described in stages, never in weeks, for the same
   reason.
   ============================================================ */

const ANCHORS = [
  { id: "why", label: "Why replace it" },
  { id: "compare", label: "VPN vs ZTNA" },
  { id: "migration", label: "Migration" },
  { id: "privacy", label: "Privacy" },
  { id: "retire", label: "What you retire" },
  { id: "outcomes", label: "Outcomes" },
  { id: "faq", label: "FAQ" },
];

/* The C20 comparison. `diff` marks a real architectural difference
   rather than a wording one. */
const COMPARE = [
  { key: "Access granted", legacyValue: "Entire network segment", value: "One application per session", diff: true },
  { key: "Lateral movement", legacyValue: "Inherent", value: "No path exists", diff: true },
  { key: "Internet footprint", legacyValue: "Concentrator exposed", value: "Blackened — drop-all + SPA", diff: true },
  { key: "Stolen credential", legacyValue: "Network foothold", value: "Dead end — MFA + device gate", diff: true },
  { key: "Traffic path", legacyValue: "Backhaul via box", value: "Direct, split-plane" },
  { key: "Vendor sees data", legacyValue: "Via appliance or cloud", value: "Never — control plane only", diff: true },
  { key: "Device health check", legacyValue: "None or minimal", value: "25 checks, 144 rules" },
  { key: "Per-user policy", legacyValue: "Coarse", value: "21 combinations, per group" },
  { key: "Visibility", legacyValue: "Connection logs", value: "202 event types, replayable sessions" },
  { key: "Scaling", legacyValue: "Hardware purchase", value: "Configuration change" },
  { key: "Deployment", legacyValue: "Weeks plus appliances", value: "Days, software only" },
  { key: "MFA", legacyValue: "Third-party add-on", value: "Built in, 6 methods" },
];

const FAQ = [
  { q: "What can I use instead of a VPN?", a: "For workforce and third-party access to private applications, the replacement category is ZTNA, built on SDP architecture: verify user and device, evaluate context, then connect to a single application — never the network. Proxies, RDP and CASB solve adjacent problems, not this one." },
  { q: "How is Zero Trust different from a VPN?", a: "A VPN grants network membership after one check at the door. Zero Trust grants application access after continuous checks of user, device and context — and never grants network membership at all." },
  { q: "Is switching disruptive?", a: "It is staged: run alongside the VPN, migrate by team, decommission per team with the rollback path intact. Users get a simpler experience than the VPN client they had." },
  { q: "Will it work with our existing infrastructure?", a: "Yes. It syncs your existing directory, sits in front of applications wherever they run — on-premise, private cloud, public cloud — and requires no network re-architecture." },
  { q: "What about latency?", a: "Split-plane, direct connections remove the backhaul hairpin. The usual experience is faster than the VPN it replaces, not slower." },
  { q: "Are VPNs actually insecure, or just old?", a: "Both structurally exposed — public listeners that must answer the internet — and structurally over-permissive, because network-level access is the product. Age isn't the problem; the design assumptions are." },
  { q: "Does Zero Trust mean throwing the VPN out on day one?", a: "No. Zero Trust is a strategy and migration is incremental by design. Running both during the transition is the normal path." },
  { q: "Is ZTNA a long-term bet?", a: "It is the model NIST SP 800-207 codifies and the direction of the whole category. The strategy outlives any product cycle." },
  { q: "Can InstaSafe MFA protect the VPN we haven't replaced yet?", a: "Yes. Through RADIUS and TACACS+, InstaSafe MFA hardens Cisco AnyConnect, Juniper, Palo Alto and similar concentrators today — and makes the later migration easier." },
  { q: "What does the vendor see of our traffic?", a: "Authentication metadata, policy decisions and exported logs. Never application data — split plane means your traffic does not transit us." },
];

type Theme = "dark" | "paper";

export function VpnPage() {
  /* theme is page-scoped and shares Home2's storage key, so a visitor
     who picked dark on the homepage keeps it here */
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

      <IzVpnHero />

      <IzLogoMarquee />
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
      <section className="izv-sec" id="why">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="VPN alternative"
            heading="Why is everyone replacing VPNs?"
            question="The VPN's product"
            emphasis="is"
            questionTail="network membership."
            answer="The VPN was a good answer to a 1990s question: how does a travelling employee reach the office network? Extend the network to them. Four structural problems follow from that answer, and no configuration fixes them, because they are the design."
            points={[
              { title: "Network-level access", body: "Every connected user — and every attacker holding a connected user's credentials — is on the inside. Lateral movement isn't a VPN bug, it's the purchase." },
              { title: "A visible, high-value target", body: "Concentrators must listen on the public internet, which makes them permanently scannable. Every concentrator CVE opens a race between the vendor's patch and the attacker's script." },
              { title: "Backhaul latency", body: "All traffic hairpins through the box regardless of where user and application actually are. Bengaluru user, Mumbai app, Chennai concentrator: everyone loses." },
              { title: "Hardware economics", body: "Capacity is bought in boxes, sized for peaks, refreshed on cycles. The workforce doubles and it becomes a procurement project." },
            ]}
            ctas={[
              { label: "Book a demo", href: "/book-a-demo", primary: true },
              { label: "What is Zero Trust", href: "/what-is-zero-trust" },
            ]}
            long={[
              "The design assumed three things that are no longer true: applications live in the office (now they are cloud and SaaS everywhere), remote access is the exception (now it is the norm), and being on the network is roughly equivalent to being trustworthy (now the single most exploited assumption in security).",
              "The Zero Trust replacement, plainly: verify the user, verify the device, evaluate context — then connect them to the one application they asked for, through a tunnel scoped to exactly that. No network membership exists to abuse, nothing listens publicly to be scanned, connections run direct without hairpins, and the whole thing is software.",
            ]}
            slot={{
              kind: "terminal",
              title: "sophia@laptop · acme-bank",
              badge: "Session recorded",
              lines: [
                { cmd: "connect erp-core.acme.internal" },
                { out: "identity: sophia@acme.co · device: bound, cert valid" },
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
        statement="A stolen VPN password buys the network."
        emphasis="A stolen ZTNA session"
        tail="buys that session."
      />

      {/* ---------------- THE COMPARISON ---------------- */}
      <div id="compare">
        <IzVpnZtnaFlow
          kicker="VPN vs Zero Trust"
          title={
            <>
              A VPN lets people <mark>onto the network</mark>.
              <br />
              InstaSafe lets them into <mark>one app</mark>.
            </>
          }
          sub="Same people, same devices, same day. The only thing that changes is what a session can reach once it is connected."
        />

        <section className="izv-sec izv-sec--tight">
          <div className="iz-wrap">
            <IzSpecTable
              variant="versus"
              label="line by line _ vpn vs instasafe"
              legacyLabel="Traditional VPN"
              usLabel="InstaSafe ZTNA"
              rows={COMPARE}
              footNote="Device, policy and logging figures are the shipping platform's, not a roadmap."
            />
          </div>
        </section>
      </div>

      {/* ---------------- MIGRATION ---------------- */}
      <section className="izv-sec izv-sec--alt" id="migration">
        <div className="iz-wrap">
          <div className="izv-head">
            <span className="izv-ey">Migration</span>
            <h2>
              Switching is <em>staged</em>, not surgical.
            </h2>
            <p>
              InstaSafe runs alongside the VPN for as long as you need it to. Access policies mirror the AD groups you
              already maintain, so the access model migrates — not just the tunnel.
            </p>
          </div>

          <IzSpecTable
            variant="rail"
            rows={[
              {
                key: "Stage 1",
                value: "Deploy alongside the VPN",
                note: "A pilot group — typically IT plus one business team — moves first. The VPN is untouched.",
                icon: UsersThree,
              },
              {
                key: "Stage 2",
                value: "Expand team by team",
                note: "Policies mirror your existing directory groups. Nothing is re-modelled to move.",
                icon: Stack,
              },
              {
                key: "Stage 3",
                value: "Decommission per team",
                note: "The concentrator goes when the last team is off it. The rollback path stays intact throughout.",
                icon: ShieldCheck,
              },
            ]}
            footNote="No hardware ordered, no network re-architecture, no user retraining — the portal is simpler than the client it replaces."
          />
        </div>
      </section>

      {/* ---------------- PRIVACY FIRST ---------------- */}
      <section className="izv-sec" id="privacy">
        <div className="iz-wrap">
          <div className="izv-head">
            <span className="izv-ey">Privacy first</span>
            <h2>
              Replacing a VPN with a vendor that reads everything is <em>the same trade</em>, differently priced.
            </h2>
            <p>
              A cloud security vendor that inspects all your traffic swaps one trust problem for another: now the vendor
              is inside everything, and a vendor compromise is your compromise. InstaSafe&apos;s split plane refuses
              that trade — the control plane (ours) makes decisions, the data plane (yours) carries traffic directly
              between your users and your applications.
            </p>
          </div>

          <IzSpecTable
            variant="rail"
            rows={[
              { key: "Control plane", value: "Ours — identity, policy, verdicts", note: "Authentication metadata, policy decisions, exported logs.", icon: Key },
              { key: "Data plane", value: "Yours — device to application, direct", note: "Application traffic does not transit InstaSafe at all.", icon: ArrowsOutCardinal },
              { key: "What we can see", value: "The decision, never the payload", note: "The full table lives on the Privacy First page.", icon: Eye },
            ]}
          />
        </div>
      </section>

      {/* ---------------- WHAT YOU RETIRE ---------------- */}
      <section className="izv-sec izv-sec--alt" id="retire">
        <div className="iz-wrap">
          <div className="izv-head">
            <span className="izv-ey">Consolidation</span>
            <h2>
              What leaves the estate <em>with the VPN</em>.
            </h2>
            <p>Four line items that stop being separate purchases once access is one platform.</p>
          </div>

          <IzSpecTable
            variant="ledger"
            label="retired _ on cutover"
            rows={[
              { key: "VPN concentrators", value: "And the licensing and refresh cycle attached to them" },
              { key: "The MFA bolt-on", value: "Six methods are built into the access decision itself" },
              { key: "Jump-box sprawl", value: "Recorded privileged sessions replace the shared hop" },
              { key: "Access spreadsheets", value: "The portal is the entitlement record" },
            ]}
          />
        </div>
      </section>

      {/* ---------------- ALTERNATIVES LANDSCAPE ---------------- */}
      <section className="izv-sec">
        <div className="iz-wrap">
          <div className="izv-head">
            <span className="izv-ey">The landscape</span>
            <h2>
              The other five things <em>you will be shown</em>.
            </h2>
            <p>
              Four of them solve adjacent problems. If your driver is replacing the VPN for access to private
              applications, the category you want is ZTNA — built on SDP.
            </p>
          </div>

          <IzSpecTable
            variant="ledger"
            label="category _ what it actually does"
            rows={[
              { key: "Proxy servers", value: "Hide and route traffic. No identity or device policy." },
              { key: "RDP", value: "Remote control of a machine. Not an access architecture." },
              { key: "CASB", value: "Governs SaaS usage. Does not deliver private-app access." },
              { key: "SDP", value: "The architecture family InstaSafe implements — dark infrastructure." },
              { key: "ZTNA", value: "The category name for SDP-style least-privilege access." },
            ]}
          />
        </div>
      </section>

      <IzQuestionBand
        variant="prompt"
        prompt="the objection that actually blocks the deal"
        question="What happens to the people"
        emphasis="mid-migration"
        questionTail="?"
        stub="nothing — both run until the last team is off the concentrator"
        href="#migration"
      />

      {/* ---------------- THREE OUTCOMES ---------------- */}
      <div id="outcomes">
        {/* The illustration is the supplied reference sheet, folded to
            ONE artifact per docs/three-outcomes-rule.md: its three
            column drawings became the three parts of the plane. */}
        <IzOutcomes
          side="right"
          tag="The access plane"
          title={["The network goes.", "The access", "stays."]}
          accentFrom={2}
          sub="InstaSafe ZTNA removes the network from the equation. Users connect straight to the applications they are entitled to — and to nothing else."
          artifact={VpnAccessPlane}
          outcomes={[
            { Icon: ShieldCheck, title: "A breach that stops", body: "A compromised session is one session — architecture, not detection." },
            { Icon: Crosshair, title: "Faster, and invisible", body: "Direct connections beat backhaul; blackened gateways beat scanners." },
            { Icon: ArrowsOutCardinal, title: "Scales like software", body: "From 200 to 20,000 users without a purchase order for boxes." },
          ]}
        />
      </div>

      {/* ---------------- FAQ ---------------- */}
      <section className="izv-sec" id="faq">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            heading={
              <>
                Replacing the VPN, <em>answered</em>.
              </>
            }
            sub="Tap a question — or open them all and read straight through."
          />
        </div>
      </section>

      {/* ---------------- RELATED ---------------- */}
      <section className="izv-sec izv-sec--tight">
        <div className="iz-wrap">
          <IzRelatedRail
            variant="cards"
            links={[
              { kind: "platform", title: "ZTNA", href: "/zero-trust-network-access", desc: "The architecture underneath this page, in full detail." },
              { kind: "solution", title: "Secure Remote Access", href: "/secure-remote-access", desc: "The same platform, framed around the remote workforce." },
              { kind: "resource", title: "What is Zero Trust", href: "/what-is-zero-trust", desc: "The model NIST SP 800-207 describes, plainly." },
              { kind: "platform", title: "Multi-Factor Authentication", href: "/multifactor-authentication", desc: "Six methods — and it hardens the VPN you have not replaced yet." },
            ]}
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
