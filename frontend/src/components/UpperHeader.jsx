import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import LowerHeader from "./LowerHeader";
import logo from "../assets/Assets/alogo.svg";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UpperHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("aditya-token");

    if (token) {
      // Decode the token to get expiration time and role
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        // Token is expired, redirect to home page
        localStorage.removeItem("aditya-token");
        localStorage.removeItem("userData"); // Optionally clear the token
        navigate("/"); // Redirect to home
      } else {
        // Token is valid, redirect based on the role
        const role = decodedToken.role; // Assuming the role is stored as 'role' in the token

        if (role === "admin") {
          navigate("/admin/user");
        } else if (role === "superAdmin") {
          navigate("/admin/analytics");
        } else {
          // Handle other roles or default case if necessary
          navigate("/admin"); // or wherever you'd like to redirect by default
        }
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading indicator

    const data = JSON.stringify({
      username: username,
      password: password,
    });

    const config = {
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/admin/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios(config);

      // If login is successful
      if (response.data?.success) {
        const token = response.data?.token;
        // Save the user data and token in local storage
        localStorage.setItem("userData", JSON.stringify(response.data?.data));
        localStorage.setItem("aditya-token", token);

        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        // Redirect to admin page
        if (role === "admin") {
          navigate("/admin/user");
        } else if (role === "superAdmin") {
          navigate("/admin/analytics");
        } else {
          // Handle other roles or default case if necessary
          navigate("/admin"); // or wherever you'd like to redirect by default
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      // Handle server errors (e.g., 404, 401, 500)
      console.log(error);
      if (error.response) {
        const status = error.response.status;

        // Handle specific status codes
        if (status === 404) {
          setError("Admin not found");
        } else if (status === 401) {
          setError("Invalid password");
        } else {
          setError("Internal server error");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white px-4 py-0 md:py-3">
        <div className="container flex mx-auto flex-row mt-2 md:flex-row justify-between items-center">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="w-16 h-auto object-contain md:mr-auto lg:flex rounded-lg hidden sm:block"
            />
          </Link>
          <div className="hidden md:flex items-center justify-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 text-lg font-semibold tracking-wide cursor-pointer ${
                  isActive ? "text-[#62BC00] " : "text-[#051836]"
                } hover:scale-110 duration-300 ease-in-out hover:text-[#058405]`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 text-lg font-semibold tracking-wide cursor-pointer ${
                  isActive ? "text-[#62BC00] " : "text-[#051836]"
                } hover:scale-110 duration-300 ease-in-out hover:text-[#058405]`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 text-lg font-semibold tracking-wide cursor-pointer ${
                  isActive ? "text-[#62BC00] " : "text-[#051836]"
                } hover:scale-110 duration-300 ease-in-out hover:text-[#058405]`
              }
            >
              Contact Us
            </NavLink>
          </div>
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="focus:outline-none text-white bg-[#62BC00] transition ease-in-out hover:duration-300 hover:transform hover:scale-105 focus:ring-4 focus:ring-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  hidden sm:block"
          >
            Login
          </button>
        </div>
        <div
          id="sidebar"
          className="md:hidden flex items-center justify-between  w-full md:w-auto"
        >
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <GiHamburgerMenu size={24} />
          </button>
          <button
            type="submit"
            onClick={() => setShowLoginModal(true)}
            className="text-white bg-[#62BC00] hover:bg-[#d4531c] transition ease-in-out hover:duration-300 focus:ring-4 font-medium text-sm rounded-lg px-5 py-2.5 me-2 "
          >
            Login
          </button>
          {sidebarOpen && (
            <div
              ref={sidebarRef}
              className="sidebar transition-transform transform translate-x-0 fixed top-0 left-0 z-10 bg-gray-700 p-6 w-[60%] h-[100vh] flex flex-col justify-between"
            >
              <div>
                <img
                  src={logo}
                  alt=""
                  className="w-16 h-16 object-contain mb-2 rounded-lg"
                />
                <p className="rounded-xl p-2 text-center cursor-pointer font-semibold bg-[#ff783e] text-white tracking-wider">
                  Home
                </p>

                <p className="rounded-xl p-2 text-center cursor-pointer font-semibold bg-gray-200 mt-2   tracking-wider">
                  AboutUs
                </p>
                <p className="rounded-xl p-2 text-center cursor-pointer font-semibold bg-gray-200 mt-2   tracking-wider">
                  ContactUs
                </p>
              </div>
              <footer className="mt-4 text-center text-sm text-gray-500 font-mono">
                © 2024 Aditya Enterprises
              </footer>
            </div>
          )}
        </div>
      </nav>
      <LowerHeader />
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[88%] sm:w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4 ">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62BC00]"
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full  px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62BC00] pr-5"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 top-8 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEye /> : <IoEyeOffOutline />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#62BC00] hover:bg-[#058405] text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62BC00]"
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpperHeader;
