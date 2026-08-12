"use client";

import { useEffect, useRef, useState } from "react";
import {
  AppWindow,
  Briefcase,
  Buildings,
  Clock,
  Coffee,
  DeviceMobile,
  Fingerprint,
  GlobeHemisphereWest,
  HardDrives,
  House,
  Laptop,
  Prohibit,
  SealCheck,
  ShieldCheck,
  UserGear,
  VideoCamera,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   Group B · "different populations, same enforcement"

   ONE VISUAL, FIVE READINGS. The left plate is pinned and the right
   column scrolls past it; the plate never rebuilds, it only changes
   the two or three parts each scenario actually disagrees about.

   THIS IS THE ARGUMENT, NOT A LAYOUT CHOICE. The section's claim is
   that five populations resolve to the SAME enforcement. A carousel
   of five different diagrams would quietly say the opposite — five
   problems, five architectures. Holding identity → decision →
   application fixed on screen while only the policy shifts is the
   claim made structural: you can watch what stays put.

   Note this deliberately departs from IzUseCaseSwitch's rule that
   "every tab owns its own visual." That rule exists to stop a fixed
   picture with swapped text underneath — cheap, and it teaches the
   reader nothing. Here the visual genuinely changes on every step;
   what is fixed is the SKELETON, which is the thing being asserted.

   Scroll mechanism: the plate is `position: sticky` and the steps are
   ordinary flow content. No scroll hijack, no pinning the whole
   viewport — the page never stops responding to the scrollbar, the
   steps are real text in the DOM, and the whole thing degrades to a
   plain stack when sticky is unavailable.

   Two scenarios also carry a slow sub-cycle (Hybrid rotates the
   location, BYOD rotates the device) because their whole point is
   that the thing rotating DOESN'T change the decision. Both stop
   dead under prefers-reduced-motion.
   ============================================================ */

type Chip = { Icon: Icon; label: string; tone?: "on" | "off" | "accent" };

type Scenario = {
  n: string;
  key: string;
  title: string;
  line: string;
  /** the terse mono proof — one per row */
  fact?: string;
  /** true until product signs the claim off; renders nothing rather
      than shipping an unverified statement */
  unconfirmed?: boolean;

  /* ---- what the plate shows for this scenario ---- */
  /** the requester: one entry, or several to rotate slowly through */
  who: { Icon: Icon; label: string }[];
  /** where from: one entry, or several to rotate through */
  where: { Icon: Icon; label: string }[];
  /** extra decision rows beyond the two constants */
  extraChecks?: string[];
  /** the target being reached */
  app: { Icon: Icon; label: string };
  /** chips under the flow — `off` renders struck through, i.e. absent */
  chips: Chip[];
  /** which node the scenario is actually about */
  focus: "who" | "where" | "gate" | "app";
};

const SCENARIOS: Scenario[] = [
  {
    n: "01",
    key: "remote",
    title: "Secure Remote Access",
    line: "Employees reach exactly one application from anywhere, with the device checked every session — not once at enrolment.",
    fact: "25 device checks per session",
    who: [{ Icon: Laptop, label: "Employee laptop" }],
    where: [{ Icon: GlobeHemisphereWest, label: "Anywhere" }],
    app: { Icon: AppWindow, label: "One application" },
    chips: [{ Icon: ShieldCheck, label: "25 posture checks", tone: "accent" }],
    focus: "who",
  },
  {
    n: "02",
    key: "hybrid",
    title: "Hybrid Work",
    line: "Office and home stop being different security postures. Location becomes one input among several, not the thing that decides.",
    fact: "Same policy in the office and out of it",
    who: [{ Icon: Laptop, label: "Employee laptop" }],
    /* the rotation IS the point — three places, one unchanged decision */
    where: [
      { Icon: Buildings, label: "Office" },
      { Icon: House, label: "Home" },
      { Icon: Coffee, label: "Coffee shop" },
    ],
    app: { Icon: AppWindow, label: "One application" },
    chips: [{ Icon: SealCheck, label: "Policy unchanged", tone: "accent" }],
    focus: "where",
  },
  {
    n: "03",
    key: "vendor",
    title: "Third-Party & Vendor Access",
    line: "A vendor gets one system for one window, with the session recorded. No VPN account, no shared credential, no standing access that outlives the contract.",
    fact: "Time-bound access, recorded sessions",
    who: [{ Icon: Briefcase, label: "Vendor" }],
    where: [{ Icon: GlobeHemisphereWest, label: "Anywhere" }],
    app: { Icon: AppWindow, label: "One system" },
    chips: [
      { Icon: VideoCamera, label: "Session recorded", tone: "accent" },
      { Icon: Clock, label: "Expires in 4h", tone: "accent" },
    ],
    focus: "app",
  },
  {
    n: "04",
    key: "privileged",
    title: "Privileged Access",
    line: "Admins reach production through the same decision as everyone else, with more checks and a recording — not through a jump box with a shared password.",
    fact: "Every privileged session attributable to a person",
    who: [{ Icon: UserGear, label: "Admin" }],
    where: [{ Icon: GlobeHemisphereWest, label: "Anywhere" }],
    extraChecks: ["Approval granted", "Step-up challenge"],
    app: { Icon: HardDrives, label: "Production server" },
    chips: [
      { Icon: VideoCamera, label: "Session recorded", tone: "accent" },
      { Icon: SealCheck, label: "Approval required", tone: "accent" },
    ],
    focus: "gate",
  },
  {
    n: "05",
    key: "byod",
    title: "BYOD",
    line: "Personal laptops and phones get application access without being enrolled into management. The device is checked, not owned.",
    /* [CONFIRM] still flagged in the brief, so the text claim stays
       held back. NOTE: the struck MDM chip below makes that same claim
       visually — flagged to product rather than shipped silently. */
    fact: "Posture without MDM enrolment",
    unconfirmed: true,
    who: [
      { Icon: Laptop, label: "Personal MacBook" },
      { Icon: DeviceMobile, label: "Android phone" },
    ],
    where: [{ Icon: GlobeHemisphereWest, label: "Anywhere" }],
    app: { Icon: AppWindow, label: "One application" },
    chips: [
      { Icon: Prohibit, label: "MDM enrolment", tone: "off" },
      { Icon: Fingerprint, label: "Posture checked", tone: "accent" },
    ],
    focus: "who",
  },
];

/* The plate, extracted so it can be rendered once in the pinned stage
   on desktop and five times as static cards on phones. Nothing about
   the drawing changed — only who owns it. */
function Plate({ sc, cycle }: { sc: Scenario; cycle: number }) {
  const who = sc.who[cycle % sc.who.length];
  const where = sc.where[cycle % sc.where.length];
  const checks = [...CONSTANT_CHECKS, ...(sc.extraChecks ?? [])];
  return (
    <div className="izgb-plate" data-focus={sc.focus}>
      <span className="izgb-plate-tag" aria-hidden="true">
        Identity + device → application
      </span>

      <div className="izgb-flow">
        <div className="izgb-node izgb-node--who">
          <span className="izgb-ic" key={who.label}>
            <who.Icon weight="regular" />
          </span>
          <span className="izgb-node-label">{who.label}</span>
          <span className="izgb-where" key={where.label}>
            <where.Icon weight="regular" />
            {where.label}
          </span>
        </div>

        <Wire />

        {/* the decision — the part that never moves */}
        <div className="izgb-gate">
          <span className="izgb-gate-brand">InstaSafe</span>
          <ul className="izgb-checks">
            {checks.map((c, i) => (
              <li key={c} style={{ ["--i" as string]: i } as React.CSSProperties}>
                <ShieldCheck weight="fill" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <Wire tunnel />

        <div className="izgb-node izgb-node--app">
          <span className="izgb-ic" key={sc.app.label}>
            <sc.app.Icon weight="regular" />
          </span>
          <span className="izgb-node-label">{sc.app.label}</span>
        </div>
      </div>

      <ul className="izgb-chips">
        {sc.chips.map((c) => (
          <li key={c.label} className={`izgb-chip is-${c.tone ?? "on"}`}>
            <c.Icon weight="regular" aria-hidden="true" />
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}


/** the two rows that never change — that is the whole point */
const CONSTANT_CHECKS = ["Identity verified", "Device checked"];

const ROTATE_MS = 2400;

export function IzGroupB({
  kicker = "Group B",
  lead = "Different populations, different risk,",
  leadEmphasis = "same enforcement.",
}: {
  kicker?: string;
  lead?: string;
  leadEmphasis?: string;
}) {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [reduced, setReduced] = useState(false);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Publish the pinned plate's height as a custom property.

     On phones the plate pins across the top of the viewport, so a
     step's heading was rendering underneath it — visible text, hidden
     title. The mobile rules push each step's content down by exactly
     this much, which needs the real measured height rather than a
     guessed constant that goes stale the moment a chip wraps. */
  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    if (!stage || !section || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => {
      section.style.setProperty("--izgb-stageh", `${Math.round(e.contentRect.height)}px`);
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);


  /* Active step = the one nearest the middle of the viewport.

     The first version just took the last intersecting entry in each
     IntersectionObserver batch, which is wrong the moment more than
     one step is in the band at once: a fast scroll or an anchor jump
     delivers several entries together and the arbitrary last one won.
     That reliably selected the NEXT step instead of the current one.
     Keeping the live set and picking by distance to centre is
     order-independent, so it cannot mis-select. */
  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const inBand = new Set<number>();

    const pick = () => {
      if (!inBand.size) return;
      const mid = window.innerHeight / 2;
      let best = -1;
      let bestD = Infinity;
      for (const i of inBand) {
        const r = els[i].getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (best >= 0) setActive(best);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = els.indexOf(e.target as HTMLLIElement);
          if (i < 0) continue;
          if (e.isIntersecting) inBand.add(i);
          else inBand.delete(i);
        }
        pick();
      },
      /* The band sits high, not at the centre line: the plate is now
         pinned just under the nav and each step's text starts at the
         top of its box, so the two pair top-to-top. A centre band
         would light the step below the one being read. */
      { rootMargin: "-18% 0px -74% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* the slow sub-rotation, only for the scenarios that have one, only
     while that scenario is the one on screen */
  const sc = SCENARIOS[active];
  const rotating = Math.max(sc.who.length, sc.where.length) > 1;
  useEffect(() => {
    setCycle(0);
    if (reduced || !rotating) return;
    const id = setInterval(() => setCycle((c) => c + 1), ROTATE_MS);
    return () => clearInterval(id);
  }, [active, reduced, rotating]);

  return (
    <section className="izgb iz-railed" ref={sectionRef}>
      <div className="iz-wrap">
        {/* The head sits INSIDE the grid, in the left column above the
            plate, so the steps column can start level with it. Left
            outside, the heading had a column of dead space to its
            right and the steps had to be pushed down past it. */}
        <div className="izgb-cols">
          {/* The heading and the plate travel together as one sticky
              column: the heading stays readable, the illustration sits
              under it, and only the readings scroll. Pinning the plate
              alone — centred in a 100vh box — is what created the dead
              space above and below it that no amount of compensating
              padding ever really fixed. */}
          <div className="izgb-left">
            <div className="izgb-head">
              <h2 className="izgb-lead">
                {lead} <em>{leadEmphasis}</em>
              </h2>
            </div>

            <div className="izgb-stage" ref={stageRef}>
              <Plate sc={sc} cycle={cycle} />
            </div>
          </div>

          {/* ---------- right · the readings ---------- */}
          <ol className="izgb-steps">
            {SCENARIOS.map((s, i) => (
              <li
                key={s.key}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`izgb-step ${i === active ? "is-active" : ""}`}
                aria-current={i === active ? "step" : undefined}
              >
                <span className="izgb-n" aria-hidden="true">
                  {s.n}
                </span>
                <div className="izgb-stepbody">
                  <h3>{s.title}</h3>
                  <p>{s.line}</p>
                  {/* an unverified claim renders as nothing, not as a
                      hedge — a marked-up claim on a live page is still
                      a claim */}
                  {!s.unconfirmed && s.fact && <span className="izgb-fact">{s.fact}</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* PHONES GET CARDS, NOT A SCROLL STORY.

            The pinned plate needs a viewport tall enough to hold the
            plate and the step being read at the same time, and a phone
            has neither the height nor a hover state to make the pairing
            legible. So below the split this renders five plain cards —
            each scenario's own illustration with its own text, no
            pinning, no active state, nothing to drive. Same content,
            same order, read rather than scrubbed. */}
        <ol className="izgb-cards">
          {SCENARIOS.map((s2) => (
            <li className="izgb-card" key={s2.key}>
              <div className="izgb-card-h">
                <span className="izgb-n" aria-hidden="true">
                  {s2.n}
                </span>
                <h3>{s2.title}</h3>
              </div>
              <Plate sc={s2} cycle={0} />
              <p>{s2.line}</p>
              {!s2.unconfirmed && s2.fact && <span className="izgb-fact">{s2.fact}</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Orthogonal connector with a square port nub at each end — same
   doctrine as IzAccessFlow and the consolidation diagram. `tunnel`
   marks the segment that only exists once the decision is made, so it
   is drawn in the accent rather than the neutral line colour. */
function Wire({ tunnel = false }: { tunnel?: boolean }) {
  return (
    <span className={`izgb-wire ${tunnel ? "izgb-wire--tunnel" : ""}`} aria-hidden="true">
      <i />
      <i />
    </span>
  );
}
