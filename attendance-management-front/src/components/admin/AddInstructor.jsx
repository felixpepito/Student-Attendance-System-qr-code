import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const AddInstructor = () => {
  // State to manage form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  // useNavigate hook to handle navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for the API request
    const instructorData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
    };

    // Send POST request to the backend
    fetch('http://127.0.0.1:8000/api/instructors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Add your token here if needed
      },
      body: JSON.stringify(instructorData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Reset form upon successful submission
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          alert('Instructor added successfully!');
        } else {
          setError('Failed to add instructor.');
        }
      })
      .catch((err) => {
        setError('There was an error adding the instructor.');
        console.error(err);
      });
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-center text-maroon-500">Add Instructor</h2>
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin')} // Navigate to the admin page
        className="mb-4 underline text-maroon-500"
      >
        Back to Admin
      </button>

      {/* Error message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-lg font-medium text-maroon-500">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-lg font-medium text-maroon-500">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-lg font-medium text-maroon-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-lg font-medium text-maroon-500">
            Phone Number (Optional)
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full p-2 text-white rounded-md bg-maroon-500 hover:bg-maroon-600 focus:outline-none focus:ring-2 focus:ring-maroon-500"
          >
            Add Instructor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInstructor;
