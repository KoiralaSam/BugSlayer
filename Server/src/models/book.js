import mongoose from "mongoose";
import validator from "validator";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["sold", "listed"],
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
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export { Book };
