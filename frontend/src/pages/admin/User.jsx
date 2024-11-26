import React, { useEffect, useState } from "react";
import DateFormatter from "../../components/DateFormatter";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import PacketInputList from "../../components/admin/Rice/PacketInputList";
import Summary from "../../components/admin/Rice/Summary";

const User = () => {
  const [users, setUsers] = useState([]);
  const [riceType, setRiceType] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddRice, setShowAddRice] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addUserError, setAddUserError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    village: "",
    mobile: "",
  });
  const [riceFormData, setRiceFormData] = useState({
    userId: "", // Assume userId is passed in from props
    riceType: "", // Selected rice type
    plasticSacks: "",
    weights: [], // Array of weights for packets
    total: 0, // Total weight
  });
  const handleRiceTypeChange = (e) => {
    setRiceFormData({
      ...riceFormData,
      riceType: e.target.value,
    });
  };
  const handlePacketWeightsUpdate = (packets) => {
    // console.log("Incoming packets:", packets);

    // Convert weights from string to number
    const convertedPackets = packets.map((packet) => {
      const weightAsNumber = parseFloat(packet.weight) || 0; // Convert to number
      // console.log(`Converting weight: ${packet.weight} to ${weightAsNumber}`);
      return {
        ...packet,
        weight: weightAsNumber, // Use the converted weight
      };
    });

    const totalWeight = convertedPackets.reduce(
      (sum, packet) => sum + packet.weight, // Now this should sum numbers
      0
    );

    setRiceFormData((prevData) => ({
      ...prevData, // Spread previous data to retain userId and riceType
      weights: packets, // Update weights
      total: totalWeight, // Update total weight
    }));
  };
  // Fetch users from backend
  const fetchUsers = async () => {
    const token = localStorage.getItem("aditya-token");
    const config = {
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios(config);
      setUsers(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Error fetching users");
      }
    }
  };
  useEffect(() => {
    fetchUsers(); // Call fetchUsers on component mount
  }, []);

  const fetchRiceType = async () => {
    const token = localStorage.getItem("aditya-token");
    const config = {
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/riceType`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios(config);
      setRiceType(response.data?.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Error fetching rice type");
      }
    }
  };
  const handleCancle = () => {
    setShowModal(false);
    setFormData({ firstName: "", lastName: "", village: "", mobile: "" });
    setAddUserError("");
  };
  const handleAddRiceCancle = () => {
    setShowAddRice(false);
    setFormData({ firstName: "", lastName: "", village: "", mobile: "" });
    setAddUserError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("aditya-token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Reset form and close modal
        setFormData({ firstName: "", lastName: "", village: "", mobile: "" });
        setShowModal(false);

        // Call fetchUsers to update user list
        fetchUsers();
      } else {
        setAddUserError(response.data.msg);
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        const status = error.response.status;
        // Handle specific status codes
        if (status === 409) {
          setAddUserError("Mobile Number already exists");
        } else {
          setAddUserError("Internal server error");
        }
      } else {
        setAddUserError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("aditya-token");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/${selectedUser._id}`,
        formData, // Send updated data
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Reset form, close modal, and refresh user list
        setFormData({ firstName: "", lastName: "", village: "", mobile: "" });
        setSelectedUser(null);
        setShowEditModal(false);

        fetchUsers(); // Refresh the user list
      } else {
        setAddUserError(response.data.msg);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 409) {
          setAddUserError("Mobile Number already exists");
        } else {
          setAddUserError("Internal server error");
        }
      } else {
        setAddUserError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user for editing
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      village: user.village,
      mobile: user.mobile,
    });
    setShowEditModal(true);
  };
  const handleAddRiceClick = (user) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      village: user.village,
      mobile: user.mobile,
    });
    // Update riceFormData with userId
    setRiceFormData({
      userId: user._id,
      riceType: "",
      weights: [],
      total: 0,
    });
    setShowAddRice(true);
    fetchRiceType();
  };
  const handleRiceSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("aditya-token");
    const riceDataToSend = {
      ...riceFormData,
      plasticSacks: riceFormData.plasticSacks === "true",
      weights: riceFormData.weights.map((packet) => ({
        weight: parseFloat(packet.weight) || 0, // Convert weight to a number, default to 0 if invalid
      })),
      userId: riceFormData.userId,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/rice`,
        riceDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setRiceFormData({
          userId: "",
          riceType: "",
          weights: [],
          total: 0,
          plasticSacks: "",
        });
        setFormData({ firstName: "", lastName: "", village: "", mobile: "" });
        setShowAddRice(false);
        toast.success("Rice added successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        setAddUserError(response.data.msg);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        // Handle specific status codes
        if (status === 404) {
          setAddUserError("User not found");
        } else if (status === 401) {
          setAddUserError("Unauthorized access.");
        } else {
          setAddUserError("Internal server error");
        }
      } else if (status === 403) {
        toast.error("You don't have permission to delete this user.", {
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
    } finally {
      setLoading(false);
      setAddUserError("");
    }

    // Log the data for debugging
    // console.log("Rice Data to Send:", riceDataToSend);
  };
  const handleDelete = async (userId) => {
    const token = localStorage.getItem("aditya-token");

    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        fetchUsers();
        toast.success("User deleted successfully!");
      } else {
        toast.error("Error deleting user");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please login again.");
      } else if (error.response && error.response.status === 403) {
        toast.error("You don't have permission to delete this user.", {
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
    } finally {
      setLoading(false);
    }
  };

  const bgColors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-teal-400",
    "bg-pink-400",
  ];
  const textColors = [
    "text-white",
    "text-gray-700",
    "text-black",
    "text-red-500",
    "text-yellow-500",
    "text-teal-600",
    "text-purple-500",
  ];

  const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return hash;
  };

  const getBgColor = (id) => bgColors[getHash(id) % bgColors.length];
  const getTextColor = (id) => textColors[getHash(id) % textColors.length];

  const sortedUsers = [...users].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  // Filter users based on the search query
  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to check if the last purchase was made in the current month
  const isCurrentMonthPurchase = (isoDate) => {
    const currentDate = new Date();
    const lastPurchaseDate = new Date(isoDate);

    return (
      lastPurchaseDate.getMonth() === currentDate.getMonth() &&
      lastPurchaseDate.getFullYear() === currentDate.getFullYear()
    );
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sl No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Village
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Add Rice
                </th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
                  // console.log(user);
                  return (
                    <tr
                      key={user._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div
                          className={`rounded-full w-10 h-10 flex justify-center items-center font-bold ${getBgColor(
                            user._id
                          )} ${getTextColor(user._id)}`}
                        >
                          {user.firstName.charAt(0).toUpperCase()}
                          {user.lastName.charAt(0).toUpperCase()}
                        </div>

                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="font-normal text-gray-500">
                            {user.mobile}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{user.village}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center whitespace-nowrap">
                          <div
                            className={`h-2.5 w-2.5 rounded-full me-2 ${
                              isCurrentMonthPurchase(user.updatedAt)
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <DateFormatter isoDate={user.updatedAt} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 font-medium text-red-600 dark:text-red-500 hover:underline"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <button
                          onClick={() => handleAddRiceClick(user)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Add Rice
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-red-500">
                    User not found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white dark:bg-gray-200 rounded-lg overflow-hidden shadow-xl transform transition-all md:max-w-lg sm:w-full p-6">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Add New User
              </h3>
              {addUserError && <p className="text-red-500">{addUserError}</p>}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Enter first name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Enter last name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Village <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Enter village"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={handleCancle}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-2"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Add User"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white dark:bg-gray-200 rounded-lg overflow-hidden shadow-xl transform transition-all md:max-w-lg sm:w-full p-6">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Edit User
              </h3>
              {addUserError && <p className="text-red-500">{addUserError}</p>}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Enter first name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Enter last name"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Village <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Enter village"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-2"
                  onClick={handleEditSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddRice && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white dark:bg-gray-200 rounded-lg overflow-hidden shadow-xl transform transition-all md:max-w-lg  w-full p-6">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Add Rice
              </h3>
              {addUserError && <p className="text-red-500">{addUserError}</p>}
              <div className="mt-4 flex space-x-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    readOnly
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    readOnly
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    value={formData.mobile}
                    readOnly
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Village <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    readOnly
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter Village Name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Plastic Sacks <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="plasticSacks"
                      value="true"
                      checked={riceFormData.plasticSacks === "true"}
                      onChange={(e) =>
                        setRiceFormData({
                          ...riceFormData,
                          plasticSacks: e.target.value,
                        })
                      }
                      className="mt-1 p-2 border border-gray-300 rounded-lg"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="plasticSacks"
                      value="false"
                      checked={riceFormData.plasticSacks === "false"}
                      onChange={(e) =>
                        setRiceFormData({
                          ...riceFormData,
                          plasticSacks: e.target.value,
                        })
                      }
                      className="mt-1 p-2 border border-gray-300 rounded-lg"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rice Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="riceType"
                  value={riceFormData.riceType}
                  onChange={handleRiceTypeChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                >
                  <option value="" disabled>
                    Select Rice Type
                  </option>
                  {riceType.map((rice) => (
                    <option key={rice._id} value={rice._id}>
                      {rice.name}{" "}
                      {/* Adjust this based on your rice object structure */}
                    </option>
                  ))}
                </select>
              </div>
              {/* Packet Input List */}
              <div className="mt-4 h-48 overflow-y-auto">
                <PacketInputList
                  onSummaryUpdate={handlePacketWeightsUpdate}
                  riceType={riceFormData.riceType}
                  plasticSacks={riceFormData.plasticSacks}
                />
              </div>

              {/* Summary */}
              <div className="mt-4">
                <Summary packets={riceFormData.weights} />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={handleAddRiceCancle}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-2"
                  onClick={handleRiceSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Add Rice"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
