// src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Translate Aksara", path: "/aksara" },
    { name: "Tentang", path: "/tentang" },
    { name: "Buku Tamu", path: "/guestbook" },
  ];

  return (
    <header className="bg-blue-900 border-b border-gray-500 px-6 py-4 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-light text-white tracking-wide hover:text-blue-400 transition-colors duration-200"
        >
          Kamus Jawa
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-white hover:text-gray-400 text-sm font-medium tracking-wide transition-colors duration-200`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-white w-0 transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Login desktop */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none p-2 rounded-lg hover:bg-blue-800 transition"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? "rotate-45 top-3" : "top-1"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 top-3 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? "-rotate-45 top-3" : "top-5"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-blue-900 rounded-xl overflow-hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-white hover:bg-blue-800 transition"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block px-6 py-4 text-white bg-blue-800 hover:bg-blue-900 rounded-xl transition"
          >
            Login
          </Link>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
