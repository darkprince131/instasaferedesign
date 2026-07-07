import { cn } from "@/lib/utils";

type Tone = "blue" | "green" | "purple" | "orange" | "neutral";

const tones: Record<Tone, string> = {
  blue: "bg-blue-500/10 text-[var(--accent-blue-light)] border-blue-500/20",
  green: "bg-green-500/10 text-[var(--accent-green)] border-green-500/20",
  purple: "bg-purple-500/10 text-[var(--accent-purple)] border-purple-500/20",
  orange: "bg-orange-500/10 text-[var(--accent-orange)] border-orange-500/20",
  neutral: "bg-[var(--surface-faint)] text-[var(--text-secondary)] border-[var(--hairline)]",
};

export function Badge({
  children,
  tone = "blue",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
