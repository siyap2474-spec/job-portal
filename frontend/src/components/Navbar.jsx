import React, { useState } from "react";
import { Link } from "react-router-dom";
import{ useSelector, useDispatch } from "react-redux";
import {logout} from "../features/auth/authSlice";

import logo from "../assets/Logo.png";

function Navbar() {
const dispatch = useDispatch();
const { user, token } = useSelector((state) => state.auth);
const [showMenu, setShowMenu] = useState(false);
const handleLogout = () => {
    dispatch(logout());
}

  return (
  <nav className="bg-white shadow px-8 py-4 flex items-center">
    <div className="w-1/3">
      <img src={logo} alt="logo" className="h-12" />
    </div>

    <div className="w-1/3 text-center">
      <Link to="/" className="text-5xl font-bold text-blue-600" style={{ fontFamily: "Cabin Sketch" }}>
        sckilled
      </Link>
    </div>

    <div className="w-1/3 flex justify-end gap-4 items-center">
      {!token ? (
        <>
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 rounded text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          {user?.role === "CANDIDATE" && (
            <Link to="/candidate/dashboard" className="text-black">
              Dashboard
            </Link>
          )}

          {user?.role === "RECRUITER" && (
            <Link to="/recruiter/dashboard" className="text-black">
              Dashboard
            </Link>
          )}

          <div className="relative">
  <button
    onClick={() => setShowMenu(!showMenu)}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    {user?.name}
  </button>

  {showMenu && (
    <div className="absolute right-0 mt-2 bg-white shadow rounded w-32">
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
      >
        Logout
      </button>
    </div>
  )}
</div>
        </>
      )}
    </div>
  </nav>
);
}

export default Navbar;
