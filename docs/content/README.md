# Content sources — read these, don't re-derive

Everything the build needs, in-repo, so a fresh chat never has to go to
`~/Downloads` or re-parse a spreadsheet.

## Read this, not that

| You want | Read | Do NOT |
|---|---|---|
| One page's structure, top to bottom | `storyboards/<sheet>.md` | parse the .xlsx with python |
| All 55 pages at a glance | `../../InstaSafe_Page_Component_Map.xlsx` | — |
| Field-extracted page specs (H1, CTAs, sections, FAQ counts) | `content_master_extract.psv` | re-extract from the volumes |
| Full prose for a page | `InstaSafe_Content_Master_Vol{1..4}*.md` | — |

`storyboards/` holds one markdown file per page sheet, auto-dumped from
`InstaSafe_Page_Storyboards.xlsx`. Sheet names match the route:
`platform-ztna.md`, `solutions-vpn-alternative.md`, `industries-banking.md`, …
Open the one page you are building. Each file reads top-to-bottom exactly as
the page should, with the component named per row and `[NEW]` marking
anything unbuilt.

The `.xlsx` is kept as the source of truth. If it changes, re-dump:

```bash
python - <<'EOF'
import openpyxl, io, os
wb = openpyxl.load_workbook('docs/content/InstaSafe_Page_Storyboards.xlsx', data_only=True)
out = 'docs/content/storyboards'
for name in wb.sheetnames:
    lines = []
    for r in wb[name].iter_rows(values_only=True):
        cells = ['' if c is None else str(c) for c in r]
        if any(cells):
            lines.append(' | '.join(cells).rstrip(' |'))
    io.open(os.path.join(out, f'{name}.md'), 'w', encoding='utf-8').write(
        f'# Storyboard — {name}\n\n```\n' + '\n'.join(lines) + '\n```\n')
EOF
```

## Volumes

| File | Covers |
|---|---|
| `InstaSafe_Content_Master_Vol1_Platform.md` | 18 platform/product pages |
| `InstaSafe_Content_Master_Vol2_Solutions.md` | 14 solution pages |
| `InstaSafe_Content_Master_Vol3_Industries.md` | 11 industry pages (identical structure — one template + data) |
| `InstaSafe_Content_Master_Vol4_Company_Resources.md` | 12 company/trust/resource entries |

## Content rules that bind the build

- Use the **exact** proof numbers. Never round: 500,000+ endpoints, 150+
  enterprises, 100+ Fortune 2000, 25 device checks, 144 named rules,
  1,500+ OS combos, 21 policy combinations, 12 risk triggers, 202 event
  types, 11 report types, 7 SIEM formats, 6 MFA methods, 8 auth profiles.
- Product name is **"InstaSafe ZTNA"**, never "i365".
- CTA is **"Book a demo"**, never "Start Free Trial".
- Banned words: seamless, enterprise-grade, robust, best-in-class,
  cutting-edge, leverage.
- **Honesty guardrails — do not claim until Product confirms:**
  screenshot/print/keylogger DLP, FIDO2-passwordless end-to-end,
  database access GA beyond PostgreSQL/MSSQL/SQL Server (Oracle and
  Elasticsearch are beta; ClickHouse and MongoDB alpha — state the status
  wherever DB access is claimed), auto-suspend, device-policy push.
- `[SOURCE NEEDED]` / `[CONFIRM]` / `[PLACEHOLDER]` markers in the volumes
  are unresolved. Do not publish a number sitting behind one.

## URLs

Routes in the storyboards are **not** always the live URL — the sitemap
carries SEO equity and wins. The mapping (and every mismatch) is in
`InstaSafe_Page_Component_Map.xlsx`, column "Real / Live URL". Check it
before creating a route.
