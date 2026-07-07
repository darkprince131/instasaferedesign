"use client";

/**
 * BreachSimulator — radial "blast radius" demo (two-column, one screen).
 *
 * One unified ring of teammates (same size, all photos) around an Access Engine.
 * Pick whose credential is stolen → on a VPN the virus spreads from THAT person
 * outward (a different sequence per role), each victim turning red with an overlay
 * and surfacing one panic message at a time. On ZTNA only the role's authorized
 * app is reached; everything else stays invisible.
 *
 * Click-driven. Placeholder portraits (pravatar) — swap for production faces.
 * Respects prefers-reduced-motion.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowsClockwise, LockKey, ShieldCheck, WarningCircle } from "@phosphor-icons/react";

type Pt = { x: number; y: number };
function ring(r: number, count: number, offsetDeg: number): Pt[] {
  return Array.from({ length: count }, (_, i) => {
    const a = ((offsetDeg + (360 / count) * i) * Math.PI) / 180;
    return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
  });
}

type Person = { id: string; msg: string; img: string };
// All same treatment. The first six own named systems; the rest are teammates.
const PEOPLE: Person[] = [
  { id: "cust", msg: "Customer DB exposed — data leaking!", img: "https://i.pravatar.cc/100?img=12" },
  { id: "pay", msg: "Payments API down — 500 errors!", img: "https://i.pravatar.cc/100?img=33" },
  { id: "web", msg: "Web server is down!", img: "https://i.pravatar.cc/100?img=14" },
  { id: "auth", msg: "Auth service not responding…", img: "https://i.pravatar.cc/100?img=51" },
  { id: "rate", msg: "API gateway rate-limited!", img: "https://i.pravatar.cc/100?img=8" },
  { id: "back", msg: "Backups gone — no recovery!", img: "https://i.pravatar.cc/100?img=68" },
  { id: "t1", msg: "I’m locked out of everything!", img: "https://i.pravatar.cc/100?img=21" },
  { id: "t2", msg: "Nothing is loading…", img: "https://i.pravatar.cc/100?img=24" },
  { id: "t3", msg: "Is the whole network down?", img: "https://i.pravatar.cc/100?img=27" },
  { id: "t4", msg: "My dashboards are blank!", img: "https://i.pravatar.cc/100?img=31" },
  { id: "t5", msg: "Can’t reach any service!", img: "https://i.pravatar.cc/100?img=45" },
  { id: "t6", msg: "Everything’s timing out!", img: "https://i.pravatar.cc/100?img=60" },
  { id: "t7", msg: "Help — I’m cut off!", img: "https://i.pravatar.cc/100?img=15" },
];
const POS: Pt[] = [...ring(25, 6, -90), ...ring(42, 7, -90 + 26)]; // 13 positions
const idx = (id: string) => PEOPLE.findIndex((p) => p.id === id);
const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);

// Beehive mesh: engine + people, each wired to every nearby node (not just the centre).
const NODE_POS: Pt[] = [{ x: 50, y: 50 }, ...POS];
const NODE_ID: string[] = ["engine", ...PEOPLE.map((p) => p.id)];
const EDGES: [number, number][] = (() => {
  const e: [number, number][] = [];
  for (let i = 0; i < NODE_POS.length; i++)
    for (let j = i + 1; j < NODE_POS.length; j++) if (dist(NODE_POS[i], NODE_POS[j]) < 38) e.push([i, j]);
  return e;
})();

const ROLES = [
  { id: "sales", label: "Sales", apps: ["cust"] },
  { id: "finance", label: "Finance", apps: ["pay"] },
  { id: "devops", label: "DevOps", apps: ["web", "rate"] },
  { id: "support", label: "Support", apps: ["cust", "auth"] },
  { id: "engineer", label: "Engineering", apps: ["back", "web"] },
] as const;
type RoleId = (typeof ROLES)[number]["id"];

const PRIMARY = 9; // first N victims surface a readable bubble; rest cascade as collateral
const STEP = 1700; // ms between primary victims — slow, so each message lingers
const AV = 46; // every circle the same size

function Avatar({ src, down, dim }: { src: string; down: boolean; dim: boolean }) {
  const [err, setErr] = useState(false);
  return (
    <span className="relative block overflow-hidden rounded-full" style={{ width: AV, height: AV, filter: dim ? "grayscale(1) brightness(0.6)" : "none", transition: "filter .8s ease" }}>
      {err || !src ? (
        <svg viewBox="0 0 40 40" className="h-full w-full" style={{ background: "#1a2233" }}>
          <circle cx="20" cy="15" r="7" fill="#39455f" />
          <path d="M6 38c0-8 6-12 14-12s14 4 14 12" fill="#39455f" />
        </svg>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" onError={() => setErr(true)} className="h-full w-full object-cover" />
      )}
      {/* red overlay when affected */}
      <span className="pointer-events-none absolute inset-0 rounded-full" style={{ background: "rgba(225,29,29,0.55)", mixBlendMode: "multiply", opacity: down ? 1 : 0, transition: "opacity .7s ease" }} />
    </span>
  );
}

export function BreachSimulator() {
  const reduce = useReducedMotion() ?? false;
  const [mode, setMode] = useState<"vpn" | "ztna">("vpn");
  const [roleId, setRoleId] = useState<RoleId>("sales");
  const role = ROLES.find((r) => r.id === roleId)!;
  const roleApps = role.apps.map((id) => roleName(id)).join(" & ");

  const [active, setActive] = useState(false);
  const [infected, setInfected] = useState<string[]>([]);
  const [bubbleIds, setBubbleIds] = useState<string[]>([]);
  const [blocked, setBlocked] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clear(), []);

  const authorized = (id: string) => (role.apps as readonly string[]).includes(id);

  const steal = () => {
    clear();
    setActive(true);
    setInfected([]);
    setBlocked(false);
    if (mode === "vpn") {
      // spread from the stolen person outward — different order per role
      const sp = POS[idx(role.apps[0])];
      const rest = PEOPLE.map((p) => p.id)
        .filter((id) => !(role.apps as readonly string[]).includes(id))
        .sort((a, b) => dist(POS[idx(a)], sp) - dist(POS[idx(b)], sp));
      const seq = [...role.apps, ...rest];
      setBubbleIds(seq.slice(0, PRIMARY));
      seq.forEach((id, i) => {
        const t = i < PRIMARY ? 900 + i * STEP : 900 + (PRIMARY - 1) * STEP + (i - PRIMARY + 1) * 320;
        timers.current.push(setTimeout(() => setInfected((p) => [...p, id]), reduce ? 70 * (i + 1) : t));
      });
    } else {
      setBubbleIds([...role.apps]);
      timers.current.push(setTimeout(() => setBlocked(true), reduce ? 80 : 900));
      timers.current.push(setTimeout(() => setInfected([...role.apps]), reduce ? 160 : 1500));
    }
  };
  const reset = () => {
    clear();
    setActive(false);
    setInfected([]);
    setBlocked(false);
  };
  const switchMode = (m: "vpn" | "ztna") => {
    clear();
    setMode(m);
    setActive(false);
    setInfected([]);
    setBlocked(false);
  };

  const statusOf = (id: string): "ok" | "down" | "reached" | "hidden" => {
    if (mode === "ztna") {
      if (!active) return "ok";
      if (authorized(id)) return infected.includes(id) ? "reached" : "ok";
      return "hidden";
    }
    return infected.includes(id) ? "down" : "ok";
  };
  const ringColor = (st: string) => (st === "down" ? "#ef4444" : st === "reached" ? "var(--db-warning)" : st === "hidden" ? "var(--db-border)" : "#22c55e");

  const reachable = infected.length;
  const total = PEOPLE.length;
  const engineBreached = mode === "vpn" && active;
  const isHidden = (id: string) => mode === "ztna" && active && id !== "engine" && !authorized(id);
  const isDown = (id: string) => (id === "engine" ? engineBreached : mode === "vpn" && infected.includes(id));

  const current = infected.length ? infected[infected.length - 1] : null;
  const showBubble = !!current && (mode === "ztna" ? true : bubbleIds.includes(current));
  const curPos = current ? POS[idx(current)] : null;
  const curMsg = current ? (mode === "ztna" ? `Authorized for ${role.label} — verified, then contained.` : PEOPLE[idx(current)].msg) : "";

  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* hub */}
        <div className="relative mx-auto aspect-square w-full" style={{ maxWidth: "min(68vh, 540px)" }}>
          <div className="absolute inset-0 rounded-3xl" style={{ backgroundImage: "radial-gradient(var(--dot-color) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.18), transparent 60%)" }} animate={{ opacity: mode === "vpn" ? Math.min(1, infected.length / 8) : 0 }} transition={{ duration: 1 }} />

          {/* mesh + pulses */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <filter id="bs-glow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="1.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* beehive mesh — every node wired to its neighbours */}
            {EDGES.map(([a, b], k) => {
              const ida = NODE_ID[a];
              const idb = NODE_ID[b];
              const faded = isHidden(ida) || isHidden(idb);
              const hot = isDown(ida) && isDown(idb);
              return (
                <line
                  key={`ed-${k}`}
                  x1={NODE_POS[a].x}
                  y1={NODE_POS[a].y}
                  x2={NODE_POS[b].x}
                  y2={NODE_POS[b].y}
                  stroke={hot ? "#ef4444" : "#5b7099"}
                  strokeWidth={hot ? 0.55 : 0.3}
                  opacity={faded ? 0.04 : hot ? 0.85 : 0.18}
                  style={{ transition: "opacity .8s, stroke .8s" }}
                  filter={hot ? "url(#bs-glow)" : undefined}
                />
              );
            })}
            {/* pulses travelling the mesh */}
            {!reduce &&
              EDGES.map(([a, b], k) => {
                const ida = NODE_ID[a];
                const idb = NODE_ID[b];
                const hot = isDown(ida) && isDown(idb);
                const ambient = !hot && k % 3 === 0 && !isHidden(ida) && !isHidden(idb);
                if (!hot && !ambient) return null;
                const A = NODE_POS[a];
                const B = NODE_POS[b];
                return (
                  <motion.circle
                    key={`pl-${k}`}
                    r={hot ? 1.3 : 0.8}
                    fill={hot ? "#ff5a5a" : "#9ccdff"}
                    filter={hot ? "url(#bs-glow)" : undefined}
                    initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                    animate={{ cx: [A.x, B.x], cy: [A.y, B.y], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: hot ? 1.8 : 2.6, repeat: Infinity, repeatDelay: hot ? 0.2 : 1.6, ease: "easeInOut", delay: (k % 5) * 0.3 }}
                  />
                );
              })}
          </svg>

          {/* engine */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            {!reduce &&
              [0, 1].map((k) => (
                <motion.span key={k} className="absolute left-1/2 top-1/2 rounded-full" style={{ width: 88, height: 88, marginLeft: -44, marginTop: -44, border: `1.5px solid ${engineBreached ? "#ef4444" : "#60a5fa"}` }} initial={{ scale: 0.7, opacity: 0.45 }} animate={{ scale: 1.9, opacity: 0 }} transition={{ duration: 2.8, repeat: Infinity, delay: k * 1.2, ease: "easeOut" }} />
              ))}
            <motion.div
              className="relative flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full border text-center"
              style={{ background: "radial-gradient(circle at 40% 35%, #0f1828, #0a0f18)", borderColor: engineBreached ? "#ef4444" : "#60a5fa", boxShadow: engineBreached ? "0 0 44px rgba(239,68,68,.5)" : "0 0 40px rgba(96,165,250,.4)", transition: "border-color .6s, box-shadow .6s" }}
              animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {mode === "ztna" ? <ShieldCheck size={24} weight="duotone" style={{ color: blocked ? "#34d399" : "#7dd3fc" }} /> : <LockKey size={24} weight="duotone" style={{ color: engineBreached ? "#f87171" : "#7dd3fc" }} />}
              <span className="mt-1 text-[10px] font-extrabold tracking-wide text-white">ACCESS ENGINE</span>
              {mode === "ztna" && blocked && (
                <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -bottom-3 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: "#22c55e", color: "#04130a" }}>
                  blocked at gate
                </motion.span>
              )}
            </motion.div>
          </div>

          {/* people */}
          {PEOPLE.map((person, i) => {
            const st = statusOf(person.id);
            const p = POS[i];
            return (
              <div key={person.id} className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: st === "hidden" ? 0.12 : 1, transition: "opacity .8s ease" }}>
                <AnimatePresence>
                  {st === "down" && !reduce && (
                    <motion.span key="aff" className="absolute left-1/2 top-1/2 rounded-full" style={{ width: AV + 8, height: AV + 8, marginLeft: -(AV + 8) / 2, marginTop: -(AV + 8) / 2, border: "2px solid #ef4444" }} initial={{ scale: 0.6, opacity: 0.7 }} animate={{ scale: 2.1, opacity: 0 }} transition={{ duration: 1.6, ease: "easeOut" }} />
                  )}
                </AnimatePresence>
                <motion.div className="relative" animate={reduce ? undefined : { y: [0, -4, 0] }} transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: (i % 5) * 0.3 }}>
                  <span className="relative block rounded-full" style={{ boxShadow: `0 0 0 2.5px ${ringColor(st)}${st === "down" ? ", 0 0 22px rgba(239,68,68,.6)" : ""}`, transition: "box-shadow .8s ease" }}>
                    <Avatar src={person.img} down={st === "down"} dim={st === "hidden"} />
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2" style={{ background: ringColor(st), borderColor: "var(--db-bg)", transition: "background .8s" }} />
                  </span>
                </motion.div>
              </div>
            );
          })}

          {/* ONE message at a time — calm box, gently pulsing glow (readable) */}
          <AnimatePresence>
            {showBubble && curPos && (
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.6 } }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="absolute z-40 w-[170px] -translate-x-1/2"
                style={{ left: `${Math.min(80, Math.max(20, curPos.x))}%`, top: `${curPos.y < 50 ? curPos.y + 8 : curPos.y - 8}%`, transform: `translate(-50%, ${curPos.y < 50 ? "0" : "-100%"})` }}
              >
                <motion.div
                  role="status"
                  className="rounded-xl px-3 py-2 text-[11px] font-bold leading-snug"
                  style={
                    mode === "ztna"
                      ? { background: "var(--db-surface)", color: "var(--db-warning)", border: "1px solid var(--db-warning)" }
                      : { background: "linear-gradient(135deg,#e7332f,#b81d1d)", color: "#fff", border: "1px solid #ff7a7a" }
                  }
                  animate={mode === "vpn" && !reduce ? { boxShadow: ["0 0 7px rgba(239,68,68,.30)", "0 0 18px rgba(239,68,68,.6)", "0 0 7px rgba(239,68,68,.30)"] } : undefined}
                  transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="flex items-start gap-1.5">
                    {mode === "vpn" && <WarningCircle size={14} weight="fill" className="mt-px shrink-0" style={{ color: "#fff" }} />}
                    {curMsg}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* counter */}
          <div className="absolute left-2 top-2 z-40 rounded-xl border px-3 py-2 backdrop-blur-md" style={{ background: "color-mix(in srgb, var(--db-surface) 62%, transparent)", borderColor: mode === "vpn" ? "color-mix(in srgb, var(--db-danger) 50%, transparent)" : "color-mix(in srgb, var(--db-success) 50%, transparent)" }} aria-live="polite">
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--db-text-mute)" }}>People hit</div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: mode === "vpn" ? "#f87171" : "#34d399" }}>
              {reachable}<span className="text-sm" style={{ color: "var(--db-text-mute)" }}> / {total}</span>
            </div>
          </div>
          <div className="absolute right-2 top-2 z-40 rounded-xl border px-3 py-2 text-right backdrop-blur-md" style={{ background: "color-mix(in srgb, var(--db-surface) 62%, transparent)", borderColor: engineBreached ? "color-mix(in srgb, var(--db-danger) 50%, transparent)" : "var(--db-border)" }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--db-text-mute)" }}>Engine status</div>
            <div className="text-sm font-bold" style={{ color: engineBreached ? "#f87171" : "#34d399" }}>{engineBreached ? "BREACH IN PROGRESS" : "99.98% uptime"}</div>
          </div>
        </div>

        {/* right column */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue-light)]">Breach simulator</div>
            <h3 className="mt-2 text-balance text-2xl font-bold leading-tight tracking-tight">One stolen key. Watch the blast radius.</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--db-text-dim)]">
              Pick whose credential is stolen — the virus starts there and spreads. On a VPN it takes the whole team; on ZTNA it stops at one app.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="w-full text-xs font-semibold" style={{ color: "var(--db-text-mute)" }}>Stolen credential belongs to:</span>
            {ROLES.map((r) => (
              <button key={r.id} type="button" aria-pressed={roleId === r.id} onClick={() => { setRoleId(r.id); reset(); }} className="cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors" style={{ borderColor: roleId === r.id ? "var(--db-accent)" : "var(--db-border)", background: roleId === r.id ? "color-mix(in srgb, var(--db-accent) 16%, transparent)" : "transparent", color: roleId === r.id ? "var(--db-accent)" : "var(--db-text-dim)" }}>
                {r.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border p-4 backdrop-blur-md" style={{ background: "color-mix(in srgb, var(--db-surface) 60%, transparent)", borderColor: "var(--db-border)", boxShadow: "0 20px 60px -30px rgba(0,0,0,.6)" }}>
            <div role="radiogroup" aria-label="Network mode" className="grid grid-cols-2 gap-1 rounded-xl border p-1" style={{ borderColor: "var(--db-border)" }}>
              {(
                [
                  { id: "vpn", label: "Legacy VPN" },
                  { id: "ztna", label: "InstaSafe ZTNA" },
                ] as const
              ).map((o) => (
                <button key={o.id} type="button" role="radio" aria-checked={mode === o.id} onClick={() => switchMode(o.id)} className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition-all" style={{ background: mode === o.id ? (o.id === "vpn" ? "#ef4444" : "#22c55e") : "transparent", color: mode === o.id ? "#fff" : "var(--db-text-dim)", boxShadow: mode === o.id ? (o.id === "vpn" ? "0 0 24px rgba(239,68,68,.5)" : "0 0 24px rgba(34,197,94,.45)") : "none" }}>
                  {o.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={steal} className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]" style={{ background: "#ef4444", boxShadow: "0 0 26px rgba(239,68,68,.45)" }}>
                <LockKey size={16} weight="fill" /> Steal a credential
              </button>
              <button type="button" onClick={reset} className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors" style={{ borderColor: "var(--db-border)", color: "var(--db-text-dim)" }}>
                <ArrowsClockwise size={15} /> Reset
              </button>
            </div>
          </div>

          <p className="text-sm font-medium leading-relaxed" aria-live="polite" style={{ color: reachable > 0 ? (mode === "vpn" ? "#f87171" : "#34d399") : "var(--db-text-dim)" }}>
            {mode === "vpn" && reachable === 0 && `Steal the ${role.label} login — on a VPN it lands on the network and the virus crawls from there, person to person.`}
            {mode === "vpn" && reachable > 0 && reachable < total && "The virus is moving — one teammate at a time…"}
            {mode === "vpn" && reachable >= total && "Everyone down. One stolen key took the whole company with it."}
            {mode === "ztna" && reachable === 0 && `A ${role.label} login is authorized for ${roleApps} — and nothing else. Steal it and see how far it gets.`}
            {mode === "ztna" && reachable > 0 && `Contained. A ${role.label} key only ever reaches ${roleApps}. Every other system stayed invisible.`}
          </p>
        </div>
      </div>
    </div>
  );
}

function roleName(id: string) {
  const m: Record<string, string> = { cust: "Customer DB", pay: "Payments API", web: "Web Server", auth: "Auth Service", rate: "API Gateway", back: "Backups" };
  return m[id] ?? id;
}
