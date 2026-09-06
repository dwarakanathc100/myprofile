export function ArchFlow({ steps, accent }: { steps: string[]; accent: string }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span
            className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/80"
            style={{ borderColor: `${accent}55` }}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-white/30" aria-hidden>
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
