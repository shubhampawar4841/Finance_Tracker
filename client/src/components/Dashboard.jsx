import { useState, useEffect } from "react";
import axios from "axios";
import { FaDollarSign, FaRegClock } from "react-icons/fa"; // Importing icons

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/transactions");
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  const totalExpenses = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const mostRecentTransactions = transactions.slice(0, 5); // Show last 5 transactions

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 p-8">
      
      {/* Total Expenses Card */}
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-4">
          <FaDollarSign className="text-3xl text-white" />
          <div>
            <h2 className="text-xl font-semibold">Total Expenses</h2>
            <p className="text-3xl font-bold">${totalExpenses}</p>
          </div>
        </div>
      </div>

      {/* Most Recent Transactions Card */}
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-4">
          <FaRegClock className="text-3xl text-white" />
          <div>
            <h2 className="text-xl font-semibold">Most Recent Transactions</h2>
            <ul className="space-y-2 mt-2">
              {mostRecentTransactions.map((tx) => (
                <li key={tx._id} className="flex justify-between">
                  <span>{tx.description}</span>
                  <span className="font-bold">${tx.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
