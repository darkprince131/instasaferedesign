"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import { posterFallback, posterSrc, type VideoItem } from "@/lib/resource-center";

/* ============================================================
   IzVideoCard — one webinar or product video.

   A button, not a link: the click opens the in-page lightbox rather
   than leaving the site. The YouTube URL is still reachable — the
   lightbox carries a "watch on YouTube" link — but the default
   behaviour keeps the visitor here.

   The poster is a plain <img>, not next/image. While SELF_HOSTED is
   false these come off i.ytimg.com and would need a remotePatterns
   entry in next.config; once the fetch script has run they are static
   files in public/ and next/image would buy an optimisation pass on 15
   images that are already correctly sized. Neither case earns it.
   ============================================================ */

export function IzVideoCard({
  item,
  onOpen,
  kind,
}: {
  item: VideoItem;
  onOpen: (v: VideoItem) => void;
  kind: "Webinar" | "Product video";
}) {
  const [src, setSrc] = useState(posterSrc(item));
  const fallback = posterFallback(item);

  return (
    <li className="izrc-card izrc-card--vid">
      <button type="button" className="izrc-card-a" onClick={() => onOpen(item)}>
        <span className="izrc-shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => {
              if (src !== fallback) setSrc(fallback);
            }}
          />
          <span className="izrc-play" aria-hidden="true">
            <Play weight="fill" />
          </span>
        </span>

        <span className="izrc-meta">
          <span className="izrc-topic">{kind}</span>
        </span>

        <h3 className="izrc-title">{item.title}</h3>
        <p className="izrc-blurb">{item.blurb}</p>

        <span className="izrc-go">
          Watch
          <Play weight="fill" aria-hidden="true" />
        </span>
      </button>
    </li>
  );
}
