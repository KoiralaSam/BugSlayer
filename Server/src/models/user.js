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

  cart: [
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

userSchema.methods.updateRecommendations = async function () {
  const user = this;

  try {
    // Fetch all books the user has interacted with
    await user.populate("books");

    // Fetch a subset of books for OpenAI to choose from
    const allBooks = await Book.find({
      owner: { $ne: user._id }, // Exclude books owned by the current user
      status: "listed", // Example: Only include books with a specific status
    }).limit(50); // Limit the number of books to avoid overwhelming OpenAI

    // Format the books for the OpenAI prompt
    const bookList = allBooks
      .map(
        (book) =>
          `- "${book.title}" by ${book.author} (${book.genre.join(", ")})`
      )
      .join("\n");

    // Format the user's books for the OpenAI prompt
    const userBooks = user.books
      .map(
        (book) =>
          `- "${book.title}" by ${book.author} (${book.genre.join(", ")})`
      )
      .join("\n");

    // Create the OpenAI prompt
    const prompt = `
      Based on the following list of books a user named "${user.name}" has already read:
      ${userBooks}

      Choose 3 books from the following list that the user has **not read**, but that align with their preferences:
      ${bookList}

      Respond only with a JSON array of objects, where each object has:
      - "title": (string)
      - "author": (string)
    `;

    console.log("Generated Prompt:", prompt);

    // Send the prompt to OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    console.log("Raw OpenAI Response:", response.choices[0]?.message?.content);

    // Sanitize the response
    let rawResponse = response.choices[0]?.message?.content?.trim();

    // Replace single quotes with double quotes (if necessary)
    rawResponse = rawResponse.replace(/'/g, '"');

    // Escape unescaped double quotes inside strings
    rawResponse = rawResponse.replace(/(\w)"(\w)/g, '$1\\"$2');

    // Remove trailing commas (if any)
    rawResponse = rawResponse.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

    // Remove any non-printable or special characters
    rawResponse = rawResponse.replace(/[^\x20-\x7E]/g, "");

    // Log the sanitized response
    console.log("Sanitized OpenAI Response:", rawResponse);

    // Validate the response format
    if (!rawResponse.startsWith("[") || !rawResponse.endsWith("]")) {
      throw new Error("Invalid JSON format in OpenAI response");
    }

    // Parse the response
    const recommendations = JSON.parse(rawResponse);

    // Compare recommendations with books in the database
    const recommendedBooks = new Set();
    for (const rec of recommendations) {
      const book = allBooks.find(
        (b) =>
          b.title.toLowerCase() === rec.title.toLowerCase() &&
          b.author.toLowerCase() === rec.author.toLowerCase()
      );

      if (book) {
        recommendedBooks.add(book._id.toString()); // Add unique ObjectId
      }
    }

    // Update the user's recommended array with book IDs
    user.recommended = Array.from(recommendedBooks); // Convert Set to Array
    await user.save();
  } catch (error) {
    console.error(
      "Error generating recommendations with OpenAI:",
      error.message
    );
    // You can choose to proceed without recommendations if there's an error
  }
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export { User };
