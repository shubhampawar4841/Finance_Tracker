require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/Transactions");

const app = express();

// ✅ Connect to Database
connectDB();

// ✅ Middleware
app.use(cors()); // Handle CORS
app.use(express.json()); // Parse JSON requests

// ✅ Routes
app.use("/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running on Vercel!");
});

// ❌ Remove app.listen() because Vercel doesn't need it

module.exports = app; // ✅ Export the app for serverless deployment
