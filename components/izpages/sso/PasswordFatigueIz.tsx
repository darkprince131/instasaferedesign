"use client";

/* ============================================================
   PasswordFatigueIz — `.iz`-token port of the v3 PasswordFatigue
   toy (components/v3/sso/PasswordFatigue.tsx — read-only reference,
   left untouched). Same interactions, same personality: a full-bleed
   field of app tiles wired to a central mood character by a faint
   node-mesh. Every sign-in attempt bumps a fatigue meter; the
   character sours from --allow through --accent to --deny as it
   fills, and gives up at 100%.

   Mood colors are READ off the mounted `.iz` element via
   getComputedStyle (not hardcoded) so the ramp always matches the
   active theme (paper/dark) and design system (orange/teal/violet/
   blue) — a MutationObserver on data-theme/data-system keeps it in
   sync if the user flips the toggle mid-play. Character art (face
   gradient shading, cheeks, sweat drop, eye/brow ink) keeps its own
   bespoke literal colors — the one legitimate non-token exception,
   same carve-out the source component made for itself.
   ============================================================ */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import {
  ArrowClockwise,
  ChatCircleDots,
  CheckCircle,
  Cloud,
  EnvelopeSimple,
  Folder,
  GitBranch,
  Notebook,
  PaperPlaneTilt,
  VideoCamera,
  WarningCircle,
  XCircle,
  type Icon,
} from "@phosphor-icons/react";

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

/* ---------------------------------------------------------------
   mood tokens — resolved off the `.iz` root (--allow / --accent /
   --deny) instead of the v3 green/amber/red literals. Fallbacks
   match iz-system.css's paper-theme defaults so SSR / first paint
   never flashes an unstyled ramp.
   --------------------------------------------------------------- */
type RGB = [number, number, number];
type MoodTokens = { allow: RGB; accent: RGB; deny: RGB };
const FALLBACK_TOKENS: MoodTokens = { allow: [23, 138, 81], accent: [242, 72, 10], deny: [195, 47, 70] };

function resolveColorVar(el: Element, varName: string): RGB | null {
  const raw = getComputedStyle(el).getPropertyValue(varName).trim();
  if (!raw) return null;
  const probe = document.createElement("span");
  probe.style.color = raw;
  probe.style.position = "fixed";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  const nums = resolved.match(/[\d.]+/g);
  if (!nums || nums.length < 3) return null;
  return [Math.round(+nums[0]), Math.round(+nums[1]), Math.round(+nums[2])];
}

function useMoodTokens(rootRef: RefObject<HTMLElement | null>): MoodTokens {
  const [tokens, setTokens] = useState<MoodTokens>(FALLBACK_TOKENS);
  useEffect(() => {
    const izEl = rootRef.current?.closest(".iz");
    if (!izEl) return;
    const read = () => {
      const allow = resolveColorVar(izEl, "--allow") ?? FALLBACK_TOKENS.allow;
      const accent = resolveColorVar(izEl, "--accent") ?? FALLBACK_TOKENS.accent;
      const deny = resolveColorVar(izEl, "--deny") ?? FALLBACK_TOKENS.deny;
      setTokens({ allow, accent, deny });
    };
    read();
    if (!("MutationObserver" in window)) return;
    const mo = new MutationObserver(read);
    mo.observe(izEl, { attributes: true, attributeFilter: ["data-theme", "data-system"] });
    return () => mo.disconnect();
  }, [rootRef]);
  return tokens;
}

/* ---- mood colour ramp: allow → accent → deny (same lerp shape as v3's g→a→r) ---- */
function faceRGB(f: number, tokens: MoodTokens): RGB {
  const good = tokens.allow;
  const mid = tokens.accent;
  const bad = tokens.deny;
  let c1: RGB, c2: RGB, t: number;
  if (f < 0.5) {
    c1 = good;
    c2 = mid;
    t = f / 0.5;
  } else {
    c1 = mid;
    c2 = bad;
    t = (f - 0.5) / 0.5;
  }
  return c1.map((v, i) => Math.round(v + (c2[i] - v) * t)) as RGB;
}
const rgb = (c: number[]) => `rgb(${c[0]},${c[1]},${c[2]})`;
const shift = (c: number[], n: number) => c.map((v) => Math.max(0, Math.min(255, v + n)));

function Smiley({ f, tokens, size = 150 }: { f: number; tokens: MoodTokens; size?: number }) {
  const reduce = useReducedMotion();
  const c = faceRGB(f, tokens);
  const col = rgb(c);
  const light = rgb(shift(c, 55));
  const dark = rgb(shift(c, -60));
  const m = 16 - f * 38; // smile → frown
  const brow = Math.max(0, (f - 0.5) / 0.5);
  const cheek = Math.max(0, 0.85 - f * 1.1);

  return (
    <div className="pfz-face" style={{ width: size, height: size }}>
      {/* mood aura */}
      <motion.div
        aria-hidden
        className="pfz-aura"
        style={{ background: col }}
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.32, 0.5, 0.32] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 140 140"
        className="pfz-face-svg"
        role="img"
        aria-label={f < 0.34 ? "Happy" : f < 0.7 ? "Getting frustrated" : "Exhausted"}
        animate={reduce ? undefined : f > 0.7 ? { x: [0, -2.5, 2.5, -1.5, 1.5, 0], rotate: [0, -1.5, 1.5, 0] } : { y: [0, -4, 0] }}
        transition={f > 0.7 ? { duration: 0.4, repeat: Infinity, repeatDelay: 0.5 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id="pfz-face-g" cx="38%" cy="30%" r="72%">
            <stop offset="0" stopColor={light} />
            <stop offset="0.6" stopColor={col} />
            <stop offset="1" stopColor={dark} />
          </radialGradient>
        </defs>
        {/* face — character art: gradient shading is the one legitimate exception to token-only color */}
        <circle cx="70" cy="70" r="56" fill="url(#pfz-face-g)" stroke={dark} strokeWidth="1.5" style={{ transition: "stroke .5s" }} />
        <ellipse cx="52" cy="44" rx="26" ry="16" fill="#ffffff" opacity="0.18" />
        <ellipse cx="44" cy="84" rx="9" ry="6" fill="#ff7a9c" style={{ opacity: cheek, transition: "opacity .4s" }} />
        <ellipse cx="96" cy="84" rx="9" ry="6" fill="#ff7a9c" style={{ opacity: cheek, transition: "opacity .4s" }} />
        {/* eyes (blink) — bespoke ink, not a token */}
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
          <motion.path
            d="M 112 54 q -6 11 0 16 a 5 5 0 0 0 9 -4 q -4 -6 -9 -12 z"
            fill="#7dd3fc"
            style={{ opacity: brow }}
            animate={reduce ? undefined : { y: [0, 3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        )}
      </motion.svg>
    </div>
  );
}

export function PasswordFatigueIz() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tokens = useMoodTokens(rootRef);

  const [apps, setApps] = useState<Record<string, boolean>>({});
  const [fatigue, setFatigue] = useState(0);
  const [logins, setLogins] = useState(0);
  const [resets, setResets] = useState(0);
  const [modal, setModal] = useState<{ id: string; step: "login" | "forgot" | "reset"; err?: boolean } | null>(null);
  const [pw, setPw] = useState("");

  const f = Math.min(1, fatigue / MAX);
  const tired = fatigue >= MAX;
  const app = modal ? APPS.find((a) => a.id === modal.id)! : null;
  const moodRGB = faceRGB(f, tokens);
  const bump = (n: number) => setFatigue((v) => Math.min(MAX, v + n));

  const open = (id: string) => {
    if (tired || apps[id]) return;
    setPw("");
    setModal({ id, step: "login" });
  };
  const trySignIn = () => {
    if (!modal) return;
    bump(8);
    if (Math.random() < 0.45) {
      setModal({ ...modal, err: true });
      bump(4);
      return;
    }
    setApps((a) => ({ ...a, [modal.id]: true }));
    setLogins((n) => n + 1);
    bump(8);
    setModal(null);
    setPw("");
  };
  const sendReset = () => {
    bump(8);
    setModal((mo) => (mo ? { ...mo, step: "reset", err: false } : mo));
    setPw("");
  };
  const saveReset = () => {
    if (!modal) return;
    bump(16);
    setResets((n) => n + 1);
    setApps((a) => ({ ...a, [modal.id]: true }));
    setLogins((n) => n + 1);
    setModal(null);
    setPw("");
  };
  const resetDemo = () => {
    setApps({});
    setFatigue(0);
    setLogins(0);
    setResets(0);
    setModal(null);
  };

  return (
    <div ref={rootRef} className="pfz-bleed">
      <div className="pfz-stage iz-wrap">
        {/* node-mesh: apps wired to the centre */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pfz-mesh" aria-hidden>
          {APPS.map((a) => {
            const on = apps[a.id];
            return (
              <line
                key={a.id}
                x1={a.x}
                y1={a.y}
                x2={CENTER.x}
                y2={CENTER.y}
                stroke={on ? "var(--allow)" : "var(--line-strong)"}
                strokeWidth={on ? 1.4 : 1}
                opacity={on ? 0.75 : 0.45}
                className="pfz-mesh-line"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          {APPS.map((a, i) => {
            const b = APPS[(i + 1) % APPS.length];
            return (
              <line
                key={`r-${a.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--line-strong)"
                strokeWidth="0.8"
                opacity="0.28"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/* scattered app tiles */}
        {APPS.map((a, i) => {
          const inApp = apps[a.id];
          const tileStyle: CSSProperties & { "--tile-c"?: string } = {
            left: `${a.x}%`,
            top: `${a.y}%`,
            "--tile-c": a.color,
          };
          return (
            <motion.button
              key={a.id}
              type="button"
              onClick={() => open(a.id)}
              disabled={tired}
              aria-label={inApp ? `${a.name} — signed in` : `Sign in to ${a.name}`}
              className={`pfz-tile${inApp ? " is-in" : ""}`}
              style={tileStyle}
              animate={reduce ? undefined : { y: [0, i % 2 ? -7 : 7, 0] }}
              transition={{ duration: 3.6 + (i % 4) * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
            >
              <a.Icon size={26} weight="duotone" className="pfz-tile-icon" />
              <span className="pfz-tile-name">{a.name}</span>
              <span className="pfz-tile-badge">
                {inApp ? <CheckCircle size={16} weight="fill" className="pfz-badge-on" /> : <span className="pfz-badge-off" />}
              </span>
            </motion.button>
          );
        })}

        {/* centre character + meter */}
        <div className="pfz-center">
          <Smiley f={f} tokens={tokens} />
          <div className="pfz-meter">
            <div className="pfz-meter-head">
              <span>Password fatigue</span>
              <span className="pfz-meter-pct" style={{ color: rgb(moodRGB) }}>
                {Math.round(f * 100)}%
              </span>
            </div>
            <div className="pfz-meter-track">
              {/* plain CSS-transitioned width — framer's `animate` prop won't
                  reliably retrigger on a %-valued style across renders here,
                  so this bar transitions via CSS instead (same 0.4s motion) */}
              <div
                className="pfz-meter-fill"
                style={{ width: `${f * 100}%`, boxShadow: `0 0 12px ${rgb(moodRGB)}` }}
              />
            </div>
            <div className="pfz-meter-stats">
              <span>{logins} logins</span>
              <span>{resets} resets</span>
            </div>
          </div>
          <p className="pfz-caption">Sign in to a few apps — watch the mood drop.</p>
        </div>

        {/* login / reset modal */}
        <AnimatePresence>
          {modal && app && !tired && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pfz-overlay">
              <motion.div
                initial={{ scale: 0.92, y: 8 }}
                animate={modal.err && !reduce ? { scale: 1, y: 0, x: [0, -8, 8, -5, 5, 0] } : { scale: 1, y: 0, x: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pfz-modal"
              >
                <div className="pfz-modal-head">
                  <app.Icon size={22} weight="duotone" style={{ color: app.color }} />
                  <span className="pfz-modal-title">
                    {modal.step === "login" ? `Sign in to ${app.name}` : modal.step === "forgot" ? `Reset ${app.name} password` : `New ${app.name} password`}
                  </span>
                  <button type="button" onClick={() => setModal(null)} aria-label="Close" className="pfz-modal-close">
                    <XCircle size={20} />
                  </button>
                </div>
                <label className="pfz-field-label">Email</label>
                <div className="pfz-field-value">you@company.com</div>
                {modal.step !== "forgot" && (
                  <>
                    <label htmlFor="pfz-pw" className="pfz-field-label">
                      {modal.step === "reset" ? "New password" : "Password"}
                    </label>
                    <input
                      id="pfz-pw"
                      type="password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder="••••••••"
                      className={`pfz-input${modal.err ? " is-err" : ""}`}
                    />
                  </>
                )}
                {modal.err && (
                  <p className="pfz-error">
                    <WarningCircle size={13} weight="fill" /> Wrong password. Try again — or reset it.
                  </p>
                )}
                {modal.step === "forgot" && <p className="pfz-hint">We&apos;ll email a reset link. Again.</p>}
                {modal.step === "login" && (
                  <>
                    <button type="button" onClick={trySignIn} className="iz-btn iz-btn-pri pfz-btn-block">
                      Sign in
                    </button>
                    <button
                      type="button"
                      onClick={() => setModal({ ...modal, step: "forgot", err: false })}
                      className="pfz-link"
                    >
                      Forgot password?
                    </button>
                  </>
                )}
                {modal.step === "forgot" && (
                  <button type="button" onClick={sendReset} className="iz-btn iz-btn-pri pfz-btn-block">
                    <PaperPlaneTilt size={15} weight="fill" /> Send reset link
                  </button>
                )}
                {modal.step === "reset" && (
                  <button type="button" onClick={saveReset} className="iz-btn iz-btn-pri pfz-btn-block">
                    Save &amp; sign in
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* tired dialog */}
        <AnimatePresence>
          {tired && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pfz-overlay pfz-overlay-tired">
              <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} className="pfz-tired">
                <div className="pfz-tired-face">
                  <Smiley f={1} tokens={tokens} size={120} />
                </div>
                <h4 className="pfz-tired-title">I&apos;m done for today.</h4>
                <p className="pfz-tired-copy">
                  {logins} logins, {resets} resets — and I still have work to do. I&apos;ll try later.
                </p>
                <button type="button" onClick={resetDemo} className="iz-btn iz-btn-pri pfz-btn-inline">
                  <ArrowClockwise size={15} weight="bold" /> Reset the demo
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
