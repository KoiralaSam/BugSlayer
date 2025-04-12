import { UserProvider } from "./Context/UserContext.jsx";
import { ShowLoginProvider } from "./Context/ShowLogin.jsx";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <ShowLoginProvider>
        <App />
      </ShowLoginProvider>
    </BrowserRouter>
  </UserProvider>
);
