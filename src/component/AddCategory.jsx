import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/'); // Redirect to login if token is not present
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }

      const response = await axios.post('https://ottb.leadgenadvertisements.com/api/category/v1/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        setSuccess('Category added successfully!');
        setName('');
        setImage(null);
        setError(''); // Clear any previous error
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError('Invalid input. Please check your data and try again.');
        } else if (err.response.status === 401) {
          setError('Unauthorized. Please log in and try again.');
        } else {
          setError('Failed to add category. Please try again later.');
        }
      } else {
        setError('Failed to add category. Please check your network connection.');
      }
      setSuccess(''); // Clear any previous success message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs">
        <h2 className="text-2xl font-bold text-center mb-6">Add Category</h2>
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Category Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
