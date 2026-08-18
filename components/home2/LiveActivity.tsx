"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  SignIn, ArrowSquareOut, Laptop, Prohibit, Key, WarningCircle, LockKey,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   C-new · Live Activity — text left, two screens right.
   Big screen  : access-analytics graph that fills over ONE
                 pass of the event script, then freezes.
   Small screen: draggable live feed that loops the same
                 event script INDEFINITELY.
   The "{user} failed to log in" event is scripted a few ticks
   before "{user} blocked — multiple login failures" so the
   anomaly story reads causally. Sample data only — no real
   IPs, domains or customer names.
   ============================================================ */

const TICK_MS = 1900;
const FEED_CAP = 6;

type EvtType = "login" | "access" | "device" | "denied" | "request" | "failed" | "blocked";
type Bump = "allowed" | "blocked" | "pending";

interface Evt { type: EvtType; actor?: string; mfa?: string; app?: string; device?: string; }

/* scripted sequence — multiple users; dave.k fails (#4) then is blocked (#9), denied again (#13) */
const EVENTS: Evt[] = [
  { type: "login",   actor: "arjun.m",       mfa: "Push" },
  { type: "access",  actor: "sophia.s",       app: "Billing Portal" },
  { type: "request", actor: "rohan.d",       app: "DevOps Cloud" },
  { type: "failed",  actor: "dave.k" },
  { type: "device",  device: "MacBook-RD-05" },
  { type: "access",  actor: "neha.r",        app: "Reports DB" },
  { type: "denied",  actor: "contractor-07", app: "Finance RDP" },
  { type: "login",   actor: "sara.l",        mfa: "Hardware key" },
  { type: "blocked", actor: "dave.k" },
  { type: "access",  actor: "arjun.m",       app: "Code Server" },
  { type: "request", actor: "sophia.s",       app: "HR System" },
  { type: "login",   actor: "rohan.d",       mfa: "Biometric" },
  { type: "denied",  actor: "dave.k",        app: "Billing Portal" },
  { type: "device",  device: "WIN-NEH-09" },
  { type: "access",  actor: "sara.l",        app: "DevOps Cloud" },
  { type: "login",   actor: "neha.r",        mfa: "TOTP" },
];

interface Meta { icon: Icon; tone: "ok" | "info" | "pending" | "warn" | "deny"; bump: Bump; text: ReactNode; }

function meta(e: Evt): Meta {
  const A = <b className="lf-actor">{e.actor}</b>;
  const M = <span className="lf-mono">{e.mfa}</span>;
  const P = <span className="lf-mono lf-app">{e.app}</span>;
  const D = <span className="lf-mono">{e.device}</span>;
  switch (e.type) {
    case "login":   return { icon: SignIn,        tone: "ok",      bump: "allowed", text: <>{A} logged in via {M}</> };
    case "access":  return { icon: ArrowSquareOut, tone: "info",    bump: "allowed", text: <>{A} accessed {P}</> };
    case "device":  return { icon: Laptop,        tone: "pending", bump: "pending", text: <>{D} added — pending approval</> };
    case "denied":  return { icon: Prohibit,      tone: "deny",    bump: "blocked", text: <>{A} was denied {P}</> };
    case "request": return { icon: Key,           tone: "warn",    bump: "pending", text: <>{A} requested access to {P}</> };
    case "failed":  return { icon: WarningCircle,  tone: "warn",    bump: "blocked", text: <>{A} failed to log in</> };
    case "blocked": return { icon: LockKey,       tone: "deny",    bump: "blocked", text: <>{A} blocked — multiple login failures</> };
  }
}

interface FeedItem extends Meta { id: number; }

/* ---- cumulative series (base + one point per event) ---- */
const BASE = { allowed: 6, blocked: 1, pending: 2 };
function buildFull() {
  const t = { ...BASE };
  const allowed = [t.allowed], blocked = [t.blocked], pending = [t.pending];
  EVENTS.forEach((e) => {
    t[meta(e).bump] += 1;
    allowed.push(t.allowed); blocked.push(t.blocked); pending.push(t.pending);
  });
  return { allowed, blocked, pending };
}
const FULL = buildFull();
const Y_MAX = Math.max(...FULL.allowed, ...FULL.blocked, ...FULL.pending) + 2;
const X_DEN = EVENTS.length; // points span 0..EVENTS.length

/* ---- chart geometry ---- */
const CW = 520, CH = 230, PAD_L = 30, PAD_R = 12, PAD_T = 14, PAD_B = 26;
const INNER_W = CW - PAD_L - PAD_R;
const INNER_H = CH - PAD_T - PAD_B;
const px = (i: number) => PAD_L + (i / X_DEN) * INNER_W;
const py = (v: number) => PAD_T + INNER_H - (v / Y_MAX) * INNER_H;

function linePath(arr: number[]) {
  return arr.map((v, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
}
function areaPath(arr: number[]) {
  if (arr.length === 0) return "";
  const top = arr.map((v, i) => `L${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
  return `M${px(0).toFixed(1)},${(PAD_T + INNER_H).toFixed(1)} ${top} L${px(arr.length - 1).toFixed(1)},${(PAD_T + INNER_H).toFixed(1)} Z`;
}

function Chart({ series, done }: { series: typeof FULL; done: boolean }) {
  const last = series.allowed.length - 1;
  const grid = [0, 0.25, 0.5, 0.75, 1];
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="lf-chart" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Live access analytics — allowed, blocked and pending events over time">
      <defs>
        <linearGradient id="lf-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--allow)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--allow)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines + Y labels */}
      {grid.map((g) => {
        const y = PAD_T + INNER_H - g * INNER_H;
        return (
          <g key={g}>
            <line x1={PAD_L} y1={y} x2={CW - PAD_R} y2={y} className="lf-grid" />
            <text x={PAD_L - 7} y={y + 3} className="lf-axis" textAnchor="end">{Math.round(g * Y_MAX)}</text>
          </g>
        );
      })}
      {/* allowed area */}
      <path d={areaPath(series.allowed)} fill="url(#lf-area)" />
      {/* lines */}
      <path d={linePath(series.pending)} className="lf-ln lf-ln-pending" />
      <path d={linePath(series.blocked)} className="lf-ln lf-ln-blocked" />
      <path d={linePath(series.allowed)} className="lf-ln lf-ln-allowed" />
      {/* leading pulse dot (only while still streaming) */}
      {!done && last >= 0 && (
        <circle cx={px(last)} cy={py(series.allowed[last])} r={4} className="lf-pulse" />
      )}
      {last >= 0 && (
        <circle cx={px(last)} cy={py(series.allowed[last])} r={2.6} className="lf-head" />
      )}
    </svg>
  );
}

/* `headless` drops the built-in eyebrow+H2 so a page that already wrote a
   section header does not stack two headers on one section. */
export function LiveActivity({ headless = false }: { headless?: boolean } = {}) {
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [feed, setFeed] = useState<FeedItem[]>(() =>
    reduced ? EVENTS.slice(0, FEED_CAP).map((e, i) => ({ id: i, ...meta(e) })).reverse() : []
  );
  const [series, setSeries] = useState<typeof FULL>(() =>
    reduced ? FULL : { allowed: [BASE.allowed], blocked: [BASE.blocked], pending: [BASE.pending] }
  );
  const [done, setDone] = useState(reduced);
  const [streamed, setStreamed] = useState(reduced ? EVENTS.length : 0);
  const [inView, setInView] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const idx = useRef(0);
  const tick = useRef(0);
  const idc = useRef(1000);
  const totals = useRef({ ...BASE });

  // start once visible
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the loop
  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => {
      const e = EVENTS[idx.current % EVENTS.length];
      idx.current += 1;
      const t = tick.current;
      tick.current += 1;

      setFeed((f) => [{ id: idc.current++, ...meta(e) }, ...f].slice(0, FEED_CAP));
      setStreamed((n) => n + 1);

      if (t < EVENTS.length) {
        totals.current[meta(e).bump] += 1;
        const snap = { ...totals.current };
        setSeries((s) => ({
          allowed: [...s.allowed, snap.allowed],
          blocked: [...s.blocked, snap.blocked],
          pending: [...s.pending, snap.pending],
        }));
        if (t + 1 >= EVENTS.length) setDone(true);
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduced, inView]);

  /* ---- draggable small screen ---- */
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const dragging = useRef(false);
  const origin = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  function down(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true; setDrag(true);
    origin.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  }
  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setPos({ x: origin.current.px + e.clientX - origin.current.mx, y: origin.current.py + e.clientY - origin.current.my });
  }
  function up() { dragging.current = false; setDrag(false); }

  return (
    <div className="lf" ref={rootRef}>
      {/* LEFT — copy */}
      <div className="lf-text">
        {!headless && (
          <>
            <span className="iz-ey">Real-time visibility</span>
            <h2 className="iz-h2">Watch every access decision, <em>the moment it happens</em>.</h2>
          </>
        )}
        <p className="lf-lead">
          Every login, request and block streams to one live feed — and straight to your SIEM. When a user trips
          repeated failures, InstaSafe spots the pattern and locks the account before it becomes a breach.
        </p>
        <ul className="lf-points">
          <li><span className="lf-dot ok" /> Live audit of every allow and deny</li>
          <li><span className="lf-dot warn" /> Anomaly detection on failed-login bursts</li>
          <li><span className="lf-dot pending" /> Device approvals and access requests in one queue</li>
        </ul>
        <a className="lf-cta" href="/zero-trust-network-access">Explore the dashboard
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>

      {/* RIGHT — stage */}
      <div className="lf-stage">
        {/* big screen */}
        <div className="lf-big">
          <div className="lf-big-bar">
            <span className="lf-dots"><i /><i /><i /></span>
            <span className="lf-big-title">Access analytics</span>
            <span className={`lf-status ${done ? "snap" : "live"}`}>
              <i />{done ? "Snapshot · last hour" : "Live"}
            </span>
          </div>
          <div className="lf-big-body">
            <div className="lf-stats">
              <span className="lf-stat"><b>{series.allowed[series.allowed.length - 1]}</b> allowed</span>
              <span className="lf-stat deny"><b>{series.blocked[series.blocked.length - 1]}</b> blocked</span>
              <span className="lf-stat warn"><b>{series.pending[series.pending.length - 1]}</b> pending</span>
            </div>
            <Chart series={series} done={done} />
            <div className="lf-legend">
              <span><i className="lf-sw allowed" /> Allowed</span>
              <span><i className="lf-sw blocked" /> Blocked</span>
              <span><i className="lf-sw pending" /> Pending</span>
            </div>
          </div>
        </div>

        {/* small draggable screen */}
        <div className="lf-small" style={{ transform: `translate(${pos.x}px,${pos.y}px)` }}>
          <div className={`lf-small-bar${drag ? " grabbing" : ""}`} onPointerDown={down} onPointerMove={move} onPointerUp={up}>
            <span className="lf-grip" aria-hidden="true" />
            <span className="lf-live-lbl"><i /> Live activity</span>
            <span className="lf-count">{streamed}</span>
          </div>
          <div className="lf-feed">
            {feed.length === 0 && <div className="lf-feed-wait">Waiting for events…</div>}
            {feed.map((it) => {
              const I = it.icon;
              return (
                <div className={`lf-item tone-${it.tone}`} key={it.id}>
                  <span className="lf-ic"><I weight="fill" /></span>
                  <span className="lf-txt">{it.text}</span>
                </div>
              );
            })}
          </div>
          <div className="lf-small-foot">{streamed} events streamed · drag me</div>
        </div>
      </div>
    </div>
  );
}
