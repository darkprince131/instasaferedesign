/* ============================================================
   newsroom.ts — the press corpus behind /instasafe-newsroom.

   Source: the link list supplied on 11 Aug 2026 (Resources Links.xlsx,
   "Newsroom" rows). That sheet carried URLs only — no headlines, no
   dates — so every `headline` here is reconstructed from the article's
   own URL slug and normalised for capitalisation. The slug IS the
   published headline in every CMS in this list, so the wording is the
   publication's, not ours. Two consequences worth knowing:

     · Where a slug is a bare numeric id (Financial Express, Forbes
       India, The Print, Outlook, ETelets, The Tech Panda) the headline
       comes from the descriptive segment earlier in the path instead.
     · There are NO dates. The sheet had none and the URLs do not carry
       them reliably, so the cards do not show a date rather than show
       an invented one. If dates are wanted, add `date` here — the card
       already leaves room for it in the book foot.

   One duplicate was dropped: the CRN "InstaSafe partners with Syscom
   Distributions" link appeared twice in the sheet. 35 rows → 34 items.
   Two Quint URLs also lost a trailing `#read-more` fragment, which is
   a scroll target on their page and not part of the address.

   `kind` drives the book's kicker line and the filter chips. It is a
   judgement about the article's shape, not a claim about its content:
   "Byline" = written by an InstaSafe person, "Interview" = an InstaSafe
   person answering questions, "Comment" = InstaSafe quoted inside
   someone else's story, "Announcement" = company news, "Recognition" =
   an award or ranking.
   ============================================================ */

export type PressKind =
  | "Byline"
  | "Interview"
  | "Comment"
  | "Announcement"
  | "Recognition";

export type PressItem = {
  /** Stable slug. Also the React key and the cover-art seed. */
  id: string;
  /** Publication name as it prints it, not as the domain spells it. */
  publication: string;
  /** Bare host, for the book foot. */
  host: string;
  headline: string;
  kind: PressKind;
  url: string;
};

export const PRESS: PressItem[] = [
  {
    id: "fastmode-ztna-crucial-role",
    publication: "The Fast Mode",
    host: "thefastmode.com",
    headline: "ZTNA's Crucial Role in Modern Enterprise Security",
    kind: "Byline",
    url: "https://www.thefastmode.com/technology-solutions/33970-ztnas-crucial-role-in-modern-enterprise-security",
  },
  {
    id: "enterpriseitworld-zero-trust-survey",
    publication: "Enterprise IT World",
    host: "enterpriseitworld.com",
    headline: "Survey: The Zero Trust Story",
    kind: "Comment",
    url: "https://www.enterpriseitworld.com/wp-content/uploads/2017/11/Survey-Zero-Trust-Story.pdf",
  },
  {
    id: "news18-digital-india-act",
    publication: "News18",
    host: "news18.com",
    headline:
      "Digital India Act: Experts Explain Why It Matters",
    kind: "Comment",
    url: "https://www.news18.com/india/digital-india-act-mos-chandrasekhar-presents-details-experts-explain-why-it-matters-7264147.html",
  },
  {
    id: "news18-bharos-data-privacy-day",
    publication: "News18",
    host: "news18.com",
    headline:
      "Data Privacy Day: How Safe Is BharOS? Cybersecurity Experts Weigh In",
    kind: "Comment",
    url: "https://www.news18.com/news/tech/data-privacy-day-how-safe-is-bharos-what-do-cybersecurity-experts-say-you-are-about-to-find-out-6932521.html",
  },
  {
    id: "analyticsindiamag-cybersecurity-barriers",
    publication: "Analytics India Magazine",
    host: "analyticsindiamag.com",
    headline: "Building Cybersecurity Barriers for Enterprises With Zero Trust",
    kind: "Interview",
    url: "https://analyticsindiamag.com/building-cybersecurity-barriers-for-enterprises-with-zero-trust/",
  },
  {
    id: "smeoncloud-time-to-adopt-zero-trust",
    publication: "SME on Cloud",
    host: "smeoncloud.in",
    headline: "Why Now Is the Time to Adopt a Zero Trust Approach to Security",
    kind: "Byline",
    url: "https://smeoncloud.in/why-is-now-the-time-to-adopt-a-zero-trust-approach-to-security/",
  },
  {
    id: "smestreet-znet-partnership",
    publication: "SMEStreet",
    host: "smestreet.in",
    headline:
      "InstaSafe Partners With Cloud Services Distributor ZNet Technologies",
    kind: "Announcement",
    url: "https://smestreet.in/technology/cloud/instasafe-technologies-partners-with-cloud-services-distributor-znet-technologies/",
  },
  {
    id: "dqindia-ztna-best-practices",
    publication: "Dataquest India",
    host: "dqindia.com",
    headline: "Zero Trust Network Access: Five Best Practices to Follow",
    kind: "Byline",
    url: "https://www.dqindia.com/zero-trust-network-access-five-best-practices-to-follow/",
  },
  {
    id: "cxotoday-zero-trust-shields-assets",
    publication: "CXOToday",
    host: "cxotoday.com",
    headline:
      "InstaSafe's Zero Trust Solutions Shield Enterprise Assets From Internal and External Threats",
    kind: "Interview",
    url: "https://www.cxotoday.com/interviews/instasafes-zero-trust-solutions-shield-the-enterprise-assets-from-internal-or-external-cyber-threats/",
  },
  {
    id: "financialexpress-zero-trust-misconceptions",
    publication: "The Financial Express",
    host: "financialexpress.com",
    headline: "Cybersecurity: Misconceptions Galore About Zero Trust",
    kind: "Comment",
    url: "https://www.financialexpress.com/industry/technology/cybersecurity-misconceptions-galore-about-zero-trust/2590651/",
  },
  {
    id: "eletsonline-sdp-based-zero-trust",
    publication: "Elets CIO",
    host: "cio.eletsonline.com",
    headline:
      "What Sets InstaSafe Apart Is a Zero Trust Concept Built on Software-Defined Perimeter",
    kind: "Interview",
    url: "https://cio.eletsonline.com/interviews/what-sets-instasafe-technologies-apart-is-that-its-concept-of-zero-trust-is-based-on-the-software-defined-architecture-sdp/69434/",
  },
  {
    id: "financialexpress-zero-trust-name-of-game",
    publication: "The Financial Express",
    host: "financialexpress.com",
    headline: "Cybersecurity: Zero Trust, the Name of the Game",
    kind: "Comment",
    url: "https://www.financialexpress.com/industry/cybersecurity-zero-trust-the-name-of-game/2545668/",
  },
  {
    id: "toi-ai-cybersecurity-automation",
    publication: "The Times of India",
    host: "timesofindia.indiatimes.com",
    headline:
      "How AI Is Altering the Cybersecurity Automation Landscape — and Cybersecurity Jobs",
    kind: "Byline",
    url: "https://timesofindia.indiatimes.com/blogs/voices/how-ai-is-altering-the-cybersecurity-automation-landscape-and-its-effect-in-depleting-cybersecurity-jobs/",
  },
  {
    id: "crn-syscom-emea",
    publication: "CRN India",
    host: "crn.in",
    headline:
      "InstaSafe Partners With Syscom Distributions, Takes Its Product Base Into EMEA",
    kind: "Announcement",
    url: "https://www.crn.in/news/instasafe-partners-with-syscom-distributions-llc-forays-its-product-base-in-the-emea-market/",
  },
  {
    id: "indiatechnologynews-ivalue",
    publication: "India Technology News",
    host: "indiatechnologynews.in",
    headline:
      "InstaSafe Forays Into the Global Market With iValue Infosolutions",
    kind: "Announcement",
    url: "https://indiatechnologynews.in/instasafe-technologies-forays-into-global-market-with-its-collaboration-with-ivalue-infosolutions/",
  },
  {
    id: "theprint-dsci-security-product-of-the-year",
    publication: "ThePrint",
    host: "theprint.in",
    headline:
      "InstaSafe Awarded Security Product Company of the Year by DSCI",
    kind: "Recognition",
    url: "https://theprint.in/ani-press-releases/cloud-based-security-service-provider-instasafe-awarded-as-security-product-company-of-the-year-by-dsci-11th-edition/786640/",
  },
  {
    id: "techcircle-security-talent-crunch",
    publication: "TechCircle",
    host: "techcircle.in",
    headline:
      "Security Talent Crunch Fuels Concern of a Bumpy Ride for Companies",
    kind: "Comment",
    url: "https://www.techcircle.in/2022/01/12/security-talent-crunch-fuels-concern-of-a-bumpy-ride-for-cos-in-2022",
  },
  {
    id: "firstpost-union-budget-data-protection",
    publication: "Firstpost",
    host: "firstpost.com",
    headline:
      "Budget: Accelerate the Data Protection Act to Build Trust in Digital Payments",
    kind: "Comment",
    url: "https://www.firstpost.com/business/union-budget-2022-budget-2022-finance-minister-must-accelerate-passing-of-data-protection-act-to-foster-trust-in-digital-payments-10321801.html",
  },
  {
    id: "techiexpert-smart-city-security",
    publication: "Techiexpert",
    host: "techiexpert.com",
    headline:
      "Security for Smart Cities: Why Innovation Should Start and End With It",
    kind: "Byline",
    url: "https://www.techiexpert.com/security-for-smart-cities-why-it-start-and-end-their-innovations-with-security/",
  },
  {
    id: "outlookindia-middle-east-europe-expansion",
    publication: "Outlook India",
    host: "outlookindia.com",
    headline:
      "InstaSafe Eyes Expansion in the Middle East and Europe",
    kind: "Announcement",
    url: "https://www.outlookindia.com/newsscroll/amp/instasafe-eyes-expansion-in-middle-east-europe-for-cybersecurity-solution/2176092",
  },
  {
    id: "thequint-south-korea-ai-cameras",
    publication: "The Quint",
    host: "thequint.com",
    headline:
      "South Korea's AI Cameras to Stop Suicides Are Highly Invasive, Say Experts",
    kind: "Comment",
    url: "https://www.thequint.com/tech-and-auto/south-koreas-ai-cameras-to-stop-suicides-highly-invasive-expert",
  },
  {
    id: "varindia-empowering-security-teams",
    publication: "VARINDIA",
    host: "varindia.com",
    headline:
      "Empowering the Security Team With Capabilities: The Need of the Hour",
    kind: "Byline",
    url: "https://varindia.com/news/empowering-security-team-with-capabilities-the-need-of-the-hour",
  },
  {
    id: "techiexpert-deloitte-apac-fast-500",
    publication: "Techiexpert",
    host: "techiexpert.com",
    headline:
      "InstaSafe Honoured Among the Winners of Deloitte's APAC Technology Fast 500",
    kind: "Recognition",
    url: "https://www.techiexpert.com/instasafe-honoured-as-one-of-the-winners-in-deloittes-apac-technology-fast-500-list/",
  },
  {
    id: "forbesindia-daily-tech-brief-podcast",
    publication: "Forbes India",
    host: "forbesindia.com",
    headline:
      "Daily Tech Brief: Sandip Kumar Panda on Zero Trust Cybersecurity",
    kind: "Interview",
    url: "https://www.forbesindia.com/audio/forbes-india-daily-tech-brief-podcast/daily-tech-briefing-android-12-privacy-features-tcs-ceo-sees-decadal-tech-shift-and-a-chat-with-instasafes-sandip-kumar-panda-on-zerotrust-cybersecurity/68021",
  },
  {
    id: "techpanda-fintech-cyber-threats",
    publication: "The Tech Panda",
    host: "thetechpanda.com",
    headline:
      "Fintech Must Pull Up Its Socks in the Face of Cyber Threats and Imminent Data Breaches",
    kind: "Comment",
    url: "https://thetechpanda.com/fintech-must-pull-up-its-socks-in-the-face-of-cyber-threats-imminent-data-breaches/33233/",
  },
  {
    id: "techpanda-cyber-watch-instasafe",
    publication: "The Tech Panda",
    host: "thetechpanda.com",
    headline:
      "Cyber Watch: A Zero Trust Solution That Trusts No User, Inside or Outside the Network",
    kind: "Interview",
    url: "https://thetechpanda.com/cyber-watch-instasafe-a-zero-trust-security-solution-that-by-default-trusts-no-user-inside-or-outside-the-network/33173/",
  },
  {
    id: "moneycontrol-vaccination-techathon",
    publication: "Moneycontrol",
    host: "moneycontrol.com",
    headline:
      "APIs, Scripts and Messaging Groups: India's Vaccination Programme Is Now a Techathon",
    kind: "Comment",
    url: "https://www.moneycontrol.com/news/business/api-scripts-messaging-groups-coding-indias-vaccination-program-is-now-a-techathon-6860381.html",
  },
  {
    id: "thequint-cowin-crash",
    publication: "The Quint",
    host: "thequint.com",
    headline: "CoWIN Crashed Exactly at Launch Time — Here's Why",
    kind: "Comment",
    url: "https://www.thequint.com/tech-and-auto/cowin-site-crashed-exactly-at-the-launch-time-heres-why",
  },
  {
    id: "thequint-work-from-home-data-safety",
    publication: "The Quint",
    host: "thequint.com",
    headline: "Working From Home: Do's and Don'ts for Keeping Your Data Safe",
    kind: "Comment",
    url: "https://www.thequint.com/tech-and-auto/working-from-home-dos-and-donts-for-keeping-your-data-safe",
  },
  {
    id: "instasafe-hpe-partnership",
    publication: "InstaSafe",
    host: "instasafe.com",
    headline: "InstaSafe Partners With Hewlett Packard Enterprise (HPE)",
    kind: "Announcement",
    url: "https://instasafe.com/instasafe-partners-with-hewlett-packard-enterprise-hpe/",
  },
  {
    id: "thequint-why-indians-face-cyber-attacks",
    publication: "The Quint",
    host: "thequint.com",
    headline:
      "Why Do Indians Continue to Face Cyber Attacks, and the Way Ahead",
    kind: "Comment",
    url: "https://www.thequint.com/tech-and-auto/why-do-indians-continue-to-face-cyber-attacks-and-the-way-ahead",
  },
  {
    id: "moneycontrol-mobikwik-breach-claim",
    publication: "Moneycontrol",
    host: "moneycontrol.com",
    headline:
      "Hacker Claims to Have Deleted MobiKwik Users' Data; Researchers Cautious",
    kind: "Comment",
    url: "https://www.moneycontrol.com/news/business/hacker-claims-to-have-deleted-mobikwik-users-data-security-researchers-cautious-6713231.html",
  },
  {
    id: "ft-high-growth-asia-pacific-ranking",
    publication: "Financial Times",
    host: "ft.com",
    headline: "High-Growth Companies Asia-Pacific Ranking",
    kind: "Recognition",
    url: "https://www.ft.com/high-growth-asia-pacific-ranking-2021",
  },
  {
    id: "crn-fastest-growing-cybersecurity-startup",
    publication: "CRN India",
    host: "crn.in",
    headline:
      "574% YoY Growth: InstaSafe Becomes India's Fastest-Growing Cybersecurity Startup",
    kind: "Recognition",
    url: "https://www.crn.in/news/574-y-o-y-growth-instasafe-technologies-becomes-indias-fastest-growing-cybersecurity-startup/",
  },
];

/** Chip order. Fixed rather than derived so the row does not reshuffle
    as items are added. */
export const PRESS_KINDS: PressKind[] = [
  "Byline",
  "Interview",
  "Comment",
  "Announcement",
  "Recognition",
];

/** Distinct publications, alphabetical — used for the count line and
    for the "N publications" claim in the hero. */
export const PRESS_PUBLICATIONS: string[] = Array.from(
  new Set(PRESS.map((p) => p.publication))
).sort((a, b) => a.localeCompare(b));

export function pressCount(kind: PressKind): number {
  return PRESS.filter((p) => p.kind === kind).length;
}
