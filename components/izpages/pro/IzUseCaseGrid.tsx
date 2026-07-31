"use client";

import { useRef } from "react";
import { GRID } from "./sections.config";
import { Mock } from "./IzMocks";
import { useHoverIndex } from "./useHoverIndex";

/* ============================================================
   IzUseCaseGrid — TIER 2 SECTION  (lab 00an)

   The cell-grid section from fingerprint.com/products/fingerprint-pro/.
   Two display-type cells across the top, then a grid where one cell
   is copy and the rest are use cases, each holding a product mock-up
   and a mono footer label.

   THE HOVER IS THE CONTINUATION OF THE HERO. Hovering a cell doesn't
   just tint it — it draws the same accent selection the hero puts
   around its headline: a 1px accent outline, four corner handles, and
   the fine grid field lit in accent underneath. The page's conceit is
   a design canvas, and this section is where the visitor gets to move
   the selection themselves. Reusing `.iz-gridfield` (izgrid.css) here
   rather than inventing a texture is what makes it read as the same
   surface as the hero rather than a lookalike.

   Only the hovered cell runs its animation (`.is-live`). One cell is
   live at a time, so the section is never a wall of competing motion.

   MOBILE: no hover to give. The first cell is permanently live and
   the rest are stills — the section still says all three things, it
   just doesn't ask for a cursor it isn't going to get.
   ============================================================ */

export function IzUseCaseGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { index } = useHoverIndex(ref, ".izug-cell");

  /* Nothing is live until a cell is hovered or focused. On touch the
     hook never reports an index, and the stylesheet freezes every
     mock at its end state below 900px — so all three cells read as
     finished stills rather than one arbitrary cell animating while
     its neighbours sit frozen. */
  const liveIndex = index;

  return (
    <section className="izug iz-railed">
      <div className="iz-wrap">
        <div className="izug-grid" ref={ref}>
          {GRID.heads.map((h) => (
            <div className="izug-head" key={h}>
              <h2>{h}</h2>
            </div>
          ))}

          <div className="izug-copy">
            <p>
              <b>{GRID.copy.lead}</b>
              <br />
              {GRID.copy.rest}
            </p>
          </div>

          {GRID.cells.map((c, i) => {
            const live = i === liveIndex;
            return (
              <div key={c.id} className={`izug-cell ${live ? "is-live" : ""}`} tabIndex={0} aria-label={c.label}>
                {/* the hero's selection language, brought forward */}
                <span className="izug-field iz-gridfield" aria-hidden="true" />
                <span className="izug-sel" aria-hidden="true">
                  <i className="izug-h izug-h--tl" />
                  <i className="izug-h izug-h--tr" />
                  <i className="izug-h izug-h--bl" />
                  <i className="izug-h izug-h--br" />
                </span>

                <div className="izug-stage">
                  <Mock kind={c.mock} />
                </div>

                <span className="izug-label">{c.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
