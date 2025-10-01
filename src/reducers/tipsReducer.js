import {
  GET_TIP_ERROR,
  GET_TIP_SUCCESS,
  LOAD_TIPS_ERROR,
  LOAD_TIPS_SUCCESS,
  TIP_ACTION_REQUEST,
} from '../constants/tipsConstants';

export const tipsReducer = (
  state = {
    tips: [],
    loading: false,
    error: null,
  },
  action,
) => {
  const {type, payload} = action;
  switch (type) {
    case TIP_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_TIP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_TIP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case LOAD_TIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tips: payload,
      };
    case LOAD_TIPS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        tips: [],
      };
    default:
      return state;
  }
};
