import {
  DELETE_CATEGORY_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORIES_SUCCESS,
  SET_CATEGORY_SUCCESS,
} from '../constants/categoriesConstants';

export const categoriesReducer = (
  state = {categories: [], loading: false, error: null},
  action,
) => {
  const {type, payload} = action;
  switch (type) {
    case DELETE_CATEGORY_SUCCESS:
      return {categories: payload, loading: false};
    case SET_CATEGORY_SUCCESS:
      return {categories: payload, loading: false};
    case LOAD_CATEGORIES_SUCCESS:
      return {categories: payload, loading: false};
    case LOAD_CATEGORIES_ERROR:
      return {categories: [], loading: false, error: payload};

    default:
      return state;
  }
};
