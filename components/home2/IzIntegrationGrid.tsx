"use client";

/* ============================================================
   IzIntegrationGrid — the SSO section: one text column beside a
   drifting wall of the applications InstaSafe signs people into.

   The wall is three independent vertical marquees at slightly
   different speeds, masked top and bottom. Alternating direction
   is what stops three columns reading as one block sliding; the
   speed offsets stop them re-aligning into rows a second later.
   Same seam rule as the customer strip: each column holds two
   identical copies and travels exactly -50%, so the loop point is
   invisible. Hover pauses the whole wall.

   Brand marks keep their real colours on paper — a decolourised
   logo wall says "we screenshotted these" — and go white on dark,
   where forty brand palettes would shred a near-black page.
   ============================================================ */

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export type Integration = {
  name: string;
  group: string;
  /** file in /public/logos/integrations, without .svg — null until the
      brand's art lands, which renders a monogram plate instead of a
      broken-image box */
  logo: string | null;
};

const INTEGRATIONS: Integration[] = [
  // Productivity & Collaboration
  { name: "Microsoft 365", group: "Productivity & Collaboration", logo: "microsoft-365" },
  /* The Google mark, not the Workspace wordmark. This grid caps logos at
     21px (.izig-logo img), and google-workspace.svg is 3993x512 — 7.8:1 —
     so it rendered 21x2.7px: a hairline, not a logo. The name sits beside
     it, so the square mark identifies the product. The wordmark is kept
     where it has the room: IzLogoGrid, where it measures 201x26. */
  { name: "Google Workspace", group: "Productivity & Collaboration", logo: "google" },
  { name: "Slack", group: "Productivity & Collaboration", logo: "slack" },
  { name: "Microsoft Teams", group: "Productivity & Collaboration", logo: "microsoft-teams" },
  { name: "Zoom", group: "Productivity & Collaboration", logo: "zoom" },
  { name: "Cisco Webex", group: "Productivity & Collaboration", logo: null },
  { name: "Dropbox", group: "Productivity & Collaboration", logo: "dropbox" },
  { name: "Box", group: "Productivity & Collaboration", logo: null },
  { name: "Notion", group: "Productivity & Collaboration", logo: "notion" },
  // CRM & Sales
  { name: "Salesforce", group: "CRM & Sales", logo: "salesforce" },
  { name: "HubSpot", group: "CRM & Sales", logo: "hubspot" },
  { name: "Zoho CRM", group: "CRM & Sales", logo: null },
  { name: "Pipedrive", group: "CRM & Sales", logo: "pipedrive" },
  // ITSM & Support
  { name: "ServiceNow", group: "ITSM & Support", logo: "servicenow" },
  { name: "Jira", group: "ITSM & Support", logo: null },
  { name: "Confluence", group: "ITSM & Support", logo: null },
  { name: "Zendesk", group: "ITSM & Support", logo: "zendesk" },
  { name: "Freshdesk", group: "ITSM & Support", logo: null },
  // HR & Identity
  { name: "Workday", group: "HR & Identity", logo: "workday" },
  { name: "SAP SuccessFactors", group: "HR & Identity", logo: "sap" },
  { name: "Darwinbox", group: "HR & Identity", logo: null },
  { name: "BambooHR", group: "HR & Identity", logo: "bamboohr" },
  { name: "Oracle HCM Cloud", group: "HR & Identity", logo: "oracle" },
  // Developer & DevOps
  { name: "GitHub", group: "Developer & DevOps", logo: "github" },
  { name: "GitLab", group: "Developer & DevOps", logo: "gitlab" },
  { name: "Bitbucket", group: "Developer & DevOps", logo: "bitbucket" },
  { name: "Jenkins", group: "Developer & DevOps", logo: "jenkins" },
  { name: "Docker Hub", group: "Developer & DevOps", logo: "docker" },
  // Cloud Platforms
  { name: "Amazon Web Services", group: "Cloud Platforms", logo: "aws" },
  { name: "Microsoft Azure", group: "Cloud Platforms", logo: "azure" },
  { name: "Google Cloud", group: "Cloud Platforms", logo: "google-cloud" },
  { name: "VMware", group: "Cloud Platforms", logo: "vmware" },
  // Design & Productivity
  { name: "Adobe", group: "Design & Productivity", logo: "adobe" },
  { name: "Figma", group: "Design & Productivity", logo: "figma" },
  { name: "Canva", group: "Design & Productivity", logo: "canva" },
  { name: "Miro", group: "Design & Productivity", logo: "miro" },
  // Business Applications
  { name: "SAP", group: "Business Applications", logo: "sap" },
  { name: "Oracle", group: "Business Applications", logo: "oracle" },
  { name: "QuickBooks", group: "Business Applications", logo: "quickbooks" },
  { name: "DocuSign", group: "Business Applications", logo: "docusign" },
  { name: "Monday.com", group: "Business Applications", logo: "monday" },
];

/* Dealt round-robin rather than sliced in thirds, so each column
   carries a mix of categories instead of one column being all
   DevOps and another all HR. */
const COLUMNS = 3;
const DEALT: Integration[][] = Array.from({ length: COLUMNS }, (_, c) =>
  INTEGRATIONS.filter((_, i) => i % COLUMNS === c)
);

/* px/sec per column — different enough that the three never re-align */
const SPEEDS = [15, 19, 13];

function monogram(name: string) {
  const words = name.split(/[\s.]+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}

function Card({ item, clone }: { item: Integration; clone?: boolean }) {
  return (
    <div className={clone ? "izig-card izig-clone" : "izig-card"} aria-hidden={clone || undefined}>
      <span className={item.logo ? "izig-logo" : "izig-logo izig-logo-mono"}>
        {item.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/logos/integrations/${item.logo}.svg`} alt="" loading="lazy" decoding="async" />
        ) : (
          <span aria-hidden="true">{monogram(item.name)}</span>
        )}
      </span>
      <span className="izig-name">{item.name}</span>
      <span className="izig-group">{item.group}</span>
    </div>
  );
}

/* ▸ COPY IS INJECTABLE (2026-08-13) ▸
   The homepage frames this as "here is what SSO is". The SSO page
   reaches the same wall having already made that argument three
   times, so it needs the wall to answer a different question — which
   applications, and where is the full list. Same logos, same marquee,
   different question above it. Omit `copy` and the homepage renders
   exactly as before. */
export function IzIntegrationGrid({
  copy,
}: {
  copy?: React.ReactNode;
}) {
  return (
    <div className="izig">
      <div className="izig-copy">{copy ?? (
        <>
        <span className="iz-ey">Single sign-on</span>
        <h2 className="iz-h2">
          One login in. <em>One action out.</em>
        </h2>
        <p className="izig-body">
          Password sprawl isn&apos;t a user problem, it&apos;s an offboarding problem. Twelve applications with twelve
          credential stores means twelve places a departure has to be processed — and the one that gets missed is the
          one that turns up in the audit.
        </p>
        <p className="izig-body">
          InstaSafe SSO puts every application behind a single verified login. When someone joins, their group decides
          what appears. When someone leaves, one action removes them from all of it, including the network paths to it.
        </p>
        <p className="izig-body">
          Most SSO stops at the application. Yours grants the app but leaves the network still reachable underneath.
          Here the identity decision and the network decision are the same decision, because they&apos;re made by the
          same platform.
        </p>
        <ul className="izig-facts">
          <li>
            <b>1</b> login, then every application they&apos;re entitled to
          </li>
          <li>
            <b>1</b> action removes a leaver from everything
          </li>
          <li>
            <b>8</b> auth profiles, assigned per user group
          </li>
        </ul>
        <a href="/solutions/idam-single-sign-on" className="izig-cta">
          Explore SSO {Arrow}
        </a>
        </>
      )}
      </div>

      <div className="izig-wall" aria-label="Applications InstaSafe signs users into">
        {DEALT.map((col, c) => (
          <div
            className={c % 2 === 1 ? "izig-col izig-col-up" : "izig-col"}
            key={c}
            style={{
              ["--izig-speed" as string]: `${SPEEDS[c]}`,
              ["--izig-count" as string]: `${col.length}`,
            }}
          >
            <div className="izig-track">
              {col.map((it) => (
                <Card item={it} key={it.name} />
              ))}
              {col.map((it) => (
                <Card item={it} key={`c-${it.name}`} clone />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
