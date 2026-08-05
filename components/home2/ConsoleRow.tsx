"use client";

import type { JSX, ReactNode } from "react";
import { IzConsole } from "@/components/home2/IzConsole";

/* ============================================================
   C23 · Console Row (stackable).
   Reusable "text beside a live console" row. `reverse` flips
   the sides so stacked rows alternate (text-left / console-left).

   The console is an InstaSafe console in our design language
   (orange · dark + paper) — window chrome + left sidebar nav +
   topbar + dashboard content. Defaults to <IzConsole/>; pass
   any console view as children. (The blue --db i365 console
   stays in the /console gallery.)
   ============================================================ */

const IcArrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** a `term — value` line in the spec grammar used under the body */
export type ConsoleRowFact = [term: string, value: string];

export interface ConsoleRowProps {
  eyebrow: string;
  title: ReactNode;
  /** one string, or several for a multi-paragraph body */
  body: string | string[];
  /** optional spec rows under the body — mono term, plain value */
  facts?: ConsoleRowFact[];
  ctaLabel: string;
  ctaHref?: string;
  reverse?: boolean;
  children?: ReactNode; // an i365 console view (defaults to <DashboardHero/>)
}

export function ConsoleRow({ eyebrow, title, body, facts, ctaLabel, ctaHref = "#", reverse, children }: ConsoleRowProps): JSX.Element {
  const paras = Array.isArray(body) ? body : [body];
  return (
    <div className={`cr-row ${reverse ? "reverse" : ""}`}>
      <div className="cr-text">
        <span className="iz-ey">{eyebrow}</span>
        <h2 className="iz-h2">{title}</h2>
        {paras.map((p, i) => (
          <p className="cr-lead" key={i}>
            {p}
          </p>
        ))}
        {facts && facts.length > 0 && (
          <dl className="cr-facts">
            {facts.map(([term, value]) => (
              <div className="cr-fact" key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        <a href={ctaHref} className="cr-cta">
          {ctaLabel}
          {IcArrow}
        </a>
      </div>
      <div className="cr-console">{children ?? <IzConsole />}</div>
    </div>
  );
}
