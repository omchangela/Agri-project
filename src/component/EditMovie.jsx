import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: '',
    description: '',
    categoryId: '',
    videoType: 'LINK', // Default to 'LINK'
    imageUrl: '',
    status: 'PUBLISHED',
    currentImage: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  // Base URL for the image
  const BASE_URL = 'https://ottb.leadgenadvertisements.com/';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://ottb.leadgenadvertisements.com/api/movie/v1/movie/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        setMovie((prevMovie) => ({
          ...prevMovie,
          ...response.data.data,
          currentImage: BASE_URL + response.data.data.imageUrl, // Construct full URL for the current image
        }));
        // Set the video URL based on fetched data
        setVideoUrl(response.data.data.videoUrl || '');
      } catch (err) {
        setError('Failed to fetch movie details.');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ottb.leadgenadvertisements.com/api/category/v1/categories', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        setCategories(response.data.data);
      } catch (err) {
        setError('Failed to fetch categories.');
      }
    };

    fetchMovie();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
    if (name === 'videoType' && value === 'UPLOAD') {
      setVideoUrl(''); // Clear video URL if switching to UPLOAD
      setVideoFile(null); // Clear the uploaded file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form data
    formData.append('name', movie.name);
    formData.append('description', movie.description);
    formData.append('categoryId', movie.categoryId);
    formData.append('videoType', movie.videoType);
    formData.append('status', movie.status);

    // Append videoUrl or videoFile based on videoType
    if (movie.videoType === 'LINK') {
      formData.append('videoUrl', videoUrl);
    } else if (movie.videoType === 'UPLOAD' && videoFile) {
      formData.append('video', videoFile);
    }

    // Append new image file if selected
    if (movie.imageUrl) {
      formData.append('image', movie.imageUrl);
    }

    try {
      await axios.put(`https://ottb.leadgenadvertisements.com/api/movie/v1/movie/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin/listmovie'); // Navigate back to the movie list
    } catch (err) {
      setError('Failed to update movie.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Movie</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={movie.name}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="categoryId"
            value={movie.categoryId}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Video Type:</label>
          <select
            name="videoType"
            value={movie.videoType}
            onChange={handleChange}
            required
            className="border px-2 py-1 w-full"
          >
            <option value="LINK">Link</option>
            <option value="UPLOAD">Upload</option>
          </select>
        </div>
        {movie.videoType === 'LINK' && (
          <div>
            <label>Video URL:</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              className="border px-2 py-1 w-full"
            />
          </div>
        )}
        {movie.videoType === 'UPLOAD' && (
          <div>
            <label>Upload Video File:</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="border px-2 py-1 w-full"
            />
          </div>
        )}
        
        <div className="mt-2">
          <h2 className="text-lg">Current Image:</h2>
          {movie.currentImage && (
            <img
              src={movie.currentImage}
              alt="Current Movie"
              className="mt-2 max-w-full h-auto"
            />
          )}
        </div>
        <div>
          <label>New Image File:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMovie((prev) => ({ ...prev, imageUrl: e.target.files[0] }))} // Changed to imageUrl
            className="border px-2 py-1 w-full"
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={movie.status}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          >
            <option value="PUBLISHED">PUBLISH</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
