"use client";

/* ============================================================
   00av · IzQuestionBand — the transition device.

   Sits between two sections and asks the question the next one
   answers, which fixes the "sections just abut" problem.

   The risk with a question band is that it reads as a slogan. The
   fix is to make it a PROMPT — the reader's question typed at our
   console — which is on-brand and gives the trailing cursor
   somewhere real to live.

     prompt — console line + question + stub. Between mechanism
              and comparison.
     stub   — question + a promise up front, when the next section
              is long.
     quiet  — one sentence, enormous air. Exported separately as
              `IzQuietBand` because the storyboards call for it by
              that name on ~50 pages.
   ============================================================ */

type Props = {
  variant?: "prompt" | "stub" | "quiet";
  /** mono console line, rendered after a `>_` */
  prompt?: string;
  /** small uppercase label above a quiet band */
  kicker?: string;
  question: string;
  /** italic accented clause inside the question */
  emphasis?: string;
  questionTail?: string;
  /** the promise / answer teaser under the question */
  stub?: string;
  /** anchor the stub links to, e.g. "#mechanism" */
  href?: string;
  className?: string;
};

export function IzQuestionBand({
  variant = "prompt",
  prompt,
  kicker,
  question,
  emphasis,
  questionTail,
  stub,
  href,
  className,
}: Props) {
  const root = className ? `izqb izqb--${variant} ${className}` : `izqb izqb--${variant}`;

  const head = (
    <h3 className="izqb-h">
      {question}
      {emphasis && <em> {emphasis}</em>}
      {questionTail && ` ${questionTail}`}
    </h3>
  );

  return (
    <div className={root}>
      <div className="iz-wrap">
        {variant === "prompt" && prompt && (
          <p className="izqb-prompt">
            <span aria-hidden="true">&gt;_ </span>
            {prompt}
          </p>
        )}
        {variant === "quiet" && kicker && <p className="izqb-kicker">{kicker}</p>}

        {head}

        {stub &&
          (href ? (
            <a className="izqb-stub" href={href}>
              {stub}
              <i aria-hidden="true">↓</i>
            </a>
          ) : (
            <p className="izqb-stub izqb-stub--static">
              {stub}
              <i aria-hidden="true">↓</i>
            </p>
          ))}
      </div>
    </div>
  );
}

/* ============================================================
   IzQuietBand — the cheapest break on the site, and the most-used
   new component in the storyboards (~50 pages). One sentence, big
   air, no graphic. A thin alias so page code reads the way the
   storyboard does rather than passing variant="quiet" everywhere.
   ============================================================ */
export function IzQuietBand({
  kicker,
  statement,
  emphasis,
  tail,
  className,
}: {
  kicker?: string;
  statement: string;
  emphasis?: string;
  tail?: string;
  className?: string;
}) {
  return (
    <IzQuestionBand
      variant="quiet"
      kicker={kicker}
      question={statement}
      emphasis={emphasis}
      questionTail={tail}
      className={className}
    />
  );
}
