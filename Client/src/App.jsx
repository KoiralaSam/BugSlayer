import { Routes, Route } from "react-router-dom"

import "./App.css"

import LandingPage from "./routes/LandingPage"

function App() {
  return (
    <div className="font-roboto text-gray-700 w-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  )
}

export default App
