"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowClockwise,
  ArrowRight,
  BellRinging,
  ChatCircleDots,
  CheckCircle,
  CircleNotch,
  CursorClick,
  EnvelopeSimple,
  Fingerprint,
  Globe,
  Key,
  LockKey,
  MapPin,
  Monitor,
  QrCode,
  SealCheck,
  Timer,
  WarningCircle,
  XCircle,
  type Icon,
} from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";

/* ------------------------------------------------------------------ */
/*  Types & static data                                                */
/* ------------------------------------------------------------------ */

type Method = "sms" | "email" | "totp" | "push" | "fingerprint" | "hardware";

type Stage =
  | "pick"
  | "sending"
  | "otp"
  | "totp"
  | "push-setup"
  | "push-pairing"
  | "push-waiting"
  | "denied"
  | "scan-bio"
  | "scan-key"
  | "success";

const METHODS: {
  id: Method;
  label: string;
  sub: string;
  Icon: Icon;
}[] = [
  { id: "sms", label: "OTP via SMS", sub: "Code to your phone", Icon: ChatCircleDots },
  { id: "email", label: "OTP via Email", sub: "Code to your inbox", Icon: EnvelopeSimple },
  { id: "totp", label: "Authenticator", sub: "Rotating TOTP code", Icon: Timer },
  { id: "push", label: "Push Approval", sub: "Approve on your phone", Icon: BellRinging },
  { id: "fingerprint", label: "Biometric", sub: "Fingerprint scan", Icon: Fingerprint },
  { id: "hardware", label: "Hardware Token", sub: "Tap a security key", Icon: Key },
];

const PHONE_MASK = "+91 ••••• 4821";
const EMAIL_MASK = "deb•••@instasafe.com";
const DEVICES = ["iPhone 15 Pro", "Pixel 8 Pro", "Galaxy S24", "iPad Air M2"];
const REQ_DEVICES = ["Chrome · Windows 11", "Safari · macOS", "Edge · Windows 11", "Firefox · Ubuntu"];
const LOCATIONS = ["Bengaluru, IN", "Mumbai, IN", "Pune, IN", "Hyderabad, IN", "Gurugram, IN"];
const IPS = ["103.21.58.11", "49.205.142.8", "152.58.19.240", "117.96.203.5", "106.51.74.19"];

function rand<T>(a: readonly T[]): T {
  return a[Math.floor(Math.random() * a.length)];
}
function genOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/* Deterministic, decorative QR-style matrix (seeded — SSR safe). */
function makeQr(size = 23, seed = 1337): boolean[][] {
  let s = seed;
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  const m: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => rnd() > 0.52)
  );
  const finder = (or: number, oc: number) => {
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 7; c++) {
        const edge = r === 0 || r === 6 || c === 0 || c === 6;
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        m[or + r][oc + c] = edge || inner;
      }
    // quiet ring
    for (let r = -1; r < 8; r++) {
      if (or + r < 0 || or + r >= size) continue;
      if (oc - 1 >= 0) m[or + r][oc - 1] = false;
      if (oc + 7 < size) m[or + r][oc + 7] = false;
    }
    for (let c = -1; c < 8; c++) {
      if (oc + c < 0 || oc + c >= size) continue;
      if (or - 1 >= 0) m[or - 1][oc + c] = false;
      if (or + 7 < size) m[or + 7][oc + c] = false;
    }
  };
  finder(0, 0);
  finder(0, size - 7);
  finder(size - 7, 0);
  return m;
}
const QR_MATRIX = makeQr();

const TOTP_PERIOD = 10; // seconds — short enough to watch it rotate, long enough to type

const HARDWARE_KEYS: {
  id: string;
  name: string;
  spec: string;
  ok: boolean;
  note: string;
}[] = [
  { id: "yubikey", name: "YubiKey 5 NFC", spec: "FIDO2 · WebAuthn", ok: true, note: "Enrolled & ready" },
  { id: "otp-dongle", name: "Generic OTP Dongle", spec: "OTP only", ok: false, note: "Not FIDO2-capable" },
  { id: "smartcard", name: "Legacy Smart Card", spec: "PIV", ok: false, note: "Not enrolled for this account" },
];

/* ------------------------------------------------------------------ */
/*  OTP digit boxes (accessible, paste + auto-advance)                 */
/* ------------------------------------------------------------------ */

function OtpBoxes({
  value,
  setValue,
  status,
  disabled,
}: {
  value: string;
  setValue: (v: string) => void;
  status: "idle" | "error" | "ok";
  disabled?: boolean;
}) {
  const length = 6;
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const focusAt = (i: number) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();

  const handleChange = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, "");
    const arr = value.split("");
    if (d === "") {
      arr[i] = "";
      setValue(arr.join(""));
      return;
    }
    if (d.length > 1) {
      const merged = (value.slice(0, i) + d).slice(0, length);
      setValue(merged);
      focusAt(i + d.length);
      return;
    }
    arr[i] = d;
    setValue(arr.join("").slice(0, length));
    if (i < length - 1) focusAt(i + 1);
  };

  const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) focusAt(i - 1);
    if (e.key === "ArrowLeft") focusAt(i - 1);
    if (e.key === "ArrowRight") focusAt(i + 1);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const d = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (d) {
      setValue(d);
      focusAt(d.length - 1);
    }
  };

  const ring =
    status === "error"
      ? "var(--db-danger)"
      : status === "ok"
        ? "var(--db-success)"
        : "var(--db-accent)";

  return (
    <motion.div
      className="flex gap-2"
      animate={status === "error" ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
      aria-label="One-time passcode, 6 digits"
      role="group"
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          aria-label={`Digit ${i + 1} of 6`}
          className="h-11 w-9 rounded-lg border text-center text-lg font-semibold outline-none transition-colors sm:h-12 sm:w-10"
          style={{
            background: "var(--db-surface-2)",
            color: "var(--db-text)",
            borderColor: value[i] || status !== "idle" ? ring : "var(--db-border)",
            boxShadow: value[i] ? `0 0 0 2px color-mix(in srgb, ${ring} 22%, transparent)` : "none",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative QR                                                      */
/* ------------------------------------------------------------------ */

function QrGraphic({ size = 132 }: { size?: number }) {
  const n = QR_MATRIX.length;
  const cell = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Pairing QR code">
      <rect width={size} height={size} rx={10} fill="var(--db-surface-2)" />
      <g fill="var(--db-text)">
        {QR_MATRIX.map((row, r) =>
          row.map((on, c) =>
            on ? (
              <rect
                key={`${r}-${c}`}
                x={c * cell + cell * 0.5}
                y={r * cell + cell * 0.5}
                width={cell * 0.82}
                height={cell * 0.82}
                rx={cell * 0.18}
              />
            ) : null
          )
        )}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  TOTP flow (owns its rotating-code interval)                        */
/* ------------------------------------------------------------------ */

function TotpFlow({
  onSuccess,
  reduce,
}: {
  onSuccess: () => void;
  reduce: boolean;
}) {
  const [code, setCode] = useState("------");
  const [left, setLeft] = useState(TOTP_PERIOD);
  const [entry, setEntry] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "ok">("idle");

  // init on mount (client only → no hydration mismatch)
  useEffect(() => {
    setCode(genOtp());
    setLeft(TOTP_PERIOD);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          setCode(genOtp());
          setEntry("");
          setStatus("idle");
          return TOTP_PERIOD;
        }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const submit = (val: string) => {
    if (val === code) {
      setStatus("ok");
      setTimeout(onSuccess, 420);
    } else {
      setStatus("error");
      setTimeout(() => {
        setEntry("");
        setStatus("idle");
      }, 700);
    }
  };

  useEffect(() => {
    if (entry.length === 6 && status === "idle") submit(entry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  const R = 22;
  const C = 2 * Math.PI * R;
  const frac = left / TOTP_PERIOD;

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--db-text-mute)" }}>
        InstaSafe Authenticator
      </span>

      <div
        className="flex items-center gap-4 rounded-2xl border px-5 py-4"
        style={{ borderColor: "var(--db-border)", background: "var(--db-surface)" }}
      >
        <motion.div
          key={code}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-3xl font-bold tracking-[0.25em]"
          style={{ color: "var(--db-text)" }}
        >
          {code.slice(0, 3)} {code.slice(3)}
        </motion.div>
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 52 52" className="h-12 w-12 -rotate-90">
            <circle cx="26" cy="26" r={R} fill="none" stroke="var(--db-border)" strokeWidth="4" />
            <circle
              cx="26"
              cy="26"
              r={R}
              fill="none"
              stroke={left <= 5 ? "var(--db-danger)" : "var(--db-accent)"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - frac)}
              style={{ transition: reduce ? "none" : "stroke-dashoffset 1s linear, stroke 0.3s" }}
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center text-xs font-bold"
            style={{ color: "var(--db-text-dim)" }}
          >
            {left}
          </span>
        </div>
      </div>

      <p className="text-xs" style={{ color: "var(--db-text-dim)" }}>
        Enter the current code before it rotates
      </p>

      <OtpBoxes value={entry} setValue={setEntry} status={status} disabled={status === "ok"} />

      <button
        onClick={() => {
          setEntry(code);
        }}
        className="text-xs font-semibold underline-offset-2 transition-colors hover:underline"
        style={{ color: "var(--db-accent)" }}
      >
        Autofill current code
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Notification toast (SMS / Email)                                   */
/* ------------------------------------------------------------------ */

type Toast = { kind: "sms" | "email"; code: string };

function NotificationToast({ toast }: { toast: Toast }) {
  const isSms = toast.kind === "sms";
  return (
    <motion.div
      initial={{ opacity: 0, y: -18, x: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="pointer-events-none absolute right-3 top-3 z-20 w-[230px] overflow-hidden rounded-2xl border shadow-xl backdrop-blur"
      style={{
        background: "color-mix(in srgb, var(--db-surface) 92%, transparent)",
        borderColor: "var(--db-border)",
        boxShadow: "var(--db-shadow)",
      }}
      role="status"
    >
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: "1px solid var(--db-border)", background: "var(--db-surface-2)" }}
      >
        {isSms ? (
          <ChatCircleDots size={15} weight="fill" style={{ color: "var(--db-accent)" }} />
        ) : (
          <EnvelopeSimple size={15} weight="fill" style={{ color: "var(--db-accent)" }} />
        )}
        <span className="text-[11px] font-semibold" style={{ color: "var(--db-text)" }}>
          {isSms ? "Messages" : "Mail · InstaSafe"}
        </span>
        <span className="ml-auto text-[9px]" style={{ color: "var(--db-text-mute)" }}>
          now
        </span>
      </div>
      <div className="px-3 py-2.5">
        <div className="text-[11px]" style={{ color: "var(--db-text-dim)" }}>
          {isSms ? "InstaSafe verification" : "Your verification code"}
        </div>
        <div className="mt-1 text-[11px] leading-snug" style={{ color: "var(--db-text-dim)" }}>
          Your one-time code is{" "}
          <span className="font-mono text-sm font-bold tracking-wider" style={{ color: "var(--db-text)" }}>
            {toast.code}
          </span>
          . Expires in 5 min.
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hardware token flow — choose a key, plug it in, tap                */
/* ------------------------------------------------------------------ */

function KeyStick({ lit }: { lit: boolean }) {
  return (
    <svg width="124" height="46" viewBox="0 0 124 46" role="img" aria-label="USB security key">
      {/* metal connector (enters the port) */}
      <rect x="0" y="16" width="16" height="14" rx="2" fill="var(--db-text-mute)" />
      <rect x="3" y="19" width="10" height="3" rx="1" fill="var(--db-bg)" />
      {/* body */}
      <rect x="14" y="9" width="100" height="28" rx="14" fill="var(--db-surface-2)" stroke="var(--db-border)" />
      {/* keyhole logo */}
      <circle cx="38" cy="23" r="3.5" fill="var(--db-text-mute)" />
      {/* gold touch disc */}
      <circle cx="86" cy="23" r="11" fill={lit ? "var(--db-warning)" : "var(--db-text-mute)"} style={{ transition: "fill 0.3s" }} />
      <circle cx="86" cy="23" r="5" fill="var(--db-surface)" />
    </svg>
  );
}

function HardwareFlow({ onSuccess, reduce }: { onSuccess: () => void; reduce: boolean }) {
  const [phase, setPhase] = useState<"pick" | "inserting" | "touch">("pick");
  const [errId, setErrId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const pick = (k: (typeof HARDWARE_KEYS)[number]) => {
    if (!k.ok) {
      setErrId(k.id);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setErrId(null), 1600);
      return;
    }
    setErrId(null);
    setPhase("inserting");
    timer.current = setTimeout(() => setPhase("touch"), reduce ? 120 : 1000);
  };

  const tap = () => {
    timer.current = setTimeout(onSuccess, reduce ? 80 : 420);
  };

  if (phase === "pick") {
    return (
      <div className="flex w-full flex-col gap-2.5">
        <div className="text-center text-[13px] font-semibold" style={{ color: "var(--db-text)" }}>
          Choose your security key
        </div>
        <p className="mb-1 text-center text-[10px]" style={{ color: "var(--db-text-mute)" }}>
          Only an enrolled FIDO2 key will sign you in
        </p>
        {HARDWARE_KEYS.map((k) => {
          const shake = errId === k.id;
          return (
            <div key={k.id}>
              <motion.button
                onClick={() => pick(k)}
                aria-label={`${k.name}, ${k.ok ? "compatible — will sign you in" : "not supported — " + k.note}`}
                animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.35 }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-colors"
                style={{
                  borderColor: k.ok ? "var(--db-success)" : shake ? "var(--db-danger)" : "var(--db-border)",
                  background: k.ok
                    ? "color-mix(in srgb, var(--db-success) 9%, transparent)"
                    : "var(--db-surface)",
                  opacity: k.ok ? 1 : 0.72,
                }}
              >
                <span className="relative">
                  <Key
                    size={24}
                    weight="duotone"
                    style={{ color: k.ok ? "var(--db-success)" : "var(--db-text-mute)" }}
                  />
                  {k.ok && !reduce && (
                    <motion.span
                      className="absolute -inset-1 rounded-full"
                      style={{ border: "1.5px solid var(--db-success)" }}
                      animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </span>
                <span className="flex-1">
                  <span className="block text-[12px] font-semibold" style={{ color: "var(--db-text)" }}>
                    {k.name}
                  </span>
                  <span className="block text-[10px]" style={{ color: "var(--db-text-mute)" }}>
                    {k.spec}
                  </span>
                </span>
                <span
                  className="flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide"
                  style={
                    k.ok
                      ? { background: "color-mix(in srgb, var(--db-success) 16%, transparent)", color: "var(--db-success)" }
                      : { background: "var(--db-surface-2)", color: "var(--db-text-mute)" }
                  }
                >
                  {k.ok ? (
                    <>
                      <CheckCircle size={11} weight="fill" /> Compatible
                    </>
                  ) : (
                    <>
                      <XCircle size={11} weight="fill" /> Not supported
                    </>
                  )}
                </span>
              </motion.button>
              {shake && (
                <p className="mt-1 flex items-center gap-1 pl-1 text-[10px] font-medium" style={{ color: "var(--db-danger)" }}>
                  <WarningCircle size={11} weight="fill" /> {k.note} — pick the compatible key
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // inserting / touch
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
      <div className="text-[13px] font-semibold" style={{ color: "var(--db-text)" }}>
        {phase === "inserting" ? "Plugging in YubiKey 5 NFC…" : "Tap the gold disc"}
      </div>

      <div className="relative mx-auto flex h-16 w-[230px] items-center">
        {/* USB port */}
        <div
          className="z-10 flex h-14 w-6 shrink-0 items-center justify-center rounded-md"
          style={{ background: "var(--db-surface-2)", border: "1px solid var(--db-border)" }}
        >
          <span className="h-9 w-1.5 rounded" style={{ background: "var(--db-bg)" }} />
        </div>
        <motion.div
          className="-ml-1"
          initial={{ x: reduce ? 0 : 170, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="relative inline-block">
            <KeyStick lit={phase === "touch"} />
            {phase === "touch" && !reduce && (
              <motion.span
                className="absolute rounded-full"
                style={{ top: 12, left: 75, width: 22, height: 22, border: "2px solid var(--db-warning)" }}
                animate={{ opacity: [0.7, 0, 0.7], scale: [1, 1.7, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
          </span>
        </motion.div>
      </div>

      {phase === "inserting" ? (
        <p className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--db-text-mute)" }}>
          <CircleNotch size={13} weight="bold" className="animate-spin" /> Detecting key…
        </p>
      ) : (
        <button
          onClick={tap}
          aria-label="Tap the security key to confirm"
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-5 py-2.5 text-[12px] font-semibold transition-transform hover:scale-[1.03]"
          style={{ background: "var(--db-warning)", color: "#1a1206" }}
        >
          <Fingerprint size={14} weight="bold" /> Tap to confirm
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main simulator                                                     */
/* ------------------------------------------------------------------ */

export function MfaSimulator() {
  const reduce = useReducedMotion() ?? false;

  const [method, setMethod] = useState<Method | null>(null);
  const [stage, setStage] = useState<Stage>("pick");
  const [code, setCode] = useState(""); // generated SMS/email OTP
  const [entry, setEntry] = useState("");
  const [otpStatus, setOtpStatus] = useState<"idle" | "error" | "ok">("idle");
  const [toast, setToast] = useState<Toast | null>(null);

  const [pushPaired, setPushPaired] = useState(false);
  const [pairedDevice, setPairedDevice] = useState(DEVICES[0]);
  const [pushReq, setPushReq] = useState<{ ip: string; loc: string; dev: string } | null>(null);

  const [scanPct, setScanPct] = useState(0);
  const [bioFail, setBioFail] = useState(false);
  const [bioTried, setBioTried] = useState(false);
  const [used, setUsed] = useState<Set<Method>>(new Set());

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scanInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const holding = useRef(false);
  const after = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, reduce ? Math.min(ms, 120) : ms);
    timers.current.push(t);
  }, [reduce]);
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (scanInterval.current) {
      clearInterval(scanInterval.current);
      scanInterval.current = null;
    }
  };
  useEffect(() => () => clearTimers(), []);

  const resetToPick = () => {
    clearTimers();
    setMethod(null);
    setStage("pick");
    setEntry("");
    setOtpStatus("idle");
    setToast(null);
    setPushReq(null);
    setScanPct(0);
    setBioFail(false);
    setBioTried(false);
    holding.current = false;
  };

  /* OTP (sms/email) validation */
  useEffect(() => {
    if (stage !== "otp" || otpStatus !== "idle") return;
    if (entry.length === 6) {
      if (entry === code) {
        setOtpStatus("ok");
        after(succeed, 450);
      } else {
        setOtpStatus("error");
        after(() => {
          setEntry("");
          setOtpStatus("idle");
        }, 700);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry, stage]);

  const succeed = () => {
    setStage("success");
    if (method) setUsed((s) => new Set(s).add(method));
  };

  /* method selection */
  const choose = (m: Method) => {
    clearTimers();
    setMethod(m);
    setEntry("");
    setOtpStatus("idle");
    setToast(null);
    setPushReq(null);
    setScanPct(0);
    setBioFail(false);
    setBioTried(false);
    holding.current = false;

    if (m === "sms" || m === "email") {
      setStage("sending");
      const otp = genOtp();
      setCode(otp);
      after(() => {
        setToast({ kind: m === "sms" ? "sms" : "email", code: otp });
        setStage("otp");
      }, 1000);
    } else if (m === "totp") {
      setStage("totp");
    } else if (m === "push") {
      if (pushPaired) firePush();
      else setStage("push-setup");
    } else if (m === "fingerprint") {
      setStage("scan-bio");
    } else if (m === "hardware") {
      setStage("scan-key");
    }
  };

  const firePush = () => {
    setPushReq({ ip: rand(IPS), loc: rand(LOCATIONS), dev: rand(REQ_DEVICES) });
    setStage("push-waiting");
  };

  const startPairing = () => {
    setStage("push-pairing");
    const dev = rand(DEVICES);
    setPairedDevice(dev);
    after(() => {
      setPushPaired(true);
      firePush();
    }, 1500);
  };

  /* biometric — a quick tap fails, a sustained press-and-hold succeeds */
  const bioHoldStart = () => {
    if (holding.current) return;
    if (scanInterval.current) clearInterval(scanInterval.current);
    holding.current = true;
    setBioFail(false);
    setScanPct(0);
    const step = reduce ? 100 : 3.2; // ~1.25s to fill the ring
    scanInterval.current = setInterval(() => {
      setScanPct((p) => {
        const next = p + step;
        if (next >= 100) {
          if (scanInterval.current) clearInterval(scanInterval.current);
          scanInterval.current = null;
          holding.current = false;
          after(succeed, 200);
          return 100;
        }
        return next;
      });
    }, 40);
  };

  // released before the ring fills → too short, fail
  const bioHoldEnd = () => {
    if (!holding.current) return; // already completed → ignore
    holding.current = false;
    if (scanInterval.current) {
      clearInterval(scanInterval.current);
      scanInterval.current = null;
    }
    setBioFail(true);
    setBioTried(true);
  };

  /* live-region status text */
  const statusText: Record<Stage, string> = {
    pick: "Choose a verification method.",
    sending: "Sending your one-time code.",
    otp: "Enter the 6-digit code we sent you.",
    totp: "Enter the current authenticator code.",
    "push-setup": "Scan the QR code to pair your device.",
    "push-pairing": "Pairing your device.",
    "push-waiting": "Approve the sign-in request on your phone.",
    denied: "Sign-in request was rejected.",
    "scan-bio": "Place your finger on the sensor.",
    "scan-key": "Choose a compatible security key and plug it in.",
    success: "Access granted. You are signed in.",
  };

  const activeLabel = method ? METHODS.find((x) => x.id === method)?.label : "";

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border text-xs"
      style={{
        background: "var(--db-bg)",
        color: "var(--db-text)",
        borderColor: "var(--db-border)",
        boxShadow: "var(--db-shadow)",
      }}
    >
      {/* window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: "var(--db-sidebar)", borderBottom: "1px solid var(--db-border)" }}
      >
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span className="ml-2 flex items-center gap-1.5 font-mono text-[10px]" style={{ color: "var(--db-text-mute)" }}>
          <LockKey size={12} weight="fill" /> secure.instasafe.com/login
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--db-success)" }}
            animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[9px]" style={{ color: "var(--db-success)" }}>
            MFA
          </span>
        </span>
      </div>

      {/* sr-only live region */}
      <p className="sr-only" aria-live="polite">
        {statusText[stage]}
      </p>

      {/* notification toasts */}
      <AnimatePresence>{toast && <NotificationToast toast={toast} />}</AnimatePresence>

      <div className="grid gap-px lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]" style={{ background: "var(--db-border)" }}>
        {/* -------- left: identity + method picker -------- */}
        <div className="p-5" style={{ background: "var(--db-bg)" }}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: "color-mix(in srgb, var(--db-accent) 18%, transparent)", color: "var(--db-accent)" }}
            >
              DM
            </div>
            <div>
              <div className="text-[13px] font-semibold" style={{ color: "var(--db-text)" }}>
                Welcome back
              </div>
              <div className="text-[11px]" style={{ color: "var(--db-text-mute)" }}>
                {EMAIL_MASK}
              </div>
            </div>
            <span
              className="ml-auto flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold"
              style={{ background: "color-mix(in srgb, var(--db-success) 14%, transparent)", color: "var(--db-success)" }}
            >
              <CheckCircle size={11} weight="fill" /> Password OK
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--db-text-mute)" }}>
              Step 2 · Verify identity
            </span>
            {!method && (
              <motion.span
                className="ml-auto flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold"
                style={{ background: "color-mix(in srgb, var(--db-accent) 16%, transparent)", color: "var(--db-accent)" }}
                animate={reduce ? {} : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <CursorClick size={11} weight="fill" /> Try one
              </motion.span>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {METHODS.map((m) => {
              const isActive = method === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => choose(m.id)}
                  aria-pressed={isActive}
                  aria-label={`${m.label} — ${m.sub}`}
                  className="group relative flex cursor-pointer flex-col gap-1.5 rounded-xl border p-3 text-left transition-colors"
                  style={{
                    borderColor: isActive ? "var(--db-accent)" : "var(--db-border)",
                    background: isActive
                      ? "color-mix(in srgb, var(--db-accent) 12%, transparent)"
                      : "var(--db-surface)",
                  }}
                >
                  <span className="flex items-center justify-between">
                    <m.Icon
                      size={20}
                      weight="duotone"
                      style={{ color: isActive ? "var(--db-accent)" : "var(--db-text-dim)" }}
                    />
                    {used.has(m.id) && (
                      <CheckCircle size={14} weight="fill" style={{ color: "var(--db-success)" }} />
                    )}
                  </span>
                  <span className="text-[12px] font-semibold leading-tight" style={{ color: "var(--db-text)" }}>
                    {m.label}
                  </span>
                  <span className="text-[10px] leading-tight" style={{ color: "var(--db-text-mute)" }}>
                    {m.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {used.size > 0 && (
            <p className="mt-3 text-[10px]" style={{ color: "var(--db-text-mute)" }}>
              {used.size} of {METHODS.length} methods tried — try them all.
            </p>
          )}
        </div>

        {/* -------- right: dynamic verification stage -------- */}
        <div className="relative flex min-h-[330px] flex-col p-5" style={{ background: "var(--db-bg)" }}>
          <AnimatePresence mode="wait">
            {/* idle / pick */}
            {stage === "pick" && (
              <motion.div
                key="pick"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col items-center justify-center gap-3 text-center"
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border"
                  style={{ borderColor: "var(--db-border)", background: "var(--db-surface)" }}
                >
                  <LockKey size={30} weight="duotone" style={{ color: "var(--db-accent)" }} />
                </motion.div>
                <p className="max-w-[220px] text-[13px] font-medium" style={{ color: "var(--db-text-dim)" }}>
                  Pick a method on the left to watch the second factor play out — live.
                </p>
                <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--db-text-mute)" }}>
                  <ArrowRight size={13} weight="bold" className="rotate-180" /> no real account needed
                </span>
              </motion.div>
            )}

            {/* sending */}
            {stage === "sending" && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col items-center justify-center gap-3 text-center"
              >
                <CircleNotch size={30} weight="bold" className="animate-spin" style={{ color: "var(--db-accent)" }} />
                <p className="text-[13px]" style={{ color: "var(--db-text-dim)" }}>
                  Sending a code to{" "}
                  <span className="font-semibold" style={{ color: "var(--db-text)" }}>
                    {method === "sms" ? PHONE_MASK : EMAIL_MASK}
                  </span>
                </p>
              </motion.div>
            )}

            {/* otp (sms + email share this) */}
            {stage === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-1 flex-col items-center justify-center gap-4 text-center"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "color-mix(in srgb, var(--db-accent) 14%, transparent)" }}
                >
                  {method === "sms" ? (
                    <ChatCircleDots size={24} weight="duotone" style={{ color: "var(--db-accent)" }} />
                  ) : (
                    <EnvelopeSimple size={24} weight="duotone" style={{ color: "var(--db-accent)" }} />
                  )}
                </div>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: "var(--db-text)" }}>
                    Enter the code from your {method === "sms" ? "SMS" : "email"}
                  </div>
                  <div className="mt-0.5 text-[11px]" style={{ color: "var(--db-text-mute)" }}>
                    Sent to {method === "sms" ? PHONE_MASK : EMAIL_MASK} · check the notification ↗
                  </div>
                </div>
                <OtpBoxes value={entry} setValue={setEntry} status={otpStatus} disabled={otpStatus === "ok"} />
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setEntry(code)}
                    className="text-xs font-semibold transition-colors hover:underline"
                    style={{ color: "var(--db-accent)" }}
                  >
                    Autofill code
                  </button>
                  <button
                    onClick={() => method && choose(method)}
                    className="flex items-center gap-1 text-xs transition-colors hover:underline"
                    style={{ color: "var(--db-text-mute)" }}
                  >
                    <ArrowClockwise size={12} /> Resend
                  </button>
                </div>
                {otpStatus === "error" && (
                  <span className="flex items-center gap-1 text-[11px] font-medium" style={{ color: "var(--db-danger)" }}>
                    <WarningCircle size={13} weight="fill" /> Incorrect code — try again
                  </span>
                )}
              </motion.div>
            )}

            {/* totp */}
            {stage === "totp" && (
              <motion.div
                key="totp"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-1 items-center justify-center"
              >
                <TotpFlow onSuccess={succeed} reduce={reduce} />
              </motion.div>
            )}

            {/* push setup (QR) */}
            {stage === "push-setup" && (
              <motion.div
                key="push-setup"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-1 flex-col items-center justify-center gap-3 text-center"
              >
                <div className="text-[13px] font-semibold" style={{ color: "var(--db-text)" }}>
                  One-time setup
                </div>
                <p className="max-w-[230px] text-[11px]" style={{ color: "var(--db-text-mute)" }}>
                  Scan with the InstaSafe Authenticator app to pair this device.
                </p>
                <button
                  onClick={startPairing}
                  aria-label="Simulate scanning the QR code to pair"
                  className="group relative cursor-pointer rounded-2xl border p-2 transition-transform hover:scale-[1.03]"
                  style={{ borderColor: "var(--db-border)", background: "var(--db-surface)" }}
                >
                  <QrGraphic />
                  {!reduce && (
                    <motion.span
                      className="pointer-events-none absolute inset-x-2 h-0.5 rounded"
                      style={{ background: "var(--db-accent)", boxShadow: "0 0 10px 1px var(--db-accent)" }}
                      animate={{ top: ["8%", "90%", "8%"] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </button>
                <span
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold"
                  style={{ background: "color-mix(in srgb, var(--db-accent) 14%, transparent)", color: "var(--db-accent)" }}
                >
                  <QrCode size={13} weight="fill" /> Click the QR to scan
                </span>
              </motion.div>
            )}

            {/* pairing */}
            {stage === "push-pairing" && (
              <motion.div
                key="push-pairing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col items-center justify-center gap-3 text-center"
              >
                <CircleNotch size={30} weight="bold" className="animate-spin" style={{ color: "var(--db-accent)" }} />
                <p className="text-[13px]" style={{ color: "var(--db-text-dim)" }}>
                  Pairing{" "}
                  <span className="font-semibold" style={{ color: "var(--db-text)" }}>
                    {pairedDevice}
                  </span>
                  …
                </p>
              </motion.div>
            )}

            {/* push waiting (approve / reject) */}
            {stage === "push-waiting" && pushReq && (
              <motion.div
                key="push-waiting"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-1 flex-col items-center justify-center gap-3"
              >
                <div className="flex items-center gap-2 text-center">
                  <motion.span
                    animate={reduce ? {} : { rotate: [0, -12, 12, -8, 8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }}
                  >
                    <BellRinging size={18} weight="fill" style={{ color: "var(--db-accent)" }} />
                  </motion.span>
                  <span className="text-[12px] font-semibold" style={{ color: "var(--db-text)" }}>
                    Push sent to {pairedDevice}
                  </span>
                </div>

                <div
                  className="w-full max-w-[280px] overflow-hidden rounded-2xl border"
                  style={{ borderColor: "var(--db-border)", background: "var(--db-surface)" }}
                >
                  <div className="px-4 pt-3.5 text-center">
                    <div className="text-[13px] font-bold" style={{ color: "var(--db-text)" }}>
                      Approve sign-in?
                    </div>
                    <div className="mt-0.5 text-[10px]" style={{ color: "var(--db-text-mute)" }}>
                      Only approve if this is you
                    </div>
                  </div>
                  <div className="mt-2.5 space-y-1.5 px-4 pb-3">
                    {[
                      { Icon: Monitor, label: "Device", val: pushReq.dev },
                      { Icon: Globe, label: "IP address", val: pushReq.ip },
                      { Icon: MapPin, label: "Location", val: pushReq.loc },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center gap-2 text-[11px]">
                        <r.Icon size={14} weight="duotone" style={{ color: "var(--db-text-mute)" }} />
                        <span style={{ color: "var(--db-text-mute)" }}>{r.label}</span>
                        <span className="ml-auto font-medium" style={{ color: "var(--db-text-dim)" }}>
                          {r.val}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-px" style={{ background: "var(--db-border)" }}>
                    <button
                      onClick={() => setStage("denied")}
                      className="flex cursor-pointer items-center justify-center gap-1.5 py-3 text-[12px] font-bold transition-colors"
                      style={{ background: "var(--db-surface)", color: "var(--db-danger)" }}
                    >
                      <XCircle size={15} weight="fill" /> Reject
                    </button>
                    <button
                      onClick={succeed}
                      className="flex cursor-pointer items-center justify-center gap-1.5 py-3 text-[12px] font-bold transition-colors"
                      style={{ background: "var(--db-surface)", color: "var(--db-success)" }}
                    >
                      <CheckCircle size={15} weight="fill" /> Approve
                    </button>
                  </div>
                </div>
                <p className="text-[10px]" style={{ color: "var(--db-text-mute)" }}>
                  Tap a button as if you were on your phone
                </p>
              </motion.div>
            )}

            {/* denied */}
            {stage === "denied" && (
              <motion.div
                key="denied"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col items-center justify-center gap-3 text-center"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "color-mix(in srgb, var(--db-danger) 14%, transparent)" }}
                >
                  <XCircle size={30} weight="fill" style={{ color: "var(--db-danger)" }} />
                </div>
                <div className="text-[14px] font-bold" style={{ color: "var(--db-text)" }}>
                  Sign-in blocked
                </div>
                <p className="max-w-[230px] text-[11px]" style={{ color: "var(--db-text-mute)" }}>
                  You rejected the request, so access was denied. Nothing was logged in.
                </p>
                <div className="mt-1 flex gap-2">
                  <button
                    onClick={firePush}
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold transition-transform hover:scale-[1.03]"
                    style={{ background: "var(--db-accent)", color: "#fff" }}
                  >
                    <ArrowClockwise size={13} weight="bold" /> Send again
                  </button>
                  <button
                    onClick={resetToPick}
                    className="cursor-pointer rounded-lg border px-3 py-2 text-[12px] font-semibold transition-colors"
                    style={{ borderColor: "var(--db-border)", color: "var(--db-text-dim)" }}
                  >
                    Other method
                  </button>
                </div>
              </motion.div>
            )}

            {/* biometric — quick tap fails, press-and-hold succeeds */}
            {stage === "scan-bio" && (
              <motion.div
                key="scan-bio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col items-center justify-center gap-4 text-center"
              >
                <div className="text-[13px] font-semibold" style={{ color: "var(--db-text)" }}>
                  {bioFail
                    ? "Hold longer this time"
                    : scanPct >= 100
                      ? "Fingerprint matched"
                      : scanPct > 0
                        ? "Reading your print…"
                        : "Place your finger on the sensor"}
                </div>

                <motion.button
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture?.(e.pointerId);
                    bioHoldStart();
                  }}
                  onPointerUp={bioHoldEnd}
                  onPointerLeave={bioHoldEnd}
                  onPointerCancel={bioHoldEnd}
                  onKeyDown={(e) => {
                    if ((e.key === " " || e.key === "Enter") && !e.repeat) {
                      e.preventDefault();
                      bioHoldStart();
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.key === " " || e.key === "Enter") bioHoldEnd();
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                  aria-label="Fingerprint sensor — press and hold to scan"
                  animate={
                    bioFail
                      ? { x: [0, -7, 7, -5, 5, 0], scale: 1 }
                      : { x: 0, scale: scanPct > 0 && scanPct < 100 ? 0.95 : 1 }
                  }
                  transition={{ duration: bioFail ? 0.35 : 0.12 }}
                  className="relative flex h-24 w-24 cursor-pointer touch-none select-none items-center justify-center rounded-full border"
                  style={{
                    borderColor: bioFail
                      ? "var(--db-danger)"
                      : scanPct > 0
                        ? "var(--db-accent)"
                        : "var(--db-border)",
                    background: "var(--db-surface)",
                  }}
                >
                  {/* idle invite pulse */}
                  {scanPct === 0 && !bioFail && !reduce && (
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ border: "2px solid var(--db-accent)" }}
                      animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.18, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <Fingerprint
                    size={56}
                    weight="duotone"
                    style={{
                      color: bioFail
                        ? "var(--db-danger)"
                        : scanPct >= 100
                          ? "var(--db-success)"
                          : "var(--db-accent)",
                    }}
                  />
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="47"
                      fill="none"
                      stroke={bioFail ? "var(--db-danger)" : "var(--db-accent)"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 47}
                      strokeDashoffset={2 * Math.PI * 47 * (1 - scanPct / 100)}
                      style={{ transition: "stroke-dashoffset 0.05s linear, stroke 0.3s" }}
                    />
                  </svg>
                </motion.button>

                {bioFail ? (
                  <span className="flex max-w-[230px] items-center gap-1.5 text-[11px] font-medium" style={{ color: "var(--db-danger)" }}>
                    <WarningCircle size={14} weight="fill" className="shrink-0" />
                    Too quick — press and <strong className="font-bold">hold</strong> until the ring fills
                  </span>
                ) : (
                  <p className="text-[11px]" style={{ color: "var(--db-text-mute)" }}>
                    {scanPct >= 100
                      ? "Access granted"
                      : scanPct > 0
                        ? "Keep holding…"
                        : bioTried
                          ? "Press and hold the sensor"
                          : "Tap the sensor to scan"}
                  </p>
                )}
              </motion.div>
            )}

            {/* hardware token — choose a key, plug in, tap */}
            {stage === "scan-key" && (
              <motion.div
                key="scan-key"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1"
              >
                <HardwareFlow onSuccess={succeed} reduce={reduce} />
              </motion.div>
            )}

            {/* success */}
            {stage === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-1 flex-col items-center justify-center gap-3 text-center"
              >
                <motion.div
                  initial={reduce ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 16 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "color-mix(in srgb, var(--db-success) 16%, transparent)" }}
                >
                  <SealCheck size={34} weight="fill" style={{ color: "var(--db-success)" }} />
                </motion.div>
                <div>
                  <div className="text-[15px] font-bold" style={{ color: "var(--db-text)" }}>
                    Access granted
                  </div>
                  <div className="mt-0.5 text-[11px]" style={{ color: "var(--db-text-mute)" }}>
                    Verified with {activeLabel} · session secured
                  </div>
                </div>
                <div
                  className="flex w-full max-w-[250px] items-center gap-2 rounded-xl border px-3 py-2 text-left text-[11px]"
                  style={{ borderColor: "var(--db-border)", background: "var(--db-surface)" }}
                >
                  <SealCheck size={16} weight="duotone" style={{ color: "var(--db-success)" }} />
                  <div>
                    <div style={{ color: "var(--db-text-dim)" }}>{EMAIL_MASK}</div>
                    <div className="text-[10px]" style={{ color: "var(--db-text-mute)" }}>
                      Zero Trust session · device trusted · {rand(LOCATIONS)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetToPick}
                  className="mt-1 flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-semibold transition-transform hover:scale-[1.03]"
                  style={{ background: "var(--db-accent)", color: "#fff" }}
                >
                  <ArrowClockwise size={13} weight="bold" /> Log in again — try another method
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
