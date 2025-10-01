import axios from 'axios';
import {requestConfig} from './requestConfig';
import {
  DELETE_TIPS_ERROR,
  DELETE_TIPS_SUCCESS,
  GET_TIP_ERROR,
  GET_TIP_SUCCESS,
  LOAD_TIPS_ERROR,
  LOAD_TIPS_SUCCESS,
  TIP_ACTION_REQUEST,
} from '../constants/tipsConstants';

export const createTip = data => {
  return async dispatch => {
    try {
      dispatch({type: TIP_ACTION_REQUEST});

      const res = await axios.post(
        `${process.env.BACKEND_URL}/api/tips`,
        data,
        await requestConfig(),
      );
      dispatch({
        type: GET_TIP_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(
        error.response && error.response.data
          ? error.response.data
          : error.message,
      );
      dispatch({type: GET_TIP_ERROR, payload: error});
    }
  };
};

export const deleteTips = () => {
  return async dispatch => {
    try {
      dispatch({type: TIP_ACTION_REQUEST});

      const res = await axios.delete(
        `${process.env.BACKEND_URL}/api/tips/`,
        await requestConfig(),
      );
      dispatch({
        type: DELETE_TIPS_SUCCESS,
      });
    } catch (error) {
      console.log(
        error.response && error.response.data
          ? error.response.data
          : error.message,
      );
      dispatch({type: DELETE_TIPS_ERROR, payload: error});
    }
  };
};

export const loadTips = () => {
  return async dispatch => {
    try {
      dispatch({type: TIP_ACTION_REQUEST});

      const res = await axios.get(
        `${process.env.BACKEND_URL}/api/tips`,
        await requestConfig(),
      );
      dispatch({
        type: LOAD_TIPS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(
        error.response && error.response.data
          ? error.response.data
          : error.message,
      );
      dispatch({type: LOAD_TIPS_ERROR, payload: error});
    }
  };
};
