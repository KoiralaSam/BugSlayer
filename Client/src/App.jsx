import { Routes, Route } from "react-router-dom"

import "./App.css"
import Shop from "./routes/shop"
import LandingPage from "./routes/LandingPage"
import Sell from "./routes/Sell"
import MyCart from "./routes/MyCart"

function App() {
  return (
    <div className="font-roboto text-gray-700 bg-gray-200">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/mycart" element={<MyCart />} />
      </Routes>
    </div>
  )
}

export default App
