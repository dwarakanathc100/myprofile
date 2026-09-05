export const profile = {
  name: "Dwarakanath C",
  title: "GCP Cloud Developer & AI Engineer",
  subtitle: "Senior Backend Engineer · Golang / Java",
  location: "London, UK",
  phone: "+44 7979851621",
  email: "dwarakanathc45@gmail.com",
  linkedin: "https://www.linkedin.com/in/dwarakanathc/",
  resumeHref: "./Resume_Dwarakanath_Cloud_developer.docx",
  summary:
    "Senior Backend Software Engineer with 10+ years across backend development, event-driven microservices, and cloud/AI engineering - including 4+ years of hands-on Golang and 6+ years in Java/J2EE. I build high-throughput distributed systems with Go, Kafka, RabbitMQ, PostgreSQL, Redis, and Docker/Kubernetes for regulated platforms in financial services, travel, and FMCG. Now extending that foundation into Google Cloud and applied AI: agentic multi-agent systems, RAG pipelines, machine learning on Vertex AI, Document AI, serverless data planes, BigQuery analytics, and LLM-powered automation.",
};

export const aiStack = [
  "Agentic AI",
  "RAG",
  "Machine Learning",
  "GCP Vertex AI",
  "Gemini",
  "Document AI",
  "Agent Engine",
  "vLLM",
  "Gemma",
  "LangGraph / ADK",
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
      "An event-driven document-intelligence platform that turns incoming safety and chemical PDFs into structured analytics - without anyone opening a file.",
    story:
      "When a PDF lands in a watched Drive folder, the platform wakes itself. A webhook hits API Gateway, Cloud Run publishes a metadata event, and a separate processor downloads the document, runs Document AI extraction, writes rows to BigQuery, and archives the original to Cloud Storage. A RAG layer over the extracted entities lets downstream agents query chemical context instead of raw PDFs. Failures never vanish - they fan out through layered dead-letter paths so operations can recover.",
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
      "An agentic Vertex AI system that ranks EU sales prospects by worth, assignment, and readiness - so consultants chase the right leads first.",
    story:
      "I built the EU prospect pipeline in BigQuery as a three-CTE query (employee, occupation, prospect) so ranking only includes leads strictly assigned via employee lead codes. On top of that sit three Vertex AI Agent Engine services: a Data Retrieval Agent (RAG + enrichment), a Value Estimation Agent (ML scoring), and a Prioritisation Agent that ranks and routes to sales. I also hunted down broken view dependencies, missing autoscaling, and KPI join gaps that were quietly poisoning targeting.",
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
      "An agentic credit-control layer that classifies inbound finance mail and matches payments to invoices with Vertex AI - cash applied, not chased.",
    story:
      "Inbound mailbox events trigger Cloud Run orchestrators over Pub/Sub. A classification path reads the message, labels it with Gemini on Vertex AI, and lands structured results in BigQuery. A second agentic graph uses RAG over invoice history to match remittances and propose cash allocation. Infrastructure, watches, and alerts are Terraform-managed so the mailbox never loses its signal.",
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
    project: "EU Prospect Prioritisation & Cloud/AI Platform Engineering",
    points: [
      "Design cloud-native data engineering and AI automation on GCP for sales, operations, and BI across UK and EU markets.",
      "Delivered the EU Prospect Prioritisation pipeline in BigQuery SQL with a three-CTE structure (employee, occupation, prospect).",
      "Built three Vertex AI Agent Engine agents: Value Estimation, Data Retrieval, and Prioritisation - agentic AI with RAG and ML scoring.",
      "Designed an end-to-end document automation pipeline: Drive webhooks, API Gateway, Cloud Run, Pub/Sub, Document AI, BigQuery, QlikCloud.",
      "Led a PoC of a self-hosted Gemma LLM on Cloud Run GPU with vLLM as a cost-efficient alternative to third-party APIs.",
      "Ran structured data-quality assessments on financial KPI datasets and BigQuery tables.",
    ],
    tech: "Agentic AI · RAG · Machine Learning · GCP Vertex AI · Gemini · Document AI · Agent Engine · BigQuery · Cloud Run · Pub/Sub · Terraform · Python",
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
    title: "AI & Intelligence",
    items: [
      "Agentic AI",
      "RAG",
      "Machine Learning",
      "GCP Vertex AI",
      "Vertex AI Agent Engine",
      "Gemini",
      "Document AI",
      "Google ADK",
      "LLM inference (vLLM, Gemma)",
      "Prompt evaluation",
    ],
  },
  {
    title: "Languages",
    items: ["Golang", "Java / Spring Boot / JPA", "Python", "SQL"],
  },
  {
    title: "Backend & APIs",
    items: ["net/http", "Gorilla Mux", "Gin", "Echo", "Spring Boot", "REST"],
  },
  {
    title: "Events",
    items: ["Kafka", "RabbitMQ", "Pub/Sub", "Async workflows"],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "Oracle", "BigQuery"],
  },
  {
    title: "Cloud & Platform",
    items: [
      "GCP Cloud Run",
      "IAM",
      "Terraform",
      "API Gateway",
      "AWS",
      "OpenShift Hydra",
      "Jenkins",
      "Spinnaker",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    title: "Quality",
    items: ["Unit testing", "BDD / Cucumber", "Zap Logger", "Splunk", "Elastic", "Kibana"],
  },
  {
    title: "Practice",
    items: [
      "Microservices",
      "Event-driven architecture",
      "Clean architecture",
      "Agile / Scrum",
      "Code reviews",
    ],
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
