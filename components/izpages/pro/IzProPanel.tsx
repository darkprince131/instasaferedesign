"use client";

import { useState } from "react";
import { ArrowUpRight, Warning } from "@phosphor-icons/react";
import type { Panel } from "./pro.config";

/* ============================================================
   IzProPanel — the one renderer for every slide's panel.

   Three kinds cover the whole page: `code`, `table`, `record`.
   A new slide should always be a new object in pro.config.tsx,
   never new JSX. If a slide genuinely needs a fourth shape, add
   the kind to the union there and one branch here.
   ============================================================ */

export function IzProPanel({ panel }: { panel: Panel }) {
  return (
    <div className="izpro-panel">
      {panel.kind === "code" && <CodeBody panel={panel} />}
      {panel.kind === "table" && <TableBody panel={panel} />}
      {panel.kind === "record" && <RecordBody panel={panel} />}
    </div>
  );
}

function Head({ label, right, href }: { label: string; right?: string; href?: string }) {
  return (
    <div className="izpro-phead">
      <span className="izpro-plabel">{label}</span>
      {right &&
        (href ? (
          <a className="izpro-paction" href={href}>
            {right}
            <ArrowUpRight weight="bold" aria-hidden="true" />
          </a>
        ) : (
          <span className="izpro-pright">{right}</span>
        ))}
    </div>
  );
}

/* ---------- code ---------- */

function CodeBody({ panel }: { panel: Extract<Panel, { kind: "code" }> }) {
  const [tab, setTab] = useState(panel.open ?? 0);
  return (
    <>
      {panel.head && <Head label={panel.head.label} right={panel.head.action?.label} href={panel.head.action?.href} />}
      <div className="izpro-tabs" role="tablist">
        {panel.tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={i === tab}
            className={`izpro-tab ${i === tab ? "on" : ""}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <pre className="izpro-code">
        <code>
          {panel.lines.map((ln, i) => (
            <span key={i} className="izpro-line" style={{ ["--in" as string]: ln[0] } as React.CSSProperties}>
              {ln[1].map((seg, j) => (
                <span key={j} className={`izpro-t-${seg[1]}`}>
                  {seg[0]}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </>
  );
}

/* ---------- table ---------- */

function TableBody({ panel }: { panel: Extract<Panel, { kind: "table" }> }) {
  return (
    <>
      {panel.head && <Head label={panel.head.label} right={panel.head.right} />}
      <div className="izpro-rows">
        {panel.rows.map((r) => (
          <div key={r.label} className={`izpro-row ${r.lit ? "lit" : ""}`}>
            <span className="izpro-rlabel">{r.label}</span>
            <span className={`izpro-rstatus t-${r.tone}`}>
              <i aria-hidden="true" />
              {r.status}
            </span>
            {r.value !== undefined && <span className="izpro-rvalue">{r.value}</span>}
          </div>
        ))}
      </div>
      {panel.total && (
        <div className={`izpro-total t-${panel.total.tone}`}>
          <span>{panel.total.label}</span>
          <b>
            {panel.total.value}
            {panel.total.tone === "deny" && <Warning weight="fill" aria-hidden="true" />}
          </b>
        </div>
      )}
    </>
  );
}

/* ---------- record ---------- */

function RecordBody({ panel }: { panel: Extract<Panel, { kind: "record" }> }) {
  return (
    <>
      {panel.head && <Head label={panel.head.label} right={panel.head.right} />}
      {panel.greeting && (
        <div className="izpro-greet">
          {panel.greeting.text} <b>{panel.greeting.id}</b>
        </div>
      )}
      {panel.stats && (
        <div className="izpro-stats">
          {panel.stats.map((s) => (
            <div key={s.label} className="izpro-stat">
              <span>{s.label}</span>
              <b>{s.value}</b>
            </div>
          ))}
        </div>
      )}
      {panel.timeline && (
        <div className="izpro-timeline">
          <span className="izpro-when">{panel.timeline.when}</span>
          <div className="izpro-chips">
            {panel.timeline.chips.map((c) => (
              <span key={c.label} className={`izpro-chip t-${c.tone ?? "mute"}`}>
                <i>{c.label}</i>
                {c.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
