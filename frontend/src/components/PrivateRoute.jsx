import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = () => {
  const token = localStorage.getItem("aditya-token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    localStorage.removeItem("aditya-token");
    localStorage.removeItem("userData");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
