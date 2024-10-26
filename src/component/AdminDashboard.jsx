import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-grow flex flex-col">
        <Navbar />

        {/* This div allows for scrolling while keeping the Navbar fixed */}
        <div className="flex-grow overflow-auto p-6">
          {/* The Outlet will render the selected component from the route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
