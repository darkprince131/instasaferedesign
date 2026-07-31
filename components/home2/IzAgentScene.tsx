"use client";

import { useEffect, useRef, useState } from "react";
import {
  CursorClick,
  Robot,
  UserFocus,
  Prohibit,
  CaretLeft,
  CaretRight,
  ArrowClockwise,
  X,
  Archive,
  TextAa,
  Plus,
  Copy,
  Lock,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   IzAgentScene — TIER 2 SECTION  (lab 00ai)

   Ported from the "Not all bots are bad / Not all humans are good"
   scene on fingerprint.com's homepage.

   What that scene actually is, from the DOM: three browser windows
   (`root.background.fullWidth` each, with `toolbar > dots/nav/tabs`
   and a `content` form), the middle one in focus and the outer two
   scaled back and clipped by the section edges, plus floating cursor
   tags and a pill toggle that flips the whole scene to "see without".

   The idea, not the content, is what transfers. Fingerprint sells
   agent detection; we sell access control. So ours asks the question
   that matters for ZTNA — *who is actually driving this session?* —
   over three published apps. Flip the toggle and every marker
   disappears: same three windows, no way to tell them apart. That IS
   the argument, and it's the same rhetorical move they make.

   Autoplay walks the markers until the visitor takes over, then
   stops. Below 900px the outer windows and the free-floating markers
   are dropped and the markers become a plain labelled list, because
   absolute-positioned tags over a scaled scene are unreadable on a
   phone.
   ============================================================ */

type Marker = {
  id: string;
  who: string;
  kind: string;
  tone: "allow" | "deny" | "warn";
  Icon: Icon;
  /** position over the scene, in % of the stage box */
  x: number;
  y: number;
};

const MARKERS: Marker[] = [
  { id: "anita", who: "anita.r", kind: "Bound device", tone: "allow", Icon: UserFocus, x: 27, y: 18 },
  { id: "runner", who: "svc-runner", kind: "Automation · allow-listed", tone: "warn", Icon: Robot, x: 62, y: 11 },
  { id: "contractor", who: "contractor-07", kind: "Unmanaged laptop", tone: "warn", Icon: CursorClick, x: 12, y: 76 },
  { id: "unknown", who: "unknown", kind: "No enrolment · blocked", tone: "deny", Icon: Prohibit, x: 74, y: 82 },
];

/* ---------- one window mockup ----------
   Chrome matched to the reference screenshot rather than a generic
   "three dots and a URL": traffic dots → back/forward → refresh →
   stop → a tab pill carrying a favicon and the app name → a divider →
   three muted right-hand actions. The dividers and the tab pill are
   what stop it reading as a toy.

   Content is two columns, like theirs (form + basket). Ours puts the
   app's own form on the left and an ACCESS SUMMARY on the right,
   which is the ZTNA equivalent of their order total: a list of what
   was checked, ruled off, and a single verdict at the bottom. */

type Field = { label: string; value?: string; mono?: boolean };
type SummaryRow = { k: string; v: string; tone?: "allow" | "deny" | "warn" };

function Win({
  app,
  url,
  fields,
  cta,
  summary,
  verdict,
  className = "",
}: {
  app: string;
  url: string;
  fields: Field[];
  cta: string;
  summary: SummaryRow[];
  verdict: { k: string; v: string; tone: "allow" | "deny" | "warn" };
  className?: string;
}) {
  return (
    <div className={`izas-win ${className}`}>
      <div className="izas-bar">
        <span className="izas-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <span className="izas-nav" aria-hidden="true">
          <CaretLeft weight="bold" />
          <CaretRight weight="bold" />
          <ArrowClockwise />
          <X />
        </span>

        <span className="izas-div" aria-hidden="true" />

        <span className="izas-tab">
          <span className="izas-fav" aria-hidden="true">
            <Lock weight="fill" />
          </span>
          <span className="izas-tabname">{app}</span>
        </span>

        <span className="izas-div" aria-hidden="true" />

        <span className="izas-actions" aria-hidden="true">
          <Archive />
          <TextAa />
          <Plus />
          <Copy />
        </span>
      </div>

      <div className="izas-content">
        <div className="izas-form">
          <span className="izas-url">{url}</span>
          {fields.map((f) => (
            <span key={f.label} className="izas-field">
              <span className="izas-flabel">{f.label}</span>
              <span className={`izas-finput ${f.mono ? "mono" : ""}`}>{f.value}</span>
            </span>
          ))}
          <span className="izas-submit">{cta}</span>
        </div>

        <div className="izas-summary">
          <span className="izas-sumhead">Access summary</span>
          {summary.map((r) => (
            <span key={r.k} className={`izas-sumrow ${r.tone ? `t-${r.tone}` : ""}`}>
              <span>{r.k}</span>
              <b>{r.v}</b>
            </span>
          ))}
          <span className="izas-sumrule" aria-hidden="true" />
          <span className={`izas-sumtotal t-${verdict.tone}`}>
            <span>{verdict.k}</span>
            <b>{verdict.v}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export function IzAgentScene({
  kicker = "Who is really there",
  title = (
    <>
      Not every session is a <mark>person</mark>
      <br />
      Not every person is <mark>who they claim</mark>
    </>
  ),
  sub = "Every request carries an identity, a device and a posture. InstaSafe reads all three before an app is reachable — and tells you which is which.",
  cta = { label: "How it works", href: "/platform" },
}: {
  kicker?: string;
  title?: React.ReactNode;
  sub?: string;
  cta?: { label: string; href: string };
}) {
  const [off, setOff] = useState(false);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    const failsafe = window.setTimeout(() => setSeen(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    if (!seen || touched || off) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % MARKERS.length), 2600);
    return () => clearInterval(id);
  }, [seen, touched, off]);

  return (
    <section className="izas iz-railed">
      <div className="iz-wrap izas-head">
        <div className="izas-head-l">
          <span className="izas-kicker">
            {kicker}
            <i aria-hidden="true">_</i>
          </span>
          <h2 className="izas-title">{title}</h2>
          <p className="izas-sub">{sub}</p>
          <a className="izas-cta" href={cta.href}>
            {cta.label}
          </a>
        </div>
      </div>

      <hr className="iz-bd-dashrule" />

      <div className="izas-stagewrap" ref={ref}>
        <div className="izas-togglewrap">
          <button
            type="button"
            role="switch"
            aria-checked={off}
            className={`izas-toggle ${off ? "on" : ""}`}
            onClick={() => {
              setTouched(true);
              setOff((v) => !v);
            }}
          >
            <span className="izas-tlabel">See without InstaSafe</span>
            <span className="izas-track" aria-hidden="true">
              <span className="izas-knob" />
            </span>
          </button>
        </div>

        <div className={`izas-stage ${off ? "blind" : ""} ${seen ? "in" : ""}`}>
          <Win
            className="izas-win--side izas-win--l"
            app="Ledger"
            url="crm.acme.in/accounts"
            fields={[
              { label: "Account", value: "Northwind Pvt Ltd" },
              { label: "Owner", value: "contractor-07", mono: true },
            ]}
            cta="Open record"
            summary={[
              { k: "Identity", v: "contractor-07" },
              { k: "Device", v: "Unmanaged", tone: "warn" },
              { k: "Posture", v: "Partial", tone: "warn" },
            ]}
            verdict={{ k: "Decision", v: "Read only", tone: "warn" }}
          />

          <Win
            className="izas-win--main"
            app="Payroll"
            url="payroll.acme.in/run/apr"
            fields={[
              { label: "Employee ID", value: "IN-4471", mono: true },
              { label: "Pay cycle", value: "April 2026" },
              { label: "Bank account", value: "•••• •••• •••• 4242", mono: true },
            ]}
            cta="Approve run"
            summary={[
              { k: "Identity", v: "anita.r" },
              { k: "Device", v: "WS-FIN-014", tone: "allow" },
              { k: "Posture", v: "Compliant", tone: "allow" },
              { k: "Policy", v: "IN-Finance-Managed" },
            ]}
            verdict={{ k: "Decision", v: "Allow · 240 ms", tone: "allow" }}
          />

          <Win
            className="izas-win--side izas-win--r"
            app="Repos"
            url="git.acme.in/merge/814"
            fields={[
              { label: "Repository", value: "acme/billing-api", mono: true },
              { label: "Branch", value: "release/4.2" },
            ]}
            cta="Merge"
            summary={[
              { k: "Identity", v: "svc-runner" },
              { k: "Device", v: "Automation", tone: "warn" },
              { k: "Posture", v: "Allow-listed", tone: "allow" },
            ]}
            verdict={{ k: "Decision", v: "Allow · scoped", tone: "allow" }}
          />

          {/* free-floating markers — dropped on phones */}
          <div className="izas-markers" aria-hidden="true">
            {MARKERS.map((m, i) => (
              <span
                key={m.id}
                className={`izas-marker t-${m.tone} ${i === active ? "on" : ""}`}
                style={{ left: `${m.x}%`, top: `${m.y}%`, ["--i" as string]: i } as React.CSSProperties}
              >
                <svg className="izas-cursor" viewBox="0 0 12 14" aria-hidden="true">
                  <path d="M1 1l10 6-4.2 1.2L5 13z" />
                </svg>
                <span className="izas-tag">
                  <m.Icon weight="regular" />
                  <b>{m.who}</b>
                  <i>{m.kind}</i>
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* the phone version of the markers: a plain list, always legible */}
        <ul className="izas-list">
          {MARKERS.map((m) => (
            <li key={m.id} className={`izas-li t-${m.tone}`}>
              <m.Icon weight="regular" aria-hidden="true" />
              <b>{m.who}</b>
              <span>{m.kind}</span>
            </li>
          ))}
        </ul>

        <p className="izas-caption">
          {off
            ? "Without InstaSafe: three identical sessions, no way to tell which one to trust."
            : "With InstaSafe: every session carries an identity, a device and a verdict."}
        </p>
      </div>
    </section>
  );
}
