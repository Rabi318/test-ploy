import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";

const months = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const paddies = [
  {
    name: "Total",
    value: 2397.75,
  },
  {
    name: "Surya",
    value: 47.75,
  },
  {
    name: "Bhulaxmi",
    value: 30,
  },
  {
    name: "Swarna",
    value: 1000,
  },
  {
    name: "Bharat",
    value: 120,
  },
  {
    name: "Deradun",
    value: 1200,
  },
];
const convertToUnit = (valueInKg) => {
  if (valueInKg >= 1000) {
    // Convert to tonnes
    return { value: (valueInKg / 1000).toFixed(2), unit: "tonne" };
  } else if (valueInKg >= 100) {
    // Convert to quintals
    return { value: (valueInKg / 100).toFixed(2), unit: "quintal" };
  } else {
    // Keep it in kg
    return { value: valueInKg.toFixed(2), unit: "kg" };
  }
};
const MonthCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [selectedPaddy, setSelectedPaddy] = useState(paddies[0]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleMonthClick = () => {
    setIsModalOpen(true);
  };

  const handlePaddyClick = (paddy) => {
    setSelectedPaddy(paddy); // Update the selected paddy
  };

  const handleMonthClicked = (month) => {
    setSelectedMonth(month); // Update the selected month
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false); // Close modal if click is outside
    }
  };

  const handleApplyClick = () => {
    // Perform any filter action based on the selected month and paddy
    console.log(
      `Filters applied: Month - ${selectedMonth}, Paddy - ${selectedPaddy}`
    );
    setIsModalOpen(false); // Close the modal after applying filters
  };

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth() + 1; // January is 0, so we add 1
    setSelectedMonth(months[currentMonthIndex]);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const { value, unit } = convertToUnit(selectedPaddy.value);

  return (
    <>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Monthly
          </h5>
          <FaFilter
            className="dark:text-white cursor-pointer"
            onClick={handleMonthClick}
          />
        </div>
        <div className="flex justify-between">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {selectedMonth}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {selectedPaddy.name}
          </p>
        </div>
        <div className="flex justify-center items-center h-32">
          <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
            {value} {unit}
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 m-2 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 max-w-md w-full "
          >
            <div className="flex justify-between">
              <div>
                <h5 className="mb-4 text-xl font-bold tracking-tight text-gray-900">
                  Select a Month
                </h5>
                <ul className="list-disc list-inside mb-6">
                  {months.map((month, index) => (
                    <li
                      key={index}
                      className="cursor-pointer mt-2 hover:text-blue-500 flex items-center"
                    >
                      <input
                        type="radio"
                        name="month"
                        value={month}
                        checked={selectedMonth === month}
                        onChange={() => handleMonthClicked(month)} // Correctly updating selected month
                        className="mr-2"
                      />
                      <span onClick={() => handleMonthClicked(month)}>
                        {month}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="mb-4 text-xl font-bold tracking-tight text-gray-900">
                  Select a Paddy
                </h5>
                <ul className="list-disc list-inside">
                  {paddies.map((paddy, index) => (
                    <li
                      key={index}
                      className="cursor-pointer mt-2 hover:text-blue-500 flex items-center"
                    >
                      <input
                        type="radio"
                        name="paddy"
                        value={paddy.name}
                        checked={selectedPaddy.name === paddy.name}
                        onChange={() => handlePaddyClick(paddy)} // Correctly updating selected paddy
                        className="mr-2"
                      />
                      <span onClick={() => handlePaddyClick(paddy)}>
                        {paddy.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full text-center mt-6">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleApplyClick}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MonthCard;
