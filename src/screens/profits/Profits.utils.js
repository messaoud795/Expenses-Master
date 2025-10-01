import moment from 'moment';

export function getTop2ExpensesLast3Months(expenses) {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  // Group by name and sum amounts
  const grouped = expenses.reduce((acc, exp) => {
    acc[exp.name] = (acc[exp.name] || 0) + exp.amount;
    return acc;
  }, {});

  const groupedArray = Object.entries(grouped).map(([name, total]) => ({
    expenseName: name,
    expenseTotal: total,
    expenseStart: {
      month: threeMonthsAgo.getMonth() + 1,
      year: threeMonthsAgo.getFullYear(),
    },
    expenseEnd: {month: now.getMonth() + 1, year: now.getFullYear()},
  }));

  // Sort by total descending and take top 2
  return groupedArray.sort((a, b) => b.total - a.total).slice(0, 2);
}

export function getLastThreeMonths(selectedMonth) {
  const months = [];
  for (let i = 2; i >= 0; i--) {
    months.push(moment(selectedMonth).subtract(i, 'months').format('MMMM'));
  }
  return months.join(' - ');
}
