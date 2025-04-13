import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const UserContext = createContext({
  currentUser: null,
  dispatchUser: () => {},
});

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "saveUser":
      localStorage.setItem("token", payload.token); // Save only the token string
      return payload;

    case "logoutUser":
      localStorage.removeItem("token");
      logoutUser(payload);
      return null;

    default:
      return state;
  }
};

const fetchUserData = async (token) => {
  try {
    const res = await axios({
      url: "http://localhost:3000/user/me",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User data response:", res.data); // Debugging
    return res.data; // Includes recommended books
  } catch (error) {
    console.error(
      "Error in fetchUserData:",
      error.response?.data || error.message
    );
    return null;
  }
};

const logoutUser = async (token) => {
  try {
    const res = await axios({
      url: "http://localhost:3000/user/logout",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [currentUser, dispatchUser] = useReducer(reducer, null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Debugging
    if (token) {
      fetchUserData(token).then((userData) => {
        if (userData) {
          dispatchUser({ type: "saveUser", payload: { token, ...userData } });
        }
      });
    }
  }, []);

  const value = { currentUser, dispatchUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
