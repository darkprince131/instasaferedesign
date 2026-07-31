/* ============================================================
   consent-config — shared types, constants and copy for the
   DPDP-aligned consent system. No React here; safe to import
   from both client and server files.
   ============================================================ */

/** Bump this to re-prompt every visitor (old records are treated as absent). */
export const CONSENT_VERSION = 1;

/** localStorage key holding the consent record. */
export const CONSENT_KEY = "instasafe-consent";

export type ConsentCategoryKey = "necessary" | "analytics" | "marketing" | "functional";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type ConsentRecord = {
  version: number;
  timestamp: string;
  categories: ConsentCategories;
};

/** Opt-in by default — nothing but strictly-necessary is on until the visitor says so. */
export function defaultDenyCategories(): ConsentCategories {
  return { necessary: true, analytics: false, marketing: false, functional: false };
}

export function allowAllCategories(): ConsentCategories {
  return { necessary: true, analytics: true, marketing: true, functional: true };
}

export type ConsentCategoryDef = {
  key: ConsentCategoryKey;
  label: string;
  description: string;
  locked?: boolean;
};

/** Copy is verbatim from the DPDP consent plan — do not paraphrase without legal sign-off. */
export const CONSENT_CATEGORIES: ConsentCategoryDef[] = [
  {
    key: "necessary",
    label: "Necessary",
    description: "Required for the site to work (security, your preferences). Always on.",
    locked: true,
  },
  {
    key: "analytics",
    label: "Analytics",
    description: "Helps us see how the site is used so we can improve it.",
  },
  {
    key: "marketing",
    label: "Marketing",
    description: "Lets us measure campaigns and show relevant information.",
  },
  {
    key: "functional",
    label: "Functional",
    description: "Remembers choices like theme to personalize your experience.",
  },
];

/**
 * Tracker IDs, read from env at build time. Every slot is optional — when unset,
 * GatedScripts renders nothing for it. Re-adding a tracker later is just:
 * set the env var, redeploy, no code change.
 */
export const TRACKER_IDS = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  zohoPageSenseId: process.env.NEXT_PUBLIC_ZOHO_PAGESENSE_ID,
  clearbitId: process.env.NEXT_PUBLIC_CLEARBIT_ID,
} as const;
