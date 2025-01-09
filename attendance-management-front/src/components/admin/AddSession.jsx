import React, { useState } from 'react';
import QRCode from 'qrcode'; // Import the qrcode library
import { useNavigate } from 'react-router-dom'; // Import navigation hook

const AddSession = () => {
  const [classId, setClassId] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState(''); // Store the QR code data URL
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  const handleGenerateQRCode = () => {
    const qrData = {
      classId,
      sessionDate,
    };

    // Generate QR code and store the data URL
    QRCode.toDataURL(JSON.stringify(qrData), (err, url) => {
      if (err) {
        console.error('Error generating QR code:', err);
        setError('Failed to generate QR Code.');
      } else {
        setQrCodeDataUrl(url); // Set the generated QR code URL to state
        setError('');
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Submit session data along with the generated QR code to your API (Laravel)
    fetch('http://127.0.0.1:8000/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        class_id: classId,
        session_date: sessionDate,
        qr_code: qrCodeDataUrl, // Submit the QR code as a URL
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add session.');
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage('Session added successfully!');
        setClassId('');
        setSessionDate('');
        setQrCodeDataUrl('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-center text-maroon-500">Add Session</h2>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="px-4 py-2 mb-4 text-white bg-gray-500 rounded hover:bg-gray-600"
      >
        Back
      </button>

      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}

        <div className="mb-4">
          <label htmlFor="classId" className="block text-sm font-medium text-maroon-500">
            Class ID
          </label>
          <input
            type="text"
            id="classId"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sessionDate" className="block text-sm font-medium text-maroon-500">
            Session Date
          </label>
          <input
            type="date"
            id="sessionDate"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={handleGenerateQRCode}
            className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Generate QR Code
          </button>
        </div>

        {qrCodeDataUrl && (
          <div className="mb-4">
            <img src={qrCodeDataUrl} alt="Generated QR Code" className="mx-auto" />
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 text-white rounded bg-maroon-500 hover:bg-maroon-600"
        >
          Save Session
        </button>
      </form>
    </div>
  );
};

export default AddSession;
