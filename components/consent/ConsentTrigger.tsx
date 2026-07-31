"use client";

import { useConsent } from "./ConsentProvider";

/* ============================================================
   ConsentTrigger — reopens the preference center. Drop this into
   any footer/nav as the persistent "withdrawal as easy as giving"
   access point. Unstyled by default beyond consent.css's own
   `.consent-trigger` class; pass `className` to blend into a
   surrounding link row (v3 Footer, IzFooter, etc).
   ============================================================ */

export function ConsentTrigger({ className }: { className?: string }) {
  const { openCenter } = useConsent();
  return (
    <button
      type="button"
      className={className ? `consent-trigger ${className}` : "consent-trigger"}
      onClick={openCenter}
    >
      Privacy choices
    </button>
  );
}
