import { Routes, Route } from "react-router-dom"

import "./App.css"
import Shop from "./routes/shop"
import LandingPage from "./routes/LandingPage"

function App() {
  return (
    <div className="font-roboto text-gray-700 bg-gray-300">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </div>
  )
}

export default App
