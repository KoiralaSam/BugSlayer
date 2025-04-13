import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  // Fetch all books from the backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books"); // Replace with your backend endpoint
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Fetch books when the provider mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books }}>{children}</BookContext.Provider>
  );
};
