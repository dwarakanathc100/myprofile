export const profile = {
  name: "Dwarakanath C",
  title: "GCP Cloud Developer & AI Engineer",
  subtitle: "Senior Backend Engineer · Golang / Java",
  location: "London, UK",
  phone: "+44 7979851621",
  email: "dwarakanathc45@gmail.com",
  resumeHref: "./Resume_Dwarakanath_Cloud_developer.docx",
  summary:
    "Senior Backend Software Engineer with 10+ years across backend development, event-driven microservices, and cloud/AI engineering — including 4+ years of hands-on Golang and 6+ years in Java/J2EE. I build high-throughput distributed systems with Go, Kafka, RabbitMQ, PostgreSQL, Redis, and Docker/Kubernetes for regulated platforms in financial services, travel, and FMCG. Now extending that foundation into Google Cloud and applied AI: serverless data pipelines, multi-agent systems, BigQuery analytics, and LLM-powered automation.",
};

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
    summary:
      "An event-driven document-intelligence platform that turns incoming safety and chemical PDFs into structured analytics — without anyone opening a file.",
    story:
      "When a PDF lands in a watched Drive folder, the platform wakes itself. A webhook hits API Gateway, Cloud Run publishes a metadata event, and a separate processor downloads the document, runs Document AI extraction, writes rows to BigQuery, and archives the original to Cloud Storage. Failures never vanish — they fan out through layered dead-letter paths so operations can recover.",
    highlights: [
      "Split architecture: fast webhook ingestion vs. long-running Document AI workers",
      "Drive push notifications → API Gateway → Cloud Run → Pub/Sub → Document AI → BigQuery",
      "Cloud Scheduler renews Drive watch channels so the pipeline never goes silent",
      "Structured chemical-component rows power Qlik dashboards and downstream workflows",
      "Multi-layer DLQs across GCS, BigQuery error rows, and Pub/Sub retry topics",
    ],
    stack: [
      "GCP",
      "Cloud Run",
      "API Gateway",
      "Pub/Sub",
      "Document AI",
      "BigQuery",
      "Cloud Storage",
      "Terraform",
      "Python",
      "FastAPI",
    ],
  },
  {
    id: "prospects",
    index: "02",
    title: "Prospect Prioritisation",
    eyebrow: "Multi-agent sales intelligence",
    role: "GCP Cloud Developer & AI Engineer",
    accent: "#6ea8ff",
    summary:
      "A three-agent Vertex AI system that ranks EU sales prospects by worth, assignment, and readiness — so consultants chase the right leads first.",
    story:
      "I built the EU prospect pipeline in BigQuery as a three-CTE query (employee, occupation, prospect) so ranking only includes leads strictly assigned via employee lead codes. On top of that sit three Vertex AI Agent Engine services: a Data Retrieval Agent that consolidates prospect context, a Value Estimation Agent that scores worth, and a Prioritisation Agent that ranks and routes to sales. I also hunted down broken view dependencies, missing autoscaling, and KPI join gaps that were quietly poisoning targeting.",
    highlights: [
      "Three Vertex AI agents: Data Retrieval, Value Estimation, Prioritisation",
      "BigQuery 3-CTE ranking model scoped to assigned employee lead codes",
      "ADK multi-agent orchestration publishing enriched scores to Pub/Sub",
      "Diagnosed Terraform and view-dependency failures across the data platform",
      "Data-quality reviews on financial KPI tables: join gaps, outliers, formula errors",
    ],
    stack: [
      "Vertex AI Agent Engine",
      "Gemini",
      "BigQuery",
      "Pub/Sub",
      "Cloud Run",
      "Python",
      "SQL",
      "Terraform",
      "QlikCloud",
    ],
  },
  {
    id: "cash",
    index: "03",
    title: "AI Cash Allocation",
    eyebrow: "Autonomous finance agents",
    role: "AI Engineer",
    accent: "#f5c16c",
    summary:
      "A credit-control intelligence layer that classifies inbound finance mail and matches payments to invoices with Vertex AI agents — cash applied, not chased.",
    story:
      "Inbound mailbox events trigger Cloud Run orchestrators over Pub/Sub. A classification path reads the message, labels it with Gemini on Vertex AI, and lands structured results in BigQuery. A second agent graph performs invoice matching and cash-allocation reasoning so finance teams see suggested applications instead of a pile of remittances. Infrastructure, watches, and alerts are Terraform-managed so the mailbox never loses its signal.",
    highlights: [
      "Gmail watch + Pub/Sub + Cloud Run orchestrator for inbound credit-control mail",
      "Gemini on Vertex AI classifies finance correspondence into actionable categories",
      "Invoice-matching agents propose cash allocation instead of manual reconciliation",
      "Results written to BigQuery for credit-control analytics and audit",
      "Terraform, Cloud Scheduler, and Secret Manager keep watches and IAM production-safe",
    ],
    stack: [
      "Vertex AI",
      "Gemini",
      "Google ADK",
      "Cloud Run",
      "Pub/Sub",
      "BigQuery",
      "Secret Manager",
      "Terraform",
      "Python",
    ],
  },
];

export const experience = [
  {
    company: "Rentokil Initial",
    place: "UK",
    role: "GCP Cloud Developer & AI Engineer",
    dates: "03/2026 — present",
    team: "Team of 8",
    project: "EU Prospect Prioritisation & Cloud/AI Platform Engineering",
    points: [
      "Design cloud-native data engineering and AI automation on GCP for sales, operations, and BI across UK and EU markets.",
      "Delivered the EU Prospect Prioritisation pipeline in BigQuery SQL with a three-CTE structure (employee, occupation, prospect).",
      "Built three Vertex AI Agent Engine agents: Value Estimation, Data Retrieval, and Prioritisation.",
      "Designed an end-to-end document automation pipeline: Drive webhooks, API Gateway, Cloud Run, Pub/Sub, Document AI, BigQuery, QlikCloud.",
      "Led a PoC of a self-hosted Gemma LLM on Cloud Run GPU with vLLM as a cost-efficient alternative to third-party APIs.",
      "Ran structured data-quality assessments on financial KPI datasets and BigQuery tables.",
    ],
    tech: "GCP · BigQuery · Cloud Run · Pub/Sub · Document AI · IAM · Terraform · Python · SQL · Vertex AI · QlikCloud · Docker",
  },
  {
    company: "Amex",
    place: "UK",
    role: "Senior Golang Developer",
    dates: "08/2024 — 04/2026",
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
    dates: "05/2022 — 07/2024",
    team: "Team of 6",
    project: "Campaign Scheduler",
    points: [
      "Backend services in Go for campaign scheduling and engagement — 500,000+ scheduled events daily.",
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
    dates: "09/2021 — 05/2022",
    team: "Team of 6",
    project: "Relocation — Benefits Management System",
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
    dates: "03/2019 — 08/2021",
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
    dates: "07/2017 — 02/2019",
  },
  {
    title: "Branch Profitable Index (BPI)",
    role: "Developer",
    dates: "09/2015 — 06/2017",
  },
];

export const skillGroups = [
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
    title: "AI & Intelligence",
    items: [
      "Vertex AI",
      "Document AI",
      "Agent Engine",
      "vLLM",
      "Gemma",
      "BigQuery SQL",
      "QlikCloud",
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

export const awards = [
  "Best Performer of the Month — SmartLoyal",
  "AWS Certified Developer Associate — Dec 2023",
  "GCP Professional Cloud Architect — in progress",
  "Spring Boot and Microservices with Spring Cloud — Udemy",
  "GEM Award — Polaris, Excellent Performance",
  "Spot Excellence Award — Polaris",
  "Agile Software Development — Coursera",
];
