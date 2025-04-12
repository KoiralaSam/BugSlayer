import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useContext } from "react";
import { ShowLogin } from "../Context/ShowLogin.jsx";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
const LoginPage = () => {
  const { showLogin, setShowLogin } = useContext(ShowLogin);
  const [signup, setSignup] = useState(false);
  const handleSignup = () => {
    setSignup(!signup);
  };
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.5)] flex justify-center items-center">
      <div className="w-[500px] h-[650px] bg-gray-400 rounded-2xl p-6">
        <div className="flex justify-end">
          <FaXmark
            size={20}
            className="cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="relative flex items-center justify-center h-[90%] text-black overflow-hidden">
          <div
            className="w-full max-w-md flex transition-transform duration-500 ease-in-out transform"
            style={{ transform: `translateX(${signup ? "-100%" : "0%"})` }}
          >
            <div
              className={`w-full flex-shrink-0 transition-opacity duration-500 ${
                signup ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="m-4">
                <h2>Already have an Account?</h2>
                <span>Log in with your email and Password</span>
              </div>
              <SignIn />
              <button
                type="button"
                className="text-sm float-right mr-4 text-gray-600"
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
              <div className="m-4">
                <h2>Don't have an account?</h2>
                <span>Sign up with your email and Password</span>
              </div>
              <SignUp />
              <button
                type="button"
                className="text-sm float-right mr-4 text-gray-600"
                onClick={handleSignup}
              >
                Already have an Account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
