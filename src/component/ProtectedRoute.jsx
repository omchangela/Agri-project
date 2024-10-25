// frontend/src/component/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
