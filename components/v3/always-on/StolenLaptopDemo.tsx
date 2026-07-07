"use client";

/**
 * StolenLaptopDemo — a sleek, theme-aware laptop that opens to a desktop OS.
 *
 * The point: even with the machine unlocked in a thief's hands, every app, site
 * and network still sits behind continuous Zero Trust checks. Double-click to try:
 *   • InstaSafe  → agent already running (informational, not an error)
 *   • Codebase   → access denied (source code, out of scope)
 *   • Database   → access denied (out of scope)
 *   • Chrome     → opens; only *instasafe* URLs are granted, everything else denied
 *
 * Windows are draggable (title-bar handle) and constrained to the desktop.
 * Fully theme-aware via the project's --db-* / --text / --bg tokens.
 */

import { AnimatePresence, motion, useDragControls, useReducedMotion } from "framer-motion";
import { useRef, useState, type RefObject } from "react";
import {
  ArrowClockwise,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Code,
  CursorClick,
  Database,
  GlobeSimple,
  Info,
  LockSimple,
  MagnifyingGlass,
  PaperPlaneTilt,
  ShieldCheck,
  X,
  type Icon,
} from "@phosphor-icons/react";

type AppId = "instasafe" | "codebase" | "database" | "chrome";
type PhicIcon = Icon;

const APPS: { id: AppId; name: string; sub: string; Icon: PhicIcon; tint: string }[] = [
  { id: "instasafe", name: "InstaSafe", sub: "Zero Trust Agent", Icon: ShieldCheck, tint: "var(--db-accent)" },
  { id: "codebase", name: "Codebase", sub: "Source · Git", Icon: Code, tint: "#ef4444" },
  { id: "database", name: "Production DB", sub: "PostgreSQL", Icon: Database, tint: "var(--db-accent-2)" },
  { id: "chrome", name: "Chrome", sub: "Browser", Icon: GlobeSimple, tint: "#22c55e" },
];

/* ---------------- desktop icon (double-click / Enter to open) ------------- */
function DesktopIcon({
  app,
  selected,
  hint,
  onSelect,
  onOpen,
}: {
  app: (typeof APPS)[number];
  selected: boolean;
  hint?: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  const last = useRef(0);
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      onClick={() => {
        const n = Date.now();
        if (n - last.current < 400) onOpen();
        else onSelect();
        last.current = n;
      }}
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`${app.name} — ${app.sub}. Double-click or press Enter to open.`}
      className="group relative flex w-20 cursor-pointer flex-col items-center gap-1.5 rounded-lg p-2 outline-none transition-colors focus-visible:ring-2 sm:w-24"
      style={{ background: selected ? "color-mix(in srgb, var(--db-accent) 22%, transparent)" : "transparent" }}
    >
      <span
        className="relative flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm transition-transform group-hover:-translate-y-0.5 sm:h-14 sm:w-14"
        style={{ background: "var(--db-surface)", borderColor: "var(--db-border)" }}
      >
        {hint && !reduce && (
          <motion.span
            className="absolute inset-0 rounded-xl"
            style={{ border: "2px solid var(--db-accent)" }}
            animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.18, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
        <app.Icon size={26} weight="duotone" style={{ color: app.tint }} />
      </span>
      <span
        className="max-w-full truncate rounded px-1 text-[11px] font-medium"
        style={{ color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,.55)" }}
      >
        {app.name}
      </span>
      {/* hover/focus tooltip */}
      <span
        className="pointer-events-none absolute left-full top-3 z-10 ml-1 hidden whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
        style={{ background: "var(--db-text)", color: "var(--db-bg)" }}
      >
        Double-click to open
      </span>
    </button>
  );
}

/* ---------------- window frame (draggable, scrollable, height-capped) ----- */
function WindowFrame({
  title,
  Icon,
  tint,
  z,
  index,
  wide,
  dragRef,
  onClose,
  onFocus,
  children,
}: {
  title: string;
  Icon: PhicIcon;
  tint: string;
  z: number;
  index: number;
  wide?: boolean;
  dragRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const controls = useDragControls();
  return (
    <motion.div
      role="dialog"
      aria-label={title}
      drag
      dragControls={controls}
      dragListener={false}
      dragConstraints={dragRef}
      dragMomentum={false}
      dragElastic={0.05}
      onMouseDown={onFocus}
      initial={reduce ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className="absolute flex max-h-[88%] flex-col overflow-hidden rounded-xl border shadow-2xl"
      style={{
        zIndex: z,
        width: wide ? "min(90%, 520px)" : "min(82%, 340px)",
        left: `${4 + index * 4}%`,
        top: `${5 + index * 5}%`,
        background: "var(--db-surface)",
        borderColor: "var(--db-border)",
        color: "var(--db-text)",
      }}
    >
      {/* title bar = drag handle */}
      <div
        onPointerDown={(e) => {
          onFocus();
          controls.start(e);
        }}
        className="flex flex-none cursor-grab select-none items-center gap-2 border-b px-3 py-2 active:cursor-grabbing"
        style={{ borderColor: "var(--db-border)", background: "var(--db-surface-2)", touchAction: "none" }}
      >
        <Icon size={15} weight="fill" style={{ color: tint }} />
        <span className="text-[12px] font-semibold">{title}</span>
        <button
          type="button"
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={`Close ${title}`}
          className="ml-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-[var(--db-border)]"
        >
          <X size={13} weight="bold" style={{ color: "var(--db-text-dim)" }} />
        </button>
      </div>
      {/* scrollable body */}
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}

/* ---------------- denied / info bodies ---------------- */
function DeniedBody({ name, scope }: { name: string; scope: string }) {
  const [requested, setRequested] = useState(false);
  return (
    <div className="p-5 text-center">
      <div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: "color-mix(in srgb, var(--db-danger) 16%, transparent)" }}
      >
        <LockSimple size={24} weight="fill" style={{ color: "var(--db-danger)" }} />
      </div>
      <h4 className="mt-3 text-[15px] font-bold" style={{ color: "var(--db-text)" }}>
        Access denied
      </h4>
      <p className="mx-auto mt-1.5 max-w-[42ch] text-[12px] leading-relaxed" style={{ color: "var(--db-text-dim)" }}>
        <strong style={{ color: "var(--db-text)" }}>{name}</strong> is outside your access scope. Zero Trust
        blocks {scope} on this device — even though the laptop is unlocked and signed in.
      </p>
      {requested ? (
        <span
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold"
          style={{ background: "color-mix(in srgb, var(--db-success) 14%, transparent)", color: "var(--db-success)" }}
        >
          <CheckCircle size={14} weight="fill" /> Request sent to your admin
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setRequested(true)}
          className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-semibold transition-transform hover:scale-[1.03]"
          style={{ background: "var(--db-accent)", color: "#fff" }}
        >
          <PaperPlaneTilt size={14} weight="fill" /> Request access
        </button>
      )}
    </div>
  );
}

function InstaSafeBody() {
  const rows = [
    "Connected to InstaSafe gateway",
    "Device posture trusted",
    "Continuous verification active",
    "Policies enforced · last check just now",
  ];
  return (
    <div className="p-5">
      <div
        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
        style={{ background: "color-mix(in srgb, var(--db-accent) 12%, transparent)", color: "var(--db-accent)" }}
      >
        <Info size={18} weight="fill" />
        <div className="text-[12px] font-semibold">Agent already running — you&apos;re protected</div>
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r} className="flex items-center gap-2 text-[12px]" style={{ color: "var(--db-text-dim)" }}>
            <CheckCircle size={15} weight="fill" style={{ color: "var(--db-success)" }} />
            {r}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed" style={{ color: "var(--db-text-mute)" }}>
        The InstaSafe agent runs quietly in the background, re-checking identity, device and policy on every
        request. Nothing to do — this is informational.
      </p>
    </div>
  );
}

/* ---------------- chrome (browser) ---------------- */
function HomepageSnapshot() {
  return (
    <div className="text-[11px]" style={{ background: "var(--db-bg)", color: "var(--db-text)" }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--db-border)" }}>
        <span className="flex items-center gap-1.5 font-bold">
          <ShieldCheck size={14} weight="fill" style={{ color: "var(--db-accent)" }} /> InstaSafe
        </span>
        <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: "var(--db-text)", color: "var(--db-bg)" }}>
          Book a demo
        </span>
      </div>
      <div className="px-4 py-6 text-center">
        <div className="text-[15px] font-extrabold leading-tight">Zero Trust Access, in one console.</div>
        <p className="mx-auto mt-2 max-w-[36ch]" style={{ color: "var(--db-text-dim)" }}>
          Replace the VPN, verify every request, and keep what&apos;s beyond a user&apos;s rights out of reach.
        </p>
        <div className="mt-3 flex justify-center gap-2">
          <span className="rounded-md px-3 py-1.5 font-semibold" style={{ background: "var(--db-accent)", color: "#fff" }}>Get started</span>
          <span className="rounded-md px-3 py-1.5 font-semibold" style={{ border: "1px solid var(--db-border)" }}>See platform</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 pb-5">
        {["ZTNA", "MFA + SSO", "Always-On"].map((f) => (
          <div key={f} className="rounded-lg px-2 py-3 text-center font-semibold" style={{ background: "var(--db-surface-2)" }}>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChromeBody({ announce }: { announce: (m: string) => void }) {
  const [url, setUrl] = useState("");
  const [view, setView] = useState<"new" | "granted" | "denied">("new");
  const [shown, setShown] = useState("");

  const go = (raw?: string) => {
    const q = (raw ?? url).trim();
    if (!q) return;
    setUrl(q);
    setShown(q);
    const granted = q.toLowerCase().includes("instasafe");
    setView(granted ? "granted" : "denied");
    announce(granted ? `Access granted for ${q}` : `Access denied for ${q}`);
  };

  return (
    <div style={{ background: "var(--db-bg)" }}>
      {/* browser toolbar */}
      <div className="flex items-center gap-1.5 px-2.5 py-2" style={{ borderBottom: "1px solid var(--db-border)" }}>
        <ArrowLeft size={14} style={{ color: "var(--db-text-mute)" }} />
        <ArrowRight size={14} style={{ color: "var(--db-text-mute)" }} />
        <ArrowClockwise size={13} style={{ color: "var(--db-text-mute)" }} />
        <form
          className="flex flex-1 items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{ background: "var(--db-surface-2)", border: "1px solid var(--db-border)" }}
          onSubmit={(e) => {
            e.preventDefault();
            go();
          }}
        >
          <LockSimple size={12} weight="fill" style={{ color: view === "granted" ? "var(--db-success)" : "var(--db-text-mute)" }} />
          <label htmlFor="addr" className="sr-only">
            Address bar — type a URL and press Enter
          </label>
          <input
            id="addr"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Type a URL, e.g. instasafe.com"
            inputMode="url"
            className="w-full bg-transparent text-[12px] outline-none"
            style={{ color: "var(--db-text)" }}
          />
          <button type="submit" aria-label="Go" className="cursor-pointer">
            <MagnifyingGlass size={13} weight="bold" style={{ color: "var(--db-text-dim)" }} />
          </button>
        </form>
      </div>

      {/* status strip */}
      <AnimatePresence mode="wait">
        {view !== "new" && (
          <motion.div
            key={view + shown}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold"
            style={
              view === "granted"
                ? { background: "color-mix(in srgb, var(--db-success) 16%, transparent)", color: "var(--db-success)" }
                : { background: "color-mix(in srgb, var(--db-danger) 16%, transparent)", color: "var(--db-danger)" }
            }
          >
            {view === "granted" ? <CheckCircle size={13} weight="fill" /> : <LockSimple size={13} weight="fill" />}
            {view === "granted" ? "Access granted · verified by InstaSafe" : "Access denied · outside policy"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* viewport */}
      <div className="min-h-[150px]">
        {view === "new" && (
          <div className="flex h-[180px] flex-col items-center justify-center gap-3 px-4 text-center">
            <GlobeSimple size={30} weight="duotone" style={{ color: "var(--db-text-mute)" }} />
            <p className="text-[12px]" style={{ color: "var(--db-text-dim)" }}>
              Secure browser. Try a URL — only what&apos;s in your policy resolves.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["instasafe.com", "blog.instasafe.com/mfa", "github.com"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => go(s)}
                  className="cursor-pointer rounded-full px-3 py-1 text-[11px] font-medium transition-colors hover:border-[var(--db-accent)]"
                  style={{ border: "1px solid var(--db-border)", color: "var(--db-text-dim)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {view === "granted" && <HomepageSnapshot />}
        {view === "denied" && (
          <div className="flex h-[180px] flex-col items-center justify-center gap-2 px-5 text-center">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: "color-mix(in srgb, var(--db-danger) 16%, transparent)" }}
            >
              <LockSimple size={22} weight="fill" style={{ color: "var(--db-danger)" }} />
            </div>
            <div className="text-[13px] font-bold" style={{ color: "var(--db-text)" }}>
              Access denied
            </div>
            <p className="max-w-[40ch] text-[11px] leading-relaxed" style={{ color: "var(--db-text-dim)" }}>
              <span className="font-mono" style={{ color: "var(--db-text)" }}>{shown}</span> isn&apos;t in your Zero
              Trust policy, so it never loads. Request access if you need it.
            </p>
            <RequestChip />
          </div>
        )}
      </div>
    </div>
  );
}

function RequestChip() {
  const [sent, setSent] = useState(false);
  return sent ? (
    <span
      className="mt-1 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold"
      style={{ background: "color-mix(in srgb, var(--db-success) 14%, transparent)", color: "var(--db-success)" }}
    >
      <CheckCircle size={13} weight="fill" /> Request sent
    </span>
  ) : (
    <button
      type="button"
      onClick={() => setSent(true)}
      className="mt-1 inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[11px] font-semibold transition-transform hover:scale-[1.03]"
      style={{ background: "var(--db-accent)", color: "#fff" }}
    >
      <PaperPlaneTilt size={13} weight="fill" /> Request access
    </button>
  );
}

/* ===================== main ===================== */
export function StolenLaptopDemo() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<AppId | null>(null);
  const [wins, setWins] = useState<{ id: AppId; z: number }[]>([]);
  const nextZ = useRef(20);
  const [live, setLive] = useState("");
  const [interacted, setInteracted] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  const open = (id: AppId) => {
    setInteracted(true);
    setWins((w) => {
      const z = ++nextZ.current;
      if (w.find((x) => x.id === id)) return w.map((x) => (x.id === id ? { ...x, z } : x));
      const labels: Record<AppId, string> = {
        instasafe: "InstaSafe agent is already running",
        codebase: "Codebase — access denied",
        database: "Production DB — access denied",
        chrome: "Chrome opened",
      };
      setLive(labels[id]);
      return [...w, { id, z }];
    });
  };
  const focus = (id: AppId) =>
    setWins((w) => w.map((x) => (x.id === id ? { ...x, z: ++nextZ.current } : x)));
  const close = (id: AppId) => setWins((w) => w.filter((x) => x.id !== id));

  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: "min(920px, 100%)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelected(null);
      }}
    >
      <p className="sr-only" aria-live="polite">
        {live}
      </p>

      {/* perspective wrapper for the lid opening */}
      <div style={{ perspective: 1700 }}>
        <motion.div
          className="origin-bottom"
          style={{ transformStyle: "preserve-3d" }}
          initial={reduce ? { rotateX: 0 } : { rotateX: -82 }}
          whileInView={{ rotateX: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* screen / bezel */}
          <div
            className="relative rounded-[18px] border p-2.5 sm:p-3"
            style={{
              background: "linear-gradient(160deg,#1a2030,#0c111c)",
              borderColor: "#2a3346",
              boxShadow: "var(--db-shadow)",
            }}
          >
            <span className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-600" />
            <div
              className="relative overflow-hidden rounded-[10px]"
              style={{ aspectRatio: "16 / 10", background: "var(--db-bg)" }}
            >
              {/* ---------- DESKTOP ---------- */}
              <div
                ref={desktopRef}
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--db-accent) 28%, var(--db-bg)), var(--db-bg) 60%)",
                }}
                onClick={() => setSelected(null)}
              >
                {/* menu bar */}
                <div
                  className="flex items-center gap-2 px-3 py-1.5 text-[10px] backdrop-blur"
                  style={{ background: "color-mix(in srgb, var(--db-surface) 70%, transparent)", color: "var(--db-text-dim)" }}
                >
                  <ShieldCheck size={12} weight="fill" style={{ color: "var(--db-success)" }} />
                  <span className="font-semibold" style={{ color: "var(--db-text)" }}>Protected by InstaSafe</span>
                  <span className="hidden sm:inline">· device: WORKSTATION-07</span>
                  <span className="ml-auto">Zero Trust · ON</span>
                </div>

                {/* icons */}
                <div className="flex flex-col items-start gap-1 p-3">
                  {APPS.map((a) => (
                    <DesktopIcon
                      key={a.id}
                      app={a}
                      selected={selected === a.id}
                      hint={!interacted && a.id === "instasafe"}
                      onSelect={() => setSelected(a.id)}
                      onOpen={() => open(a.id)}
                    />
                  ))}
                </div>

                {/* double-click callout pointing at the icons */}
                <AnimatePresence>
                  {!interacted && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute left-24 top-9 z-[5] flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold shadow-lg sm:left-28"
                      style={{ background: "var(--db-accent)", color: "#fff" }}
                    >
                      <CursorClick size={14} weight="fill" />
                      <span>Double-click to open</span>
                      <motion.span
                        aria-hidden
                        className="absolute right-full top-1/2 -translate-y-1/2"
                        animate={reduce ? {} : { x: [0, -3, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{
                          width: 0,
                          height: 0,
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent",
                          borderRight: "6px solid var(--db-accent)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* bottom hint */}
                {!interacted && (
                  <div
                    className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-center text-[11px] font-medium backdrop-blur"
                    style={{ background: "color-mix(in srgb, var(--db-surface) 78%, transparent)", color: "var(--db-text-dim)" }}
                  >
                    Double-click an app — see what a stolen laptop still can&apos;t reach
                  </div>
                )}
                {interacted && wins.length > 0 && (
                  <div
                    className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-medium backdrop-blur"
                    style={{ background: "color-mix(in srgb, var(--db-surface) 70%, transparent)", color: "var(--db-text-mute)" }}
                  >
                    Drag a window by its title bar · close with ✕
                  </div>
                )}

                {/* windows */}
                <AnimatePresence>
                  {wins.map((w, i) => {
                    const app = APPS.find((a) => a.id === w.id)!;
                    return (
                      <WindowFrame
                        key={w.id}
                        title={
                          w.id === "instasafe"
                            ? "InstaSafe Agent"
                            : w.id === "chrome"
                              ? "Chrome"
                              : app.name
                        }
                        Icon={app.Icon}
                        tint={app.tint}
                        z={w.z}
                        index={i}
                        wide={w.id === "chrome"}
                        dragRef={desktopRef}
                        onClose={() => close(w.id)}
                        onFocus={() => focus(w.id)}
                      >
                        {w.id === "instasafe" && <InstaSafeBody />}
                        {w.id === "codebase" && <DeniedBody name="Codebase" scope="this source repository" />}
                        {w.id === "database" && <DeniedBody name="Production DB" scope="this database" />}
                        {w.id === "chrome" && <ChromeBody announce={setLive} />}
                      </WindowFrame>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* hinge + base (sleek) */}
          <div className="mx-auto h-2 w-[101%] rounded-b-[4px]" style={{ background: "linear-gradient(#2a3346,#171d2b)" }} />
          <div
            className="mx-auto h-3.5 rounded-b-2xl"
            style={{ width: "108%", marginLeft: "-4%", background: "linear-gradient(180deg,#39435a,#1c2333)" }}
          />
          {/* trackpad lip */}
          <div className="mx-auto h-1 w-1/5 rounded-b-md" style={{ background: "#10162a" }} />
        </motion.div>
      </div>
    </div>
  );
}
