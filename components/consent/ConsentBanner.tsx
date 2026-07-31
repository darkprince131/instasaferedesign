"use client";

import { useConsent } from "./ConsentProvider";

/* ============================================================
   ConsentBanner — first-visit notice, bottom-left card.
   Three equal-weight actions (Accept all / Reject all / Customize):
   no visual hierarchy favors one over another — required for
   DPDP "equal prominence" on the first layer.
   ============================================================ */

export function ConsentBanner() {
  const { ready, hasConsented, bannerOpen, acceptAll, rejectAll, openCenter } = useConsent();

  if (!ready || hasConsented || !bannerOpen) return null;

  return (
    <div className="consent-banner" role="region" aria-label="Cookie consent">
      <div className="consent-banner__card">
        <p className="consent-banner__eyebrow">Privacy</p>
        <p className="consent-banner__text">
          We use cookies and similar technologies to run this site and, with your consent, to
          understand usage and improve it. You can accept, reject, or choose what&apos;s on. Read
          our{" "}
          <a href="/privacy-policy" className="consent-banner__link">
            Privacy Policy
          </a>
          .
        </p>
        <div className="consent-banner__actions">
          <button type="button" className="consent-btn" onClick={rejectAll}>
            Reject all
          </button>
          <button type="button" className="consent-btn" onClick={openCenter}>
            Customize
          </button>
          <button type="button" className="consent-btn" onClick={acceptAll}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
