import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Importing React Router
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";
import BudgetForm from "./components/BudgetForm"; // Import Budget Form
import BudgetComparisonChart from "./components/BudgetComparisonChart"; // Import Budget vs Actual Chart
import SpendingInsights from "./components/SpendingInsights"; // Import Spending Insights
import ExpensesChart from "./components/ExpensesChart"; // Import Expenses Chart
import CategoryPieChart from "./components/Categorypiechart"; // Import Category Pie Chart

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [budgets, setBudgets] = useState({
    Food: 0,
    Rent: 0,
    Entertainment: 0,
    Utilities: 0,
    Miscellaneous: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL; // Use environment variable or fallback to localhost
        const res = await axios.get(`${apiUrl}/transactions`);
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleTransactionUpdated = () => {
    // This could be optimized by fetching the data only once
    setEditingTransaction(null); // Reset editing transaction
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleBudgetSet = (newBudgets) => {
    setBudgets(newBudgets);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white p-4">
          <div className="flex justify-between">
            <div className="text-xl font-bold">
              <Link to="/" className="hover:text-gray-300">💰 Finance Tracker</Link>
            </div>
            <div className="space-x-6">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/charts" className="hover:text-gray-300">Charts</Link>
              <Link to="/insights" className="hover:text-gray-300">Insights</Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-8">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={
              <div className="space-y-8">
                <h1 className="text-3xl font-bold text-center mb-8">💰 Personal Finance Tracker</h1>

                {/* Transaction Form */}
                <TransactionForm
                  onTransactionAdded={handleTransactionUpdated}
                  transaction={editingTransaction}
                />

                {/* Budget Form */}
                <BudgetForm onBudgetSet={handleBudgetSet} budgets={budgets} />
              </div>
            } />

            {/* Charts Route */}
            <Route path="/charts" element={
              <div className="space-y-8">
                <h1 className="text-3xl font-bold text-center mb-8">Charts</h1>

                {/* Expenses Chart */}
                <ExpensesChart onTransactionAdded={handleTransactionUpdated} />

                {/* Budget vs Actual Comparison */}
                <BudgetComparisonChart transactions={transactions} budgets={budgets} />

                {/* Category Breakdown (Pie Chart) */}
                <CategoryPieChart transactions={transactions} />

                <TransactionList onTransactionAdded={handleTransactionUpdated} onEditTransaction={handleEditTransaction} />

              </div>
            } />

            {/* Insights Route */}
            <Route path="/insights" element={
              <div className="space-y-8">
                <h1 className="text-3xl font-bold text-center mb-8">Insights</h1>

                {/* Spending Insights */}
                <SpendingInsights budgets={budgets} transactions={transactions} />

                {/* Dashboard (Showing Total Expenses, Recent Transactions) */}
                <Dashboard transactions={transactions} />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
