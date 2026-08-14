/* ============================================================
   thumbs.ts — generated index of the supplied thumbnail artwork.

   Source: `Thumbnails/` at the repo root (added 2026-08-12), copied
   into `public/thumbs/<set>/<id>.<ext>` where <id> is the item's own id
   in newsroom.ts / resource-center.ts / awards.ts. That is the whole
   contract: an item gets its picture because the file is NAMED after
   it, so nothing here has to be kept in sync by hand.

   Extensions vary (png / webp / jpg) because the supplied files do.
   They are recorded rather than guessed — a wrong extension is a 404,
   and a 404 here is a broken-image box on a card.

   `LOGO_THUMBS` marks the entries where the supplied file is the
   publication's LOGO, not article artwork: the source had no image for
   those stories. A logo must be letterboxed (`contain`), never cropped
   to fill, or it gets beheaded by the card's aspect ratio.

   One press item has no artwork in the set at all —
   `analyticsindiamag-cybersecurity-barriers` — and falls back to the
   drawn PressPlate cover. Any id absent from these maps does the same,
   so adding a file later needs no code change beyond regenerating.
   ============================================================ */

export const PRESS_THUMBS: Record<string, string> = {
  "crn-fastest-growing-cybersecurity-startup": "/thumbs/press/crn-fastest-growing-cybersecurity-startup.webp",
  "crn-syscom-emea": "/thumbs/press/crn-syscom-emea.webp",
  "cxotoday-zero-trust-shields-assets": "/thumbs/press/cxotoday-zero-trust-shields-assets.webp",
  "dqindia-ztna-best-practices": "/thumbs/press/dqindia-ztna-best-practices.webp",
  "eletsonline-sdp-based-zero-trust": "/thumbs/press/eletsonline-sdp-based-zero-trust.webp",
  "enterpriseitworld-zero-trust-survey": "/thumbs/press/enterpriseitworld-zero-trust-survey.jpg",
  "fastmode-ztna-crucial-role": "/thumbs/press/fastmode-ztna-crucial-role.webp",
  "financialexpress-zero-trust-misconceptions": "/thumbs/press/financialexpress-zero-trust-misconceptions.webp",
  "financialexpress-zero-trust-name-of-game": "/thumbs/press/financialexpress-zero-trust-name-of-game.webp",
  "firstpost-union-budget-data-protection": "/thumbs/press/firstpost-union-budget-data-protection.webp",
  "forbesindia-daily-tech-brief-podcast": "/thumbs/press/forbesindia-daily-tech-brief-podcast.webp",
  "ft-high-growth-asia-pacific-ranking": "/thumbs/press/ft-high-growth-asia-pacific-ranking.jpg",
  "indiatechnologynews-ivalue": "/thumbs/press/indiatechnologynews-ivalue.webp",
  "instasafe-hpe-partnership": "/thumbs/press/instasafe-hpe-partnership.webp",
  "moneycontrol-mobikwik-breach-claim": "/thumbs/press/moneycontrol-mobikwik-breach-claim.webp",
  "moneycontrol-vaccination-techathon": "/thumbs/press/moneycontrol-vaccination-techathon.webp",
  "news18-bharos-data-privacy-day": "/thumbs/press/news18-bharos-data-privacy-day.webp",
  "news18-digital-india-act": "/thumbs/press/news18-digital-india-act.webp",
  "outlookindia-middle-east-europe-expansion": "/thumbs/press/outlookindia-middle-east-europe-expansion.webp",
  "smeoncloud-time-to-adopt-zero-trust": "/thumbs/press/smeoncloud-time-to-adopt-zero-trust.webp",
  "smestreet-znet-partnership": "/thumbs/press/smestreet-znet-partnership.webp",
  "techcircle-security-talent-crunch": "/thumbs/press/techcircle-security-talent-crunch.webp",
  "techiexpert-deloitte-apac-fast-500": "/thumbs/press/techiexpert-deloitte-apac-fast-500.webp",
  "techiexpert-smart-city-security": "/thumbs/press/techiexpert-smart-city-security.webp",
  "techpanda-cyber-watch-instasafe": "/thumbs/press/techpanda-cyber-watch-instasafe.webp",
  "techpanda-fintech-cyber-threats": "/thumbs/press/techpanda-fintech-cyber-threats.webp",
  "theprint-dsci-security-product-of-the-year": "/thumbs/press/theprint-dsci-security-product-of-the-year.webp",
  "thequint-cowin-crash": "/thumbs/press/thequint-cowin-crash.webp",
  "thequint-south-korea-ai-cameras": "/thumbs/press/thequint-south-korea-ai-cameras.webp",
  "thequint-why-indians-face-cyber-attacks": "/thumbs/press/thequint-why-indians-face-cyber-attacks.webp",
  "thequint-work-from-home-data-safety": "/thumbs/press/thequint-work-from-home-data-safety.webp",
  "toi-ai-cybersecurity-automation": "/thumbs/press/toi-ai-cybersecurity-automation.webp",
  "varindia-empowering-security-teams": "/thumbs/press/varindia-empowering-security-teams.webp",
};

export const BROCHURES_THUMBS: Record<string, string> = {
  "direct-routed-vs-cloud-routed-ztna": "/thumbs/brochures/direct-routed-vs-cloud-routed-ztna.webp",
  "instasafe-multi-factor-authentication-whitepaper": "/thumbs/brochures/instasafe-multi-factor-authentication-whitepaper.webp",
  "instasafe-vs-akamai-eaa": "/thumbs/brochures/instasafe-vs-akamai-eaa.webp",
  "instasafe-vs-cisco-duo": "/thumbs/brochures/instasafe-vs-cisco-duo.webp",
  "instasafe-vs-cloudflare": "/thumbs/brochures/instasafe-vs-cloudflare.webp",
  "instasafe-vs-fortinet-vpn": "/thumbs/brochures/instasafe-vs-fortinet-vpn.webp",
  "instasafe-vs-iboss": "/thumbs/brochures/instasafe-vs-iboss.webp",
  "instasafe-vs-pulse-secure": "/thumbs/brochures/instasafe-vs-pulse-secure.webp",
  "instasafe-vs-zscaler-private-access": "/thumbs/brochures/instasafe-vs-zscaler-private-access.webp",
  "instasafe-zero-trust-faqs": "/thumbs/brochures/instasafe-zero-trust-faqs.webp",
  "instasafe-zero-trust-vs-vpns": "/thumbs/brochures/instasafe-zero-trust-vs-vpns.webp",
  "introduction-to-instasafe-zero-trust": "/thumbs/brochures/introduction-to-instasafe-zero-trust.webp",
  "rbi-cybersecurity-framework-guidelines": "/thumbs/brochures/rbi-cybersecurity-framework-guidelines.webp",
  "regulatory-compliance-with-instasafe": "/thumbs/brochures/regulatory-compliance-with-instasafe.webp",
  "remote-access-for-it-ites-sector": "/thumbs/brochures/remote-access-for-it-ites-sector.webp",
  "sap-application-access-zero-trust": "/thumbs/brochures/sap-application-access-zero-trust.webp",
  "secure-access-to-o365-applications": "/thumbs/brochures/secure-access-to-o365-applications.webp",
  "secure-sso-for-saas-applications": "/thumbs/brochures/secure-sso-for-saas-applications.webp",
  "securing-financial-institutions-zero-trust": "/thumbs/brochures/securing-financial-institutions-zero-trust.webp",
  "security-solution-for-hybrid-workforce": "/thumbs/brochures/security-solution-for-hybrid-workforce.webp",
  "total-visibility-with-instasafe": "/thumbs/brochures/total-visibility-with-instasafe.webp",
  "zero-trust-access-brochure": "/thumbs/brochures/zero-trust-access-brochure.webp",
  "zero-trust-access-datasheet": "/thumbs/brochures/zero-trust-access-datasheet.webp",
  "zero-trust-scenarios-and-use-cases": "/thumbs/brochures/zero-trust-scenarios-and-use-cases.webp",
  "zero-trust-security-for-iot-whitepaper": "/thumbs/brochures/zero-trust-security-for-iot-whitepaper.webp",
  "zero-trust-vs-legacy-vpn-comparison": "/thumbs/brochures/zero-trust-vs-legacy-vpn-comparison.webp",
};

export const AWARDS_THUMBS: Record<string, string> = {
  "cio-choice-2017-cloud-security": "/thumbs/awards/cio-choice-2017-cloud-security.webp",
  "cybersecurity-excellence-finalist": "/thumbs/awards/cybersecurity-excellence-finalist.webp",
  "deloitte-fast-50-india-2020": "/thumbs/awards/deloitte-fast-50-india-2020.webp",
  "deloitte-fast-500-apac-2020": "/thumbs/awards/deloitte-fast-500-apac-2020.webp",
  "dsci-security-product-company-2021": "/thumbs/awards/dsci-security-product-company-2021.webp",
  "g2-high-performer-ztna": "/thumbs/awards/g2-high-performer-ztna.webp",
  "gartner-representative-vendor-ztna": "/thumbs/awards/gartner-representative-vendor-ztna.webp",
  "varindia-best-zero-trust-brand": "/thumbs/awards/varindia-best-zero-trust-brand.webp",
};

/** Publication logos standing in for missing article art — letterbox these. */
export const LOGO_THUMBS = new Set<string>([
  "moneycontrol-vaccination-techathon",
  "techcircle-security-talent-crunch",
  "theprint-dsci-security-product-of-the-year",
  "thequint-cowin-crash",
  "thequint-work-from-home-data-safety",
]);
