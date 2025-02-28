import express from "express";
import cors from "cors";
import connectDB from "../server/db/connect.js";
import students from "../server/routes/students.js";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/students", students);


connectDB(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));


export default app;
