export const profile = {
  name: "Dwarakanath C",
  title: "AI Engineer | GCP Cloud Engineer",
  subtitle: "Senior Backend Engineer · Golang / Java · London",
  pitch:
    "I build production AI, cloud and automation on GCP: Cloud Run, Pub/Sub, BigQuery, Terraform, Vertex AI and Gemini.",
  location: "London, UK",
  phone: "+44 7979851621",
  email: "dwarakanathc45@gmail.com",
  linkedin: "https://www.linkedin.com/in/dwarakanathc/",
  resumeHref: "./Dwarakanath_Cloud_AI_Resume.pdf",
  website: "https://www.cgdwarakanath.com",
  summary:
    "Senior Backend Software Engineer and GCP Cloud Developer with 10+ years across backend development, event-driven microservices, and cloud/AI engineering, including 4+ years of hands-on Golang and 6+ years in Java/J2EE. I build high-throughput distributed systems with Go, Kafka, RabbitMQ, PostgreSQL, Redis, and Docker/Kubernetes for regulated platforms in financial services, travel, and FMCG. I currently design production AI platforms on GCP using Vertex AI, Gemini, Agent Engine, Document AI, RAG, BigQuery, Cloud Run, Pub/Sub, and Terraform across document intelligence, sales prioritisation, and cash allocation.",
};

export const whatIBuild = ["Cloud platforms", "AI agents", "Automation", "Data pipelines"];

export const focusing = [
  "Agentic AI architecture",
  "Production GenAI on Google Cloud",
  "Multi-agent orchestration",
  "RAG and tool-enabled agents",
  "Cloud-native reliability (DLQ, Terraform, observability)",
];

export const aiAgents = [
  {
    title: "Document Intelligence Agent",
    note: "Document AI + RAG over extracted SDS data in BigQuery.",
  },
  {
    title: "Prospect Prioritisation Agents",
    note: "Vertex AI Agent Engine: retrieve, estimate value, rank leads.",
  },
  {
    title: "Gmail Classification & Cash Allocation",
    note: "Gemini classifies finance mail; RAG matches remittances to invoices.",
  },
  {
    title: "Self-hosted Gemma on Cloud Run",
    note: "vLLM PoC for cost-efficient inference vs third-party APIs.",
  },
];

export const stats = [
  { value: "10+", label: "Years shipping production systems" },
  { value: "3", label: "AI platforms on GCP" },
  { value: "10k+", label: "Requests / minute at peak" },
  { value: "500k+", label: "Scheduled events / day" },
];

export const featured = [
  {
    id: "consumables",
    index: "01",
    title: "Consumables",
    eyebrow: "Document intelligence",
    role: "GCP Cloud Developer & AI Engineer",
    accent: "#3ee0c8",
    image: "./projects/consumables.png",
    summary:
      "Event-driven document intelligence that turns safety and chemical PDFs into structured analytics.",
    problem:
      "Safety and chemical PDFs arrived in Drive as files people had to open. Downstream analytics and agents needed structured rows, not blobs.",
    built:
      "Split a fast webhook path from a long-running Document AI worker. Drive notifications hit API Gateway and Cloud Run, Pub/Sub carries metadata, Document AI extracts entities, BigQuery stores rows, Cloud Storage archives the PDF. RAG sits on the extracted entities.",
    challenges:
      "Webhook timeouts vs slow Document AI, watch-channel expiry, and failures that must not vanish. Solved with Cloud Scheduler renewals and layered DLQs (GCS, BigQuery error rows, Pub/Sub retries).",
    result:
      "New PDFs become queryable BigQuery rows for Qlik and downstream agents, with a documented recovery path when a file fails.",
    architecture: [
      "Drive",
      "API Gateway",
      "Cloud Run",
      "Pub/Sub",
      "Document AI",
      "BigQuery",
      "DLQ / Monitoring",
    ],
    highlights: [
      "Document AI + machine learning extraction of chemical entities from SDS PDFs",
      "RAG over structured BigQuery rows so agents retrieve product context, not blobs",
      "Drive → API Gateway → Cloud Run → Pub/Sub → Document AI → BigQuery → Qlik",
      "Split architecture: fast webhook ingestion vs. long-running AI workers",
      "Multi-layer DLQs across GCS, BigQuery error rows, and Pub/Sub retry topics",
    ],
    stack: [
      "Document AI",
      "GCP Vertex AI",
      "RAG",
      "Machine Learning",
      "Agentic AI",
      "Cloud Run",
      "Pub/Sub",
      "BigQuery",
      "Terraform",
      "Python",
    ],
  },
  {
    id: "prospects",
    index: "02",
    title: "Prospect Prioritisation",
    eyebrow: "Multi-agent sales intelligence",
    role: "GCP Cloud Developer & AI Engineer",
    accent: "#6ea8ff",
    image: "./projects/prospects.png",
    summary:
      "Vertex AI agents rank EU sales prospects by assignment, worth and readiness.",
    problem:
      "Sales targeting was noisy when ranking included prospects that were not assigned through employee lead codes, plus broken views and KPI join gaps.",
    built:
      "A three-CTE BigQuery model (employee, occupation, prospect) plus three Vertex AI Agent Engine services: Data Retrieval (RAG + enrichment), Value Estimation (ML scoring), and Prioritisation. Gemini and Google ADK orchestrate and publish to Pub/Sub.",
    challenges:
      "Misrouted view dependencies, missing autoscaling, and formula errors in financial KPI tables. Fixed in Terraform and through structured data-quality reviews.",
    result:
      "Consultants only see assigned leads, scored and ordered, instead of an unfiltered prospect dump.",
    architecture: [
      "BigQuery",
      "Vertex AI Agents",
      "Gemini / ADK",
      "Pub/Sub",
      "Sales routing",
    ],
    highlights: [
      "Agentic AI on Vertex AI Agent Engine: retrieve, estimate value, prioritise",
      "RAG enrichment of prospect context before ranking",
      "Machine-learning value scores plus BigQuery 3-CTE assignment model",
      "Gemini + ADK multi-agent orchestration publishing to Pub/Sub",
      "Data-quality reviews on financial KPI tables: join gaps, outliers, formula errors",
    ],
    stack: [
      "Agentic AI",
      "GCP Vertex AI",
      "Agent Engine",
      "RAG",
      "Machine Learning",
      "Gemini",
      "Google ADK",
      "BigQuery",
      "Pub/Sub",
      "Python",
    ],
  },
  {
    id: "cash",
    index: "03",
    title: "AI Cash Allocation",
    eyebrow: "Autonomous finance agents",
    role: "AI Engineer",
    accent: "#f5c16c",
    image: "./projects/cash.png",
    summary:
      "Gemini classifies inbound finance mail; agents match remittances to invoices.",
    problem:
      "Credit control received remittances and finance mail that people had to read and apply by hand.",
    built:
      "Gmail watch events go to Pub/Sub and Cloud Run. Gemini on Vertex AI classifies the message into BigQuery. A second graph uses RAG over invoice history to propose cash allocation. Terraform, Cloud Scheduler and Secret Manager keep the watch alive.",
    challenges:
      "Mailbox watches expire, IAM has to stay tight, and matches must be grounded in real ledgers rather than guessed from the email body.",
    result:
      "Finance sees classified mail and suggested allocations with a BigQuery audit trail, instead of a pile of remittances.",
    architecture: [
      "Gmail",
      "Pub/Sub",
      "Cloud Run",
      "Gemini",
      "RAG / invoices",
      "BigQuery",
    ],
    highlights: [
      "Agentic invoice-matching and cash-allocation reasoning on Vertex AI",
      "RAG over invoice history so agents ground matches in real ledgers",
      "Machine-learning + Gemini classification of inbound credit-control mail",
      "Gmail watch → Pub/Sub → Cloud Run → BigQuery audit trail",
      "Terraform, Cloud Scheduler, and Secret Manager keep watches production-safe",
    ],
    stack: [
      "Agentic AI",
      "GCP Vertex AI",
      "RAG",
      "Machine Learning",
      "Gemini",
      "Google ADK",
      "Cloud Run",
      "Pub/Sub",
      "BigQuery",
      "Python",
    ],
  },
];

export const experience = [
  {
    company: "Rentokil Initial",
    place: "UK",
    role: "GCP Cloud Developer & AI Engineer",
    dates: "03/2026 - present",
    team: "Team of 8",
    project: "Cloud & AI Platform Engineering",
    points: [
      "Consumables: event-driven document intelligence from safety PDFs using Drive webhooks, API Gateway, Cloud Run, Pub/Sub, Document AI, BigQuery, and QlikCloud.",
      "Consumables reliability: split webhook ingestion from AI workers, RAG over BigQuery entities, and layered dead-letter recovery.",
      "EU Prospect Prioritisation: three-CTE BigQuery model so ranking includes only leads assigned through employee lead codes.",
      "Multi-agent sales intelligence: Vertex AI Agent Engine for retrieval/RAG, ML value estimation, and prioritisation with Gemini and Google ADK.",
      "AI Cash Allocation: Gemini classification of inbound credit-control mail plus RAG matching of remittances to invoices.",
      "Led a self-hosted Gemma PoC on Cloud Run GPU with vLLM, plus Terraform, autoscaling, and data-quality reviews.",
    ],
    tech: "GCP · Vertex AI · Agent Engine · Gemini · Document AI · RAG · Google ADK · BigQuery · Cloud Run · Pub/Sub · Terraform · Python · vLLM · Gemma",
  },
  {
    company: "Amex",
    place: "UK",
    role: "Senior Golang Developer",
    dates: "08/2024 - 04/2026",
    team: "Team of 7",
    project: "Global Loyalty Program",
    points: [
      "Built Golang microservices for loyalty enrolments and rewards handling millions of transactions daily.",
      "Designed REST APIs with net/http and Gorilla Mux, with deep unit-test coverage.",
      "Implemented Kafka event workflows for lifecycle, eligibility, and reward events with guaranteed delivery.",
      "Tuned services for 10,000+ requests/minute, low latency, and resilience.",
      "Used PostgreSQL, MongoDB, and Redis for transactional data, caching, and performance.",
      "Deployed on Docker/Kubernetes with health checks, resource limits, and autoscaling; led architecture discussions.",
    ],
    tech: "Golang · Kafka · PostgreSQL · Redis · Docker · Kubernetes · Elastic · Kibana · OpenShift Hydra",
  },
  {
    company: "Expedia",
    place: "US",
    role: "Golang Developer",
    dates: "05/2022 - 07/2024",
    team: "Team of 6",
    project: "Campaign Scheduler",
    points: [
      "Backend services in Go for campaign scheduling and engagement - 500,000+ scheduled events daily.",
      "RabbitMQ job queues and routing handling 100,000+ messages/day with retries and guaranteed delivery.",
      "Goroutines and channels for high-volume concurrent scheduling.",
      "REST APIs with Echo and net/http, plus timezone-aware scheduling across 50+ timezones and DST.",
      "Docker on AWS with Jenkins CI/CD; improved stability through observability.",
    ],
    tech: "Golang · RabbitMQ · Echo · AWS · Docker · MongoDB · Jenkins",
  },
  {
    company: "Aires Mobility",
    place: "US",
    role: "Golang Developer",
    dates: "09/2021 - 05/2022",
    team: "Team of 6",
    project: "Relocation - Benefits Management System",
    points: [
      "Backend APIs in Go with clean-architecture boundaries.",
      "Designed microservices, API contracts, and data models from scratch.",
      "Technical documentation plus unit and integration tests at 85%+ coverage.",
    ],
    tech: "Golang · Microservices · AWS · Docker · PostgreSQL",
  },
  {
    company: "Santander",
    place: "Spain",
    role: "Software Developer",
    dates: "03/2019 - 08/2021",
    team: "Team of 10",
    project: "iGTB Payment Service Hub (IPSH)",
    points: [
      "Java / Spring Boot REST services for enterprise banking and payments in a regulated environment.",
      "Drools-engine validation for financial rules and compliance.",
      "Country-specific mappings for SEPA, SWIFT, and local payment schemes.",
      "Agile + TDD with QA, compliance, and business partners.",
    ],
    tech: "Java 8 · Spring Boot · JPA · Docker · AWS · Swagger · PostgreSQL",
  },
];

export const earlier = [
  {
    title: "Interac e-Transfer (Mobile Application)",
    role: "Developer",
    dates: "07/2017 - 02/2019",
  },
  {
    title: "Branch Profitable Index (BPI)",
    role: "Developer",
    dates: "09/2015 - 06/2017",
  },
];

export const skillGroups = [
  {
    title: "Cloud",
    items: ["GCP", "Cloud Run", "Pub/Sub", "BigQuery", "IAM", "API Gateway", "Secret Manager"],
  },
  {
    title: "AI",
    items: ["Gemini", "Document AI", "Vertex AI Agent Engine", "Agentic AI", "RAG", "Google ADK"],
  },
  {
    title: "Infrastructure",
    items: ["Terraform", "Docker", "Kubernetes", "CI/CD", "Cloud Scheduler"],
  },
  {
    title: "Development",
    items: ["Python", "Golang", "Java / Spring Boot", "SQL", "REST APIs"],
  },
  {
    title: "Reliability",
    items: ["DLQ recovery", "Observability", "Autoscaling", "Data quality", "Load at 10k+ rpm"],
  },
];

export const education = [
  {
    title: "Master's in Computer Application (M.C.A)",
    place: "SVU, India",
    year: "2012",
  },
  {
    title: "Bachelor's in Computer Science (BSc)",
    place: "SVU, India",
    year: "2009",
  },
];

export const personalProjects = [
  {
    id: "lifehub",
    title: "LifeHub",
    status: "In progress",
    image: "./projects/lifehub.png",
    summary:
      "A personal life-operating system - todos, meetings, and notes in one place, with Gemini classifying what matters first.",
    story:
      "Todos are already end-to-end: FastAPI + Postgres, Gemini priority classification, a Next.js web app, and an Expo mobile client. Meetings (Google Calendar + notes) and real Google OAuth are next.",
    stack: ["Next.js", "Expo", "FastAPI", "Postgres", "Gemini", "Python", "TypeScript"],
  },
  {
    id: "mathsapp",
    title: "Maths App",
    status: "Shipped (v1)",
    image: "./projects/mathsapp.png",
    summary:
      "A Grade 1 Android learning app - place value, expanded form, ordinals, addition and subtraction - with Learn and Practice in every lesson.",
    story:
      "Built in Kotlin and Jetpack Compose. Each lesson explains the idea, then scores interactive exercises with instant green/red feedback. Next: remaining Grade 1 modules, persisted scores, and richer exercise types.",
    stack: ["Kotlin", "Jetpack Compose", "Material 3", "Android"],
  },
  {
    id: "aipulse",
    title: "The AI Pulse",
    status: "Shipping daily",
    image: "./bg-neural-galaxy.png",
    summary:
      "A personal daily brief for an AI engineer who intends to be a CEO - Groq filters the firehose, then a designed Word note lands in Gmail.",
    story:
      "Not a company newsletter. Models, agents, inference, capital, and regulation - scored for builder and CEO relevance, then written as one thesis, one action, and one deep cut.",
    stack: ["Python", "Groq", "OpenRouter", "Gmail", "LLMs"],
  },
];

export const futureApps = [
  {
    title: "LifeHub Meetings",
    note: "Google Calendar, meeting notes, and Google OAuth - the next LifeHub tab after Todos.",
  },
  {
    title: "Maths App - Grade 2+",
    note: "Remaining Grade 1 modules, saved scores, matching and drag-and-drop, then later grades.",
  },
  {
    title: "Family OS",
    note: "Shared calendar, chores, and a quiet AI assistant for the household - LifeHub grown into a family product.",
  },
  {
    title: "Personal CFO",
    note: "A private money graph: cashflow, goals, and an agent that explains the week without a bank-app maze.",
  },
];

export const awards = [
  "Best Performer of the Month - SmartLoyal",
  "AWS Certified Developer Associate - Dec 2023",
  "GCP Professional Cloud Architect - in progress",
  "Spring Boot and Microservices with Spring Cloud - Udemy",
  "GEM Award - Polaris, Excellent Performance",
  "Spot Excellence Award - Polaris",
  "Agile Software Development - Coursera",
];
