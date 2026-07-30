// src/pages/CategoriesHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoriesHome() {
  const tools = [
    {
      title: 'Attendance Generator',
      description: 'Quickly generate and export attendance sheets for teams or classes.',
      link: '/categories/attendance-generator',
      badge: 'Popular'
    },
    {
      title: 'Electrical Invoice Generator',
      description: 'Create detailed electrical work estimates and commercial invoices client-side.',
      link: '/categories/electrical-invoice-generator',
      badge: 'Utility'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-extrabold mb-2">Free Online Utility Tools</h1>
        <p className="text-blue-100 max-w-2xl">
          Fast, browser-based tools designed to work instantly without sending your sensitive data to remote servers.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-slate-900">{tool.title}</h2>
              <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                {tool.badge}
              </span>
            </div>
            <p className="text-slate-600 text-sm mb-6">{tool.description}</p>
            <Link
              to={tool.link}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
            >
              Open Tool →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}