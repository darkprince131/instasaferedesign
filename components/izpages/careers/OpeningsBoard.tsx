"use client";

import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";

/* ============================================================
   OpeningsBoard — /careers openings, rendered natively.

   WHERE THE DATA COMES FROM. This is the SAME source the official
   Zoho Recruit "embed careers site" widget reads. That widget is a
   script from static.zohocdn.com that, once loaded, fetches:

     GET https://instasafe.zohorecruit.com/recruit/v2/public/
         Job_Openings?pagename=Careers&source=CareerSite

   — a public, CORS-open JSON endpoint (no key, no auth) returning
   `{ data: JobOpening[] }`. So we skip the middleman and fetch it
   ourselves. Nothing is scraped and nothing is private: the same
   bytes were already crossing the wire, they were just being painted
   by Zoho's stylesheet into a ~660px box with Zoho's fonts, an indigo
   search button and facet counts nobody asked for.

   WHY THAT MATTERS BEYOND LOOKS. Owning the render means the board
   inherits `.iz` tokens, so it flips with the theme toggle, respects
   `prefers-reduced-motion`, meets AA, and can occupy the page like a
   section instead of an iframe-shaped apology.

   THE FAILURE PATH IS THE PART THAT SURVIVES FROM THE OLD EMBED.
   A third-party origin behind a CSP, an ad blocker, a captive portal
   or a bad network fails silently, and the old page's answer to that
   was an empty region under a heading that promised openings. Four
   signals flip this to a fallback panel with a direct link to the
   Zoho-hosted board:

     1. fetch rejects        — blocked, offline, CORS refused
     2. non-OK response      — 4xx/5xx from Recruit
     3. body is not JSON, or `data` is not an array
     4. `data` is empty      — nothing publishable today

   The same link is ALSO rendered unconditionally under the board, so
   a candidate always has a path even when everything works and the
   list is simply short. `connect-src` in deploy/Caddyfile already
   allows instasafe.zohorecruit.com, which is all this fetch needs.
   ============================================================ */

const FEED_URL =
  "https://instasafe.zohorecruit.com/recruit/v2/public/Job_Openings?pagename=Careers&source=CareerSite";

/* The Zoho-hosted board. Not a fallback of last resort only — it is
   the canonical listing, and this board is a mirror of it. */
const BOARD_URL = "https://instasafe.zohorecruit.com/jobs/Careers";

/* What the endpoint actually returns, field for field. Everything is
   optional and half of it is nullable in practice: `Work_Experience`
   comes back `null` on most records, and a remote role has City,
   State and Country as EMPTY STRINGS rather than absent keys. Typing
   them honestly here is what stops "null" and " , " from reaching
   the meta row. */
type JobOpening = {
  id?: string;
  Posting_Title?: string | null;
  Job_Opening_Name?: string | null;
  Job_Description?: string | null;
  City?: string | null;
  State?: string | null;
  Country?: string | null;
  Industry?: string | null;
  Job_Type?: string | null;
  Work_Experience?: string | null;
  Date_Opened?: string | null;
  Publish?: boolean;
  Is_Locked?: boolean;
  Keep_on_Career_Site?: boolean;
  $url?: string | null;
};

/* The shape we actually render — everything already cleaned, so JSX
   below is layout only and never has to ask "is this string real". */
type Role = {
  key: string;
  title: string;
  href: string;
  location: string;
  region: string;
  type: string;
  experience: string;
  opened: string;
  openedAt: number;
  summary: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* Recruit hands back the org's display format, `MM/DD/YYYY` — NOT
   ISO. `new Date("10/30/2025")` happens to work in V8 but is
   implementation-defined, so the format is parsed explicitly and ISO
   is accepted as a second shape in case the org's setting changes.
   Anything else returns null and the card simply omits the date. */
function parseOpened(raw: string | null | undefined): Date | null {
  if (!raw) return null;
  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(raw.trim());
  if (us) return new Date(Number(us[3]), Number(us[1]) - 1, Number(us[2]));
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(raw.trim());
  if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  return null;
}

/* "30 Oct 2025". Built from a literal month table rather than
   `Intl.DateTimeFormat`, because the visitor's locale would otherwise
   decide whether this page says 30 Oct, Oct 30 or 2025/10/30 — and
   the meta row is a fixed-width mono line that was measured for one
   of those. */
function humanDate(d: Date): string {
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function clean(v: string | null | undefined): string {
  return typeof v === "string" ? v.trim() : "";
}

function slugify(title: string): string {
  return title
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

/* Every record carries a `$url` and — verified against the live feed —
   it is already the public job page the embed itself links to:
   https://instasafe.zohorecruit.com/jobs/Careers/<id>/<Slug>?source=CareerSite
   So `$url` is used as-is when it is an https URL on the Recruit host.
   The constructed form is the fallback for the day a record arrives
   with `$url` missing, relative, or pointing at the internal CRM
   record instead of the career site. Anything with neither a usable
   `$url` nor an id falls back to the board itself. */
function applyHref(job: JobOpening, title: string): string {
  const raw = clean(job.$url);
  if (/^https:\/\/[a-z0-9-]+\.zohorecruit\.com\/jobs\//i.test(raw)) return raw;
  const id = clean(job.id);
  if (id) return `${BOARD_URL}/${id}/${slugify(title)}?source=CareerSite`;
  return BOARD_URL;
}

/* The description is one long plain-text blob with no markup (checked
   against all 14 live records: zero tags, zero entities). It still
   arrives with runs of whitespace from whatever pasted it in, so it
   is collapsed before the clamp gets it — otherwise a stray double
   space eats one of the three visible lines. */
function summarise(raw: string | null | undefined): string {
  return clean(raw).replace(/\s+/g, " ");
}

function toRole(job: JobOpening, index: number): Role | null {
  const title = clean(job.Posting_Title) || clean(job.Job_Opening_Name);
  if (!title) return null;

  const city = clean(job.City);
  const state = clean(job.State);
  const opened = parseOpened(job.Date_Opened);

  return {
    key: clean(job.id) || `${title}-${index}`,
    title,
    href: applyHref(job, title),
    /* A role with no city, state OR country is Zoho's way of saying
       remote — it is what the widget's own "Remote Job (2)" facet
       counts. Naming it here is what puts "Remote" on the card and in
       the Location chips instead of a blank pill. */
    location: city || "Remote",
    region: state,
    type: clean(job.Job_Type),
    experience: clean(job.Work_Experience),
    opened: opened ? humanDate(opened) : "",
    openedAt: opened ? opened.getTime() : 0,
    summary: summarise(job.Job_Description),
  };
}

/* Distinct values in first-seen order. Chip groups are built from the
   response and never from a hardcoded list: the day someone in
   Recruit opens a Pune role or a contract role, the chip appears on
   its own. */
function distinct(roles: Role[], pick: (r: Role) => string): string[] {
  const seen: string[] = [];
  for (const r of roles) {
    const v = pick(r);
    if (v && !seen.includes(v)) seen.push(v);
  }
  return seen;
}

type Status = "loading" | "ready" | "failed";

const SKELETON_ROWS = 4;

export function OpeningsBoard() {
  const [status, setStatus] = useState<Status>("loading");
  const [roles, setRoles] = useState<Role[]>([]);

  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        const res = await fetch(FEED_URL, { signal: ac.signal, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const body: unknown = await res.json();
        const data = (body as { data?: unknown })?.data;
        if (!Array.isArray(data)) throw new Error("no data array");

        const list = (data as JobOpening[])
          /* Recruit keeps unpublished and locked records in the same
             collection. Neither appears on the hosted board, so
             neither appears here. `Keep_on_Career_Site` is a Recruit
             housekeeping flag, NOT a visibility switch — it is false
             on 13 of today's 14 live roles, so filtering on it would
             empty the board. */
          .filter((j) => j?.Publish !== false && j?.Is_Locked !== true)
          .map(toRole)
          .filter((r): r is Role => r !== null)
          /* Newest opening first. Records with an unparseable date
             sort to the bottom rather than to 1970-on-top. */
          .sort((a, b) => b.openedAt - a.openedAt);

        if (ac.signal.aborted) return;
        if (list.length === 0) throw new Error("empty board");

        setRoles(list);
        setStatus("ready");
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        setStatus("failed");
      }
    })();

    return () => ac.abort();
  }, []);

  const locationOptions = useMemo(() => distinct(roles, (r) => r.location), [roles]);
  const experienceOptions = useMemo(() => distinct(roles, (r) => r.experience), [roles]);
  const typeOptions = useMemo(() => distinct(roles, (r) => r.type), [roles]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roles.filter((r) => {
      /* Search covers the title and the place. `location` is used
         rather than the raw City so that typing "remote" finds the
         two roles whose City is an empty string. */
      if (q && !`${r.title} ${r.location}`.toLowerCase().includes(q)) return false;
      /* Within a group the chips are an OR; across groups an AND. */
      if (locations.length && !locations.includes(r.location)) return false;
      if (experiences.length && !experiences.includes(r.experience)) return false;
      if (types.length && !types.includes(r.type)) return false;
      return true;
    });
  }, [roles, query, locations, experiences, types]);

  const filtering = query.trim() !== "" || locations.length > 0 || experiences.length > 0 || types.length > 0;

  const clearAll = () => {
    setQuery("");
    setLocations([]);
    setExperiences([]);
    setTypes([]);
  };

  const toggle = (setter: Dispatch<SetStateAction<string[]>>, value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  /* ---------- loading ---------- */
  if (status === "loading") {
    return (
      <div className="czr-jb">
        <div className="czr-jb-grid czr-jb-grid--skeleton" aria-hidden="true">
          {Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <div className="czr-jb-skel" key={i}>
              <span className="czr-jb-skel-line czr-jb-skel-title" />
              <span className="czr-jb-skel-line czr-jb-skel-meta" />
              <span className="czr-jb-skel-line" />
              <span className="czr-jb-skel-line czr-jb-skel-short" />
            </div>
          ))}
        </div>
        <p className="czr-sr" role="status">
          Loading open roles.
        </p>
        <BoardLink />
      </div>
    );
  }

  /* ---------- fetch failed, or nothing publishable ---------- */
  if (status === "failed") {
    return (
      <div className="czr-jb">
        <div className="czr-jb-fallback" role="status">
          <p>We couldn&apos;t load the openings here.</p>
          <a className="iz-btn iz-btn-pri" href={BOARD_URL} target="_blank" rel="noopener noreferrer">
            Open roles on Zoho Recruit
          </a>
        </div>
        <BoardLink />
      </div>
    );
  }

  /* ---------- the board ---------- */
  return (
    <div className="czr-jb">
      <div className="czr-jb-controls">
        <div className="czr-jb-search">
          <label className="czr-sr" htmlFor="czr-jb-q">
            Search open roles by title or location
          </label>
          <input
            id="czr-jb-q"
            className="czr-jb-input"
            type="search"
            autoComplete="off"
            placeholder="Search roles or locations"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <ChipGroup
          label="Location"
          options={locationOptions}
          active={locations}
          onToggle={(v) => toggle(setLocations, v)}
        />
        <ChipGroup
          label="Experience"
          options={experienceOptions}
          active={experiences}
          onToggle={(v) => toggle(setExperiences, v)}
        />
        {/* One job type across every open role today, so the group
            would be a single chip that can only ever filter to
            everything. It renders itself back in the day a second
            type appears. */}
        {typeOptions.length > 1 && (
          <ChipGroup label="Type" options={typeOptions} active={types} onToggle={(v) => toggle(setTypes, v)} />
        )}

        <div className="czr-jb-status">
          {/* The live region carries the SUMMARY LINE only, not the
              grid. Wrapping the cards would make every keystroke in
              the search box read out fourteen job titles. */}
          <p className="czr-jb-count" aria-live="polite">
            {filtering
              ? `${visible.length} match${visible.length === 1 ? "" : "es"}`
              : `${roles.length} open role${roles.length === 1 ? "" : "s"}`}
          </p>
          {filtering && (
            <button type="button" className="czr-jb-clear" onClick={clearAll}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {visible.length > 0 ? (
        <ul className="czr-jb-grid">
          {visible.map((r) => (
            <li key={r.key}>
              <a className="czr-jb-card" href={r.href} target="_blank" rel="noopener noreferrer">
                <h3 className="czr-jb-title">{r.title}</h3>

                <p className="czr-jb-meta">
                  {[
                    [r.location, r.region].filter(Boolean).join(", "),
                    r.type,
                    r.experience,
                    r.opened ? `Opened ${r.opened}` : "",
                  ]
                    .filter(Boolean)
                    /* Index key, not the value: two facets can carry
                       the same string and a duplicate key would drop
                       one of them from the row. The list is derived,
                       ordered and never reordered, so the index is
                       stable. The separator is aria-hidden so a
                       screen reader gets the fields, not a row of
                       middots. */
                    .map((bit, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <span key={i}>
                        {i > 0 && <span aria-hidden="true"> · </span>}
                        {bit}
                      </span>
                    ))}
                </p>

                {r.summary && <p className="czr-jb-desc">{r.summary}</p>}

                <span className="czr-jb-go">
                  View role &amp; apply <span aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        /* Zero MATCHES is not zero ROLES — the board loaded fine, the
           filters are just narrow. Offering the Zoho link here would
           tell someone their search failed when it did not. */
        <div className="czr-jb-none">
          <p>No roles match that. Try a wider search.</p>
          <button type="button" className="iz-btn iz-btn-ghost iz-btn-sm" onClick={clearAll}>
            Clear filters
          </button>
        </div>
      )}

      <BoardLink />
    </div>
  );
}

/* Rendered in every state — loading, failed and loaded. A candidate
   should never need this page to have worked. */
function BoardLink() {
  return (
    <a className="czr-jb-all" href={BOARD_URL} target="_blank" rel="noopener noreferrer">
      View all openings on Zoho Recruit <span aria-hidden="true">→</span>
    </a>
  );
}

function ChipGroup({
  label,
  options,
  active,
  onToggle,
}: {
  label: string;
  options: string[];
  active: string[];
  onToggle: (value: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div className="czr-jb-group" role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
      <span className="czr-jb-grouplabel">{label}</span>
      <div className="czr-jb-chips">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className="czr-jb-chip"
            aria-pressed={active.includes(opt)}
            onClick={() => onToggle(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
