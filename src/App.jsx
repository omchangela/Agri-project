// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import AdminDashboard from './component/AdminDashboard';
import Dashboard from './component/dashboard'; // Create this component
import AddBanner from './component/AddBanner';
import AddCategory from './component/AddCategory';
import AddMovies from './component/Addmovies';
import ProtectedRoute from './component/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="addmovies" element={<ProtectedRoute><AddMovies /></ProtectedRoute>} />
          <Route path="addcategory" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
          <Route path="addbanner" element={<ProtectedRoute><AddBanner /></ProtectedRoute>} />
        </Route>
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
