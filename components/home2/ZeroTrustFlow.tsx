"use client";

import { useEffect, useRef, useState, type JSX, type CSSProperties } from "react";

/* ============================================================
   Zero Trust Authentication Flow — signature interactive.
   Recreates the old site's flow animation with a clarifying UI:
   the full SDP architecture is always visible, but only ONE
   communication path lights up at a time, narrated step by step.

   Two planes:
     CONTROL PLANE  — MFA · Controller · Identity   (decides access)
     DATA PLANE     — User · Gateway · Applications  (carries traffic)

   Phase 1  Authenticate  user → MFA → Controller
   Phase 2  Authorize     Controller ↔ Identity, Controller ↓ Gateway
   Phase 3  Connect        User → Gateway → Applications  (+ return)
   ============================================================ */

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

/* ---- geometry (viewBox 904 × 470) ---- */
const NODES: Record<NodeId, { cx: number; cy: number; label: string; sub: string }> = {
  user: { cx: 150, cy: 372, label: "User", sub: "person + device" },
  mfa: { cx: 298, cy: 120, label: "MFA", sub: "multi-factor" },
  controller: { cx: 512, cy: 120, label: "Controller", sub: "policy engine" },
  identity: { cx: 732, cy: 120, label: "Identity", sub: "directory · IdP" },
  gateway: { cx: 512, cy: 372, label: "Gateway", sub: "zero-trust gw" },
  apps: { cx: 748, cy: 372, label: "Applications", sub: "your resources" },
};

const EDGE_ORDER: EdgeId[] = [
  "user-mfa",
  "mfa-controller",
  "controller-identity",
  "controller-gateway",
  "user-gateway",
  "gateway-apps",
];
const EDGES: Record<EdgeId, { d: string; lx: number; ly: number; anc: "start" | "middle" | "end"; label: string }> = {
  "user-mfa": { d: "M178 330 L268 162", lx: 205, ly: 252, anc: "end", label: "device auth" },
  "mfa-controller": { d: "M365 120 L445 120", lx: 405, ly: 108, anc: "middle", label: "auth request" },
  "controller-identity": { d: "M579 120 L665 120", lx: 622, ly: 108, anc: "middle", label: "identity lookup" },
  "controller-gateway": { d: "M512 162 L512 330", lx: 524, ly: 250, anc: "start", label: "authorize" },
  "user-gateway": { d: "M217 372 L445 372", lx: 331, ly: 393, anc: "middle", label: "secure tunnel" },
  "gateway-apps": { d: "M579 372 L681 372", lx: 630, ly: 393, anc: "middle", label: "secure access" },
};

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

const FACTS = [
  {
    k: "Phase 1 · Authenticate",
    t: "User identity and device are verified by MFA before any connection exists.",
    n: "8 auth profiles · 6 MFA methods",
  },
  {
    k: "Phase 2 · Authorize",
    t: "The Controller checks the directory and evaluates policy, then programs the Gateway.",
    n: "21 policy combinations · 25 device checks",
  },
  {
    k: "Phase 3 · Connect",
    t: "One encrypted tunnel to one application. No network access, no lateral movement.",
    n: "7 app types · per-session",
  },
];

const TAB_LABELS = ["Overview", "1 · Authenticate", "2 · Authorize", "3 · Connect"];

/* ---- node icons (24×24, stroke = currentColor) ---- */
const ICONS: Record<NodeId, JSX.Element> = {
  user: (
    <>
      <circle cx={12} cy={8} r={3.4} />
      <path d="M5.5 19a6.5 6 0 0 1 13 0" />
    </>
  ),
  mfa: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 7.4-7 8.8C8 18.4 5 15.4 5 11V6z" />
      <path d="M9 11.5l2 2 4-4" />
    </>
  ),
  controller: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
      <circle cx={9} cy={7} r={1.8} fill="currentColor" stroke="none" />
      <circle cx={15} cy={12} r={1.8} fill="currentColor" stroke="none" />
      <circle cx={8} cy={17} r={1.8} fill="currentColor" stroke="none" />
    </>
  ),
  identity: (
    <>
      <rect x={3} y={5} width={18} height={14} rx={2} />
      <circle cx={8.5} cy={11} r={2.2} />
      <path d="M5.5 16.2a3.2 3.2 0 0 1 6 0" />
      <path d="M14 10h4M14 13.5h4" />
    </>
  ),
  gateway: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 7.4-7 8.8C8 18.4 5 15.4 5 11V6z" />
      <path d="M8.5 11.5h6M12.5 9l3 2.5-3 2.5" />
    </>
  ),
  apps: (
    <>
      <rect x={4} y={4} width={7} height={7} rx={1.5} />
      <rect x={13} y={4} width={7} height={7} rx={1.5} />
      <rect x={4} y={13} width={7} height={7} rx={1.5} />
      <rect x={13} y={13} width={7} height={7} rx={1.5} />
    </>
  ),
};

/* ---- control icons ---- */
const IcPlay = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 5l12 7-12 7z" />
  </svg>
);
const IcPause = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x={6} y={5} width={4} height={14} rx={1} />
    <rect x={14} y={5} width={4} height={14} rx={1} />
  </svg>
);
const IcPrev = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 6l-6 6 6 6" />
  </svg>
);
const IcNext = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 6l6 6-6 6" />
  </svg>
);
const IcSkip = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M5 5l9 7-9 7z" />
    <rect x={16} y={5} width={3} height={14} rx={1} />
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

function NodeG({ id, state, allow }: { id: NodeId; state: string; allow: boolean }) {
  const n = NODES[id];
  const x = n.cx - 67;
  const y = n.cy - 42;
  return (
    <g className={`ztf-node ${state} ${allow ? "allow" : ""}`}>
      <rect className="ztf-ring" x={x - 7} y={y - 7} width={148} height={98} rx={18} />
      <rect className="ztf-node-box" x={x} y={y} width={134} height={84} rx={14} />
      <g
        className="ztf-node-ic"
        transform={`translate(${n.cx - 12} ${n.cy - 36})`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[id]}
      </g>
      <text className="ztf-node-name" x={n.cx} y={n.cy + 12}>
        {n.label}
      </text>
      <text className="ztf-node-sub" x={n.cx} y={n.cy + 29}>
        {n.sub}
      </text>
    </g>
  );
}

export function ZeroTrustFlow() {
  const [phase, setPhase] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [facts, setFacts] = useState(false);
  const [done, setDone] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* sequential stepper — narrates the current phase, chains when autoplaying */
  useEffect(() => {
    if (done) {
      setStep(PHASES[3].steps.length - 1);
      return;
    }
    if (facts || phase === 0) {
      setStep(0);
      return;
    }
    const ph = PHASES[phase];
    if (reduced.current) {
      setStep(ph.steps.length - 1);
      if (playing) {
        const t = setTimeout(() => {
          if (phase < 3) setPhase((p) => p + 1);
          else {
            setPlaying(false);
            setDone(true);
          }
        }, 1100);
        return () => clearTimeout(t);
      }
      return;
    }
    setStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < ph.steps.length; i++) {
      timers.push(setTimeout(() => setStep(i), i * STEP_MS));
    }
    if (playing) {
      const total = ph.steps.length * STEP_MS + 700;
      timers.push(
        setTimeout(() => {
          if (phase < 3) setPhase((p) => p + 1);
          else {
            setPlaying(false);
            setDone(true);
          }
        }, total)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [phase, playing, facts, done]);

  /* ---- controls ---- */
  const start = () => {
    setFacts(false);
    setDone(false);
    setPhase(done || phase === 0 ? 1 : phase);
    setPlaying(true);
  };
  const toggle = () => (playing ? setPlaying(false) : start());
  const prev = () => {
    setFacts(false);
    setDone(false);
    setPlaying(false);
    setPhase((p) => Math.max(0, p - 1));
  };
  const next = () => {
    setFacts(false);
    setDone(false);
    setPlaying(false);
    setPhase((p) => Math.min(3, p + 1));
  };
  const restart = () => {
    setFacts(false);
    setDone(false);
    setPhase(1);
    setPlaying(true);
  };
  const skip = () => {
    setPlaying(false);
    setDone(false);
    setFacts(true);
  };
  const goPhase = (i: number) => {
    setFacts(false);
    setDone(false);
    setPlaying(false);
    setPhase(i);
  };

  /* ---- derived view state ---- */
  const ph = PHASES[phase];
  const overview = phase === 0 && !facts;
  const allowPhase = !!ph.allow && !facts && phase !== 0;
  const live = phase > 0 && !facts;

  const litEdges = new Set<EdgeId>();
  if (live) ph.steps.slice(0, step + 1).forEach((s) => s.light && litEdges.add(s.light));
  const rev = live ? !!ph.steps[step]?.reverse : false;

  const phaseEdgeIds: EdgeId[] = facts
    ? []
    : live
    ? Array.from(new Set(ph.steps.filter((s) => s.light).map((s) => s.light as EdgeId)))
    : EDGE_ORDER;

  const nodeState = (id: NodeId): string => {
    if (facts || phase === 0) return "";
    if (ph.active.includes(id)) return "is-active" + (ph.steps[step]?.focus === id ? " is-focus" : "");
    return "is-muted";
  };

  const liveLabel = facts ? "Summary" : done ? "Session open" : overview ? "Ready" : `Phase ${phase}/3`;

  return (
    <div className="ztf">
      <div className="ztf-head">
        <span className="iz-ey" style={{ justifyContent: "center", display: "inline-flex" }}>
          How Zero Trust access works
        </span>
        <h2 className="iz-h2">
          Watch one request <em>earn its way in</em>.
        </h2>
        <p className="ztf-sub">
          Most diagrams show every wire at once. This one lights only the path that matters — phase by phase — so the
          whole flow actually makes sense.
        </p>
      </div>

      <div className="ztf-shell">
        <div className="ztf-bar">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span className="ttl">zero-trust-access-flow</span>
          <span className={`live ${done ? "done" : ""}`}>
            <i />
            {liveLabel}
          </span>
        </div>

        <div className="ztf-tabs" role="tablist" aria-label="Flow phases">
          {TAB_LABELS.map((lbl, i) => (
            <button
              key={lbl}
              role="tab"
              aria-selected={!facts && phase === i}
              className={`ztf-tab ${!facts && phase === i ? "on" : ""}`}
              onClick={() => goPhase(i)}
            >
              {lbl}
            </button>
          ))}
        </div>

        <div className="ztf-stage">
          <div className="ztf-canvas">
            <svg
              viewBox="0 0 904 470"
              role="img"
              aria-label="Zero Trust access architecture. In the control plane, the user and device authenticate through MFA to the Controller, which verifies identity against the directory and authorizes the Gateway. In the data plane, the user then opens one secure tunnel through the Gateway to a single application, while every other resource stays unreachable."
            >
              <defs>
                <marker id="ztfArrO" markerWidth="7" markerHeight="7" refX="5.2" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6 z" fill="var(--orange)" />
                </marker>
                <marker id="ztfArrA" markerWidth="7" markerHeight="7" refX="5.2" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6 z" fill="var(--allow)" />
                </marker>
              </defs>

              {/* planes */}
              <rect className="ztf-lane" x={44} y={46} width={816} height={130} rx={16} />
              <rect className="ztf-lane" x={44} y={300} width={816} height={130} rx={16} />
              <text className="ztf-lane-lbl" x={60} y={66}>
                CONTROL PLANE · DECIDES ACCESS
              </text>
              <text className="ztf-lane-lbl" x={60} y={320}>
                DATA PLANE · CARRIES TRAFFIC
              </text>

              {/* base architecture (always present) */}
              {EDGE_ORDER.map((id) => (
                <path key={id} className="ztf-edge-base" d={EDGES[id].d} />
              ))}

              {/* edge labels for the current phase */}
              {phaseEdgeIds.map((id) => {
                const e = EDGES[id];
                const on = litEdges.has(id);
                return (
                  <text
                    key={id}
                    className={`ztf-elabel ${on ? "on" : ""} ${on && allowPhase ? "allow" : ""}`}
                    x={e.lx}
                    y={e.ly}
                    textAnchor={e.anc}
                  >
                    {e.label}
                  </text>
                );
              })}

              {/* lit paths + travelling packets */}
              {Array.from(litEdges).map((id) => {
                const e = EDGES[id];
                return (
                  <g key={`${phase}-${id}`} className="ztf-edge-grp">
                    <path
                      className={`ztf-edge-live ${allowPhase ? "allow" : ""}`}
                      d={e.d}
                      markerEnd={allowPhase ? "url(#ztfArrA)" : "url(#ztfArrO)"}
                    />
                    <circle
                      r={4.5}
                      className={`ztf-packet ${allowPhase ? "allow" : ""} ${rev ? "rev" : ""}`}
                      style={{ offsetPath: `path('${e.d}')` } as CSSProperties}
                    />
                  </g>
                );
              })}

              {/* nodes */}
              {(Object.keys(NODES) as NodeId[]).map((id) => (
                <NodeG key={id} id={id} state={nodeState(id)} allow={allowPhase} />
              ))}
            </svg>
          </div>

          <div className={`ztf-narr ${allowPhase ? "allow" : ""}`} aria-live="polite">
            {facts ? (
              <>
                <span className="tag dim">Summary</span>
                <h4>Three phases, the facts</h4>
                <div className="ztf-facts">
                  {FACTS.map((f) => (
                    <div key={f.k} className="ztf-fact">
                      <div className="fk">{f.k}</div>
                      <div className="ft">{f.t}</div>
                      <div className="fn">{f.n}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : overview ? (
              <>
                <span className="tag dim">{ph.tag}</span>
                <h4>{ph.title}</h4>
                <p className="purpose">{ph.purpose}</p>
                <p className="ztf-hint">
                  Two planes, two jobs. The <b>control plane</b> decides whether you&apos;re allowed. The{" "}
                  <b>data plane</b> only carries traffic once you are.
                </p>
                <div className="ztf-legend">
                  <span className="ztf-leg">
                    <span className="sw" />
                    control / decision path
                  </span>
                  <span className="ztf-leg">
                    <span className="sw allow" />
                    secure session (allowed)
                  </span>
                  <span className="ztf-leg">
                    <span className="sw mute" />
                    idle connection
                  </span>
                  <span className="ztf-leg">
                    <span className="sw node" />
                    active in this step
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="tag">{ph.tag}</span>
                <h4>{ph.title}</h4>
                <p className="purpose">{ph.purpose}</p>
                <ol className="ztf-steps">
                  {ph.steps.map((s, i) => (
                    <li key={s.t} className={`ztf-step ${i < step ? "past" : ""} ${i === step ? "cur" : ""}`}>
                      <span className="si">{i < step ? IcCheck : i + 1}</span>
                      <span className="st">{s.t}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </div>

        <div className="ztf-ctl">
          <button className="ztf-cbtn pri" onClick={toggle} aria-pressed={playing}>
            {playing ? IcPause : IcPlay}
            {playing ? "Pause" : "Play walkthrough"}
          </button>
          <button className="ztf-cbtn" onClick={prev} disabled={facts || phase === 0} aria-label="Previous phase">
            {IcPrev}
            Prev
          </button>
          <button className="ztf-cbtn" onClick={next} disabled={facts || phase === 3} aria-label="Next phase">
            {IcNext}
            Next
          </button>
          <span className="spacer" />
          <button className="ztf-cbtn" onClick={skip} aria-pressed={facts}>
            {IcSkip}
            Skip to facts
          </button>
          <button className="ztf-cbtn" onClick={restart} aria-label="Restart walkthrough">
            {IcReplay}
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
