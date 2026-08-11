"use client";

import { IzJson } from "./IzPanel";
import { RatingBar } from "./RatingBar";

/* ============================================================
   00as · IzProofGrid — "why us" fact wall, recreated from
   Fingerprint's industry-page pattern (buy-now-pay-later, banking,
   etc: a loose bento of arrow-led claims + a signal-tag stack + a
   compliance-badge stack + a live code card + a closing proof bar).

   The point of the pattern is density without a grid of matching
   cards — every cell is a different shape and a different kind of
   proof (a claim, a stat, a stack of tags, a code sample, a rating).
   That variety IS the argument: "look how much is true at once."

   ▸ TO EDIT ◂
   This ships InstaSafe's own real numbers (content master, not
   invented) as the default content — CLAIMS, SIGNALS, BADGES below.
   Swap `eyebrow`/`headline`/`signals` via props per page (industries
   reuse this same component with different framing — see props).
   ============================================================ */

type Claim = {
  arrow: "right" | "down";
  lead: string;
  body: string;
  span?: "md" | "lg";
};

const SIGNALS = ["Identity signals", "Device signals", "Network signals", "Application signals"];

const CLAIMS: Claim[] = [
  {
    arrow: "right",
    lead: "You can verify identity, device, network, and app on every request.",
    body: "One decision engine evaluates all four before a single packet reaches anything — not four separate tools.",
    span: "lg",
  },
  {
    arrow: "down",
    lead: "Built on 25 device-check types.",
    body: "144 named rules across 1,500+ OS and device combinations.",
    span: "md",
  },
  {
    arrow: "down",
    lead: "One console, not five.",
    body: "ZTNA, ZTAA, IAM, MFA, and SSO — retire the point products.",
    span: "md",
  },
  {
    arrow: "down",
    lead: "We are enterprise-grade compliant.",
    body: "Architecture aligned to NIST SP 800-207 and CSA SDP; supports the controls required by PCI DSS, HIPAA, GDPR, SOX, and ISO 27001.",
    span: "lg",
  },
  {
    arrow: "right",
    lead: "202 event types logged.",
    body: "11 report types, 7 SIEM export formats — every decision has a record.",
    span: "md",
  },
];

const POLICY_SNIPPET = `{
  "user": "finance-team",
  "app": "erp-prod",
  "mfa": "required",
  "device": "compliant"
}`;

const BADGES = ["NIST SP 800-207", "ISO 27001", "CSA SDP"];

export function IzProofGrid({
  eyebrow = "Why InstaSafe",
  headline = ["Regulated sectors rely on us for", "Zero Trust that doesn't get in the way."],
  signals = SIGNALS,
  claims = CLAIMS,
}: {
  eyebrow?: string;
  headline?: [string, string];
  signals?: string[];
  claims?: Claim[];
}) {
  return (
    <section className="izpg">
      <div className="iz-wrap">
        <span className="iz-ey" style={{ justifyContent: "center", display: "inline-flex" }}>
          {eyebrow}
        </span>
        <h2 className="izpg-h">
          {headline[0]}
          <br />
          <em>{headline[1]}</em>
        </h2>

        <div className="izpg-grid">
          <div className="izpg-cell izpg-signals">
            {signals.map((s, i) => (
              <span key={s} className={`izpg-tag tone-${(i % 4) + 1}`}>
                {s}
              </span>
            ))}
          </div>

          {claims.map((c, i) => (
            <div key={c.lead} className={`izpg-cell izpg-claim span-${c.span ?? "md"}`}>
              <span className="izpg-arrow" aria-hidden="true">
                {c.arrow === "right" ? "→" : "↓"}
              </span>
              <p>
                <b>{c.lead}</b> {c.body}
              </p>
            </div>
          ))}

          <div className="izpg-cell izpg-badges">
            {BADGES.map((b) => (
              <span key={b} className="izpg-badge">
                {b}
              </span>
            ))}
          </div>

          <div className="izpg-cell izpg-snippet">
            <span className="izpg-snippet-label">policy.json</span>
            <IzJson src={POLICY_SNIPPET} />
          </div>

          <div className="izpg-cell izpg-burst">
            <div className="izpg-burst-ring" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="izpg-dot" style={{ ["--i" as string]: i }} />
              ))}
            </div>
            <b>202</b>
            <span>event types logged</span>
          </div>
        </div>

        <div className="izpg-proof">
          <RatingBar />
        </div>
      </div>
    </section>
  );
}
