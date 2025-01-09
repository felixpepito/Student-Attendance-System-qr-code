import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; // Import QRCodeSVG

const QRCodeGenerator = () => {
  const [student, setStudent] = useState({
    email: '',
    class_id: '',
    session_id: '',
    date: new Date().toISOString().split('T')[0], // Auto-fill today's date
    status: 'Present', // Default status
  });

  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    success: false,
  });

  const [qrCodeGenerated, setQrCodeGenerated] = useState(false); // State to track if QR is generated

  const generateQR = async () => {
    // Check if all required fields are filled
    if (!student.email || !student.class_id || !student.session_id) {
      setModal({
        isOpen: true,
        title: 'Incomplete Details',
        message: 'Please fill in all fields.',
        success: false,
      });
      return;
    }

    try {
      // Send POST request to Laravel API
      const response = await fetch('http://127.0.0.1:8000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student), // Send the student object as JSON
      });

      if (response.ok) {
        // Reset input fields
        setStudent({
          email: '',
          class_id: '',
          session_id: '',
          date: new Date().toISOString().split('T')[0], // Reset to today's date
          status: 'Present', // Default status
        });

        setQrCodeGenerated(true); // Set QR code generated flag to true
        setModal({
          isOpen: true,
          title: 'Success',
          message: 'Attendance recorded successfully!',
          success: true,
        });
      } else {
        const error = await response.json();
        console.error(error);
        setModal({
          isOpen: true,
          title: 'Error',
          message: 'Failed to record attendance. Please try again.',
          success: false,
        });
      }
    } catch (error) {
      console.error(error);
      setModal({
        isOpen: true,
        title: 'Error',
        message: 'An error occurred. Please try again.',
        success: false,
      });
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: '', message: '', success: false });
  };

  return (
    <div className="min-h-screen p-6 bg-maroon-700 text-maroon-700">
      <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
        {/* Back Button */}
        <div className="mb-6 text-left">
          <Link
            to="/dashboard"
            className="inline-flex items-center p-2 font-medium text-gray-700 transition duration-300"
          >
            Back
          </Link>
        </div>

        {/* Header */}
        <h2 className="mb-6 text-3xl font-bold text-center text-maroon-700">Generate QR Code</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={student.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
            className="w-full p-3 border rounded-md border-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-700"
          />
          <input
            type="text"
            placeholder="Class ID"
            value={student.class_id}
            onChange={(e) => setStudent({ ...student, class_id: e.target.value })}
            className="w-full p-3 border rounded-md border-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-700"
          />
          <input
            type="text"
            placeholder="Session ID"
            value={student.session_id}
            onChange={(e) => setStudent({ ...student, session_id: e.target.value })}
            className="w-full p-3 border rounded-md border-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-700"
          />

          {/* Submit Button */}
          <button
            onClick={generateQR}
            className="w-full px-4 py-2 mt-4 font-bold text-white rounded-md bg-maroon-700 hover:bg-maroon-800"
          >
            Submit Data
          </button>
        </div>

        {/* Display QR Code Only After Successful Submission */}
        {qrCodeGenerated && (
          <div className="mt-6 text-center">
            <QRCodeSVG value={JSON.stringify(student)} size={256} />
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <h2
              className={`text-2xl font-bold ${modal.success ? 'text-green-600' : 'text-red-600'}`}
            >
              {modal.title}
            </h2>
            <p className="mt-4 text-center text-gray-700">{modal.message}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 mt-6 font-bold text-white rounded-md bg-maroon-700 hover:bg-maroon-800"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
