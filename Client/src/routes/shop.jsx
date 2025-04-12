import React from "react"
import NavBar from "../components/NavBar"
import BookCard from "../components/BookCard"

function Shop() {
  const bookdata = [
    {
      _id: "1",
      title: "Meditation",
      status: "listed",
      author: "Marcus Aurelius",
      price: 0,
      edition: "1.0",
      synopsis:
        "The breeze rustled the plume of smoke drifting from the dying ember. A faint murmur echoed through the trees, as if the forest were trying to tinker with forgotten secrets. He traced the pattern like a jigsaw, every clue a ripple in the stillness. Somewhere in the distance, a quasar pulsed beyond the stars, its glow as soft as velvet. Absentmindedly, she began to doodle in the dirt, unaware that the story had already begun.",
    },
    {
      _id: "1",
      title: "Meditation",
      status: "listed",
      author: "Marcus Aurelius",
      price: 10,
      edition: "1.0",
      synopsis:
        "The breeze rustled the plume of smoke drifting from the dying ember. A faint murmur echoed through the trees, as if the forest were trying to tinker with forgotten secrets. He traced the pattern like a jigsaw, every clue a ripple in the stillness. Somewhere in the distance, a quasar pulsed beyond the stars, its glow as soft as velvet. Absentmindedly, she began to doodle in the dirt, unaware that the story had already begun.",
    },
    {
      _id: "1",
      title: "Meditation",
      status: "listed",
      author: "Marcus Aurelius",
      price: 20,
      edition: "1.0",
      synopsis:
        "The breeze rustled the plume of smoke drifting from the dying ember. A faint murmur echoed through the trees, as if the forest were trying to tinker with forgotten secrets. He traced the pattern like a jigsaw, every clue a ripple in the stillness. Somewhere in the distance, a quasar pulsed beyond the stars, its glow as soft as velvet. Absentmindedly, she began to doodle in the dirt, unaware that the story had already begun.",
    },
    {
      _id: "1",
      title: "Meditation",
      status: "listed",
      author: "Marcus Aurelius",
      price: 20,
      edition: "1.0",
      synopsis:
        "The breeze rustled the plume of smoke drifting from the dying ember. A faint murmur echoed through the trees, as if the forest were trying to tinker with forgotten secrets. He traced the pattern like a jigsaw, every clue a ripple in the stillness. Somewhere in the distance, a quasar pulsed beyond the stars, its glow as soft as velvet. Absentmindedly, she began to doodle in the dirt, unaware that the story had already begun.",
    },
    {
      _id: "1",
      title: "Meditation",
      status: "listed",
      author: "Marcus Aurelius",
      price: 20,
      edition: "1.0",
      synopsis:
        "The breeze rustled the plume of smoke drifting from the dying ember. A faint murmur echoed through the trees, as if the forest were trying to tinker with forgotten secrets. He traced the pattern like a jigsaw, every clue a ripple in the stillness. Somewhere in the distance, a quasar pulsed beyond the stars, its glow as soft as velvet. Absentmindedly, she began to doodle in the dirt, unaware that the story had already begun.",
    },
  ]
  return (
    <div className="flex flex-col w-full min-h-screen bg-cover bg-center">
      <NavBar />
      {/*Dummy Data recommendation*/}
      <div className="m-8 mt-2">
        <h2 className="text-lg font-bold mb-2 ml-4">POPULAR</h2>
        <section className="grid grid-cols-5 gap-6">
          {bookdata.map((book) => (
            <BookCard book={book} />
          ))}
        </section>
      </div>
      <div className="m-8 mt-2">
        <h2 className="text-lg font-bold mb-2 ml-4">FOR YOU</h2>
        <section className="grid grid-cols-5 gap-6">
          {bookdata.map((book) => (
            <BookCard book={book} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Shop
