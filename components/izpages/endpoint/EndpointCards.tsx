"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Code,
  DotsThreeVertical,
  DownloadSimple,
  Folder,
  HardDrives,
  LockSimple,
  Printer,
  Prohibit,
  ShieldCheck,
  Star,
} from "@phosphor-icons/react";

import { useHoverIndex } from "@/components/izpages/pro/useHoverIndex";

/* ============================================================
   EndpointCards — "The six controls" (replaces the ConsoleRow stack)

   The client's After Effects reference is six little desktop movies:
   a wallpaper, a dock, desktop icons, a cursor that actually does
   something, a right-click menu, a titled tab naming the control.

   GRAMMAR IS 00an (IzAgentCards / the SSO trio). One identical shell
   — two-line verdict title, a sentence, a stage, a tinted wash rising
   from the foot — with a different mock inside each, and the wash
   tinted to the verdict that mock reaches.

   ------------------------------------------------------------
   THE DIFFERENTIATION PASS (client review: "all feel similar and
   flat"). The shell is still identical — that is what makes six
   animations read as six answers to one question — but the SCENE
   inside it no longer is. Each card now has

     · a DIFFERENT COMPOSITION. Clipboard is a small window with a
       menu thrown over it; watermark is one near-full-bleed window
       under a field of marks; network and chrome are browser windows
       pinned to the top edge at two different scales; app filter has
       no window at all and is pure desktop; inactivity is mostly
       lock screen.
     · a DIFFERENT FOCAL ELEMENT — context menu, watermark field,
       bookmarks bar, desktop icon, browser toolbar, countdown ring.
       Name the six out loud and they are six different objects.
     · REAL APP ICONS. The client's converted marks (/public/apps)
       are in the mocks, the dock and the desktop, so notepad reads
       as Notepad and Chrome reads as Chrome rather than as a
       phosphor glyph that means "a browser".
     · THE SAME WALLPAPER as the simulator and the homepage
       mini-desktop, and the same Windows-11 / Chrome window
       palettes. Literal colour, theme-constant, scoped to the
       depicted screen — see the commented blocks in endpoint.css.

   THE MOTION CONTRACT is unchanged, and it is why mobile needs no
   special case: every animation is declared INSIDE
   `.epk-card.is-live`. Hover-out REMOVES the animation, so the
   element snaps to its natural CSS state — and the natural state of
   everything here is its FINISHED state: the menu is open with Copy
   struck, the watermark tiles are down, the deny toast is up, the
   screen is already locked. A card that never animates has therefore
   lost nothing.

   `.is-live` comes from hover OR focus (useHoverIndex handles both),
   and on a touch device from a one-shot IntersectionObserver play,
   exactly as 00an does it.
   ============================================================ */

const APP = {
  chrome: "/apps/chrome-64.webp",
  notepad: "/apps/notepad-64.webp",
  anydesk: "/apps/anydesk-64.webp",
  explorer: "/apps/file-explorer-48.webp",
  brand: "/brand/instasafe-mark-color.svg",
} as const;

function Ico({ src, size, className = "" }: { src: string; size: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`epk-appico ${className}`.trim()}
      src={src}
      width={size}
      height={size}
      alt=""
      draggable={false}
    />
  );
}

/* ---------- the cursor, same arrow the hero draws ---------- */
function Cursor({ className = "" }: { className?: string }) {
  return (
    <span className={`epk-cur ${className}`} aria-hidden="true">
      <svg viewBox="0 0 19 23" width="14" height="17">
        <path d="M1.6 1.2 L1.6 18.4 L6.1 14.3 L8.8 20.6 L11.8 19.3 L9.1 13.2 L15.2 13 Z" />
      </svg>
    </span>
  );
}

/* ---------- one mini desktop: titled tab, wallpaper, taskbar ----------
     The tab is the client's device: their GIFs name the control on the
     window itself rather than only in the caption, which is what makes
     the little scene feel like a product and not a diagram. The tabbar
     is the CARD's furniture and stays token-painted; everything below
     it is the depicted screen and is not. */
function Mini({ tab, children }: { tab: string; children: ReactNode }) {
  return (
    <div className="epk-mini" aria-hidden="true">
      <div className="epk-tabbar">
        <span className="epk-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="epk-tab">{tab}</span>
      </div>
      <div className="epk-screen">
        <span className="epk-wall" />
        {children}
        <span className="epk-dock">
          <i className="epk-dk epk-dk--brand">
            <Ico src={APP.brand} size={11} />
          </i>
          <i className="epk-dk">
            <Ico src={APP.explorer} size={13} />
          </i>
          <i className="epk-dk">
            <Ico src={APP.chrome} size={13} />
          </i>
          <b className="epk-clock">10:42</b>
        </span>
      </div>
    </div>
  );
}

function Toast({ tone, title, sub }: { tone: "deny" | "on"; title: string; sub: string }) {
  return (
    <span className={`epk-toast ${tone}`}>
      <i className="epk-toast-ic">
        {tone === "deny" ? <Prohibit size={13} weight="bold" /> : <ShieldCheck size={13} weight="bold" />}
      </i>
      <span className="epk-toast-tx">
        <b>{title}</b>
        <em>{sub}</em>
      </span>
    </span>
  );
}

/* ---------- the shared bit of Chrome furniture ----------
     Two cards are browsers, at two different scales and pointing at
     two different parts of the window. This draws the tab strip both
     of them need — the InstaSafe mark is the favicon because the tab
     IS the portal, and the three window buttons are the giveaway that
     this is Windows. */
function ChromeTabs({ title }: { title: string }) {
  return (
    <span className="epk-crm-tabs">
      <span className="epk-crm-tab">
        <Ico src={APP.brand} size={9} />
        {title}
      </span>
      <span className="epk-crm-wc">
        <i />
        <i />
        <i className="x" />
      </span>
    </span>
  );
}

/* ============================================================
   1 · CLIPBOARD — small Notepad window low-left, two rows selected,
   and the RIGHT-CLICK MENU thrown over it at three-quarter scale
   with Copy struck. The menu is the focal object: it is the only
   card where the refusal is written into an OS surface rather than
   into a notification.
   ============================================================ */
function MockClipboard() {
  return (
    <Mini tab="Clipboard Control">
      <span className="epk-win epk-win--note">
        <span className="epk-wbar">
          <Ico src={APP.notepad} size={11} />
          Q3-vendors.txt
          <i className="epk-wbtn" />
          <i className="epk-wbtn" />
          <i className="epk-wbtn epk-wbtn--x" />
        </span>
        <span className="epk-wmenu">
          <i>File</i>
          <i>Edit</i>
          <i>View</i>
        </span>
        <span className="epk-wbody">
          <span className="epk-tl" style={{ ["--w" as string]: "84%" }} />
          <span className="epk-tl epk-tl--sel" style={{ ["--w" as string]: "72%" }} />
          <span className="epk-tl epk-tl--sel" style={{ ["--w" as string]: "61%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "48%" }} />
        </span>
      </span>

      <span className="epk-menu">
        <span className="epk-mi epk-mi--no">
          <LockSimple size={9} weight="bold" />
          <span className="epk-mi-l" style={{ ["--i" as string]: 0 } as CSSProperties}>
            Copy
          </span>
          <em>policy</em>
        </span>
        <span className="epk-mi epk-mi--no">
          <LockSimple size={9} weight="bold" />
          <span className="epk-mi-l" style={{ ["--i" as string]: 1 } as CSSProperties}>
            Copy with headers
          </span>
        </span>
        <span className="epk-mi">
          <i className="epk-mi-sp" />
          <span className="epk-mi-l epk-mi-l--ok">Refresh</span>
        </span>
      </span>

      <Cursor className="epk-cur--clip" />
      <Toast tone="deny" title="Clipboard blocked" sub="policy · hr-portal" />
    </Mini>
  );
}

/* ============================================================
   2 · WATERMARK — one near-full-bleed document and nothing else, so
   the WATERMARK FIELD is the whole picture. The only card whose end
   state is an overlay rather than a refusal, which is why it takes
   the accent wash instead of the deny one and carries no toast.
   ============================================================ */
const WM_TILES = Array.from({ length: 18 }, (_, i) => i);

function MockWatermark() {
  return (
    <Mini tab="Watermarking">
      <span className="epk-win epk-win--wide">
        <span className="epk-wbar">
          <Ico src={APP.notepad} size={11} />
          Payments · Q3
          <i className="epk-wbtn" />
          <i className="epk-wbtn" />
          <i className="epk-wbtn epk-wbtn--x" />
        </span>
        <span className="epk-wbody">
          <span className="epk-tl" style={{ ["--w" as string]: "88%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "64%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "79%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "52%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "70%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "43%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "81%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "58%" }} />
        </span>
      </span>
      <span className="epk-marks">
        {WM_TILES.map((i) => (
          <b key={i} style={{ ["--i" as string]: i } as CSSProperties}>
            sophia.s · 8F2A
          </b>
        ))}
      </span>
    </Mini>
  );
}

/* ============================================================
   3 · NETWORK FILTER — a Chrome window on the top edge, and the
   BOOKMARKS BAR is the focal: the personal drive is struck where it
   sits in the bar, the support domain beside it is not, and the page
   below turns into Chrome's own name-not-resolved page. A filter
   that only ever says no is a firewall, not a policy.
   ============================================================ */
function MockNetwork() {
  return (
    <Mini tab="Network Filter">
      <span className="epk-win epk-win--chrome epk-win--net">
        <ChromeTabs title="InstaSafe Portal" />
        <span className="epk-crm-bar">
          <span className="epk-crm-omni">
            <LockSimple size={8} weight="fill" />
            <span className="epk-crm-url">
              <b>portal.instasafe.com</b>/apps
            </span>
            <Star size={8} weight="regular" />
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="epk-crm-av" src="/people/sophia-s-256.webp" width={11} height={11} alt="" draggable={false} />
          <DotsThreeVertical size={10} weight="bold" />
        </span>
        <span className="epk-crm-bm">
          <b className="epk-bmk epk-bmk--deny">
            <HardDrives size={9} weight="regular" />
            drive-personal.com
            <s className="epk-bmstrike" />
          </b>
          <b className="epk-bmk">
            <Folder size={9} weight="fill" />
            sap-support.com
          </b>
        </span>
        <span className="epk-crm-page epk-crm-page--err">
          <i className="epk-err-h">This site can’t be reached</i>
          <i className="epk-err-c">ERR_NAME_NOT_RESOLVED</i>
        </span>
      </span>
      <Toast tone="deny" title="drive-personal.com denied" sub="net_filter · grp-finance" />
    </Mini>
  );
}

/* ============================================================
   4 · APP FILTER — the only card with NO WINDOW. Four desktop icons
   on the wallpaper, and the DESKTOP ICON the cursor goes for is the
   remote access tool, which greys out and takes a lock badge.
   ============================================================ */
function MockApps() {
  return (
    <Mini tab="Application Filter">
      <span className="epk-icons">
        <span className="epk-ic">
          <i className="epk-ic-tile epk-ic-tile--brand">
            <Ico src={APP.brand} size={19} />
          </i>
          InstaSafe
        </span>
        <span className="epk-ic">
          <i className="epk-ic-tile">
            <Ico src={APP.notepad} size={26} />
          </i>
          Q3-vendors
        </span>
        <span className="epk-ic epk-ic--target">
          <i className="epk-ic-tile">
            <Ico src={APP.anydesk} size={26} />
            <b className="epk-ic-lock">
              <LockSimple size={8} weight="fill" />
            </b>
          </i>
          anydesk.exe
        </span>
        <span className="epk-ic">
          <i className="epk-ic-tile">
            <Ico src={APP.chrome} size={26} />
          </i>
          Chrome
        </span>
      </span>
      <Cursor className="epk-cur--app" />
      <Toast tone="deny" title="anydesk.exe blocked" sub="application filter" />
    </Mini>
  );
}

/* ============================================================
   5 · CHROME CONTROL — the same browser as card 3, but blown up so
   the TOOLBAR is the focal and the page underneath is barely there.
   Three exits struck one after another while the page stays
   perfectly usable. That order matters: the claim is subtraction,
   not shutdown.
   ============================================================ */
function MockChrome() {
  return (
    <Mini tab="Chrome">
      <span className="epk-win epk-win--chrome epk-win--crmbig">
        <ChromeTabs title="InstaSafe Portal" />
        <span className="epk-crm-bar epk-crm-bar--big">
          <span className="epk-crm-omni">
            <LockSimple size={9} weight="fill" />
            <span className="epk-crm-url">
              <b>portal.instasafe.com</b>/apps
            </span>
            <Star size={9} weight="regular" />
          </span>
          <span className="epk-glyphs">
            <b style={{ ["--i" as string]: 0 } as CSSProperties}>
              <DownloadSimple size={11} weight="regular" />
              <s />
            </b>
            <b style={{ ["--i" as string]: 1 } as CSSProperties}>
              <Printer size={11} weight="regular" />
              <s />
            </b>
            <b style={{ ["--i" as string]: 2 } as CSSProperties}>
              <Code size={11} weight="regular" />
              <s />
            </b>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="epk-crm-av" src="/people/sophia-s-256.webp" width={11} height={11} alt="" draggable={false} />
        </span>
        <span className="epk-crm-bm">
          <b className="epk-bmk">
            <HardDrives size={9} weight="regular" />
            drive-personal.com
          </b>
          <b className="epk-bmk">
            <Folder size={9} weight="fill" />
            sap-support.com
          </b>
        </span>
        <span className="epk-crm-page">
          <i className="epk-pl" style={{ ["--w" as string]: "78%" }} />
          <i className="epk-pl" style={{ ["--w" as string]: "54%" }} />
          <span className="epk-chip">restricted</span>
        </span>
      </span>
    </Mini>
  );
}

/* ============================================================
   6 · INACTIVITY — the RING empties over a document that is barely
   visible behind it, then the screen dims to a lock plate carrying
   the InstaSafe mark. The only card that ends with nothing left on
   screen, and the only one that is mostly lock screen.
   ============================================================ */
function MockIdle() {
  return (
    <Mini tab="Inactivity Timeout">
      <span className="epk-win epk-win--doc">
        <span className="epk-wbar">
          <Ico src={APP.notepad} size={11} />
          Payments · Q3
          <i className="epk-wbtn" />
          <i className="epk-wbtn" />
          <i className="epk-wbtn epk-wbtn--x" />
        </span>
        <span className="epk-wbody">
          <span className="epk-tl" style={{ ["--w" as string]: "82%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "60%" }} />
          <span className="epk-tl" style={{ ["--w" as string]: "71%" }} />
        </span>
      </span>
      <span className="epk-ring">
        <svg viewBox="0 0 36 36">
          <circle className="bg" cx="18" cy="18" r="15.5" />
          <circle className="fg" cx="18" cy="18" r="15.5" />
        </svg>
        <b>15:00</b>
      </span>
      <span className="epk-lock">
        <span className="epk-lock-mark">
          <Ico src={APP.brand} size={18} />
        </span>
        <span className="epk-lock-l">Session closed — 15 min idle</span>
      </span>
    </Mini>
  );
}

/* ============================================================
   THE SIX. Body copy for clipboard is the legal-checked 4.0 wording,
   reproduced verbatim — its scope is the InstaSafe session and not the
   OS at large, and it must not be tightened without Product.
   ============================================================ */
type Card = {
  id: string;
  title: [string, string];
  body: string;
  tone: "deny" | "warn";
  aria: string;
  Mock: () => ReactNode;
};

const CARDS: Card[] = [
  {
    id: "clipboard",
    title: ["Clipboard controls —", "the copy that never leaves"],
    body: "Block copy/paste and clipboard access for designated applications; block screen-capture and screen-recording actions initiated through the governed session context.",
    tone: "deny",
    aria:
      "A Notepad window inside a governed session. Two lines are selected, the right-click menu opens with Copy locked by policy, and the clipboard request is refused.",
    Mock: MockClipboard,
  },
  {
    id: "watermark",
    title: ["Watermark protection —", "the screen names its viewer"],
    body: "A logo and text overlay is rendered over on-screen content, carrying the user, the session ID and the time — so a photograph of the screen identifies who took it.",
    tone: "warn",
    aria:
      "A document filling a session screen with identity watermark tiles sweeping across it, each reading the user handle and session ID.",
    Mock: MockWatermark,
  },
  {
    id: "network",
    title: ["Network filter —", "where the session may reach"],
    body: "Specified domains and IP ranges are blocked per user group for the life of the session. The support domain still resolves; the personal drive does not.",
    tone: "deny",
    aria:
      "A Chrome window in a session. The personal file-sharing bookmark is struck out in the bookmarks bar and the page reports the name could not be resolved, while the vendor support bookmark is untouched.",
    Mock: MockNetwork,
  },
  {
    id: "apps",
    title: ["App filter —", "the tool that will not start"],
    body: "Named local applications are blocked from launching while a sensitive session is open, and released the moment it closes.",
    tone: "deny",
    aria:
      "A desktop with four application icons. A remote access tool is clicked and refuses to launch, greying out with a lock badge and an administrator notice.",
    Mock: MockApps,
  },
  {
    id: "chrome",
    title: ["Chrome control —", "the browser, minus the exits"],
    body: "Downloads, developer tools and printing are switched off in governed browsing. The application itself stays entirely usable.",
    tone: "warn",
    aria:
      "A Chrome toolbar where download, print and developer tools are struck out one after another while the page stays readable.",
    Mock: MockChrome,
  },
  {
    id: "idle",
    title: ["Inactivity timeout —", "the unattended desk, closed"],
    body: "Idle or low-transfer sessions disconnect on their own, and the disconnect is logged like every other decision.",
    tone: "deny",
    aria: "A session counting down while idle, then dimming to a lock plate reading session closed after fifteen minutes idle.",
    Mock: MockIdle,
  },
];

export function EndpointCards() {
  const ref = useRef<HTMLDivElement>(null);
  const { index, canHover } = useHoverIndex(ref, ".epk-card");
  const [played, setPlayed] = useState<Set<number>>(new Set());

  /* Touch path only. On a pointer device the hover hook owns which card
     is live; adding scroll plays on top would mean several cards moving
     at once, which is the noise this section exists to avoid. */
  useEffect(() => {
    const el = ref.current;
    if (!el || canHover || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const cards = [...el.querySelectorAll<HTMLElement>(".epk-card")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = cards.indexOf(e.target as HTMLElement);
          if (i < 0) continue;
          setPlayed((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
          io.unobserve(e.target);
        }
      },
      { threshold: 0.4 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [canHover]);

  return (
    <div className="epk-row" ref={ref}>
      {CARDS.map((c, i) => {
        const M = c.Mock;
        return (
          <article
            key={c.id}
            className={`epk-card t-${c.tone} k-${c.id}${index === i || played.has(i) ? " is-live" : ""}`}
            tabIndex={0}
            aria-label={c.aria}
          >
            <h3 className="epk-cardtitle">
              {c.title[0]}
              <br />
              {c.title[1]}
            </h3>
            <p className="epk-cardbody">{c.body}</p>
            <div className="epk-stage">
              <M />
            </div>
            <span className="epk-wash" aria-hidden="true" />
          </article>
        );
      })}
    </div>
  );
}
