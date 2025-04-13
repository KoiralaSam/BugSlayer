import express from "express";
import { User } from "../models/user.js";
import sharp from "sharp";
import multer from "multer";
import { auth } from "../middleware/auth.js";
const router = new express.Router();

const upload = multer({
  limits: { fileSize: 3000000 },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return callback(new Error("File must be an image"));
    }
    callback(undefined, true);
  },
});

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/user/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("recommended")
      .populate("cart");

    // Convert avatar buffer to Base64 for each recommended book
    const recommendedBooks = user.recommended.map((book) => {
      if (book.avatar) {
        const bookObject = book.toObject(); // Convert Mongoose document to plain object
        bookObject.avatar = `data:image/png;base64,${book.avatar.toString(
          "base64"
        )}`;
        return bookObject;
      }
      return book; // Return the book as is if no avatar exists
    });

    // Attach the modified recommended books back to the user object
    const userWithRecommendations = user.toObject();
    userWithRecommendations.recommended = recommendedBooks;

    res.status(200).send(userWithRecommendations);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).send({ error: "Failed to fetch user data" });
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "credit"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operation" });
  }
  try {
    const user = await req.user;
    updates.forEach(async (update) => {
      if (update === "avatar") {
        const buffer = await sharp(req.file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();
        req.user.avatar = buffer;
      }
      req.user[update] = req.body[update];
    });
    await req.user.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//upload avatar
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 }) // Resize to 250x250 pixels
        .jpeg({ quality: 50 }) // Convert to JPEG with 50% quality
        .toBuffer();

      req.user.avatar = buffer; // Save the compressed image to the user's avatar field
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send({ error: "Failed to upload avatar" });
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.post("/user/cart", auth, async (req, res) => {
  const { bookId } = req.body;

  try {
    const user = await User.findById(req.user._id);

    // Check if the book is already in the cart
    if (user.cart.includes(bookId)) {
      return res.status(400).send({ error: "Book is already in the cart" });
    }

    // Add the book to the cart
    user.cart.push(bookId);
    await user.save();

    res.status(200).send({ message: "Book added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).send({ error: "Failed to add book to cart" });
  }
});

router.delete("/user/cart/:bookId", auth, async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user._id);

    // Remove the book from the cart
    user.cart = user.cart.filter((id) => id.toString() !== bookId);
    await user.save();

    res
      .status(200)
      .send({ message: "Book removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).send({ error: "Failed to remove book from cart" });
  }
});

export default router;
