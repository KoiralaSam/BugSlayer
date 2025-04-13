import express from "express";

import multer from "multer";

const router = new express.Router();
import { Book } from "../models/book.js";
import { auth } from "../middleware/auth.js";

const upload = multer({
  limits: { fileSize: 3000000 },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return callback(new Error("File must be an image"));
    }
    callback(undefined, true);
  },
});

router.post("/book", auth, async (req, res) => {
  const book = new Book({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await time.save();
    res.status(201).send(time);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post(
  "/users/book/avatar/:id",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const _id = req.params.id;
    const book = await Book.findOne({ _id, owner: req.user._id });
    if (!book) {
      return res.status(404).send();
    }
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    book.avatar = buffer;
    await book.save();
    res.status(200).send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.patch("/book/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "status", "author", "edition", "synopsis"];
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
      time[update] = req.body[update];
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
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch books" });
  }
});

export default router;
