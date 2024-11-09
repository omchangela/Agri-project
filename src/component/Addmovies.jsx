import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const AddMovies = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState(''); // New brand state
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]); // New brands state
  const [videoUrl, setVideoUrl] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ottb.leadgenadvertisements.com/api/category/v1/categories', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setCategories(response.data.data);
      } catch (error) {
        setCategories([]);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get('https://api.example.com/brands', { // Update with actual brand API
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setBrands(response.data.data);
      } catch (error) {
        setBrands([]);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 4,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('categoryId', categoryId);
    formData.append('brandId', brandId);
    formData.append('videoUrl', videoUrl);
    if (image) formData.append('image', image);

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      await axios.post('https://ottb.leadgenadvertisements.com/api/movie/v1/movie', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Product added successfully!');
      setError('');
      resetForm();
    } catch (error) {
      setError('Failed to add product. Please try again later.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategoryId('');
    setBrandId('');
    setVideoUrl('');
    setImage(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-10"></h1>
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
        <div className="mb-10">
            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer rounded">
              <input {...getInputProps()} />
              <p className="text-black-600">Upload images</p>
              <span className="text-gray-500 font-medium text-[9px] leading-[15px]">Image size is less than 2 MB</span>
            </div>
            <span className="text-gray-500 font-medium text-[10px] leading-[15px]">Note: Only 4 image can be uploaded</span>
          </div>

          <div className="mb-3">
            <label className="block text-gray-700">Product Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Product Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-gray-700">Select Category:</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value=""></option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Select Brand:</label>
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value=""></option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Video URL:</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            style={{backgroundColor: '#02664A'}}
            className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovies;
