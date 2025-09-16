import {
  CATEGORY_ACTION_ERROR,
  CATEGORY_ACTION_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORIES_SUCCESS,
  SET_CATEGORY_SUCCESS,
} from '../constants/categoriesConstants';

import store from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOAD_EXPENSES_SUCCESS} from '../constants/expensesConstants';
import {isArrayEmpty} from '../utils/arrayUtils';
import axios from 'axios';
import {requestConfig} from './requestConfig';

export const removeCategory = categoryToDelete => {
  return async dispatch => {
    try {
      dispatch({type: CATEGORY_ACTION_REQUEST});
      const {
        categories: {categories},
        expenses: {expenses},
      } = store.getState();
      const updatedCategories = categories.filter(
        category => category.id != categoryToDelete.id,
      );
      await AsyncStorage.setItem(
        'categories',
        JSON.stringify(updatedCategories),
      );
      // delete all expenses under deleted category
      const updatedExpenses = isArrayEmpty(expenses)
        ? expenses
        : expenses?.filter(
            expense => expense.categoryId != categoryToDelete.id,
          );

      await AsyncStorage.setItem(
        'expenses',
        JSON.stringify({expenses: updatedExpenses}),
      );
      dispatch({type: LOAD_EXPENSES_SUCCESS, payload: updatedExpenses});
      dispatch({type: DELETE_CATEGORY_SUCCESS, payload: updatedCategories});
    } catch (error) {
      console.log({error});
      dispatch({type: CATEGORY_ACTION_ERROR, payload: error});
    }
  };
};

export const editCategory = (newCategory, isEditMode) => {
  return async dispatch => {
    try {
      dispatch({type: CATEGORY_ACTION_REQUEST});
      const {
        categories: {categories},
      } = store.getState();
      let updatedCategories;
      if (isEditMode) {
        updatedCategories = categories.map(category => {
          if (category.id == newCategory.id) category = newCategory;
          return category;
        });
      } else {
        updatedCategories = [...categories, newCategory];
      }

      await AsyncStorage.setItem(
        'categories',
        JSON.stringify(updatedCategories),
      );

      dispatch({type: SET_CATEGORY_SUCCESS, payload: updatedCategories});
    } catch (error) {
      dispatch({type: CATEGORY_ACTION_ERROR, payload: error});
    }
  };
};

export const loadCategories = () => {
  return async dispatch => {
    try {
      dispatch({type: CATEGORY_ACTION_REQUEST});

      const res = await axios.get(
        `${process.env.BACKEND_URL}/api/categories`,
        await requestConfig(),
      );
      dispatch({
        type: LOAD_CATEGORIES_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log({error});
      dispatch({type: LOAD_CATEGORIES_ERROR, payload: error});
    }
  };
};
