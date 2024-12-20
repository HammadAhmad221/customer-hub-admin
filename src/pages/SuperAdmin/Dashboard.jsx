import React, { useState } from "react";
import Sidebar from "../../components/SuperAdmin/Sidebar";
import StatsOverview from "../../components/SuperAdmin/StatsOverview";
import PlansOverview from "../../components/SuperAdmin/PlansOverview";
import ClientsTable from "../../components/SuperAdmin/ClientsTable";
import CreateEditClient from "./ClientPage";
import PlansTable from "./PlanTable";
// import AddProduct from "../../components/SuperAdmin/addProduct";
// import AddBlog from "../../components/SuperAdmin/addBlog";
import ProductTable from "../../components/SuperAdmin/Products";
import AddEditProduct from "../../components/SuperAdmin/addProduct";
import BlogTable from "../../components/SuperAdmin/Blogs";
import AddEditBlog from "../../components/SuperAdmin/addBlog";
import PurchaseHistory from "../../components/SuperAdmin/PurchaseHistory";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);


  const handleAddNewClient = () => {
    setIsCreatingClient(true);
  };

  const handleAddNewProduct = () => {
    setIsCreatingProduct(true);
  };

  const handleAddNewBlog = () => {
    setIsCreatingBlog(true);
  };

  const handleGoBackToClientList = () => {
    setIsCreatingClient(false);
  };
  const handleGoBackToProductList = () => {
    setIsCreatingProduct(false);
  };
  const handleGoBackToBlogList = () => {
    setIsCreatingBlog(false);
  };

  const renderContent = () => {
    if (isCreatingClient) {
      return <CreateEditClient goBack={handleGoBackToClientList} />;
    }
    if (isCreatingProduct) {
      return <AddEditProduct goBack={handleGoBackToProductList}/>;
    }
    if (isCreatingBlog) {
      return <AddEditBlog goBack={handleGoBackToBlogList}/>;
    }

    switch (selectedTab) {
      case "Dashboard":
        return (
          <>
            <StatsOverview />
            <PlansOverview />
          </>
        );
      case "ClientManagement":
        return <ClientsTable onAddNewClient={handleAddNewClient} />;
      case "PlanManagement":
        return (
          // <div className="overflow-x-auto">
            <PlansTable />
          // </div>
        );
      case "APIIntegrations":
        return <div>API Integrations Content</div>;
      case "Settings":
        return <div>Settings Content</div>;
        case "Product":
          return <ProductTable onAddNewProduct={handleAddNewProduct}/>;
          case "Blog":
            return <BlogTable onAddNewBlog={handleAddNewBlog}/>;
            case "PurchaseHistory":
              return <PurchaseHistory onAddNewBlog={handleAddNewBlog}/>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar onSelectTab={setSelectedTab} goBack={handleGoBackToClientList} goBackProduct={handleGoBackToProductList} goBackBlog={handleGoBackToBlogList}/>
      <div
        className={`${
          isCreatingClient ? "pt-0" : "pl-10 lg:pt-32 pt-10 lg:pr-16 pr-10"
        } flex-1 overflow-auto`}
      >
        {selectedTab === "Dashboard" && (
          <h1 className="text-3xl font-semibold">Welcome 👋</h1>
        )}
        <img
          src="/topImage.svg"
          alt="image"
          className="absolute top-0 right-0 hidden md:block"
        />
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
