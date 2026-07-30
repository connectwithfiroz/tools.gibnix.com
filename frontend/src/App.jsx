// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import LandingPage from './pages/LandingPage';
import AttendanceGenerator from './pages/AttendanceGenerator';
import ElectricalInvoiceGenerator from './pages/ElectricalInvoiceGenerator';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';
import QuoteEstimateBuilder from './pages/QuoteEstimateBuilder';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout Wraps All Pages */}
        <Route element={<MainLayout />}>
          
          {/* 1. Root Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* 2. Standard Category/Tool Routes */}
          <Route path="/attendance/generator" element={<AttendanceGenerator />} />
          <Route path="/invoice/electrical-invoice" element={<ElectricalInvoiceGenerator />} />
          <Route path="/invoice/quote-estimate-builder" element={<QuoteEstimateBuilder />} />

          

        </Route>

        {/* 3. Catch-all: Redirect unknown URLs to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}