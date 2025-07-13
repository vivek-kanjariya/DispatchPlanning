import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    const html = document.documentElement;
    darkMode ? html.classList.add("dark") : html.classList.remove("dark");
  }, [darkMode]);

  // Scroll direction detection
  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-gray-700 shadow-sm 
      bg-gray-50 dark:bg-gray-800 transition-all duration-500 ease-in-out
      ${
        scrollDirection === "down"
          ? "-translate-y-20 opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/white-isometric-factory.png"
            alt="Logo"
            className="h-8 w-auto transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Menu Links */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            menuOpen ? "block animate-fade-in-down" : "hidden"
          } w-full md:block md:w-auto mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium rounded-lg bg-gray-50 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
            {[
              { path: "/dashboard", label: "Dispatch" },
              { path: "/sop", label: "Space Optimization" },
              { path: "/", label: "Home" },
            ].map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="block py-2 px-4 rounded-md text-sm font-medium transition-all duration-300
                  text-gray-700 hover:text-white hover:bg-blue-600
                  dark:text-gray-300 dark:hover:text-white dark:hover:bg-blue-600"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dark Mode + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 rounded text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition duration-300"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M1 1h15M1 7h15M1 13h15"}
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
