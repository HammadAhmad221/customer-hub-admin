// import React, { useState } from "react";

// function ClientsTable() {
//   const entriesPerPage = 10;

//   const clients = Array.from({ length: 100 }, (_, i) => ({
//     id: i + 1,
//     cover: "🖼️",
//     name: `Client ${i + 1}`,
//     description: `Description for Client ${i + 1}`,
//     tier: ["Free", "Pro", "Enterprise"][i % 3],
//   }));

//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRows, setSelectedRows] = useState([]);

//   const totalPages = Math.ceil(clients.length / entriesPerPage);
//   const displayedClients = clients.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const handleSelectRow = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedRows.length === displayedClients.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(displayedClients.map((client) => client.id));
//     }
//   };

//   const renderTierBadge = (tier) => {
//     const tierColors = {
//       Free: "bg-green-100 text-green-800",
//       Pro: "bg-blue-100 text-blue-800",
//       Enterprise: "bg-red-100 text-red-800",
//     };
//     return (
//       <span className={`px-2 py-1 text-xs rounded-full ${tierColors[tier]}`}>
//         {tier}
//       </span>
//     );
//   };

//   return (
//     <div className="">
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h2 className="text-4xl font-semibold">Clients</h2>
//           <p>92 entries found</p>
//         </div>
//         <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
//           + Add new client
//         </button>
//       </div>

//       <div className="flex justify-between items-center mb-4">
//         <button className="border border-gray-300 p-2 rounded-md shadow-sm">
//           <span>🔍 Filter</span>
//         </button>
//         <div className="flex space-x-4">
//           <select className="border border-gray-300 p-2 rounded-md shadow-sm">
//             <option>English - US</option>
//             <option>French - FR</option>
//           </select>
//           <select className="border border-gray-300 p-2 rounded-md shadow-sm">
//             <option>0 currently selected</option>
//             <option>1 selected</option>
//           </select>
//         </div>
//       </div>

//       <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
//         <thead>
//           <tr>
//             <th className="p-4 text-left text-gray-600 font-semibold">
//               <input
//                 type="checkbox"
//                 onChange={handleSelectAll}
//                 checked={selectedRows.length === displayedClients.length}
//               />
//             </th>
//             <th className="p-4 text-left text-gray-600 font-semibold">#</th>
//             <th className="p-4 text-left text-gray-600 font-semibold">Cover</th>
//             <th className="p-4 text-left text-gray-600 font-semibold">Name</th>
//             <th className="p-4 text-left text-gray-600 font-semibold">
//               Description
//             </th>
//             <th className="p-4 text-left text-gray-600 font-semibold">Tier</th>
//             <th className="p-4 text-right text-gray-600 font-semibold">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {displayedClients.map((client) => (
//             <tr key={client.id} className="border-t border-gray-100">
//               <td className="p-4">
//                 <input
//                   type="checkbox"
//                   checked={selectedRows.includes(client.id)}
//                   onChange={() => handleSelectRow(client.id)}
//                 />
//               </td>
//               <td className="p-4">{client.id}</td>
//               <td className="p-4">{client.cover}</td>
//               <td className="p-4">{client.name}</td>
//               <td className="p-4">{client.description}</td>
//               <td className="p-4">{renderTierBadge(client.tier)}</td>
//               <td className="p-4 text-right space-x-2">
//                 <button className="text-gray-500 hover:text-gray-700">
//                   ✏️ Edit
//                 </button>
//                 <button className="text-gray-500 hover:text-gray-700">
//                   🗑️ Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <div className="text-sm text-gray-500">
//           {entriesPerPage} entries per page
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-2 py-1 rounded-md ${
//                 currentPage === i + 1
//                   ? "bg-blue-500 text-white"
//                   : "text-gray-600 bg-gray-100 hover:bg-gray-200"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={() =>
//               setCurrentPage(Math.min(currentPage + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClientsTable;

import React, { useState } from "react";

function ClientsTable() {
  const entriesPerPage = 10;

  const clients = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    cover: "🖼️",
    name: `Client ${i + 1}`,
    description: `Description for Client ${i + 1}`,
    tier: ["Free", "Pro", "Enterprise"][i % 3],
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const totalPages = Math.ceil(clients.length / entriesPerPage);
  const displayedClients = clients.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === displayedClients.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(displayedClients.map((client) => client.id));
    }
  };

  const renderTierBadge = (tier) => {
    const tierColors = {
      Free: "bg-green-100 text-green-800",
      Pro: "bg-blue-100 text-blue-800",
      Enterprise: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-4 py-2 text-md rounded-lg ${tierColors[tier]}`}>
        {tier}
      </span>
    );
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-semibold">Clients</h2>
          <p>92 entries found</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
          + Add new client
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button className="border border-gray-300 p-2 rounded-md shadow-sm">
          <span>🔍 Filter</span>
        </button>
        <div className="flex space-x-4">
          <select className="border border-gray-300 p-2 rounded-md shadow-sm">
            <option>English - US</option>
            <option>French - FR</option>
          </select>
          <select className="border border-gray-300 p-2 rounded-md shadow-sm">
            <option>0 currently selected</option>
            <option>1 selected</option>
          </select>
        </div>
      </div>

      {/* Table Container for Responsiveness */}
      <div className="overflow-x-auto sm:overflow-x-visible">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr>
              <th className="p-4 text-left text-gray-600 font-semibold">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === displayedClients.length}
                />
              </th>
              <th className="p-4 text-left text-gray-600 font-semibold">#</th>
              <th className="p-4 text-left text-gray-600 font-semibold">Cover</th>
              <th className="p-4 text-left text-gray-600 font-semibold">Name</th>
              <th className="p-4 text-left text-gray-600 font-semibold">
                Description
              </th>
              <th className="p-4 text-left text-gray-600 font-semibold">Tier</th>
              <th className="p-4 text-right text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedClients.map((client) => (
              <tr key={client.id} className="border-t border-gray-100">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(client.id)}
                    onChange={() => handleSelectRow(client.id)}
                  />
                </td>
                <td className="p-4">{client.id}</td>
                <td className="p-4">{client.cover}</td>
                <td className="p-4">{client.name}</td>
                <td className="p-4">{client.description}</td>
                <td className="p-4">{renderTierBadge(client.tier)}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    ✏️ Edit
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          {entriesPerPage} entries per page
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientsTable;
