import React from "react"

function NavBar() {
  return (
    <div className="flex items-center justify-between p-4 border-b-2 border-gray-300 z-4">
      <div className="flex items-baseline gap-16">
        <h1 className="text-3xl font-semibold">
          Book<span className="text-red-500">Share</span>
        </h1>

        <nav className="flex gap-10">
          <a className="font-semibold">Shop</a>
          <a className="font-semibold">Sell</a>
          <a className="font-semibold">About Us</a>
        </nav>
      </div>

      <button className="bg-red-500 font-semibold py-1 px-4 text-white rounded-2xl hover:shadow-2xl cursor-pointer">
        Sign Up
      </button>
    </div>
  )
}

export default NavBar
