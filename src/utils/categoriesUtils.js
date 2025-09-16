import {isEqual} from 'lodash';
import {defaultCategories} from '../constants/categoriesConstants';
import store from '../store/store';

export const getCategoryName = categoryId => {
  const {
    categories: {categories},
  } = store.getState();
  const foundCategory = categories?.find(
    category => category._id == categoryId,
  );
  return foundCategory?.name;
};

export const getCategoryId = categoryName => {
  const {
    categories: {categories},
  } = store.getState();
  return categories?.find(category => category.name == categoryName)?.id;
};

export const doesNewCategoryExists = newCategory => {
  const {
    categories: {categories},
  } = store.getState();
  return (
    categories?.findIndex(
      category => category.name.toLowerCase() == newCategory.toLowerCase(),
    ) > -1
  );
};

export const formatInitialCategories = language => {
  return defaultCategories[language].reduce((acc, category, index) => {
    acc.push({id: index, name: category});
    return acc;
  }, []);
};

export const areCategoriesDefault = categories => {
  const categoriesNames = categories.map(category => category.name);
  return Object.values(defaultCategories).some(items =>
    isEqual(items, categoriesNames),
  );
};
