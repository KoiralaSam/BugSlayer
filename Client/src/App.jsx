import { Routes, Route } from "react-router-dom"

import "./App.css"

import LandingPage from "./routes/LandingPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App
