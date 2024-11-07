import React, { useEffect, useState } from "react";
import Navbar from "../components/admin/Navbar";
import { json, Outlet } from "react-router-dom";
import Topnavbar from "../components/admin/Topnavbar";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidepannel, setIsSidePannel] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const checkToken = () => {
    const token = localStorage.getItem("aditya-token");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      setIsAuthenticated(true);
      const parseUserData = JSON.parse(userData);
      setUserRole(parseUserData.role);
    } else {
      setIsAuthenticated(false); // No token, user is not authenticated
      navigate("/"); // Redirect to home page
    }
  };

  useEffect(() => {
    checkToken(); // Check token on mount

    const handleStorageChange = (event) => {
      if (event.key === "aditya-token") {
        checkToken(); // Check token again if it changes
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidePannel(!isSidepannel);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    // <div className="flex flex-col lg:flex-row ">
    //   <Navbar
    //     isDarkMode={isDarkMode}
    //     toggleDarkMode={toggleDarkMode}
    //     isSidepannel={isSidepannel}
    //     toggleSidebar={toggleSidebar}
    //   />
    //   <div className="flex-grow ">
    //     <Topnavbar
    //       isDarkMode={isDarkMode}
    //       toggleDarkMode={toggleDarkMode}
    //       isSidepannel={isSidepannel}
    //       toggleSidebar={toggleSidebar}
    //     />

    //     <Outlet />
    //   </div>
    // </div>

    <div className={`flex flex-col lg:flex-row h-screen`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isSidepannel={isSidepannel}
        toggleSidebar={toggleSidebar}
        userRole={userRole}
      />
      <div className="flex-1 flex flex-col">
        <Topnavbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isSidepannel={isSidepannel}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-1 overflow-y-auto sm:overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
