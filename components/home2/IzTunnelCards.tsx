"use client";

import { useRef } from "react";
import { useHoverIndex } from "@/components/izpages/pro/useHoverIndex";

/* ============================================================
   00ba · IzTunnelCards — "per-session tunnels" on the 00an
   four-grid.

   Markup deliberately reuses 00an's `izug-*` classes (two heading
   cells, one copy cell, three case cells in a 2-col bordered grid,
   with the hover selection chrome) so this reads as the same
   component family rather than a lookalike. Only the stage content
   is ours: three tunnel scenes.

   MOTION CONTRACT (unchanged, do not regress): every animation is
   declared INSIDE `.is-live`. An animation that only exists while
   hovered is removed on leave, so the cell snaps back to its
   finished state and the next hover replays from frame zero.
   Every element's un-animated state is already its end state,
   which makes the touch and reduced-motion stills correct for free.
   ============================================================ */

const CASES = [
  {
    id: "dedicated",
    label: "Case 1 · Dedicated tunnel",
  },
  {
    id: "independent",
    label: "Case 2 · Independent tunnels",
  },
  {
    id: "isolation",
    label: "Case 3 · Session isolation",
  },
] as const;

function Node({ kind, label }: { kind: "user" | "app"; label: string }) {
  return (
    <span className={`iztc-node iztc-node--${kind}`}>
      <i aria-hidden="true" />
      <em>{label}</em>
    </span>
  );
}

function Tunnel({ n, dead }: { n: 1 | 2; dead?: boolean }) {
  return (
    <span className={`iztc-tunnel iztc-tunnel--${n}${dead ? " is-dead" : ""}`}>
      <span className="iztc-pipe" />
      {[0, 1, 2].map((p) => (
        <span key={p} className="iztc-packet" style={{ ["--p" as string]: p }} />
      ))}
      {dead && (
        <span className="iztc-lock" aria-hidden="true">
          ✕
        </span>
      )}
    </span>
  );
}

function Scene({ id }: { id: string }) {
  if (id === "dedicated") {
    return (
      <div className="iztc-scene">
        <Node kind="user" label="priya" />
        <Tunnel n={1} />
        <Node kind="app" label="erp-core" />
      </div>
    );
  }
  const iso = id === "isolation";
  return (
    <div className="iztc-scene iztc-scene--two">
      <Node kind="user" label="priya" />
      <div className="iztc-fan">
        <Tunnel n={1} dead={iso} />
        <Tunnel n={2} />
      </div>
      <div className="iztc-apps">
        <Node kind="app" label="erp-core" />
        <Node kind="app" label="jira" />
      </div>
    </div>
  );
}

export function IzTunnelCards({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { index, canHover } = useHoverIndex(ref, ".izug-cell");

  return (
    <div className={className ? `iztc ${className}` : "iztc"}>
      <div className="izug-grid" ref={ref}>
        <div className="izug-head">
          <h2>Your applications.</h2>
        </div>
        <div className="izug-head">
          <h2>Your tunnels.</h2>
        </div>

        <div className="izug-copy">
          <p>
            <b>One session never becomes another.</b>
            <br />
            Each authorised session gets its own encrypted tunnel scoped to a single resource. Two apps means two
            tunnels, each policy-checked on its own — so losing one loses exactly one.
          </p>
        </div>

        {CASES.map((c, i) => (
          <div
            key={c.id}
            className={`izug-cell${canHover && index === i ? " is-live" : ""}`}
            tabIndex={0}
            aria-label={c.label}
          >
            <span className="izug-field iz-gridfield" aria-hidden="true" />
            <span className="izug-sel" aria-hidden="true">
              <i className="izug-h izug-h--tl" />
              <i className="izug-h izug-h--tr" />
              <i className="izug-h izug-h--bl" />
              <i className="izug-h izug-h--br" />
            </span>

            <div className="izug-stage">
              <Scene id={c.id} />
            </div>

            <span className="izug-label">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
