Personal Finance Visualizer
A simple web application to track and visualize personal finances. This app allows users to add, edit, and delete transactions, categorize them, and visualize their spending habits through charts and dashboards.

Features
Stage 1: Basic Transaction Tracking
Add, edit, and delete transactions (with amount, date, and description).
View a list of transactions.
Display a monthly expenses bar chart.
Basic form validation for transactions.
Stage 2: Categories
All Stage 1 features, plus:
Predefined categories for transactions (e.g., Food, Entertainment, Utilities).
Category-wise pie chart for spending breakdown.
Dashboard with summary cards showing:
Total expenses
Category breakdown
Most recent transactions.
Stage 3: Budgeting
All Stage 2 features, plus:
Set monthly category budgets.
Compare budget vs actual spending with a chart.
Simple spending insights to help users track their financial goals.
Tech Stack
Frontend:
Next.js
React
Shadcn UI
Recharts
Backend:
MongoDB (for storing transactions and categories)
Styling:
TailwindCSS (for responsive design)
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/personal-finance-visualizer.git
Install dependencies:

bash
Copy
Edit
cd personal-finance-visualizer
npm install
Set up environment variables: Create a .env.local file in the root directory and add the following:

env
Copy
Edit
MONGODB_URI=your-mongodb-connection-string
NEXT_PUBLIC_API_URL=http://localhost:3000/api
Run the development server:

bash
Copy
Edit
npm run dev
Visit http://localhost:3000 to view the app.

Usage
Adding Transactions
Go to the "Add Transaction" page.
Fill in the transaction details such as amount, date, and description.
Choose a predefined category.
Submit the form to add the transaction.
Viewing Transactions
All transactions will be displayed in a list.
You can edit or delete any transaction by clicking the respective action buttons next to each entry.
Viewing Charts
The "Dashboard" page will display the monthly expenses bar chart and the category breakdown pie chart.
Budgeting
In Stage 3, users will be able to set budgets for different categories and compare their spending to their budget.
Live Deployment
You can try out the live version of the app here: Live Demo

Evaluation Criteria
Feature Implementation: 40%
Code Quality: 30%
UI/UX Design: 30%
Contributing
Feel free to fork this project and submit pull requests if you find any issues or improvements. Please ensure your changes align with the overall structure and style of the app.

License
This project is open-source and available under the MIT License.

Acknowledgments
Next.js
React
Shadcn UI
Recharts
TailwindCSS
