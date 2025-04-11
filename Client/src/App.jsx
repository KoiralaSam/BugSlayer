import { Routes, Route } from "react-router-dom";

import "./App.css";
import Shop from "./routes/shop";
import LandingPage from "./routes/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  );
}

export default App;
