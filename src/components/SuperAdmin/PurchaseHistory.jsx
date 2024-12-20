
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PurchaseHistory = () => {
//   const [orders, setOrders] = useState([]); // Store orders
//   const [loading, setLoading] = useState(false); // Track loading state
//   const [currentPage, setCurrentPage] = useState(1); // Track current page
//   const [pagination, setPagination] = useState({
//     page: 1,
//     pageSize: 15,
//     pageCount: 0,
//     total: 0,
//   }); // Pagination data
//   const [editingStatus, setEditingStatus] = useState(null); // Track which order's status is being edited
//   const [selectedStatus, setSelectedStatus] = useState(''); // Selected status for the dropdown
//   const [statusLoading, setStatusLoading] = useState(false); // Loading state for status update

//   // Function to fetch orders with pagination
//   const fetchOrders = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
//         params: {
//           populate: '*',
//           'pagination[page]': page,
//           'pagination[pageSize]': pagination.pageSize, // Fetch 10 orders per page
//         },
//       });

//       const fetchedOrders = response.data.data;
//       const paginationData = response.data.meta.pagination;

//       // Update the state with the fetched orders (resetting if necessary)
//       setOrders(fetchedOrders);

//       // Update pagination data
//       setPagination(paginationData);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle "Next" button click
//   const handleNextPage = () => {
//     if (pagination.page < pagination.pageCount) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   // Handle status change selection
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//         console.log("orderId :",orderId);
//         console.log("newStatus :",newStatus);
//       setStatusLoading(true);
//       // Update status in the backend
//       const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
//         data: {
//           orderStatus: newStatus,
//         },
//       });

//       // Optimistically update status in the frontend
//       setOrders((prevOrders) => {
//         return prevOrders.map((order) =>
//           order.id === orderId ? { ...order, orderStatus: newStatus } : order
//         );
//       });

//       // Close the dropdown after selection
//       setEditingStatus(null);
//       setSelectedStatus('');
//       alert("Status updated successfully!");

//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert("Failed to update status. Please try again.");
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   // Fetch orders when currentPage changes
//   useEffect(() => {
//     fetchOrders(currentPage);
//   }, [currentPage]);

//   return (
//     <div>
//       <h2 className="text-4xl font-semibold mb-8">Purchase History</h2>
//       <table className="table-auto border-collapse w-full">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Order ID</th>
//             <th className="border px-4 py-2">Customer</th>
//             <th className="border px-4 py-2">Date</th>
//             <th className="border px-4 py-2">Total Amount</th>
//             <th className="border px-4 py-2">Products</th>
//             <th className="border px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td className="border px-4 py-2">{order?.id}</td>
//               <td className="border px-4 py-2">{order?.customer?.fullName || 'N/A'}</td>
//               <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
//               <td className="border px-4 py-2">${order.totalPrice.toFixed(2)}</td>
//               <td className="border px-4 py-2">
//                 {order.products.map((product, index) => (
//                   <div key={index}>
//                     <p>{product.Name} - ${product.Price}</p>
//                   </div>
//                 ))}
//               </td>
//               <td className="border px-4 py-2">
//   {/* Display dropdown if status is being edited */}
//   {editingStatus === order.id ? (
//     <select
//       value={selectedStatus}
//       onChange={(e) => {
//         const newStatus = e.target.value;
//         setSelectedStatus(newStatus);
//         handleStatusChange(order.documentId, newStatus); // Call API on change
//         setEditingStatus(null); // Close the dropdown after change
//       }}
//       className="border px-2 py-1"
//       disabled={statusLoading} // Disable dropdown if status is being updated
//       onBlur={() => setEditingStatus(null)} // Close the dropdown if clicked outside
//     >
//       <option value="pending">Pending</option>
//       <option value="inprogress">In Progress</option>
//       <option value="delivered">Delivered</option>
//     </select>
//   ) : (
//     <span
//       onClick={() => {
//         setEditingStatus(order.id); // Set the editingStatus to current order
//         setSelectedStatus(order.orderStatus); // Set current status as selected
//       }}
//       className="cursor-pointer text-blue-500"
//     >
//       {order.orderStatus}
//     </span>
//   )}
// </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex items-center justify-end">
//         {loading && <p>Loading more orders...</p>}
//         {!loading && pagination.page < pagination.pageCount && (
//           <button
//             className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
//             onClick={handleNextPage}
//           >
//             Next
//           </button>
//         )}
//         {pagination.page === pagination.pageCount && <p>No more orders to load.</p>}
//       </div>
//     </div>
//   );
// };

// export default PurchaseHistory;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]); // Store orders
  const [loading, setLoading] = useState(false); // Track loading state
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 15,
    pageCount: 0,
    total: 0,
  }); // Pagination data
  const [editingStatus, setEditingStatus] = useState(null); // Track which order's status is being edited
  const [selectedStatus, setSelectedStatus] = useState(''); // Selected status for the dropdown
  const [statusLoading, setStatusLoading] = useState(false); // Loading state for status update

  // Function to fetch orders with pagination
  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        params: {
          populate: '*',
          'pagination[page]': page,
          'pagination[pageSize]': pagination.pageSize,
        },
      });

      const fetchedOrders = response.data.data;
      const paginationData = response.data.meta.pagination;

      // Update the state with the fetched orders (resetting if necessary)
      setOrders(fetchedOrders);

      // Update pagination data
      setPagination(paginationData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle status change selection
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       setStatusLoading(true);
//       // Update status in the backend
//       await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
//         data: {
//           orderStatus: newStatus,
//         },
//       });

//       // Optimistically update status in the frontend
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === orderId ? { ...order, orderStatus: newStatus } : order
//         )
//       );

//       // Close the dropdown after selection
//       setEditingStatus(null);
//       setSelectedStatus('');
//       alert('Status updated successfully!');
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update status. Please try again.');
//     } finally {
//       setStatusLoading(false);
//     }
//   };

const handleStatusChange = async (orderId, newStatus) => {
    try {
      setStatusLoading(true);
  
      // Make the API call to update the status
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
        data: {
          orderStatus: newStatus,
        },
      });
  
      // Check if the API response indicates success
      if (response.status === 200) {
        // Update the state with the new status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
  
        alert(`Status updated successfully! to: ${newStatus}`);
      } else {
        throw new Error("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setStatusLoading(false);
      setEditingStatus(null);
      setSelectedStatus('');
    }
  };
  
  // Fetch orders when currentPage changes
  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-8">Purchase History</h2>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Total Amount</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2 w-10">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order?.id}</td>
              <td className="border px-4 py-2">{order?.customer?.fullName || 'N/A'}</td>
              <td className="border px-4 py-2">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">${order.totalPrice.toFixed(2)}</td>
              <td className="border px-4 py-2">
                {order.products.map((product, index) => (
                  <div key={index}>
                    <p>
                      {product.Name} - ${product.Price}
                    </p>
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2 w-10">
                {editingStatus === order.id ? (
                  <select
                    value={selectedStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setSelectedStatus(newStatus);
                      handleStatusChange(order.documentId, newStatus);
                      setEditingStatus(null);
                    }}
                    className="border px-2 py-1 w-20"
                    disabled={statusLoading}
                    onBlur={() => setEditingStatus(null)}
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="delivered">Delivered</option>
                  </select>
                ) : (
                  <span
                    onClick={() => {
                      setEditingStatus(order.id);
                      setSelectedStatus(order.orderStatus);
                    }}
                    className="cursor-pointer text-blue-500"
                  >
                    {order.orderStatus}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-end mt-4">
        {/* Previous Button */}
        {pagination.page > 1 && (
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded"
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          >
            Previous
          </button>
        )}

        {/* Loading Indicator */}
        {loading && <p>Loading...</p>}

        {/* Next Button */}
        {pagination.page < pagination.pageCount && (
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
