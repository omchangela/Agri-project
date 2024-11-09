import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email field cannot be empty.');
      return;
    }
    if (!password) {
      setPasswordError('Password field cannot be empty.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://ottb.leadgenadvertisements.com/api/admin/v1/login', {
        email,
        password,
      });
      if (response.data.success) {
        const token = response.data.data.token;
        localStorage.setItem('adminToken', token);
        navigate('/admin/dashboard');
      } else {
        setEmailError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setEmailError('An error occurred during login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex  justify-center min-h-screen bg-gray-100 ">
      <div className="w-80 max-w-md">
        <img src={logo} className="w-full" alt="Admin Logo" />
        <div className="bg-white p-7 rounded-lg shadow-lg items-center">
          <h2 className="text-xl font-bold text-center ">Sign in to your account</h2>
          <span className="mb-6 text-gray-500 font-small text-[14px] leading-[22.4px] tracking-[0.7px] text-center">
            Enter your email & password to login
          </span>

          {loading && (
            <div className="text-blue-500 mb-4 text-center" aria-live="polite">
              Checking login, please wait...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mt-6 mb-4">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
                disabled={loading}
                aria-describedby="emailError"
              />
              {emailError && <div id="emailError" className="text-red-500 text-sm mt-1">{emailError}</div>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
                disabled={loading}
                aria-describedby="passwordError"
              />
              {passwordError && <div id="passwordError" className="text-red-500 text-sm mt-1">{passwordError}</div>}
            </div>

            <button
              type="submit"
              className={`w-full text-white py-2 rounded hover:bg-green-600 active:bg-green-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ backgroundColor: '#02664A' }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
