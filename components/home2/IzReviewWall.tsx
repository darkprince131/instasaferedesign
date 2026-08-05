"use client";

/* ============================================================
   IzReviewWall — the G2 review wall.

   Three columns drifting in alternating directions behind a G2
   score badge that sits over the middle of them. The alternation
   is what stops three columns reading as one block sliding; the
   speed offsets stop them re-aligning into rows a moment later.
   Same seam rule as the customer strip and the integration wall:
   each column holds two identical copies and travels exactly
   -50%, so the loop point never shows.

   The badge is the point of the section, so the wall behind it is
   dimmed and the badge is the only thing at full contrast — a
   quiet version of the "one focal element" rule. Hover lifts it
   and the whole wall pauses, so a quote can actually be read.

   CONTENT RULES (from the review source):
     · the answer only — never the G2 question that prompted it
     · person and designation only — no company names
     · a real photo where we have one, initials where we don't
   ============================================================ */

const G2_HREF = "https://www.g2.com/products/instasafe-technologies-pvt-ltd-instasafe-ztaa/reviews";

export type Review = {
  name: string;
  /** designation only — never an employer */
  role?: string;
  quote: string;
  /** file in /public/reviewers, without extension; null → initials */
  photo: string | null;
};

const REVIEWS: Review[] = [
  {
    name: "Vishal M.",
    role: "Deputy Manager, Operations",
    photo: "vishal-m",
    quote:
      "It enables secure remote and hybrid work, which is a big plus. It is easy to use and manage, provides strong security without complexity, and doesn't require heavy hardware. The initial setup was straightforward and it's easier than old VPN setups.",
  },
  {
    name: "Nagaraj A.",
    photo: null,
    quote:
      "Its Zero Trust Network Access capabilities help organizations improve their security posture by providing secure access to applications and resources based on identity and context. It reduces the attack surface and protects sensitive data from unauthorized access. Superior dedicated customer support, and ease of integration across products.",
  },
  {
    name: "Debraj N.",
    photo: null,
    quote:
      "Make in India is the best part of it. Ease of use. Implementation is fabulous. Customer support is good. Integration among other solutions is superb.",
  },
  {
    name: "Mahesh S.",
    photo: null,
    quote:
      "The best thing I like about InstaSafe is the transparency of the team and how they work with our organization. They are easy to approach, willing to go the extra mile, and the solution is easy to use and implement, making it easy to adopt.",
  },
  {
    name: "Satyajeet M.",
    photo: null,
    quote: "Its agent-based ZTAA improves performance in terms of data access and reduces latency.",
  },
  {
    name: "Rajaram C.",
    role: "Helping customers achieve digital transformation",
    photo: "rajaram-c",
    quote:
      "It's a good Zero Trust solution that provides a comprehensive overview of an organization's security posture and simplifies the adoption of a Zero Trust approach.",
  },
  {
    name: "Ranjith P.",
    role: "Head of IT Security",
    photo: "ranjith-p",
    quote:
      "InstaSafe simply stands out in its adaptability to expanding cloud environments. We have secure mobility we previously didn't possess.",
  },
  {
    name: "Hariharan S.",
    role: "Infrastructure Lead",
    photo: "hariharan-s",
    quote: "We scaled remote access security from 500 to 65,000 users in five days, with no hardware to rack.",
  },
  {
    name: "Rishu P.",
    role: "CISO",
    photo: "rishu-p",
    quote: "On-premise deployment was the deciding factor — our data never leaves the private network.",
  },
  {
    name: "Vaibhav S.",
    role: "Assistant Consultant",
    photo: "vaibhav-s",
    quote:
      "InstaSafe simply stands out in terms of its dynamicity and adaptability to expanding cloud environments. I would recommend InstaSafe for any company in the retail sector.",
  },
  {
    name: "Sadanand H.",
    role: "VP, IT Infrastructure & Governance",
    photo: "sadanandh",
    quote: "Best VPN solution — very quick setup, and a great support team.",
  },
  {
    name: "Jalindra C.",
    photo: null,
    quote:
      "InstaSafe's Zero Trust Application Access is one of the best security solutions we've evaluated. It's highly relevant for organizations concerned about secure application access and availability.",
  },
  {
    name: "Himanshu S.",
    role: "Cloud Technical Sales Specialist",
    photo: "himanshu-s",
    quote:
      "InstaSafe is very easy to implement, and their support team is always available to help. Their pre-sales and post-sales support are excellent, and we are very happy with the solution.",
  },
  {
    name: "Satish S.",
    role: "Software Engineer",
    photo: null,
    quote:
      "The solution is easy to use and implement, giving us better control over users and improved visibility into user activity. We have not encountered any issues so far.",
  },
  {
    name: "Neha S.",
    role: "Human Resources Specialist",
    photo: null,
    quote:
      "InstaSafe's Zero Trust solution is trustworthy, scalable, and cost-effective. It addresses modern cybersecurity requirements with an approach that's easy to recommend.",
  },
  {
    name: "Japneet S.",
    photo: null,
    quote:
      "We evaluated several solutions to replace our legacy VPN and found InstaSafe to be a strong alternative. It simplifies secure remote access while reducing IT complexity with advanced Zero Trust capabilities.",
  },
  {
    name: "Deepak P.",
    role: "AVP, IT",
    photo: null,
    quote:
      "InstaSafe provides reliable technical support and an effective security solution that's easy to use. The team has been particularly helpful in resolving infrastructure-related challenges.",
  },
];

const COLUMNS = 5;

/* Faces first, and in the middle.
   A round-robin deal scattered the seven photographed reviewers across
   all five columns, which put some of them in the outer two — the
   columns the edge mask fades and a narrow window drops entirely. So
   the deal is deliberate instead: every photo goes to the middle three
   columns, where they are visible immediately and survive every
   breakpoint, and the text-only reviews fill the outer two and top up
   the middle. Long and short quotes still alternate within a column so
   no single column becomes a wall of text. */
function deal(reviews: Review[]): Review[][] {
  const faces = reviews.filter((r) => r.photo);
  const rest = reviews.filter((r) => !r.photo);
  const cols: Review[][] = Array.from({ length: COLUMNS }, () => []);
  const MIDDLE = [1, 2, 3];
  const OUTER = [0, 4];

  faces.forEach((r, i) => cols[MIDDLE[i % MIDDLE.length]].push(r));

  /* The text-only reviews are NOT dealt round-robin. Round-robin left
     the two outer columns holding two cards each, and two cards is
     shorter than the column is tall — so one copy of the track didn't
     reach the bottom and the loop showed a gap. The outer columns get
     the bigger share instead, which also evens out the heights since
     they start with no faces at all. */
  const REST_QUOTA: [number, number][] = [
    [0, 3], [4, 3], [2, 2], [1, 1], [3, 1],
  ];
  let k = 0;
  for (const [col, n] of REST_QUOTA) {
    for (let j = 0; j < n && k < rest.length; j++, k++) cols[col].push(rest[k]);
  }
  /* anything left over (if the review count changes) tops up the
     shortest column, so this can never silently drop a review */
  while (k < rest.length) {
    const shortest = cols.reduce((a, b) => (a.length <= b.length ? a : b));
    shortest.push(rest[k++]);
  }
  return cols;
}

const DEALT: Review[][] = deal(REVIEWS);

/* px/sec per column — no two equal and no two multiples of each other,
   so the five never drift back into alignment */
const SPEEDS = [13, 17, 11, 19, 15];

/* Score and count come from the same source as 00ab RatingBar, so the
   two can never quote different numbers on the same site. */
const G2_SCORE = 4.5;
const G2_COUNT = "94";

const STAR =
  "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z";

function initials(name: string) {
  const parts = name.replace(/\./g, "").split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
}

function Card({ r, clone }: { r: Review; clone?: boolean }) {
  return (
    <figure className={clone ? "izrw-card izrw-clone" : "izrw-card"} aria-hidden={clone || undefined}>
      <blockquote className="izrw-quote">{r.quote}</blockquote>
      <figcaption className="izrw-by">
        <span className={r.photo ? "izrw-face" : "izrw-face izrw-face-mono"}>
          {r.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/reviewers/${r.photo}.webp`} alt="" loading="lazy" decoding="async" />
          ) : (
            <span aria-hidden="true">{initials(r.name)}</span>
          )}
        </span>
        <span className="izrw-who">
          <span className="izrw-name">{r.name}</span>
          {r.role && <span className="izrw-role">{r.role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export function IzReviewWall() {
  const full = Math.floor(G2_SCORE);
  const half = G2_SCORE - full >= 0.25 && G2_SCORE - full < 0.75;

  return (
    <div className="izrw">
      <div className="izrw-wall" aria-label="Reviews from G2">
        {DEALT.map((col, c) => (
          <div
            className={c % 2 === 1 ? "izrw-col izrw-col-up" : "izrw-col"}
            data-col={c}
            key={c}
            style={{ ["--izrw-speed" as string]: `${SPEEDS[c]}`, ["--izrw-count" as string]: `${col.length}` }}
          >
            <div className="izrw-track">
              {col.map((r) => (
                <Card r={r} key={r.name} />
              ))}
              {col.map((r) => (
                <Card r={r} key={`c-${r.name}`} clone />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* the badge sits over the middle of the wall */}
      <a className="izrw-badge" href={G2_HREF} target="_blank" rel="noopener noreferrer">
        <span className="izrw-score">{G2_SCORE}</span>
        <span className="izrw-badge-mid">
          <span className="izrw-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" className={i < full ? "on" : i === full && half ? "half" : ""}>
                <path d={STAR} className="izrw-s-bg" />
                <path d={STAR} className="izrw-s-fg" />
              </svg>
            ))}
          </span>
          <span className="izrw-count">Based on {G2_COUNT} G2 reviews</span>
        </span>
        <span className="izrw-g2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/g2.svg" alt="G2" />
        </span>
      </a>
    </div>
  );
}
