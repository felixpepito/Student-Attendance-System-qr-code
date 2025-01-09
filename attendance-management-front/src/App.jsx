import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/teacher/Dashboard';
import Attendance from './components/teacher/Attendance';
import Register from './components/auth/Register';
import QRCodeGenerator from './components/teacher/QRCodeGenerator';
import StudentList from './components/teacher/StudentList'; // Assuming you have this component
import StudentDashboard from './components/students/StudentDashboard';
import GenerateReport from './components/teacher/GenerateReport';
import Enrollment from './components/admin/Enrollment';
import AdminDashboard from './components/admin/AdminDashboard';
import AddStudent from './components/admin/AddStudent';
import ViewStudents from './components/admin/ViewStudents';
import AddCourses from './components/admin/AddCourses';
import AddInstructor from './components/admin/AddInstructor';
import AddClasses from './components/admin/AddClasses';
import AddSession from './components/admin/AddSession';
import ViewInstructors from './components/admin/ViewInstructors';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/instructors" element={<ViewInstructors />} />
          <Route path="/register" element={<Register />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/addinstructors" element={<AddInstructor />} />
          <Route path="/addsession" element={<AddSession />} />
          <Route path="/addclasses" element={<AddClasses />} />
          <Route path="/addcourses" element={<AddCourses />} />
          <Route path="/viewstudent" element={<ViewStudents />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generatereport" element={<GenerateReport />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/studentlist" element={<StudentList />} />
           <Route path="/qr-code" element={<QRCodeGenerator />} />
        </Routes>
      </Router>
  );
}

export default App;
