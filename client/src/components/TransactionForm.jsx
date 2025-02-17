import { useState, useEffect } from "react";
import axios from "axios";

export default function TransactionForm({ onTransactionAdded, transaction }) {
  // Set initial state for form fields
  const [amount, setAmount] = useState(transaction?.amount || "");
  const [description, setDescription] = useState(transaction?.description || "");
  const [date, setDate] = useState(transaction?.date || "");
  const [category, setCategory] = useState(transaction?.category || "Food");  // Default category set to "Food"

  // Reset form fields whenever the transaction changes
  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount || "");
      setDescription(transaction.description || "");
      setDate(transaction.date || "");
      setCategory(transaction.category || "Food"); // Make sure category is set if editing an existing transaction
    } else {
      setAmount("");
      setDescription("");
      setDate("");
      setCategory("Food");
    }
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!amount || !description || !date || !category) return;

    // Choose method based on whether we are updating or creating a transaction
    const method = transaction ? "PUT" : "POST";
    const url = transaction
      ? `http://localhost:5000/transactions/${transaction._id}`
      : "http://localhost:5000/transactions";

    try {
      await axios({
        method,
        url,
        data: { amount, description, date, category }, // Include category in request body
      });
      onTransactionAdded();  // Refresh the transaction list
      setAmount("");
      setDescription("");
      setDate("");
      setCategory("Food");  // Reset category to default
    } catch (error) {
      console.error("Error adding/updating transaction", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        className="border p-2 w-full mt-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        className="border p-2 w-full mt-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      {/* Category dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mt-2"
        required
      >
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 mt-2 w-full">
        {transaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
}
