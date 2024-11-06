const PlanForm = ({handleFormCancel}) => {
    return (
      <div className=" flex-1">
        <div className="flex justify-between items-center">
          <button
            className="pr-4 py-2 font-bold text-red-500 rounded-lg"
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
        <h2 className="text-3xl font-bold mb-8">Create Edit Plan</h2>
        <div className=" capitalize bg-white p-8 shadow-md rounded-lg">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block mb-2 text-gray-700 font-semibold">Name of the Plan</label>
    <input
      type="text"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter card number"
      />
  </div>
  <div>
    <label className="block mb-2 text-gray-700 font-semibold">Plan Price</label>
    <input
      type="text"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Lahore, Punjab, Pakistan"
      />
  </div>          
      <div>
    <label className="block mb-2 text-gray-700 font-semibold">No. of the customers allowed in a plan</label>
    <input
      type="text"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="MM/YY"
      />
  </div>
</div>
<div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleFormCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md"
              >
              Save Plan
            </button>
          </div>
                </div>
      </div>
    );
  };

  export default PlanForm;