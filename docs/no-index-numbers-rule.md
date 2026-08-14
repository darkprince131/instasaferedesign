# No index numbers on labels

**Rule:** do not prefix an eyebrow, a stat cell, a step label or a section
kicker with a sequence number — no `01`, `02`, `03`, no `platform_ 05`.

Set 2026-08-14, from a phone review of `/platform`.

## Why

**They collide with the value they label.** `IzStatRibbon` rendered a mono
`01` immediately before a cell whose value is itself a number, so the reader
got `014 layers verified per request`, `027 application types`,
`031 console, one agent, one policy engine`. On a phone, where the index and
the value land on the same line with no room between them, this is not a
near-miss — it reads as a different number. Every ribbon on every page had it.

**They promise a series that does not exist.** `platform_ 05 — the decision
layer` was the only numbered thing on the platform page. There was no 01
through 04 to have read, and nothing later refers back to "05". A lone index
is a broken cross-reference.

**They are not a sequence.** These are unordered facts sitting side by side —
three numbers about the platform, not three steps in an order. Numbering
implies a path through them that the content does not have. Where the content
IS a sequence (a walkthrough, a phased flow, a spec table's rows), the number
is doing real work and stays.

## What this applies to

- `IzStatRibbon` cells — indices removed, and the `<ol>` became a `<ul>` so a
  screen reader stops announcing "1 of 3" after the visible numbering went.
- `ConsoleRow` / section eyebrows — plain words. `the decision layer`, not
  `platform_ 05 — the decision layer`.
- Any new interstitial, stat strip or kicker.

## What it does not apply to

Ordered content where the order is the point: `IzAccessFlow`'s phases
(`PHASE 2 / 3`), `IzSpecTable`'s row numbering, the homepage `.iz-rows`
index, and stepper components. Those are sequences a reader navigates, and
the number is how they keep their place.
