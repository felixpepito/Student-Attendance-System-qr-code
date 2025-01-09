import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const [studentName, setStudentName] = useState('Loading...');
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage and redirect to login
    localStorage.removeItem('authToken');
    window.location.href = '/'; // Redirect to login page
  };

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        // Redirect to login page if no token is found
        navigate('/');
        return;
      }

      try {
        // Fetch the user's role to ensure they are a student
        const userResponse = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        
        if (userData.role !== 'Student') {
          // Redirect if the role is not Student
          navigate('/dashboard');
          return;
        }

        // Fetch enrollment data
        const enrollmentResponse = await fetch('/api/enrollments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!enrollmentResponse.ok) {
          throw new Error('Failed to fetch enrollments');
        }

        const enrollments = await enrollmentResponse.json();

        if (enrollments.length === 0) {
          setStudentName('You are not enrolled in any courses.');
        } else {
          setStudentName(userData.name); // Use dynamic name
          setEnrolledSubjects(enrollments.map(e => e.course.name)); // Assuming `course.name` exists
          setAttendanceRecords(
            enrollments.map(e => ({
              subject: e.course.name,
              status: 'Not Recorded', // Replace with real attendance data if available
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching enrollment data:', error);
        setStudentName('Access Denied: You are not enrolled.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen text-white bg-maroon-700">
      <header className="p-4">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Student Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="flex-grow p-6">
        <div className="mb-8 welcome">
          <h2 className="text-xl font-semibold">Welcome, {studentName}</h2>
          <p>Here's your dashboard overview.</p>
        </div>

        {enrolledSubjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-4 bg-white border rounded-lg text-maroon-700 border-maroon-700">
              <h3 className="mb-2 text-lg font-semibold">Enrolled Subjects</h3>
              <ul>
                {enrolledSubjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white border rounded-lg text-maroon-700 border-maroon-700">
              <h3 className="mb-2 text-lg font-semibold">Recent Attendance</h3>
              <ul>
                {attendanceRecords.map((record, index) => (
                  <li key={index}>
                    {record.subject} - {record.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold">No enrolled subjects</h3>
          </div>
        )}
      </main>

      <footer className="p-4 text-center text-white bg-maroon-700">
        <p>&copy; 2024 Student Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default StudentDashboard;
