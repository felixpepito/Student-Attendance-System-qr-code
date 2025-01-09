import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AddCourses = () => {
  // State to hold the form data
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook to navigate

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new course object
    const courseData = {
      course_name: courseName,
      course_code: courseCode,
      description: description,
    };

    // Send the data to the backend API (Laravel API)
    fetch('http://127.0.0.1:8000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Add your token here if needed
      },
      body: JSON.stringify(courseData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Clear the form upon success
          setCourseName('');
          setCourseCode('');
          setDescription('');
          alert('Course added successfully!');
        } else {
          setError('Failed to add course.');
        }
      })
      .catch((err) => {
        setError('There was an error adding the course.');
        console.error(err);
      });
  };

  // Handle back button click to navigate to admin page
  const handleBack = () => {
    navigate('/admin'); // Replace '/admin' with the correct path for your admin page
  };

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-maroon-500">Add Course</h2>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="px-6 py-2 mb-4 text-white bg-gray-500 rounded-lg hover:bg-gray-700"
      >
        Back to Admin
      </button>

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="courseName" className="block text-sm font-medium text-maroon-500">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="courseCode" className="block text-sm font-medium text-maroon-500">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-maroon-500">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full p-2 text-white rounded bg-maroon-500 hover:bg-maroon-600"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourses;
