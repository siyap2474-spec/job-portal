import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { HiOutlineBars3, HiXMark } from "react-icons/hi2";

import logo from "../assets/Logo.png";

function Navbar() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setMobileMenu(false);
  };

  // Candidate Links
  const candidateLinks = [
    { name: "Jobs", path: "/jobs" },
    { name: "Saved Jobs", path: "/saved-jobs" },
    { name: "Applications", path: "/my-applications" },
    { name: "Profile", path: "/profile" },
    {name: "Notification", path: "/notifications"}
  ];

  // Recruiter Links
  const recruiterLinks = [
  { name: "My Jobs", path: "/recruiter/jobs" },
  { name: "Candidates", path: "/find-candidates" },
  { name: "Create Job", path: "/create-job" },
];
  const mobileLinks =
    user?.role === "RECRUITER"
      ? recruiterLinks
      : candidateLinks;

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow px-4 md:px-8 py-4 flex items-center justify-between">

        {/* LEFT LOGO */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-12" />
        </div>

        {/* CENTER TEXT */}
        <div className="hidden md:block text-center">
          <Link
            to="/"
            className="text-5xl font-bold text-blue-600"
            style={{ fontFamily: "Cabin Sketch" }}
          >
            sckilled
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
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
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {user?.name}
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 bg-white shadow rounded w-32 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMobileMenu(true)}
            className="md:hidden text-3xl text-blue-600"
          >
            <HiOutlineBars3 />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-[260px] max-w-[80%] bg-white shadow-2xl z-[999] transform transition-transform duration-300 overflow-y-auto ${mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="h-10" />

            <h2
              className="text-3xl font-bold text-blue-600"
              style={{ fontFamily: "Cabin Sketch" }}
            >
              sckilled
            </h2>
          </div>

          <button
            onClick={() => setMobileMenu(false)}
            className="text-3xl"
          >
            <HiXMark />
          </button>
        </div>

        {/* MOBILE CONTENT */}
        <div className="flex flex-col p-5 gap-3">

          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="px-4 py-3 border border-blue-600 rounded text-blue-600 text-center"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="px-4 py-3 bg-blue-600 text-white rounded text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {mobileLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded font-medium ${isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white py-3 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* OVERLAY */}
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 bg-black/40 z-[998]"
        />
      )}
    </>
  );
}

export default Navbar;