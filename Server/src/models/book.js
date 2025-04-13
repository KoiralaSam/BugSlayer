import mongoose from "mongoose";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    genre: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["sold", "listed", "bought"],
      default: "listed",
    },
    author: {
      type: String,
      trim: true,
    },
    edition: {
      type: String,
    },
    avatar: {
      type: Buffer,
    },
    synopsis: {
      type: String,
      trim: true,
    },
    userPrice: {
      type: Number,
      default: 0,
    },
    marketPrice: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.pre("save", async function (next) {
  const book = this;

  // Fetch and update the market price
  try {
    const prompt = `What is the current market price for the book titled "${book.title}" by ${book.author}, edition: ${book.edition}? Provide the price in USD.`;
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
    });

    const marketPriceMatch = response.choices[0]?.message?.content
      ?.trim()
      .match(/\d+(\.\d{1,2})?/);
    const marketPrice = marketPriceMatch ? parseFloat(marketPriceMatch[0]) : 0;

    if (marketPrice > 0) {
      book.marketPrice = marketPrice; // Update the market price
    }
  } catch (error) {
    console.error("Error fetching market price from OpenAI:", error.message);
  }

  // Validate the user's price if it is modified
  if (book.isModified("userPrice")) {
    try {
      const prompt = `The user is listing a book titled "${book.title}" by ${book.author}, edition: ${book.edition}, with a price of $${book.userPrice}. Based on the current market value of $${book.marketPrice}, is this price reasonable? Respond with "Yes" or "No" and provide a brief explanation.`;
      const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      });

      const validationResponse = response.choices[0]?.message?.content?.trim();
      if (validationResponse?.toLowerCase().includes("no")) {
        throw new Error(
          `The price of $${book.userPrice} for the book "${book.title}" is not reasonable based on the market value of $${book.marketPrice}.`
        );
      }
    } catch (error) {
      console.error("Error validating user price with OpenAI:", error.message);
      return next(error);
    }
  }

  // Generate a synopsis if it doesn't already exist
  if (!book.synopsis) {
    try {
      const prompt = `Write a brief synopsis for the book titled "${book.title}" by ${book.author}, edition: ${book.edition}.`;
      const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      });

      const generatedSynopsis = response.choices[0]?.message?.content?.trim();
      if (generatedSynopsis) {
        book.synopsis = generatedSynopsis;
      }
    } catch (error) {
      console.error("Error generating synopsis from OpenAI:", error.message);
    }
  }

  next();
});

const Book = mongoose.model("Book", bookSchema);
export { Book };
