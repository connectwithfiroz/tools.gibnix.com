import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AttendanceGenerator from './pages/AttendanceGenerator';
import ElectricalInvoiceGenerator from './pages/ElectricalInvoiceGenerator';

// A simple landing/fallback page for testing other routes
function CategoriesHome() {
  return (
    <div className="min-h-screen bg-slate-100 p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <a 
        href="/categories/attendance-generator" 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Go to Attendance Generator
      </a>
      <a 
        href="/categories/electrical-invoice-generator" 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        ElectricalInvoiceGenerator
      </a>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect empty root "/" to your categories page */}
        <Route path="/" element={<Navigate to="/categories" replace />} />
        
        {/* Categories Root */}
        <Route path="/categories" element={<CategoriesHome />} />
        
        {/* YOUR SPECIFIC ROUTE */}
        <Route 
          path="/categories/attendance-generator" 
          element={<AttendanceGenerator />} 
        />
        <Route path="/categories/electrical-invoice-generator" element={<ElectricalInvoiceGenerator />}/>
        
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/categories" replace />} />
      </Routes>
    </Router>
  );
}