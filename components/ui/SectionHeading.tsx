import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue-light)]",
            align === "center" && "flex justify-center"
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
