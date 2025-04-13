import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import BookCard from "../components/BookCard";
import { UserContext } from "../Context/UserContext";
import { BookContext } from "../Context/BookContext";

const defaultBooks = [
  {
    _id: "1",
    title: "Default Book 1",
    author: "Default Author 1",
    genre: ["Fiction"],
    status: "listed",
    edition: "First Edition",
    synopsis: "This is a default book synopsis.",
  },
  {
    _id: "2",
    title: "Default Book 2",
    author: "Default Author 2",
    genre: ["Non-Fiction"],
    status: "listed",
    edition: "Second Edition",
    synopsis: "This is another default book synopsis.",
  },
  // Add more default books as needed
];

function Shop() {
  const { currentUser } = useContext(UserContext);
  const { books } = useContext(BookContext); // Access books from BookContext

  return (
    <div className="flex flex-col w-full min-h-screen bg-cover bg-center">
      <NavBar />
      {/* Recommendations from UserContext */}
      <div className="m-8 mt-2">
        <h2 className="text-lg font-bold mb-2 ml-4">POPULAR</h2>
        <section className="grid grid-cols-4 gap-6">
          {currentUser?.recommended?.length > 0 ? (
            currentUser.recommended.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <p className="ml-4">No recommendations available.</p>
          )}
        </section>
      </div>
      {/* All Books from the Database */}
      <div className="m-8 mt-2">
        <h2 className="text-lg font-bold mb-2 ml-4">FOR YOU</h2>
        <section className="grid grid-cols-4 gap-6">
          {books.length > 0
            ? books.map((book) => <BookCard key={book._id} book={book} />)
            : defaultBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
        </section>
      </div>
    </div>
  );
}

export default Shop;
