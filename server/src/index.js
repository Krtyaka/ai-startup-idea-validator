import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import ideaRoutes from "./routes/ideaRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-name.vercel.app", // add later
    ],
  })
);
app.use(express.json());

app.use("/ideas", ideaRoutes);

app.get("/", (req, res) => {
  res.send("AI Startup Idea Validator API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
