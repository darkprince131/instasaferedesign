# InstaSafe Website Content Master — VOLUME 1: PLATFORM & PRODUCT PAGES
**Files in this set:** Vol 1 (Platform/Products) · Vol 2 (Solutions/Use Cases) · Vol 3 (Industries) · Vol 4 (Company/Trust/Resources/Glossary)
**Supersedes:** the page sections of Content Master v1. Global rules, guardrails, and debt register from v1/v2 still apply.
**Every page below follows the dual-audience rule:** a "Plain answer" section for readers new to the concept + a "Quick scan" spec block for experts. Both are mandatory on every product page.
**Markers:** [SOURCE NEEDED] = Sikha citation required · [CONFIRM] = Product/Sachin verification required · [PLACEHOLDER] = do not publish value.

---
---

# 1. /platform — Platform Overview

**SEO** — Title: InstaSafe Zero Trust Platform | ZTNA, ZTAA, IAM, MFA in One | Meta: One platform for identity, device, and application access control. 500,000+ endpoints secured. NIST SP 800-207 aligned Zero Trust, deployed in days.

**Hero**
```
Eyebrow: INSTASAFE ZTNA PLATFORM
H1: Access control that works the way your network actually does.
Sub: Identity, device, network, and application — every layer verified on every request. One console, one agent, one policy engine.
CTA: Book a Demo | Explore the Platform ↓
```

**Stat strip** [SOURCE NEEDED ×3: credential-theft share of breaches · VPN incident rate India · avg lateral-movement dwell time]

**Plain answer — What is the InstaSafe platform?**
Most security tools answer one question. A VPN answers "can this person reach the network?" An MFA tool answers "is this password really theirs?" A posture tool answers "is this laptop safe?" The problem: attackers only need one of those answers to be wrong.

InstaSafe asks all of them at once, on every single access request. Before a user reaches any application — a web app, a remote desktop, an SSH server, a database — the platform verifies who they are, checks the device they're using, evaluates where and when the request is coming from, and then opens a connection to that one application only. Not to the network. Not to anything adjacent. One user, one app, one encrypted tunnel, one logged session.

That is Zero Trust in practice: no request is trusted because of where it comes from, and no user gets more than they need. (New to the concept? Start with [What is Zero Trust →] /resources/what-is-zero-trust)

**The four layers (C23 Console Rows)**
```
IDENTITY (IAM)      Who is asking?
                    Directory sync (AD, LDAP, Azure AD, Google Workspace, O365),
                    8 configurable auth profiles, 6 MFA methods, SSO to every
                    provisioned app.

DEVICE              What are they asking from?
                    25 posture check types across 144 named rules and 1,500+
                    OS/device combinations. Device binding ties each session to
                    an approved, certificated device.

NETWORK (ZTNA)      How do they connect?
                    Server blackening and a drop-all gateway make assets
                    invisible to the internet. Per-session tunnels at the IP
                    layer for thick clients and network protocols.

APPLICATION (ZTAA)  What exactly can they touch?
                    7 app types through one portal — FQDN, WEB, RDP, SSH, VNC,
                    DB, WFS — with session recording, watermarking, and
                    clipboard control on sensitive apps.
```

**The Trust Engine (A2 canonical block — reuse verbatim)**
```
Every access request passes through one decision engine.
Identity, device posture, location, time, and risk score —
evaluated together, per session, before a single packet reaches the app.
21 policy combinations · 12 risk triggers · 4 automatic responses
Decision time: milliseconds. Trust assumed: zero.
```
Supporting copy: The Trust Engine is not a marketing name for a firewall rule. It is the policy evaluation layer of the InstaSafe controller. Administrators combine identity, device, location, time, and risk conditions into 21 possible policy combinations. Twelve trigger types — impossible-travel logins, posture drift, repeated failures, unusual hours, and more — feed the risk score. Four automatic responses are available when risk crosses a threshold: step-up MFA, session restriction, alerting, and session termination. Every decision is logged as one of 202 event types.

**How a request actually flows (numbered walkthrough — scroll section)**
```
01  REQUEST      User opens the InstaSafe agent or browser portal and requests
                 an application. Nothing on your network has responded yet —
                 assets sit dark behind a drop-all gateway.
02  IDENTITY     The controller checks the directory (your AD/LDAP/IdP or
                 InstaSafe's built-in directory) and enforces the auth profile:
                 password plus the MFA method you've configured for this user
                 group.
03  DEVICE       The agent reports posture — OS version, patching, antivirus,
                 firewall state, disk encryption, and up to 25 check types.
                 The device certificate is matched against the binding record.
04  CONTEXT      Location, IP range, time window, and behavioural signals are
                 scored against policy. Anomalies raise risk; risk can trigger
                 step-up authentication or denial.
05  CONNECT      Only now does the gateway open — a single encrypted tunnel
                 from this device to this application. The network itself is
                 never exposed. The session is logged, and for privileged
                 access, recorded.
```

**Quick scan — platform specs**
```
App types                7 (FQDN, WEB, RDP, SSH, VNC, DB, WFS)
DB drivers               PostgreSQL, MSSQL, SQL Server (GA);
                         Oracle, Elasticsearch (beta); ClickHouse, MongoDB (alpha)
Auth profiles            8 · MFA methods: 6 · User providers: 3
Device checks            25 types · 144 named rules · 1,500+ OS/device combos
Access policies          21 combinations
Risk engine              12 trigger types · 4 auto-actions
Logging                  202 event types · 11 report types · 7 SIEM export formats
Auth protocols           SAML 2.0, OAuth, OpenID Connect, RADIUS, TACACS+, JWT, CAS
Directory sync           AD, LDAP, Azure AD, Google Workspace, O365
Client OS                Windows, macOS, Linux; mobile apps; clientless browser mode
Deployment               Cloud controller [CONFIRM hybrid/on-prem options — Sachin]
Standards                NIST SP 800-207, CSA SDP, PCI DSS, HIPAA, GDPR, SOX, ISO 27001
```

**Three outcomes**
```
01  ONE PLATFORM, NOT FIVE TOOLS
    ZTNA, ZTAA, IAM, MFA, SSO, and endpoint controls from one console.
    Retire the VPN, the separate MFA vendor, and the access spreadsheets.

02  INVISIBLE INFRASTRUCTURE
    Server blackening means your applications don't appear on the internet
    at all. Attackers can't scan what doesn't respond.

03  YOUR DATA NEVER TOUCHES US
    Split-plane architecture: InstaSafe runs the control plane; your data
    flows directly between your users and your apps. [→ Privacy First]
```

**Deployment & rollout** — Typical rollout: pilot group in week one, staged expansion by team, VPN decommission for migrated users with rollback intact. [CONFIRM real timeline — Shiba]. No hardware. No network re-architecture.

**FAQs**
```
Q: Is InstaSafe a VPN?
A: No. A VPN connects a device to a network. InstaSafe connects a verified
user on a verified device to a specific application, without exposing the
network at all. See VPN Alternative for the full comparison.

Q: Do we have to replace our identity provider?
A: No. InstaSafe syncs with AD, LDAP, Azure AD, Google Workspace, and O365,
or can act as your identity provider if you don't have one.

Q: What does the end user actually experience?
A: A portal (or agent) showing the applications they're allowed to use.
One login, MFA as configured, one click per app. Access decisions happen
in milliseconds in the background.

Q: What can InstaSafe see of our traffic?
A: Authentication metadata, policy decisions, and the logs you export.
Application data flows directly between your users and your apps — the
split-plane design means it never transits InstaSafe infrastructure.

Q: How long does deployment take?
A: Days, not weeks — the controller is cloud-delivered and gateways are
software. [CONFIRM typical figures — Shiba]

Q: Which compliance frameworks does this support?
A: The architecture aligns with NIST SP 800-207 and CSA SDP, and supports
controls required by PCI DSS, HIPAA, GDPR, SOX, ISO 27001, and India's
DPDP Act. See the Trust Center for mappings.
```

**Related:** ZTNA · ZTAA · IAM · Why InstaSafe · Pricing

---
---

# 2. /platform/ztna — Zero Trust Network Access

**SEO** — Title: Zero Trust Network Access (ZTNA) | InstaSafe | Meta: IP-layer Zero Trust access for thick clients, legacy apps, and network protocols. Server blackening, per-session tunnels, 25 device checks. Replace VPN without re-architecture.

**Hero**
```
Eyebrow: ZERO TRUST NETWORK ACCESS
H1: Network access that assumes nothing and verifies everything.
Sub: Connect users to IP-layer resources — thick clients, legacy systems, network protocols — without putting your network on the internet.
CTA: Book a Demo | See the Breach Simulator ↓
```

**Stat strip** [SOURCE NEEDED ×3 — ZTNA set from v2 A1]

**Plain answer — What is ZTNA?**
Zero Trust Network Access is the replacement architecture for the corporate VPN. Both solve the same surface problem — letting someone outside the office reach something inside it — but they solve it in opposite ways.

A VPN extends the network out to the user. Once connected, the user's device is effectively *on* the corporate network, able to see and probe far more than the one application they needed. That's why a single stolen VPN credential so often becomes a full network breach: the attacker inherits the network, then moves laterally.

ZTNA inverts this. The network is never extended anywhere. Instead, after the user and device are verified, a narrow encrypted tunnel opens from that device to that one resource. The user gets their application; they get nothing else. There is no network to move laterally across, because from the user's side, no network is visible.

InstaSafe ZTNA does this at the IP layer, which matters for the applications a browser can't reach: thick-client ERP front-ends, legacy client-server systems, custom TCP/UDP protocols, engineering tools. (For browser-reachable apps, see ZTAA — the application-layer sibling.)

**The problem, concretely (3 cards)**
```
LATERAL MOVEMENT
One phished credential on a VPN = a foothold on the whole segment.
Attackers routinely pivot from an unimportant entry point to crown-jewel
systems. ZTNA removes the network between them.

VISIBLE ATTACK SURFACE
Every internet-facing IP is scanned within minutes of going live. VPN
concentrators are among the most exploited devices on the internet —
each CVE is a race against your patch window. [SOURCE NEEDED — VPN CVE stat]

SCALE AND COST
Concentrator hardware sized for peak load, licensed per box, refreshed
every few years. Remote workforce doubled? Buy more boxes. ZTNA is
software: scaling is a configuration change.
```

**How InstaSafe ZTNA works (feature depth)**
```
SERVER BLACKENING
Your gateways run a drop-all policy: any unauthorised packet is silently
discarded. Port scans return nothing. To the internet, your
infrastructure does not exist. Authorised users reach it through Single
Packet Authorization — the gateway only answers callers that have
already proven who they are.

PER-SESSION TUNNELS
Each authorised session gets its own encrypted tunnel scoped to one
resource. Two apps = two tunnels, each independently policy-checked.
Compromising one session yields exactly one session.

DEVICE BINDING
Sessions are tied to an approved device certificate. A valid password on
an unapproved laptop fails at the device gate. Administrators review and
approve devices before first use, and can revoke instantly. [→ Device
Binding page]

DEVICE POSTURE ENFORCEMENT
25 check types — OS version and patch level, antivirus presence and
state, firewall status, disk encryption, and more — evaluated against
144 named rules covering 1,500+ OS/device combinations. Posture drift
mid-session can trigger risk actions. [→ Device Posture page]

ALWAYS-ON MODE
The tunnel establishes at device boot, silently, via certificate. Users
never "forget to connect"; security teams never depend on user
behaviour. [→ Always-On page]

CONTEXT CONTROLS
Geolocation, IP-range, and time-window conditions per user group.
A contractor's access can be valid 9–6 IST from India only, and expire
with the contract. [→ Contextual Access page]

FULL AUDIT PIPELINE
202 event types logged; 11 built-in report types; export in 7 SIEM
formats. Access answers "who reached what, from which device, when, and
what did policy decide" — for every session ever.
```

**Quick scan — ZTNA specs**
```
Layer                    IP (L3/L4) — thick clients, protocols, legacy apps
Companion                ZTAA for application-layer (browser) access
Gateway model            Software gateway, drop-all + SPA
Tunnels                  Per-session, per-resource, encrypted
Device trust             Binding (certificate) + posture (25 checks/144 rules)
Auth                     Directory sync or built-in IdP; 6 MFA methods
Context policy           Geo, IP, time, risk — 21 policy combinations
Risk engine              12 triggers, 4 auto-actions
Visibility               202 event types, 7 SIEM formats, 11 reports
Client                   Windows, macOS, Linux agent; Always-On optional
```

**Three outcomes**
```
01  BREACH CONTAINMENT BY ARCHITECTURE
    Not "we detect lateral movement" — there is no lateral surface.
    One session compromised = one session lost.

02  ZERO INTERNET FOOTPRINT
    Blackened servers can't be scanned, fingerprinted, or exploited
    ahead of patch day.

03  VPN RETIREMENT WITHOUT RE-ARCHITECTURE
    Runs alongside your VPN during migration. Same apps, same AD groups,
    staged cutover, rollback intact.
```

**Hero interactive — Breach Simulator** (spec unchanged from v1; scroll-pinned SVG, VPN track vs ZTNA track, ScrollStage pattern with Autoplay + Skip controls)

**FAQs**
```
Q: What is ZTNA in simple terms?
A: A way to give people access to specific work applications without
giving them access to the network those applications live on. Verify the
person and device first; connect them to one app only.

Q: How is ZTNA different from a VPN?
A: A VPN puts your device on the corporate network. ZTNA never does —
it builds a narrow tunnel to a single application after verifying you
and your device. No network access means no lateral movement.

Q: When do I need ZTNA vs ZTAA?
A: ZTNA for anything a browser can't reach — thick clients, custom
protocols, legacy client-server apps. ZTAA for web apps, RDP, SSH, and
databases through the browser portal. Most customers run both; it's one
platform.

Q: Does ZTNA work for on-premise apps or only cloud?
A: Both. Gateways deploy in front of on-prem data centres, private
cloud, and public cloud alike; policy is identical everywhere.

Q: What happens if a user's device fails a posture check mid-session?
A: The risk engine can respond automatically — step-up MFA, restriction,
alert, or termination — depending on the policy you set.

Q: Is ZTNA suitable long term or a stopgap?
A: ZTNA is the architecture VPNs are being replaced with, and the model
NIST SP 800-207 describes. It's a strategy, not a patch.

Q: Can attackers scan our gateways?
A: Scans receive no response — drop-all plus Single Packet Authorization
means the gateway only ever answers pre-authenticated callers.
```

**Related:** ZTAA · Device Posture · Always-On · VPN Alternative · What is Zero Trust

---
---

# 3. /platform/ztaa — Zero Trust Application Access

**SEO** — Title: Zero Trust Application Access (ZTAA) | InstaSafe | Meta: One browser portal for web apps, RDP, SSH, VNC, databases, and file servers. Session recording, watermarking, clipboard control. Access without network exposure.

**Hero**
```
Eyebrow: ZERO TRUST APPLICATION ACCESS
H1: One portal. Every app. No network exposed.
Sub: Web apps, remote desktops, SSH, databases, file servers — opened from a browser, governed per session, invisible to everyone else.
CTA: Book a Demo | Try the Portal ↓
```

**Plain answer — What is ZTAA?**
Zero Trust Application Access delivers applications instead of networks. Where ZTNA opens a narrow tunnel at the network layer, ZTAA goes one step further up: the user never touches the network at all. They open a browser, sign in once, and see a portal of tiles — only the applications they've been provisioned. Click a tile and the application opens, whether it's an internal web app, a Windows remote desktop, an SSH terminal, a database console, or a file share.

Because everything is brokered at the application layer, ZTAA can govern what happens *inside* the session, not just whether it starts: recording the screen for privileged sessions, watermarking content, blocking copy-paste out of a sensitive app, controlling downloads.

For the person who has never heard any of these acronyms, the honest summary is: your team gets one bookmark that safely contains their entire toolkit, and you get a log and a control point for every minute of use.

**With ZTAA you can (5 quick claims — old-site content, sharpened)**
```
· Blacken your infrastructure — apps invisible except to provisioned users
· Grant access on a need-to-know basis, per user, per app
· Admit only approved, posture-compliant devices
· See every session: who, what, when, from where, doing what
· Scale from 50 users to 50,000 without new hardware
```

**Features grouped by job (C20 tabs — full detail)**

**TAB 1 — CONNECT ANYONE**
```
7 APP TYPES, ONE PORTAL
FQDN, WEB, RDP, SSH, VNC, DB, WFS. The engineer's SSH session, the
finance team's ERP, the auditor's read-only web view — one URL, one
login, per-user tiles.

CLIENTLESS FOR WEB APPS
Third parties and BYOD users need only a browser. No agent to install
on devices you don't own or manage. [→ Clientless Access page]

AGENT FOR THICK ACCESS
A lightweight agent handles RDP/SSH/thick sessions with silent,
certificate-based device identity.

DATABASE ACCESS
Direct, policied access to database engines: PostgreSQL, MSSQL, and SQL
Server generally available; Oracle and Elasticsearch in beta; ClickHouse
and MongoDB in alpha. DBAs connect through the portal with the same
identity, posture, and logging as every other session — no shared
credentials in a vault spreadsheet. [Beta/alpha status must be stated
wherever DB access is claimed.]
```

**TAB 2 — CONTAIN EVERY SESSION**
```
PER-APP ENCRYPTED TUNNEL   No shared segment; sessions can't see each other.
SESSION RECORDING          Full replay for privileged sessions — the audit
                           answer for "what exactly did the vendor do on
                           that server?"
CLIPBOARD CONTROL          Copy/paste out of designated apps blocked by policy.
WATERMARK OVERLAY          User identity rendered over sensitive screens;
                           leaked screenshots identify their source.
DOWNLOAD/UPLOAD POLICY     Per-app file movement rules.
INACTIVITY TIMEOUT         Idle sessions die automatically.
```
[Guardrail: do NOT claim screenshot-blocking, print-blocking, or keylogger DLP.]

**TAB 3 — PROVE EVERYTHING**
```
202 event log types — logins, failures, posture results, policy
decisions, session starts/ends, in-session actions.
11 built-in report types — access summaries, device reports, user
activity, authentication summaries.
7 SIEM export formats — feed Splunk-class tooling [CONFIRM named list].
```

**TAB 4 — DECIDE PER REQUEST**
```
21 policy combinations · 12 risk triggers · 4 auto-actions — the same
Trust Engine that governs ZTNA governs every ZTAA session. Risk rising
mid-session can force re-authentication or kill the session.
```

**Use cases (expanded)**
```
WORKFORCE ACCESS
Employees get their full toolkit in one portal, on managed or personal
devices, with MFA and posture invisible until something's wrong.

THIRD-PARTY / VENDOR ACCESS
Contractors reach exactly the systems in scope, clientless, time-boxed,
recorded. Contract ends → one deprovisioning action. [→ Third-Party
Access solution]

DEVOPS TOOLING
GitLab, Jenkins, Jira, staging servers, SSH — governed and hidden from
the internet, without changing how developers work. [→ DevOps Security]

PRIVILEGED SESSIONS
Admin RDP/SSH with recording on: the lightweight answer to the audit
finding that says "no oversight of privileged access."

BYOD
Personal devices use the clientless portal with watermark + clipboard +
download controls, so corporate data is used but never *kept* on the
device. [→ BYOD solution]
```

**Quick scan — ZTAA specs**
```
Access model         Application-layer brokering (browser portal + agent)
App types            FQDN, WEB, RDP, SSH, VNC, DB, WFS
DB engines           PostgreSQL/MSSQL/SQL Server GA · Oracle/Elasticsearch
                     beta · ClickHouse/MongoDB alpha
Session controls     Recording, watermark, clipboard, download, timeout
Identity             SSO (SAML 2.0/OAuth/OIDC), 6 MFA methods, 8 auth profiles
Device               Binding + 25 posture checks (agented); session controls
                     compensate in clientless mode
Logging              202 event types · 11 reports · 7 SIEM formats
```

**Three outcomes**
```
01  THE NETWORK STOPS BEING THE PRODUCT
    Users consume applications; the network disappears from their world
    and from the attacker's.

02  IN-SESSION GOVERNANCE
    Recording, watermarking, and clipboard policy turn "we granted
    access" into "we can prove what happened."

03  ONE DOOR TO CLOSE
    Joiner-mover-leaver becomes a single provisioning surface across all
    7 app types.
```

**Hero interactive — App Portal Simulator** (spec from v1: clickable tiles, watermark demo, blocked-clipboard console message, session timer)

**FAQs**
```
Q: What's the difference between ZTAA and ZTNA?
A: ZTAA brokers access at the application layer — browser portal, session
controls, no network path at all. ZTNA opens narrow IP-layer tunnels for
apps a browser can't deliver. One platform, both models, used together.

Q: Do users need to install anything?
A: For web apps — no, the portal is clientless. For RDP/SSH/thick apps a
lightweight agent handles device identity and the tunnel.

Q: Can we record what a vendor does on our server?
A: Yes — session recording with replay is per-app policy, typically on
for all privileged and third-party sessions.

Q: How granular can app provisioning get?
A: Per user, per group, per app, with time windows and location
conditions. A user's portal shows only their entitlements.

Q: What stops data leaving through an allowed session?
A: Clipboard control, download policy, watermarking, and recording.
(We deliberately do not claim screenshot or print blocking.)

Q: Does ZTAA support legacy virtual desktop use cases?
A: RDP and VNC through the portal cover most VDI-driven access needs at
a fraction of the operational weight. [→ VDI Alternative solution]
```

**Related:** ZTNA · Endpoint Controls · Third-Party Access · DevOps Security · Database Access

---
---

# 4. /platform/iam — Identity & Access Management

**SEO** — Title: Identity & Access Management (IAM) for Zero Trust | InstaSafe | Meta: Directory sync with AD, Azure AD, Google Workspace. Built-in IdP, 8 auth profiles, 6 MFA methods, SSO, risk-based authentication. One identity layer for everything.

**Hero**
```
Eyebrow: IDENTITY & ACCESS MANAGEMENT
H1: The right user, the right resource, the right time.
Sub: One identity layer across on-prem, cloud, and hybrid — directory sync, SSO, MFA, and risk-based decisions from a single control plane.
CTA: Book a Demo | Trace a Login ↓
```

**Stat strip** [SOURCE NEEDED ×3 — IAM set from v2 A1; verify the 80% weak-password figure before reuse]

**Plain answer — What is IAM?**
Identity and Access Management is the discipline of knowing, at all times, three things: who your users are, what each of them is allowed to touch, and whether the person at the keyboard right now is really that user. Small companies do this informally — a shared spreadsheet, a manager's memory. It stops working at exactly the moment it starts mattering: the first audit, the first departure of a privileged employee, the first phishing wave.

An IAM system makes identity a managed asset. Users live in a directory. Access is granted to roles and groups rather than individuals. Authentication is layered — something you know (password), something you have (phone, hardware key), something you are (fingerprint, face). And when someone leaves, one action removes everything.

InstaSafe's IAM is built into the access platform rather than bolted beside it — which means every identity decision immediately governs real access to real applications, not just a login page.

**Capabilities (full depth)**
```
DIRECTORY SERVICES
Sync users and groups from Active Directory, LDAP, Azure AD, Google
Workspace, or O365 — or run InstaSafe's built-in directory if you have
none. Three provider types can coexist; group structures carry into
access policy so your AD groups become your access model.

IDENTITY PROVIDER
InstaSafe acts as IdP across SAML, RADIUS, OpenID Connect, OAuth, JWT,
CAS, and TACACS+ — covering modern SaaS, network equipment, and legacy
systems from one identity source. Both IdP-initiated and SP-initiated
SAML flows are supported, and InstaSafe can equally sit behind your
existing IdP as a service provider.

MULTI-FACTOR AUTHENTICATION
Six methods: OTP (SMS/email), T-OTP, PIN, biometric (fingerprint/
facial), push notification, hardware token. Configured per user group
through 8 auth profiles — stricter factors for admins, lighter friction
for standard roles. [→ MFA page for full depth]

SINGLE SIGN-ON
One authenticated session unlocks every provisioned app tile. [→ SSO page]

RISK-BASED AUTHENTICATION
IP, geolocation, device, and time conditions modulate authentication:
a login at 3 a.m. from a new country can demand step-up MFA or be
denied outright — policy, not manual review.

ACCESS MANAGEMENT
Role-based and group-based access control; user/group creation;
self-serve password reset against Active Directory (a measurable
helpdesk-ticket reducer).

PLATFORM COVERAGE
Windows logon MFA, RDP and SSH authentication, VDI support — identity
enforcement reaches the operating system, not just the web.

REPORTING
Login activity, authentication summaries, device login reports — 11
report types, exportable, SIEM-ready.
```

**Quick scan — IAM specs**
```
Directory sync       AD, LDAP, Azure AD, Google Workspace, O365, built-in
Provider types       3 concurrent
IdP protocols        SAML 2.0, RADIUS, OIDC, OAuth, JWT, CAS, TACACS+
Auth profiles        8 · MFA methods: 6
Risk conditions      IP · geo · device · time
RBAC                 Roles, groups, per-app entitlements
OS-level auth        Windows logon, RDP, SSH, VDI
Self-service         AD password reset
```

**Three outcomes**
```
01  ONE SOURCE OF IDENTITY TRUTH
    Your directory drives everything; there is no second user list to
    drift out of date.

02  OFFBOARDING IN ONE ACTION
    Disable the user once — portal, apps, tunnels, and OS logins all
    close together.

03  AUTHENTICATION THAT MATCHES RISK
    Admins get hard factors; the marketing intern gets low friction;
    anomalies get challenged automatically.
```

**Hero interactive — Login Tracer** (spec from v1: pick method + scenario, watch six gates pass/fail, final console log entry)

**FAQs**
```
Q: We already have Azure AD. Why do we need this?
A: Keep it — InstaSafe syncs from it and enforces it everywhere Azure AD
alone can't reach: thick clients, SSH, RDP, network gear via RADIUS/
TACACS+, and OS logons, with device posture in the decision.

Q: Can InstaSafe be our only identity provider?
A: Yes. The built-in directory plus IdP protocols cover organisations
without an existing directory.

Q: What is risk-based authentication in practice?
A: Rules like "outside India → deny," "new device → step-up MFA,"
"outside 07:00–21:00 → require approval." Conditions stack per group.

Q: Does self-serve password reset really matter?
A: Password resets are consistently among the top helpdesk categories
[SOURCE NEEDED for public stat]; self-service against AD removes most
of them.

Q: How many MFA methods can one user have?
A: Multiple methods can be enrolled; the auth profile defines which are
acceptable and when step-up is demanded.
```

**Related:** SSO · MFA · Contextual Access · Behavioural Authentication

---
---

# 5. /platform/sso — Single Sign-On

**SEO** — Title: Single Sign-On (SSO) | InstaSafe | Meta: One login for every provisioned app. SAML 2.0, OAuth, OpenID Connect. Built-in MFA and device binding. $[X]/user/month [PLACEHOLDER].

**Hero**
```
Eyebrow: SINGLE SIGN-ON
H1: Log in once. Get everything you're allowed.
Sub: One set of credentials, one dashboard, every provisioned application — with MFA and device checks built into that single login.
CTA: Book a Demo | Watch the Race ↓
```

**Plain answer — What is SSO?**
Single Sign-On means one login session, honoured by many applications. Instead of a password per app — remembered, reused, written down, phished — the user authenticates once to an identity provider, which then vouches for them to each application using a cryptographic assertion (most commonly SAML).

Three things improve at once. Security: one strongly-defended login (with MFA) replaces dozens of weak ones, and password reuse stops mattering. Operations: onboarding is "add to group," offboarding is "disable user" — not a checklist of fifteen admin consoles. Experience: people stop burning minutes and helpdesk tickets on forgotten passwords.

The under-appreciated fourth improvement is visibility: when every login flows through one point, "who accessed what, when, from where" becomes a report instead of an investigation.

**Why password sprawl fails (3 pains, kept concrete)**
```
ONE REUSED PASSWORD = MANY BREACHED APPS
Users reuse; attackers know. Credential-stuffing turns one leaked
password into access attempts everywhere. [SOURCE NEEDED — reuse stat]

OFFBOARDING BY CHECKLIST
Every leaver means manual revocation across every app. One missed
console is a live account owned by someone who no longer works for you.

INVISIBLE ACCESS
Without a central login point, nobody can answer "which apps did this
user reach last quarter?" — an audit question that WILL be asked.
```

**What InstaSafe SSO includes (full)**
```
ONE DASHBOARD          Tiles for provisioned apps only; entitlement IS
                       the interface.
PROTOCOLS              SAML 2.0, OAuth, OpenID Connect; IdP- and
                       SP-initiated flows; act as IdP or federate with yours.
MFA AT THE DOOR        The single login carries the strong factors —
                       6 methods, per-group profiles.
DEVICE BINDING         Optionally require an approved device even with
                       perfect credentials.
INSTANT OFFBOARD       One disable action ends portal, apps, and sessions.
FULL TRAIL             Login time, result, device, location — logged,
                       reportable, SIEM-exportable.
INTEGRATIONS           O365, Zoho, Salesforce, GitLab, Atlassian, Zimbra,
                       ICEWrap, and any SAML/OAuth/OIDC-speaking app.
```

**Quick scan**
```
Protocols            SAML 2.0 · OAuth · OIDC (IdP + SP initiated)
IdP role             Native IdP, or SP behind your existing IdP
MFA                  Built-in, 6 methods
Device trust         Optional binding + posture at login
Pricing              $[X]/user/month [PLACEHOLDER — see v2 §A5]
```

**Three outcomes**
```
01  THE PASSWORD PROBLEM SHRINKS TO ONE
    Defend one login properly instead of fifty badly.
02  JOINER–LEAVER IN MINUTES
    Group membership is provisioning; disabling is offboarding.
03  ACCESS BECOMES AUDITABLE
    Every app login is one line in one log.
```

**Hero interactive — One-Login Race** (spec from v1: split-screen timed comparison)

**FAQs**
```
Q: What is SSO in one sentence?
A: One secure login that all your work applications trust, so users
stop juggling passwords and IT gains one control point.

Q: Isn't one login a single point of failure?
A: It's a single point of DEFENCE — one door you can afford to armour
with MFA, device binding, and risk rules, versus dozens you can't.

Q: Which apps work with it?
A: Anything speaking SAML 2.0, OAuth, or OIDC — which covers the large
majority of business SaaS — plus the named integrations above.

Q: Can InstaSafe federate with our existing IdP instead of replacing it?
A: Yes; SP mode is fully supported.

Q: What happens to app access when someone leaves?
A: Disable the user once; every SSO-brokered application stops
authenticating them immediately, and active portal sessions end.
```

**Related:** IAM · MFA · ZTAA portal · Pricing

---
---

# 6. /platform/mfa — Multi-Factor Authentication

*(Page already built with simulator — this content refreshes/extends it; retrofit only with DJ sign-off per v2 §E5.)*

**SEO** — Title: Multi-Factor Authentication (MFA) | InstaSafe | Meta: Six MFA methods including continuous facial authentication. Protect web apps, Windows/Linux/Mac logins, RDP, VPNs, and network devices via RADIUS and TACACS+.

**Hero**
```
Eyebrow: MULTI-FACTOR AUTHENTICATION
H1: A password is a guess. Prove it's really them.
Sub: Six authentication methods across web apps, desktops, servers, and network equipment — from SMS OTP to continuous facial verification.
CTA: Book a Demo | Try the Simulator ↓
```

**Plain answer — What is MFA?**
Multi-Factor Authentication asks for two or more different *kinds* of proof before letting someone in. The kinds matter: something you know (a password or PIN), something you have (your phone, a hardware key), something you are (your fingerprint, your face). A password alone fails silently — stolen credentials work perfectly for the thief. Add a second factor of a different kind, and a stolen password becomes a dead end: the attacker knows the secret but doesn't hold the phone.

MFA vs 2FA, since it's the most-asked question: 2FA is exactly two factors; MFA is two *or more*, and in practice means a system flexible about which factors, per user, per risk level. Every 2FA is MFA; not every MFA stops at two.

**The six methods (full descriptions)**
```
OTP (SMS/EMAIL)        Six-digit, time-limited code to a registered
                       channel. The universal baseline — works on any
                       phone, zero rollout friction.
T-OTP                  Time-based codes generated on-device (InstaSafe
                       Authenticator or standard TOTP apps). No network
                       dependency, immune to SIM-swap.
PIN                    Device-bound MPIN as an additional knowledge
                       factor for quick re-verification.
BIOMETRIC              Fingerprint or facial recognition via device
                       sensors — the highest-convenience strong factor.
PUSH NOTIFICATION      One-tap approve/deny on the InstaSafe
                       Authenticator app, with request context shown.
HARDWARE TOKEN         Physical security keys, including FIDO-compliant
                       keys, for the highest-assurance roles.
                       [Guardrail: supported as a factor; do NOT claim
                       end-to-end passwordless FIDO2 until confirmed.]
```

**Signature capability — Continuous Facial Authentication**
Standard MFA proves identity once, at login. Continuous facial authentication keeps proving it: the camera re-verifies liveness roughly every 30 seconds for designated high-sensitivity applications. Walk away from the screen, or let someone else step in front of it, and the session logs out automatically. For trading systems, medical records, or payment operations, it closes the oldest gap in authentication — the authenticated-then-abandoned session.

**Where MFA applies (coverage table — condensed from old site's four blocks, duplicates removed)**
```
WEB & SAAS APPS        Via SAML/OAuth/OIDC — O365, Zoho, Salesforce,
                       GitLab, Atlassian; mail clients incl. Zimbra,
                       ICEWrap, Exchange.
DESKTOP LOGIN          Windows, Linux, macOS logon MFA; RDP services.
                       Protocols: RADIUS, LDAP, Kerberos/AD, SSH.
NETWORK DEVICES        VPNs, firewalls, routers, switches via RADIUS and
                       TACACS+ — incl. Cisco AnyConnect, Juniper,
                       Palo Alto. (Yes: InstaSafe MFA can harden a VPN
                       you haven't replaced yet.)
ADFS / LDAP APPS       Directory-integrated legacy applications.
Compliance supported   PCI DSS, HIPAA, GDPR, SOX, NERC CIP.
```

**Deployment** — Authenticator platform deployable in public cloud or on-premises data centre. InstaSafe controller can act as the RADIUS or TACACS+ server itself.

**Quick scan**
```
Methods              6 (OTP, T-OTP, PIN, biometric, push, hardware token)
Continuous auth      Facial liveness re-check ~30s (designated apps)
Protocols            RADIUS, TACACS+, SAML, OAuth, OIDC, LDAP, Kerberos, SSH
Coverage             Web/SaaS, Windows/Linux/macOS logon, RDP, network gear
Profiles             8 auth profiles; per-group method policy
Pricing              $[X]/user/month [PLACEHOLDER]
```

**Three outcomes**
```
01  STOLEN PASSWORDS STOP WORKING
    The phish succeeds; the login still fails.
02  MFA EVERYWHERE, NOT JUST THE WEB
    The OS logon, the switch console, and the legacy app get the same
    protection as the SaaS suite.
03  FRICTION PROPORTIONAL TO RISK
    Push-to-approve for daily work; hardware keys and continuous facial
    for the crown jewels.
```

**FAQs (rewritten, de-duplicated from old site's set)**
```
Q: MFA vs 2FA?
A: 2FA = exactly two factors. MFA = two or more, with flexibility about
which. MFA systems let you scale factor strength to role and risk.

Q: Can MFA itself be hacked?
A: No control is absolute — SIM-swap targets SMS, fatigue attacks target
push. Layering (T-OTP or hardware keys for admins, risk-based step-up,
device binding) is exactly why MFA platforms beat single-method bolt-ons.

Q: What's the risk of not using MFA?
A: Credential theft becomes account takeover with no further obstacle —
the single most common breach path. [SOURCE NEEDED for stat]

Q: Which method should we roll out first?
A: Push or T-OTP for the workforce (low friction), hardware keys for
admins, continuous facial for the few screens that justify it.

Q: Does InstaSafe MFA require the full platform?
A: No — it runs standalone (including in front of an existing VPN) and
integrates natively when you adopt ZTNA/ZTAA.

Q: How does MFA interact with SSO?
A: Perfectly — that's the design. One strong MFA-protected login, then
SSO carries the trust to every app.
```

**Related:** SSO · IAM · Behavioural Authentication · Device Binding

---
---

# 7. /platform/secure-browser — Secure Enterprise Browser

**SEO** — Title: Secure Enterprise Browser | InstaSafe | Meta: Chromium-based browser with enterprise policy: block downloads, control clipboard, watermark screens, built-in MFA. DLP at the last inch.

**Hero**
```
Eyebrow: SECURE ENTERPRISE BROWSER
H1: The browser is where your data actually is. Govern it there.
Sub: A Chromium-based enterprise browser with policy where consumer browsers have settings — clipboard, downloads, devtools, watermarking, MFA.
CTA: Book a Demo | Try the Leak Sandbox ↓
```

**Plain answer — What is a secure enterprise browser?**
Nearly every SaaS application, and most internal ones, are used through a browser — which makes the browser the true last inch of your security perimeter. Consumer browsers are excellent products built for individuals: they happily download anything, extend themselves with any plugin, and copy anything to anywhere. Those are features for a person and liabilities for an enterprise.

A secure enterprise browser keeps the familiar Chromium experience (the same engine behind Chrome and Edge) but puts an administrator in charge of the risky parts: which users reach which applications, whether data can be copied out or downloaded, whether developer tools open, what gets watermarked. The user experience barely changes; the leak paths close.

**Why consumer browsers fall short (4 cards, from old site, tightened)**
```
BUILT FOR INDIVIDUALS      No admin, no policy, no per-user app control.
PLUGIN EXPOSURE            Extensions can read sessions and credentials;
                           one malicious update is a breach.
REDIRECTS & POPUPS         Malvertising and forced redirects reach
                           corporate sessions unfiltered.
CREDENTIAL & HISTORY RISK  A compromised profile leaks stored passwords
                           and browsing data.
```

**Key features**
```
GRANULAR APP ACCESS      Need-to-know app visibility per user/group —
                         the ZTAA portal, embedded in the browser.
DATA LEAKAGE CONTROLS    Block copy/paste and file downloads for
                         designated business-critical apps.
                         [Guardrail: no screenshot/print/keylogger claims.]
CHROME-LEVEL CONTROLS    Disable devtools and file downloads; restrict
                         printing of browser content per policy [CONFIRM
                         print-restriction wording with Product before
                         publish — sits near the screenshot guardrail].
BUILT-IN MFA             OTP/T-OTP/biometric/push at the browser itself.
WATERMARKING             Identity overlay on sensitive screens.
FULL VISIBILITY          Device parameters, location, app access, session
                         details — logged like every other InstaSafe session.
OS SUPPORT               Windows, Linux, macOS.
```

**Three outcomes**
```
01  DLP AT THE POINT OF USE
    Controls live where data is actually seen and moved — the tab.
02  BYOD WITHOUT AGENTS
    The governed browser makes unmanaged devices usable safely.
03  ZERO RETRAINING
    It's Chromium. Users already know how to use it.
```

**FAQs**
```
Q: What is the InstaSafe Secure Enterprise Browser built on?
A: Chromium — the open-source engine behind Chrome and Edge — with
enterprise policy and InstaSafe access control built in.

Q: Why not just manage Chrome with group policy?
A: GPO governs settings; it doesn't broker per-app access, enforce MFA
at the browser, watermark sessions, or log to your access audit trail.

Q: Does it replace the ZTAA portal?
A: It embeds it — the browser is the portal for organisations that want
the container and the doorway in one artifact.

Q: Which devices can run it?
A: Windows, Linux, and macOS.
```

**Related:** ZTAA · Endpoint Controls · BYOD solution

---
---

# 8. /platform/device-posture — Device Posture Check

**SEO** — Title: Device Posture Check | InstaSafe | Meta: 25 posture check types, 144 named rules, 1,500+ OS/device combinations. Only compliant devices connect — evaluated at login and continuously.

**Hero**
```
Eyebrow: DEVICE POSTURE
H1: The user checked out. Is the laptop lying?
Sub: 25 health-check types against 144 named rules — evaluated before access and re-evaluated during it.
CTA: Book a Demo | Toggle the Device Tester ↓
```

**Plain answer — What is device posture checking?**
Verifying a user answers "is this really Priya?" Posture checking answers the equally important question nobody used to ask: "is Priya's laptop in a fit state to touch our systems?" A perfectly authenticated user on a machine with no antivirus, a disabled firewall, and six months of missing patches is a breach that hasn't finished happening yet.

Posture checks read the device's actual state — OS version and patch level, antivirus presence *and freshness*, firewall status, disk encryption, and more — and compare it against rules you define per user group. Fail the rules and the connection is refused or restricted, with the reason logged. Because posture is checked continuously, a device that drifts out of compliance mid-session (antivirus disabled at 2 p.m.) can be challenged or disconnected at 2 p.m., not discovered in next quarter's audit.

**The numbers, explained**
```
25 CHECK TYPES     The vocabulary: OS version, patch level, AV presence/
                   state/definitions age, firewall, disk encryption,
                   process checks, and more. [CONFIRM full public list —
                   Product]
144 NAMED RULES    The sentences: pre-built rule definitions combining
                   checks into enforceable requirements per platform.
1,500+ COMBOS      The coverage: OS/device permutations already mapped,
                   so a mixed Windows/macOS/Linux estate is policy, not
                   a project.
```

**How it's used (worked examples)**
```
FINANCE GROUP      Windows 11 current-patch + BitLocker + AV definitions
                   <7 days old → else deny.
CONTRACTORS        Clientless portal only; posture compensated by session
                   controls (watermark, clipboard, recording).
DEVELOPERS         Linux permitted, firewall required, posture drift →
                   step-up MFA instead of hard block.
```

**Quick scan**
```
Check types          25 · Named rules: 144 · OS/device combos: 1,500+
Evaluation           At connection + continuous
On failure           Deny · restrict · step-up MFA · alert (policy-defined)
Risk integration     Posture feeds the Trust Engine's 12 triggers
Platforms            Windows, macOS, Linux
```

**Three outcomes**
```
01  COMPROMISED DEVICES STOP AT THE DOOR
    Spoofing a user is hard; spoofing a user AND a compliant certificated
    device is dramatically harder.
02  COMPLIANCE BECOMES CONTINUOUS
    Endpoint standards are enforced at every connection, not sampled
    at audit time.
03  BYOD WITH EYES OPEN
    Personal devices meet a defined bar or get contained access —
    a policy choice instead of a blind spot.
```

**Hero interactive — Device Tester** (toggle AV/firewall/patch state, watch allow↔deny flip live with the failing rule named)

**FAQs**
```
Q: Does posture checking need an agent?
A: Yes for full checks. Clientless sessions rely on session-level
controls instead — that trade-off is explicit in policy.

Q: What happens the moment a device falls out of compliance?
A: Your choice per rule: block, restrict, force re-auth, or alert.
Continuous evaluation means the response is immediate.

Q: Can different teams have different rules?
A: Per user group, per app sensitivity — 144 named rules exist to be
mixed.

Q: Is this an MDM replacement?
A: No — MDM manages devices; posture checking gates access by device
state. They compose well; posture works with or without MDM.
```

**Related:** Device Binding · Endpoint Controls · ZTNA · BYOD

---
---

# 9. /platform/device-binding — Device Authorization & Binding

**SEO** — Title: Device Binding & Authorization | InstaSafe | Meta: Approve every device before first access. Certificate-bound sessions, instant revocation, admin review workflow.

**Hero**
```
Eyebrow: DEVICE BINDING
H1: Credentials say who. Binding says from what.
Sub: Every device is reviewed, approved, and certificated before its first session — and revocable in one click after its last.
CTA: Book a Demo | See the Approval Flow ↓
```

**Plain answer — What is device binding?**
Device binding attaches identity to hardware. When a user first connects from a new laptop or phone, the device is registered and held for administrator review. Approve it, and a certificate is installed that cryptographically ties future sessions to that physical machine. From then on, the user's credentials work *from that device* — and a thief with a perfect password but the wrong laptop fails at the device gate.

It also closes quieter risks: the employee's personal desktop quietly added to the pool, the shared login used from six machines, the departed contractor's still-configured laptop. Binding turns "which devices can access us?" from an unknown into a managed list with an owner, an approval date, and a revoke button.

**How the workflow runs**
```
1. ENROL      First connection from a new device → registration captured
              (user, device identifiers, posture snapshot).
2. REVIEW     Admin approves or rejects from the console queue. Nothing
              connects while pending.
3. BIND       Approval installs the device certificate; sessions
              thereafter must present it.
4. GOVERN     Per-user device limits (e.g. single-device login),
              posture rules layered on top.
5. REVOKE     Lost, stolen, or retired → certificate revoked, access
              dead instantly, event logged.
```

**Operational note (honest guidance):** approval queues are real work at scale — plan owner and SLA for the review step, and use group-level auto-approval policies where risk allows. [This mirrors real-world ticket patterns in device-approval-heavy deployments.]

**Quick scan**
```
Trust anchor         Per-device certificate
Approval             Admin review before first access; group auto-rules
Limits               Concurrent-device caps per user (single-device
                     login enforceable)
Revocation           Instant, logged
Pairs with           Posture checks (state) — binding covers identity
                     of the machine, posture covers its health
```

**FAQs**
```
Q: Binding vs posture — what's the difference?
A: Binding = is this an APPROVED machine (identity of hardware).
Posture = is it a HEALTHY machine (state of hardware). InstaSafe
enforces both.

Q: What if an employee gets a new laptop?
A: New device enrols, admin approves, old certificate is revoked.
Minutes, fully logged.

Q: Can we auto-approve corporate-imaged devices?
A: Group-level policies can streamline approval for known-build devices
while keeping BYOD in manual review. [CONFIRM exact auto-approval
mechanics — Product]

Q: Does this stop credential sharing?
A: Largely — shared credentials fail from unbound devices, and
single-device policies prevent parallel use.
```

**Related:** Device Posture · Contextual Access · IAM

---
---

# 10. /platform/endpoint-controls — Endpoint Controls

**SEO** — Title: Endpoint Session Controls | InstaSafe | Meta: Clipboard control, watermarking, network and app filters, browser restrictions, inactivity timeout — session-layer DLP for remote access.

**Hero**
```
Eyebrow: ENDPOINT CONTROLS
H1: Access granted is not the end of the story.
Sub: What happens inside the session — copying, downloading, wandering — is policy too.
CTA: Book a Demo
```

**Plain answer — What are endpoint controls?**
Traditional security ends at the login: once in, the user's actions are their own. Endpoint controls extend policy into the live session — because most data loss isn't a hack, it's an allowed user doing an unallowed thing: pasting a customer table into personal email, downloading the price list before resigning, screensharing a console with credentials visible.

InstaSafe's endpoint controls are enforced by the agent and portal on the device itself, per application, per user group — so the sales tool can allow exporting while the HR system forbids even copy.

**The six controls (full)**
```
CLIPBOARD CONTROLS     Block copy/paste and clipboard access for
                       designated applications; block screen-capture and
                       screen-recording actions initiated through the
                       governed session context. [Wording legal-checked
                       against the screenshot-DLP guardrail — enforcement
                       scope is the InstaSafe session, not the OS at
                       large. CONFIRM final public phrasing with Product.]
WATERMARK PROTECTION   Logo/text overlay rendered over on-screen content —
                       every screen photo identifies its viewer.
NETWORK FILTER         Block specified domains/IPs per user group during
                       sessions.
APP FILTER             Block launching specified local applications
                       during sensitive sessions.
CHROME CONTROL         Restrict downloads, developer tools, and printing
                       of browser content in governed browsing.
INACTIVITY TIMEOUT     Idle or low-transfer sessions disconnect
                       automatically — the unattended-desk risk, closed.
```

**Three outcomes**
```
01  INSIDER RISK GETS GUARDRAILS
    The allowed user's unallowed action is blocked at the moment of
    attempt, and logged.
02  THIRD PARTIES LEAVE EMPTY-HANDED
    Vendors work in your systems; nothing usable leaves the session.
03  COMPLIANCE EVIDENCE BY DEFAULT
    Every enforcement event is one of the 202 logged types — the audit
    trail writes itself.
```

**FAQs**
```
Q: Do controls apply to all apps?
A: Per-app, per-group policy. Sensitivity decides strictness.

Q: Do they work on personal devices?
A: Yes — within the governed session (portal/agent/secure browser),
which is precisely the BYOD use case.

Q: Won't users find workarounds?
A: Controls raise the cost and log the attempt; combined with
watermarking and recording, casual exfiltration stops and deliberate
exfiltration leaves evidence. We're explicit about scope — no security
claim should pretend to be absolute.
```

**Related:** Secure Browser · ZTAA session controls · BYOD · Third-Party Access

---
---

# 11. /platform/always-on — Always-On Connectivity

**SEO** — Title: Always-On Secure Access | InstaSafe | Meta: Tunnel established at boot via device certificate. No user action, no forgotten connections, no unprotected gap.

*(Page already built — content refresh only with DJ sign-off.)*

**Plain answer — What is Always-On?**
Every "connect when you need it" security tool shares one flaw: the human who forgets. Always-On removes the human step. The InstaSafe agent establishes the secure tunnel the moment the device boots, authenticating silently with the device certificate and running its checks — binding, posture, geolocation — in the background. The user never sees a connect button; there is nothing to forget, and no unprotected window between boot and login.

**Why it matters / benefits**
```
NO PROTECTION GAP      Public-Wi-Fi work is inside the tunnel from
                       second one.
NO USER DEPENDENCE     Security posture stops varying with individual
                       diligence.
POLICY STILL RULES     Always-on ≠ always-allowed: every application
                       request still passes the Trust Engine.
FLEET SIMPLICITY       Remote devices stay reachable for policy without
                       hardware or manual sessions. Windows, Linux, macOS.
```

**FAQs** — retained from old site, tightened: what it is (auto-tunnel at boot) · benefits (asset protection, public-Wi-Fi safety, leak prevention) · best fit (network-layer applications) · OS support (Windows/Linux/macOS).

**Related:** ZTNA · Device Binding · Domain Joining

---
---

# 12. /platform/domain-joining — Domain Joining

**SEO** — Title: Remote Domain Joining | InstaSafe | Meta: Join remote devices to your corporate AD domain over ZTNA — push GPO, enforce compliance, no VPN and no office visit.

**Plain answer — What is domain joining, remotely?**
Domain-joined Windows devices are the ones IT can actually govern — group policy, central credentials, enforced configuration. The remote-work era broke the assumption underneath: joining a domain traditionally required being on the corporate network. Result: fleets of remote laptops running outside AD governance entirely.

InstaSafe's domain joining routes the trust the other way: the ZTNA controller brokers the connection between the remote device and your AD (on-prem or Azure AD), letting devices join and stay governed by the domain from anywhere. The AD server itself stays dark — hosted privately, reached only through the gateway, never exposed to the internet.

**Capabilities**
```
· Remote join to corporate domain via the controller — no office visit
· GPO reaches remote devices; AD/LDAP compliance extends to the whole fleet
· AD stays private — controller reaches it through the gateway only
· Works with on-prem AD and Azure AD [per old-site FAQ content]
```

**FAQs** — retained and tightened: can you join remotely (yes, controller-driven) · how (AD config in controller admin panel; controller reaches AD per authentication) · does the domain server need exposure (no — private network, gateway-only) · AD vs LDAP (LDAP is the protocol; AD is a directory server that speaks it — the Apache/HTTP analogy kept, it's genuinely good).

**Related:** IAM · Always-On · Device Posture

---
---

# 13. /platform/contextual-access — Contextual Access

**SEO** — Title: Contextual Access Control | InstaSafe | Meta: Access decisions from context — IP, geolocation, time, device, role. The same credentials mean different things at 3 a.m. from a new country.

**Plain answer — What is contextual access?**
Identity says who you are; context says whether *this particular request* makes sense. The same valid credentials should not carry the same weight at 11 a.m. from the Bengaluru office laptop and at 3 a.m. from an unrecognised device abroad. Contextual access makes that judgment automatic: every request is evaluated against where it's from, when it's happening, what device it's on, and what role is asking — and policy responds by allowing, denying, restricting, or demanding stronger proof.

**The five context dimensions**
```
IP-BASED        Allow/deny by source ranges — office egress, partner
                networks, known-bad ranges.
GEOLOCATION     Country/region conditions; the basis of geofencing
                [→ Geofencing]. Impossible-travel sequences raise risk.
TIME-BASED      Access windows per group — contractors 9–6 weekdays;
                out-of-hours admin access requires step-up.
DEVICE-BASED    Managed vs BYOD vs unknown — each class gets its own
                access depth.
ROLE-BASED      The organisational lens that binds the rest: policies
                attach to roles/groups, so context rules scale without
                per-user micromanagement.
```

**Concrete wins (from old-site benefits, sharpened)**
```
SINGLE-DEVICE LOGIN     Concurrent-session limits kill shared-credential
                        sprawl.
ANOMALY = FRICTION      Location-hopping and odd-hours patterns meet
                        step-up MFA or denial automatically.
CONTRACTOR TIME-BOXING  Access windows that expire with the engagement.
REMOTE = COMPLIANT      Company-owned, compliant devices get depth;
                        everything else gets containment.
```

**FAQs** — what it is (risk-aware conditions on every request) · vs plain RBAC (RBAC = what a role may reach; context = whether this request, now, from here, should) · user experience (invisible until anomalous, then one extra factor) · stacking (all five dimensions combine — the 21 policy combinations).

**Related:** Geofencing · Trust Engine · IAM · Device Posture

---
---

# 14. /platform/clientless-access — Clientless / Agentless Access

**SEO** — Title: Clientless Remote Access | InstaSafe | Meta: Browser-only secure access to web apps — no agent, any OS, any device. Built for third parties, BYOD, and instant scale.

**Plain answer — What is clientless access?**
Most secure-access products start with "install our software." That's fine for the laptops you own and impossible for the ones you don't: a vendor's engineer, an auditor's firm-issued machine, an employee's personal iPad. Clientless access removes the requirement — the user browses to the access portal, authenticates (with MFA), and reaches their permitted web applications directly in the browser. Any OS, any modern browser, nothing installed, nothing to manage on hardware that isn't yours.

The trade is explicit and managed: no agent means no deep posture checks, so clientless sessions lean harder on session controls — watermarking, clipboard policy, download rules, recording — to keep unmanaged devices safely contained.

**Who it's for**
```
THIRD PARTIES      Vendors and partners reach in-scope apps without
                   device negotiations. [→ Third-Party Access]
BYOD               Personal devices work without surrendering to MDM.
FIELD WORKFORCES   Browser-only access for distributed teams on varied
                   hardware.
SURGE SCALE        Hundreds of users onboarded in hours — provisioning
                   is policy, not software rollout.
```

**Features:** detailed audit logs · flexible usage across OS/browser · simplified management (nothing to update on endpoints) · single-click UX. **Scope:** HTML web applications and SaaS apps; RDP/SSH/thick access uses the lightweight agent instead.

**FAQs** — retained from old site, tightened: what it is · how it helps hybrid ecosystems (extends secure access beyond employees without agent hassles) · benefits (end-user ease + full admin visibility) · which apps (HTML web + SaaS).

**Related:** ZTAA · Secure Browser · Third-Party Access · BYOD

---
---

# 15. /platform/geofencing — Geofencing

**SEO** — Title: Geofencing Access Control | InstaSafe | Meta: Draw the map your access respects. Country, region, and radius conditions on every session — with drag-the-pin live demo.

**Plain answer — What is geofencing?**
Geofencing draws geography into access policy: define where legitimate access happens — a country, a region, a radius around a site — and requests from outside the line are denied or challenged, regardless of how good the credentials are. It's the cleanest possible enforcement of facts you already know: your payroll team works from India; your OT vendors work from two named cities; your admin consoles have no business being opened from anywhere else.

**How it composes:** geofencing is one dimension of contextual access — stack it with time windows (inside India AND business hours), device class, and role. Data-residency and sector rules (RBI/IRDAI localisation postures) gain a technical enforcement layer. [Legal wording on compliance claims via Trust Center review.]

**Hero interactive — Drag-the-Pin** (spec from blueprint: map with policy circle; pin inside = granted with console log, outside = denied with reason).

**FAQs** — accuracy and VPN-masking honesty (geo-IP is strong but not absolute; that's why it stacks with device binding and MFA rather than standing alone) · granularity (country → radius) · legitimate travel (exception flows + step-up rather than hard lockout, per policy).

**Related:** Contextual Access · Trust Engine · Compliance solution

---
---

# 16. /platform/behavioural-authentication — Behavioural Authentication

**SEO** — Title: Behavioural Authentication | InstaSafe | Meta: Impersonation detection from behaviour patterns — because a stolen credential can't steal habits.

**Plain answer — What is behavioural authentication?**
Passwords can be phished, tokens stolen, even biometrics replayed — but the *pattern* of how a person works is far harder to fake: when they log in, from where, from which devices, in what sequence. Behavioural authentication builds a baseline of each user's normal and treats deviation as signal. The genuine user logging in as always sails through; the "user" appearing at an unprecedented hour from an unseen device against their entire history meets friction — step-up authentication, restriction, or denial.

**Honest scope:** this is ML-assisted anomaly detection feeding the Trust Engine's risk score — one strong signal among several, not magic. It's also the only AI-adjacent claim InstaSafe makes, and it stays modest. [Guardrail: no "AI copilot", no autonomous-AI claims.]

**What feeds it:** login times · locations/sequences (impossible travel) · device patterns · access patterns per user history. **What it triggers:** the standard four auto-actions via risk scoring.

**Related:** Trust Engine · Contextual Access · MFA (continuous facial as the strongest companion)

---
---

# 17. /platform/trust-engine — The Trust Engine (deep-dive)

**SEO** — Title: The InstaSafe Trust Engine | Meta: 21 policy combinations, 12 risk triggers, 4 automatic responses. The decision layer behind every InstaSafe session, explained.

*(Name pending Romali/DJ — page holds regardless; rename is find-replace.)*

**Hero** — the canonical A2 block, full-bleed, with the live console component as the hero visual.

**Long-form content (this is the page where depth is the point):**

**The inputs.** Five families of signal enter every decision: identity (directory identity, group, auth strength presented), device (binding certificate, 25 posture check results), location (IP, geolocation vs policy and vs history), time (window compliance, historical pattern), and behaviour (deviation score from baseline). None is trusted alone; the decision is the intersection.

**The policy grammar — 21 combinations.** Administrators compose conditions rather than choose from presets: *finance group + managed device + India + business hours → allow with standard MFA; same group, unmanaged device → clientless portal, watermarked, no download; anyone, anywhere, posture-failed → deny and alert.* Twenty-one distinct condition combinations cover the practical policy space without becoming an unmaintainable rules swamp — enough grammar to say what you mean, few enough dimensions to audit.

**The triggers — 12 types.** Runtime conditions that move risk mid-session: repeated auth failures, impossible travel, posture drift, unusual-hours access, new-device patterns, and further anomaly classes. [CONFIRM publishable full list — Product.]

**The responses — 4 auto-actions.** Step-up authentication · session restriction · alerting · session termination. Ordered force: challenge before constraining, constrain before killing, and always record. [Guardrail: auto-suspend of user accounts is excluded — flagged non-working.]

**The record — 202 event types.** Every input read, decision made, and action taken becomes structured, exportable evidence: 202 event types, 11 report types, 7 SIEM formats. When the auditor asks *why was this allowed*, the answer is a log line, not a meeting.

**Closing frame:** Competitors describe adaptive trust; this page is InstaSafe showing the actual gears. Specific numbers are the credibility strategy — keep them exact.

**Related:** every platform page links here; this is the hub.

---
---

# 18. /platform/integrations — Integrations & Ecosystem

**SEO** — Title: Integrations | InstaSafe | Meta: Directories, identity providers, SIEM, and the app stack — where InstaSafe plugs into what you already run.

**Sections:**
```
DIRECTORIES & IdP      AD, LDAP, Azure AD, Google Workspace, O365;
                       federate via SAML/OAuth/OIDC with existing IdPs
                       (incl. Okta-class providers per old-site logo row).
APPLICATIONS           Anything speaking SAML/OAuth/OIDC + named set:
                       O365, Zoho, Salesforce, GitLab, Atlassian, Jira,
                       Jenkins, Slack, Zimbra, ICEWrap, MongoDB (as DB
                       target), Wordpress (as web target).
NETWORK & LEGACY       RADIUS and TACACS+ make InstaSafe the auth server
                       for VPNs, firewalls, switches (Cisco AnyConnect,
                       Juniper, Palo Alto noted).
SIEM & ANALYTICS       7 export formats, 202 event types. [CONFIRM named
                       SIEM tools — debt item #4.]
CLOUD PLATFORMS        Runs across Oracle Cloud, Azure, AWS, Digital
                       Ocean, IBM Cloud (per partner page).
DATABASES              GA: PostgreSQL, MSSQL, SQL Server · Beta: Oracle,
                       Elasticsearch · Alpha: ClickHouse, MongoDB.
```
Page pattern: logo grid + one-line "what the integration does" per entry; each category links to its platform page.

---

**END VOLUME 1** — Vol 2: Solutions & Use Cases · Vol 3: Industries · Vol 4: Company, Trust, Resources & Glossary
