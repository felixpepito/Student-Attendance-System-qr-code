import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GenerateReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState([]);

  const fetchAttendanceData = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('http://localhost:8000/api/attendances');
      const data = await response.json();

      if (data.success) {
        setReportData(data.attendance);
        alert('Attendance data fetched successfully!');
      } else {
        alert('Failed to fetch attendance data: ' + (data.message || 'Unknown error.'));
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      alert('An error occurred while fetching attendance data.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCSV = () => {
    const headers = ['Name,Email,Date,Status'];
    const rows = reportData.map(
      (entry) => `${entry.name},${entry.email},${entry.date},${entry.status}`
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendance_report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Attendance Report', 14, 10);
    doc.autoTable({
      head: [['Name', 'Email', 'Date', 'Status']],
      body: reportData.map((entry) => [entry.name, entry.email, entry.date, entry.status]),
    });
    doc.save('attendance_report.pdf');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-maroon-700">Generate Attendance Report</h2>
      <button
        onClick={fetchAttendanceData}
        className="px-4 py-2 mt-4 font-medium text-white rounded-lg bg-maroon-700 hover:bg-maroon-800"
        disabled={isGenerating}
      >
        {isGenerating ? 'Fetching Data...' : 'Fetch Attendance Data'}
      </button>

      {reportData.length > 0 && (
        <div className="mt-4 space-y-2">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 font-medium text-white rounded-lg bg-maroon-700 hover:bg-maroon-800"
          >
            Download as CSV
          </button>
          <button
            onClick={downloadPDF}
            className="px-4 py-2 font-medium text-white rounded-lg bg-maroon-700 hover:bg-maroon-800"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
