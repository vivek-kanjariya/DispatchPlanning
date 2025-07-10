import React from "react";

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] dark:bg-gray-900 text-white relative">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>

      <div className="bg-[#FF6A3D] px-3 py-1 text-sm rounded rotate-12 absolute top-1/2 transform -translate-y-1/2">
        Page Not Found
      </div>

      <a
        href="https://dispatch-planning.vercel.app/"
        className="mt-20 relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>
        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current dark:bg-gray-900 dark:border-orange-500">
          Go Home
        </span>
      </a>
    </main>
  );
}
