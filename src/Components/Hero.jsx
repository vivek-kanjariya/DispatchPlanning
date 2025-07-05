export default function Hero() {
  return (
<section className="flex items-center justify-center h-[70vh] px-4">
  <div className="text-left">
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 dark:text-white md:text-5xl lg:text-6xl flex flex-wrap items-center gap-2">
      Space Optimization
      <img
        src="/387b79a937fecaee7f2d3bc8a0e3081e.png"
        alt="Signature of Vivek K."
        className="h-8 md:h-10 lg:h-12 object-contain dark:invert"
      />
      <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-800">
        Dispatch Planning
      </span>
    </h1>
    <p className="text-gray-600 dark:text-gray-300 max-w-lg mt-2">
      AI-powered platform to optimize your warehouse storage, vehicle loading,
      and dispatch sequencing with real-time insights.
    </p>
  </div>
</section>

  );
}
