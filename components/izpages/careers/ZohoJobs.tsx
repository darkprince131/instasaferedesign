"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   ZohoJobs — the Zoho Recruit "embed careers site" widget.

   The old Gatsby page did exactly this: append Zoho's stylesheet,
   append their script, and on load call `rec_embed_js.load()` at a
   div they find by id. The markup nesting
   (`.embed_jobs_head.embed_jobs_with_style_3 > .embed_jobs_head2 >
   .embed_jobs_head3 > #rec_job_listing_div`) is not decorative —
   their injected stylesheet selects on those class names, so the
   listing loses its layout if the wrappers are renamed or flattened.

   WHAT IS NEW HERE IS THE FAILURE PATH. A third-party script behind
   a CSP, an ad blocker or a bad network fails silently, and the old
   page's answer to that was an empty region under a heading that
   promised openings. Three separate signals flip this to a fallback
   panel with a direct link to the Zoho-hosted board:

     1. script.onerror        — blocked or unreachable
     2. no `rec_embed_js`     — served, but not the script we expect
     3. still empty after 10s — loaded and ran, but rendered nothing

   The same link is ALSO rendered unconditionally under the widget,
   so a candidate always has a path even in the case none of the
   three fire and the list is simply short.
   ============================================================ */

const CSS_HREF = "https://static.zohocdn.com/recruit/embed_careers_site/css/v1.1/embed_jobs.css";
const JS_SRC = "https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js";

/* The Zoho-hosted board. Not a fallback of last resort only — it is
   the canonical listing, and the widget is a mirror of it. */
const BOARD_URL = "https://instasafe.zohorecruit.com/jobs/Careers";

/* How long the widget gets to put something in the div before we
   decide it is not going to. Long enough for a cold third-party
   fetch on a slow connection, short enough that nobody sits in front
   of an empty box wondering. */
const EMPTY_TIMEOUT_MS = 10_000;

type RecEmbedConfig = {
  widget_id: string;
  page_name: string;
  source: string;
  site: string;
  brand_color: string;
  empty_job_msg: string;
};

declare global {
  interface Window {
    rec_embed_js?: { load: (config: RecEmbedConfig) => void };
  }
}

/* --accent's paper value, hardcoded because it crosses a boundary:
   this is handed to a third-party script that writes inline styles
   into its own DOM, where our custom properties do not resolve.
   Keep in sync with `--accent-p` in iz-system.css §6. */
const BRAND_COLOR = "#f2480a";

export function ZohoJobs() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fail = () => {
      if (!cancelled) setFailed(true);
    };

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = CSS_HREF;
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = JS_SRC;
    script.async = true;
    script.type = "text/javascript";
    script.onload = () => {
      if (cancelled) return;
      /* Signal 2: the file arrived but did not define what it should. */
      if (!window.rec_embed_js?.load) {
        fail();
        return;
      }
      try {
        window.rec_embed_js.load({
          widget_id: "rec_job_listing_div",
          page_name: "Careers",
          source: "CareerSite",
          site: "https://instasafe.zohorecruit.com",
          brand_color: BRAND_COLOR,
          empty_job_msg: "No current Openings",
        });
      } catch {
        fail();
      }
    };
    /* Signal 1: blocked by CSP, an extension, or the network. */
    script.onerror = fail;
    document.body.appendChild(script);

    /* Signal 3: it ran and rendered nothing. Zoho writes its own
       "no openings" message into the div when the board is empty, so
       a genuinely empty board is NOT a failure — only an untouched
       div is. */
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      const host = hostRef.current;
      if (!host || (host.childElementCount === 0 && !host.textContent?.trim())) fail();
    }, EMPTY_TIMEOUT_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      link.remove();
      script.remove();
    };
  }, []);

  return (
    <div className="czr-jobs">
      {/* Zoho's own wrapper chain — their stylesheet selects on it. */}
      <div className="embed_jobs_head embed_jobs_with_style_3">
        <div className="embed_jobs_head2">
          <div className="embed_jobs_head3">
            <div id="rec_job_listing_div" ref={hostRef} />
          </div>
        </div>
      </div>

      {failed && (
        <div className="czr-jobs-fallback" role="status">
          <p>Listings didn&apos;t load.</p>
          <a className="iz-btn iz-btn-pri" href={BOARD_URL} target="_blank" rel="noreferrer">
            Open roles on Zoho Recruit
          </a>
        </div>
      )}

      <a className="czr-jobs-all" href={BOARD_URL} target="_blank" rel="noreferrer">
        View all openings on Zoho Recruit <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
