import React from "react";

const PaymentInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg block md:flex-1">
      {/* <h2 className="text-xl font-bold mb-4">Payment Info</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 capitalize">
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            Payment Method
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter card number"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            billing address
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Lahore, Punjab, Pakistan"
          />
        </div>{" "}
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            late payment date
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            next payment due date
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            email
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="doe@gmail.com"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            address
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Lahore, Punjab, Pakistan"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            payment status
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="pending"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
