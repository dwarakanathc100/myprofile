export function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070b14]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(62,224,200,0.10),transparent_42%),radial-gradient(ellipse_at_80%_20%,rgba(110,168,255,0.08),transparent_40%),linear-gradient(180deg,#070b14_0%,#05070d_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(159,216,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(159,216,255,0.09) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
        }}
      />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-signal/10 blur-3xl" />
    </div>
  );
}
