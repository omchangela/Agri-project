// frontend/src/component/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-[#F8F8F8] shadow-md w-64 min-h-screen">
      <div className="p-4 text-center bg-[#F8F8F8] text-black font-bold text-xl">
        Admin Panel
      </div>
      <nav className="mt-4">
        <ul>
        <li>
            <Link
              to="/admin/dashboard"
              className="block p-4 text-gray-700 hover:bg-gray-200 transition duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addmovies"
              className="block p-4 text-gray-700 hover:bg-gray-200 transition duration-200"
            >
              Add Movies
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addcategory"
              className="block p-4 text-gray-700 hover:bg-gray-200 transition duration-200"
            >
              Add Category
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addbanner"
              className="block p-4 text-gray-700 hover:bg-gray-200 transition duration-200"
            >
              Add Banner
            </Link>
          </li>
          <li>
            <Link
              to="/admin/listmovie"
              className="block p-4 text-gray-700 hover:bg-gray-200 transition duration-200"
            >
              List of movie
            </Link>
          </li>
          <li>
            <Link
              to="/admin/view-users"
              className="block p-4 text-gray-700 hover:bg-gray-200 transition duration-200"
            >
              User List
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
