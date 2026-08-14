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

   NO INDEX NUMBERS. The cells used to be prefixed 01 / 02 / 03, which
   put a two-digit mono number immediately before a value that is itself
   a number — "01" then "4 layers verified per request" reads as "014
   layers", and the same collision hit every ribbon on every page. The
   index carried no meaning either: these are three facts, not three
   steps, and nothing refers back to "item 02". Do not reintroduce them.
   The rule is general — see docs/no-index-numbers-rule.md.
   ============================================================ */

export type RibbonItem = { value: string; label: string };

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
        {/* ul, not ol: with the indices gone these are three unordered
            facts, and an ordered list would still announce "1 of 3" to a
            screen reader after the visible numbering was removed. */}
        <ul className="izsr-list">
          {items.map((it) => (
            <li key={it.label} className="izsr-item">
              <span className="izsr-body">
                <b>{it.value}</b>
                <span className="izsr-label">
                  {it.label}
                  <i aria-hidden="true">_</i>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
