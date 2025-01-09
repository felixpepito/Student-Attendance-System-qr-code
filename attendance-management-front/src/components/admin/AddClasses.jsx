import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AddClasses = () => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [schedule, setSchedule] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/instructors')
      .then((response) => response.json())
      .then((data) => setInstructors(data))
      .catch((err) => {
        setError('Failed to load instructors.');
        console.error(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccessMessage('');

    const classData = {
      class_name: className,
      subject: subject,
      instructor_id: instructorId,
      schedule: schedule,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Add your token if necessary
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) throw new Error('Failed to add class');

      const data = await response.json();
      setSuccessMessage(data.message);

      setClassName('');
      setSubject('');
      setInstructorId('');
      setSchedule('');
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleBack = () => {
    navigate('/admin'); // Replace '/admin' with the correct path
  };

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-maroon-500">Add Class</h2>

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
          <label htmlFor="className" className="block text-sm font-medium text-maroon-500">
            Class Name
          </label>
          <input
            type="text"
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-maroon-500">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="instructorId" className="block text-sm font-medium text-maroon-500">
            Instructor
          </label>
          <select
            id="instructorId"
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructors.map((instructor) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.first_name} {instructor.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="schedule" className="block text-sm font-medium text-maroon-500">
            Schedule (Optional)
          </label>
          <input
            type="text"
            id="schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="w-full p-2 mt-1 border rounded text-maroon-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 text-white rounded bg-maroon-500 hover:bg-maroon-600"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClasses;
