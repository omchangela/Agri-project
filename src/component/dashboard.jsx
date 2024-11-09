import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import userlogo from '../assets/user.png'
// import productlogo from '../assets/productlogo.png'

const ManageBanners = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://ottb.leadgenadvertisements.com/api/counts/v1', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        

        if (response.data.success) {
          const { Products, users } = response.data.data;
          setTotalProducts(Products);
          setTotalUsers(users);
        } else {
          setError('Failed to retrieve data');
        }
      } catch (error) {
        setError('An error occurred while fetching dashboard data.');
      }
    };

    fetchDashboardData();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          
      {/* <img src={userlogo} alt="UserLogo" className="w-32 h-32 object-contain" /> */}
          <h3 className="text-xl">Total Users</h3>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
{/*           
      <img src={productlogo} alt="ProductLogo" className="w-32 h-32 object-contain" /> */}
          <h3 className="text-xl">Total Products</h3>
          <p className="text-2xl">{totalProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default ManageBanners;
