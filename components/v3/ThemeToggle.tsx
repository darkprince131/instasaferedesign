"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as "dark" | "light") || "dark";
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-card)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
    >
      {theme === "dark" ? (
        <Sun size={18} weight="duotone" />
      ) : (
        <Moon size={18} weight="duotone" />
      )}
    </button>
  );
}
