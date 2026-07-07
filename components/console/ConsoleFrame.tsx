"use client";

import { motion } from "framer-motion";
import { Bell, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { SidebarNav } from "./SidebarNav";

function LiveClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const fmt = () =>
      setT(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-[10px] tabular-nums" style={{ color: "var(--db-text-dim)" }}>{t}</span>;
}

export function ConsoleFrame({
  children,
  title = "Dashboard",
  active = 0,
  compactSidebar = false,
}: {
  children: React.ReactNode;
  title?: string;
  active?: number;
  compactSidebar?: boolean;
}) {
  return (
    <div
      data-theme-scope="console"
      className="w-full overflow-hidden rounded-2xl"
      style={{
        background: "var(--db-bg)",
        border: "1px solid var(--db-border)",
        boxShadow: "var(--db-shadow)",
        color: "var(--db-text)",
      }}
    >
      {/* window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--db-border)", background: "var(--db-sidebar)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-[10px]" style={{ color: "var(--db-text-mute)" }}>
          InstaSafe console / {title.toLowerCase()}
        </span>
      </div>

      <div className="flex" style={{ minHeight: 420 }}>
        <SidebarNav active={active} compact={compactSidebar} />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* topbar */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ borderBottom: "1px solid var(--db-border)" }}
          >
            <h3 className="text-sm font-semibold">{title}</h3>
            <div
              className="ml-auto hidden items-center gap-2 rounded-lg px-2.5 py-1.5 sm:flex"
              style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}
            >
              <MagnifyingGlass size={13} color="var(--db-text-mute)" />
              <span className="text-[10px]" style={{ color: "var(--db-text-mute)" }}>
                Search
              </span>
            </div>
            <LiveClock />
            <Bell size={16} color="var(--db-text-dim)" />
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
              style={{ background: "var(--db-accent)", color: "#fff" }}
            >
              IS
            </span>
          </div>

          <div className="min-w-0 flex-1 p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
