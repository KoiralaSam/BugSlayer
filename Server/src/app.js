import express from "express"
import "./database/mongoose.js"
import cors from "cors"

import UserRouter from "./routers/user.router.js"
import BookRouter from "./routers/book.router.js"

const app = express()
const port = process.env.PORT

const corsOption = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}

app.use(cors(corsOption))
app.use(express.json())
app.use(UserRouter)
app.use(BookRouter)
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
