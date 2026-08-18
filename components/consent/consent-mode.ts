/* ============================================================
   consent-mode — Google Consent Mode v2 wiring.

   Two halves, and the ORDER between them is the whole point:

   1. CONSENT_MODE_DEFAULT_SNIPPET runs as a plain inline <script>
      in <head> (app/layout.tsx, right beside the theme bootstrap),
      unconditionally, for every visitor. It creates window.dataLayer
      and the global gtag() shim, then records a fully DENIED default
      before anything Google-owned exists on the page.

   2. pushConsentUpdate() runs later, from React, once the visitor's
      stored or freshly-chosen consent is known.

   gtm.js is injected by next/script with strategy="afterInteractive",
   i.e. after hydration, which is after the whole document — head
   included — has been parsed and executed. So (1) is guaranteed to
   have run before gtm.js. That guarantee matters: if the default
   lands AFTER gtm.js, Google classes the visitor as legacy-untracked
   and the modeled (cookieless) conversions for the rejecting majority
   never materialise. Do not move this into a component that renders
   conditionally, and do not switch it to a lazier strategy.

   wait_for_update: 500 gives the React update below half a second to
   arrive before Google acts on the defaults — enough for a returning
   visitor's stored grant to be re-asserted on the same pageload.

   url_passthrough is deliberately FALSE. It would smuggle ad click
   IDs through URL parameters for people who said no; a DPDP audit
   reads that badly, and it is not worth the attribution.
   ads_data_redaction TRUE strips ad identifiers from the pings that
   denied visitors do send.
   ============================================================ */

/** Injected verbatim into <head>. Must NOT be wrapped in an IIFE — gtag has to land on window. */
export const CONSENT_MODE_DEFAULT_SNIPPET = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', false);`;

type ConsentSignal = "granted" | "denied";

type ConsentModeWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/**
 * A stable string for one consent state, used to deduplicate updates.
 * Two renders that describe the same state produce the same key, so the
 * effect that pushes updates can skip the no-op ones instead of shouting
 * the same signals at Google on every re-render.
 */
export function consentModeKey(analytics: boolean, marketing: boolean): string {
  return `a:${analytics ? 1 : 0}|m:${marketing ? 1 : 0}`;
}

/**
 * Push a Consent Mode v2 update. Analytics maps to analytics_storage;
 * marketing maps to all three ad_* signals (storage, user data,
 * personalization) because our banner does not split them any finer.
 */
export function pushConsentUpdate(analytics: boolean, marketing: boolean): void {
  if (typeof window === "undefined") return;

  const w = window as ConsentModeWindow;
  w.dataLayer = w.dataLayer || [];

  const analyticsStorage: ConsentSignal = analytics ? "granted" : "denied";
  const adSignal: ConsentSignal = marketing ? "granted" : "denied";

  // The head snippet always defines gtag; the fallback only exists so a
  // stripped/blocked head script degrades to a no-op rather than a throw.
  const gtag =
    typeof w.gtag === "function"
      ? w.gtag
      : (...args: unknown[]) => {
          w.dataLayer!.push(args);
        };

  gtag("consent", "update", {
    analytics_storage: analyticsStorage,
    ad_storage: adSignal,
    ad_user_data: adSignal,
    ad_personalization: adSignal,
  });
}
