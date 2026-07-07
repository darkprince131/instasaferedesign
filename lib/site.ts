/**
 * Central page registry + navigation source-of-truth.
 *
 * Every URL here mirrors the LIVE instasafe.com sitemap (SEO-locked — do not
 * rename). Fully-built pages (home, MFA, IAM, ZTNA, SSO, Always-On, Device
 * Binding) are NOT in `SCAFFOLD_PAGES`; they own dedicated routes that take
 * precedence over the [...slug] catch-all. Everything else is served from the
 * catch-all using these records until it gets a bespoke build.
 */

export type PageKind =
  | "platform"
  | "solution"
  | "industry"
  | "compare"
  | "resource"
  | "company"
  | "integration"
  | "feature"
  | "legal";

export interface PageDef {
  path: string; // canonical path, no trailing slash
  title: string; // <title> (layout appends " | InstaSafe")
  eyebrow: string;
  h1: string;
  highlight?: string[]; // words in h1 to gradient-highlight
  sub: string;
  desc?: string; // meta description (defaults to sub)
  kind: PageKind;
  points?: { h: string; p: string }[];
}

const P = (p: PageDef): PageDef => ({ ...p, desc: p.desc ?? p.sub });

/* ───────────────────────── PLATFORM / PRODUCT ───────────────────────── */
const platform: PageDef[] = [
  P({
    path: "/platform",
    kind: "platform",
    eyebrow: "Platform overview",
    title: "The InstaSafe ZTNA Platform — One Console for Every Access Decision",
    h1: "One Platform for Every Access Decision.",
    highlight: ["Every", "Access", "Decision."],
    sub: "InstaSafe unifies ZTNA, identity, MFA, device trust, endpoint control and session recording in a single console — replacing four or five point products. Aligned with NIST SP 800-207 and the CSA Software-Defined Perimeter.",
    points: [
      { h: "Identity & Auth", p: "8 auth profiles, 6 MFA methods, 3 directory providers; SAML, OAuth, OIDC, RADIUS." },
      { h: "Secure App Access", p: "7 app types (FQDN, WEB, RDP, SSH, VNC, DB, WFS), 8 DB drivers, agentless access." },
      { h: "Privileged Sessions", p: "Recording, watermark, copy-paste and download blocking." },
      { h: "Device Trust", p: "25 check types, 1,500+ OS combos, 144 named rules." },
      { h: "Endpoint Management", p: "Software push, geofencing, app blocker, shift schedules, risk profiles." },
      { h: "Analytics & SIEM", p: "7 SIEM formats, 11 report types, 202 event types." },
    ],
  }),
  P({
    path: "/zero-trust-application-access",
    kind: "platform",
    eyebrow: "Zero Trust Application Access",
    title: "Zero Trust Application Access (ZTAA) — Agentless Access",
    h1: "Every App. One Click. Zero Network Exposure.",
    highlight: ["One", "Click.", "Zero"],
    sub: "Give employees, contractors and third parties single-click access to web apps, RDP, SSH, VNC, databases and file shares — through the browser, no agent required.",
    points: [
      { h: "FQDN", p: "Domain-based access for any protocol." },
      { h: "WEB", p: "Browser apps with SSO, landing page or direct access." },
      { h: "RDP / SSH / VNC", p: "Remote desktop, shell and GUI — each with session recording, watermark and copy-paste blocking." },
      { h: "DB", p: "Direct database sessions via 8 drivers — no jump server, fully governed and logged." },
      { h: "WFS", p: "Windows file shares (Host + Share + Domain) over the tunnel." },
      { h: "Agentless", p: "WEB, RDP, SSH and VNC open straight from the browser portal — ideal for contractors and BYOD." },
    ],
  }),
  P({
    path: "/secure-enterprise-browser",
    kind: "platform",
    eyebrow: "Secure Enterprise Browser",
    title: "Secure Enterprise Browser — Built-in DLP",
    h1: "The Browser That Doesn't Leak.",
    highlight: ["Doesn't", "Leak."],
    sub: "A hardened Chromium browser with built-in DLP, MFA and granular controls — block copy-paste, downloads and screen recording on sensitive web apps.",
    points: [
      { h: "Built-in DLP", p: "Copy-paste block, download block and watermark overlay on protected apps." },
      { h: "Built-in MFA", p: "Step-up authentication for sensitive applications, no app changes needed." },
      { h: "Threat protection", p: "Defends against plugin vulnerabilities, popup redirects and credential theft." },
      { h: "Cross-platform", p: "Runs on Windows, Linux and macOS." },
    ],
  }),
  P({
    path: "/solutions/instasafe-secure-web-gateway",
    kind: "platform",
    eyebrow: "Secure Web Gateway",
    title: "Secure Web Gateway (SWG) — Cloud Web Filtering",
    h1: "Filter the Web. Without the Appliance.",
    highlight: ["Without", "the", "Appliance."],
    sub: "Cloud-delivered web filtering — URL, content category, file type and domain controls enforced through the same access rules as the rest of InstaSafe ZTNA.",
    points: [
      { h: "URL filtering", p: "Exact, wildcard or regex rules with Allow / Deny / Bypass." },
      { h: "Content categories", p: "Six content categories filtered through one policy engine." },
      { h: "File-type control", p: "Seven file-type categories blocked or allowed per rule." },
      { h: "No appliance", p: "One policy engine shared with ZTNA — no separate console." },
    ],
  }),
  P({
    path: "/solutions/privileged-access-management",
    kind: "platform",
    eyebrow: "Privileged Access Management",
    title: "Privileged Access Management (PAM) — Session Recording",
    h1: "Privileged Access, Fully Accountable.",
    highlight: ["Fully", "Accountable."],
    sub: "Record every RDP, SSH and VNC session. Watermark it. Block copy-paste and downloads. Grant time-boxed elevated access — all without a separate PAM product.",
    points: [
      { h: "Session recording", p: "RDP/SSH/VNC capture with watermark and copy-paste/download blocking." },
      { h: "Time-boxed access", p: "Elevated access with timeout and optional auto-approve." },
      { h: "Database governance", p: "Session governance across 8 drivers, no bastion." },
      { h: "Full audit", p: "202 event types with SIEM export." },
    ],
  }),
  P({
    path: "/solutions/data-loss-prevention",
    kind: "platform",
    eyebrow: "Data Loss Prevention",
    title: "Data Loss Prevention (DLP) — Stop Data Walking Out",
    h1: "Stop Data Before It Walks Out.",
    highlight: ["Walks", "Out."],
    sub: "Block copy-paste, downloads and screen capture inside protected sessions. Watermark every screen. Filter risky file types and content categories.",
    points: [
      { h: "Session DLP", p: "Copy-paste block, download block and watermark on protected sessions." },
      { h: "File-type filtering", p: "Seven file-type categories controlled per rule." },
      { h: "Content filtering", p: "Six content categories filtered at the gateway." },
      { h: "Browser DLP", p: "Enforced through the Secure Enterprise Browser." },
    ],
  }),
  P({
    path: "/solutions/pam-privilege-session-manager",
    kind: "platform",
    eyebrow: "PAM · Session Manager",
    title: "PAM Privilege Session Manager",
    h1: "Record and Govern Every Privileged Session.",
    highlight: ["Every", "Privileged", "Session."],
    sub: "Capture RDP, SSH and VNC sessions with watermark and copy-paste blocking, and route the full audit trail to your SIEM.",
  }),
  P({
    path: "/solutions/pam-privilege-password-manager",
    kind: "platform",
    eyebrow: "PAM · Password Manager",
    title: "PAM Privilege Password Manager",
    h1: "Privileged Credentials, Under Control.",
    highlight: ["Under", "Control."],
    sub: "Vault, rotate and broker privileged credentials so secrets never live on the endpoint — access is granted just-in-time and fully logged.",
  }),
  P({
    path: "/solutions/documentation-secure-web-gateway",
    kind: "platform",
    eyebrow: "Secure Web Gateway · Docs",
    title: "Secure Web Gateway Documentation",
    h1: "Secure Web Gateway, Documented.",
    highlight: ["Documented."],
    sub: "Configuration reference for URL, content, file-type and domain filtering rules in the InstaSafe Secure Web Gateway.",
  }),
];

/* ───────────────────────── SOLUTIONS · USE CASE ───────────────────────── */
const solutions: PageDef[] = [
  P({
    path: "/solutions",
    kind: "solution",
    eyebrow: "Solutions",
    title: "Solutions — Zero Trust for Every Access Use Case",
    h1: "Zero Trust for Every Way You Work.",
    highlight: ["Every", "Way", "You", "Work."],
    sub: "From retiring the VPN to securing remote teams, DevOps, cloud apps and VoIP — InstaSafe ZTNA maps one platform onto every access use case.",
  }),
  P({
    path: "/vpn-alternative",
    kind: "solution",
    eyebrow: "VPN Alternative",
    title: "VPN Alternative — Replace Your VPN with Zero Trust",
    h1: "It's Time to Retire Your VPN.",
    highlight: ["Retire", "Your", "VPN."],
    sub: "VPNs grant network-wide trust, expose ports and slow your team down. InstaSafe ZTNA replaces them with app-level zero trust — faster, invisible and fully audited.",
    points: [
      { h: "Why VPNs fail", p: "Network-wide trust, exposed ports, latency and zero per-app visibility." },
      { h: "App-level access", p: "Users reach one authorised app at a time — never the network behind it." },
      { h: "Migration path", p: "Keep the VPN running, move app-by-app, retire when ready." },
      { h: "Direct-to-app speed", p: "No backhauling through a concentrator — traffic goes device to app." },
    ],
  }),
  P({
    path: "/secure-remote-access",
    kind: "solution",
    eyebrow: "Secure Remote Access",
    title: "Secure Remote Access — Every Worker, Every Device",
    h1: "Secure Every Remote Worker. Every Device. Everywhere.",
    highlight: ["Everywhere."],
    sub: "Give your distributed workforce fast, verified access to exactly the apps they need — with device posture, MFA and full session visibility built in.",
    points: [
      { h: "Agent & agentless", p: "Deploy a lightweight agent or run fully clientless from the browser." },
      { h: "Device posture", p: "25 device checks clear before any connection is allowed." },
      { h: "Every platform", p: "Windows, Linux, macOS, iOS and Android." },
      { h: "Always-On option", p: "Boot-time protection that connects before the user logs in." },
    ],
  }),
  P({
    path: "/clientless-remote-access",
    kind: "solution",
    eyebrow: "Clientless Access",
    title: "Clientless / Agentless Access — Zero Install",
    h1: "Zero Trust Access. Zero Install.",
    highlight: ["Zero", "Install."],
    sub: "WEB, RDP, SSH and VNC apps open straight from the browser. Perfect for contractors, BYOD and new joiners — full security, nothing to deploy.",
    points: [
      { h: "Nothing to install", p: "Apps open from the browser portal — no agent on the endpoint." },
      { h: "Contractor-ready", p: "Onboard third parties via CSV import with time-boxed access." },
      { h: "Still enforced", p: "MFA, device check, session recording and DLP all apply." },
    ],
  }),
  P({
    path: "/secure-devops-access",
    kind: "solution",
    eyebrow: "DevOps Access",
    title: "Secure DevOps Access — Governed SSH & RDP",
    h1: "Ship Fast. Stay Secure.",
    highlight: ["Stay", "Secure."],
    sub: "Give developers governed SSH, RDP and web access to Jenkins, GitLab, Jira and production — with session recording and zero exposed ports.",
    points: [
      { h: "No shared keys", p: "Identity-bound access replaces shared SSH keys and exposed bastions." },
      { h: "Recorded sessions", p: "Every SSH/RDP/web session is governed and recorded." },
      { h: "Direct DB access", p: "DBAs reach databases across 8 drivers — no bastion." },
    ],
  }),
  P({
    path: "/secure-voip-access",
    kind: "solution",
    eyebrow: "VoIP Access",
    title: "Secure VoIP Access for Remote Teams",
    h1: "Secure VoIP for Remote Teams.",
    highlight: ["Remote", "Teams."],
    sub: "AES-256-encrypted access to VoIP infrastructure for remote agents and contact centres — works with your existing VoIP gateways.",
    points: [
      { h: "AES-256 tunnel", p: "Encrypted UDP transport carries voice without exposing the gateway." },
      { h: "Gateway-compatible", p: "Works with your existing VoIP infrastructure." },
      { h: "Contact-centre scale", p: "Proven on the world's largest BPM provider's remote agents." },
    ],
  }),
  P({
    path: "/secure-cloud-applications",
    kind: "solution",
    eyebrow: "Cloud Applications",
    title: "Secure Cloud Applications — Extend Zero Trust to SaaS",
    h1: "Extend Zero Trust to Every Cloud App.",
    highlight: ["Every", "Cloud", "App."],
    sub: "Bring AD/LDAP identity, MFA and device trust to your SaaS and cloud workloads — and cut access-related OpEx by up to 40%.",
    points: [
      { h: "Multi-cloud", p: "One access layer across AWS, Azure and GCP." },
      { h: "Extend your directory", p: "Bring on-prem AD/LDAP identity to the cloud." },
      { h: "SSO + MFA for SaaS", p: "Layer single sign-on and MFA onto every cloud app." },
    ],
  }),
  P({
    path: "/domain-joining",
    kind: "solution",
    eyebrow: "Domain Joining",
    title: "Remote Domain Joining — Keep Your DC Private",
    h1: "Domain-Join Remote Devices. Keep Your DC Private.",
    highlight: ["Keep", "Your", "DC", "Private."],
    sub: "Join remote machines to Active Directory and push group policies — without exposing domain-controller ports to the internet.",
    points: [
      { h: "Secure remote join", p: "Devices join AD over the tunnel, never over open ports." },
      { h: "Push group policy", p: "Apply GPOs to remote devices as if they were on the LAN." },
      { h: "DC stays dark", p: "The domain controller remains in a private, unscannable network." },
    ],
  }),
  // VDI alternative cluster
  P({
    path: "/solutions/vdi-secure-digital-workspace",
    kind: "solution",
    eyebrow: "VDI Alternative",
    title: "VDI Alternative — Secure Digital Workspace",
    h1: "The Security of VDI. Without the Cost.",
    highlight: ["Without", "the", "Cost."],
    sub: "Most teams deploy VDI just for secure access. InstaSafe ZTNA delivers that security — device trust, session control, DLP — without the virtualisation overhead.",
  }),
  P({
    path: "/solutions/vdi-remote-application-server",
    kind: "solution",
    eyebrow: "VDI Alternative",
    title: "Remote Application Server — VDI Alternative",
    h1: "Publish Apps Without a VDI Farm.",
    highlight: ["Without", "a", "VDI", "Farm."],
    sub: "Deliver remote applications securely over the InstaSafe tunnel — the access security of a published-app server, none of the hosting overhead.",
  }),
  P({
    path: "/solutions/vdi-desktop-and-application-virtualization",
    kind: "solution",
    eyebrow: "VDI Alternative",
    title: "Desktop & Application Virtualization Alternative",
    h1: "Secure Access, Not Virtual Desktops.",
    highlight: ["Not", "Virtual", "Desktops."],
    sub: "When the goal is secure access — not a full virtual desktop — InstaSafe ZTNA delivers device trust, DLP and session control without virtualization licensing.",
  }),
  P({
    path: "/solutions/vdi-desktop-as-a-service",
    kind: "solution",
    eyebrow: "VDI Alternative",
    title: "DaaS Alternative — Desktop as a Service Cost Comparison",
    h1: "The DaaS Bill, Without the DaaS.",
    highlight: ["Without", "the", "DaaS."],
    sub: "Compare the cost of Desktop-as-a-Service against zero trust access — and see why most DaaS deployments only ever needed secure access.",
  }),
  P({
    path: "/solutions/website-traffic-filtering",
    kind: "solution",
    eyebrow: "Web Filtering",
    title: "Website Traffic Filtering",
    h1: "Filter Web Traffic at the Edge.",
    highlight: ["at", "the", "Edge."],
    sub: "Apply URL, category and file-type filtering to outbound web traffic through the same policy engine that runs your zero trust access.",
  }),
  P({
    path: "/solutions/internet-access-control",
    kind: "solution",
    eyebrow: "Internet Access Control",
    title: "Internet Access Control",
    h1: "Control What the Internet Can Reach.",
    highlight: ["the", "Internet", "Can", "Reach."],
    sub: "Allow, deny or bypass internet destinations per user, group and device — enforced cloud-side with no appliance to rack.",
  }),
];

/* ───────────────────────── IDAM CLUSTER (→ IAM) ───────────────────────── */
const idam: PageDef[] = [
  ["/solutions/idam-single-sign-on", "Single Sign-On (IDAM)", "One Login Across Every App.", ["One", "Login"], "One authenticated session launches every assigned app — SAML 2.0, OAuth and OIDC, with desktop and Kerberos SSO."],
  ["/solutions/idam-multi-factor-authentication", "Multi-Factor Authentication (IDAM)", "A Second Factor, Everywhere.", ["Second", "Factor,"], "Six MFA methods — OTP, TOTP, push, biometrics, certificate and hardware token — layered onto any app or VPN."],
  ["/solutions/idam-access-control", "Access Control (IDAM)", "Granular Access Control.", ["Granular"], "21 policy combinations across source identity and destination, with Allow / Deny / Bypass and contextual conditions."],
  ["/solutions/idam-directory-sync", "Directory Sync (IDAM)", "Sync Every Directory.", ["Every", "Directory."], "Azure AD / Entra, Google Workspace and SCIM 2.0 — inbound and outbound — with full AD bind."],
  ["/solutions/idam-user-management", "User Management (IDAM)", "Users and Groups, in One Place.", ["One", "Place."], "Provision, group and role-manage users with role-based access control and self-service password reset."],
  ["/solutions/idam-lifecycle-management", "Lifecycle Management (IDAM)", "Joiner, Mover, Leaver — Handled.", ["Handled."], "Inactive-user management, shift schedules and scheduled suspension close the gaps a manual JML process leaves open."],
  ["/solutions/idam-reporting-and-analytics", "Reporting & Analytics (IDAM)", "Every Event, On the Record.", ["On", "the", "Record."], "11 report types and 202 event types stream to 7 SIEM formats — every login, denial and posture change logged."],
  ["/solutions/idam-authentication-protocols", "Authentication Protocols (IDAM)", "Every Protocol You Run.", ["Every", "Protocol"], "SAML, OAuth, OpenID Connect, RADIUS, TACACS, Kerberos and FIDO — InstaSafe ZTNA speaks them all."],
  ["/solutions/identity-governance-and-administration", "Identity Governance & Administration", "Govern Identity End to End.", ["End", "to", "End."], "Directory sync, access control, lifecycle and reporting in one identity governance layer — the IGA backbone of InstaSafe ZTNA."],
].map(([path, title, h1, highlight, sub]) =>
  P({
    path: path as string,
    kind: "platform",
    eyebrow: "Identity & Access",
    title: title as string,
    h1: h1 as string,
    highlight: highlight as string[],
    sub: sub as string,
  })
);

/* ───────────────────────── FEATURES ───────────────────────── */
const features: PageDef[] = [
  P({
    path: "/zero-trust-features/device-posture-check",
    kind: "feature",
    eyebrow: "Device Posture",
    title: "Device Posture Check — Verify the Device, Every Time",
    h1: "Verify the Device, Every Time.",
    highlight: ["Every", "Time."],
    sub: "Before any connection, InstaSafe ZTNA checks the device against 25 check types and 144 rules across 1,500+ OS combinations — and denies anything that fails.",
    points: [
      { h: "25 check types", p: "AV/EDR, OS version, disk encryption, firewall, registry, certificates and more." },
      { h: "144 named rules", p: "Compose checks into rules and bind them to users, groups and apps." },
      { h: "1,500+ OS combos", p: "Coverage across Windows, macOS, Linux, iOS and Android variants." },
      { h: "Continuous", p: "Posture is re-checked mid-session — if it drops, access closes." },
    ],
  }),
];

/* ───────────────────────── COMPARE ───────────────────────── */
const compare: PageDef[] = [
  P({
    path: "/zero-trust-vs-vpn",
    kind: "compare",
    eyebrow: "Compare · vs VPN",
    title: "Zero Trust vs VPN — The Full Comparison",
    h1: "Your VPN Trusts the Whole Network. InstaSafe ZTNA Trusts One App.",
    highlight: ["One", "App."],
    sub: "A side-by-side on trust model, attack surface, lateral movement and data path — and a migration path off the VPN.",
  }),
  P({
    path: "/instasafe-zero-trust-vs-zscaler-private-access",
    kind: "compare",
    eyebrow: "Compare · vs Zscaler",
    title: "InstaSafe vs Zscaler Private Access",
    h1: "Zscaler Routes Your Traffic Through Their Cloud. We Don't.",
    highlight: ["We", "Don't."],
    sub: "InstaSafe ZTNA keeps traffic device-to-app with inbuilt MFA, SSO, IdP, session recording and an on-premise option Zscaler ZPA doesn't offer.",
  }),
  P({
    path: "/instasafe-zero-trust-vs-fortinet-vpn",
    kind: "compare",
    eyebrow: "Compare · vs Fortinet",
    title: "InstaSafe vs Fortinet VPN",
    h1: "Hardware and Legacy Pricing, or Cloud-Native Zero Trust.",
    highlight: ["Cloud-Native", "Zero", "Trust."],
    sub: "Fortinet is appliance-based with no Linux/macOS/iOS parity. InstaSafe ZTNA is cloud-native zero trust with identity, device and session built in.",
  }),
];

/* ───────────────────────── INTEGRATIONS ───────────────────────── */
const integration: PageDef[] = [
  ["/solutions/securing-access-for-microsoft-365", "Microsoft 365"],
  ["/solutions/secure-access-for-google-workspace", "Google Workspace"],
  ["/solutions/secure-access-for-salesforce", "Salesforce"],
  ["/solutions/secure-access-for-jira", "Jira"],
  ["/solutions/secure-access-for-github", "GitHub"],
  ["/solutions/secure-access-for-gitlab", "GitLab"],
  ["/solutions/secure-access-for-zoho", "Zoho"],
  ["/solutions/secure-access-for-outlook-web-access", "Outlook Web Access"],
  ["/solutions/securing-access-for-icewarp-email", "IceWarp Email"],
].map(([path, app]) =>
  P({
    path,
    kind: "integration",
    eyebrow: "Integration",
    title: `Secure Access for ${app}`,
    h1: `Zero Trust Access for ${app}.`,
    highlight: app.split(" "),
    sub: `Bring identity, MFA, device posture and session controls to ${app} — secured through the InstaSafe access layer, agentless or with a lightweight client.`,
  })
);

/* ───────────────────────── CASE STUDIES / INDUSTRY ───────────────────────── */
const caseStudies: [string, string, string][] = [
  ["/case-studies/Zero-trust-for-banking", "Zero Trust for Banking & BFSI.", "RBI-aligned zero trust for branch, vendor and core-banking access — on-premise, with MFA, device posture and a full audit trail."],
  ["/case-studies/Zero-trust-for-IT-sector", "Zero Trust for IT, ITES & BPM.", "Agentless onboarding, DLP, session recording and VoIP security for a large, churning remote workforce — proven on the world's largest BPM provider."],
  ["/case-studies/Zero-trust-for-logistics", "Zero Trust for Logistics.", "ZTNA for thick-client logistics software, SAP and field apps across distributed warehouses, with geofencing and device posture."],
  ["/case-studies/Zero-trust-for-real-estate", "Zero Trust for Real Estate.", "Agentless access, DLP and device binding for distributed sites, large workforces and third-party brokers."],
  ["/case-studies/Zero-trust-for-SAP-Access", "Zero Trust for SAP Access.", "Govern SAP access for employees and contractors with device trust, contextual policy and recorded sessions — no exposed ports."],
  ["/case-studies/Zero-trust-for-ERP-Access", "Zero Trust for ERP Access.", "Secure ERP access across plants and sites with on-prem deployment, device posture and contextual access control."],
];

const industry: PageDef[] = [
  P({
    path: "/case-studies",
    kind: "industry",
    eyebrow: "Customers",
    title: "Customers & Case Studies — Trusted by 150+ Enterprises",
    h1: "Trusted by 150+ Enterprises Across India.",
    highlight: ["150+", "Enterprises"],
    sub: "Government PSUs, private banks and the world's largest BPM provider run zero trust on InstaSafe ZTNA. Read how they made the switch.",
  }),
  ...caseStudies.map(([path, h1, sub]) =>
    P({
      path,
      kind: "industry",
      eyebrow: "Case study",
      title: h1.replace(/\.$/, ""),
      h1,
      highlight: ["Trust"],
      sub,
    })
  ),
];

/* ───────────────────────── RESOURCES ───────────────────────── */
const resource: PageDef[] = [
  P({
    path: "/why-instasafe-zero-trust",
    kind: "resource",
    eyebrow: "Why InstaSafe",
    title: "Why InstaSafe — More Than Zero Trust",
    h1: "More Than Zero Trust. The Complete Platform.",
    highlight: ["The", "Complete", "Platform."],
    sub: "Six reasons enterprises choose InstaSafe ZTNA over point products and global vendors.",
    points: [
      { h: "Privacy First", p: "Data never routes through our machines." },
      { h: "On-premise option", p: "For sovereignty and air-gapped environments." },
      { h: "Everything inbuilt", p: "MFA, SSO, IdP, browser, endpoint and PAM in one console." },
      { h: "Deploy in days", p: "Cloud-native and hardware-free." },
      { h: "Database access built in", p: "8 drivers, no bastion." },
      { h: "Session recording built in", p: "Privileged recording at the ZTNA layer." },
    ],
  }),
  P({
    path: "/what-is-zero-trust",
    kind: "resource",
    eyebrow: "Learn",
    title: "What Is Zero Trust? The Complete Guide",
    h1: "What Is Zero Trust? The Complete Guide.",
    highlight: ["Zero", "Trust?"],
    sub: "Security used to be a castle with a moat. Then the walls disappeared. Here's the model that replaced them — and how to implement it.",
    points: [
      { h: "Never trust, always verify", p: "Every request is authenticated, authorised and encrypted — regardless of network." },
      { h: "Least-privilege access", p: "Users reach only what they need, one app at a time." },
      { h: "Assume breach", p: "Microsegmentation contains any compromise to a single workload." },
      { h: "Continuous monitoring", p: "Trust is re-evaluated continuously, not just at login." },
    ],
  }),
  P({
    path: "/craft-a-zero-trust-strategy",
    kind: "resource",
    eyebrow: "Strategy",
    title: "Craft a Zero Trust Strategy",
    h1: "Craft a Zero Trust Strategy.",
    highlight: ["Strategy."],
    sub: "A practical maturity model and implementation path — from VPN replacement to full microsegmentation — mapped to how InstaSafe ZTNA deploys.",
  }),
  P({
    path: "/the-state-of-zero-trust-security-2023",
    kind: "resource",
    eyebrow: "Research",
    title: "The State of Zero Trust Security 2023",
    h1: "The State of Zero Trust Security 2023.",
    highlight: ["2023."],
    sub: "86% cite unsecured third-party access as their top concern · 63% have begun adoption · 72% are migrating off VPN · 75% expect Zero Trust to cut incidents.",
  }),
  P({
    path: "/glossary",
    kind: "resource",
    eyebrow: "Reference",
    title: "Zero Trust Glossary",
    h1: "The Zero Trust Glossary.",
    highlight: ["Glossary."],
    sub: "Plain-language definitions of the terms behind zero trust, ZTNA, SDP, IAM and the access controls that make them work.",
  }),
  P({
    path: "/resource-center",
    kind: "resource",
    eyebrow: "Resources",
    title: "Resource Center — Brochures, Webinars, Datasheets",
    h1: "Everything, in One Resource Center.",
    highlight: ["One", "Resource", "Center."],
    sub: "Brochures, datasheets, webinars and competitor comparison guides for the InstaSafe ZTNA platform.",
  }),
  P({
    path: "/blog",
    kind: "resource",
    eyebrow: "Blog",
    title: "Blog — Zero Trust Insights & Stories",
    h1: "Insights From the Zero Trust Front Line.",
    highlight: ["Zero", "Trust", "Front", "Line."],
    sub: "Product thinking, threat analysis and migration playbooks from the InstaSafe team.",
  }),
];

/* ───────────────────────── COMPANY / CONVERSION ───────────────────────── */
const company: PageDef[] = [
  P({
    path: "/about-us",
    kind: "company",
    eyebrow: "Company",
    title: "About InstaSafe — Simplifying Cybersecurity Since 2012",
    h1: "Simplifying Cybersecurity Since 2012.",
    highlight: ["Since", "2012."],
    sub: "InstaSafe is one of Asia's fastest-growing cybersecurity companies — securing 500,000 endpoints across 150+ enterprises and 100+ Fortune 2000 clients on five continents.",
    points: [
      { h: "Founded 2012", p: "Headquartered in Bengaluru, led by CEO Sandip Panda." },
      { h: "Backed early", p: "Microsoft Ventures (2014) and Indian Angel Network (2017)." },
      { h: "Recognised", p: "Gartner Representative Vendor, DSCI Product of the Year, G2 High Performer." },
      { h: "Global", p: "Offices in Bengaluru (HQ), California and Germany." },
    ],
  }),
  P({
    path: "/instasafe-zero-trust-pricing",
    kind: "company",
    eyebrow: "Pricing",
    title: "Pricing — Enterprise Security, Startup Pricing",
    h1: "Enterprise Security. Startup Pricing.",
    highlight: ["Startup", "Pricing."],
    sub: "Three plans, public prices, billed annually. Start small and scale — or talk to us about enterprise.",
    points: [
      { h: "SSO — $1/user/mo", p: "Unlimited SAML/OAuth/OIDC, desktop SSO, directory sync, device auth, SIEM, 11 reports." },
      { h: "MFA — $1/user/mo", p: "TOTP, FIDO2, push, biometrics, passwordless, OS MFA, backup codes, conditional MFA." },
      { h: "Zero Trust Platform — $2/user/mo", p: "25 device checks, 7 app types, session recording, agent + agentless, 7 SIEM formats, 202 event types." },
    ],
  }),
  P({
    path: "/book-a-demo",
    kind: "company",
    eyebrow: "Demo",
    title: "Book a Demo — See InstaSafe ZTNA in Action",
    h1: "See InstaSafe ZTNA in Action.",
    highlight: ["in", "Action."],
    sub: "A 30-minute walkthrough tailored to your environment. Trusted by 150+ businesses across every industry and size.",
  }),
  P({
    path: "/contact-us",
    kind: "company",
    eyebrow: "Contact",
    title: "Contact InstaSafe",
    h1: "Talk to the Team.",
    highlight: ["the", "Team."],
    sub: "Reach support at +91 844 844 8548, or contact sales for a tailored walkthrough. Offices in Bengaluru, Walnut CA and Urbar.",
  }),
  P({
    path: "/careers",
    kind: "company",
    eyebrow: "Careers",
    title: "Careers at InstaSafe",
    h1: "Build the Future of Access.",
    highlight: ["Future", "of", "Access."],
    sub: "Join a global, remote-friendly team simplifying cybersecurity for enterprises across five continents.",
  }),
  P({
    path: "/partners",
    kind: "company",
    eyebrow: "Partners",
    title: "Partner Program — Reseller, Referral, MSSP",
    h1: "Grow With Zero Trust.",
    highlight: ["Zero", "Trust."],
    sub: "Reseller, referral, MSSP and technology-alliance tracks — with MDF support, a partner portal and dedicated enablement. Gartner projects 60% of enterprises will phase out VPNs within five years.",
  }),
  P({
    path: "/instasafe-newsroom",
    kind: "company",
    eyebrow: "Newsroom",
    title: "Newsroom — Press & Coverage",
    h1: "InstaSafe in the News.",
    highlight: ["the", "News."],
    sub: "Press coverage, announcements and the awards feed from across the InstaSafe story.",
  }),
  P({
    path: "/awards",
    kind: "company",
    eyebrow: "Awards",
    title: "Awards & Recognition",
    h1: "Recognised for Zero Trust.",
    highlight: ["Zero", "Trust."],
    sub: "Gartner Representative Vendor for ZTNA, Deloitte Technology Fast 50 India, DSCI Security Product of the Year, G2 High Performer and more.",
  }),
  P({
    path: "/instasafe-on-gem",
    kind: "company",
    eyebrow: "Government",
    title: "InstaSafe on GeM",
    h1: "Procure InstaSafe ZTNA on GeM.",
    highlight: ["on", "GeM."],
    sub: "InstaSafe is listed on the Government e-Marketplace — on-premise zero trust built for PSUs, ministries and regulated public-sector buyers.",
  }),
  P({
    path: "/security",
    kind: "company",
    eyebrow: "Trust Center",
    title: "Trust Center — Certifications & Compliance",
    h1: "Security You Can Verify.",
    highlight: ["You", "Can", "Verify."],
    sub: "Certifications and alignment (ISO 27001, NIST SP 800-207, CSA SDP), compliance coverage and our responsible-disclosure policy.",
  }),
];

/* ───────────────────────── LEGAL ───────────────────────── */
const legal: PageDef[] = [
  P({ path: "/privacy-policy", kind: "legal", eyebrow: "Legal", title: "Privacy Policy", h1: "Privacy Policy.", highlight: ["Policy."], sub: "How InstaSafe collects, uses and protects your data — DPDP-aligned, with clear data-handling statements." }),
  P({ path: "/terms-and-conditions", kind: "legal", eyebrow: "Legal", title: "Terms & Conditions", h1: "Terms & Conditions.", highlight: ["Conditions."], sub: "The terms governing use of the InstaSafe website and the InstaSafe ZTNA platform." }),
  P({ path: "/ios-app-terms-of-use", kind: "legal", eyebrow: "Legal", title: "iOS App Terms of Use", h1: "iOS App Terms of Use.", highlight: ["Use."], sub: "Terms of use for the InstaSafe iOS authenticator and access apps." }),
  P({ path: "/sitemap", kind: "legal", eyebrow: "Sitemap", title: "Sitemap", h1: "Find Your Way Around.", highlight: ["Your", "Way"], sub: "Every page on the InstaSafe site, in one place." }),
];

/* ───────────────────────── ASSEMBLY ───────────────────────── */
export const SCAFFOLD_PAGES: PageDef[] = [
  ...platform,
  ...solutions,
  ...idam,
  ...features,
  ...compare,
  ...integration,
  ...industry,
  ...resource,
  ...company,
  ...legal,
];

// De-dupe by path (industry array intentionally re-adds the hub; keep first).
const seen = new Set<string>();
export const PAGES: PageDef[] = SCAFFOLD_PAGES.filter((p) => {
  if (seen.has(p.path)) return false;
  seen.add(p.path);
  return true;
});

const BY_PATH = new Map(PAGES.map((p) => [p.path, p]));

export function pageByPath(path: string): PageDef | undefined {
  return BY_PATH.get(path.replace(/\/$/, "") || "/");
}

export function pageBySlug(slug: string[]): PageDef | undefined {
  return pageByPath("/" + slug.join("/"));
}

export function allSlugs(): { slug: string[] }[] {
  return PAGES.map((p) => ({ slug: p.path.replace(/^\//, "").split("/") }));
}
