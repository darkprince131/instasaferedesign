"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { embedSrc, watchHref, type VideoItem } from "@/lib/resource-center";

/* ============================================================
   IzVideoLightbox — the player overlay.

   Deliberately minimal: the iframe is only mounted while a video is
   open, so no YouTube script, cookie or network request happens on a
   visit where nobody presses play. That is the whole reason this is a
   click-to-open lightbox rather than 15 embedded players.

   Accessibility: role="dialog" + aria-modal, Escape closes, focus
   moves to the close button on open and returns to the invoking card
   on close, and background scroll is locked. Focus is not trapped in a
   loop — with two focusable elements inside, tabbing past them lands
   on browser chrome, which is a reasonable place to end up.
   ============================================================ */

export function IzVideoLightbox({
  video,
  onClose,
}: {
  video: VideoItem | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<Element | null>(null);

  useEffect(() => {
    if (!video) return;

    returnTo.current = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      (returnTo.current as HTMLElement | null)?.focus?.();
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="izrc-lb"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="izrc-lb-panel">
        <div className="izrc-lb-bar">
          <p className="izrc-lb-title">{video.title}</p>
          <button
            ref={closeRef}
            type="button"
            className="izrc-lb-close"
            onClick={onClose}
            aria-label="Close video"
          >
            <X weight="bold" aria-hidden="true" />
          </button>
        </div>

        <div className="izrc-lb-frame">
          <iframe
            src={embedSrc(video)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <a className="izrc-lb-out" href={watchHref(video)} target="_blank" rel="noopener">
          Watch on YouTube
          <ArrowUpRight weight="bold" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
