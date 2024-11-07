import React from "react";
import RoleCard from "../../components/admin/Role/RoleCard";

const roleArray = [
  {
    id: 1,
    name: "Rabinarayan sahoo",
    role: "Administrator",
    avatar: "https://via.placeholder.com/32",
    block: false,
  },
  {
    id: 2,
    name: "Surya sahoo",
    role: "Administrator",
    avatar: "https://via.placeholder.com/32",
    block: true,
  },
  {
    id: 3,
    name: "Bhulaxmi sahoo",
    role: "Administrator",
    avatar: "https://via.placeholder.com/32",
    block: false,
  },
  {
    id: 4,
    name: "Swarna sahoo",
    role: "Administrator",
    avatar: "https://via.placeholder.com/32",
    block: true,
  },
];

const Role = () => {
  return (
    <div className="min-h-[88vh] flex flex-col p-4">
      <div className="flex-grow">
        <h1 className="text-2xl font-semibold mb-4 dark:text-gray-300 text-gray-800">
          Roles List
        </h1>
        <p className="mb-4 text-wrap text-gray-500">
          A role provides access to predefined menus and features so that,
          depending on the assigned role, an administrator can have access to
          what a user needs.
        </p>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {roleArray.map((roleData) => (
            <RoleCard key={roleData.id} roleData={roleData} />
          ))}
        </div>
      </div>

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
  );
};

export default Role;
