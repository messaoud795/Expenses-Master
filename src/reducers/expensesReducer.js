import {
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_SUCCESS,
  EXPENSE_ACTION_ERROR,
  EXPENSE_ACTION_REQUEST,
  LOAD_EXPENSES_SUCCESS,
  UPDATE_EXPENSE_SUCCESS,
} from '../constants/expensesConstants';

export const expensesReducer = (
  state = {
    expenses: [],
    loading: false,
    error: null,
  },
  action,
) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        expenses: payload,
      };

    case EXPENSE_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case EXPENSE_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        expenses: [...state.expenses, payload],
      };
    case UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        expenses: [...state.expenses, payload],
      };
    case DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        expenses: state.expenses.filter(expense => expense.id !== payload),
      };
    default:
      return state;
  }
};
