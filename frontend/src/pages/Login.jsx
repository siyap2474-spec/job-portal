import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../features/auth/authAPI";
import { loginSuccess } from "../features/auth/authSlice";

import loginImg from "../assets/loginImg.png";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      const response = await loginUser(formData);
      dispatch(loginSuccess(response.data));

      if (response.data.user.role === "CANDIDATE") {
        navigate("/candidate/dashboard");
      } else {
        navigate("/recruiter/dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    // <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 bg-white">
<div className="min-h-screen md:h-screen md:grid md:grid-cols-2 bg-white overflow-hidden">      {/* LEFT IMAGE (hidden on mobile) */}
      <div className="hidden md:flex justify-center items-center bg-gray-50 p-6">
        <img
          src={loginImg}
          alt="login"
          className="w-[280px] md:w-[400px] lg:w-[480px] object-contain"
        />
      </div>

      {/* RIGHT FORM */}
      {/* <div className="flex justify-center items-center px-4 py-10"> */}
{/* <div className="flex justify-center items-center px-4 py-6 md:py-0"> */}

<div className="flex items-center justify-center min-h-screen md:min-h-0 px-4">        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm md:w-[371px]"
        >

          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8 text-center md:text-left">
            Welcome back!
          </h1>

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
            className="w-full border p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>

          <p className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;