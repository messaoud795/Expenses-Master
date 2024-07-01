import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {expensesReducer} from '../reducers/expensesReducer';
import {categoriesReducer} from '../reducers/categoriesReducer';
import {userReducer} from '../reducers/userReducer';

const reducer = combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer,
  user: userReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware),
);

export default store;
