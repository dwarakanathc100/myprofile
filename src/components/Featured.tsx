import { motion } from "framer-motion";
import { featured } from "../data/profile";
import { ProjectOrb } from "./ProjectOrb";

export function Featured() {
  return (
    <section id="work" className="relative z-10 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Selected AI systems</p>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-6xl">
          Work that should stop
          <span className="text-cyan"> the scroll.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/60">
          Three production AI platforms I engineered as an AI / GCP engineer — document
          intelligence, multi-agent prospect ranking, and autonomous cash allocation.
        </p>

        <div className="mt-16 space-y-10">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="glass overflow-hidden rounded-[2rem] shadow-card"
            >
              <div
                className={`grid lg:grid-cols-[0.9fr_1.3fr] ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div
                  className="relative min-h-[240px]"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${project.accent}22, transparent 60%)`,
                  }}
                >
                  <ProjectOrb accent={project.accent} kind={project.id} />
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-white/40">{project.index}</span>
                    <span
                      className="font-mono text-[11px] uppercase tracking-[0.22em]"
                      style={{ color: project.accent }}
                    >
                      {project.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-4xl font-bold">{project.title}</h3>
                  <p className="mt-2 text-sm text-white/45">{project.role}</p>
                  <p className="mt-5 text-lg text-white/80">{project.summary}</p>
                  <p className="mt-4 leading-relaxed text-white/55">{project.story}</p>
                  <ul className="mt-6 space-y-2 text-sm text-white/70">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span style={{ color: project.accent }}>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
