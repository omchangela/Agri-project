// frontend/src/component/Navbar.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove token from local storage
    localStorage.removeItem('adminEmail'); // Remove email from local storage if needed
    navigate('/login'); // Redirect to login page
  };

  // Retrieve the email or username from local storage
  const email = localStorage.getItem('adminEmail');

  return (
    <header className="flex items-center justify-end bg-blue-500 p-4 text-white">
      <div className="flex items-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" 
          alt="Country Flag" 
          className="w-8 h-8 mr-2" 
        />
        <span className="mr-2">Welcome, {email || 'User'}</span>
       
      </div>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
