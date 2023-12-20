import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserModal from "./UserModal";
import instance from "../axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await instance.get("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {}
    };
    fetchUsers();
  }, []);

  const handleUpdate = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleUpdateUser = (updatedUserData) => {
    const updatedUsers = users.map((user) => {
      if (user._id === selectedUserId) {
        return { ...user, ...updatedUserData };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleDelete = async (userId) => {
    setSelectedUserId(userId);
    setConfirmDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await instance.delete(`/api/users/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User deleted successfully");

      const updatedUsers = users.filter((user) => user._id !== selectedUserId);
      setUsers(updatedUsers);
      setConfirmDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const cancelDelete = () => {
    setSelectedUserId(null);
    setConfirmDeleteModal(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Profession</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          {users.length === 0 ? (
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-center" colSpan="6">
                  No users found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{user.name}</td>
                  <td className="border px-4 py-2 text-center">{user.email}</td>
                  <td className="border px-4 py-2 text-center">{user.phone}</td>
                  <td className="border px-4 py-2 text-center">
                    {user.profession}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleUpdate(user._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {isModalOpen && (
        <UserModal
          userId={selectedUserId}
          onClose={handleModalClose}
          onUpdate={handleUpdateUser}
        />
      )}

      {confirmDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
