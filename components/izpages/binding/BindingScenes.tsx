"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  Certificate,
  Cpu,
  Fingerprint,
  Clock,
  Prohibit,
  ShieldCheck,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   Scenes for /zero-trust-features/device-binding.

   Built from the supplied reference, translated into the .iz system:
   the reference's card chrome, soft shadows and rounded pills become
   our hairline plates, mono labels and ink-on-tint states.

   Two things in the reference are deliberately NOT here:

     · the bottom stats row (3,842 devices registered · 3,215
       approved · 128 blocked) — those are customer/device counts,
       which this site does not publish. Standing rule.
     · the "How Device Binding Works" 1-2-3-4-5 icon strip. Five
       numbered steps in a row is the flowchart every other section
       on the site already avoids; the approval flow beside the
       device record makes the same point with real timestamps.
   ============================================================ */

/* ---------- the bound-device record ---------- */
const RECORD: { icon: Icon; k: string; v: string; tone?: "ok" | "mute" }[] = [
  { icon: Fingerprint, k: "user", v: "arun.k@instasafe.com" },
  { icon: Cpu, k: "os", v: "macOS 14.4.1" },
  { icon: ShieldCheck, k: "status", v: "Compliant", tone: "ok" },
  { icon: Clock, k: "last seen", v: "09:41 IST · today" },
  { icon: Certificate, k: "certificate", v: "ISSUED", tone: "ok" },
  { icon: Cpu, k: "binding", v: "Hardware + OS" },
];

/* ---------- the approval flow ---------- */
const FLOW: { label: string; t: string }[] = [
  { label: "Device submitted", t: "09:35:12" },
  { label: "Identity verified", t: "09:35:18" },
  { label: "Posture checked", t: "09:35:26" },
  { label: "Policy evaluated", t: "09:35:31" },
  { label: "Certificate issued", t: "09:35:33" },
  { label: "Access allowed", t: "09:35:34" },
];

export function BindingHeroScene() {
  /* The flow ticks through once when it first comes into view, so the
     scene arrives as a sequence rather than a finished list. Base state
     is COMPLETE — a reader who never triggers it, or who has reduced
     motion on, still sees every step. */
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(FLOW.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setStep(0);
        FLOW.forEach((_, i) => {
          timers.push(setTimeout(() => setStep(i + 1), 260 + i * 240));
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      timers = [];
    };
  }, []);

  return (
    <div className="dbs" ref={ref}>
      {/* ---- the record ---- */}
      <div className="dbs-card">
        <div className="dbs-card-h">
          {/* the real machine, small, in the card's own header — the
              record is about one specific laptop and a photograph says
              that faster than a drawn rectangle does */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="dbs-thumb"
            src="/hero/macbook14pro.png"
            alt=""
            width={500}
            height={500}
            decoding="async"
          />
          <span className="dbs-card-t">
            <b>MacBook Pro 14&quot;</b>
            <em>MBP-14-8F3X-2K7Q</em>
          </span>
          <span className="dbs-badge">approved</span>
        </div>

        <dl className="dbs-rows">
          {RECORD.map(({ icon: I, k, v, tone }) => (
            <div className="dbs-row" key={k}>
              <dt>
                <I size={13} weight="regular" aria-hidden="true" />
                {k}
              </dt>
              <dd className={tone === "ok" ? "is-ok" : undefined}>{v}</dd>
            </div>
          ))}
        </dl>

        <p className="dbs-verdict">
          <CheckCircle size={15} weight="fill" aria-hidden="true" />
          <span>
            <b>Bound and trusted.</b> Access allowed as per policy.
          </span>
        </p>
      </div>

      {/* ---- the approval flow ---- */}
      <div className="dbs-flow">
        <span className="dbs-flow-lab">
          Approval flow<i aria-hidden="true">_</i>
        </span>
        <ol>
          {FLOW.map((f, i) => (
            <li key={f.label} className={i < step ? "is-done" : ""}>
              <span className="dbs-flow-dot" aria-hidden="true" />
              <span className="dbs-flow-b">
                <b>{f.label}</b>
                <em>{f.t}</em>
              </span>
              <CheckCircle size={14} weight="fill" className="dbs-flow-ck" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ============================================================
   Four capability cards — the reference's mid row, on our plate
   grammar rather than four floating shadowed boxes.
   ============================================================ */
const PILLARS: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Cpu,
    title: "Hardware-bound",
    body: "The certificate is tied to MAC, serial and hardware UUID — not to a cookie a browser can be talked out of.",
  },
  {
    icon: Fingerprint,
    title: "Policy-driven",
    body: "Your rules decide what a bound device is allowed to reach, per user group. Binding is a condition, not a blanket grant.",
  },
  {
    icon: Clock,
    title: "Continuously checked",
    body: "Re-validated on every session and during it. A device that stops matching its binding loses the session it already had.",
  },
  {
    icon: Prohibit,
    title: "Revocable instantly",
    body: "One click withdraws the certificate everywhere. A lost laptop stops being a way in before the ticket is closed.",
  },
];

export function BindingPillars() {
  return (
    <ul className="dbp">
      {PILLARS.map(({ icon: I, title, body }) => (
        <li key={title} className="dbp-cell">
          <span className="dbp-ic" aria-hidden="true">
            <I size={18} weight="regular" />
          </span>
          <h3>{title}</h3>
          <p>{body}</p>
        </li>
      ))}
    </ul>
  );
}
