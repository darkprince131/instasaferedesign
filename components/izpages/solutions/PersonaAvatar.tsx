"use client";

/* ============================================================
   PersonaAvatar — the person in an illustration.

   Every diagram on this page used a 20px `User` glyph where the
   actor should be, which is exactly what made them read as
   flowcharts: a flowchart labels a role, an illustration shows a
   person. This is one drawn head-and-shoulders used for the actor
   in ALL of them, so the page has one recurring character instead
   of five clip-art variants.

   Colour comes from CSS custom properties, so the avatar follows
   the theme like every other surface: plate tints from --accent,
   figure inks from --tx. The verified dot is the one hard claim it
   makes — this person has been checked — and it reads in --allow.
   ============================================================ */

export function PersonaAvatar({ size, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pav-bg" cx="38%" cy="26%" r="86%">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--accent) 26%, var(--surface))" />
          <stop offset="58%" stopColor="color-mix(in srgb, var(--accent) 11%, var(--surface))" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--accent) 4%, var(--surface))" />
        </radialGradient>
        <linearGradient id="pav-ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--tx) 88%, var(--accent))" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--tx) 66%, var(--accent))" />
        </linearGradient>
        {/* everything below the plate's rim is clipped, so the shoulders
            sit IN the plate like a portrait, not on top of a sticker */}
        <clipPath id="pav-clip">
          <circle cx="48" cy="48" r="43" />
        </clipPath>
      </defs>

      {/* plate + rim */}
      <circle cx="48" cy="48" r="43" fill="url(#pav-bg)" />
      <circle
        cx="48"
        cy="48"
        r="43"
        fill="none"
        stroke="color-mix(in srgb, var(--accent) 38%, var(--line))"
        strokeWidth="2"
      />

      <g clipPath="url(#pav-clip)">
        {/* shoulders */}
        <path
          d="M18 96 C18 72 30 62 48 62 C66 62 78 72 78 96 Z"
          fill="url(#pav-ink)"
        />
        {/* collar notch — one light detail so the figure reads as drawn,
            not stamped */}
        <path
          d="M40 63 L48 74 L56 63"
          fill="none"
          stroke="color-mix(in srgb, var(--surface) 85%, transparent)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* head */}
        <circle cx="48" cy="40" r="15" fill="url(#pav-ink)" />
        {/* hair-line highlight */}
        <path
          d="M35.5 36 C38 28.5 44 25.5 48 25.5 C52 25.5 58 28.5 60.5 36"
          fill="none"
          stroke="color-mix(in srgb, var(--surface) 55%, transparent)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>

      {/* verified — the one claim */}
      <circle cx="76" cy="74" r="10" fill="var(--allow)" stroke="var(--surface)" strokeWidth="3" />
      <path
        d="M71.5 74.2 L74.6 77.2 L80.5 71.2"
        fill="none"
        stroke="var(--surface)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
