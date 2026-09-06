import { motion } from "framer-motion";
import { featured } from "../data/profile";
import { ArchFlow } from "./ArchFlow";

const blocks = [
  ["Problem", "problem"],
  ["What I built", "built"],
  ["Challenges", "challenges"],
  ["Result", "result"],
] as const;

export function Featured() {
  return (
    <section id="work" className="relative z-10 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Featured engineering</p>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Production AI on GCP.
        </h2>
        <p className="mt-4 max-w-2xl text-white/60">
          Three platforms I designed and delivered: document intelligence, multi-agent prospect
          ranking, and cash allocation. Problem, build, architecture, result.
        </p>

        <div className="mt-14 space-y-10">
          {featured.map((project) => (
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
        </div>
      </div>
    </section>
  );
}
