"use client";

import { useEffect, useRef, useState } from "react";
import { useConsent } from "./ConsentProvider";
import { CONSENT_CATEGORIES, type ConsentCategories, type ConsentCategoryKey } from "./consent-config";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/* ============================================================
   PreferenceCenter — modal dialog reopened from "Privacy choices"
   in either footer. Focus-trapped, ESC to close, restores focus
   to whatever triggered it. Category toggles are edited in a
   local draft and only committed on Save / Accept all / Reject all.
   ============================================================ */

export function PreferenceCenter() {
  const { categories, centerOpen, closeCenter, acceptAll, rejectAll, savePreferences } =
    useConsent();
  const [draft, setDraft] = useState<ConsentCategories>(categories);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Refresh the draft from the committed record every time the dialog opens.
  useEffect(() => {
    if (centerOpen) setDraft(categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerOpen]);

  useEffect(() => {
    if (!centerOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const node = dialogRef.current;
    const focusables = node ? node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) : null;
    focusables?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeCenter();
        return;
      }
      if (e.key !== "Tab") return;

      const current = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!current || current.length === 0) return;
      const list = Array.from(current);
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [centerOpen, closeCenter]);

  if (!centerOpen) return null;

  function toggle(key: ConsentCategoryKey) {
    if (key === "necessary") return;
    setDraft((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="consent-overlay">
      <div className="consent-overlay__backdrop" onClick={closeCenter} aria-hidden="true" />
      <div
        className="consent-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-dialog-title"
        ref={dialogRef}
      >
        <div className="consent-dialog__head">
          <div>
            <p className="consent-dialog__eyebrow">Privacy</p>
            <h2 id="consent-dialog-title" className="consent-dialog__title">
              Privacy choices
            </h2>
          </div>
          <button
            type="button"
            className="consent-dialog__close"
            onClick={closeCenter}
            aria-label="Close privacy choices"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="consent-dialog__body">
          {CONSENT_CATEGORIES.map((cat) => (
            <div className="consent-row" key={cat.key}>
              <div className="consent-row__head">
                <span className="consent-row__label">{cat.label}</span>
                {cat.locked ? (
                  <span className="consent-row__locked" aria-label={`${cat.label} is always on`}>
                    <span className="consent-toggle is-on is-locked" aria-hidden="true">
                      <span className="consent-toggle__thumb" />
                    </span>
                    <span className="consent-row__locked-text">Always on</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    role="switch"
                    aria-checked={draft[cat.key]}
                    aria-label={`${cat.label}: ${draft[cat.key] ? "on" : "off"}`}
                    className={`consent-toggle${draft[cat.key] ? " is-on" : ""}`}
                    onClick={() => toggle(cat.key)}
                  >
                    <span className="consent-toggle__thumb" />
                  </button>
                )}
              </div>
              <p className="consent-row__desc">{cat.description}</p>
            </div>
          ))}
        </div>

        <div className="consent-dialog__foot">
          <p className="consent-dialog__note">
            You can change or withdraw your consent at any time from this panel. Questions about
            your data? Contact our Grievance Officer at{" "}
            <span className="consent-legal-flag">[LEGAL REVIEW: name/email]</span>. You may also
            complain to the Data Protection Board of India.{" "}
            <a href="/privacy-policy" className="consent-dialog__link">
              Read our Privacy Policy
            </a>
            .
          </p>
          <div className="consent-dialog__actions">
            <button type="button" className="consent-btn" onClick={rejectAll}>
              Reject all
            </button>
            <button type="button" className="consent-btn" onClick={acceptAll}>
              Accept all
            </button>
            <button
              type="button"
              className="consent-btn consent-btn--primary"
              onClick={() => savePreferences(draft)}
            >
              Save preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
