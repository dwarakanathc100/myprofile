import { aiAgents, focusing, whatIBuild } from "../data/profile";

export function Focus() {
  return (
    <section className="relative z-10 px-5 pb-8">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
        <div className="glass rounded-3xl p-7">
          <p className="section-kicker">What I build</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {whatIBuild.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan/25 bg-cyan/5 px-3 py-1.5 text-sm text-cyan"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="section-kicker mt-8">Currently focusing on</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {focusing.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div id="agents" className="glass rounded-3xl p-7">
          <p className="section-kicker">AI & agentic systems</p>
          <h3 className="mt-3 font-display text-2xl font-bold">Agents I have shipped</h3>
          <ul className="mt-5 space-y-4">
            {aiAgents.map((agent) => (
              <li key={agent.title}>
                <p className="font-medium text-white/90">{agent.title}</p>
                <p className="mt-1 text-sm text-white/55">{agent.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
