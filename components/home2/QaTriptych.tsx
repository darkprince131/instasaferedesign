"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  MagnifyingGlass,
  GitBranch,
  CodeSimple,
  Crosshair,
  TrendUp,
  Heartbeat,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   C38 · Q&A Triptych ("Ask anything").
   6 query features (3 left / 3 right) flank a center chat that
   answers the selected query. It AUTO-PLAYS — each point is held
   for roughly its reading time, then advances and loops. The
   active icon's underline doubles as the autoplay progress bar.
   Pauses on hover and when off-screen; respects reduced-motion.

   `nav`:
     "icons" — icon nav below, underline = progress bar
     "none"  — no nav bar (switch by clicking the feature text);
               a slim progress bar sits under the panel
   ============================================================ */

export interface Query {
  /* Phosphor icons OR a hand-drawn component. The MFA page draws its
     own six, because each has to carry a detail no icon set ships —
     the dashed arc for the seconds left on a TOTP code, the tap
     ripple over an approve button. The render site only ever passes
     `weight`, so anything accepting that is a legal icon here. */
  icon: Icon | React.ComponentType<{ weight?: string }>;
  title: string;
  desc: string;
  q: string;
  a: ReactNode;
  readMs: number; // dwell ≈ time to read this point
  /** optional monospace line pinned under the answer — a proof detail */
  foot?: string;
}

/** who is asking, when the questioner is not the site's standing cast member */
export type QaAsker = { name: string; initials: string };

const C = ({ children }: { children: ReactNode }) => <span className="qa-code">{children}</span>;

const QUERIES: Query[] = [
  {
    icon: MagnifyingGlass,
    title: "Access investigation",
    desc: "Ask in plain language what a user or device reached — allowed or denied — without digging through raw logs.",
    q: "What did contractor-07 reach in the last hour?",
    readMs: 6500,
    a: (
      <>
        <p>
          <b>3 sessions in the last hour.</b> 2 <span className="qa-allow">ALLOWED</span> to <C>billing-portal</C> (WEB) —
          role matches policy.
        </p>
        <p>
          1 <span className="qa-deny">DENIED</span> to <C>finance-rdp</C> — device posture failed (disk-encryption off).
        </p>
      </>
    ),
  },
  {
    icon: GitBranch,
    title: "Denied-access triage",
    desc: "Find out exactly why a request was blocked — which gate failed, and the rule that stopped it.",
    q: "Why was Priya blocked from the reports DB?",
    readMs: 6500,
    a: (
      <>
        <p>
          <b>Blocked at the policy gate.</b> Device <C>MB-PRIYA</C> is <span className="qa-deny">Pending-Approval</span> —
          not yet bound to a certificate.
        </p>
        <p>
          The allow rule requires <C>device.status = Enabled</C>. Approve the device and the next request passes.
        </p>
      </>
    ),
  },
  {
    icon: CodeSimple,
    title: "Device posture",
    desc: "Surface which devices are failing checks today and what they failed on — across every OS.",
    q: "Which devices failed checks today?",
    readMs: 6000,
    a: (
      <>
        <p>
          <b>12 of 775 devices failed</b> at least one of the 25 checks.
        </p>
        <p>
          8× disk-encryption off · 3× OS patch below baseline · 1× AV disabled. All held from access until they pass.
        </p>
      </>
    ),
  },
  {
    icon: Crosshair,
    title: "Blast radius",
    desc: "Understand the impact of a leaked credential instantly — how far it could actually reach.",
    q: "If sarah@acme.com's password leaked, what's exposed?",
    readMs: 6000,
    a: (
      <>
        <p>
          <b>Blast radius: one app.</b> Sarah reaches only <C>finance-app</C> — device-bound, MFA enforced.
        </p>
        <p>
          No network-level access, no lateral path. A password alone <span className="qa-deny">≠ entry</span>.
        </p>
      </>
    ),
  },
  {
    icon: TrendUp,
    title: "Trend analysis",
    desc: "See how allow and deny rates evolve over time, so you catch a drift before it becomes an incident.",
    q: "How are deny rates trending this week?",
    readMs: 6500,
    a: (
      <>
        <p>
          <b>Denials down 18%</b> week-over-week. Allow rate holding at <span className="qa-allow">99.2%</span>.
        </p>
        <p>
          Spike Tue 14:00 — 40 denials from one unpatched fleet in <span className="qa-link">ap-south-1</span>, since
          remediated.
        </p>
      </>
    ),
  },
  {
    icon: Heartbeat,
    title: "System diagnostics",
    desc: "Run a quick health check on any gateway and get a clear readout of what's healthy and what's strained.",
    q: "Run a health check on the finance gateway.",
    readMs: 6000,
    a: (
      <>
        <p>
          Gateway <C>gw-fin-01</C>: <span className="qa-allow">ONLINE</span>. 4 / 4 nodes healthy · p95 latency 38ms.
        </p>
        <p>
          1,247 live sessions · last config push 6m ago. <b>All checks passed.</b>
        </p>
      </>
    ),
  },
];

const SazabiMark = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

function Feature({ q, on, onClick }: { q: Query; on: boolean; onClick: () => void }) {
  return (
    <button className={`qa-feat ${on ? "on" : ""}`} onClick={onClick} aria-pressed={on}>
      <span className="ic">
        <q.icon weight={on ? "fill" : "regular"} />
      </span>
      <span>
        <span className="ttl">{q.title}</span>
        <span className="desc">{q.desc}</span>
      </span>
    </button>
  );
}

/* ============================================================
   CONTENT IS INJECTABLE (2026-08-14).

   The queries, the header and the questioner were hardcoded, so this
   layout could only ever say the one thing it was born saying. The
   MFA page needs the same mechanism carrying six authentication
   methods — three per side, the customer's own sentence in the chat,
   the product's answer beneath it — so `items`, `head`, `asker` and
   `sides` are props now.

   Every one of them defaults to the original content, so the homepage
   and the lab render exactly as before.
   ============================================================ */
export function QaTriptych({
  nav = "icons",
  items,
  head,
  asker = { name: "Alen J.", initials: "AJ" },
  sides,
  time = "9:14 AM",
}: {
  nav?: "icons" | "none";
  /** override the six queries; defaults to the access-investigation set */
  items?: Query[];
  /** replace the header block, or pass null to drop it entirely */
  head?: ReactNode | null;
  /** who the left-hand chat bubble belongs to */
  asker?: QaAsker;
  /** optional captions over the two feature columns, when the split means something */
  sides?: [string, string];
  /** the timestamp shown on both bubbles */
  time?: string;
}) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const queries = items ?? QUERIES;
  const cur = queries[active];

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver((e) => setInView(e[0].isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const next = () => setActive((a) => (a + 1) % queries.length);
  const paused = hover || !inView;

  // the autoplay driver: a progress fill that advances onAnimationEnd
  const fill = reduced.current ? null : (
    <span
      key={active}
      className="qa-fill run"
      style={{ animationDuration: `${cur.readMs}ms`, animationPlayState: paused ? "paused" : "running" }}
      onAnimationEnd={next}
    />
  );

  return (
    <div className="qa" ref={rootRef} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {head === undefined ? (
        <div className="qa-top">
          <div>
            <span className="qa-eye">Queries</span>
            <h2 className="qa-h1">
              Ask <em>anything</em>.
            </h2>
          </div>
          <a href="/book-a-demo" className="qa-demo">
            Book a demo
          </a>
        </div>
      ) : (
        head
      )}

      <div className="qa-grid">
        {/* left features */}
        <div className="qa-side">
          {sides && <span className="qa-sidecap">{sides[0]}</span>}
          {queries.slice(0, 3).map((q, i) => (
            <Feature key={q.title} q={q} on={active === i} onClick={() => setActive(i)} />
          ))}
        </div>

        {/* center chat */}
        <div className="qa-center">
          <div className="qa-panel">
            <div className="qa-chat" key={active}>
              <div className="qa-msg user">
                {/* Alen J. — the site's standing cast member (izUsers.tsx),
                    the same person in the access flow, the console mocks
                    and the journey card. One name across the site, not a
                    different placeholder per component. */}
                <span className="qa-av user">{asker.initials}</span>
                <span>
                  <span className="qa-mhead">
                    <span className="nm">{asker.name}</span>
                    <span className="tm">{time}</span>
                  </span>
                  <span className="qa-mbody">
                    <p>{cur.q}</p>
                  </span>
                </span>
              </div>
              <div className="qa-msg app">
                <span className="qa-av app">{SazabiMark}</span>
                <span>
                  <span className="qa-mhead">
                    <span className="nm">InstaSafe</span>
                    <span className="badge">APP</span>
                    <span className="tm">{time}</span>
                  </span>
                  <span className="qa-mbody">
                    {cur.a}
                    {cur.foot && <span className="qa-foot">{cur.foot}</span>}
                  </span>
                </span>
              </div>
            </div>
            <div className="qa-input">
              Ask your access layer…<span className="blink" />
            </div>
          </div>

          {nav === "icons" ? (
            <div className="qa-nav icons" role="tablist" aria-label="Query type">
              {queries.map((q, i) => {
                const on = active === i;
                return (
                  <button
                    key={q.title}
                    role="tab"
                    aria-selected={on}
                    aria-label={q.title}
                    className={`qa-navi ${on ? "on" : ""}`}
                    onClick={() => setActive(i)}
                  >
                    <q.icon weight={on ? "fill" : "regular"} />
                    {on && <span className="navi-prog">{fill}</span>}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="qa-prog-wrap">
              <div className="panel-prog">{fill}</div>
            </div>
          )}
        </div>

        {/* right features */}
        <div className="qa-side">
          {sides && <span className="qa-sidecap">{sides[1]}</span>}
          {queries.slice(3, 6).map((q, i) => (
            <Feature key={q.title} q={q} on={active === i + 3} onClick={() => setActive(i + 3)} />
          ))}
        </div>
      </div>
    </div>
  );
}
