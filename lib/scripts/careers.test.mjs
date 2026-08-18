/**
 * /careers — the invariants that break silently.
 *
 * Run with `npm test` (node --test lib/scripts/*.test.mjs).
 *
 * Each of these has already cost someone an afternoon somewhere on
 * this site: a registry record left behind after a bespoke route
 * lands collides in the build; a canonical or a title that drifts
 * costs an indexed URL its identity; a third-party embed whose CDN
 * is not in the production CSP renders an empty box in production
 * and a perfect one in dev.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

/* ── a. the scaffold record is gone ─────────────────────────────────── */
test("lib/site.ts no longer carries a /careers page record", () => {
  const src = read("lib/site.ts");
  assert.ok(
    !/path:\s*"\/careers"/.test(src),
    "lib/site.ts still has a PageDef for /careers — the bespoke route at app/careers " +
      "and generateStaticParams would both claim the path and the build collides"
  );
});

/* ── b. the bespoke route, with the live SEO strings ────────────────── */
test("app/careers/page.tsx exists and keeps the indexed title and canonical", () => {
  const rel = "app/careers/page.tsx";
  assert.ok(existsSync(join(ROOT, rel)), `${rel} is missing — /careers has no bespoke route`);

  const src = read(rel);
  assert.ok(
    /alternates:\s*\{\s*canonical:\s*"\/careers"\s*\}/.test(src),
    "the canonical must stay /careers — it is what the live sitemap and the index hold"
  );
  assert.ok(
    src.includes("Instasafe Careers | Instasafe Jobs"),
    "the SEO-locked title 'Instasafe Careers | Instasafe Jobs' must be reproduced exactly"
  );
});

/* ── c. the native board's feed, and its way out ────────────────────── */
test("OpeningsBoard.tsx reads the public Recruit feed and always offers the hosted board", () => {
  const src = read("components/izpages/careers/OpeningsBoard.tsx");

  /* The embed is gone; we now fetch the same public JSON the embed's
     own script fetched. If this URL drifts — a renamed pagename, a
     v2→v3 bump — the board silently falls through to its failure
     panel and /careers ships a dead-end where the roles were. */
  assert.ok(
    src.includes("https://instasafe.zohorecruit.com/recruit/v2/public/Job_Openings"),
    "the openings feed URL must stay the public Job_Openings endpoint the Zoho embed itself reads"
  );
  assert.ok(
    src.includes("pagename=Careers") && src.includes("source=CareerSite"),
    "the feed query must keep pagename=Careers and source=CareerSite — without them Recruit " +
      "answers for a different career site, or not at all"
  );
  assert.ok(
    src.includes("https://instasafe.zohorecruit.com/jobs/Careers"),
    "a candidate must always have a path to the roles even when the feed fails to load"
  );
});

/* ── d. production CSP ──────────────────────────────────────────────── */
test("deploy/Caddyfile CSP allows the Zoho Recruit embed", () => {
  const csp = read("deploy/Caddyfile")
    .split("\n")
    .find((l) => /header\s+Content-Security-Policy\s+"/.test(l));

  assert.ok(csp, "no enforced Content-Security-Policy header found in deploy/Caddyfile");
  assert.ok(
    csp.includes("static.zohocdn.com"),
    "prod CSP must allow the Zoho Recruit embed — without static.zohocdn.com in " +
      "script-src and style-src, /careers renders an empty openings section in production"
  );
});
