"use client";

import { useEffect, useState } from "react";

import { BookOpen, Compass, Heartbeat, House, Lightning, Target, UsersThree } from "@phosphor-icons/react";

import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { IzNav } from "@/components/home2/IzNav";
import { Magnetic } from "@/components/v2/Magnetic";
import { izFontVars } from "@/lib/iz-fonts";

import { OpeningsBoard } from "./OpeningsBoard";

/* ============================================================
   /careers — SEO-locked live URL, promoted from the scaffold
   registry to a bespoke route.

   The three drives and the four offers are the LIVE page's own
   lists, carried over word for word as headings; only the one-line
   blurbs under them are new. The hero passage is reproduced
   verbatim — it is the copy the indexed page ranks on.

   No numbered eyebrows anywhere (docs/no-index-numbers-rule.md):
   three drives and four perks are sets, not steps, and numbering a
   set invents an order that does not exist.
   ============================================================ */

const DRIVES = [
  {
    Icon: Target,
    title: "Pursuit of Excellence",
    body: "Shipping is the start of the work, not the end of it. The second pass is where a thing gets good.",
  },
  {
    Icon: Lightning,
    title: "Agility and Persistence",
    body: "Small teams, hard problems, short loops — and the patience to stay with a problem until it gives.",
  },
  {
    Icon: Compass,
    title: "Curiosity",
    body: "The useful question usually comes from someone outside the room the answer lives in. Ask it anyway.",
  },
];

const OFFERS = [
  {
    Icon: Heartbeat,
    title: "Comprehensive Insurance for Entire Family",
    body: "Cover that reaches the people you go home to, not only the person on the payroll.",
  },
  {
    Icon: House,
    title: "Work From Home",
    body: "Work from where you think best. We have been a distributed team for years, not since last quarter.",
  },
  {
    Icon: UsersThree,
    title: "Like Minded Intellectual Colleagues",
    body: "You will be the least experienced person in some rooms here. That is the part people stay for.",
  },
  {
    Icon: BookOpen,
    title: "Plenty of Opportunity to Learn",
    body: "Security keeps moving, so the ground under the job keeps moving. New territory is the normal assignment.",
  },
];

type Theme = "dark" | "paper";

export function CareersPage() {
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

      {/* ---------------- HERO ---------------- */}
      <header className="czr-hero iz-railed">
        <span className="iz-cross iz-cross--bl" aria-hidden="true" />
        <span className="iz-cross iz-cross--br" aria-hidden="true" />
        <div className="iz-wrap">
          <div className="czr-hero-in">
            <span className="iz-ey">Careers</span>
            <h1 className="iz-h1">
              Grow with <em>InstaSafe</em>.
            </h1>
            <span className="czr-rule" aria-hidden="true" />
            <p className="iz-lead">
              Working at InstaSafe is more than just a Job. It is an opportunity to find solutions to hard problems.
              It&apos;s about innovating the next generation of cybersecurity. So, if you have a knack for solving deep
              technological problems and creating new products, then this the place to be for you.
            </p>
            <div className="czr-hero-cta">
              <Magnetic>
                <a href="#openings" className="iz-btn iz-btn-pri">
                  See open roles
                </a>
              </Magnetic>
              <a href="/book-a-demo" className="iz-btn iz-btn-ghost">
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- WHAT DRIVES US ---------------- */}
      <section className="czr-sec" id="drives">
        <div className="iz-wrap">
          <div className="czr-head">
            <span className="iz-ey">What drives us</span>
            <h2 className="iz-h2">
              Three things we <em>hire for</em>.
            </h2>
            <p className="iz-dim">
              Not a values poster. These are the three traits that keep coming up in the people who do their best work
              here.
            </p>
          </div>

          <ul className="czr-cards czr-cards--three">
            {DRIVES.map(({ Icon, title, body }) => (
              <li className="czr-card iz-gridcell" key={title}>
                <span className="iz-cross iz-cross--tr" aria-hidden="true" />
                <Icon className="czr-ic" size={22} weight="regular" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- WHAT WE OFFER ---------------- */}
      <section className="czr-sec czr-sec--alt" id="offer">
        <div className="iz-wrap">
          <div className="czr-head">
            <span className="iz-ey">What we offer</span>
            <h2 className="iz-h2">
              The parts of the job <em>that aren&apos;t the job</em>.
            </h2>
            <p className="iz-dim">
              Nothing here is a perk in the table-tennis sense. It is what the work needs to be sustainable.
            </p>
          </div>

          <ul className="czr-cards czr-cards--four">
            {OFFERS.map(({ Icon, title, body }) => (
              <li className="czr-card iz-gridcell" key={title}>
                <span className="iz-cross iz-cross--tr" aria-hidden="true" />
                <Icon className="czr-ic" size={22} weight="regular" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- OPENINGS ----------------
          The heading is the live page's, unchanged: /careers is
          indexed on it and people arrive searching for it.

          The board spans the full `.iz-wrap` — it used to be a ~660px
          third-party widget, which made the page's main ask its
          smallest element. Only the HEADING keeps the narrow measure,
          because a 56ch line is still the readable one for prose. */}
      <section className="czr-sec czr-sec--openings" id="openings">
        <div className="iz-wrap">
          <div className="czr-head">
            <span className="iz-ey">Roles</span>
            <h2 className="iz-h2">Our Openings</h2>
            <p className="iz-dim">
              Live from our recruiting system. If nothing here fits, write to us anyway — we read every one.
            </p>
          </div>

          <OpeningsBoard />
        </div>
      </section>

      <IzFooterGrid />
    </div>
  );
}
