const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// static uploads folder
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

app.get("/", (req, res) => {
  res.send("🚀 Education Blog API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});