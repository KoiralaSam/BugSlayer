import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import { Book } from "./book.js"
import jwt from "jsonwebtoken"
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
        throw new Error("Email must be right format")
      }
    },
  },

  password: {
    type: String,
    required: true,
    minLength: 5,
    validate(value) {
      if (value.toLowerCase() === "password") {
        throw new Error("Password cannot be password")
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
})

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
)

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SIGN_KEY)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error("User not found")
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("Invalid credentials")
  }
  return user
}

userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model("User", userSchema)
export { User }
