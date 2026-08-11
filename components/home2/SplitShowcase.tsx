"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Globe, Lock, ShieldCheck, CheckCircle, XCircle, Gauge, ListChecks,
  ArrowRight, Desktop,
} from "@phosphor-icons/react";

/* ============================================================
   C-new · Split Showcase — outer browser console, static left
   hero, nested mini-console right that shuffles its screen deck.

   Shuffle fix: orderRef keeps interval closure stale-free;
   exitingId animates the departing panel to EXIT_D at z N+1
   (stays on top during exit) before the order rotates.
   ============================================================ */

const SHUFFLE_MS = 3200;
const EXIT_MS    = 680;

interface Screen { id: string; path: string; title: string; status: string; body: ReactNode; }

/* ---- right-panel screen bodies ------------------------------------------ */
function Dashboard() {
  return (
    <div className="spl-scr-body">
      <div className="spl-kpis">
        <div className="spl-kpi"><b>4,847</b><span>active users</span></div>
        <div className="spl-kpi"><b>34</b><span>protected apps</span></div>
        <div className="spl-kpi"><b>127</b><span className="deny">blocked today</span></div>
      </div>
      <div className="spl-spark">
        {[38,55,47,68,60,80,72,90,84,100,92,104].map((v,i) => (
          <span key={i} style={{ height: `${v}%` }} />
        ))}
      </div>
      <div className="spl-mini-rows">
        <div className="spl-mrow"><CheckCircle weight="fill" className="ok" /><span>arjun.m</span><em>billing-portal</em><i>allowed</i></div>
        <div className="spl-mrow"><XCircle weight="fill" className="deny" /><span>contractor-07</span><em>finance-rdp</em><i className="deny">blocked</i></div>
      </div>
    </div>
  );
}

function Logs() {
  const rows = [
    { ok: true,  u: "priya.s", a: "hr-system",      t: "09:42" },
    { ok: true,  u: "rohan.d", a: "code-server",    t: "09:42" },
    { ok: false, u: "ops-22",  a: "admin-panel",    t: "09:41" },
    { ok: true,  u: "neha.r",  a: "reports-db",     t: "09:41" },
    { ok: false, u: "dave.k",  a: "billing-portal", t: "09:40" },
  ];
  return (
    <div className="spl-scr-body">
      <div className="spl-table">
        <div className="spl-thead"><span /><span>User</span><span>Application</span><span>Status</span><span>Time</span></div>
        {rows.map((r,i) => (
          <div className="spl-trow" key={i}>
            {r.ok ? <CheckCircle weight="fill" className="ok" /> : <XCircle weight="fill" className="deny" />}
            <span>{r.u}</span><em>{r.a}</em>
            <i className={r.ok ? "ok" : "deny"}>{r.ok ? "allowed" : "blocked"}</i>
            <u>{r.t}</u>
          </div>
        ))}
      </div>
    </div>
  );
}

function Devices() {
  const d = [
    { h: "MacBook-ARJ-01", s: 95, ok: [true,true,true]  },
    { h: "WIN-CTR-07",     s: 62, ok: [true,false,true] },
    { h: "MacBook-RD-05",  s: 97, ok: [true,true,true]  },
  ];
  return (
    <div className="spl-scr-body">
      {d.map((x,i) => (
        <div className="spl-dev" key={i}>
          <Desktop weight="regular" className="spl-dev-ic" />
          <span className="spl-dev-host">{x.h}</span>
          <span className="spl-dev-dots">{x.ok.map((o,j) => <i key={j} className={o ? "ok" : "warn"} />)}</span>
          <span className={`spl-dev-score ${x.s >= 80 ? "ok" : "warn"}`}>{x.s}</span>
        </div>
      ))}
      <div className="spl-dev-legend"><CheckCircle weight="fill" className="ok" /> encryption · patches · antivirus</div>
    </div>
  );
}

function Policies() {
  const p = [
    { n: "Finance — Employees only", apps: ["billing-portal","finance-rdp"] },
    { n: "Code access — Developers",  apps: ["code-server"] },
  ];
  return (
    <div className="spl-scr-body">
      {p.map((x,i) => (
        <div className="spl-pol" key={i}>
          <div className="spl-pol-h"><Lock weight="fill" /><span>{x.n}</span><i className="ok">Active</i></div>
          <div className="spl-pol-apps">{x.apps.map(a => <em key={a}>{a}</em>)}</div>
          <div className="spl-pol-cond"><CheckCircle weight="fill" className="ok" /> Device posture ≥ 80 · MFA required</div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const SCREENS: Screen[] = [
  { id: "dash",    path: "/dashboard",      title: "Live access, at a glance",     status: "Live",      body: <Dashboard /> },
  { id: "logs",    path: "/access-logs",    title: "Every decision, logged",       status: "Streaming", body: <Logs /> },
  { id: "devices", path: "/device-posture", title: "Only healthy devices connect", status: "25 checks", body: <Devices /> },
  { id: "policy",  path: "/policies",       title: "Rules around every app",       status: "12 rules",  body: <Policies /> },
];

const N = SCREENS.length;

/* depth positions for the stacked panels (front = index 0) */
const DEPTH = [
  { x: 0,  y: 0,  s: 1,     o: 1,    blur: 0   },
  { x: 24, y: 12, s: 0.965, o: 1,    blur: 0   },
  { x: 46, y: 23, s: 0.93,  o: 0.78, blur: 1.6 },
  { x: 64, y: 32, s: 0.905, o: 0.5,  blur: 2.6 },
];
/* exit position — front panel animates here (opacity→0) before order rotates */
const EXIT_D = { x: 88, y: 48, s: 0.87, o: 0, blur: 3.5 };

const SCR_ICON: Record<string, ReactNode> = {
  dash:    <Gauge weight="regular" />,
  logs:    <ListChecks weight="regular" />,
  devices: <ShieldCheck weight="regular" />,
  policy:  <Lock weight="regular" />,
};

export function SplitShowcase() {
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [order,     setOrder]     = useState(() => SCREENS.map((_, i) => i));
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [paused,    setPaused]    = useState(false);
  const [inView,    setInView]    = useState(false);
  const rootRef  = useRef<HTMLDivElement>(null);
  const orderRef = useRef(order);
  orderRef.current = order; /* keep interval closure stale-free */

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || !inView) return;
    let tid: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      /* 1. mark current front as exiting (animates to EXIT_D at z N+1) */
      const frontId = SCREENS[orderRef.current[0]].id;
      setExitingId(frontId);
      /* 2. after CSS transition completes, rotate order + clear exit */
      tid = setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setExitingId(null);
      }, EXIT_MS);
    }, SHUFFLE_MS);
    return () => { clearInterval(id); clearTimeout(tid); };
  }, [reduced, paused, inView]);

  const front = SCREENS[order[0]];

  return (
    <div
      className="spl"
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* orange center seam */}
      <span className="spl-divider" aria-hidden="true" />

      {/* split address bar */}
      <div className="spl-urlbar">
        <span className="spl-url-left"><Globe weight="regular" /> instasafe.com</span>
        <span className="spl-url-right" key={front.path}>{front.path}</span>
      </div>

      {/* outer browser console — dots only, no brand text */}
      <div className="spl-window">
        <div className="spl-chrome">
          <span className="spl-dots"><i /><i /><i /></span>
        </div>

        <div className="spl-body">

          {/* LEFT — static hero */}
          <div className="spl-left">
            <span className="spl-ey">InstaSafe ZTNA</span>
            <h3 className="spl-hl">One secure front door to <em>every app</em>.</h3>
            <p className="spl-sub">Give the right people fast access — and keep everything else invisible to the internet.</p>
            <div className="spl-cta-row">
              <a className="spl-btn primary" href="/contact-us">Book a demo</a>
              <a className="spl-btn ghost" href="/zero-trust-network-access">See how it works <ArrowRight weight="bold" /></a>
            </div>
            <div className="spl-trust">
              <span className="spl-trust-lbl">Trusted across BFSI, government and IT</span>
              <div className="spl-logos">
                {["#0EA5E9,#2563EB","#22C55E,#0F766E","#F59E0B,#EA580C","#8B5CF6,#4F46E5"].map((g,i) => (
                  <span key={i} className="spl-logo" style={{ background: `linear-gradient(135deg,${g})` }} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — nested mini-console with the shuffling deck inside */}
          <div className="spl-rightstack">

            {/* inner console chrome — shows active screen info */}
            <div className="spl-right-chrome">
              <span className="spl-dots sm"><i /><i /><i /></span>
              <span className="spl-right-tab">
                <span className="spl-right-ic">{SCR_ICON[front.id]}</span>
                <span className="spl-right-title" key={front.id}>{front.title}</span>
              </span>
              <span className="spl-panel-status"><i />{front.status}</span>
            </div>

            {/* panel deck — panels are absolute within this container */}
            <div className="spl-panel-area">
              {order.map((scrIdx, depth) => {
                const s = SCREENS[scrIdx];
                const isExiting = s.id === exitingId;
                const d = isExiting ? EXIT_D : DEPTH[Math.min(depth, DEPTH.length - 1)];
                return (
                  <div
                    className={`spl-panel${depth === 0 && !isExiting ? " front" : ""}${isExiting ? " exiting" : ""}`}
                    key={s.id}
                    style={{
                      transform: `translate(${d.x}px,${d.y}px) scale(${d.s})`,
                      opacity: d.o,
                      filter: d.blur ? `blur(${d.blur}px)` : "none",
                      /* exiting panel stays on top so it can animate out over the deck */
                      zIndex: isExiting ? N + 1 : N - depth,
                    }}
                    aria-hidden={depth !== 0}
                  >
                    <div className="spl-panel-body">{s.body}</div>
                  </div>
                );
              })}

              <div className="spl-progress" aria-hidden="true">
                {SCREENS.map((s, i) => <i key={s.id} className={order[0] === i ? "on" : ""} />)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
