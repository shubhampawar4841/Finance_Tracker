const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

// ✅ Fetch All Transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Add a New Transaction
router.post("/", async (req, res) => {
  const { amount, description, date, category } = req.body;

  // Check if all required fields are provided
  if (!amount || !description || !date || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newTransaction = new Transaction({ amount, description, date, category });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ Edit an Existing Transaction
router.put("/:id", async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;
    if (!amount || !description || !date || !category) 
      return res.status(400).json({ error: "All fields are required" });

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, description, date, category },
      { new: true }
    );

    if (!updatedTransaction) 
      return res.status(404).json({ error: "Transaction not found" });

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete a Transaction
router.delete("/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!deletedTransaction)
      return res.status(404).json({ error: "Transaction not found" });

    res.json({ message: "Transaction Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
