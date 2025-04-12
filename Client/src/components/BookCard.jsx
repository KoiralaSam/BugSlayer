import Book from "../../asset/bookbg.jpg"
import { FaShoppingCart } from "react-icons/fa"

function BookCard({ book }) {
  const { title, author, synopsis, price } = book
  return (
    <div className="w-fit p-2 shadow-xl rounded-2xl bg-gray-200 flex flex-col h-full">
      <img
        src={Book}
        alt=""
        className="rounded-tl-2xl rounded-tr-2xl shadow-md "
      />
      <div className="m-2 flex flex-col items-between h-full">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{title}</p>
            {price == 0 ? (
              <p className="text-lg text-green-600">Free</p>
            ) : (
              <p className="text-lg text-green-600">${price}</p>
            )}
          </div>

          <p className="text-md text-gray-500">By {author}</p>
          <p className="text-[12px] h-[55px] overflow-hidden text-gray-500">
            {synopsis}
          </p>
        </div>
        <div className="flex justify-end mt-2 items-center gap-4">
          <FaShoppingCart
            className="cursor-pointer hover:scale-125 duration-100"
            size={20}
          />
          <button className="bg-red-400 font-normal text-gray-200 px-3 py-1 rounded-xl cursor-pointer hover:scale-105 duration-100">
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
