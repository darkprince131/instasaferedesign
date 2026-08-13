/* ============================================================
   MfaBadges — two cards of outline seals.

   ▸ ONE DRAWING LANGUAGE, TWO SUBJECTS ◂
   The reference is a set of compliance seals drawn as thin outlines:
   a 100-unit box, a 1.5px accent stroke, no fills, the name set in
   mono INSIDE the frame rather than captioned under it, and a broken
   arc riding outside two of them. That last detail is what stops
   three circles reading as three buttons.

   The same language then has to carry a completely different subject
   — the directory protocols — because the two cards sit side by side
   and a seal next to a logo would read as two unrelated components.
   So ADFS, LDAP and Kerberos get seals too, and each one is
   distinguished by a MARK that says something about the protocol
   rather than by a different frame:

     ADFS      a federation arrow crossing the boundary
     LDAP      a directory tree, because that is literally what it is
     Kerberos  three heads, one gate — the ticket-granting triangle

   ▸ WHY OUTLINE AND NOT THE REAL LOGOS ◂
   GDPR, ISO 27001 and SOC 2 all have trademarked marks with usage
   rules, and SOC 2 in particular is an AICPA report type rather than
   a certification you display a badge for. A drawn outline naming
   the standard states the fact without borrowing a mark we have no
   licence to place. It is also the only way the three sit together
   at one weight — the real marks are three different colours, three
   different aspect ratios and two of them carry their own wordmark.
   ============================================================ */

const BOX = {
  viewBox: "0 0 100 100",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* The broken arc that rides outside a seal. Not decoration — it is
   what makes the frame read as a stamp rather than a plain ring, and
   it is why the reference's GDPR and SOC 2 look like seals while its
   ISO square looks like a label. */
function Arc({ from = -35, to = 120, r = 45 }: { from?: number; to?: number; r?: number }) {
  const p = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return [round(50 + r * Math.cos(a)), round(50 + r * Math.sin(a))];
  };
  const [x1, y1] = p(from);
  const [x2, y2] = p(to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return <path className="mfb-arc" d={`M${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2}`} />;
}

/* ▸ EVERY TRIGONOMETRIC RESULT IS ROUNDED ▸
   Not tidiness — correctness. These coordinates are computed during
   render, so they are computed twice: once in Node for the HTML and
   once in the browser on hydration. The two engines stringify the
   last bits of a double differently — 26.61731409782016 on the
   server against 26.617314097820163 in the browser — and React
   reports that as a hydration mismatch and refuses to patch the
   tree. Two decimals is far finer than a 100-unit box can show and
   it makes both sides produce the same string. */
const round = (n: number) => Math.round(n * 100) / 100;

/* One five-point star, drawn once and rotated into a ring. */
const STAR = "M0 -4.2 1.24 -1.3 4.0 -1.3 1.7 0.5 2.6 3.4 0 1.7 -2.6 3.4 -1.7 0.5 -4.0 -1.3 -1.24 -1.3Z";

function Gdpr() {
  return (
    <svg {...BOX} className="mfb-svg">
      <Arc from={-120} to={100} r={45} />
      <circle cx="50" cy="50" r="37" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 - 90) * (Math.PI / 180);
        const x = round(50 + 27 * Math.cos(a));
        const y = round(50 + 27 * Math.sin(a));
        return <path key={i} className="mfb-fill" d={STAR} transform={`translate(${x} ${y})`} />;
      })}
      <text className="mfb-t" x="50" y="54">
        GDPR
      </text>
    </svg>
  );
}

function Iso() {
  return (
    <svg {...BOX} className="mfb-svg">
      <rect x="17" y="17" width="66" height="66" rx="10" />
      {/* The diagonal is the reference's own device for the square seal
          — it stops a plain rounded rectangle reading as a card. It
          descends left-to-right, as the reference does, and that is
          not arbitrary: it leaves the lower-left triangle empty, which
          is exactly where the label plate goes. Run the other way and
          the plate has to knock a hole in the line. */}
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
    <svg {...BOX} className="mfb-svg">
      <Arc from={-60} to={130} r={45} />
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

/* ---------- the directory protocols, same language ---------- */

function Adfs() {
  return (
    <svg {...BOX} className="mfb-svg">
      <Arc from={-130} to={90} r={45} />
      <circle cx="50" cy="50" r="37" />
      {/* A claim crossing a trust boundary, which is all federation is.
          The boundary is the DASHED vertical and the claim is the
          arrow through it — drawn above the label rather than around
          it, because the first attempt ran the boundary line straight
          down through the word ADFS. */}
      <path className="mfb-dash" d="M50 24v34" />
      <path d="M32 41h36" />
      <path d="M62 35.5l6 5.5-6 5.5" />
      <text className="mfb-t sm" x="50" y="70">
        ADFS
      </text>
    </svg>
  );
}

function Ldap() {
  return (
    <svg {...BOX} className="mfb-svg">
      <rect x="17" y="17" width="66" height="66" rx="10" />
      {/* the tree: one root, three leaves — a directory, drawn */}
      <path d="M50 27v9M32 45v-4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v4" />
      <circle cx="50" cy="25" r="3.4" />
      <circle cx="32" cy="47" r="3.4" />
      <circle cx="50" cy="47" r="3.4" />
      <circle cx="68" cy="47" r="3.4" />
      <path d="M50 36v8" />
      <rect className="mfb-plate" x="27" y="57" width="46" height="18" rx="4" />
      <text className="mfb-t sm" x="50" y="70">
        LDAP
      </text>
    </svg>
  );
}

function Kerberos() {
  return (
    <svg {...BOX} className="mfb-svg">
      <Arc from={-50} to={140} r={45} />
      <circle cx="50" cy="50" r="37" />
      {/* client, service and the ticket granter — the three-headed
          arrangement the protocol is named after */}
      <circle cx="50" cy="34" r="5" />
      <circle cx="36" cy="56" r="5" />
      <circle cx="64" cy="56" r="5" />
      <path d="M46.6 38.2 39.4 51.8M53.4 38.2 60.6 51.8M41 56h18" />
      {/* MEASURED: at the `sm` size this word is 51 units wide, and the
          circle only allows 40 at the baseline it wanted. The longest
          label in the set gets its own size rather than the ring
          getting bigger — the six seals have to stay one family. */}
      <text className="mfb-t xs" x="50" y="74">
        KERBEROS
      </text>
    </svg>
  );
}

type Seal = { id: string; Art: () => React.JSX.Element; label: string; note: string };

const DIRECTORY: Seal[] = [
  { id: "adfs", Art: Adfs, label: "ADFS", note: "Federate to the trust you already run" },
  { id: "ldap", Art: Ldap, label: "LDAP", note: "Groups read from the directory of record" },
  { id: "kerberos", Art: Kerberos, label: "Kerberos", note: "Desktop SSO carries into the portal" },
];

const COMPLIANCE: Seal[] = [
  { id: "gdpr", Art: Gdpr, label: "GDPR", note: "Data-protection obligations supported" },
  { id: "iso", Art: Iso, label: "ISO 27001", note: "Information security management" },
  { id: "soc2", Art: Soc2, label: "SOC 2", note: "AICPA trust services criteria" },
];

function Card({ eyebrow, title, body, seals }: { eyebrow: string; title: string; body: string; seals: Seal[] }) {
  return (
    <article className="mfb-card">
      <div className="mfb-head">
        <span className="mfb-ey">{eyebrow}</span>
        <h3 className="mfb-h">{title}</h3>
        <p className="mfb-b">{body}</p>
      </div>
      <ul className="mfb-list">
        {seals.map((s) => (
          <li className="mfb-item" key={s.id}>
            <span className="mfb-seal" aria-hidden="true">
              <s.Art />
            </span>
            <span className="mfb-txt">
              <b>{s.label}</b>
              <em>{s.note}</em>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function MfaBadges() {
  return (
    <div className="mfb">
      <Card
        eyebrow="ADFS / LDAP apps"
        title="The apps that authenticate against your directory."
        body="Not everything speaks SAML. Applications wired straight into Active Directory or an LDAP server get the second factor at the directory, without being modified to understand what a factor is."
        seals={DIRECTORY}
      />
      <Card
        eyebrow="Compliance supported"
        title="The frameworks this evidence is asked for by."
        body="MFA on every surface, with a login record per attempt, is what these three ask for in different words. The trail exports in the format your auditor already reads."
        seals={COMPLIANCE}
      />
    </div>
  );
}
