import FileUpload from "../components/fileUpload"
import NavBar from "../components/NavBar"

import { LuDollarSign } from "react-icons/lu"

function Sell() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-cover bg-center">
      <NavBar />
      <section className="m-8 mt-10">
        <h1 className="text-3xl font-bold">Add new book to sell or Donate!</h1>
        <div className="flex w-full">
          <FileUpload className="w-[40%]" />
          <form action="" className="w-[60%] mt-6">
            <div className="flex flex-col">
              <label className="text-2xl">Book Name</label>
              <input
                type="text"
                className="border-1 border-gray-400 px-4 py-2 rounded-xl"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-2xl">Author</label>
              <input
                type="text"
                className="border-1 border-gray-400 px-4 py-2 rounded-xl"
              />
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-2xl">Pricing</p>
              <label className="mt-3 text-sm">Set your own Price</label>
              <div className="flex items-center">
                <LuDollarSign size={25} className="mr-[-30px]" />

                <input
                  type="number"
                  className="border-1 border-gray-400 px-4 py-2 pl-10 rounded-xl w-full"
                />
              </div>
              <div>
                <button className="text-blue-600 text-sm hover:text-blue-400 cursor-pointer hover:underline">
                  Generate Market Price
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-xl font-semibold px-4 py-2 text-white rounded-3xl cursor-pointer">
                Add Book
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Sell
