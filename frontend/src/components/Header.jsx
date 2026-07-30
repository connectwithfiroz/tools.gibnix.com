import React from 'react';

export default function Header() {
  return (
     <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white tracking-wider shadow-sm">G</div>
          <span className="text-lg font-bold tracking-tight text-slate-900">tool.gibnix.com</span>
        </div>

      </header>
  );
}