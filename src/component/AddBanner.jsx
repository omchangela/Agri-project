import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const AddBrand = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]); // For handling multiple images
  // const [success, setSuccess] = useState('');
  // const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State to store categories
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('adminToken');
  //   if (!token) {
  //     navigate('/'); // Redirect to login if token is not present
  //   } else {
  //     fetchCategories(token); // Fetch categories if token exists
  //   }
  // }, [navigate]);

  const fetchCategories = async (token) => {
    try {
      const response = await axios.get('https://ottb.leadgenadvertisements.com/api/Brand/v1/Brand', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCategories(response.data); // Assuming the data contains an array of categories
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again later.');
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.filter(
      (file) => file.size <= 2 * 1024 * 1024 // Filter files larger than 2MB
    );

    if (newImages.length + images.length > 4) {
      setError('You can upload a maximum of 4 images.');
      return;
    }

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 4)); // Limit to 4 images
    setError(''); // Clear any previous error
  }, [images]);

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
    maxSize: 2 * 1024 * 1024, // 2MB max size
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    images.forEach((image) => formData.append('image', image));

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      const response = await axios.post('https://ottb.leadgenadvertisements.com/api/Brand/v1/Brand', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        setSuccess('Brand added successfully!');
        setName('');
        setImages([]);
        setError('');
        fetchCategories(token); // Refresh Brand list
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError('Invalid input. Please check your data and try again.');
        } else if (err.response.status === 401) {
          setError('Unauthorized. Please log in and try again.');
        } else {
          setError('Failed to add Brand. Please try again later.');
        }
      } else {
        setError('Failed to add Brand. Please check your network connection.');
      }
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs mb-8">
        <h2 className="text-2xl font-bold text-center mb-14">Add Brand</h2>
        {/* {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>} */}
        <form onSubmit={handleSubmit}>
          <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer rounded">
            <input {...getInputProps()} />
            <p className="text-black-600">Upload images</p>
            <span className="text-gray-500 font-medium text-[9px] leading-[15px]">Image size is less than 2 MB</span>
          </div>
          <span className="text-gray-500 font-medium text-[10px] leading-[15px]">Note: Only 4 images can be uploaded</span>

          <div className="flex flex-wrap mt-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative m-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Brand Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Brand Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: '#02664A' }}
            className="w-full text-white py-2 rounded hover:bg-green-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Display Brand List */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Brand List</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b">Sr No.</th>
              <th className="p-2 border-b">Brand Name</th>
              <th className="p-2 border-b">Brand Image</th>
              <th className="p-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((Brand, index) => (
              <tr key={Brand.id} className="text-center">
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{Brand.name}</td>
                <td className="p-2 border-b">
                  <img
                    src={Brand.imageUrl} // Assuming 'imageUrl' is the field for the image path
                    alt={Brand.name}
                    className="w-12 h-12 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-2 border-b">{Brand.status ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddBrand;
