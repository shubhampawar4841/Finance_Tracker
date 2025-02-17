import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { FaChartBar } from "react-icons/fa"; // Importing an icon for the title

export default function BudgetComparisonChart({ transactions, budgets }) {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Aggregate actual expenses by category
    const actualData = transactions.reduce((acc, tx) => {
      const category = tx.category;
      if (!acc[category]) acc[category] = 0;
      acc[category] += tx.amount;
      return acc;
    }, {});

    // Combine actual data with budget data
    const chartData = Object.keys(budgets).map((category) => ({
      category,
      budget: budgets[category] || 0,
      actual: actualData[category] || 0,
    }));

    setCategoryData(chartData);
  }, [transactions, budgets]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex items-center space-x-4">
        <FaChartBar className="text-3xl text-blue-600" />
        <h3 className="text-2xl font-semibold text-gray-800">Budget vs Actual Comparison</h3>
      </div>
      <div className="flex justify-center">
        <BarChart width={600} height={350} data={categoryData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#0088FE" />
          <Bar dataKey="actual" fill="#FF8042" />
        </BarChart>
      </div>
    </div>
  );
}
