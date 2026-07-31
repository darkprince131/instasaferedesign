"use client";

import { useEffect, useRef, useState } from "react";
import {
  UploadSimple,
  FileCsv,
  Sparkle,
  SpinnerGap,
  CursorClick,
  AirplaneTilt,
  DeviceMobile,
  LockKey,
  MapPin,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   IzScoreProcess — TIER 2 SECTION  (lab 00al)

   Recreation of "A single score trained on your traffic" from
   fingerprint.com/products/smart-signals/, analysed frame by frame
   from the recording plus a DOM probe of the live section.

   THE THING THAT MAKES IT WORK — the progress bars ARE the layout.
   Two step tabs sit ABOVE the stage and two BELOW it, and each tab
   carries a thin track under its label. Read top-left → top-right →
   bottom-left → bottom-right, the four tracks form one continuous
   progress bar wrapped around the animation. Completed steps stay
   filled; the active one is filling; the rest are empty. So the
   chrome tells you where you are in the process without a single
   number or dot.

   The fill is also the CLOCK: it's a CSS animation, and its
   `animationend` advances the step. No timers to keep in sync with
   the visual — the thing you can see is the thing that's counting.
   (Same mechanism as ScrollSteps 00o.)

   Verified media on their build: svg only — no canvas, no video, no
   Lottie. Every scene below is DOM + CSS for the same reason.

   Our version runs the InstaSafe equivalent: a risk score trained on
   your own access history rather than a fraud model.
   ============================================================ */

const STEP_MS = 4200;

const STEPS = ["Import your access logs", "Baseline builds automatically", "Review suggested weights", "Enforce with one click"];

type Rec = { label: string; Icon: Icon; from: number; to: number };

const RECS: Rec[] = [
  { label: "Impossible travel", Icon: AirplaneTilt, from: 7, to: 9 },
  { label: "Unmanaged device", Icon: DeviceMobile, from: 7, to: 8 },
  { label: "MFA retries", Icon: LockKey, from: 6, to: 8 },
  { label: "New geography", Icon: MapPin, from: 5, to: 6 },
];

const CARDS = [
  {
    h: "Score risk without building a model.",
    p: "Twenty-four enforcement signals are weighted and combined into one number, ready to drive the policy engine you already run.",
  },
  {
    h: "Trained on your own traffic.",
    p: "Upload historical access events and InstaSafe returns weights tuned to how your people actually work — not to someone else's benchmark.",
  },
  {
    h: "You stay in control.",
    p: "Preview which sessions would have been challenged before anything goes live. Nothing changes until your team approves it.",
  },
];

/* Deterministic filler "data" for the processing scene — no
   Math.random, so SSR and the client agree (house rule). */
const DATA_ROWS = Array.from({ length: 11 }, (_, r) =>
  Array.from({ length: 26 }, (_, c) => ((r * 7 + c * 13) % 9) + 1).join("")
);

/* ---------- the four scenes ---------- */

function SceneImport() {
  return (
    <div className="izsp-scene izsp-drop">
      <span className="izsp-dropicon" aria-hidden="true">
        <UploadSimple />
      </span>
      <span className="izsp-droptitle">
        <b>Import</b> your access logs
      </span>
      <span className="izsp-drophint">CSV file</span>
      <span className="izsp-drag" aria-hidden="true">
        <CursorClick weight="fill" />
        <span className="izsp-chip">access-logs.csv</span>
      </span>
    </div>
  );
}

function SceneProcess() {
  return (
    <div className="izsp-scene izsp-proc">
      <div className="izsp-data" aria-hidden="true">
        {DATA_ROWS.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
      </div>
      <span className="izsp-file" aria-hidden="true">
        <FileCsv />
        <i>.csv</i>
      </span>
      <span className="izsp-processing">
        <SpinnerGap aria-hidden="true" />
        Processing
      </span>
    </div>
  );
}

function SceneWeights({ dim = false }: { dim?: boolean }) {
  return (
    <div className={`izsp-scene izsp-recs ${dim ? "dim" : ""}`}>
      <span className="izsp-recshead">
        <Sparkle weight="fill" aria-hidden="true" />
        Suggested weights
      </span>
      {RECS.map((r, i) => (
        <span key={r.label} className="izsp-rec" style={{ ["--i" as string]: i } as React.CSSProperties}>
          <span className="izsp-recico" aria-hidden="true">
            <r.Icon />
          </span>
          <span className="izsp-reclabel">{r.label}</span>
          <span className="izsp-recfrom">{r.from}</span>
          <span className="izsp-recto">↑ {r.to}</span>
        </span>
      ))}
    </div>
  );
}

function SceneApply() {
  return (
    <div className="izsp-applywrap">
      <SceneWeights dim />
      <span className="izsp-apply" aria-hidden="true">
        Apply new weights
      </span>
      <span className="izsp-applycursor" aria-hidden="true">
        <CursorClick weight="fill" />
      </span>
    </div>
  );
}

/* ---------- step tab ---------- */

function Tab({
  i,
  step,
  running,
  onPick,
}: {
  i: number;
  step: number;
  running: boolean;
  onPick: (i: number) => void;
}) {
  const state = i < step ? "done" : i === step ? "live" : "todo";
  return (
    <button
      type="button"
      className={`izsp-tab is-${state}`}
      aria-current={i === step ? "step" : undefined}
      onClick={() => onPick(i)}
    >
      <span className="izsp-tablabel">
        <i aria-hidden="true">{String(i + 1).padStart(2, "0")}</i>
        {STEPS[i]}
      </span>
      <span className="izsp-track" aria-hidden="true">
        {/* the fill IS the clock — see the header comment */}
        <span
          className="izsp-fill"
          data-run={state === "live" && running ? "1" : "0"}
          style={{ animationDuration: `${STEP_MS}ms` }}
        />
      </span>
    </button>
  );
}

export function IzScoreProcess({
  kicker = "Adaptive risk",
  title = (
    <>
      One score, <mark>trained on</mark> your own access history.
    </>
  ),
  cta = { label: "Learn more", href: "/platform" },
}: {
  kicker?: string;
  title?: React.ReactNode;
  cta?: { label: string; href: string };
}) {
  const [step, setStep] = useState(0);
  const [seen, setSeen] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
    const el = ref.current;
    if (!el) return;

    /* Native pointer listeners, not React's onPointerEnter/Leave:
       enter/leave don't bubble and React synthesises them from
       over/out, and a missed `leave` would leave autoplay paused for
       good after the cursor walks off. */
    const on = () => setHover(true);
    const off = () => setHover(false);
    el.addEventListener("pointerenter", on);
    el.addEventListener("pointerleave", off);
    el.addEventListener("pointercancel", off);

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
    } else {
      io = new IntersectionObserver(
        (es) => {
          if (es.some((e) => e.isIntersecting)) {
            setSeen(true);
            io?.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      io.observe(el);
    }
    const failsafe = window.setTimeout(() => setSeen(true), 2500);

    return () => {
      el.removeEventListener("pointerenter", on);
      el.removeEventListener("pointerleave", off);
      el.removeEventListener("pointercancel", off);
      io?.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const running = seen && !hover && !reduced;

  const scene =
    step === 0 ? <SceneImport /> : step === 1 ? <SceneProcess /> : step === 2 ? <SceneWeights /> : <SceneApply />;

  return (
    <section className="izsp iz-railed">
      <div className="iz-wrap izsp-head">
        <div className="izsp-head-l">
          <span className="izsp-kicker">
            {kicker}
            <i aria-hidden="true">_</i>
          </span>
          <h2 className="izsp-title">{title}</h2>
          <a className="izsp-cta" href={cta.href}>
            {cta.label}
          </a>
        </div>
      </div>

      <hr className="iz-bd-dashrule" />

      <div className="iz-wrap izsp-body">
        <div className="izsp-panel" ref={ref}>
          <div className="izsp-tabs izsp-tabs--top" role="group" aria-label="Process steps 1 and 2">
            <Tab i={0} step={step} running={running} onPick={setStep} />
            <Tab i={1} step={step} running={running} onPick={setStep} />
          </div>

          <div className="izsp-stage">
            <div key={step} className="izsp-slide">
              {scene}
            </div>
          </div>

          <div className="izsp-tabs izsp-tabs--bot" role="group" aria-label="Process steps 3 and 4">
            <Tab i={2} step={step} running={running} onPick={setStep} />
            <Tab i={3} step={step} running={running} onPick={setStep} />
          </div>

          {/* Advancing lives here rather than on each fill so there is
              exactly one listener regardless of which tab is live. */}
          <span
            className="izsp-clock"
            onAnimationEnd={() => setStep((s) => (s + 1) % STEPS.length)}
            data-run={running ? "1" : "0"}
            style={{ animationDuration: `${STEP_MS}ms` }}
            key={`clock-${step}-${running}`}
            aria-hidden="true"
          />
        </div>

        <div className="izsp-cards">
          {CARDS.map((c) => (
            <div key={c.h} className="izsp-card">
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
