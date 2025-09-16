import { useState } from "react";

// Mock Link component for demonstration - replace with your actual react-router-dom Link
const Link = ({ to, children, className, onClick }) => (
  <a href={to} className={className} onClick={onClick}>
    {children}
  </a>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white hover:text-gray-400 text-sm font-medium tracking-wide transition-colors duration-200 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-200"></span>
          </Link>
          <Link
            to="/aksara"
            className="text-white hover:text-gray-400 text-sm font-medium tracking-wide transition-colors duration-200 relative group"
          >
            Translate Aksara
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-200"></span>
          </Link>
                    <Link
            to="/tentang"
            className="text-white hover:text-gray-400 text-sm font-medium tracking-wide transition-colors duration-200 relative group"
          >
            Tentang
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-200"></span>
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span 
                className={`absolute block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                  isOpen ? 'rotate-45 top-3' : 'top-1'
                }`}
              />
              <span 
                className={`absolute block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out top-3 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                  isOpen ? '-rotate-45 top-3' : 'top-5'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu with Smooth Animation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-blue-900">
          <Link
            to="/"
            className="block px-6 py-4 text-white hover:bg-blue-800 hover:pl-8 transition-all duration-200 transform"
            onClick={() => setIsOpen(false)}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </span>
          </Link>
          <Link
            to="/aksara"
            className="block px-6 py-4 text-white hover:bg-blue-800 hover:pl-8 transition-all duration-200 transform"
            onClick={() => setIsOpen(false)}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Translate Aksara
            </span>
          </Link>
          <Link
            to="/tentang"
            className="block px-6 py-4 text-white hover:bg-blue-800 hover:pl-8 transition-all duration-200 transform"
            onClick={() => setIsOpen(false)}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Tentang
            </span>
          </Link>
        </nav>
      </div>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-[-1] md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}