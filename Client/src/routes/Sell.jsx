import React, { useState } from "react";
import FileUpload from "../components/fileUpload";
import NavBar from "../components/NavBar";
import { LuDollarSign } from "react-icons/lu";
import axios from "axios";

const defaultFormFields = {
  title: "",
  author: "",
  genre: "",
  userPrice: "",
};

function Sell() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [marketPrice, setMarketPrice] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null); // State to store the uploaded image

  const { title, author, genre, userPrice } = formFields;

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Handle image upload from FileUpload component
  const handleImageUpload = (file) => {
    setImage(file); // Set the uploaded image file
  };

  // Fetch market price for the book
  const fetchMarketPrice = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/books/market-price",
        {
          title,
          author,
          genre,
        }
      );
      setMarketPrice(response.data.marketPrice);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch market price.");
      setMarketPrice(null);
    }
  };

  // Handle adding the book to the database
  const handleAddBook = async () => {
    if (!title || !author || !genre || !userPrice || !image) {
      setError("All fields are required, including the image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("userPrice", userPrice);
    formData.append("marketPrice", marketPrice || 0); // Use market price if available
    formData.append("avatar", image); // Append the image file

    try {
      const response = await axios.post(
        "http://localhost:3000/book",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Book added successfully!");
      resetFormFields();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add the book.");
    }
  };

  // Reset form fields and state
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setMarketPrice(null);
    setError("");
    setImage(null);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-cover bg-center">
      <NavBar />
      <section className="m-8 mt-10">
        <h1 className="text-3xl font-bold">Add new book to sell or Donate!</h1>
        <div className="flex w-full">
          {/* FileUpload component for image upload */}
          <FileUpload onFileUpload={handleImageUpload} />
          <form className="w-[60%] mt-6">
            <div className="flex flex-col">
              <label className="text-2xl">Book Name</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                className="border-1 border-gray-400 px-4 py-2 rounded-xl w-[400px]"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-2xl">Author</label>
              <input
                type="text"
                name="author"
                value={author}
                onChange={handleChange}
                className="border-1 border-gray-400 px-4 py-2 rounded-xl w-[400px]"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-2xl">Genre</label>
              <select
                name="genre"
                value={genre}
                onChange={handleChange}
                className="border-1 border-gray-400 px-4 py-2 rounded-xl w-[400px]"
              >
                <option value="" disabled>
                  Select a Genre
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
              </select>
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-2xl">Pricing</p>
              <label className="mt-3 text-sm">Set your own Price</label>
              <div className="flex items-center">
                <LuDollarSign size={25} className="mr-[-30px]" />
                <input
                  type="number"
                  name="userPrice"
                  value={userPrice}
                  onChange={handleChange}
                  className="border-1 border-gray-400 px-4 py-2 pl-10 rounded-xl w-[400px]"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={fetchMarketPrice}
                  className="text-blue-600 text-sm hover:text-blue-400 cursor-pointer hover:underline"
                >
                  Generate Market Price
                </button>
              </div>
              {marketPrice && (
                <p className="mt-2 text-green-600 font-bold">
                  Market Price: ${marketPrice}
                </p>
              )}
              {error && <p className="mt-2 text-red-600 font-bold">{error}</p>}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={resetFormFields}
                className="bg-gray-500 text-xl font-semibold px-4 py-2 text-white rounded-3xl cursor-pointer mr-4"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleAddBook}
                className="bg-red-500 text-xl font-semibold px-4 py-2 text-white rounded-3xl cursor-pointer"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Sell;
