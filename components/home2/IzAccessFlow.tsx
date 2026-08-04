"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

/* ============================================================
   How it works — Zero Trust access flow.

   Reworked from the lab's 00d signature (C2 · C14). The FLOW IS
   UNCHANGED: same six nodes, same six edges, same three phases and
   the same step copy. What changed is the visual language.

   Why it was rebuilt rather than restyled:
   - the old version drew every node as an identical rounded rect in
     SVG <text>, which is why it read as generic. Nodes are now real
     DOM, so they can hold vendor logos, an avatar and mixed type.
   - each node carried a tiny sub-label ("multi-factor", "policy
     engine"…) at ~9px. Those are gone; the node name plus the step
     narration carries the meaning.
   - the phase pills became a segmented progress rail that fills as
     the walkthrough advances, so position in the flow is readable at
     a glance instead of inferred from which pill is tinted.

   GEOMETRY: nodes are positioned in the plate's own coordinate space
   (VB_W x VB_H) and converted to percentages, and the SVG edge layer
   uses the same viewBox. Both therefore scale together and the wires
   always meet the nodes, at any width.
   ============================================================ */

const VB_W = 1200;
const VB_H = 640;

type NodeId = "user" | "mfa" | "controller" | "identity" | "gateway" | "apps";
type EdgeId =
  | "user-mfa"
  | "mfa-controller"
  | "controller-identity"
  | "controller-gateway"
  | "user-gateway"
  | "gateway-apps";

interface Step {
  t: string;
  focus: NodeId;
  light?: EdgeId;
  reverse?: boolean;
}
interface Phase {
  tag: string;
  title: string;
  purpose: string;
  active: NodeId[];
  allow?: boolean;
  steps: Step[];
}

/* node centres in plate space */
const POS: Record<NodeId, { x: number; y: number }> = {
  user: { x: 176, y: 498 },
  mfa: { x: 176, y: 300 },
  identity: { x: 610, y: 92 },
  controller: { x: 520, y: 322 },
  gateway: { x: 720, y: 322 },
  apps: { x: 994, y: 340 },
};

/* Curved so the diagram reads as a route, not a wiring schematic. */
const EDGES: Record<EdgeId, string> = {
  "user-mfa": "M176 452 L176 344",
  "mfa-controller": "M242 296 C 330 292, 380 312, 436 318",
  "controller-identity": "M520 282 C 520 200, 540 150, 560 124",
  "controller-gateway": "M604 322 L644 322",
  "user-gateway": "M268 512 C 460 542, 600 476, 698 366",
  "gateway-apps": "M796 322 C 802 322, 806 330, 812 336",
};
const EDGE_ORDER: EdgeId[] = [
  "user-mfa",
  "mfa-controller",
  "controller-identity",
  "controller-gateway",
  "user-gateway",
  "gateway-apps",
];

/* Step copy is carried over verbatim from the lab component. */
const PHASES: Phase[] = [
  {
    tag: "OVERVIEW",
    title: "The whole path, one frame",
    purpose:
      "Six parts across two planes. Press play to watch identity get proven, access get authorized, then a single private tunnel open — one step at a time.",
    active: ["user", "mfa", "controller", "identity", "gateway", "apps"],
    steps: [],
  },
  {
    tag: "PHASE 1 / 3",
    title: "Authenticate user & device",
    purpose: "Prove it's really them, on a device you trust — before any connection exists.",
    active: ["user", "mfa", "controller"],
    steps: [
      { t: "User initiates login.", focus: "user" },
      { t: "Identity and device verified at MFA.", focus: "mfa", light: "user-mfa" },
      { t: "MFA passes the request to the Controller.", focus: "controller", light: "mfa-controller" },
      { t: "Controller receives the authentication request.", focus: "controller" },
    ],
  },
  {
    tag: "PHASE 2 / 3",
    title: "Verify identity & authorize",
    purpose: "The Controller confirms who they are and what policy allows — then programs the Gateway.",
    active: ["controller", "identity", "gateway"],
    steps: [
      { t: "Controller queries the Identity System.", focus: "identity", light: "controller-identity" },
      { t: "Identity System responds.", focus: "controller", light: "controller-identity", reverse: true },
      { t: "Controller evaluates access policy.", focus: "controller" },
      { t: "Controller authorizes the Gateway.", focus: "gateway", light: "controller-gateway" },
    ],
  },
  {
    tag: "PHASE 3 / 3",
    title: "Open the secure session",
    purpose: "Only now does traffic flow — one encrypted tunnel to one app. Nothing else is reachable.",
    active: ["user", "gateway", "apps"],
    allow: true,
    steps: [
      { t: "User opens a secure tunnel to the Gateway.", focus: "gateway", light: "user-gateway" },
      { t: "Gateway authorizes the session.", focus: "gateway" },
      { t: "Gateway connects to just that one app.", focus: "apps", light: "gateway-apps" },
      { t: "Application traffic flows safely back.", focus: "user", light: "gateway-apps", reverse: true },
    ],
  },
];

const RAIL = ["Overview", "Authenticate", "Authorize", "Connect"];

const IDP = [
  { src: "/brand/instasafe-mark-color.svg", alt: "InstaSafe IdP", tall: false },
  { src: "/brand/vendors/azure-ad.svg", alt: "Azure AD", tall: false },
  { src: "/brand/vendors/microsoft.svg", alt: "Microsoft AD", tall: true },
  { src: "/brand/vendors/google-workspace.svg", alt: "Google Workspace", tall: true },
];
const CSP = [
  { src: "/brand/vendors/aws.svg", alt: "AWS" },
  { src: "/brand/vendors/azure.svg", alt: "Azure" },
  { src: "/brand/vendors/ibm-cloud.svg", alt: "IBM Cloud" },
  { src: "/brand/vendors/google-cloud.svg", alt: "Google Cloud" },
];
const SAAS = [
  { src: "/brand/vendors/office-365.svg", alt: "Office 365" },
  { src: "/brand/vendors/salesforce.svg", alt: "Salesforce" },
  { src: "/brand/vendors/slack.svg", alt: "Slack" },
  { src: "/brand/vendors/jira.svg", alt: "Jira" },
];

const IcShield = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.4-3 7.4-7 8.8C8 18.4 5 15.4 5 11V6z" />
    <path d="M9 11.5l2 2 4-4" />
  </svg>
);
const IcGate = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.4-3 7.4-7 8.8C8 18.4 5 15.4 5 11V6z" />
    <path d="M8.5 11.5h6M12.5 9l3 2.5-3 2.5" />
  </svg>
);
const IcPlay = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z" /></svg>
);
const IcPause = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x={6} y={5} width={4} height={14} rx={1} /><rect x={14} y={5} width={4} height={14} rx={1} />
  </svg>
);
const IcReplay = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 3-6.7M3 4.5v4h4" />
  </svg>
);
const IcCheck = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const STEP_MS = 1250;
const pc = (v: number, total: number) => `${(v / total) * 100}%`;

function nodeStyle(id: NodeId): CSSProperties {
  return { left: pc(POS[id].x, VB_W), top: pc(POS[id].y, VB_H) };
}

export function IzAccessFlow() {
  const [phase, setPhase] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const reduced = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* Autoplay once when the diagram is actually on screen — the walkthrough
     is the point of the section, and making people hunt for a play button
     buried under a diagram loses most of them. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const begin = () => {
      if (started.current) return;
      started.current = true;
      if (reduced.current) {
        setPhase(3);
        setDone(true);
        return;
      }
      setPhase(1);
      setPlaying(true);
    };
    if (typeof IntersectionObserver === "undefined") {
      begin();
      return;
    }
    const io = new IntersectionObserver(
      (e) => {
        if (!e[0]?.isIntersecting) return;
        io.disconnect();
        begin();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    // Fallback: IO does not fire in a non-rendering tab, and without this the
    // section sits on "Overview" forever with no way in but the play button.
    const safety = window.setTimeout(begin, 3000);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    if (done) {
      setStep(PHASES[3].steps.length - 1);
      return;
    }
    if (phase === 0) {
      setStep(0);
      return;
    }
    const ph = PHASES[phase];
    if (reduced.current) {
      setStep(ph.steps.length - 1);
      return;
    }
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < ph.steps.length; i++) timers.push(setTimeout(() => setStep(i), i * STEP_MS));
    if (playing) {
      timers.push(
        setTimeout(() => {
          if (phase < 3) setPhase((p) => p + 1);
          else {
            setPlaying(false);
            setDone(true);
          }
        }, ph.steps.length * STEP_MS + 700)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [phase, playing, done]);

  const goPhase = useCallback((i: number) => {
    started.current = true;
    setDone(false);
    setPlaying(false);
    setPhase(i);
  }, []);
  const toggle = () => {
    started.current = true;
    if (playing) return setPlaying(false);
    setDone(false);
    setPhase(done || phase === 0 ? 1 : phase);
    setPlaying(true);
  };
  const restart = () => {
    started.current = true;
    setDone(false);
    setPhase(1);
    setPlaying(true);
  };

  const ph = PHASES[phase];
  const overview = phase === 0;
  const allow = !!ph.allow && !overview;
  const live = phase > 0;

  const lit = new Set<EdgeId>();
  if (live) ph.steps.slice(0, step + 1).forEach((s) => s.light && lit.add(s.light));
  const rev = live ? !!ph.steps[step]?.reverse : false;

  const state = (id: NodeId) => {
    if (overview) return "";
    if (ph.active.includes(id)) return "on" + (ph.steps[step]?.focus === id ? " focus" : "");
    return "off";
  };

  /* rail fill: 0 at overview, then phase + within-phase progress */
  const railPct = overview
    ? 0
    : ((phase - 1 + (done ? 1 : (step + 1) / Math.max(1, ph.steps.length))) / 3) * 100;

  return (
    <div className={`izf${allow ? " izf-allow" : ""}`} ref={rootRef}>
      {/* ---------- segmented progress rail (replaces the phase pills) ---------- */}
      <div className="izf-rail" role="tablist" aria-label="Flow phases">
        <span className="izf-rail-track" aria-hidden="true">
          <span className="izf-rail-fill" style={{ transform: `scaleX(${railPct / 100})` }} />
        </span>
        {RAIL.map((label, i) => (
          <button
            key={label}
            role="tab"
            aria-selected={phase === i}
            className={`izf-seg${phase === i ? " on" : ""}${phase > i ? " past" : ""}`}
            onClick={() => goPhase(i)}
          >
            <span className="izf-seg-n">{i === 0 ? "—" : phase > i ? IcCheck : i}</span>
            <span className="izf-seg-l">{label}</span>
          </button>
        ))}
      </div>

      <div className="izf-body">
      {/* ---------- the plate ---------- */}
      <div className="izf-plate">
        <svg className="izf-wires" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden="true">
          {EDGE_ORDER.map((id) => (
            <path key={id} className="izf-wire" d={EDGES[id]} />
          ))}
          {Array.from(lit).map((id) => (
            <g key={`${phase}-${id}`}>
              <path className="izf-wire-lit" d={EDGES[id]} />
              <circle r={5} className={`izf-pkt${rev ? " rev" : ""}`} style={{ offsetPath: `path('${EDGES[id]}')` } as CSSProperties} />
            </g>
          ))}
        </svg>

        {/* zone frames — quiet labels that group the scene like the deck */}
        <div className="izf-zone izf-zone-user"><span>End user</span></div>
        <div className="izf-zone izf-zone-apps"><span>Apps horizon</span></div>

        {/* --- user --- */}
        <div className={`izf-node izf-user ${state("user")}`} style={nodeStyle("user")}>
          <span className="izf-avatar" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="currentColor" opacity="0.16" />
              <circle cx="24" cy="19" r="7.5" fill="currentColor" />
              <path d="M9 44a15 13 0 0 1 30 0z" fill="currentColor" />
            </svg>
          </span>
          <span className="izf-node-txt">
            <b>Alen Joseph</b>
            <i>InstaSafe agent</i>
          </span>
        </div>

        {/* --- MFA --- */}
        <div className={`izf-node izf-mfa ${state("mfa")}`} style={nodeStyle("mfa")}>
          <span className="izf-ic">{IcShield}</span>
          <b>MFA</b>
        </div>

        {/* --- identity --- */}
        <div className={`izf-node izf-identity ${state("identity")}`} style={nodeStyle("identity")}>
          <span className="izf-node-cap">Identity system</span>
          <span className="izf-logos">
            {IDP.map((l) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={l.alt} src={l.src} alt={l.alt} className={l.tall ? "wide" : ""} />
            ))}
          </span>
        </div>

        {/* --- controller (our own mark) --- */}
        <div className={`izf-node izf-controller ${state("controller")}`} style={nodeStyle("controller")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/instasafe-mark-color.svg" alt="" className="izf-mark" />
          <b>Controller</b>
        </div>

        {/* --- gateway --- */}
        <div className={`izf-node izf-gateway ${state("gateway")}`} style={nodeStyle("gateway")}>
          <span className="izf-ic">{IcGate}</span>
          <b>Gateway</b>
        </div>

        {/* --- apps --- */}
        <div className={`izf-node izf-apps ${state("apps")}`} style={nodeStyle("apps")}>
          <span className="izf-node-cap">Cloud &amp; private apps</span>
          <span className="izf-logos grid">
            {CSP.concat(SAAS).map((l) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={l.alt} src={l.src} alt={l.alt} />
            ))}
          </span>
        </div>
      </div>

      {/* ---------- narration — sits BESIDE the diagram, never below it,
                so a reader never has to scroll away from the thing the
                text is describing ---------- */}
      <div className="izf-narr" aria-live="polite">
        <div className="izf-narr-head">
          <span className="izf-tag">{ph.tag}</span>
          <h3>{ph.title}</h3>
          <p>{ph.purpose}</p>
        </div>
        {live && (
          <ol className="izf-steps">
            {ph.steps.map((s, i) => (
              <li key={s.t} className={`izf-step${i < step ? " past" : ""}${i === step ? " cur" : ""}`}>
                <span className="izf-step-i">{i < step ? IcCheck : i + 1}</span>
                <span>{s.t}</span>
              </li>
            ))}
          </ol>
        )}
        <div className="izf-ctl">
          <button className="izf-btn pri" onClick={toggle} aria-pressed={playing}>
            {playing ? IcPause : IcPlay}
            {playing ? "Pause" : done ? "Play again" : "Play walkthrough"}
          </button>
          <button className="izf-btn" onClick={restart} aria-label="Restart walkthrough">
            {IcReplay} Restart
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
