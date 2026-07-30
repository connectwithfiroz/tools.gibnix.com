// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirects to homepage with search query string URL
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-lg sm:text-xl font-bold text-blue-600 shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-black">G</span>
            <span className="tracking-tight">tools.gibnix.com</span>
          </Link>

          {/* DESKTOP SEARCH BAR */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-1 max-w-xs items-center relative"
          >
            <input
              type="text"
              placeholder="Search digital tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-xs rounded-full pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
            <svg 
              className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
            <Link to="/privacy" className="hover:text-blue-600 transition">Privacy</Link>
          </nav>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative px-2">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 text-slate-800 text-sm rounded-lg pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-5 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>

            <nav className="flex flex-col space-y-1 font-semibold text-sm text-slate-700 px-2">
              <Link to="/" className="p-2 rounded-lg hover:bg-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" className="p-2 rounded-lg hover:bg-slate-100" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link to="/privacy" className="p-2 rounded-lg hover:bg-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}