// import React from "react";
// import Sidebar from "../components/Sidebar";
// import StatsOverview from "../components/StatsOverview";
// import PlansOverview from "../components/PlansOverview";

// function Dashboard() {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <main className="flex-1 pl-10">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-semibold ">Welcome 👋</h1>
//           <img src="/topImage.svg" alt="image" />
//         </div>
//         <StatsOverview />
//         <PlansOverview />
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

// Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import StatsOverview from '../components/StatsOverview';
import PlansOverview from '../components/PlansOverview';
import ClientsTable from '../components/ClientsTable';

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Dashboard':
        return (
          <>
            <StatsOverview />
            <PlansOverview />
          </>
        );
      case 'ClientManagement':
        // return <div>Client Management Content</div>;
        return <ClientsTable/>;
        
      case 'TierManagement':
        return <div>Tier Management Content</div>;
      case 'APIIntegrations':
        return <div>API Integrations Content</div>;
      case 'Settings':
        return <div>Settings Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
<>
<div className="flex h-screen">
      <Sidebar onSelectTab={setSelectedTab} />
      <div className="flex-1 pl-10 lg:pt-32 pt-10 lg:pr-16 pr-10">
          {selectedTab=='Dashboard' && <h1 className="text-3xl font-semibold">Welcome 👋</h1>}
          <img src="/topImage.svg" alt="image" className='absolute top-0 right-0 hidden md:block '/>
        {renderContent()}
      </div>
    </div>
</>
  );
}

export default Dashboard;
