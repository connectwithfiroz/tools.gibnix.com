// src/pages/PrivacyPage.jsx
import React from 'react';

export default function PrivacyPage() {
  const lastUpdated = "July 30, 2026";

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Header */}
      <header className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Compliance & Transparency
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1 mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: {lastUpdated}
        </p>
      </header>

      {/* Policy Content */}
      <article className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        
        {/* Core Guarantee Callout */}
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl text-blue-900">
          <h3 className="font-bold text-base mb-1">TL;DR — Client-Side Data Guarantee</h3>
          <p className="text-xs sm:text-sm text-blue-800">
            We do not collect, store, transmit, or inspect any files, text, invoice items, or attendance data you process on <strong>tools.gibnix.com</strong>. All processing is executed locally inside your web browser.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">1. Data Processing Architecture</h2>
          <p>
            Our web utilities operate on a <strong>client-side execution model</strong>. When you generate an invoice, edit a table, or convert a file, the operations are handled using JavaScript and WebAssembly running inside your web browser's isolated sandbox.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">2. Local Browser Storage</h2>
          <p>
            Certain tools may save temporary draft data (such as invoice preferences or recent entries) into your browser's <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs">localStorage</code> or <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs">IndexedDB</code>. This data resides solely on your physical device and can be cleared at any time by wiping your browser history or cache.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">3. Analytics & Usage Logs</h2>
          <p>
            To monitor site performance and improve user experience, we may collect aggregated, non-personally identifiable technical telemetry (such as page visit counts, device type, and operating system). These metrics do not contain or link to any document content you create.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">4. Third-Party Links</h2>
          <p>
            Our website may contain links to external sites or external resource libraries. We are not responsible for the privacy practices or content of third-party websites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">5. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically as new tools and web standards are integrated into the platform. Any adjustments will be reflected with an updated revision date.
          </p>
        </section>

        <section className="border-t border-slate-200 pt-6 space-y-2">
          <h2 className="text-xl font-bold text-slate-900">Contact Us</h2>
          <p className="text-sm text-slate-600">
            If you have questions about our local-first privacy model or platform security, reach out to us at{' '}
            <a href="mailto:support@gibnix.com" className="text-blue-600 font-medium underline">
              support@gibnix.com
            </a>.
          </p>
        </section>

      </article>
    </div>
  );
}