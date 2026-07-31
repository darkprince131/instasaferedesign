"use client";

import Script from "next/script";
import { useConsent } from "./ConsentProvider";
import { TRACKER_IDS } from "./consent-config";

/* ============================================================
   GatedScripts — the actual default-deny gate. Renders next/script
   tags ONLY when (a) the relevant category is consented AND (b) the
   matching env var is set. No IDs are hardcoded here — re-enabling a
   tracker later is purely an env-var + redeploy change, no edit to
   this file. Unmounts (removes the script) the moment consent is
   withdrawn, since this is driven by React state from useConsent().

   Analytics category -> GA4, GTM, Zoho PageSense
   Marketing category -> Clearbit
   ============================================================ */

export function GatedScripts() {
  const { ready, categories } = useConsent();

  if (!ready) return null;

  const analyticsAllowed = categories.analytics;
  const marketingAllowed = categories.marketing;

  const gaId = TRACKER_IDS.gaId;
  const gtmId = TRACKER_IDS.gtmId;
  const pageSenseId = TRACKER_IDS.zohoPageSenseId;
  const clearbitId = TRACKER_IDS.clearbitId;

  return (
    <>
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

      {analyticsAllowed && gtmId ? (
        <Script id="consent-gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
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
