import {
  CREATE_GOAL_ERROR,
  CREATE_GOAL_SUCCESS,
  GET_GOAL_ERROR,
  GET_GOAL_SUCCESS,
  GOAL_ACTION_REQUEST,
  UPDATE_GOAL_ERROR,
  UPDATE_GOAL_SUCCESS,
} from '../constants/goalsConstants';

export const goalReducer = (
  state = {target: null, loading: false, error: null},
  action,
) => {
  const {type, payload} = action;
  switch (type) {
    case GOAL_ACTION_REQUEST:
      return {target: null, loading: true, error: null};
    case UPDATE_GOAL_SUCCESS:
      return {target: payload, loading: false, error: null};
    case CREATE_GOAL_SUCCESS:
      return {target: payload, loading: false, error: null};
    case GET_GOAL_SUCCESS:
      return {target: payload.target, loading: false, error: null};

    case UPDATE_GOAL_ERROR:
      return {target: null, loading: false, error: payload};
    case CREATE_GOAL_ERROR:
      return {target: null, loading: false, error: payload};
    case GET_GOAL_ERROR:
      return {target: null, loading: false, error: payload};

    default:
      return state;
  }
};
