"use client";

/* ============================================================
   IzSplitPlane — the visual for the platform Outcomes section.

   Drawn inline rather than pulled from the illustration library:
   public/illustrations/ currently holds only its README, so there
   is no blueprint asset on disk to reference. This follows the
   same conventions that library documents — mono-weight line work,
   one accent focal element, everything on --il-* tokens so it
   flips with the paper/dark toggle rather than shipping two files.

   What it draws is the split-plane claim from the copy: the
   control plane (us) sits above and only signs decisions; the data
   plane (them) runs straight across, user to app, never through
   us. The accent is spent on that one straight line, because that
   line IS the outcome.
   ============================================================ */

export function IzSplitPlane() {
  return (
    <svg className="izsp" viewBox="0 0 420 300" role="img" aria-label="Split-plane architecture: control plane above, data plane direct between user and application">
      {/* --- control plane band --- */}
      <rect x="60" y="26" width="300" height="62" rx="4" fill="none" stroke="var(--il-faint)" strokeWidth="1" strokeDasharray="4 4" />
      <text x="70" y="20" className="izsp-tag">CONTROL PLANE · INSTASAFE</text>

      <rect x="86" y="44" width="76" height="26" rx="3" fill="none" stroke="var(--il-ink)" strokeWidth="1.2" />
      <text x="124" y="61" className="izsp-lbl" textAnchor="middle">Identity</text>

      <rect x="172" y="44" width="76" height="26" rx="3" fill="none" stroke="var(--il-ink)" strokeWidth="1.2" />
      <text x="210" y="61" className="izsp-lbl" textAnchor="middle">Policy</text>

      <rect x="258" y="44" width="76" height="26" rx="3" fill="none" stroke="var(--il-ink)" strokeWidth="1.2" />
      <text x="296" y="61" className="izsp-lbl" textAnchor="middle">Posture</text>

      {/* --- decision drops: control plane signs, then steps back --- */}
      <path d="M124 70 V116" stroke="var(--il-faint)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      <path d="M210 70 V116" stroke="var(--il-faint)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      <path d="M296 70 V116" stroke="var(--il-faint)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      <path d="M124 116 H296" stroke="var(--il-faint)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      <path d="M210 116 V150" stroke="var(--il-faint)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      <text x="218" y="140" className="izsp-note">decision only</text>

      {/* --- the data plane: one straight, unbroken accent line --- */}
      <text x="60" y="188" className="izsp-tag">DATA PLANE · YOURS</text>

      {/* user */}
      <circle cx="76" cy="216" r="15" fill="none" stroke="var(--il-ink)" strokeWidth="1.4" />
      <circle cx="76" cy="211" r="4.5" fill="none" stroke="var(--il-ink)" strokeWidth="1.2" />
      <path d="M68 225a8 8 0 0 1 16 0" fill="none" stroke="var(--il-ink)" strokeWidth="1.2" />
      <text x="76" y="252" className="izsp-lbl" textAnchor="middle">User</text>

      {/* the line — THE focal element, and the only accent in the frame */}
      <path d="M96 216 H328" stroke="var(--il-accent)" strokeWidth="2" fill="none" />
      <path d="M318 210 l10 6 -10 6" fill="none" stroke="var(--il-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="212" y="205" className="izsp-accent" textAnchor="middle">never transits InstaSafe</text>

      {/* application */}
      <rect x="330" y="198" width="40" height="36" rx="3" fill="none" stroke="var(--il-ink)" strokeWidth="1.4" />
      <path d="M330 208 H370" stroke="var(--il-ink)" strokeWidth="1.2" />
      <circle cx="337" cy="203" r="1.6" fill="var(--il-ink)" />
      <text x="350" y="252" className="izsp-lbl" textAnchor="middle">App</text>

      {/* baseline rule */}
      <path d="M40 276 H380" stroke="var(--il-faint)" strokeWidth="1" />
      <text x="40" y="292" className="izsp-note">split-plane · control above, data across</text>
    </svg>
  );
}
