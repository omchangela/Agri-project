import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBanner = () => {
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login'); // Redirect to login if token is not present
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Ensure the image is set before appending
    if (image) {
      formData.append('image', image);
      setValidationError(''); // Clear any validation errors
    } else {
      setValidationError('Please select an image to upload.');
      return; // Early return if no image is set
    }

    try {
      setLoading(true); // Start loading
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      const response = await axios.post('https://ottb.leadgenadvertisements.com/api/banner/v1/banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccess('Banner added successfully!');
        setImage(null); // Clear the image state
        document.getElementById('bannerImage').value = null; // Clear the file input
        setError(''); // Clear any previous error
      }
    } catch (err) {
      if (err.response) {
        console.error('Error Response:', err.response.data);
        if (err.response.status === 400) {
          setError('Invalid input. Please check your data and try again.');
        } else if (err.response.status === 401) {
          setError('Unauthorized. Please log in and try again.');
        } else {
          setError('Failed to add Banner. Please try again later.');
        }
      } else {
        setError('Failed to add Banner. Please check your network connection.');
      }
      setSuccess(''); // Clear any previous success message
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs">
        <h2 className="text-2xl font-bold text-center mb-6">Add Banner</h2>
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {validationError && <div className="text-red-500 mb-4">{validationError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Banner Image:</label>
            <input
              id="bannerImage" // Assign an id to the input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Add Banner'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
