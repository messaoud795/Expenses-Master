import axios from 'axios';
import {requestConfig} from './requestConfig';
import {
  BUDGET_ACTION_REQUEST,
  CREATE_BUDGET_ERROR,
  CREATE_BUDGET_SUCCESS,
  GET_BUDGET_ERROR,
  GET_BUDGET_SUCCESS,
  UPDATE_BUDGET_ERROR,
  UPDATE_BUDGET_SUCCESS,
} from '../constants/budgetsConstants';

// CREATE a goal
export const createBudget = (amount, month, year) => {
  return async dispatch => {
    try {
      dispatch({type: BUDGET_ACTION_REQUEST});

      const res = await axios.post(
        `${process.env.BACKEND_URL}/api/budgets`,
        {amount, month, year},
        await requestConfig(),
      );

      dispatch({type: CREATE_BUDGET_SUCCESS, payload: res.data});
    } catch (error) {
      dispatch({
        type: CREATE_BUDGET_ERROR,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };
};

export const editBudget = (budgetId, target) => {
  return async dispatch => {
    try {
      dispatch({type: BUDGET_ACTION_REQUEST});

      const res = await axios.put(
        `${process.env.BACKEND_URL}/api/budgets/${budgetId}`,
        {target},
        await requestConfig(),
      );

      dispatch({type: UPDATE_BUDGET_SUCCESS, payload: res.data});
    } catch (error) {
      dispatch({
        type: UPDATE_BUDGET_ERROR,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };
};

export const getBudget = (month, year) => {
  return async dispatch => {
    try {
      dispatch({type: BUDGET_ACTION_REQUEST});

      const res = await axios.get(
        `${process.env.BACKEND_URL}/api/budgets?month=${month}&year=${year}`,
        await requestConfig(),
      );
      dispatch({
        type: GET_BUDGET_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log({error});
      dispatch({
        type: GET_BUDGET_ERROR,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };
};
