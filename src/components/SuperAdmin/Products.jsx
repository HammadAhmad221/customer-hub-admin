// import React, { useState } from "react";

// function ProductTable({ onAddNewProduct }) {
//   const entriesPerPage = 10;

//   // Mock product data (Replace with actual data from an API)
//   const products = Array.from({ length: 100 }, (_, i) => ({
//     id: i + 1,
//     image: "🛒", // Placeholder image
//     name: `Product ${i + 1}`,
//     description: `Description for Product ${i + 1}`,
//     price: `$${(i + 1) * 10}.00`,
//     category: ["Electronics", "Clothing", "Books"][i % 3],
//   }));
  

//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRows, setSelectedRows] = useState([]);

//   const totalPages = Math.ceil(products.length / entriesPerPage);
//   const displayedProducts = products.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const handleSelectRow = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedRows.length === displayedProducts.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(displayedProducts.map((product) => product.id));
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-10">
//         <div>
//           <h2 className="text-4xl font-semibold">Products</h2>
//           <p>{products.length} entries found</p>
//         </div>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md"
//           onClick={onAddNewProduct}
//         >
//           + Add new product
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
//           <thead>
//             <tr>
//               <th className="p-4 text-left text-gray-600 font-semibold">
//                 <input
//                   type="checkbox"
//                   onChange={handleSelectAll}
//                   checked={selectedRows.length === displayedProducts.length}
//                 />
//               </th>
//               <th className="p-4 text-left text-gray-600 font-semibold">#</th>
//               {/* <th className="p-4 text-left text-gray-600 font-semibold">
//                 Image
//               </th> */}
//               <th className="p-4 text-left text-gray-600 font-semibold">
//                 Name
//               </th>
//               <th className="p-4 text-left text-gray-600 font-semibold">
//                 Description
//               </th>
//               <th className="p-4 text-left text-gray-600 font-semibold">
//                 Price
//               </th>
//               <th className="p-4 text-left text-gray-600 font-semibold">
//                 Category
//               </th>
//               <th className="p-4 text-right text-gray-600 font-semibold">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedProducts.map((product) => (
//               <tr key={product.id} className="border-t border-gray-100">
//                 <td className="p-4">
//                   <input
//                     type="checkbox"
//                     checked={selectedRows.includes(product.id)}
//                     onChange={() => handleSelectRow(product.id)}
//                   />
//                 </td>
//                 <td className="p-4">{product.id}</td>
//                 <td className="p-4">{product.image}</td>
//                 <td className="p-4">{product.name}</td>
//                 <td className="p-4">{product.description}</td>
//                 <td className="p-4">{product.price}</td>
//                 <td className="p-4">{product.category}</td>
//                 <td className="p-4 text-right space-x-2">
//                   <button className="text-blue-500 hover:text-blue-700">
//                     ✏️ Edit
//                   </button>
//                   <button className="text-red-500 hover:text-red-700">
//                     🗑️ Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center mt-4">
//         <div className="text-sm text-gray-500">
//           {entriesPerPage} entries per page
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-2 py-1 rounded-md ${
//                 currentPage === i + 1
//                   ? "bg-blue-500 text-white"
//                   : "text-gray-600 bg-gray-100 hover:bg-gray-200"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={() =>
//               setCurrentPage(Math.min(currentPage + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductTable;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEditProduct from "./addProduct";


function ProductTable({ onAddNewProduct }) {
  const entriesPerPage = 10;

  const [products, setProducts] = useState([]); // For storing API data
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product for editing
  const [isFormOpen, setIsFormOpen] = useState(false); // State to manage form visibility

  // const totalPages = Math.ceil(products?.length / entriesPerPage);
  // const displayedProducts = products.slice(
  //   (currentPage - 1) * entriesPerPage,
  //   currentPage * entriesPerPage
  // );
  const totalPages = Math.max(Math.ceil(products.length / entriesPerPage), 1);
const displayedProducts = Array.isArray(products)
  ? products.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
  : [];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`); // Replace with your actual API endpoint
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === displayedProducts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(displayedProducts.map((product) => product.id));
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Set the selected product for editing
    setIsFormOpen(true); // Open the form
  };

  const handleBackFromEdit =() =>{
    setIsFormOpen(false);
  };

  // const handleDeleteProduct = async (productId) => {
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`);
  //     // After deletion, filter out the deleted product from the state
  //     setProducts(products.filter(product => product.id !== productId));
  //     alert("Product Deleted Successfully");
  //   } catch (error) {
  //     console.error("Failed to delete product:", error);
  //   }
  // };
  // const handleDeleteProduct = async (productId) => {
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`);
  //           // Optimistically update the state
  //           setProducts((prevProducts) =>
  //             prevProducts.filter((product) => product.id !== productId)
  //           );
  //     alert("Product Deleted Successfully");
  //   } catch (error) {
  //     console.error("Failed to delete product:", error);
  //     // Optionally, handle the error case and revert the UI change
  //     // For example, you can show an error message or refetch products
  //     alert("Failed to delete product");
  //   }
  // };
  const handleDeleteProduct = async (productId) => {
    // Optimistically update the UI by removing the product
    const updatedProducts = products.filter((product) => product.documentId !== productId);
    setProducts(updatedProducts);
  
    try {
      // Send the delete request to the backend
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`);
      // alert("Product Deleted Successfully");
    } catch (error) {
      // If there's an error, log it and restore the product in the UI
      console.error("Failed to delete product:", error);
      setProducts(products); // Revert the products to the previous state
      alert("Failed to delete product, please try again.");
    }
  };
  

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <>
{!isFormOpen && (<div>
<div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-semibold">Products</h2>
          <p>{products.length} entries found</p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md"
          onClick={onAddNewProduct}
        >
          + Add new product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr>
              <th className="p-4 text-left text-gray-600 font-semibold">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === displayedProducts.length}
                />
              </th>
              <th className="p-4 text-left text-gray-600 font-semibold">#</th>
              <th className="p-4 text-left text-gray-600 font-semibold">
                Name
              </th>
              <th className="p-4 text-left text-gray-600 font-semibold">
                Description
              </th>
              <th className="p-4 text-left text-gray-600 font-semibold">
                Price
              </th>
              <th className="p-4 text-left text-gray-600 font-semibold">
                Category
              </th>
              <th className="p-4 text-right text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product.id} className="border-t border-gray-100">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(product.id)}
                    onChange={() => handleSelectRow(product.id)}
                  />
                </td>
                <td className="p-4">{product.id}</td>
                <td className="p-4">{product.Name}</td>
                <td className="p-4">{product.Description}</td>
                <td className="p-4">${product.Price}</td>
                <td className="p-4">{product.Category}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditProduct(product)}>
                    ✏️ Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteProduct(product.documentId)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          {entriesPerPage} entries per page
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
</div>)}
      {isFormOpen && (
        <AddEditProduct
        initialProductData={selectedProduct} // Pass the selected product
          onClose={() => setIsFormOpen(false)} // Close the form
          handleBackFromEdit={handleBackFromEdit}
        />
      )}
    </>

    
    
  );
}

export default ProductTable;
