import type { ReactNode } from "react";
import {
  IcBiometric,
  IcEmail,
  IcKey,
  IcPush,
  IcSms,
  IcTotp,
} from "./MfaMethodIcons";

/* ============================================================
   MfaMethods — the six factors as two Q&A triptychs (00h / C38).

   ▸ THE GROUPING IS THE ARGUMENT ◂
   Six panels in one grid of six would read as a feature list, and a
   feature list invites the question "which is the good one?". Two
   rows of three, grouped by the PROBLEM each trio solves, answers a
   different question — "which of these is mine?" — and every reader
   finds themselves in one row or the other.

     Row 1 · getting the code to the person   — constraint: reachability
     Row 2 · making the approval hard to fake — constraint: assurance

   Alphabetical order, or strongest-first, would destroy that. Keep
   the rows as they are.

   ▸ THE QUESTIONS ARE QUOTES, NOT HEADINGS ◂
   Each one is written as a sentence somebody actually says on a call
   — first person, slightly untidy, naming their own situation rather
   than the feature. "Our plant runs out of a location where mobile
   signal drops for hours" is a real sentence; "How does TOTP function
   offline?" is a headline pretending to be a question. Typographic
   treatment is a left rule and no quote marks (see mfamethods.css) —
   one speech signal, not two.

   ▸ TWO PANELS CARRY A LIMITATION ON PURPOSE ◂
   Email OTP names the deadlock where a user's mailbox sits behind the
   tunnel they are trying to open, and push names that macOS and Linux
   do not get it. Both are true and both are in InstaSafe's own
   documentation. They stay because a page that admits the one thing
   that does not work is trusted on the five that do — and because a
   prospect with a Mac fleet will find out anyway, and would rather it
   came from us than from a failed pilot.
   ============================================================ */

type Method = {
  id: string;
  Icon: () => ReactNode;
  /** the customer's own sentence, in their voice */
  q: string;
  a: ReactNode;
  label: string;
  proof: string;
};

const ROWS: { id: string; kicker: string; title: string; note: string; methods: Method[] }[] = [
  {
    id: "reach",
    kicker: "Row one · reachability",
    title: "Getting the code to the person",
    note: "The constraint here is not strength, it is arrival. Bad network, no smartphone, no company device.",
    methods: [
      {
        id: "totp",
        Icon: IcTotp,
        q: "Our plant runs out of a location where mobile signal drops for hours at a stretch. If the OTP is an SMS, my shift supervisors simply cannot log in.",
        a: (
          <>
            The code is generated on the phone itself, not sent to it. The InstaSafe Authenticator produces a fresh
            time-based code every 30 seconds with no network of any kind — no SMS, no data, no Wi-Fi. The phone and the
            server agree on the time, and that is the entire dependency.
          </>
        ),
        label: "TOTP · Time-based one-time password",
        proof: "new code every 30s · works fully offline",
      },
      {
        id: "sms",
        Icon: IcSms,
        q: "A large part of my field team is on basic handsets. They are not installing an authenticator app, and half of them wouldn't know how.",
        a: (
          <>
            SMS OTP needs nothing on the handset — no app, no smartphone, no enrolment beyond a verified number. It is
            the lowest common denominator, and that is exactly why it is in the list: you can put head-office staff on
            stronger factors without stranding the people in the field.
          </>
        ),
        label: "SMS OTP",
        proof: "any handset · no app, no enrolment",
      },
      {
        id: "email",
        Icon: IcEmail,
        q: "We onboard contractors for six-week projects. We are not issuing each of them a company SIM just so they can receive a code.",
        a: (
          <>
            Email OTP authenticates against an address you already have on file, which makes it the practical choice for
            short-term contractors and third-party support staff. One caveat worth naming: don&apos;t make it the{" "}
            <em>only</em> factor for users whose corporate mailbox sits behind the tunnel they are trying to open — that
            is a deadlock. Pair it with TOTP for those groups.
          </>
        ),
        label: "Email OTP",
        proof: "no device to issue · pair with TOTP for tunnelled mail",
      },
    ],
  },
  {
    id: "assure",
    kicker: "Row two · assurance",
    title: "Making the approval hard to fake",
    note: "Here the code arrives fine. The question is whether the person approving is the person you think, and whether the approval can be lifted.",
    methods: [
      {
        id: "push",
        Icon: IcPush,
        q: "Every morning my helpdesk gets the same calls — people mistyping the six digits, or the code expiring while they type it.",
        a: (
          <>
            Push removes the code entirely. The user gets a notification and taps approve; there is nothing to read
            across, retype, or race the clock on. It is the factor that reduces helpdesk volume rather than adding to
            it. Worth knowing before you standardise on it: push is offered on Windows, Android and iOS — macOS and
            Linux users get the OTP field directly instead of the method menu.
          </>
        ),
        label: "Push approval",
        proof: "one tap · nothing to retype",
      },
      {
        id: "bio",
        Icon: IcBiometric,
        q: "On the shop floor the terminals are shared. People pass passwords to each other because it's faster, and I cannot prove who actually did what.",
        a: (
          <>
            A fingerprint or a face cannot be read out over a shoulder or sent on WhatsApp. It is the one factor that
            cannot be lent to a colleague, which is what turns a shared terminal back into an attributable session.
            Enrolment supports all ten fingers, so a bandaged hand does not become a helpdesk ticket.
          </>
        ),
        label: "Biometric · fingerprint or face",
        proof: "ten-finger enrolment · cannot be shared",
      },
      {
        id: "fido",
        Icon: IcKey,
        q: "Our treasury team releases payment files. The board has started asking specifically whether that approval is phishing-resistant.",
        a: (
          <>
            A FIDO key is bound to the origin it was registered against. A convincing replica of your login page cannot
            make the key sign for it, because the key checks where the request came from before it responds. For the
            small group of people who approve the largest things, this is the factor that answers the board&apos;s
            question directly.
          </>
        ),
        label: "Hardware token · FIDO",
        proof: "origin-bound · a fake login page gets nothing",
      },
    ],
  },
];

function Panel({ m }: { m: Method }) {
  return (
    <article className="mfm-panel">
      <span className="mfm-ic" aria-hidden="true">
        <m.Icon />
      </span>

      {/* The question is marked as speech by the rule on its left edge
          alone — adding quote marks on top would be saying it twice. */}
      <blockquote className="mfm-q">{m.q}</blockquote>

      <p className="mfm-a">{m.a}</p>

      <div className="mfm-foot">
        <span className="mfm-label">{m.label}</span>
        <span className="mfm-proof">{m.proof}</span>
      </div>
    </article>
  );
}

export function MfaMethods() {
  return (
    <div className="mfm">
      {ROWS.map((row) => (
        <section className="mfm-row" key={row.id} aria-labelledby={`mfm-${row.id}`}>
          <div className="mfm-rowhead">
            <span className="mfm-kicker">{row.kicker}</span>
            <h3 className="mfm-rowtitle" id={`mfm-${row.id}`}>
              {row.title}
            </h3>
            <p className="mfm-rownote">{row.note}</p>
          </div>
          <div className="mfm-trip">
            {row.methods.map((m) => (
              <Panel m={m} key={m.id} />
            ))}
          </div>
        </section>
      ))}

      {/* THE SENTENCE THAT MAKES IT A PRODUCT.
          Six methods is a feature list; six methods assigned per group
          is the thing nobody else in the shortlist does the same way.
          It sits between the rows and the rest of the page because it
          is the conclusion of both rows at once — the field team on
          SMS and treasury on hardware keys is only interesting if they
          are inside one policy. */}
      <p className="mfm-tie">
        Six methods, and <em>no requirement to pick one</em>. Auth profiles are set globally and then overridden per
        user or per group — so the field team can be on SMS while treasury is on hardware keys, inside the same policy.
      </p>
    </div>
  );
}
