"use client";

/* ============================================================
   Balanced `.iz` motion hooks — refined GSAP ScrollTrigger over
   the existing `.iz-reveal` CSS. Scoped to the homepage + lab.
   Registration pattern mirrors components/v2/PlatformStack.tsx.
   The CSS in home2.css (`.iz-reveal` + reduced-motion block)
   stays as the no-JS / reduced-motion fallback — these hooks
   just orchestrate a nicer staggered batch when JS + motion are
   available.
   ============================================================ */

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Reveal `.iz-reveal` elements in staggered batches as they enter
 * the viewport. Adds `reveal-on` (the existing CSS end-state) so
 * the transition matches the stylesheet. Under reduced motion, we
 * add the class instantly to everything and do nothing else.
 * Directional variants come from `.iz-reveal[data-dir]` in CSS.
 */
export function useSectionReveals() {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>(".iz-reveal");
    if (els.length === 0) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("reveal-on"));
      return;
    }

    const batch = ScrollTrigger.batch(".iz-reveal", {
      start: "top 88%",
      once: true,
      onEnter: (elements) =>
        gsap.to(elements, {
          onStart: () =>
            elements.forEach((el) => el.classList.add("reveal-on")),
          stagger: 0.08,
          overwrite: true,
        }),
    });

    // Elements already above the fold on load reveal immediately.
    ScrollTrigger.refresh();

    return () => {
      batch.forEach((st) => st.kill());
    };
  }, []);
}

/**
 * Subtle vertical parallax on a single element (hero console,
 * live-posture panel). `distance` is the total travel in px.
 * No-op under reduced motion.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance = 24
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, distance]);
}
