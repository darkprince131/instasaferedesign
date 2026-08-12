"use client";

import { useEffect, useState } from "react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { izFontVars } from "@/lib/iz-fonts";
import { IzDemoScene } from "./IzDemoScene";
import { submitDemoLead } from "./zoho-lead";

/* ============================================================
   /book-a-demo — the access request.

   The page argues one thing and asks for one thing. On the left, an
   isometric room where the traffic runs device → junction → server and
   the control plane sits BESIDE that path issuing decisions; on the
   right, the form.

   There used to be a four-gate status rail above the fields —
   identity, organisation, work email, context — that resolved as the
   visitor typed. It was removed on purpose: it cost about 64px of card
   height, which was the difference between the form fitting in one
   viewport and not. A device that comments on the form is worth less
   than a form the visitor can see the end of.

   Free-mail addresses are rejected on the email field deliberately.
   Demo environments are provisioned against a company domain, so a
   gmail address is not a stricter lead standard, it is an address the
   provisioning step cannot use.

   Theme boilerplate matches IzResourceCenter / IzBlogPage exactly,
   including the shared `is-theme` storage key.
   ============================================================ */

type Theme = "dark" | "paper";
type FieldName = "firstname" | "lastname" | "company" | "email" | "phone" | "notes";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/* Consumer mail providers. Matched on the domain's label, not as a
   substring of the whole address, so "aolinsurance.co.in" is not caught
   by "aol". */
const FREE_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.in", "yahoo.co.in",
  "hotmail.com", "outlook.com", "live.com", "aol.com", "icloud.com",
  "proton.me", "protonmail.com", "rediffmail.com", "zoho.com", "mail.com",
]);

const STEPS = [
  {
    n: "01",
    h: "We respond within one working day",
    p: "A solutions engineer — not an SDR script — reads your context and comes prepared for your environment.",
  },
  {
    n: "02",
    h: "A 45-minute walkthrough, mapped to you",
    p: "Live product against your use case: your app types, your identity provider, your device posture requirements, your auditor's questions.",
  },
  {
    n: "03",
    h: "Optional pilot in your own environment",
    p: "If it fits, we scope a pilot on your infrastructure — your gateways, your directory, your policies.",
  },
];

/* Capability facts, not customer counts. Every one of these is a
   property of the platform that can be demonstrated on the call. */
const FACTS = ["Since 2012", "25 device checks", "7 application types", "7 SIEM formats", "202 event types"];

const EMPTY: Record<FieldName, string> = {
  firstname: "", lastname: "", company: "", email: "", phone: "", notes: "",
};

function isBusinessEmail(v: string) {
  if (!EMAIL_RE.test(v)) return false;
  return !FREE_DOMAINS.has(v.split("@")[1].toLowerCase());
}

function Tick() {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M1.5 5.5 4 8l4.5-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IzBookDemo() {
  const [theme, setTheme] = useState<Theme>("paper");
  useEffect(() => {
    try {
      const t = localStorage.getItem("is-theme");
      setTheme(t === "dark" ? "dark" : "paper");
    } catch {}
  }, []);
  const onThemeChange = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("is-theme", t);
    } catch {}
  };

  const [values, setValues] = useState(EMPTY);
  const [invalid, setInvalid] = useState<Partial<Record<FieldName, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = (name: FieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setInvalid((s) => (s[name] ? { ...s, [name]: false } : s));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFailed(false);

    const bad: Partial<Record<FieldName, boolean>> = {};
    if (values.firstname.trim() === "") bad.firstname = true;
    if (values.lastname.trim() === "") bad.lastname = true;
    if (values.company.trim() === "") bad.company = true;
    if (!isBusinessEmail(values.email.trim())) bad.email = true;
    if (values.notes.trim() === "") bad.notes = true;

    if (Object.keys(bad).length > 0) {
      setInvalid(bad);
      const first = Object.keys(bad)[0];
      document.getElementById(`izdm-${first}`)?.focus();
      return;
    }

    setSending(true);
    const ok = await submitDemoLead(values);
    setSending(false);
    if (ok) setSent(true);
    else setFailed(true);
  }

  return (
    <div className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
      <IzNav theme={theme} onThemeChange={onThemeChange} />

      {/* ---------- stage ----------
          Three parts on a two-column, two-row grid:

            row 1 col 1  the headline
            row 2 spans  the room — full-bleed, starts BELOW the headline
            col 2 spans  the card — top-aligned with the headline

          That geometry is the whole layout argument. The card and the
          headline start on the same line, so the form is the first
          thing at eye level. The room begins where the type ends, so
          nothing is ever set over the drawing — the object cluster is
          ~730px tall and there is no arrangement where a three-line
          headline and the devices are not on top of each other. And
          because the room is its own grid row rather than a layer
          behind everything, the split is automatic at any type size. */}
      <section className="izdm-stage iz-railed">
        <div className="iz-wrap izdm-split">
          <div className="izdm-copy">
            <p className="izdm-eyebrow">Book a demo</p>
            <h1 className="izdm-h1">
              See InstaSafe ZTNA running against <em>your</em> use case.
            </h1>
            <p className="izdm-lede">
              Forty-five minutes with a solutions engineer — your applications, your identity
              stack, your compliance questions. Not a slide deck.
            </p>
          </div>

          <div className="izdm-roomslot">
            <IzDemoScene />
            <div className="izdm-scrim" aria-hidden="true" />
          </div>

          <div className="izdm-cardwrap">
            <div className="izdm-card">
              <div className="izdm-cardhead">
                <span className="izdm-tag">Access request — demo environment</span>
                <span className="izdm-livedot" aria-hidden="true" />
              </div>

              {sent ? (
                <div className="izdm-granted" role="status">
                  <span className="izdm-badge">
                    <Tick />
                    Access granted
                  </span>
                  <p>
                    Your demo request is in. A solutions engineer will reach you within one
                    working day.
                  </p>
                </div>
              ) : (
                <form className="izdm-form" onSubmit={onSubmit} noValidate>
                  <div className="izdm-row">
                    <div className={`izdm-field${invalid.firstname ? " is-invalid" : ""}`}>
                      <label htmlFor="izdm-firstname">First name</label>
                      <input
                        id="izdm-firstname"
                        name="firstname"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Priya"
                        value={values.firstname}
                        onChange={set("firstname")}
                        aria-invalid={invalid.firstname ? true : undefined}
                      />
                      <span className="izdm-err">Enter your first name.</span>
                    </div>
                    <div className={`izdm-field${invalid.lastname ? " is-invalid" : ""}`}>
                      <label htmlFor="izdm-lastname">Last name</label>
                      <input
                        id="izdm-lastname"
                        name="lastname"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Sharma"
                        value={values.lastname}
                        onChange={set("lastname")}
                        aria-invalid={invalid.lastname ? true : undefined}
                      />
                      <span className="izdm-err">Enter your last name.</span>
                    </div>
                  </div>

                  <div className="izdm-row is-single">
                    <div className={`izdm-field${invalid.company ? " is-invalid" : ""}`}>
                      <label htmlFor="izdm-company">Company</label>
                      <input
                        id="izdm-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Acme Financial Services"
                        value={values.company}
                        onChange={set("company")}
                        aria-invalid={invalid.company ? true : undefined}
                      />
                      <span className="izdm-err">Enter your company name.</span>
                    </div>
                  </div>

                  <div className="izdm-row is-single">
                    <div className={`izdm-field${invalid.email ? " is-invalid" : ""}`}>
                      <label htmlFor="izdm-email">Work email</label>
                      <input
                        id="izdm-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="priya@acme.com"
                        value={values.email}
                        onChange={set("email")}
                        aria-invalid={invalid.email ? true : undefined}
                      />
                      <span className="izdm-err">
                        Use your work email address — demo environments are provisioned
                        against your company domain.
                      </span>
                    </div>
                  </div>

                  <div className="izdm-row is-single">
                    <div className="izdm-field">
                      <label htmlFor="izdm-phone">
                        Phone <span className="izdm-opt">(optional)</span>
                      </label>
                      <input
                        id="izdm-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 98XXX XXXXX"
                        value={values.phone}
                        onChange={set("phone")}
                      />
                    </div>
                  </div>

                  <div className="izdm-row is-single">
                    <div className={`izdm-field${invalid.notes ? " is-invalid" : ""}`}>
                      <label htmlFor="izdm-notes">What are you trying to solve?</label>
                      <textarea
                        id="izdm-notes"
                        name="notes"
                        placeholder="e.g. Replacing VPN for 400 remote users; RBI compliance audit in Q4; need device posture checks on BYOD."
                        value={values.notes}
                        onChange={set("notes")}
                        aria-invalid={invalid.notes ? true : undefined}
                      />
                      <span className="izdm-err">
                        One line of context is enough — it decides which engineer you get.
                      </span>
                    </div>
                  </div>

                  <p className="izdm-consent">
                    By submitting, you agree to the processing of personal data per our{" "}
                    <a className="izdm-link" href="/privacy-policy">
                      Privacy Policy
                    </a>
                    .
                  </p>

                  <button type="submit" className="izdm-submit" disabled={sending}>
                    {sending ? "Booking…" : "Book your demo"}
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M2 8h11m0 0L9 4m4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {failed && (
                    <p className="izdm-formerr" role="alert">
                      That did not go through. Email{" "}
                      <a className="izdm-link" href="mailto:sales@instasafe.com">
                        sales@instasafe.com
                      </a>{" "}
                      and we will pick it up from there.
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* ---------- what happens next ----------
                This used to be its own band under the stage, which left
                the column below the card empty — a tall stripe of room
                with nothing standing in it, which is the one place the
                drawing looked like wallpaper rather than a space. It
                reads better here anyway: "what happens next" is the
                answer to the question the submit button raises, so it
                belongs directly under the submit button. */}
            <aside className="izdm-aside">
              <p className="izdm-secnote">What happens next</p>
              <ol className="izdm-steps">
                {STEPS.map((s) => (
                  <li key={s.n} className="izdm-step">
                    <span className="izdm-stepnum">{s.n}</span>
                    <div>
                      <h3>{s.h}</h3>
                      <p>{s.p}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="izdm-secnote izdm-secnote--gap">On the call</p>
              <div className="izdm-assurance">
                <strong>Your traffic never transits our cloud.</strong> InstaSafe&apos;s
                control plane decides; your data plane carries. Ask us to prove it on the
                call — the drawing on this page is the architecture, not a metaphor for it.
              </div>
              <ul className="izdm-facts">
                {FACTS.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <IzFooterGrid />
    </div>
  );
}
