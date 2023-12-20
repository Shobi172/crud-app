import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profession: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    if (name.trim() === "") {
      return false;
    }
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validatePhone = (phone) => {
    if (phone.trim() === "") {
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateProfession = (profession) => {
    if (profession.trim() === "") {
      return false;
    }
    const professionRegex = /^[a-zA-Z\s]*$/;
    return professionRegex.test(profession);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!validateName(formData.name)) {
      validationErrors = { ...validationErrors, name: "Invalid name format" };
    }

    if (!validateEmail(formData.email)) {
      validationErrors = { ...validationErrors, email: "Invalid email format" };
    }

    if (!validatePassword(formData.password)) {
      validationErrors = {
        ...validationErrors,
        password: "Password should be at least 6 characters long",
      };
    }

    if (!validatePhone(formData.phone)) {
      validationErrors = {
        ...validationErrors,
        phone: "Invalid phone number format (should be 10 digits)",
      };
    }

    if (!validateProfession(formData.profession)) {
      validationErrors = {
        ...validationErrors,
        profession: "Invalid profession format (only alphabets and spaces)",
      };
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await instance.post("/api/register", formData);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Profession"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
          />
          {errors.profession && (
            <p className="text-red-500 text-sm">{errors.profession}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
