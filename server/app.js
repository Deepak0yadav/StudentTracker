import express from "express";
import cors from "cors";
import connectDB from "../server/db/connect.js";
import students from "../server/routes/students.js";
import "dotenv/config"; 

const port = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    credentials: true, 
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/students", students);

// Start the server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

startServer();
