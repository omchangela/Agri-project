// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import AdminDashboard from './component/AdminDashboard';
import Dashboard from './component/dashboard'; // Create this component
import AddBanner from './component/AddBanner';
import AddCategory from './component/AddCategory';
import AddMovies from './component/Addmovies';
import ProtectedRoute from './component/ProtectedRoute'; 
import Listofmovie from './component/Listofmovie';
import AddUser from './component/AddUser';
import ViewUsers from './component/ViewUsers'; // Import the ViewUsers component
import EditUser from './component/EditUser'; // Import the EditUser component
import EditMovie from './component/EditMovie';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="addmovies" element={<ProtectedRoute><AddMovies /></ProtectedRoute>} />
          <Route path="addcategory" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
          <Route path="addbanner" element={<ProtectedRoute><AddBanner /></ProtectedRoute>} />
          <Route path="listmovie" element={<ProtectedRoute><Listofmovie /></ProtectedRoute>} />
          <Route path="adduser" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
          <Route path="view-users" element={<ProtectedRoute><ViewUsers /></ProtectedRoute>} /> {/* New route for ViewUsers */}
          <Route path="edit-user/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} /> {/* New route for EditUser */}
          <Route path="edit-movie/:id" element={<ProtectedRoute><EditMovie /></ProtectedRoute>} /> {/* New route for EditUser */}
        </Route>
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
