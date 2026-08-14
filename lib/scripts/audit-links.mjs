/**
 * LINK AUDIT — runs as `prebuild`, so a bad link fails the build rather
 * than shipping. Two separate invariants, because they fail differently:
 *
 *   1. DEAD LINKS. Every internal href in the codebase must resolve to a
 *      route that exists — an app/ route, a page in the registry, or the
 *      source side of a redirect. A 404 behind a CTA is invisible in dev
 *      (the catch-all renders whatever you type at it only for paths in
 *      generateStaticParams) and costs a conversion in production.
 *
 *   2. THE SITEMAP GATE, applied to global navigation. Nav and footer are
 *      the strongest internal links the site has. `lib/indexable.ts`
 *      decides what Google is told about; the same list decides what the
 *      nav is allowed to point at, so we never funnel every crawl — or a
 *      buyer mid-evaluation — into a placeholder scaffold.
 *
 * Neither check knows about anchors, query strings or external URLs.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

/* ── the files whose links are gated, i.e. shown on every page ───────── */
const GLOBAL_NAV = [
  "components/home2/iz-nav-data.tsx",
  "components/home2/iz-footer-data.ts",
  "components/home2/IzNav.tsx",
  "components/home2/IzFooter.tsx",
  "components/home2/IzFooterGrid.tsx",
];

/* ── walk ────────────────────────────────────────────────────────────── */
const SKIP = new Set(["node_modules", ".next", ".git", "caveman", "content-review", "docs", "public"]);
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (/\.(tsx?|jsx?|mjs)$/.test(name)) yield full;
  }
}

/* ── what routes exist ───────────────────────────────────────────────── */
const routes = new Set(["/"]);

// app/ directory routes, minus route groups, dynamic segments and dev pages
for (const file of walk(join(ROOT, "app"))) {
  if (!/[\\/]page\.tsx$/.test(file)) continue;
  const segs = relative(join(ROOT, "app"), file).split(sep).slice(0, -1);
  if (segs.some((s) => s.startsWith("[") || s.startsWith("(") || s === "dev")) continue;
  routes.add("/" + segs.join("/"));
}

// every path string in the two registries — tuple forms included
for (const f of ["lib/site.ts", "lib/site-ia.ts"]) {
  for (const [, p] of read(f).matchAll(/"(\/[a-zA-Z0-9\-_/.]*)"/g)) routes.add(p);
}

// redirect sources resolve too (next.config 308s them)
for (const [, p] of read("next.config.ts").matchAll(/source:\s*"(\/[^"]+)"/g)) routes.add(p);

/* ── the sitemap gate ────────────────────────────────────────────────── */
const idx = read("lib/indexable.ts");
const set = (name) =>
  new Set(
    [
      ...idx
        .match(new RegExp(`export const ${name}[^=]*=\\s*new Set\\(\\[([\\s\\S]*?)\\]\\)`))[1]
        .matchAll(/"([^"]+)"/g),
    ].map((m) => m[1])
  );
const gate = new Set([...set("SHIPPED"), ...set("ALREADY_INDEXED")]);

/* ── collect and judge ───────────────────────────────────────────────── */
const dead = [];
const ungated = [];

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).split(sep).join("/");
  if (rel.startsWith("app/dev/") || rel.startsWith("components/dev/") || rel.startsWith("lib/scripts/")) continue;
  const gated = GLOBAL_NAV.includes(rel);

  for (const [, href] of read(rel).matchAll(/href[=:]\s*"([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    if (path.startsWith("/api/") || /\.[a-z0-9]+$/i.test(path)) continue;
    if (!routes.has(path)) dead.push(`${rel}  →  ${href}`);
    else if (gated && !gate.has(path)) ungated.push(`${rel}  →  ${href}`);
  }
}

const report = (title, rows, why) => {
  if (!rows.length) return 0;
  console.error(`\n✗ ${title} (${rows.length})\n  ${why}`);
  for (const r of [...new Set(rows)].sort()) console.error("    " + r);
  return 1;
};

const failed =
  report("Dead internal links", dead, "no route, registry entry or redirect serves these paths:") +
  report(
    "Global nav links a page the sitemap will not advertise",
    ungated,
    "add the path to SHIPPED in lib/indexable.ts once its content is real, or unlink it:"
  );

if (failed) {
  console.error("");
  process.exit(1);
}
console.log(`✓ links: ${routes.size} routes known, nav and footer inside the sitemap gate`);
