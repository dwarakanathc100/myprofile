import { earlier, experience } from "../data/profile";

export function Experience() {
  return (
    <section id="experience" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Trajectory</p>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          A decade in production.
        </h2>
        <div className="mt-14 space-y-6">
          {experience.map((job) => (
            <article key={job.company + job.dates} className="glass rounded-3xl p-7 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold">
                    {job.company}
                    <span className="text-white/35"> · {job.place}</span>
                  </h3>
                  <p className="mt-1 text-cyan">{job.role}</p>
                  <p className="mt-1 text-sm text-white/50">{job.project}</p>
                </div>
                <div className="text-right font-mono text-xs text-white/40">
                  <div>{job.dates}</div>
                  <div className="mt-1">{job.team}</div>
                </div>
              </div>
              <ul className="mt-6 space-y-2 text-sm leading-relaxed text-white/70">
                {job.points.map((p) => (
                  <li key={p}>— {p}</li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-gold/80">
                {job.tech}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {earlier.map((e) => (
            <div key={e.title} className="glass rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
                Earlier
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{e.title}</h3>
              <p className="mt-1 text-sm text-white/55">
                {e.role} · {e.dates}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
