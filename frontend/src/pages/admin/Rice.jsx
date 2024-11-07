import React, { useEffect, useRef, useState } from "react";
import DateFormatter from "../../components/DateFormatter";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RicePdfDocument from "../../components/admin/Rice/RicePdfDocument";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const Rice = () => {
  const [rice, setRice] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [calculateModal, setCalculateModal] = useState(false);
  const [selectedRice, setSelectedRice] = useState(null);
  const [quintalPrice, setQuintalPrice] = useState("");
  const [sackPrice, setSackPrice] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    if (selectedRice) {
      const weightInQuintals = selectedRice.total / 100; // Convert KG to Quintals
      const calculatedSubtotal =
        (parseFloat(quintalPrice) || 0) * weightInQuintals;
      const sackAdjustment =
        selectedRice.plasticSacks === false
          ? (parseFloat(sackPrice) || 0) * selectedRice.weights.length
          : 0;
      const calculatedFinalPrice = calculatedSubtotal - sackAdjustment;

      setSubtotal(parseFloat(calculatedSubtotal.toFixed(2)));
      setFinalPrice(parseFloat(calculatedFinalPrice.toFixed(2)));
    }
  }, [quintalPrice, sackPrice, selectedRice]);

  const handleQuintalPriceChange = (e) => {
    const value = e.target.value.replace(/^0+/, ""); // Remove leading zeros
    setQuintalPrice(value);
  };

  // Remove leading zero and update state for Sack Price
  const handleSackPriceChange = (e) => {
    const value = e.target.value.replace(/^0+/, ""); // Remove leading zeros
    setSackPrice(value);
  };
  const handleCalculateCancel = () => {
    // Reset all state values to their default
    setQuintalPrice("");
    setSackPrice("");
    setSubtotal(0);
    setFinalPrice(0);

    // Close the modal
    setCalculateModal(false);
  };

  // Handle form submission
  const handleCalculationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("aditya-token");

    // Check if the final price is greater than zero
    if (finalPrice <= 0) {
      alert("Error: The final price must be greater than zero.");
      setLoading(false); // Stop loading if validation fails
      return; // Exit the function early if the condition is not met
    }

    // Prepare payload for submission
    const payload = {
      quintalPrice: parseFloat(quintalPrice),
      subFinalPrice: subtotal, // Ensure this matches your backend expectations
      finalPrice: finalPrice,
      sacksPrice: parseFloat(sackPrice),
      userId: selectedRice.userId._id,
      riceId: selectedRice._id,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/rice/calculate`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Reset fields on successful submission
        setQuintalPrice("");
        setSackPrice("");
        setSubtotal(0);
        setFinalPrice(0);
        setCalculateModal(false);
        toast.success("Calculated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        fetchRice();
      } else {
        // Handle error messages from the server
        setError(response.data.msg);
        setTimeout(() => {
          setError(""); // Clear the error after 3 seconds
        }, 3000);
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response) {
        const status = error.response.status; // Define status here
        // Handle specific status codes
        if (status === 404) {
          setError("User not found");
        } else if (status === 401) {
          setError("Unauthorized access.");
        } else if (status === 403) {
          toast.error("You don't have permission to perform this action.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        } else {
          setError("Internal server error");
        }
        setTimeout(() => {
          setError(""); // Clear the error after 3 seconds
        }, 3000);
      } else {
        // Fallback for other types of errors
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
      setLoading(false); // Ensure loading state is reset
    }
  };

  const navigate = useNavigate();

  const fetchRice = async () => {
    const token = localStorage.getItem("aditya-token");
    const config = {
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/rice`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios(config);
      setRice(response.data?.data);
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
    fetchRice();
  }, []);

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
  const isCurrentMonthPurchase = (isoDate) => {
    const currentDate = new Date();
    const lastPurchaseDate = new Date(isoDate);

    return (
      lastPurchaseDate.getMonth() === currentDate.getMonth() &&
      lastPurchaseDate.getFullYear() === currentDate.getFullYear()
    );
  };
  const filteredRice = rice.filter((item) => {
    // Ensure item.userId exists before accessing properties
    const fullName = item.userId
      ? `${item.userId.firstName} ${item.userId.lastName}`.toLowerCase()
      : "";
    return fullName.includes(searchQuery.toLowerCase());
  });

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
          <button className="hidden md:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Rice
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
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-9 py-3 ">
                  Action
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
              ) : filteredRice.length > 0 ? (
                filteredRice.map((rice, index) => {
                  // console.log(rice);
                  const user = rice.userId;
                  return (
                    <tr
                      key={rice._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div
                          className={`rounded-full w-10 h-10 flex justify-center items-center font-bold ${getBgColor(
                            rice._id
                          )} ${getTextColor(rice._id)}`}
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
                      <td className="px-6 py-4">{rice.userId.village}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center whitespace-nowrap">
                          <div
                            className={`h-2.5 w-2.5 rounded-full me-2 ${
                              isCurrentMonthPurchase(rice.createdAt)
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <DateFormatter isoDate={rice.createdAt} />
                        </div>
                      </td>
                      <td className="px-6 py-4">{rice.riceType.name}</td>
                      <td className="px-6 py-4">{rice.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        {/* <button
                          onClick={() =>
                            navigate(`/admin/rice/${rice.userId._id}`, {
                              state: { userDetails: rice },
                            })
                          }
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Details
                        </button> */}
                        <button
                          onClick={() => {
                            setSelectedRice(rice);
                            setViewModal(true);
                          }}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          View
                        </button>
                        {rice.calculated ? (
                          <button
                            className="px-4 py-2 bg-slate-200 text-white rounded cursor-not-allowed"
                            disabled
                          >
                            <IoCheckmarkDoneCircleOutline
                              className="text-green-500"
                              size={24}
                            />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedRice(rice);
                              setCalculateModal(true);
                            }}
                            className="px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded"
                          >
                            Calculate
                          </button>
                        )}
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
      {viewModal && (
        <div className=" fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-200 rounded-lg overflow-hidden shadow-xl transform transition-all md:max-w-lg  w-full p-6 m-3 ">
            <div className="flex justify-between items-center ">
              <h2 className="text-2xl font-bold mb-4">Rice Details</h2>
              <div className="cursor-pointer">
                <PDFDownloadLink
                  document={<RicePdfDocument rice={selectedRice} />}
                  fileName={`${selectedRice.userId.firstName}_${selectedRice.userId.lastName}_rice_details.pdf`}
                >
                  {({ loading }) => (
                    <button>
                      <FaFilePdf size={24} color="red" />
                      {loading && <span> Loading document...</span>}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
            <div className="mb-2">
              <strong>Name: </strong>
              {selectedRice.userId.firstName} {selectedRice.userId.lastName}
            </div>
            <div className="mb-2">
              <strong>Mobile: </strong>
              {selectedRice.userId.mobile}
            </div>
            <div className="mb-2">
              <strong>Village: </strong>
              {selectedRice.userId.village}
            </div>
            <div className="mb-2">
              <strong>Rice Type: </strong>
              {selectedRice.riceType.name}
            </div>
            <div className="mb-2">
              <strong>CreatedBy: </strong>
              {selectedRice.adminId.name}
            </div>
            <div className="mb-2 ">
              <strong>Weights: </strong>
              <div className="overflow-x-auto h-48 overflow-y-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 dark:text-white">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Sl No.</th>
                      <th className="px-4 py-2 border">Weight (kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRice.weights.map((weightItem, index) => (
                      <tr key={weightItem._id}>
                        <td className="px-4 py-2 border text-center">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 border text-center">
                          {weightItem.weight}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        className="px-4 py-2 border text-center font-bold"
                        colSpan="1"
                      >
                        Total
                      </td>
                      <td className="px-4 py-2 border text-center font-bold">
                        {selectedRice.total} kg
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setViewModal(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {calculateModal && (
        <div className=" fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-200 rounded-lg overflow-hidden shadow-xl transform transition-all md:max-w-lg  w-full p-6 m-3 ">
            <h2 className="text-2xl font-bold mb-4">Calculate</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-2">
              <strong>Name: </strong>
              {selectedRice.userId.firstName} {selectedRice.userId.lastName}
            </div>
            <div className="mb-2">
              <strong>Mobile: </strong>
              {selectedRice.userId.mobile}
            </div>
            <div className="mb-2">
              <strong>Rice Type: </strong>
              {selectedRice.riceType.name}
            </div>
            <div className="mb-2 md:flex md:justify-between ">
              <div>
                <strong>Total Weights (KG): </strong>
                {selectedRice.total}
              </div>
              <div>
                <strong>Total Packet: </strong>
                {selectedRice.weights.length}
              </div>
            </div>
            <form className="mt-4" onSubmit={handleCalculationSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="input1"
                >
                  Quintal Price
                </label>
                <input
                  id="input1"
                  type="number"
                  value={quintalPrice}
                  onChange={handleQuintalPriceChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {selectedRice.plasticSacks === false && (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="input2"
                  >
                    Sack Price
                  </label>
                  <input
                    id="input2"
                    type="number"
                    value={sackPrice}
                    onChange={handleSackPriceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="input3"
                >
                  Subtotal Price
                </label>
                <input
                  id="input3"
                  type="number"
                  value={subtotal}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="input4"
                >
                  Final price
                </label>
                <input
                  id="input4"
                  type="number"
                  value={finalPrice}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-between">
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
                <button
                  onClick={handleCalculateCancel}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Rice;
