"use client";

import { ArrowRight, BookOpen, CheckCircle, XCircle } from "@phosphor-icons/react";

/* ============================================================
   00aa · Prose Stack — left structured copy + right stacked
   panels. Pattern: eyebrow → big H2 → body → CTA → bullets
   on left; 3 meaningful graphic panels on right.

   ▸ TO EDIT ◂
   - COPY object: eyebrow, headline, body, CTA text & href
   - BULLETS array: feature bullets (title + body)
   - THREATS / CHECKS / SESSION arrays: right-panel data
   - Swap ThreatPanel / PolicyPanel / SessionPanel entirely
     to replace with any other graphic component
   ============================================================ */

/* ── LEFT: copy constants ─────────────────────────────────── */
const COPY = {
  eyebrow:  "Zero Trust · Network Access",
  headline: (<>Your apps,<br />invisible to<br />the internet.</>),
  body:     "InstaSafe ZTNA replaces VPN with a software-defined perimeter. Users connect directly to applications — never to the network. No exposed ports. No lateral movement. No attack surface.",
  cta:      "Read the developer docs",
  ctaHref:  "/zero-trust-network-access",
};

/* ── EDIT: feature bullets ─────────────────────────────────── */
const BULLETS = [
  {
    id:    "verify",
    title: "Always verified, never trusted.",
    body:  "Every connection checks identity, device health and live risk score before a tunnel opens. Verification runs continuously — not just at login.",
  },
  {
    id:    "surface",
    title: "Zero exposed ports, zero attack surface.",
    body:  "SDP architecture makes your apps invisible to the internet. Attackers find nothing to scan, probe or exploit.",
  },
  {
    id:    "access",
    title: "Any device, any location, any app.",
    body:  "Employees, contractors and partners get the right access — on managed or BYOD devices — without touching the corporate network.",
  },
];
/* ── END EDIT ─────────────────────────────────────────────── */

/* ── Right Panel 1: Threat feed ─────────────────────────── */

/* EDIT: threat rows */
const THREATS = [
  { ip: "185.220.101.47", type: "port-scan",   hits: "×12" },
  { ip: "45.33.32.156",   type: "brute-force", hits: "×7"  },
  { ip: "198.20.70.109",  type: "cred-stuff",  hits: "×23" },
  { ip: "91.108.4.177",   type: "port-scan",   hits: "×4"  },
];

function ThreatPanel() {
  return (
    <div className="pst-panel threat">
      <div className="pst-bar">
        <span className="pst-dot red" />
        <span className="pst-bar-title">SDP Gateway</span>
        <span className="pst-bar-sep">·</span>
        <span className="pst-bar-sub">Live threat feed</span>
      </div>
      <div className="pst-body">
        <div className="pst-th-head">
          <span>SOURCE IP</span><span>TYPE</span><span>STATUS</span><span></span>
        </div>
        {THREATS.map((t, i) => (
          <div className="pst-th-row" key={i}>
            <span className="pst-ip">{t.ip}</span>
            <span className="pst-type">{t.type}</span>
            <span className="pst-blocked">BLOCKED</span>
            <span className="pst-hits">{t.hits}</span>
          </div>
        ))}
      </div>
      <div className="pst-foot">
        <XCircle weight="fill" className="pst-deny-ic" />
        <span>12 threats blocked in the last 60 min · 0 reached your apps</span>
      </div>
    </div>
  );
}

/* ── Right Panel 2: Policy evaluation ───────────────────── */

/* EDIT: policy check rows */
const CHECKS = [
  { label: "Identity", value: "anita.r · Okta SSO",           ok: true },
  { label: "Device",   value: "MacBook · posture score 94",    ok: true },
  { label: "Policy",   value: "Finance rules · geo:IN 09–18",  ok: true },
  { label: "Risk",     value: "Score 14 · Low",                ok: true },
];

function PolicyPanel() {
  return (
    <div className="pst-panel policy">
      <div className="pst-bar">
        <span className="pst-bar-title">Access Evaluation</span>
        <span className="pst-bar-sep">·</span>
        <span className="pst-bar-sub">billing-portal</span>
      </div>
      <div className="pst-body">
        {CHECKS.map((c, i) => (
          <div className="pst-chk-row" key={i}>
            <CheckCircle weight="fill" className="pst-ok-ic" />
            <span className="pst-chk-label">{c.label}</span>
            <span className="pst-chk-val">{c.value}</span>
          </div>
        ))}
        <div className="pst-allow-row">
          <span className="pst-allow-badge">SESSION ALLOWED</span>
          <span className="pst-allow-sub">Tunnel opening…</span>
        </div>
      </div>
    </div>
  );
}

/* ── Right Panel 3: Active session ──────────────────────── */

/* EDIT: session metadata rows */
const SESSION = [
  { label: "User",          value: "anita.r"         },
  { label: "Application",   value: "billing-portal"  },
  { label: "Protocol",      value: "HTTPS · TLS 1.3" },
  { label: "Duration",      value: "42 min"          },
  { label: "Ports exposed", value: "0"               },
  { label: "Tunnel",        value: "AES-256"         },
];

function SessionPanel() {
  return (
    <div className="pst-panel session">
      <div className="pst-bar">
        <span className="pst-dot green" />
        <span className="pst-bar-title">Active Session</span>
        <span className="iz-pill allow pst-live-pill">Live</span>
      </div>
      <div className="pst-body pst-sess-grid">
        {SESSION.map((s, i) => (
          <div className="pst-sess-item" key={i}>
            <span className="pst-sess-label">{s.label}</span>
            <span className="pst-sess-val">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export function ProseStack() {
  return (
    <div className="pst">

      {/* ── LEFT: structured copy ── */}
      <div className="pst-left">
        <span className="pst-ey">{COPY.eyebrow}</span>
        <h2 className="pst-hl">{COPY.headline}</h2>
        <p className="pst-body-txt">{COPY.body}</p>
        <a className="pst-cta" href={COPY.ctaHref}>
          <BookOpen weight="regular" />
          <span>{COPY.cta}</span>
          <ArrowRight weight="bold" className="pst-cta-arr" />
        </a>
        <div className="pst-bullets">
          {BULLETS.map(b => (
            <div className="pst-bullet" key={b.id}>
              <strong>{b.title}</strong>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: stacked panels ── */}
      <div className="pst-right">
        <ThreatPanel />
        <PolicyPanel />
        <SessionPanel />
      </div>

    </div>
  );
}
