import { skillGroups } from "../data/profile";

export function Skills() {
  return (
    <section id="stack" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Architecture & technologies</p>
        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Capabilities, not a logo wall.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-cyan">{g.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{g.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
