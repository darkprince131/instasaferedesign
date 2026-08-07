"use client";

import { ImageSquare } from "@phosphor-icons/react";

/* ============================================================
   Group B · "giving someone access" — on the 00au idea
   (IzAnswerStrip: an answer line, then terse mono proof, with the
   long-form kept but demoted).

   What 00au gets right and this keeps: the right-hand slot is NOT a
   decorative graphic. It is a proof slot, and the proof is a
   REFUSAL — something granted next to something denied. Five
   populations that all resolve to the same enforcement is exactly
   that shape, so the slot's job here is to show one decision
   reaching five different askers.

   ⚠️ The artwork is a PLACEHOLDER by request — the frame states the
   job it has to do so whatever lands in it can be judged against
   that, rather than being a grey box someone drops a stock render
   into. Swap `art` for the asset when it exists.
   ============================================================ */

type Population = {
  n: string;
  title: string;
  line: string;
  /** the terse mono proof — 00au's number strip, one per row */
  fact: string;
  /** true until the claim is signed off; renders nothing rather than
      shipping an unverified statement */
  unconfirmed?: boolean;
};

const POPULATIONS: Population[] = [
  {
    n: "01",
    title: "Secure Remote Access",
    line: "Employees reach what they're entitled to from anywhere, with the device checked every session — not once at enrolment.",
    fact: "25 device checks per session",
  },
  {
    n: "02",
    title: "Hybrid Work",
    line: "Office and home stop being different security postures. Location becomes one input among several, not the thing that decides.",
    fact: "Same policy in the office and out of it",
  },
  {
    n: "03",
    title: "Third-Party & Vendor Access",
    line: "A vendor gets one system for one window, with the session recorded. No VPN account, no shared credential, no standing access that outlives the contract.",
    fact: "Time-bound access, recorded sessions",
  },
  {
    n: "04",
    title: "Privileged Access",
    line: "Admins reach production through the same decision as everyone else, with more checks and a recording — not through a jump box with a shared password.",
    fact: "Every privileged session attributable to a person",
  },
  {
    n: "05",
    title: "BYOD",
    line: "Personal laptops and phones get application access without being enrolled into management. The device is checked, not owned.",
    /* [CONFIRM] flagged in the brief — held back rather than shipped.
       Drop `unconfirmed` once product signs it off. */
    fact: "Posture without MDM enrolment",
    unconfirmed: true,
  },
];

export function IzGroupB({
  kicker = "Group B",
  lead = "Different populations, different risk,",
  leadEmphasis = "same enforcement.",
}: {
  kicker?: string;
  lead?: string;
  leadEmphasis?: string;
}) {
  return (
    <section className="izgb iz-railed">
      <div className="iz-wrap izgb-cols">
        {/* ---------- the answer ---------- */}
        <div className="izgb-copy">
          <span className="izgb-kicker">{kicker}</span>
          <h2 className="izgb-lead">
            {lead} <em>{leadEmphasis}</em>
          </h2>

          <ol className="izgb-list">
            {POPULATIONS.map((p) => (
              <li className="izgb-row" key={p.n}>
                <span className="izgb-n" aria-hidden="true">
                  {p.n}
                </span>
                <div className="izgb-rowbody">
                  <h3>{p.title}</h3>
                  <p>{p.line}</p>
                  {/* an unverified claim renders as nothing, not as a
                      hedge — a marked-up claim on a live page is still
                      a claim */}
                  {!p.unconfirmed && <span className="izgb-fact">{p.fact}</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ---------- proof slot · PLACEHOLDER ---------- */}
        <div className="izgb-slot">
          <figure className="izgb-art">
            <span className="izgb-art-ic" aria-hidden="true">
              <ImageSquare weight="regular" />
            </span>
            <figcaption>
              <b>Artwork placeholder</b>
              <span>
                One decision reaching five different askers — the grant and the refusal in the same frame. Portrait,
                roughly 4:5.
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
