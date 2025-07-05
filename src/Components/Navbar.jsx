import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    darkMode ? html.classList.add("dark") : html.classList.remove("dark");
  }, [darkMode]);

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/white-isometric-factory.png"
            alt="Logo"
            className="h-8 w-auto"
          />
          <span className="text-2xl font-semibold text-gray-800 dark:text-white">
            Dispatch Optimization
          </span>
        </Link>

        {/* Menu Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium rounded-lg bg-gray-50 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
<li>
  <Link
    to="/dashboard"
    className="block py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 
               text-gray-700 hover:text-white hover:bg-blue-600 
               dark:text-gray-300 dark:hover:text-white dark:hover:bg-blue-600"
  >
    Dashboard
  </Link>
</li>
<li>
  <Link
    to="/"
    className="block py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 
               text-gray-700 hover:text-white hover:bg-blue-600 
               dark:text-gray-300 dark:hover:text-white dark:hover:bg-blue-600"
  >
    Home
  </Link>
</li>

          </ul>
        </div>

        {/* Dark Mode + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 rounded text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
}
