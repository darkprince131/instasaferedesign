"use client";

import { useState, type ReactNode } from "react";
import { LOGO_THUMBS } from "@/lib/thumbs";

/* ============================================================
   ThumbCover — the supplied thumbnail on a book face, with the
   drawn cover as its fallback.

   Two rules this exists to keep:

   1. NEVER A BROKEN-IMAGE BOX. The standing rule is that a missing
      picture renders as drawn art or text, never as the browser's
      torn-page glyph. So a 404 or a decode failure swaps in the
      `art` we would have drawn anyway. An item with no entry in the
      thumb map never renders an <img> at all.

   2. NOTHING THAT IS TEXT GETS CROPPED. The three sets are
      different kinds of picture and cannot share one fit:

        press      article hero art, ~1.92:1 → `cover` on a 16/9
                   face. The ~7% side crop is invisible and a filled
                   face looks better than letterbox bars.
        brochures  a mockup of the PDF's own cover, ~1.92:1 →
                   `contain`. Cropping the edges ate the wordmark.
        awards     certificates, mixed portrait and landscape →
                   `contain` on 4/3. Every pixel of a certificate is
                   text; a crop loses the award's name.

      Five press entries are the publication's LOGO rather than
      article art (the source had no image for those stories); those
      are forced to `contain` whatever the set says, because cropping
      a wordmark decapitates it.

   The face is a fixed ratio per set either way: cards sit in a grid,
   and letting each cover set its own height makes the rows ragged.
   ============================================================ */

export function ThumbCover({
  id,
  src,
  alt,
  art,
  fit = "cover",
  ratio = "16 / 9",
}: {
  /** item id — used only to look up whether this file is a logo */
  id: string;
  /** resolved public path, or undefined when the set has no file */
  src?: string;
  alt: string;
  /** the drawn cover, used when there is no file or the file fails */
  art: ReactNode;
  fit?: "cover" | "contain";
  ratio?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{art}</>;

  /* a logo is never cropped, whatever the set's default is */
  const letterbox = fit === "contain" || LOGO_THUMBS.has(id);

  return (
    <span
      className={`izth${letterbox ? " izth--fit" : ""}${LOGO_THUMBS.has(id) ? " izth--logo" : ""}`}
      style={{ ["--izth-ar" as string]: ratio }}
    >
      {/* plain <img>: these are 67 static files of wildly mixed origin
          and aspect; next/image would want per-file dimensions for
          nothing, since the face crops them all to one ratio anyway. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
    </span>
  );
}
