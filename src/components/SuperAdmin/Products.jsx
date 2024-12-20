import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEditProduct from "./addProduct";

function ProductTable({ onAddNewProduct }) {
  const entriesPerPage = 10;

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("branding"); // Set the initial active tab

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?populate=*`
        );
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

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`);
    } catch (error) {
      console.error("Failed to delete product:", error);
      setProducts(products);
      alert("Failed to delete product, please try again.");
    }
  };

  const handleBackFromEdit = () => {
    setIsFormOpen(false);
  };

  const categoryTables = [
    { name: "Branding Tools, and Content", key: "branding" },
    { name: "Management Programs", key: "management" },
    { name: "Premium Consultancy", key: "consultancy" },
  ];

  const getProductsForCategory = (categoryKey) => {
    const category = categoryTables.find((cat) => cat.key === categoryKey);
    return products.filter((product) => product.Category === category?.name);
  };

  const displayedProducts = getProductsForCategory(activeTab);
  const totalPages = Math.max(Math.ceil(displayedProducts.length / entriesPerPage), 1);
  const paginatedProducts = displayedProducts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <>
      {!isFormOpen && (
        <div>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-semibold">Products</h2>
              <p>{products?.length} entries found</p>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md"
              onClick={onAddNewProduct}
            >
              + Add new product
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-4">
            {categoryTables.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setActiveTab(category.key);
                  setCurrentPage(1); // Reset to first page when changing tab
                }}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === category.key
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr>
                  <th className="p-4 text-left text-gray-600 font-semibold">
                    <input
                      type="checkbox"
                      onChange={() => {}}
                      checked={
                        selectedRows.length === paginatedProducts.length &&
                        paginatedProducts.length > 0
                      }
                    />
                  </th>
                  <th className="p-4 text-left text-gray-600 font-semibold">#</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Name</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Description</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Price</th>
                  <th className="p-4 text-right text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
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
                    <td className="p-4 text-right space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditProduct(product)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">{entriesPerPage} entries per page</div>
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
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {isFormOpen && (
        <AddEditProduct
          initialProductData={selectedProduct}
          onClose={() => setIsFormOpen(false)}
          handleBackFromEdit={handleBackFromEdit}
        />
      )}
    </>
  );
}

export default ProductTable;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AddEditProduct from "./addProduct";

// function ProductTable({ onAddNewProduct }) {
//   const entriesPerPage = 10;

//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/products?populate=*`
//         );
//         setProducts(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSelectRow = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleEditProduct = (product) => {
//     setSelectedProduct(product);
//     setIsFormOpen(true);
//   };

//   const handleDeleteProduct = async (productId) => {
//     const updatedProducts = products.filter((product) => product.id !== productId);
//     setProducts(updatedProducts);

//     try {
//       await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`);
//     } catch (error) {
//       console.error("Failed to delete product:", error);
//       setProducts(products);
//       alert("Failed to delete product, please try again.");
//     }
//   };

//   const handleBackFromEdit = () => {
//     setIsFormOpen(false);
//   };

//   const categoryTables = [
//     { name: "Branding Tools, and Content", key: "branding" },
//     { name: "Management Programs", key: "management" },
//     { name: "Premium Consultancy", key: "consultancy" },
//   ];

//   const categorizedProducts = new Set(
//     categoryTables.flatMap((category) =>
//       products.filter((product) => product.Category === category.name)
//     )
//   );

//   const uncategorizedProducts = products.filter(
//     (product) => !categorizedProducts.has(product)
//   );

//   if (loading) {
//     return <div>Loading products...</div>;
//   }

//   return (
//     <>
//       {!isFormOpen && (
//         <div>
//           <div className="flex justify-between items-center mb-10">
//             <div>
//               <h2 className="text-4xl font-semibold">Products</h2>
//               <p>{products?.length} entries found</p>
//             </div>
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md"
//               onClick={onAddNewProduct}
//             >
//               + Add new product
//             </button>
//           </div>

//           {categoryTables.map((category, index) => {
//             const categoryProducts = products.filter(
//               (product) => product.Category === category.name
//             );

//             const totalPages = Math.max(Math.ceil(categoryProducts.length / entriesPerPage), 1);
//             const displayedProducts = categoryProducts.slice(
//               (currentPage - 1) * entriesPerPage,
//               currentPage * entriesPerPage
//             );

//             return (
//               <div key={category.key} className="mb-10">
//                 <h3 className="text-2xl font-semibold mb-4">{category.name}</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
//                     <thead>
//                       <tr>
//                         <th className="p-4 text-left text-gray-600 font-semibold">
//                           <input
//                             type="checkbox"
//                             onChange={() => {}}
//                             checked={
//                               selectedRows.length === displayedProducts.length &&
//                               displayedProducts.length > 0
//                             }
//                           />
//                         </th>
//                         <th className="p-4 text-left text-gray-600 font-semibold">#</th>
//                         <th className="p-4 text-left text-gray-600 font-semibold">Name</th>
//                         <th className="p-4 text-left text-gray-600 font-semibold">
//                           Description
//                         </th>
//                         <th className="p-4 text-left text-gray-600 font-semibold">Price</th>
//                         <th className="p-4 text-right text-gray-600 font-semibold">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {displayedProducts.map((product) => (
//                         <tr key={product.id} className="border-t border-gray-100">
//                           <td className="p-4">
//                             <input
//                               type="checkbox"
//                               checked={selectedRows.includes(product.id)}
//                               onChange={() => handleSelectRow(product.id)}
//                             />
//                           </td>
//                           <td className="p-4">{product.id}</td>
//                           <td className="p-4">{product.Name}</td>
//                           <td className="p-4">{product.Description}</td>
//                           <td className="p-4">${product.Price}</td>
//                           <td className="p-4 text-right space-x-2">
//                             <button
//                               className="text-blue-500 hover:text-blue-700"
//                               onClick={() => handleEditProduct(product)}
//                             >
//                               ✏️ Edit
//                             </button>
//                             <button
//                               className="text-red-500 hover:text-red-700"
//                               onClick={() => handleDeleteProduct(product.id)}
//                             >
//                               🗑️ Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="flex justify-between items-center mt-4">
//                   <div className="text-sm text-gray-500">{entriesPerPage} entries per page</div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
//                       disabled={currentPage === 1}
//                       className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
//                     >
//                       Previous
//                     </button>
//                     {Array.from({ length: totalPages }, (_, i) => (
//                       <button
//                         key={i + 1}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className={`px-2 py-1 rounded-md ${
//                           currentPage === i + 1
//                             ? "bg-blue-500 text-white"
//                             : "text-gray-600 bg-gray-100 hover:bg-gray-200"
//                         }`}
//                       >
//                         {i + 1}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() =>
//                         setCurrentPage(Math.min(currentPage + 1, totalPages))
//                       }
//                       disabled={currentPage === totalPages}
//                       className="px-2 py-1 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {uncategorizedProducts.length > 0 && (
//             <div className="mb-10">
//               <h3 className="text-2xl font-semibold mb-4">Uncategorized Products</h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
//                   <thead>
//                     <tr>
//                       <th className="p-4 text-left text-gray-600 font-semibold">
//                         <input
//                           type="checkbox"
//                           onChange={() => {}}
//                           checked={
//                             selectedRows.length === uncategorizedProducts.length &&
//                             uncategorizedProducts.length > 0
//                           }
//                         />
//                       </th>
//                       <th className="p-4 text-left text-gray-600 font-semibold">#</th>
//                       <th className="p-4 text-left text-gray-600 font-semibold">Name</th>
//                       <th className="p-4 text-left text-gray-600 font-semibold">Description</th>
//                       <th className="p-4 text-left text-gray-600 font-semibold">Price</th>
//                       <th className="p-4 text-right text-gray-600 font-semibold">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {uncategorizedProducts.map((product) => (
//                       <tr key={product.id} className="border-t border-gray-100">
//                         <td className="p-4">
//                           <input
//                             type="checkbox"
//                             checked={selectedRows.includes(product.id)}
//                             onChange={() => handleSelectRow(product.id)}
//                           />
//                         </td>
//                         <td className="p-4">{product.id}</td>
//                         <td className="p-4">{product.Name}</td>
//                         <td className="p-4">{product.Description}</td>
//                         <td className="p-4">${product.Price}</td>
//                         <td className="p-4 text-right space-x-2">
//                           <button
//                             className="text-blue-500 hover:text-blue-700"
//                             onClick={() => handleEditProduct(product)}
//                           >
//                             ✏️ Edit
//                           </button>
//                           <button
//                             className="text-red-500 hover:text-red-700"
//                             onClick={() => handleDeleteProduct(product.id)}
//                           >
//                             🗑️ Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="flex justify-between items-center mt-4">
//                 <div className="text-sm text-gray-500">{entriesPerPage} entries per page</div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//       {isFormOpen && (
//         <AddEditProduct
//           initialProductData={selectedProduct}
//           onClose={() => setIsFormOpen(false)}
//           handleBackFromEdit={handleBackFromEdit}
//         />
//       )}
//     </>
//   );
// }

// export default ProductTable;
