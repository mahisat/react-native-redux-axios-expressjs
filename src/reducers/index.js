import {combineReducers} from 'redux';
import QuoteReducer from './QuoteReducer';

const appReducer = combineReducers({
  QuoteReducer: QuoteReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
