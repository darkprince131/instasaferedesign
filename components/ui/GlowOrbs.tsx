export function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          top: -150,
          left: "10%",
          background: "rgba(59,130,246,0.18)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 420,
          height: 420,
          top: 80,
          right: "5%",
          background: "rgba(139,92,246,0.14)",
        }}
      />
    </div>
  );
}
