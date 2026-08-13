"use client";

import { useEffect, useRef, useState } from "react";
import { IzAccessEngine } from "./IzAccessEngine";
import { IzAccessFlow } from "./IzAccessFlow";
import "./izaccessflow.css";
import { useSectionReveals, useParallax } from "./useIzMotion";
import { IzNav } from "./IzNav";
import { IzFinalCta } from "./IzFinalCta";
import { IzFooterGrid } from "./IzFooterGrid";
import { IzHeroPortal } from "./IzHeroPortal";
import "./iz-hero-portal.css";
import { IzLogoMarquee } from "./IzLogoMarquee";
import "./izlogomarquee.css";
import { ConsoleRow } from "./ConsoleRow";
import "./consolerow.css";
import { IzAppWindow } from "./IzAppWindow";
import "./izappwindow.css";
import { IzUserPortal } from "./IzUserPortal";
import "./izuserportal.css";
import "./izavatar.css";
import { IzMfaHub } from "./IzMfaHub";
/* order matters: the MFA hub runs on the FeatureHub chassis and only
   ships the deltas, so featurehub.css has to land first */
import "./featurehub.css";
import "./izmfahub.css";
import { IzIntegrationGrid } from "./IzIntegrationGrid";
import { IzLogoGrid } from "@/components/izpages/pro/IzLogoGrid";
import "./izintegrationgrid.css";
import { IzReviewWall } from "./IzReviewWall";
import "./izreviewwall.css";
import { IzControlSurface } from "./IzControlSurface";
/* order matters: the control surface runs on the 00ac chassis and only
   ships the deltas, so signalgrid.css has to land first */
import "./signalgrid.css";
import "./izcontrolsurface.css";
import "./izminidesktop.css";

/* ---- 2026-08-13: the five blocks the user placed on this page ----
   00g ProblemSolution · 00s UserJourney · 00c UnificationSlider ·
   00aj IzDevBand · 00h QaTriptych. Placement rationale is on each
   section below. */
import { BookOpen, CalendarCheck, Certificate, Files } from "@phosphor-icons/react";
import { ProblemSolution } from "./ProblemSolution";
import "./problemsolution.css";
import { UserJourney } from "./UserJourney";
import "./userjourney.css";
import { UnificationSlider } from "./UnificationSlider";
import "./unification.css";
import { IzDevBand } from "./IzDevBand";
/* iz-backdrops.css MUST land for IzDevBand, and the reason is a real
   trap. `.iz-inverted` is declared in TWO files and needs both:
   iz-system.css §7 flips the token VALUES (--bg, --tx, --line …), while
   iz-backdrops.css §5 is what actually PAINTS them
   (`background: var(--bg); color: var(--tx)`). This page imported only
   the first, so the band got the dark token values and then never used
   them — it rendered transparent, inheriting paper-coloured ink, which
   is exactly the "breaking in white" the user saw. Token flip without
   the paint rule is a no-op. */
import "./iz-backdrops.css";
import "./izdevband.css";
import { QaTriptych } from "./QaTriptych";
import "./qatriptych.css";

/* ============================================================
   InstaSafe ZTNA — "Balanced" homepage, new design language.
   Self-contained: own theme (paper default / dark toggle, localStorage is-theme),
   own nav + footer, scoped under .iz. Does not touch the rest
   of the site. Product name is "InstaSafe ZTNA" (never i365).
   ============================================================ */

type Theme = "dark" | "paper";
type DesignSystem = "orange" | "teal" | "violet" | "blue";

/* scroll-reveal moved to useIzMotion.ts (GSAP ScrollTrigger.batch,
   staggered; CSS `.iz-reveal` + reduced-motion block is the fallback). */

/* ---------- count-up ---------- */
function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          const step = Math.max(1, Math.round(to / 40));
          const t = setInterval(() => {
            setN((c) => {
              if (c + step >= to) {
                clearInterval(t);
                return to;
              }
              return c + step;
            });
          }, 22);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- data ---------- */
const PILLARS = [
  { name: "Get in without a VPN", desc: "Your team reaches work apps directly and safely — the network stays invisible to outsiders.", stat: ["7", "kinds of app"] },
  { name: "One identity for everything", desc: "Use the accounts you already have, with InstaSafe deciding who's allowed where.", stat: ["8", "ways to sign in"] },
  { name: "Stronger sign-in", desc: "Add a quick second check, so a stolen password on its own gets nobody in.", stat: ["6", "extra methods"] },
  { name: "Only safe devices", desc: "Every device is checked for safety before it's allowed anywhere near your apps.", stat: ["25", "device checks"] },
  { name: "Recorded for safety", desc: "Sensitive sessions are recorded, so there's always a clear, trustworthy trail.", stat: ["202", "things logged"] },
  { name: "See everything", desc: "Every login and every block shows up in the security tools you already use.", stat: ["7", "report formats"] },
];

/* NAMED COMPETITORS REMOVED (user call, 2026-08-13).

   This was a three-way toggle: "vs VPN" / "vs Zscaler" / "vs Fortinet".
   Naming a rival on the homepage puts their brand in front of a visitor
   who may not have been considering them, and every claim in those two
   columns is a claim we have to keep true about someone else's product
   as it changes. Both tabs are gone.

   The toggle went with them. One tab labelled "vs VPN" is not a choice,
   it is a button that does nothing — so the table simply IS the VPN
   comparison now, which is the one the whole page has been building
   toward anyway. Head-to-head competitor content belongs on the
   comparison pages, where it can be dated and sourced. */
const COMPARE: [string, string, string][] = [
  ["What they can reach", "Your whole network", "Just the one app they need"],
  ["Visible to attackers", "Yes — ports are open", "No — nothing to find"],
  ["If one login is stolen", "They can roam freely", "They're stuck at one app"],
  ["Speed", "Slower — traffic detours", "Direct, so it's fast"],
];

/* The three testimonials that used to live here moved into
   IzReviewWall, which owns every quote on the page now. Two copies of
   the same testimonial in two files is how a site ends up quoting the
   same person two different ways. */

/* ---------- icons (inline, currentColor) ---------- */
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function Home2() {
  const [theme, setTheme] = useState<Theme>("paper");
  const [system, setSystem] = useState<DesignSystem>("orange");
  const [visitor, setVisitor] = useState<[string, string][]>([]);
  const posturePanelRef = useRef<HTMLDivElement>(null);
  useSectionReveals();
  useParallax(posturePanelRef);

  // theme bootstrap (scoped to this page; key = is-theme)
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

  // design-system bootstrap — no UI here, just inherits whatever the
  // Components Lab switcher last set (key = is-system), so this page stays clean.
  useEffect(() => {
    try {
      const s = localStorage.getItem("is-system") as DesignSystem | null;
      if (s === "orange" || s === "teal" || s === "violet" || s === "blue") setSystem(s);
    } catch {}
  }, []);

  // live visitor read — local only, no network
  useEffect(() => {
    const ua = navigator.userAgent;
    const browser = /edg/i.test(ua) ? "Edge" : /chrome/i.test(ua) ? "Chrome" : /firefox/i.test(ua) ? "Firefox" : /safari/i.test(ua) ? "Safari" : "Unknown";
    const os = /windows/i.test(ua) ? "Windows" : /mac/i.test(ua) ? "macOS" : /linux/i.test(ua) ? "Linux" : /android/i.test(ua) ? "Android" : /iphone|ipad/i.test(ua) ? "iOS" : "Unknown";
    const device = /mobile|android|iphone/i.test(ua) ? "Mobile" : "Desktop";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "—";
    setVisitor([
      ["operating system", os],
      ["browser", browser],
      ["device type", device],
      ["timezone", tz],
      ["language", navigator.language || "—"],
      ["screen", `${window.screen.width}×${window.screen.height}`],
    ]);
  }, []);

  return (
    <div className="iz" data-theme={theme} data-system={system}>
      {/* continuous outer rails, unbroken down the whole page */}
      <div className="iz-rails" aria-hidden="true" />
      {/* ---------------- NAV ---------------- */}
      <IzNav theme={theme} onThemeChange={setT} overlay />

      {/* ---------------- HERO ---------------- */}
      <IzHeroPortal theme={theme} />

      {/* ---------------- CUSTOMER LOGOS ---------------- */}
      <IzLogoMarquee />

      {/* ---------------- THE PROBLEM (00g) ----------------
          Directly after the hero, per the user's placement: the page has
          just made a claim, and the fastest way to earn the next scroll
          is to name the thing the reader already lives with. The
          component carries its own two h3s (the hand-wired half and the
          automatic half), so this section supplies only the h2 above
          them — heading it twice would flatten the split. */}
      <section className="iz-section" id="problem">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">Before and after</span>
            <h2 className="iz-h2">
              Access built by hand, or <em>decided for you</em>.
            </h2>
          </div>
          <div className="iz-reveal iz-block-top">
            <ProblemSolution />
          </div>
        </div>
      </section>

      {/* ---------------- CAPABILITIES DECK ---------------- */}
      {/* rails: this block is wide and benefits from column edges */}
      {/* The deck carries its own head — a second headblock above it
          would title the same thing twice. */}
      <IzAccessEngine />

      {/* ---------------- PLATFORM ROWS ---------------- */}
      {/* no rails — the rows already draw their own horizontals */}
      <section className="iz-section alt iz-irail" style={{ ["--ir-b" as string]: "62%" }}>
        <div className="iz-wrap iz-stitch" style={{ paddingTop: 12, paddingBottom: 12 }}>
          <div className="iz-reveal">
            <span className="iz-ey">All in one place</span>
            <h2 className="iz-h2">
              Everything your team needs to get in safely — <em>in one place</em>.
            </h2>
          </div>
          <div className="iz-rows iz-reveal">
            {PILLARS.map((p, i) => (
              <a key={p.name} href="/platform" className="iz-row">
                <span className="iz-row-i">{String(i + 1).padStart(2, "0")}</span>
                <span className="iz-row-name">{p.name}</span>
                <span className="iz-row-desc">{p.desc}</span>
                <span className="iz-row-stat">
                  <b>{p.stat[0]}</b> {p.stat[1]}
                </span>
              </a>
            ))}
          </div>
          <div className="iz-reveal iz-block-top">
            <div className="iz-statband">
              {[
                /* Platform facts, not customer or price facts: these are
                   things the product DOES, and every one is checkable in
                   the console. Counts of customers, devices and money are
                   deliberately absent site-wide. */
                { n: <CountUp to={25} />, l: "device checks before a tunnel opens" },
                { n: <CountUp to={144} />, l: "named policy rules" },
                { n: <CountUp to={202} />, l: "event types logged" },
                { n: <>0</>, l: "ports answering a scan" },
              ].map((s, i) => (
                <div key={i} className="iz-statcell">
                  <div className="iz-statnum">{s.n}</div>
                  <div className="iz-statlbl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS (plain ⇄ tech flow) ---------------- */}
      {/* one rail + a dashed top rule — no field texture */}
      {/* One full viewport: heading, diagram and steps all in frame, so the
          walkthrough never asks you to scroll away from what it describes. */}
      <section className="iz-section iz-framed izf-section" id="how" style={{ ["--fr-t" as string]: "7%", ["--fr-b" as string]: "7%" }}>
        <div className="iz-wrap">
          <div className="iz-reveal izf-head">
            <span className="iz-ey dim">How it works</span>
            <h2 className="iz-h2">
              Watch one request <em>earn its way in</em>.
            </h2>
          </div>
          <div className="iz-reveal">
            <IzAccessFlow />
          </div>
        </div>
      </section>

      {/* ---------------- ZTNA ---------------- */}
      {/* No internal rail: a console row is text against a large solid
          object, so a vertical rail either crosses the copy or hides
          behind the window. The row's own fact rules carry the structure. */}
      <section className="iz-section">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <ConsoleRow
              eyebrow="Zero Trust Network Access"
              title={<>Access at the IP layer, <em>for the applications a browser can&apos;t reach</em>.</>}
              body={[
                "Thick-client ERP front-ends. Legacy client-server systems. Custom TCP and UDP protocols. Engineering and design tools. These never worked properly behind a web proxy, so they stayed on the VPN — and kept the VPN alive.",
                "InstaSafe ZTNA carries them. The gateway runs drop-all with single packet authorization, so it answers nothing until a verified request arrives. Then it opens one tunnel to one resource.",
              ]}
              facts={[
                ["Layer", "IP (L3/L4)"],
                ["Gateway", "drop-all + single packet authorization"],
                ["Tunnel", "per session, per resource"],
              ]}
              ctaLabel="Explore ZTNA"
              ctaHref="/zero-trust-network-access"
            >
              <IzAppWindow compact />
            </ConsoleRow>
          </div>
        </div>
      </section>

      {/* ---------------- ZTAA ---------------- */}
      {/* Reversed on purpose: the admin console sat right in the ZTNA
          row, so putting the end-user portal left makes the change of
          seat legible before a word is read. */}
      <section className="iz-section alt">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <ConsoleRow
              reverse
              eyebrow="Zero Trust Application Access"
              title={<>The person signing in gets <em>a page of applications, not a network</em>.</>}
              body={[
                "Their group decides what appears. Nothing else is listed, nothing else is reachable, and there is no network to wander around behind the list.",
                "Same grant model for a SaaS tenant, an internal web app or a database — one login, then only the resources that login is entitled to. Switch person below and watch the entire list change.",
              ]}
              facts={[
                ["Portal", "web · no client needed"],
                ["Listing", "entitlement-driven, per group"],
                ["Reach", "only what is listed, nothing beside it"],
              ]}
              ctaLabel="Explore ZTAA"
              ctaHref="/platform"
            >
              <IzUserPortal />
            </ConsoleRow>
          </div>
        </div>
      </section>

      {/* ---------------- MFA ---------------- */}
      {/* rail lives inside the component, bounded to the head block */}
      <section className="iz-section">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <IzMfaHub />
          </div>
        </div>
      </section>

      {/* ---------------- CONTROL SURFACE ---------------- */}
      {/* Contextual access + endpoint control, one section. Sits after
          MFA because it presumes the session exists — it answers what
          happens once someone is through the door. */}
      <section className="iz-section alt">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <IzControlSurface />
          </div>
        </div>
      </section>

      {/* ---------------- A DAY OF ACCESS (00s) ----------------
          The flagship, and deliberately NOT next to IzAccessFlow at
          "How it works" (user call: keep both, separate them). The two
          answer different questions and would read as one diagram twice
          if they sat together — IzAccessFlow traces ONE request through
          the checks, up at fold 4; this traces ONE PERSON through a
          working day, after the four products have been introduced, so
          the reader already knows what each stop is. Roughly two-thirds
          down: far enough that nothing about it echoes the earlier
          diagram. */}
      <section className="iz-section" id="journey">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">A day on it</span>
            <h2 className="iz-h2">
              What this feels like <em>for your people</em>.
            </h2>
          </div>
          <div className="iz-reveal iz-block-top">
            <UserJourney />
          </div>
        </div>
      </section>

      {/* ---------------- INTEGRATIONS ---------------- */}
      {/* The stack it plugs into — identity, endpoint, cloud. Placed
          before the SSO wall on purpose: this answers "does it fit what
          we run", the wall answers "which apps does it sign us into".
          IzLogoGrid owns its own <section> and rails, so it is dropped
          in bare rather than wrapped like the rows above it. */}
      <div className="iz-reveal">
        <IzLogoGrid />
      </div>

      {/* ---------------- SSO ---------------- */}
      <section className="iz-section">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <IzIntegrationGrid />
          </div>
        </div>
      </section>

      {/* ---------------- CONSOLIDATION (00c) ----------------
          Placed immediately BEFORE the VPN comparison, because the two
          arguments are a pair and this one has to land first: the slider
          shows five tools collapsing into one console, then the
          comparison shows what happens to the one that is left. Reversed,
          the reader meets "InstaSafe vs VPN" before knowing InstaSafe is
          more than a VPN. */}
      <section className="iz-section" id="consolidate">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">One console</span>
            <h2 className="iz-h2">
              Five tools in, <em>one way in</em> out.
            </h2>
          </div>
          <div className="iz-reveal iz-block-top">
            <UnificationSlider />
          </div>
        </div>
      </section>

      {/* ---------------- COMPARISON ---------------- */}
      <section className="iz-section alt iz-irail" style={{ ["--ir-a" as string]: "30%", ["--ir-b" as string]: "70%" }}>
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">The short version</span>
            <h2 className="iz-h2">
              The difference, <em>line by line</em>.
            </h2>
          </div>
          <div className="iz-reveal">
            <table className="iz-cmp">
              <thead>
                <tr>
                  <th>What matters</th>
                  <th>A traditional VPN</th>
                  <th className="ours">InstaSafe</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1] === "no" ? <span className="no">✗ no</span> : row[1]}</td>
                    <td className="ours">{row[2] === "yes" ? <span className="yes">✓ yes</span> : row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="iz-hero-cta" style={{ marginTop: 24 }}>
              <a href="/book-a-demo" className="iz-btn iz-btn-pri iz-btn-sm">
                Book a demo <Arrow />
              </a>
              <a href="/why-instasafe-zero-trust" className="iz-btn iz-btn-ghost iz-btn-sm">
                Why teams switch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PROOF BAND (00aj) ----------------
          The dark band is a TEXTURE break as much as an argument: the
          page has run light-alt-light-alt for eleven sections and needs
          one hard change of ground before the closing run.

          NUMBERS: the component ships illustrative defaults and its own
          header says to wire real ones before it goes on a page. These
          are real, and deliberately ones this page has NOT already used
          — 25 / 144 / 202 / 0 are spent up in the stat band, so
          restating them here would read as the page having four facts.
          The sparkline is still a shape, not data, which is what the
          `note` line is for; leave it until a real series is wired.

          LINKS: all four resolve. The component's defaults point at
          /docs/*, which does not exist on this site. */}
      <IzDevBand
        kicker="For the people who get audited"
        title={
          <>
            Every decision is <mark>written down</mark>,
            <br />
            not taken on trust
          </>
        }
        sub="Who got in, from which device, to what, and when — recorded as it happens and exportable to whatever you already run. Nothing about an access decision is ours to keep."
        links={[
          { label: "See the whole platform", href: "/platform", Icon: BookOpen },
          { label: "How device checks work", href: "/zero-trust-features/device-posture-check", Icon: Certificate },
          { label: "Guides and case studies", href: "/resource-center", Icon: Files },
          { label: "Book a demo", href: "/book-a-demo", Icon: CalendarCheck },
        ]}
        stats={[
          { value: "7", label: "ways to export your logs" },
          { value: "11", label: "reports out of the box" },
        ]}
      />

      {/* ---------------- LIVE VISITOR ---------------- */}
      <section className="iz-section iz-irail" style={{ ["--ir-a" as string]: "55%" }}>
        <div className="iz-wrap iz-hero-grid">
          <div className="iz-reveal">
            <span className="iz-ey">Try it right now</span>
            <h2 className="iz-h2">
              We can already tell this much <em>about your device</em>.
            </h2>
            <p className="iz-lead">
              This is read right here in your own browser — the same kind of things InstaSafe checks about a device before
              it lets anyone in. Nothing here is sent anywhere.
            </p>
            <a href="/zero-trust-features/device-posture-check" className="iz-btn iz-btn-ghost" style={{ marginTop: 24 }}>
              See device checks <Arrow />
            </a>
          </div>
          <div className="iz-reveal" data-dir="right">
            <div className="iz-panel" ref={posturePanelRef}>
              <div className="iz-pbar">
                <span className="iz-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="iz-pbar-title">your device, right now</span>
                <span className="iz-live">
                  <i />
                  LOCAL
                </span>
              </div>
              <div className="iz-pbody">
                <div className="iz-visitor-grid">
                  {visitor.map(([l, v]) => (
                    <div key={l} className="iz-vrow">
                      <span className="l">{l}</span>
                      <span className="v">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="iz-verdict">
                  <i />
                  read in your browser · checked against the rules
                </div>
                <div className="iz-disclaim">all done on your device · nothing is sent anywhere.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="iz-section alt">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">In production</span>
            <h2 className="iz-h2">
              Run by the teams who <em>can&apos;t afford a breach</em>.
            </h2>
          </div>
          <div className="iz-reveal iz-block-top">
            <IzReviewWall />
          </div>
        </div>
      </section>

      {/* ---------------- CLOSING Q&A (00h) ----------------
          Last content block before the CTA, per the user's placement.
          It earns that slot because it is the only block on the page
          that answers the objection a reader is actually carrying by
          now, and answering it is what makes the CTA under it clickable
          rather than a wall.

          No section heading: QaTriptych carries its own h2. */}
      <section className="iz-section" id="questions">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <QaTriptych />
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <IzFinalCta />

      {/* ---------------- FOOTER ---------------- */}
      <IzFooterGrid />
    </div>
  );
}
