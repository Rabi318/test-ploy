import React, { useEffect, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { MdPayment } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import logo from "../../assets/Assets/alogo.svg";
import { CiWheat } from "react-icons/ci";
import defaultUserImg from "../../assets/userimg.jpeg";
import { IoIosNotifications } from "react-icons/io";

const Navbar = ({
  isDarkMode,
  toggleDarkMode,
  isSidepannel,
  toggleSidebar,
  userRole,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userPhoto, setUserPhoto] = useState(defaultUserImg);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")); // Retrieve user data
    if (userData && userData.photo) {
      setUserPhoto(userData.photo); // Set user photo from localStorage
    } else {
      setUserPhoto(defaultUserImg); // Fallback to default image
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const changePasswordClick = () => {
    setIsChangePasswordOpen(true);
    setIsUserMenuOpen(false);
  };
  const closeChangePassword = () => {
    setIsChangePasswordOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const handleLogout = () => {
    localStorage.removeItem("aditya-token");
    localStorage.removeItem("userData");

    // Redirect to login page after logout
    navigate("/");
  };
  const handleMobileMenuClick = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
  };
  useEffect(() => {
    if (passwordError) {
      const timer = setTimeout(() => {
        setPasswordError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordError]);
  return (
    <nav
      className={`
        navbar bg-white  dark:bg-[#2f3349] md:m-2 lg:m-0 m-2  lg:h-[100vh] border-2 dark:border-gray-700 rounded-md lg:rounded-none p-4 flex justify-between items-center lg:items-start  ${
          isSidepannel ? "lg:w-[15%]" : "lg:w-[5%]  "
        }`}
    >
      {/* Navigation Links - Hidden on small and medium screens */}
      <div className="hidden lg:flex  ">
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-8 ">
            <img
              src={logo}
              alt=""
              className="w-16 h-auto object-contain rounded-lg"
            />
            <button
              onClick={toggleSidebar}
              className="text-gray-700 hover:text-black  "
            >
              {(isSidepannel || isHovered) && (
                <input
                  type="radio"
                  checked={isSidepannel}
                  onChange={toggleSidebar}
                  className="mr-20"
                />
              )}
            </button>
          </div>
          {userRole === "superAdmin" && (
            <Link
              to="/admin/analytics"
              className={`text-gray-700 flex items-center dark:hover:bg-gray-700 hover:bg-zinc-300  p-1 rounded-md cursor-pointer ${
                location.pathname === "/admin/analytics"
                  ? "bg-[#665dd0] text-white"
                  : ""
              }`}
            >
              <MdOutlineAnalytics size={24} className="dark:text-[#b6b5cc]" />
              {isSidepannel && (
                <span className="ml-2 dark:text-[#b6b5cc] ">Analytics</span>
              )}
            </Link>
          )}

          {(userRole === "admin" || userRole === "superAdmin") && (
            <Link
              to="/admin/user"
              className={`flex items-center text-gray-700 dark:hover:bg-gray-700 hover:bg-zinc-300 p-1 rounded-md ${
                location.pathname === "/admin/user"
                  ? "bg-[#665dd0]  text-white "
                  : ""
              }`}
            >
              <FaRegUser size={23} className="dark:text-[#b6b5cc] " />
              {isSidepannel && (
                <span className="ml-2 dark:text-[#b6b5cc]">User</span>
              )}
            </Link>
          )}
          {userRole === "superAdmin" && (
            <Link
              to="/admin/role"
              className={`flex items-center text-gray-700 dark:hover:bg-gray-700 hover:bg-zinc-300 p-1 rounded-md ${
                location.pathname === "/admin/role"
                  ? "bg-[#665dd0] text-white"
                  : ""
              }`}
            >
              <CiSettings size={24} className="dark:text-[#b6b5cc]" />
              {isSidepannel && (
                <span className="ml-2 dark:text-[#b6b5cc]">
                  Role & Permission
                </span>
              )}
            </Link>
          )}
          {userRole === "superAdmin" && (
            <Link
              to="/admin/payment"
              className={`flex items-center text-gray-700 dark:hover:bg-gray-700 hover:bg-zinc-300 p-1 rounded-md ${
                location.pathname === "/admin/payment"
                  ? "bg-[#665dd0] text-white"
                  : ""
              }`}
            >
              <MdPayment size={24} className="dark:text-[#b6b5cc]" />
              {isSidepannel && (
                <span className="ml-2 dark:text-[#b6b5cc]">Payment</span>
              )}
            </Link>
          )}

          {userRole === "superAdmin" && (
            <Link
              to="/admin/expenses"
              className={`flex items-center text-gray-700 dark:hover:bg-gray-700 hover:bg-zinc-300 p-1 rounded-md ${
                location.pathname === "/admin/expenses"
                  ? "bg-[#665dd0] text-white"
                  : ""
              }`}
            >
              <MdOutlineAnalytics size={24} className="dark:text-[#b6b5cc]" />
              {isSidepannel && (
                <span className="ml-2 dark:text-[#b6b5cc]">Expenses</span>
              )}
            </Link>
          )}

          {(userRole === "admin" || userRole === "superAdmin") && (
            <Link
              to="/admin/rice"
              className={`flex items-center text-gray-700 dark:hover:bg-gray-700 hover:bg-zinc-300 p-1 rounded-md ${
                location.pathname === "/admin/rice"
                  ? "bg-[#665dd0] text-white"
                  : ""
              }`}
            >
              <CiWheat size={24} className="dark:text-[#b6b5cc]" />
              {isSidepannel && (
                <span className="ml-2 dark:text-[#b6b5cc]">Rice</span>
              )}
            </Link>
          )}
          {(userRole === "admin" || userRole === "superAdmin") && (
            <Link
              to="/admin/notifications"
              className={`flex items-center text-gray-700 dark:hover:bg-gray-700 hover:bg-zinc-300 p-1 rounded-md ${
                location.pathname === "/admin/notifications"
                  ? "bg-[#665dd0] text-white"
                  : ""
              }`}
            >
              <IoIosNotifications size={24} className="dark:text-[#b6b5cc]" />
              {isSidepannel && (
                <span className="ml-2 dark:text-[#b6b5cc]">Notifications</span>
              )}
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 dark:hover:bg-gray-700 hover:bg-zinc-300 p-1 rounded-md"
          >
            <BiLogOutCircle size={24} className="dark:text-[#b6b5cc]" />
            {isSidepannel && (
              <span className="ml-2 dark:text-[#b6b5cc]">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Button and User Icon */}
      <div className="flex lg:hidden w-full overflow-y-hidden justify-between items-center space-x-4 ">
        <button onClick={toggleMenu} className="text-gray-700 hover:text-black">
          <IoMenuSharp size={24} className="dark:text-white" />
        </button>
        <div className="flex items-center">
          <div onClick={toggleDarkMode} className="mr-2 cursor-pointer">
            {isDarkMode ? (
              <IoIosMoon className="text-yellow-500" size={24} />
            ) : (
              <IoSunnyOutline className="text-yellow-500" size={24} />
            )}
          </div>
          <div
            className="border-2 rounded-full p-1 cursor-pointer"
            onClick={toggleUserMenu}
          >
            <img
              src={userPhoto}
              alt="user"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          {/* User Menu Card */}
          {isUserMenuOpen && (
            <div className="absolute top-12 right-4 bg-white dark:bg-gray-700 shadow-lg rounded-md p-2 w-40 z-50">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Menu
                </span>
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  &times;
                </button>
              </div>
              <button
                className="block w-full text-left text-sm px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 mt-2"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="block text-sm w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={changePasswordClick}
              >
                Change Password
              </button>
              <button className="block text-sm w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                Change Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {isChangePasswordOpen && (
        <div className="fixed lg:hidden inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-lg w-full">
            {/* Close button */}

            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Change Password
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 mb-2"
                  htmlFor="current-password"
                >
                  Your Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  id="current-password"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter current password"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 mb-2"
                  htmlFor="new-password"
                >
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="new-password"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter new password"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 mb-2"
                  htmlFor="confirm-password"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirm-password"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Re-enter new password"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeChangePassword}
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu - Shown when the menu is toggled open */}
      {isOpen && (
        <div className="lg:hidden fixed top-0 left-0 h-full bg-white dark:bg-gray-700 shadow-md flex flex-col space-y-2 p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <img
              src={logo}
              alt=""
              className="w-16 h-auto object-contain rounded-lg"
            />
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black"
            >
              <IoCloseSharp size={24} className="dark:text-white" />
            </button>
          </div>
          <Link
            to="/admin/analytics"
            className={`text-gray-700 hover:text-black dark:text-slate-100 p-1 rounded-md ${
              location.pathname === "/admin/analytics"
                ? "bg-[#665dd0] text-white"
                : ""
            }`}
            onClick={handleMobileMenuClick}
          >
            Analytics
          </Link>
          <Link
            to="/admin/user"
            className={`text-gray-700 hover:text-black dark:text-slate-100 p-1 rounded-md ${
              location.pathname === "/admin/user"
                ? "bg-[#665dd0] text-white"
                : ""
            }`}
            onClick={handleMobileMenuClick}
          >
            User
          </Link>
          <Link
            to="/admin/role"
            className={`text-gray-700 hover:text-black dark:text-slate-100 p-1 rounded-md ${
              location.pathname === "/admin/role"
                ? "bg-[#665dd0] text-white"
                : ""
            }`}
            onClick={handleMobileMenuClick}
          >
            Role & Permission
          </Link>
          <Link
            to="/admin/payment"
            className={`text-gray-700 hover:text-black dark:text-slate-100 p-1 rounded-md ${
              location.pathname === "/admin/payment"
                ? "bg-[#665dd0] text-white"
                : ""
            }`}
            onClick={handleMobileMenuClick}
          >
            Payment
          </Link>
          <Link
            to="/admin/expenses"
            className={`text-gray-700 hover:text-black dark:text-slate-100 p-1 rounded-md ${
              location.pathname === "/admin/expenses"
                ? "bg-[#665dd0] text-white"
                : ""
            }`}
            onClick={handleMobileMenuClick}
          >
            Expenses
          </Link>
          <Link
            to="/admin/rice"
            className={`text-gray-700 hover:text-black dark:text-slate-100 p-1 rounded-md ${
              location.pathname === "/admin/rice"
                ? "bg-[#665dd0] text-white"
                : ""
            }`}
            onClick={handleMobileMenuClick}
          >
            Rice
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
