import React, { useState } from "react";
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
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          <div className="border-2 rounded-full p-1">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/office/40/user.png"
              alt="user"
              className="rounded-full"
            />
          </div>
        </div>
      </div>

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
            to="/admin/logout"
            className="text-gray-700 hover:text-black dark:text-slate-100"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
