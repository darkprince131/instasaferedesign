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

/* The four corner tags — [ Verify ] [ Segment ] [ Tunnel ] [ Record ] —
   were removed on the user's call (2026-08-13). They labelled nothing
   in the panel they sat on: four bracketed words parked in the corners
   of a CTA, competing with the headline for the only attention this
   block gets. The lattice and the deflection field carry the texture. */

/* `reveal` opts into Home2's scroll-reveal choreography, which requires
   useSectionReveals() to be mounted on the page. Pages that do not run that
   hook must pass reveal={false} — otherwise this block renders at opacity 0
   forever, which is exactly what happened on the ZTNA page. Content must
   never depend on an optional hook to become visible. */
/* COPY IS INJECTABLE (2026-08-14). The panel — lattice, deflection
   fields, eyebrow, button pair, tertiary link — is the close every page
   should get; only the two lines in the middle are page-specific. The
   SSO page had been closing on a bare heading and one button on a plain
   band, which is why it read as unfinished next to its siblings.
   Omitted, every existing caller renders exactly as before. */
export function IzFinalCta({
  reveal = true,
  eyebrow = "Ready when you are",
  title,
  sub = "Runs alongside the VPN you have, app by app, until there is nothing left to switch off. Nothing to rack, no network to re-architect.",
  secondaryLabel = "See pricing",
  secondaryHref = "/instasafe-zero-trust-pricing",
  tertiaryLabel = "Regulated, air-gapped, or on-premise? See deployment options",
  tertiaryHref = "/why-instasafe-zero-trust",
}: {
  reveal?: boolean;
  eyebrow?: string;
  title?: React.ReactNode;
  sub?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tertiaryLabel?: string;
  tertiaryHref?: string;
} = {}) {
  return (
    <section className="izcta">
      <div className="izcta-lattice" aria-hidden="true" />

      <div className="izcta-stage">
        <IzShieldField className="izcta-field" height={230} apex={0.52} spread={1.7} />

        <div className={`izcta-inner${reveal ? " iz-reveal" : ""}`}>
          <p className="izcta-eyebrow">
            <span className="izcta-slash">//</span>
            {eyebrow}
            <span className="izcta-slash">//</span>
          </p>

          <h2 className="izcta-h">
            {title ?? (
              <>
                Ditch the VPN. <em>Keep your apps invisible.</em>
              </>
            )}
          </h2>

          <p className="izcta-sub">{sub}</p>

          <div className="izcta-actions">
            <Magnetic>
              <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                Book a demo <Arrow />
              </a>
            </Magnetic>
            <a href={secondaryHref} className="iz-btn iz-btn-ghost">
              {secondaryLabel}
            </a>
          </div>

          <a href={tertiaryHref} className="izcta-tertiary">
            {tertiaryLabel} <Chevron />
          </a>
        </div>

        <IzShieldField className="izcta-field" height={230} apex={0.52} spread={1.7} mirror />
      </div>
    </section>
  );
}

