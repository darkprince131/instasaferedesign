"use client";

/* ============================================================
   IzUsers — the three people the whole site talks about.

   One registry, imported everywhere a person appears: the end-user
   portal, the admin console, access logs, MFA examples. Before this,
   every component invented its own cast (Arjun Mehta here, anita.r
   there) and the site read like four different products.

   The avatar is DRAWN, not a photo and not a plain initials chip:
   a rounded plate, the doorway-portal arch from the hero at low
   opacity, and the monogram over it. Tints stay inside the token
   world — accent, and two neutral steps — because three rainbow
   avatars would break the one-orange rule on a page that already
   spends its colour budget on the CTA.
   ============================================================ */

export type IzUserApp = {
  /** file in /public/logos/integrations, without .svg */
  logo: string;
  name: string;
  /** protocol / surface shown under the name */
  kind: string;
};

export type IzUser = {
  id: string;
  name: string;
  initials: string;
  /** portal login handle */
  handle: string;
  email: string;
  role: string;
  group: string;
  /** which avatar tint: accent | ink | mute */
  tint: "accent" | "ink" | "mute";
  device: { host: string; os: string; make: string; model: string; registered: string };
  webApps: IzUserApp[];
  netApps: { name: string; kind: string }[];
  recent: { app: string; at: string }[];
};

export const IZ_USERS: IzUser[] = [
  {
    id: "alen",
    name: "Alen Joseph",
    initials: "AJ",
    handle: "alen.joseph",
    email: "alen.joseph@veno.co.in",
    role: "Infrastructure Engineer",
    group: "it-operations",
    tint: "accent",
    device: { host: "DESKTOP-16MTL6M", os: "Windows 11 Pro", make: "Dell Inc.", model: "Latitude 7490", registered: "2026-07-01 12:44 IST" },
    webApps: [
      { logo: "aws", name: "Amazon Web Services", kind: "SAML" },
      { logo: "azure", name: "Microsoft Azure", kind: "SAML" },
      { logo: "github", name: "GitHub", kind: "OIDC" },
      { logo: "jenkins", name: "Jenkins", kind: "SAML" },
      { logo: "docker", name: "Docker Hub", kind: "OIDC" },
      { logo: "servicenow", name: "ServiceNow", kind: "SAML" },
      { logo: "slack", name: "Slack", kind: "OIDC" },
      { logo: "microsoft-365", name: "Microsoft 365", kind: "SAML" },
    ],
    netApps: [
      { name: "prod-bastion", kind: "SSH · 22" },
      { name: "build-farm", kind: "RDP · 3389" },
      { name: "metrics-db", kind: "TCP · 5432" },
    ],
    recent: [
      { app: "prod-bastion", at: "18:51:04 IST" },
      { app: "Amazon Web Services", at: "18:50:14 IST" },
      { app: "GitHub", at: "18:42:37 IST" },
    ],
  },
  {
    id: "priya",
    name: "Priya S",
    initials: "PS",
    handle: "priya.s",
    email: "priya.s@veno.co.in",
    role: "Finance Systems Lead",
    group: "finance",
    tint: "ink",
    device: { host: "DESKTOP-7EJKLOP", os: "Windows 11 Pro", make: "Dell Inc.", model: "Latitude 5411", registered: "2026-07-01 12:24 IST" },
    webApps: [
      { logo: "salesforce", name: "Salesforce", kind: "SAML" },
      { logo: "sap", name: "SAP", kind: "SAML" },
      { logo: "oracle", name: "Oracle", kind: "SAML" },
      { logo: "quickbooks", name: "QuickBooks", kind: "OIDC" },
      { logo: "docusign", name: "DocuSign", kind: "SAML" },
      { logo: "hubspot", name: "HubSpot", kind: "OIDC" },
      { logo: "zoom", name: "Zoom", kind: "SAML" },
      { logo: "microsoft-365", name: "Microsoft 365", kind: "SAML" },
    ],
    netApps: [
      { name: "erp-frontend", kind: "TCP · 8443" },
      { name: "reports-db", kind: "TCP · 1521" },
    ],
    recent: [
      { app: "SAP", at: "18:47:52 IST" },
      { app: "erp-frontend", at: "18:31:09 IST" },
      { app: "Salesforce", at: "17:58:22 IST" },
    ],
  },
  {
    id: "olive",
    name: "Olive Ketta",
    initials: "OK",
    handle: "olive.ketta",
    email: "olive.ketta@veno.co.in",
    role: "Brand & Design",
    group: "marketing",
    tint: "mute",
    device: { host: "DARKPRINCEPC", os: "Windows 11 Home", make: "LENOVO", model: "81LK", registered: "2026-06-26 15:56 IST" },
    webApps: [
      { logo: "figma", name: "Figma", kind: "OIDC" },
      { logo: "adobe", name: "Adobe", kind: "SAML" },
      { logo: "canva", name: "Canva", kind: "OIDC" },
      { logo: "miro", name: "Miro", kind: "SAML" },
      { logo: "notion", name: "Notion", kind: "OIDC" },
      { logo: "dropbox", name: "Dropbox", kind: "SAML" },
      { logo: "google-workspace", name: "Google Workspace", kind: "SAML" },
      { logo: "workday", name: "Workday", kind: "SAML" },
    ],
    netApps: [{ name: "asset-store", kind: "SMB · 445" }],
    recent: [
      { app: "Figma", at: "18:44:31 IST" },
      { app: "asset-store", at: "18:12:05 IST" },
      { app: "Adobe", at: "16:20:48 IST" },
    ],
  },
];

export const IZ_USER_BY_ID = Object.fromEntries(IZ_USERS.map((u) => [u.id, u])) as Record<string, IzUser>;

/* ---------- avatar ---------- */

type AvatarProps = {
  user: IzUser;
  /** rendered box in px */
  size?: number;
  className?: string;
};

/* The arch is the hero's doorway in miniature: a vertical slab with a
   half-round head, drawn once and reused at three rotations so the
   three avatars are siblings rather than three unrelated marks. */
const ARCH = "M20 44V30a12 12 0 0 1 24 0v14Z";

export function IzAvatar({ user, size = 36, className }: AvatarProps) {
  return (
    <span
      className={className ? `izav izav-${user.tint} ${className}` : `izav izav-${user.tint}`}
      style={{ ["--izav-size" as string]: `${size}px` }}
      title={user.name}
    >
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <rect className="izav-plate" x="0.5" y="0.5" width="63" height="63" rx="15" />
        <path className="izav-arch" d={ARCH} transform={`rotate(${user.tint === "ink" ? 180 : user.tint === "mute" ? 90 : 0} 32 32)`} />
      </svg>
      <span className="izav-mono">{user.initials}</span>
    </span>
  );
}
