import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEditProduct = ({ initialProductData, onClose, goBack, handleBackFromEdit }) => {
  const [productData, setProductData] = useState({
    Name: '',
    Description: '',
    Category: '',
    Price: '',
    KeyFeature: '',
    Discount: '',
    StripeLink: '',
    Notes: '',
    VideoUrl: '',
    CalendarUrl: '',
  });

  const [images, setImages] = useState([]);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (initialProductData) {
      setProductData({
        Name: initialProductData.Name,
        Description: initialProductData.Description,
        Category: initialProductData.Category,
        Price: initialProductData.Price,
        KeyFeature: initialProductData.KeyFeature || '',
        Discount: initialProductData.Discount || '',
        StripeLink: initialProductData.StripeLink || '',
        Notes: initialProductData.Notes || '',
        VideoUrl: initialProductData.VideoUrl || '',
        CalendarUrl: initialProductData.CalendarUrl || '',
      });
      setEditMode(true);
    }
  }, [initialProductData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => setImages([...e.target.files]);
  const handleSampleChange = (e) => setSamples([...e.target.files]);

  const uploadFiles = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.map((file) => file.id);
    } catch (error) {
      console.error('Error uploading files:', error);
      return [];
    }
  };

  const addOrUpdateProduct = async () => {
    setLoading(true);
    let uploadedImageIds;
    let uploadedSampleIds;
    if(images){    
      uploadedImageIds = await uploadFiles(images);
    }
    if(samples){

      uploadedSampleIds = await uploadFiles(samples);
    }

    const payload = {
      data: {
        ...productData,
        Price: parseFloat(productData.Price),
        Discount: parseFloat(productData.Discount || 0),
        Images: uploadedImageIds.map((id) => ({ id })),
        Samples: uploadedSampleIds.map((id) => ({ id })),
      },
    };

    try {
      if (editMode) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${initialProductData.documentId}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        });
        alert('Product updated successfully!');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        });
        alert('Product created successfully!');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
      onClose && onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addOrUpdateProduct();
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 pb-32">
      <button
        className="pr-4 py-2 font-bold text-red-500 rounded-lg absolute top-20 left-1/4"
        onClick={() => (!initialProductData ? goBack() : handleBackFromEdit())}
      >
        ← Back
      </button>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {editMode ? 'Edit Product' : 'Add Product'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Basic Fields */}
          {['Name', 'Description', 'KeyFeature', 'StripeLink', 'Notes', 'VideoUrl'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700">{field}</label>
              <input
                type={field === 'Notes' ? 'textarea' : 'text'}
                name={field}
                value={productData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                required={field == 'Name'}
              />
            </div>
          ))}

          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="Category"
              value={productData.Category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
              require
            >
              <option value="">Select Category</option>
              <option value="Branding Tools, and Content">Branding Tools, and Content</option>
              <option value="Management Programs">Management Programs</option>
              <option value="Premium Consultancy">Premium Consultancy</option>
            </select>
          </div>

          {/* Calendar URL Field - Conditionally Rendered */}
          {productData.Category === 'Premium Consultancy' && (
            <div className="mb-4">
              <label className="block text-gray-700">Calendar URL</label>
              <input
                type="text"
                name="CalendarUrl"
                value={productData.CalendarUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                placeholder="Enter the calendar URL"
              />
            </div>
          )}

          {/* Number Fields */}
          {['Price', 'Discount'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700">{field}</label>
              <input
                type="number"
                name={field}
                value={productData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                required={field=="Price"}
              />
            </div>
          ))}

          {/* File Upload Fields */}
          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input type="file" multiple onChange={handleImageChange} required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Samples</label>
            <input type="file" multiple onChange={handleSampleChange} />
          </div>

          <button
            type="submit"
            className={`w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 ${
              loading ? 'opacity-50' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Saving...' : editMode ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
