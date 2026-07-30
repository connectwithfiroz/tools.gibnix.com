// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Hero Section */}
      <section className="text-center space-y-3">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          About Gibnix Tools
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Fast, Reliable & Local-First Digital Utilities
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
          We build simple, high-performance web applications designed to solve daily workplace, HR, and document tasks directly inside your browser.
        </p>
      </section>

      {/* Core Values Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">
            🔒
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">100% Private</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your files, inputs, and documents are processed entirely in browser memory. Sensitive data never touches a remote server.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">
            ⚡
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Speed</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            No uploading or waiting for queue times. Computation runs at native device speeds using modern Web APIs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">
            🛠️
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Registration</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            All tools are completely free to use without mandatory sign-ups, accounts, or hidden paywalls.
          </p>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Why Client-Side Matters</h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Traditional web converters and generators upload your documents to third-party cloud servers, process them remotely, and send them back. This exposes confidential company records, financial invoices, and HR logs to security risks.
        </p>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          At <strong className="text-slate-900">tools.gibnix.com</strong>, we rewrite these utilities using WebAssembly, HTML5 APIs, and modern JavaScript engines. This guarantees that your data never leaves your computer or phone.
        </p>
      </section>

      {/* CTA Section */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-sm"
        >
          Explore All Free Tools →
        </Link>
      </div>
    </div>
  );
}