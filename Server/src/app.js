import express from "express";
import "./database/mongoose.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

const corsOption = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use(cors(corsOption));
app.use(express.json);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
