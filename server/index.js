require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactions");

const app = express();

// ✅ CORS Middleware to Allow All Origins
const corsOptions = {
  origin: '*',  // Allow requests from any origin
  methods: 'GET,POST,PUT,DELETE',  // Allow the specified HTTP methods
  allowedHeaders: 'Content-Type, Authorization',  // Allow specific headers
};

app.use(cors(corsOptions));  // Apply the CORS options globally

// ✅ Middleware
app.use(express.json());  // Parse JSON requests

// ✅ Connect to Database
connectDB();

// ✅ Routes
app.use("/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server running");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
