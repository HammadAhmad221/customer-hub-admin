import React from 'react';

function ClientInfoCard({isPlan}) {
  return (
    <div className="sm:w-full md:w-1/4 ">
      {/* Information Section */}
      <div className="lg:p-6 p-2 mt-6 md:mt-0 bg-white rounded-lg shadow-lg">
        <h3 className="text-gray-500 text-sm uppercase font-semibold pb-2 border-b">Information</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 font-bold">Last update</span>
          <span className="text-gray-500">now</span>
        </div>
        <div className="text-sm text-gray-700 mb-4 flex justify-between">
          <span className="block font-bold">By</span>
          <span className="block font-medium">Daniel J Brown</span>
        </div>

        <div className="flex justify-between text-sm ">
          <span className="text-gray-700 font-bold">Created</span>
          <span className="text-gray-500">3 days ago</span>
        </div>
        <div className="text-sm text-gray-700 flex justify-between">
          <span className="block font-bold">By</span>
          <span className="block font-medium">Daniel J Brown</span>
        </div>

      {/* Internationalization Section */}
      <div className={`mb-6 ${isPlan ? 'hidden' : 'block'}`}>
        <h3 className="text-gray-500 text-sm uppercase font-semibold pb-2 border-b border-gray-300 mt-6 text-wrap">Internationalization</h3>
        <div>
          <label className="block text-md font-bold text-gray-700 mb-1 mt-4">Country</label>
          <select className="w-full p-2  rounded-md focus:ring-2 focus:ring-indigo-500">
            <option value="UK">UK</option>
            <option value="US">US</option>
            <option value="Canada">Canada</option>
            {/* Add more options as necessary */}
          </select>
        </div>
      </div>
      </div>

      {/* Delete Button */}
      <div className="pt-4">
        <button className="w-full px-4 py-2 bg-red-100 text-red-500 border border-red-500 rounded-lg hover:bg-red-600 focus:outline-none">
          Delete this Client
        </button>
      </div>
    </div>
  );
}

export default ClientInfoCard;
