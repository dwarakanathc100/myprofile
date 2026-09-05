import { awards, education } from "../data/profile";

export function Awards() {
  return (
    <section className="relative z-10 px-5 py-16">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-8">
          <p className="section-kicker">Proof</p>
          <h2 className="mt-4 font-display text-3xl font-bold">Awards & certifications</h2>
          <ul className="mt-6 space-y-3 text-white/75">
            {awards.map((a) => (
              <li key={a} className="border-b border-white/5 pb-3">
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-3xl p-8">
          <p className="section-kicker">Foundation</p>
          <h2 className="mt-4 font-display text-3xl font-bold">Education</h2>
          <div className="mt-8 space-y-6">
            {education.map((e) => (
              <div key={e.title}>
                <div className="font-mono text-xs text-gold">{e.year}</div>
                <h3 className="mt-1 font-display text-xl">{e.title}</h3>
                <p className="text-white/50">{e.place}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
