"use client";

import { useState } from "react";
import {
  CaretRight, Package, Cloud, Database, Terminal, PhoneCall,
  Stack, Code, ShieldCheck, Record, Prohibit, CheckCircle, Key,
  Browsers, HardDrives, GitBranch, Wrench, Cube, Lock,
  type Icon,
} from "@phosphor-icons/react";
import { useDrawIn } from "@/components/iz-fx/useDrawIn";
import { LogoMark } from "@/components/brand/Logo";
import { PersonaAvatar } from "./PersonaAvatar";

/* ============================================================
   Group C · "reaching something awkward" — on the 00ah chassis
   (IzUseCaseSwitch: accordion left, a visual that belongs to the
   OPEN tab right).

   Two things carried over from 00ah verbatim, because they are the
   reasons it works:
     - every tab owns its own visual. Swapping only the text under a
       fixed picture is what makes these sections read as filler.
     - the visual is REMOVED below 900px rather than squeezed, so
       each description is always rendered and nothing is state-gated
       behind a picture that isn't there.

   What this adds over 00ah is a third column: the spec readout. The
   five cases differ on transport, protocol and access model, and
   those differences ARE the argument — a case that only changed its
   picture would not be making one.

   The diagram draws itself in via `useDrawIn` (stroke-dashoffset →
   0), re-armed on every tab change by the `key` on the figure.
   ============================================================ */

type Spec = { Icon: Icon; label: string; value: string; tone?: "accent" | "ok" };
type Node = { Icon: Icon; a: string; b?: string };

type Case = {
  id: string;
  title: string;
  /** accordion copy — on a phone this text IS the section */
  desc: string;
  Icon: Icon;
  /** diagram */
  headline: string;
  blurb: string;
  actor: { a: string; b?: string };
  groupLabel: string;
  targets: Node[];
  tunnel: string;
  /** the one line under the diagram */
  fact: string;
  specs: Spec[];
};

const CASES: Case[] = [
  {
    id: "legacy",
    title: "Legacy Applications",
    desc: "Thick-client ERP, client-server systems, custom TCP and UDP. These never worked behind a web proxy, so they stayed on the VPN. InstaSafe carries them at the IP layer.",
    Icon: Package,
    headline: "Legacy Applications",
    blurb: "Access thick-client ERP, client-server systems and custom TCP/UDP applications at the IP layer.",
    actor: { a: "User" },
    groupLabel: "Legacy Systems",
    targets: [
      { Icon: Cube, a: "Thick-client", b: "ERP" },
      { Icon: Browsers, a: "Client-Server", b: "Application" },
      { Icon: Terminal, a: "Custom TCP", b: "/ UDP" },
    ],
    tunnel: "Encrypted Tunnel (L3 / L4)",
    fact: "Access at L3/L4, not just L7. VPN replacement for the real world.",
    specs: [
      { Icon: Stack, label: "Transport Layer", value: "L3 / L4 (IP Layer)", tone: "accent" },
      { Icon: Code, label: "Protocols", value: "TCP, UDP", tone: "accent" },
      { Icon: ShieldCheck, label: "Access Model", value: "Per-session tunnel", tone: "accent" },
      { Icon: Record, label: "Visibility", value: "Session recorded", tone: "accent" },
      { Icon: Prohibit, label: "VPN Required", value: "No", tone: "ok" },
      { Icon: CheckCircle, label: "Works With", value: "Thick-client, Client-Server, Custom TCP/UDP", tone: "ok" },
    ],
  },
  {
    id: "cloud",
    title: "Secure Cloud & Multi-Cloud",
    desc: "One access policy across AWS, Azure, GCP and your own data centre — instead of one per cloud console.",
    Icon: Cloud,
    headline: "Secure Cloud & Multi-Cloud",
    blurb: "One consistent access policy across every cloud and data centre — no separate network per environment.",
    actor: { a: "User /", b: "Workload" },
    groupLabel: "Environments",
    targets: [
      { Icon: Cloud, a: "AWS" },
      { Icon: Cloud, a: "Microsoft Azure" },
      { Icon: Cloud, a: "Google Cloud" },
      { Icon: HardDrives, a: "On-prem", b: "Data Centre" },
    ],
    tunnel: "Encrypted Tunnel (End-to-end)",
    fact: "One policy. Every environment. Consistent security everywhere.",
    specs: [
      { Icon: Stack, label: "Policy Model", value: "One policy across all environments", tone: "accent" },
      { Icon: Code, label: "Cloud Support", value: "AWS, Azure, GCP, On-prem Data Centre", tone: "accent" },
      { Icon: ShieldCheck, label: "Access Model", value: "Per-session tunnel", tone: "accent" },
      { Icon: Record, label: "Visibility", value: "Full session visibility and logging", tone: "accent" },
      { Icon: Prohibit, label: "VPN Required", value: "No", tone: "ok" },
      { Icon: CheckCircle, label: "Deployment", value: "Cloud, On-prem, Hybrid", tone: "ok" },
    ],
  },
  {
    id: "database",
    title: "Database Access",
    desc: "Analysts and engineers reach the database without the network it sits on, with the query session logged.",
    Icon: Database,
    headline: "Database Access",
    blurb: "Analysts and engineers reach the database without the network it sits on, with the query session logged.",
    actor: { a: "Analyst /", b: "Engineer" },
    groupLabel: "Databases",
    targets: [
      { Icon: Database, a: "Oracle" },
      { Icon: Database, a: "PostgreSQL" },
      { Icon: Database, a: "MySQL" },
      { Icon: Database, a: "SQL Server" },
    ],
    tunnel: "Encrypted Tunnel (Per Database)",
    fact: "Per-session, per-database tunnels with full query session logging.",
    specs: [
      { Icon: Stack, label: "Transport Layer", value: "L3 / L4 (IP Layer)", tone: "accent" },
      { Icon: Code, label: "Protocols", value: "TCP", tone: "accent" },
      { Icon: ShieldCheck, label: "Access Model", value: "Per-session, per-database tunnel", tone: "accent" },
      { Icon: Record, label: "Visibility", value: "Query session logged", tone: "accent" },
      { Icon: Key, label: "VPN Required", value: "No", tone: "ok" },
      { Icon: CheckCircle, label: "Supported Databases", value: "Oracle, PostgreSQL, MySQL, SQL Server", tone: "ok" },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    desc: "SSH and internal tooling behind identity and device checks, without distributing keys to laptops.",
    Icon: Terminal,
    headline: "DevOps Access",
    blurb: "Secure access to SSH and internal tools with identity and device verification. No keys on laptops. No sprawl.",
    actor: { a: "Developer /", b: "DevOps Engineer" },
    groupLabel: "DevOps Resources",
    targets: [
      { Icon: Terminal, a: "SSH", b: "Servers" },
      { Icon: GitBranch, a: "Git", b: "Server" },
      { Icon: Cube, a: "Kubernetes", b: "API" },
      { Icon: Wrench, a: "Internal", b: "Tools" },
    ],
    tunnel: "Encrypted Tunnel (Short-lived Access)",
    fact: "Short-lived access. No keys distributed. Every session recorded.",
    specs: [
      { Icon: Stack, label: "Access Layer", value: "L3 / L4 (IP Layer)", tone: "accent" },
      { Icon: Code, label: "Protocols", value: "SSH, HTTPS, K8s API, Git, Custom TCP", tone: "accent" },
      { Icon: ShieldCheck, label: "Access Model", value: "Short-lived, per-session tunnel", tone: "accent" },
      { Icon: Record, label: "Visibility", value: "Session recorded", tone: "accent" },
      { Icon: Key, label: "Key Distribution", value: "No", tone: "ok" },
      { Icon: CheckCircle, label: "Access Expiry", value: "Time-bound (Configurable)", tone: "ok" },
    ],
  },
  {
    id: "voip",
    title: "Secure VoIP",
    desc: "Voice infrastructure and softphones that break behind a standard proxy, carried securely without opening the network.",
    Icon: PhoneCall,
    headline: "Secure VoIP Access",
    blurb: "Voice infrastructure and softphones that break behind a standard proxy, carried securely without opening the network.",
    actor: { a: "User /", b: "Softphone" },
    groupLabel: "Voice Infrastructure",
    targets: [
      { Icon: PhoneCall, a: "PBX /", b: "Call Manager" },
      { Icon: Terminal, a: "SBC" },
      { Icon: PhoneCall, a: "Voice Server" },
    ],
    tunnel: "Encrypted Tunnel (UDP-capable)",
    fact: "UDP-capable tunnels for reliable, high-quality voice.",
    specs: [
      { Icon: Stack, label: "Transport Layer", value: "L3 / L4 (IP Layer)", tone: "accent" },
      { Icon: Code, label: "Protocols", value: "UDP, TCP (SIP, RTP, SRTP)", tone: "accent" },
      { Icon: ShieldCheck, label: "Access Model", value: "Per-session tunnel", tone: "accent" },
      { Icon: Record, label: "Visibility", value: "Call session visibility and logging", tone: "accent" },
      { Icon: Prohibit, label: "VPN Required", value: "No", tone: "ok" },
      { Icon: CheckCircle, label: "Optimized For", value: "Low latency, high-quality voice", tone: "ok" },
    ],
  },
];

/* ---- wire geometry, all in the 640x470 viewBox ----
   The gateway's outer ring: centre (302,234), r 64 — 47.2%/49.8% of the
   plate and half of the 20cqw ring box. Every route TOUCHES this circle:
   endpoints computed from it, never eyeballed. The first pass hand-placed
   endpoints tuned for a smaller ring and they landed 14 units inside the
   grown one, which is exactly what read as stray lines. */
const GC = { x: 302, y: 234, r: 64 };
/** where routes disappear behind the cards — the SVG paints UNDER the
    DOM, so ending a few units past a card's edge gives clean contact
    with no gap arithmetic */
const ACTOR_EDGE = 147;
const CARD_EDGE = 430;
const BUS_X = 390;

/** corner-rounded polyline — same idiom as the hero's routes */
function rounded(pts: [number, number][], r: number) {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const d1 = Math.hypot(cx - px, cy - py) || 1;
    const d2 = Math.hypot(nx - cx, ny - cy) || 1;
    const rr = Math.min(r, d1 / 2, d2 / 2);
    const a = [cx + ((px - cx) / d1) * rr, cy + ((py - cy) / d1) * rr];
    const b = [cx + ((nx - cx) / d2) * rr, cy + ((ny - cy) / d2) * rr];
    d += ` L ${a[0].toFixed(1)} ${a[1].toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

/** exit point on the ring, fanned across its right arc */
function ringPort(i: number, n: number) {
  const t = n > 1 ? (i - (n - 1) / 2) / ((n - 1) / 2) : 0;
  const a = (t * 38 * Math.PI) / 180;
  return { x: GC.x + GC.r * Math.cos(a), y: GC.y + GC.r * Math.sin(a) };
}

/** The routed part of the diagram. Everything here is stroked so the
 *  draw-in has something to draw; the cards on top of it are DOM. */
function Wires({ targets }: { targets: number }) {
  const ref = useDrawIn<SVGSVGElement>({ stagger: 70, duration: 620 });
  /* Rows are evenly spread over the stack's height whatever the count,
     so three targets and four targets both land centred on the gateway. */
  const top = 74;
  const step = 320 / Math.max(targets, 1);
  const ys = Array.from({ length: targets }, (_, i) => top + step * (i + 0.5));
  return (
    <svg className="izgc-wires iz-draw" viewBox="0 0 640 470" ref={ref} aria-hidden="true">
      {/* actor -> ring, dead level on the centreline */}
      <path className="w" d={`M ${ACTOR_EDGE} ${GC.y} L ${GC.x - GC.r} ${GC.y}`} />

      {/* ring -> target: ONE path each, leaving the circumference on a
          fanned port, elbowing once at the bus, arriving level. Single
          paths with rounded corners are what make it read as routed —
          the old separate-line bus met itself in bare T-crossings. */}
      {ys.map((y, i) => {
        const p = ringPort(i, targets);
        return (
          <path
            className="w"
            key={y}
            d={rounded(
              [
                [p.x, p.y],
                [BUS_X, p.y],
                [BUS_X, y],
                [CARD_EDGE, y],
              ],
              10
            )}
          />
        );
      })}

      {/* the tunnel: under everything, legs rising behind the two cards */}
      <path className="w t" d={rounded([[93, 240], [93, 404], [519, 404], [519, 240]], 12)} />

      {/* verification taps: circumference to chip, both touching */}
      <path className="w v" d={`M ${GC.x} 144 L ${GC.x} ${GC.y - GC.r}`} />
      <path className="w v" d={`M ${GC.x} ${GC.y + GC.r} L ${GC.x} 316`} />
    </svg>
  );
}

function Diagram({ c }: { c: Case }) {
  return (
    <div className="izgc-dia">
      <Wires targets={c.targets.length} />

      <span className="izgc-chip izgc-chip--id">
        <CheckCircle weight="fill" aria-hidden="true" /> Identity Verified
      </span>

      {/* the actor is a PERSON — the drawn avatar, not a glyph. This is
          the single biggest thing separating an illustration from a
          flowchart node. */}
      <span className="izgc-actor">
        <PersonaAvatar className="izgc-avatar" />
        <b>
          {c.actor.a}
          {c.actor.b && (
            <>
              <br />
              {c.actor.b}
            </>
          )}
        </b>
      </span>

      {/* the real brand mark on a lit core, rings around it — the same
          object language as the hero's platter */}
      <span className="izgc-gw">
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <span className="izgc-gw-core" aria-hidden="true">
          <LogoMark size={64} />
        </span>
        <b>
          InstaSafe
          <br />
          ZTNA Gateway
        </b>
      </span>

      <span className="izgc-chip izgc-chip--dev">
        <CheckCircle weight="fill" aria-hidden="true" /> Device Checked
      </span>

      <div className="izgc-stack">
        <span className="izgc-stack-h">{c.groupLabel}</span>
        {c.targets.map((t, i) => (
          <span
            className="izgc-node"
            key={t.a + (t.b ?? "")}
            style={{ ["--i" as string]: i } as React.CSSProperties}
          >
            <span className="izgc-node-ic" aria-hidden="true">
              <t.Icon weight="regular" />
            </span>
            <b>
              {t.a}
              {t.b && (
                <>
                  <br />
                  {t.b}
                </>
              )}
            </b>
          </span>
        ))}
      </div>

      <span className="izgc-tunnel">
        <i aria-hidden="true">
          <Lock weight="regular" />
        </i>
        {c.tunnel}
      </span>
    </div>
  );
}

export function IzGroupC({
  kicker = "Group C",
  title = (
    <>
      The applications that <mark>kept the VPN alive.</mark>
    </>
  ),
  sub = "From legacy systems to cloud workloads and voice infrastructure, InstaSafe ZTNA gives you secure, identity-verified access to every application — without opening your network.",
  mobileVisual = "static",
}: {
  kicker?: string;
  title?: React.ReactNode;
  sub?: string;
  /** The two mobile treatments under test. "static": the diagram stays,
      stripped of every animation, below the accordion. "none": 00ah's
      own rule — the visual is removed and the copy carries the section.
      The spec column is gone on phones in BOTH: a readout about a
      diagram is a table once the diagram can't sit beside it. */
  mobileVisual?: "static" | "none";
}) {
  const [open, setOpen] = useState(0);
  const active = CASES[open];

  return (
    <section className={`izgc iz-railed izgc--m${mobileVisual}`}>
      <div className="iz-wrap izgc-head">
        <div className="izgc-head-l">
          <h2 className="izgc-title">{title}</h2>
        </div>
        <p className="izgc-sub">{sub}</p>
      </div>

      <div className="iz-wrap izgc-body">
        {/* ---------- accordion ---------- */}
        <div className="izgc-acc" role="tablist" aria-label="Access scenarios">
          {CASES.map((c, i) => {
            const on = i === open;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="izgc-panel"
                className={`izgc-item${on ? " on" : ""}`}
                onClick={() => setOpen(i)}
              >
                <span className="izgc-ico" aria-hidden="true">
                  <c.Icon weight="regular" />
                </span>
                <span className="izgc-txt">
                  <b>{c.title}</b>
                  {/* ALWAYS in the DOM — below 900px the visual is gone and
                      this copy carries the whole section on its own. It is
                      only COLLAPSED on desktop, where the open row's visual
                      is doing the explaining; rendering all five expanded
                      there made the column 1171px tall against ~700px of
                      diagram. */}
                  <span className="izgc-desc">
                    <span>{c.desc}</span>
                  </span>
                </span>
                <CaretRight className="izgc-caret" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        {/* ---------- the visual for the OPEN case ---------- */}
        <div className="izgc-vis" id="izgc-panel" role="tabpanel">
          <div className="izgc-vis-h">
            <span className="izgc-vis-ico" aria-hidden="true">
              <active.Icon weight="regular" />
            </span>
            <div>
              <h3>{active.headline}</h3>
              <p>{active.blurb}</p>
            </div>
          </div>

          {/* keyed so useDrawIn re-arms and the diagram redraws per tab */}
          <div key={active.id} className="izgc-dia-wrap">
            <Diagram c={active} />
          </div>

          <p className="izgc-fact">
            <ShieldCheck weight="regular" aria-hidden="true" />
            {active.fact}
          </p>
        </div>

        {/* ---------- spec readout ---------- */}
        {/* keyed per tab so the whole readout re-enters: rows fade in
            top-to-bottom on a stagger driven by --i — the repopulate
            move from the reference video, not a hard swap */}
        <dl className="izgc-specs" key={`s-${active.id}`}>
          {active.specs.map((s, i) => (
            <div
              className="izgc-spec"
              key={s.label}
              style={{ ["--i" as string]: i } as React.CSSProperties}
            >
              <span className="izgc-spec-ic" aria-hidden="true">
                <s.Icon weight="regular" />
              </span>
              <div>
                <dt>{s.label}_</dt>
                <dd className={s.tone ? `t-${s.tone}` : undefined}>{s.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
