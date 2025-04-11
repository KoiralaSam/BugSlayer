import { FaXmark } from "react-icons/fa6"

function SignUp({ setShowSignUp }) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.5)] flex justify-center items-center">
      <div className="w-[500px] h-[600px] bg-white rounded-2xl p-6">
        <div className="flex justify-end">
          <FaXmark
            size={20}
            className="cursor-pointer"
            onClick={() => setShowSignUp(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default SignUp
