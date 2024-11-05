import React from "react";
import DashboadCard from "./dashboadCard";

function PlansOverview() {
  const plans = [
    {
      title: "Starter",
      price: "FREE",
      description: "Support for up to 10 customers",
      color: "bg-gray-100",
      users: 67,
    },
    {
      title: "Pro",
      price: "£149/ month",
      description: "Support for up to 250 customers",
      color: "bg-purple-100",

      users: 49,
    },
    {
      title: "Enterprise",
      price: "Custom pricing",
      color: "bg-red-200",

      description: "Support for unlimited customers",
      users: 32,
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-2xl font-semibold mb-4">Plans Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <DashboadCard
            index={index}
            title={plan.title}
            users={plan.users}
            price={plan.price}
            color={plan.color}
            description={plan.description}
          />
        ))}
      </div>
    </div>
  );
}

export default PlansOverview;
