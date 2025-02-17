import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionList({ onTransactionAdded, onEditTransaction }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Use the backend URL from environment variables
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions`);
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, [onTransactionAdded]);

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/transactions/${id}`);
      onTransactionAdded();
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };

  return (
    <div className="p-4">
      {transactions.map((tx) => (
        <div key={tx._id} className="flex justify-between items-center p-2 border-b">
          <span>{tx.description}</span>
          <span className="font-bold">${tx.amount}</span>
          <button
            onClick={() => onEditTransaction(tx)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTransaction(tx._id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
