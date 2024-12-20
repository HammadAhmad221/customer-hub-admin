import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEditBlog from "./addBlog";

function BlogTable({ onAddNewBlog }) {
  const entriesPerPage = 10;

  const [blogs, setBlogs] = useState([]); // For storing API data
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); // For editing a blog
  const [isFormOpen, setIsFormOpen] = useState(false); // Form visibility

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/blogs?populate=*`
        );
        setBlogs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.max(Math.ceil(blogs?.length / entriesPerPage), 1);
  const displayedBlogs = Array.isArray(blogs)
    ? blogs.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
    : [];

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows?.length === displayedBlogs?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(displayedBlogs.map((blog) => blog.id));
    }
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setIsFormOpen(true);
  };

  const handleDeleteBlog = async (blogId) => {
    const updatedBlogs = blogs.filter((blog) => blog.documentId !== blogId);
    setBlogs(updatedBlogs);

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}`);
    } catch (error) {
      console.error("Failed to delete blog:", error);
      setBlogs(blogs); // Revert on failure
      alert("Failed to delete blog, please try again.");
    }
  };

  const handleBackFromEdit =() =>{
    setIsFormOpen(false);
  };

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  return (
    <>
      {!isFormOpen && (
        <div>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-semibold">Blogs</h2>
              <p>{blogs?.length} entries found</p>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md"
              onClick={onAddNewBlog}
            >
              + Add new blog
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
                      checked={selectedRows?.length === displayedBlogs?.length}
                    />
                  </th>
                  <th className="p-4 text-left text-gray-600 font-semibold">#</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Title</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Author</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Category</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Views</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Upload Date</th>
                  <th className="p-4 text-right text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedBlogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-gray-100">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(blog.id)}
                        onChange={() => handleSelectRow(blog.id)}
                      />
                    </td>
                    <td className="p-4">{blog.id}</td>
                    <td className="p-4">{blog.title}</td>
                    <td className="p-4">{blog.authorName}</td>
                    <td className="p-4">{blog.category || "N/A"}</td>
                    <td className="p-4">{blog.views || 0}</td>
                    <td className="p-4">{blog.uploadDate}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditBlog(blog)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteBlog(blog.documentId)}
                      >
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
        <AddEditBlog
          initialBlogData={selectedBlog}
          onClose={() => setIsFormOpen(false)}
          handleBackFromEdit={handleBackFromEdit}
        />
      )}
    </>
  );
}

export default BlogTable;
