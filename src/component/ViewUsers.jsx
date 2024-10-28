import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://ottb.leadgenadvertisements.com/api/user/v1/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`https://ottb.leadgenadvertisements.com/api/user/v1/user/${userToDelete._id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setUsers(users.filter(user => user._id !== userToDelete._id));
        setShowDeleteModal(false);
        setUserToDelete(null);
      } catch (err) {
        setError(`Failed to delete user: ${err.response?.data?.message || 'Unknown error'}`);
      }
    }
  };

  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleAddUser = () => {
    navigate('/admin/adduser');
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">View Users</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.status}</td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <button 
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-500 hover:underline"
                      onClick={() => handleShowDeleteModal(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center border-b">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete {userToDelete.name}?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Fixed Add User Button */}
      <div className="absolute top-4 right-4">
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default ViewUsers;
