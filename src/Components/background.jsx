export default function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 -z-50 h-full w-full
        [background:radial-gradient(120%_120%_at_50%_10%,#faefe9_20%,#cbd5e1_100%)]
        dark:[background:radial-gradient(125%_125%_at_50%_10%,#0f172a_40%,#6366f1_100%)]"
    />
  );
}
