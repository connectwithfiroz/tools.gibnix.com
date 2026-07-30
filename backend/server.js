const express = require('express');
const cors = require('cors');
const docx = require('docx');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Helper function to set cell padding consistently (in DXA units)
function setCellMargins(top, bottom, left, right) {
    return { top, bottom, left, right, type: docx.WidthType.DXA };
}

// Helper function to create standard merged table rows for metadata
function createMergedRow(text, isBold = false, size = 20, isCenter = false, bgColor = null) {
    return new docx.TableRow({
        children: [
            new docx.TableCell({
                children: [
                    new docx.Paragraph({
                        children: [new docx.TextRun({ text, bold: isBold, size, font: "Arial" })],
                        alignment: isCenter ? docx.AlignmentType.CENTER : docx.AlignmentType.LEFT
                    })
                ],
                columnSpan: 5,
                shading: bgColor ? { fill: bgColor } : undefined,
                margins: setCellMargins(116, 116, 100, 100)
            })
        ]
    });
}

// Custom parser to map the user's natural language holiday string into a structured dictionary
function parseHolidays(holidayString) {
    const holidayMap = {};
    if (!holidayString || !holidayString.trim()) return holidayMap;

    // Split distinct rules by pipe character
    const groups = holidayString.split('|');
    
    groups.forEach(group => {
        if (!group.includes(':')) return;
        
        // Extract label (e.g., "Weekly Off") and the raw numbers (e.g., "7, 14, 21")
        const [label, daysRaw] = group.split(':');
        const cleanLabel = label.trim();
        
        daysRaw.split(',').forEach(dayStr => {
            const dayNum = parseInt(dayStr.trim(), 10);
            if (!isNaN(dayNum)) {
                holidayMap[dayNum] = `-- ${cleanLabel} --`;
            }
        });
    });

    return holidayMap;
}

app.post('/api/generate-attendance', async (req, res) => {
    try {
        const { 
            companyName, month, year, employeeName, 
            designation, phone, deptName, deptAddress, holidayString 
        } = req.body;

        // Parse human-readable holiday configuration string into logical structures
        const holidayCalendar = parseHolidays(holidayString);
        
        // Dynamic column widths (matching exactly to explicit inch ratios in Word)
        const colWidths = [1728, 1616, 2448, 1616, 2448]; 
        const tableRows = [];

        // 1. HEADER SECTION (Metadata Grid)
        tableRows.push(createMergedRow(companyName, true, 24, true, "F2F2F2"));
        tableRows.push(createMergedRow(`Attendance sheet for the month of   ${month}  -   ${year}`, true, 20, true, "F9F9F9"));
        tableRows.push(createMergedRow(`Name of Employee: - ${employeeName}`, false, 20));
        
        // Split designation and contact info row
        tableRows.push(new docx.TableRow({
            children: [
                new docx.TableCell({
                    children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "Designation: - ", bold: true, font: "Arial" }), new docx.TextRun({ text: designation, font: "Arial" })] })],
                    columnSpan: 2,
                    margins: setCellMargins(116, 116, 100, 100)
                }),
                new docx.TableCell({
                    children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "Contact no: - ", bold: true, font: "Arial" }), new docx.TextRun({ text: phone, font: "Arial" })] })],
                    columnSpan: 3,
                    margins: setCellMargins(116, 116, 100, 100)
                })
            ]
        }));
        
        tableRows.push(createMergedRow(`Department Name: - ${deptName}`, false, 20));
        tableRows.push(createMergedRow(`Address: - ${deptAddress}`, false, 20));

        // 2. PRIMARY TABLE LOG HEADERS
        const logHeaders = ["Date", "Time In", "Sign", "Time Out", "Sign"];
        tableRows.push(new docx.TableRow({
            children: logHeaders.map((headerText, index) => new docx.TableCell({
                children: [new docx.Paragraph({ children: [new docx.TextRun({ text: headerText, bold: true, font: "Arial" })], alignment: docx.AlignmentType.CENTER })],
                width: { size: colWidths[index], type: docx.WidthType.DXA },
                shading: { fill: "EFEFEF" },
                margins: setCellMargins(80, 80, 100, 100)
            }))
        }));

        // 3. CALENDAR GENERATOR LAYER
        const monthIndex = new Date(Date.parse(`${month} 1, ${year}`)).getMonth();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        for (let currentDay = 1; currentDay <= daysInMonth; currentDay++) {
            // Check if this date index is registered inside our parsed holiday string rules
            if (holidayCalendar[currentDay]) {
                tableRows.push(new docx.TableRow({
                    children: [
                        new docx.TableCell({
                            children: [new docx.Paragraph({ children: [new docx.TextRun({ text: String(currentDay), font: "Arial" })], alignment: docx.AlignmentType.CENTER })],
                            width: { size: colWidths[0], type: docx.WidthType.DXA },
                            margins: setCellMargins(40, 40, 100, 100)
                        }),
                        new docx.TableCell({
                            children: [new docx.Paragraph({ children: [new docx.TextRun({ text: holidayCalendar[currentDay], italic: true, font: "Arial" })], alignment: docx.AlignmentType.CENTER })],
                            columnSpan: 4,
                            shading: { fill: "FAFAFA" },
                            margins: setCellMargins(40, 40, 100, 100)
                        })
                    ]
                }));
            } else {
                // Generate default empty working tracking day row
                tableRows.push(new docx.TableRow({
                    children: Array.from({ length: 5 }).map((_, colIndex) => new docx.TableCell({
                        children: [new docx.Paragraph({ children: [new docx.TextRun({ text: colIndex === 0 ? String(currentDay) : "", font: "Arial" })], alignment: colIndex === 0 ? docx.AlignmentType.CENTER : docx.AlignmentType.LEFT })],
                        width: { size: colWidths[colIndex], type: docx.WidthType.DXA },
                        margins: setCellMargins(40, 40, 100, 100)
                    }))
                }));
            }
        }

        // 4. BOTTOM TOTALS SUMMARY BLOCKS
        const metricsHeaders = ["Total PR days (with CL)", "Total AB days", "Accrued CL", "Availed CL", "Balance CL"];
        tableRows.push(new docx.TableRow({
            children: metricsHeaders.map((title, idx) => new docx.TableCell({
                children: [new docx.Paragraph({ children: [new docx.TextRun({ text: title, bold: true, size: 18, font: "Arial" })], alignment: docx.AlignmentType.CENTER })],
                width: { size: colWidths[idx], type: docx.WidthType.DXA },
                shading: { fill: "FFFF00" },
                margins: setCellMargins(60, 60, 100, 100)
            }))
        }));
        
        tableRows.push(new docx.TableRow({
            children: Array.from({ length: 5 }).map((_, idx) => new docx.TableCell({
                children: [new docx.Paragraph("")],
                width: { size: colWidths[idx], type: docx.WidthType.DXA },
                shading: { fill: "FFFF00" },
                margins: setCellMargins(180, 180, 100, 100)
            }))
        }));

        // 5. COMPLIANCE FOOTER & SIGNATURE SPACES
        tableRows.push(createMergedRow("Leave Application forms for the above absents are enclosed.", false, 18));
        
        tableRows.push(new docx.TableRow({
            children: [
                new docx.TableCell({
                    children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "Sign of Employee", bold: true, size: 20, font: "Arial" })], alignment: docx.AlignmentType.LEFT })],
                    columnSpan: 2,
                    margins: setCellMargins(80, 80, 100, 100)
                }),
                new docx.TableCell({
                    children: [new docx.Paragraph({ children: [new docx.TextRun({ text: "Name & Designation of Dept Head (Sign & Stamp): -", bold: true, size: 20, font: "Arial" })], alignment: docx.AlignmentType.RIGHT })],
                    columnSpan: 3,
                    margins: setCellMargins(80, 80, 100, 100)
                })
            ]
        }));

        // Empty block giving space to physical hand signature ink stamps
        tableRows.push(new docx.TableRow({
            children: [
                new docx.TableCell({ children: [new docx.Paragraph("")], columnSpan: 2, margins: setCellMargins(300, 300, 100, 100) }),
                new docx.TableCell({ children: [new docx.Paragraph("")], columnSpan: 3, margins: setCellMargins(300, 300, 100, 100) })
            ]
        }));

        // Pack structural engine tables cleanly within printable layout definitions
        const doc = new docx.Document({
            sections: [{
                properties: {
                    page: { margin: { top: 288, bottom: 288, left: 288, right: 288 } } // Optimized 0.4-inch narrow formatting margins
                },
                children: [
                    new docx.Table({
                        rows: tableRows,
                        width: { size: 100, type: docx.WidthType.PERCENTAGE }
                    })
                ]
            }]
        });

        // Convert memory instances directly to dynamic streams out through Express headers
        const fileBuffer = await docx.Packer.toBuffer(doc);
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=Attendance_Sheet.docx');
        return res.send(fileBuffer);

    } catch (err) {
        console.error("Compilation Fault Event:", err);
        res.status(500).json({ error: "Failed to assemble word document composition structural arrays." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend compilation engine online at http://localhost:${PORT}`);
});