import type { Icon, IconWeight } from "@phosphor-icons/react";

/* The icon primitive every outcomes illustration draws with.

   WHY THIS EXISTS. The first pass hand-drew each glyph as raw paths —
   a house here, a fingerprint there — and every one carried its own
   stroke weight, corner radius and optical size. Read together they
   looked like five different illustrators. The design rule is one
   icon family, one stroke, tokenised sizes (ui-ux-pro-max §"Icons &
   Visual Elements"), and the project already ships Phosphor.

   HOW IT WORKS. A Phosphor icon renders `<svg viewBox="0 0 256 256"
   fill="currentColor">` and spreads unknown props onto that element,
   so passing x/y/width/height nests it as a positioned sub-SVG inside
   the artifact's own coordinate space. Colour comes from `color` on
   the class, which is why every tone here is a token, never a fill
   attribute.

   The paths are unclassed, so the shell's phase-1 reveal
   (`.iz-art path:not([class*="z-dash"])`) picks them up for free and
   the mobile static block already mirrors it.

   SIZES are a scale, not free numbers: 18 (row mark) · 24 (tile) ·
   30 (node) · 38 (hero). Anything else is a smell. */

export type IconTone = "ink" | "dim" | "mute" | "accent" | "allow" | "deny";

export const IC = { row: 18, tile: 24, node: 30, hero: 38 } as const;

export function ArtIcon({
  glyph: Glyph,
  cx,
  cy,
  size = IC.tile,
  tone = "dim",
  weight = "regular",
}: {
  glyph: Icon;
  /** centre, in the artifact's viewBox units */
  cx: number;
  cy: number;
  size?: number;
  tone?: IconTone;
  /** `duotone` for the two or three glyphs that carry the argument;
   *  `regular` for everything else. Never mix within a row. */
  weight?: IconWeight;
}) {
  return (
    <Glyph
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
      weight={weight}
      className={`a-ic a-ic--${tone}`}
    />
  );
}
