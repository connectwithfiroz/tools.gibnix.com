import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AttendanceGenerator() {
  // 1. Core State Matrix - Maps exactly to the layout requirements
  const [docData, setDocData] = useState({
    companyName: 'YOUR COMPANY NAME HERE',
    month: 'August',
    year: '2026',
    employeeName: 'John Doe',
    designation: 'Senior Systems Engineer',
    phone: '+91 9876543210',
    deptName: 'Information Technology Division',
    deptAddress: 'Plot No. 12, Tech Park Phase 1, Electronic Zone, Sector 26, Gandhinagar, Gujarat 382026',
    holidayString: 'Weekly Off: 2, 9, 16, 23, 30 | Public Holiday (Independence Day): 15'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // 2. Hydrate workspace from persistent local storage on boot
  useEffect(() => {
    const saved = localStorage.getItem('gibnix_attendance_workspace');
    if (saved) {
      try {
        setDocData(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading cached workspace state", e);
      }
    }
  }, []);

  // 3. Keep cache updated as user types directly in the table
  const updateField = (field, value) => {
    const updated = { ...docData, [field]: value };
    setDocData(updated);
    localStorage.setItem('gibnix_attendance_workspace', JSON.stringify(updated));
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Connects directly to our backend server framework endpoint
      const response = await fetch('http://localhost:5000/api/generate-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(docData)
      });

      if (!response.ok) throw new Error("Backend compilation breakdown");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const linkElement = document.createElement("a");
      linkElement.href = downloadUrl;
      linkElement.download = `Attendance_${docData.employeeName.replace(/\s+/g, '_')}.docx`;
      document.body.appendChild(linkElement);
      linkElement.click();
      linkElement.remove();
    } catch (err) {
      alert("Error generating file. Check if backend server.js is running on port 5000.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-800">

      {/* Platform Header Navigation Bar */}
      <Header/>

      {/* Main Layout Container splitting workspace into dual workflows */}
      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8">

        {/* LEFT COLUMN: SEO Context and Dynamic Instruction Panel (4 Cols) */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Free HR Utility</span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1 mb-3">Interactive Attendance Sheet Generator</h1>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Eliminate manual formatting completely. Build professional corporate compliance log sheets instantly. Clean, optimized formulas ensure absolute alignment inside standard print safe boundaries.
            </p>
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase mb-2">💡 Quick UI Instructions:</h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Click anywhere directly on the document template preview on the right to edit text values inline.</li>
                <li>Changes are automatically stored locally inside your browser security scope.</li>
              </ul>
            </div>
          </div>


        </section>

        {/* RIGHT COLUMN: Interactive Document Sandbox (8 Cols) */}
        <section className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full max-w-[800px] bg-white p-6 shadow-xl border border-slate-200 rounded-xl min-h-[1000px] overflow-x-auto">

            {/* START DOC TABLE WRAPPER */}
            <table className="w-full border-collapse border-2 border-black text-black font-sans text-sm tracking-tight">
              <tbody>

                {/* Header Row: Company Identity */}
                <tr>
                  <td colSpan="5" className="border border-black p-3 bg-neutral-100 text-center font-bold text-lg">
                    <input
                      type="text"
                      value={docData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      className="w-full text-center bg-transparent font-bold focus:outline-none focus:bg-amber-50 cursor-edit"
                    />
                  </td>
                </tr>

                {/* Subheader Row: Targeting Context Period */}
                <tr>
                  <td colSpan="5" className="border border-black p-2 bg-neutral-50 text-center font-bold">
                    <div className="flex items-center justify-center space-x-2">
                      <span>Attendance sheet for the month of</span>
                      <input
                        type="text"
                        value={docData.month}
                        onChange={(e) => updateField('month', e.target.value)}
                        className="w-16 text-center bg-transparent border-b border-dashed border-neutral-400 font-bold focus:outline-none focus:bg-amber-50"
                      />
                      <span>-</span>
                      <input
                        type="text"
                        value={docData.year}
                        onChange={(e) => updateField('year', e.target.value)}
                        className="w-14 text-center bg-transparent border-b border-dashed border-neutral-400 font-bold focus:outline-none focus:bg-amber-50"
                      />
                    </div>
                  </td>
                </tr>

                {/* Row: Employee Metadata Line */}
                <tr>
                  <td colSpan="5" className="border border-black p-2 align-middle font-medium">
                    <div className="flex items-center">
                      <span className="font-bold shrink-0 mr-1">Name of Employee: -</span>
                      <input
                        type="text"
                        value={docData.employeeName}
                        onChange={(e) => updateField('employeeName', e.target.value)}
                        className="flex-1 bg-transparent focus:outline-none focus:bg-amber-50"
                      />
                    </div>
                  </td>
                </tr>

                {/* Split Row: Designation & Core Identity Numbers */}
                <tr>
                  <td colSpan="2" className="border border-black p-2 font-medium w-1/2">
                    <div className="flex items-center">
                      <span className="font-bold shrink-0 mr-1">Designation: -</span>
                      <input
                        type="text"
                        value={docData.designation}
                        onChange={(e) => updateField('designation', e.target.value)}
                        className="flex-1 bg-transparent focus:outline-none focus:bg-amber-50"
                      />
                    </div>
                  </td>
                  <td colSpan="3" className="border border-black p-2 font-medium w-1/2">
                    <div className="flex items-center">
                      <span className="font-bold shrink-0 mr-1">Contact no: -</span>
                      <input
                        type="text"
                        value={docData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="flex-1 bg-transparent focus:outline-none focus:bg-amber-50"
                      />
                    </div>
                  </td>
                </tr>

                {/* Row: Department Name Mapping */}
                <tr>
                  <td colSpan="5" className="border border-black p-2 font-medium">
                    <div className="flex items-center">
                      <span className="font-bold shrink-0 mr-1">Department Name: -</span>
                      <input
                        type="text"
                        value={docData.deptName}
                        onChange={(e) => updateField('deptName', e.target.value)}
                        className="w-full bg-transparent focus:outline-none focus:bg-amber-50"
                      />
                    </div>
                  </td>
                </tr>

                {/* Row: Location Context Address Block */}
                <tr>
                  <td colSpan="5" className="border border-black p-2 font-medium">
                    <div className="flex items-center">
                      <span className="font-bold shrink-0 mr-1">Address: -</span>
                      <input
                        type="text"
                        value={docData.deptAddress}
                        onChange={(e) => updateField('deptAddress', e.target.value)}
                        className="w-full bg-transparent focus:outline-none focus:bg-amber-50"
                      />
                    </div>
                  </td>
                </tr>

                {/* --- NEW HOLIDAY CONFIGURATION BLOCK (Integrated into the table layout) --- */}
                <tr className="bg-slate-50">
                  <td colSpan="5" className="border border-black p-3">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      🛠️ Live Holiday Configuration (Edits preview & download file)
                    </label>
                    <textarea
                      value={docData.holidayString}
                      onChange={(e) => updateField('holidayString', e.target.value)}
                      rows={2}
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-slate-800 shadow-inner"
                      placeholder="Weekly Off: 7, 14, 21, 28 | Public Holiday (Muharram): 16"
                    />
                    <div className="mt-2 p-2 bg-blue-50/50 rounded-lg border border-blue-100 text-[11px] text-slate-600 leading-relaxed">
                      <span className="font-bold text-blue-700 block mb-1">💡 How to add holidays:</span>
                      Type the <strong className="text-slate-800">Reason</strong>, add a colon (<strong className="text-slate-800">:</strong>), and list the <strong className="text-slate-800">dates</strong> separated by commas.
                      Use a vertical bar (<strong className="text-slate-800">|</strong>) to add a different reason.

                      <div className="mt-1.5 font-mono text-[10px] bg-white p-1.5 rounded border border-slate-200 text-slate-500">
                        <span className="text-emerald-600 font-bold">Weekly Off</span>: 7, 14, 21 <span className="text-blue-500 font-bold">|</span> <span className="text-amber-600 font-bold">Public Holiday (Independence Day)</span>: 15
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      disabled={isGenerating}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 w-full"
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          <span>Compiling Document...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path></svg>
                          <span>Export Word File</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>

                {/* Dynamic Shift Log Table Headers */}
                <tr className="bg-neutral-100 text-center font-bold">
                  <td className="border border-black p-2 w-[12%]">Date</td>
                  <td className="border border-black p-2 w-[22%]">Time In</td>
                  <td className="border border-black p-2 w-[22%]">Sign</td>
                  <td className="border border-black p-2 w-[22%]">Time Out</td>
                  <td className="border border-black p-2 w-[22%]">Sign</td>
                </tr>

                {/* --- LIVE CALENDAR RENDERING ENGINE --- */}
                {(() => {
                  // 1. Inline Frontend Parser: Syncs live text input directly to the table preview layout
                  const parsedHolidays = {};
                  if (docData.holidayString && docData.holidayString.trim()) {
                    docData.holidayString.split('|').forEach(group => {
                      if (!group.includes(':')) return;
                      const [label, daysRaw] = group.split(':');
                      const cleanLabel = label.trim();
                      daysRaw.split(',').forEach(dayStr => {
                        const dayNum = parseInt(dayStr.trim(), 10);
                        if (!isNaN(dayNum)) {
                          parsedHolidays[dayNum] = `-- ${cleanLabel} --`;
                        }
                      });
                    });
                  }

                  // 2. Generate maximum available dates tracking arrays based on targets
                  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                  const monthIndex = monthNames.indexOf(docData.month) !== -1 ? monthNames.indexOf(docData.month) : 5;
                  const targetYear = parseInt(docData.year, 10) || 2026;
                  const daysInMonth = new Date(targetYear, monthIndex + 1, 0).getDate() || 30;

                  // 3. Loop through days and render rows programmatically
                  return Array.from({ length: daysInMonth }).map((_, index) => {
                    const currentDay = index + 1;
                    const holidayMessage = parsedHolidays[currentDay];

                    if (holidayMessage) {
                      // Dynamic rendering style for custom parsed holiday dates
                      return (
                        <tr key={currentDay} className="bg-neutral-50 text-center h-8 italic text-neutral-500 font-medium">
                          <td className="border border-black p-1 text-black font-medium not-italic bg-white">{currentDay}</td>
                          <td colSpan="4" className="border border-black p-1 text-center bg-slate-50/80 tracking-wider font-semibold text-xs text-slate-600">
                            {holidayMessage}
                          </td>
                        </tr>
                      );
                    }

                    // Default layout format configuration fields for normal work log dates
                    return (
                      <tr key={currentDay} className="text-center h-8">
                        <td className="border border-black p-1 font-medium">{currentDay}</td>
                        <td className="border border-black p-1"></td>
                        <td className="border border-black p-1"></td>
                        <td className="border border-black p-1"></td>
                        <td className="border border-black p-1"></td>
                      </tr>
                    );
                  });
                })()}

                {/* Ending Context Spacer Row */}
                <tr className="h-4"><td colSpan="5" className="border border-black bg-neutral-100"></td></tr>

                {/* Summary Metrics Section Rows */}
                <tr className="bg-yellow-200 text-center font-bold text-xs">
                  <td className="border border-black p-1.5">Total PR days (with CL)</td>
                  <td className="border border-black p-1.5">Total AB days</td>
                  <td className="border border-black p-1.5">Accrued CL</td>
                  <td className="border border-black p-1.5">Availed CL</td>
                  <td className="border border-black p-1.5">Balance CL</td>
                </tr>
                <tr className="bg-yellow-200 h-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <td key={i} className="border border-black p-1"></td>
                  ))}
                </tr>

                {/* Declarative Footer Row */}
                <tr>
                  <td colSpan="5" className="border border-black p-2 text-xs text-neutral-600">
                    Leave Application forms for the above absents are enclosed.
                  </td>
                </tr>

                {/* Explicit Signature Layout Spaces */}
                <tr className="font-bold text-xs">
                  <td colSpan="2" className="border border-black p-3 pt-6 pb-16 align-top w-1/2">
                    Sign of Employee
                  </td>
                  <td colSpan="3" className="border border-black p-3 pt-6 pb-16 align-top w-1/2">
                    Name & Designation of Dept Head (Sign & Stamp): -
                  </td>
                </tr>

              </tbody>
            </table>
            {/* END DOC TABLE WRAPPER */}

          </div>
        </section>

      </main>
      <Footer/>
    </div>
    
  );
}