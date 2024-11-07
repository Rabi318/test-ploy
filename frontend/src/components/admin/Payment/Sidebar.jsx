import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DateFormatter from "../../DateFormatter";

const Sidebar = ({ items, selectedTab, setSelectedTab, onSelectItem }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = items.filter((item) => {
        const fullName = `${item.firstName || ""} ${item.lastName || ""}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, items]);
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
    <div className="bg-gray-100 dark:bg-[#0B192C]  p-4 border-r w-full h-full flex flex-col relative">
      {/* Static Search bar */}
      <div>
        <input
          type="text"
          value={searchQuery}
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded "
        />
        {/* Tab buttons for Customers and Suppliers */}
        <div className="flex space-x-3 flex-wrap relative">
          <button
            className={`p-2  text-center ${
              selectedTab === "Customers"
                ? "font-bold text-blue-600"
                : "text-black dark:text-white"
            } `}
            onClick={() => setSelectedTab("Customers")}
          >
            Customers
          </button>
          <button
            className={`p-2  text-center ${
              selectedTab === "Staffs"
                ? "font-bold text-blue-600"
                : "text-black dark:text-white"
            }`}
            onClick={() => setSelectedTab("Staffs")}
          >
            Staffs
          </button>
          <button
            className={`p-2  text-center ${
              selectedTab === "Mill"
                ? "font-bold text-blue-600"
                : "text-black dark:text-white"
            }`}
            onClick={() => setSelectedTab("Mill")}
          >
            Mill
          </button>
          {/* Filter button with an icon */}
        </div>
      </div>

      {/* Static list of items */}
      <div className="mt-4 flex-grow overflow-y-auto">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => onSelectItem(item)}
          >
            <div>
              <h3 className="font-medium text-sm dark:text-white">
                {`${item.firstName} ${item.lastName}`}
              </h3>
              <p className="text-sm text-gray-500">Mobile {item.mobile}</p>
            </div>
            <div className={`text-${item.balance >= 0 ? "green" : "red"}-500`}>
              ₹{(item.balance ?? 0).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
