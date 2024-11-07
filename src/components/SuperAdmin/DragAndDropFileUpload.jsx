import React, { useState } from "react";

const DragAndDropFileUpload = ({ onFileChange }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setError("");
      onFileChange(file);
    } else {
      setSelectedFile(null);
      setError("Please upload only image files.");
    }
  };

  return (
    <div>
      <div
        className={`border-2 ${
          dragging ? "border-red-500 bg-red-50" : "border-[#DCDCE4]"
        } rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-[#F6F6F9]`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {selectedFile ? (
          <p className="text-gray-700">{selectedFile.name}</p>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <img src="/PicturePlus.svg" alt="" />
            <p className="text-gray-500">
              Click to select or drag and drop an image here
            </p>
          </div>
        )}
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          accept="image/*" // Ensures the file input only allows images
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default DragAndDropFileUpload;
