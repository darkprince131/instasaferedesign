"use client";

/**
 * DeviceBindingDemo — admin console (approve) + the user's real devices (connect).
 *
 * Left/top: the i365 admin console. An admin picks a user and approves/revokes
 * each bound device with a toggle — no connecting from here.
 * Below: that user's actual devices as little client mockups. Each has its own
 * Connect button: an approved device opens a secure tunnel; an unapproved one is
 * refused — "This device is not authorized for this user."
 *
 * Reuses ConsoleFrame (window chrome + i365 SidebarNav). Theme-aware via --db-*.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, CheckCircle, Desktop, DeviceMobile, DeviceMobileCamera, DeviceTablet, Laptop, PlugsConnected, ShieldCheck, Watch, XCircle, type Icon } from "@phosphor-icons/react";
import { ConsoleFrame } from "./ConsoleFrame";

/* The "now go and connect it" hint is dismissible FOR GOOD, because the
   people it annoys are exactly the people who least need it: anyone
   flipping toggles to see what happens gets it on every flip. localStorage,
   so the choice survives the page. */
const HINT_KEY = "iz-binding-hint-off";

type DType = "laptop" | "phone" | "tablet" | "desktop" | "watch" | "rugged";
type Device = { id: string; name: string; type: DType; os: string; bind: string; approved: boolean };
type User = { id: string; name: string; role: string; devices: Device[] };

const TYPE: Record<DType, Icon> = { laptop: Laptop, phone: DeviceMobile, tablet: DeviceTablet, desktop: Desktop, watch: Watch, rugged: DeviceMobileCamera };
const FRAME: Record<DType, { w: number; screen: string }> = {
  laptop: { w: 188, screen: "16 / 10" },
  phone: { w: 92, screen: "9 / 18" },
  tablet: { w: 126, screen: "3 / 4" },
  desktop: { w: 176, screen: "16 / 10" },
  watch: { w: 70, screen: "1 / 1" },
  rugged: { w: 98, screen: "9 / 17" },
};

const USERS: User[] = [
  {
    id: "maya", name: "Maya Rao", role: "Sales",
    devices: [
      { id: "d1", name: "MacBook Pro 16", type: "laptop", os: "macOS 14", bind: "MAC ··:··:4F:2A · SN ····3081", approved: true },
      { id: "d2", name: "Pixel 8 — field", type: "phone", os: "Android 15", bind: "IMEI ······· 7740", approved: false },
    ],
  },
  {
    id: "devon", name: "Devon Kim", role: "DevOps",
    devices: [
      { id: "d3", name: "Workstation-07", type: "desktop", os: "Ubuntu 24.04", bind: "UUID 9c1e-··-a6", approved: true },
      { id: "d4", name: "Dev ThinkPad X1", type: "laptop", os: "Windows 11", bind: "MAC ··:··:1B:E0", approved: true },
      { id: "d5", name: "iPad Air M2", type: "tablet", os: "iPadOS 18", bind: "SN ····7A39", approved: false },
    ],
  },
  {
    id: "sana", name: "Sana Mehta", role: "Finance",
    devices: [
      { id: "d6", name: "iPhone 15", type: "phone", os: "iOS 18", bind: "IMEI ······· 2210", approved: true },
      { id: "d7", name: "Surface Pro 9", type: "tablet", os: "Windows 11", bind: "MAC ··:··:9D:14", approved: false },
    ],
  },
  {
    id: "eli", name: "Eli Wong", role: "Support",
    devices: [
      { id: "d8", name: "Reception Kiosk-2", type: "desktop", os: "Win IoT", bind: "UUID 22af-··-c7", approved: true },
      { id: "d9", name: "Galaxy Watch 6", type: "watch", os: "Wear OS", bind: "SN ····0Q88", approved: true },
      { id: "d10", name: "Support Chromebook", type: "laptop", os: "ChromeOS", bind: "SN ····4471", approved: false },
    ],
  },
  {
    id: "noor", name: "Noor Ali", role: "Field Ops",
    devices: [
      { id: "d11", name: "Rugged Handheld R5", type: "rugged", os: "Android 13", bind: "IMEI ······· 9903", approved: false },
      { id: "d12", name: "Field Tablet T9", type: "tablet", os: "Android 14", bind: "SN ····6620", approved: true },
    ],
  },
];

function Switch({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onClick} className="relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors" style={{ background: on ? "var(--db-success)" : "var(--db-border)" }}>
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow" style={{ left: on ? 18 : 2 }} />
    </button>
  );
}

/* ---------------- admin console (approve only) ---------------- */
function AdminConsole({ sel, onSel, approved, onToggle }: { sel: string; onSel: (id: string) => void; approved: Record<string, boolean>; onToggle: (id: string) => void }) {
  const user = USERS.find((u) => u.id === sel)!;
  return (
    <ConsoleFrame title="Device Binding" active={6}>
      {/* split on the CONSOLE's width, not the window's. `lg:` fired whenever the
          browser was ≥1024px even when this console sat in a 450px column, which
          left the devices card ~200px wide — every device name truncated to five
          characters and the toggle pushed out of the card. */}
      <div className="@container/db">
      <div className="grid gap-3 @[520px]/db:grid-cols-[210px_1fr]">
        {/* users */}
        <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--db-border)", background: "var(--db-surface)" }}>
          <div className="border-b px-3 py-2 font-mono text-[10px] uppercase tracking-wider" style={{ borderColor: "var(--db-border)", color: "var(--db-text-mute)" }}>Users · {USERS.length}</div>
          <div className="p-1.5">
            {USERS.map((u) => {
              const on = u.id === sel;
              const okCount = u.devices.filter((d) => approved[d.id]).length;
              return (
                <button key={u.id} type="button" onClick={() => onSel(u.id)} aria-pressed={on} className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors" style={{ background: on ? "color-mix(in srgb, var(--db-accent) 14%, transparent)" : "transparent" }}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: "color-mix(in srgb, var(--db-accent) 20%, transparent)", color: "var(--db-accent)" }}>{u.name.split(" ").map((w) => w[0]).join("")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-semibold" style={{ color: "var(--db-text)" }}>{u.name}</span>
                    <span className="block text-[10px]" style={{ color: "var(--db-text-mute)" }}>{u.role} · {okCount}/{u.devices.length} bound</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* devices — approve only */}
        <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--db-border)", background: "var(--db-bg)" }}>
          <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "var(--db-border)" }}>
            <ShieldCheck size={15} weight="duotone" style={{ color: "var(--db-accent)" }} />
            <span className="text-[12px] font-semibold" style={{ color: "var(--db-text)" }}>{user.name}&apos;s bound devices</span>
            <span className="ml-auto text-[10px]" style={{ color: "var(--db-text-mute)" }}>admin approval</span>
          </div>
          {/* @container, not a viewport breakpoint: this console is dropped into
              columns of wildly different widths (ConsoleRow gives it ~200px here),
              so `sm:`/`lg:` fire on the window while the card stays narrow — which
              is what pushed the toggle out through the card's right edge. */}
          <div className="@container space-y-2.5 p-3">
            {user.devices.map((d) => {
              const ok = approved[d.id];
              const Ic = TYPE[d.type];
              return (
                <div key={d.id} className="flex min-w-0 items-center gap-2.5 rounded-xl border p-3 @[300px]:gap-3" style={{ borderColor: ok ? "color-mix(in srgb, var(--db-success) 35%, var(--db-border))" : "var(--db-border)", background: "var(--db-surface)" }}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "var(--db-surface-2)" }}>
                    <Ic size={22} weight="duotone" style={{ color: ok ? "var(--db-success)" : "var(--db-text-dim)" }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold" style={{ color: "var(--db-text)" }}>{d.name}</div>
                    <div className="truncate font-mono text-[10px]" style={{ color: "var(--db-text-mute)" }}>{d.os} · {d.bind}</div>
                  </div>
                  <span className="hidden shrink-0 items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide @[330px]:flex" style={ok ? { background: "color-mix(in srgb, var(--db-success) 16%, transparent)", color: "var(--db-success)" } : { background: "color-mix(in srgb, var(--db-warning) 16%, transparent)", color: "var(--db-warning)" }}>{ok ? "Approved" : "Pending"}</span>
                  <span className="flex shrink-0 items-center gap-2 text-[11px]" style={{ color: "var(--db-text-dim)" }}>
                    <Switch on={ok} onClick={() => onToggle(d.id)} label={`Approve ${d.name}`} />
                    {/* the pill already says Approved/Pending — this word is the
                        first thing to go when the card is narrow */}
                    <span className="hidden @[430px]:inline">Approve</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </ConsoleFrame>
  );
}

/* ---------------- device client mockups (connect) ---------------- */
function Screen({ state, Ic, small }: { state: "idle" | "ok" | "denied"; Ic: Icon; small: boolean }) {
  const base = "flex h-full w-full flex-col items-center justify-center gap-1 text-center px-1";
  if (state === "ok")
    return (
      <div className={base} style={{ background: "color-mix(in srgb, #22c55e 20%, var(--db-bg))" }}>
        <CheckCircle size={small ? 16 : 22} weight="fill" style={{ color: "#22c55e" }} />
        {!small && <span className="text-[9px] font-bold leading-tight" style={{ color: "#22c55e" }}>Connected</span>}
      </div>
    );
  if (state === "denied")
    return (
      <div className={base} style={{ background: "color-mix(in srgb, #ef4444 20%, var(--db-bg))" }}>
        <XCircle size={small ? 16 : 22} weight="fill" style={{ color: "#ef4444" }} />
        {!small && <span className="text-[9px] font-bold leading-tight" style={{ color: "#f87171" }}>Denied</span>}
      </div>
    );
  return (
    <div className={base} style={{ background: "var(--db-bg)" }}>
      <ShieldCheck size={small ? 15 : 20} weight="duotone" style={{ color: "var(--db-accent)" }} />
      {!small && <span className="text-[8px] font-semibold" style={{ color: "var(--db-text-mute)" }}>InstaSafe</span>}
    </div>
  );
}

function DeviceClient({ d, state, onConnect }: { d: Device; state: "idle" | "ok" | "denied"; onConnect: () => void }) {
  const f = FRAME[d.type];
  const small = d.type === "watch";
  const ring = state === "ok" ? "#22c55e" : state === "denied" ? "#ef4444" : "var(--db-border)";
  return (
    <motion.div layout className="flex flex-col items-center gap-2" style={{ width: f.w }}>
      <div className="relative w-full">
        {/* screen / body */}
        <div
          className="relative w-full overflow-hidden border"
          style={{ aspectRatio: f.screen, borderRadius: d.type === "phone" || d.type === "rugged" ? 16 : d.type === "watch" ? 16 : 10, borderColor: ring, borderWidth: d.type === "rugged" ? 3 : 2, background: "var(--db-surface)", boxShadow: state !== "idle" ? `0 0 22px ${ring}55` : "none", transition: "border-color .4s, box-shadow .4s", padding: d.type === "phone" || d.type === "rugged" ? 3 : 4 }}
        >
          {(d.type === "phone" || d.type === "rugged") && <span className="absolute left-1/2 top-1 z-10 h-1 w-6 -translate-x-1/2 rounded-full" style={{ background: "var(--db-border)" }} />}
          <div className="h-full w-full overflow-hidden rounded-[6px]">
            <Screen state={state} Ic={TYPE[d.type]} small={small} />
          </div>
        </div>
        {/* laptop base */}
        {d.type === "laptop" && <div className="mx-auto h-1.5 w-[112%] -translate-x-[5%] rounded-b-lg" style={{ background: "var(--db-border)" }} />}
        {/* desktop stand */}
        {d.type === "desktop" && (
          <div className="flex flex-col items-center">
            <div className="h-2.5 w-2 rounded-sm" style={{ background: "var(--db-border)" }} />
            <div className="h-1 w-10 rounded-full" style={{ background: "var(--db-border)" }} />
          </div>
        )}
        {/* watch band */}
        {d.type === "watch" && <div className="mx-auto h-2 w-4 rounded-b-sm" style={{ background: "var(--db-border)" }} />}
      </div>

      <div className="max-w-full truncate text-center text-[10px] font-semibold" style={{ color: "var(--db-text)" }}>{d.name}</div>
      <button type="button" onClick={onConnect} className="inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold text-white transition-transform hover:scale-[1.04]" style={{ background: state === "denied" ? "#ef4444" : "var(--db-accent)" }}>
        <PlugsConnected size={12} weight="bold" /> {state === "ok" ? "Reconnect" : "Connect"}
      </button>
    </motion.div>
  );
}

/* ---------------- parent: shared state ---------------- */
/* `consoleOnly` renders just the admin console. The "approve above, then
   press Connect here" panel is a device-binding-page exercise; on other
   pages it is a second window asking for work nobody came here to do. */
export function DeviceBindingDemo({ consoleOnly = false }: { consoleOnly?: boolean } = {}) {
  const initApproved = useMemo(() => {
    const m: Record<string, boolean> = {};
    USERS.forEach((u) => u.devices.forEach((d) => (m[d.id] = d.approved)));
    return m;
  }, []);
  const [sel, setSel] = useState(USERS[0].id);
  const [approved, setApproved] = useState<Record<string, boolean>>(initApproved);
  const [result, setResult] = useState<Record<string, "ok" | "denied">>({});

  /* the hint, and the mute that survives the session */
  const [hint, setHint] = useState(false);
  const [muted, setMuted] = useState(true); // assume muted until localStorage says otherwise, so it can never flash on first paint
  const devicesRef = useRef<HTMLDivElement>(null);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      setMuted(localStorage.getItem(HINT_KEY) === "1");
    } catch {
      setMuted(false);
    }
  }, []);
  useEffect(() => () => { if (hintTimer.current) clearTimeout(hintTimer.current); }, []);

  const user = USERS.find((u) => u.id === sel)!;
  const toggle = (id: string) => {
    setApproved((a) => ({ ...a, [id]: !a[id] }));
    setResult((r) => { const n = { ...r }; delete n[id]; return n; }); // re-test after change
    /* Toggling is the moment the connect step becomes relevant, and on a
       phone the devices panel is a screen and a half below — without
       this the reader approves something, sees nothing happen, and
       leaves. Re-armed on every toggle, hence the timer reset. */
    if (!muted && !consoleOnly) {
      setHint(true);
      if (hintTimer.current) clearTimeout(hintTimer.current);
      hintTimer.current = setTimeout(() => setHint(false), 9000);
    }
  };
  const connect = (id: string) => {
    setResult((r) => ({ ...r, [id]: approved[id] ? "ok" : "denied" }));
    setHint(false); // they found it; stop pointing at it
  };
  const goToDevices = () => {
    devicesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setHint(false);
  };
  const muteHint = () => {
    setHint(false);
    setMuted(true);
    try { localStorage.setItem(HINT_KEY, "1"); } catch {}
  };

  const lastDenied = user.devices.find((d) => result[d.id] === "denied");

  if (consoleOnly) {
    return <AdminConsole sel={sel} onSel={setSel} approved={approved} onToggle={toggle} />;
  }

  return (
    <div className="@container/dbd space-y-6">
      <AdminConsole sel={sel} onSel={setSel} approved={approved} onToggle={toggle} />

      {/* Sits directly under the console, which is where the eye already
          is after a toggle — a corner toast would be one more thing to
          notice. "Not again" is a real preference, not a close button:
          see HINT_KEY. */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="status"
            className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border px-3.5 py-3 text-[12px]"
            style={{ background: "color-mix(in srgb, var(--db-accent) 10%, var(--db-bg))", borderColor: "color-mix(in srgb, var(--db-accent) 34%, var(--db-border))", color: "var(--db-text)" }}
          >
            <ArrowDown size={16} weight="bold" className="shrink-0" style={{ color: "var(--db-accent)" }} />
            {/* `basis-full` until the block is wide enough for both: the
                buttons do not shrink, so on one line they left the
                sentence about 60px wide and it wrapped a word per line. */}
            <span className="min-w-0 flex-1 basis-[calc(100%-2rem)] font-semibold @[460px]/dbd:basis-auto">
              Approval saved. Now scroll down and press <b>Connect</b> on that device to see what changed.
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <button type="button" onClick={goToDevices} className="cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: "var(--db-accent)" }}>
                Take me there
              </button>
              <button type="button" onClick={muteHint} className="cursor-pointer text-[11px] underline underline-offset-2" style={{ color: "var(--db-text-mute)" }}>
                Don&apos;t show again
              </button>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The standing pointer, for the reader who has not toggled anything
          yet. The banner above only fires on a toggle, and the failure it
          prevents — approving something, seeing nothing happen, leaving —
          starts before the first toggle. Hidden while the banner is up so
          the block never says the same thing twice. */}
      {!hint && (
        <p className="flex items-center justify-center gap-2 text-center text-[11px]" style={{ color: "var(--db-text-mute)" }}>
          <ArrowDown size={13} weight="bold" style={{ color: "var(--db-accent)" }} />
          Approve here — then connect from {user.name.split(" ")[0]}&apos;s own devices, below.
        </p>
      )}

      {/* the user's actual devices */}
      <div ref={devicesRef} className="rounded-2xl border p-4 sm:p-5 lg:p-6" style={{ background: "var(--db-bg)", borderColor: "var(--db-border)", boxShadow: "var(--db-shadow)" }}>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: "color-mix(in srgb, var(--db-accent) 20%, transparent)", color: "var(--db-accent)" }}>{user.name.split(" ").map((w) => w[0]).join("")}</span>
          <span className="text-sm font-semibold" style={{ color: "var(--db-text)" }}>{user.name}&apos;s devices</span>
          <span className="text-xs" style={{ color: "var(--db-text-mute)" }}>— try connecting from each</span>
        </div>
        <p className="mb-5 text-xs" style={{ color: "var(--db-text-mute)" }}>Approve a device in the console above, then press Connect on it here.</p>

        <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {user.devices.map((d) => (
              <DeviceClient key={d.id} d={d} state={result[d.id] ?? "idle"} onConnect={() => connect(d.id)} />
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {lastDenied && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-xl px-3.5 py-2.5 text-[12px] font-semibold" style={{ background: "color-mix(in srgb, var(--db-danger) 14%, transparent)", color: "var(--db-danger)" }} role="status">
              <XCircle size={16} weight="fill" />
              This device is not authorized for this user. Have an admin approve it first.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
