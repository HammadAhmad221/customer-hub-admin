import React from "react";

function StatsOverview() {
  const stats = [
    { title: "No. of Clients", value: 148 },
    { title: "No. of Customer", value: 1356 },
    { title: "No. of Booking", value: 2649 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 pb-16 border-gray-200 border-b-2">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-medium">{stat.title}</h2>
            <p className="text-4xl font-bold">{stat.value}</p>
          </div>
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            View detail
          </button>
        </div>
      ))}
    </div>
  );
}

export default StatsOverview;
