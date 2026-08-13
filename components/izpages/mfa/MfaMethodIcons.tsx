/* ============================================================
   MfaMethodIcons — one drawn icon per factor.

   Deliberately hand-drawn rather than pulled from Phosphor, because
   the brief asks each icon to carry a SPECIFIC detail that no icon
   set ships: a dashed arc for the 30 seconds left on a TOTP code, a
   tap ripple over an approve button, a face outline behind a
   fingerprint whorl. Those details are the argument in miniature —
   a generic clock and a generic phone would make six panels that all
   look like "security".

   The set is one drawing style, strictly:
     · 1.5px stroke, rounded caps and joins, no fills
     · a 24-unit box, so they sit on the same optical grid
     · exactly ONE element per icon painted in the accent — the part
       that matters — and everything else in currentColor

   `currentColor` and `--accent` do the theming, so these flip with
   the page and never need a dark variant.
   ============================================================ */

const BASE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* TOTP — a clock whose remaining 30 seconds is a dashed arc, with the
   crossed signal bars tucked in the corner saying the arc keeps
   turning with no network at all. */
export const IcTotp = () => (
  <svg {...BASE} className="mfic">
    <circle cx="11" cy="11" r="7.25" />
    <path d="M11 6.75V11l2.6 1.8" />
    <path className="mfic-hot" d="M18.25 11A7.25 7.25 0 0 1 11 18.25" strokeDasharray="2.4 2.2" />
    <g className="mfic-sig">
      <path d="M17.4 21.4v-1.5M19.5 21.4v-2.9M21.6 21.4v-4.3" />
      <path d="M16.6 16.4l5.8 5.8" />
    </g>
  </svg>
);

/* SMS OTP — a feature phone, not a smartphone. The stubby aerial and
   the keypad dots are the point: this is the factor for handsets that
   will never run an app. */
export const IcSms = () => (
  <svg {...BASE} className="mfic">
    <rect x="4.75" y="3.75" width="9.5" height="16.5" rx="1.6" />
    <path d="M6.75 7.25h5.5" />
    <path d="M7.2 11.4h.01M9.5 11.4h.01M11.8 11.4h.01M7.2 14h.01M9.5 14h.01M11.8 14h.01M7.2 16.6h.01M9.5 16.6h.01M11.8 16.6h.01" />
    <path className="mfic-hot" d="M15.5 5.5h4.75a1.5 1.5 0 0 1 1.5 1.5v3.4a1.5 1.5 0 0 1-1.5 1.5H19l-2 2.1v-2.1h-1.5" />
  </svg>
);

/* Email OTP — an envelope with the code field beside it. The field is
   the accent because the code is the thing that arrives; the mailbox
   is just where it lands. */
export const IcEmail = () => (
  <svg {...BASE} className="mfic">
    <rect x="2.75" y="5.75" width="12.5" height="9.5" rx="1.5" />
    <path d="M2.75 7.5L9 11.4l6.25-3.9" />
    <g className="mfic-hot">
      <rect x="13.4" y="13.6" width="7.85" height="5.4" rx="1.2" />
      <path d="M15.4 16.3h.01M17.3 16.3h.01M19.2 16.3h.01" />
    </g>
  </svg>
);

/* Push — a phone with an approve button and the ripple of a single
   tap. Nothing to read across, which is why there is no code anywhere
   in this drawing. */
export const IcPush = () => (
  <svg {...BASE} className="mfic">
    <rect x="5.75" y="2.75" width="12.5" height="18.5" rx="2" />
    <path d="M10.4 5.4h3.2" />
    <rect x="8.25" y="9.5" width="7.5" height="3.4" rx="1.7" />
    <path d="M10.5 11.2l1.1 1.1 2.1-2.2" />
    <g className="mfic-hot">
      <circle cx="12" cy="17" r="1.15" />
      <path d="M9.4 17a2.6 2.6 0 0 1 5.2 0" strokeDasharray="1.8 1.8" />
    </g>
  </svg>
);

/* Biometric — a whorl with a face outline behind it. The core of the
   whorl is the accent: the one part of a person that cannot be told
   to a colleague. */
export const IcBiometric = () => (
  <svg {...BASE} className="mfic">
    <path d="M4.9 8.6a7.8 7.8 0 0 1 14.2 0v5.2a7.1 7.1 0 0 1-2.6 5.5" opacity="0.4" />
    <path d="M7.6 10.4a4.4 4.4 0 0 1 8.8 0v2.4a8 8 0 0 1-1.5 4.7" />
    <path d="M10.3 10.6a1.75 1.75 0 0 1 3.5 0v2.3a10 10 0 0 1-.9 4.2" />
    <path className="mfic-hot" d="M12 11.1v2a12 12 0 0 1-.55 3.6" />
  </svg>
);

/* Hardware key — a USB security key in three-quarter view. The touch
   contact is the accent, because the key only signs when a human is
   standing there with a finger on it. */
export const IcKey = () => (
  <svg {...BASE} className="mfic">
    <path d="M3.75 9.4h9.6a1.6 1.6 0 0 1 1.6 1.6v2.4a1.6 1.6 0 0 1-1.6 1.6H3.75a1 1 0 0 1-1-1v-3.6a1 1 0 0 1 1-1z" />
    <path d="M15 10.4h3.2a2.1 2.1 0 0 1 2.1 2.1 2.1 2.1 0 0 1-2.1 2.1H15" />
    <path d="M5.6 11.6v1.9M7.7 11.6v1.9" />
    <circle className="mfic-hot" cx="18.1" cy="12.5" r="1.3" />
  </svg>
);
