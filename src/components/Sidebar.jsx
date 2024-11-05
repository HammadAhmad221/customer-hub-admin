// import React, { useState } from 'react';

// function Sidebar({ onSelectTab }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('Dashboard'); // State for active tab

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleTabClick = (tab) => {
//     setSelectedTab(tab);
//     onSelectTab(tab);
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         className="lg:hidden p-4 text-gray-600 fixed top-0 left-0 z-50"
//         onClick={toggleSidebar}
//       >
//         <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
//         <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
//         <span className="block w-6 h-1 bg-gray-600"></span>
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-md transition-transform transform ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:translate-x-0`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="p-4 text-2xl font-bold text-red-600 mt-8">Customer Hub</div>
//           <nav className="mt-6">
//             <ul>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'Dashboard' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('Dashboard')}
//               >
//                 Dashboard
//               </li>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'ClientManagement' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('ClientManagement')}
//               >
//                 Client Management
//               </li>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'TierManagement' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('TierManagement')}
//               >
//                 Tier Management
//               </li>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'APIIntegrations' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('APIIntegrations')}
//               >
//                 API Integrations
//               </li>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'Settings' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('Settings')}
//               >
//                 Settings
//               </li>
//             </ul>
//           </nav>
//           <div className="mt-auto p-4">
//             <p className="text-gray-600">Daniel J. Brown</p>
//           </div>
//         </div>
//       </div>

//       {/* Overlay for closing the sidebar */}
//       {isOpen && (
//         <div className="fixed inset-0 md:hidden" onClick={toggleSidebar}></div>
//       )}
//     </>
//   );
// }

// export default Sidebar;





// import React, { useState } from 'react';

// function Sidebar({ onSelectTab }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('Dashboard'); // State for active tab

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleTabClick = (tab) => {
//     setSelectedTab(tab);
//     onSelectTab(tab);
//     if (isOpen) setIsOpen(false); // Close sidebar on mobile after selecting a tab
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         className="lg:hidden p-4 text-gray-600 fixed top-0 left-0 z-50"
//         onClick={toggleSidebar}
//       >
//         <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
//         <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
//         <span className="block w-6 h-1 bg-gray-600"></span>
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-md transition-transform transform z-40 ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:translate-x-0`}
//       >
//         <div className="flex flex-col h-full">
//           <div className='flex p-4 mt-8 gap-2'>
//         <img src="/SidebarLogo.svg" alt="logo" />
//           <div className="text-2xl font-bold text-red-600">Customer Hub</div>
//           </div>
//           <nav className="mt-6">
//             <ul>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'Dashboard' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('Dashboard')}
//               >
//                 <div className='flex gap-2'>
//                 <img src="/dashboardIcon.svg" alt="Icon" />
//                 <h1>Dashboard</h1>
//                 </div>
//               </li>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'ClientManagement' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('ClientManagement')}
//               >
                
//                 <div className='flex gap-2'>
//                 <img src="/clientManagementIcon.svg" alt="Icon" />
//                 <h1>Client Management</h1>
//                 </div>
//               </li>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'TierManagement' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('TierManagement')}
//               >
                
//                 <div className='flex gap-2'>
//                 <img src="/tierManagementIcon.svg" alt="Icon" />
//                 <h1>Tier Management</h1>
//                 </div>
//               </li>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'APIIntegrations' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('APIIntegrations')}
//               >
                
//                 <div className='flex gap-2'>
//                 <img src="/apiIntegrationIcon.svg" alt="Icon" />
//                 <h1>API Integrations</h1>
//                 </div>
//               </li>
//               <li
//                 className={`px-4 py-2 cursor-pointer ${
//                   selectedTab === 'Settings' ? 'bg-gray-200' : 'hover:bg-gray-200'
//                 }`}
//                 onClick={() => handleTabClick('Settings')}
//               >
                
//                 <div className='flex gap-2'>
//                 <img src="/settings.svg" alt="Icon" />
//                 <h1>Settings</h1>
//                 </div>
//               </li>
//             </ul>
//           </nav>
//           <div className="mt-auto p-4">
//             <p className="text-gray-600">Daniel J. Brown</p>
//           </div>
//         </div>
//       </div>

//       {/* Overlay for closing the sidebar */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// }

// export default Sidebar;

import React, { useState } from 'react';

function Sidebar({ onSelectTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // New state for collapsing the sidebar
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    onSelectTab(tab);
    if (isOpen) setIsOpen(false); // Close sidebar on mobile after selecting a tab
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-4 text-gray-600 fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
        <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
        <span className="block w-6 h-1 bg-gray-600"></span>
      </button>

      {/* Collapse button */}
      {/* <button
        className="hidden lg:block p-2 text-gray-600 fixed top-0 left-0 mt-4 ml-4 z-50"
        onClick={toggleCollapse}
      >
        <span className={`block w-6 h-6 bg-gray-600 ${collapsed ? 'rotate-180' : ''}`}></span>
      </button> */}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full ${
          collapsed ? 'w-14' : 'w-64'
        } bg-white shadow-md transition-transform transform z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center mt-8 gap-2">
            <img src="/SidebarLogo.svg" alt="logo" className='h-20 w-20' onClick={toggleCollapse}/>
            {!collapsed && <div className="text-2xl font-bold text-red-600">Customer Hub</div>}
          </div>
          <nav className="mt-6">
            <ul>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === 'Dashboard' ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
                onClick={() => handleTabClick('Dashboard')}
              >
                <div className="flex items-center gap-2">
                  <img src="/dashboardIcon.svg" alt="Icon" />
                  {!collapsed && <span>Dashboard</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === 'ClientManagement' ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
                onClick={() => handleTabClick('ClientManagement')}
              >
                <div className="flex items-center gap-2">
                  <img src="/clientManagementIcon.svg" alt="Icon" />
                  {!collapsed && <span>Client Management</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === 'TierManagement' ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
                onClick={() => handleTabClick('TierManagement')}
              >
                <div className="flex items-center gap-2">
                  <img src="/tierManagementIcon.svg" alt="Icon" />
                  {!collapsed && <span>Tier Management</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === 'APIIntegrations' ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
                onClick={() => handleTabClick('APIIntegrations')}
              >
                <div className="flex items-center gap-2">
                  <img src="/apiIntegrationIcon.svg" alt="Icon" />
                  {!collapsed && <span>API Integrations</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === 'Settings' ? 'bg-gray-200' : 'hover:bg-gray-200'
                }`}
                onClick={() => handleTabClick('Settings')}
              >
                <div className="flex items-center gap-2">
                  <img src="/settings.svg" alt="Icon" />
                  {!collapsed && <span>Settings</span>}
                </div>
              </li>
            </ul>
          </nav>
          <div className="mt-auto p-4">
            {!collapsed && <p className="text-gray-600">Daniel J. Brown</p>}
          </div>
        </div>
      </div>

      {/* Overlay for closing the sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
