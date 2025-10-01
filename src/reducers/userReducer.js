import {
  CHANGE_MONTH_SUCCESS,
  LOAD_USERDATA_ERROR,
  LOAD_USERDATA_SUCCESS,
  SET_LANGUAGE_SUCCESS,
  UPDATE_COUNTRY_SUCCESS,
  USER_ACTION_ERROR,
  USER_ACTION_REQUEST,
} from '../constants/userConstants';
import * as RNLocalize from 'react-native-localize';
import * as Keychain from 'react-native-keychain';
import {
  LOAD_TOKEN_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../constants/authConstants';

export const saveToken = async (token, name) => {
  await Keychain.setGenericPassword(name, token);
};

export const removeToken = async () => {
  await Keychain.resetGenericPassword();
};

export const getToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return {
      token: credentials.password,
      name: credentials.username,
    };
  }
  return null;
};

const localLanguage = RNLocalize.getLocales()[0].languageCode;

export const userReducer = (
  state = {
    name: '',
    currency: '',
    country: '',
    balance: [],
    selectedMonth: new Date(),
    language: localLanguage,
    loading: true,
    error: null,
    authenticated: false,
    token: '',
  },
  action,
) => {
  const {type, payload} = action;
  switch (type) {
    case USER_ACTION_REQUEST:
      return {...state, loading: true, error: null};
    case USER_ACTION_ERROR:
      return {...state, loading: false, error: payload};
    case UPDATE_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        country: payload.user.country,
        currency: payload.user.currency,
      };
    case SET_LANGUAGE_SUCCESS:
      return {...state, loading: false, error: null, language: payload};
    case LOAD_USERDATA_SUCCESS:
      return {
        ...state,
        name: payload.user.name,
        country: payload.user.country,
        currency: payload.user.currency,
        loading: false,
        error: null,
        selectedMonth: new Date(),
      };

    case LOAD_USERDATA_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CHANGE_MONTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        selectedMonth: new Date(payload),
      };
    case REGISTER_SUCCESS:
      saveToken(payload.token, payload.user.name);
      return {
        ...state,
        authenticated: true,
        name: payload.user.name,
        country: payload.user.country,
        currency: payload.user.currency,
      };
    case LOGIN_SUCCESS:
      saveToken(payload.token, payload.user.name);
      return {
        ...state,
        authenticated: true,
        name: payload.user.name,
        country: payload.user.country,
        currency: payload.user.currency,
        token: payload.token,
      };
    case LOAD_TOKEN_SUCCESS:
      saveToken(payload.token, payload.name);
      return {
        ...state,
        authenticated: true,
        name: payload.name,
        token: payload.token,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        name: '',
        token: null,
      };
    default:
      return state;
  }
};
