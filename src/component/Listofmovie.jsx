import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Listofmovie = () => {
  const [Products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ottb.leadgenadvertisements.com/api/category/v1/categories', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        if (response.status === 200) {
          setCategories(response.data.data);
        }
      } catch {
        setError('Failed to fetch categories. Please try again later.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await axios.get('https://ottb.leadgenadvertisements.com/api/movie/v1/Products', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        if (response.status === 200) {
          setProducts(response.data.data.data);
          setTotalPages(response.data.data.totalPages);
        }
      } catch {
        setError('Failed to fetch Products. Please try again later.');
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage]);

  if (loadingProducts || loadingCategories) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const categoryMap = categories.reduce((acc, category) => {
    acc[category._id] = category.name;
    return acc;
  }, {});

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Product List</h1>
      {Products.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Video Link</th>
              <th className="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((movie) => (
              <tr key={movie._id} className="hover:bg-gray-100 text-center">
                <td className="border px-4 py-2">
                  {categoryMap[movie.categoryId] || 'Unknown Category'}
                </td>
                <td className="border px-4 py-2">{movie.name}</td>
                <td className="border px-4 py-2">{movie.description}</td>
                <td className="border px-4 py-2">
                  <img 
                    src={`https://ottb.leadgenadvertisements.com/${movie.imageUrl}`} 
                    alt={movie.name} 
                    className="w-20 h-auto" 
                    crossOrigin="anonymous"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                </td>
                <td className="border px-4 py-2">{movie.videoLink}</td>
                <td className="border px-4 py-2">
                  {movie.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Products found.</div>
      )}
      
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Listofmovie;
