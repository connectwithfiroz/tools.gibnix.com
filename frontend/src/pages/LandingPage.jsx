// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ALL_TOOLS, CATEGORIES } from '../data/toolsData';

export default function LandingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [search, setSearch] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Keep local search input synced if URL search param changes (e.g., header search submission)
  useEffect(() => {
    setSearch(queryParam);
  }, [queryParam]);

  // Handle local search input change and update URL
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  // Filter tools based on search text (title, description, keywords) & selected category
  const filteredTools = ALL_TOOLS.filter((tool) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      tool.title.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.keywords?.some((k) => k.toLowerCase().includes(searchLower));

    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 py-4">
      {/* HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          100% Free & Client-Side
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Fast, Secure Digital Tools for Daily Tasks
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Process your files, invoices, and documents right inside your browser. No data ever leaves your device.
        </p>

        {/* HERO SEARCH BAR */}
        <div className="pt-2 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search tools (e.g., invoice, pdf, attendance)..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm text-sm"
          />
        </div>
      </section>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-slate-200 pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TOOLS GRID */}
      <section>
        {filteredTools.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No tools found matching "{search}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {tool.category}
                    </span>
                    {tool.isPopular && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-medium">
                        Popular
                      </span>
                    )}
                    {tool.isComingSoon && (
                      <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-medium">
                        Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                {tool.isComingSoon ? (
                  <button
                    disabled
                    className="w-full bg-slate-100 text-slate-400 py-2 rounded-lg font-semibold text-sm cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <Link
                    to={tool.path}
                    className="w-full text-center bg-slate-900 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition"
                  >
                    Use Tool →
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}