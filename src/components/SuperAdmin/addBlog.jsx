// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddEditBlog = ({ initialBlogData, onClose, goBack, handleBackFromEdit }) => {
//   const [blogData, setBlogData] = useState({
//     authorName: '',
//     title: '',
//     category: '',
//     description: '',
//     uploadDate: '',
//     views: 0,
//     sourceUrl: '',
//     sourceName: ''
//   });
//   const [authorImage, setAuthorImage] = useState(null);
//   const [blogImage, setBlogImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     if (initialBlogData) {
//       setBlogData({
//         authorName: initialBlogData.authorName,
//         title: initialBlogData.title,
//         category: initialBlogData.category,
//         description: initialBlogData.description,
//         uploadDate: initialBlogData.uploadDate,
//         views: initialBlogData.views,
//         sourceUrl: initialBlogData.sourceUrl,
//         sourceName: initialBlogData.sourceName
//       });
//       setAuthorImage(initialBlogData.authorImage);
//       setBlogImage(initialBlogData.blogImage);
//       setEditMode(true);
//     }
//   }, [initialBlogData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData({ ...blogData, [name]: value });
//   };

//   const handleAuthorImageChange = (e) => {
//     setAuthorImage(e.target.files[0]);
//   };

//   const handleBlogImageChange = (e) => {
//     setBlogImage(e.target.files[0]);
//   };

//   const uploadImage = async (image) => {
//     if (!image) return null;

//     setLoading(true);
//     const formData = new FormData();
//     formData.append('files', image);

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       return response.data[0].id;
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addBlog = async (authorImageId, blogImageId) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/blogs`,
//         {
//           data: {
//             ...blogData,
//             uploadDate: new Date(),
//             authorImage: authorImageId,
//             blogImage: blogImageId,
//           },
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//           },
//         }
//       );

//       console.log('Blog created:', response.data);
//       alert('Blog created successfully!');
//     } catch (error) {
//       console.error('Error creating blog:', error);
//     }
//   };

//   const updateBlog = async (authorImageId, blogImageId) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${initialBlogData.documentId}`,
//         {
//           data: {
//             ...blogData,
//             authorImage: authorImageId,
//             blogImage: blogImageId,
//           },
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//           },
//         }
//       );

//       console.log('Blog updated:', response.data);
//       alert('Blog updated successfully!');
//     } catch (error) {
//       console.error('Error updating blog:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const authorImageId = await uploadImage(authorImage);
//     const blogImageId = await uploadImage(blogImage);

//     if (editMode) {
//       await updateBlog(authorImageId, blogImageId);
//     } else {
//       await addBlog(authorImageId, blogImageId);
//     }

//     setBlogData({
//       authorName: '',
//       title: '',
//       category: '',
//       description: '',
//       uploadDate: '',
//       views: 0,
//       sourceUrl: '',
//       sourceName: ''
//     });
//     setAuthorImage(null);
//     setBlogImage(null);
//     if (onClose) onClose();
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100 pb-32">
//       <button
//         className="pr-4 py-2 font-bold text-red-500 rounded-lg absolute top-20 left-1/4"
//         onClick={() => {!initialBlogData ? goBack() : handleBackFromEdit()}}
//       >
//         ← Back
//       </button>
//       <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           {editMode ? 'Edit Blog' : 'Add Blog'}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Author Name</label>
//             <input
//               type="text"
//               name="authorName"
//               value={blogData.authorName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//               // required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Author Image</label>
//             <input
//               type="file"
//               onChange={handleAuthorImageChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//               // required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={blogData.title}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//               // required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={blogData.category}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Description</label>
//             <textarea
//               name="description"
//               value={blogData.description}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//               // required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Blog Image</label>
//             <input
//               type="file"
//               onChange={handleBlogImageChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//               // required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Views</label>
//             <input
//               type="number"
//               name="views"
//               value={blogData.views}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Date</label>
//             <input
//               type="date"
//               name="uploadDate"
//               value={blogData.uploadDate}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Source URL</label>
//             <input
//               type="url"
//               name="sourceUrl"
//               value={blogData.sourceUrl}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Source Name</label>
//             <input
//               type="text"
//               name="sourceName"
//               value={blogData.sourceName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 ${
//               loading ? 'opacity-50' : ''
//             }`}
//             disabled={loading}
//           >
//             {loading ? 'Uploading...' : editMode ? 'Update Blog' : 'Create Blog'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEditBlog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEditBlog = ({ initialBlogData, onClose, goBack, handleBackFromEdit }) => {
  const [blogData, setBlogData] = useState({
    authorName: '',
    title: '',
    category: '',
    description: '',
    uploadDate: '',
    views: 0,
    sourceUrl: '',
    sourceName: ''
  });
  const [authorImage, setAuthorImage] = useState(null);
  const [blogImage, setBlogImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // State for categories and modal
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch initial data and categories
  useEffect(() => {
    if (initialBlogData) {
      setBlogData({
        authorName: initialBlogData.authorName,
        title: initialBlogData.title,
        category: initialBlogData.category,
        description: initialBlogData.description,
        uploadDate: initialBlogData.uploadDate,
        views: initialBlogData.views,
        sourceUrl: initialBlogData.sourceUrl,
        sourceName: initialBlogData.sourceName
      });
      setAuthorImage(initialBlogData.authorImage);
      setBlogImage(initialBlogData.blogImage);
      setEditMode(true);
    }

    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blog-categories`);
        setCategories(response.data.data);
        console.log("Categories",response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [initialBlogData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleAuthorImageChange = (e) => {
    setAuthorImage(e.target.files[0]);
  };

  const handleBlogImageChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const uploadImage = async (image) => {
    if (!image) return null;

    setLoading(true);
    const formData = new FormData();
    formData.append('files', image);

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

      return response.data[0].id;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addBlog = async (authorImageId, blogImageId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs`,
        {
          data: {
            ...blogData,
            uploadDate: new Date(),
            authorImage: authorImageId,
            blogImage: blogImageId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      );

      console.log('Blog created:', response.data);
      alert('Blog created successfully!');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const updateBlog = async (authorImageId, blogImageId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${initialBlogData.documentId}`,
        {
          data: {
            ...blogData,
            authorImage: authorImageId,
            blogImage: blogImageId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      );

      console.log('Blog updated:', response.data);
      alert('Blog updated successfully!');
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authorImageId = await uploadImage(authorImage);
    const blogImageId = await uploadImage(blogImage);

    if (editMode) {
      await updateBlog(authorImageId, blogImageId);
    } else {
      await addBlog(authorImageId, blogImageId);
    }

    setBlogData({
      authorName: '',
      title: '',
      category: '',
      description: '',
      uploadDate: '',
      views: 0,
      sourceUrl: '',
      sourceName: ''
    });
    setAuthorImage(null);
    setBlogImage(null);
    if (onClose) onClose();
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog-categories`,
        { data: { Name: newCategory } },
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      );
      setCategories([...categories, response.data.data]); // Add new category to the dropdown
      setIsModalOpen(false); // Close modal
      setNewCategory(''); // Reset input
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 pb-32">
      <button
        className="pr-4 py-2 font-bold text-red-500 rounded-lg absolute top-20 left-1/4"
        onClick={() => {!initialBlogData ? goBack() : handleBackFromEdit()}}
      >
        ← Back
      </button>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {editMode ? 'Edit Blog' : 'Add Blog'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Author Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Author Name</label>
            <input
              type="text"
              name="authorName"
              value={blogData.authorName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          {/* Author Image */}
          <div className="mb-4">
            <label className="block text-gray-700">Author Image</label>
            <input
              type="file"
              onChange={handleAuthorImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <div className="flex">
              <select
                name="category"
                value={blogData.category}
                onChange={handleChange}
                className="w-full px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.Name}>
                    {category.Name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
              >
              +&nbsp;Category
              </button>
            </div>
          </div>
          {/* Modal for Adding Category */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Category name"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 mr-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={blogData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="4"
              required
            ></textarea>
          </div>
          {/* Blog Image */}
          <div className="mb-4">
            <label className="block text-gray-700">Blog Image</label>
            <input
              type="file"
              onChange={handleBlogImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
           <label className="block text-gray-700">Date</label>
                       <input
              type="date"
                            name="uploadDate"
              value={blogData.uploadDate}
                             onChange={handleChange}
               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
             />
           </div>
          {/* Source Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Source Name</label>
            <input
              type="text"
              name="sourceName"
              value={blogData.sourceName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          {/* Source URL */}
          <div className="mb-4">
            <label className="block text-gray-700">Source URL</label>
            <input
              type="text"
              name="sourceUrl"
              value={blogData.sourceUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-3 py-2 bg-red-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading}
          >
            {loading ? 'Saving...' : editMode ? 'Update Blog' : 'Add Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlog;
