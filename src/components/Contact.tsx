import { profile } from "../data/profile";

export function Contact() {
  return (
    <section id="contact" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.2rem] border border-cyan/20 bg-gradient-to-br from-[#0c1c22] via-[#0b1220] to-[#120e0a] p-10 shadow-glow md:p-16">
        <p className="section-kicker">Open channel</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          If the system should think harder,
          <span className="text-cyan"> call me.</span>
        </h2>
        <p className="mt-6 max-w-xl text-white/60">
          AI platforms, GCP data planes, and high-throughput backends. London-based, comfortable
          across time zones.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink"
          >
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/80"
          >
            {profile.phone}
          </a>
          <a
            href={profile.resumeHref}
            download
            className="rounded-full border border-gold/40 px-6 py-3 text-sm text-gold"
          >
            Download resume
          </a>
        </div>
        <p className="mt-8 font-mono text-xs text-white/35">{profile.location}</p>
      </div>
      <footer className="mx-auto mt-10 max-w-6xl pb-8 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
        Dwarakanath C · Built with React, Three.js, and intent
      </footer>
    </section>
  );
}
