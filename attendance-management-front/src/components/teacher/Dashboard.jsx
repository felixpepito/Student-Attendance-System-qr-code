import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scanner as QrScanner } from '@yudiel/react-qr-scanner'; // Keep this import
import StudentList from './StudentList';

const Dashboard = () => {
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  const openQrScanner = () => setIsQrScannerOpen(true);
  const closeQrScanner = () => setIsQrScannerOpen(false);

  const addStudent = (event) => {
    event.preventDefault();
    if (newStudentName.trim()) {
      setStudents([...students, newStudentName]);
      setNewStudentName('');
      setIsAddStudentModalOpen(false); // Close modal after adding student
    }
  };

  const handleScan = async (data) => {
    if (data) {
      setQrCodeData(data);
      const studentData = JSON.parse(data.text); // Assuming the QR code contains a JSON string

      // Send the data to the backend to record attendance
      try {
        const response = await fetch('http://127.0.0.1:8000/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentData), // Send the scanned student data
        });

        if (response.ok) {
          alert('Attendance recorded successfully!');
        } else {
          alert('Failed to record attendance.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while recording attendance.');
      }
    }
  };

  return (
    <div className="relative min-h-screen p-4 text-white bg-maroon-700 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* QR Scanner */}
        {isQrScannerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
              <QrScanner
                onScan={handleScan} // Use handleScan to process the scanned QR data
                onError={(error) => console.error(error)}
                facingMode="environment"
              />
              <button
                onClick={closeQrScanner}
                className="w-full px-4 py-2 mt-4 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Close Scanner
              </button>
            </div>
          </div>
        )}

        {/* Other content */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="p-4 text-center bg-white rounded-lg shadow-md">
            <Link to="/attendance" className="p-2 text-lg font-medium rounded-md text-maroon-700">
              View Attendance Records
            </Link>
          </div>
          <div className="p-4 text-center bg-white rounded-lg shadow-md">
            <Link to="/qr-code" className="p-2 text-lg font-medium rounded-md text-maroon-700">
              Generate QR Code
            </Link>
          </div>
          <div className="p-4 text-center bg-white rounded-lg shadow-md">
            <button
              onClick={openQrScanner}
              className="p-2 text-lg font-medium rounded-md text-maroon-700"
            >
              Scan QR code to mark attendance
            </button>
          </div>
        </div>

        {/* Student List */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white">Student List</h2>
          <StudentList students={students} />
          <button
            onClick={() => setIsAddStudentModalOpen(true)}
            className="px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Add New Student
          </button>
        </div>

        {/* Add Student Modal */}
        {isAddStudentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold text-gray-800">Add New Student</h3>
              <form onSubmit={addStudent} className="mt-4 space-y-4">
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Enter student name"
                  className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-center mt-4 space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsAddStudentModalOpen(false)}
                    className="px-4 py-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
