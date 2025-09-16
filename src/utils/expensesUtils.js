import {clone, isArray} from 'lodash';
import {areMonthsAndYearIdentical} from './timeUtils';

export const getExpensesOfSelectedMonth = (expenses, date) => {
  if (!isArray(expenses)) return;
  return expenses?.filter(expense =>
    areMonthsAndYearIdentical(new Date(expense?.date), new Date(date)),
  );
};

export const getExpensesTotal = expenses => {
  return expenses?.reduce((total, expense) => {
    total += Number(expense.amount);
    return total;
  }, 0);
};

export const groupExpensesByCatgeory = expenses => {
  return expenses?.reduce((groupedExpenses, expense) => {
    groupedExpenses[expense.categoryId] = isArray(
      groupedExpenses[expense.categoryId],
    )
      ? [...groupedExpenses[expense.categoryId], expense]
      : [expense];
    return groupedExpenses;
  }, {});
};

//get the total of categorized expenses
export const calculateTotalOfCategorizedExpenses = groupedExpenses => {
  return Object.keys(groupedExpenses).reduce((acc, category) => {
    const total = getExpensesTotal(groupedExpenses[category]);
    acc.push(total);
    return acc;
  }, []);
};

//sort categorized expenses decreasingly
export const sortCategoriesTotals = (categoriesTotals, categories) => {
  let sortedCategoriesTotals = clone(categoriesTotals);
  sortedCategoriesTotals.sort((a, b) => b - a);
  let sortedCategories = clone(categories);
  sortedCategoriesTotals.forEach((categoryTotal, index) => {
    const categoryTotalIndex = categoriesTotals.indexOf(categoryTotal);
    sortedCategories[index] = categories[categoryTotalIndex];
  });
  return [sortedCategories, sortedCategoriesTotals];
};

export const filterExpensesOfSelectedCatgeory = (expense, category) => {
  return expense.filter(expense => expense.category === category);
};
