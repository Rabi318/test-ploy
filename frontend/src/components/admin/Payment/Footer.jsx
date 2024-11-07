import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = ({
  balance,
  onAddTransaction,
  supplierId,
  selectedTab,
  fetchData,
  onTransactionComplete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("Credit");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [UPINumber, setUPINumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [note, setNote] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("aditya-token");

    // Validate form
    const errors = {};
    if (!amount) errors.amount = "Amount is required";
    if (!date) errors.date = "Date is required";
    if (!paymentMethod) errors.paymentMethod = "Payment method is required";
    if (paymentMethod === "UPI" && !UPINumber)
      errors.UPINumber = "UPI number is required";
    if (paymentMethod === "Bank-Transfer" && !bankName)
      errors.bankName = "Bank name is required";
    if (paymentMethod === "Bank-Transfer" && !bankAccountNumber)
      errors.bankAccountNumber = "Account number is required";
    if (
      (paymentMethod === "UPI" || paymentMethod === "Bank-Transfer") &&
      !transactionId
    )
      errors.transactionId = "Transaction ID is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      setTimeout(() => setFormErrors({}), 3000); // Clear errors after 3 seconds
      return;
    }
    const isoDate = new Date(date).toISOString();
    const numericAmount = parseFloat(amount);
    const formData = {
      type: transactionType,
      amount: numericAmount,
      date: isoDate,
      paymentMode: paymentMethod,
      ...(paymentMethod === "UPI" && { UPINumber }),
      ...(paymentMethod === "Bank-Transfer" && { bankName, bankAccountNumber }),

      userId: supplierId,
      ...(transactionId && { transactionId }),
      ...(note && { note }),
    };
    // console.log("Form data:", formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/transaction`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        onTransactionComplete(true);
        await fetchData();
        closeModal();
        onAddTransaction(formData);
        toast.success("Transaction added successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        // Handle error messages from the server
        setError(response.data.msg);
        setTimeout(() => {
          setError(""); // Clear the error after 3 seconds
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          toast.error("Unauthorized access", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          closeModal();
        } else if (status === 404) {
          toast.error("User not Found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          closeModal();
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
          closeModal();
        } else {
          toast.error("Internal Server Error", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          closeModal();
        }
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
        closeModal();
      }
    } finally {
      setLoading(false);
      closeModal();
    }
  };
  const openModal = (type) => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentMethod("");
    setAmount("");
    setDate("");
    setUPINumber("");
    setBankName("");
    setBankAccountNumber("");
    setNote("");
    setLoading(false);
    setFormErrors({});
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
      <div className="p-4 bg-white dark:bg-[#111827] shadow-md rounded mb-2">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg dark:text-gray-200 font-semibold hidden md:block">
            Balance:{" "}
            <span
              className={`${balance >= 0 ? "text-green-500" : "text-red-500"} `}
            >
              {" "}
              ₹{balance}
            </span>
          </h4>
          <div className="flex sm:justify-between lg:flex-row md:flex md:flex-col items-center space-y-2 lg:space-y-0 lg:space-x-4">
            <button
              onClick={() => openModal("Credit")}
              className="w-full md:w-auto px-2 sm:px-20 py-2 text-[#1c873b] rounded-full border-2 border-[#1c873b] flex items-center justify-center"
            >
              <FaArrowDown className="mr-2" />
              Credit
            </button>
            <button
              onClick={() => openModal("Payment")}
              className="w-full md:w-auto px-2 sm:px-20 py-2 text-[#d93025] rounded-full border-2 border-[#d93025] flex items-center justify-center"
            >
              <FaArrowUp className="mr-2" />
              Payment
            </button>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg mx-4 min-h-[300px] max-h-[90vh] overflow-y-auto flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className=" text-lg font-semibold mb-4">
                  {transactionType === "Credit"
                    ? "Credit Details"
                    : "Payment Details"}
                </h2>

                <h4 className="">
                  Balance:{" "}
                  <span
                    className={`${
                      balance >= 0 ? "text-green-500" : "text-red-500"
                    } `}
                  >
                    {" "}
                    ₹{balance}
                  </span>
                </h4>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="" className="block text-gray-900 mb-2">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    placeholder="Enter Amount"
                    className="w-full p-2 border  rounded"
                  />
                  {formErrors.amount && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.amount}
                    </p>
                  )}
                </div>
                <div className="flex space-x-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-gray-900 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    {formErrors.date && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.date}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="" className="block text-gray-900 mb-2">
                      Note
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Enter Note"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-900 mb-2">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank-Transfer">Bank-Transfer</option>
                    <option value="Cash">Cash</option>
                  </select>
                  {formErrors.paymentMethod && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.paymentMethod}
                    </p>
                  )}
                </div>
                {paymentMethod === "UPI" && (
                  <div className="mb-4">
                    <label className="block text-gray-900 mb-2">
                      UPI Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter UPI Number"
                      className="w-full p-2 border rounded"
                      value={UPINumber}
                      onChange={(e) => setUPINumber(e.target.value)}
                    />
                  </div>
                )}
                {paymentMethod === "Bank-Transfer" && (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-900 mb-2">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Bank Name"
                        className="w-full p-2 border rounded"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-900 mb-2">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Account Number"
                        className="w-full p-2 border rounded"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {(paymentMethod === "UPI" ||
                  paymentMethod === "Bank-Transfer") && (
                  <div className="mb-4">
                    <label className="block text-gray-900 mb-2">
                      UTR No. or Ref No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter UTR No. or Ref No."
                      className="w-full p-2 border rounded"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex justify-end mt-auto">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={24} />
                    ) : (
                      "Pay"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="ml-4 px-4 bg-red-500 text-white rounded"
                  >
                    Cancle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Footer;
