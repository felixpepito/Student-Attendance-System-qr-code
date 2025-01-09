import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token and other necessary data (like role)
        localStorage.setItem('authToken', data.token);  // Store token
        localStorage.setItem('isAuthenticated', true); // Store authentication status

        // Set success message after successful login
        setSuccessMessage('Login successful! Redirecting...');
        
        // Redirect based on received URL
        setTimeout(() => {
          window.location.href = data.redirect_url;
        }, 2000);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-maroon-700">
      <div className="w-full max-w-md p-8 bg-white border rounded-lg shadow-md border-maroon-700">
        <h2 className="mb-6 text-2xl font-bold text-center text-maroon-700">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-maroon-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded border-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-maroon-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded border-maroon-700 focus:outline-none focus:ring-2 focus:ring-maroon-500"
              required
            />
          </div>
          {error && <p className="mb-4 text-sm text-maroon-700">{error}</p>}
          {successMessage && <p className="mb-4 text-sm text-green-600">{successMessage}</p>}
          <button
            type="submit"
            className="w-full py-2 text-white rounded bg-maroon-700 hover:bg-maroon-800 focus:outline-none focus:ring-2 focus:ring-maroon-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-maroon-700">
          Don’t have an account?{' '}
          <a href="/register" className="underline text-maroon-700 hover:text-maroon-800">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
