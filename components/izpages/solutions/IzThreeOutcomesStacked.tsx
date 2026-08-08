"use client";

import { SealCheck, SquaresFour, UserMinus } from "@phosphor-icons/react";
import { IzOutcomes } from "@/components/izpages/pro/IzOutcomes";
import { IzConsolidationDiagram } from "./IzConsolidationDiagram";

/* ============================================================
   Outcomes section — CANDIDATE B (stacked).

   The same content as [[IzThreeOutcomes]], run through the existing
   IzOutcomes skeleton (lab 00ar): visual and copy on one row, a drawn
   connector below them, then the three outcomes as columns.

   Two content changes the layout FORCES, rather than prefers:

   - The bodies are the short reference-image copy. Three columns at a
     third of the width each cannot carry the two-sentence versions
     candidate A uses in a full-width list; they would set as six-line
     paragraphs and the row would stop scanning.
   - The audit trail comes off the diagram. Outcome 03 has its own
     column here, so the table would be arguing the same point twice
     in a slot two-thirds the width it was drawn for.

   Both candidates share IzConsolidationDiagram, so whichever layout
   wins, the diagram is the same diagram.
   ============================================================ */

export function IzThreeOutcomesStacked() {
  return (
    <IzOutcomes
      /* The eyebrow names the topic and must not restate the headline
         under it — "Three outcomes" above "THREE OUTCOMES THAT
         MATTER" is the same words twice. */
      tag="What changes"
      title={["Three outcomes", "that matter"]}
      sub="Replace four answers to one question with a single control plane. Remove access once. Prove every decision."
      side="left"
      visual={<IzConsolidationDiagram showTrail={false} showMarks={false} />}
      outcomes={[
        {
          Icon: SquaresFour,
          title: "Fewer tools to renew",
          body: "Consolidate the vendor portal, jump box, VDI licences and VPN concentrator into one platform.",
        },
        {
          Icon: UserMinus,
          title: "One offboarding, not four",
          body: "A leaver is removed once, from everything, including the network paths. Missed systems stop being possible.",
        },
        {
          Icon: SealCheck,
          title: "An answer the auditor accepts",
          body: "Every decision is logged with the reason. Access review becomes an export in a format your SIEM already reads.",
        },
      ]}
    />
  );
}
