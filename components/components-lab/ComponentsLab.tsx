"use client";

import { useEffect, useState } from "react";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { CapabilitiesDeck } from "@/components/home2/CapabilitiesDeck";
import { WithWithout } from "@/components/home2/WithWithout";
import { UnificationSlider } from "@/components/home2/UnificationSlider";
import { ZeroTrustFlow } from "@/components/home2/ZeroTrustFlow";
import { BookCard, BOOK_DEMO } from "@/components/home2/BookCard";
import { ConsoleRow } from "@/components/home2/ConsoleRow";
import { IzConsole } from "@/components/home2/IzConsole";
import { ProblemSolution } from "@/components/home2/ProblemSolution";
import { QaTriptych } from "@/components/home2/QaTriptych";
import { FeatureHub } from "@/components/home2/FeatureHub";
import { WallOfLove } from "@/components/home2/WallOfLove";
import { IzAppWindow } from "@/components/home2/IzAppWindow";
import { LiveActivity } from "@/components/home2/LiveActivity";
import { SplitShowcase } from "@/components/home2/SplitShowcase";
import { ChatFaq } from "@/components/home2/ChatFaq";
import { ScrollSteps } from "@/components/home2/ScrollSteps";
import { ThreatRadar } from "@/components/home2/ThreatRadar";
import { FilterStream } from "@/components/home2/FilterStream";
import { AggregateStack } from "@/components/home2/AggregateStack";
import { UserJourney } from "@/components/home2/UserJourney";
import { ImpactGraph } from "@/components/home2/ImpactGraph";
import { ConvergeFlow } from "@/components/home2/ConvergeFlow";
import { IndustrySearch } from "@/components/home2/IndustrySearch";
import { FeatureSplit } from "@/components/home2/FeatureSplit";
import { GridCardsDemo } from "@/components/home2/GridCards";
import { AccessPipeline } from "@/components/home2/AccessPipeline";
import { AccordionShowcase } from "@/components/home2/AccordionShowcase";
import { ProseStack } from "@/components/home2/ProseStack";
import { RatingBar } from "@/components/home2/RatingBar";

/* ============================================================
   Component Lab — /components
   A gallery (like /console) where every reusable website
   component lives, rendered in the Balanced design language.
   Paper is the default; the dark toggle lets us compare themes.
   ============================================================ */

type Theme = "dark" | "paper";

const Check = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const Cross = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const Sun = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const Moon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SWATCHES: [string, string][] = [
  ["--bg", "page canvas"],
  ["--bg-2", "alt section"],
  ["--surface", "panels / cards"],
  ["--surface-2", "headers / toolbars"],
  ["--line", "hairline border"],
  ["--tx", "text primary"],
  ["--tx-dim", "text dim"],
  ["--tx-mute", "text mute"],
  ["--orange", "accent · CTA"],
  ["--allow", "semantic allow"],
  ["--deny", "semantic deny"],
  ["--ghost", "inert dots"],
];

const PASTELS = ["--past-1", "--past-2", "--past-3", "--past-4", "--past-5"];

const SECTIONS = [
  ["deck", "Capabilities deck"],
  ["withwithout", "With / Without"],
  ["flow", "Zero Trust flow"],
  ["books", "Resource book card"],
  ["consolerow", "Console row"],
  ["problemsolution", "Problem / Solution"],
  ["triptych", "Q&A triptych"],
  ["featurehub", "Feature hub"],
  ["walloflove", "Wall of love (dock)"],
  ["appwindow", "InstaSafe App Window"],
  ["liveactivity", "Live activity feed"],
  ["splitshowcase", "Split showcase"],
  ["chatfaq", "Chat FAQ"],
  ["scrollsteps", "Scroll steps (dial)"],
  ["threatradar", "Threat radar"],
  ["filterstream", "Detailed filters"],
  ["aggregate", "Aggregate data"],
  ["userjourney", "User journey"],
  ["impactgraph", "Impact graph"],
  ["convergeflow", "Convergence flow"],
  ["industrysearch", "Industry search"],
  ["featuresplit", "Feature split"],
  ["gridcards", "Grid cards"],
  ["accesspipeline", "Access pipeline"],
  ["accordionshowcase", "Accordion showcase"],
  ["prosestack", "Prose stack"],
  ["ratingbar", "Rating bar"],
  ["unify", "Unification slider"],
  ["foundations", "Foundations"],
  ["buttons", "Buttons & chips"],
  ["nav", "Navigation"],
  ["panels", "Panels & console"],
  ["rows", "Platform rows"],
  ["pastel", "Category grid"],
  ["bento", "Bento"],
  ["compare", "Comparison"],
  ["pricing", "Pricing"],
  ["social", "Testimonials"],
  ["posture", "Live posture"],
] as const;

function Spec({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`izc-spec ${className}`}>
      <span className="izc-label" dangerouslySetInnerHTML={{ __html: label }} />
      {children}
    </div>
  );
}

export function ComponentsLab() {
  const [theme, setTheme] = useState<Theme>("paper");
  const [cmp, setCmp] = useState("vs VPN");

  useEffect(() => {
    try {
      const t = (localStorage.getItem("is-theme") as Theme) || "paper";
      setTheme(t === "dark" ? "dark" : "paper");
    } catch {}
  }, []);
  const setT = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("is-theme", t);
    } catch {}
  };

  const cmpRows: Record<string, [string, string, string][]> = {
    "vs VPN": [
      ["Trust model", "Whole network", "One app at a time"],
      ["Inbound ports", "Open", "Zero"],
      ["Lateral movement", "Free", "Impossible"],
    ],
    "vs Zscaler": [
      ["Traffic routing", "Their cloud", "Direct"],
      ["Inbuilt MFA / SSO", "no", "yes"],
      ["Session recording", "no", "yes"],
    ],
  };

  return (
    <div className="iz" data-theme={theme}>
      <div className="izc">
        {/* header */}
        <div className="izc-head">
          <div className="iz-wrap izc-head-in">
            <div>
              <div className="izc-title">
                <Logo height={22} />
                <span className="iz-tag">ZTNA</span> — Component Lab
              </div>
              <div className="izc-sub">Balanced design language · reusable library</div>
            </div>
            <div className="izc-head-right">
              <div className="iz-switch" role="group" aria-label="Theme">
                <button className={theme === "dark" ? "on" : ""} onClick={() => setT("dark")} aria-label="Dark" aria-pressed={theme === "dark"}>
                  <Moon />
                </button>
                <button className={theme === "paper" ? "on" : ""} onClick={() => setT("paper")} aria-label="Paper" aria-pressed={theme === "paper"}>
                  <Sun />
                </button>
              </div>
              <a href="/" className="iz-btn iz-btn-ghost iz-btn-sm">
                View homepage
              </a>
            </div>
          </div>
        </div>

        <div className="iz-wrap">
          <div className="izc-jump">
            {SECTIONS.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </div>

          {/* CAPABILITIES DECK */}
          <section className="izc-sec" id="deck">
            <div className="izc-sec-h">
              <span className="n">00</span> Capabilities deck (C1)
            </div>
            <p className="izc-sec-desc">
              The flagship homepage interactive — PPT-style feature explainer. Tab strip auto-advances; each feature swaps
              an interactive console (left) and infographic bullets (right). Hover to pause; click tabs or arrows.
            </p>
            <Spec label="<b>CapabilitiesDeck</b> · 6 features · auto-advance">
              <CapabilitiesDeck />
            </Spec>
          </section>

          {/* WITH / WITHOUT */}
          <section className="izc-sec" id="withwithout">
            <div className="izc-sec-h">
              <span className="n">00b</span> With / Without toggle (C2 · C14)
            </div>
            <p className="izc-sec-desc">
              InstaSafe <b>OFF → ON</b>. Flip the switch and the six layers between your team and their apps lift away —
              exposed ports, the VPN box, flat-network access, the detour, the vendor in the data path, bolt-on MFA. What
              remains: one verified tunnel to one app. Auto-plays once on scroll-in; click either side to replay.
            </p>
            <Spec label="<b>WithWithout</b> · InstaSafe OFF ↔ ON · 6 layers removed">
              <WithWithout />
            </Spec>
          </section>

          {/* ZERO TRUST FLOW */}
          <section className="izc-sec" id="flow">
            <div className="izc-sec-h">
              <span className="n">00d</span> Zero Trust access flow (C2 · C14 · signature)
            </div>
            <p className="izc-sec-desc">
              The full SDP architecture across two planes — control (MFA · Controller · Identity) and data (User · Gateway ·
              Apps). Only one path lights at a time, narrated step by step: authenticate → authorize → connect. Play
              walkthrough, step the phases, or skip to the facts.
            </p>
            <Spec label="<b>ZeroTrustFlow</b> · 6 nodes · 3 phases">
              <ZeroTrustFlow />
            </Spec>
          </section>

          {/* RESOURCE BOOK CARD */}
          <section className="izc-sec" id="books">
            <div className="izc-sec-h">
              <span className="n">00e</span> Resource book card (book-in-pocket)
            </div>
            <p className="izc-sec-desc">
              A book slotted into a frosted <b>pocket</b> — the pocket front sits over the book&apos;s lower third with a
              backdrop blur, so it reads as a real sleeve. Hover (or keyboard-focus) lifts the book up out of the pocket
              and slides the caption arrow in. Swap the <b>cover</b> prop with any image URL; keep titles short.
            </p>
            <Spec label="<b>BookCard</b> · spine + paper · swappable image · short title">
              <div className="bc-row">
                {BOOK_DEMO.map((b) => (
                  <BookCard key={b.chapter} {...b} />
                ))}
              </div>
            </Spec>
          </section>

          {/* CONSOLE ROW (C23 / C22) */}
          <section className="izc-sec" id="consolerow">
            <div className="izc-sec-h">
              <span className="n">00f</span> Console row (C23 · C22)
            </div>
            <p className="izc-sec-desc">
              Text beside a live <b>InstaSafe console</b> — the reusable feature row, redesigned in our own theme (orange
              · dark + paper), window chrome · left sidebar nav · topbar · dashboard. Two variants: <b>text left /
              console right</b>, and <b>reverse</b> (console left / text right) so stacked rows alternate sides. (The blue
              console still lives in the <code>/console</code> gallery.)
            </p>
            <Spec label="<b>ConsoleRow</b> · text left · console right">
              <ConsoleRow
                eyebrow="Live access decisions"
                title={
                  <>
                    Watch every request <em>as it happens</em>.
                  </>
                }
                body="Gateways, sessions and access activity in one console — every login allowed or denied, live, with the full trail exportable to your SIEM."
                ctaLabel="See how access works"
                ctaHref="/zero-trust-network-access"
              >
                <IzConsole view="dashboard" />
              </ConsoleRow>
            </Spec>
            <Spec label="<b>ConsoleRow reverse</b> · console left · text right">
              <ConsoleRow
                reverse
                eyebrow="Every device, checked"
                title={
                  <>
                    Only healthy devices <em>get in</em>.
                  </>
                }
                body="Each device is registered, posture-checked and approved before it can reach a thing — 25 check types across Windows, macOS, Linux, iOS and Android."
                ctaLabel="Explore device trust"
                ctaHref="/zero-trust-features/device-posture-check"
              >
                <IzConsole view="devices" />
              </ConsoleRow>
            </Spec>
          </section>

          {/* PROBLEM / SOLUTION (C14) */}
          <section className="izc-sec" id="problemsolution">
            <div className="izc-sec-h">
              <span className="n">00g</span> Problem / Solution split (C14)
            </div>
            <p className="izc-sec-desc">
              Text + graphic on both sides — <b>problem left</b> (the manual VPN-and-tickets way: a stale request, a 404
              config, steps you have to remember), <b>solution right</b> (InstaSafe just does it). One real interaction:
              click <b>Grant access</b> and the decision card resolves to a scoped, recorded session. Run again to reset.
            </p>
            <Spec label="<b>ProblemSolution</b> · click Grant access">
              <ProblemSolution />
            </Spec>
          </section>

          {/* Q&A TRIPTYCH (C38) */}
          <section className="izc-sec" id="triptych">
            <div className="izc-sec-h">
              <span className="n">00h</span> Q&amp;A triptych (C38)
            </div>
            <p className="izc-sec-desc">
              Six query types flank a center chat that answers the selected one. It <b>auto-plays</b> — each point is held
              for roughly its reading time, then advances and loops (pauses on hover or off-screen). Two variants:{" "}
              <b>icons</b> — icon nav below whose active underline doubles as the autoplay progress bar; <b>no nav</b> —
              switch by clicking the feature text, with a slim progress bar under the panel.
            </p>
            <Spec label="<b>QaTriptych</b> · icon nav · underline = autoplay progress">
              <QaTriptych nav="icons" />
            </Spec>
            <Spec label="<b>QaTriptych</b> · no nav (click features) · autoplay">
              <QaTriptych nav="none" />
            </Spec>
          </section>

          {/* FEATURE HUB (C3) */}
          <section className="izc-sec" id="featurehub">
            <div className="izc-sec-h">
              <span className="n">00i</span> Feature hub (C3 · constellation)
            </div>
            <p className="izc-sec-desc">
              A 3-tab feature showcase — each category swaps the big visual above. <b>Center</b> = the controls
              constellation (white core, tiles that turn orange on hover and link to their page, cloudy faded edges).{" "}
              <b>Left</b> = the identity stack; <b>right</b> = the live audit log. Active tab gets the orange bar +
              orange &ldquo;Learn more&rdquo; to its page.
            </p>
            <Spec label="<b>FeatureHub</b> · switch tabs to swap the visual">
              <FeatureHub />
            </Spec>
          </section>

          {/* WALL OF LOVE — MAC DOCK (C32) */}
          <section className="izc-sec" id="walloflove">
            <div className="izc-sec-h">
              <span className="n">00j</span> Wall of love · Mac dock (C32)
            </div>
            <p className="izc-sec-desc">
              A macOS-style floating dock of customer logos with <b>magnify-on-hover</b> — hover a logo and it scales up,
              shows a tooltip, and swaps the app-window preview above. Logos are placeholders (the <code>LOGOS</code>{" "}
              array) — swap names, gradients and links later. Click a logo to open its case study.
            </p>
            <Spec label="<b>WallOfLove</b> · hover the dock to magnify + swap the preview">
              <WallOfLove />
            </Spec>
          </section>

          {/* INSTASAFE APP WINDOW */}
          <section className="izc-sec" id="appwindow">
            <div className="izc-sec-h">
              <span className="n">00k</span> InstaSafe App Window (C-new)
            </div>
            <p className="izc-sec-desc">
              A full macOS-style app window showcasing the complete InstaSafe ZTNA product experience. Left sidebar nav
              is <b>scroll-linked</b> — scrolling the right panel updates the active nav item, and clicking a nav item
              smooth-scrolls to that section. Six interactive screens: <b>Dashboard</b> (KPIs + sparkline + recent
              events), <b>Users</b> (table + create-user form), <b>Applications</b> (card grid + add-app form),{" "}
              <b>Devices</b> (health scores + click-to-expand posture drilldown), <b>Access Logs</b> (filter by
              user/app/status, export), <b>Policies</b> (access rules + conditions).
            </p>
            <Spec label="<b>IzAppWindow</b> · scroll or click nav to switch sections · try Add user, filter logs, click a device row">
              <IzAppWindow />
            </Spec>
          </section>

          {/* LIVE ACTIVITY FEED */}
          <section className="izc-sec" id="liveactivity">
            <div className="izc-sec-h">
              <span className="n">00l</span> Live activity feed (C-new)
            </div>
            <p className="izc-sec-desc">
              Text left, two screens right. The big screen is an <b>access-analytics graph</b> that fills over one pass of
              the event script, then freezes to a snapshot. The small screen is a <b>draggable</b> live feed that loops the
              same events <b>indefinitely</b> — logins, accesses, device approvals, denials and requests across multiple
              users. Watch the anomaly story: <code>dave.k failed to log in</code> → a few events later →{" "}
              <code>dave.k blocked — multiple login failures</code>. Drag the small panel anywhere.
            </p>
            <Spec label="<b>LiveActivity</b> · graph runs one loop then stops · feed loops forever · drag the small screen">
              <LiveActivity />
            </Spec>
          </section>

          {/* SPLIT SHOWCASE */}
          <section className="izc-sec" id="splitshowcase">
            <div className="izc-sec-h">
              <span className="n">00m</span> Split showcase (C-new)
            </div>
            <p className="izc-sec-desc">
              One browser window cut by a <b>prominent center divider</b>. The <b>left half is static</b> — the brand
              hero. The <b>right half is a deck</b> of product screens stacked behind each other that <b>shuffle on an
              infinite loop</b>: the top one recedes into the deck, the one behind rises to the front. The split address
              bar's <b>path changes</b> with the active screen (<code>/dashboard</code>, <code>/access-logs</code>,{" "}
              <code>/device-posture</code>, <code>/policies</code>) so the visitor always knows what they're seeing.
              Remodelled from an SEO reference into our product. Hover to pause.
            </p>
            <Spec label="<b>SplitShowcase</b> · right deck shuffles every 3.2s · URL path tracks the active screen · hover to pause">
              <SplitShowcase />
            </Spec>
          </section>

          {/* CHAT FAQ */}
          <section className="izc-sec" id="chatfaq">
            <div className="izc-sec-h">
              <span className="n">00n</span> Chat FAQ (C-new)
            </div>
            <p className="izc-sec-desc">
              FAQ styled as a live chat. Tap any question bubble and the <b>InstaSafe assistant</b> replies: a short
              <b> typing indicator</b> (three bouncing dots) then the <b>full answer springs in</b> — no typewriter, so
              visitors read it instantly. Slight UI feedback throughout (hover lift, active ring, press states). Bubbles
              float free — no panel chrome, no fake chat input. Auto-opens the first question when scrolled into view.
            </p>
            <Spec label="<b>ChatFaq</b> · tap a question → typing dots → instant answer · floating bubbles">
              <ChatFaq />
            </Spec>
          </section>

          {/* SCROLL STEPS (DIAL) */}
          <section className="izc-sec" id="scrollsteps">
            <div className="izc-sec-h">
              <span className="n">00o</span> Scroll steps · rotating dial (C-new)
            </div>
            <p className="izc-sec-desc">
              A scroll-driven rotating dial. <b>Scroll down and the wheel rotates</b> — step 2 rises to the top, then 3,
              then 4 — while the centre content swaps to match. Great for a "how it works" or timeline. Fully
              customisable: edit the <code>STEPS</code> array to add or remove steps and the dial re-distributes itself.
              A <b>subtle Skip link</b> (top-right, not a CTA) jumps past the pinned section for accessibility; reduced-motion
              users get a plain numbered list instead. <i>Scroll into it to drive the rotation.</i>
            </p>
          </section>
          {/* full-bleed: pinned/sticky can't live inside a bordered Spec box */}
          <ScrollSteps />

          {/* THREAT RADAR */}
          <section className="izc-sec" id="threatradar">
            <div className="izc-sec-h">
              <span className="n">00p</span> Threat radar · scan &amp; resolve (C-new)
            </div>
            <p className="izc-sec-desc">
              Mixes three references into one play-it-yourself demo. <b>Hover</b> the activity field to scan it; the
              <b> 5 pulsing dots</b> are live alerts. <b>Click</b> one and InstaSafe auto-plays the case — alert headline →
              chat-style evidence (location, IP, fingerprint…) → a report graph → a <b>CTA that appears and stays</b>. You
              decide (Approve / Deny / Block / Challenge…) and a tailored <b>resolution toast</b> slides in; the dot turns
              <b> resolved</b> (green check) — click it again to replay the outcome. Five ZTNA scenarios: new device,
              failed-MFA attack, cross-dept access request, anonymous (VPN+incognito) visitor, and impossible travel.
            </p>
            <Spec label="<b>ThreatRadar</b> · hover to scan · click a pulsing dot · play it to a decision">
              <ThreatRadar />
            </Spec>
          </section>

          {/* DETAILED FILTERS */}
          <section className="izc-sec" id="filterstream">
            <div className="izc-sec-h">
              <span className="n">00q</span> Detailed filters (card · marquee)
            </div>
            <p className="izc-sec-desc">
              Reworked from an analytics &ldquo;detailed filters&rdquo; card into InstaSafe: every chip is one{" "}
              <b>access-rule condition</b> (field · is · value). Rows <b>marquee horizontally</b> and{" "}
              <b>alternate rows drift the opposite way</b>, so the whole card reads as &ldquo;build a precise rule.&rdquo;
              Hover (or keyboard-focus) the card to pause; freezes for reduced-motion. Card structure: moving stage + title,
              description and <b>Learn more</b>.
            </p>
            <Spec label="<b>FilterStream</b> · hover to pause · alternate-direction rows">
              <FilterStream />
            </Spec>
          </section>

          {/* AGGREGATE DATA */}
          <section className="izc-sec" id="aggregate">
            <div className="izc-sec-h">
              <span className="n">00r</span> Aggregate data (card · hover-lift deck)
            </div>
            <p className="izc-sec-desc">
              An <b>isometric deck</b> of summary screens — top apps, devices, users, locations — rolled up from access
              events. The screens are tilted on an iso plane and separated in 3D; on <b>card hover the deck lifts and the
              plane eases flatter</b> so the screens behind rise into view (transform/opacity only). Card structure: visual
              deck + title, description and Learn more.
            </p>
            <Spec label="<b>AggregateStack</b> · hover to lift &amp; fan the deck">
              <AggregateStack />
            </Spec>
          </section>

          {/* USER JOURNEY */}
          <section className="izc-sec" id="userjourney">
            <div className="izc-sec-h">
              <span className="n">00s</span> User access journey (main component)
            </div>
            <p className="izc-sec-desc">
              Reworked to match the reference: a scattered <b>5-column card field</b>. The big photo identity sits in the
              centre column — an <b>Active Directory user</b>, currently <b>offline</b> — surrounded by small <b>no-fill
              cards</b> (details, last session, enrolment, access rules, last accessed, last app, devices, user groups,
              recent events) staggered vertically with the far columns faded. Highlighted values are interactive:{" "}
              <b>recording</b> and each <b>access rule</b> open a <b>LinkPreview</b> (player / rule explainer that links into
              IAM); the <b>app name</b> and <b>device</b> chips reveal an <b>InfoTip</b> hover card.
            </p>
            <Spec label="<b>UserJourney</b> · hover the recording link, the rules, the app &amp; device chips">
              <UserJourney />
            </Spec>
          </section>

          {/* IMPACT GRAPH */}
          <section className="izc-sec" id="impactgraph">
            <div className="izc-sec-h">
              <span className="n">00t</span> Impact graph (C19 · divergence)
            </div>
            <p className="izc-sec-desc">
              Two lines over 120 days — <b>InstaSafe</b> (orange, holds high) versus a <b>legacy VPN</b> (grey, decays as
              trust erodes). <b>Hover the chart</b> for a vertical guide, dots on both lines, and a tooltip with the change
              at that point. Lines draw in on load; reduced-motion skips it. Curves are an illustrative model.
            </p>
            <Spec label="<b>ImpactGraph</b> · hover for per-day stats">
              <ImpactGraph />
            </Spec>
          </section>

          {/* CONVERGENCE FLOW */}
          <section className="izc-sec" id="convergeflow">
            <div className="izc-sec-h">
              <span className="n">00u</span> Convergence flow (C21 · pulses)
            </div>
            <p className="izc-sec-desc">
              People, devices, identities, apps, locations and networks funnel through the <b>InstaSafe core</b> and out to
              one secured workspace. <b>Orange pulses</b> run the dashed connectors on an infinite loop (SVG{" "}
              <code>animateMotion</code>); reduced-motion hides them. All-SVG, so it scales cleanly.
            </p>
            <Spec label="<b>ConvergeFlow</b> · pulses loop through the core">
              <ConvergeFlow />
            </Spec>
          </section>

          {/* INDUSTRY SEARCH */}
          <section className="izc-sec" id="industrysearch">
            <div className="izc-sec-h">
              <span className="n">00v</span> Industry search (C26 · boggle)
            </div>
            <p className="izc-sec-desc">
              A word-search of the industries InstaSafe secures. <b>Hover</b> the grid (or the chips) to find a sector; even
              with no hover a <b>slow autoplay</b> lights them up one at a time until all 18 are found, then resets — so no
              sector feels left out. The grid is built with a seeded RNG so server and client render identically.
            </p>
            <Spec label="<b>IndustrySearch</b> · hover to find · autoplay reveals the rest">
              <IndustrySearch />
            </Spec>
          </section>

          {/* FEATURE SPLIT */}
          <section className="izc-sec" id="featuresplit">
            <div className="izc-sec-h">
              <span className="n">00w</span> Feature split (C5 / C20 · clickable list → screen)
            </div>
            <p className="izc-sec-desc">
              Clickable feature list on the <b>left</b> (icon + label, 2-up grid) drives a <b>screen on the right</b> —
              click a feature and its visual swaps with a cross-fade. Each feature&apos;s right-side visual is a{" "}
              <b>swappable slot</b>: a typed <code>viz</code> field that&apos;s one of <code>json</code> (the default themed
              mock), <code>image</code> (PNG/GIF/SVG), <code>video</code> (mp4/webm) or <code>node</code> (your own React
              SVG animation). Replace any one feature&apos;s visual by editing that single field — see the header comment in{" "}
              <code>FeatureSplit.tsx</code>.
            </p>
            <Spec label="<b>FeatureSplit</b> · click a feature to swap the screen">
              <FeatureSplit />
            </Spec>
          </section>

          {/* GRID CARDS */}
          <section className="izc-sec" id="gridcards">
            <div className="izc-sec-h">
              <span className="n">00x</span> Grid cards (2 variants · swappable media)
            </div>
            <p className="izc-sec-desc">
              One reusable <code>&lt;FeatureCard/&gt;</code> with a <code>variant</code> prop — <b>media-top</b> (preview
              panel on top, mono <code>&lt;Tag/&gt;</code> + desc below) or <b>text-top</b> (title + desc + orange link on
              top, media panel filling below, like the reference). Each card&apos;s visual is a <b>swappable slot</b>:{" "}
              <code>media</code> = <code>node</code> (static <b>or animated SVG</b>), <code>image</code> or{" "}
              <code>video</code>. The marquee (<code>&lt;FilterStream embed/&gt;</code>) and hover-lift deck{" "}
              (<code>&lt;AggregateStack embed/&gt;</code>) are just graphics you drop into the slot — <b>5 card types</b> in
              all. <code>&lt;CardGrid cols=3|4|2&gt;</code> lays them out; below are grids of 3, 4 and 2.
            </p>
            <Spec label="<b>GridCards</b> · variant=media-top|text-top · media=node/image/video · cols=3/4/2">
              <GridCardsDemo />
            </Spec>
          </section>

          {/* ACCESS PIPELINE */}
          <section className="izc-sec" id="accesspipeline">
            <div className="izc-sec-h">
              <span className="n">00y</span> Access pipeline (C-new · left copy + 3-stage flowchart)
            </div>
            <p className="izc-sec-desc">
              Left: brand copy with step indicators that mirror the active column. Right: 3-column kanban-style
              ZTNA flowchart — Authenticate → Inspect → Connect. Orange pulse cycles 1→2→3→1 forever;
              never stops on hover. <b>To edit:</b> change the <code>STAGES</code> array in{" "}
              <code>AccessPipeline.tsx</code> — add/remove cards or stages, update icons and labels.
            </p>
            <Spec label="<b>AccessPipeline</b> · 3 stages · infinite pulse · no hover pause">
              <AccessPipeline />
            </Spec>
          </section>

          {/* ACCORDION SHOWCASE */}
          <section className="izc-sec" id="accordionshowcase">
            <div className="izc-sec-h">
              <span className="n">00z</span> Accordion showcase (C-new · hover-open 3-section accordion)
            </div>
            <p className="izc-sec-desc">
              3 sections — Visibility &amp; Audit / Smart Access Rules / Device Health Checks. At rest: section 1
              open (2 cols) + 2 closed (1 col each) = 4 cols total. Hover any section to open it; others collapse.
              Left pane always visible (teaser). Right pane slides in on open.{" "}
              <b>To edit:</b> change <code>AuditLeft/Right</code>, <code>PolicyLeft/Right</code>,{" "}
              <code>DeviceLeft/Right</code> sub-components, or update <code>SECTIONS</code> labels/links in{" "}
              <code>AccordionShowcase.tsx</code>.
            </p>
            <Spec label="<b>AccordionShowcase</b> · 3 sections · hover-open · 4-col visible at once">
              <AccordionShowcase />
            </Spec>
          </section>

          {/* PROSE STACK */}
          <section className="izc-sec" id="prosestack">
            <div className="izc-sec-h">
              <span className="n">00aa</span> Prose stack (C-new · left copy + right stacked panels)
            </div>
            <p className="izc-sec-desc">
              Two-column layout: left = structured text (eyebrow → large H2 → body → outlined CTA → feature
              bullets); right = 3 stacked graphic panels (threat feed / policy evaluation / active session).{" "}
              <b>To edit:</b> update <code>COPY</code>, <code>BULLETS</code>, <code>THREATS</code>,{" "}
              <code>CHECKS</code>, <code>SESSION</code> constants at the top of{" "}
              <code>ProseStack.tsx</code>. Swap any panel component to use different graphics.
            </p>
            <Spec label="<b>ProseStack</b> · eyebrow + H2 + bullets · threat feed + policy eval + session">
              <ProseStack />
            </Spec>
          </section>

          {/* RATING BAR */}
          <section className="izc-sec" id="ratingbar">
            <div className="izc-sec-h">
              <span className="n">00ab</span> Rating bar (C-new · platform badges + star ratings)
            </div>
            <p className="izc-sec-desc">
              Place under any section. Orange circle badge with platform letter mark + star rating + review count.
              Stars turn amber on hover. Half-stars supported. Click badge → review page (new tab).
              Featured badge gets an outlined card treatment.{" "}
              <b>To edit:</b> change the <code>RATINGS</code> array in <code>RatingBar.tsx</code> —
              update platform, score (supports 0.5), count, href, letter, featured flag.
            </p>
            <Spec label="<b>RatingBar</b> · G2 · Gartner · Capterra · half-star · hover amber">
              <RatingBar />
            </Spec>
          </section>

          {/* UNIFICATION SLIDER */}
          <section className="izc-sec" id="unify">
            <div className="izc-sec-h">
              <span className="n">00c</span> Unification slider (C29)
            </div>
            <p className="izc-sec-desc">
              Drag the handle to compare — a messy stack of separate tools on the left, one InstaSafe platform revealed on
              the right. Below it, the side-by-side table and the cost stat.
            </p>
            <Spec label="<b>UnificationSlider</b> · drag to compare">
              <UnificationSlider />
            </Spec>
          </section>

          {/* FOUNDATIONS */}
          <section className="izc-sec" id="foundations">
            <div className="izc-sec-h">
              <span className="n">01</span> Foundations
            </div>
            <p className="izc-sec-desc">Color tokens, pastel tiles and the type scale. Flip the theme switch to compare Dark and Paper.</p>

            <Spec label="<b>tokens</b> · color">
              <div className="izc-swatches">
                {SWATCHES.map(([v, note]) => (
                  <div key={v} className="izc-sw">
                    <div className="chip" style={{ background: `var(${v})` }} />
                    <div className="meta">
                      <div className="nm">{v}</div>
                      <div className="vl">{note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Spec>

            <Spec label="<b>tokens</b> · pastel tiles (real pastels in Paper)">
              <div className="iz-pastel" style={{ marginTop: 0, gridTemplateColumns: "repeat(5,1fr)" }}>
                {PASTELS.map((v, i) => (
                  <div key={v} className="iz-cell" style={{ background: `var(${v})` }}>
                    <span className="k">past-{i + 1}</span>
                  </div>
                ))}
              </div>
            </Spec>

            <Spec label="<b>type</b> · scale">
              <div className="izc-type-row">
                <h1 className="iz-h1" style={{ margin: 0 }}>
                  Display <em>access</em>
                </h1>
                <span className="spec-meta">Geist · 600 · 68/42</span>
              </div>
              <div className="izc-type-row">
                <h2 className="iz-h2" style={{ margin: 0 }}>
                  Section <em>heading</em>
                </h2>
                <span className="spec-meta">Geist · 600 · 44</span>
              </div>
              <div className="izc-type-row">
                <span className="iz-ey">Zero Trust Network Access</span>
                <span className="spec-meta">Geist Mono · 12 · .08em</span>
              </div>
              <div className="izc-type-row">
                <p style={{ margin: 0, color: "var(--tx-dim)", maxWidth: "52ch" }}>
                  Body copy in Geist 400 at the dim text colour, line-height 1.68 — the readable default for paragraphs.
                </p>
                <span className="spec-meta">Geist · 400 · 16</span>
              </div>
              <div className="izc-type-row">
                <span className="iz-mono iz-mute">09:41:02 · 198.51.100.7 · WEB · billing-portal</span>
                <span className="spec-meta">Geist Mono · data layer</span>
              </div>
            </Spec>
          </section>

          {/* BUTTONS */}
          <section className="izc-sec" id="buttons">
            <div className="izc-sec-h">
              <span className="n">02</span> Buttons &amp; chips
            </div>
            <Spec label="<b>buttons</b> · variants" className="center">
              <button className="iz-btn iz-btn-pri">
                Book a demo <Arrow />
              </button>
              <button className="iz-btn iz-btn-ghost">Explore the platform</button>
              <button className="iz-btn iz-btn-pri iz-btn-sm">Small primary</button>
              <button className="iz-btn iz-btn-ghost iz-btn-sm">Small ghost</button>
            </Spec>
            <Spec label="<b>chips</b> &amp; pills" className="center">
              <span className="iz-chip">filter chip</span>
              <span className="iz-chip count">5 events</span>
              <span className="iz-pill allow">allow</span>
              <span className="iz-pill deny">deny</span>
              <span className="iz-pbar-cta">Export · SIEM</span>
              <span className="iz-tag" style={{ margin: 0 }}>
                ZTNA
              </span>
            </Spec>
          </section>

          {/* NAV */}
          <section className="izc-sec" id="nav">
            <div className="izc-sec-h">
              <span className="n">03</span> Navigation
            </div>
            <Spec label="<b>navbar</b> · sticky / blur">
              <div className="iz-nav" style={{ position: "static", borderRadius: 12, border: "1px solid var(--line)" }}>
                <div className="iz-nav-in" style={{ padding: "0 18px" }}>
                  <span className="iz-mark">
                    <Logo height={22} />
                    <span className="iz-tag">ZTNA</span>
                  </span>
                  <nav className="iz-links">
                    <a href="#nav">Platform</a>
                    <a href="#nav">Solutions</a>
                    <a href="#nav">Why InstaSafe</a>
                    <a href="#nav">Pricing</a>
                  </nav>
                  <div className="iz-nav-right">
                    <div className="iz-switch">
                      <button className="on" type="button">
                        <Moon />
                      </button>
                      <button type="button">
                        <Sun />
                      </button>
                    </div>
                    <span className="iz-btn iz-btn-pri iz-btn-sm">Book a demo</span>
                  </div>
                </div>
              </div>
            </Spec>
          </section>

          {/* PANELS & CONSOLE */}
          <section className="izc-sec" id="panels">
            <div className="izc-sec-h">
              <span className="n">04</span> Panels &amp; console
            </div>
            <p className="izc-sec-desc">The access-decision console and the live access-log are the signature interactives. Pills are semantic — green allow, red deny only.</p>

            <div className="izc-grid two">
              <Spec label="<b>panel</b> · access-decision">
                <div className="iz-panel">
                  <div className="iz-pbar">
                    <span className="iz-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="iz-pbar-title">access-decision</span>
                    <span className="iz-live">
                      <i />
                      VERIFYING
                    </span>
                  </div>
                  <div className="iz-pbody">
                    <div className="iz-step" style={{ opacity: 1, transform: "none" }}>
                      <span className="ic" style={{ color: "var(--allow)" }}>
                        <Check />
                      </span>
                      <span className="who">identity · verified</span>
                      <span className="iz-pill allow">allow</span>
                    </div>
                    <div className="iz-step" style={{ opacity: 1, transform: "none" }}>
                      <span className="ic" style={{ color: "var(--allow)" }}>
                        <Check />
                      </span>
                      <span className="who">device · 25/25 checks</span>
                      <span className="iz-pill allow">allow</span>
                    </div>
                    <div className="iz-step" style={{ opacity: 1, transform: "none" }}>
                      <span className="ic" style={{ color: "var(--allow)" }}>
                        <Check />
                      </span>
                      <span className="who">→ billing-portal · mTLS</span>
                      <span className="iz-pill allow">granted</span>
                    </div>
                  </div>
                  <div className="iz-dark-foot">
                    everything else stays dark — <b>databases</b> unreachable.
                  </div>
                </div>
              </Spec>

              <Spec label="<b>console</b> · access-log">
                <div className="iz-panel">
                  <div className="iz-pbar">
                    <span className="iz-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="iz-pbar-title">access-logs</span>
                    <span className="iz-pbar-cta">Export</span>
                  </div>
                  <div className="iz-tabs">
                    <span className="iz-tab on">Live</span>
                    <span className="iz-tab">Denied</span>
                    <span className="iz-tab">Devices</span>
                  </div>
                  <div className="iz-toolbar">
                    <span className="iz-chip count">5 events</span>
                    <span className="iz-chip">last 30s</span>
                  </div>
                  <div className="iz-log">
                    {[
                      ["anita.r", "WEB · billing", "allow", "09:41"],
                      ["contractor-07", "RDP · finance", "deny", "09:41"],
                      ["priya.m", "DB · analytics", "allow", "09:41"],
                    ].map((l) => (
                      <div key={l[0]} className={`iz-log-row ${l[2] === "deny" ? "deny" : ""}`}>
                        <span style={{ color: l[2] === "deny" ? "var(--deny)" : "var(--allow)" }}>{l[2] === "deny" ? <Cross /> : <Check />}</span>
                        <span className="u">{l[0]}</span>
                        <span className="ap">{l[1]}</span>
                        <span className={`iz-pill ${l[2]}`}>{l[2]}</span>
                        <span className="ti">{l[3]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Spec>
            </div>
          </section>

          {/* PLATFORM ROWS */}
          <section className="izc-sec" id="rows">
            <div className="izc-sec-h">
              <span className="n">05</span> Platform rows
            </div>
            <Spec label="<b>rows</b> · indexed hover list">
              <div className="iz-rows" style={{ marginTop: 0 }}>
                {[
                  ["Zero Trust Network Access", "Replace the VPN at the network layer.", "7", "app types"],
                  ["Multi-Factor Authentication", "Six methods, from push to OS login.", "6", "MFA methods"],
                  ["Device Trust", "Posture cleared before any connection.", "25", "device checks"],
                ].map((r, i) => (
                  <a key={r[0]} href="#rows" className="iz-row">
                    <span className="iz-row-i">{String(i + 1).padStart(2, "0")}</span>
                    <span className="iz-row-name">{r[0]}</span>
                    <span className="iz-row-desc">{r[1]}</span>
                    <span className="iz-row-stat">
                      <b>{r[2]}</b> {r[3]}
                    </span>
                  </a>
                ))}
              </div>
            </Spec>
          </section>

          {/* PASTEL */}
          <section className="izc-sec" id="pastel">
            <div className="izc-sec-h">
              <span className="n">06</span> Category grid
            </div>
            <Spec label="<b>pastel</b> · industries">
              <div className="iz-pastel" style={{ marginTop: 0 }}>
                {["Banking & BFSI", "Government / PSU", "Logistics", "Manufacturing", "IT / ITES", "Healthcare", "Real Estate", "NBFC"].map((t, i) => (
                  <div key={t} className="iz-cell">
                    <span className="k">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t">{t}</span>
                  </div>
                ))}
              </div>
            </Spec>
          </section>

          {/* BENTO */}
          <section className="izc-sec" id="bento">
            <div className="izc-sec-h">
              <span className="n">07</span> Bento
            </div>
            <Spec label="<b>bento</b> · differentiators">
              <div className="iz-bento" style={{ marginTop: 0 }}>
                <div className="iz-bento-cell c-lg">
                  <span className="iz-kicker">Excessive trust</span>
                  <h3>One login trusts the whole network</h3>
                  <p>A stolen credential moves laterally, unchecked.</p>
                </div>
                <div className="iz-bento-cell c-md">
                  <span className="iz-kicker">Migration</span>
                  <div className="iz-bento-stat">72%</div>
                  <p>of enterprises are moving off VPN.</p>
                </div>
                <div className="iz-bento-cell c-sm">
                  <span className="iz-kicker">Surface</span>
                  <h3>Exposed ports</h3>
                  <p>Visible to every scanner.</p>
                </div>
                <div className="iz-bento-cell c-sm">
                  <span className="iz-kicker">Latency</span>
                  <h3>Backhauling</h3>
                  <p>Traffic detours first.</p>
                </div>
                <div className="iz-bento-cell c-sm">
                  <span className="iz-kicker">Visibility</span>
                  <h3>No per-app log</h3>
                  <p>No record of who reached what.</p>
                </div>
              </div>
            </Spec>
          </section>

          {/* COMPARISON */}
          <section className="izc-sec" id="compare">
            <div className="izc-sec-h">
              <span className="n">08</span> Comparison
            </div>
            <Spec label="<b>table</b> · toggle">
              <div className="iz-cmp-toggle" style={{ marginTop: 0 }}>
                {Object.keys(cmpRows).map((k) => (
                  <button key={k} className={cmp === k ? "on" : ""} onClick={() => setCmp(k)}>
                    {k}
                  </button>
                ))}
              </div>
              <table className="iz-cmp">
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>{cmp.replace("vs ", "")}</th>
                    <th className="ours">InstaSafe ZTNA</th>
                  </tr>
                </thead>
                <tbody>
                  {(cmpRows[cmp] || []).map((row) => (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td>{row[1] === "no" ? <span className="no">✗ no</span> : row[1]}</td>
                      <td className="ours">{row[2] === "yes" ? <span className="yes">✓ yes</span> : row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Spec>
          </section>

          {/* PRICING */}
          <section className="izc-sec" id="pricing">
            <div className="izc-sec-h">
              <span className="n">09</span> Pricing
            </div>
            <Spec label="<b>cards</b> · featured + standard">
              <div className="iz-price" style={{ marginTop: 0 }}>
                {[
                  { name: "SSO", amt: "$1", feat: false, list: ["SAML / OAuth / OIDC", "Desktop SSO", "Directory sync"] },
                  { name: "Zero Trust Platform", amt: "$2", feat: true, list: ["25 device checks", "Session recording", "Agent + agentless"] },
                  { name: "MFA", amt: "$1", feat: false, list: ["TOTP, push, biometrics", "Hardware key", "OS MFA"] },
                ].map((p) => (
                  <div key={p.name} className={`iz-price-card ${p.feat ? "feat" : ""}`}>
                    {p.feat && <span className="iz-badge">Most popular</span>}
                    <span className="iz-price-name">{p.name}</span>
                    <div className="iz-price-amt">
                      {p.amt}
                      <span className="suf"> / user / mo</span>
                    </div>
                    <ul className="iz-price-list">
                      {p.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                    <span className="iz-btn">{p.feat ? "Start here" : "Choose plan"}</span>
                  </div>
                ))}
              </div>
            </Spec>
          </section>

          {/* TESTIMONIALS */}
          <section className="izc-sec" id="social">
            <div className="izc-sec-h">
              <span className="n">10</span> Testimonials
            </div>
            <Spec label="<b>cards</b> · quotes">
              <div className="iz-tst" style={{ marginTop: 0 }}>
                {[
                  ["InstaSafe stands out in its adaptability to expanding cloud environments.", "Ranjith P.", "Head of IT Security, BPM"],
                  ["Scaled remote access from 500 to 65,000 users in five days.", "Hariharan S.", "Infrastructure Lead, BFSI"],
                  ["On-premise deployment was the deciding factor for us.", "Rishu P.", "CISO, Government PSU"],
                ].map((t) => (
                  <div key={t[1]} className="iz-tst-card">
                    <p className="q">&ldquo;{t[0]}&rdquo;</p>
                    <div className="by">
                      <b>{t[1]}</b>
                      {t[2]}
                    </div>
                  </div>
                ))}
              </div>
            </Spec>
          </section>

          {/* LIVE POSTURE */}
          <section className="izc-sec" id="posture">
            <div className="izc-sec-h">
              <span className="n">11</span> Live posture
            </div>
            <Spec label="<b>panel</b> · trust strip + verdict">
              <div className="iz-trust" style={{ marginTop: 0, marginBottom: 22 }}>
                <span>Gartner-recognised</span>
                <span>NIST SP 800-207</span>
                <span>500,000 endpoints</span>
                <span>150+ enterprises</span>
              </div>
              <div className="iz-panel" style={{ maxWidth: 460 }}>
                <div className="iz-pbar">
                  <span className="iz-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="iz-pbar-title">posture · this device</span>
                  <span className="iz-live">
                    <i />
                    LOCAL
                  </span>
                </div>
                <div className="iz-pbody">
                  <div className="iz-visitor-grid">
                    {[
                      ["operating system", "Windows"],
                      ["browser", "Chrome"],
                      ["device type", "Desktop"],
                      ["timezone", "Asia/Kolkata"],
                    ].map(([l, v]) => (
                      <div key={l} className="iz-vrow">
                        <span className="l">{l}</span>
                        <span className="v">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="iz-verdict">
                    <i />
                    signals read · evaluated against policy
                  </div>
                  <div className="iz-disclaim">computed locally · nothing is sent anywhere.</div>
                </div>
              </div>
            </Spec>
          </section>
        </div>
      </div>
    </div>
  );
}
