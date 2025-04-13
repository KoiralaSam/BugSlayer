import Book from "../../asset/bookbg.jpg"
import { FaShoppingCart } from "react-icons/fa"

function BookCard({ book }) {
  const { title, author, synopsis, userPrice, avatar } = book
  return (
    <div className="w-fit p-2 shadow-xl rounded-2xl bg-gray-200 flex flex-col h-[400px]">
      {avatar ? (
        <img
          src={avatar}
          alt={`${title} cover`}
          className="w-full h-40 object-cover mt-2 rounded-tr-2xl rounded-tl-2xl"
        />
      ) : (
        <p className="text-gray-400 italic">No image available</p>
      )}
      <div className="m-2 flex flex-col items-between h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold  w-[60%]">{title}</p>
            {userPrice == 0 ? (
              <p className="text-lg text-green-600 w-[40%] text-right">Free</p>
            ) : (
              <p className="text-lg text-green-600 w-[40%] text-right">
                ${userPrice}
              </p>
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
