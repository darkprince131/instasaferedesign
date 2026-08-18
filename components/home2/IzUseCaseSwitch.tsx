"use client";

import { useState } from "react";
import {
  CaretDown,
  DeviceMobile,
  Laptop,
  Browser,
  HardDrives,
  ArrowRight,
  type Icon,
} from "@phosphor-icons/react";
import { useDrawIn } from "@/components/iz-fx/useDrawIn";

/* ============================================================
   IzUseCaseSwitch — TIER 2 SECTION  (lab 00ah)

   Ported from the "Build safe and seamless products" section on
   fingerprint.com's homepage.

   Structure they use, and the reasons it works:
     - The section splits at 50% with a dashed rail. The header owns
       the LEFT half only; the right half of that band is deliberately
       empty. That empty half is what makes the visual below feel like
       it belongs to a second register.
     - Below a dashed rule: accordion left, visual right. Open item
       ~150px, closed ~77px — the closed rows stay tall enough to be
       comfortable targets, so it never reads as a cramped list.
     - EVERY tab owns its own visual. Swapping only the text under a
       fixed picture is the thing that makes these sections feel cheap.

   Mobile: the visual is `display:none` — verified, that is exactly
   what they do — and the accordion carries the whole message alone.
   Each item's description is therefore always rendered, never
   hover-only, so nothing is lost.

   The outline artwork draws itself in via useDrawIn (stroke-dashoffset
   → 0), re-armed on every tab change by the `key` on the figure.
   ============================================================ */

type Row = { label: string; value: string; tone?: "allow" | "deny" | "accent" };

export type IzUseCase = {
  id: string;
  title: string;
  desc: string;
  Icon: Icon;
  /** which outline drawing this case shows */
  art: "phone" | "laptop" | "browser" | "server";
  headline: { label: string; value: string };
  score: { label: string; value: string };
  rows: Row[];
};

const CASES: IzUseCase[] = [
  {
    id: "unmanaged",
    title: "Unmanaged devices",
    desc: "Let contractors and vendors in from their own laptops without putting the network behind them at risk.",
    Icon: Laptop,
    art: "laptop",
    headline: { label: "Session ID", value: "sx_9F2ke6WRQIDdtH4" },
    score: { label: "Risk score", value: "2" },
    rows: [
      { label: "Device", value: "Unmanaged · BYOD" },
      { label: "Disk encryption", value: "On", tone: "allow" },
      { label: "Screen capture", value: "Blocked", tone: "allow" },
      { label: "Download to disk", value: "Blocked", tone: "allow" },
    ],
  },
  {
    id: "vpn",
    title: "VPN replacement",
    desc: "Retire the always-on tunnel. Publish applications instead of networks, so nobody lands on a subnet again.",
    Icon: HardDrives,
    art: "server",
    headline: { label: "Broker", value: "in-west-1.instasafe" },
    score: { label: "Apps reachable", value: "4" },
    rows: [
      { label: "Network exposed", value: "No", tone: "allow" },
      { label: "Tunnel mode", value: "App-scoped" },
      { label: "Lateral movement", value: "Not possible", tone: "allow" },
      { label: "Handshake", value: "240 ms" },
    ],
  },
  {
    id: "thirdparty",
    title: "Third-party access",
    desc: "Vendors reach exactly one application, for exactly one window, and every action lands in the audit trail.",
    Icon: Browser,
    art: "browser",
    headline: { label: "Grant", value: "jit_4471_reports-db" },
    score: { label: "Expires in", value: "42m" },
    rows: [
      { label: "Scope", value: "reports-db : read" },
      { label: "Approved by", value: "sophia.m", tone: "allow" },
      { label: "Session recording", value: "On", tone: "allow" },
      { label: "Standing access", value: "None", tone: "allow" },
    ],
  },
  {
    id: "travel",
    title: "Impossible travel",
    desc: "Two logins no aircraft could connect. The second one is challenged and then closed, before anything opens.",
    Icon: DeviceMobile,
    art: "phone",
    headline: { label: "Session ID", value: "sx_11Bq0zMTLp8xw2" },
    score: { label: "Risk score", value: "87" },
    rows: [
      { label: "Origin", value: "Pune, IN" },
      { label: "Second origin", value: "Toronto, CA", tone: "deny" },
      { label: "Implied speed", value: "41,200 km/h", tone: "deny" },
      { label: "Session", value: "Terminated", tone: "deny" },
    ],
  },
];

/* ---------- outline artwork ----------
   Deliberately simple line drawings: 1.25px strokes, no fills, a
   single accent element each. They exist to be DRAWN, so every shape
   here has to be a stroked path — a filled shape has no outline to
   animate. Anything decorative that shouldn't draw carries
   data-draw="skip". */

function Art({ kind }: { kind: IzUseCase["art"] }) {
  const ref = useDrawIn<SVGSVGElement>({ stagger: 110, duration: 850 });
  const common = {
    fill: "none",
    stroke: "var(--il-ink, currentColor)",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const accent = { ...common, stroke: "var(--accent)", strokeWidth: 1.5 };

  return (
    <svg ref={ref} className="izuc-art" viewBox="0 0 220 300" role="img" aria-label={`${kind} outline illustration`}>
      {kind === "phone" && (
        <>
          <rect {...common} x="60" y="24" width="100" height="252" rx="16" />
          <line {...common} x1="94" y1="42" x2="126" y2="42" />
          <rect {...common} x="76" y="88" width="68" height="10" rx="5" />
          <rect {...common} x="76" y="112" width="68" height="10" rx="5" />
          <rect {...accent} x="76" y="150" width="68" height="24" rx="8" />
          <circle {...accent} cx="110" cy="222" r="18" />
        </>
      )}
      {kind === "laptop" && (
        <>
          <rect {...common} x="34" y="70" width="152" height="106" rx="8" />
          <path {...common} d="M20 190h180l-12 22H32z" />
          <line {...common} x1="60" y1="98" x2="132" y2="98" />
          <line {...common} x1="60" y1="118" x2="112" y2="118" />
          <rect {...accent} x="60" y="140" width="52" height="18" rx="7" />
          <circle {...accent} cx="160" cy="148" r="12" />
        </>
      )}
      {kind === "browser" && (
        <>
          <rect {...common} x="24" y="62" width="172" height="150" rx="10" />
          <line {...common} x1="24" y1="88" x2="196" y2="88" />
          <circle {...common} cx="38" cy="75" r="3" />
          <circle {...common} cx="50" cy="75" r="3" />
          <circle {...common} cx="62" cy="75" r="3" />
          <line {...common} x1="48" y1="116" x2="150" y2="116" />
          <line {...common} x1="48" y1="136" x2="120" y2="136" />
          <rect {...accent} x="48" y="160" width="60" height="20" rx="8" />
        </>
      )}
      {kind === "server" && (
        <>
          <rect {...common} x="46" y="58" width="128" height="46" rx="8" />
          <rect {...common} x="46" y="122" width="128" height="46" rx="8" />
          <rect {...common} x="46" y="186" width="128" height="46" rx="8" />
          <line {...common} x1="66" y1="81" x2="104" y2="81" />
          <line {...common} x1="66" y1="145" x2="104" y2="145" />
          <circle {...accent} cx="150" cy="81" r="6" />
          <circle {...accent} cx="150" cy="145" r="6" />
          <circle {...common} cx="150" cy="209" r="6" />
        </>
      )}
    </svg>
  );
}

/* ============================================================
   CASES ARE INJECTABLE (2026-08-13).

   They were hardcoded, so the block could only ever illustrate the
   four generic use cases below whatever headline a page gave it. On
   /zero-trust-application-access that produced a real mismatch: the
   heading promised "Same portal. Very different people" and then
   listed use-case CATEGORIES — unmanaged devices, VPN replacement —
   which are not people. Pass `cases` to say what the headline says.
   Omit it and every existing caller is unchanged.
   ============================================================ */
export function IzUseCaseSwitch({
  cases = CASES,
  kicker = "What we solve",
  title = (
    <>
      Get people in. <mark>Keep everything else out.</mark>
    </>
  ),
  sub = "One gate in front of every application. Less friction for the people who belong. No route at all for anyone who doesn't.",
  cta = { label: "See all use cases", href: "/solutions" },
}: {
  cases?: IzUseCase[];
  kicker?: string;
  title?: React.ReactNode;
  sub?: string;
  cta?: { label: string; href: string };
}) {
  const [open, setOpen] = useState(0);
  const active = cases[open];

  return (
    <section className="izuc iz-railed">
      {/* header band — left half only, on purpose */}
      <div className="iz-wrap izuc-head">
        <div className="izuc-head-l">
          <span className="izuc-kicker">
            {kicker}
            <i aria-hidden="true">_</i>
          </span>
          <h2 className="izuc-title">{title}</h2>
          <p className="izuc-sub">{sub}</p>
          <a className="izuc-cta" href={cta.href}>
            {cta.label}
          </a>
        </div>
      </div>

      <hr className="iz-bd-dashrule" />

      <div className="iz-wrap izuc-body">
        <div className="izuc-acc">
          {cases.map((c, i) => {
            const on = i === open;
            return (
              <div key={c.id} className={`izuc-item ${on ? "on" : ""}`}>
                <button
                  type="button"
                  className="izuc-btn"
                  aria-expanded={on}
                  aria-controls={`izuc-p-${c.id}`}
                  onClick={() => setOpen(i)}
                >
                  <span className="izuc-ico" aria-hidden="true">
                    <c.Icon weight="regular" />
                  </span>
                  <span className="izuc-name">{c.title}</span>
                  <CaretDown className="izuc-caret" aria-hidden="true" />
                </button>
                {/* always rendered: on phones this text IS the section,
                    because the visual is gone */}
                <div id={`izuc-p-${c.id}`} className="izuc-panel">
                  <p>{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* visual — hidden below 900px, exactly as the reference does */}
        <div className="izuc-visual" aria-hidden="true">
          <figure key={active.id} className="izuc-fig">
            <Art kind={active.art} />
          </figure>

          <div className="izuc-inspect">
            <div className="izuc-irow izuc-irow--head">
              <div className="izuc-cell izuc-cell--accent">
                <span className="izuc-ilabel">{active.headline.label}_</span>
                <span className="izuc-ivalue izuc-ivalue--id">{active.headline.value}</span>
              </div>
              <div className="izuc-cell">
                <span className="izuc-ilabel">{active.score.label}_</span>
                <span className="izuc-ivalue">{active.score.value}</span>
              </div>
            </div>

            {active.rows.map((r) => (
              <div key={r.label} className={`izuc-irow izuc-irow--data ${r.tone ? `t-${r.tone}` : ""}`}>
                <span className="izuc-ilabel">{r.label}_</span>
                <span className="izuc-ivalue">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="iz-wrap izuc-foot">
        <a className="izuc-more" href={cta.href}>
          {cta.label}
          <ArrowRight weight="bold" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
