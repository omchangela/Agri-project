import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBanners = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalBanners, setTotalBanners] = useState(0);
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
          const { movies, categories, banners, users } = response.data.data;
          setTotalMovies(movies);
          setTotalCategories(categories);
          setTotalBanners(banners);
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
          <h3 className="text-xl">Total Users</h3>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3 className="text-xl">Total Movies</h3>
          <p className="text-2xl">{totalMovies}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded shadow">
          <h3 className="text-xl">Total Categories</h3>
          <p className="text-2xl">{totalCategories}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h3 className="text-xl">Total Banners</h3>
          <p className="text-2xl">{totalBanners}</p>
        </div>
      </div>
    </div>
  );
};

export default ManageBanners;
