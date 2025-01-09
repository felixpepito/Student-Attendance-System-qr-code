import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AddStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Hook to navigate

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear previous messages
      setError('');
      setSuccessMessage('');

      // Prepare data for the POST request
      const studentData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
      };

      // Send POST request to create a new student
      const response = await fetch('http://127.0.0.1:8000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData), // Send data as JSON
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const data = await response.json();

      setSuccessMessage(data.message);
      // Optionally, clear the form fields after successful submission
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  // Handle back button click to navigate to admin page
  const handleBack = () => {
    navigate('/admin'); // Replace '/admin' with the correct path for your admin page
  };

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-maroon-500">Add Student</h2>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="px-6 py-2 mb-4 text-white bg-gray-500 rounded-lg hover:bg-gray-700"
      >
        Back to Admin
      </button>

      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}

        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-maroon-500">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-maroon-500">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-maroon-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 text-white rounded bg-maroon-500 hover:bg-maroon-600"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
