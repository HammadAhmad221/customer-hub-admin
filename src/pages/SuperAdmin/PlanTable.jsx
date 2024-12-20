import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import PlanForm from "../../components/SuperAdmin/AddPlaneForm";
import ClientInfoCard from "../../components/SuperAdmin/ClientInfoCard";

function PlansTable() {
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [isPlan, setIsPlan] = useState(true);
  const plans = [
    {
      name: "Starter Plan",
      description: "Support for up to 10 customers",
      users: 67,
    },
    { name: "Pro", description: "Support for up to 250 customers", users: 49 },
    {
      name: "Enterprise",
      description: "Support for unlimited customers",
      users: 32,
    },
  ];

  const handleAddNewPlan = () => {
    setIsAddingPlan(true);
  };

  const handleFormCancel = () => {
    setIsAddingPlan(false);
  };

  return (
    <>
      {isAddingPlan ? (
        <div className="sm:flex-1 md:flex gap-4">
          <PlanForm handleFormCancel={handleFormCancel} />
          <ClientInfoCard isPlan={isPlan} />
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-4xl font-semibold">Clients</h2>
            <p>3 entries found</p>
          </div>
          <div className="bg-gray-50">
            <div className="bg-white min-w-[500px] shadow-md rounded-lg overflow-x-scroll">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-6 text-gray-600 font-semibold">
                      NAME
                    </th>
                    <th className="py-4 px-6 text-gray-600 font-semibold">
                      DESCRIPTION
                    </th>
                    <th className="py-4 px-6 text-gray-600 font-semibold">
                      USERS
                    </th>
                    <th className="py-4 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-6 font-semibold">{plan.name}</td>
                      <td className="py-4 px-6">{plan.description}</td>
                      <td className="py-4 px-6">{plan.users} users</td>
                      <td className="py-4 px-6 flex justify-end space-x-4">
                        <button className="text-gray-500 hover:text-indigo-500">
                          <FaEdit />
                        </button>
                        <button className="text-gray-500 hover:text-red-500">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-indigo-500 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-br-lg rounded-bl-lg">
                <button
                  onClick={handleAddNewPlan}
                  className="flex items-center"
                >
                  <span className="text-xl mr-2">+</span> Add new Plan
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PlansTable;
