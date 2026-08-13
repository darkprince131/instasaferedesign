/* ============================================================
   MfaBadges — two hover-lift decks (00r's mechanism, new cargo).

   ▸ WHY THESE ARE DECKS NOW ◂
   They were two flat lists of seals. A list says "here are three
   things"; a DECK says "here are three things and there are more
   underneath", which is the truer statement in both cases — three
   directory protocols standing in front of an estate of applications,
   and three frameworks standing in front of a compliance programme.
   The 00r isometric stack already carries exactly that meaning on the
   SSO page, so it is reused rather than reinvented: same tilted
   plane, same lift on hover, same transform-only motion.

   ▸ THE ORDER IS ILLUSTRATION THEN TEXT ◂
   Deck on top, words underneath, in both cards — the order 00r uses.
   A reader meets the picture, forms a question, and the copy answers
   it. Reversed, the copy answers a question nobody has asked yet.

   ▸ WHAT IS PRINTED ON THE SCREENS ◂
   Left card: real applications, because the claim is about YOUR
   estate. ADFS carries the Microsoft stack it federates, LDAP carries
   the things that read groups from a directory of record, Kerberos
   carries what a domain login already opens. Naming them is the
   difference between "we support LDAP" and "the app you are thinking
   of is on this card".

   Right card: the outline seals. Drawn rather than the real marks —
   GDPR, ISO 27001 and SOC 2 are all trademarked with usage rules, SOC
   2 is an AICPA report type rather than a badge you display, and the
   three real marks are three colours and two aspect ratios that would
   never sit together at one weight.
   ============================================================ */

const SEAL = {
  viewBox: "0 0 100 100",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* Every trigonometric result below is rounded. These coordinates are
   computed during render, so they are computed twice — once in Node
   for the HTML and once in the browser on hydration — and the two
   engines stringify the last bits of a double differently. Left raw,
   React reports a hydration mismatch and refuses to patch the tree. */
const round = (n: number) => Math.round(n * 100) / 100;

/* The broken arc that rides outside a seal. It is what makes a frame
   read as a stamp rather than a plain ring. */
function Arc({ from, to, r = 45 }: { from: number; to: number; r?: number }) {
  const p = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return [round(50 + r * Math.cos(a)), round(50 + r * Math.sin(a))];
  };
  const [x1, y1] = p(from);
  const [x2, y2] = p(to);
  return <path className="mfb-arc" d={`M${x1} ${y1} A${r} ${r} 0 ${Math.abs(to - from) > 180 ? 1 : 0} 1 ${x2} ${y2}`} />;
}

const STAR = "M0 -4.2 1.24 -1.3 4.0 -1.3 1.7 0.5 2.6 3.4 0 1.7 -2.6 3.4 -1.7 0.5 -4.0 -1.3 -1.24 -1.3Z";

function Gdpr() {
  return (
    <svg {...SEAL} className="mfb-svg">
      <Arc from={-120} to={100} />
      <circle cx="50" cy="50" r="37" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 - 90) * (Math.PI / 180);
        return (
          <path
            key={i}
            className="mfb-fill"
            d={STAR}
            transform={`translate(${round(50 + 27 * Math.cos(a))} ${round(50 + 27 * Math.sin(a))})`}
          />
        );
      })}
      <text className="mfb-t" x="50" y="55">
        GDPR
      </text>
    </svg>
  );
}

function Iso() {
  return (
    <svg {...SEAL} className="mfb-svg">
      <rect x="17" y="17" width="66" height="66" rx="10" />
      {/* the diagonal descends left-to-right so the lower-left triangle
          stays empty — which is exactly where the label plate goes */}
      <path d="M23 23 77 77" />
      <rect className="mfb-plate" x="21" y="53" width="46" height="26" rx="4" />
      <text className="mfb-t sm" x="44" y="63">
        ISO
      </text>
      <text className="mfb-t sm" x="44" y="75">
        27001
      </text>
    </svg>
  );
}

function Soc2() {
  return (
    <svg {...SEAL} className="mfb-svg">
      <Arc from={-60} to={130} />
      <circle cx="50" cy="50" r="37" />
      <path d="M14 50h72" />
      <text className="mfb-t sm" x="50" y="42">
        AICPA
      </text>
      <text className="mfb-t sm" x="50" y="68">
        SOC 2
      </text>
    </svg>
  );
}

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- what goes on each screen ---------- */

type App = { name: string; logo: string };
type AppScreen = { proto: string; note: string; apps: App[] };
type SealScreen = { name: string; note: string; Art: () => React.JSX.Element };

/* front → back. The front screen is the one a reader looks at, so the
   protocol most estates actually run goes there. */
const PROTOCOLS: AppScreen[] = [
  {
    proto: "ADFS",
    note: "Federate to the trust you already run",
    apps: [
      { name: "Microsoft 365", logo: "microsoft-365.svg" },
      { name: "Teams", logo: "microsoft-teams.svg" },
      { name: "Azure", logo: "azure.svg" },
    ],
  },
  {
    proto: "LDAP",
    note: "Groups read from the directory of record",
    apps: [
      { name: "OpenLDAP", logo: "openldap.webp" },
      { name: "Oracle", logo: "oracle.svg" },
      { name: "VMware", logo: "vmware.svg" },
    ],
  },
  {
    proto: "Kerberos",
    note: "Desktop SSO carries into the portal",
    apps: [
      { name: "Active Directory", logo: "active-directory.svg" },
      { name: "SAP", logo: "sap.svg" },
      { name: "ServiceNow", logo: "servicenow.svg" },
    ],
  },
];

const FRAMEWORKS: SealScreen[] = [
  { name: "GDPR", note: "Data-protection obligations", Art: Gdpr },
  { name: "ISO 27001", note: "Information security management", Art: Iso },
  { name: "SOC 2", note: "AICPA trust services criteria", Art: Soc2 },
];

/* ---------- the deck ---------- */

function screenStyle(depth: number, count: number) {
  const lift = count - 1 - depth; // front sits highest in the iso stack
  return { ["--d" as string]: depth, ["--lift" as string]: lift } as React.CSSProperties;
}

function Card({
  eyebrow,
  title,
  body,
  href,
  deck,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  href: string;
  deck: React.ReactNode;
}) {
  return (
    <article className="mfb-card">
      <div className="mfb-stage" aria-hidden="true">
        <div className="mfb-stack">{deck}</div>
      </div>
      <div className="mfb-foot">
        <span className="mfb-ey">{eyebrow}</span>
        <h3 className="mfb-h">{title}</h3>
        <p className="mfb-b">{body}</p>
        <a className="mfb-learn" href={href}>
          Learn more {Arrow}
        </a>
      </div>
    </article>
  );
}

export function MfaBadges() {
  return (
    <div className="mfb">
      <Card
        eyebrow="ADFS / LDAP apps"
        title={
          <>
            The apps that authenticate <em>against your directory</em>.
          </>
        }
        body="Not everything speaks SAML. Applications wired straight into Active Directory or an LDAP server get the second factor at the directory — without being modified to understand what a factor is."
        href="/platform/iam"
        /* rendered back → front so the front screen paints last and
           takes the highest z, exactly as 00r does */
        deck={[...PROTOCOLS].reverse().map((s, ri) => {
          const depth = PROTOCOLS.length - 1 - ri;
          return (
            <div
              className={`mfb-screen${depth === 0 ? " front" : ""}`}
              key={s.proto}
              style={screenStyle(depth, PROTOCOLS.length)}
            >
              <div className="mfb-screen-h">
                <span className="mfb-proto">{s.proto}</span>
                <span className="mfb-count">{s.apps.length} apps</span>
              </div>
              <div className="mfb-apps">
                {s.apps.map((a) => (
                  <span className="mfb-app" key={a.name}>
                    <i>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/logos/integrations/${a.logo}`} alt="" loading="lazy" decoding="async" />
                    </i>
                    <b>{a.name}</b>
                  </span>
                ))}
              </div>
              <span className="mfb-screen-f">{s.note}</span>
            </div>
          );
        })}
      />

      <Card
        eyebrow="Compliance supported"
        title={
          <>
            The frameworks this evidence is <em>asked for by</em>.
          </>
        }
        body="MFA on every surface, with a login record per attempt, is what these three ask for in different words. The trail exports in the format your auditor already reads."
        href="/security"
        deck={[...FRAMEWORKS].reverse().map((s, ri) => {
          const depth = FRAMEWORKS.length - 1 - ri;
          return (
            <div
              className={`mfb-screen is-seal${depth === 0 ? " front" : ""}`}
              key={s.name}
              style={screenStyle(depth, FRAMEWORKS.length)}
            >
              <span className="mfb-sealart">
                <s.Art />
              </span>
              <span className="mfb-sealtxt">
                <b>{s.name}</b>
                <em>{s.note}</em>
              </span>
            </div>
          );
        })}
      />
    </div>
  );
}
