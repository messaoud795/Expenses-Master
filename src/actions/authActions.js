import axios from 'axios';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../constants/authConstants';
import {removeToken} from '../reducers/userReducer';

export const registerUser =
  ({name, email, password, country}) =>
  async dispatch => {
    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/api/register`, {
        name,
        email,
        password,
        country,
      });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // Optionally: navigate or show toast
    } catch (error) {
      console.log({error});
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const loginUser =
  ({email, password}) =>
  async dispatch => {
    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/api/login`, {
        email,
        password,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      // Optionally: navigate or show toast
    } catch (error) {
      console.log({error});
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logoutUser = () => async dispatch => {
  try {
    await removeToken();
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
