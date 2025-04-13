import express from "express";
import multer from "multer";
import OpenAI from "openai";

const router = new express.Router();
import { Book } from "../models/book.js";
import { auth } from "../middleware/auth.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({
  limits: { fileSize: 3000000 },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return callback(new Error("File must be an image"));
    }
    callback(undefined, true);
  },
});

router.post(
  "/book",
  auth,
  upload.single("avatar"), // Handle avatar upload
  async (req, res) => {
    const { title, author, genre, userPrice, marketPrice } = req.body;
    const book = new Book({
      title,
      author,
      genre,
      userPrice,
      marketPrice,
      owner: req.user._id,
      avatar: req.file ? req.file.buffer : undefined, // Store the image buffer if provided
    });

    try {
      await book.save();
      res.status(201).send(book);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.patch("/book/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "status", "author", "synopsis"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operation" });
  }
  const _id = req.params.id;
  try {
    const book = await Book.findOne({ _id, owner: req.user._id });
    if (!book) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      book[update] = req.body[update];
    });
    await book.save();

    res.send(book);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    const booksWithImages = books.map((book) => {
      const bookObject = book.toObject();
      if (book.avatar) {
        bookObject.avatar = `data:image/png;base64,${book.avatar.toString(
          "base64"
        )}`;
      }
      return bookObject;
    });
    res.status(200).send(booksWithImages);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch books" });
  }
});

// Endpoint to fetch market price for a book
router.post("/books/market-price", async (req, res) => {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res
      .status(400)
      .send({ error: "Title, author, and genre are required." });
  }

  try {
    const prompt = `Respond with just a number. What is the market value of a generic copy of "${title}" by ${author} in the "${genre}" genre?`;
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
    });
    console.log(response.choices[0].message.content);
    const marketPriceMatch = response.choices[0]?.message?.content
      ?.trim()
      .match(/\d+(\.\d{1,2})?/);
    const marketPrice = marketPriceMatch ? parseFloat(marketPriceMatch[0]) : 0;

    if (marketPrice > 0) {
      return res.status(200).send({ marketPrice });
    } else {
      return res
        .status(404)
        .send({ error: "Unable to determine market price." });
    }
  } catch (error) {
    console.error("Error fetching market price from OpenAI:", error.message);
    res.status(500).send({ error: "Failed to fetch market price." });
  }
});

export default router;
