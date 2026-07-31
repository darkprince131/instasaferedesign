"use client";

/* ============================================================
   SsoFlowDiagram — "How SSO flows". `.iz`-token port of the v3
   SsoFlowchart concept: dotted-grid panel, three columns (inputs
   → pipeline → outputs), animated dash-flow connectors + one
   traveling pulse, a cycling accent glow on the active pipeline
   node. No amber — glow is accent-only via color-mix. Static
   under reduced motion (steady glow, no dashes/pulse).
   ============================================================ */

import { useEffect, useState } from "react";
import { Buildings, Cloud, Database, Fingerprint, Key, ShieldCheck, Stack, type Icon } from "@phosphor-icons/react";

const VW = 1200;
const VH = 540;

const INPUTS: { x: number; y: number; name: string; Icon: Icon }[] = [
  { x: 110, y: 140, name: "Active Directory", Icon: Database },
  { x: 110, y: 270, name: "Google Workspace", Icon: Cloud },
  { x: 110, y: 400, name: "Okta / your IdP", Icon: Fingerprint },
];
const MID: { x: number; y: number; name: string; Icon: Icon }[] = [
  { x: 380, y: 270, name: "Authenticate", Icon: Fingerprint },
  { x: 600, y: 270, name: "Issue SSO token", Icon: Key },
  { x: 820, y: 270, name: "Apply policy", Icon: ShieldCheck },
];
const OUT: { x: number; y: number; name: string; Icon: Icon }[] = [
  { x: 1090, y: 140, name: "SaaS apps", Icon: Cloud },
  { x: 1090, y: 270, name: "Internal apps", Icon: Buildings },
  { x: 1090, y: 400, name: "Legacy apps", Icon: Stack },
];

const DETAIL_CARDS = [
  { x: MID[0].x, title: "SAML assertion", lines: ["NameID: you@company.com", "AuthnContext: MFA", "Audience: app.example"] },
  { x: MID[1].x, title: "Session policy", lines: ["device: trusted", "mfa: passed", "ttl: 8h"] },
];

function pct(v: number, total: number) {
  return `${(v / total) * 100}%`;
}

function Connector({ d, delay, reduced }: { d: string; delay: number; reduced: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth={1.5} />
      {!reduced && (
        <path
          d={d}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.6}
          strokeDasharray="6 14"
          opacity={0.85}
          className="sfd-dash"
          style={{ animationDelay: `${delay}s` }}
        />
      )}
    </g>
  );
}

function NodeCard({
  x,
  y,
  name,
  Icon,
  dim,
  glow,
}: {
  x: number;
  y: number;
  name: string;
  Icon: Icon;
  dim?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      className={`sfd-node${glow ? " glow" : ""}${dim ? " dim" : ""}`}
      style={{ left: pct(x, VW), top: pct(y, VH) }}
    >
      <Icon size={17} weight="duotone" />
      <span>{name}</span>
    </div>
  );
}

export function SsoFlowDiagram() {
  const [reduced, setReduced] = useState(false);
  const [glowIndex, setGlowIndex] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setGlowIndex((g) => (g + 1) % MID.length), 2600);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className={`sfd-panel${reduced ? " sfd-static" : ""}`}>
      <div className="sfd-metric">1 login → 40+ apps unlocked</div>

      <div className="sfd-scroll">
        <div className="sfd-stage">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="sfd-svg" preserveAspectRatio="xMidYMid meet" aria-hidden>
            {INPUTS.map((n, i) => (
              <Connector
                key={`in-${i}`}
                d={`M ${n.x + 95} ${n.y} C 230 ${n.y} 250 ${MID[0].y} ${MID[0].x - 100} ${MID[0].y}`}
                delay={i * 0.3}
                reduced={reduced}
              />
            ))}
            <Connector d={`M ${MID[0].x + 100} ${MID[0].y} L ${MID[1].x - 100} ${MID[1].y}`} delay={0} reduced={reduced} />
            <Connector d={`M ${MID[1].x + 100} ${MID[1].y} L ${MID[2].x - 100} ${MID[2].y}`} delay={0.3} reduced={reduced} />
            {OUT.map((n, i) => (
              <Connector
                key={`out-${i}`}
                d={`M ${MID[2].x + 100} ${MID[2].y} C 960 ${MID[2].y} 980 ${n.y} ${n.x - 95} ${n.y}`}
                delay={i * 0.3}
                reduced={reduced}
              />
            ))}
            {/* dashed risers to the detail cards below */}
            {[MID[0], MID[1]].map((n, i) => (
              <line
                key={`riser-${i}`}
                x1={n.x}
                y1={n.y + 30}
                x2={n.x}
                y2={430}
                stroke="var(--line-strong)"
                strokeWidth={1}
                strokeDasharray="2 5"
                opacity={0.6}
              />
            ))}
            {/* traveling pulse along the pipeline */}
            {!reduced && (
              <circle r={4} fill="var(--accent)" className="sfd-pulse">
                <animateMotion
                  path={`M ${MID[0].x} ${MID[0].y} L ${MID[1].x} ${MID[1].y} L ${MID[2].x} ${MID[2].y}`}
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </svg>

          {INPUTS.map((n, i) => (
            <NodeCard key={`i${i}`} {...n} dim />
          ))}
          {OUT.map((n, i) => (
            <NodeCard key={`o${i}`} {...n} dim />
          ))}
          {MID.map((n, i) => (
            <NodeCard key={`m${i}`} {...n} glow={reduced ? i === 1 : glowIndex === i} />
          ))}

          {DETAIL_CARDS.map((d) => (
            <div key={d.title} className="sfd-detail" style={{ left: pct(d.x, VW), top: pct(430, VH) }}>
              <div className="sfd-detail-title">{d.title}</div>
              {d.lines.map((l) => (
                <div key={l} className="sfd-detail-line">
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
