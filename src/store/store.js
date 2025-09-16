import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {expensesReducer} from '../reducers/expensesReducer';
import {categoriesReducer} from '../reducers/categoriesReducer';
import {userReducer} from '../reducers/userReducer';
import {tipsReducer} from '../reducers/tipsReducer';
import {goalReducer} from '../reducers/goalsReducer';

const reducer = combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer,
  user: userReducer,
  tips: tipsReducer,
  goal: goalReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware),
);

export default store;
