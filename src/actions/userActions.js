import {
  CHANGE_MONTH_SUCCESS,
  LOAD_USERDATA_SUCCESS,
  SET_BUDGET_SUCCESS,
  SET_CURRENCY_SUCCESS,
  SET_GOAL_SUCCESS,
  SET_LANGUAGE_SUCCESS,
  SET_USERNAME_SUCCESS,
  USER_ACTION_ERROR,
  USER_ACTION_REQUEST,
} from '../constants/userConstants';
import store from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {areMonthsAndYearIdentical} from '../utils/timeUtils';
import {loadCategories} from './categoriesActions';
import {requestConfig} from './requestConfig';
import axios from 'axios';

//use of local storage to save et retrive data with the help
//of '@react-native-async-storage/async-storage' package

const getBalanceDataIndex = (balance, selectedMonth) => {
  return balance.findIndex(monthBalance =>
    areMonthsAndYearIdentical(
      new Date(monthBalance?.date),
      new Date(selectedMonth),
    ),
  );
};

export const setUserName = newName => {
  return async dispatch => {
    try {
      const {user} = store?.getState();
      dispatch({type: USER_ACTION_REQUEST});
      const addedData = {...user, name: newName};
      await AsyncStorage.setItem('user', JSON.stringify(addedData));
      dispatch({type: SET_USERNAME_SUCCESS, payload: newName});
    } catch (error) {
      dispatch({type: USER_ACTION_ERROR, payload: error});
    }
  };
};

export const addCurrency = newCurrency => {
  return async dispatch => {
    try {
      dispatch({type: USER_ACTION_REQUEST});
      const {user} = store?.getState();
      const addedData = {...user, currency: newCurrency};
      await AsyncStorage.setItem('user', JSON.stringify(addedData));
      dispatch({type: SET_CURRENCY_SUCCESS, payload: newCurrency});
    } catch (error) {
      dispatch({type: USER_ACTION_ERROR, payload: error});
    }
  };
};

export const getUserSavedData = () => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `${process.env.BACKEND_URL}/api/me`,
        requestConfig(),
      );
      dispatch({
        type: LOAD_USERDATA_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: LOAD_USERDATA_SUCCESS,
        payload: error,
      });
    }
  };
};

export const changeSelectedMonth = newDate => {
  return async dispatch => {
    try {
      dispatch({type: USER_ACTION_REQUEST});
      const {user} = store?.getState();
      const addedData = {...user, selectedMonth: newDate};
      await AsyncStorage.setItem('user', JSON.stringify(addedData));
      dispatch({type: CHANGE_MONTH_SUCCESS, payload: newDate});
    } catch (error) {
      dispatch({type: USER_ACTION_ERROR, payload: error});
    }
  };
};

export const setBudget = budget => {
  return async dispatch => {
    try {
      dispatch({type: USER_ACTION_REQUEST});
      const {user} = store?.getState();
      const {balance, selectedMonth} = user;
      const monthDataIndex = getBalanceDataIndex(balance, selectedMonth);

      if (monthDataIndex > -1) {
        user.balance[monthDataIndex].budget = budget;
      } else {
        user.balance.push({date: new Date(selectedMonth), budget});
      }
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({type: SET_BUDGET_SUCCESS, payload: user});
    } catch (error) {
      console.log({error});
      dispatch({type: USER_ACTION_ERROR, payload: error});
    }
  };
};

export const setGoal = goal => {
  return async dispatch => {
    try {
      dispatch({type: USER_ACTION_REQUEST});
      const {user} = store?.getState();
      const {balance, selectedMonth} = user;
      const monthDataIndex = getBalanceDataIndex(balance, selectedMonth);

      if (monthDataIndex > -1) {
        user.balance[monthDataIndex].goal = goal;
      } else {
        user.balance.push({date: new Date(selectedMonth), goal});
      }
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({type: SET_GOAL_SUCCESS, payload: user});
    } catch (error) {
      console.log({error});
      dispatch({type: USER_ACTION_ERROR, payload: error});
    }
  };
};

export const setLanguage = newLanguage => {
  return async dispatch => {
    try {
      const {user} = store?.getState();
      dispatch({type: USER_ACTION_REQUEST});
      const {name, balance, selectedMonth} = user;
      const updatedUserData = {
        name,
        balance,
        selectedMonth,
        language: newLanguage,
      };
      dispatch({type: SET_LANGUAGE_SUCCESS, payload: newLanguage});
      dispatch(loadCategories(newLanguage));
      await AsyncStorage.setItem('user', JSON.stringify(updatedUserData));
    } catch (error) {
      dispatch({type: USER_ACTION_ERROR, payload: error});
    }
  };
};
