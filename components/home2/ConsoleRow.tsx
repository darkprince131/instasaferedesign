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

export interface ConsoleRowProps {
  eyebrow: string;
  title: ReactNode;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
  reverse?: boolean;
  children?: ReactNode; // an i365 console view (defaults to <DashboardHero/>)
}

export function ConsoleRow({ eyebrow, title, body, ctaLabel, ctaHref = "#", reverse, children }: ConsoleRowProps): JSX.Element {
  return (
    <div className={`cr-row ${reverse ? "reverse" : ""}`}>
      <div className="cr-text">
        <span className="iz-ey">{eyebrow}</span>
        <h2 className="iz-h2">{title}</h2>
        <p className="cr-lead">{body}</p>
        <a href={ctaHref} className="cr-cta">
          {ctaLabel}
          {IcArrow}
        </a>
      </div>
      <div className="cr-console">{children ?? <IzConsole />}</div>
    </div>
  );
}
