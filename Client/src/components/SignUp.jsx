import React, { Fragment, useContext, useState } from "react"
import { UserContext } from "../Context/UserContext.jsx"
import { FaRegEyeSlash, FaEye } from "react-icons/fa"
import { ShowLogin } from "../Context/ShowLogin.jsx"
import axios from "axios"

const SignUp = () => {
  const { showLogin, setShowLogin } = useContext(ShowLogin)
  const [visible, setVisible] = useState(false)
  const { dispatchUser } = useContext(UserContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    }
    axios({
      url: "http://localhost:3000/user",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        console.log(res)
        dispatchUser({ type: "saveUser", payload: res.data })
        setShowLogin(!showLogin)
      })
      .catch((error) => {
        console.log(error.response?.data || error.message)
      })
  }

  const handleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <form
      className="max-w-max p-6 rounded-2xl bg-gray-200 text-sm m-3 z-10"
      onSubmit={handleSubmit}
    >
      <table className="w-full border-separate border-spacing-2">
        <tbody>
          <tr className="m-2">
            <td className="pr-4">
              <label htmlFor="name" className="font-medium">
                Name:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="border border-gray-300 rounded-xl h-10 p-2 w-full"
              />
            </td>
          </tr>
          <tr className="m-2">
            <td className="pr-4">
              <label htmlFor="email" className="font-medium">
                Email:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="email"
                id="email"
                required
                className="border border-gray-300 rounded-xl h-10 p-2 w-full"
              />
            </td>
          </tr>

          <tr className="m-3">
            <td className="pr-4">
              <label htmlFor="password" className="font-medium">
                Password:
              </label>
            </td>
            <td className="relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                id="password"
                required
                className="border border-gray-300 rounded-xl h-10 p-2 w-full pr-10"
              />
              {!visible ? (
                <FaEye
                  onClick={handleVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={handleVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <button
          type="submit"
          className=" text-white border-1 rounded-xl bg-[#00AFF5] w-[160px] m-2 py-2 hover:bg-[#30C5FF]"
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default SignUp
