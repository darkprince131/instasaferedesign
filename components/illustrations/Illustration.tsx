import fs from "fs";
import path from "path";

/* ============================================================
   Illustration — SERVER component (no "use client").

   Inlines a hand-recreated SVG from public/illustrations so its
   CSS variables (var(--il-ink) / var(--il-accent) / var(--il-chip)
   / var(--il-faint)) resolve against the live `.iz` theme and flip
   with the paper ⇄ dark toggle. Because the SVG is inlined into the
   document (not loaded via <img> or <use>), the tokens cascade in.

   Usage:
     <Illustration src="img-089_empty-state-ledger.svg" alt="…" />

   The file is read from disk at build/render time and cached in a
   module-level Map so repeated renders don't re-hit the filesystem.
   Pure fs read → safe for static prerendering.
   ============================================================ */

const cache = new Map<string, string>();

function loadSvg(src: string): string {
  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  const filePath = path.join(process.cwd(), "public", "illustrations", src);

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    throw new Error(
      `Illustration: could not read SVG "${src}" at ${filePath}. ` +
        `Make sure the file exists in public/illustrations and the filename is spelled correctly.`
    );
  }

  // sanity-strip an XML prolog / doctype so we inline a clean <svg> root
  const svg = raw
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .trim();

  if (!svg.startsWith("<svg")) {
    throw new Error(
      `Illustration: file "${src}" does not start with an <svg> root after stripping the prolog.`
    );
  }

  cache.set(src, svg);
  return svg;
}

type IllustrationProps = {
  src: string;
  alt: string;
  className?: string;
};

export function Illustration({ src, alt, className }: IllustrationProps) {
  const svg = loadSvg(src);

  return (
    <span
      className={`iz-illus${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default Illustration;
