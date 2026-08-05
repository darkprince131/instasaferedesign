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
import { IzSignalGrid } from "@/components/home2/IzSignalGrid";
import { IzPanel, IzJson } from "@/components/home2/IzPanel";
import { IzStepRail, IzChip } from "@/components/home2/IzStepRail";
import { IzUseCaseSwitch } from "@/components/home2/IzUseCaseSwitch";
import { IzAgentScene } from "@/components/home2/IzAgentScene";
import { IzDevBand } from "@/components/home2/IzDevBand";
import { IzVpnZtnaFlow } from "@/components/home2/IzVpnZtnaFlow";
import { IzScoreProcess } from "@/components/home2/IzScoreProcess";
import { IzProHero } from "@/components/izpages/pro/IzProHero";
import { IzProStack } from "@/components/izpages/pro/IzProStack";
import { IzUseCaseGrid } from "@/components/izpages/pro/IzUseCaseGrid";
import { IzAgentCards } from "@/components/izpages/pro/IzAgentCards";
import { IzTabSwitch } from "@/components/izpages/pro/IzTabSwitch";
import { IzLogoGrid } from "@/components/izpages/pro/IzLogoGrid";
import { IzTestimonial } from "@/components/izpages/pro/IzTestimonial";
import { IzConverge } from "@/components/izpages/pro/IzConverge";
import { IzEventsHero } from "@/components/izpages/pro/IzEventsHero";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { IzProofGrid } from "@/components/home2/IzProofGrid";
import { IzSpecTable } from "@/components/home2/IzSpecTable";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzQuestionBand, IzQuietBand } from "@/components/home2/IzQuestionBand";
import { IzRelatedRail } from "@/components/home2/IzRelatedRail";
import { IzTrustBar } from "@/components/home2/IzTrustBar";
import { IzLogoMarquee } from "@/components/home2/IzLogoMarquee";
import "@/components/home2/izlogomarquee.css";
import { IzStatRibbon } from "@/components/home2/IzStatRibbon";
import { IzProblemCards } from "@/components/home2/IzProblemCards";
import { IzTunnelCards } from "@/components/home2/IzTunnelCards";
import { ArrowsOutCardinal, Broadcast as BroadcastIcon, CurrencyDollar } from "@phosphor-icons/react";
import { Certificate, UserCheck, Devices, Prohibit, LinkSimple } from "@phosphor-icons/react";
import { IzConverge as IzConvergeVisual } from "@/components/izpages/pro/IzConverge";
import { MockInspect, MockVerify } from "@/components/izpages/pro/IzMocks";
import { Broadcast, UsersThree, Export, Pulse, Clock, ShieldCheck } from "@phosphor-icons/react";
import { HeroSplit, HeroSplitFlip, HeroCentered, HeroConsole, HeroImmersive } from "@/components/izpages/heroes/Heroes";

/* ============================================================
   Component Lab — /components
   A gallery (like /console) where every reusable website
   component lives, rendered in the Balanced design language.
   Paper is the default; the dark toggle lets us compare themes.
   ============================================================ */

type Theme = "dark" | "paper";
type DesignSystem = "orange" | "teal" | "violet" | "blue";

/* Design systems — each entry's `dot` is just the switcher's own reference
   swatch (dark-theme hex, for a color that reads on either theme); the
   actual accent values live in home2.css under `.iz[data-system="…"]`.
   Add a system there, then add its entry here to test it. */
const SYSTEMS: { id: DesignSystem; label: string; dot: string }[] = [
  { id: "orange", label: "Orange", dot: "#ff6a2c" },
  { id: "teal", label: "Teal", dot: "#2dd4bf" },
  { id: "violet", label: "Violet", dot: "#a78bfa" },
  { id: "blue", label: "Blue", dot: "#4a9eff" },
];

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
  ["grid", "Structural grid"],
  ["backdrops", "Backdrops (tier 3)"],
  ["scene", "Inspector scene"],
  ["usecaseswitch", "Use-case switch"],
  ["agentscene", "Who is really there"],
  ["devband", "Dark data band"],
  ["vpnztna", "VPN vs ZTNA flow"],
  ["scoreprocess", "Process + progress bars"],
  ["propage", "Platform page (hero + stack)"],
  ["hoveranims", "Hover animation sections"],
  ["tabswitch", "Tab-switch (2 variants)"],
  ["blocks", "Logo grid + testimonial"],
  ["converge", "Converge + events hero"],
  ["outcomes", "Outcomes (flowchart draw)"],
  ["proofgrid", "Proof grid (fact wall)"],
  ["spectable", "Spec table (quick scan)"],
  ["answerstrip", "Answer strip (plain answer)"],
  ["questionband", "Question / quiet band"],
  ["relatedrail", "Related rail"],
  ["pagekit", "Page kit (trust / ribbon / problem)"],
  ["tunnelcards", "Per-session tunnels"],
  ["heroes", "Hero archetypes"],
  ["signalgrid", "Control surface"],
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
  ["illustrations", "Illustrations"],
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

/* `illustrationSample` is a pre-rendered <Illustration> passed in from the
   server page — the Illustration component reads the SVG off disk via `fs`, so
   it must stay in the server graph and be handed to this client component as a
   prop rather than imported here. */
export function ComponentsLab({ illustrationSample, illustrationCity }: { illustrationSample?: React.ReactNode; illustrationCity?: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("paper");
  const [system, setSystem] = useState<DesignSystem>("orange");
  const [cmp, setCmp] = useState("vs VPN");
  /* inspector-scene demo state — the toggle drives both the payload and
     which narration step is current, the way the reference scene does */
  const [izOn, setIzOn] = useState(true);

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

  // design-system bootstrap (key = is-system) — the lab is the one place
  // that sets this; the homepage just reads it back.
  useEffect(() => {
    try {
      const s = localStorage.getItem("is-system") as DesignSystem | null;
      if (s === "orange" || s === "teal" || s === "violet" || s === "blue") setSystem(s);
    } catch {}
  }, []);
  const setSys = (s: DesignSystem) => {
    setSystem(s);
    try {
      localStorage.setItem("is-system", s);
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
    <div className="iz" data-theme={theme} data-system={system}>
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
              <div className="izc-sys" role="group" aria-label="System">
                {SYSTEMS.map((s) => (
                  <button
                    key={s.id}
                    className={system === s.id ? "on" : ""}
                    onClick={() => setSys(s.id)}
                    aria-label={`${s.label} system`}
                    aria-pressed={system === s.id}
                  >
                    <i className="dot" style={{ background: s.dot }} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
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

          {/* STRUCTURAL GRID */}
          <section className="izc-sec" id="grid">
            <div className="izc-sec-h">
              <span className="n">00-grid</span> Structural grid (background / section system)
            </div>
            <p className="izc-sec-desc">
              Engineering-drawing structure, analyzed from fingerprint.com (dashed rails at the content column +
              hairline panel boxes) and firecrawl.dev (plus/cross markers at intersections). Four section-rhythm
              variants so adjacent sections read as structurally different, instead of one uniform stacked feed.
              Tokens live in <code>iz-system.css</code> §9; classes in <code>izgrid.css</code>. Static CSS only —
              zero JS, nothing animates.
            </p>

            <Spec label="<b>iz-sec--open</b> · plain, no rails — the breathing-room variant">
              <div className="iz-sec--open" style={{ padding: "var(--sp-10) 0" }}>
                <div className="iz-wrap">
                  <p style={{ margin: 0, color: "var(--tx-dim)" }}>
                    Plain section — a top divider only, no rails, no cells. Used to give the eye a rest between
                    structured sections.
                  </p>
                </div>
              </div>
            </Spec>

            <Spec label="<b>iz-sec--railed</b> · dashed column rails + corner crosses">
              <div className="iz-sec--railed" style={{ padding: "var(--sp-10) 0" }}>
                <span className="iz-cross iz-cross--tl" aria-hidden="true" />
                <span className="iz-cross iz-cross--tr" aria-hidden="true" />
                <span className="iz-cross iz-cross--bl" aria-hidden="true" />
                <span className="iz-cross iz-cross--br" aria-hidden="true" />
                <div className="iz-wrap">
                  <p style={{ margin: 0, color: "var(--tx-dim)" }}>
                    Dashed 1px rails run the section&apos;s full height at the ~1200px content edges; crosses mark
                    where they meet the top/bottom dividers.
                  </p>
                </div>
              </div>
            </Spec>

            <Spec label="<b>iz-sec--cells</b> · bordered cell grid, shared 1px dividers, corner crosses">
              <div className="iz-sec--cells" style={{ padding: "var(--sp-10) 0" }}>
                <div className="iz-wrap">
                  <div className="iz-cellgrid cols-3">
                    {["Authenticate", "Authorize", "Connect"].map((t) => (
                      <div key={t} className="iz-gridcell">
                        <span className="iz-kicker">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Spec>

            <Spec label="<b>iz-sec--band</b> · full-bleed alt background + inset panel">
              <div className="iz-sec--band" style={{ padding: "var(--sp-10) 0" }}>
                <div className="iz-wrap">
                  <div className="iz-inset">
                    <p style={{ margin: 0, color: "var(--tx-dim)" }}>
                      Inset panel, floating on the alt-background band.
                    </p>
                  </div>
                </div>
              </div>
            </Spec>

            <Spec label="<b>iz-cross</b> · plus marker &amp; <b>iz-gridfield</b> · fine grid texture (sparing use)" className="center">
              <div className="iz-gridcell iz-gridfield" style={{ width: 160, height: 100 }}>
                <span className="iz-cross iz-cross--tl" aria-hidden="true" />
                <span className="iz-cross iz-cross--tr" aria-hidden="true" />
                <span className="iz-cross iz-cross--bl" aria-hidden="true" />
                <span className="iz-cross iz-cross--br" aria-hidden="true" />
              </div>
              <span className="iz-cross" aria-hidden="true" />
            </Spec>
          </section>

          {/* BACKDROPS — TIER 3 */}
          <section className="izc-sec" id="backdrops">
            <div className="izc-sec-h">
              <span className="n">00ag</span> Backdrops — what a section sits on (tier 3)
            </div>
            <p className="izc-sec-desc">
              The library has three tiers and they compose: <b>visuals</b> live inside a section, <b>sections</b> go
              into a page, and <b>backdrops</b> are what a section sits on. This is the third tier. Taken from the
              /returning-user-experience/ recording, where the reason the scene reads as sleek is that its background
              is never flat — it layers a large dashed lattice, a soft colour bloom, and a bordered stage split into
              two tonal zones. Tokens in <code>iz-system.css</code> §9; classes in <code>iz-backdrops.css</code>.
            </p>

            <Spec label="<b>iz-bd-macro</b> · large lattice — NOT the 16px <code>iz-gridfield</code> texture">
              <div className="iz-bd-macro" style={{ padding: "var(--sp-12) var(--sp-8)" }}>
                <p style={{ margin: 0, color: "var(--tx-dim)", maxWidth: "56ch" }}>
                  A ~220px lattice behind a whole section, faded out at the edges by a radial mask. Keep it far apart
                  in scale from the fine panel texture — at similar sizes the two read as one muddy grain.
                </p>
              </div>
            </Spec>

            <Spec label="<b>iz-bd-bloom</b> · one soft off-centre wash — the cheapest fix for a dead-white section">
              <div className="iz-bd-bloom" style={{ padding: "var(--sp-12) var(--sp-8)" }}>
                <p style={{ margin: 0, color: "var(--tx-dim)", maxWidth: "56ch" }}>
                  Position it with <code>--bloom-x</code>/<code>--bloom-y</code> so it sits behind the visual, never
                  behind body copy — it costs contrast.
                </p>
              </div>
            </Spec>

            <Spec label="<b>iz-bd-stage</b> · bordered panel, split into two tonal zones at <code>--stage-split</code>">
              <div className="iz-bd-stage" style={{ minHeight: 160, display: "grid", gridTemplateColumns: "34% 1fr" }}>
                <div style={{ padding: "var(--sp-6)", color: "var(--tx-mute)", fontSize: "var(--fs-sm)" }}>
                  warm zone — narration
                </div>
                <div style={{ padding: "var(--sp-6)", color: "var(--tx-mute)", fontSize: "var(--fs-sm)" }}>
                  cool zone — the visual
                </div>
              </div>
            </Spec>

            <Spec label="<b>iz-inverted</b> · one dark band on a light page, with zero hardcoded hex">
              <div className="iz-inverted" style={{ padding: "var(--sp-10) var(--sp-8)" }}>
                <p style={{ margin: 0, color: "var(--tx)", maxWidth: "56ch" }}>
                  Every token flips inside this band, so any component dropped in here picks up dark values with no
                  dark variant of its own. Built always-dark for now; turning it into a true inversion (dark band on
                  paper, light band on dark) is one extra rule, documented in <code>iz-system.css</code> §7.
                </p>
                <p style={{ margin: "var(--sp-4) 0 0", color: "var(--tx-dim)", fontSize: "var(--fs-body-sm)" }}>
                  Muted text, a <span style={{ color: "var(--accent)" }}>accent</span> and a hairline all resolve from
                  the flipped scale.
                </p>
              </div>
            </Spec>

            <Spec label="<b>iz-bd-dashrule</b> · dashed divider — reads as drawing, not as a card edge">
              <hr className="iz-bd-dashrule" />
            </Spec>
          </section>

          {/* INSPECTOR SCENE — tiers 1+2+3 composed */}
          <section className="izc-sec" id="scene">
            <div className="izc-sec-h">
              <span className="n">00ae/00af</span> Inspector scene — IzPanel + IzStepRail on a backdrop
            </div>
            <p className="izc-sec-desc">
              The whole point of the tiers, shown composed. <b>Tier 3</b> gives the section its lattice, bloom and
              stage. <b>Tier 1</b> supplies the two visuals: <code>IzStepRail</code> (mono step label, mixed-weight
              narration, an accent rail that marks only the active step) and <code>IzPanel</code> (mono uppercase
              chrome, a real toggle switch, muted window affordances, a payload allowed to overflow with a thin
              scrollbar, and a footer meta strip). <b>Tier 2</b> is this arrangement of them, which is what a page
              actually drops in. Flip the switch — the payload and the current step both change.
            </p>

            <Spec label="<b>Composed scene</b> · flip the toggle in the panel header">
              <div className="iz-bd-macro iz-bd-bloom" style={{ padding: "var(--sp-10) var(--sp-6)" }}>
                <div className="izc-scene-stage iz-bd-stage">
                  <IzStepRail
                    active={izOn ? 1 : 0}
                    label="Access decision walkthrough"
                    steps={[
                      {
                        n: 1,
                        body: (
                          <>
                            <strong>Anita</strong> opens the billing portal from a laptop the network has never seen.
                            Without InstaSafe she is <IzChip tone="deny">unknown</IzChip> and gets the whole login
                            gauntlet.
                          </>
                        ),
                      },
                      {
                        n: 2,
                        body: (
                          <>
                            With InstaSafe the device is already bound, so <strong>Anita</strong> is recognised as a{" "}
                            <IzChip tone="allow">trusted device</IzChip> and reaches the app in one step.
                          </>
                        ),
                      },
                    ]}
                  />

                  <div className="izc-scene-panel">
                    <IzPanel
                      toggle={{
                        on: izOn,
                        label: izOn ? "InstaSafe on" : "InstaSafe off",
                        onChange: setIzOn,
                      }}
                      footerLeft="Evaluating"
                      footerRight="billing-portal.acme.in"
                    >
                      <IzJson
                        src={
                          izOn
                            ? `{
  "decision": "allow",
  "elapsed_ms": 240,
  "user": "anita.r",
  "device": {
    "id": "WS-FIN-014",
    "bound": true,
    "posture": "compliant"
  },
  "factors_required": 0,
  "policy": "IN-Finance-Managed"
}`
                            : `{
  "decision": "challenge",
  "elapsed_ms": 107000,
  "user": "anita.r",
  "device": {
    "id": null,
    "bound": false,
    "posture": "unknown"
  },
  "factors_required": 2,
  "policy": "fallback-password-otp"
}`
                        }
                      />
                    </IzPanel>
                  </div>
                </div>
              </div>
            </Spec>

            <Spec label="<b>IzPanel</b> · on its own, with a plain title instead of a toggle">
              <div style={{ maxWidth: 460 }}>
                <IzPanel title="Device posture" type="object" footerLeft="Inspecting" footerRight="WS-FIN-014">
                  <IzJson
                    src={`{
  "posture": "compliant",
  "disk_encryption": "on",
  "edr": "present",
  "screen_lock": "5m",
  "checked_at": 1743696478226
}`}
                  />
                </IzPanel>
              </div>
            </Spec>
          </section>

          {/* USE-CASE SWITCH — homepage section 1 */}
          <section className="izc-sec" id="usecaseswitch">
            <div className="izc-sec-h">
              <span className="n">00ah</span> Use-case switch (accordion + per-tab visual)
            </div>
            <p className="izc-sec-desc">
              From fingerprint.com&apos;s &ldquo;Build safe and seamless products&rdquo;. Three things carried over:
              the header owns the <b>left half only</b> — that empty right half is what makes the visual below read as
              a second register; <b>every tab has its own visual</b>, not one fixed picture with the text swapped; and
              below 900px the visual is <b>removed entirely</b> (verified — that is exactly what they do), so every
              description is always rendered rather than state-gated. The outline artwork draws itself in via{" "}
              <code>useDrawIn</code> — <code>stroke-dashoffset</code> → 0, re-armed on each tab change.
            </p>
            <Spec label="<b>IzUseCaseSwitch</b> · click the rows; narrow the window past 900px to see the visual drop">
              <IzUseCaseSwitch />
            </Spec>
          </section>

          {/* AGENT SCENE — homepage section 2 */}
          <section className="izc-sec" id="agentscene">
            <div className="izc-sec-h">
              <span className="n">00ai</span> Who is really there (window stack + markers)
            </div>
            <p className="izc-sec-desc">
              From the &ldquo;Not all bots are bad / Not all humans are good&rdquo; scene. Their DOM: three browser
              windows, middle in focus, outer two scaled back and clipped by the section edges, floating cursor tags,
              and a pill toggle that flips the whole scene. The <i>idea</i> transfers, not the content — they sell
              agent detection, we sell access control, so ours asks <i>who is actually driving this session</i> across
              three published apps. <b>Flip the toggle and every marker disappears</b>: same three windows, no way to
              tell them apart. That is the argument. On phones the outer windows and the floating tags are dropped —
              absolutely-positioned labels over a scaled scene are unreadable there — and the markers become a plain
              list saying the same thing.
            </p>
            <Spec label="<b>IzAgentScene</b> · markers autoplay until you touch the toggle">
              <IzAgentScene />
            </Spec>
          </section>

          {/* DEV BAND — homepage section 3 */}
          <section className="izc-sec" id="devband">
            <div className="izc-sec-h">
              <span className="n">00aj</span> Dark data band (graph + links + stats + strip)
            </div>
            <p className="izc-sec-desc">
              From &ldquo;The original fingerprinting library&rdquo;. Measured off their DOM: one dark rounded panel,
              a sparkline SVG with exactly two paths (gradient-filled area + a 1.5px stroked line), copy stacked
              top-left, a 2×2 grid of link tiles, a stats row, then a bordered technology strip. Ours gets the dark
              surface from <code>.iz-inverted</code>, so <b>no hex is hardcoded</b> and it renders correctly on both
              themes with no variant. ⚠️ The numbers and the trend are <b>illustrative defaults</b> so the component
              has a shape — wire real figures from the Content Master before this ships, and keep the note line until
              you do.
            </p>
            <Spec label="<b>IzDevBand</b> · the band supplies its own dark scale via token flip">
              <IzDevBand />
            </Spec>
          </section>

          {/* VPN vs ZTNA — the WithWithout `vpn-ztna` variant */}
          <section className="izc-sec" id="vpnztna">
            <div className="izc-sec-h">
              <span className="n">00ak</span> VPN vs ZTNA flow (WithWithout · <code>vpn-ztna</code> variant)
            </div>
            <p className="izc-sec-desc">
              Modelled on the <code>DiagramSection</code> from fingerprint.com/products/identification/, with the
              content specced in §C.5. Their structural moves, all kept: the segmented control sits <b>above</b> the
              scene so the two states read as <i>one object changing</i> rather than two things compared; an incoming
              cone of undifferentiated dots on the left; a decision point in the middle; an outgoing cone that{" "}
              <b>splits into a green half and a red half only in the second state</b>; and annotations that arrive
              with that state, so switching feels like information appearing rather than colours changing.
              <br />
              <br />
              The <b>InstaSafe mark sits at the junction</b> — a <code>?</code> when it&apos;s off, the orange node
              everything routes through when it&apos;s on. That single swap is what makes the diagram ours rather
              than generic. Desktop runs left→right with 12 sessions and 4 apps; mobile runs top→down with{" "}
              <b>4 sessions and 3 apps</b> — a smaller <i>cast</i>, not a squeezed drawing, which is why it is a
              separate SVG rather than a viewBox trick. The band is <code>.iz-inverted</code>, so no hex is hardcoded.
            </p>
            <Spec label="<b>IzVpnZtnaFlow</b> · flip the control; narrow past 900px for the vertical cast">
              <IzVpnZtnaFlow />
            </Spec>
          </section>

          {/* PROCESS + PROGRESS BARS */}
          <section className="izc-sec" id="scoreprocess">
            <div className="izc-sec-h">
              <span className="n">00al</span> Process walkthrough with progress bars
            </div>
            <p className="izc-sec-desc">
              Recreation of &ldquo;A single score trained on your traffic&rdquo; from{" "}
              <code>/products/smart-signals/</code>, analysed frame by frame from the recording plus a DOM probe.
              <br />
              <br />
              <b>The progress bars are the layout.</b> Two step tabs sit <b>above</b> the stage and two <b>below</b>{" "}
              it — read top-left → top-right → bottom-left → bottom-right and the four tracks form{" "}
              <b>one continuous progress bar wrapped around the animation</b>. Completed steps stay filled, the
              active one is filling, the rest are empty, so the chrome tells you where you are without a single
              number or dot. The fill is also the <b>clock</b>: it&apos;s a CSS animation whose end advances the
              step, so the thing you can see is the thing that&apos;s counting (same mechanism as ScrollSteps 00o).
              Verified on their build: <code>svg</code> only — no canvas, no video, no Lottie — so every scene here
              is DOM + CSS too. Hovering pauses; the tabs are clickable.
              <br />
              <br />
              This is one of the few sections they keep <b>fully visible on mobile</b>, so it stays — the tab pairs
              just go to one column each.
            </p>
            <Spec label="<b>IzScoreProcess</b> · four scenes, autoplaying; hover to pause, click a step to jump">
              <IzScoreProcess />
            </Spec>
          </section>

          {/* PLATFORM PAGE — hero + sticky stack */}
          <section className="izc-sec" id="propage">
            <div className="izc-sec-h">
              <span className="n">00am</span> Platform page — design-canvas hero + sticky scroll-stack
            </div>
            <p className="izc-sec-desc">
              Recreation of <code>/products/fingerprint-pro/</code>, from a screen recording plus DOM measurement.
              <br />
              <br />
              <b>Hero.</b> Verified on their build as <b>0 images, 0 SVG, 0 canvas, 0 video</b> — a real grid of cells
              with a few shaded, plus absolutely-placed cards. The conceit is a design tool&apos;s canvas: the whole
              hero sits in a selection rectangle with corner handles, the headline is itself a selected object with a
              label tab, and a coordinate readout tracks the cursor. Pointer work is rAF-throttled and writes through
              refs and CSS variables, so <b>nothing re-renders per frame</b>. Per the interaction-placement doctrine
              the hover is decoration and never a gate — headline, sub and link are static and carry the message
              alone. On touch it is not merely disabled: the readout and scattered cards are removed, since they need
              a canvas to be scattered on.
              <br />
              <br />
              <b>Stack.</b> Measured from their <code>PlatformSlider</code>: <code>sticky; top:0; height:720px</code>{" "}
              inside an <code>8496px</code> wrapper — ~2100px of scroll per step — with four absolute slots where the{" "}
              <b>incoming slot carries the higher z-index and rises over the outgoing one</b>. The outgoing card never
              leaves first, and that overlap is what makes it read as seamless rather than as a slideshow. Driven by
              rAF + <code>getBoundingClientRect</code> gated by an IntersectionObserver — never a scroll listener —
              writing one custom property per frame; React state changes only on the active index, four times total.
              <br />
              <br />
              <b>Mobile.</b> The scroll mechanism is <b>removed, not shrunk</b> — a plain static list renders instead,
              exactly as their <code>mobileList</code> does. Scroll-jacking on touch is how these break.
              <br />
              <br />
              <b>Editing.</b> All content is data in <code>components/izpages/pro/pro.config.tsx</code>. A new slide is
              one object appended to <code>SLIDES</code> — the counter, the rail, the stack and the mobile list all
              read its length. Panels are a closed union (<code>code</code> / <code>table</code> / <code>record</code>)
              rendered by one component, so a slide never needs hand-written JSX.
            </p>
            <IzProHero />
            <IzProStack />
          </section>

          {/* HOVER ANIMATION SECTIONS */}
          <section className="izc-sec" id="hoveranims">
            <div className="izc-sec-h">
              <span className="n">00an</span> Hover animation sections + the mock library
            </div>
            <p className="izc-sec-desc">
              Two section shapes from the recordings, plus the five sub-components they share.
              <br />
              <br />
              <b>The mocks are the sub-components</b> (<code>IzMocks.tsx</code>), and each has exactly one specialty
              — the specialty <i>is</i> the argument it makes. <b>Welcome</b> = resolution: it arrives already
              recognised, nothing is asked. <b>Challenge</b> = escalation: a challenge appears and is answered.{" "}
              <b>Loop</b> = repetition that never resolves — the cursor clicks, the field rejects, it starts over; it
              must <i>not</i> succeed, because a loop that resolved would say the attacker got in. <b>Verify</b> =
              progress to a verdict. <b>Inspect</b> = something examined in place, with a finding surfacing over it.
              <br />
              <br />
              <b>Motion contract:</b> every animation is declared <code>animation-play-state: paused</code> and only an
              ancestor with <code>.is-live</code> starts it. Sections set that on hover, <b>one at a time</b> — three
              looping mock-ups playing at once is noise and none of them gets read. Reduced motion freezes each one at
              its <b>end</b> state, never mid-way, so it still reads as a finished thought.
              <br />
              <br />
              <b>The grid&apos;s hover continues the hero.</b> Hovering a cell doesn&apos;t just tint it — it draws the
              same accent selection the hero puts around its headline: 1px outline, four corner handles, and{" "}
              <code>.iz-gridfield</code> lit in accent underneath. Same surface, moved under the visitor&apos;s
              control. On touch the selection chrome is dropped entirely rather than parked on one arbitrary cell.
              <br />
              <br />
              Content is data in <code>sections.config.tsx</code>; mocks are referenced by <b>key</b>, so the config
              never imports JSX and a new mock is available to both sections at once.
            </p>
            <IzUseCaseGrid />
            <IzAgentCards />
          </section>

          {/* TAB SWITCH — the use-case-page workhorse, two skins */}
          <section className="izc-sec" id="tabswitch">
            <div className="izc-sec-h">
              <span className="n">00ao</span> Tab-switch — copy + 3 tabs left, swapping panel right
            </div>
            <p className="izc-sec-desc">
              The layout fingerprint.com repeats across nearly every use-case page: copy and CTAs on the left,{" "}
              <b>three tabs beneath them</b>, and a panel on the right that swaps with the tab. It shows up in two
              skins and <b>both are this one component</b>.
              <br />
              <br />
              <code>variant=&quot;console&quot;</code> is permanently dark inside a window frame. Dark isn&apos;t a
              theme choice here — a terminal is dark wherever it runs — so it pins <code>.iz-inverted</code> and stays
              dark even on a paper page, with no hardcoded hex. Its tabs pick a signal and the panel shows that
              signal&apos;s payload, with its own sub-tabs for the two outcomes.
              <br />
              <br />
              <code>variant=&quot;resource&quot;</code> is theme-aware and gridded. Here the tabs swap <b>both</b> the
              left copy block and the right visual, with a byline under it.
              <br />
              <br />
              Which parts swap falls out of the data rather than the code: a tab carries a <code>copy</code> block
              when the left column should change with it, and omits it when the left column is fixed. Panels stay
              mounted and toggle with <code>hidden</code>, so switching costs no remount and the JSON isn&apos;t
              re-tokenised on every click. Arrow keys move between tabs.
            </p>
            <Spec label="<b>variant=&quot;console&quot;</b> · permanently dark, window-framed">
              <IzTabSwitch variant="console" />
            </Spec>
            <Spec label="<b>variant=&quot;resource&quot;</b> · theme-aware; the tab swaps the copy AND the visual">
              <IzTabSwitch variant="resource" />
            </Spec>
          </section>

          {/* LOGO GRID + TESTIMONIAL */}
          <section className="izc-sec" id="blocks">
            <div className="izc-sec-h">
              <span className="n">00ap</span> Ecosystem grid + customer quote
            </div>
            <p className="izc-sec-desc">
              <b>IzLogoGrid</b> — copy and a CTA left, an ecosystem lattice right where logos sit in <i>some</i> cells
              and the rest stay empty. Same coordinates-as-data engine as <code>IzSignalGrid</code>, and the same
              reason it works: the gaps are what stop it being a logo wall. One cell isn&apos;t a logo at all but a
              full-width copy strip <i>set into</i> the grid, which is what keeps the right-hand side from reading as
              decoration. The headline&apos;s last word takes the accent, so the sequence lands on the one verb that
              is the point. Below 900px the placed coordinates stop meaning anything, so everything flows into two
              columns — two, not four, because four would force every wordmark to wrap.
              <br />
              <br />
              <b>IzTestimonial</b> — the oversized quote mark is <i>behind</i> the block and clipped, not an icon
              beside the text; at that size it&apos;s texture, so it&apos;s <code>aria-hidden</code>. The case-study
              hand-off is a tinted band rather than a trailing link, because it has to read as &ldquo;there is
              more&rdquo; — that&apos;s the job the section is doing.
              <br />
              <br />
              ⚠️ <b>Both carry placeholder content.</b> Wordmarks render as <b>text, not artwork</b>, deliberately —
              nothing ships as a broken-asset box while real partner logos are outstanding. And the quote is attributed
              by <b>role and organisation only, with no invented person&apos;s name</b>: a fabricated human on a
              testimonial is a claim, not lorem ipsum. Swap both for approved content before either ships.
            </p>
            <IzLogoGrid />
            <IzTestimonial />
          </section>

          {/* CONVERGE + EVENTS HERO */}
          <section className="izc-sec" id="converge">
            <div className="izc-sec-h">
              <span className="n">00aq</span> Signal converge + events hero
            </div>
            <p className="izc-sec-desc">
              <b>IzConverge</b> — signal chips drift in from the left, converge on the mark, and one orthogonal
              circuit run carries the result out to a session ID. Deliberately cheap, as asked: chips are DOM with
              one staggered CSS drift each, and the wiring is a <b>single static SVG of straight segments</b> — no
              path maths, no per-node animation. The argument is &ldquo;many inputs, one identity out&rdquo;, and
              that reads from the composition alone; animating the wiring would cost more without meaning more.
              <br />
              <br />
              <b>IzEventsHero</b> — the week calendar as backdrop with the title floating over it. The entrance order
              is the trick, and it is <b>backwards from the obvious one</b>: the <b>card arrives first</b>, then the
              grid, then the event blocks. Leading with the calendar would make the reader parse a schedule they have
              no reason to care about yet; leading with the title says what they are looking at, and the calendar
              assembles underneath as evidence. Plain animation-delays, no JS. Below 900px days 6&ndash;9 are removed
              rather than squeezed, and the card sits above the grid instead of covering what little is left.
            </p>
            <Spec label="<b>IzConverge</b> · chips in, one identity out">
              <IzConverge />
            </Spec>
            <IzEventsHero />
          </section>

          {/* OUTCOMES — the sazabi skeleton */}
          <section className="izc-sec" id="outcomes">
            <div className="izc-sec-h">
              <span className="n">00ar</span> Outcomes section — glow head, flowchart connector, three columns
            </div>
            <p className="izc-sec-desc">
              The skeleton sazabi.com repeats down its whole page, rebuilt in our language. Three things are
              load-bearing: <b>the three outcomes are NOT cards</b> — no border, no background, no padding box, because
              boxing them turns a conclusion into a feature grid; <b>the connector is the argument</b>, a line dropping
              out of the visual into a rule that feeds the three columns, saying &ldquo;these three follow from
              that&rdquo;; and <b>the side alternates</b>, or the page becomes the same slab four times.
              <br />
              <br />
              <b>The animation you asked for.</b> On entering view the drop draws downward, then the rule draws{" "}
              <b>outward from its centre</b>, then the three feeds drop and the outcomes rise in sequence. Centre-out
              is the whole feel — it reads as <i>distribution</i>, one source feeding three, where a left-to-right
              wipe would read as a loading bar, which is the opposite claim. Pure CSS transforms behind one
              IntersectionObserver, and only that — <b>no timed failsafe</b>, since a blanket timer fired whether or
              not the visitor had scrolled anywhere near the section, which read as the animation playing on refresh
              instead of on scroll.
              <br />
              <br />
              <b>Theme-aware by default</b> — it follows the page&apos;s current theme rather than forcing sazabi&apos;s
              permanent dark band; pass <code>inverted</code> for that look explicitly via a token flip
              (<code>.iz-inverted</code>), correct on either page theme either way. The glow is our accent, not a
              borrowed red, and tuned tight and low-opacity rather than a wide neon halo — loud on a light background,
              restrained on either. The headline reaches their condensed-caps register with the display face at its
              heaviest, uppercase and tightly tracked; no second typeface.
              <br />
              <br />
              Below 900px the connector can&apos;t fan to three columns that no longer exist, so it becomes a single
              short drop — the claim survives and the diagram stops pretending.
            </p>

            <IzOutcomes
              side="left"
              tag="Swarm on incidents"
              title={["Ask your stack", "what changed"]}
              sub="Every session carries an identity, a device and a posture. Ask in plain language which of the three refused a request, and get the answer with the reason attached."
              visual={<IzConvergeVisual />}
              outcomes={[
                { Icon: Broadcast, title: "Embedded where you work", body: "Decisions surface in the tools your team already runs. No console to remember, no second place to check." },
                { Icon: UsersThree, title: "Debug alongside teammates", body: "A refused request is a shared thread, not a screenshot. Everyone sees the same evidence at the same time." },
                { Icon: Export, title: "Share and fork threads", body: "Any decision, chart or trail can be handed to whoever needs it — exported to your SIEM or sent as a link." },
              ]}
            />

            <IzOutcomes
              side="right"
              tag="Adaptive risk"
              title={["Seeing is", "believing"]}
              sub="Preview which sessions would have been challenged before a single rule goes live. Nothing changes until your team approves it."
              visual={<div style={{ display: "grid", placeItems: "center", padding: "var(--sp-8)" }}><MockVerify /></div>}
              outcomes={[
                { Icon: Pulse, title: "Accelerate your insight", body: "One score built from twenty-four signals, weighted the way your environment actually behaves." },
                { Icon: Clock, title: "Replay any decision", body: "Thirteen months of history. Who reached what, from which device, under which rule — answerable months later." },
                { Icon: ShieldCheck, title: "Approve before it bites", body: "Weight changes are staged and previewed. A rule only starts refusing people once someone signs it off." },
              ]}
            />
          </section>

          {/* PROOF GRID — Fingerprint industry-page fact wall */}
          <section className="izc-sec" id="proofgrid">
            <div className="izc-sec-h">
              <span className="n">00as</span> Proof grid — bento fact wall (recreated from Fingerprint&apos;s industry pages)
            </div>
            <p className="izc-sec-desc">
              Recreated from the pattern Fingerprint repeats across every industry/use-case page: a loose bento of
              claims, not a grid of matching cards. <b>Every cell is a different shape and a different kind of
              proof</b> — a signal-tag stack, arrow-led claims in two sizes, a compliance-badge stack, a live policy
              snippet, an endpoint-count burst, and a closing rating bar. That variety is the whole argument: it
              reads as &ldquo;look how much is true at once&rdquo; specifically because it does not look like one
              repeated card.
              <br />
              <br />
              Content ships as InstaSafe&apos;s own real numbers (content master, not invented) — the four-layer
              signal tags, the 25/144/1,500+ device-check figures, the NIST/CSA/PCI/HIPAA/GDPR/SOX/ISO compliance
              line verbatim, and 500,000+ endpoints as the closing stat burst. <code>eyebrow</code>/<code>headline</code>/
              <code>signals</code> are props so every industry page can reuse this exact component with its own framing
              rather than a bespoke rebuild per industry.
            </p>
            <IzProofGrid />
          </section>

          {/* SPEC TABLE — the Quick scan block */}
          <section className="izc-sec" id="spectable">
            <div className="izc-sec-h">
              <span className="n">00at</span> Spec table — the &ldquo;Quick scan&rdquo; block, four variants
            </div>
            <p className="izc-sec-desc">
              Needed on ~10 pages, and it carries the <b>shared ledger grammar</b> the other three new blocks
              inherit: mono key left, dotted leader, tabular value right, hairline rule. That single vocabulary is
              what makes the four read as one family rather than four widgets.
              <br />
              <br />
              <b>&ldquo;Quick scan&rdquo; names what the reader does</b> — so the block earns interaction by helping
              them <i>mark and filter</i>, never by <i>revealing</i>. No circular progress, no scramble-in: both
              delay the one job it has.
              <br />
              <br />
              <b>The rail variant is the exception, and the animation you asked for.</b> Icons hang off a vertical
              spine that draws top&rarr;bottom as the section is reached, each node and row arriving just after the
              line gets to it. The spine sits <i>behind</i> nodes that carry an opaque background, so it reads as
              connecting them rather than crossing them. <b>Armed by JS, not CSS</b> — the hidden state only exists
              once an IntersectionObserver is actually watching, so no-JS, an old browser, or reduced-motion all
              fall through to the finished state instead of a blank block.
            </p>

            <Spec label="<b>rail</b> · icon spine, draws on scroll — real /platform/device-binding specs">
              <IzSpecTable
                variant="rail"
                label="quick scan · device binding"
                rows={[
                  { key: "Trust anchor", value: "Per-device certificate", icon: Certificate },
                  { key: "Approval", value: "Admin review before first access; group auto-rules", icon: UserCheck },
                  { key: "Limits", value: "Concurrent-device caps per user", note: "single-device login enforceable", icon: Devices },
                  { key: "Revocation", value: "Instant, logged", icon: Prohibit },
                  { key: "Pairs with", value: "Posture checks — binding covers the identity of the machine, posture covers its health", icon: LinkSimple },
                ]}
              />
            </Spec>

            <Spec label="<b>checklist</b> · tickable + filter chips + copy-a-shortlist — the workhorse">
              <IzSpecTable
                variant="checklist"
                label="quick scan · ztna specs"
                groups={[
                  { id: "access & enforcement", label: "access" },
                  { id: "device trust", label: "device" },
                  { id: "audit & response", label: "audit" },
                ]}
                rows={[
                  { group: "access & enforcement", key: "Layer", value: "IP (L3/L4) — thick clients, protocols, legacy apps" },
                  { group: "access & enforcement", key: "Gateway model", value: "Software gateway · drop-all + SPA" },
                  { group: "access & enforcement", key: "Tunnels", value: "Per-session, per-resource, encrypted" },
                  { group: "access & enforcement", key: "Context policy", value: "Geo · IP · time · risk — 21 combinations" },
                  { group: "device trust", key: "Posture checks", value: "25 types / 144 rules / 1,500+ OS combos" },
                  { group: "device trust", key: "Binding", value: "Certificate, admin-approved before first use" },
                  { group: "device trust", key: "Client", value: "Windows · macOS · Linux · Always-On optional" },
                  { group: "audit & response", key: "Risk engine", value: "12 triggers · 4 automatic actions" },
                  { group: "audit & response", key: "Visibility", value: "202 event types · 7 SIEM formats · 11 reports" },
                  { group: "audit & response", key: "Auth", value: "Directory sync or built-in IdP · 6 MFA methods" },
                ]}
              />
            </Spec>

            <Spec label="<b>versus</b> · same component, second value column — /ztna, /vpn-alternative, /compare">
              <IzSpecTable
                variant="versus"
                label="quick scan · the same specs, two architectures"
                usLabel="InstaSafe ZTNA"
                legacyLabel="Legacy VPN"
                rows={[
                  { key: "Access granted", value: "One application", legacyValue: "The network segment", diff: true },
                  { key: "Lateral movement", value: "No network to cross", legacyValue: "Possible after login", diff: true },
                  { key: "Internet footprint", value: "0 ports answer a scan", legacyValue: "Concentrator is public", diff: true },
                  { key: "Device posture", value: "25 checks, every session", legacyValue: "Usually none", diff: true },
                  { key: "Scaling", value: "Configuration change", legacyValue: "Buy more hardware" },
                  { key: "Your traffic", value: "Never routes through us", legacyValue: "Vendor cloud sees it", diff: true },
                ]}
              />
            </Spec>

            <Spec label="<b>ledger</b> · flat fallback where there is no grouping and no comparison to make">
              <div style={{ maxWidth: 760 }}>
                <IzSpecTable
                  variant="ledger"
                  rows={[
                    { key: "Deployment", value: "Cloud-born · days, not quarters" },
                    { key: "Endpoints secured", value: "500,000+" },
                    { key: "Standards", value: "NIST SP 800-207 · CSA SDP" },
                    { key: "Data plane", value: "Split — traffic stays on your infrastructure" },
                  ]}
                />
              </div>
            </Spec>
          </section>

          {/* ANSWER STRIP */}
          <section className="izc-sec" id="answerstrip">
            <div className="izc-sec-h">
              <span className="n">00au</span> Answer strip — replaces the &ldquo;Plain answer&rdquo; block (~41 pages)
            </div>
            <p className="izc-sec-desc">
              Answer line, three mono facts, expander. The paragraphs stay in the DOM — they just stop being the
              first thing anyone sees.
              <br />
              <br />
              <b>The right-hand slot is not a decorative graphic that varies per page.</b> It is a <i>typed proof
              slot</i>, and every type contains a refusal: something granted next to something denied. An analytics
              chart shows volume over time; an answer needs one decision, once. That mismatch is exactly why the
              earlier version read as filler. Slots: <code>terminal</code> · <code>json</code> ·{" "}
              <code>grant-deny</code> · <code>posture</code>, and it falls back to the band layout when a page has no
              artifact worth showing.
            </p>

            <Spec label="<b>proof</b> · sticky console left, answer scrolls past it — the 9 platform-deep pages">
              <IzAnswerStrip
                variant="proof"
                eyebrow="Zero Trust Network Access"
                question="Your identity"
                emphasis="is"
                questionTail="the network perimeter."
                answer="Zero Trust Network Access replaces the corporate VPN. Instead of putting a device on your network, it opens one encrypted tunnel to one application — after verifying both the person and the machine."
                points={[
                  {
                    title: "No network to move across",
                    body: "A tunnel is scoped to one resource. Two apps means two tunnels, each policy-checked on its own. Compromising a session yields exactly that session.",
                  },
                  {
                    title: "Nothing answers a scan",
                    body: "Gateways run drop-all with Single Packet Authorization. Port scans return nothing at all, so there is no version to fingerprint ahead of patch day.",
                  },
                  {
                    title: "The device is checked, every time",
                    body: "25 posture check types across 144 named rules and 1,500+ OS combinations, evaluated before the tunnel opens and re-evaluated during the session.",
                  },
                  {
                    title: "Every decision is answerable later",
                    body: "202 event types, 11 report types, 7 SIEM export formats. Who reached what, from which device, under which rule.",
                  },
                ]}
                ctas={[
                  { label: "Book a demo", href: "/book-a-demo", primary: true },
                  { label: "See the specs", href: "#spectable" },
                ]}
                long={[
                  "A VPN extends the network out to the user. Once connected, the device is effectively on the corporate network, able to see and probe far more than the one application it needed. That is why a single stolen VPN credential so often becomes a full network breach: the attacker inherits the network, then moves laterally.",
                  "ZTNA inverts this. The network is never extended anywhere. After the user and device are verified, a narrow encrypted tunnel opens from that device to that one resource. The user gets their application; they get nothing else.",
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
            </Spec>

            <Spec label="<b>ledger</b> · grant / deny — no console to build, works on the templated pages">
              <IzAnswerStrip
                variant="ledger"
                question="What is"
                emphasis="SSO"
                questionTail="?"
                answer="Single Sign-On means one verified login, then every application the person is allowed to reach — and nothing else. One place to grant access. One place to revoke it."
                facts={[
                  { n: "1", text: "login, then every entitled app" },
                  { n: "1", text: "action removes a leaver from everything" },
                  { n: "$1", text: "per user per month, as a standalone module" },
                ]}
                long={[
                  "Password sprawl is not a user problem, it is an offboarding problem. Twelve applications with twelve credential stores means twelve places a departure has to be processed, and the one that gets missed is the one that shows up in the audit.",
                ]}
                slot={{
                  kind: "grant-deny",
                  grantHead: "after one login, priya reaches",
                  denyHead: "and still cannot reach",
                  grant: ["Salesforce · role: finance", "ERP front-end · read-only", "Payroll portal · own record", "Jira · finance project"],
                  deny: ["Payments admin console", "Production database", "HR records of other staff", "Anything at all, from an unbound laptop"],
                }}
              />
            </Spec>

            <Spec label="<b>band</b> · zero graphics — the light platform pages, 11 industry pages, education cluster">
              <IzAnswerStrip
                variant="band"
                answer="The regulator no longer asks whether you have an access policy. It asks to see the log of what that policy decided, and when."
                columns={[
                  { n: "202", text: "event types, exported in 7 SIEM formats — access review becomes an export, not a project" },
                  { n: "100%", text: "of privileged and third-party sessions recorded for replay" },
                  { n: "11", text: "built-in report types, built for inspection prep" },
                ]}
                long={[
                  "The legacy answer — VPN concentrators plus jump boxes plus vendor exceptions — fails on exactly the points examiners probe: who precisely can reach the core, how vendor access is supervised, how quickly a leaver loses everything.",
                ]}
              />
            </Spec>
          </section>

          {/* QUESTION / QUIET BAND */}
          <section className="izc-sec" id="questionband">
            <div className="izc-sec-h">
              <span className="n">00av</span> Question band &amp; quiet band — the transition device
            </div>
            <p className="izc-sec-desc">
              Sits between two sections and asks the question the next one answers, which fixes the &ldquo;sections
              just abut&rdquo; problem. The risk is that it reads as a <i>slogan</i>; the fix is to make it a{" "}
              <b>prompt</b> — the reader&apos;s question typed at our console — which is on-brand and gives the
              trailing cursor somewhere real to live.
              <br />
              <br />
              <b>IzQuietBand ships as its own export</b> rather than a variant flag, because the storyboards call for
              it by that name on <b>~50 pages</b> — the single most-used unbuilt component in the whole set. One
              sentence, enormous air, no graphic.
            </p>

            <Spec label="<b>prompt</b> · console line — between mechanism and comparison">
              <IzQuestionBand
                variant="prompt"
                prompt="so what does this replace"
                question="You already have a VPN. What exactly"
                emphasis="stops"
                questionTail="working?"
                stub="nothing — it runs alongside yours through the migration"
                href="#answerstrip"
              />
            </Spec>

            <Spec label="<b>stub</b> · a promise up front, when the next section is long">
              <IzQuestionBand
                variant="stub"
                question="If a laptop fails a posture check"
                emphasis="mid-session"
                questionTail="what happens?"
                stub="12 triggers · 4 automatic responses · every one logged"
              />
            </Spec>

            <Spec label="<b>IzQuietBand</b> · the cheapest break on the site — needed on ~50 pages">
              <IzQuietBand
                kicker="the part auditors ask about"
                statement="Every decision this platform makes, it can also"
                emphasis="prove"
                tail="it made."
              />
            </Spec>
          </section>

          {/* RELATED RAIL */}
          <section className="izc-sec" id="relatedrail">
            <div className="izc-sec-h">
              <span className="n">00aw</span> Related rail — the <code>Related:</code> line, finally built (~42 pages)
            </div>
            <p className="izc-sec-desc">
              This line is already written at the bottom of nearly every Content Master page and has never been
              built, which is a large part of why the site does not feel woven yet.
              <br />
              <br />
              <b>No 01&ndash;04 markers.</b> Related pages are a <i>set</i>, not a sequence, and numbering them would
              assert an order the content does not have. <b>The thumbnail plus the descriptor line is what earns the
              click</b> — a bare list of page names is a sitemap, not a rail.
              <br />
              <br />
              <b>Thumbnails:</b> pass <code>thumb</code> with a path under <code>/public</code>, by convention{" "}
              <code>/related/&lt;page-slug&gt;.webp</code> at <b>16:9, ~640&times;360</b>. The well is a fixed 16:9
              box with <code>object-fit: cover</code>, so mixed crops still line up across a rail.
              <br />
              <br />
              <b>Until that art exists — and if a path ever 404s — each card draws a vector motif instead</b>, picked
              from <code>kind</code> (platform / solution / resource / industry). Deliberately drawn line art rather
              than a grey rectangle: a rail of placeholders still reads as designed, and a bad path degrades to a
              real graphic instead of a broken-image box. All four motifs are showing below.
            </p>

            <Spec label="<b>cards</b> · thumbnail per page — placeholder art until the real thumbnails land">
              <IzRelatedRail
                variant="cards"
                links={[
                  { kind: "platform", title: "ZTAA", href: "/zero-trust-application-access", desc: "The application-layer sibling. For anything a browser can reach." },
                  { kind: "solution", title: "VPN Alternative", href: "/vpn-alternative", desc: "What changes in week 1, week 4, week 12." },
                  { kind: "resource", title: "What is Zero Trust", href: "/what-is-zero-trust", desc: "The architecture NIST SP 800-207 describes, plainly." },
                  { kind: "industry", title: "Banking & BFSI", href: "/industries/banking", desc: "What an RBI examiner asks for, and where the log comes from." },
                ]}
              />
            </Spec>

            <Spec label="<b>cards</b> · with real images — card 1 has a valid `thumb`, card 2 points at a missing file and degrades to its motif">
              <IzRelatedRail
                variant="cards"
                label="thumb behaviour"
                links={[
                  { kind: "platform", title: "Real thumbnail", href: "#relatedrail", thumb: "/user_device_authentication_d.webp", desc: "A supplied `thumb` renders as an image, cropped to the 16:9 well." },
                  { kind: "solution", title: "Missing file", href: "#relatedrail", thumb: "/related/does-not-exist.webp", desc: "A 404 falls back to the vector motif — never a broken-image box." },
                  { kind: "resource", title: "No thumb given", href: "#relatedrail", desc: "Omitting `thumb` uses the motif directly." },
                  { kind: "industry", title: "Fourth motif", href: "#relatedrail", desc: "Each kind draws a different diagram." },
                ]}
              />
            </Spec>

            <Spec label="<b>clusters</b> · groups by cluster, so the rail teaches site structure while it links">
              <IzRelatedRail
                variant="clusters"
                clusters={[
                  {
                    label: "platform",
                    links: [
                      { title: "Privileged Access", href: "/solutions/privileged-access-management" },
                      { title: "Device Binding", href: "/zero-trust-features/device-binding" },
                      { title: "Multi-Factor Auth", href: "/multifactor-authentication" },
                    ],
                  },
                  {
                    label: "solutions",
                    links: [
                      { title: "Secure Remote Access", href: "/secure-remote-access" },
                      { title: "Clientless Access", href: "/clientless-remote-access" },
                      { title: "DevOps Access", href: "/secure-devops-access" },
                    ],
                  },
                  {
                    label: "trust",
                    links: [
                      { title: "Why InstaSafe", href: "/why-instasafe-zero-trust" },
                      { title: "Case Studies", href: "/case-studies" },
                      { title: "Pricing", href: "/instasafe-zero-trust-pricing" },
                    ],
                  },
                ]}
              />
            </Spec>
          </section>

          {/* PAGE KIT — trust bar, stat ribbon, problem cards */}
          <section className="izc-sec" id="pagekit">
            <div className="izc-sec-h">
              <span className="n">00ax–00az</span> Page kit — trust bar · stat ribbon · problem cards
            </div>
            <p className="izc-sec-desc">
              The furniture that repeats on nearly every page, built so a page can drop them in with content and
              nothing else.
              <br />
              <br />
              <b>IzTrustBar</b> replaces 00ap IzLogoGrid in the under-hero slot. IzLogoGrid is a wide ecosystem
              lattice built to be a section of its own; used as a trust bar it eats far more vertical space than a
              strip under a hero can justify. This is the compact form of the same claim — proof numbers on one rule,
              sectors and the review badges on the next, with <b>00ab RatingBar folded in</b>. Its wordmark row is
              sectors, not customers — the customer names now live in <b>IzLogoMarquee</b>.
              <br />
              <br />
              <b>IzLogoMarquee</b> is the real logo art, and it sits directly under the hero on every page. Nineteen
              brand SVGs in nineteen brand colours would fight the paper palette and the one-orange rule, so they are
              driven monochrome by filter rather than by editing the art: greyscale on paper, greyscale + invert (i.e.
              white) on dark. <b>Invert, not a flat silhouette</b> — several of these are knockouts, white type sitting
              inside a coloured plate, and a silhouette fills the plate solid and swallows the wordmark. Two identical
              rows translate exactly -50%, so the loop seam never shows; hovering pauses the scroll and lifts every
              logo to full weight, and reduced motion drops the animation for a static centred wall.
              <br />
              <br />
              <b>IzStatRibbon</b> is the standing replacement for 00q FilterStream in the stat-strip and interstitial
              slots — <i>the standard treatment, not a per-page decision</i>. FilterStream&apos;s drifting rule-chips
              are section-sized; in a thin interstitial they read as decoration that happens to move. This borrows the{" "}
              <b>00am progress-rail grammar</b> instead — indexed counter, mono value, hairline between cells — so an
              interstitial speaks the language the stepper already taught, and keeps the storyboard&apos;s trailing
              underscore.
              <br />
              <br />
              <b>IzProblemCards</b> is the &ldquo;problem, concretely&rdquo; layout: a raised panel lifted over a
              contrasting band, centred headline, three icon-tile columns. <b>The overlap is the trick</b> — it makes
              the block read as a card set <i>on</i> the page rather than one more full-width stripe, which is what
              stops a long page flattening. No CTA per column: these are three statements of one problem, not three
              offers.
            </p>

            <Spec label="<b>IzLogoMarquee</b> · under-hero customer strip, real logo art, monochrome per theme">
              <IzLogoMarquee />
            </Spec>

            <Spec label="<b>IzTrustBar</b> · under-hero proof strip, RatingBar folded in">
              <IzTrustBar />
            </Spec>

            <Spec label="<b>IzStatRibbon</b> · the standard data ribbon — ZTNA interstitial content">
              <IzStatRibbon
                items={[
                  { value: "144", label: "named rules" },
                  { value: "25", label: "device check types" },
                  { value: "202", label: "event log types" },
                  { value: "7", label: "SIEM formats" },
                ]}
              />
            </Spec>

            <Spec label="<b>IzProblemCards</b> · the ZTNA problem, concretely">
              <IzProblemCards
                heading="The problem is not the login."
                emphasis="It is everything after it."
                cards={[
                  {
                    icon: ArrowsOutCardinal,
                    title: "Lateral movement",
                    body: "One phished credential on a VPN is a foothold on the whole segment. Attackers pivot from an unimportant entry point to crown-jewel systems. ZTNA removes the network between them.",
                  },
                  {
                    icon: BroadcastIcon,
                    title: "Visible attack surface",
                    body: "Every internet-facing IP is scanned within minutes of going live. VPN concentrators are among the most exploited devices on the internet — each CVE is a race against your patch window.",
                  },
                  {
                    icon: CurrencyDollar,
                    title: "Scale and cost",
                    body: "Concentrator hardware sized for peak load, licensed per box, refreshed every few years. Remote workforce doubled? Buy more boxes. ZTNA is software: scaling is a configuration change.",
                  },
                ]}
              />
            </Spec>
          </section>

          {/* TUNNEL CARDS */}
          <section className="izc-sec" id="tunnelcards">
            <div className="izc-sec-h">
              <span className="n">00ba</span> Per-session tunnels — three hover-played cases
            </div>
            <p className="izc-sec-desc">
              &ldquo;Each session gets its own tunnel&rdquo; is easy to nod along to without understanding, so each
              card proves a different <i>consequence</i> of it instead of restating it: one app is one live tunnel;
              two apps are two tunnels on visibly different clocks; and when one is severed the other does not react
              at all. <b>Case 3 is the argument</b> — the second tunnel&apos;s animation shares no timing with the
              first, which is what &ldquo;isolation&rdquo; actually means.
              <br />
              <br />
              <b>Motion contract, same as 00an:</b> every animation is declared <i>inside</i> <code>.is-live</code>,
              never outside it with <code>animation-play-state: paused</code>. An animation that only exists while
              hovered is <b>removed</b> on leave, so the card snaps to its finished state and the next hover replays
              from frame zero — pausing would freeze each card wherever the cursor left it. Every element&apos;s
              un-animated state is already its end state, which makes the touch and reduced-motion stills correct for
              free. Hover is read through <code>useHoverIndex</code>, never React&apos;s non-bubbling
              pointerenter/leave.
            </p>
            <IzTunnelCards />
          </section>

          {/* HERO ARCHETYPES */}
          <section className="izc-sec" id="heroes">
            <div className="izc-sec-h">
              <span className="n">00ad</span> Hero archetypes (five shapes, one type contract)
            </div>
            <p className="izc-sec-desc">
              Five structurally different heroes, from the fingerprint.com audit (§A.5): they run five shapes across
              their pages, and that — not different copy in the same box — is what stops consecutive pages feeling
              like one template. All five share one <code>.izh-head</code> (kicker / title / sub / CTAs / note), so
              type and button styling are edited once. Every one is static per the interaction-placement doctrine:
              nothing here responds to a cursor. Alternate <b>Split</b> and <b>SplitFlip</b> down a page family and
              no two pages share a silhouette.
            </p>

            <Spec label="<b>HeroSplit</b> · text left / visual right — use-case and feature pages">
              <HeroSplit
                kicker="Zero Trust access"
                title={
                  <>
                    Your apps. Your people. <mark>One gate.</mark>
                  </>
                }
                sub="Every request is checked against identity, device and policy before an app is ever reachable. No open network, no standing access."
                primary={{ label: "Book a demo", href: "/book-a-demo" }}
                secondary={{ label: "See the platform", href: "/platform" }}
                note="SOC 2 · ISO 27001 · DPDP-ready"
                visual={illustrationSample}
              />
            </Spec>

            <Spec label="<b>HeroSplitFlip</b> · visual left / text right — and the visual leads on phones">
              <HeroSplitFlip
                kicker="Device trust"
                title={
                  <>
                    A password alone <mark>gets nowhere.</mark>
                  </>
                }
                sub="Access is pinned to enrolled hardware and re-checked on every request, so stolen credentials stop at the door."
                primary={{ label: "Talk to sales", href: "/contact" }}
                visual={illustrationCity}
              />
            </Spec>

            <Spec label="<b>HeroCentered</b> · text only, deliberately the shortest hero — pillar and pricing pages">
              <HeroCentered
                kicker="Platform"
                title={
                  <>
                    One policy engine for <mark>every</mark> way people work.
                  </>
                }
                sub="Office, home, contractor laptop, unmanaged phone. Same rules, same audit trail, one place to change them."
                primary={{ label: "Start free trial", href: "/free-trial" }}
                secondary={{ label: "Read the docs", href: "/docs" }}
              />
            </Spec>

            <Spec label="<b>HeroConsole</b> · centred text with a console beneath — technical product pages">
              <HeroConsole
                kicker="Access console"
                title="Watch every decision as it happens."
                sub="Allow, deny, step-up — each one logged, each one explainable."
                primary={{ label: "Book a demo", href: "/book-a-demo" }}
                console={<IzConsole view="dashboard" />}
                caption="Live view · sample data"
              />
            </Spec>

            <Spec label="<b>HeroImmersive</b> · full-bleed layered scene, scroll-linked — homepage only, once">
              <HeroImmersive
                kicker="InstaSafe ZTNA"
                title={
                  <>
                    Get in from anywhere. <mark>Nothing else does.</mark>
                  </>
                }
                sub="One verified path from your people to your apps — and no path at all for everything else."
                primary={{ label: "Book a demo", href: "/book-a-demo" }}
                secondary={{ label: "How it works", href: "/platform" }}
                near={illustrationCity}
              />
            </Spec>
          </section>

          {/* CONTROL SURFACE — signal grid */}
          <section className="izc-sec" id="signalgrid">
            <div className="izc-sec-h">
              <span className="n">00ac</span> Control surface (irregular capability grid + console)
            </div>
            <p className="izc-sec-desc">
              24 enforcement controls scattered across a 10×7 grid with 21 <b>invisible spacer</b> cells, and an inline
              console that shows what InstaSafe returns for whichever one is selected. Ported from fingerprint.com&apos;s
              Smart Signals scene (§A.2/§C.1) with the polarity inverted — they sell detection, so their two states are
              detected/not-detected; we sell control, so ours are enforced/unenforced, same payload shape with one field
              changed. Coordinates are <b>data, not media queries</b>: each tile carries its cell as CSS custom
              properties (<code>--gc/--gr</code>, <code>--gc-md/--gr-md</code>, <code>--sm-span</code>) so one DOM
              re-scatters at 10 / 6 / 4 columns. Autoplay walks the grid until the visitor takes over, then stops for
              good.
            </p>

            <Spec label="<b>IzSignalGrid</b> · resize the window to watch the same tiles re-scatter">
              <IzSignalGrid />
            </Spec>
          </section>

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

          {/* ILLUSTRATIONS */}
          <section className="izc-sec" id="illustrations">
            <div className="izc-sec-h">
              <span className="n">00ac</span> Illustrations (pipeline · theme-aware line art)
            </div>
            <p className="izc-sec-desc">
              Theme-aware illustration pipeline. Hand-recreated <b>SVGs</b> are inlined by{" "}
              <code>&lt;Illustration&gt;</code> (a server component) so their line work draws from{" "}
              <code>var(--il-ink)</code>, the single orange focal element from <code>var(--il-accent)</code>,
              mono chip text from <code>var(--il-chip)</code> and faint scaffolding from{" "}
              <code>var(--il-faint)</code> — all scoped under <code>.iz</code>, so they recolor when you
              flip the theme switch above, no JS. Raster illustrations use{" "}
              <code>&lt;ThemedImage base="img-054_two-corridors"&gt;</code>, which renders a{" "}
              <code>_dark.png</code>/<code>_paper.png</code> pair and lets CSS show the right one per theme.
              Conventions live in <code>public/illustrations/README.md</code>.
            </p>
            <Spec label="<b>Pipeline is live, catalogue is not</b> — awaiting artwork" className="center">
              <div className="izc-illus-wrap">
                <p className="izc-illus-cap">
                  The two hand-vectorised SVGs that used to sit here (IMG-017 Governed City, IMG-089 ledger) were
                  deleted — they didn&apos;t turn out well. The 89-image catalogue is a separate, later job.
                  <br />
                  <br />
                  Both code paths still work and are ready for assets: <code>&lt;Illustration&gt;</code> inlines an
                  SVG so <code>--il-*</code> tokens recolor it with the theme toggle, and{" "}
                  <code>&lt;ThemedImage base="…"&gt;</code> renders a <code>_dark.png</code>/<code>_paper.png</code>{" "}
                  pair with a pure-CSS swap. Drop files into <code>public/illustrations</code> and wire them up —
                  nothing else needs to change. Conventions in{" "}
                  <code>public/illustrations/README.md</code>.
                  <br />
                  <br />
                  Meanwhile the draw-in outline animation is not tied to that catalogue: it runs on{" "}
                  <b>any SVG path</b>, so it belongs to the component illustrations we build here — the flow
                  diagrams, mega-menu icons and console scenes.
                </p>
              </div>
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

            <Spec label="<b>system</b> · current accent (updates with the switcher above)">
              <div className="izc-swatches">
                <div className="izc-sw">
                  <div className="chip" style={{ background: "var(--accent)" }} />
                  <div className="meta">
                    <div className="nm">--accent · {system}</div>
                    <div className="vl" style={{ color: "var(--accent)" }}>Aa — accent text sample</div>
                  </div>
                </div>
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
