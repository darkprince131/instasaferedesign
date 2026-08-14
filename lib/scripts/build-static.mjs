/**
 * `NEXT_EXPORT=1 npm run build` in a form that works on Windows too.
 *
 * cmd.exe has no `VAR=value cmd` syntax, so the plain inline form fails
 * on the machine this site is actually built from. This sets the flag and
 * hands off to the normal build — which means `prebuild` still runs and
 * the link audit still gates the export.
 */
import { spawnSync } from "node:child_process";

const r = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_EXPORT: "1" },
});

process.exit(r.status ?? 1);
