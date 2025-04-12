import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("Token received in auth middleware:", token); // Debugging
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    console.log("Decoded token:", decoded); // Debugging
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Authentication failed");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message); // Debugging
    res.status(401).send({ error: "Please authenticate." });
  }
};

export { auth };
