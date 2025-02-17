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

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
