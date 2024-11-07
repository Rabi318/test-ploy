import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";

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

// Helper function to convert kg to appropriate unit
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

const TodayCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaddy, setSelectedPaddy] = useState(paddies[0]); // Track the selected paddy
  const modalRef = useRef(null);

  const handleTodayClick = () => {
    setIsModalOpen(true);
  };
  const handlePaddyClick = (paddy) => {
    console.log(`You selected: ${paddy}`);
    setSelectedPaddy(paddy); // Set the selected paddy
    setIsModalOpen(false); // Close the modal
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false); // Close modal if click is outside
    }
  };

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

  // Convert the selected paddy's value to the appropriate unit
  const { value, unit } = convertToUnit(selectedPaddy.value);

  return (
    <>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
        <div className="flex items-center justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Today
          </h5>
          <FaFilter
            className="dark:text-white cursor-pointer"
            onClick={handleTodayClick}
          />
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span>{selectedPaddy.name}</span>
        </p>
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
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
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
                    onChange={() => setSelectedPaddy(paddy)} // Update selected paddy on change
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
      )}
    </>
  );
};

export default TodayCard;
