"use client";

import { Magnetic } from "@/components/v2/Magnetic";
import { IzShieldField } from "./IzShieldField";

/* ============================================================
   IzFinalCta — closing panel, drawn on a lattice.

   Two deflection fields flank the centre column and are mirrored
   so the pair doesn't read as one bitmap repeated. Copy is the
   approved homepage close from the content master; the proof line
   uses the exact published numbers.
   ============================================================ */

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CORNERS = ["Verify", "Segment", "Tunnel", "Record"];

/* `reveal` opts into Home2's scroll-reveal choreography, which requires
   useSectionReveals() to be mounted on the page. Pages that do not run that
   hook must pass reveal={false} — otherwise this block renders at opacity 0
   forever, which is exactly what happened on the ZTNA page. Content must
   never depend on an optional hook to become visible. */
export function IzFinalCta({ reveal = true }: { reveal?: boolean } = {}) {
  return (
    <section className="izcta">
      <div className="izcta-lattice" aria-hidden="true" />

      {CORNERS.map((c, i) => (
        <span key={c} className={`izcta-corner c${i + 1}`} aria-hidden="true">
          [ {c} ]
        </span>
      ))}

      <div className="izcta-stage">
        <IzShieldField className="izcta-field" height={230} apex={0.52} spread={1.7} />

        <div className={`izcta-inner${reveal ? " iz-reveal" : ""}`}>
          <p className="izcta-eyebrow">
            <span className="izcta-slash">//</span>
            Ready when you are
            <span className="izcta-slash">//</span>
          </p>

          <h2 className="izcta-h">
            Ditch the VPN. <em>Keep your apps invisible.</em>
          </h2>

          <p className="izcta-sub">
            Runs alongside the VPN you have, app by app, until there is
            nothing left to switch off. Nothing to rack, no network to
            re-architect.
          </p>

          <div className="izcta-actions">
            <Magnetic>
              <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                Book a demo <Arrow />
              </a>
            </Magnetic>
            <a href="/instasafe-zero-trust-pricing" className="iz-btn iz-btn-ghost">
              See pricing
            </a>
          </div>

          <a href="/why-instasafe-zero-trust" className="izcta-tertiary">
            Regulated, air-gapped, or on-premise? See deployment options <Chevron />
          </a>
        </div>

        <IzShieldField className="izcta-field" height={230} apex={0.52} spread={1.7} mirror />
      </div>
    </section>
  );
}
