import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import defaultUserImg from "../../assets/userimg.jpeg";
import { IoSunnyOutline } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";

const Topnavbar = ({
  isDarkMode,
  toggleDarkMode,
  isSidepannel,
  toggleSidebar,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(defaultUserImg);

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
          <div className="relative cursor-pointer">
            <IoIosNotificationsOutline size={24} className="dark:text-white" />
            <div className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="p-1 rounded-full bg-white shadow">
            <img
              src={userPhoto}
              alt="User"
              className="w-10 h-10 rounded-full object-fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnavbar;
