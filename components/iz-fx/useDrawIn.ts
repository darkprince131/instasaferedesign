"use client";

import { useEffect, useRef } from "react";

/* ============================================================
   useDrawIn — the outline draw-on animation

   Verified on fingerprint.com: their outline visuals sit at
   `stroke-dasharray: 146px; stroke-dashoffset: 146px` before they
   run, i.e. the whole path is one dash pushed fully out of view,
   then the offset is animated to 0. That's the entire trick, and it
   works on ANY svg path — which is why this is a hook and not a
   component.

   Scope note: this is NOT tied to the 89-image illustration
   catalogue (that's a later, separate job). It exists for the
   component artwork we build — flow diagrams, device outlines,
   mega-menu icons, console scenes.

   Usage:
     const ref = useDrawIn<SVGSVGElement>();
     <svg ref={ref} className="iz-draw"> …paths… </svg>

   Every <path>/<line>/<polyline>/<circle>/<rect> inside gets its own
   length measured and its own stagger. Elements marked
   `data-draw="skip"` are left alone — use that for fills and for
   anything that should just be there from the start.
   ============================================================ */

type Options = {
  /** ms per path of stagger */
  stagger?: number;
  /** ms for one path to draw */
  duration?: number;
  /** how much of the element must be on screen before it runs */
  threshold?: number;
  /** re-run every time it scrolls back into view */
  repeat?: boolean;
};

const DRAWABLE = "path, line, polyline, polygon, circle, ellipse, rect";

export function useDrawIn<T extends SVGSVGElement | HTMLElement>({
  stagger = 90,
  duration = 900,
  threshold = 0.25,
  repeat = false,
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const shapes = [...root.querySelectorAll<SVGGeometryElement>(DRAWABLE)].filter(
      (s) => s.dataset.draw !== "skip"
    );
    if (!shapes.length) return;

    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    /* getTotalLength() is only meaningful once the element is laid out,
       and it throws on some shapes in some engines — fall back to a
       perimeter estimate from the bounding box rather than losing the
       whole animation over one odd node. */
    const lengthOf = (s: SVGGeometryElement) => {
      try {
        const l = s.getTotalLength();
        if (l > 0) return l;
      } catch {
        /* fall through */
      }
      const b = s.getBBox();
      return Math.max(1, (b.width + b.height) * 2);
    };

    const arm = () => {
      shapes.forEach((s) => {
        const len = lengthOf(s);
        s.style.transition = "none";
        s.style.strokeDasharray = `${len}`;
        s.style.strokeDashoffset = `${len}`;
      });
    };

    let settleTimer: number | undefined;
    const run = () => {
      shapes.forEach((s, i) => {
        s.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms`;
        s.style.strokeDashoffset = "0";
      });
      /* Once every shape has finished, hand the stroke BACK to the
         stylesheet. The draw needs dasharray = pathLength inline, but
         leaving it there permanently overrides whatever dash pattern
         the CSS declares — a dashed route drew in and then sat there
         solid forever. Solid-stroked art sees no change (its CSS has
         no dasharray, so clearing is a no-op). `repeat` re-arms from
         scratch, so the cleanup does not fight it. */
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        shapes.forEach((s) => {
          s.style.transition = "";
          s.style.strokeDasharray = "";
          s.style.strokeDashoffset = "";
        });
      }, (shapes.length - 1) * stagger + duration + 60);
    };

    if (reduced) {
      // no arming, no transition — just leave the artwork drawn
      shapes.forEach((s) => {
        s.style.strokeDasharray = "";
        s.style.strokeDashoffset = "";
      });
      return;
    }

    arm();

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // next frame, so the armed state is painted before the transition
            requestAnimationFrame(run);
            if (!repeat) io.disconnect();
          } else if (repeat) {
            arm();
          }
        });
      },
      { threshold }
    );
    io.observe(root);

    /* Same failsafe as IzSignalGrid: the armed state is invisible
       artwork, so a missed observer would mean a blank panel rather
       than a missing flourish. */
    const failsafe = window.setTimeout(run, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      window.clearTimeout(settleTimer);
    };
  }, [stagger, duration, threshold, repeat]);

  return ref;
}
