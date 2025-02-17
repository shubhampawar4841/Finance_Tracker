import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function CategoryPieChart({ onTransactionAdded }) {
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
