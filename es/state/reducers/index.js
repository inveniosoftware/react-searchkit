import { combineReducers } from 'redux';

import queryReducer from './query';
import resultsReducer from './results';

export default combineReducers({
  query: queryReducer,
  results: resultsReducer
});