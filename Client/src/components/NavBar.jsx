<<<<<<< HEAD
import React, { useState } from "react"
import { Link } from "react-router"

import SignUp from "./SignUp.jsx"

function NavBar() {
  const [showSignUp, setShowSignUp] = useState(false)
=======
import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { ShowLogin } from "../Context/ShowLogin.jsx";
import { Link } from "react-router";
import LoginPage from "./Login.jsx";

function NavBar() {
  const { currentUser, dispatchUser } = useContext(UserContext);
  const { showLogin, setShowLogin } = useContext(ShowLogin);

  const handleClick = () => {
    if (!currentUser) {
      // Show the login modal if no user is logged in
      setShowLogin(true);
    } else {
      // Log out the user if they are logged in
      dispatchUser({ type: "logoutUser" });
    }
  };

>>>>>>> master
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-baseline gap-16">
        <h1 className="text-3xl font-semibold">
          <Link to="/">
            Book<span className="text-red-500">Share</span>
          </Link>
        </h1>

        <nav className="flex gap-10">
<<<<<<< HEAD
          <a className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">Shop</Link>
          </a>
          <a className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">Sell</Link>
          </a>
          <a className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">About Us</Link>
          </a>
=======
          <p className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">Shop</Link>
          </p>
          <p className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">Sell</Link>
          </p>
          <p className="font-semibold cursor-pointer hover:underline underline-offset-6">
            <Link to="/shop">About Us</Link>
          </p>
>>>>>>> master
        </nav>
      </div>

      <button
<<<<<<< HEAD
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
=======
        onClick={handleClick}
        className="bg-red-500 font-semibold py-1 px-4 text-white rounded-2xl hover:shadow-2xl cursor-pointer"
      >
        {currentUser ? "Logout" : "Login"}
      </button>
      {showLogin && <LoginPage />}
    </div>
  );
}

export default NavBar;
>>>>>>> master
