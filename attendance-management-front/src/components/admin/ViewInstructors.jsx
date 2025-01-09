import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use this if you're using React Router

const ViewInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Navigation hook for the back button

  useEffect(() => {
    // Fetch instructors data from API
    fetch('http://127.0.0.1:8000/api/instructors')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch instructors.');
        }
        return response.json();
      })
      .then((data) => {
        setInstructors(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container p-6 mx-auto rounded shadow-lg bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-maroon-500">Instructors</h2>
        <button
          onClick={() => navigate('/admin')} // Update '/admin' to the correct route for your admin page
          className="px-4 py-2 text-white rounded bg-maroon-500 hover:bg-maroon-600"
        >
          Back to Admin
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading instructors...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : instructors.length === 0 ? (
        <p className="text-center text-gray-500">No instructors found.</p>
      ) : (
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-maroon-100">
              <th className="p-3 text-left border border-gray-300 text-maroon-600">ID</th>
              <th className="p-3 text-left border border-gray-300 text-maroon-600">First Name</th>
              <th className="p-3 text-left border border-gray-300 text-maroon-600">Last Name</th>
              <th className="p-3 text-left border border-gray-300 text-maroon-600">Email</th>
              <th className="p-3 text-left border border-gray-300 text-maroon-600">Phone Number</th>
              <th className="p-3 text-left border border-gray-300 text-maroon-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <tr key={instructor.id} className="hover:bg-gray-100">
                <td className="p-3 border border-gray-300">{instructor.id}</td>
                <td className="p-3 border border-gray-300">{instructor.first_name}</td>
                <td className="p-3 border border-gray-300">{instructor.last_name}</td>
                <td className="p-3 border border-gray-300">{instructor.email}</td>
                <td className="p-3 border border-gray-300">
                  {instructor.phone_number || 'N/A'}
                </td>
                <td className="p-3 border border-gray-300">
                  <button className="px-4 py-1 mr-2 text-white rounded bg-maroon-500 hover:bg-maroon-600">
                    Edit
                  </button>
                  <button className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewInstructors;
