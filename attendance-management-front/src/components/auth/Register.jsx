import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.role) {
      alert('Please select a role!');
      return;
    }

    if (user.password !== user.password_confirmation) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation,
          role: user.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setError('');
        setUser({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          role: '',
        });

        setTimeout(() => {
          navigate('/'); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setError(data.message || 'Registration failed.');
        setSuccess('');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while registering.');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-maroon-700 text-maroon-500">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-maroon-700">Register</h2>
        {success && (
          <div className="p-2 mb-4 text-green-700 bg-green-100 border border-green-500 rounded-md">
            {success}
          </div>
        )}
        {error && (
          <div className="p-2 mb-4 text-red-700 bg-red-100 border border-red-500 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-2 border rounded-md border-maroon-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border rounded-md border-maroon-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-2 border rounded-md border-maroon-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={user.password_confirmation}
              onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
              className="w-full p-2 border rounded-md border-maroon-500"
            />
          </div>
          <div className="mb-4">
            <select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="w-full p-2 bg-white border rounded-md text-maroon-500 border-maroon-500"
            >
              <option value="" disabled>Select Role</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full p-2 font-semibold text-white transition duration-300 rounded-md bg-maroon-700 hover:bg-maroon-dark"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-maroon-700">
            Already have an account?{' '}
            <Link to="/" className="underline text-maroon-500 hover:text-maroon-800">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
