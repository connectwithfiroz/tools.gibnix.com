import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Indian States with GST Codes
const INDIAN_STATES = [
  { code: '24', name: 'Gujarat' },
  { code: '27', name: 'Maharashtra' },
  { code: '07', name: 'Delhi' },
  { code: '09', name: 'Uttar Pradesh' },
  { code: '33', name: 'Tamil Nadu' },
  { code: '29', name: 'Karnataka' },
];

// Dummy inventory for quick selection
const DUMMY_PRODUCTS = [
  { desc: 'Polycab 1.5 Sqmm FR Wire (90m Roll)', hsn: '8544', gstRate: 18, price: 1450 },
  { desc: 'Syska 9W LED Bulb (Cool Day Light)', hsn: '9405', gstRate: 5, price: 90 },
  { desc: 'Anchor Roma 6A One-Way Switch', hsn: '8536', gstRate: 18, price: 32 },
  { desc: 'Havells 1200mm Ceiling Fan (Decco)', hsn: '8414', gstRate: 18, price: 2850 }
];

export default function ElectricalInvoiceGenerator() {
  const [invoiceMeta, setInvoiceMeta] = useState({
    invoiceNo: 'INV/2026-27/0042',
    invoiceDate: new Date().toISOString().split('T')[0],
    supplierName: 'Shreeji Electricals & Electronics',
    supplierGSTIN: '24AAAAA1111A1Z1', // Gujarat GSTIN
    supplierState: 'Gujarat',
    supplierStateCode: '24',
    supplierAddress: 'Shop 4, Sector 16 Market, Gandhinagar, Gujarat',
    
    buyerName: 'Rathod Electrical Contractors',
    buyerGSTIN: '24BBBBB2222B2Z2',
    buyerState: 'Gujarat',
    buyerStateCode: '24',
    buyerAddress: 'A-102, GIDC Electronic Estate, Sector 26, Gandhinagar',
    
    isReverseCharge: 'No'
  });

  const [items, setItems] = useState([
    { id: 1, description: 'Polycab 1.5 Sqmm FR Wire (90m Roll)', hsnCode: '8544', qty: 10, rate: 1450, gstRate: 18 },
    { id: 2, description: 'Syska 9W LED Bulb (Cool Day Light)', hsnCode: '9405', qty: 50, rate: 90, gstRate: 5 }
  ]);

  // Determine Inter-state vs Intra-state transactions
  const isInterState = invoiceMeta.supplierStateCode !== invoiceMeta.buyerStateCode;

  // Add Item handler
  const addItem = (presetIndex = 0) => {
    const preset = DUMMY_PRODUCTS[presetIndex];
    setItems([...items, {
      id: Date.now(),
      description: preset.desc,
      hsnCode: preset.hsn,
      qty: 1,
      rate: preset.price,
      gstRate: preset.gstRate
    }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Calculations
  const calculateTaxableTotal = () => {
    return items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  };

  const calculateGST = () => {
    let cgstSum = 0;
    let sgstSum = 0;
    let igstSum = 0;

    items.forEach(item => {
      const taxableVal = item.qty * item.rate;
      const gstAmount = (taxableVal * item.gstRate) / 100;
      
      if (isInterState) {
        igstSum += gstAmount;
      } else {
        cgstSum += gstAmount / 2;
        sgstSum += gstAmount / 2;
      }
    });

    return { cgst: cgstSum, sgst: sgstSum, igst: igstSum };
  };

  const taxes = calculateGST();
  const grandTotal = calculateTaxableTotal() + taxes.cgst + taxes.sgst + taxes.igst;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      <Header>
        <button 
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          <span>Print / Save PDF</span>
        </button>
      </Header>

      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8">
        
        {/* LEFT COLUMN: Controls & Form Fields */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          
          {/* SEO Optimized Context */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h1 className="text-xl font-bold text-slate-900 mb-1">GST Electrical Invoice Generator</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create GST-compliant invoices for electrical & electronics stores, contractors, and traders in India. Select preset electrical goods below to speed up your work.
            </p>
            
            {/* Quick Presets */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-slate-700 block mb-2">⚡ Quick Add Common Items:</span>
              <div className="flex flex-wrap gap-2">
                {DUMMY_PRODUCTS.map((p, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => addItem(idx)}
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded border border-slate-200 transition"
                  >
                    + {p.desc.split(' ')[0]} ({p.gstRate}%)
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Supplier Info Block */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b pb-2">1. Supplier (Your Details)</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Shop/Company Name</label>
              <input 
                type="text" 
                value={invoiceMeta.supplierName} 
                onChange={(e) => setInvoiceMeta({...invoiceMeta, supplierName: e.target.value})}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Supplier GSTIN</label>
                <input 
                  type="text" 
                  value={invoiceMeta.supplierGSTIN} 
                  onChange={(e) => setInvoiceMeta({...invoiceMeta, supplierGSTIN: e.target.value})}
                  className="w-full text-xs p-2.5 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">State & State Code</label>
                <select 
                  value={invoiceMeta.supplierStateCode} 
                  onChange={(e) => {
                    const stateObj = INDIAN_STATES.find(s => s.code === e.target.value);
                    setInvoiceMeta({...invoiceMeta, supplierStateCode: stateObj.code, supplierState: stateObj.name});
                  }}
                  className="w-full text-xs p-2.5 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {INDIAN_STATES.map(s => <option key={s.code} value={s.code}>{s.name} ({s.code})</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Buyer Details Block */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b pb-2">2. Buyer (Recipient Details)</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Buyer Legal Name</label>
              <input 
                type="text" 
                value={invoiceMeta.buyerName} 
                onChange={(e) => setInvoiceMeta({...invoiceMeta, buyerName: e.target.value})}
                className="w-full text-xs p-2.5 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Buyer GSTIN (Optional)</label>
                <input 
                  type="text" 
                  value={invoiceMeta.buyerGSTIN} 
                  onChange={(e) => setInvoiceMeta({...invoiceMeta, buyerGSTIN: e.target.value})}
                  className="w-full text-xs p-2.5 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Place of Supply State</label>
                <select 
                  value={invoiceMeta.buyerStateCode} 
                  onChange={(e) => {
                    const stateObj = INDIAN_STATES.find(s => s.code === e.target.value);
                    setInvoiceMeta({...invoiceMeta, buyerStateCode: stateObj.code, buyerState: stateObj.name});
                  }}
                  className="w-full text-xs p-2.5 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {INDIAN_STATES.map(s => <option key={s.code} value={s.code}>{s.name} ({s.code})</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Indian Standard Tax Invoice Preview */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0">
          
          {/* GST Header Layout */}
          <div className="flex justify-between items-start border-b pb-6">
            <div>
              <h2 className="text-lg font-bold text-blue-800 tracking-tight">{invoiceMeta.supplierName}</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">{invoiceMeta.supplierAddress}</p>
              <p className="text-xs font-bold text-slate-700 mt-2">GSTIN: {invoiceMeta.supplierGSTIN}</p>
              <p className="text-xs text-slate-500">State: {invoiceMeta.supplierState} (Code: {invoiceMeta.supplierStateCode})</p>
            </div>
            <div className="text-right">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-wide">TAX INVOICE</h1>
              <p className="text-xs font-bold text-slate-600 mt-2">Invoice No: {invoiceMeta.invoiceNo}</p>
              <p className="text-xs text-slate-500">Date: {invoiceMeta.invoiceDate}</p>
            </div>
          </div>

          {/* Billing Info Split Screen */}
          <div className="grid grid-cols-2 gap-4 py-6 border-b text-xs">
            <div>
              <h3 className="font-bold text-slate-400 mb-2 uppercase tracking-wider">Details of Receiver (Billed To)</h3>
              <p className="font-bold text-slate-800">{invoiceMeta.buyerName}</p>
              <p className="text-slate-500 mt-1">{invoiceMeta.buyerAddress}</p>
              {invoiceMeta.buyerGSTIN && <p className="font-semibold text-slate-700 mt-2">GSTIN: {invoiceMeta.buyerGSTIN}</p>}
              <p className="text-slate-500">State: {invoiceMeta.buyerState} (Code: {invoiceMeta.buyerStateCode})</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between">
              <div>
                <p className="font-semibold text-slate-600">Place of Supply:</p>
                <p className="font-bold text-slate-800 mt-0.5">{invoiceMeta.buyerState} ({invoiceMeta.buyerStateCode})</p>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Tax Scheme: <strong className="text-emerald-700">{isInterState ? "IGST (Inter-State)" : "CGST + SGST (Intra-State)"}</strong>
              </div>
            </div>
          </div>

          {/* Dynamic Item Entry Table */}
          <table className="w-full text-left text-xs border-collapse mt-6">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-2">#</th>
                <th className="py-2.5 px-2">Item Description</th>
                <th className="py-2.5 px-2">HSN</th>
                <th className="py-2.5 px-2 text-right">Qty</th>
                <th className="py-2.5 px-2 text-right">Rate (₹)</th>
                <th className="py-2.5 px-2 text-right">GST %</th>
                <th className="py-2.5 px-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="py-3 px-2 font-medium text-slate-400">{index + 1}</td>
                  <td className="py-3 px-2">
                    <input 
                      type="text" 
                      value={item.description} 
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full bg-transparent font-medium text-slate-800 outline-none focus:bg-white focus:border px-1 rounded print:border-none print:p-0"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <input 
                      type="text" 
                      value={item.hsnCode} 
                      onChange={(e) => updateItem(item.id, 'hsnCode', e.target.value)}
                      className="w-12 bg-transparent text-slate-600 outline-none text-center focus:bg-white focus:border rounded print:border-none"
                    />
                  </td>
                  <td className="py-3 px-2 text-right">
                    <input 
                      type="number" 
                      value={item.qty} 
                      onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                      className="w-10 bg-transparent text-right outline-none font-semibold text-slate-800 focus:bg-white focus:border rounded print:border-none"
                    />
                  </td>
                  <td className="py-3 px-2 text-right">
                    <input 
                      type="number" 
                      value={item.rate} 
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                      className="w-16 bg-transparent text-right outline-none font-semibold text-slate-800 focus:bg-white focus:border rounded print:border-none"
                    />
                  </td>
                  <td className="py-3 px-2 text-right text-slate-500">
                    <select 
                      value={item.gstRate} 
                      onChange={(e) => updateItem(item.id, 'gstRate', Number(e.target.value))}
                      className="bg-transparent outline-none focus:bg-white focus:border rounded print:appearance-none print:border-none"
                    >
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-slate-900">
                    {(item.qty * item.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Calculations Summary Sheet */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
            <div className="md:col-span-6 space-y-2 text-slate-500 pt-4">
              <p>✔ Tax payable on Reverse Charge basis: **{invoiceMeta.isReverseCharge}**</p>
              <div className="p-2.5 bg-slate-50 border rounded-lg text-[10px]">
                <strong className="text-slate-700 block mb-0.5">Note:</strong>
                GST rates: Wires & Switches are 18%, LED Bulbs are 5%. Input tax credit can be claimed under standard guidelines.
              </div>
            </div>
            
            <div className="md:col-span-6 bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-2.5">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Value:</span>
                <span className="font-semibold">₹{calculateTaxableTotal().toFixed(2)}</span>
              </div>
              
              {isInterState ? (
                <div className="flex justify-between text-slate-600">
                  <span>IGST Rate:</span>
                  <span className="font-semibold">₹{taxes.igst.toFixed(2)}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-slate-600">
                    <span>CGST:</span>
                    <span className="font-semibold">₹{taxes.cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>SGST:</span>
                    <span className="font-semibold">₹{taxes.sgst.toFixed(2)}</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between text-base font-extrabold text-slate-950 border-t pt-2.5">
                <span>Grand Total (INR):</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Verification Sign-off Box */}
          <div className="mt-12 flex justify-between items-end text-xs pt-8 border-t border-dashed">
            <div>
              <p className="font-semibold text-slate-800">Terms & Conditions:</p>
              <p className="text-slate-500 text-[10px] mt-1">1. Goods once sold will not be taken back.</p>
              <p className="text-slate-500 text-[10px]">2. Interest @18% will be charged if payment is delayed.</p>
            </div>
            <div className="text-right pb-2">
              <p className="text-[10px] text-slate-400 mb-10">Authorized Signatory Stamp</p>
              <p className="font-bold border-t pt-1.5 text-slate-800">For {invoiceMeta.supplierName}</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}