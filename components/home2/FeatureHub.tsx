"use client";

import { useState, useEffect, useRef } from "react";
import {
  Fingerprint,
  Key,
  SlidersHorizontal,
  Gauge,
  ShieldCheck,
  MapPin,
  VideoCamera,
  Drop,
  EyeSlash,
  ArrowsLeftRight,
  Export,
  ListChecks,
  ShareNetwork,
  FileText,
  Lock,
  CheckCircle,
  XCircle,
  Circle,
  Square,
  SquaresFour,
  DotsNine,
  Cube,
  Hash,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   C3 · Feature Index / Constellation — 3-tab feature showcase.
     tab 0 → Identity stack (hover-interactive status cards)
     tab 1 → Zero-trust controls hub (constellation)
     tab 2 → Visibility log (draggable panel)
   Autoplay: 5.5 s per tab, pauses on hover.
   ============================================================ */

const TAB_MS = 5500;

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- center: constellation hub ---------- */
type Cell =
  | { k: "ghost"; icon: Icon }
  | { k: "feat"; label: string; icon: Icon; href: string }
  | { k: "hero" };

const ghosts: Icon[] = [Circle, SquaresFour, DotsNine, Cube, Hash, Square];
let gi = 0;
const G = (): Cell => ({ k: "ghost", icon: ghosts[gi++ % ghosts.length] });
const F = (label: string, icon: Icon, href: string): Cell => ({ k: "feat", label, icon, href });

const CELLS: Cell[] = [
  G(), G(), F("MFA", Fingerprint, "/multifactor-authentication"), F("Geo-fencing", MapPin, "/zero-trust-features/geo-binding"), G(), G(),
  G(), F("SSO", Key, "/solutions/idam-single-sign-on"), F("Device posture", ShieldCheck, "/zero-trust-features/device-posture-check"), F("SIEM export", Export, "/zero-trust-network-access"), G(), G(),
  G(), F("Per-app tunnel", ArrowsLeftRight, "/zero-trust-network-access"), { k: "hero" }, F("Risk scoring", Gauge, "/platform/iam"), G(),
  G(), F("Session recording", VideoCamera, "/zero-trust-features/session-recording"), F("Audit logs", ListChecks, "/zero-trust-network-access"), F("Conditional access", SlidersHorizontal, "/platform/iam"), G(), G(),
  G(), G(), F("Server blackening", EyeSlash, "/zero-trust-network-access"), F("Watermark", Drop, "/zero-trust-features/secure-browser"), G(), G(),
];

function HubView() {
  return (
    <div className="fh-view fh-hub">
      {CELLS.map((c, i) => {
        if (c.k === "hero") {
          return (
            <div className="fh-hero" key="hero">
              <span className="mk">
                <Lock weight="fill" />
              </span>
              <span>
                <span className="ht">InstaSafe</span>
                <span className="hs">zero-trust core</span>
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
          <a className="fh-tile feat" key={c.label} href={c.href} aria-label={c.label}>
            <span className="ti"><I weight="regular" /></span>
            <span className="tl">{c.label}</span>
          </a>
        );
      })}
    </div>
  );
}

/* ---------- left: identity stack — cards are hover-interactive ---------- */
function IdentityView() {
  return (
    <div className="fh-view fh-stack">
      <div className="fh-srow">
        <span className="si"><Key weight="regular" /></span>
        <span>
          <span className="sn">Single sign-on</span>
          <span className="ss">SAML · OAuth · OpenID</span>
        </span>
        <span className="sgrow">
          <span className="sstat">12.4K logins</span>
          <span className="fh-pill ok"><CheckCircle weight="fill" /> Active</span>
        </span>
      </div>
      <div className="fh-srow">
        <span className="si"><Fingerprint weight="regular" /></span>
        <span>
          <span className="sn">Multi-factor auth</span>
          <span className="ss">Push · TOTP · Hardware key</span>
        </span>
        <span className="sgrow">
          <span className="sstat">6 methods</span>
          <span className="fh-pill ok"><CheckCircle weight="fill" /> Active</span>
        </span>
      </div>
      <div className="fh-srow col">
        <span className="stop">
          <span className="si"><SlidersHorizontal weight="regular" /></span>
          <span>
            <span className="sn">Conditional access</span>
            <span className="ss">geo · device · time · risk</span>
          </span>
          <span className="sgrow">
            <span className="fh-pill wait"><i /> Adaptive</span>
          </span>
        </span>
        <span className="fh-rule">
          <span className="fh-rule-h">WHEN A REQUEST COMES IN</span>
          <span className="fh-rule-row">if device.posture <b>&lt; pass</b> → step-up MFA</span>
          <span className="fh-rule-row">if geo <b>∉ allowed</b> → deny</span>
        </span>
      </div>
    </div>
  );
}

/* ---------- right: visibility log — draggable panel ---------- */
const LOG = [
  { u: "anita.r",      a: "billing-portal", ok: true,  t: "09:41" },
  { u: "build-svc",    a: "code-server",    ok: true,  t: "09:41" },
  { u: "contractor-07",a: "finance-rdp",    ok: false, t: "09:41" },
  { u: "priya.m",      a: "reports-db",     ok: true,  t: "09:42" },
  { u: "ops-22",       a: "admin-panel",    ok: false, t: "09:42" },
  { u: "sarah.k",      a: "finance-app",    ok: true,  t: "09:43" },
];

function AuditView() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef(false);
  const origin = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    setIsDragging(true);
    origin.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setPos({
      x: origin.current.px + e.clientX - origin.current.mx,
      y: origin.current.py + e.clientY - origin.current.my,
    });
  }
  function onPointerUp() {
    dragging.current = false;
    setIsDragging(false);
  }

  return (
    <div className="fh-view fh-log-wrap">
      <div
        className={`fh-log${isDragging ? " dragging" : ""}`}
        style={{ transform: `translate(${pos.x}px,${pos.y}px)` }}
      >
        <div
          className="fh-log-h"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <span className="fh-drag-handle" aria-hidden="true" />
          <span className="live"><i /> Live access</span>
          <span className="exp"><Export weight="regular" /> SIEM</span>
        </div>
        <div className="fh-log-body">
          {LOG.map((r) => (
            <div className="fh-lrow" key={r.u + r.t}>
              <span className="lic" style={{ color: r.ok ? "var(--allow)" : "var(--deny)" }}>
                {r.ok ? <CheckCircle weight="fill" /> : <XCircle weight="fill" />}
              </span>
              <span className="lu">{r.u}</span>
              <span className="la">{r.a}</span>
              <span
                className={`fh-pill ${r.ok ? "ok" : ""}`}
                style={r.ok ? undefined : { background: "var(--deny-bg)", color: "var(--deny)" }}
              >
                {r.ok ? "allowed" : "denied"}
              </span>
              <span className="lt">{r.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- tabs ---------- */
export interface FeatureHubTab { icon: Icon; title: string; desc: string; href: string; }

const TABS: FeatureHubTab[] = [
  { icon: Fingerprint, title: "Identity & access",    desc: "SSO, MFA and risk-based conditional access on every request.",                          href: "/platform/iam" },
  { icon: ShareNetwork, title: "Zero-trust controls", desc: "Dozens of access controls — device, geo, session and more — around every app.",          href: "/platform" },
  { icon: FileText,    title: "Visibility & audit",   desc: "Every access event, allowed or denied, streamed live to your SIEM.",                     href: "/zero-trust-network-access" },
];

const N = TABS.length;

/* ============================================================
   CONTENT IS INJECTABLE (2026-08-13).

   The heading, the three tabs and the three views were all hardcoded,
   so the chassis — autoplaying 3-tab showcase with a progress bar and
   a stage above it — could only ever say the one thing it was born
   saying. /zero-trust-application-access needs the same chassis for
   logs, reports and exports, so all four are props now. Omit them and
   the homepage version renders exactly as before.

   `views` is an array of three nodes, indexed by tab. It is a plain
   array rather than a render prop because the stage swaps whole scenes
   and each one carries its own `key` — see the note on the stage.
   ============================================================ */
export function FeatureHub({
  eyebrow = "One platform",
  title,
  lead = "Identity, device, session and audit — pick a layer to see it in action.",
  tabs = TABS,
  views,
  initial = 1,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: string;
  tabs?: FeatureHubTab[];
  /* an array, not a 3-tuple: the chassis is driven by `tabs.length`,
     so a caller with four tabs needs four views */
  views?: React.ReactNode[];
  initial?: number;
} = {}) {
  const [tab, setTab] = useState(initial);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);

  /* THE TAB FORM IS A DESKTOP COMPOSITION — the same finding IzMfaHub
     wrote up when it hit this on the homepage, now moved onto the
     chassis so every hub gets it instead of one of them.

     The stage sits ABOVE the strip that drives it. Stacked into one
     column that inverts: you scroll past the visual to reach the
     control, tap, and the thing you changed is off-screen behind you.
     Autoplay makes it worse — the section rewrites itself while you are
     reading it, which reads as a glitch rather than a feature.

     So below 900px the same tabs become plain cards, each carrying its
     own visual, copy and link. Nothing is hidden and nothing moves on
     its own. */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  // Fresh TAB_MS countdown each time `tab` or `paused` changes.
  useEffect(() => {
    if (mobile || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setTab((t) => (t + 1) % tabs.length), TAB_MS);
    return () => clearTimeout(id);
  }, [tab, paused, mobile, tabs.length]);

  function choose(i: number) { setTab(i); }

  const head = (
    <div className="fh-head">
      <span className="iz-ey">{eyebrow}</span>
      <h2 className="iz-h2">{title ?? (<>Every control, <em>around every app</em>.</>)}</h2>
      <p className="fh-lead">{lead}</p>
    </div>
  );

  if (mobile) {
    return (
      <div className="fh fh--cards">
        {head}
        <div className="fh-cards">
          {tabs.map((t, i) => (
            <article className="fh-card" key={t.title}>
              {views?.[i] && <div className="fh-card-vis">{views[i]}</div>}
              <span className="fh-card-ey">
                <t.icon weight="fill" aria-hidden="true" />
                {t.title}
              </span>
              <p className="fh-card-d">{t.desc}</p>
              <a href={t.href} className="learn">
                Learn more {Arrow}
              </a>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="fh"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {head}

      <div className="fh-stage">
        {views
          ? <div key={`v${tab}`} className="fh-view">{views[tab]}</div>
          : tab === 0 ? <IdentityView key="i" /> : tab === 2 ? <AuditView key="a" /> : <HubView key="h" />}
      </div>

      <div className="fh-groups" role="tablist" aria-label="Feature categories">
        {tabs.map((t, i) => (
          <div
            key={t.title}
            role="tab"
            tabIndex={0}
            aria-selected={tab === i}
            className={`fh-group ${tab === i ? "on" : ""}`}
            onClick={() => choose(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(i); }
            }}
          >
            {/* Progress bar — key forces CSS animation reset on every tab switch */}
            {tab === i && (
              <span className={`fh-prog${paused ? " paused" : ""}`} key={`prog-${i}-${tab}`} />
            )}
            <span className="gi"><t.icon weight={tab === i ? "fill" : "regular"} /></span>
            <h4>{t.title}</h4>
            <p>{t.desc}</p>
            <a href={t.href} className="learn" onClick={(e) => e.stopPropagation()}>
              Learn more {Arrow}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
