"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowsClockwise,
  Bug,
  CaretRight,
  CheckCircle,
  DeviceMobile,
  Fingerprint,
  HardDrives,
  Lock,
  Monitor,
  Password,
  ShieldCheck,
  ShieldWarning,
  Usb,
  WarningCircle,
  WifiHigh,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import "./posturehero.css";

/* ============================================================
   PostureScenes — the visuals for the device-posture page.

   PostureHeroScene is one real verdict, shown twice: as the result an
   admin reads (a score, a category list, a compliance state) and as
   the log the agent wrote while producing it. The two halves are the
   same 09:41 evaluation, which is the point — the summary is not a
   dashboard someone maintains, it is the transcript, totted up.

   STATIC. DeviceTester below carries the interaction, per the
   interaction-placement rule.

   THE LAPTOP IS DRAWN, not photographed. If a photoreal shell is
   dropped in later it goes behind `.pos-lap-shell` and the terminal
   keeps its own markup, because the log has to stay real text — it is
   the densest evidence on the page and must not be a picture of text.
   ============================================================ */

type Row = { label: string; ok: boolean; Icon: Icon };

const CATEGORIES: Row[] = [
  { label: "OS & patching", ok: true, Icon: ArrowsClockwise },
  { label: "Antivirus", ok: true, Icon: ShieldCheck },
  { label: "Firewall", ok: true, Icon: WifiHigh },
  { label: "Disk encryption", ok: true, Icon: HardDrives },
  { label: "Secure boot", ok: true, Icon: Fingerprint },
  { label: "Screen lock", ok: true, Icon: Lock },
  { label: "USB storage", ok: false, Icon: Usb },
  { label: "Developer tools", ok: false, Icon: Bug },
  { label: "OS version", ok: false, Icon: Monitor },
];

type LogLine = { t: string; label: string; result: string; state: "ok" | "no" | "score" };
const LOG: LogLine[] = [
  { t: "09:41:12", label: "Device identity", result: "Verified", state: "ok" },
  { t: "09:41:13", label: "OS & patching", result: "Passed", state: "ok" },
  { t: "09:41:13", label: "Antivirus", result: "Passed", state: "ok" },
  { t: "09:41:14", label: "Firewall", result: "Passed", state: "ok" },
  { t: "09:41:14", label: "Disk encryption", result: "Passed", state: "ok" },
  { t: "09:41:15", label: "Secure boot", result: "Passed", state: "ok" },
  { t: "09:41:15", label: "Screen lock", result: "Passed", state: "ok" },
  { t: "09:41:15", label: "USB storage", result: "Failed", state: "no" },
  { t: "09:41:16", label: "Developer tools", result: "Failed", state: "no" },
  { t: "09:41:16", label: "Risk score", result: "62 / 100", state: "score" },
];

const SCORE = 62;

export function PostureHeroScene() {
  return (
    <div className="pos-scene" aria-hidden="true">
      {/* ---------- the verdict an admin reads ---------- */}
      <div className="pos-card pos-result">
        <div className="pos-card-h">
          <span className="pos-mono">Device posture result</span>
          <span className="pos-risk">
            <ShieldWarning size={13} weight="regular" />
            Risk: high
          </span>
        </div>

        <div className="pos-verdict">
          {/* the ring is a conic sweep, so the score is a quantity you
              can see before you read it */}
          <div className="pos-gauge" style={{ ["--pos-score" as string]: SCORE }}>
            <span className="pos-gauge-in">
              <b>{SCORE}</b>
              <i>/100</i>
            </span>
          </div>
          <div className="pos-verdict-t">
            <b>Not compliant</b>
            <span>Device does not meet your organisation&apos;s security policy.</span>
          </div>
        </div>

        <div className="pos-cats-h">
          <span className="pos-mono pos-dim">Posture category</span>
          <span className="pos-mono pos-dim">Status</span>
        </div>
        {CATEGORIES.map((c) => (
          <div className="pos-cat" key={c.label}>
            <c.Icon size={15} weight="regular" />
            <span className="pos-mono">{c.label}</span>
            <span className={c.ok ? "pos-status ok" : "pos-status no"}>
              {c.ok ? <CheckCircle size={14} weight="fill" /> : <WarningCircle size={14} weight="fill" />}
              {c.ok ? "Compliant" : "Non-compliant"}
            </span>
          </div>
        ))}

        <div className="pos-all">
          View all 25 health-check types
          <CaretRight size={13} weight="bold" />
        </div>
      </div>

      {/* ---------- the same evaluation, as the agent wrote it ---------- */}
      <div className="pos-right">
        <div className="pos-lap">
          {/* The shell is a photograph; the screen is live markup
              positioned into it. Bounds were measured off the asset
              rather than eyeballed — the black panel sits at
              11.08% / 12.28% with a 77.83% × 48.72% box. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pos-lap-img" src="/hero/laptop-open.png" alt="" width={1254} height={1254} loading="eager" decoding="async" />
          <div className="pos-lap-screen">
            <div className="pos-term">
              <div className="pos-term-h">
                <span>Posture evaluation</span>
                <span className="pos-live">
                  <i />
                  Live
                </span>
              </div>
              {LOG.map((l) => (
                <div className={`pos-log ${l.state}`} key={l.t + l.label}>
                  <span className="pos-log-t">{l.t}</span>
                  <s />
                  <span className="pos-log-l">{l.label}</span>
                  <span className="pos-log-r">{l.result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pos-note">
          <span className="pos-note-ic">
            <LogoMark size={18} />
          </span>
          <div className="pos-note-t">
            <b>Evaluated before access.</b>
            <b>Monitored during the session.</b>
            <b>Access revoked on risk.</b>
          </div>
          <div className="pos-note-r">
            <span className="pos-mono pos-dim">Last check</span>
            <span className="pos-mono">09:41:16 IST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   The counts, and a sample of what is actually checked.
   ============================================================ */

const SAMPLE: { label: string; Icon: Icon }[] = [
  { label: "OS & patching", Icon: ArrowsClockwise },
  { label: "Antivirus", Icon: ShieldCheck },
  { label: "Firewall", Icon: WifiHigh },
  { label: "Disk encryption", Icon: HardDrives },
  { label: "Secure boot", Icon: Fingerprint },
  { label: "Screen lock", Icon: Lock },
  { label: "USB storage", Icon: Usb },
  { label: "Developer tools", Icon: Bug },
  { label: "OS version", Icon: Monitor },
  { label: "Network profile", Icon: WifiHigh },
  { label: "Virtual machine", Icon: DeviceMobile },
  { label: "And 15 more", Icon: ArrowRight },
];

export function PostureStrip() {
  return (
    <div className="pos-strip">
      <div className="iz-wrap pos-strip-in">
        <div className="pos-figs">
          <div className="pos-fig">
            <b>25</b>
            <span>Health-check types</span>
          </div>
          <div className="pos-fig">
            <b>144</b>
            <span>Named rules</span>
          </div>
        </div>
        <div className="pos-sample">
          <span className="pos-mono pos-dim">Some health-check types</span>
          <div className="pos-sample-grid">
            {SAMPLE.map((s) => (
              <span className="pos-sample-i" key={s.label}>
                <s.Icon size={15} weight="regular" />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DeviceTester — the signature interactive.

   The storyboard's spec, verbatim: toggle a device's state and watch
   allow flip to deny with the failing rule NAMED. The naming is the
   part that matters. A red cross teaches nobody anything; "rule 041 ·
   disk-encryption-required" is the thing an administrator can act on,
   and it is what makes this a tester rather than a toy.
   ============================================================ */

type Check = {
  id: string;
  label: string;
  Icon: Icon;
  /** the rule this check trips when it fails */
  rule: string;
  /** points it contributes to the score */
  weight: number;
  /** whether failing it is on its own disqualifying */
  fatal?: boolean;
};

const CHECKS: Check[] = [
  { id: "av", label: "Antivirus running", Icon: ShieldCheck, rule: "012 · endpoint-protection-active", weight: 18, fatal: true },
  { id: "disk", label: "Disk encrypted", Icon: HardDrives, rule: "041 · disk-encryption-required", weight: 18, fatal: true },
  { id: "patch", label: "OS patch level current", Icon: ArrowsClockwise, rule: "007 · os-patch-window-30d", weight: 16 },
  { id: "fw", label: "Firewall on", Icon: WifiHigh, rule: "023 · host-firewall-enabled", weight: 14 },
  { id: "lock", label: "Screen lock set", Icon: Password, rule: "056 · screen-lock-max-5m", weight: 10 },
  { id: "root", label: "Not rooted or jailbroken", Icon: Bug, rule: "003 · device-integrity", weight: 24, fatal: true },
];

export function DeviceTester() {
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CHECKS.map((c) => [c.id, true]))
  );

  const { score, failed, verdict } = useMemo(() => {
    const bad = CHECKS.filter((c) => !state[c.id]);
    const lost = bad.reduce((n, c) => n + c.weight, 0);
    const s = Math.max(0, 100 - lost);
    const v = bad.some((c) => c.fatal) ? "deny" : bad.length ? "limited" : "allow";
    return { score: s, failed: bad, verdict: v as "allow" | "limited" | "deny" };
  }, [state]);

  return (
    <div className="pos-tester">
      <div className="pos-tester-l">
        <span className="pos-mono pos-dim">Toggle the device&apos;s state</span>
        <div className="pos-toggles">
          {CHECKS.map((c) => {
            const on = state[c.id];
            return (
              <button
                key={c.id}
                type="button"
                role="switch"
                aria-checked={on}
                className={`pos-toggle${on ? " on" : ""}`}
                onClick={() => setState((s) => ({ ...s, [c.id]: !s[c.id] }))}
              >
                <span className="pos-toggle-ic">
                  <c.Icon size={16} weight="regular" />
                </span>
                <span className="pos-toggle-t">{c.label}</span>
                <span className="pos-switch" aria-hidden="true">
                  <i />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`pos-tester-r ${verdict}`}>
        <div className="pos-gauge pos-gauge--lg" style={{ ["--pos-score" as string]: score }}>
          <span className="pos-gauge-in">
            <b>{score}</b>
            <i>/100</i>
          </span>
        </div>

        <div className="pos-out">
          <span className="pos-out-v">
            {verdict === "allow" ? "Access granted" : verdict === "limited" ? "Limited access" : "Access denied"}
          </span>
          <p>
            {verdict === "allow"
              ? "Every named rule passed. The tunnel opens, and posture keeps being re-checked while it is open."
              : verdict === "limited"
                ? "Nothing disqualifying failed, so the device can be given a reduced set of applications rather than none."
                : "A rule the policy treats as disqualifying failed. No tunnel opens, and the user is told which one."}
          </p>
        </div>

        <div className="pos-rules">
          <span className="pos-mono pos-dim">Failing rules</span>
          {failed.length === 0 ? (
            <span className="pos-rule ok">
              <CheckCircle size={14} weight="fill" />
              none — 6 of 6 passed
            </span>
          ) : (
            failed.map((c) => (
              <span className={`pos-rule${c.fatal ? " fatal" : ""}`} key={c.id}>
                <WarningCircle size={14} weight="fill" />
                {c.rule}
                {c.fatal && <b>blocking</b>}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
