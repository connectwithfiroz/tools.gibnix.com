// src/components/MainLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header */}
      <Header/>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm space-y-2">
          <p>© {new Date().getFullYear()} tools.gibnix.com — Privacy-first online web utilities.</p>
          <p className="text-xs text-slate-500">All data processing happens locally in your browser context.</p>
        </div>
      </footer>
    </div>
  );
}