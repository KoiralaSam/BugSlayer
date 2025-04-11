import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Could not authenticate");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};

export { auth };
