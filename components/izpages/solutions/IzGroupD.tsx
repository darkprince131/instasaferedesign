"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, DownloadSimple } from "@phosphor-icons/react";
import "./groupd.css";

/* ============================================================
   Group D — "satisfying someone".

   THE LEAD IS LITERALLY A QUESTION, so the section is a question and
   its answer: the ask on the left, the evidence in the middle, the
   fact and the link on the right.

   It is not literally `QaTriptych`. That component is a six-item
   autoplaying chat with an icon nav and its answers written into the
   module — closer to "ask anything" than to "here are two questions
   and their evidence". Adding a two-position switch to it would have
   meant removing four of its six states, its autoplay clock and its
   nav, which is not an extension so much as a different component
   wearing its name.

   THE EVIDENCE PANEL IS THE POINT. A regulator is answered with an
   export and an acquirer with a grant — both are artefacts, not
   claims, which is the difference this section is selling.
   ============================================================ */

type Ask = {
  id: string;
  switchLabel: string;
  who: string;
  question: string;
  evidence: {
    kind: "export" | "grant";
    title: string;
    file?: string;
    rows: { n: string; label: string }[];
  };
  fact: string;
  link: { title: string; href?: string };
};

const ASKS: Ask[] = [
  {
    id: "regulator",
    switchLabel: "the regulator asks",
    who: "Regulator",
    question:
      "Show me every person who could reach core banking last quarter, and when each one's access was removed.",
    evidence: {
      kind: "export",
      title: "Access review, exporting",
      file: "access_review_Q3.csv",
      rows: [
        { n: "202", label: "event types" },
        { n: "7", label: "SIEM formats" },
        { n: "11", label: "report types" },
      ],
    },
    fact: "RBI, IRDAI, SEBI, DPDP, PCI DSS and ISO 27001 all ask the same access questions. The answer is an export, not a project.",
    /* Compliance & Regulatory is one of the five children shipping in
       v1, so this one is a real link. */
    link: { title: "Compliance & Regulatory", href: "/solutions/compliance" },
  },
  {
    id: "acquirer",
    switchLabel: "the acquirer asks",
    who: "Acquirer",
    question: "Their people need our systems on Monday. How long to merge the networks?",
    evidence: {
      kind: "grant",
      title: "Day-one access, granted",
      rows: [
        { n: "48", label: "users" },
        { n: "6", label: "applications" },
        { n: "0", label: "network changes" },
      ],
    },
    fact: "Give the acquired company's people access on day one without merging two networks — the part of integration that normally takes eighteen months.",
    /* M&A is not in the v1 five: text, no arrow. Absent reads cleaner
       than disabled. */
    link: { title: "M&A Access Integration" },
  },
];

export function IzGroupD() {
  const [i, setI] = useState(0);
  const a = ASKS[i];

  return (
    <section className="iz-section gd" id="group-d">
      <div className="iz-wrap">
        <div className="gd-head">
          <span className="iz-ey">Satisfying someone</span>
          <h2 className="iz-h2">
            The access question asked by a regulator, an acquirer, or an <em>auditor</em>.
          </h2>
        </div>

        <div className="gd-switch" role="tablist" aria-label="Who is asking">
          {ASKS.map((x, n) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={n === i}
              className={n === i ? "is-sel" : undefined}
              onClick={() => setI(n)}
            >
              {x.switchLabel}
            </button>
          ))}
        </div>

        <div className="gd-trip">
          {/* ---------- the ask ---------- */}
          <blockquote className="gd-q">
            <span className="gd-q-who">{a.who}</span>
            <p>
              <span className="gd-q-mark" aria-hidden="true">
                “
              </span>
              {a.question}
            </p>
          </blockquote>

          {/* ---------- the evidence ---------- */}
          <div className="gd-ev">
            <div className="gd-ev-h">
              <span className="gd-ev-ic">
                {a.evidence.kind === "export" ? (
                  <DownloadSimple size={16} weight="regular" />
                ) : (
                  <CheckCircle size={16} weight="regular" />
                )}
              </span>
              {a.evidence.title}
            </div>

            {a.evidence.file && (
              <div className="gd-ev-file">
                <code>{a.evidence.file}</code>
                {/* an export in progress, not a finished download —
                    the section is about the answer being routine */}
                <span className="gd-ev-bar" aria-hidden="true">
                  <i />
                </span>
              </div>
            )}

            <div className="gd-ev-rows">
              {a.evidence.rows.map((r) => (
                <div className="gd-ev-row" key={r.label}>
                  <b>{r.n}</b>
                  <span>{r.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- the fact ---------- */}
          <div className="gd-fact">
            <p>{a.fact}</p>
            {a.link.href ? (
              <a className="gd-fact-link" href={a.link.href}>
                {a.link.title}
                <ArrowRight size={14} weight="bold" aria-hidden="true" />
              </a>
            ) : (
              <span className="gd-fact-link is-flat">{a.link.title}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
