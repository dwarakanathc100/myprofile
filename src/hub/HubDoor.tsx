import { hubHref } from "./routes";

export function HubDoor() {
  return (
    <a
      href={hubHref()}
      aria-label="LifeHub"
      className="fixed bottom-3 left-3 z-50 font-mono text-[10px] tracking-widest text-white/20 transition hover:text-white/55"
    >
      lh
    </a>
  );
}
