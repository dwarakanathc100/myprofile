import { profile } from "../data/profile";

const links = [
  ["Work", "#work"],
  ["Personal", "#personal"],
  ["Experience", "#experience"],
  ["Stack", "#stack"],
  ["Contact", "#contact"],
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          DC<span className="text-cyan">.</span>
        </a>
        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-xs text-white/70 sm:text-sm md:gap-8">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-cyan">
              {label}
            </a>
          ))}
        </nav>
        <a
          href={profile.resumeHref}
          download
          className="rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan transition hover:bg-cyan hover:text-ink"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
