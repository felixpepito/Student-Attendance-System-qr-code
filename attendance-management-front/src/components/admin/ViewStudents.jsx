import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch students from your API
    fetch('http://127.0.0.1:8000/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => {
        setError('Error fetching students.');
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleEdit = (id) => {
    // Fetch student details for editing
    fetch(`http://127.0.0.1:8000/api/students/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Editing student:', data);
        // You can now show the student details in a form for editing
      })
      .catch((error) => console.error('Error fetching student details:', error));
  };

  const handleDelete = (id) => {
    // Confirm deletion before making API call
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      // Make API call to delete the student
      fetch(`http://127.0.0.1:8000/api/students/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Remove the deleted student from the UI
            setStudents((prevStudents) =>
              prevStudents.filter((student) => student.id !== id)
            );
            console.log('Student deleted successfully');
          } else {
            console.error('Error deleting student');
          }
        })
        .catch((error) => console.error('Error deleting student:', error));
    }
  };

  const handleBack = () => {
    // Navigate back to the admin dashboard
    navigate('/admin'); // Replace with the actual path to the admin dashboard
  };

  return (
    <div className="container p-8 mx-auto max-w-7xl">
      <h2 className="mb-8 text-3xl font-bold text-center text-maroon-500">Students List</h2>

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="px-6 py-2 mb-4 text-white bg-gray-500 rounded-lg hover:bg-gray-700"
      >
        Back to Dashboard
      </button>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="text-gray-700 bg-gray-100">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-4">{student.first_name} {student.last_name}</td>
                <td className="p-4">{student.email}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="mr-4 text-yellow-500 hover:text-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
