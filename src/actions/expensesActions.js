import {
  EXPENSE_ACTION_ERROR,
  EXPENSE_ACTION_REQUEST,
  ADD_EXPENSE_SUCCESS,
  LOAD_EXPENSES_SUCCESS,
  UPDATE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_SUCCESS,
} from '../constants/expensesConstants';
import store from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidJSON} from '../utils/stringUtils';

export const createExpense = newExpense => {
  return async dispatch => {
    try {
      dispatch({type: EXPENSE_ACTION_REQUEST});
      let {
        expenses: {expenses},
      } = store.getState();

      const updatedExpenses = [...expenses, newExpense];
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      dispatch({type: ADD_EXPENSE_SUCCESS, payload: newExpense});
    } catch (error) {
      console.log({error});
      dispatch({type: EXPENSE_ACTION_ERROR, payload: error});
    }
  };
};

export const editExpense = editedExpense => {
  return async dispatch => {
    try {
      dispatch({type: EXPENSE_ACTION_REQUEST});
      const {
        expenses: {expenses},
      } = store.getState();
      const updatedExpenses = expenses.map(expense => {
        if (expense?.id == editedExpense.id) {
          expense = editedExpense;
        }
        return expense;
      });
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      dispatch({type: UPDATE_EXPENSE_SUCCESS, payload: updatedExpenses});
    } catch (error) {
      console.log({error});
      dispatch({type: EXPENSE_ACTION_ERROR, payload: error});
    }
  };
};

export const deleteExpense = expenseId => {
  return async dispatch => {
    try {
      dispatch({type: EXPENSE_ACTION_REQUEST});
      const {
        expenses: {expenses},
      } = store.getState();
      const updatedExpenses = expenses?.filter(
        expense => expense?.id !== expenseId,
      );
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      dispatch({type: DELETE_EXPENSE_SUCCESS, payload: updatedExpenses});
    } catch (error) {
      console.log({error});
      dispatch({type: EXPENSE_ACTION_ERROR, payload: error});
    }
  };
};

export const loadExpenses = () => {
  return async dispatch => {
    try {
      dispatch({type: EXPENSE_ACTION_REQUEST});
      const savedExpenses = await AsyncStorage.getItem('expenses');
      const expenses = isValidJSON(savedExpenses)
        ? JSON.parse(savedExpenses)
        : [];
      dispatch({type: LOAD_EXPENSES_SUCCESS, payload: expenses});
    } catch (error) {
      console.log({error});
      dispatch({type: EXPENSE_ACTION_ERROR, payload: error});
    }
  };
};
