import {
  BUDGET_ACTION_REQUEST,
  CREATE_BUDGET_ERROR,
  CREATE_BUDGET_SUCCESS,
  GET_BUDGET_ERROR,
  GET_BUDGET_SUCCESS,
  UPDATE_BUDGET_ERROR,
  UPDATE_BUDGET_SUCCESS,
} from '../constants/budgetsConstants';

const initialBudgetValue = {
  _id: null,
  amount: null,
  loading: false,
  error: null,
};

export const budgetReducer = (state = initialBudgetValue, action) => {
  const {type, payload} = action;
  switch (type) {
    case BUDGET_ACTION_REQUEST:
      return {...initialBudgetValue, loading: true, error: null};
    case UPDATE_BUDGET_SUCCESS:
      return {...payload, loading: false, error: null};
    case CREATE_BUDGET_SUCCESS:
      return {...payload, loading: false, error: null};
    case GET_BUDGET_SUCCESS:
      return {...payload, loading: false, error: null};

    case UPDATE_BUDGET_ERROR:
      return {...initialBudgetValue, error: payload};
    case CREATE_BUDGET_ERROR:
      return {...initialBudgetValue, error: payload};
    case GET_BUDGET_ERROR:
      return {...initialBudgetValue, error: payload};

    default:
      return state;
  }
};
