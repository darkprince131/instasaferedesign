"use client";

/* ============================================================
   IzStepRail + IzChip — TIER 1 VISUALS  (lab 00af)

   The narration column from the /returning-user-experience/ scene.
   Three details carry it, and they're easy to lose:

     1. The step label is MONO, uppercase, letter-spaced and tiny —
        it reads as an annotation on a drawing, not as a heading.
     2. Narration is mixed weight in one sentence: the subject and
        the verdict are medium, the connective words stay light. It
        is what makes a four-line paragraph scannable in a scene.
     3. A single accent rail on the RIGHT edge of the column marks
        only the ACTIVE step and travels as steps advance. Not a
        dot-per-step tracker, not a progress bar under the text.

   IzChip is the inline `trusted user` pill: mono, tinted, hairline
   border. Tones map to the system's semantic tokens so a chip never
   introduces a colour of its own.
   ============================================================ */

export type ChipTone = "allow" | "deny" | "warn" | "neutral";

export function IzChip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: ChipTone }) {
  return <span className={`izsr-chip izsr-chip--${tone}`}>{children}</span>;
}

export type Step = {
  /** what shows after "STEP" — usually the index, but scenes skip numbers */
  n: number | string;
  body: React.ReactNode;
};

export function IzStepRail({
  steps,
  active = 0,
  label = "Scene steps",
}: {
  steps: Step[];
  active?: number;
  label?: string;
}) {
  return (
    <div className="izsr" role="group" aria-label={label}>
      {steps.map((s, i) => (
        <div key={i} className={`izsr-step ${i === active ? "on" : ""}`} aria-current={i === active ? "step" : undefined}>
          <span className="izsr-n">Step {s.n}</span>
          <p className="izsr-body">{s.body}</p>
        </div>
      ))}
    </div>
  );
}
