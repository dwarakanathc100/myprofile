import { motion } from "framer-motion";
import { profile, stats } from "../data/profile";
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
            className="section-kicker mb-5"
          >
            London · Open to Cloud & AI roles
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-display text-[clamp(1.45rem,7vw,2.6rem)] font-extrabold leading-none tracking-tight"
          >
            Dwarakanath&nbsp;C<span className="text-cyan">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-5 text-xl text-ice/90 sm:text-2xl"
          >
            {profile.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24 }}
            className="mt-4 max-w-xl text-white/65"
          >
            {profile.pitch}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-sm text-white/40"
          >
            {profile.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#work"
              className="rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-glow"
            >
              View projects
            </a>
            <a
              href={profile.resumeHref}
              download="Dwarakanath_Cloud_AI_Resume.pdf"
              className="rounded-full border border-gold/40 px-6 py-3 text-sm text-gold"
            >
              Download resume
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/80"
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
    </section>
  );
}
