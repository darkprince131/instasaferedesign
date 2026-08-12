"use client";

import {
  Browsers,
  Cloud,
  Database,
  Monitor,
  Phone,
  Terminal,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import "./solutionsanswer.css";

/* ============================================================
   /solutions · 01 — the plain answer.

   THE DIAGRAM IS THE CLAIM. Seven application types, each with its own
   protocol and its own port, all resolving at one node. The copy says
   "one policy engine instead of one tool each"; the picture is what
   makes that checkable, because every card names the protocol it
   actually speaks.

   Cards sit in a 3×3 grid around the engine rather than at scattered
   coordinates — eight cells, seven filled, the middle one the node.
   The dashed connector on each card points at the centre, so the
   geometry stays correct at any width without a second coordinate
   system to keep in sync.
   ============================================================ */

type App = {
  name: string;
  Icon: Icon;
  protocol: string;
  /** which cell it sits in — drives both placement and the connector */
  at: "tl" | "t" | "tr" | "l" | "r" | "bl" | "b";
};

/* The seven types the deck names: web, SaaS, thick-client, RDP, SSH,
   database, VoIP. [CONFIRM] the list before it ships — it is flagged
   in the copy deck and it is the number the whole section rests on. */
const APPS: App[] = [
  { name: "ERP / thick-client", Icon: Terminal, protocol: "TCP · 1521", at: "tl" },
  { name: "Web application", Icon: Browsers, protocol: "HTTPS", at: "t" },
  { name: "SaaS application", Icon: Cloud, protocol: "HTTPS", at: "tr" },
  { name: "RDP access", Icon: Monitor, protocol: "RDP · 3389", at: "l" },
  { name: "SSH access", Icon: Terminal, protocol: "SSH · 22", at: "r" },
  { name: "Database access", Icon: Database, protocol: "TCP · 3306", at: "bl" },
  { name: "VoIP service", Icon: Phone, protocol: "SIP · 5060", at: "b" },
];

const FACTS = [
  { n: "1", label: "Policy engine", sub: "behind every case on this page" },
  { n: "7", label: "Application types", sub: "web, SaaS, thick-client, RDP, SSH, database, VoIP" },
  { n: "0", label: "Additional products", sub: "to license per use case" },
];

export function IzSolutionsAnswer() {
  return (
    <section className="iz-section sa" id="answer">
      <div className="iz-wrap sa-in">
        {/* ---------------- the answer ---------------- */}
        <div className="sa-copy">
          <span className="sa-eyebrow">
            Solutions <i>/</i> <b>Zero Trust access</b>
          </span>

          <h2 className="sa-h">
            One policy engine. Every access case<em>.</em>
          </h2>

          <p className="sa-lead">
            Most access projects aren&apos;t a platform choice, they&apos;re a list of awkward cases: a vendor who needs
            one system, a contractor on their own laptop, an ERP client that won&apos;t go through a browser. InstaSafe
            handles them with one policy engine instead of one tool each.
          </p>

          <div className="sa-facts">
            {FACTS.map((f) => (
              <div className="sa-fact" key={f.label}>
                <b>{f.n}</b>
                <span className="sa-fact-l">{f.label}</span>
                <span className="sa-fact-s">{f.sub}</span>
              </div>
            ))}
          </div>

          <div className="sa-badge">
            <LogoMark size={22} />
            <span>
              One identity. One policy.
              <i>Any app. Everywhere.</i>
            </span>
          </div>
        </div>

        {/* ---------------- the diagram ---------------- */}
        <div className="sa-diagram" aria-hidden="true">
          <div className="sa-grid">
            {APPS.map((a) => (
              <article className={`sa-card sa-at-${a.at}`} key={a.name}>
                <header>
                  <span className="sa-card-n">{a.name}</span>
                  <span className="sa-card-dots">···</span>
                </header>
                <span className="sa-card-ic">
                  <a.Icon size={26} weight="regular" />
                </span>
                <dl>
                  <div>
                    <dt>Protocol</dt>
                    <dd>{a.protocol}</dd>
                  </div>
                  <div>
                    <dt>Access</dt>
                    <dd className="is-allow">Allow</dd>
                  </div>
                </dl>
              </article>
            ))}

            {/* the engine, in the middle cell */}
            <div className="sa-core">
              <span className="sa-rings" />
              <span className="sa-hex">
                <LogoMark size={26} />
              </span>
              <span className="sa-core-t">
                InstaSafe
                <i>policy engine</i>
              </span>
            </div>
          </div>

          <div className="sa-legend">
            <span className="sa-legend-h">Policy / 01</span>
            <span>7 access types</span>
            <span className="is-dot">One control plane</span>
          </div>
        </div>
      </div>
    </section>
  );
}
