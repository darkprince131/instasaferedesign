"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type JSX } from "react";

/* ============================================================
   How it works — Zero Trust access flow.

   The FLOW IS UNCHANGED from the lab's 00d signature: same phases,
   same order, same step copy. Only the drawing changed.

   Layout is TWO ROWS — control plane above, data plane below —
   because the narration's whole point is "two planes, two jobs".
   The arrangement is that sentence in space, and it gives each
   phase a distinct spatial signature: phase 1 travels bottom to
   top, phase 2 stays top, phase 3 stays bottom.

   Wires are ORTHOGONAL (H/V elbows), never curves, and every wire
   terminates in a small square nub on the node edge — the port. A
   curve implies an analogue path; this is a routed decision.

   Apps are two nodes (cloud IaaS / SaaS) so the logos can be large
   enough to actually read.
   ============================================================ */

const VB_W = 1200;
const VB_H = 660;

type NodeId = "user" | "mfa" | "controller" | "identity" | "gateway" | "cloud" | "saas";
type EdgeId =
  | "user-mfa"
  | "mfa-controller"
  | "controller-identity"
  | "controller-gateway"
  | "user-gateway"
  | "gateway-cloud"
  | "gateway-saas";

interface Step {
  t: string;
  focus: NodeId | NodeId[];
  light?: EdgeId | EdgeId[];
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

/* node centres, plate space */
/* Rows are spread across the full plate height and the two app nodes are
   pushed far enough apart to clear each other. At a narrower viewport the
   stacked nodes are taller relative to the plate, and the previous
   spacing let `saas` overlap `cloud` and run past the bottom edge. */
const POS: Record<NodeId, { x: number; y: number }> = {
  mfa: { x: 280, y: 140 },
  controller: { x: 600, y: 140 },
  identity: { x: 950, y: 140 },
  user: { x: 150, y: 470 },
  gateway: { x: 600, y: 470 },
  cloud: { x: 960, y: 330 },
  saas: { x: 960, y: 530 },
};

/* Right-angle routing only. Each entry also lists its port points so a
   nub can be stamped where the wire meets a node. */
const EDGES: Record<EdgeId, { d: string; ports: [number, number][] }> = {
  "user-mfa": { d: "M150 437 V140 H208", ports: [[150, 437], [208, 140]] },
  "mfa-controller": { d: "M352 140 H515", ports: [[352, 140], [515, 140]] },
  "controller-identity": { d: "M685 140 H845", ports: [[685, 140], [845, 140]] },
  "controller-gateway": { d: "M600 176 V437", ports: [[600, 176], [600, 437]] },
  "user-gateway": { d: "M240 470 H520", ports: [[240, 470], [520, 470]] },
  "gateway-cloud": { d: "M680 470 H800 V330 H855", ports: [[680, 470], [855, 330]] },
  "gateway-saas": { d: "M680 470 H800 V530 H855", ports: [[680, 470], [855, 530]] },
};
const EDGE_ORDER = Object.keys(EDGES) as EdgeId[];

/* Step copy verbatim. Only the app target is now two nodes. */
const PHASES: Phase[] = [
  {
    tag: "OVERVIEW",
    title: "The whole path, one frame",
    purpose:
      "Six parts across two planes. Press play to watch identity get proven, access get authorized, then a single private tunnel open — one step at a time.",
    active: ["user", "mfa", "controller", "identity", "gateway", "cloud", "saas"],
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
    active: ["user", "gateway", "cloud", "saas"],
    allow: true,
    steps: [
      { t: "User opens a secure tunnel to the Gateway.", focus: "gateway", light: "user-gateway" },
      { t: "Gateway authorizes the session.", focus: "gateway" },
      {
        t: "Gateway connects to just that one app.",
        focus: ["cloud", "saas"],
        light: ["gateway-cloud", "gateway-saas"],
      },
      {
        t: "Application traffic flows safely back.",
        focus: "user",
        light: ["gateway-cloud", "gateway-saas"],
        reverse: true,
      },
    ],
  },
];

const CLOUD = [
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
const IDP = [
  { src: "/brand/instasafe-mark-color.svg", alt: "InstaSafe IdP" },
  { src: "/brand/vendors/azure-ad.svg", alt: "Azure AD" },
  { src: "/brand/vendors/microsoft.svg", alt: "Microsoft AD" },
  { src: "/brand/vendors/google-workspace.svg", alt: "Google Workspace" },
];

const sIc = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const IcGrid = (
  <svg viewBox="0 0 24 24" {...sIc} aria-hidden="true">
    <rect x={3} y={3} width={7.5} height={7.5} /><rect x={13.5} y={3} width={7.5} height={7.5} />
    <rect x={3} y={13.5} width={7.5} height={7.5} /><rect x={13.5} y={13.5} width={7.5} height={7.5} />
  </svg>
);
const IcFinger = (
  <svg viewBox="0 0 24 24" {...sIc} aria-hidden="true">
    <path d="M12 4a8 8 0 0 0-8 8" /><path d="M12 8a4 4 0 0 0-4 4v4" />
    <path d="M12 12v5" /><path d="M16 12a4 4 0 0 0-4-4" /><path d="M20 12a8 8 0 0 0-8-8" />
  </svg>
);
const IcShieldCheck = (
  <svg viewBox="0 0 24 24" {...sIc} aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.4-3 7.4-7 8.8C8 18.4 5 15.4 5 11V6z" /><path d="M9 11.5l2 2 4-4" />
  </svg>
);
const IcLink = (
  <svg viewBox="0 0 24 24" {...sIc} aria-hidden="true">
    <path d="M10 13a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.4 1.4" />
    <path d="M14 11a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 1 0 5.7 5.7l1.4-1.4" />
  </svg>
);
const RAIL: { label: string; icon: JSX.Element }[] = [
  { label: "Overview", icon: IcGrid },
  { label: "Authenticate", icon: IcFinger },
  { label: "Authorize", icon: IcShieldCheck },
  { label: "Connect", icon: IcLink },
];

const IcUser = (
  <svg viewBox="0 0 24 24" {...sIc} aria-hidden="true">
    <circle cx={12} cy={8} r={3.6} /><path d="M5.5 19.5a6.6 6.6 0 0 1 13 0" />
  </svg>
);
const IcGate = (
  <svg viewBox="0 0 24 24" {...sIc} aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.4-3 7.4-7 8.8C8 18.4 5 15.4 5 11V6z" />
    <path d="M8.5 11.5h6M12.5 9l3 2.5-3 2.5" />
  </svg>
);
const IcPlay = <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z" /></svg>;
const IcPause = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x={6} y={5} width={4} height={14} /><rect x={14} y={5} width={4} height={14} />
  </svg>
);
const IcReplay = (
  <svg viewBox="0 0 24 24" {...sIc} strokeWidth={2} aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 3-6.7M3 4.5v4h4" />
  </svg>
);
const IcCheck = (
  <svg viewBox="0 0 24 24" {...sIc} strokeWidth={3} aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
);
const IcPrev = (
  <svg viewBox="0 0 24 24" {...sIc} strokeWidth={2.2} aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
const IcNext = (
  <svg viewBox="0 0 24 24" {...sIc} strokeWidth={2.2} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const STEP_MS = 1250;
const arr = <T,>(v: T | T[]): T[] => (Array.isArray(v) ? v : [v]);
const nodeStyle = (id: NodeId): CSSProperties => ({
  left: `${(POS[id].x / VB_W) * 100}%`,
  top: `${(POS[id].y / VB_H) * 100}%`,
});

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
      { threshold: 0.3 }
    );
    io.observe(el);
    // IO does not fire in a non-rendering tab; without this the section
    // would sit on Overview forever.
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
  if (live) ph.steps.slice(0, step + 1).forEach((s) => s.light && arr(s.light).forEach((e) => lit.add(e)));
  const rev = live ? !!ph.steps[step]?.reverse : false;
  const focused = live ? arr(ph.steps[step]?.focus ?? []) : [];

  const state = (id: NodeId) => {
    if (overview) return "";
    if (ph.active.includes(id)) return "on" + (focused.includes(id) ? " focus" : "");
    return "off";
  };

  const railPct = overview
    ? 0
    : (phase - 1 + (done ? 1 : (step + 1) / Math.max(1, ph.steps.length))) / 3;

  return (
    <div className={`izf${allow ? " izf-allow" : ""}`} ref={rootRef}>
      {/* ---------- step nav: icon chip + label, reads as a navbar ---------- */}
      <div className="izf-rail" role="tablist" aria-label="Flow phases">
        <span className="izf-rail-track" aria-hidden="true">
          <span className="izf-rail-fill" style={{ transform: `scaleX(${railPct})` }} />
        </span>
        {RAIL.map((r, i) => (
          <button
            key={r.label}
            role="tab"
            aria-selected={phase === i}
            className={`izf-seg${phase === i ? " on" : ""}${phase > i ? " past" : ""}`}
            onClick={() => goPhase(i)}
          >
            <span className="izf-seg-ic" aria-hidden="true">
              {phase > i ? IcCheck : r.icon}
            </span>
            <span className="izf-seg-l">{r.label}</span>
          </button>
        ))}
      </div>

      <div className="izf-body">
        {/* ---------- the diagram ---------- */}
        <div className="izf-plate">
          <svg className="izf-wires" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden="true">
            {EDGE_ORDER.map((id) => (
              <path key={id} className="izf-wire" d={EDGES[id].d} />
            ))}
            {Array.from(lit).map((id) => (
              <path key={`${phase}-${id}`} className="izf-wire-lit" d={EDGES[id].d} />
            ))}
            {/* travelling packet rides the first lit wire only, so the eye
                has one thing to follow rather than several at once */}
            {Array.from(lit).slice(0, 1).map((id) => (
              <rect
                key={`p-${phase}-${id}`}
                className={`izf-pkt${rev ? " rev" : ""}`}
                x={-5}
                y={-5}
                width={10}
                height={10}
                style={{ offsetPath: `path('${EDGES[id].d}')` } as CSSProperties}
              />
            ))}
            {/* port nubs */}
            {EDGE_ORDER.flatMap((id) =>
              EDGES[id].ports.map(([x, y], k) => (
                <rect
                  key={`${id}-${k}`}
                  className={`izf-port${lit.has(id) ? " on" : ""}`}
                  x={x - 4}
                  y={y - 4}
                  width={8}
                  height={8}
                />
              ))
            )}
          </svg>

          <div className={`izf-node izf-mfa ${state("mfa")}`} style={nodeStyle("mfa")}>
            <span className="izf-ic">{IcShieldCheck}</span>
            <b>MFA</b>
          </div>

          <div className={`izf-node izf-controller ${state("controller")}`} style={nodeStyle("controller")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/instasafe-mark-color.svg" alt="" className="izf-mark" />
            <b>Controller</b>
          </div>

          <div className={`izf-node izf-stack izf-identity ${state("identity")}`} style={nodeStyle("identity")}>
            <b>Identity</b>
            <span className="izf-logos">
              {IDP.map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={l.alt} src={l.src} alt={l.alt} />
              ))}
            </span>
          </div>

          <div className={`izf-node izf-user ${state("user")}`} style={nodeStyle("user")}>
            <span className="izf-ic">{IcUser}</span>
            <b>Alen Joseph</b>
          </div>

          <div className={`izf-node izf-gateway ${state("gateway")}`} style={nodeStyle("gateway")}>
            <span className="izf-ic">{IcGate}</span>
            <b>Gateway</b>
          </div>

          <div className={`izf-node izf-stack izf-cloud ${state("cloud")}`} style={nodeStyle("cloud")}>
            <b>Cloud platforms</b>
            <span className="izf-logos big">
              {CLOUD.map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={l.alt} src={l.src} alt={l.alt} />
              ))}
            </span>
          </div>

          <div className={`izf-node izf-stack izf-saas ${state("saas")}`} style={nodeStyle("saas")}>
            <b>SaaS apps</b>
            <span className="izf-logos big">
              {SAAS.map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={l.alt} src={l.src} alt={l.alt} />
              ))}
            </span>
          </div>
        </div>

        {/* ---------- narration, beside the diagram ---------- */}
        <div className="izf-narr" aria-live="polite">
          <div>
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
          {/* Phone-only step controls — CSS hides this above 1000px, where
              the tab rail above the diagram already does the job. */}
          <div className="izf-nav">
            <button
              className="izf-btn"
              onClick={() => goPhase(phase - 1)}
              disabled={phase === 0}
              aria-label="Previous phase"
            >
              {IcPrev} Back
            </button>
            <button
              className="izf-btn"
              onClick={() => goPhase(phase + 1)}
              disabled={phase === PHASES.length - 1}
              aria-label="Next phase"
            >
              Next {IcNext}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
