"use client";

import { CalendarBlank } from "@phosphor-icons/react";

/* ============================================================
   IzEventsHero — TIER 2 SECTION  (lab 00aq)

   The /events/ hero: a week calendar as the backdrop, with the
   page's title floating over it on a card.

   The entrance order is the whole trick and it is deliberately
   BACKWARDS from the obvious one — the CARD arrives first, then the
   grid, then the event blocks. Leading with the calendar would make
   the reader parse a schedule they have no reason to care about
   yet; leading with the title tells them what they're looking at,
   and the calendar then assembles itself underneath as evidence.
   Sequenced with plain animation-delays, no JS.

   Everything is data. `DAYS`, `HOURS` and `EVENTS` drive the grid;
   an event is placed by [day, hour-row] and a span.
   ============================================================ */

const DAYS = [
  { d: "Mon", n: 29 },
  { d: "Tue", n: 30 },
  { d: "Wed", n: 31 },
  { d: "Thu", n: 1 },
  { d: "Fri", n: 2 },
  { d: "Sat", n: 3 },
  { d: "Sun", n: 4 },
  { d: "Mon", n: 5 },
  { d: "Tue", n: 6 },
];

const HOURS = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM"];

/** how much of the week survives below 900px — keep in step with the
 *  grid-template in converge.css */
const SM = { days: 5, hours: 4 };

type Ev = { id: string; day: number; row: number; span: number; time: string; title: string; tone: "a" | "b" | "c" | "d" };

const EVENTS: Ev[] = [
  { id: "e1", day: 1, row: 2, span: 2, time: "09:00", title: "Customer breakfast, Bengaluru", tone: "a" },
  { id: "e2", day: 3, row: 4, span: 3, time: "11:30", title: "Zero Trust clinic, Amsterdam", tone: "b" },
  { id: "e3", day: 5, row: 1, span: 2, time: "09:00", title: "Webinar: retiring the VPN", tone: "c" },
  { id: "e4", day: 7, row: 3, span: 2, time: "10:30", title: "Regional lunch, Pune", tone: "b" },
  { id: "e5", day: 9, row: 1, span: 4, time: "09:00", title: "Identiverse, Las Vegas", tone: "d" },
];

export function IzEventsHero({
  kicker = "InstaSafe",
  title = "Events & Webinars",
  sub = "One place for everything we run. Register for what's coming, or catch up on what you missed with the recordings.",
}: {
  kicker?: string;
  title?: string;
  sub?: string;
}) {
  return (
    <header className="izev">
      <div className="iz-wrap">
        <div className="izev-stage">
          {/* ---------- backdrop: the week ---------- */}
          <div
            className="izev-cal"
            aria-hidden="true"
            style={{ ["--days" as string]: DAYS.length, ["--hours" as string]: HOURS.length } as React.CSSProperties}
          >
            <span className="izev-tz">IST GMT+5:30</span>

            {/* `data-col` is what the narrow layout hides on. Cells are
                placed explicitly, so an nth-child formula would not map
                to a column reliably — an attribute does. */}
            {DAYS.map((d, i) => (
              <span key={`${d.d}${d.n}`} className="izev-day" data-col={i + 1} style={{ gridColumn: i + 2, gridRow: 1 }}>
                <i>{d.d}</i>
                <b>{d.n}</b>
              </span>
            ))}

            {HOURS.map((h, r) => (
              <span key={h} className="izev-hour" data-row={r + 1} style={{ gridColumn: 1, gridRow: r + 2 }}>
                {h}
              </span>
            ))}

            {/* the ruled cells — placed explicitly so the events sitting
                on top of them can't push any of them into implicit rows */}
            {HOURS.map((_, r) =>
              DAYS.map((_, c) => (
                <span
                  key={`c${r}-${c}`}
                  className="izev-cell"
                  data-col={c + 1}
                  data-row={r + 1}
                  style={{ gridColumn: c + 2, gridRow: r + 2 }}
                />
              ))
            )}

            {EVENTS.map((e) => (
              <span
                key={e.id}
                className={`izev-ev tone-${e.tone}`}
                data-col={e.day}
                /* the narrow layout keeps 5 days x 4 hours; anything
                   reaching past that would spawn implicit tracks and
                   stretch the grid, so it is dropped rather than clipped */
                data-overflow={e.day > SM.days || e.row + e.span - 1 > SM.hours ? "sm" : undefined}
                style={{ gridColumn: e.day + 1, gridRow: `${e.row + 1} / span ${e.span}` }}
              >
                <b>{e.time}</b>
                <i>{e.title}</i>
              </span>
            ))}
          </div>

          {/* ---------- the card that arrives first ---------- */}
          <div className="izev-card">
            <span className="izev-kicker">
              <CalendarBlank aria-hidden="true" />
              {kicker}
            </span>
            <h1 className="izev-title">{title}</h1>
            <p className="izev-sub">{sub}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
