import React from "react"
import { useContext } from "react"
import { UserContext } from "../Context/UserContext.jsx"
import { ShowLogin } from "../Context/ShowLogin.jsx"
import { Link } from "react-router"
import LoginPage from "./LoginPage.jsx"
import { CiSearch } from "react-icons/ci"

function NavBar() {
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
            <Link to="/shop">About Us</Link>
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

      <button
        onClick={handleClick}
        className="bg-red-500 font-semibold py-2 px-6 text-lg text-white rounded-2xl hover:shadow-2xl cursor-pointer"
      >
        {currentUser ? "Logout" : "Login"}
      </button>
      {showLogin && <LoginPage />}
    </div>
  )
}

export default NavBar
