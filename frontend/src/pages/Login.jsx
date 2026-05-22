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
    <div className="min-h-screen grid grid-cols-2 bg-white">
      <div className="flex justify-center items-center">
        <img src={loginImg} alt="login" className="w-[481px]" />
      </div>

      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[371px]">

          <h1 className="text-4xl font-bold text-blue-500 mb-10">
            Welcome back!
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 mb-8 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Log In
          </button>

          <p className="mt-8 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;