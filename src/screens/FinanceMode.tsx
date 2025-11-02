import { useState } from 'react';
import { Wallet, TrendingUp, PiggyBank, DollarSign, AlertCircle, Target } from 'lucide-react';

export default function FinanceMode() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [goal, setGoal] = useState('');
  const [advice, setAdvice] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [budgetData, setBudgetData] = useState<any[]>([]);

  const getAdvice = () => {
    setLoading(true);
    setTimeout(() => {
      const monthlyIncome = parseFloat(income);
      const monthlyExpenses = parseFloat(expenses);
      const savingsGoal = parseFloat(goal);
      const savings = monthlyIncome - monthlyExpenses;
      const savingsRate = (savings / monthlyIncome) * 100;

      const result = {
        summary: {
          income: monthlyIncome,
          expenses: monthlyExpenses,
          savings: savings,
          savingsRate: savingsRate.toFixed(1),
        },
        recommendations: [
          'Maintain an emergency fund covering 3-6 months of expenses',
          'Consider investing 20% of your income for long-term wealth building',
          'Review and reduce discretionary spending by 10%',
          'Set up automatic savings transfers each month',
        ],
        budgetBreakdown: [
          { category: 'Necessities', recommended: 50, current: 60 },
          { category: 'Wants', recommended: 30, current: 25 },
          { category: 'Savings', recommended: 20, current: 15 },
        ],
        goalAnalysis: {
          target: savingsGoal,
          monthly: savings,
          months: Math.ceil(savingsGoal / savings),
        },
      };

      setAdvice(result);
      setBudgetData([
        ...budgetData,
        { date: new Date().toLocaleDateString(), income: monthlyIncome, expenses: monthlyExpenses },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 via-pink-200 to-purple-200 animate-gradient bg-[length:400%_400%] p-6"
      style={{
        animation: 'gradientMove 10s ease infinite',
      }}
    >
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Wallet className="text-yellow-600" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Finance Mode</h2>
              <p className="text-gray-600">Personal finance advice and budget planning</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="text-yellow-600" size={20} />
                <span className="font-semibold text-gray-700">Budget Planning</span>
              </div>
              <p className="text-sm text-gray-600">Smart expense management</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <PiggyBank className="text-green-600" size={20} />
                <span className="font-semibold text-gray-700">Savings Goals</span>
              </div>
              <p className="text-sm text-gray-600">Track and achieve targets</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="text-blue-600" size={20} />
                <span className="font-semibold text-gray-700">Investment Tips</span>
              </div>
              <p className="text-sm text-gray-600">Grow your wealth</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="50000"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Expenses
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  placeholder="35000"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Savings Goal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="100000"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={getAdvice}
              disabled={!income || !expenses || !goal || loading}
              className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Analyzing Finances...' : 'Get Financial Advice'}
            </button>
          </div>
        </div>

        {advice && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Summary</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{advice.summary.income.toLocaleString()}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Monthly Expenses</p>
                  <p className="text-2xl font-bold text-red-600">
                    ₹{advice.summary.expenses.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{advice.summary.savings.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {advice.summary.savingsRate}% savings rate
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-l-4 ${
                  advice.summary.savingsRate >= 20
                    ? 'bg-green-50 border-green-500'
                    : 'bg-orange-50 border-orange-500'
                }`}
              >
                <p className="text-sm">
                  {advice.summary.savingsRate >= 20
                    ? '✓ Great job! You are saving more than 20% of your income.'
                    : '⚠ Try to increase your savings rate to at least 20% for a healthy financial future.'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <AlertCircle className="text-yellow-600" size={24} />
                <span>Personalized Recommendations</span>
              </h3>
              <ul className="space-y-3">
                {advice.recommendations.map((rec: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Budget Breakdown (50/30/20 Rule)
              </h3>
              <div className="space-y-4">
                {advice.budgetBreakdown.map((item: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{item.category}</span>
                      <span className="text-sm text-gray-600">
                        Current: {item.current}% | Recommended: {item.recommended}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          item.current <= item.recommended
                            ? 'bg-green-500'
                            : 'bg-orange-500'
                        }`}
                        style={{ width: `${item.current}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Target className="text-green-600" size={24} />
                <span>Savings Goal Analysis</span>
              </h3>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Your goal of</p>
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    ₹{advice.goalAnalysis.target.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    can be achieved in approximately
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {advice.goalAnalysis.months} months
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    by saving ₹{advice.goalAnalysis.monthly.toLocaleString()} per
                    month
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {budgetData.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Expense History
            </h3>
            <div className="space-y-2">
              {budgetData.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 rounded flex justify-between text-sm"
                >
                  <span className="text-gray-600">{entry.date}</span>
                  <span className="text-gray-800">
                    Income: ₹{entry.income.toLocaleString()} | Expenses: ₹
                    {entry.expenses.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
