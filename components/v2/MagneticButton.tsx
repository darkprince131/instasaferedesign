"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "@phosphor-icons/react";
import { Magnetic } from "./Magnetic";

export function MagneticButton({
  children,
  variant = "primary",
  arrow = false,
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Magnetic strength={0.5}>
      <button
        data-cursor
        className={cn(
          "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors",
          variant === "primary"
            ? "bg-white text-[var(--bg-base)]"
            : "border border-white/15 text-white hover:border-white/40",
          className
        )}
      >
        {variant === "primary" && (
          <span className="shimmer absolute inset-0" aria-hidden />
        )}
        <span className="relative z-10">{children}</span>
        {arrow && (
          <ArrowRight
            weight="bold"
            className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </button>
    </Magnetic>
  );
}
