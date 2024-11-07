import React from "react";

const RoleCard = ({ roleData }) => {
  return (
    <div className="dark:bg-gray-800 bg-gray-100 text-black dark:text-white p-4 rounded-lg w-75 border-2 dark:border-gray-700 shadow-sm transform transition-transform duration-200 hover:scale-105 hover:ring-2 hover:ring-indigo-400">
      <div className="text-lg font-semibold ">{roleData.name}</div>
      <div className="text-sm font-semibold mt-1 text-gray-500">
        {roleData.role}
      </div>
      <div className="flex items-center mt-2">
        {/* Avatars */}
        <div className="flex -space-x-2">
          <img
            src={roleData.avatar} // Replace with actual avatar URL
            alt={roleData.name}
            className="w-8 h-8 rounded-full border-2 border-gray-800"
          />
        </div>
      </div>
      {/* Edit Role Link */}
      <div className="flex justify-between items-center mt-2">
        <div className="mt-2 text-sm text-indigo-400 hover:underline cursor-pointer">
          Edit Role
        </div>
        <div
          className={`p-2 ${
            roleData.block ? "bg-green-500" : "bg-red-500"
          }  text-white rounded`}
        >
          <button>{roleData.block ? "Unblock" : "Block"}</button>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
