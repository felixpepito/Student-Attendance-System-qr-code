import React, { useEffect, useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [subjectId, setSubjectId] = useState(1); // You can set the subject ID dynamically

  useEffect(() => {
    // Fetch students from the Laravel API using fetch
    fetch(`http://127.0.0.1:8000/api/students?subject_id=${subjectId}`) // Pass the subjectId as a query param
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        setStudents(data); // Set the students state
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
      });
  }, [subjectId]); // Refetch data whenever the subjectId changes

  return (
    <div className="p-6">
      <div className="overflow-x-auto"> {/* Add horizontal scroll for responsiveness */}
        <table className="min-w-full mt-4 border-collapse table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center text-white ">First Name</th>
              <th className="px-4 py-2 text-center text-white ">Last Name</th>
              <th className="px-4 py-2 text-center text-white ">Date of Birth</th>
              <th className="px-4 py-2 text-center text-white ">Email</th>
              <th className="px-4 py-2 text-center text-white ">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map(student => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="px-3 py-2 text-center bg-gray-200 text-maroon-700 ">{student.first_name}</td>
                  <td className="px-3 py-2 text-center bg-gray-100 text-maroon-700">{student.last_name}</td>
                  <td className="px-3 py-2 text-center bg-gray-200 text-maroon-700">{student.date_of_birth}</td>
                  <td className="px-3 py-2 text-center bg-gray-100 text-maroon-700">{student.email}</td>
                  <td className="px-3 py-2 text-center bg-gray-200 text-maroon-700">{student.phone_number}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">No students found for this subject</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
