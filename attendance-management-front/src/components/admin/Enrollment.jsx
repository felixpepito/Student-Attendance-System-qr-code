import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Enrollment = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]); // New state to store enrollments
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Hook to navigate

  // Fetch students, courses, and enrollments from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students and courses
        const studentResponse = await fetch('http://127.0.0.1:8000/api/students');
        const courseResponse = await fetch('http://127.0.0.1:8000/api/courses');
        const enrollmentResponse = await fetch('http://127.0.0.1:8000/api/enrollments'); // Fetch enrollments

        const studentsData = await studentResponse.json();
        const coursesData = await courseResponse.json();
        const enrollmentsData = await enrollmentResponse.json(); // Store enrollments data

        setStudents(studentsData);
        setCourses(coursesData);
        setEnrollments(enrollmentsData); // Set enrollments state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enrollmentData = {
      student_id: studentId,
      course_id: courseId,
      enrollment_date: enrollmentDate,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Enrollment successful!');
        // After successful enrollment, fetch enrollments again to update the list
        const updatedEnrollments = await fetch('http://127.0.0.1:8000/api/enrollments');
        setEnrollments(await updatedEnrollments.json());
      } else {
        setMessage('Enrollment failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      setMessage('An error occurred while enrolling.');
    }
  };

  // Handle back button click to navigate to admin page
  const handleBack = () => {
    navigate('/admin'); // Replace '/admin' with the correct path for your admin page
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-center text-maroon-500">Enroll a Student</h2>

      {/* Back Button */}
      <button 
        onClick={handleBack} 
        className="px-6 py-2 mb-4 text-white bg-gray-500 rounded-lg hover:bg-gray-700"
      >
        Back to Admin
      </button>

      {/* Display Success/Error Message */}
      {message && (
        <h1 className={`text-sm text-center ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </h1>
      )}

      <form onSubmit={handleSubmit}>
        {/* Student ID Input */}
        <div className="mb-4">
          <label htmlFor="studentId" className="block text-sm font-medium text-maroon-500">Student ID</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg"
            placeholder="Enter Student ID"
            required
          />
        </div>

        {/* Course ID Input */}
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-sm font-medium text-maroon-500">Course ID</label>
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg"
            placeholder="Enter Course ID"
            required
          />
        </div>

        {/* Enrollment Date */}
        <div className="mb-4">
          <label htmlFor="enrollmentDate" className="block text-sm font-medium text-maroon-500">Enrollment Date</label>
          <input
            type="date"
            id="enrollmentDate"
            value={enrollmentDate}
            onChange={(e) => setEnrollmentDate(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white rounded-lg bg-maroon-500"
          >
            Enroll Student
          </button>
        </div>
      </form>

      {/* Display the List of Enrollments */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-center text-maroon-500">Existing Enrollments</h3>
        <ul className="mt-4">
          {enrollments.map((enrollment) => (
            <li key={enrollment.id} className="mb-2 text-sm text-gray-700">
              <strong>{enrollment.student.name}</strong> enrolled in <strong>{enrollment.course.name}</strong> on {enrollment.enrollment_date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Enrollment;
