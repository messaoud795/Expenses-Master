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
import * as RNLocalize from 'react-native-localize';

const localLanguage = RNLocalize.getLocales()[0].languageCode;

export const userReducer = (
  state = {
    name: '',
    currency: '',
    balance: [],
    selectedMonth: new Date(),
    language: localLanguage,
    loading: true,
    error: null,
  },
  action,
) => {
  const {type, payload} = action;
  switch (type) {
    case USER_ACTION_REQUEST:
      return {...state, loading: true, error: null};
    case USER_ACTION_ERROR:
      return {...state, loading: false, error: payload};
    case SET_USERNAME_SUCCESS:
      return {...state, loading: false, error: null, name: payload};
    case SET_CURRENCY_SUCCESS:
      return {...state, loading: false, error: null, currency: payload};
    case SET_LANGUAGE_SUCCESS:
      return {...state, loading: false, error: null, language: payload};
    case LOAD_USERDATA_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        error: null,
        selectedMonth: new Date(),
      };
    case CHANGE_MONTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        selectedMonth: new Date(payload),
      };
    case SET_BUDGET_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        error: null,
        selectedMonth: new Date(payload?.selectedMonth),
      };
    case SET_GOAL_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        error: null,
        selectedMonth: new Date(payload?.selectedMonth),
      };
    default:
      return state;
  }
};
