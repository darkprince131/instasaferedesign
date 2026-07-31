/* ============================================================
   ThemedImage — raster illustration pairs.

   For illustrations that arrive as PNG pairs instead of hand-recreated
   SVGs: {base}_dark.png + {base}_paper.png live in public/illustrations.
   Renders BOTH <img> tags; CSS in home2.css hides the wrong one per
   theme (`.iz[data-theme="dark"] .il-paper` / `…paper .il-dark`), so
   the swap is pure CSS — no JS, no hydration flash.

   Plain <img loading="lazy"> (not next/image): files land ad-hoc and
   dimensions vary, so we don't want build-time image optimisation to
   require known sizes.

   Usage:
     <ThemedImage base="img-054_two-corridors" alt="…" />
   ============================================================ */

type ThemedImageProps = {
  base: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export function ThemedImage({ base, alt, width, height, className }: ThemedImageProps) {
  const dir = "/illustrations";
  return (
    <span
      className={`iz-themed-img${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={alt}
    >
      {/* alt="" on the imgs — the wrapper's aria-label is the accessible name */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="il-dark"
        src={`${dir}/${base}_dark.png`}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="il-paper"
        src={`${dir}/${base}_paper.png`}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

export default ThemedImage;
