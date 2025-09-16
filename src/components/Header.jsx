// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { supabase } from "../supabaseClient";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-blue-900 border-b border-gray-500 px-6 py-4 relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Judul */}
        <Link to="/" className="group">
          <h1 className="text-2xl font-light text-white tracking-wide group-hover:text-blue-400 transition-colors duration-200">
            Kamus Jawa
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="text-white hover:text-gray-400 text-sm font-medium tracking-wide relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link
            to="/aksara"
            className="text-white hover:text-gray-400 text-sm font-medium tracking-wide relative group"
          >
            Translate Aksara
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link
            to="/tentang"
            className="text-white hover:text-gray-400 text-sm font-medium tracking-wide relative group"
          >
            Tentang
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-200"></span>
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="ml-6 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Login
          </Link>
        </nav>

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
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-blue-900">
          <Link
            to="/"
            className="block px-6 py-4 text-white hover:bg-blue-800"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/aksara"
            className="block px-6 py-4 text-white hover:bg-blue-800"
            onClick={() => setIsOpen(false)}
          >
            Translate Aksara
          </Link>
          <Link
            to="/tentang"
            className="block px-6 py-4 text-white hover:bg-blue-800"
            onClick={() => setIsOpen(false)}
          >
            Tentang
          </Link>
          <Link
            to="/login"
            className="block px-6 py-4 text-white bg-green-600 hover:bg-green-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-[-1] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
