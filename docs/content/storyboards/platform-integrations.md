# Storyboard — platform-integrations

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/integrations  —  Integrations & Ecosystem
Archetype: A2 PLATFORM LIGHT   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Sections | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | dense / grid off | see Component Roles
2.0 |  |  |  | DIRECTORIES & IdP      AD, LDAP, Azure AD, Google Workspace, O365; federate via SAML/OAuth/OIDC with existing IdPs (incl. Okta-class providers per old-site logo row).
2.0 |  |  | APPLICATIONS | Anything speaking SAML/OAuth/OIDC + named set: O365, Zoho, Salesforce, GitLab, Atlassian, Jira, Jenkins, Slack, Zimbra, ICEWrap, MongoDB (as DB target), Wordpress (as web target).
2.0 |  |  | NETWORK & LEGACY | RADIUS and TACACS+ make InstaSafe the auth server for VPNs, firewalls, switches (Cisco AnyConnect, Juniper, Palo Alto noted).
2.0 |  |  | SIEM & ANALYTICS | 7 export formats, 202 event types. [CONFIRM named SIEM tools — debt item #4.]
2.0 |  |  | CLOUD PLATFORMS | Runs across Oracle Cloud, Azure, AWS, Digital Ocean, IBM Cloud (per partner page).
2.0 |  |  | DATABASES | GA: PostgreSQL, MSSQL, SQL Server · Beta: Oracle, Elasticsearch · Alpha: ClickHouse, MongoDB. ``` Page pattern: logo grid + one-line "what the integration does" per entry; each category links to its platform page. --- **END VOLUME 1** — Vol 2: Solutions & Use Cases · Vol 3: Industries · Vol 4: Company, Trust, Resources & Glossary
3.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
4.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
