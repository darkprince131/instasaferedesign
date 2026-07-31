"use client";

import { useEffect, useState, type RefObject } from "react";

/* ============================================================
   useHoverIndex — which child of a container is under the pointer

   Why this exists rather than React's onPointerEnter/onPointerLeave:
   `pointerenter`/`pointerleave` DO NOT BUBBLE. React synthesises
   them from `pointerover`/`pointerout` at the root, and the pair is
   easy to lose — a missed `leave` strands an element permanently
   "hovered", which on these sections means an animation looping
   forever on a card the cursor left. This has bitten three
   components in this codebase now.

   So: one delegated listener per container, on the events that
   really do bubble, with the standard `relatedTarget` guard so
   moving between a cell's own children isn't read as leaving it.

   Returns -1 when nothing is hovered, and stays -1 for the whole
   session on touch devices, where the caller should render a static
   composition instead of waiting for a hover that will never come.
   ============================================================ */

export function useHoverIndex(ref: RefObject<HTMLElement | null>, selector: string) {
  const [index, setIndex] = useState(-1);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hoverable = window.matchMedia?.("(hover: hover)").matches ?? false;
    setCanHover(hoverable);
    if (!hoverable) return;

    const items = () => [...el.querySelectorAll<HTMLElement>(selector)];

    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const hit = (e.target as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (!hit) return;
      const i = items().indexOf(hit);
      if (i >= 0) setIndex(i);
    };

    const onOut = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const from = (e.target as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (!from) return;
      // moving between a cell's own children is not leaving that cell
      const to = (e.relatedTarget as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (to === from) return;
      const i = items().indexOf(from);
      setIndex((cur) => (cur === i ? -1 : cur));
    };

    /* Keyboard parity: focus lights the same element hover does, so
       the animations are reachable without a pointer at all. */
    const onFocusIn = (e: FocusEvent) => {
      const hit = (e.target as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (!hit) return;
      const i = items().indexOf(hit);
      if (i >= 0) setIndex(i);
    };
    const onFocusOut = (e: FocusEvent) => {
      const from = (e.target as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (!from) return;
      const to = (e.relatedTarget as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (to === from) return;
      const i = items().indexOf(from);
      setIndex((cur) => (cur === i ? -1 : cur));
    };

    const reset = () => setIndex(-1);

    el.addEventListener("pointerover", onOver);
    el.addEventListener("pointerout", onOut);
    el.addEventListener("pointercancel", reset);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      el.removeEventListener("pointerover", onOver);
      el.removeEventListener("pointerout", onOut);
      el.removeEventListener("pointercancel", reset);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [ref, selector]);

  return { index, canHover };
}
