import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('ACTIVE'); // Default status
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('status', status);
    if (image) formData.append('image', image); // Ensure 'image' is a File object

    try {
      console.log('Submitting form data:', {
        name,
        email,
        password,
        status,
        image
      });

      const response = await axios.post('https://ottb.leadgenadvertisements.com/api/user/v1/user', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('User added successfully:', response.data);
      setSuccess(true);
      resetForm();
    } catch (err) {
      console.error('Error adding user:', err.response || err.message || err);
      setError('An error occurred while adding the user.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setStatus('ACTIVE'); // Reset status to default
    setImage(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Add User</h1>
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
          <div className="mb-3">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-4">Status:</label>
            <div className="relative inline-block w-16 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                checked={status === 'ACTIVE'}
                onChange={() => setStatus(status === 'ACTIVE' ? 'PENDING' : 'ACTIVE')}
                className="toggle-checkbox absolute block w-10 h-6 rounded-full bg-gray-200 border-4 appearance-none cursor-pointer"
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
            <span className="ml-2 text-gray-700">{status}</span>
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
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add User'}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && <div className="text-green-500 mt-2">User added successfully!</div>}
        </form>
      </div>
    </div>
  );
};

export default AddUser;
