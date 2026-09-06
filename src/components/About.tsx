import { profile } from "../data/profile";

export function About() {
  return (
    <section id="about" className="relative z-10 px-5 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-3xl p-8 shadow-card md:p-12">
          <p className="section-kicker">Signal</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Backend gravity.
            <span className="text-cyan"> AI altitude.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">{profile.summary}</p>
          <p className="mt-5 leading-relaxed text-white/55">
            Comfortable in distributed, cross-time-zone teams. I contribute to architecture, code
            quality, and delivery - then I keep going until the system is observable, cheaper, and
            harder to break.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            ["Now", "Agentic AI, RAG, and Conversational Analytics on GCP — sales, documents, cash, portfolio and P&L."],
            ["Before", "Loyalty, campaign scheduling, payments - Go and Java at scale."],
            ["Mode", "Event-driven. Clean architecture. Reviews that raise the floor."],
            ["Based", `${profile.location} · ${profile.email}`],
          ].map(([k, v]) => (
            <div key={k} className="glass rounded-2xl p-6">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-gold">{k}</div>
              <p className="mt-2 text-white/75">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
