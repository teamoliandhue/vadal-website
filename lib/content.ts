// ============================================================================
// Vadal — site content (source of truth for crafted copy)
//
// NOTE ON PROOF DATA: The requirement spreadsheets were templated from Actimo's
// live site, so their customers, metrics, addresses and legal text are Actimo's.
// Per vadal.md §3 those are placeholders. Everything below is rewritten in
// Vadal's voice; all customers, numbers and locations are *illustrative sample
// data* (see `ILLUSTRATIVE`) to be swapped for Vadal's real proof before launch.
// ============================================================================

export const ILLUSTRATIVE =
  "Illustrative sample data — to be replaced with Vadal's verified proof before launch.";

export const site = {
  name: "Vadal",
  domain: "vadal.ai",
  tagline: "The engagement operating system for the whole workforce.",
  trustLine: "Trusted by people teams to reach 1M+ employees across 80+ countries",
  demoUrl: "/demo",
};

// ---------------------------------------------------------------- navigation
export type NavSolution = {
  slug: string;
  name: string;
  blurb: string; // short — used in the nav mega-menu
  detail: string; // fuller — used on the solutions panel cards
  icon: IconName;
};

export const solutionsNav: NavSolution[] = [
  {
    slug: "communication",
    name: "Employee Communication",
    blurb: "Reach every worker in seconds — comms they actually read.",
    detail:
      "Targeted news, SMS and push that land on every phone in seconds — two-way, measurable, and impossible to scroll past.",
    icon: "broadcast",
  },
  {
    slug: "mobile-learning",
    name: "Mobile & E-learning",
    blurb: "Micro-learning and training, ready any time, any place.",
    detail:
      "Bite-size training, guides and gamified courses your teams actually finish — on shift, on their own phone, any time.",
    icon: "graduation",
  },
  {
    slug: "culture-wellbeing",
    name: "Culture & Wellbeing",
    blurb: "Bring values to life and hear your people out.",
    detail:
      "Pulse surveys, recognition and a social wall that bring your values to life and give every colleague a voice that's heard.",
    icon: "heart",
  },
  {
    slug: "onboarding",
    name: "Pre- & Onboarding",
    blurb: "Get new hires performing — right from the start.",
    detail:
      "A warm welcome before day one — checklists, faces and culture — so new hires feel part of the team and perform from shift one.",
    icon: "rocket",
  },
  {
    slug: "employee-experience",
    name: "Employee Experience",
    blurb: "One 360° journey, from pre-board to offboard.",
    detail:
      "One connected journey from pre-board to offboard — every moment that matters, measured and improved across the lifecycle.",
    icon: "compass",
  },
  {
    slug: "tasks",
    name: "Productivity & Tasks",
    blurb: "From task to done — with accountability built in.",
    detail:
      "Assign, track and close tasks across every site — with reminders, ownership and proof-of-completion built right in.",
    icon: "checks",
  },
];

export const headerNav = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions", mega: true },
  { label: "Customers", href: "/customers" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

// ------------------------------------------------------------ sample logos
// Rendered as monochrome wordmark chips, not real brand assets. ILLUSTRATIVE.
export const sampleCustomers = [
  "Northwind Retail",
  "Meridian Facilities",
  "Cobalt Finance",
  "Harbor & Co.",
  "Forge Industries",
  "Rivermark Logistics",
  "Verdant Hospitality",
  "Summit Health",
];

// ---------------------------------------------------------------- homepage
export const homeStats = [
  { value: "94%", label: "active reach in the first week of rollout" },
  { value: "3×", label: "more two-way conversations between teams" },
  { value: "28%", label: "lower first-year frontline attrition" },
  { value: "4.6/5", label: "average employee rating of their app" },
];

// Business-outcome proof for the homepage results band — deliberately distinct
// from the feature stats surfaced in the scroll showcase. ILLUSTRATIVE.
export const resultsStats = [
  { value: "11 days", label: "average time to go live across every site", tag: "Rollout speed" },
  { value: "+62", label: "employee NPS after six months", tag: "Advocacy" },
  { value: "5 hrs", label: "saved per manager every week", tag: "Productivity" },
  { value: "18%", label: "uplift in customer satisfaction scores", tag: "Business impact" },
];

export const enterpriseServices: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Secure",
    body: "SSO, SCIM, granular roles and audit trails. Anonymity is protected with min-N gating, so people speak freely.",
    icon: "shield",
  },
  {
    title: "Personal",
    body: "A savvy success team plus a 200+ article help centre. Real humans when you need them, answers when you don't.",
    icon: "lifebuoy",
  },
  {
    title: "Tailored",
    body: "Your brand, your structure, your languages. The app looks and feels like it was built in-house.",
    icon: "palette",
  },
  {
    title: "Integrated",
    body: "Sync your HRMS, payroll and identity in a click. People data flows in; engagement flows out.",
    icon: "plug",
  },
];

// ------------------------------------------------------------ testimonials
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  photo?: string; // real portrait
  tex?: string; // textured backdrop behind the portrait
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Vadal gave 6,000 store colleagues one place to hear from us — and a voice back. Open rates went from hoping-they-saw-the-poster to numbers we can actually plan around.",
    name: "Claire Donovan",
    role: "Director, Internal Communications",
    company: "Northwind Retail",
    initials: "CD",
    photo: "/people/t1.webp",
    tex: "/textures/stage-blue.webp",
  },
  {
    quote:
      "Onboarding used to start on day one. Now it starts the moment someone signs — a welcome, a face, a checklist on their phone. New cleaners feel part of the team before their first shift.",
    name: "Marcus Bennett",
    role: "Head of People Operations",
    company: "Meridian Facilities",
    initials: "MB",
    photo: "/people/t2.webp",
    tex: "/textures/stage-teal.webp",
  },
  {
    quote:
      "The analytics are the part leadership didn't know they were missing. We can see which depots are thriving and which need a manager conversation this week — not next quarter.",
    name: "Sarah Whitfield",
    role: "VP People & Culture",
    company: "Rivermark Logistics",
    initials: "SW",
    photo: "/people/t3.webp",
    tex: "/textures/stage-yellow.webp",
  },
  {
    quote:
      "Tasks used to live on a clipboard no one read. Now every site sees what's due, who owns it and what's done — by lunch, not by month-end. Accountability you can actually see.",
    name: "Arjun Patel",
    role: "Operations Director",
    company: "Forge Industries",
    initials: "AP",
    photo: "/people/t4.webp",
    tex: "/textures/stage-violet.webp",
  },
];

// ----------------------------------------------------------------- icons
export type IconName =
  | "broadcast"
  | "graduation"
  | "heart"
  | "rocket"
  | "compass"
  | "checks"
  | "shield"
  | "lifebuoy"
  | "palette"
  | "plug"
  | "spark"
  | "chart"
  | "chat"
  | "bell"
  | "users"
  | "pulse"
  | "play"
  | "arrow"
  | "check"
  | "globe"
  | "lock"
  | "phone";

// =========================================================================
// SOLUTIONS — full page content (Actimo proof replaced; Vadal voice)
// =========================================================================
export type SolutionSection = {
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type Solution = {
  slug: string;
  name: string;
  icon: IconName;
  navBlurb: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  heroChecks: string[];
  pillars: string;
  sections: SolutionSection[];
  metrics: { value: string; label: string }[];
  testimonial: Testimonial;
  faqs: { q: string; a: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "communication",
    name: "Employee Communication",
    icon: "broadcast",
    navBlurb: "Reach every worker in seconds — comms they actually read.",
    heroEyebrow: "Employee Communication",
    heroTitle: "Communication your people actually read",
    heroLede:
      "Reach deskless and desk-based teams in seconds, let them reply, and finally know what landed. Two-way communication that keeps your whole workforce in the loop — and in the conversation.",
    heroChecks: [
      "Personalised news feed per employee",
      "SMS + mobile push for instant reach",
      "A Social Wall that unites every team",
      "Real-time open rates and read receipts",
    ],
    pillars: "Communication & Campaigns",
    sections: [
      {
        eyebrow: "Two-way by design",
        title: "Stop broadcasting. Start a conversation.",
        body:
          "Email assumes a desk and an inbox people check. Your frontline has neither. Vadal meets them on the device they always have — with snackable updates, smart reminders for what they've missed, and a tap to react, comment or send feedback straight back to leadership.",
        bullets: [
          "Target the whole org or a slice — by role, site, team or shift",
          "Snackable posts that are easy to understand and retain",
          "Peer-to-peer interaction inside social groups",
        ],
      },
      {
        eyebrow: "Insight, not guesswork",
        title: "Know what landed",
        body:
          "Every post comes with accurate, real-time open rates and engagement insight. Follow up with the people who haven't seen the safety notice yet, see which content earns attention, and get a clean overview of the feedback coming back.",
        bullets: [
          "Follow-up nudges to anyone who hasn't read a must-know update",
          "Track how content is used and engaged with across the org",
          "A seamless overview of employee feedback in one place",
        ],
      },
    ],
    metrics: [
      { value: "100%", label: "reach to every employee, desk or not" },
      { value: "3.1×", label: "higher read-through vs. email" },
      { value: "70%", label: "fewer printed notices on the floor" },
    ],
    testimonial: testimonials[0],
    faqs: [
      {
        q: "How is Vadal better than email?",
        a: "Email assumes a corporate inbox your frontline rarely opens. Vadal is built for the non-desk workforce: faster, more open, two-way communication on the phone people already carry. Leaders create engaging updates, send securely across every level, and track real-time engagement — and SMS + push reach the whole organisation within seconds.",
      },
      {
        q: "Can Vadal track and increase communication engagement?",
        a: "Yes. Vadal gives you accurate, real-time open rates and engagement insight into how every piece of internal communication is delivered and consumed — so you can prove reach and act on what isn't landing.",
      },
      {
        q: "We have many teams and locations. Can we target the right people?",
        a: "For any update you can send to the entire organisation or to specific groups based on role, seniority, team, location and more. And every employee gets a personalised news feed that only surfaces what's relevant to them.",
      },
      {
        q: "What is the Social Wall?",
        a: "The Social Wall is a single place to share messages, images, video and more with colleagues. It can unite the whole organisation, or run for a specific location, department or team — the social heartbeat of the app.",
      },
    ],
  },
  {
    slug: "mobile-learning",
    name: "Mobile & E-learning",
    icon: "graduation",
    navBlurb: "Micro-learning and training, ready any time, any place.",
    heroEyebrow: "Mobile & E-learning",
    heroTitle: "Corporate learning, made mobile-first",
    heroLede:
      "Deskless teams are on their feet, not at a screen. Build training, guides and onboarding flows from micro-learning that's ready to perform — any time, any place. And actually measure whether it worked.",
    heroChecks: [
      "Micro-learning, blended learning and gamification",
      "A simple but powerful LMS",
      "Real-time compliance and progress tracking",
      "Build a full programme in minutes",
    ],
    pillars: "Mobile & Platform Experience",
    sections: [
      {
        eyebrow: "It's mobile-first",
        title: "Training that fits the way people work",
        body:
          "To develop today's modern workforce, flexibility and accessibility are everything. Vadal turns long courses into bite-sized lessons — video, images, text, quizzes — that people can complete between shifts, on the floor, on the move.",
        bullets: [
          "Easy-to-follow learning journeys to completion",
          "Gamification and short micro-videos that get finished",
          "Onboard, upskill or reskill on any topic",
        ],
      },
      {
        eyebrow: "It's measurable",
        title: "Empower managers with oversight",
        body:
          "Real-time insight into training compliance and progress is easy to get with the right platform. Managers see their team's readiness at a glance; every employee can see their own progress and what's next.",
        bullets: [
          "Track activity to ensure readiness-to-perform",
          "Give managers visibility of team learning performance",
          "Give every employee oversight of their own journey",
        ],
      },
    ],
    metrics: [
      { value: "25%", label: "improvement in sales performance" },
      { value: "55%", label: "increase in customer satisfaction" },
      { value: "50%", label: "fewer internal support requests" },
    ],
    testimonial: {
      quote:
        "We built a huge library into Vadal — blended learning, gamification, short micro-videos — for sales, leadership and systems training. People actually finish it because it lives in their pocket.",
      name: "Thomas Larsson",
      role: "Head of Learning & Development",
      company: "Verdant Hospitality",
      initials: "TL",
    },
    faqs: [
      {
        q: "Can I track employee training and development progress?",
        a: "Yes. Managers can see their team's learning performance and compliance, and every employee can see their own progress and journey through to completion — all in real time.",
      },
      {
        q: "What kind of training can I build?",
        a: "Anything. Onboard, upskill or reskill on any topic. Mobile training is created from your own content in any structure — a skill, company values, a new process, onboarding and more — with micro-learning, video, images, text and gamification.",
      },
    ],
  },
  {
    slug: "culture-wellbeing",
    name: "Culture & Wellbeing",
    icon: "heart",
    navBlurb: "Bring values to life and hear your people out.",
    heroEyebrow: "Culture & Employee Wellbeing",
    heroTitle: "Create a culture people want to be part of",
    heroLede:
      "Culture isn't a poster in the break room. Cultivate an environment that motivates your people to perform — run initiatives, bring values to life, spark community, and genuinely hear your employees out.",
    heroChecks: [
      "Run initiatives that motivate",
      "Bring company values to life",
      "Spark community across locations",
      "Hear your employees out with pulse + eNPS",
    ],
    pillars: "Listening & Feedback · Engagement & Recognition",
    sections: [
      {
        eyebrow: "Culture affects results",
        title: "It's not a myth — workers feel it",
        body:
          "A positive work environment that breeds engagement and happiness shows up on the bottom line. But an organic culture of wellbeing takes proactivity, especially when people are spread across sites. Drive continuous, digital effort to bring people together — it pays off.",
        bullets: [
          "Listen continuously with pulse surveys and eNPS",
          "Bring dispersed teams closer, wherever they are",
          "Turn sentiment into action managers can take",
        ],
      },
      {
        eyebrow: "Make it visible",
        title: "Bring company values to life",
        body:
          "Highlight culture and values consistently across the whole employee experience — not just at the all-hands. Launch value campaigns, keep comms and training on-brand, and check whether people actually feel the alignment.",
        bullets: [
          "Friendly competition and campaigns across locations",
          "Health and sustainability initiatives, like a step challenge",
          "Survey feedback on how lived your values really are",
        ],
      },
    ],
    metrics: [
      { value: "+22", label: "average eNPS lift in the first year" },
      { value: "2.4×", label: "more recognition shared between peers" },
      { value: "89%", label: "of staff say they feel heard" },
    ],
    testimonial: {
      quote:
        "When everyone's on a different shift or a different site, connection is hard. With Vadal you can still have it — people share, celebrate and check in on each other. It's really lovely to watch.",
      name: "Rebecca Stone",
      role: "Internal Communications Coordinator",
      company: "Summit Health",
      initials: "RS",
    },
    faqs: [
      {
        q: "How does Vadal help wellbeing for a dispersed workforce?",
        a: "By making listening continuous and connection digital. Pulse surveys and eNPS surface how people really feel, communities give scattered teams a place to belong, and managers get the insight to act before small problems grow.",
      },
    ],
  },
  {
    slug: "onboarding",
    name: "Pre- & Onboarding",
    icon: "rocket",
    navBlurb: "Get new hires performing — right from the start.",
    heroEyebrow: "Pre- & Onboarding",
    heroTitle: "Onboarding that starts before day one",
    heroLede:
      "It's pre- and onboarding for new hires, made easy and engaging. Welcome people the moment they sign, get them ready to perform faster, and make the whole thing run itself.",
    heroChecks: [
      "Set up for success",
      "Make it automatic",
      "Include your team",
      "Sync to perfection",
    ],
    pillars: "Mobile & Platform Experience · Communication",
    sections: [
      {
        eyebrow: "Customizable",
        title: "An onboarding that fits your company",
        body:
          "There's no one-size-fits-all way to bring someone into a company. Tailor flows to help new hires adapt to your culture and even their specific role. Content and structure are easy to tweak, so the programme stays genuinely helpful for your business and your people.",
        bullets: [
          "Welcome staff with custom, engaging onboarding flows",
          "Prep employees with quick training before their first day",
          "Build pre-, on- or offboarding journeys for any role",
        ],
      },
      {
        eyebrow: "Make it automatic",
        title: "Set it up once, let it run",
        body:
          "Auto-run seamless onboarding from a one-time setup — and still make it feel personal. Trigger flows from start dates, keep managers and staff updated, and watch progress in real time without chasing anyone.",
        bullets: [
          "Auto-start programmes from each employee's start date",
          "Schedule a flow in minutes, completed on-the-go",
          "Measure training progress in real time",
        ],
      },
    ],
    metrics: [
      { value: "2×", label: "faster time-to-productivity" },
      { value: "25%", label: "lift in early sales performance" },
      { value: "40%", label: "higher first-year retention" },
    ],
    testimonial: {
      quote:
        "When you join us you get an invitation, a welcome message, and then Vadal guides you through the whole onboarding journey on your phone. People arrive on day one already feeling part of it.",
      name: "Thomas Byfield",
      role: "HR Business Partner",
      company: "Harbor & Co.",
      initials: "TB",
    },
    faqs: [
      {
        q: "Do you have an onboarding template we can start from?",
        a: "Yes. We're happy to share a pre-boarding template you can customise and send to new staff — an intro to the company, the team, your values and mission, plus the practical info someone needs to be ready on day one. You can also design your own flow from scratch.",
      },
    ],
  },
  {
    slug: "employee-experience",
    name: "Employee Experience",
    icon: "compass",
    navBlurb: "One 360° journey, from pre-board to offboard.",
    heroEyebrow: "Employee Experience & Journey",
    heroTitle: "One app for the whole employee journey",
    heroLede:
      "Elevate engagement and redesign the journey people take with your organisation — pre-board to offboard — in a single, on-brand, 360° platform. Fewer systems for them, far more signal for you.",
    heroChecks: [
      "Engage every step of the way",
      "Understand your people",
      "Fuel growth",
      "Your workplace, customized",
    ],
    pillars: "All seven pillars, in one experience",
    sections: [
      {
        eyebrow: "It's continuous · It's all-in-one",
        title: "Digitize the workplace people carry in their pocket",
        body:
          "Give employees easy, secure, mobile access to your company and its people — customised to the needs of a modern, dispersed organisation. One place replaces the scatter of tools nobody wanted to learn.",
        bullets: [
          "A mobile-friendly, secure home for everything that matters",
          "Customised to varying needs across teams and regions",
          "On-brand from the splash screen to the smallest label",
        ],
      },
      {
        eyebrow: "Your workplace, customized",
        title: "A journey co-piloted by your data",
        body:
          "Embark on an impactful journey co-piloted by a tailored 360° engagement platform. Drive remote culture, put benefits and information in one place, and enable both employee development and business success.",
        bullets: [
          "Drive remote culture and bring co-workers together",
          "Share employee benefits and information, all in one place",
          "Enable employee development and measurable business success",
        ],
      },
    ],
    metrics: [
      { value: "1", label: "app instead of five disconnected tools" },
      { value: "360°", label: "view of the journey, pre-board to offboard" },
      { value: "31%", label: "more employees engaged month over month" },
    ],
    testimonial: {
      quote:
        "It's important that we deliver from day one, and Vadal helps us do that. Staff are more engaged and they know more when they start — even a seasonal joiner feels part of one team. Part of one flock.",
      name: "Glen Anderson",
      role: "Director of Guest Experience",
      company: "Verdant Hospitality",
      initials: "GA",
    },
    faqs: [
      {
        q: "Our employees have too many systems — can your app simplify that?",
        a: "Yes. Vadal is a 360° employee app designed as an all-in-one home for communication, training and leadership across medium-to-large organisations. It's a one-stop-shop your people use to find information, engage with peers and give two-way feedback — so it can replace, integrate with, or link to many of the systems you run today.",
      },
      {
        q: "Does Vadal integrate with HR systems?",
        a: "Yes. Sync your HRMS, payroll and identity provider so people data flows in automatically and engagement insight flows back out — no spreadsheets, no manual upkeep.",
      },
    ],
  },
  {
    slug: "tasks",
    name: "Productivity & Tasks",
    icon: "checks",
    navBlurb: "From task to done — with accountability built in.",
    heroEyebrow: "Productivity & Operations",
    heroTitle: "Enhance productivity, one task at a time",
    heroLede:
      "Track work from creation to completion, keep teams accountable, and run operations from one secure, company-approved place — with the analytics to make data-driven decisions on the floor.",
    heroChecks: [
      "Track tasks from creation to completion",
      "Recurring tasks and clear ownership",
      "Digitised health & safety procedures",
      "Analytics for data-driven decisions",
    ],
    pillars: "Manager Enablement · Case Management",
    sections: [
      {
        eyebrow: "Creation to completion",
        title: "Keep every team organized and accountable",
        body:
          "Easily track progress and maintain accountability inside a secure, company-approved environment. Decrease downtime with assigned tasks for effective maintenance, stay compliant with analytics, and make sure nobody misses a deadline.",
        bullets: [
          "Assign tasks to an individual or a whole group",
          "Add descriptions and media to set clear expectations",
          "Set frequency to create recurring tasks automatically",
        ],
      },
      {
        eyebrow: "Operational excellence",
        title: "Streamline procedures, maximize efficiency",
        body:
          "Consolidate task-related activity into one platform so teams focus on high-priority work and time and resources are better spent. Digitise health and safety procedures, keep people informed with SMS and push, and manage everything past, present and upcoming in one place.",
        bullets: [
          "Digitise health & safety procedures and assign them out",
          "Notify teams of new tasks via SMS and push",
          "Manage past, completed and upcoming tasks centrally",
        ],
      },
    ],
    metrics: [
      { value: "37%", label: "less operational downtime" },
      { value: "100%", label: "audit trail on safety-critical tasks" },
      { value: "2.5h", label: "saved per manager, per week" },
    ],
    testimonial: {
      quote:
        "Maintenance, safety checks, daily opens — it's all in Vadal now. Nothing slips, every site is on the same page, and when an auditor asks for proof, it's two taps away.",
      name: "Daniel Okoro",
      role: "Operations Director",
      company: "Forge Industries",
      initials: "DO",
    },
    faqs: [
      {
        q: "Can tasks recur automatically?",
        a: "Yes. Adjust the frequency settings to create recurring tasks — daily opening checklists, weekly safety rounds, monthly audits — so the right work appears for the right people without anyone setting it up each time.",
      },
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
