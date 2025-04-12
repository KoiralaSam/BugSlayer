import React, { createContext, useState } from "react";
import { UserContext } from "./UserContext";
export const ShowLogin = createContext({
  showLogin: null,
  setShowLogin: () => {},
});

export const ShowLoginProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  const value = { showLogin, setShowLogin };
  return (
    <ShowLogin.Provider value={{ showLogin, setShowLogin }}>
      {children}
    </ShowLogin.Provider>
  );
};
