/**
 * `NEXT_EXPORT=1 npm run build` in a form that works on Windows too.
 *
 * cmd.exe has no `VAR=value cmd` syntax, so the plain inline form fails
 * on the machine this site is actually built from. This sets the flag and
 * hands off to the normal build — which means `prebuild` still runs and
 * the link audit still gates the export.
 *
 * `--preview` additionally sets PREVIEW_NOINDEX, which makes the build
 * refuse search engines two ways: `Disallow: /` in robots.txt and
 * `noindex, nofollow` on every page (robots.txt alone does not stop a
 * linked URL being indexed). That flag belongs ONLY on internal review
 * builds. The production export must not carry it, or the migration
 * launches invisible.
 */
import { spawnSync } from "node:child_process";

const preview = process.argv.includes("--preview");

const r = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    NEXT_EXPORT: "1",
    ...(preview ? { PREVIEW_NOINDEX: "1" } : {}),
  },
});

console.log(preview ? "\n→ PREVIEW build: noindex, do not put this on instasafe.com" : "\n→ PRODUCTION build: indexable");
process.exit(r.status ?? 1);
