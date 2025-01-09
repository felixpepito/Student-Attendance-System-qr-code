import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Attendance = () => {
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      date: '2024-12-22',
      status: 'Present',
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      date: '2024-12-22',
      status: 'Absent',
    },
    {
      id: 3,
      studentName: 'Michael Johnson',
      date: '2024-12-22',
      status: 'Late',
    },
  ]);

  useEffect(() => {
    // Fetch attendance data (replace with real API)
    fetch('/api/attendance')
      .then((response) => response.json())
      .then((data) => setAttendance(data))
      .catch((error) => console.error('Error fetching attendance data:', error));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-maroon-700">
      <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
        {/* Back Button */}
        <div className="mb-6 text-left">
          <Link
            to="/dashboard"
            className="p-2 font-medium text-gray-700 transition duration-300"
          >
            Back
          </Link>
        </div>

        {/* Header */}
        <h2 className="mb-6 text-3xl font-bold text-center text-maroon-700">
          Attendance Records
        </h2>

        {/* Attendance Records */}
        <ul className="space-y-4">
          {attendance.length > 0 ? (
            attendance.map((record) => (
              <li key={record.id} className="p-4 bg-gray-100 rounded-md shadow-md">
                <div className="text-lg font-semibold text-maroon">
                  {record.studentName}
                </div>
                <div className="text-sm text-gray-700">{record.date}</div>
                <div
                  className={`text-sm font-medium ${
                    record.status === 'Present'
                      ? 'text-green-500'
                      : record.status === 'Absent'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {record.status}
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">
              No attendance records available.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const QRScanner = () => {
  const handleScan = (data) => {
    if (data) {
      console.log('Scanned Data:', data);
      // Submit the scanned data to your API or update the attendance state
      // Example:
      // fetch('http://your-api-endpoint/attendance', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ scannedData: data }),
      // })
      //   .then((response) => response.json())
      //   .then((result) => console.log('Attendance marked:', result))
      //   .catch((error) => console.error('Error:', error));
    }
  };

  const handleError = (error) => {
    console.error('Scan Error:', error);
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center">QR Code Scanner</h2>
      <div className="qr-scanner">
        {/* QR Scanner Library Component */}
        {/* Example: react-qr-reader */}
        {/* <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        /> */}
        <p className="text-center text-gray-500">
          (QR Code Scanner Placeholder - Add your scanning component here)
        </p>
      </div>
    </div>
  );
};

// Main Component
const AttendancePage = () => {
  return (
    <div className="bg-gray-100">
      <Attendance />
      <QRScanner />
    </div>
  );
};

export default Attendance;
