import NavBar from "../components/NavBar"

function AboutUs() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-right">
      <NavBar />
      <section className="">
        <div className="px-6 py-12 text-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg mb-8">
              At <span className="font-semibold">BookShare</span>, we believe
              that every book deserves a second life. Whether you're looking to
              donate, recycle, or discover your next favorite read, our platform
              connects passionate readers and promotes sustainable book sharing.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
              <p>
                We aim to reduce book waste by encouraging donations and
                exchanges. By connecting book lovers from all walks of life,
                we’re helping foster a community built on knowledge,
                sustainability, and kindness.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
              <p>
                Founded by students and readers who love stories, BookCycle
                began as a way to share books in local communities. Today, it’s
                grown into a user-friendly platform for anyone looking to give
                or get a book.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-2">Join Us</h2>
            <p>
              Whether you’re clearing your shelf or searching for that one
              special book, we invite you to join our growing family of book
              recyclers and readers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
