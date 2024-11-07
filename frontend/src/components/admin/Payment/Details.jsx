import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import Footer from "./Footer";
import axios from "axios";
import DateFormatter from "../../DateFormatter";

const Details = ({
  item,
  selectedTab,
  fetchData,
  onBackClick,
  onTransactionComplete,
}) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if (item) {
      setTransactions(item.transactions || []);
    }
  }, [item]);

  const onReportClick = () => {
    alert("Report Clicked");
  };

  const onInvoiceClick = () => {
    alert("Invoice Clicked");
  };
  const handleAddTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        No item selected
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between p-4 h-[83vh] lg:h-[88vh] w-full ">
      <div className="flex flex-col dark:bg-gray-800 lg:flex-row justify-between items-center mb-4 p-4 shadow-md rounded">
        <div className="flex items-center mb-4 lg:mb-0">
          {/* <button
            className=" mr-4 lg:hidden items-center"
            onClick={onBackClick}
          >
            <i className="fa-solid fa-arrow-left text-center items-center justify-center text-2xl"></i>
          </button> */}
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-sm md:text-base lg:text-lg font-semibold text-white">
              {item.firstName.charAt(0)}
            </span>
          </div>
          <h2 className="dark:text-gray-200 ml-4 text-base md:text-lg lg:text-xl font-semibold">
            {`${item.firstName} ${item.lastName}`}
          </h2>
        </div>
        <div className="flex space-x-2 lg:space-x-4">
          <button
            className="dark:text-gray-200 px-4 py-2 text-sm md:text-base text-black rounded flex items-center"
            onClick={onInvoiceClick}
          >
            <i className="fa-solid fa-file-lines text-blue-600"></i>
            <span className="ml-2">Invoice</span>
          </button>
          <button
            className="dark:text-gray-200 px-4 py-2 text-sm md:text-base text-black rounded flex items-center"
            onClick={onReportClick}
          >
            <i className="fa-solid fa-file-lines text-blue-600"></i>
            <span className="ml-2">Report</span>
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto bg-[#eeeeee] dark:bg-[#282A3A]">
        <div className="flex flex-col m-2">
          {item?.transactions?.map((transaction, index) => (
            <div
              key={index}
              className={`flex w-full ${
                transaction.type === "Credit" ? "justify-start" : "justify-end"
              } mb-4`}
            >
              <div className="bg-[#ffffff] dark:bg-[#252525] h-[4rem] relative p-4 rounded-lg cursor-pointer flex items-center w-[40%]">
                <div className="flex flex-row justify-between items-center w-full text-sm text-gray-500 text-center">
                  <p
                    className={`font-semibold ${
                      transaction.type === "Credit"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "Credit" ? (
                      <FaArrowDown className="inline" />
                    ) : (
                      <FaArrowUp className="inline" />
                    )}
                    &nbsp;
                    <span
                      className={`${
                        transaction.type === "Credit"
                          ? "text-[#1c873b]"
                          : "text-[#d93025]"
                      }`}
                    >
                      ₹{transaction.amount.toLocaleString()}
                    </span>
                  </p>
                  <div className="flex flex-col sm:flex-row items-center">
                    <p className="hidden sm:inline mr-4">
                      <DateFormatter isoDate={transaction.date} />
                    </p>
                    <BsThreeDotsVertical
                      size={25}
                      className="ml-2 sm:absolute sm:top-5 sm:right-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer
        balance={item.balance}
        onAddTransaction={handleAddTransaction}
        supplierId={item._id}
        selectedTab={selectedTab}
        fetchData={fetchData}
        onTransactionComplete={onTransactionComplete}
      />
    </div>
  );
};

export default Details;
