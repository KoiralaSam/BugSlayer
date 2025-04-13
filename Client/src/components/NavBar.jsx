import React, { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../Context/UserContext.jsx"
import { ShowLogin } from "../Context/ShowLogin.jsx"
import { Link } from "react-router"
import LoginPage from "./LoginPage.jsx"
import { CiSearch } from "react-icons/ci"
import UserAvatar from "../../asset/userAvatar.avif"

function NavBar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const { currentUser, dispatchUser } = useContext(UserContext)
  const { showLogin, setShowLogin } = useContext(ShowLogin)

  const handleClick = () => {
    if (!currentUser) {
      // Show the login modal if no user is logged in
      setShowLogin(true)
    } else {
      // Log out the user if they are logged in
      dispatchUser({ type: "logoutUser" })
    }
  }

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-baseline gap-16">
        <h1 className="text-4xl font-semibold">
          <Link to="/">
            Book<span className="text-red-500">Share</span>
          </Link>
        </h1>

        <nav className="flex gap-10 text-lg">
          <p className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">Shop</Link>
          </p>
          <p className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/sell">Sell</Link>
          </p>
          <p className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/about">About Us</Link>
          </p>
        </nav>
      </div>
      {window.location.pathname === "/shop" && (
        <div className="flex items-center">
          <CiSearch className="mr-[-30px]" size={20} />
          <input
            type="text"
            className="border-1  border-gray-400 rounded-2xl text-md px-4 py-1.5 pl-10 w-[300px]"
            placeholder="Search Books..."
          />
        </div>
      )}
      {currentUser ? (
        <div
          className="w-10 h-10 bg-cover rounded-4xl cursor-pointer relative"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          style={{ backgroundImage: `url(${UserAvatar})` }}
        >
          {showProfileDropdown && (
            <div className="w-[150px] h-fit bg-white absolute right-0 top-12 rounded-2xl flex flex-col items-center z-100">
              <button className="text-center w-[90%] cursor-pointer py-2 hover:text-red-400">
                {currentUser.name}
              </button>
              <button className="text-center w-[90%] border-t-1 border-gray-300 cursor-pointer py-2 hover:text-red-400">
                <Link to="/mycart"> My Cart</Link>
              </button>
              <button
                onClick={handleClick}
                className="text-center w-[90%] border-t-1 border-gray-300 cursor-pointer py-1 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="bg-red-400 font-semibold text-lg px-4 py-1 rounded-2xl text-white shadow-lg cursor-pointer"
        >
          Login
        </button>
      )}

      {showLogin && <LoginPage />}
    </div>
  )
}

export default NavBar
