import {
  EXPENSE_ACTION_ERROR,
  EXPENSE_ACTION_REQUEST,
  ADD_EXPENSE_SUCCESS,
  LOAD_EXPENSES_SUCCESS,
  UPDATE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_SUCCESS,
} from '../constants/expensesConstants';
import axios from 'axios';
import {requestConfig} from './requestConfig';

export const createExpense = newExpense => {
  return async dispatch => {
    try {
      dispatch({type: EXPENSE_ACTION_REQUEST});
      const res = await axios.post(
        `${process.env.BACKEND_URL}/api/expenses`,
        newExpense,
        await requestConfig(),
      );
      dispatch({type: ADD_EXPENSE_SUCCESS, payload: res.data});
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
      const res = await axios.put(
        `${process.env.BACKEND_URL}/api/expenses?id=${editedExpense.id}`,
        editedExpense,
        await requestConfig(),
      );
      dispatch({type: UPDATE_EXPENSE_SUCCESS, payload: res.data});
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
      const res = await axios.put(
        `${process.env.BACKEND_URL}/api/expenses?id=${expenseId}`,
        await requestConfig(),
      );
      dispatch({type: DELETE_EXPENSE_SUCCESS, payload: expenseId});
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
      const res = await axios.get(
        `${process.env.BACKEND_URL}/api/expenses`,
        await requestConfig(),
      );
      dispatch({type: LOAD_EXPENSES_SUCCESS, payload: res.data});
    } catch (error) {
      console.log({error});
      dispatch({type: EXPENSE_ACTION_ERROR, payload: error});
    }
  };
};
