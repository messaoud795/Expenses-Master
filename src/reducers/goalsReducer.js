import {
  CREATE_GOAL_ERROR,
  CREATE_GOAL_SUCCESS,
  GET_GOAL_ERROR,
  GET_GOAL_SUCCESS,
  GOAL_ACTION_REQUEST,
  UPDATE_GOAL_ERROR,
  UPDATE_GOAL_SUCCESS,
} from '../constants/goalsConstants';

const initialGoalValue = {_id: null, target: null, loading: false, error: null};

export const goalReducer = (state = initialGoalValue, action) => {
  const {type, payload} = action;
  switch (type) {
    case GOAL_ACTION_REQUEST:
      return {...initialGoalValue, loading: true, error: null};
    case UPDATE_GOAL_SUCCESS:
      return {...payload, loading: false, error: null};
    case CREATE_GOAL_SUCCESS:
      return {...payload, loading: false, error: null};
    case GET_GOAL_SUCCESS:
      return {...payload, loading: false, error: null};

    case UPDATE_GOAL_ERROR:
      return {...initialGoalValue, error: payload};
    case CREATE_GOAL_ERROR:
      return {...initialGoalValue, error: payload};
    case GET_GOAL_ERROR:
      return {...initialGoalValue, error: payload};

    default:
      return state;
  }
};
