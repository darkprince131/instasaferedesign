/**
 * Ghost Content API — read-only, server-side only.
 *
 * The blog corpus lives in Ghost at instasafe.com/blog and stays there for
 * this phase: we render an index in our own design system, but every card
 * links back to Ghost's own post URL. Nothing here writes, and the Content
 * key must never reach the browser — import this from server components only.
 *
 * Field selection is deliberate. `html` is ~40x the weight of everything else
 * combined and the index renders no post bodies, so it is never requested.
 *
 * Known Ghost behaviour worth remembering: `reading_time` is DERIVED from
 * `html` at serialisation time. Ask for it without asking for `html` and Ghost
 * returns nothing at all for it — not zero, absent. Cards therefore carry no
 * reading time; adding one means either fetching 330 post bodies or storing
 * the number somewhere else.
 */

export type GhostTag = { name: string; slug: string };

/** Exactly what a card renders — nothing from the API travels further. */
export type BlogCard = {
  title: string;
  slug: string;
  /** Ghost's own absolute URL. Never rewritten. */
  url: string;
  image: string | null;
  imageAlt: string | null;
  /** Already cleaned and word-boundary truncated. */
  excerpt: string;
  publishedAt: string;
  tags: GhostTag[];
};

export type BlogIndexData = {
  posts: BlogCard[];
  /** Tags present in the fetched set, most-used first, filter-row ready. */
  tags: (GhostTag & { count: number })[];
};

/** Tags that exist in Ghost but are not editorial topics. */
const HIDDEN_TAGS = new Set(["instasafe-in-news"]);

const EXCERPT_CHARS = 190;
const FIELDS = [
  "title",
  "slug",
  "url",
  "feature_image",
  "feature_image_alt",
  "custom_excerpt",
  "excerpt",
  "published_at",
].join(",");

type RawPost = {
  title?: string;
  slug?: string;
  url?: string;
  feature_image?: string | null;
  feature_image_alt?: string | null;
  custom_excerpt?: string | null;
  excerpt?: string | null;
  published_at?: string;
  tags?: { name?: string; slug?: string; visibility?: string }[];
};

/**
 * Trim to a word boundary and mark the cut.
 *
 * Required, not cosmetic: no post in the corpus carries a `custom_excerpt`, so
 * every card falls through to Ghost's auto-excerpt — a hard 500-character
 * slice that lands mid-word and mid-clause with no punctuation. Cut cleanly
 * and add the ellipsis ourselves, or every card looks like a rendering bug.
 *
 * The half-length floor keeps a pathological case (one 400-character "word")
 * from collapsing the excerpt to nothing.
 */
export function truncateOnWord(input: string, max = EXCERPT_CHARS): string {
  if (input.length <= max) return input;
  const window = input.slice(0, max + 1);
  const lastSpace = window.lastIndexOf(" ");
  const body = lastSpace > max / 2 ? window.slice(0, lastSpace) : input.slice(0, max);
  return body.replace(/[\s.,;:!?…"'’”\-–—]+$/u, "") + "…";
}

/**
 * Ghost auto-excerpts are plain text lifted from the rendered body, so they
 * arrive carrying the layout of whatever they were lifted from: hard newlines,
 * indented runs, and markdown-ish list bullets from any `<ul>` caught in the
 * first 500 characters. Flatten all of it to one line first — truncating
 * before this would count whitespace against the character budget.
 */
function cleanExcerpt(input: string): string {
  return input
    .replace(/\s*\n\s*[*•-]\s+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^[*•-]\s+/, "")
    .trim();
}

function env(name: string, fallback?: string): string | null {
  const v = process.env[name] ?? fallback;
  if (!v) return null;
  return v.replace(/\/+$/, "");
}

/** Hosts this app itself answers on. If GHOST_API_URL names one of these,
    the Content API request is a loop — see the check in getBlogIndex. */
const SITE_HOSTS = ["instasafe.com", "netlify.app", "localhost"];

/**
 * Fetch the whole corpus in one request (~330 posts).
 *
 * `limit=all` over server-side pagination on purpose: the payload with `html`
 * excluded is a few hundred KB, it is fetched once per revalidation window at
 * build time rather than per visitor, and holding the full set in one place is
 * what lets the filter row be instant and count-accurate. Server-side
 * `filter=tag:` would mean one round trip per chip press for a smaller win.
 */
/* ▸ THIS FUNCTION MUST NOT BE ABLE TO FAIL A BUILD ▸
   It used to throw — on a missing env var, and on any non-OK response
   from Ghost. /blog is statically prerendered, so a throw here did not
   fail one page, it exited the whole `next build`:

     Error: [ghost] Missing required env var GHOST_CONTENT_KEY
     Export encountered an error on /blog/page: /blog, exiting the build.

   That is exactly what had been happening on the deploy host. The key
   lives in .env.local, which is gitignored because it is a secret, so
   the host never had it — and every build since /blog landed failed and
   left the previous deploy serving. One third-party API being
   unreachable should never take 153 unrelated pages offline with it.

   So it fails SOFT: an empty index, and a loud console error so a real
   misconfiguration is still obvious in the build log rather than
   silently shipping an empty page nobody notices. */
export async function getBlogIndex(): Promise<BlogIndexData> {
  const base = env("GHOST_API_URL", "https://instasafe.com/blog");
  const key = env("GHOST_CONTENT_KEY");

  if (!base || !key) {
    console.error(
      "[ghost] GHOST_CONTENT_KEY is not set — /blog will render empty. " +
        "Set it in the host's environment variables to restore the index."
    );
    return { posts: [], tags: [] };
  }

  /* ▸ WARN, DO NOT REFUSE ▸
     https://instasafe.com/blog is the correct value or a self-reference
     depending on infrastructure state, and the code cannot tell which
     from the string alone. It worked for months: the apex was the old
     site, nginx reverse-proxied everything under /blog to Ghost, and a
     build anywhere on the internet could read the Content API over that
     public path. When this app took over the apex WITHOUT that proxy in
     front of it, the same URL started returning our own 404 markup.

     Restore the proxy — including /blog/ghost/api/* and not only the
     post slugs — and this value becomes correct again for every build
     host. So the check flags it and still makes the request; the
     content-type test below is what actually distinguishes "Ghost" from
     "our own 404", and it does so from evidence rather than a guess.

     The always-safe value on the app server itself is the local origin,
     http://127.0.0.1:2368/blog, which needs no proxy at all — but Ghost
     does not listen off that box, so an external build host cannot use
     it. */
  if (SITE_HOSTS.some((h) => base.includes(h))) {
    console.warn(
      `[ghost] GHOST_API_URL (${base}) is a host this app serves. That is ` +
        "only correct while the web server proxies /blog/ghost/api/* " +
        "through to Ghost ahead of this app. Trying it — if the response " +
        "is HTML rather than JSON, that proxy is missing."
    );
  }

  const url =
    `${base}/ghost/api/content/posts/?` +
    new URLSearchParams({
      key,
      limit: "all",
      include: "tags",
      order: "published_at desc",
      fields: FIELDS,
    }).toString();

  let json: { posts?: RawPost[] };
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(
        `[ghost] ${res.status} ${res.statusText} from ${base} — /blog will render empty.` +
          (res.status === 401 || res.status === 403
            ? " A 401/403 here means the key is wrong — it must be the CONTENT key (26 hex chars), not the Admin key."
            : res.status === 404
              ? " A 404 here means the URL is not a Ghost install, or Ghost is not mounted at that subpath."
              : "")
      );
      return { posts: [], tags: [] };
    }
    /* Anything that is not JSON is somebody else's web page — a proxy
       error, a login wall, or this site's own 404. Say which, because
       `await res.json()` would otherwise throw into the catch below and
       report a generic "request failed". */
    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("json")) {
      console.error(
        `[ghost] ${base} answered 200 with "${type}", not JSON — that is a web page, not the Content API. ` +
          "Check GHOST_API_URL points at the Ghost origin."
      );
      return { posts: [], tags: [] };
    }
    json = (await res.json()) as { posts?: RawPost[] };
  } catch (e) {
    /* network failure, DNS, TLS, timeout — same rule: do not take the
       build down with us */
    console.error("[ghost] request failed — /blog will render empty.", e);
    return { posts: [], tags: [] };
  }

  const raw = json.posts ?? [];

  const counts = new Map<string, GhostTag & { count: number }>();

  const posts: BlogCard[] = raw
    .filter((p): p is RawPost & { title: string; url: string; slug: string } =>
      Boolean(p.title && p.url && p.slug)
    )
    .map((p) => {
      const tags: GhostTag[] = (p.tags ?? [])
        .filter((t): t is { name: string; slug: string } => Boolean(t.name && t.slug))
        .filter((t) => !HIDDEN_TAGS.has(t.slug))
        .map((t) => ({ name: t.name, slug: t.slug }));

      for (const t of tags) {
        const seen = counts.get(t.slug);
        if (seen) seen.count += 1;
        else counts.set(t.slug, { ...t, count: 1 });
      }

      const source = p.custom_excerpt?.trim() || p.excerpt || "";

      return {
        title: p.title,
        slug: p.slug,
        url: p.url,
        image: p.feature_image || null,
        imageAlt: p.feature_image_alt || null,
        excerpt: truncateOnWord(cleanExcerpt(source)),
        publishedAt: p.published_at ?? "",
        tags,
      };
    });

  const tags = [...counts.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );

  return { posts, tags };
}
