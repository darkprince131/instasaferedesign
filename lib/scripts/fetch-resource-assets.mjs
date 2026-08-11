#!/usr/bin/env node
/* ============================================================
   fetch-resource-assets.mjs

   Pulls every asset /resource-center references onto local disk:

     public/docs/<slug>.pdf              27 brochures + whitepapers
     public/resources/thumbs/<id>.jpg    15 video posters

   Run it from anywhere in the repo:

       node lib/scripts/fetch-resource-assets.mjs

   Then set SELF_HOSTED = true in lib/resource-center.ts. Not before —
   flipping it first turns every link into a 404.

   Zero dependencies: Node 18+ has global fetch.

   It ships in lib/scripts/ only because that is a folder that already
   existed. It finds the repo root by walking up for package.json
   rather than counting `..` segments, so moving it to a top-level
   scripts/ needs no edit.

   Re-runs skip files that are already on disk. Pass --force to
   redownload everything.

   ---------------------------------------------------------------
   Why it parses the .ts file instead of importing it: node cannot
   import TypeScript without a loader, and duplicating 27 filenames
   into a second list is how the two lists silently drift apart. The
   parse is deliberately dumb — plain string literals, one per line —
   and it hard-fails on an unexpected count rather than quietly
   downloading a subset.
   ============================================================ */

import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { dirname, join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

/** Walk up from this file until package.json turns up. */
function findRoot(from) {
  let dir = from;
  for (;;) {
    if (existsSync(join(dir, "package.json"))) return dir;
    const up = dirname(dir);
    if (up === dir || dir === parse(dir).root) {
      throw new Error("Could not find package.json above " + from);
    }
    dir = up;
  }
}

const ROOT = findRoot(dirname(fileURLToPath(import.meta.url)));
const DATA = join(ROOT, "lib", "resource-center.ts");
const DOCS_OUT = join(ROOT, "public", "docs");
const THUMBS_OUT = join(ROOT, "public", "resources", "thumbs");

const LEGACY_DOCS = "https://instasafe.com/docs/";

/* expected counts — the guard rail. Update these in the same commit as
   lib/resource-center.ts, never separately. */
const EXPECT_DOCS = 27;
const EXPECT_VIDEOS = 15;

/* ---------- parse ---------- */

function section(src, name) {
  const start = src.indexOf(`export const ${name}`);
  if (start === -1) throw new Error(`Could not find "export const ${name}" in ${DATA}`);
  const open = src.indexOf("[", start);
  const end = src.indexOf("\n];", open);
  if (open === -1 || end === -1) throw new Error(`Could not bound the ${name} array`);
  return src.slice(open, end);
}

async function parseData() {
  const src = await readFile(DATA, "utf8");

  const docsSrc = section(src, "BROCHURES");
  const docs = [];
  const docRe = /id:\s*"([^"]+)"[\s\S]*?legacyFile:\s*"([^"]+)"/g;
  let m;
  while ((m = docRe.exec(docsSrc)) !== null) {
    docs.push({ slug: m[1], legacyFile: m[2] });
  }

  const idRe = /id:\s*"([^"]+)"/g;
  const videoIds = [];
  for (const name of ["WEBINARS", "PRODUCT_VIDEOS"]) {
    const s = section(src, name);
    let v;
    while ((v = idRe.exec(s)) !== null) videoIds.push(v[1]);
    idRe.lastIndex = 0;
  }

  return { docs, videoIds };
}

/* ---------- fetch ---------- */

async function grab(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      // Some CDNs 403 a bare fetch UA on PDF paths.
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
      accept: "*/*",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length === 0) throw new Error("empty body");
  return buf;
}

/** Refuse to write an HTML error page under a .pdf name. */
function assertPdf(buf) {
  if (buf.subarray(0, 4).toString("latin1") !== "%PDF") {
    throw new Error("not a PDF (server returned an error page?)");
  }
}

async function exists(p) {
  try {
    const s = await stat(p);
    return s.size > 0;
  } catch {
    return false;
  }
}

/* ---------- run ---------- */

const force = process.argv.includes("--force");
const results = { ok: 0, skipped: 0, failed: [] };

async function task(label, out, url, check) {
  if (!force && (await exists(out))) {
    results.skipped++;
    console.log(`  skip  ${label}`);
    return;
  }
  try {
    const buf = await grab(url);
    if (check) check(buf);
    await writeFile(out, buf);
    results.ok++;
    console.log(`  ok    ${label}  (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (err) {
    results.failed.push({ label, url, reason: err.message });
    console.log(`  FAIL  ${label}  — ${err.message}`);
  }
}

const { docs, videoIds } = await parseData();

if (docs.length !== EXPECT_DOCS) {
  throw new Error(
    `Parsed ${docs.length} brochures but expected ${EXPECT_DOCS}. ` +
      `If you added or removed one, update EXPECT_DOCS in this script.`
  );
}
if (videoIds.length !== EXPECT_VIDEOS) {
  throw new Error(
    `Parsed ${videoIds.length} videos but expected ${EXPECT_VIDEOS}. ` +
      `If you added or removed one, update EXPECT_VIDEOS in this script.`
  );
}

await mkdir(DOCS_OUT, { recursive: true });
await mkdir(THUMBS_OUT, { recursive: true });

console.log(`\nPDFs → public/docs  (${docs.length})`);
for (const d of docs) {
  await task(
    `${d.slug}.pdf`,
    join(DOCS_OUT, `${d.slug}.pdf`),
    LEGACY_DOCS + encodeURIComponent(d.legacyFile),
    assertPdf
  );
}

console.log(`\nPosters → public/resources/thumbs  (${videoIds.length})`);
for (const id of videoIds) {
  const out = join(THUMBS_OUT, `${id}.jpg`);
  if (!force && (await exists(out))) {
    results.skipped++;
    console.log(`  skip  ${id}.jpg`);
    continue;
  }
  /* maxresdefault only exists for uploads that were sourced at 720p+.
     hqdefault always exists, so try the good one and fall back. */
  let buf = null;
  for (const variant of ["maxresdefault", "hqdefault"]) {
    try {
      buf = await grab(`https://i.ytimg.com/vi/${id}/${variant}.jpg`);
      console.log(`  ok    ${id}.jpg  (${variant}, ${(buf.length / 1024).toFixed(0)} KB)`);
      break;
    } catch {
      /* try the next variant */
    }
  }
  if (buf) {
    await writeFile(out, buf);
    results.ok++;
  } else {
    results.failed.push({ label: `${id}.jpg`, url: `i.ytimg.com/vi/${id}/`, reason: "no variant available" });
    console.log(`  FAIL  ${id}.jpg  — no variant available`);
  }
}

console.log(
  `\n${results.ok} downloaded, ${results.skipped} already present, ${results.failed.length} failed.`
);

if (results.failed.length) {
  console.log("\nFailures — fix these before setting SELF_HOSTED = true:");
  for (const f of results.failed) console.log(`  ${f.label}\n    ${f.url}\n    ${f.reason}`);
  process.exit(1);
}

console.log("\nAll assets present. Set SELF_HOSTED = true in lib/resource-center.ts.\n");
