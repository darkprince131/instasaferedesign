"use client";

/**
 * SsoFlowchart — looping "gif-style" identity pipeline, in the reference layout:
 * left identity sources → middle SSO engine (one node glowing, cycling) → right
 * app destinations, with dashed risers to floating metrics and detail snippets,
 * flowing dashes + travelling pulses on a dotted field. Theme-aware.
 */

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Buildings, Cloud, Database, Fingerprint, Key, ShieldCheck, Stack, type Icon } from "@phosphor-icons/react";

const VW = 1200;
const VH = 560;
const pc = (x: number, y: number) => ({ left: `${(x / VW) * 100}%`, top: `${(y / VH) * 100}%` });

const INPUTS: { x: number; y: number; name: string; Icon: Icon }[] = [
  { x: 120, y: 180, name: "Active Directory", Icon: Database },
  { x: 120, y: 280, name: "Google Workspace", Icon: Cloud },
  { x: 120, y: 380, name: "Okta / IdP", Icon: Fingerprint },
];
const MID = [
  { x: 380, y: 280, name: "Authenticate", Icon: Fingerprint },
  { x: 600, y: 280, name: "Issue SSO token", Icon: Key },
  { x: 820, y: 280, name: "Apply policy", Icon: ShieldCheck },
];
const OUT: { x: number; y: number; name: string; Icon: Icon }[] = [
  { x: 1085, y: 180, name: "SaaS apps", Icon: Cloud },
  { x: 1085, y: 280, name: "Internal apps", Icon: Buildings },
  { x: 1085, y: 380, name: "Legacy apps", Icon: Stack },
];

export function SsoFlowchart() {
  const reduce = useReducedMotion() ?? false;
  const [glow, setGlow] = useState(1);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setGlow((g) => (g + 1) % 3), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  const flow = (d: string, key: string, delay = 0) => (
    <g key={key}>
      <path d={d} fill="none" stroke="var(--db-border)" strokeWidth="1.5" opacity="0.5" />
      {!reduce && (
        <motion.path d={d} fill="none" stroke="var(--db-accent)" strokeWidth="1.6" strokeDasharray="6 14" initial={{ strokeDashoffset: 60 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay }} opacity="0.8" />
      )}
    </g>
  );

  return (
    <section className="section relative mx-auto max-w-7xl px-5 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue-light)]">How SSO flows</div>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">From your directory to every app — <span className="grad-text">in one token.</span></h2>
      </div>

      <div className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-3xl border p-4" style={{ borderColor: "var(--db-border)", background: "var(--db-bg)", boxShadow: "var(--db-shadow)" }}>
        <div className="relative w-full" style={{ aspectRatio: `${VW} / ${VH}`, backgroundImage: "radial-gradient(var(--db-border) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
          {/* connectors */}
          <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {/* inputs → first mid */}
            {INPUTS.map((n, i) => flow(`M ${n.x + 95} ${n.y} C ${230} ${n.y} ${250} ${MID[0].y} ${MID[0].x - 105} ${MID[0].y}`, `in-${i}`, i * 0.3))}
            {/* mid links */}
            {flow(`M ${MID[0].x + 105} ${MID[0].y} L ${MID[1].x - 105} ${MID[1].y}`, "m01", 0)}
            {flow(`M ${MID[1].x + 105} ${MID[1].y} L ${MID[2].x - 105} ${MID[2].y}`, "m12", 0.3)}
            {/* last mid → outputs */}
            {OUT.map((n, i) => flow(`M ${MID[2].x + 105} ${MID[2].y} C ${960} ${MID[2].y} ${980} ${n.y} ${n.x - 95} ${n.y}`, `out-${i}`, i * 0.3))}
            {/* dashed risers */}
            {[MID[0], MID[1]].map((n, i) => (
              <line key={`up-${i}`} x1={n.x} y1={n.y - 30} x2={n.x} y2={120} stroke="var(--db-warning)" strokeWidth="1" strokeDasharray="2 5" opacity="0.55" />
            ))}
            {[MID[0], MID[1]].map((n, i) => (
              <line key={`dn-${i}`} x1={n.x} y1={n.y + 30} x2={n.x} y2={420} stroke="var(--db-border)" strokeWidth="1" strokeDasharray="2 5" opacity="0.5" />
            ))}
            {/* travelling pulse */}
            {!reduce && (
              <motion.circle r="4" fill="var(--db-accent)" initial={{ cx: MID[0].x, cy: MID[0].y, opacity: 0 }} animate={{ cx: [MID[0].x, MID[1].x, MID[2].x], cy: MID[0].y, opacity: [0, 1, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
            )}
          </svg>

          {/* floating metrics */}
          {[{ x: MID[0].x, t: "1 login → 40+ apps unlocked" }, { x: MID[1].x, t: "0 password resets" }].map((m, i) => (
            <motion.div key={i} className="absolute z-10 w-[180px] -translate-x-1/2 -translate-y-full text-center" style={pc(m.x, 110)} animate={reduce ? undefined : { y: [0, -4, 0] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}>
              <div className="text-[13px] font-bold leading-tight" style={{ color: "var(--db-text)" }}>{m.t}</div>
            </motion.div>
          ))}

          {/* detail cards */}
          {[
            { x: MID[0].x, title: "SAML assertion", lines: ["NameID: you@company.com", "AuthnContext: MFA", "Audience: slack.com"] },
            { x: MID[1].x, title: "Session policy", lines: ["device: trusted", "mfa: passed", "ttl: 8h · sso: on"] },
          ].map((d, i) => (
            <div key={i} className="absolute z-10 w-[210px] -translate-x-1/2 rounded-xl border p-3" style={{ ...pc(d.x, 430), background: "var(--db-surface)", borderColor: "var(--db-border)" }}>
              <div className="mb-1.5 text-[11px] font-bold" style={{ color: "var(--db-text)" }}>{d.title}</div>
              {d.lines.map((l) => (
                <div key={l} className="font-mono text-[10px] leading-relaxed" style={{ color: "var(--db-text-mute)" }}>{l}</div>
              ))}
            </div>
          ))}

          {/* node cards */}
          {INPUTS.map((n, i) => <NodeCard key={`i${i}`} {...n} dim />)}
          {OUT.map((n, i) => <NodeCard key={`o${i}`} {...n} dim />)}
          {MID.map((n, i) => <NodeCard key={`m${i}`} {...n} glow={glow === i} accent />)}
        </div>
      </div>
    </section>
  );
}

function NodeCard({ x, y, name, Icon, dim, glow, accent }: { x: number; y: number; name: string; Icon: Icon; dim?: boolean; glow?: boolean; accent?: boolean }) {
  return (
    <div
      className="absolute z-20 flex w-[200px] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border px-3 py-2.5"
      style={{
        left: `${(x / VW) * 100}%`,
        top: `${(y / VH) * 100}%`,
        background: glow ? "var(--db-surface-2)" : "var(--db-surface)",
        borderColor: glow ? "var(--db-warning)" : accent ? "var(--db-border)" : "var(--db-border)",
        boxShadow: glow ? "0 0 28px rgba(245,158,11,.45)" : "none",
        transition: "box-shadow .5s, border-color .5s, background .5s",
      }}
    >
      <Icon size={18} weight="duotone" style={{ color: glow ? "var(--db-warning)" : dim ? "var(--db-text-dim)" : "var(--db-accent)" }} />
      <span className="text-[12px] font-semibold" style={{ color: "var(--db-text)" }}>{name}</span>
    </div>
  );
}
