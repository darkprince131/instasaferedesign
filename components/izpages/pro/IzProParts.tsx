"use client";

import type { ReactNode } from "react";

/* ============================================================
   00am, split into named parts.

   IzProStack shipped as one component containing three separable
   things, which made "use 00am" ambiguous every time it came up —
   the hero, the scroll-driven slider, and the progress rail are
   different pieces with different jobs. They are named here so a
   page can ask for exactly one:

     IzProHero    — components/izpages/pro/IzProHero.tsx
                    the design-canvas hero. Already standalone.
     IzProStack   — components/izpages/pro/IzProStack.tsx
                    the sticky scroll slider. The "scroll part".
     IzProRail    — below. The numbered progress rail that rides
                    the slider, usable on its own beside any
                    stepped content.
     IzProCounter — below. The `01/04` eyebrow counter.

   Nothing here changes IzProStack's behaviour; these are the
   extracted pieces, so referring to "the rail" or "the slider"
   points at one file instead of a region of a 400-line component.
   ============================================================ */

const num = (i: number) => String(i + 1).padStart(2, "0");

/** `01/04` — the counter that labels which step you are on. */
export function IzProCounter({
  index,
  total,
  label,
}: {
  index: number;
  total: number;
  label?: ReactNode;
}) {
  return (
    <span className="izpro-eyebrow">
      <b>
        {num(index)}/{num(total - 1)}
      </b>
      {label}
    </span>
  );
}

/**
 * The numbered progress rail. Marks which step of a sequence is
 * current; the active entry also carries its own label.
 */
export function IzProRail({
  steps,
  active,
  className,
}: {
  steps: { id: string; label: string }[];
  active: number;
  className?: string;
}) {
  return (
    <ol className={className ? `izpro-rail ${className}` : "izpro-rail"} aria-hidden="true">
      {steps.map((s, i) => (
        <li key={s.id} className={i === active ? "on" : ""}>
          <span>{num(i)}</span>
          {i === active && <i>{s.label}</i>}
        </li>
      ))}
    </ol>
  );
}
