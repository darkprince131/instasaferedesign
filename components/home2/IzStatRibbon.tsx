"use client";

/* ============================================================
   00ay · IzStatRibbon — the data ribbon that replaces 00q
   FilterStream in the "stat strip" / interstitial slot.

   THE STANDARD TREATMENT, not a per-page decision. FilterStream's
   marquee of drifting rule-chips is a section-sized visual; in a
   thin interstitial it reads as decoration that happens to move.
   This takes the grammar of the 00am progress rail instead — an
   indexed counter, a mono value, a hairline between cells — so an
   interstitial says "here are the numbers" in the same language
   the stepper already taught the reader.

   Every page uses this in that slot. Pass `items`; nothing else.
   ============================================================ */

export type RibbonItem = { value: string; label: string };

const pad = (i: number) => String(i + 1).padStart(2, "0");

export function IzStatRibbon({
  items,
  className,
}: {
  items: RibbonItem[];
  className?: string;
}) {
  return (
    <section className={className ? `izsr ${className}` : "izsr"} aria-label="Key numbers">
      <div className="iz-wrap">
        <ol className="izsr-list">
          {items.map((it, i) => (
            <li key={it.label} className="izsr-item">
              <span className="izsr-i" aria-hidden="true">
                {pad(i)}
              </span>
              <span className="izsr-body">
                <b>{it.value}</b>
                <span className="izsr-label">
                  {it.label}
                  <i aria-hidden="true">_</i>
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
