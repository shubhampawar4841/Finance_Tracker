import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionList({ onTransactionAdded, onEditTransaction }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log("Fetching transactions...");  // Log request
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions`);
        console.log("Fetched transactions:", res.data);  // Log the response
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
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Transaction List</h2>

      {/* List of Transactions */}
      {transactions.length > 0 ? (
        transactions.map((tx) => (
          <div key={tx._id} className="flex justify-between items-center p-4 mb-4 border rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">{tx.description}</span>
              <span className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold text-gray-800">${tx.amount}</span>
              <button
                onClick={() => onEditTransaction(tx)}
                className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTransaction(tx._id)}
                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No transactions available.</div>
      )}
    </div>
  );
}
