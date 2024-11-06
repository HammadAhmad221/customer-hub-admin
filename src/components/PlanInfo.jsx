import React from 'react'

const PlanInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
    {/* <h2 className="text-xl font-bold mb-4">Plan Info</h2> */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* <div>
        <label className="block mb-2 text-gray-700 font-semibold">Plan Type</label>
        <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>Basic</option>
          <option>Premium</option>
        </select>
      </div> */}
        <div>
        <label className="block mb-2 text-gray-700 font-semibold">Active Plan</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder='Plan Name'
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-700 font-semibold">Number of Allowed Customers</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder='101'
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-700 font-semibold">Remaining Customers</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder='28'
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-700 font-semibold">Plan Expiry Date</label>
        <input
          type="date"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  </div>
  )
}

export default PlanInfo