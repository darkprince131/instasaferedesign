"use client";

/* ============================================================
   SsoFlowDiagram — "How SSO flows". `.iz`-token port of the v3
   SsoFlowchart concept: dotted-grid panel, three columns (inputs
   → pipeline → outputs), animated dash-flow connectors + one
   traveling pulse, a cycling accent glow on the active pipeline
   node. No amber — glow is accent-only via color-mix. Static
   under reduced motion (steady glow, no dashes/pulse).

   ▸ REBUILT PASS 2026-08-13 ◂ the first cut shipped four basic
   layout faults, all fixed here and none to reintroduce:
     · the two detail cards physically OVERLAPPED (208px wide on a
       203px column gap) and read as one grey slab — three cards
       now, sized to the gap, one per pipeline stage;
     · detail text was --tx-mute, which misses AA at that size —
       quiet text is --tx-dim, per the standing rule;
     · nothing named the three columns, so the reading order was
       guesswork — mono kickers now sit over each column;
     · below ~1160px the fixed 190px nodes collided on the
       shrinking stage — container queries now step the node size
       with the stage, and below 720px the diagram RECOMPOSES into
       a vertical flow (real HTML, not a pan-around canvas), per
       the IzVpnZtnaFlow precedent.
   ============================================================ */

import { useEffect, useState } from "react";
import {
  ArrowDown,
  Buildings,
  Cloud,
  Database,
  Fingerprint,
  Key,
  ShieldCheck,
  Stack,
  type Icon,
} from "@phosphor-icons/react";

const VW = 1200;
const VH = 560;

const INPUTS: { x: number; y: number; name: string; Icon: Icon }[] = [
  { x: 110, y: 150, name: "Active Directory", Icon: Database },
  { x: 110, y: 280, name: "Google Workspace", Icon: Cloud },
  { x: 110, y: 410, name: "Okta / your IdP", Icon: Fingerprint },
];
const MID: { x: number; y: number; name: string; Icon: Icon }[] = [
  { x: 380, y: 280, name: "Authenticate", Icon: Fingerprint },
  { x: 600, y: 280, name: "Issue SSO token", Icon: Key },
  { x: 820, y: 280, name: "Apply policy", Icon: ShieldCheck },
];
const OUT: { x: number; y: number; name: string; Icon: Icon }[] = [
  { x: 1090, y: 150, name: "SaaS apps", Icon: Cloud },
  { x: 1090, y: 280, name: "Internal apps", Icon: Buildings },
  { x: 1090, y: 410, name: "Legacy apps", Icon: Stack },
];

/* one card per pipeline stage — a two-card row under a three-node
   pipeline read as unfinished, and the third stage is the one that
   actually decides anything */
const DETAIL_CARDS = [
  { x: MID[0].x, title: "SAML assertion", lines: ["NameID: you@company.com", "AuthnContext: MFA"] },
  { x: MID[1].x, title: "Session token", lines: ["device: trusted · mfa: passed", "ttl: 8h"] },
  { x: MID[2].x, title: "Access decision", lines: ["grant: your app estate", "revoke: one click"] },
];

/* the column kickers — the reading order, named */
const COLS = [
  { x: 110, label: "Your directory" },
  { x: 600, label: "InstaSafe decides" },
  { x: 1090, label: "Your apps" },
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
      <div className="sfd-metric">1 login → your whole app estate</div>

      {/* ---------------- wide: the coordinate-locked map ---------------- */}
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
            {/* risers: each pipeline node down to its own detail card */}
            {MID.map((n, i) => (
              <line
                key={`riser-${i}`}
                x1={n.x}
                y1={n.y + 30}
                x2={n.x}
                y2={432}
                stroke="var(--line-strong)"
                strokeWidth={1}
                strokeDasharray="2 5"
                opacity={0.75}
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

          {/* column kickers — grouping, before any card is read */}
          {COLS.map((c) => (
            <span key={c.label} className="sfd-col" style={{ left: pct(c.x, VW) }}>
              {c.label}
              <i aria-hidden="true">_</i>
            </span>
          ))}

          {INPUTS.map((n, i) => (
            <NodeCard key={`i${i}`} {...n} dim />
          ))}
          {OUT.map((n, i) => (
            <NodeCard key={`o${i}`} {...n} dim />
          ))}
          {MID.map((n, i) => (
            <NodeCard key={`m${i}`} {...n} glow={reduced ? i === 1 : glowIndex === i} />
          ))}

          {DETAIL_CARDS.map((d, i) => (
            <div
              key={d.title}
              className={`sfd-detail${!reduced && glowIndex === i ? " on" : ""}`}
              style={{ left: pct(d.x, VW), top: pct(432, VH) }}
            >
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

      {/* ---------------- narrow: the same flow, recomposed ----------------
          Real HTML in document flow, not a pan-around canvas. Groups keep
          the kickers; the pipeline keeps its glow; the token detail rides
          with its stage instead of floating. */}
      <div className="sfd-mobile" aria-label="How SSO flows, step by step">
        <div className="sfd-m-group">
          <span className="sfd-m-lab">
            Your directory<i aria-hidden="true">_</i>
          </span>
          <ul>
            {INPUTS.map((n) => (
              <li key={n.name}>
                <n.Icon size={16} weight="duotone" aria-hidden="true" />
                {n.name}
              </li>
            ))}
          </ul>
        </div>

        <span className="sfd-m-arrow" aria-hidden="true">
          <ArrowDown size={15} weight="bold" />
        </span>

        <div className="sfd-m-group sfd-m-group--mid">
          <span className="sfd-m-lab">
            InstaSafe decides<i aria-hidden="true">_</i>
          </span>
          <ol>
            {MID.map((n, i) => (
              <li key={n.name}>
                <n.Icon size={16} weight="duotone" aria-hidden="true" />
                <span className="sfd-m-step">
                  <b>{n.name}</b>
                  <em>{DETAIL_CARDS[i].lines[0]}</em>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <span className="sfd-m-arrow" aria-hidden="true">
          <ArrowDown size={15} weight="bold" />
        </span>

        <div className="sfd-m-group">
          <span className="sfd-m-lab">
            Your apps<i aria-hidden="true">_</i>
          </span>
          <ul>
            {OUT.map((n) => (
              <li key={n.name}>
                <n.Icon size={16} weight="duotone" aria-hidden="true" />
                {n.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
