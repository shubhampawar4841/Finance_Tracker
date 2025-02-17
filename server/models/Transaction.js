const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ["Food", "Rent", "Entertainment", "Utilities", "Miscellaneous"],
    required: true,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
