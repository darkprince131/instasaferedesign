/* The entire contract between the outcomes shell and an artifact.
   One prop. Nothing else — no copy, no theme, no size. That is what
   lets the visual layer be swapped without touching a page's content. */
export type ArtifactProps = {
  /** 0 | 1 | 2 emphasises the matching part; null is the neutral state,
   *  which already shows everything. Always null on touch devices and
   *  under prefers-reduced-motion. */
  highlightIndex: number | null;
};
