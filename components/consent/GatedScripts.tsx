"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useConsent } from "./ConsentProvider";
import { TRACKER_IDS } from "./consent-config";
import { consentModeKey, pushConsentUpdate } from "./consent-mode";

/* ============================================================
   GatedScripts — two different mechanisms, deliberately.

   1) GTM = CONSENT MODE v2 (signal gate, not a mount gate).
      gtm.js loads for EVERY visitor as soon as NEXT_PUBLIC_GTM_ID is
      set. It starts fully denied: the inline default in <head> (see
      consent-mode.ts, mounted by app/layout.tsx) runs before gtm.js
      and denies ad_storage, ad_user_data, ad_personalization and
      analytics_storage. A visitor who rejects therefore produces only
      Google's cookieless pings — no identifiers, no cookies — which is
      what Google's modeling consumes. That modeling is the reason for
      the split: the rejecting majority is now most of our traffic, and
      the business needs a modeled count of it rather than a hole.
      When consent is granted we push a 'consent' 'update' and the same
      container starts tracking properly.

      WITHDRAWAL, read this before "fixing" it: when consent is
      withdrawn later, we push an update with everything denied and
      gtm.js STAYS LOADED. That is how Consent Mode works — the signals
      are the gate, the script is not. Unmounting the tag would only
      return us to legacy-untracked and lose the modeling. Leave it.

   2) EVERYTHING ELSE = HARD GATE (mount/unmount), unchanged.
      Zoho PageSense, Clearbit and the standalone GA4 block have no
      consent-mode equivalent — there is no cookieless mode to fall
      back to, so the only honest default is not loading them at all.
      They mount only when the matching category is consented AND the
      env var is set, and they unmount the moment consent is withdrawn,
      because this is driven by React state from useConsent().

      (The GA4 block is unset in production — GA4 runs inside the GTM
      container. It stays hard-gated for the case where someone sets
      NEXT_PUBLIC_GA_ID directly, which bypasses the container and
      therefore bypasses consent mode.)

   No IDs are hardcoded here — re-enabling a tracker later is purely an
   env-var + redeploy change, no edit to this file.

   Analytics category -> GA4 (hard), Zoho PageSense (hard),
                         GTM analytics_storage signal
   Marketing category -> Clearbit (hard), GTM ad_* signals
   ============================================================ */

export function GatedScripts() {
  const { ready, hasConsented, categories } = useConsent();

  const analytics = categories.analytics;
  const marketing = categories.marketing;

  /* CONSENT UPDATE. Fires once the visitor's consent is actually known —
     on hydration for a returning visitor with a stored record (so their
     grant is re-asserted on every pageload, inside the 500ms
     wait_for_update window), and again on every accept / reject /
     granular save / later withdrawal.

     Deduped by a signature of the two booleans held in a ref: a re-render
     that describes the same state pushes nothing, so we never loop
     identical updates into the dataLayer.

     A first-time visitor who has not chosen yet gets NO update — the
     denied default from <head> already describes them correctly, and
     staying quiet lets wait_for_update run its course instead of
     resolving it early. */
  const lastPushed = useRef<string | null>(null);
  useEffect(() => {
    if (!ready || !hasConsented) return;
    const key = consentModeKey(analytics, marketing);
    if (lastPushed.current === key) return;
    lastPushed.current = key;
    pushConsentUpdate(analytics, marketing);
  }, [ready, hasConsented, analytics, marketing]);

  const gaId = TRACKER_IDS.gaId;
  const gtmId = TRACKER_IDS.gtmId;
  const pageSenseId = TRACKER_IDS.zohoPageSenseId;
  const clearbitId = TRACKER_IDS.clearbitId;

  /* The hard-gated tags wait for the localStorage read to resolve; GTM
     does not, because under consent mode it is supposed to load for
     everyone regardless of what that read says. */
  const analyticsAllowed = ready && analytics;
  const marketingAllowed = ready && marketing;

  return (
    <>
      {gtmId ? (
        <Script id="consent-gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {analyticsAllowed && gaId ? (
        <>
          <Script
            id="consent-ga4-lib"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="consent-ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {analyticsAllowed && pageSenseId ? (
        <Script
          id="consent-zoho-pagesense"
          src={`https://cdn.pagesense.io/js/instasafe/${pageSenseId}.js`}
          strategy="afterInteractive"
        />
      ) : null}

      {marketingAllowed && clearbitId ? (
        <Script
          id="consent-clearbit"
          src={`https://tag.clearbitscripts.com/v1/${clearbitId}/tags.js`}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
