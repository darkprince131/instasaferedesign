"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowSquareOut, ChatCircleDots, CheckCircle, CircleNotch, Cloud, EnvelopeSimple, Folder, GitBranch, LockKey, Notebook, ShieldCheck, SquaresFour, VideoCamera, type Icon } from "@phosphor-icons/react";

type App = { id: string; name: string; Icon: Icon; color: string };
const APPS: App[] = [
  { id: "slack", name: "Slack", Icon: ChatCircleDots, color: "#e01e5a" },
  { id: "sf", name: "Salesforce", Icon: Cloud, color: "#00a1e0" },
  { id: "zoom", name: "Zoom", Icon: VideoCamera, color: "#2d8cff" },
  { id: "github", name: "GitHub", Icon: GitBranch, color: "#8b949e" },
  { id: "notion", name: "Notion", Icon: Notebook, color: "#c1b8a8" },
  { id: "gmail", name: "Gmail", Icon: EnvelopeSimple, color: "#ea4335" },
  { id: "drive", name: "Drive", Icon: Folder, color: "#34a853" },
  { id: "jira", name: "Jira", Icon: SquaresFour, color: "#2684ff" },
];

export function SsoSolution() {
  const reduce = useReducedMotion();
  const [signedIn, setSignedIn] = useState(false);
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [opening, setOpening] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const open = (id: string) => {
    if (!signedIn || opened[id] || opening) return;
    setOpening(id);
    timers.current.push(
      setTimeout(() => {
        setOpened((o) => ({ ...o, [id]: true }));
        setOpening(null);
      }, reduce ? 150 : 650)
    );
  };
  const count = Object.keys(opened).length;

  return (
    <section id="solution" className="section relative mx-auto max-w-5xl px-5 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-green)]">The fix</div>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Sign in once. <span className="grad-text">Everything opens.</span>
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-[var(--text-secondary)]">
          One login to the InstaSafe console. From there every app launches directly — no second password, no reset, ever.
        </p>
      </div>

      {/* console window */}
      <div className="mx-auto mt-12 overflow-hidden rounded-2xl border" style={{ background: "var(--db-bg)", borderColor: "var(--db-border)", boxShadow: "var(--db-shadow)" }}>
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: "var(--db-sidebar)", borderBottom: "1px solid var(--db-border)" }}>
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
          <span className="ml-2 font-mono text-[10px]" style={{ color: "var(--db-text-mute)" }}>app.instasafe.com</span>
          {signedIn && (
            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: "var(--db-success)" }}>
              <ShieldCheck size={13} weight="fill" /> 1 login · {count} app{count === 1 ? "" : "s"} opened
            </span>
          )}
        </div>

        <div className="relative min-h-[330px] p-6">
          <AnimatePresence mode="wait">
            {!signedIn ? (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="mx-auto flex max-w-xs flex-col items-center justify-center py-8 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "color-mix(in srgb, var(--db-accent) 16%, transparent)" }}>
                  <LockKey size={24} weight="duotone" style={{ color: "var(--db-accent)" }} />
                </span>
                <h3 className="mt-4 font-bold" style={{ color: "var(--db-text)" }}>Sign in to InstaSafe</h3>
                <div className="mt-4 w-full space-y-2 text-left">
                  <div className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--db-border)", background: "var(--db-surface-2)", color: "var(--db-text-dim)" }}>you@company.com</div>
                  <div className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--db-border)", background: "var(--db-surface-2)", color: "var(--db-text-mute)" }}>••••••••••</div>
                </div>
                <button type="button" onClick={() => setSignedIn(true)} className="mt-4 w-full cursor-pointer rounded-lg py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]" style={{ background: "var(--db-accent)" }}>
                  Sign in — once
                </button>
                <p className="mt-3 text-[11px]" style={{ color: "var(--db-text-mute)" }}>This is the only password you&apos;ll type.</p>
              </motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: "var(--db-text)" }}>Your apps</span>
                  <button type="button" onClick={() => { setSignedIn(false); setOpened({}); }} className="cursor-pointer text-xs font-semibold" style={{ color: "var(--db-text-mute)" }}>Sign out</button>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {APPS.map((a, i) => {
                    const isOpen = opened[a.id];
                    const isLoading = opening === a.id;
                    return (
                      <motion.button
                        key={a.id}
                        type="button"
                        onClick={() => open(a.id)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        aria-label={isOpen ? `${a.name} opened` : `Open ${a.name}`}
                        className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border p-2 transition-colors hover:border-[var(--db-accent)]"
                        style={{ background: "var(--db-surface)", borderColor: isOpen ? "var(--db-success)" : "var(--db-border)" }}
                      >
                        <a.Icon size={26} weight="duotone" style={{ color: a.color }} />
                        <span className="text-[10px] font-semibold" style={{ color: "var(--db-text-dim)" }}>{a.name}</span>
                        <span className="absolute right-1.5 top-1.5">
                          {isLoading ? (
                            <CircleNotch size={14} weight="bold" className="animate-spin" style={{ color: "var(--db-accent)" }} />
                          ) : isOpen ? (
                            <CheckCircle size={14} weight="fill" style={{ color: "var(--db-success)" }} />
                          ) : (
                            <ArrowSquareOut size={13} style={{ color: "var(--db-text-mute)" }} />
                          )}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
                <p className="mt-4 text-center text-[11px]" style={{ color: "var(--db-text-mute)" }}>
                  Click any app — it opens straight away. No second password. That&apos;s SSO.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
