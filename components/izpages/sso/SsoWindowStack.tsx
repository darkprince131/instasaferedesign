"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowClockwise,
  CaretLeft,
  CaretRight,
  Lock,
  MagnifyingGlass,
  WarningCircle,
  X,
} from "@phosphor-icons/react";

/* ============================================================
   SsoWindowStack — the 00ai window stack, rebuilt for SSO.

   00ai (IzAgentScene) is a stack of three browser windows behind a
   pill toggle that flips the whole scene. That MECHANISM is what is
   reused here; the content is entirely different, because this page
   is not arguing about who is driving a session — it is arguing about
   how many doors a person has to open.

   ▸ THE TWO STATES ARE THE ARGUMENT ◂

   Without SSO: three windows, three unrelated login screens, and a
   cursor in each one grinding through email → password → wrong →
   forgot password → reset link, forever. Three loops running out of
   phase, so at any moment somebody on screen is resetting something.

   With InstaSafe: one window. The cursor signs in ONCE, then opens an
   app, works, closes it, opens the next. The looping never stops in
   either state — that is deliberate. The point is not that one is
   short and one is long; it is that one loop is spent authenticating
   and the other is spent working.

   ▸ WHY THE MOTION IS ALL CSS ◂

   Nine cursor waypoints across four windows on a rAF or interval
   clock would be four timers, a re-render per step, and a scene that
   drifts out of sync with its own field highlights. Instead every
   moving part is a keyframe on ONE shared duration, so the cursor
   arriving at a field and that field lighting up are the same clock
   by construction. The scene only mounts its animations once it has
   been seen (IntersectionObserver), and `prefers-reduced-motion`
   drops straight to a static, still-readable frame.
   ============================================================ */

type App = { name: string; logo: string; host: string };

/* Without SSO: three real, unrelated login screens. Different apps
   matter here — the same app three times would read as one slow
   login rather than as sprawl. */
const LOCKED_OUT: App[] = [
  { name: "Salesforce", logo: "salesforce", host: "login.salesforce.com" },
  { name: "Microsoft 365", logo: "microsoft-365", host: "login.microsoftonline.com" },
  { name: "GitLab", logo: "gitlab", host: "gitlab.acme.in/users/sign_in" },
];

/* With InstaSafe: the portal, and the apps behind it. Only three of
   these ever open on screen (the cursor has time for three in a
   loop); the rest are there because a real portal is a grid, not a
   shortlist. */
const PORTAL_APPS: App[] = [
  { name: "Salesforce", logo: "salesforce", host: "acme.my.salesforce.com" },
  { name: "Microsoft 365", logo: "microsoft-365", host: "office.acme.in" },
  { name: "GitLab", logo: "gitlab", host: "gitlab.acme.in" },
  { name: "Slack", logo: "slack", host: "acme.slack.com" },
  { name: "Zoom", logo: "zoom", host: "acme.zoom.us" },
  { name: "Workday", logo: "workday", host: "wd.acme.in" },
  { name: "Notion", logo: "notion", host: "notion.so/acme" },
  { name: "Dropbox", logo: "dropbox", host: "acme.dropbox.com" },
];

/* ---------- shared chrome ----------
   Deliberately the same bar in both states. If the frame changed
   between OFF and ON, the eye would read "different product" instead
   of "same person, same browser, different number of doors". */
function Chrome({ app, host }: { app: string; host: string }) {
  return (
    <div className="ssws-bar">
      <span className="ssws-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="ssws-nav" aria-hidden="true">
        <CaretLeft weight="bold" />
        <CaretRight weight="bold" />
        <ArrowClockwise />
      </span>
      <span className="ssws-tab">
        <span className="ssws-fav" aria-hidden="true">
          <Lock weight="fill" />
        </span>
        <span className="ssws-tabname">{app}</span>
      </span>
      <span className="ssws-url" aria-hidden="true">
        {host}
      </span>
    </div>
  );
}

/* The cursor. One arrow, one click ring; where it goes and when it
   pulses is entirely the stylesheet's business. */
function Cursor({ variant }: { variant: string }) {
  return (
    <span className={`ssws-cur ${variant}`} aria-hidden="true">
      <span className="ssws-ring" />
      <svg viewBox="0 0 12 14">
        <path d="M1 1l10 6-4.2 1.2L5 13z" />
      </svg>
    </span>
  );
}

/* ---------- OFF: one of the three login screens ---------- */
function LoginWin({ app, i }: { app: App; i: number }) {
  return (
    <div className={`ssws-win ssws-win--login w${i}`}>
      <Chrome app={app.name} host={app.host} />
      <div className="ssws-login">
        <span className="ssws-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/logos/integrations/${app.logo}.svg`} alt="" loading="lazy" />
        </span>
        <span className="ssws-lh">Sign in to {app.name}</span>

        <span className="ssws-field f-mail">
          <em>Work email</em>
          <b>alen.joseph@acme.in</b>
        </span>
        <span className="ssws-field f-pass">
          <em>Password</em>
          <b className="dots">••••••••••</b>
        </span>

        <span className="ssws-btn f-submit">Sign in</span>

        <span className="ssws-err">
          <WarningCircle weight="fill" />
          That password didn&apos;t work
        </span>
        <span className="ssws-forgot f-forgot">Forgot password?</span>
        <span className="ssws-sent">Reset link sent — check your inbox</span>
      </div>
      <Cursor variant={`c-login c${i}`} />
    </div>
  );
}

/* ---------- ON: the portal, plus the app that is currently open ---------- */
function PortalWin() {
  return (
    <div className="ssws-win ssws-win--portal">
      <Chrome app="InstaSafe" host="portal.acme.in" />
      <div className="ssws-portal">
        <div className="ssws-side" aria-hidden="true">
          <span className="ssws-side-me">AJ</span>
          <i />
          <i />
          <i />
        </div>

        <div className="ssws-main">
          <div className="ssws-portal-top">
            <span className="ssws-search" aria-hidden="true">
              <MagnifyingGlass weight="bold" />
              Search apps
            </span>
            <span className="ssws-who">
              <b>Alen Joseph</b>
              <em>Signed in once · 08:59</em>
            </span>
          </div>

          <div className="ssws-tiles">
            {PORTAL_APPS.map((a, i) => (
              <span className={`ssws-tile t${i}`} key={a.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logos/integrations/${a.logo}.svg`} alt="" loading="lazy" />
                <b>{a.name}</b>
              </span>
            ))}
          </div>

          {/* THE SIGN-IN GATE, which is shown once and then never again
              in the loop. It is what the cursor's first click clears,
              and its absence for the rest of the loop is the whole
              claim: nothing else in this window asks for a password. */}
          <div className="ssws-gate">
            <span className="ssws-gate-card">
              <span className="ssws-brand sm">
                <Lock weight="fill" />
              </span>
              <b>One login, every app</b>
              <span className="ssws-field">
                <em>Work email</em>
                <b>alen.joseph@acme.in</b>
              </span>
              <span className="ssws-btn g-submit">Continue</span>
              <em className="ssws-gate-mfa">MFA + device posture</em>
            </span>
          </div>

          {/* The three apps that actually open, drawn as panes over the
              portal — each one fades in on its own slice of the loop. */}
          {PORTAL_APPS.slice(0, 3).map((a, i) => (
            <div className={`ssws-app a${i}`} key={a.name}>
              <span className="ssws-app-bar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logos/integrations/${a.logo}.svg`} alt="" loading="lazy" />
                <b>{a.name}</b>
                <em>opened without a password</em>
                <X weight="bold" aria-hidden="true" />
              </span>
              {/* An app, not six grey rectangles. A toolbar and four
                  list rows is the least structure that reads as
                  "somebody is working in here" — which is the whole
                  point of the pane being open at all. */}
              <span className="ssws-app-body" aria-hidden="true">
                <span className="ssws-app-tools">
                  <i />
                  <i />
                  <i />
                </span>
                {[0, 1, 2, 3].map((n) => (
                  <span className="ssws-app-row" key={n}>
                    <i className="d" />
                    <i className="l1" />
                    <i className="l2" />
                    <i className="tag" />
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Cursor variant="c-portal" />
    </div>
  );
}

export function SsoWindowStack() {
  const [off, setOff] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Nothing animates until the scene is on screen. Four looping
     cursors running behind the fold is work nobody is watching. */
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    /* A background tab reports nothing as intersecting, so a visitor who
       opens this page in a new tab and comes back would find a frozen
       scene. Same failsafe 00ai carries, same reason. */
    const failsafe = window.setTimeout(() => setSeen(true), 2500);
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div className={`ssws ${off ? "is-off" : "is-on"} ${seen ? "in" : ""}`} ref={ref}>
      <div className="ssws-togglewrap">
        <button
          type="button"
          role="switch"
          aria-checked={off}
          className={`ssws-toggle ${off ? "on" : ""}`}
          onClick={() => setOff((v) => !v)}
        >
          <span className="ssws-tlabel">See without InstaSafe</span>
          <span className="ssws-track" aria-hidden="true">
            <span className="ssws-knob" />
          </span>
        </button>
      </div>

      <div className="ssws-stage">
        <div className="ssws-stack" aria-hidden={!off}>
          {LOCKED_OUT.map((a, i) => (
            <LoginWin app={a} i={i} key={a.name} />
          ))}
        </div>
        <div className="ssws-one" aria-hidden={off}>
          <PortalWin />
        </div>
      </div>

      <p className="ssws-caption">
        {off
          ? "Without SSO: three apps, three credentials, and a reset link somewhere in every working day."
          : "With InstaSafe: one login at 08:59. Everything after it is work, not authentication."}
      </p>
    </div>
  );
}
