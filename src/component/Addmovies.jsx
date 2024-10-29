import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMovies = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [videoType, setVideoType] = useState('LINK'); // Default to LINK
  const [videoUrl, setVideoUrl] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(''); // Success message
  const [error, setError] = useState(''); // Error message

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ottb.leadgenadvertisements.com/api/category/v1/categories', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setCategories(response.data.data); // Adjust based on actual API response structure
      } catch (error) {
        setCategories([]); // Ensure categories is an array even if the request fails
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form fields to FormData
    formData.append('name', name);
    formData.append('description', description);
    if (image) formData.append('image', image); // Ensure 'image' is a File object
    formData.append('videoType', videoType);

    // Handle video uploads based on the type
    if (videoType === 'UPLOAD' && video) {
      formData.append('movie', video); // Ensure 'video' is a File object
    } else if (videoType === 'LINK') {
      formData.append('videoUrl', videoUrl);
    }

    formData.append('categoryId', categoryId);
    formData.append('status', 'PENDING'); // Set default status or modify as needed

    

    try {
      setLoading(true); // Start loading
      // Get the token if you have authorization set up
      const token = localStorage.getItem('adminToken');

      // Make the POST request using axios
      const response = await axios.post('https://ottb.leadgenadvertisements.com/api/movie/v1/movie', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Movie added successfully!');
      setError(''); // Clear any previous error
      resetForm(); // Reset the form fields
    } catch (error) {
      setError('Failed to add movie. Please try again later.');
      setSuccess(''); // Clear any previous success message
    } finally {
      setLoading(false); // End loading
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategoryId('');
    setVideoType('LINK');
    setVideoUrl('');
    setImage(null);
    setVideo(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Add Movie</h1>
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
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
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          <div className="mb-3">
            <label className="block text-gray-700">Category ID:</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Category</option>
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name} ({category._id})
                  </option>
                ))
              ) : (
                <option disabled>Loading categories...</option>
              )}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Video Type:</label>
            <select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="LINK">Link</option>
              <option value="UPLOAD">Upload</option>
            </select>
          </div>
          {videoType === 'LINK' && (
            <div className="mb-3">
              <label className="block text-gray-700">Video URL:</label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
          {videoType === 'UPLOAD' && (
            <div className="mb-3">
              <label className="block text-gray-700">Video File:</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
          <button
            type="submit"
            className={`w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Movie'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovies;
