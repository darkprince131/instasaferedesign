"use client";

import { useState } from "react";
import {
  CheckCircle, XCircle, VideoCamera, Play,
  Lock, Desktop, Laptop, DeviceMobile,
  CaretRight, ListChecks, ShieldCheck,
} from "@phosphor-icons/react";

/* ============================================================
   00z · Accordion Showcase — 3 feature sections in a hover-
   open accordion. At rest: section 1 open (2 cols) + 2 closed
   (1 col each) = 4 columns visible. Hover any section to open;
   others collapse.

   ▸ TO EDIT ◂
   Change the three Left/Right sub-components below:
     AuditLeft / AuditRight     → Visibility & Audit
     PolicyLeft / PolicyRight   → Smart Access Rules
     DeviceLeft / DeviceRight   → Device Health Checks
   Edit SECTIONS for labels, descriptions, links.
   ============================================================ */

/* ── Section 1: Visibility & Audit ──────────────────────── */

const LOG_ROWS = [
  { u: "anita.r",    a: "billing-portal", ok: true,  t: "09:42" },
  { u: "rohan.d",    a: "code-server",    ok: true,  t: "09:41" },
  { u: "dave.k",     a: "admin-panel",    ok: false, t: "09:40" },
  { u: "priya.m",    a: "hr-system",      ok: true,  t: "09:38" },
  { u: "contractor", a: "finance-rdp",    ok: false, t: "09:35" },
];

function AuditLeft() {
  return (
    <div className="aca-audit-l">
      <div className="aca-eye">
        <ListChecks weight="regular" />
        <span>72 events today</span>
      </div>
      <div className="aca-log">
        {LOG_ROWS.map((r, i) => (
          <div className="aca-log-row" key={i}>
            {r.ok
              ? <CheckCircle weight="fill" className="aca-ok-ic" />
              : <XCircle    weight="fill" className="aca-deny-ic" />}
            <span className="aca-log-u">{r.u}</span>
            <span className="aca-log-a">{r.a}</span>
            <span className="aca-log-t">{r.t}</span>
          </div>
        ))}
        <div className="aca-log-fade" aria-hidden="true" />
      </div>
    </div>
  );
}

function AuditRight() {
  return (
    <div className="aca-audit-r">
      <div className="aca-rec-bar">
        <span className="aca-rec-ic"><VideoCamera weight="regular" /></span>
        <span className="aca-rec-lbl">Session Recording</span>
        <span className="iz-pill allow">Live</span>
      </div>
      <div className="aca-rec-screen">
        <span className="aca-rec-play"><Play weight="fill" /></span>
        <span className="aca-rec-scrub"><i style={{ width: "38%" }} /></span>
      </div>
      <div className="aca-rec-meta">
        <div><b>User</b> anita.r · CORP\anita.r</div>
        <div><b>App</b> billing-portal · RDP</div>
        <div><b>Duration</b> 42 min · 09:00–09:42</div>
        <div><b>Risk</b> <span className="aca-ok-tx">Low · score 14</span></div>
      </div>
    </div>
  );
}

/* ── Section 2: Smart Access Rules (Policy Engine) ────────── */

const POLICIES = [
  { n: "Finance — Write",         apps: ["billing-portal", "finance-rdp"], state: "allow" as const },
  { n: "Dev Tools",               apps: ["code-server", "gitlab"],         state: "allow" as const },
  { n: "HR — Contractors (deny)", apps: ["hr-system"],                     state: "deny"  as const },
  { n: "VPN fallback (step-up)",  apps: ["legacy-vpn"],                    state: "step"  as const },
];

function PolicyLeft() {
  return (
    <div className="aca-pol-l">
      <div className="aca-eye">
        <Lock weight="regular" />
        <span>14 active rules</span>
      </div>
      <div className="aca-pol-card">
        <div className="aca-pol-name">Finance — Write access</div>
        <div className="aca-pol-conds">
          <div className="aca-cond"><span className="aca-kw">IF</span> geo <b>IN</b> <em>India</em></div>
          <div className="aca-cond"><span className="aca-kw">AND</span> time <b>=</b> <em>09:00–18:00</em></div>
          <div className="aca-cond"><span className="aca-kw">AND</span> device <b>≥</b> <em>score 80</em></div>
          <div className="aca-cond result">
            <span className="aca-kw">THEN</span>
            <b className="aca-ok-tx">ALLOW</b>
          </div>
        </div>
        <div className="aca-pol-hint">+13 more rules</div>
      </div>
    </div>
  );
}

function PolicyRight() {
  return (
    <div className="aca-pol-r">
      <div className="aca-rh">
        All policies <span className="aca-rh-ct">14</span>
      </div>
      {POLICIES.map((p, i) => (
        <div className="aca-pol-item" key={i}>
          <div className="aca-pol-item-h">
            <Lock weight="fill" className="aca-pol-ic" />
            <span className="aca-pol-item-n">{p.n}</span>
            {p.state === "allow" && <span className="iz-pill allow">allow</span>}
            {p.state === "deny"  && <span className="iz-pill deny">deny</span>}
            {p.state === "step"  && <span className="iz-pill">step-up</span>}
          </div>
          <div className="aca-pol-apps">
            {p.apps.map(a => <em key={a}>{a}</em>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Section 3: Device Health Checks ────────────────────── */

function ScoreRing({ score }: { score: number }) {
  const r = 22, c = 2 * Math.PI * r;
  const fill = (score / 100) * c;
  const stroke = score >= 80 ? "var(--allow)" : "#d98a1f";
  return (
    <svg viewBox="0 0 52 52" className="aca-ring" aria-label={`${score} / 100`}>
      <circle cx="26" cy="26" r={r} fill="none" stroke="var(--line-strong)" strokeWidth="4" />
      <circle cx="26" cy="26" r={r} fill="none" stroke={stroke} strokeWidth="4"
        strokeDasharray={`${fill} ${c - fill}`} strokeLinecap="round"
        transform="rotate(-90 26 26)" />
    </svg>
  );
}

const DEVICES = [
  { name: "MacBook-ARJ-01", score: 94, ok: [true,  true,  true],  Icon: Laptop  },
  { name: "WIN-CTR-07",     score: 62, ok: [true,  false, true],  Icon: Desktop },
  { name: "iPhone-PRY-08",  score: 88, ok: [true,  true,  false], Icon: DeviceMobile },
  { name: "MacBook-RD-05",  score: 97, ok: [true,  true,  true],  Icon: Laptop  },
];

function DeviceLeft() {
  return (
    <div className="aca-dev-l">
      <div className="aca-eye">
        <ShieldCheck weight="regular" />
        <span>Posture · 3 at risk</span>
      </div>
      <div className="aca-score-wrap">
        <div className="aca-score-card">
          <ScoreRing score={94} />
          <div className="aca-score-nums">
            <span className="aca-score-big">94</span>
            <span className="aca-score-of">/ 100</span>
          </div>
        </div>
        <div className="aca-score-meta">
          <span className="aca-dev-hostname">MacBook-ARJ-01</span>
          <div className="aca-dots">
            <i className="aca-dot ok" title="Disk encrypted" />
            <i className="aca-dot ok" title="AV running" />
            <i className="aca-dot ok" title="Patches current" />
          </div>
          <span className="aca-dev-sub">25 / 25 checks passed</span>
        </div>
      </div>
    </div>
  );
}

function DeviceRight() {
  return (
    <div className="aca-dev-r">
      <div className="aca-rh">
        All devices <span className="aca-rh-ct">{DEVICES.length}</span>
      </div>
      {DEVICES.map((d, i) => (
        <div className="aca-dev-item" key={i}>
          <d.Icon weight="regular" className="aca-dev-ic" />
          <span className="aca-dev-name">{d.name}</span>
          <div className="aca-dots sm">
            {d.ok.map((o, j) => (
              <i key={j} className={`aca-dot ${o ? "ok" : "warn"}`} />
            ))}
          </div>
          <span className={`aca-dev-score ${d.score >= 80 ? "ok" : "warn"}`}>
            {d.score}
          </span>
        </div>
      ))}
      <div className="aca-dev-leg">
        <i className="aca-dot ok" /> encrypt
        <i className="aca-dot ok" /> AV
        <i className="aca-dot ok" /> patches
      </div>
    </div>
  );
}

/* ── Section registry ─────────────────────────────────────── */

interface AcaSec {
  id: string;
  label: string;
  desc: string;
  href: string;
  Left:  React.ComponentType;
  Right: React.ComponentType;
}

/* ── EDIT: change labels, descriptions, links, or swap graphic components ── */
const SECTIONS: AcaSec[] = [
  {
    id: "audit",
    label: "Visibility & Audit",
    desc:  "Every session logged and searchable. Investigate from user to event to session replay in seconds.",
    href:  "/zero-trust-features/session-recording",
    Left: AuditLeft, Right: AuditRight,
  },
  {
    id: "policy",
    label: "Smart Access Rules",
    desc:  "Rules that adapt to identity, device health, geo, time and live risk score — no VPN admin needed.",
    href:  "/zero-trust-features/access-policies",
    Left: PolicyLeft, Right: PolicyRight,
  },
  {
    id: "device",
    label: "Device Health Checks",
    desc:  "25 posture checks on every connection across every OS. Only trusted devices reach your apps.",
    href:  "/zero-trust-features/device-posture-check",
    Left: DeviceLeft, Right: DeviceRight,
  },
];
/* ── END EDIT ─────────────────────────────────────────────── */

const COL_GRID = ["2fr 1fr 1fr", "1fr 2fr 1fr", "1fr 1fr 2fr"] as const;

export function AccordionShowcase() {
  const [open, setOpen] = useState(0);

  return (
    <div className="aca">
      {/* ── accordion panels ── */}
      <div
        className="aca-board"
        style={{ gridTemplateColumns: COL_GRID[open] }}
      >
        {SECTIONS.map((sec, i) => (
          <div
            key={sec.id}
            className={`aca-sec${open === i ? " open" : " closed"}`}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            tabIndex={0}
            role="button"
            aria-expanded={open === i}
            aria-label={sec.label}
          >
            {/* left — always visible */}
            <div className="aca-left">
              <sec.Left />
              <span className="aca-chevron" aria-hidden="true">
                <CaretRight weight="bold" />
              </span>
            </div>
            {/* right — slides in on open */}
            <div className="aca-right" aria-hidden={open !== i}>
              <sec.Right />
            </div>
          </div>
        ))}
      </div>

      {/* ── footers (same grid → columns align with panels) ── */}
      <div
        className="aca-footer"
        style={{ gridTemplateColumns: COL_GRID[open] }}
      >
        {SECTIONS.map((sec, i) => (
          <div key={sec.id} className={`aca-foot${open === i ? " open" : ""}`}>
            <h3 className="aca-foot-h">{sec.label}</h3>
            <p className="aca-foot-p">{sec.desc}</p>
            <a className="aca-foot-link" href={sec.href}>
              See how it works <CaretRight weight="bold" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
