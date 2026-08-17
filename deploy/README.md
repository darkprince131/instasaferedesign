# deploy/

Reference copies of the production configuration. **These files are not
applied by anything** — they are checked in so the live setup is reviewable,
diffable, and recoverable if the instance is ever rebuilt. The authoritative
copy of `Caddyfile` lives at `/etc/caddy/Caddyfile` on the app server.

## The shape of production

`instasafe.com` resolves to a single app box running **Caddy** on 80/443 in
front of **Next under pm2** on `127.0.0.1:3000`. Deploys are `~/deploy.sh`:
`git reset --hard origin/main`, `npm ci`, `npm run build`, `pm2 restart`.

Two paths do **not** belong to this app. They live on a **separate legacy
instance at `172.31.28.21`**, which is private to the VPC and unreachable
from the internet:

| path | served by | what it is |
|---|---|---|
| `/blog/*` | Ghost on the legacy box | 330 posts, `/blog/rss/`, and `/blog/ghost/api/*` |
| `/docs/*` | the legacy box | the 27 resource-center PDFs |
| `/blog`, `/blog/` | **this app** | the blog index page |
| everything else | this app | |

That split is why the `handle` blocks are ordered the way they are — Caddy
takes the first match, so `@blogindex` must come before `@legacy` or the
index page gets proxied away to Ghost.

`/blog/ghost/api/*` is the easy one to forget. The blog index calls it at
build time, so leaving it out of the proxy gives you working posts and a
permanently empty index — which looks like a completely different bug.

## Known fragility

`172.31.28.21` is a bare private IP with no DNS name. If that instance is
replaced or its address changes, every blog post and every PDF 404s with
nothing in this repo to explain why. It wants an internal DNS record or a
static address, and whoever owns it should know it is load-bearing for
instasafe.com.

Half of it has an escape hatch already: `lib/scripts/fetch-resource-assets.mjs`
downloads all 27 PDFs into `public/`, after which `SELF_HOSTED = true` in
`lib/resource-center.ts` makes this app serve them itself. Run the script
BEFORE flipping the constant, or every download 404s. Ghost is the part that
cannot be moved this way.

## Editing the Caddyfile

Always, on the box:

```bash
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.good.$(date +%s)
# edit /tmp/Caddyfile.new, then:
sudo caddy validate --config /tmp/Caddyfile.new --adapter caddyfile
sudo cp /tmp/Caddyfile.new /etc/caddy/Caddyfile && sudo systemctl reload caddy
```

Two traps, both hit for real:

- `handle` takes **one** matcher token. Two paths need a named matcher
  (`@legacy path /blog/* /docs/*`); `handle /blog/* /docs/*` is a parse error.
- Never pipe `caddy validate` through `grep` before checking its exit status —
  it masks the failure and `set -e` walks straight past into installing a
  broken config. A failed reload does keep the running config, so the site
  stays up, but a later restart would not.
