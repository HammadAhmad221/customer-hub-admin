import React, { useState } from "react";
import ClientSidebar from "../../components/SuperAdmin/ClientSidebar";
import ClientInfoCard from "../../components/SuperAdmin/ClientInfoCard";
import CompanyInfo from "../../components/SuperAdmin/CompanyInfo";
import PaymentInfo from "../../components/SuperAdmin/PaymentInfo";
import PlanInfo from "../../components/SuperAdmin/PlanInfo";

function CreateEditClient({ goBack }) {
  const [selectedSection, setSelectedSection] = useState("CompanyInfo");

  const renderSectionContent = () => {
    switch (selectedSection) {
      case "CompanyInfo":
        return <CompanyInfo />;
      case "PaymentInfo":
        return <PaymentInfo />;
      case "PlanInfo":
        return <PlanInfo />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <ClientSidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />

      <div className="flex-1 p-6 bg-gray-50 pt-20">
        <div className="flex justify-between items-center">
          <button
            className="pr-4 py-2 font-bold text-red-500 rounded-lg"
            onClick={goBack}
          >
            ← Back
          </button>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-red-100 text-red-500 rounded-lg border ">
              Publish
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
              √&nbsp;Save
            </button>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-16">{selectedSection}</h2>
        <div className="sm:flex-1 md:flex flex-wrap gap-2">
          {renderSectionContent()}
          <ClientInfoCard />
        </div>
      </div>
    </div>
  );
}

export default CreateEditClient;
