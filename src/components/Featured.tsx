import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { featured } from "../data/profile";
import { ArchFlow } from "./ArchFlow";

const blocks = [
  ["Problem", "problem"],
  ["What I built", "built"],
  ["Challenges", "challenges"],
  ["Result", "result"],
] as const;

const filters = ["All", "Intelligence", "Agents", "Analytics"] as const;
type Filter = (typeof filters)[number];

export function Featured() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const visibleProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    return featured.filter((project) => {
      const matchesFilter = filter === "All" || project.category === filter;
      const haystack = [project.title, project.eyebrow, project.summary, ...project.stack]
        .join(" ")
        .toLowerCase();
      return matchesFilter && (!term || haystack.includes(term));
    });
  }, [filter, query]);

  return (
    <section id="work" className="relative z-10 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Featured engineering</p>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Production AI on GCP.
        </h2>
        <p className="mt-4 max-w-2xl text-white/60">
          Six systems I designed and delivered: document intelligence, multi-agent prospect
          ranking, cash allocation, and three BigQuery conversational analytics agents. Problem,
          build, architecture, result.
        </p>

        <div className="glass mt-8 rounded-2xl p-4 md:flex md:items-center md:justify-between md:gap-5">
          <div className="flex flex-wrap items-center gap-2" aria-label="Filter case studies">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
                  filter === item
                    ? "border-cyan bg-cyan text-ink"
                    : "border-white/10 text-white/60 hover:border-cyan/50 hover:text-cyan"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="mt-4 block md:mt-0 md:w-72">
            <span className="sr-only">Search case studies</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search GCP, RAG, BigQuery..."
              className="w-full rounded-xl border border-white/10 bg-ink/45 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan"
            />
          </label>
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40" aria-live="polite">
          Showing {visibleProjects.length} of {featured.length} case studies
          {filter !== "All" ? ` · ${filter}` : ""}
          {query ? ` · matching “${query.trim()}”` : ""}
        </p>

        <div className="mt-14 space-y-10">
          {visibleProjects.map((project) => (
            <motion.article
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="glass overflow-hidden rounded-[2rem] shadow-card"
            >
              <div className="relative h-48 overflow-hidden md:h-64">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.eyebrow}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                    {project.index} · {project.eyebrow}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-bold">{project.title}</h3>
                </div>
              </div>
              <div className="p-7 md:p-10">
                <p className="text-lg text-white/80">{project.summary}</p>
                <ArchFlow steps={project.architecture} accent={project.accent} />
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {blocks.map(([label, key]) => (
                    <div key={key}>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                        {label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{project[key]}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
          {visibleProjects.length === 0 && (
            <div className="glass rounded-3xl p-8 text-center">
              <p className="font-display text-2xl font-bold">No case studies match that yet.</p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setQuery("");
                }}
                className="mt-4 rounded-full border border-cyan/40 px-4 py-2 text-sm text-cyan transition hover:bg-cyan hover:text-ink"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
