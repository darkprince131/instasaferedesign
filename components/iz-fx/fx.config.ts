/* ============================================================
   IZ_FX — one flag file to kill any `.iz` v3-derived effect
   site-wide. Flip a flag to `false` and the corresponding piece
   disables everywhere it's used, no per-page edits required.

   - nodal:     the nodal-mesh background (NodalField). false ⇒
                NodalField renders null everywhere it's mounted.
   - spotlight: the cursor-follow spotlight reveal inside
                NodalField. Only matters while `nodal` is true.
   - backlight: the `.iz-fx-card` accent-glow hover treatment
                (fx.css). Flip off here AND/OR set
                `.iz[data-fx="off"]` on a subtree to neutralize
                just that section (see fx.css).
   ============================================================ */
export const IZ_FX = {
  nodal: true,
  spotlight: true,
  backlight: true,
};
