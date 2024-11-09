// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('adminToken');

//   // If no token, redirect to login
//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   return children; // Render the protected component
// };

// export default ProtectedRoute;


import React from 'react';

const ProtectedRoute = ({ children }) => {
  return children;
};

export default ProtectedRoute;
