import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../features/auth/authAPI";

import registrationImg from "../assets/registrationImg.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CANDIDATE"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("Registration successful");
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 bg-white">

      {/* LEFT IMAGE (hidden on mobile) */}
      <div className="hidden md:flex justify-center items-center bg-gray-50 p-6">
        <img
          src={registrationImg}
          alt="register"
          className="w-[280px] md:w-[400px] lg:w-[480px] object-contain"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex justify-center items-center px-4 py-10">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm md:w-[371px]"
        >

          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8 text-center md:text-left">
            Create Account
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="CANDIDATE">Candidate</option>
            <option value="RECRUITER">Recruiter</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;