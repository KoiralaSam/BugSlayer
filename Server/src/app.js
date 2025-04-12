import express from "express";
import "./database/mongoose.js";
import cors from "cors";
<<<<<<< HEAD
=======
import UserRouter from "./routers/user.router.js";
import BookRouter from "./routers/book.router.js";
>>>>>>> master

const app = express();
const port = process.env.PORT;

const corsOption = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use(cors(corsOption));
<<<<<<< HEAD
app.use(express.json);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
=======
app.use(express.json());
app.use(UserRouter);
app.use(BookRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
>>>>>>> master
});
