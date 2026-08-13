"use client";

import { useState } from "react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooter } from "@/components/home2/IzFooter";
import { OneLoginRace } from "@/components/izpages/sso/OneLoginRace";
import { useSectionReveals } from "@/components/home2/useIzMotion";

/* ============================================================
   SsoRacePage — the login race, given its own page.

   ▸ WHY IT MOVED OFF THE SSO PAGE ◂
   On /zero-trust-features/single-sign-on the race sat behind an
   opt-in button, which was the right call there: it is a 13-second
   looping animation on a page whose job is to explain single sign-on
   in the first fold, and nothing on that page needs it to be
   understood. But "behind a button on a page about something else"
   is also the worst possible home for the one asset on this site that
   a person might actually send to a colleague.

   So it gets a page. The SSO page keeps its static 01:47 vs 0:09
   teaser and links here; here, the race is the whole point, it runs
   without being asked, and there is room to say what the numbers
   actually mean — which is the part that was never sayable inside a
   collapsed teaser.

   ▸ WHAT IS AND IS NOT CLAIMED ◂
   The times are a MODEL, not a measurement, and the page says so
   twice — once under the race and once in the method note. Six logins
   at roughly fourteen seconds each plus one password reset is the
   shape of a normal morning; it is not a benchmark, and dressing it
   as one would be the kind of number this project does not publish.
   ============================================================ */

type Theme = "dark" | "paper";

const BREAKDOWN = [
  {
    k: "6 sign-ins",
    v: "One per application, because each one keeps its own credential store and has no idea the others exist.",
  },
  {
    k: "1 reset",
    v: "The fourth one. Not pessimism — a password nobody types daily is a password nobody remembers, and the reset costs more than the login it replaced.",
  },
  {
    k: "0 shared signal",
    v: "Six sign-ins produce six unrelated log entries in six systems. Nothing correlates them, so nothing can answer what this person reached today.",
  },
];

const AFTER = [
  {
    k: "1 sign-in",
    v: "Carrying MFA and a device check, at the start of the session rather than six times through it.",
  },
  {
    k: "6 tiles",
    v: "Provisioned applications, opened from the portal. What appears is what the group entitles — the interface is the entitlement.",
  },
  {
    k: "1 trail",
    v: "One authentication event, one session, one place to look. And one action to end all of it when the person leaves.",
  },
];

export function SsoRacePage() {
  const [theme, setT] = useState<Theme>("paper");
  useSectionReveals();

  return (
    <div className="iz" data-theme={theme}>
      <IzNav theme={theme} onThemeChange={setT} />

      {/* ---------------- HERO ---------------- */}
      <section className="iz-section iz-sec--railed izrace-hero">
        <span className="iz-cross iz-cross--bl" aria-hidden="true" />
        <span className="iz-cross iz-cross--br" aria-hidden="true" />
        <div className="iz-wrap">
          <div className="iz-headblock center iz-reveal">
            <span className="iz-ey">See it, don&apos;t just read it</span>
            <h1 className="iz-h1">
              One login beats six, <em>every time</em>.
            </h1>
            <p className="iz-lead">
              Six application logins, timed side by side against one — with a password-reset detour thrown in for
              realism, because that is what actually happens on the fourth one.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- THE RACE ----------------
          No opt-in gate here. On the SSO page the race is an optional
          detour and has to earn its click; on its own page it IS the
          page, and making the reader press a button to start the thing
          they navigated to would be a toll booth. */}
      <section className="iz-section iz-sec--open" id="race">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <OneLoginRace />
          </div>
          <p className="izrace-note iz-reveal">
            Hover to pause · the clock restarts on its own · times are modelled, not measured
          </p>
        </div>
      </section>

      {/* ---------------- WHAT THE TWO NUMBERS ARE ---------------- */}
      <section className="iz-section iz-sec--cells" id="breakdown">
        <div className="iz-wrap">
          <div className="iz-headblock iz-reveal">
            <span className="iz-ey">Reading the clock</span>
            <h2 className="iz-h2">
              The gap is not speed. It is <em>how many times you are asked</em>.
            </h2>
            <p className="iz-lead">
              A single login is not faster because the login itself is quicker — it is the same form. It is faster
              because it happens once, and because the thing that usually goes wrong has one place to go wrong instead
              of six.
            </p>
          </div>

          <div className="izrace-cols iz-reveal iz-block-top">
            <div className="izrace-col">
              <span className="izrace-colh deny">Without SSO · 01:47</span>
              <dl className="izrace-list">
                {BREAKDOWN.map((b) => (
                  <div className="izrace-item" key={b.k}>
                    <dt>{b.k}</dt>
                    <dd>{b.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="izrace-col">
              <span className="izrace-colh allow">With InstaSafe · 0:09</span>
              <dl className="izrace-list">
                {AFTER.map((b) => (
                  <div className="izrace-item" key={b.k}>
                    <dt>{b.k}</dt>
                    <dd>{b.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- METHOD ----------------
          Stated plainly and early rather than in a footnote nobody
          reads. A modelled number presented as a measured one is the
          kind of thing a technical reader catches, and catching it
          costs more trust than the number ever bought. */}
      <section className="iz-section iz-sec--band" id="method">
        <div className="iz-wrap">
          <div className="izrace-method iz-reveal">
            <h2 className="iz-h2">How the times were arrived at</h2>
            <p>
              The race is a model of a normal morning, not a stopwatch on a lab bench. Each sign-in is allowed roughly
              fourteen seconds — find the tab, type the address, type the password, wait for the response — and one of
              the six runs into a forgotten password and a reset link, which is the single most common interruption in
              this sequence.
            </p>
            <p>
              The InstaSafe side is one sign-in of the same length, carrying MFA, after which the portal opens what the
              person is entitled to. Nothing here is measured against a competitor and nothing is a benchmark; it is
              the arithmetic of doing something once instead of six times, drawn out so it can be watched.
            </p>
            <p className="izrace-method-cta">
              <a className="iz-btn iz-btn-pri" href="/book-a-demo">
                See it on your own applications
              </a>
              <a className="iz-btn" href="/zero-trust-features/single-sign-on">
                Back to Single Sign-On
              </a>
            </p>
          </div>
        </div>
      </section>

      <IzFooter />
    </div>
  );
}
