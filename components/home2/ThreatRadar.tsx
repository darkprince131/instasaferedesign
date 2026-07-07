"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  DeviceMobile, WarningOctagon, Key, Detective, MapPinLine,
  X, CheckCircle, ShieldCheck, type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   C-new · Threat Radar
   10×6 grid of identical dots. On hover 5 pulsing alerts
   are revealed. Click one → auto-playing investigation →
   user decision → resolution toast + dot turns green.
   Mobile: alerts always visible (no hover required).
   RFC-5737 IPs only. No real customer data.
   ============================================================ */

type Tone = "warn" | "deny" | "info";
type ResTone = "ok" | "warn";
interface Cta {
  label: string;
  kind: "approve" | "deny" | "block" | "challenge" | "reauth" | "dismiss";
  resolve: { tone: ResTone; title: string; body: string };
}
interface Graph {
  kind: "bars" | "spike" | "donut" | "geo";
  caption: string;
  bars?: { h: number; c: string }[];
  pct?: number;
}
interface Activity {
  id: string; tone: Tone; icon: Icon;
  title: ReactNode; tag: string;
  details: { k: string; v: string }[];
  graph: Graph;
  ctas: Cta[];
}

const A = (s: string) => <b className="tr-hl">{s}</b>;
const RED = "var(--deny)", AMBER = "#d98a1f", GRN = "var(--allow)", ORG = "var(--orange)";

/* grid layout */
const GRID_COLS = 10;
const GRID_ROWS = 6;
const TOTAL_DOTS = GRID_COLS * GRID_ROWS; // 60

/* which grid indices hold alerts (row-major, 0-based) */
const ALERT_INDICES = [8, 22, 31, 45, 57];

/* lens radius (px) — alert reveals when dot centre enters this circle */
const LENS_R = 120;

const CASES: Activity[] = [
  {
    id: "device", tone: "warn", icon: DeviceMobile,
    title: <>New device — Pixel 8 under {A("priya.s")}</>, tag: "Pending approval",
    details: [
      { k: "User", v: "priya.s · Marketing" },
      { k: "Location", v: "Pune, IN" },
      { k: "IP", v: "203.0.113.47" },
      { k: "Posture", v: "encrypted · screen-lock on" },
      { k: "First seen", v: "2 min ago" },
    ],
    graph: {
      kind: "bars", caption: "Device posture — 4 / 5 checks",
      bars: [{ h: 90, c: GRN }, { h: 78, c: GRN }, { h: 96, c: GRN }, { h: 40, c: AMBER }, { h: 84, c: GRN }],
    },
    ctas: [
      { label: "Approve", kind: "approve", resolve: { tone: "ok", title: "Approved in seconds", body: "Great — you helped priya.s get verified and back to work in under 28 seconds. No ticket, no wait." } },
      { label: "Deny", kind: "deny", resolve: { tone: "ok", title: "Unknown device stopped", body: "Nice catch. You stopped an unrecognised device from ever joining the network — exactly how zero-trust should feel." } },
    ],
  },
  {
    id: "mfa", tone: "deny", icon: WarningOctagon,
    title: <>Suspicious activity — {A("dave.k")}</>, tag: "11 failed MFA attempts",
    details: [
      { k: "Reason", v: "11 failed MFA pushes in 3 min" },
      { k: "Location", v: "Unknown · VPN exit" },
      { k: "IP", v: "198.51.100.9" },
      { k: "Risk score", v: "92 / 100 — high" },
    ],
    graph: {
      kind: "spike", caption: "Failed MFA — last 6 minutes",
      bars: [{ h: 12, c: GRN }, { h: 18, c: GRN }, { h: 30, c: AMBER }, { h: 64, c: RED }, { h: 96, c: RED }, { h: 88, c: RED }],
    },
    ctas: [
      { label: "Block user", kind: "block", resolve: { tone: "ok", title: "Account takeover stopped", body: "Congrats — you blocked dave.k mid-attack. That’s very likely an account takeover shut down before it ever started." } },
      { label: "Dismiss", kind: "dismiss", resolve: { tone: "warn", title: "Left open — still watched", body: "No action taken. InstaSafe keeps watching this session and will force step-up auth on the next attempt." } },
    ],
  },
  {
    id: "access", tone: "info", icon: Key,
    title: <>Access request — Marketing → {A("HR Actions")}</>, tag: "Cross-department",
    details: [
      { k: "Requested by", v: "ravi.k · Marketing" },
      { k: "Scope", v: "HR Actions · payroll-export" },
      { k: "Reason", v: "“need the headcount reports”" },
      { k: "Policy", v: "least-privilege · cross-dept" },
    ],
    graph: {
      kind: "bars", caption: "Standing access by team",
      bars: [{ h: 30, c: ORG }, { h: 96, c: RED }, { h: 22, c: ORG }, { h: 18, c: ORG }],
    },
    ctas: [
      { label: "Deny", kind: "deny", resolve: { tone: "ok", title: "Payroll stays need-to-know", body: "Smart call. Marketing never gets standing access to HR data — least privilege keeps the blast radius tiny." } },
      { label: "Grant just-in-time", kind: "approve", resolve: { tone: "warn", title: "Granted — but time-boxed", body: "Access granted just-in-time: scoped to one report, fully audited, and auto-revoked in 24 hours." } },
    ],
  },
  {
    id: "anon", tone: "deny", icon: Detective,
    title: <>Anonymous visitor identified</>, tag: "incognito + VPN",
    details: [
      { k: "Disguise", v: "incognito · VPN · spoofed UA" },
      { k: "Fingerprint", v: "matches arjun.m’s old laptop" },
      { k: "Claimed", v: "Berlin, DE" },
      { k: "Actual", v: "Pune, IN — tampered" },
    ],
    graph: { kind: "donut", caption: "Identity confidence", pct: 98 },
    ctas: [
      { label: "Block", kind: "block", resolve: { tone: "ok", title: "Disguise didn’t help", body: "Blocked. Behind a VPN, incognito mode and a spoofed browser, InstaSafe still fingerprinted the device and shut it out." } },
      { label: "Challenge", kind: "challenge", resolve: { tone: "ok", title: "Step-up sent", body: "Step-up challenge issued. The real owner clears it in seconds — an impostor simply can’t." } },
    ],
  },
  {
    id: "travel", tone: "deny", icon: MapPinLine,
    title: <>Impossible travel — {A("neha.r")}</>, tag: "two logins, 4 min apart",
    details: [
      { k: "Login A", v: "Pune, IN · 09:02" },
      { k: "Login B", v: "Toronto, CA · 09:06" },
      { k: "Distance", v: "12,000 km in 4 min" },
      { k: "Verdict", v: "credentials likely stolen" },
    ],
    graph: { kind: "geo", caption: "Two logins · 4 minutes apart" },
    ctas: [
      { label: "Block session", kind: "block", resolve: { tone: "ok", title: "Stolen credentials stopped", body: "Congrats — geo-binding caught what a password never could. Those stolen credentials got nowhere." } },
      { label: "Force re-auth", kind: "reauth", resolve: { tone: "ok", title: "Re-auth challenged", body: "Re-authentication forced. A genuine user clears it instantly; an attacker is locked straight out." } },
    ],
  },
];

const toneColor: Record<Tone, string> = { warn: AMBER, deny: RED, info: ORG };

/* ---------- mini graphs ---------- */
function Bars({ g }: { g: Graph }) {
  return (
    <div className="tr-graph">
      <span className="tr-graph-cap">{g.caption}</span>
      <div className="tr-bars">
        {g.bars!.map((b, i) => (
          <span key={i} className="tr-bar" style={{ height: `${b.h}%`, background: b.c, animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
    </div>
  );
}
function Donut({ g }: { g: Graph }) {
  const r = 30, circ = 2 * Math.PI * r, pct = g.pct ?? 0;
  return (
    <div className="tr-graph">
      <span className="tr-graph-cap">{g.caption}</span>
      <div className="tr-donut">
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} className="tr-donut-bg" />
          <circle cx="40" cy="40" r={r} className="tr-donut-fg"
            strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
            transform="rotate(-90 40 40)" />
        </svg>
        <span className="tr-donut-n">{pct}<i>%</i></span>
      </div>
    </div>
  );
}
function Geo({ g }: { g: Graph }) {
  return (
    <div className="tr-graph">
      <span className="tr-graph-cap">{g.caption}</span>
      <div className="tr-geo">
        <span className="tr-geo-pt a"><i /> Pune</span>
        <span className="tr-geo-line" />
        <span className="tr-geo-pt b">Toronto <i /></span>
      </div>
    </div>
  );
}
function GraphView({ g }: { g: Graph }) {
  if (g.kind === "donut") return <Donut g={g} />;
  if (g.kind === "geo") return <Geo g={g} />;
  return <Bars g={g} />;
}

type Phase = "alert" | "chat" | "graph" | "cta" | "resolved";

export function ThreatRadar() {
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const fieldRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("alert");
  const [done, setDone] = useState<Record<string, Cta["resolve"]>>({});
  const [toast, setToast] = useState<Cta["resolve"] | null>(null);
  /* left = left edge of tooltip in field px; yVal = top (if below) or bottom (if above) */
  const [resolvedTip, setResolvedTip] = useState<{ idx: number; left: number; below: boolean; yVal: number } | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  /* autoplay investigation phases */
  useEffect(() => {
    clearTimers();
    if (open === null) return;
    const c = CASES[open];
    if (done[c.id]) { setPhase("resolved"); return; }
    if (reduced) { setPhase("cta"); return; }
    setPhase("alert");
    const chatDur = c.details.length * 420 + 600;
    timers.current.push(setTimeout(() => setPhase("chat"), 1200));
    timers.current.push(setTimeout(() => setPhase("graph"), 1200 + chatDur));
    timers.current.push(setTimeout(() => setPhase("cta"), 1200 + chatDur + 1500));
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* keep CTA in view as content reveals */
  useEffect(() => {
    const el = cardRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [phase, open, reduced]);

  /* toast auto-dismiss */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  /* esc to close */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = fieldRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
    // reveal only alert dots whose centre falls inside the lens circle
    el.querySelectorAll<HTMLElement>("button.tr-dot.alert").forEach((btn) => {
      const br = btn.getBoundingClientRect();
      const bx = br.left + br.width / 2 - r.left;
      const by = br.top + br.height / 2 - r.top;
      btn.classList.toggle("near", Math.hypot(mx - bx, my - by) <= LENS_R);
    });
  }

  function openResolvedTip(e: React.MouseEvent<HTMLButtonElement>, caseIdx: number) {
    const field = fieldRef.current;
    if (!field) return;
    const fr = field.getBoundingClientRect();
    const br = e.currentTarget.getBoundingClientRect();
    const cx = br.left + br.width / 2 - fr.left;
    const cy = br.top - fr.top;
    const tipW = Math.min(230, fr.width - 32);
    // compute left EDGE directly — no CSS translateX needed
    const left = Math.max(8, Math.min(fr.width - tipW - 8, cx - tipW / 2));
    const below = cy < 90;
    setResolvedTip({
      idx: caseIdx,
      left,
      below,
      // above: anchor via `bottom` so tip always clears the dot regardless of tip height
      // below: anchor via `top`
      yVal: below ? Math.round(cy + 28) : Math.round(fr.height - cy + 14),
    });
  }

  function choose(c: Activity, cta: Cta) {
    setDone((d) => ({ ...d, [c.id]: cta.resolve }));
    setPhase("resolved");
    timers.current.push(setTimeout(() => { setToast(cta.resolve); setOpen(null); }, 1500));
  }

  const cur = open !== null ? CASES[open] : null;
  const show = {
    chat: phase !== "alert",
    graph: phase === "graph" || phase === "cta" || phase === "resolved",
    cta: phase === "cta",
    res: phase === "resolved",
  };
  const resolvedCount = Object.keys(done).length;

  return (
    <div className="tr">
      <div className="tr-head">
        <span className="iz-ey">Anonymous visitor detection</span>
        <h2 className="iz-h2">Spot the threat. <em>Make the call.</em></h2>
        <p className="tr-sub">
          Hover the activity field — <b>5 threats are hiding among the dots.</b> Find them, let InstaSafe lay out the evidence, then you decide what happens next.
        </p>
      </div>

      <div
        className="tr-field"
        ref={fieldRef}
        onPointerMove={onMove}
        onPointerEnter={(e) => { e.currentTarget.classList.add("scan"); onMove(e); }}
        onPointerLeave={(e) => {
          const el = e.currentTarget;
          el.classList.remove("scan");
          el.querySelectorAll<HTMLElement>("button.tr-dot.alert")
            .forEach((btn) => btn.classList.remove("near"));
        }}
      >
        {/* 10×6 grid — all dots look identical until hover reveals alerts */}
        <div
          className="tr-grid"
          role="region"
          aria-label={`Activity field — ${resolvedCount} of ${CASES.length} threats resolved`}
        >
          {Array.from({ length: TOTAL_DOTS }, (_, idx) => {
            const caseIdx = ALERT_INDICES.indexOf(idx);
            if (caseIdx !== -1) {
              const c = CASES[caseIdx];
              const resolved = !!done[c.id];
              if (resolved) {
                return (
                  <button
                    key={idx}
                    className="tr-dot alert resolved"
                    style={{ ["--tc" as string]: GRN }}
                    onMouseEnter={(e) => openResolvedTip(e, caseIdx)}
                    onMouseLeave={() => setResolvedTip(null)}
                    onClick={(e) => {
                      if (resolvedTip?.idx === caseIdx) setResolvedTip(null);
                      else openResolvedTip(e, caseIdx);
                    }}
                    aria-label="Resolved — hover to see outcome"
                  >
                    <span className="tr-dot-core"><CheckCircle weight="fill" /></span>
                    <span className="tr-dot-ring" aria-hidden="true" />
                  </button>
                );
              }
              return (
                <button
                  key={idx}
                  className="tr-dot alert"
                  style={{ ["--tc" as string]: toneColor[c.tone] }}
                  onClick={() => setOpen(caseIdx)}
                  aria-label={`Alert ${caseIdx + 1} — click to investigate`}
                >
                  <span className="tr-dot-core" />
                  <span className="tr-dot-ring" aria-hidden="true" />
                </button>
              );
            }
            return (
              <div key={idx} className="tr-dot" aria-hidden="true">
                <span className="tr-dot-core" />
              </div>
            );
          })}
        </div>

        {/* cursor lens glow — follows --mx/--my */}
        <div className="tr-lens" aria-hidden="true" />

        <span className="tr-hint">
          <span className="tr-hint-scan">hover to reveal threats · </span>
          {resolvedCount} of {CASES.length} resolved
        </span>

        {/* investigation card */}
        {cur && (
          <>
            <div className="tr-backdrop" onClick={() => setOpen(null)} />
            <div className="tr-card" ref={cardRef} role="dialog" aria-label="Investigating alert">
              <button className="tr-close" onClick={() => setOpen(null)} aria-label="Close"><X /></button>

              <div className="tr-alertline" style={{ ["--tc" as string]: toneColor[cur.tone] }}>
                <span className="tr-alertline-ic"><cur.icon weight="fill" /></span>
                <span>
                  <span className="tr-alertline-t">{cur.title}</span>
                  <span className="tr-alertline-tag">{cur.tag}</span>
                </span>
              </div>

              {show.chat && (
                <div className="tr-chat">
                  {cur.details.map((d, i) => (
                    <span className="tr-bubble" key={d.k} style={{ animationDelay: reduced ? "0ms" : `${i * 420}ms` }}>
                      <i>{d.k}</i> {d.v}
                    </span>
                  ))}
                </div>
              )}

              {show.graph && <GraphView g={cur.graph} />}

              {show.cta && (
                <div className="tr-ctarow">
                  {cur.ctas.map((cta) => (
                    <button key={cta.label} className={`tr-cta k-${cta.kind}`} onClick={() => choose(cur, cta)}>
                      {cta.label}
                    </button>
                  ))}
                </div>
              )}

              {show.res && done[cur.id] && (
                <div className={`tr-resolve t-${done[cur.id].tone}`}>
                  <ShieldCheck weight="fill" />
                  <span><b>{done[cur.id].title}</b>{done[cur.id].body}</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* resolved-dot hover tooltip */}
        {resolvedTip !== null && (() => {
          const r = done[CASES[resolvedTip.idx].id];
          if (!r) return null;
          return (
            <div
              className={`tr-dot-tip tr-dot-tip-${r.tone}${resolvedTip.below ? " below" : ""}`}
              style={{
                left: resolvedTip.left,
                ...(resolvedTip.below
                  ? { top: resolvedTip.yVal }
                  : { bottom: resolvedTip.yVal }),
              }}
              role="tooltip"
            >
              <b>{r.title}</b>
              <span>{r.body}</span>
            </div>
          );
        })()}

        {/* resolution toast */}
        {toast && (
          <div className={`tr-toast t-${toast.tone}`} role="status">
            <span className="tr-toast-ic"><ShieldCheck weight="fill" /></span>
            <span><b>{toast.title}</b>{toast.body}</span>
          </div>
        )}
      </div>
    </div>
  );
}
