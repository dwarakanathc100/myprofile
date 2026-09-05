import { skillGroups } from "../data/profile";

export function Skills() {
  return (
    <section id="stack" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Operating system</p>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          The stack behind the spectacle.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.title} className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-cyan">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/[0.04] px-3 py-1.5 text-sm text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
