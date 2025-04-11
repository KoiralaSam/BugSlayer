import React from "react"

function NavBar() {
  return (
    <div className="flex items-center justify-between bg-red-200 p-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold">BookShare</h1>

        <nav className="">
          <a>Shop</a>
          <a>Sell</a>
          <a>About Us</a>
        </nav>
      </div>

      <button>Sign Up</button>
    </div>
  )
}

export default NavBar
