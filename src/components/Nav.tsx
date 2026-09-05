import { useState } from "react";
import { profile } from "../data/profile";

const links = [
  ["Work", "#work"],
  ["Personal", "#personal"],
  ["Experience", "#experience"],
  ["Stack", "#stack"],
  ["Contact", "#contact"],
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-[#070b14]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          DC<span className="text-cyan">.</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-white/70 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-cyan">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition hover:border-cyan hover:text-cyan"
          >
            LinkedIn
          </a>
          <a
            href={profile.resumeHref}
            download
            className="rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan transition hover:bg-cyan hover:text-ink"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-4 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-4 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-4 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="glass mx-4 mb-3 rounded-2xl p-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-sm text-white/80">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="py-1">
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex gap-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-full border border-white/15 px-3 py-2 text-center text-xs uppercase tracking-[0.16em] text-white/70"
            >
              LinkedIn
            </a>
            <a
              href={profile.resumeHref}
              download
              className="flex-1 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-2 text-center text-xs uppercase tracking-[0.16em] text-cyan"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
