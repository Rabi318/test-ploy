import React, { useEffect, useState } from "react";
import RoleCard from "../../components/admin/Role/RoleCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const roleArray = [
  {
    id: 1,
    name: "Rabinarayan sahoo",
    role: "Admin",
    avatar: "https://via.placeholder.com/32",
    block: false,
    username: "rabi782",
  },
  {
    id: 2,
    name: "Surya sahoo",
    role: "Admin",
    avatar: "https://via.placeholder.com/32",
    block: true,
    username: "surya782",
  },
  {
    id: 3,
    name: "Bhulaxmi sahoo",
    role: "Admin",
    avatar: "https://via.placeholder.com/32",
    block: false,
    username: "bhulaxmi782",
  },
  {
    id: 4,
    name: "Swarna sahoo",
    role: "Admin",
    avatar: "https://via.placeholder.com/32",
    block: true,
    username: "swarna782",
  },
];

const Role = () => {
  const [admins, setAdmins] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobile: "",
    email: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prevData) => ({ ...prevData, photo: files[0] }));
    } else if (name === "mobile") {
      setFormData((prevData) => ({
        ...prevData,
        mobile: value ? parseInt(value, 10) : "",
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleAdminAddFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("aditya-token");
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("mobile", formData.mobile);
      if (formData.photo) {
        data.append("photo", formData.photo);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        handleAdminAddFormClose();
        fetchAdmins();
        toast.success("Admin added successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        // Handle different status codes and error messages
        switch (status) {
          case 409:
            // Conflict error (e.g., duplicate email, username, or mobile)
            setError(data.msg);
            toast.error(data.msg || "Conflict: Duplicate data found", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
            break;
          case 500:
            // Internal Server Error
            toast.error("Server error. Please try again later.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
            break;
          default:
            // Generic error handler for any other status codes
            toast.error(data.msg || "An error occurred. Please try again.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
            break;
        }
      } else {
        // Network or unexpected error
        toast.error(
          "Network error or unexpected issue occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          }
        );
      }
    } finally {
      setLoading(false);
      handleAdminAddFormClose();
      setError("");
    }
  };

  const fetchAdmins = async (e) => {
    const token = localStorage.getItem("aditya-token");
    const config = {
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/admin/get-admins`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios(config);
      setAdmins(response.data.data);
      setLoading(false);
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
  useEffect(() => {
    fetchAdmins();
  }, []);
  const handleAdminAddFormClose = () => {
    setIsFormOpen(false);
    setFormData({
      name: "",
      username: "",
      mobile: "",
      email: "",
      photo: null,
    });
  };

  return (
    <>
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
      <div className="min-h-[88vh] flex flex-col p-4">
        <div className="flex-grow">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold mb-4 dark:text-gray-300 text-gray-800">
              Roles List
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Admin
            </button>
          </div>
          <p className="mb-4 text-wrap text-gray-500">
            A role provides access to predefined menus and features so that,
            depending on the assigned role, an administrator can have access to
            what a user needs.
          </p>

          {/* Role Cards */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {admins.map((roleData) => (
              <RoleCard
                key={roleData._id}
                roleData={roleData}
                fetchAdmins={fetchAdmins}
              />
            ))}
          </div>
        </div>

        {/* Modal Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                  Add Admin
                </h2>
                {error && <p className="text-red-500">{error}</p>}
                <button
                  onClick={handleAdminAddFormClose}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleAdminAddFormSubmit}>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block mb-1 dark:text-slate-100">
                      Name <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                      className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:text-slate-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 dark:text-slate-100">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:text-slate-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 dark:text-slate-100">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:text-slate-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 dark:text-slate-100">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:text-slate-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 dark:text-slate-100">
                      Photo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="photo"
                      required
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:text-slate-100"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={handleAdminAddFormClose}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-8 text-sm text-gray-500 dark:text-gray-400 border-t pt-4">
          <div>
            Designed and Developed by ❤️{" "}
            <span className="text-indigo-500 cursor-pointer hover:underline">
              Teknova
            </span>
          </div>
          <div className="cursor-pointer hover:underline text-indigo-500">
            Support
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
