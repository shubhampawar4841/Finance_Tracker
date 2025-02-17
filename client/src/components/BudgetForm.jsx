import { useState } from "react";

export default function BudgetForm({ onBudgetSet, budgets }) {
  const [categoryBudgets, setCategoryBudgets] = useState(budgets);

  const handleBudgetChange = (category, value) => {
    setCategoryBudgets({
      ...categoryBudgets,
      [category]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBudgetSet(categoryBudgets);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <h3 className="text-xl font-semibold">Set Monthly Budgets</h3>
      <div>
        {["Food", "Rent", "Entertainment", "Utilities", "Miscellaneous"].map(
          (category) => (
            <div key={category} className="flex items-center justify-between mt-2">
              <label className="mr-2">{category}</label>
              <input
                type="number"
                value={categoryBudgets[category] || 0}
                onChange={(e) => handleBudgetChange(category, e.target.value)}
                className="border p-2"
                min="0"
                required
              />
            </div>
          )
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4 w-full">
        Save Budgets
      </button>
    </form>
  );
}
