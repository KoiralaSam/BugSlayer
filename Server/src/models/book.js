import mongoose from "mongoose"
import OpenAI from "openai"
import { User } from "./user.js"
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
)

bookSchema.pre("save", async function (next) {
  const book = this

  // Fetch and update the market price if not already set
  if (!book.marketPrice) {
    try {
      const prompt = `Respond with just a number. What is the market value of a generic copy of "${title}" by ${author} in the "${genre}" genre?`
      const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
      })

      const marketPriceMatch = response.choices[0]?.message?.content
        ?.trim()
        .match(/\d+(\.\d{1,2})?/)
      const marketPrice = marketPriceMatch ? parseFloat(marketPriceMatch[0]) : 0

      if (marketPrice > 0) {
        book.marketPrice = marketPrice // Update the market price
      }
    } catch (error) {
      console.error("Error fetching market price from OpenAI:", error.message)
    }
  }

  // Generate a synopsis if it doesn't already exist
  if (!book.synopsis) {
    try {
      const prompt = `Write a brief synopsis for the book titled "${book.title}" by ${book.author}, edition: ${book.edition}.`
      const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      })

      const generatedSynopsis = response.choices[0]?.message?.content?.trim()
      if (generatedSynopsis) {
        book.synopsis = generatedSynopsis
      }
    } catch (error) {
      console.error("Error generating synopsis from OpenAI:", error.message)
    }
  }

  next()
})

bookSchema.post("save", async function (doc, next) {
  try {
    const user = await User.findById(doc.owner)
    if (user) {
      await user.updateRecommendations() // Call the custom method
    }
  } catch (error) {
    console.error(
      "Error updating user recommendations after book save:",
      error.message
    )
  }
  next()
})

bookSchema.post("remove", async function (doc, next) {
  try {
    const user = await User.findById(doc.owner)
    if (user) {
      await user.updateRecommendations() // Call the custom method
    }
  } catch (error) {
    console.error(
      "Error updating user recommendations after book removal:",
      error.message
    )
  }
  next()
})

const Book = mongoose.model("Book", bookSchema)
export { Book }
