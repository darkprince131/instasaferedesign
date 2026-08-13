"use client";

import { QaTriptych, type Query } from "@/components/home2/QaTriptych";
import {
  IcBiometric,
  IcEmail,
  IcKey,
  IcPush,
  IcSms,
  IcTotp,
} from "./MfaMethodIcons";

/* ============================================================
   MfaMethods — the six factors on the C38 Q&A Triptych (00h).

   ▸ THIS IS THE COMPONENT, NOT A LOOKALIKE ◂
   The first build of this section rendered six standalone cards.
   Six cards is not C38. C38 is one mechanism: three features down
   the left, three down the right, and a single answer panel between
   them that swaps to whichever is selected — autoplaying through all
   six, pausing on hover and off-screen, with the active icon's
   underline doubling as the progress bar. This now runs on the real
   component (components/home2/QaTriptych.tsx) with injected content,
   so any future fix to the mechanism reaches this page too.

   ▸ WHY THE FORMAT SUITS THE CONTENT ◂
   Six panels side by side ask the reader to compare six things at
   once, which is the wrong question — the methods are not competing.
   One answer panel asks a better one: pick the situation that is
   yours, and read the single answer to it. The autoplay walks a
   reader who does not pick through all six.

   ▸ THE SPLIT IS THE GROUPING FROM THE BRIEF ◂
   Left column is reachability — getting the code to the person when
   the network, the handset or the device is the constraint. Right
   column is assurance — the code arrives fine, but the approval has
   to be hard to fake. The column captions say so, so the grouping
   survives the change of layout.

   ▸ TWO ANSWERS CARRY A LIMITATION ON PURPOSE ◂
   Email OTP names the deadlock where a user's mailbox sits behind the
   tunnel they are trying to open, and push names that macOS and Linux
   do not get it. Both are true and both come from InstaSafe's own
   documentation. They stay because a page that admits the one thing
   that does not work is trusted on the five that do.
   ============================================================ */

/* The questioner is a customer, not the site's standing cast member.
   Alen Joseph is the person things happen TO across this site — the
   session in the access flow, the device in the console. Here somebody
   is asking about their own estate, which is a different role, so the
   bubble carries a different name. */
const ASKER = { name: "IT Manager", initials: "IT" };

const METHODS: Query[] = [
  /* ---------- left column · reachability ---------- */
  {
    icon: IcTotp,
    title: "TOTP",
    desc: "A code generated on the phone, with no network of any kind.",
    q: "Our plant runs out of a location where mobile signal drops for hours at a stretch. If the OTP is an SMS, my shift supervisors simply cannot log in.",
    readMs: 8500,
    foot: "new code every 30s · works fully offline",
    a: (
      <>
        <p>
          <b>The code is generated on the phone itself, not sent to it.</b> The InstaSafe Authenticator produces a fresh
          time-based code every 30 seconds with no network of any kind — no SMS, no data, no Wi-Fi.
        </p>
        <p>The phone and the server agree on the time, and that is the entire dependency.</p>
      </>
    ),
  },
  {
    icon: IcSms,
    title: "SMS OTP",
    desc: "Nothing on the handset — no app, no smartphone, no enrolment.",
    q: "A large part of my field team is on basic handsets. They are not installing an authenticator app, and half of them wouldn't know how.",
    readMs: 8000,
    foot: "any handset · no app, no enrolment",
    a: (
      <>
        <p>
          <b>SMS OTP needs nothing on the handset</b> — no app, no smartphone, no enrolment beyond a verified number.
        </p>
        <p>
          It is the lowest common denominator, and that is exactly why it is in the list: you can put head-office staff
          on stronger factors without stranding the people in the field.
        </p>
      </>
    ),
  },
  {
    icon: IcEmail,
    title: "Email OTP",
    desc: "Authenticates against an address you already hold — no device to issue.",
    q: "We onboard contractors for six-week projects. We are not issuing each of them a company SIM just so they can receive a code.",
    readMs: 9500,
    foot: "no device to issue · pair with TOTP for tunnelled mail",
    a: (
      <>
        <p>
          <b>Email OTP authenticates against an address you already have on file</b>, which makes it the practical
          choice for short-term contractors and third-party support staff.
        </p>
        <p>
          One caveat worth naming: don&apos;t make it the <b>only</b> factor for users whose corporate mailbox sits
          behind the tunnel they are trying to open — that is a deadlock. Pair it with TOTP for those groups.
        </p>
      </>
    ),
  },

  /* ---------- right column · assurance ---------- */
  {
    icon: IcPush,
    title: "Push approval",
    desc: "No code at all. A notification, and one tap to approve.",
    q: "Every morning my helpdesk gets the same calls — people mistyping the six digits, or the code expiring while they type it.",
    readMs: 9000,
    foot: "one tap · nothing to retype",
    a: (
      <>
        <p>
          <b>Push removes the code entirely.</b> The user gets a notification and taps approve; there is nothing to read
          across, retype, or race the clock on. It is the factor that reduces helpdesk volume rather than adding to it.
        </p>
        <p>
          Worth knowing before you standardise on it: push is offered on Windows, Android and iOS — macOS and Linux
          users get the OTP field directly instead of the method menu.
        </p>
      </>
    ),
  },
  {
    icon: IcBiometric,
    title: "Biometric",
    desc: "The one factor that cannot be lent to a colleague.",
    q: "On the shop floor the terminals are shared. People pass passwords to each other because it's faster, and I cannot prove who actually did what.",
    readMs: 8500,
    foot: "ten-finger enrolment · cannot be shared",
    a: (
      <>
        <p>
          <b>A fingerprint or a face cannot be read out over a shoulder or sent on WhatsApp.</b> It is the one factor
          that cannot be lent to a colleague, which is what turns a shared terminal back into an attributable session.
        </p>
        <p>Enrolment supports all ten fingers, so a bandaged hand does not become a helpdesk ticket.</p>
      </>
    ),
  },
  {
    icon: IcKey,
    title: "Hardware token · FIDO",
    desc: "Origin-bound. A convincing fake login page gets nothing.",
    q: "Our treasury team releases payment files. The board has started asking specifically whether that approval is phishing-resistant.",
    readMs: 9000,
    foot: "origin-bound · a fake login page gets nothing",
    a: (
      <>
        <p>
          <b>A FIDO key is bound to the origin it was registered against.</b> A convincing replica of your login page
          cannot make the key sign for it, because the key checks where the request came from before it responds.
        </p>
        <p>
          For the small group of people who approve the largest things, this is the factor that answers the board&apos;s
          question directly.
        </p>
      </>
    ),
  },
];

export function MfaMethods() {
  return (
    <div className="mfm">
      <QaTriptych
        items={METHODS}
        asker={ASKER}
        sides={["Getting the code to the person", "Making the approval hard to fake"]}
        time="10:06 AM"
        /* null, not a replacement: the section already carries its own
           eyebrow and heading, and C38's default header is a 76px
           uppercase display line with its own CTA. Two headers stacked
           would be the layout arguing with the page. */
        head={null}
      />

      {/* THE SENTENCE THAT MAKES IT A PRODUCT.
          Six methods is a feature list; six methods assigned per group
          is the thing the shortlist does not do the same way. It sits
          under the triptych because it is the conclusion of both
          columns at once — the field team on SMS and treasury on
          hardware keys is only interesting inside one policy. */}
      <p className="mfm-tie">
        Six methods, and <em>no requirement to pick one</em>. Auth profiles are set globally and then overridden per
        user or per group — so the field team can be on SMS while treasury is on hardware keys, inside the same policy.
      </p>
    </div>
  );
}
