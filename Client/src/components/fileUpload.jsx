import React, { useState } from "react";
import { FaRegFileImage } from "react-icons/fa";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type
    if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
      setError("Only JPG and PNG image files are allowed.");
      setFile(null);
      onFileUpload(null); // Notify parent of invalid file
    } else {
      setFile(selectedFile);
      setError("");
      onFileUpload(selectedFile); // Notify parent of valid file
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange({ target: { files: [droppedFile] } });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-4 ${
          dragActive ? "border-blue-500" : "border-dashed border-gray-400"
        } 
          p-10 rounded-xl text-center bg-gray-100 shadow-inner transition-all duration-300 font-semibold h-[250px]`}
      >
        <FaRegFileImage className="mx-auto mb-4 w-14" size={30} />
        <p className="text-gray-800 text-lg font-bold">
          Drag an image here, or
        </p>
        <label
          htmlFor="file-upload"
          className="text-red-700 font-extrabold cursor-pointer hover:underline uppercase"
        >
          Choose an image to upload
        </label>
        <p className="text-xs text-gray-600 mt-1 font-medium">
          File permitted: JPG, PNG
        </p>
        <input
          id="file-upload"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-600 text-sm mt-3 font-bold">{error}</p>}

      {file && (
        <div className="mt-5 text-sm text-gray-800 font-medium">
          <strong className="text-gray-900 uppercase">Selected:</strong>{" "}
          {file.name}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
