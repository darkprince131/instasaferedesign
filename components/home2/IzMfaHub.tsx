"use client";

import { useEffect, useState } from "react";
import {
  Desktop, HardDrives, Lock, Browsers,
  BellRinging, ClockCountdown, Key, Fingerprint, Scan,
  EnvelopeSimple, Certificate, DeviceMobile, ListNumbers,
  CheckCircle, XCircle, ShieldWarning,
  MapPin, SlidersHorizontal,
  Circle, Square, SquaresFour, DotsNine, Cube, Hash,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";

/* ============================================================
   05 · IzMfaHub — MFA on the 00i FeatureHub (C3) chassis.

   Same component, different subject: one big stage that swaps with
   the category tab underneath, tabs carrying the left-border
   progress bar. It reuses `.fh-*` wholesale rather than restating
   it — if FeatureHub's constellation is restyled, this restyles
   with it, which is the entire point of having a chassis.

   The three tabs are WHERE → WHICH → WHEN, and each takes the
   stage form its content wants:
     where  → fh-stack, four surface cards
     which  → fh-hub, the constellation, InstaSafe core in the middle
     when   → fh-log, the decision panel

   Only the deltas live in izmfahub.css: a per-tab caption, a
   fourth stack row, the logo core, and the two-column example row.
   ============================================================ */

const TAB_MS = 6000;

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- tab 0 · where it applies (fh-stack) ---------- */
const SURFACES: { icon: Icon; name: string; sub: string; stat: string; pill: string }[] = [
  { icon: Desktop, name: "Desktop login", sub: "at the OS prompt, before anything opens", stat: "Windows · macOS", pill: "enforced" },
  { icon: HardDrives, name: "Network gear", sub: "switches · routers · firewalls · jump hosts", stat: "RADIUS", pill: "enforced" },
  { icon: Lock, name: "Legacy VPN", sub: "kept covered during the migration off it", stat: "RADIUS", pill: "enforced" },
  { icon: Browsers, name: "Applications", sub: "web · SaaS · internal", stat: "via SSO", pill: "enforced" },
];

function WhereView() {
  return (
    <div className="fh-view fh-stack izmfa-stack">
      {SURFACES.map(({ icon: I, name, sub, stat, pill }) => (
        <div className="fh-srow" key={name}>
          <span className="si"><I weight="regular" /></span>
          <span>
            <span className="sn">{name}</span>
            <span className="ss">{sub}</span>
          </span>
          <span className="sgrow">
            <span className="sstat">{stat}</span>
            <span className="fh-pill ok"><CheckCircle weight="fill" /> {pill}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- tab 1 · which methods (fh-hub constellation) ---------- */
type Cell = { k: "ghost"; icon: Icon } | { k: "feat"; label: string; icon: Icon } | { k: "hero" };

const GHOSTS: Icon[] = [Circle, SquaresFour, DotsNine, Cube, Hash, Square];
let gi = 0;
const G = (): Cell => ({ k: "ghost", icon: GHOSTS[gi++ % GHOSTS.length] });
const M = (label: string, icon: Icon): Cell => ({ k: "feat", label, icon });

/* Six columns. The nine methods cluster around the core; ghosts hold
   the lattice open at the edges, where the radial mask fades them out. */
const CELLS: Cell[] = [
  G(), G(), M("Push notification", BellRinging), M("TOTP", ClockCountdown), G(), G(),
  G(), M("Hardware token", Key), M("Fingerprint", Fingerprint), M("Facial", Scan), M("Email OTP", EnvelopeSimple), G(),
  G(), M("Device certificate", Certificate), { k: "hero" }, M("SMS OTP", DeviceMobile), G(),
  G(), G(), M("Backup codes", ListNumbers), G(), G(), G(),
];

function MethodsView() {
  return (
    <div className="fh-view fh-hub">
      {CELLS.map((c, i) => {
        if (c.k === "hero") {
          return (
            <div className="fh-hero" key="hero">
              <span className="mk izmfa-mk">
                <LogoMark size={30} />
              </span>
              <span>
                <span className="ht">InstaSafe</span>
                <span className="hs">assigned per group</span>
              </span>
            </div>
          );
        }
        if (c.k === "ghost") {
          const I = c.icon;
          return (
            <div className="fh-tile ghost" key={`g${i}`} aria-hidden="true">
              <span className="ti"><I weight="regular" /></span>
            </div>
          );
        }
        const I = c.icon;
        return (
          <div className="fh-tile feat" key={c.label}>
            <span className="ti"><I weight="regular" /></span>
            <span className="tl">{c.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- tab 2 · when it triggers (fh-log) ---------- */
type Verdict = "allow" | "step" | "deny";
const EXAMPLES: { ctx: string; outcome: string; verdict: Verdict }[] = [
  { ctx: "bound laptop · office · 10:14", outcome: "allowed, no prompt", verdict: "allow" },
  { ctx: "bound laptop · new country · 02:40", outcome: "step-up challenge, then allowed", verdict: "step" },
  { ctx: "unbound device · any location", outcome: "denied, no challenge offered", verdict: "deny" },
];
const VERDICT_ICON: Record<Verdict, Icon> = { allow: CheckCircle, step: ShieldWarning, deny: XCircle };

function TriggerView() {
  return (
    <div className="fh-view fh-log-wrap">
      <div className="fh-log">
        <div className="fh-log-h">
          <span className="live"><i /> Evaluating context</span>
          <span className="exp"><SlidersHorizontal weight="regular" /> 25 combinations</span>
        </div>
        <div className="fh-log-body izmfa-log-body">
          {EXAMPLES.map(({ ctx, outcome, verdict }) => {
            const I = VERDICT_ICON[verdict];
            return (
              <div className={`fh-lrow izmfa-ex ${verdict}`} key={ctx}>
                <span className="lic"><I weight="fill" /></span>
                <span className="izmfa-ex-ctx">{ctx}</span>
                <span className="izmfa-ex-arrow" aria-hidden="true">→</span>
                <span className="izmfa-ex-out">{outcome}</span>
              </div>
            );
          })}
        </div>
        <div className="izmfa-log-f">
          <span><b>12</b> triggers</span>
          <span><b>4</b> automatic responses</span>
          <span><b>25</b> policy combinations</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- tabs ---------- */
type TabDef = {
  icon: Icon;
  title: string;
  desc: string;
  headline: string;
  body: string[];
};

const TABS: TabDef[] = [
  {
    icon: Desktop,
    title: "Where it applies",
    desc: "The desktop login, the network gear and the VPN you haven't retired — not just the browser.",
    headline: "Every login, not just the web ones.",
    body: [
      "MFA belongs at the first prompt a person sees, which is usually the operating system — not the third web app they open that morning.",
      "InstaSafe enforces MFA at the desktop login on Windows and macOS, and through RADIUS for the infrastructure that has no idea what a browser is: switches, routers, firewalls, jump hosts and legacy VPN concentrators still in the estate.",
    ],
  },
  {
    icon: Fingerprint,
    title: "Which methods",
    desc: "Nine methods, assigned per user group rather than one choice for the whole company.",
    headline: "Nine methods. Pick per group, not per company.",
    body: [
      "Field staff on shared devices, engineers with hardware keys, and directors who will only ever tap a phone are not the same population. Assign the method per user group, and switch it without touching the applications.",
    ],
  },
  {
    icon: MapPin,
    title: "When it triggers",
    desc: "Context on every session — a challenge when something changed, silence when nothing did.",
    headline: "Challenge when something changes. Stay quiet when nothing does.",
    body: [
      "MFA on every action trains people to approve without reading. MFA once a month protects nothing. The useful question is what changed since the last time this person was trusted.",
      "InstaSafe evaluates context on every session — device posture, location, network, time of day, the sensitivity of what's being opened. Routine access from a bound, patched laptop inside working hours passes without a prompt. An unrecognized device, a new country, or a step toward a sensitive application raises a challenge, and the reason is recorded alongside it.",
    ],
  },
];

const N = TABS.length;
const VIEWS = [WhereView, MethodsView, TriggerView];

/* The head block is identical in both forms, so it is written once. */
function Head() {
  return (
    <div className="izmfa-headwrap iz-irail" style={{ ["--ir-b" as string]: "63%" }}>
      <div className="fh-head">
        <span className="iz-ey">Multi-factor authentication</span>
        <h2 className="iz-h2">
          MFA that reaches the login, <em>not just the app</em>.
        </h2>
        <p className="fh-lead">
          Most MFA stops at the browser. Yours probably does. The gaps are where attackers actually go: the desktop
          login, the network gear, the VPN concentrator you haven&apos;t retired yet.
        </p>
      </div>
    </div>
  );
}

export function IzMfaHub() {
  const [tab, setTab] = useState(1);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);

  /* The tab form is a desktop composition: the stage sits ABOVE the tabs
     that drive it. Stacked into one column that inverts — you scroll past
     the visual to reach the control, tap, and the thing you changed is now
     off-screen behind you. Autoplay makes it worse: the section rewrites
     itself while you are reading it, which reads as a glitch rather than
     as a feature. So below 900px the same three topics become three plain
     cards instead, each carrying its own visual, copy and link. */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (mobile || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setTab((t) => (t + 1) % N), TAB_MS);
    return () => clearTimeout(id);
  }, [tab, paused, mobile]);

  if (mobile) {
    return (
      <div className="fh izmfa izmfa--cards">
        <Head />
        <div className="izmfa-cards">
          {TABS.map((t, i) => {
            const V = VIEWS[i];
            return (
              <article className="izmfa-card" key={t.title}>
                <div className="izmfa-card-vis">
                  <V />
                </div>
                <span className="izmfa-card-ey">
                  <t.icon weight="fill" aria-hidden="true" />
                  {t.title}
                </span>
                <h3 className="izmfa-cap-h">{t.headline}</h3>
                <div className="izmfa-cap-b">
                  {t.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                <a href="/multifactor-authentication" className="learn">
                  Explore MFA {Arrow}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  /* No `active`/`View` lookup any more — every panel is mounted and the
     active one is chosen in CSS, so there is nothing to pick here. */

  return (
    /* NO pause handler on the section root. It spans the full wrap, so a
       cursor resting anywhere on a ~900px-tall band — including the
       whitespace beside the copy — froze autoplay indefinitely, and at
       this width the cursor is essentially always inside it. Pausing now
       belongs to the tab strip alone: the one small target you are on
       when you are actually deciding which topic to read. */
    <div className="fh izmfa">
      {/* One rail, and it STOPS. It runs down the empty right half of the
          head block and terminates on the caption's top hairline, so it
          reads as a corner of a drawing rather than a stroke that quit.
          There is deliberately no left rail: the headline column starts
          at the wrap edge, so a rail there would either sit on the text
          or duplicate the page's own outer rail. */}
      <Head />

      {/* All three captions and all three stage views are rendered and
          stacked in one cell, with only the active one visible. The
          block is therefore always as tall as its TALLEST member, so
          switching tabs cannot change the section's height — which is
          what was shunting the whole page every six seconds as autoplay
          advanced. A min-height would have needed a magic number per
          breakpoint; this needs none and can never drift out of date. */}
      <div className="izmfa-cap">
        {TABS.map((t, i) => (
          <div className={i === tab ? "izmfa-capitem on" : "izmfa-capitem"} key={t.title} aria-hidden={i !== tab}>
            <h3 className="izmfa-cap-h">{t.headline}</h3>
            <div className="izmfa-cap-b">
              {t.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fh-stage izmfa-stage-stack">
        {VIEWS.map((V, i) => (
          <div className={i === tab ? "izmfa-panel on" : "izmfa-panel"} key={TABS[i].title} aria-hidden={i !== tab}>
            <V />
          </div>
        ))}
      </div>

      {/* The strip stays BELOW the stage, where it has always been
          (user call, 2026-08-13 — it was briefly moved above, which was
          the wrong reading of the complaint).

          What was actually wrong was the PINNING: this carried
          `position: sticky; bottom: 0`, so it detached and rode the foot
          of the viewport for the length of the section with the stage
          scrolling behind it. That is gone; the strip is in normal flow.

          `focus-within` pauses autoplay too, so a keyboard user tabbing
          the strip gets the same hold a hovering cursor does. */}
      <div
        className="fh-groups izmfa-groups"
        role="tablist"
        aria-label="MFA topics"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {TABS.map((t, i) => (
          <div
            key={t.title}
            role="tab"
            tabIndex={0}
            aria-selected={tab === i}
            className={`fh-group ${tab === i ? "on" : ""}`}
            onClick={() => setTab(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setTab(i); }
            }}
          >
            {tab === i && <span className={`fh-prog izmfa-prog${paused ? " paused" : ""}`} key={`prog-${i}-${tab}`} />}
            <span className="gi"><t.icon weight={tab === i ? "fill" : "regular"} /></span>
            <h4>{t.title}</h4>
            <p>{t.desc}</p>
            <a href="/multifactor-authentication" className="learn" onClick={(e) => e.stopPropagation()}>
              Explore MFA {Arrow}
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
