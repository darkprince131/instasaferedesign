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
    /* `@container/frame` measures THE CONSOLE, not the window — these
       frames are dropped into columns of very different widths, so a
       viewport breakpoint would fire on the wrong thing. Everything
       below keys off `/frame`. */
    <div
      data-theme-scope="console"
      className="@container/frame w-full overflow-hidden rounded-2xl"
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

      {/* THE SIDEBAR IS A PROP OF THE MOCK, NOT OF THE ARGUMENT. It is
          188px of navigation nobody can click, and on a phone that is
          half the screen — the console content was left ~130px wide,
          which is what turned "Maya Rao / Sales · 1/2 bound" into four
          wrapped lines and made the whole panel unusable. Below 620px of
          FRAME width it goes; the window chrome and the topbar still say
          "this is a console", which is all it was doing. */}
      <div className="flex @[620px]/frame:min-h-[420px]">
        <div className="hidden @[620px]/frame:flex">
          <SidebarNav active={active} compact={compactSidebar} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* topbar */}
          <div
            className="flex items-center gap-3 px-3 py-3 @[620px]/frame:px-4"
            style={{ borderBottom: "1px solid var(--db-border)" }}
          >
            <h3 className="truncate text-sm font-semibold">{title}</h3>
            <div
              className="ml-auto hidden items-center gap-2 rounded-lg px-2.5 py-1.5 @[720px]/frame:flex"
              style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}
            >
              <MagnifyingGlass size={13} color="var(--db-text-mute)" />
              <span className="text-[10px]" style={{ color: "var(--db-text-mute)" }}>
                Search
              </span>
            </div>
            {/* the clock is the first thing to go: it is a live seconds
                counter competing for a row that has a title in it */}
            <span className="ml-auto hidden @[620px]/frame:inline @[720px]/frame:ml-0">
              <LiveClock />
            </span>
            <Bell size={16} color="var(--db-text-dim)" className="shrink-0" />
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
              style={{ background: "var(--db-accent)", color: "#fff" }}
            >
              IS
            </span>
          </div>

          <div className="min-w-0 flex-1 p-3 @[620px]/frame:p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
