import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMovieModal = ({ movie, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    description: '',
    imageUrl: '',
    videoType: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        categoryId: movie.categoryId,
        name: movie.name,
        description: movie.description,
        imageUrl: movie.imageUrl,
        videoType: movie.videoType
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ottb.leadgenadvertisements.com/api/movie/v1/movies/${movie._id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      onSave();
    } catch (err) {
      console.error('Failed to update movie', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Edit Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Category ID</label>
            <input
              type="text"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Video Type</label>
            <input
              type="text"
              name="videoType"
              value={formData.videoType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 rounded bg-gray-500 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieModal;
