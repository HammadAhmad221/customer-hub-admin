import React from "react";

export default function DashboadCard({
  title,
  users,
  price,
  description,
  color,
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md px-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-gray-500">👤 {users}</span>
      </div>
      <div className=" flex justify-center">
        <p
          className={`text-lg font-semibold mb-2 py-5  w-full text-center ${color} rounded-lg`}
        >
          {price}
        </p>
      </div>
      <p className="text-gray-600 mb-32">{description}</p>
      <button className="bg-red-500 text-white px-4 w-full py-2 rounded hover:bg-red-600">
        Edit Plan
      </button>
    </div>
  );
}
