"use client";

/**
 * PasswordFatigue — the SSO "main attraction" (the problem, felt).
 *
 * Not a boxed widget: app tiles are scattered across a full-bleed field, wired to
 * a central mood character by a faint node-mesh (echoing the page background).
 * Each app wants its own login — some say "wrong password", some let you in, and
 * there's a "Forgot password?" reset too. The character starts happy and green and
 * sours to angry red as the fatigue meter fills; when it's full it gives up.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowClockwise, ChatCircleDots, CheckCircle, Cloud, EnvelopeSimple, Folder, GitBranch, Notebook, PaperPlaneTilt, VideoCamera, WarningCircle, XCircle, type Icon } from "@phosphor-icons/react";

type App = { id: string; name: string; Icon: Icon; color: string; x: number; y: number };
const APPS: App[] = [
  { id: "slack", name: "Slack", Icon: ChatCircleDots, color: "#e01e5a", x: 13, y: 26 },
  { id: "sf", name: "Salesforce", Icon: Cloud, color: "#3aa0e3", x: 33, y: 11 },
  { id: "zoom", name: "Zoom", Icon: VideoCamera, color: "#2d8cff", x: 64, y: 12 },
  { id: "github", name: "GitHub", Icon: GitBranch, color: "#b8c0cc", x: 87, y: 26 },
  { id: "notion", name: "Notion", Icon: Notebook, color: "#c9bda8", x: 90, y: 60 },
  { id: "gmail", name: "Gmail", Icon: EnvelopeSimple, color: "#ea4335", x: 66, y: 86 },
  { id: "drive", name: "Drive", Icon: Folder, color: "#34a853", x: 14, y: 74 },
];
const CENTER = { x: 50, y: 52 };
const MAX = 100;

/* ---- mood colour ramp green → amber → red ---- */
function faceRGB(f: number): [number, number, number] {
  const g = [34, 197, 94];
  const a = [245, 158, 11];
  const r = [239, 68, 68];
  let c1, c2, t;
  if (f < 0.5) { c1 = g; c2 = a; t = f / 0.5; } else { c1 = a; c2 = r; t = (f - 0.5) / 0.5; }
  return c1.map((v, i) => Math.round(v + (c2[i] - v) * t)) as [number, number, number];
}
const rgb = (c: number[]) => `rgb(${c[0]},${c[1]},${c[2]})`;
const shift = (c: number[], n: number) => c.map((v) => Math.max(0, Math.min(255, v + n)));

function Smiley({ f, size = 150 }: { f: number; size?: number }) {
  const reduce = useReducedMotion();
  const c = faceRGB(f);
  const col = rgb(c);
  const light = rgb(shift(c, 55));
  const dark = rgb(shift(c, -60));
  const m = 16 - f * 38; // smile → frown
  const brow = Math.max(0, (f - 0.5) / 0.5);
  const cheek = Math.max(0, 0.85 - f * 1.1);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* mood aura */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: col, opacity: 0.4 }}
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.32, 0.5, 0.32] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 140 140"
        className="relative h-full w-full"
        role="img"
        aria-label={f < 0.34 ? "Happy" : f < 0.7 ? "Getting frustrated" : "Exhausted"}
        animate={reduce ? undefined : f > 0.7 ? { x: [0, -2.5, 2.5, -1.5, 1.5, 0], rotate: [0, -1.5, 1.5, 0] } : { y: [0, -4, 0] }}
        transition={f > 0.7 ? { duration: 0.4, repeat: Infinity, repeatDelay: 0.5 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id="face-g" cx="38%" cy="30%" r="72%">
            <stop offset="0" stopColor={light} />
            <stop offset="0.6" stopColor={col} />
            <stop offset="1" stopColor={dark} />
          </radialGradient>
        </defs>
        {/* face */}
        <circle cx="70" cy="70" r="56" fill="url(#face-g)" stroke={dark} strokeWidth="1.5" style={{ transition: "stroke .5s" }} />
        {/* gloss */}
        <ellipse cx="52" cy="44" rx="26" ry="16" fill="#ffffff" opacity="0.18" />
        {/* cheeks */}
        <ellipse cx="44" cy="84" rx="9" ry="6" fill="#ff7a9c" style={{ opacity: cheek, transition: "opacity .4s" }} />
        <ellipse cx="96" cy="84" rx="9" ry="6" fill="#ff7a9c" style={{ opacity: cheek, transition: "opacity .4s" }} />
        {/* eyes (blink) */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={reduce ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1], ease: "easeInOut" }}
        >
          <circle cx="52" cy="64" r="8" fill="#0a0f18" />
          <circle cx="88" cy="64" r="8" fill="#0a0f18" />
          <circle cx="55" cy="61" r="2.6" fill="#fff" />
          <circle cx="91" cy="61" r="2.6" fill="#fff" />
        </motion.g>
        {/* angry brows */}
        <g stroke="#0a0f18" strokeWidth="4" strokeLinecap="round" style={{ opacity: brow, transition: "opacity .3s" }}>
          <line x1="42" y1="48" x2="60" y2="56" />
          <line x1="98" y1="48" x2="80" y2="56" />
        </g>
        {/* mouth */}
        <path d={`M 46 96 Q 70 ${96 + m} 94 96`} fill="none" stroke="#0a0f18" strokeWidth="5" strokeLinecap="round" />
        {/* sweat */}
        {f > 0.55 && (
          <motion.path d="M 112 54 q -6 11 0 16 a 5 5 0 0 0 9 -4 q -4 -6 -9 -12 z" fill="#7dd3fc" style={{ opacity: brow }} animate={reduce ? undefined : { y: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
        )}
      </motion.svg>
    </div>
  );
}

export function PasswordFatigue() {
  const reduce = useReducedMotion();
  const [apps, setApps] = useState<Record<string, boolean>>({});
  const [fatigue, setFatigue] = useState(0);
  const [logins, setLogins] = useState(0);
  const [resets, setResets] = useState(0);
  const [modal, setModal] = useState<{ id: string; step: "login" | "forgot" | "reset"; err?: boolean } | null>(null);
  const [pw, setPw] = useState("");

  const f = Math.min(1, fatigue / MAX);
  const tired = fatigue >= MAX;
  const app = modal ? APPS.find((a) => a.id === modal.id)! : null;
  const bump = (n: number) => setFatigue((v) => Math.min(MAX, v + n));

  const open = (id: string) => { if (tired || apps[id]) return; setPw(""); setModal({ id, step: "login" }); };
  const trySignIn = () => {
    if (!modal) return;
    bump(8);
    if (Math.random() < 0.45) { setModal({ ...modal, err: true }); bump(4); return; }
    setApps((a) => ({ ...a, [modal.id]: true })); setLogins((n) => n + 1); bump(8); setModal(null); setPw("");
  };
  const sendReset = () => { bump(8); setModal((mo) => (mo ? { ...mo, step: "reset", err: false } : mo)); setPw(""); };
  const saveReset = () => { if (!modal) return; bump(16); setResets((n) => n + 1); setApps((a) => ({ ...a, [modal.id]: true })); setLogins((n) => n + 1); setModal(null); setPw(""); };
  const resetDemo = () => { setApps({}); setFatigue(0); setLogins(0); setResets(0); setModal(null); };

  return (
    <div className="relative w-screen" style={{ marginLeft: "calc(50% - 50vw)" }}>
      <div className="relative mx-auto min-h-[460px] max-w-6xl px-5 lg:min-h-[540px] lg:px-8">
        {/* node-mesh: apps wired to the centre */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {APPS.map((a) => {
            const on = apps[a.id];
            return <line key={a.id} x1={a.x} y1={a.y} x2={CENTER.x} y2={CENTER.y} stroke={on ? "#22c55e" : "var(--hairline)"} strokeWidth={on ? 1.4 : 1} opacity={on ? 0.75 : 0.45} style={{ transition: "stroke .5s, opacity .5s" }} vectorEffect="non-scaling-stroke" />;
          })}
          {APPS.map((a, i) => {
            const b = APPS[(i + 1) % APPS.length];
            return <line key={`r-${a.id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--hairline)" strokeWidth="0.8" opacity="0.28" vectorEffect="non-scaling-stroke" />;
          })}
        </svg>

        {/* scattered app tiles */}
        {APPS.map((a, i) => {
          const inApp = apps[a.id];
          return (
            <motion.button
              key={a.id}
              type="button"
              onClick={() => open(a.id)}
              disabled={tired}
              aria-label={inApp ? `${a.name} — signed in` : `Sign in to ${a.name}`}
              className="group absolute z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border backdrop-blur-md transition-colors disabled:cursor-not-allowed sm:h-[72px] sm:w-[72px]"
              style={{ ...{ left: `${a.x}%`, top: `${a.y}%` }, background: "color-mix(in srgb, var(--bg-card) 80%, transparent)", borderColor: inApp ? "#22c55e" : "var(--border-card)", boxShadow: inApp ? "0 0 22px rgba(34,197,94,.4)" : "var(--shadow-card)" }}
              animate={reduce ? undefined : { y: [0, i % 2 ? -7 : 7, 0] }}
              transition={{ duration: 3.6 + (i % 4) * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
            >
              <a.Icon size={26} weight="duotone" style={{ color: a.color }} />
              <span className="text-[10px] font-semibold" style={{ color: "var(--text-secondary)" }}>{a.name}</span>
              <span className="absolute -right-1 -top-1">
                {inApp ? <CheckCircle size={16} weight="fill" style={{ color: "#22c55e" }} /> : <span className="block h-3 w-3 rounded-full border-2" style={{ borderColor: "var(--text-muted)", background: "var(--bg-base)" }} />}
              </span>
            </motion.button>
          );
        })}

        {/* centre character + meter */}
        <div className="absolute left-1/2 top-1/2 z-10 flex w-[210px] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center sm:w-[260px]">
          <Smiley f={f} />
          <div className="mt-2 w-full rounded-2xl border px-4 py-3 backdrop-blur-md" style={{ background: "color-mix(in srgb, var(--bg-card) 78%, transparent)", borderColor: "var(--border-card)" }}>
            <div className="mb-1.5 flex justify-between text-[11px] font-semibold" style={{ color: "var(--text-muted)" }}>
              <span>Password fatigue</span>
              <span style={{ color: rgb(faceRGB(f)) }}>{Math.round(f * 100)}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "var(--surface-faint)" }}>
              <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#22c55e,#f59e0b,#ef4444)", boxShadow: `0 0 12px ${rgb(faceRGB(f))}` }} animate={{ width: `${f * 100}%` }} transition={{ duration: 0.4 }} />
            </div>
            <div className="mt-2 flex justify-center gap-4 text-[11px]" style={{ color: "var(--text-secondary)" }}>
              <span>{logins} logins</span>
              <span>{resets} resets</span>
            </div>
          </div>
          <p className="mt-2.5 text-xs" style={{ color: "var(--text-muted)" }}>Sign in to a few apps — watch the mood drop.</p>
        </div>

        {/* login / reset modal */}
        <AnimatePresence>
          {modal && app && !tired && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 flex items-center justify-center p-4" style={{ background: "color-mix(in srgb, var(--bg-base) 55%, transparent)", backdropFilter: "blur(2px)" }}>
              <motion.div initial={{ scale: 0.92, y: 8 }} animate={modal.err && !reduce ? { scale: 1, y: 0, x: [0, -8, 8, -5, 5, 0] } : { scale: 1, y: 0, x: 0 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-sm rounded-2xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)", boxShadow: "var(--shadow-card)" }}>
                <div className="mb-4 flex items-center gap-2.5">
                  <app.Icon size={22} weight="duotone" style={{ color: app.color }} />
                  <span className="font-bold">{modal.step === "login" ? `Sign in to ${app.name}` : modal.step === "forgot" ? `Reset ${app.name} password` : `New ${app.name} password`}</span>
                  <button type="button" onClick={() => setModal(null)} aria-label="Close" className="ml-auto cursor-pointer"><XCircle size={20} style={{ color: "var(--text-muted)" }} /></button>
                </div>
                <label className="mb-1 block text-[11px] font-semibold" style={{ color: "var(--text-muted)" }}>Email</label>
                <div className="mb-3 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--border-card)", color: "var(--text-secondary)", background: "var(--surface-faint)" }}>you@company.com</div>
                {modal.step !== "forgot" && (
                  <>
                    <label htmlFor="pwf" className="mb-1 block text-[11px] font-semibold" style={{ color: "var(--text-muted)" }}>{modal.step === "reset" ? "New password" : "Password"}</label>
                    <input id="pwf" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" className="mb-2 w-full rounded-lg border px-3 py-2 text-sm outline-none" style={{ borderColor: modal.err ? "var(--accent-red)" : "var(--border-card)", background: "var(--surface-faint)", color: "var(--text-primary)" }} />
                  </>
                )}
                {modal.err && <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "var(--accent-red)" }}><WarningCircle size={13} weight="fill" /> Wrong password. Try again — or reset it.</p>}
                {modal.step === "forgot" && <p className="mb-3 text-[12px]" style={{ color: "var(--text-secondary)" }}>We&apos;ll email a reset link. Again.</p>}
                {modal.step === "login" && (
                  <>
                    <button type="button" onClick={trySignIn} className="w-full cursor-pointer rounded-lg py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]" style={{ background: "var(--accent-blue)" }}>Sign in</button>
                    <button type="button" onClick={() => setModal({ ...modal, step: "forgot", err: false })} className="mt-2.5 w-full cursor-pointer text-center text-xs font-semibold" style={{ color: "var(--accent-blue-light)" }}>Forgot password?</button>
                  </>
                )}
                {modal.step === "forgot" && <button type="button" onClick={sendReset} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]" style={{ background: "var(--accent-blue)" }}><PaperPlaneTilt size={15} weight="fill" /> Send reset link</button>}
                {modal.step === "reset" && <button type="button" onClick={saveReset} className="w-full cursor-pointer rounded-lg py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]" style={{ background: "var(--accent-blue)" }}>Save &amp; sign in</button>}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* tired dialog */}
        <AnimatePresence>
          {tired && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40 flex items-center justify-center p-4" style={{ background: "color-mix(in srgb, var(--bg-base) 70%, transparent)", backdropFilter: "blur(3px)" }}>
              <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-sm rounded-2xl border p-6 text-center" style={{ background: "var(--bg-card)", borderColor: "var(--accent-red)", boxShadow: "0 0 50px rgba(239,68,68,.3)" }}>
                <div className="mx-auto flex justify-center"><Smiley f={1} size={120} /></div>
                <h4 className="mt-3 text-lg font-bold">I&apos;m done for today.</h4>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{logins} logins, {resets} resets — and I still have work to do. I&apos;ll try later.</p>
                <button type="button" onClick={resetDemo} className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]" style={{ background: "var(--accent-blue)" }}><ArrowClockwise size={15} weight="bold" /> Reset the demo</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
