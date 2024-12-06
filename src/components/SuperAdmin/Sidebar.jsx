import React, { useState } from "react";

function Sidebar({ onSelectTab, goBack }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleTabClick = (tab) => {
    goBack();
    setSelectedTab(tab);
    onSelectTab(tab);
    if (isOpen) setIsOpen(false);
  };

  return (
    <div className="h-screen">
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-4 text-gray-600 fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
        <span className="block w-6 h-1 bg-gray-600 mb-1"></span>
        <span className="block w-6 h-1 bg-gray-600"></span>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full ${
          collapsed ? "w-14" : "w-64"
        } bg-white shadow-md transition-transform transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center mt-8 gap-2">
            <img
              src="/SidebarLogo.svg"
              alt="logo"
              className="h-20 w-20"
              onClick={toggleCollapse}
            />
            {!collapsed && (
              <div className="text-xl font-bold">Customer Hub</div>
            )}
          </div>
          <nav className="mt-6">
            <ul>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === "Dashboard"
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleTabClick("Dashboard")}
              >
                <div className="flex items-center gap-2">
                  <img src="/dashboardIcon.svg" alt="Icon" />
                  {!collapsed && <span>Dashboard</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === "ClientManagement"
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleTabClick("ClientManagement")}
              >
                <div className="flex items-center gap-2">
                  <img src="/clientManagementIcon.svg" alt="Icon" />
                  {!collapsed && <span>Client Management</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === "PlanManagement"
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleTabClick("PlanManagement")}
              >
                <div className="flex items-center gap-2">
                  <img src="/tierManagementIcon.svg" alt="Icon" />
                  {!collapsed && <span>Plan Management</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === "APIIntegrations"
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleTabClick("APIIntegrations")}
              >
                <div className="flex items-center gap-2">
                  <img src="/apiIntegrationIcon.svg" alt="Icon" />
                  {!collapsed && <span>API Integrations</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === "Product"
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleTabClick("Product")}
              >
                <div className="flex items-center gap-2">
                  <img src="/clientManagementIcon.svg" alt="Icon" />
                  {!collapsed && <span>Add Product</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === "Blog"
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleTabClick("Blog")}
              >
                <div className="flex items-center gap-2">
                  <img src="/tierManagementIcon.svg" alt="Icon" />
                  {!collapsed && <span>Add Blog</span>}
                </div>
              </li>
              <li
                className={`px-4 py-2 cursor-pointer ${
                  selectedTab === "Settings"
                    ? "bg-gray-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleTabClick("Settings")}
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
          className="fixed inset-0 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
