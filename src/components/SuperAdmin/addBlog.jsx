import React, { useState } from 'react';
import Select from "react-select";
import axios from 'axios';

const AddBlog = () => {
  const categories = [
    { value: "Plumbing", label: "Plumbing" },
    { value: "HVAC", label: "HVAC" },
    { value: "ELECTRICIANS", label: "ELECTRICIANS" },
    { value: "SOLAR", label: "SOLAR" },
    { value: "ROOFING", label: "ROOFING" },
    { value: "HOME IMPROVEMENT", label: "HOME IMPROVEMENT" },
    { value: "DAMP PROOFING", label: "DAMP PROOFING" },
    { value: "OTHER HOME SERVICE BUSINESS", label: "OTHER HOME SERVICE BUSINESS" },

  ];

  const [blogData, setBlogData] = useState({
    authorName: '',
    title: '',
    category: '',
    uploadDate: '',
    views: 0,
    description: '',
  });

  const [authorImage, setAuthorImage] = useState(null);
  const [blogImage, setBlogImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleCategoryChange = (selectedOption) => {
    setBlogData((prev) => ({
      ...prev,
      category: selectedOption.value,
    }));
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data[0].id; // Return the uploaded file's ID
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const createBlog = async (authorImageId, blogImageId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs`,
        {
          data: {
            ...blogData,
            authorImage: { id: authorImageId },
            blogImage: { id: blogImageId },
            views: parseInt(blogData.views, 10),
          },
        },
        { headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
         } }
      );
      console.log('Blog created:', response.data);
      alert('Blog created successfully!');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const authorImageId = await uploadFile(authorImage);
      const blogImageId = await uploadFile(blogImage);

      await createBlog(authorImageId, blogImageId);
      setBlogData({
        authorName: '',
        title: '',
        category: '',
        uploadDate: '',
        views: 0,
        description: '',
      });
      setAuthorImage(null);
      setBlogImage(null);
    } catch (error) {
      alert('Failed to upload images or create blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Author Name</label>
            <input
              type="text"
              name="authorName"
              value={blogData.authorName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author Image</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setAuthorImage)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Blog Image</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setBlogImage)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={blogData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
            />
          </div> */}
              <div className="mb-4">
      <label className="block text-gray-700">Category</label>
      <Select
        options={categories}
        onChange={handleCategoryChange}
        className="basic-single"
        classNamePrefix="select"
        placeholder="Select a category"
      />
    </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Date</label>
            <input
              type="date"
              name="uploadDate"
              value={blogData.uploadDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Views</label>
            <input
              type="number"
              name="views"
              value={blogData.views}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={blogData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 ${
              loading ? 'opacity-50' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Create Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
