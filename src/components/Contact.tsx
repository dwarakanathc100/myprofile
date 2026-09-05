import { FormEvent, useState } from "react";
import { profile } from "../data/profile";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("send failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative z-10 px-5 py-24">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-[2.2rem] border border-cyan/20 bg-gradient-to-br from-[#0c1c22] via-[#0b1220] to-[#120e0a] p-10 shadow-glow md:p-12">
          <p className="section-kicker">Contact me</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Tell me what you want to build.
          </h2>
          <p className="mt-6 text-white/60">
            Roles, platforms, or a side project. Leave your name and message and it lands in my
            inbox.
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
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/80"
            >
              LinkedIn
            </a>
            <a
              href={profile.resumeHref}
              download="Dwarakanath_Cloud_AI_Resume.pdf"
              className="rounded-full border border-gold/40 px-6 py-3 text-sm text-gold"
            >
              Download resume
            </a>
          </div>
          <p className="mt-8 font-mono text-xs text-white/35">{profile.location}</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="glass rounded-[2.2rem] p-8 md:p-10"
        >
          <input type="hidden" name="_subject" value="New message from cgdwarakanath.com" />
          <input type="hidden" name="_template" value="table" />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <label className="block text-sm text-white/70">
            Name
            <input
              required
              name="name"
              type="text"
              placeholder="Your name"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-cyan"
            />
          </label>
          <label className="mt-5 block text-sm text-white/70">
            Email
            <input
              required
              name="email"
              type="email"
              placeholder="you@company.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-cyan"
            />
          </label>
          <label className="mt-5 block text-sm text-white/70">
            Message
            <textarea
              required
              name="message"
              rows={6}
              placeholder="What should we talk about?"
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-cyan"
            />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-7 w-full rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          {status === "sent" && (
            <p className="mt-4 text-sm text-cyan">Sent. I will get back to you.</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-rose">
              Could not send just now. Email me at {profile.email} instead.
            </p>
          )}
        </form>
      </div>
      <footer className="mx-auto mt-10 max-w-6xl pb-8 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
        Dwarakanath C · Built with React, Three.js, and intent
      </footer>
    </section>
  );
}
