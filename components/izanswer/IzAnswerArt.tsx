"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* The reveal wrapper for answer-strip illustrations.

   WHY IT EXISTS AT ALL. The illustrations paint with the `.iz-art`
   vocabulary from illustrations.css, and that file HIDES everything by
   default — `.iz-art text { opacity: 0 }` — because the outcomes shell
   restores it with `.izo.in`. An answer strip is not an outcomes
   section, so nothing would ever restore it and the whole picture
   would render blank. This wrapper is the restore signal: it adds
   `.in` once the illustration has actually been reached, and
   answers.css writes every restore at a specificity that clears the
   hide rules (see the note there — that cascade has bitten this file
   family four times).

   ONE SHOT. Same contract as the outcomes reveal: assemble, connect,
   stop. Nothing loops, and a visitor who arrives mid-page sees the
   finished picture rather than a stalled one. */

export function IzAnswerArt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* No IntersectionObserver — no reveal machinery either: show the
       finished frame rather than leaving the picture hidden. */
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`izans-art${seen ? " in" : ""}`}>
      {children}
    </div>
  );
}
