import { motion } from "framer-motion";
import { aiStack, profile, stats } from "../data/profile";
import { ErrorBoundary } from "./ErrorBoundary";
import { HeroStage } from "./HeroStage";

export function Hero() {
  return (
    <section id="top" className="relative z-10 min-h-screen px-5 pb-12 pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-kicker mb-6"
          >
            London · Remote-ready · Production AI
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="whitespace-nowrap font-display text-[1.7rem] font-extrabold leading-none tracking-tight sm:text-4xl lg:text-[2.6rem]"
          >
            Dwarakanath&nbsp;C<span className="text-cyan">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-xl text-xl text-ice/90 sm:text-2xl"
          >
            {profile.title}
            <span className="block text-base text-white/55 sm:text-lg">{profile.subtitle}</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mt-6 max-w-xl text-white/65"
          >
            I design systems that think - agentic AI, RAG, machine learning on Vertex AI, and
            high-throughput backends for regulated industries.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {aiStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan/25 bg-cyan/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan"
              >
                {item}
              </span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-glow transition hover:translate-y-[-2px]"
            >
              Enter the work
            </a>
            <a
              href="#personal"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition hover:border-cyan hover:text-cyan"
            >
              Personal projects
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition hover:border-gold hover:text-gold"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
        <ErrorBoundary fallback={<div className="h-[380px] rounded-3xl bg-panel" />}>
          <HeroStage />
        </ErrorBoundary>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-display text-3xl font-bold text-gold">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-white/45">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap gap-3">
        {[
          ["#consumables", "01 Consumables"],
          ["#prospects", "02 Prospect Prioritisation"],
          ["#cash", "03 AI Cash Allocation"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 transition hover:border-cyan hover:text-cyan"
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
