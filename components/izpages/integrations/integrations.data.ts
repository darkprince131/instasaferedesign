/* ============================================================
   integrations.data.ts — the catalogue, as data.

   Structured after twingate.com/integrations: categories, each with
   a sentence saying what that category BUYS you, then the products.
   What is not carried over is their copy or their category list —
   ours are different because the products are different. InstaSafe
   is a ZTNA platform that also does SSO, MFA, posture and RADIUS, so
   it has an applications category they do not and they have a DNS
   category we do not.

   ▸ EVERY ENTRY IS ONE LINE, AND THE LINE IS SPECIFIC ▸
   "Integrates with X" is not a description. Each line says what the
   integration actually does — which direction data flows, or what it
   replaces — because a catalogue whose entries are interchangeable is
   a logo wall with extra steps.

   ▸ MISSING LOGOS ARE MONOGRAMS, NOT GAPS ▸
   `logo: null` renders a lettered tile in the same frame. The user is
   supplying the remaining marks; until then the grid keeps its rhythm
   rather than showing holes.

   ▸ `dark` IS FOR INK-ON-WHITE MARKS ONLY ▸
   Splunk and Elastic ship black wordmarks that vanish on a dark page.
   Those two carry a light variant; everything else is colour and
   works on both.
   ============================================================ */

export type Integration = {
  name: string;
  /** file in public/logos/integrations, or null for a monogram tile */
  logo: string | null;
  /** light-ink variant, only where the default is ink-on-white */
  dark?: string;
  blurb: string;
};

export type Category = {
  id: string;
  title: string;
  lead: string;
  items: Integration[];
};

export const CATEGORIES: Category[] = [
  {
    id: "identity",
    title: "Identity & authentication",
    lead: "Authenticate against the directory you already run. Users and groups sync in, and the joiners-movers-leavers process you already have stays the one that governs access.",
    items: [
      {
        name: "Active Directory",
        logo: "active-directory.svg",
        blurb: "Sync users and groups from the directory of record. Entitlement follows the group, not a second list.",
      },
      {
        name: "Microsoft Entra ID",
        logo: "microsoft-entra-id.svg",
        blurb: "Federate to Entra ID as your identity provider, or act as one for the applications it does not reach.",
      },
      {
        name: "Google Workspace",
        logo: "google-workspace.svg",
        blurb: "Single sign-on plus user and group provisioning, so a Workspace account is the whole identity.",
      },
      {
        name: "Okta",
        logo: null,
        blurb: "Keep Okta as the identity provider; InstaSafe enforces it on the network path Okta cannot see.",
      },
      {
        name: "OneLogin",
        logo: "onelogin.svg",
        blurb: "Authentication and group synchronisation, with the access policy evaluated on every request.",
      },
      {
        name: "OpenLDAP",
        logo: "openldap.webp",
        blurb: "Read groups straight from an LDAP server for applications that never learned SAML.",
      },
      {
        name: "ADFS",
        logo: null,
        blurb: "Federate to the Windows trust you already run, without changing what the application understands.",
      },
      {
        name: "Microsoft 365",
        logo: "microsoft-365.svg",
        blurb: "Use the 365 login as the front door, with MFA and device posture attached to it.",
      },
    ],
  },
  {
    id: "applications",
    title: "Applications",
    lead: "Anything that speaks SAML 2.0, OAuth 2.0 or OpenID Connect sits behind one login — in practice over 800 business applications. These are the ones we are asked about most.",
    items: [
      { name: "Salesforce", logo: "salesforce.svg", blurb: "SAML sign-on with the factor decided by the user's group, not the app." },
      { name: "Jira", logo: "jira.svg", blurb: "One login into the tracker, and one action that removes a leaver from it." },
      { name: "GitLab", logo: "gitlab.svg", blurb: "OpenID Connect sign-on for the platform and its CI, on the same policy." },
      { name: "GitHub", logo: "github.svg", blurb: "SAML sign-on for the organisation, with repository access behind the tunnel." },
      { name: "Slack", logo: "slack.svg", blurb: "OAuth sign-on, so leaving the directory closes the workspace too." },
      { name: "Zoom", logo: "zoom.svg", blurb: "SAML sign-on for the meeting account, with the same second factor." },
      { name: "SAP", logo: "sap.svg", blurb: "Reach the SAP portal over a per-app tunnel — no inbound port, no VPN." },
      { name: "ServiceNow", logo: "servicenow.svg", blurb: "SAML sign-on for the service desk and the records behind it." },
      { name: "Workday", logo: "workday.svg", blurb: "SAML sign-on for HR data, with hardware keys where the group requires them." },
      { name: "Microsoft Teams", logo: "microsoft-teams.svg", blurb: "One session across Teams and the rest of the 365 estate." },
      { name: "Dropbox", logo: "dropbox.svg", blurb: "SAML sign-on with download controls applied per group." },
      { name: "Zendesk", logo: "zendesk.svg", blurb: "Agent sign-on tied to the directory rather than a local password." },
      { name: "Notion", logo: "notion.svg", blurb: "SAML sign-on, provisioned from the same groups as everything else." },
      { name: "HubSpot", logo: "hubspot.svg", blurb: "SAML sign-on for the CRM, with session recording where it is required." },
      { name: "Adobe", logo: "adobe.svg", blurb: "Federated sign-on for Creative Cloud and Document Cloud seats." },
      { name: "DocuSign", logo: "docusign.svg", blurb: "SAML sign-on for a system that signs things — a good place for a hardware key." },
      { name: "Miro", logo: "miro.svg", blurb: "SAML sign-on with provisioning, so boards follow the group." },
      { name: "Monday", logo: "monday.svg", blurb: "SAML sign-on for the work platform and its integrations." },
      { name: "Figma", logo: "figma.svg", blurb: "SAML sign-on with SCIM, so design seats are not managed by hand." },
      { name: "Canva", logo: "canva.svg", blurb: "SAML sign-on for the brand team's shared workspace." },
      { name: "QuickBooks", logo: "quickbooks.svg", blurb: "Sign-on to the books, behind whatever the finance profile demands." },
      { name: "BambooHR", logo: "bamboohr.svg", blurb: "SAML sign-on for HR records, with access scoped to the HR group." },
      { name: "Pipedrive", logo: "pipedrive.svg", blurb: "SAML sign-on for the sales pipeline and its exports." },
      { name: "Gmail", logo: "gmail.svg", blurb: "Workspace mail behind the same single login as everything else." },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & infrastructure",
    lead: "Reach private resources in any cloud without opening an inbound port. The gateway runs as software next to the workload, and nothing behind it is published to the internet.",
    items: [
      { name: "AWS", logo: "aws.svg", blurb: "Private access to VPC resources — instances, databases, internal load balancers." },
      { name: "Microsoft Azure", logo: "azure.svg", blurb: "Reach VNet resources and Azure-managed services without a site-to-site tunnel." },
      { name: "Google Cloud", logo: "google-cloud.svg", blurb: "Private access to GCP projects, with the policy evaluated per request." },
      { name: "Oracle Cloud", logo: "oracle.svg", blurb: "ZTNA in front of OCI compute and database resources." },
      { name: "VMware", logo: "vmware.svg", blurb: "Publish on-premise virtual desktops and servers without exposing the hypervisor." },
      { name: "Kubernetes", logo: "kubernetes.svg", blurb: "Deploy the gateway into a cluster and reach services without a public ingress." },
      { name: "Docker", logo: "docker.svg", blurb: "Run the gateway as a container alongside whatever it is protecting." },
    ],
  },
  {
    id: "devices",
    title: "Device management & security",
    lead: "Posture signals from the tools already on the endpoint. The device has to pass before the connection exists, not after.",
    items: [
      {
        name: "CrowdStrike",
        logo: "crowdstrike.svg",
        blurb: "Take the agent's verdict as a posture signal and refuse anything it flags.",
      },
      {
        name: "Microsoft Intune",
        logo: "microsoft-intune.svg",
        blurb: "Trust the Intune compliance state as a device check, so managed and unmanaged separate themselves.",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & automation",
    lead: "Zero Trust at pipeline speed. Access is configuration, so it lands in review with everything else rather than in a ticket queue.",
    items: [
      { name: "Terraform", logo: "terraform.svg", blurb: "Declare resources, policies and groups as code and apply them with the rest of your estate." },
      { name: "Jenkins", logo: "jenkins.svg", blurb: "Give a build agent a scoped identity instead of a shared credential." },
      { name: "GitHub", logo: "github.svg", blurb: "Secure workflows and Codespaces without handing a runner network-wide reach." },
      { name: "GitLab", logo: "gitlab.svg", blurb: "Bring per-app access into the CI pipeline, scoped to the job that needs it." },
      { name: "Bitbucket", logo: "bitbucket.svg", blurb: "Repository access on the same policy as everything else the developer touches." },
      { name: "Kubernetes", logo: "kubernetes.svg", blurb: "Manage gateways and resources declaratively from inside the cluster." },
    ],
  },
  {
    id: "logging",
    title: "Logging & SIEM",
    lead: "Every access event, in the format your SIEM already ingests. 202 event types, 11 built-in reports and 7 export formats — so the trail lands where your analysts already look.",
    items: [
      { name: "Splunk", logo: "splunk.svg", dark: "splunk-dark.svg", blurb: "Stream access events in CEF or NDJSON straight into an index." },
      { name: "Elastic", logo: "elastic.svg", dark: "elastic-dark.svg", blurb: "Ship structured events to Elasticsearch for search and dashboards." },
      { name: "ArcSight", logo: "arcsight.svg", blurb: "CEF export for estates standardised on ArcSight correlation." },
      { name: "Syslog", logo: "syslog.svg", blurb: "Plain syslog for anything that does not need a named connector." },
      { name: "SigNoz", logo: "signoz.svg", blurb: "Open-source observability for teams who would rather host it themselves." },
      { name: "Amazon S3", logo: "amazon-s3.svg", blurb: "Export raw log data to a bucket for retention and offline analysis." },
    ],
  },
  {
    id: "internet",
    title: "Internet security",
    lead: "DNS-level filtering alongside the access layer, so a request that should never resolve does not.",
    items: [
      { name: "Cloudflare", logo: "cloudflare.svg", blurb: "DNS filtering and DNS-over-HTTPS in front of the same managed devices." },
      { name: "DNSFilter", logo: null, blurb: "Category and threat filtering applied to traffic leaving the endpoint." },
    ],
  },
];

/** Every product in the catalogue, for the hero's count. */
export const TOTAL = CATEGORIES.reduce((n, c) => n + c.items.length, 0);
