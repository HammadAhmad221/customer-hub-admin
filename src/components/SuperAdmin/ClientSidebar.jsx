// import React from 'react';

// function ClientSidebar({ selectedSection, setSelectedSection }) {
//   return (
// <div>
// <div className="w-64 p-6 pt-0">
//         <div className='flex items-center justify-between py-6 px-2 border-b'>
//       <h2 className="text-3xl font-semibold">Content</h2>
//       <div className='text-xl'>🔍</div>
//         </div>

//       <h3 className="text-lg font-semibold my-6">Client Management</h3>
//       <ul>
//         <li
//           className={`mb-4 cursor-pointer ${selectedSection === 'CompanyInfo' ? 'text-indigo-300' : ''}`}
//           onClick={() => setSelectedSection('CompanyInfo')}
//         >
//           Company Info
//         </li>
//         <li
//           className={`mb-4 cursor-pointer ${selectedSection === 'PaymentInfo' ? 'text-indigo-300' : ''}`}
//           onClick={() => setSelectedSection('PaymentInfo')}
//         >
//           Payment Info
//         </li>
//         <li
//           className={`cursor-pointer ${selectedSection === 'PlanInfo' ? 'text-indigo-300' : ''}`}
//           onClick={() => setSelectedSection('PlanInfo')}
//         >
//           Plan Info
//         </li>
//       </ul>
//     </div>

// </div>
//   );
// }

// export default ClientSidebar;

import React, { useState } from "react";

function ClientSidebar({ selectedSection, setSelectedSection }) {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <button
        className="px-4 pb-1 text-slate-100 bg-black bg xl:hidden fixed top-2 left-16 z-50 text-2xl"
        onClick={toggleSidebar}
      >
        {/* <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
        <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
        <span className="block w-6 h-1 bg-gray-600"></span> */}
        ...
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-40 transform transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } xl:translate-x-0 xl:static`}
      >
        <div className="p-6 pt-0">
          <div className="flex items-center justify-between py-6 px-2 border-b mt-10">
            <h2 className="text-3xl font-semibold">Content</h2>
            <div className="text-xl">🔍</div>
          </div>

          <h3 className="text-lg font-semibold my-6">Client Management</h3>
          <ul>
            <li
              className={`mb-4 cursor-pointer ${
                selectedSection === "CompanyInfo" ? "text-indigo-300" : ""
              }`}
              onClick={() => setSelectedSection("CompanyInfo")}
            >
              Company Info
            </li>
            <li
              className={`mb-4 cursor-pointer ${
                selectedSection === "PaymentInfo" ? "text-indigo-300" : ""
              }`}
              onClick={() => setSelectedSection("PaymentInfo")}
            >
              Payment Info
            </li>
            <li
              className={`cursor-pointer ${
                selectedSection === "PlanInfo" ? "text-indigo-300" : ""
              }`}
              onClick={() => setSelectedSection("PlanInfo")}
            >
              Plan Info
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for closing the sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 xl:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default ClientSidebar;
