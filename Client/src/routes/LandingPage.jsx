import { Outlet } from "react-router"
import NavBar from "../components/NavBar"
function LandingPage() {
  return (
    <div className="">
      <NavBar />
      <Outlet />
    </div>
  )
}

export default LandingPage
