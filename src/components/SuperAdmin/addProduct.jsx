import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    Name: '',
    Description: '',
    Category: '',
    Price: '',
  });
  const [images, setImages] = useState([]);
  // const [imageIds, setImageIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

const uploadImages = async () => {
    setLoading(true);
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('files', image);
    });
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const uploadedImageIds = response.data.map((img) => img.id);
      // console.log('Uploaded Image IDs:', uploadedImageIds);
  
      // Return the uploaded image IDs instead of using state
      return uploadedImageIds;
    } catch (error) {
      console.error('Error uploading images:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

const createProduct = async (uploadedImageIds) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        {
          data: {
            ...productData,
            Price: parseFloat(productData.Price),
            Images: uploadedImageIds.map((id) => ({ id })),
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          },
        }
      );
  
      console.log('Product created:', response.data);
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Upload images and get their IDs
    const uploadedImageIds = await uploadImages();
    console.log(uploadedImageIds);
  
    // Pass uploadedImageIds directly to createProduct
    await createProduct(uploadedImageIds);
    // setProductData({});
        // Reset the form fields after successful product creation
        setProductData({
          Name: '',
          Description: '',
          Category: '',
          Price: '',
        });
        setImages([]);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="Name"
              value={productData.Name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="Description"
              value={productData.Description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="Category"
              value={productData.Category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="Price"
              value={productData.Price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 ${
              loading ? 'opacity-50' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
