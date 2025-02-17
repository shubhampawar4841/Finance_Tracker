import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function CategoryPieChart({ onTransactionAdded }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Fetches transactions from the backend server.
 * Makes an HTTP GET request to the specified URL to retrieve transaction data.
 * On success, updates the transactions state with the received data.
 * Logs an error message to the console if the request fails.
 */

/******  af176afe-9178-42d0-8369-badb3adb26c8  *******/    const fetchTransactions = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Fallback to localhost for local dev
        const res = await axios.get(`${apiUrl}/transactions`);
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, [onTransactionAdded]);

  // Group the transactions by category
  const categoryData = transactions.reduce((acc, tx) => {
    const category = tx.category;
    if (!acc[category]) acc[category] = 0;
    acc[category] += tx.amount;
    return acc;
  }, {});

  // Convert category data to the format needed for the Pie chart
  const chartData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  // Define colors for each category slice
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6347"];

  // Handle case when there's no data
  if (chartData.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          No Transaction Data Available
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Category-wise Expense Breakdown
      </h2>

      <div className="flex justify-center items-center">
        <PieChart width={500} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="transition-all duration-300 hover:scale-110"
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}
