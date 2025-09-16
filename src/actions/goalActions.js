import axios from 'axios';
import {requestConfig} from './requestConfig';
import {
  CREATE_GOAL_ERROR,
  CREATE_GOAL_SUCCESS,
  GET_GOAL_ERROR,
  GET_GOAL_SUCCESS,
  GOAL_ACTION_REQUEST,
  UPDATE_GOAL_SUCCESS,
} from '../constants/goalsConstants';

// CREATE a goal
export const createGoal = (target, month, year) => {
  return async dispatch => {
    try {
      dispatch({type: GOAL_ACTION_REQUEST});

      const res = await axios.post(
        `${process.env.BACKEND_URL}/api/goals`,
        {target, month, year},
        await requestConfig(),
      );

      dispatch({type: CREATE_GOAL_SUCCESS, payload: res.data});
    } catch (error) {
      dispatch({
        type: CREATE_GOAL_ERROR,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };
};

// EDIT a goal
export const editGoal = (goalId, target) => {
  return async dispatch => {
    try {
      dispatch({type: GOAL_ACTION_REQUEST});

      const res = await axios.put(
        `${process.env.BACKEND_URL}/api/goals/${goalId}`,
        {target},
        await requestConfig(),
      );

      dispatch({type: UPDATE_GOAL_SUCCESS, payload: res.data});
    } catch (error) {
      dispatch({
        type: CREATE_GOAL_ERROR,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };
};

// GET a goal by month/year
export const getGoal = (month, year) => {
  return async dispatch => {
    try {
      dispatch({type: GOAL_ACTION_REQUEST});

      const res = await axios.get(
        `${process.env.BACKEND_URL}/api/goals?month=${month}&year=${year}`,
        await requestConfig(),
      );
      dispatch({
        type: GET_GOAL_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log({error});
      dispatch({
        type: GET_GOAL_ERROR,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };
};
