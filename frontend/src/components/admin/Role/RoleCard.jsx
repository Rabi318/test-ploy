import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const RoleCard = ({ roleData, fetchAdmins }) => {
  const [loading, setLoading] = useState(false);
  const [permissionPopUp, setPermissionPopUp] = useState(false);
  const [roleName, setRoleName] = useState("");

  const handleBlockToggle = async () => {
    try {
      setLoading(true);
      const updatedBlockStatus = !roleData.isBlock;
      const token = localStorage.getItem("aditya-token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/${roleData._id}`,
        { isBlock: updatedBlockStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setLoading(false);
        fetchAdmins();
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please login again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else if (error.response && error.response.status === 403) {
        toast.error("You don't have permission to access this page.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    }
  };
  const [permissions, setPermissions] = useState({
    adminAccess: false,
    userManagement: { read: false, write: false, create: false },
    contentManagement: { read: false, write: false, create: false },
    databaseManagement: { read: false, write: false, create: false },
  });
  const handleCheckboxChange = (category, permission) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: !prev[category][permission],
      },
    }));
  };
  const handlePermissionSubmit = () => {
    console.log("Submitted Data:", { roleName, permissions });
    onClose(); // Close the popup
  };
  return (
    <>
      <div className="dark:bg-gray-800 bg-gray-100 text-black dark:text-white p-4 rounded-lg w-75 border-2 dark:border-gray-700 shadow-sm transform transition-transform duration-200 hover:scale-105 hover:ring-2 hover:ring-indigo-400">
        <div className="flex items-center justify-between ">
          <div className="text-lg font-semibold ">{roleData.name}</div>
          <div className="text-sm font-semibold text-gray-500">
            {roleData.role}
          </div>
        </div>
        <div className="text-sm font-semibold mt-1 text-gray-500">
          {roleData.username}
        </div>
        <div className="flex items-center mt-2">
          {/* Avatars */}
          <div className="flex -space-x-2">
            <img
              src={roleData.photo} // Replace with actual avatar URL
              alt={roleData.name}
              className="w-8 h-8 rounded-full border-2 border-gray-800"
            />
          </div>
        </div>
        {/* Edit Role Link */}
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() => setPermissionPopUp(true)}
            className="mt-2 text-sm text-indigo-400 hover:underline cursor-pointer"
          >
            Edit Permission
          </button>
          <div
            className={`p-2 ${
              roleData.isBlock ? "bg-green-500" : "bg-red-500"
            }  text-white rounded`}
          >
            <button onClick={handleBlockToggle}>
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : roleData.isBlock ? (
                "Unblock"
              ) : (
                "Block"
              )}
            </button>
          </div>
        </div>
      </div>
      {permissionPopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="dark:bg-gray-800 dark:text-white bg-white text-black p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              Edit Permissions
            </h2>

            {/* Role Permissions */}
            <div>
              <h3 className="text-lg font-medium mb-2">Role Permissions</h3>

              {/* User Management */}
              <div className="mb-4">
                <p className="font-medium">User Management</p>
                <div className="flex space-x-4">
                  {["read", "write", "create"].map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={permissions.userManagement[perm]}
                        onChange={() =>
                          handleCheckboxChange("userManagement", perm)
                        }
                        className="rounded text-blue-500 focus:ring-blue-400"
                      />
                      <span>
                        {perm.charAt(0).toUpperCase() + perm.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Database Management */}
              <div className="mb-4">
                <p className="font-medium">Database Management</p>
                <div className="flex space-x-4">
                  {["read", "write", "create"].map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={permissions.databaseManagement[perm]}
                        onChange={() =>
                          handleCheckboxChange("databaseManagement", perm)
                        }
                        className="rounded text-blue-500 focus:ring-blue-400"
                      />
                      <span>
                        {perm.charAt(0).toUpperCase() + perm.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setPermissionPopUp(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handlePermissionSubmit}
                className="px-4 py-2 bg-blue-600 text-white  hover:bg-blue-700 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999, position: "fixed" }}
      />
    </>
  );
};

export default RoleCard;
