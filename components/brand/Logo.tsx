"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type ThemeVariant = "dark" | "light";

/**
 * Reads the nearest ancestor `[data-theme]` (works for both the System A
 * `html[data-theme=dark|light]` toggle and the `.iz[data-theme=dark|paper]`
 * Balanced-system scope) and keeps it in sync as the user switches themes.
 */
function useNearestTheme(ref: React.RefObject<HTMLElement | null>): ThemeVariant {
  const [variant, setVariant] = useState<ThemeVariant>("dark");

  useEffect(() => {
    const compute = () => {
      const themed = ref.current?.closest("[data-theme]");
      const val = themed?.getAttribute("data-theme");
      setVariant(val === "paper" || val === "light" ? "light" : "dark");
    };
    compute();
    const mo = new MutationObserver(compute);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
      subtree: true,
    });
    return () => mo.disconnect();
  }, [ref]);

  return variant;
}

const MARK_SRC: Record<ThemeVariant, string> = {
  dark: "/brand/instasafe-mark-white.svg",
  light: "/brand/instasafe-mark-color.svg",
};

const LOCKUP_SRC: Record<ThemeVariant, string> = {
  dark: "/brand/instasafe-lockup-white.svg",
  light: "/brand/instasafe-lockup-color.svg",
};

/** Square icon mark — console sidebars, compact chips, favicons-in-UI. */
export function LogoMark({
  size = 32,
  className,
  forceTheme,
}: {
  size?: number;
  className?: string;
  forceTheme?: ThemeVariant;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const detected = useNearestTheme(ref);
  const variant = forceTheme ?? detected;

  return (
    <span ref={ref} className={cn("inline-flex shrink-0", className)} style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MARK_SRC[variant]} alt="InstaSafe" width={size} height={size} className="h-full w-full object-contain" />
    </span>
  );
}

/** Full horizontal lockup (mark + wordmark + tagline) — nav, footer, doc headers. */
export function Logo({
  height = 30,
  className,
  forceTheme,
}: {
  height?: number;
  className?: string;
  forceTheme?: ThemeVariant;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const detected = useNearestTheme(ref);
  const variant = forceTheme ?? detected;

  return (
    <span ref={ref} className={cn("inline-flex shrink-0 items-center", className)} style={{ height }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOCKUP_SRC[variant]}
        alt="InstaSafe"
        className="w-auto object-contain"
        style={{ height }}
      />
    </span>
  );
}
