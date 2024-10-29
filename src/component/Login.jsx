import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setSuccess('');
    setApiError('');
  
    if (!email) {
      setEmailError('Email field cannot be empty.');
      return;
    }
    if (!password) {
      setPasswordError('Password field cannot be empty.');
      return;
    }
  
    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const startTime = performance.now();

      const response = await axios.post('https://ottb.leadgenadvertisements.com/api/admin/v1/login', {
        email,
        password,
      });
      const endTime = performance.now();
      // If login is successful
      if (response.data.success) {
        const token = response.data.data.token; // Adjust based on your API's response
        localStorage.setItem('adminToken', token); // Store the token in local storage for future requests
  
        // Show success message and redirect immediately
        setSuccess('Login successful!');
        navigate('/admin/dashboard'); // Redirect immediately
      } else {
        setApiError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setApiError('Invalid email or password.'); // Specific message for 401 error
      } else {
        setApiError('An error occurred during login. Please try again later.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {apiError && <div className="text-red-500 mb-4">{apiError}</div>}
        
        {/* Show loading message when loading */}
        {loading && <div className="text-blue-500 mb-4">Checking login, please wait...</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full p-2 border ${
                emailError ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              disabled={loading} // Disable input while loading
            />
            {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full p-2 border ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              disabled={loading} // Disable input while loading
            />
            {passwordError && <div className="text-red-500 text-sm mt-1">{passwordError}</div>}
          </div>
          <button
            type="submit"
            className={`w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
