import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo2.png';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-[#F8F8F8] shadow-md w-64 min-h-screen">
      <div className="pt-4 text-center bg-[#F8F8F8]">
        <img src={logo} alt="Admin Logo" className="mx-auto w-30 h-20" />
      </div>
      <nav className="mt-4">
        <ul>
          <li>
            <Link
              to="/admin/dashboard"
              className={`block p-4 text-gray-700 transition duration-200 ${
                location.pathname === '/admin/dashboard' ? 'text-lg bg-[#02664A] text-white' : 'hover:bg-gray-200'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/view-users"
              className={`block p-4 text-gray-700 transition duration-200 ${
                location.pathname === '/admin/view-users' ? 'text-lg bg-[#02664A] text-white' : 'hover:bg-gray-200'
              }`}
            >
              User List
            </Link>
          </li>
          <li>
            <Link
              to="/admin/listproduct"
              className={`block p-4 text-gray-700 transition duration-200 ${
                location.pathname === '/admin/listproduct' ? 'text-lg bg-[#02664A] text-white' : 'hover:bg-gray-200'
              }`}
            >
              Product List
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addproduct"
              className={`block p-4 text-gray-700 transition duration-200 ${
                location.pathname === '/admin/addproduct' ? 'text-lg bg-[#02664A] text-white' : 'hover:bg-gray-200'
              }`}
            >
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addcategory"
              className={`block p-4 text-gray-700 transition duration-200 ${
                location.pathname === '/admin/addcategory' ? 'text-lg bg-[#02664A] text-white' : 'hover:bg-gray-200'
              }`}
            >
              Create Category
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addbrand"
              className={`block p-4 text-gray-700 transition duration-200 ${
                location.pathname === '/admin/addbrand' ? 'text-lg bg-[#02664A] text-white' : 'hover:bg-gray-200'
              }`}
            >
              Create Brand
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
