import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import defaultUserImg from "../../assets/userimg.jpeg";
import { IoSunnyOutline } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Topnavbar = ({
  isDarkMode,
  toggleDarkMode,
  isSidepannel,
  toggleSidebar,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(defaultUserImg);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("aditya-token");
    localStorage.removeItem("userData");

    // Redirect to login page after logout
    navigate("/");
  };

  const handleNotificationClick = () => {
    navigate("/admin/notifications");
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
  const closeProfile = () => {
    setIsProfileOpen(false);
    setProfilePhoto(null);
  };
  const changeProfileClick = () => {
    setIsProfileOpen(true);
    setIsUserMenuOpen(false);
  };
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const photoDataUrl = reader.result; // This is the base64 encoded image
        // You can now use photoDataUrl to update state or send it to a server
        setProfilePhoto(photoDataUrl); // Update user photo preview
      };
      reader.readAsDataURL(file);
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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")); // Retrieve user data
    if (userData && userData.photo) {
      setUserPhoto(userData.photo); // Set user photo from localStorage
    } else {
      setUserPhoto(defaultUserImg); // Fallback to default image
    }
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className={`topnavbar m-2 `}>
      <div className="justify-between items-center bg-white dark:bg-[#2e334d] border-2 dark:border-gray-700 dark:shadow-none shadow-md rounded-md p-2 hidden lg:flex">
        <div className="flex items-center ml-4">
          {!isSearchOpen ? (
            <div
              onClick={toggleSearch}
              className="cursor-pointer flex items-center"
            >
              <IoMdSearch size={20} className="dark:text-white" />
              <span className="ml-4 text-gray-400 dark:text-gray-300 text-base">
                Search
              </span>
            </div>
          ) : (
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 border-b-2 border-gray-300 dark:border-gray-600 outline-none flex-grow bg-white dark:bg-gray-700 dark:text-white"
              />
              <IoMdClose
                size={20}
                className="ml-2 cursor-pointer dark:text-white"
                onClick={toggleSearch}
              />
            </div>
          )}
        </div>
        <div className="flex items-center mr-4 space-x-4 ">
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={isSidepannel}
                onChange={toggleSidebar}
                className="sr-only peer "
                // defaultChecked
              />
              <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
            </label>
          </div>
          <div onClick={toggleDarkMode} className="cursor-pointer">
            {isDarkMode ? (
              <IoIosMoon size={24} className="text-yellow-500" />
            ) : (
              <IoSunnyOutline size={24} className="text-yellow-500" />
            )}
          </div>
          <div
            className="relative cursor-pointer"
            onClick={handleNotificationClick}
          >
            <IoIosNotificationsOutline size={24} className="dark:text-white" />
            <div className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div
            className="p-1 rounded-full bg-white shadow cursor-pointer"
            onClick={toggleUserMenu}
          >
            <img
              src={userPhoto}
              alt="User"
              className="w-10 h-10 rounded-full object-fill"
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
                onClick={changeProfileClick}
              >
                Change Profile
              </button>
              <button
                className="block text-sm w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={changePasswordClick}
              >
                Change Password
              </button>
              <button
                className="block text-sm w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {isChangePasswordOpen && (
          <>
            <div className="fixed  inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-lg w-full">
                {/* Close button */}

                <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                  Change Password
                </h2>
                <form onSubmit={handleChangePasswordSubmit}>
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
          </>
        )}
        {isProfileOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Change Profile
              </h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 dark:text-gray-200 mb-2"
                    htmlFor="profile-photo"
                  >
                    Upload Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-photo"
                    onChange={(e) => handlePhotoChange(e)} // Handle file input change
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeProfile}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topnavbar;
