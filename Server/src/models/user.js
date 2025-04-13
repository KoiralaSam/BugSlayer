import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Book } from "./book.js";
import jwt from "jsonwebtoken";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  credit: {
    type: Number,
    default: 0,
  },

  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email must be right format");
      }
    },
  },

  recommended: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Book model
      ref: "Book",
    },
  ],

  password: {
    type: String,
    required: true,
    minLength: 5,
    validate(value) {
      if (value.toLowerCase() === "password") {
        throw new Error("Password cannot be password");
      }
    },
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  avatar: {
    type: Buffer,
  },
});

userSchema.virtual(
  "books",
  {
    ref: "Book",
    localField: "_id",
    foreignField: "owner",
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SIGN_KEY,
    {
      expiresIn: "7d",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("save", async function (next) {
  const user = this;

  // Check if the user data has been modified
  if (user.isModified()) {
    try {
      // Fetch all books from the database
      const allBooks = await Book.find();

      // Format the book data for the OpenAI prompt
      const bookList = allBooks
        .map(
          (book) => `${book.title} by ${book.author} (${book.genre.join(", ")})`
        )
        .join("\n");

      // Create a prompt for OpenAI
      const prompt = `
        Based on the following list of books:
        ${bookList}

        Recommend 5 books for a user named "${user.name}" who has interacted with books in the past. For each recommendation, provide the following details in JSON format:
        - Title
        - Author
      `;

      // Send the prompt to OpenAI
      const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      });

      // Parse the response from OpenAI
      const recommendations = JSON.parse(response.choices[0]?.message?.content);

      // Find the recommended books in the database
      const recommendedBooks = [];
      for (const rec of recommendations) {
        const book = allBooks.find(
          (b) =>
            b.title.toLowerCase() === rec.title.toLowerCase() &&
            b.author.toLowerCase() === rec.author.toLowerCase()
        );

        if (book) {
          recommendedBooks.push(book._id); // Add the book's ObjectId to the recommended array
        }
      }

      // Update the user's recommended array
      user.recommended = recommendedBooks;
    } catch (error) {
      console.error(
        "Error generating recommendations with OpenAI:",
        error.message
      );
      // You can choose to proceed without recommendations if there's an error
    }
  }

  next();
});

const User = mongoose.model("User", userSchema);
export { User };
