import React from "react";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa"; // Icons for Over/Under Budget

export default function SpendingInsights({ budgets, transactions }) {
  const insights = Object.keys(budgets).map((category) => {
    const actualSpent = transactions.reduce((acc, tx) => {
      return tx.category === category ? acc + tx.amount : acc;
    }, 0);

    const budget = budgets[category];
    const difference = actualSpent - budget;

    return {
      category,
      actualSpent,
      budget,
      difference,
      status: difference > 0 ? "Over budget" : "Under budget",
    };
  });

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg space-y-6">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Spending Insights
      </h3>

      {insights.map(({ category, actualSpent, budget, difference, status }) => (
        <div
          key={category}
          className={`p-6 border-b ${status === "Over budget" ? "bg-red-100" : "bg-green-100"}`}
        >
          <div className="flex items-center space-x-4">
            {/* Icon for Status */}
            {status === "Over budget" ? (
              <FaExclamationCircle className="text-red-600 text-3xl" />
            ) : (
              <FaCheckCircle className="text-green-600 text-3xl" />
            )}
            <h4 className="text-xl font-semibold text-gray-800">{category}</h4>
          </div>
          <div className="space-y-2 mt-4">
            <p className="text-lg">
              <span className="font-semibold">Budget:</span> ${budget}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Spent:</span> ${actualSpent}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Status:</span> {status}
            </p>
            <p className="text-lg">
              {status === "Over budget"
                ? `Exceeded by $${difference}`
                : `Saved $${Math.abs(difference)}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
