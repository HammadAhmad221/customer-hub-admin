import React, { useState } from "react";
import DragAndDropFileUpload from "./DragAndDropFileUpload";
// import ColorToggleButton from './ColorToggleButton'

const CompanyInfo = () => {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
      {/* <h2 className="text-xl font-bold mb-4">Company Info</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">Logo</label>
          <DragAndDropFileUpload />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            Company Name
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            First Name
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            Last Name
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            Website
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter website"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            Phone
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter phone No."
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="doe@gmail.com"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            Address
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter address"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            Status
          </label>
          {/* <ColorToggleButton /> */}
          <div className="flex flex-col items-start">
            <div className="flex p-1 font-semibold shadow-lg border-2 border-gray-300 bg-gray-200 rounded-lg">
              <button
                onClick={handleToggle}
                className={`px-2 py-2 rounded-lg flex gap-2 items-center ${
                  isActive
                    ? "bg-white text-red-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Inactive
              </button>
              <button
                onClick={handleToggle}
                className={`px-1 py-1 rounded-lg flex gap-2 items-center justify-center ${
                  !isActive
                    ? "bg-white text-red-500"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Active
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
