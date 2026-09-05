import { motion } from "framer-motion";
import { futureApps, personalProjects } from "../data/profile";

export function Personal() {
  return (
    <section id="personal" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Personal lab</p>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Personal projects
          <span className="text-cyan">.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-white/60">
          Things I build for my own life and for the next company — shipping now, and on the bench.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {personalProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="glass overflow-hidden rounded-3xl"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full border border-cyan/30 bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                  {project.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold">{project.title}</h3>
                <p className="mt-3 text-white/75">{project.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{project.story}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16">
          <p className="section-kicker">Coming next</p>
          <h3 className="mt-3 font-display text-3xl font-bold">Future apps</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {futureApps.map((app) => (
              <div key={app.title} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-display text-xl font-semibold">{app.title}</h4>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    Planned
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/60">{app.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
