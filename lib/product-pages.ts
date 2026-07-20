import type { IconName, Testimonial } from "./content";

// ============================================================================
// Product pages — /platform/[slug]
//
// Dedicated pages for the four platform pillars and the survey types from the
// header mega-menu (Header Hovering content.docx), following the category's
// product-page pattern: hero + checks → how it works → feature deep-dives →
// impact stats → testimonial → FAQ → related. All metrics ILLUSTRATIVE.
// ============================================================================

export type ProductFeature = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
};

export type ProductPage = {
  slug: string;
  name: string; // short name — cards, related links
  category: "Platform" | "Survey type";
  icon: IconName;
  mock: "dashboard" | "phone" | "broadcast" | "voice";
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  heroChecks: string[];
  steps: { title: string; body: string }[];
  features: ProductFeature[];
  metrics: { value: string; label: string }[];
  testimonial: Testimonial;
  faqs: { q: string; a: string }[];
  related: string[]; // slugs
};

export const productPages: ProductPage[] = [
  // ==================================================== engagement surveys
  {
    slug: "engagement-surveys",
    name: "Engagement Surveys",
    category: "Platform",
    icon: "pulse",
    mock: "dashboard",
    heroEyebrow: "Intelligent Workforce Engagement Surveys",
    heroTitle: "Engagement surveys that end in decisions, not dashboards",
    heroLede:
      "Design, deploy and measure AI-powered engagement surveys that turn honest employee feedback into actionable workforce intelligence, tailored to your culture, your priorities and the decisions you actually need to make.",
    heroChecks: [
      "Research-backed template library",
      "AI-assisted survey design & targeting",
      "Real-time participation tracking",
      "Insights ranked by business impact",
    ],
    steps: [
      { title: "Design", body: "Start from expert templates covering engagement, wellbeing, leadership, DEI and more, or let AI draft questions around your priorities." },
      { title: "Listen", body: "Launch across web, mobile, email, SMS and QR, in 150+ languages, with anonymity protection built in." },
      { title: "Analyze", body: "AI reads every response, scores, drivers, sentiment and verbatims, and ranks what matters most." },
      { title: "Act", body: "Every insight becomes an owned action plan with progress tracking, so surveys change things." },
    ],
    features: [
      {
        eyebrow: "Intelligent programs",
        title: "Programs tailored to your culture",
        body: "Design engagement, pulse and lifecycle surveys around your organization's unique culture and business priorities, not a vendor's fixed questionnaire.",
        bullets: [
          "Customize every template to your goals and language",
          "Target by team, site, tenure, role or any segment",
          "Schedule once, AI handles reminders and follow-ups",
        ],
      },
      {
        eyebrow: "Signal, not noise",
        title: "From responses to ranked priorities",
        body: "Vadal.ai doesn't stop at a score. Driver analysis, AI sentiment and benchmark context show which levers will move engagement, and which can wait.",
        bullets: [
          "Driver analysis tied to retention and performance",
          "AI summaries of thousands of open-text comments",
          "Benchmarks across teams, industry and time",
        ],
      },
    ],
    metrics: [
      { value: "84%", label: "average survey participation rate" },
      { value: "6×", label: "faster from survey close to action plan" },
      { value: "+18", label: "average engagement-score lift in year one" },
    ],
    testimonial: {
      quote:
        "Our first Vadal.ai engagement survey hit 84% participation across 4,000 employees in five languages, and for the first time, every manager left with an action plan, not just a PDF.",
      name: "Priya Raman",
      role: "Head of People Analytics",
      company: "Cobalt Finance",
      initials: "PR",
    },
    faqs: [
      {
        q: "How is this different from a free survey tool?",
        a: "Free tools collect answers; Vadal.ai produces decisions. Research-backed question design, driver analysis, AI sentiment, benchmarks and action planning are built in, so the output isn't a spreadsheet of responses, it's a ranked list of what to do next, with owners and progress tracking.",
      },
      {
        q: "Can we customize the survey templates?",
        a: "Fully. Start from the expert library, engagement, wellbeing, onboarding, leadership, DEI, culture, learning and lifecycle events, then adapt questions, scales, languages and targeting to your organization. AI can also draft questions around a specific priority.",
      },
      {
        q: "How do you keep responses honest?",
        a: "Anonymity is protected with configurable thresholds and intelligent aggregation, so no individual can ever be identified. Employees see that protection up front, which is why participation and candor stay high.",
      },
    ],
    related: ["pulse-surveys", "lifecycle-surveys", "people-analytics"],
  },

  // ==================================================== employee listening
  {
    slug: "employee-listening",
    name: "Continuous Listening",
    category: "Platform",
    icon: "chat",
    mock: "voice",
    heroEyebrow: "Continuous Employee Listening",
    heroTitle: "Listening that never stops at the annual survey",
    heroLede:
      "Gather employee feedback continuously across every channel, surveys, pulse checks, feedback portals, recognition and AI conversations, and understand workforce sentiment as it changes, not twelve months later.",
    heroChecks: [
      "Always-on, multi-channel listening",
      "Lifecycle triggers on employee milestones",
      "Real-time sentiment tracking",
      "Anonymous channels employees trust",
    ],
    steps: [
      { title: "Connect", body: "Turn on listening channels across the moments that matter, scheduled, triggered and always-on." },
      { title: "Capture", body: "Feedback flows in from surveys, portals, recognition and AI conversations, every voice, every format." },
      { title: "Understand", body: "AI sentiment and theme detection turn a stream of signals into a live picture of workforce health." },
      { title: "Respond", body: "Close the loop with two-way (even anonymous) conversations, so people see their voice lands." },
    ],
    features: [
      {
        eyebrow: "Automated listening",
        title: "Triggered by life, not the calendar",
        body: "Move beyond scheduled surveys. Automatically trigger personalized pulse surveys on milestones, lifecycle events, organizational changes or workforce segments.",
        bullets: [
          "Onboarding, promotion, manager-change and exit triggers",
          "Org-change pulses during restructures and rollouts",
          "AI recommends when and whom to listen to next",
        ],
      },
      {
        eyebrow: "The loop, closed",
        title: "Two-way conversations, even anonymous ones",
        body: "Listening dies when employees never hear back. Vadal.ai lets HR and managers acknowledge, ask follow-ups and resolve issues while preserving anonymity.",
        bullets: [
          "Secure anonymous two-way conversations",
          "Acknowledgements and status updates employees can see",
          "Escalation paths for serious concerns",
        ],
      },
    ],
    metrics: [
      { value: "12×", label: "more feedback signals than an annual survey" },
      { value: "71%", label: "of flagged issues resolved within two weeks" },
      { value: "2.4×", label: "higher trust scores where loops are closed" },
    ],
    testimonial: {
      quote:
        "We went from one survey a year to listening at every milestone. Exit-interview surprises basically ended, by the time someone's at risk, we've usually already heard it and acted.",
      name: "Elena Vasquez",
      role: "VP Employee Experience",
      company: "Verdant Hospitality",
      initials: "EV",
    },
    faqs: [
      {
        q: "Won't continuous listening cause survey fatigue?",
        a: "The opposite, when done right. Instead of one 60-question annual survey, employees get short, relevant check-ins at moments that matter to them, and AI throttles frequency per person, so nobody is over-asked. Fatigue comes from being asked and ignored; closing the loop is the cure.",
      },
      {
        q: "Which channels can feedback come from?",
        a: "Scheduled and triggered surveys, always-on feedback portals, recognition signals, lifecycle touchpoints and AI-assisted conversations, across web, mobile, email, SMS and QR. Everything lands in one sentiment picture.",
      },
      {
        q: "How do anonymous conversations work?",
        a: "Employees submit feedback anonymously; HR or managers can reply through the platform without ever seeing who's behind it. The employee chooses if and when to reveal themselves. Identity protection is enforced by the platform, not by policy.",
      },
    ],
    related: ["confidential-feedback", "engagement-surveys", "workforce-intelligence"],
  },

  // ================================================ workforce intelligence
  {
    slug: "workforce-intelligence",
    name: "Workforce Intelligence",
    category: "Platform",
    icon: "spark",
    mock: "dashboard",
    heroEyebrow: "Actionable Workforce Intelligence",
    heroTitle: "From feedback to AI-driven action, with owners and outcomes",
    heroLede:
      "Turn feedback, workforce data and organizational insight into AI-powered recommendations. Prioritize the actions that improve engagement and performance, assign ownership, and watch impact land, Score → Insight → Action → Impact.",
    heroChecks: [
      "AI-generated action recommendations",
      "Ownership, deadlines & progress tracking",
      "Collaboration between HR and managers",
      "Impact measured against the baseline",
    ],
    steps: [
      { title: "Score", body: "Engagement, sentiment and workforce health quantified continuously across every team." },
      { title: "Insight", body: "AI explains the why, drivers, risks and opportunities, ranked by business impact." },
      { title: "Action", body: "Recommended plays become owned action plans with deadlines and collaboration built in." },
      { title: "Impact", body: "Scores are re-measured against the actions taken, so you know what actually worked." },
    ],
    features: [
      {
        eyebrow: "AI action planning",
        title: "Recommendations, not homework",
        body: "Every insight arrives with suggested actions drawn from what has worked in comparable teams, managers pick, adapt and commit rather than starting from a blank page.",
        bullets: [
          "AI-generated plans tuned to each team's drivers",
          "Ownership and accountability at every level",
          "Progress visible to HR, leaders and the team itself",
        ],
      },
      {
        eyebrow: "Decision intelligence",
        title: "Ask the copilot, decide with confidence",
        body: "Leaders ask workforce questions in natural language and get AI-powered answers, predictions and scenario guidance, grounded in your own organization's data.",
        bullets: [
          "Natural-language Q&A over workforce data",
          "Predictive recommendations and scenario guidance",
          "Explainable insights that show their work",
        ],
      },
    ],
    metrics: [
      { value: "3×", label: "faster from signal to committed action" },
      { value: "78%", label: "of action plans completed on schedule" },
      { value: "+11%", label: "team-performance lift where plans ship" },
    ],
    testimonial: {
      quote:
        "The difference is accountability. 78% of our action plans actually complete now, because every one has an owner, a deadline and a visible score it's supposed to move.",
      name: "Sarah Whitfield",
      role: "VP People & Culture",
      company: "Rivermark Logistics",
      initials: "SW",
      photo: "/people/t3.webp",
      tex: "/textures/stage-yellow.webp",
    },
    faqs: [
      {
        q: "Where do the AI recommendations come from?",
        a: "From your own data first, each team's drivers, history and context, combined with patterns from comparable teams and validated people-science interventions. Every recommendation is explainable: you can always see why it was suggested.",
      },
      {
        q: "Who owns an action plan?",
        a: "Whoever should, a manager, an HR partner, a site lead or an executive sponsor. Plans carry owners, deadlines, collaborators and progress states, and roll up so leadership sees execution across the whole organization.",
      },
      {
        q: "How do you measure whether actions worked?",
        a: "Every plan is linked to the metric it's meant to move. Vadal.ai re-measures after execution and attributes the change, so over time you build an evidence base of what works in your organization.",
      },
    ],
    related: ["people-analytics", "engagement-surveys", "employee-listening"],
  },

  // ===================================================== people analytics
  {
    slug: "people-analytics",
    name: "People Analytics",
    category: "Platform",
    icon: "chart",
    mock: "dashboard",
    heroEyebrow: "AI-Driven People Analytics",
    heroTitle: "People analytics your board can act on",
    heroLede:
      "Leverage predictive workforce analytics, AI-powered dashboards and business intelligence to uncover trends, identify risks and align workforce strategies with organizational goals, from team heatmaps to executive-ready reports.",
    heroChecks: [
      "Predictive attrition & risk models",
      "Benchmarks across teams and industry",
      "Executive dashboards & board reports",
      "Exports + BI integrations (Power BI, Tableau)",
    ],
    steps: [
      { title: "Unify", body: "Engagement, talent, leadership and organizational data connected into one intelligence layer." },
      { title: "Explore", body: "Dashboards, heatmaps and drill-downs from company level to a single team, with privacy protected." },
      { title: "Predict", body: "AI models flag attrition risk, engagement decline and leadership gaps before they surface." },
      { title: "Report", body: "Executive-ready dashboards and AI summaries, exportable or piped straight into your BI stack." },
    ],
    features: [
      {
        eyebrow: "Predictive models",
        title: "See risks before they resign",
        body: "Attrition prediction, workforce-health indexing and leadership-effectiveness scoring surface tomorrow's problems while there's still time to fix them.",
        bullets: [
          "Attrition-risk flags with contributing factors",
          "Workforce Health Index across every unit",
          "Leadership effectiveness and succession signals",
        ],
      },
      {
        eyebrow: "Enterprise reporting",
        title: "From heatmap to boardroom in one click",
        body: "Generate presentation-ready reports covering engagement, workforce analytics and talent trends, customized for CEOs, CHROs, managers and business leaders.",
        bullets: [
          "AI-written executive summaries of any view",
          "Excel, CSV and PDF exports on demand",
          "Native Workday, SAP, Power BI & Tableau integration",
        ],
      },
    ],
    metrics: [
      { value: "6 wks", label: "average early warning before regretted exits" },
      { value: "22%", label: "reduction in regretted attrition in year one" },
      { value: "40+", label: "workforce metrics unified in one model" },
    ],
    testimonial: {
      quote:
        "The attrition model flagged a depot six weeks before we'd have seen it in the numbers. We kept three of our four best drivers there. That's the quarter the platform paid for itself.",
      name: "Arjun Patel",
      role: "Operations Director",
      company: "Forge Industries",
      initials: "AP",
      photo: "/people/t4.webp",
      tex: "/textures/stage-violet.webp",
    },
    faqs: [
      {
        q: "Do we need a data team to use this?",
        a: "No. Dashboards, drivers and predictions are pre-built and readable by non-analysts, and the AI copilot answers questions in plain language. If you do have analysts, exports and BI integrations give them full depth.",
      },
      {
        q: "How accurate are the predictive models?",
        a: "Models are trained on your organization's own patterns and validated continuously against outcomes; every prediction ships with contributing factors and a confidence level rather than a black-box score. Sample figures shown on this page are illustrative.",
      },
      {
        q: "Can we feed this into our existing BI stack?",
        a: "Yes. Native integrations for Power BI, Tableau and Looker, scheduled exports in Excel/CSV/PDF, plus REST APIs and webhooks for anything custom.",
      },
    ],
    related: ["workforce-intelligence", "predictive-enps", "engagement-surveys"],
  },

  // ======================================================== pulse surveys
  {
    slug: "pulse-surveys",
    name: "Pulse Surveys",
    category: "Survey type",
    icon: "bell",
    mock: "phone",
    heroEyebrow: "AI-Powered Pulse Engagement Surveys",
    heroTitle: "Pulse surveys that predict, not just poll",
    heroLede:
      "Frequent, intelligent pulse checks that track engagement in real time and predict emerging workforce trends, two minutes for the employee, an early-warning system for you.",
    heroChecks: [
      "2-minute, mobile-first check-ins",
      "AI-tuned frequency per person",
      "Trend detection before it hits eNPS",
      "Manager alerts on meaningful shifts",
    ],
    steps: [
      { title: "Schedule", body: "Set the cadence, weekly, biweekly, monthly, or let AI adapt per team and person." },
      { title: "Check in", body: "Short, rotating question sets on mobile, in 150+ languages, closed in under two minutes." },
      { title: "Track", body: "Live trendlines per team and driver, with anomalies flagged as they emerge." },
      { title: "Intervene", body: "Managers get alerts and suggested plays when a trend needs attention, before it becomes attrition." },
    ],
    features: [
      {
        eyebrow: "Real-time signal",
        title: "Know this week, not last year",
        body: "Annual surveys tell you what happened; pulses tell you what's happening. Live trendlines show engagement moving as reorganizations, launches and seasons hit.",
        bullets: [
          "Rotating question banks keep signal fresh",
          "Anomaly detection on every team's trendline",
          "Drill from company trend to team driver in two clicks",
        ],
      },
      {
        eyebrow: "Predictive pulse",
        title: "An early-warning system for engagement risk",
        body: "Vadal.ai's models read pulse patterns to flag disengagement, attrition risk and emerging challenges early, so managers act proactively, not post-mortem.",
        bullets: [
          "Risk flags with contributing drivers",
          "Suggested actions matched to the pattern",
          "Escalation to HR when trends persist",
        ],
      },
    ],
    metrics: [
      { value: "91%", label: "average pulse completion on mobile" },
      { value: "5 wks", label: "earlier detection of engagement dips" },
      { value: "-31%", label: "surprise resignations after one year" },
    ],
    testimonial: {
      quote:
        "Pulses caught a slide in one region five weeks before the quarterly numbers would have. A new rota and two conversations later, the trendline turned. That used to be a resignation letter.",
      name: "Claire Donovan",
      role: "Director, Internal Communications",
      company: "Northwind Retail",
      initials: "CD",
      photo: "/people/t1.webp",
      tex: "/textures/stage-blue.webp",
    },
    faqs: [
      {
        q: "How often should we pulse?",
        a: "Most organizations land on biweekly or monthly. Vadal.ai's AI can also adapt frequency per team, pulsing more during change, less during stable periods, and throttles per person so no one is over-surveyed.",
      },
      {
        q: "Are pulse results comparable to our annual survey?",
        a: "Yes, pulse items are drawn from the same validated constructs, so trendlines and annual deep-dives speak the same language. Many customers keep one annual survey and let pulses carry the rest of the year.",
      },
      {
        q: "Can employees answer anonymously?",
        a: "Yes. The same anonymity thresholds and aggregation protections apply to pulses as to every other Vadal.ai survey.",
      },
    ],
    related: ["engagement-surveys", "predictive-enps", "employee-listening"],
  },

  // ==================================================== lifecycle surveys
  {
    slug: "lifecycle-surveys",
    name: "Lifecycle Surveys",
    category: "Survey type",
    icon: "compass",
    mock: "phone",
    heroEyebrow: "Lifecycle Intelligence Engagement Surveys",
    heroTitle: "Feedback at every milestone, onboarding to offboarding",
    heroLede:
      "Gather feedback at the moments that shape the employee experience, day one, week six, promotion, manager change, exit, and optimize the entire lifecycle with journey analytics.",
    heroChecks: [
      "Automated milestone triggers",
      "Onboarding, stay & exit templates",
      "Journey analytics across stages",
      "Cohort comparisons over time",
    ],
    steps: [
      { title: "Map", body: "Choose the milestones that matter, from pre-boarding to exit, with templates for each." },
      { title: "Trigger", body: "HRIS-driven automation sends the right survey to the right person at exactly the right moment." },
      { title: "Compare", body: "Journey analytics show where experience dips, by stage, cohort, site or manager." },
      { title: "Fix", body: "Turn stage-level insight into owned improvements, and watch the next cohort score higher." },
    ],
    features: [
      {
        eyebrow: "The journey, measured",
        title: "Find exactly where experience breaks",
        body: "Aggregate lifecycle feedback reveals the stage where sentiment dips, the week-six cliff, the post-promotion slump, the pre-exit drift, so you fix the journey, not just the symptom.",
        bullets: [
          "Stage-by-stage experience scoring",
          "Cohort and location comparisons",
          "Manager-level onboarding quality signals",
        ],
      },
      {
        eyebrow: "Exit intelligence",
        title: "Learn from every goodbye",
        body: "Structured exit surveys plus AI theme analysis turn departures into a clear picture of why people really leave, and which exits were preventable.",
        bullets: [
          "Preventable-exit classification",
          "Regrettable-loss tracking by team",
          "Themes fed back into retention actions",
        ],
      },
    ],
    metrics: [
      { value: "2×", label: "faster new-hire time-to-productivity" },
      { value: "34%", label: "fewer first-year exits after fixes" },
      { value: "89%", label: "exit-survey completion with AI follow-ups" },
    ],
    testimonial: {
      quote:
        "Week-six surveys showed new hires loved training but felt lost after it. One buddy-program later, first-year attrition dropped by a third. We'd never have found that in an annual survey.",
      name: "Marcus Bennett",
      role: "Head of People Operations",
      company: "Meridian Facilities",
      initials: "MB",
      photo: "/people/t2.webp",
      tex: "/textures/stage-teal.webp",
    },
    faqs: [
      {
        q: "Which milestones can trigger a survey?",
        a: "Any event your HRIS knows about: offer acceptance, day one, week six, probation end, promotion, manager change, parental leave return, work anniversaries and exit, plus custom events via API.",
      },
      {
        q: "Do lifecycle surveys replace engagement surveys?",
        a: "They complement them. Engagement surveys measure the organization's health broadly; lifecycle surveys measure the journey each person travels. Together they show both the what and the when.",
      },
      {
        q: "How does exit feedback stay honest?",
        a: "Exit surveys can be answered anonymously with publication delayed and aggregated, so departing employees can be candid without burning bridges, which is exactly when you learn the most.",
      },
    ],
    related: ["engagement-surveys", "pulse-surveys", "employee-listening"],
  },

  // ====================================================== predictive eNPS
  {
    slug: "predictive-enps",
    name: "Predictive eNPS",
    category: "Survey type",
    icon: "heart",
    mock: "dashboard",
    heroEyebrow: "Predictive eNPS Analytics",
    heroTitle: "eNPS that explains itself, and predicts what's next",
    heroLede:
      "Track employee loyalty with AI that goes beyond the score: understand the drivers behind your eNPS, benchmark it across teams and time, and predict where advocacy is heading before it moves.",
    heroChecks: [
      "One-tap eNPS with driver follow-ups",
      "AI analysis of promoter & detractor comments",
      "Team, site and industry benchmarks",
      "Predictive trendlines per segment",
    ],
    steps: [
      { title: "Ask", body: "The classic question plus AI-chosen follow-ups that capture the why behind the number." },
      { title: "Segment", body: "Scores by team, site, tenure and role, with anonymity thresholds protecting every cut." },
      { title: "Explain", body: "AI clusters promoter and detractor themes so you know exactly what creates or kills advocacy." },
      { title: "Predict", body: "Trend models forecast where eNPS is heading per segment, and what would change the trajectory." },
    ],
    features: [
      {
        eyebrow: "Beyond the number",
        title: "The why behind every score",
        body: "An eNPS without drivers is a mood ring. Vadal.ai combines the score with engagement, recognition and feedback signals to show what's actually driving loyalty, and what to do about it.",
        bullets: [
          "Driver correlation with engagement factors",
          "AI theme clustering of open-text comments",
          "Detractor-recovery action suggestions",
        ],
      },
      {
        eyebrow: "Benchmarked & forecast",
        title: "Context today, trajectory tomorrow",
        body: "Compare eNPS across teams, locations and industry benchmarks, then let predictive models project each segment's path so you invest where it changes the curve.",
        bullets: [
          "Internal and industry benchmark context",
          "Segment-level trend forecasting",
          "Scenario guidance for the biggest levers",
        ],
      },
    ],
    metrics: [
      { value: "+24", label: "average eNPS improvement in 12 months" },
      { value: "88%", label: "of detractor themes resolved or answered" },
      { value: "4×", label: "more referral hires from promoter growth" },
    ],
    testimonial: {
      quote:
        "Our eNPS was 'fine' until the driver analysis showed detractors were all about scheduling. We fixed rotas in two regions and the score jumped 24 points, referrals followed.",
      name: "Thomas Byfield",
      role: "HR Business Partner",
      company: "Harbor & Co.",
      initials: "TB",
    },
    faqs: [
      {
        q: "How often should we measure eNPS?",
        a: "Quarterly is the sweet spot for most organizations, frequent enough to see movement, spaced enough to act between reads. Vadal.ai can also run it continuously on a rolling sample so you get a live score without over-asking.",
      },
      {
        q: "What's a good eNPS?",
        a: "It varies by industry and workforce mix, which is why the number alone misleads. Vadal.ai benchmarks your score against comparable organizations and, more importantly, tracks your own trajectory and its drivers.",
      },
      {
        q: "Can detractors be followed up without breaking anonymity?",
        a: "Yes. Two-way anonymous conversations let HR acknowledge and resolve detractor feedback while the platform enforces identity protection throughout.",
      },
    ],
    related: ["pulse-surveys", "people-analytics", "engagement-surveys"],
  },

  // ================================================ confidential feedback
  {
    slug: "confidential-feedback",
    name: "Confidential Feedback",
    category: "Survey type",
    icon: "lock",
    mock: "voice",
    heroEyebrow: "Confidential Feedback Channels",
    heroTitle: "Honest feedback needs a safe front door",
    heroLede:
      "Offer anonymous, secure channels for the feedback that never reaches a named survey, with enterprise-grade privacy, configurable anonymity thresholds and two-way conversations that keep trust intact.",
    heroChecks: [
      "Always-on anonymous feedback portal",
      "Configurable anonymity thresholds",
      "AI PII detection & masking",
      "Two-way anonymous conversations",
    ],
    steps: [
      { title: "Open", body: "An always-on, branded channel where anyone can raise anything, ideas, concerns, questions." },
      { title: "Protect", body: "Anonymity thresholds, intelligent aggregation and PII masking enforce privacy by architecture." },
      { title: "Triage", body: "AI classifies and routes submissions, praise, ideas, grievances, safety, to the right owner." },
      { title: "Resolve", body: "Owners respond through anonymous two-way threads; employees see action, trust compounds." },
    ],
    features: [
      {
        eyebrow: "Privacy by architecture",
        title: "Protection employees can verify",
        body: "Anonymity isn't a promise in a policy document, it's enforced by the platform. Thresholds, aggregation and AI-powered PII masking make identification impossible, and employees can see it.",
        bullets: [
          "Min-N thresholds on every report and cut",
          "AI detection and masking of identifying details",
          "GDPR-ready controls, RBAC and audit logs",
        ],
      },
      {
        eyebrow: "From vent to fixed",
        title: "Feedback that goes somewhere",
        body: "Anonymous doesn't mean unanswerable. Routed ownership, SLAs and two-way threads mean every submission gets a response, the single biggest driver of psychological safety.",
        bullets: [
          "Automatic routing by topic and severity",
          "Response SLAs with escalation paths",
          "Org-wide 'you said, we did' summaries",
        ],
      },
    ],
    metrics: [
      { value: "3.2×", label: "more issues surfaced vs. named channels" },
      { value: "92%", label: "of submissions receive a response" },
      { value: "+19", label: "psychological-safety score lift in a year" },
    ],
    testimonial: {
      quote:
        "The things that matter most were exactly the things nobody would put their name to. Within a quarter we'd surfaced three times more issues, and answered 9 in 10 of them.",
      name: "Rebecca Stone",
      role: "Internal Communications Coordinator",
      company: "Summit Health",
      initials: "RS",
    },
    faqs: [
      {
        q: "Can managers ever see who said what?",
        a: "No. Anonymity is enforced by the platform's architecture, thresholds, aggregation and masking, not by trust in an admin. Even Vadal.ai support cannot de-anonymize a submission.",
      },
      {
        q: "What stops abuse of an anonymous channel?",
        a: "AI moderation flags abusive content before routing, and structured categories nudge feedback toward specifics. In practice, organizations see overwhelmingly constructive use, people want problems fixed, and this is the safest way to say them.",
      },
      {
        q: "How does two-way anonymous conversation work?",
        a: "Responders reply into the thread without ever seeing the author. The employee gets notified privately, can continue the conversation, and can choose to identify themselves at any point, it's always their call.",
      },
    ],
    related: ["employee-listening", "engagement-surveys", "pulse-surveys"],
  },
];

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}
