import React, { useState } from "react"
import { Link } from "react-router"

import SignUp from "./SignUp.jsx"

function NavBar() {
  const [showSignUp, setShowSignUp] = useState(false)
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-baseline gap-16">
        <h1 className="text-3xl font-semibold">
          <Link to="/">
            Book<span className="text-red-500">Share</span>
          </Link>
        </h1>

        <nav className="flex gap-10">
          <a className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">Shop</Link>
          </a>
          <a className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">Sell</Link>
          </a>
          <a className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">About Us</Link>
          </a>
        </nav>
      </div>

      <button
        onClick={() => setShowSignUp(true)}
        className="bg-red-500 font-semibold py-1 px-4 text-white rounded-2xl hover:shadow-2xl cursor-pointer"
      >
        Sign Up
      </button>
      {showSignUp && <SignUp setShowSignUp={setShowSignUp} />}
    </div>
  )
}

export default NavBar
