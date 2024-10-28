import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState(''); // State for password
  const [currentPassword, setCurrentPassword] = useState(''); // State for displaying current password

  const BASE_URL = 'https://ottb.leadgenadvertisements.com/'; // Base URL for images

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://ottb.leadgenadvertisements.com/api/user/v1/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        console.log('Response data:', response.data); // Log the entire response

        // Adjust based on the structure of your API response
        const { name, email, status, image: userImage, password: userPassword } = response.data.data; // Assuming password is in response
        setName(name);
        setEmail(email);
        setStatus(status);
        setCurrentImage(userImage ? `${BASE_URL}${userImage}` : ''); // Set current image URL
        setCurrentPassword(userPassword); // Set current password
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('status', status);
    if (image) formData.append('image', image);
    if (password) formData.append('password', password); // Include new password if provided
  
    try {
      const response = await axios.put(`https://ottb.leadgenadvertisements.com/api/user/v1/user/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User updated successfully:', response.data);
      navigate('/admin/view-users');
    } catch (err) {
      console.error('Error updating user:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        setError(`Failed to update user: ${err.response.data.message || 'Unknown error'}`);
      } else {
        setError('Failed to update user: Network error');
      }
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Leave empty to keep current password"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Image File:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {currentImage && (
            <div className="mb-3">
              <label className="block text-gray-700">Current Image:</label>
              <img
                src={currentImage}
                alt="Current"
                className="w-36 h-36 object-cover mx-auto"
                onError={() => {
                  console.error('Image failed to load:', currentImage);
                  setCurrentImage(''); // Optionally clear the image if it fails
                }}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
