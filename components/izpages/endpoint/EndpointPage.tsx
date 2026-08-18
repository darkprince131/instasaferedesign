"use client";

import { useEffect, useState } from "react";
import { Certificate, Prohibit, UsersThree } from "@phosphor-icons/react";

import { ChatFaq } from "@/components/home2/ChatFaq";
import { ConsoleRow } from "@/components/home2/ConsoleRow";
import { FilterStream } from "@/components/home2/FilterStream";
import { IzAnswerStrip } from "@/components/home2/IzAnswerStrip";
import { IzFinalCta } from "@/components/home2/IzFinalCta";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzNav } from "@/components/home2/IzNav";
import { IzQuietBand } from "@/components/home2/IzQuestionBand";
import { IzRelatedRail } from "@/components/home2/IzRelatedRail";
import { AnswerEndpoint } from "@/components/izanswer/AnswerEndpoint";
import { EndpointControls } from "@/components/izoutcomes/artifacts/EndpointControls";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { izFontVars } from "@/lib/iz-fonts";

import { EndpointHero } from "./EndpointHero";
import { EpApps, EpChrome, EpClipboard, EpIdle, EpNetwork, EpWatermark } from "./EndpointScenes";

/* ============================================================
   /platform/endpoint-controls — A2 PLATFORM LIGHT.

   Section order and copy follow
   docs/content/storyboards/platform-endpoint-controls.md. The 4.0
   sub-step wording is legal-checked — in particular the clipboard
   line, whose scope is the InstaSafe session and not the OS at
   large — so it is reproduced verbatim and must not be tightened
   without Product.

   This URL is an ADDED page: it is not on the live sitemap, which is
   why the bespoke build was allowed to claim it. Its registry record
   in lib/site-ia.ts was removed when this route landed, so the
   [...slug] catch-all no longer emits it.
   ============================================================ */

const FAQ = [
  {
    q: "Do the controls apply to all apps?",
    a: "Per-app, per-group policy. Sensitivity decides strictness — the sales tool can allow exporting while the HR system forbids even copy, for the same person on the same laptop.",
  },
  {
    q: "Do they work on personal devices?",
    a: "Yes — within the governed session (portal, agent or secure browser), which is precisely the BYOD use case. The controls bound the session, not the device, so nothing has to be seized or wiped to make them hold.",
  },
  {
    q: "Won't users find workarounds?",
    a: "Controls raise the cost and log the attempt; combined with watermarking, casual exfiltration stops and deliberate exfiltration leaves evidence. We're explicit about scope — no security claim should pretend to be absolute.",
  },
];

type Theme = "dark" | "paper";

export function EndpointPage() {
  /* theme is page-scoped and shares Home2's storage key, so a visitor
     who picked dark on the homepage keeps it here */
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

  return (
    <div className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
      <IzNav theme={theme} onThemeChange={onThemeChange} />

      <EndpointHero />

      {/* ---------------- PLAIN ANSWER ---------------- */}
      <section className="ep-sec" id="what">
        <div className="iz-wrap">
          <IzAnswerStrip
            variant="proof"
            eyebrow="Endpoint Controls"
            heading="What are endpoint controls?"
            question="Not who gets in —"
            emphasis="what happens"
            questionTail="once they are."
            answer="Traditional security ends at the login: once in, the user's actions are their own. Endpoint controls extend policy into the live session — because most data loss isn't a hack, it's an allowed user doing an unallowed thing."
            points={[
              {
                title: "The risk is a permitted person",
                body: "Pasting a customer table into personal email, downloading the price list before resigning, screensharing a console with credentials visible. None of those trip an intrusion alarm, because none of them are an intrusion.",
              },
              {
                title: "Enforced on the device, not requested of the user",
                body: "InstaSafe's endpoint controls are enforced by the agent and portal on the device itself, which is why they hold on a laptop nobody in IT has ever touched.",
              },
              {
                title: "Set per application and per user group",
                body: "So the sales tool can allow exporting while the HR system forbids even copy — same person, same session, different answer.",
              },
              {
                title: "And every refusal is written down",
                body: "Clipboard, watermark, network filter, app filter, chrome control, inactivity timeout. Each enforcement is one of 202 logged event types, so a block is evidence rather than a dead end.",
              },
            ]}
            ctas={[
              { label: "Book a Demo", href: "/book-a-demo", primary: true },
              { label: "What is Zero Trust", href: "/what-is-zero-trust" },
            ]}
            long={[
              "Traditional security ends at the login: once in, the user's actions are their own. Endpoint controls extend policy into the live session — because most data loss isn't a hack, it's an allowed user doing an unallowed thing: pasting a customer table into personal email, downloading the price list before resigning, screensharing a console with credentials visible.",
              "InstaSafe's endpoint controls are enforced by the agent and portal on the device itself, per application, per user group — so the sales tool can allow exporting while the HR system forbids even copy.",
              "Two things follow from enforcing at the session rather than at the perimeter. The first is that a personal device can be trusted with corporate data without being taken over: the boundary is drawn around the session, not around the hardware. The second is that the refusal becomes a record — the moment of attempt, the user, the destination — which is the part an auditor asks for and the part a policy document cannot produce.",
            ]}
            slot={{ kind: "art", art: AnswerEndpoint }}
            stats={[
              { n: "6", label: "session controls" },
              { n: "per-app", label: "and per-group" },
              { n: "202", label: "logged event types" },
            ]}
          />
        </div>
      </section>

      {/* ---------------- THE SIX CONTROLS ---------------- */}
      <section className="ep-sec ep-sec--alt" id="controls">
        <div className="iz-wrap">
          <div className="ep-head">
            <span className="iz-ey">The six controls</span>
            <h2>
              Six things a session <em>will not do for you</em>.
            </h2>
            <p>
              Each one is a policy on an application and a user group, not a switch on a laptop. Turn a control on for
              the HR system and off for the sales tool, and the same person gets both answers in the same afternoon.
            </p>
          </div>

          <div className="ep-rows">
            <ConsoleRow
              eyebrow="Clipboard controls"
              title={
                <>
                  The copy that <em>never leaves</em>.
                </>
              }
              body="Block copy/paste and clipboard access for designated applications; block screen-capture and screen-recording actions initiated through the governed session context."
              facts={[
                ["Scope", "The InstaSafe session, not the OS at large"],
                ["Set on", "Per application, per user group"],
              ]}
              ctaLabel="See how DLP fits"
              ctaHref="/solutions/data-loss-prevention"
            >
              <EpClipboard />
            </ConsoleRow>

            <ConsoleRow
              reverse
              eyebrow="Watermark protection"
              title={
                <>
                  A screen photo that <em>names the photographer</em>.
                </>
              }
              body="Logo/text overlay rendered over on-screen content — every screen photo identifies its viewer."
              facts={[
                ["Carries", "User · session ID · timestamp"],
                ["Rendered", "Over the session, not into the file"],
              ]}
              ctaLabel="Inside the secure browser"
              ctaHref="/platform/secure-browser"
            >
              <EpWatermark />
            </ConsoleRow>

            <ConsoleRow
              eyebrow="Network filter"
              title={
                <>
                  Where the session <em>is allowed to reach</em>.
                </>
              }
              body="Block specified domains/IPs per user group during sessions."
              facts={[
                ["Filters", "Domains and IP ranges"],
                ["Applies", "For the duration of the session"],
              ]}
              ctaLabel="How the policy engine decides"
              ctaHref="/platform/trust-engine"
            >
              <EpNetwork />
            </ConsoleRow>

            <ConsoleRow
              reverse
              eyebrow="App filter"
              title={
                <>
                  The recorder that <em>will not start</em>.
                </>
              }
              body="Block launching specified local applications during sensitive sessions."
              facts={[
                ["Scope", "Named local applications"],
                ["Duration", "Only while the session is open"],
              ]}
              ctaLabel="Third-party and vendor access"
              ctaHref="/solutions/third-party-access"
            >
              <EpApps />
            </ConsoleRow>

            <ConsoleRow
              eyebrow="Chrome control"
              title={
                <>
                  The browser, <em>minus the exits</em>.
                </>
              }
              body="Restrict downloads, developer tools, and printing of browser content in governed browsing."
              facts={[
                ["Removes", "Download · dev tools · print"],
                ["Keeps", "The application itself, fully usable"],
              ]}
              ctaLabel="The secure enterprise browser"
              ctaHref="/platform/secure-browser"
            >
              <EpChrome />
            </ConsoleRow>

            <ConsoleRow
              reverse
              eyebrow="Inactivity timeout"
              title={
                <>
                  The unattended desk, <em>closed</em>.
                </>
              }
              body="Idle or low-transfer sessions disconnect automatically — the unattended-desk risk, closed."
              facts={[
                ["Trigger", "Idle time or low transfer"],
                ["Result", "Session disconnects, event logged"],
              ]}
              ctaLabel="Session controls in ZTAA"
              ctaHref="/zero-trust-application-access"
            >
              <EpIdle />
            </ConsoleRow>
          </div>
        </div>
      </section>

      <IzQuietBand statement="The session ends." emphasis="The evidence" tail="stays." />

      {/* ---------------- THREE OUTCOMES ---------------- */}
      <div id="outcomes">
        <IzOutcomes
          side="left"
          tag="Endpoint outcomes"
          title={["Nothing usable", "leaves", "the session."]}
          accentFrom={1}
          sub="The controls are not a fence around the person — they are a boundary around the data. The work carries on; the copy of it does not."
          artifact={EndpointControls}
          outcomes={[
            {
              Icon: Prohibit,
              title: "Insider risk gets guardrails",
              body: "The allowed user's unallowed action is blocked at the moment of attempt, and logged.",
            },
            {
              Icon: UsersThree,
              title: "Third parties leave empty-handed",
              body: "Vendors work in your systems; nothing usable leaves the session.",
            },
            {
              Icon: Certificate,
              title: "Compliance evidence by default",
              body: "Every enforcement event is one of the 202 logged types — the audit trail writes itself.",
            },
          ]}
        />
      </div>

      {/* ---------------- FAQ ---------------- */}
      <section className="ep-sec" id="faq">
        <div className="iz-wrap">
          <ChatFaq
            items={FAQ}
            heading={
              <>
                Endpoint controls, <em>answered</em>.
              </>
            }
            sub="Tap a question — or open them all and read straight through."
          />
        </div>
      </section>

      <FilterStream href="/zero-trust-application-access" />

      {/* ---------------- RELATED ---------------- */}
      <section className="ep-sec ep-sec--tight">
        <div className="iz-wrap">
          <IzRelatedRail
            variant="cards"
            links={[
              {
                kind: "platform",
                title: "Secure Browser",
                href: "/platform/secure-browser",
                desc: "Where watermarking and download control are enforced by the browser itself.",
              },
              {
                kind: "platform",
                title: "ZTAA session controls",
                href: "/platform/ztaa",
                desc: "RDP, SSH and database sessions under the same session-layer policy.",
              },
              {
                kind: "solution",
                title: "BYOD",
                href: "/solutions/byod",
                desc: "Corporate data on a personal laptop, without taking the laptop over.",
              },
              {
                kind: "solution",
                title: "Third-Party Access",
                href: "/solutions/third-party-access",
                desc: "Vendors reach exactly what is in scope — and leave with nothing else.",
              },
            ]}
          />
        </div>
      </section>

      <IzFinalCta reveal={false} />
      <IzFooterGrid />
    </div>
  );
}
