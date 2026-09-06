import { earlier, experience } from "../data/profile";

type ClientEngagement = {
  name: string;
  current?: boolean;
  role: string;
  dates: string;
  team: string;
  project: string;
  points: string[];
  tech: string;
};

function Engagement({
  role,
  project,
  dates,
  team,
  points,
  tech,
  client,
  current,
}: {
  role: string;
  project: string;
  dates: string;
  team: string;
  points: string[];
  tech: string;
  client?: string;
  current?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-cyan">{role}</p>
          <p className="mt-1 text-sm text-white/50">
            {client ? (
              <>
                Client · {client}
                {current ? (
                  <span className="ml-2 rounded-full border border-cyan/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">
                    Current
                  </span>
                ) : null}
                <span className="text-white/35"> · {project}</span>
              </>
            ) : (
              project
            )}
          </p>
        </div>
        <div className="text-right font-mono text-xs text-white/40">
          <div>{dates}</div>
          <div className="mt-1">{team}</div>
        </div>
      </div>
      <ul className="mt-6 space-y-2 text-sm leading-relaxed text-white/70">
        {points.map((p) => (
          <li key={p}>- {p}</li>
        ))}
      </ul>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-gold/80">{tech}</p>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Trajectory</p>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          A decade in production.
        </h2>
        <div className="mt-14 space-y-6">
          {experience.map((job) => {
            const clients = "clients" in job ? (job.clients as ClientEngagement[]) : undefined;

            return (
              <article key={job.company + job.dates} className="glass rounded-3xl p-7 md:p-10">
                <h3 className="font-display text-2xl font-bold">
                  {job.company}
                  <span className="text-white/35"> · {job.place}</span>
                </h3>
                {clients ? (
                  <>
                    <p className="mt-1 font-mono text-xs text-white/40">{job.dates}</p>
                    <div className="mt-8 space-y-8">
                      {clients.map((client) => (
                        <Engagement
                          key={client.name}
                          role={client.role}
                          project={client.project}
                          dates={client.dates}
                          team={client.team}
                          points={client.points}
                          tech={client.tech}
                          client={client.name}
                          current={client.current}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <Engagement
                      role={job.role}
                      project={job.project}
                      dates={job.dates}
                      team={job.team}
                      points={job.points}
                      tech={job.tech}
                    />
                  </div>
                )}
              </article>
            );
          })}
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
