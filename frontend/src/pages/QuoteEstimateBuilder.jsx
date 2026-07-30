// src/pages/QuoteEstimateBuilder.jsx
import React, { useState } from 'react';

export default function QuoteEstimateBuilder() {
  const [clientName, setClientName] = useState('Acme Global Solutions');
  const [taxRate, setTaxRate] = useState(18);
  const [items, setItems] = useState([
    { description: 'UI/UX Wireframing & Prototyping', rate: 75, hours: 10 },
    { description: 'Frontend React & Tailwind Integration', rate: 90, hours: 25 },
  ]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === 'description' ? value : parseFloat(value) || 0;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { description: 'New Service Item', rate: 50, hours: 1 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.rate * item.hours, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="space-y-8">
      {/* 1. SEO HEADER & SIDEBAR INFO */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Finance & Utility</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Client Quote & Estimate Builder
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Create professional itemized quotes and billing estimates for client proposals. 100% private and generated locally inside your browser.
          </p>
        </div>
        
        <button
          onClick={() => window.print()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm shrink-0 flex items-center gap-2"
        >
          <span>🖨️</span>
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* 2. MAIN TOOL WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT FORM SECTION */}
        <section className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Estimate Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Client Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tax / VAT Rate (%)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-700 uppercase">Line Items</h3>
              <button
                onClick={addItem}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                + Add Item
              </button>
            </div>

            {items.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                  placeholder="Item description"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                />
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Rate ($)</span>
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                      className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Hours / Qty</span>
                    <input
                      type="number"
                      value={item.hours}
                      onChange={(e) => handleItemChange(idx, 'hours', e.target.value)}
                      className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded-lg mt-3 text-sm"
                    title="Remove Item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PREVIEW DOCUMENT SECTION */}
        <section className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-white p-6 sm:p-8 shadow-md border border-slate-200 rounded-2xl min-h-[600px]">
            
            {/* DOCUMENT PREVIEW */}
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                <div>
                  <span className="text-2xl font-black text-blue-600 tracking-tight">ESTIMATE</span>
                  <p className="text-xs text-slate-500 mt-1">Prepared for: <strong className="text-slate-800">{clientName}</strong></p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-emerald-600 font-semibold mt-1">Status: Draft Proposal</p>
                </div>
              </div>

              {/* TABLE WRAPPER FOR MOBILE SCROLL */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-slate-900 uppercase">
                      <th className="p-3 rounded-l-lg">Description</th>
                      <th className="p-3">Rate</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3 text-right rounded-r-lg">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td className="p-3 font-medium text-slate-900">{item.description}</td>
                        <td className="p-3">${item.rate.toFixed(2)}</td>
                        <td className="p-3">{item.hours}</td>
                        <td className="p-3 text-right font-semibold">${(item.rate * item.hours).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TOTALS SUMMARY */}
              <div className="w-full max-w-xs ml-auto space-y-2 pt-4 border-t border-slate-200 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax ({taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-900">
                  <span>Grand Total:</span>
                  <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}