"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { LogoMark } from "@/components/brand/Logo";

/* ============================================================
   IzVpnZtnaFlow — TIER 2 SECTION  (lab 00ak) — REBUILD

   "A VPN lets people onto the network.
    InstaSafe lets them into one app."

   WHY THE PREVIOUS VERSION WAS THROWN AWAY
   ----------------------------------------
   - Two hatched wedges pointed in unrelated directions; neither
     encoded narrowing, so the geometry said nothing.
   - The left half was ~60% empty scatter, the right half was
     crowded. No balance.
   - Green "allowed" / red "blocked" dots never connected to the app
     chips, so "allowed to reach WHAT" was never answered.
   - Two orphan L-arrows in the bottom band pointed nowhere, and the
     "Session"/"Verdict" chips floated with no leader to what they
     were labelling.
   - Worst: a red X reading "Blocked" CONTRADICTS the copy. "Blocked"
     means the host was reachable and refused you — which is exactly
     what a VPN plus an ACL does. Our claim is *never routable*.

   So in this rebuild NOTHING IS EVER BLOCKED. Denied hosts simply do
   not resolve: dashed, dimmed, "· no route". That absence is the
   entire argument, and it is why there is no red X and no "Blocked"
   label anywhere in this file.

   And because the argument is topological rather than chromatic, the
   tab REWIRES THE LINK GRAPH instead of recolouring it:
     vpn  — gateway fans out to all seven apps plus the rest of the
            subnet (many-to-many)
     ztna — gateway draws exactly one line, to the one host this
            session is entitled to (one-to-one)

   HOW IT IS DRAWN
   ---------------
   The link layer is an absolutely-positioned SVG under the three
   columns, drawn from LIVE element geometry (getBoundingClientRect)
   rather than from a fixed viewBox. That is what lets it survive the
   900px switch to a vertical stack, font swaps, and any container
   width — no coordinate table to re-tune. Redraw is rAF-wrapped and
   fires on mount, mode/session change, ResizeObserver on the stage,
   window resize, and document.fonts.ready.

   THEME-AWARE (user call, 2026-08-13). The band was `.iz-inverted`,
   i.e. always dark. It now follows the page theme like every other
   section: light on paper, dark on dark. Not one hex is hardcoded
   below, so this cost nothing but removing the class.
   ============================================================ */

type Mode = "vpn" | "ztna";

type App = { id: string; name: string; host: string };

const APPS: App[] = [
  { id: "crm", name: "CRM", host: "crm.internal" },
  { id: "payroll", name: "Payroll", host: "payroll.internal" },
  { id: "repos", name: "Source repos", host: "git.internal" },
  { id: "wiki", name: "Wiki", host: "wiki.internal" },
  { id: "ci", name: "Build server", host: "ci.internal" },
  { id: "files", name: "File share", host: "files.internal" },
  { id: "db", name: "Database console", host: "db.internal" },
];

type Check = { label: string; on: boolean };
type Session = { id: string; who: string; meta: string; grant: string; checks: Check[] };

/* Three deliberately different kinds of principal — an employee, a
   third party and a machine — because "one app each" has to hold for
   all three or it is just an employee feature. */
const SESSIONS: Session[] = [
  {
    id: "s1",
    who: "Priya R. — Finance",
    meta: "managed laptop · corporate IdP · in-domain",
    grant: "payroll",
    checks: [
      { label: "Identity", on: true },
      { label: "Managed device", on: true },
      { label: "Posture: 25 checks", on: true },
      { label: "Role: Finance", on: true },
    ],
  },
  {
    id: "s2",
    who: "Arjun M. — Contractor",
    meta: "unmanaged laptop · guest IdP · BYOD",
    grant: "repos",
    checks: [
      { label: "Identity", on: true },
      { label: "Managed device", on: false },
      { label: "Posture: partial", on: true },
      { label: "Role: Contractor", on: true },
    ],
  },
  {
    id: "s3",
    who: "build-agent-04 — Service account",
    meta: "CI runner · certificate · headless",
    grant: "ci",
    checks: [
      { label: "Certificate", on: true },
      { label: "Managed device", on: true },
      { label: "Posture: headless", on: true },
      { label: "Role: Build", on: true },
    ],
  },
];

/* VPN mode shows the same four rows for every session on purpose: the
   concentrator knows nothing beyond "a credential was accepted", so
   the other three are greyed as "not evaluated" rather than failed. */
const VPN_CHECKS: Check[] = [
  { label: "Credential accepted", on: true },
  { label: "Device state", on: false },
  { label: "Posture", on: false },
  { label: "Per-app rule", on: false },
];

const SVG_NS = "http://www.w3.org/2000/svg";

/* The one breakpoint that matters: past it the stage stacks and every
   link becomes a vertical bezier. Kept in lockstep with the same query
   in izvpnztna.css. */
const VERTICAL_Q = "(max-width: 900px)";

type Pt = { x: number; y: number };

export function IzVpnZtnaFlow({
  kicker = "Reachability",
  title = (
    <>
      A VPN lets people onto the network.
      <br />
      InstaSafe lets them into <em>one app</em>.
    </>
  ),
  sub = "Same people, same devices, same day. The only thing that changes is what a session can reach once it is connected.",
}: {
  kicker?: string;
  title?: React.ReactNode;
  sub?: string;
}) {
  /* DEFAULT IS "ztna" — the first thing a visitor sees is our own mark
     on the gateway, not a competitor's topology. */
  const [mode, setMode] = useState<Mode>("ztna");
  const [activeId, setActiveId] = useState<string>(SESSIONS[0].id);

  const active = SESSIONS.find((s) => s.id === activeId) ?? SESSIONS[0];
  const grantedApp = APPS.find((a) => a.id === active.grant) ?? APPS[0];
  const checks = mode === "vpn" ? VPN_CHECKS : active.checks;

  const stageRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gateRef = useRef<HTMLDivElement | null>(null);
  const restRef = useRef<HTMLParagraphElement | null>(null);
  const sessionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const appRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rafRef = useRef<number | null>(null);

  /* ---- the link layer -------------------------------------------------
     Imperative on purpose: React owns an EMPTY <svg>, this owns its
     children. Geometry is only knowable after layout, so re-rendering
     paths through state would mean a second commit per frame. */
  const draw = useCallback(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    const gateEl = gateRef.current;
    if (!stage || !svg || !gateEl) return;

    const box = stage.getBoundingClientRect();
    if (!box.width || !box.height) return;

    svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const g = gateEl.getBoundingClientRect();
    const gate: Pt = {
      x: g.left - box.left + g.width / 2,
      y: g.top - box.top + g.height / 2,
    };
    const vertical = window.matchMedia(VERTICAL_Q).matches;

    const link = (a: Pt, b: Pt, stroke: string, w: number, op: number, dashed = false) => {
      let d: string;
      if (vertical) {
        const my = (a.y + b.y) / 2;
        d = `M${a.x},${a.y} C${a.x},${my} ${b.x},${my} ${b.x},${b.y}`;
      } else {
        const mx = (a.x + b.x) / 2;
        d = `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
      }
      const p = document.createElementNS(SVG_NS, "path");
      p.setAttribute("d", d);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", stroke);
      p.setAttribute("stroke-width", String(w));
      p.setAttribute("stroke-linecap", "round");
      p.setAttribute("opacity", String(op));
      if (dashed) p.setAttribute("stroke-dasharray", "3 5");
      svg.appendChild(p);
    };

    /* ingress — every session reaches the gateway in both models. The
       chosen one is lit; the other two stay hairlines. */
    SESSIONS.forEach((s) => {
      const el = sessionRefs.current[s.id];
      if (!el) return;
      const r = el.getBoundingClientRect();
      const from: Pt = vertical
        ? { x: r.left - box.left + r.width / 2, y: r.bottom - box.top }
        : { x: r.right - box.left, y: r.top - box.top + r.height / 2 };
      const on = s.id === activeId;
      link(
        from,
        gate,
        on ? (mode === "vpn" ? "var(--deny)" : "var(--accent)") : "var(--line-strong)",
        on ? 1.6 : 1,
        on ? 1 : 0.45,
      );
    });

    /* egress — this is the whole comparison. */
    APPS.forEach((a) => {
      const el = appRefs.current[a.id];
      if (!el) return;
      const r = el.getBoundingClientRect();
      const to: Pt = vertical
        ? { x: r.left - box.left + r.width / 2, y: r.top - box.top }
        : { x: r.left - box.left, y: r.top - box.top + r.height / 2 };

      if (mode === "vpn") {
        link(gate, to, "var(--deny)", 1, 0.55);
      } else if (a.id === active.grant) {
        link(gate, to, "var(--accent)", 1.8, 1);
      }
      /* ztna + not granted => NO LINE AT ALL. Not a dimmed line, not a
         crossed-out line. The absence is the point. */
    });

    /* vpn only: the spray into everything else on the subnet */
    if (mode === "vpn" && restRef.current) {
      const rr = restRef.current.getBoundingClientRect();
      const to: Pt = vertical
        ? { x: rr.left - box.left + rr.width / 2, y: rr.top - box.top }
        : { x: rr.left - box.left, y: rr.top - box.top + rr.height / 2 };
      link(gate, to, "var(--deny)", 1, 0.4, true);
    }
  }, [mode, activeId, active.grant]);

  /* one scheduler for every trigger, so a resize storm costs one draw */
  const schedule = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    schedule();

    const stage = stageRef.current;
    const ro = new ResizeObserver(schedule);
    if (stage) ro.observe(stage);
    window.addEventListener("resize", schedule);

    /* Geometry moves when the webfonts land — the session rows and app
       rows both reflow — so redraw once more after that. */
    let alive = true;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (alive) schedule();
      });
    }

    return () => {
      alive = false;
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [schedule]);

  return (
    <section className="izvz iz-railed" aria-labelledby="izvz-title">
      <div className="iz-wrap izvz-head">
        <span className="izvz-kicker">
          {kicker}
          <i aria-hidden="true">_</i>
        </span>
        <h2 className="izvz-title" id="izvz-title">
          {title}
        </h2>
        <p className="izvz-sub">{sub}</p>
      </div>

      <div className="iz-wrap">
        <div className="izvz-band">
          {/* THE control. Centred above the stage so the two states read
              as one object changing rather than two things compared. */}
          <div className="izvz-switch-wrap">
            <div className="izvz-switch" role="tablist" aria-label="Access model">
              <button
                type="button"
                role="tab"
                id="izvz-tab-vpn"
                aria-selected={mode === "vpn"}
                aria-controls="izvz-stage"
                className="izvz-switch-btn"
                onClick={() => setMode("vpn")}
              >
                With a VPN
              </button>
              <button
                type="button"
                role="tab"
                id="izvz-tab-ztna"
                aria-selected={mode === "ztna"}
                aria-controls="izvz-stage"
                className="izvz-switch-btn"
                onClick={() => setMode("ztna")}
              >
                With InstaSafe
              </button>
            </div>
          </div>

          {/* Restates the mode in plain words AND names the one host that
              resolved, so screen readers hear something on a session
              change too, not only on a mode change. */}
          {/* TWO LENGTHS, ONE ARGUMENT. Both are rendered and CSS picks
              one, rather than a media-query hook — a JS pick would render
              the desktop string on the server and swap it after
              hydration, which on a phone is a visible rewrite of the
              paragraph you just started reading.

              The brief version is not a truncation; it is the same claim
              with the elaboration removed. Whichever is shown still names
              the mode, what the gateway does or does not know, and what
              the session can reach — which is the whole of it. */}
          <p className="izvz-caption" aria-live="polite">
            <span className="izvz-caption-full">
              {mode === "vpn" ? (
                <>
                  <b>With a VPN:</b> one credential, one tunnel, one flat network. The concentrator does not know which
                  application this session is for, so it hands over <b>the whole subnet</b> and leaves the rest to
                  firewall rules. Picking a different person changes nothing — they all land in the same place.
                </>
              ) : (
                <>
                  <b>With InstaSafe:</b> identity, device and posture are checked, then the gateway resolves{" "}
                  <b>exactly one host</b> for this session — <b>{grantedApp.host}</b>. The other six are not denied at
                  the door; they never appear.
                </>
              )}
            </span>
            <span className="izvz-caption-brief">
              {mode === "vpn" ? (
                <>
                  <b>With a VPN:</b> one tunnel onto <b>the whole subnet</b>. Everyone lands in the same place.
                </>
              ) : (
                <>
                  <b>With InstaSafe:</b> checks pass, then <b>one host</b> resolves — <b>{grantedApp.host}</b>. The
                  other six never appear.
                </>
              )}
            </span>
          </p>

          <div className="izvz-stage" id="izvz-stage" data-mode={mode} ref={stageRef}>
            <svg className="izvz-links" ref={svgRef} aria-hidden="true" preserveAspectRatio="none" />

            {/* ---------- COLUMN 1 — sessions ---------- */}
            <div className="izvz-col">
              <div className="izvz-col-label">
                Incoming sessions <span aria-hidden="true">03</span>
              </div>

              {SESSIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="izvz-session"
                  aria-pressed={s.id === activeId}
                  onClick={() => setActiveId(s.id)}
                  ref={(el) => {
                    sessionRefs.current[s.id] = el;
                  }}
                >
                  <span className="izvz-session-who">{s.who}</span>
                  <span className="izvz-session-meta">{s.meta}</span>
                </button>
              ))}
            </div>

            {/* ---------- COLUMN 2 — the gateway ---------- */}
            <div className="izvz-col izvz-gate">
              <div className="izvz-gate-node" ref={gateRef} data-mode={mode}>
                {mode === "ztna" ? (
                  /* forceTheme stays pinned even though the band is now
                     theme-aware: the TILE under the mark is accent orange
                     in both themes, so auto-detection would put the
                     colour mark on a paper page — orange on orange. The
                     white mark is the one that reads on this tile,
                     whatever the page is doing. */
                  <LogoMark size={36} forceTheme="dark" />
                ) : (
                  /* the concentrator: a ring, not a brand. Deny-tinted,
                     never crossed out — it works, that is the problem. */
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="2.2" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="9.6" />
                    <path d="M12 2.4v3.6M12 18v3.6M2.4 12h3.6M18 12h3.6" />
                  </svg>
                )}
              </div>

              <div className="izvz-gate-name">{mode === "vpn" ? "VPN concentrator" : "InstaSafe gateway"}</div>

              <div className="izvz-checks">
                {checks.map((c) => (
                  <div key={c.label} className={`izvz-check${c.on ? "" : " izvz-check--off"}`}>
                    <span className="izvz-check-dot" aria-hidden="true" />
                    {c.label}
                    {c.on ? "" : " — not evaluated"}
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- COLUMN 3 — the application estate ---------- */}
            <div className="izvz-col">
              <div className="izvz-col-label">
                Application estate <span aria-hidden="true">07</span>
              </div>

              {APPS.map((a) => {
                /* three states, and none of them is "blocked":
                   granted  — routed for this session
                   exposed  — reachable because the network is reachable
                   dark     — does not resolve */
                const state = mode === "vpn" ? "exposed" : a.id === active.grant ? "granted" : "dark";
                return (
                  <div
                    key={a.id}
                    className="izvz-app"
                    data-state={state}
                    ref={(el) => {
                      appRefs.current[a.id] = el;
                    }}
                  >
                    <span className="izvz-app-name">{a.name}</span>
                    <span className="izvz-app-host">{a.host}</span>
                  </div>
                );
              })}

              <p className="izvz-rest" ref={restRef}>
                {mode === "vpn"
                  ? "+ 214 further hosts on 10.0.0.0/8 — discoverable, scannable, one hop away"
                  : "10.0.0.0/8 — no route offered, nothing to discover"}
              </p>
            </div>
          </div>

          <div className="izvz-legend">
            <span>
              <i className="izvz-key izvz-key--route" aria-hidden="true" />
              Routed for this session
            </span>
            <span>
              <i className="izvz-key izvz-key--open" aria-hidden="true" />
              Reachable because the network is reachable
            </span>
            <span>
              <i className="izvz-key izvz-key--none" aria-hidden="true" />
              Does not resolve
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
