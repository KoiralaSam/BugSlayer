import { useState } from "react"
import { FaXmark } from "react-icons/fa6"
import { useContext } from "react"
import { ShowLogin } from "../Context/ShowLogin.jsx"
import SignUp from "./SignUp.jsx"
import SignIn from "./SignIn.jsx"
const LoginPage = () => {
  const { showLogin, setShowLogin } = useContext(ShowLogin)
  const [signup, setSignup] = useState(false)
  const handleSignup = () => {
    setSignup(!signup)
  }
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.5)] flex justify-center items-center z-10">
      <div className="w-[500px] h-fit bg-gray-200 rounded-2xl p-6">
        <div className="flex justify-end">
          <FaXmark
            size={20}
            className="cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="relative flex items-center justify-center mt-10 text-gray-700 overflow-hidden">
          <div
            className="w-full max-w-md flex transition-transform duration-500 ease-in-out transform"
            style={{ transform: `translateX(${signup ? "-100%" : "0%"})` }}
          >
            <div
              className={`w-full flex-shrink-0 transition-opacity duration-500 ${
                signup ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="ml-4 ">
                <h2 className="font-bold text-4xl ">LOGIN</h2>
                <div className="mt-4 text-lg">
                  Enter your email and Password
                </div>
              </div>
              <SignIn />
              <button
                type="button"
                className="text-md float-right mr-4 text-black cursor-pointer hover:text-red-500"
                onClick={handleSignup}
              >
                Don't have an Account?
              </button>
            </div>

            {/* SignUp Component */}
            <div
              className={`w-full flex-shrink-0 transition-opacity duration-500 ${
                signup ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="ml-4 ">
                <h2 className="font-bold text-4xl ">SIGNUP</h2>
                <div className="mt-4 text-lg">Create a new account</div>
              </div>
              <SignUp />
              <button
                type="button"
                className="text-md float-right mr-4 text-black cursor-pointer hover:text-red-500"
                onClick={handleSignup}
              >
                Already have an Account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
