import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { FaMoneyBillWaveAlt } from "react-icons/fa"; // Adding an icon for visual appeal

export default function ExpensesChart({ onTransactionAdded }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transactions`);
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, [onTransactionAdded]);

  // Aggregate data by month
  const data = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short" });
    const existing = acc.find((d) => d.month === month);
    if (existing) {
      existing.amount += tx.amount;
    } else {
      acc.push({ month, amount: tx.amount });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex items-center space-x-4">
        <FaMoneyBillWaveAlt className="text-3xl text-green-600" />
        <h3 className="text-2xl font-semibold text-gray-800">Monthly Expenses</h3>
      </div>

      <div className="flex justify-center">
        <BarChart width={600} height={350} data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#0088FE" barSize={30} />
        </BarChart>
      </div>
    </div>
  );
}
