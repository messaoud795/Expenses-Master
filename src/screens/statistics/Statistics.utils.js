export function getTopExpenseLast3Months(expenses) {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  // Filter expenses within the last 3 months
  const recentExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate >= threeMonthsAgo && expDate <= now;
  });

  if (recentExpenses.length === 0) return null;

  // Find top expense by amount
  return recentExpenses.reduce((max, exp) =>
    exp.amount > max.amount ? exp : max,
  );
}
