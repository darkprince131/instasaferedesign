"use client";

import { useState } from "react";

/* ============================================================
   C19 · Impact divergence graph.
   Two lines over time: InstaSafe (orange, holds high) vs a
   legacy castle-and-moat VPN (grey, decays as trust erodes).
   Hover the chart → vertical guide, dots on both lines, and a
   tooltip with the stat at that point. Illustrative model.
   Scoped `.ig-`; tokens from `.iz`.
   ============================================================ */

const W = 720;
const H = 300;
const PADL = 12;
const PADR = 14;
const PADT = 18;
const PADB = 46;
const MINY = 40;
const MAXY = 100;

/* % of access still verified / contained, day 0 → 120 (step 5) */
const INSTA = [99, 98.6, 98.9, 98.4, 98.7, 98.2, 98.5, 98.1, 98.4, 98, 98.3, 97.9, 98.2, 98, 98.3, 97.8, 98.1, 97.9, 98.2, 97.7, 98, 97.8, 98.1, 97.6, 97.9];
const LEGACY = [96, 95.4, 95.6, 94.8, 94, 92.5, 90, 86, 80, 74, 69, 64, 61, 58.5, 57, 55.6, 54.4, 53, 52, 50.6, 49.4, 48.5, 47.6, 46.8, 46];
const N = INSTA.length;

const xPix = (i: number) => PADL + (i / (N - 1)) * (W - PADL - PADR);
const yPix = (v: number) => PADT + (1 - (v - MINY) / (MAXY - MINY)) * (H - PADT - PADB);
const poly = (a: number[]) => a.map((v, i) => `${xPix(i).toFixed(1)},${yPix(v).toFixed(1)}`).join(" ");

const TICKS = [0, 30, 60, 90, 120];

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const fmt = (d: number) => `${d > 0 ? "+" : ""}${d.toFixed(1)}%`;

export function ImpactGraph() {
  const [active, setActive] = useState<number | null>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((relX - PADL) / (W - PADL - PADR)) * (N - 1));
    setActive(Math.max(0, Math.min(N - 1, i)));
  }

  const ax = active ?? Math.round(N * 0.62);
  const showTip = active !== null;
  const leftPct = (xPix(ax) / W) * 100;

  return (
    <div className="ig-card">
      <div className="ig-head">
        <span className="iz-ey">Impact over time</span>
        <h2 className="iz-h2">Protection that <em>doesn&apos;t decay</em>.</h2>
        <p className="ig-lead">
          A VPN trusts the whole network, so exposure widens the longer it runs. InstaSafe verifies every request — the gap
          only grows.
        </p>
        <div className="ig-legend">
          <span className="ig-leg is"><i /> InstaSafe ZTNA</span>
          <span className="ig-leg lg"><i /> Legacy VPN</span>
        </div>
      </div>

      <div className="ig-plot" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} className="ig-svg" preserveAspectRatio="none" role="img" aria-label="InstaSafe vs legacy VPN protection over 120 days">
          {/* baseline + ticks */}
          {TICKS.map((d) => {
            const x = xPix((d / 120) * (N - 1));
            return <line key={d} className="ig-grid" x1={x} x2={x} y1={PADT} y2={H - PADB} />;
          })}
          <line className="ig-axis" x1={PADL} x2={W - PADR} y1={H - PADB} y2={H - PADB} />

          {/* legacy first (behind) */}
          <polyline className="ig-line lg" points={poly(LEGACY)} />
          <polyline className="ig-line is" points={poly(INSTA)} />

          {/* active guide + dots */}
          {showTip && (
            <g>
              <line className="ig-guide" x1={xPix(ax)} x2={xPix(ax)} y1={PADT} y2={H - PADB} />
              <circle className="ig-dot lg" cx={xPix(ax)} cy={yPix(LEGACY[ax])} r={4.5} />
              <circle className="ig-dot is" cx={xPix(ax)} cy={yPix(INSTA[ax])} r={4.5} />
            </g>
          )}
        </svg>

        {/* tooltip */}
        {showTip && (
          <div className="ig-tip" style={{ left: `${leftPct}%` }}>
            <div className="ig-tip-h">{ax * 5} DAYS</div>
            <div className="ig-tip-row">
              <span className="ig-tip-k">InstaSafe</span>
              <span className="ig-tip-v is">{fmt(INSTA[ax] - INSTA[0])}</span>
            </div>
            <div className="ig-tip-row">
              <span className="ig-tip-k">Legacy VPN</span>
              <span className="ig-tip-v lg">{fmt(LEGACY[ax] - LEGACY[0])}</span>
            </div>
          </div>
        )}

        {/* axis labels */}
        <div className="ig-xaxis">
          {TICKS.map((d) => (
            <span key={d} style={{ left: `${(xPix((d / 120) * (N - 1)) / W) * 100}%` }}>{d}</span>
          ))}
        </div>
      </div>

      <div className="ig-foot">
        <span className="ig-cap">ACCESS STILL VERIFIED · ILLUSTRATIVE</span>
        <span className="ig-cap r">DAYS AFTER ROLLOUT</span>
      </div>

      <a className="ig-learn" href="/why-instasafe-zero-trust">
        Learn more {Arrow}
      </a>
    </div>
  );
}
