"use client";

import { useCallback, useRef, useState } from "react";

/* ============================================================
   Unification Slider (C29)
   The SAME grid of capabilities sits in both layers. On the
   bottom each box is coloured by the separate product that
   would normally manage it; drag the handle and the very same
   boxes turn orange — "available in InstaSafe", one platform.
   ============================================================ */

type Group = "vpn" | "id" | "dev" | "pam" | "log";

const GROUP_TAG: Record<Group, string> = {
  vpn: "VPN tool",
  id: "Identity tool",
  dev: "Device tool",
  pam: "Privileged-access tool",
  log: "Logs / SIEM tool",
};

const LEGEND: { g: Group; label: string }[] = [
  { g: "vpn", label: "VPN tool" },
  { g: "id", label: "Identity tool (SSO · MFA)" },
  { g: "dev", label: "Device tool (MDM)" },
  { g: "pam", label: "Privileged-access tool" },
  { g: "log", label: "Logs & monitoring (SIEM)" },
];

// 12 boxes — identical set & order in both layers, 3-col grid.
const BOXES: { label: string; g: Group }[] = [
  { label: "Remote access", g: "vpn" },
  { label: "Web filtering", g: "vpn" },
  { label: "Single sign-on", g: "id" },
  { label: "Multi-factor auth", g: "id" },
  { label: "User directory", g: "id" },
  { label: "Device binding", g: "dev" },
  { label: "Posture checks", g: "dev" },
  { label: "Endpoint controls", g: "dev" },
  { label: "Session recording", g: "pam" },
  { label: "Server (RDP/SSH) access", g: "pam" },
  { label: "Activity logs", g: "log" },
  { label: "Alerts & reports", g: "log" },
];

const TABLE: [string, boolean, boolean][] = [
  ["Remote desktops & apps (RDP/SSH)", false, true],
  ["Device security controls", false, true],
  ["Separate, isolated traffic paths", false, true],
  ["Built-in MFA and single sign-on", false, true],
  ["Only known, approved devices", false, true],
  ["Smart, context-aware access rules", false, true],
  ["Fine-grained, per-app permissions", false, true],
];

const Code = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
  </svg>
);
const Tick = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

function Grid({ variant }: { variant: "mess" | "one" }) {
  return (
    <div className="uni-grid">
      {BOXES.map((b, i) => (
        <div key={i} className="uni-box" data-g={b.g}>
          <span className="nm">{b.label}</span>
          <span className="tag">
            {variant === "one" ? (
              <>
                <Tick className="ck" />
                Available in InstaSafe
              </>
            ) : (
              GROUP_TAG[b.g]
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export function UnificationSlider() {
  const [pos, setPos] = useState(46);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let p = ((clientX - r.left) / r.width) * 100;
    p = Math.max(5, Math.min(95, p));
    setPos(p);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(5, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(95, p + 4));
  };

  return (
    <div className="uni">
      {/* colour-coding legend */}
      <div className="uni-legend">
        <span className="uni-leg is">
          <span className="sw" />
          Available in InstaSafe
        </span>
        {LEGEND.map((l) => (
          <span key={l.g} className="uni-leg">
            <span className="sw" style={{ background: `color-mix(in srgb, var(--uni-${l.g}) 18%, transparent)`, borderColor: `var(--uni-${l.g})` }} />
            {l.label}
          </span>
        ))}
      </div>

      <div className="uni-caption">
        <span className="before">Before · a separate tool for each</span>
        <span className="after">After · one InstaSafe</span>
      </div>

      <div
        ref={ref}
        className="uni-slider"
        style={{ ["--pos" as string]: `${pos}%` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {/* BOTTOM — the same boxes, each coloured by its own product */}
        <div className="uni-layer uni-before" aria-hidden>
          <Grid variant="mess" />
        </div>

        {/* TOP — the same boxes, all in the InstaSafe highlight */}
        <div className="uni-layer uni-after">
          <Grid variant="one" />
        </div>

        <span className="uni-divider" />
        <button
          type="button"
          className="uni-handle"
          role="slider"
          aria-label="Drag to compare — separate tools versus one InstaSafe platform"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={5}
          aria-valuemax={95}
          onKeyDown={onKey}
        >
          <Code />
        </button>
        <span className="uni-hint">drag to compare</span>
      </div>

      {/* cost stat */}
      <div className="uni-stat">
        <span className="big">up to 70%</span>
        <span className="lbl">lower cost than buying and stitching all those tools separately.</span>
      </div>

      {/* comparison table (reuses .iz-cmp) */}
      <table className="iz-cmp" style={{ marginTop: 24 }}>
        <thead>
          <tr>
            <th>What you get</th>
            <th>A stack of tools</th>
            <th className="ours">InstaSafe</th>
          </tr>
        </thead>
        <tbody>
          {TABLE.map(([cap, trad, ours]) => (
            <tr key={cap}>
              <td>{cap}</td>
              <td>{trad ? <span className="yes">✓ yes</span> : <span className="no">✗ no</span>}</td>
              <td className="ours">{ours ? <span className="yes">✓ yes</span> : <span className="no">✗ no</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
