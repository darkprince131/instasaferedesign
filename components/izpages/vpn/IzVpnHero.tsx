"use client";

import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

/* ============================================================
   00 · VPN-alternative hero — copy only.

   The page's picture is the access plane, and it lives in the
   outcomes section at the bottom (see VpnAccessPlane). Drawing the
   same hub-and-applications diagram up here as well would say the
   same thing twice and spend the reader's attention before the
   argument that earns it — so the hero is the claim, the four
   structural properties behind it, and the two ways forward.

   Interaction placement rule: the signature visual belongs at fold
   2+, never in the hero.
   ============================================================ */

const PROOF = [
  "No exposed gateways",
  "No lateral movement",
  "Per-application access",
  "Built for scale",
];

export function IzVpnHero() {
  return (
    <header className="izvh iz-railed">
      <div className="iz-wrap izvh-cols">
        <div className="izvh-copy">
          <span className="izvh-chip">
            solution<i aria-hidden="true">/</i>
            <b>VPN alternative</b>
          </span>

          <h1 className="izvh-h1">
            The network was the problem.
            <br />
            <em>ZTNA is the answer.</em>
          </h1>

          <div className="izvh-ctas">
            <a className="izvh-btn izvh-btn-pri" href="/book-a-demo">
              Book a demo
              <ArrowRight weight="bold" aria-hidden="true" />
            </a>
            <a className="izvh-btn izvh-btn-ghost" href="#compare">
              Compare VPN vs ZTNA ↓
            </a>
          </div>
        </div>

        <div className="izvh-side">
          <p className="izvh-sub">
            InstaSafe ZTNA removes the network from the equation. Users connect straight to the applications they are
            entitled to — and to nothing else.
          </p>

          <ul className="izvh-proof">
            {PROOF.map((p) => (
              <li key={p}>
                <CheckCircle weight="regular" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
