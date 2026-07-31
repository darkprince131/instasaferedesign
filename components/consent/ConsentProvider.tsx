"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_KEY,
  CONSENT_VERSION,
  allowAllCategories,
  defaultDenyCategories,
  type ConsentCategories,
  type ConsentRecord,
} from "./consent-config";
import { ConsentBanner } from "./ConsentBanner";
import { PreferenceCenter } from "./PreferenceCenter";
import { GatedScripts } from "./GatedScripts";
import "./consent.css";

type ConsentContextValue = {
  categories: ConsentCategories;
  /** true once the localStorage read has resolved (client-only, avoids hydration flash). */
  ready: boolean;
  /** true once a valid, current-version consent record exists. */
  hasConsented: boolean;
  bannerOpen: boolean;
  centerOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (categories: ConsentCategories) => void;
  openCenter: () => void;
  closeCenter: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStoredConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord> | null;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (!parsed.categories || parsed.categories.necessary !== true) return null;
    if (!parsed.timestamp) return null;
    return parsed as ConsentRecord;
  } catch {
    // Storage unavailable (private mode, blocked, corrupt JSON) — treat as no consent.
    return null;
  }
}

function writeStoredConsent(categories: ConsentCategories) {
  if (typeof window === "undefined") return;
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories,
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    // Best-effort only; if storage is blocked the visitor is simply re-prompted next visit.
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ConsentCategories>(defaultDenyCategories());
  const [ready, setReady] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [centerOpen, setCenterOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setCategories(stored.categories);
      setHasConsented(true);
      setBannerOpen(false);
    } else {
      setCategories(defaultDenyCategories());
      setHasConsented(false);
      setBannerOpen(true);
    }
    setReady(true);
  }, []);

  const commit = useCallback((next: ConsentCategories) => {
    setCategories(next);
    setHasConsented(true);
    writeStoredConsent(next);
    setBannerOpen(false);
    setCenterOpen(false);
  }, []);

  const acceptAll = useCallback(() => commit(allowAllCategories()), [commit]);
  const rejectAll = useCallback(() => commit(defaultDenyCategories()), [commit]);
  const savePreferences = useCallback(
    (next: ConsentCategories) => commit({ ...next, necessary: true }),
    [commit]
  );
  const openCenter = useCallback(() => setCenterOpen(true), []);
  const closeCenter = useCallback(() => setCenterOpen(false), []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      categories,
      ready,
      hasConsented,
      bannerOpen,
      centerOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openCenter,
      closeCenter,
    }),
    [
      categories,
      ready,
      hasConsented,
      bannerOpen,
      centerOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openCenter,
      closeCenter,
    ]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <ConsentBanner />
      <PreferenceCenter />
      <GatedScripts />
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return ctx;
}
