import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "../axios";

const UserModal = ({ userId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profession: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await instance.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, phone, profession } = response.data;
        setFormData({ name, phone, profession });
      } catch (error) {
        toast.error("Failed to fetch user details");
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await instance.put(`/api/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User updated successfully");
      onUpdate(formData);
      onClose();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="relative w-96 mx-auto my-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex justify-end p-4">
            <button onClick={onClose}>
              <span className="text-3xl">×</span>
            </button>
          </div>
          <div className="p-6">
            <h2 className="font-bold text-2xl text-center">Edit User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter name"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone:
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter phone number"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profession:
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter profession"
                  />
                </label>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
