export function BackgroundBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 65% 50% at 50% 15%, black 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 50% at 50% 15%, black 20%, transparent 85%)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[140px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}